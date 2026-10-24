/*
 * Study engine: pure logic, no DOM. Used by the app and by the Node tests.
 * - content indexing
 * - grading
 * - spaced repetition scheduling
 * - sprint building and recommendations
 * - progress state, export / import
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SecEngine = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const STATE_VERSION = 1;
  const MIN = 60 * 1000;
  const DAY = 24 * 60 * MIN;
  const RELEARN_DELAY = 10 * MIN; // a missed item comes back after ~10 minutes
  const MAX_INTERVAL_DAYS = 120;
  const SOLID_DAYS = 7; // interval at which an item counts as "holding well"

  const XP = {
    lesson: 5,       // reading a lesson
    attempt: 5,      // answering anything, right or wrong
    firstTry: 5,     // bonus: correct on the first ever attempt without a hint
    hint: 1,         // using a hint is learning, not cheating
    review: 3,       // completing a due review
    explainMore: 1   // opening "Explain more" (once per item)
  };

  // ---------------------------------------------------------------- content
  function indexContent(S) {
    const domains = S.map.domains.map(function (d) {
      const pack = (S.content || []).find(function (c) { return c.domain === d.id; });
      return Object.assign({}, d, { topics: pack ? pack.topics : [], built: !!pack });
    });
    const topics = [];
    const activities = {};
    domains.forEach(function (d) {
      d.topics.forEach(function (t) {
        t.domainId = d.id;
        topics.push(t);
        t.activities.forEach(function (a) {
          a.topicId = t.id;
          activities[a.id] = a;
        });
      });
    });
    const topicById = {};
    topics.forEach(function (t) { topicById[t.id] = t; });
    return { domains: domains, topics: topics, topicById: topicById, activities: activities };
  }

  // ---------------------------------------------------------------- random
  function makeRng(seed) {
    let s = seed >>> 0 || 1;
    return function () {
      // mulberry32
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rng) {
    const a = arr.slice();
    rng = rng || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Presentation: a randomized but stable layout for one attempt, saved with the session.
  function presentActivity(a, rng) {
    rng = rng || Math.random;
    const idx = function (n) { return Array.from({ length: n }, function (_, i) { return i; }); };
    if (a.type === "choice" || a.type === "multi") return { optionOrder: shuffle(idx(a.options.length), rng) };
    if (a.type === "match") return { itemOrder: shuffle(idx(a.items.length), rng), choiceOrder: shuffle(idx(a.choices.length), rng) };
    if (a.type === "order") {
      let order = shuffle(idx(a.steps.length), rng);
      // never start in the solved order
      let guard = 0;
      while (order.every(function (v, i) { return v === i; }) && a.steps.length > 1 && guard++ < 20) order = shuffle(order, rng);
      if (order.every(function (v, i) { return v === i; }) && a.steps.length > 1) order = order.slice(1).concat(order[0]);
      return { stepOrder: order };
    }
    return {};
  }

  // ---------------------------------------------------------------- grading
  // Responses always refer to ORIGINAL indexes / labels, never display positions.
  //  choice: { selected: number }
  //  multi:  { selected: number[] }
  //  match:  { answers: { [itemIndex]: choiceLabel } }
  //  order:  { order: number[] }  (original step indexes in the user's order)
  //  recall: { rating: "knew" | "partly" | "not" }
  function grade(a, r) {
    r = r || {};
    if (a.type === "choice") {
      const okIdx = a.options.findIndex(function (o) { return o.ok; });
      const correct = r.selected === okIdx;
      return { correct: correct, score: correct ? 1 : 0, correctIndex: okIdx };
    }
    if (a.type === "multi") {
      const sel = new Set(r.selected || []);
      const parts = a.options.map(function (o, i) { return !!o.ok === sel.has(i); });
      const right = parts.filter(Boolean).length;
      return { correct: parts.every(Boolean), score: right / parts.length, parts: parts };
    }
    if (a.type === "match") {
      const ans = r.answers || {};
      const parts = a.items.map(function (it, i) { return ans[i] === it.a; });
      const right = parts.filter(Boolean).length;
      return { correct: parts.every(Boolean), score: right / parts.length, parts: parts };
    }
    if (a.type === "order") {
      const ord = r.order || [];
      const parts = a.steps.map(function (_, pos) { return ord[pos] === pos; });
      const right = parts.filter(Boolean).length;
      return { correct: parts.every(Boolean) && ord.length === a.steps.length, score: right / a.steps.length, parts: parts };
    }
    if (a.type === "recall") {
      const map = { knew: 1, partly: 0.5, not: 0 };
      const score = map[r.rating] != null ? map[r.rating] : 0;
      return { correct: r.rating === "knew", score: score, selfRated: true };
    }
    throw new Error("Unknown activity type: " + a.type);
  }

  // ---------------------------------------------------------------- state
  function defaultState() {
    return {
      version: STATE_VERSION,
      createdAt: Date.now(),
      xp: 0,
      cards: {},        // activityId -> SRS card
      topics: {},       // topicId -> { lessonSeen: bool, lessonSeenAt }
      first: {},        // activityId -> { outcome: "correct"|"assisted"|"wrong", at } (first ever attempt)
      totals: { answered: 0, correct: 0, hinted: 0, reviews: 0, sprints: 0, lessons: 0 },
      explainMoreSeen: {},
      session: null,    // in-progress sprint
      history: [],      // recent sprint summaries (capped)
      prefs: { sprintSize: 3, focusMode: true, theme: "auto" }
    };
  }

  // Outcome categories:
  //  "correct"  - right, no hint, not flagged unsure
  //  "assisted" - right but used a hint, or flagged "I wasn't sure", or recall "partly"
  //  "wrong"    - wrong, or recall "not yet"
  function outcomeOf(result, usedHint, unsure) {
    if (!result.correct) {
      if (result.selfRated && result.score === 0.5) return "assisted";
      return "wrong";
    }
    return (usedHint || unsure) ? "assisted" : "correct";
  }

  function schedule(card, outcome, now) {
    const c = Object.assign({ interval: 0, due: now, reps: 0, lapses: 0, seen: 0, last: null }, card || {});
    c.seen += 1;
    c.last = outcome;
    c.lastAt = now;
    if (outcome === "wrong") {
      c.lapses += 1;
      c.reps = 0;
      c.interval = 0;
      c.due = now + RELEARN_DELAY;
    } else if (outcome === "assisted") {
      c.interval = c.interval < 1 ? 1 : Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(c.interval * 1.2)));
      c.due = now + c.interval * DAY;
    } else {
      c.reps += 1;
      c.interval = c.interval < 1 ? 1 : Math.min(MAX_INTERVAL_DAYS, Math.max(c.interval + 1, Math.round(c.interval * 2.5)));
      c.due = now + c.interval * DAY;
    }
    return c;
  }

  // Record one answered activity. Returns { outcome, xpGained, wasReview, firstAttempt }.
  function recordAnswer(state, activityId, result, opts, now) {
    opts = opts || {};
    const usedHint = !!opts.usedHint;
    const unsure = !!opts.unsure;
    const prev = state.cards[activityId];
    const wasReview = !!(prev && prev.due <= now);
    const outcome = outcomeOf(result, usedHint, unsure);
    state.cards[activityId] = schedule(prev, outcome, now);

    let xp = XP.attempt;
    if (usedHint) xp += XP.hint;
    if (wasReview) xp += XP.review;

    let firstAttempt = false;
    if (!state.first[activityId]) {
      firstAttempt = true;
      const fo = result.correct ? (usedHint ? "assisted" : "correct") : (result.selfRated && result.score === 0.5 ? "assisted" : "wrong");
      state.first[activityId] = { outcome: fo, at: now };
      if (fo === "correct") xp += XP.firstTry;
    }

    state.totals.answered += 1;
    if (result.correct && !usedHint) state.totals.correct += 1;
    if (usedHint) state.totals.hinted += 1;
    if (wasReview) state.totals.reviews += 1;
    state.xp += xp;
    return { outcome: outcome, xpGained: xp, wasReview: wasReview, firstAttempt: firstAttempt };
  }

  // Re-flag an already-recorded answer as "I wasn't sure" (after feedback was shown).
  // prevCard is the card as it was before this answer was recorded (null for a new item).
  function markUnsure(state, activityId, prevCard, now) {
    const c = state.cards[activityId];
    if (!c || c.last !== "correct") return false;
    state.cards[activityId] = schedule(prevCard, "assisted", now);
    state.cards[activityId].unsure = true;
    if (state.first[activityId] && state.first[activityId].at === c.lastAt) state.first[activityId].unsure = true;
    return true;
  }

  function markLessonSeen(state, topicId, now) {
    const t = state.topics[topicId] || (state.topics[topicId] = {});
    if (t.lessonSeen) return 0;
    t.lessonSeen = true;
    t.lessonSeenAt = now;
    state.totals.lessons += 1;
    state.xp += XP.lesson;
    return XP.lesson;
  }

  function markExplainMore(state, activityId) {
    if (state.explainMoreSeen[activityId]) return 0;
    state.explainMoreSeen[activityId] = true;
    state.xp += XP.explainMore;
    return XP.explainMore;
  }

  // ---------------------------------------------------------------- queries
  function dueItems(state, idx, now) {
    return Object.keys(state.cards)
      .filter(function (id) { return idx.activities[id] && state.cards[id].due <= now; })
      .sort(function (a, b) { return state.cards[a].due - state.cards[b].due; });
  }

  function topicProgress(state, topic, now) {
    const ids = topic.activities.map(function (a) { return a.id; });
    let attempted = 0, firstCorrect = 0, firstHinted = 0, firstWrong = 0, solid = 0, due = 0, shaky = 0;
    ids.forEach(function (id) {
      const c = state.cards[id];
      const f = state.first[id];
      if (c) attempted++;
      if (c && c.interval >= SOLID_DAYS) solid++;
      if (c && c.due <= now) due++;
      if (c && (c.last === "wrong" || c.last === "assisted")) shaky++;
      if (f) {
        if (f.outcome === "correct") firstCorrect++;
        else if (f.outcome === "assisted") firstHinted++;
        else firstWrong++;
      }
    });
    const firsts = firstCorrect + firstHinted + firstWrong;
    return {
      total: ids.length,
      attempted: attempted,
      lessonSeen: !!(state.topics[topic.id] && state.topics[topic.id].lessonSeen),
      firstCorrect: firstCorrect, firstHinted: firstHinted, firstWrong: firstWrong,
      firstAccuracy: firsts ? firstCorrect / firsts : null,
      solid: solid, due: due, shaky: shaky,
      status: attempted === 0 ? "new" : attempted < ids.length ? "in-progress" : "practiced"
    };
  }

  function overallStats(state, idx, now) {
    let firstCorrect = 0, firstHinted = 0, firstWrong = 0;
    Object.keys(state.first).forEach(function (id) {
      if (!idx.activities[id]) return;
      const o = state.first[id].outcome;
      if (o === "correct") firstCorrect++; else if (o === "assisted") firstHinted++; else firstWrong++;
    });
    const builtTotal = Object.keys(idx.activities).length;
    const attempted = Object.keys(state.cards).filter(function (id) { return idx.activities[id]; }).length;
    const solid = Object.keys(state.cards).filter(function (id) { return idx.activities[id] && state.cards[id].interval >= SOLID_DAYS; }).length;
    const firsts = firstCorrect + firstHinted + firstWrong;
    return {
      xp: state.xp,
      builtTotal: builtTotal,
      attempted: attempted,
      solid: solid,
      due: dueItems(state, idx, now).length,
      firstCorrect: firstCorrect, firstHinted: firstHinted, firstWrong: firstWrong,
      firstAccuracy: firsts ? firstCorrect / firsts : null,
      answered: state.totals.answered
    };
  }

  function nextNewActivities(state, topic) {
    return topic.activities.filter(function (a) { return !state.cards[a.id]; });
  }

  // Which topic to work on for new material: the first built topic with unseen items.
  function currentTopic(state, idx) {
    for (let i = 0; i < idx.topics.length; i++) {
      if (nextNewActivities(state, idx.topics[i]).length) return idx.topics[i];
    }
    return null;
  }

  function weakestItems(state, idx, excludeIds) {
    const ex = new Set(excludeIds || []);
    return Object.keys(state.cards)
      .filter(function (id) { return idx.activities[id] && !ex.has(id); })
      .sort(function (a, b) {
        const ca = state.cards[a], cb = state.cards[b];
        return (ca.interval - cb.interval) || (cb.lapses - ca.lapses) || (ca.due - cb.due);
      });
  }

  function recommendNext(state, idx, now) {
    if (state.session && !state.session.done) {
      return { action: "resume", reason: "You have a sprint in progress. Pick up exactly where you stopped." };
    }
    const due = dueItems(state, idx, now);
    if (due.length >= 3) {
      return { action: "review", reason: due.length + " items are due for review. A quick review now locks them in before they fade." };
    }
    // A shaky topic with lots of misses gets priority over brand new material
    let worst = null;
    idx.topics.forEach(function (t) {
      const p = topicProgress(state, t, now);
      if (p.attempted >= 3 && p.firstAccuracy != null && p.firstAccuracy < 0.5 && (!worst || p.firstAccuracy < worst.p.firstAccuracy)) worst = { t: t, p: p };
    });
    const cur = currentTopic(state, idx);
    if (worst && (!cur || worst.t.id !== cur.id) && due.length > 0) {
      return { action: "review", reason: "Mix in your due reviews. '" + worst.t.title + "' had several first-try misses." };
    }
    if (cur) {
      const p = topicProgress(state, cur, now);
      return {
        action: "topic", topicId: cur.id,
        reason: p.attempted === 0
          ? "Next new topic in order: '" + cur.title + "' (" + cur.objective + "). A short lesson comes first."
          : "Keep going with '" + cur.title + "'. " + (p.total - p.attempted) + " activities left in this topic."
      };
    }
    if (due.length) return { action: "review", reason: "All built activities are started. " + due.length + " review(s) are due." };
    return { action: "practice", reason: "Everything built so far is practiced and nothing is due. Practice your weakest items, or check back later." };
  }

  // ---------------------------------------------------------------- sprints
  // mode: "mixed" | "review" | "topic"
  // Returns steps: [{kind:"lesson", topicId} | {kind:"activity", id, review:bool}]
  function buildSprint(state, idx, size, mode, opts, now) {
    opts = opts || {};
    size = Math.max(1, Math.min(10, size | 0));
    const due = dueItems(state, idx, now);
    let reviews = [];
    let fresh = [];

    if (mode === "review") {
      reviews = due.slice(0, size);
      if (reviews.length < size) reviews = reviews.concat(weakestItems(state, idx, reviews).slice(0, size - reviews.length));
    } else {
      let topicOrder;
      if (mode === "domain" && opts.domainId) {
        // one domain: its topics in course order, plus its due and weakest items
        const inDomain = function (id) { return idx.topicById[idx.activities[id].topicId].domainId === opts.domainId; };
        topicOrder = idx.topics.filter(function (t) { return t.domainId === opts.domainId; });
        const domainDue = due.filter(inDomain);
        const reviewSlots = domainDue.length ? Math.max(1, Math.floor(size / 2)) : 0;
        reviews = domainDue.slice(0, reviewSlots);
        for (let i = 0; i < topicOrder.length && fresh.length < size - reviews.length; i++) {
          const newOnes = nextNewActivities(state, topicOrder[i]).map(function (a) { return a.id; });
          fresh = fresh.concat(newOnes.slice(0, size - reviews.length - fresh.length));
        }
        if (reviews.length + fresh.length < size) reviews = reviews.concat(domainDue.slice(reviews.length, reviews.length + size - reviews.length - fresh.length));
        if (reviews.length + fresh.length < size) {
          const extra = weakestItems(state, idx, fresh.concat(reviews)).filter(inDomain);
          reviews = reviews.concat(extra.slice(0, size - fresh.length - reviews.length));
        }
      } else if (mode === "topic" && opts.topicId) {
        const t = idx.topicById[opts.topicId];
        topicOrder = t ? [t] : [];
        const topicDue = due.filter(function (id) { return idx.activities[id].topicId === opts.topicId; });
        const newOnes = nextNewActivities(state, t).map(function (a) { return a.id; });
        fresh = newOnes.slice(0, size);
        if (fresh.length < size) reviews = topicDue.slice(0, size - fresh.length);
        if (fresh.length + reviews.length < size) {
          const extra = weakestItems(state, idx, fresh.concat(reviews)).filter(function (id) { return idx.activities[id].topicId === opts.topicId; });
          reviews = reviews.concat(extra.slice(0, size - fresh.length - reviews.length));
        }
      } else {
        // mixed: up to half of the sprint from due reviews, the rest new material
        const reviewSlots = due.length ? Math.max(1, Math.floor(size / 2)) : 0;
        reviews = due.slice(0, reviewSlots);
        topicOrder = idx.topics;
        for (let i = 0; i < topicOrder.length && fresh.length < size - reviews.length; i++) {
          const newOnes = nextNewActivities(state, topicOrder[i]).map(function (a) { return a.id; });
          fresh = fresh.concat(newOnes.slice(0, size - reviews.length - fresh.length));
        }
        if (reviews.length + fresh.length < size) {
          const moreDue = due.slice(reviews.length, reviews.length + (size - reviews.length - fresh.length));
          reviews = reviews.concat(moreDue);
        }
        if (reviews.length + fresh.length < size) {
          const extra = weakestItems(state, idx, reviews.concat(fresh));
          reviews = reviews.concat(extra.slice(0, size - reviews.length - fresh.length));
        }
      }
    }

    // interleave: review, new, review, new ...
    const ordered = [];
    const r = reviews.slice(), f = fresh.slice();
    while (r.length || f.length) {
      if (r.length) ordered.push({ kind: "activity", id: r.shift(), review: true });
      if (f.length) ordered.push({ kind: "activity", id: f.shift(), review: false });
    }

    // insert a lesson before the first new activity of a topic whose lesson hasn't been seen
    const steps = [];
    const lessonAdded = {};
    ordered.forEach(function (s) {
      const tid = idx.activities[s.id].topicId;
      const seen = state.topics[tid] && state.topics[tid].lessonSeen;
      if (!s.review && !seen && !lessonAdded[tid]) {
        steps.push({ kind: "lesson", topicId: tid });
        lessonAdded[tid] = true;
      }
      steps.push(s);
    });
    return steps;
  }

  function startSession(state, idx, size, mode, opts, now, rng) {
    const steps = buildSprint(state, idx, size, mode, opts, now);
    if (!steps.length) return null;
    state.session = {
      id: "s" + now.toString(36),
      mode: mode, size: size, topicId: (opts && opts.topicId) || null, domainId: (opts && opts.domainId) || null,
      steps: steps, index: 0, startedAt: now, updatedAt: now,
      xp: 0, results: [], done: false,
      current: null
    };
    prepareStep(state, idx, rng);
    return state.session;
  }

  // Sets up per-step UI state (stable shuffles) for the step at session.index.
  function prepareStep(state, idx, rng) {
    const s = state.session;
    if (!s || s.index >= s.steps.length) return;
    const step = s.steps[s.index];
    const cur = { stepIndex: s.index, hintShown: false, vocabUsed: false, answered: false, response: null, result: null, unsure: false, revealed: false, moreOpen: false };
    if (step.kind === "activity") {
      const a = idx.activities[step.id];
      cur.layout = presentActivity(a, rng);
      if (a.type === "order") cur.response = { order: cur.layout.stepOrder.slice() };
      if (a.type === "match") cur.response = { answers: {} };
      if (a.type === "multi") cur.response = { selected: [] };
    }
    s.current = cur;
  }

  // Submit the current activity. Returns the grade result.
  function submitCurrent(state, idx, now) {
    const s = state.session;
    const step = s.steps[s.index];
    const a = idx.activities[step.id];
    const cur = s.current;
    if (cur.answered) return cur.result;
    const result = grade(a, cur.response);
    cur.prevCard = state.cards[a.id] ? Object.assign({}, state.cards[a.id]) : null;
    const rec = recordAnswer(state, a.id, result, { usedHint: cur.hintShown || !!cur.vocabUsed }, now);
    cur.answered = true;
    cur.result = Object.assign({}, result, { outcome: rec.outcome, xpGained: rec.xpGained, firstAttempt: rec.firstAttempt, wasReview: rec.wasReview });
    s.xp += rec.xpGained;
    s.results.push({ id: a.id, outcome: rec.outcome, correct: result.correct, hinted: cur.hintShown || !!cur.vocabUsed, review: !!step.review });
    s.updatedAt = now;
    return cur.result;
  }

  function flagUnsure(state, now) {
    const s = state.session;
    const cur = s.current;
    if (!cur || !cur.answered || cur.unsure) return false;
    const step = s.steps[s.index];
    cur.unsure = true;
    const changed = markUnsure(state, step.id, cur.prevCard, now);
    const last = s.results[s.results.length - 1];
    if (last && last.id === step.id) { last.unsure = true; if (changed) last.outcome = "assisted"; }
    return changed;
  }

  function advance(state, idx, now, rng) {
    const s = state.session;
    const step = s.steps[s.index];
    if (step.kind === "lesson") s.xp += markLessonSeen(state, step.topicId, now);
    s.index += 1;
    s.updatedAt = now;
    if (s.index >= s.steps.length) {
      s.done = true;
      s.current = null;
      state.totals.sprints += 1;
      const summary = summarizeSession(s);
      state.history.unshift(Object.assign({ at: now }, summary));
      state.history = state.history.slice(0, 50);
      return { finished: true, summary: summary };
    }
    prepareStep(state, idx, rng);
    return { finished: false };
  }

  function summarizeSession(s) {
    const r = s.results;
    return {
      mode: s.mode,
      questions: r.length,
      correctFirstGo: r.filter(function (x) { return x.outcome === "correct"; }).length,
      assisted: r.filter(function (x) { return x.outcome === "assisted"; }).length,
      missed: r.filter(function (x) { return x.outcome === "wrong"; }).length,
      reviews: r.filter(function (x) { return x.review; }).length,
      xp: s.xp,
      minutes: Math.max(1, Math.round((s.updatedAt - s.startedAt) / MIN))
    };
  }

  // Suggest a break when the person has been at it for a while today (never forced).
  function breakSuggestion(state, now) {
    const today = state.history.filter(function (h) { return now - h.at < 3 * 60 * MIN; });
    const minutes = today.reduce(function (m, h) { return m + (h.minutes || 0); }, 0);
    if (today.length >= 3 || minutes >= 25) {
      return "You've done " + today.length + " sprints recently. This is a great moment for a 5-minute break: stand up, get some water, look at something far away.";
    }
    return null;
  }

  // ---------------------------------------------------------------- persistence
  function serialize(state) { return JSON.stringify(state); }

  function migrate(obj) {
    const base = defaultState();
    if (!obj || typeof obj !== "object") return base;
    const out = Object.assign(base, obj);
    out.totals = Object.assign(defaultState().totals, obj.totals || {});
    out.prefs = Object.assign(defaultState().prefs, obj.prefs || {});
    out.cards = obj.cards && typeof obj.cards === "object" ? obj.cards : {};
    out.topics = obj.topics && typeof obj.topics === "object" ? obj.topics : {};
    out.first = obj.first && typeof obj.first === "object" ? obj.first : {};
    out.explainMoreSeen = obj.explainMoreSeen || {};
    out.history = Array.isArray(obj.history) ? obj.history : [];
    out.version = STATE_VERSION;
    return out;
  }

  function exportState(state, now) {
    return JSON.stringify({
      app: "secplus-701-study",
      exportedAt: new Date(now).toISOString(),
      stateVersion: STATE_VERSION,
      state: state
    }, null, 2);
  }

  // Throws a readable Error on invalid input.
  function importState(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { throw new Error("That file isn't valid JSON."); }
    if (!data || data.app !== "secplus-701-study" || !data.state) throw new Error("That file isn't a progress backup from this app.");
    const s = data.state;
    if (typeof s.xp !== "number" || typeof s.cards !== "object") throw new Error("The backup is missing required fields.");
    Object.keys(s.cards).forEach(function (k) {
      const c = s.cards[k];
      if (!c || typeof c.due !== "number" || typeof c.interval !== "number") throw new Error("A review card in the backup is malformed (" + k + ").");
    });
    return migrate(s);
  }

  return {
    STATE_VERSION: STATE_VERSION, DAY: DAY, MIN: MIN, XP: XP, SOLID_DAYS: SOLID_DAYS, RELEARN_DELAY: RELEARN_DELAY,
    indexContent: indexContent, makeRng: makeRng, shuffle: shuffle, presentActivity: presentActivity,
    grade: grade, defaultState: defaultState, outcomeOf: outcomeOf, schedule: schedule,
    recordAnswer: recordAnswer, markUnsure: markUnsure, markLessonSeen: markLessonSeen, markExplainMore: markExplainMore,
    dueItems: dueItems, topicProgress: topicProgress, overallStats: overallStats, currentTopic: currentTopic,
    recommendNext: recommendNext, buildSprint: buildSprint, startSession: startSession, prepareStep: prepareStep,
    submitCurrent: submitCurrent, flagUnsure: flagUnsure, advance: advance, summarizeSession: summarizeSession,
    breakSuggestion: breakSuggestion, serialize: serialize, migrate: migrate, exportState: exportState, importState: importState
  };
});
