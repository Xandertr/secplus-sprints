/*
 * UI layer. All learning logic lives in engine.js; all study material lives in /content.
 */
(function () {
  "use strict";
  const E = window.SecEngine;
  const S = window.SECPLUS;
  const idx = E.indexContent(S);
  const KEY = "secplus701.progress.v1";
  const BACKUP_KEY = "secplus701.progress.before-import";
  const OFFSET = S.source.printedPageOffset;

  let storageOk = true;
  let state = loadState();
  let ui = { recommend: null, importPreview: null, importError: null, glossaryQuery: "", flash: null, confirmReset: false };

  // ------------------------------------------------------------ storage
  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? E.migrate(JSON.parse(raw)) : E.defaultState();
    } catch (e) {
      storageOk = false;
      return E.defaultState();
    }
  }
  function save() {
    try { localStorage.setItem(KEY, E.serialize(state)); storageOk = true; }
    catch (e) { storageOk = false; }
  }
  const now = function () { return Date.now(); };

  // ------------------------------------------------------------ helpers
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pageRef(pages) {
    if (!pages || !pages.length) return "";
    const pdf = pages.length > 1 && pages[pages.length - 1] - pages[0] === pages.length - 1
      ? pages[0] + "–" + pages[pages.length - 1] : pages.join(", ");
    const printed = pages.map(function (p) { return p - OFFSET; });
    const pr = pages.length > 1 && printed[printed.length - 1] - printed[0] === printed.length - 1
      ? printed[0] + "–" + printed[printed.length - 1] : printed.join(", ");
    return "PDF p. " + pdf + " (printed p. " + pr + ")";
  }
  function pct(x) { return x == null ? "–" : Math.round(x * 100) + "%"; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function topicOf(activityId) { return idx.topicById[idx.activities[activityId].topicId]; }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  const PRAISE = ["Nice, that's right.", "Yes, exactly.", "Spot on.", "Correct. Good thinking.", "You've got it."];
  const GENTLE = ["Not quite, and that's useful to know.", "Close. Here's the key idea.", "Not this time. Now you'll remember it.", "Good attempt. Let's look at why."];

  // ------------------------------------------------------------ routing
  function route() {
    const hash = location.hash.replace(/^#\/?/, "") || "home";
    const parts = hash.split("/");
    return { name: parts[0], arg: decodeURIComponent(parts.slice(1).join("/")) };
  }
  function go(path) {
    if (location.hash === "#/" + path) render();
    else location.hash = "#/" + path;
  }

  function render() {
    const r = route();
    const inSprint = r.name === "sprint" && state.session;
    document.body.classList.toggle("focus", !!(inSprint && state.prefs.focusMode));
    applyTheme();
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === r.name) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const focusKey = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-fk");
    let html;
    switch (r.name) {
      case "library": html = viewLibrary(); break;
      case "topic": html = viewTopic(r.arg); break;
      case "sprint": html = viewSprint(); break;
      case "glossary": html = viewGlossary(); break;
      case "progress": html = viewProgress(); break;
      case "coverage": html = viewCoverage(); break;
      case "settings": html = viewSettings(); break;
      default: html = viewHome();
    }
    const app = document.getElementById("app");
    app.innerHTML = html;
    // restore or set focus for keyboard users
    let el = focusKey && app.querySelector('[data-fk="' + focusKey + '"]');
    if (!el) el = app.querySelector("[data-autofocus]");
    if (el) el.focus({ preventScroll: false });
    if (r.name === "glossary") renderGlossaryResults();
  }

  function applyTheme() {
    const t = state.prefs.theme;
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }

  // ------------------------------------------------------------ home
  function viewHome() {
    const t = now();
    const st = E.overallStats(state, idx, t);
    const s = state.session && !state.session.done ? state.session : null;
    const size = state.prefs.sprintSize;
    const cur = E.currentTopic(state, idx);
    let html = '<section class="stack">';
    html += '<h1 class="h1">Small steps count.</h1>';
    html += '<p class="lead">Pick a tiny sprint. You can stop after any question.</p>';

    if (s) {
      const step = s.steps[s.index];
      const tTitle = step.kind === "lesson" ? idx.topicById[step.topicId].title : topicOf(step.id).title;
      html += '<div class="card resume"><p class="eyebrow">Paused sprint</p>' +
        '<p>You stopped at step ' + (s.index + 1) + ' of ' + s.steps.length + ' (' + esc(tTitle) + ').</p>' +
        '<button class="btn primary big" data-action="resume" data-fk="resume" data-autofocus>Continue where I stopped</button></div>';
    }

    html += '<div class="card"><h2 class="h2">Start a small sprint</h2>' +
      '<p class="muted">New material mixed with anything due for review.</p>' +
      sizePicker(size) +
      '<button class="btn ' + (s ? "" : "primary ") + 'big" data-action="start-mixed" data-fk="start-mixed"' + (s ? "" : " data-autofocus") + '>Start ' + plural(size, "question") + '</button></div>';

    html += '<div class="grid2">';
    html += '<button class="btn tile" data-action="continue" data-fk="continue"><strong>Continue</strong><span>' +
      (s ? "Resume your paused sprint" : cur ? esc(cur.title) : "All built topics started") + '</span></button>';
    html += '<button class="btn tile" data-action="review" data-fk="review"><strong>Review</strong><span>' +
      (st.due ? plural(st.due, "item") + " due" : st.attempted ? "Nothing due. Practice weak spots" : "Nothing to review yet") + '</span></button>';
    html += '</div>';

    if (ui.flash) html += '<p class="ok" role="status">' + esc(ui.flash) + '</p>';
    html += '<button class="btn ghost big" data-action="recommend" data-fk="recommend">What should I study next?</button>';
    if (ui.recommend) {
      const rec = ui.recommend;
      html += '<div class="card soft" role="status"><p>' + esc(rec.reason) + '</p>' +
        '<button class="btn primary" data-action="do-recommend" data-fk="do-recommend">Let\'s do that</button></div>';
    }

    html += '<p class="statline"><span>' + st.xp + ' XP</span><span>' + st.attempted + '/' + st.builtTotal + ' activities tried</span><span>' + st.due + ' due</span></p>';
    html += '<p class="tiny muted">XP counts effort (reading, trying, reviewing). It isn\'t a measure of exam readiness. ' +
      'Your progress is saved only in this browser. <a href="#/settings">Back it up</a>.</p>';
    if (!storageOk) html += '<p class="warn">This browser is blocking storage, so progress won\'t be saved after you close the tab. Use Settings → Export to keep a copy.</p>';
    html += '</section>';
    return html;
  }

  function sizePicker(size) {
    return '<div class="seg" role="radiogroup" aria-label="Sprint size">' + [1, 3, 5].map(function (n) {
      return '<button role="radio" aria-checked="' + (n === size) + '" class="seg-btn" data-action="size" data-n="' + n + '" data-fk="size-' + n + '">' + n + '</button>';
    }).join("") + '</div>';
  }

  // ------------------------------------------------------------ library & topic
  function viewLibrary() {
    const t = now();
    let html = '<section class="stack"><h1 class="h1">Topics</h1>' +
      '<p class="lead">Organized like the course notes. Page numbers point to the PDF so you can look things up.</p>';
    idx.domains.forEach(function (d) {
      html += '<details class="card domain"' + (d.built ? " open" : "") + '><summary><span class="dtitle">' + esc(d.number + " " + d.title) + '</span>' +
        '<span class="chip ' + (d.built ? "ok" : "todo") + '">' + (d.built ? "Built" : "Not built yet") + '</span>' +
        '<span class="tiny muted block">' + d.weight + '% of exam · ' + esc(pageRef(range(d.pdfRange))) + '</span></summary>';
      html += '<ul class="list">';
      if (d.built) {
        d.topics.forEach(function (tp) {
          const p = E.topicProgress(state, tp, t);
          html += '<li><a class="row" href="#/topic/' + esc(tp.id) + '"><span><strong>' + esc(tp.objective + " " + tp.title) + '</strong>' +
            '<span class="tiny muted block">' + esc(pageRef(tp.pages)) + '</span></span>' +
            '<span class="rowmeta">' + progressBar(p.attempted, p.total) + '<span class="tiny">' + p.attempted + '/' + p.total + (p.due ? ' · ' + p.due + ' due' : "") + '</span></span></a></li>';
        });
      } else {
        d.sections.forEach(function (sec) {
          html += '<li class="row static"><span>' + esc(sec.objective + " " + sec.title) +
            '<span class="tiny muted block">' + esc(pageRef(sec.pdfPages)) + '</span></span><span class="chip todo">Not built yet</span></li>';
        });
      }
      html += '</ul></details>';
    });
    html += '<p><a class="btn ghost" href="#/coverage">See the page-by-page coverage checklist</a></p></section>';
    return html;
  }
  function range(r) { const out = []; for (let i = r[0]; i <= r[1]; i++) out.push(i); return out; }
  function progressBar(n, total) {
    const w = total ? Math.round((n / total) * 100) : 0;
    return '<span class="bar" role="img" aria-label="' + n + ' of ' + total + ' tried"><span style="width:' + w + '%"></span></span>';
  }

  function viewTopic(id) {
    const tp = idx.topicById[id];
    if (!tp) return '<section class="stack"><h1 class="h1">Topic not found</h1><a class="btn" href="#/library">Back to topics</a></section>';
    const p = E.topicProgress(state, tp, now());
    const formats = {};
    tp.activities.forEach(function (a) { formats[a.format] = (formats[a.format] || 0) + 1; });
    let html = '<section class="stack"><a class="back" href="#/library">← Topics</a>';
    html += '<p class="eyebrow">Objective ' + esc(tp.objective) + '</p><h1 class="h1">' + esc(tp.title) + '</h1>';
    html += '<p class="tiny muted">Source: ' + esc(pageRef(tp.pages)) + '</p>';
    html += '<div class="card"><h2 class="h2">Mini-lesson</h2>' + lessonBody(tp, "topic-more") + '</div>';
    html += '<div class="card"><h2 class="h2">Practice this topic</h2>' +
      '<p class="muted">' + Object.keys(formats).map(function (f) { return esc(f) + " ×" + formats[f]; }).join(" · ") + '</p>' +
      '<div class="btnrow">' + [1, 3, 5].map(function (n) {
        return '<button class="btn' + (n === 3 ? " primary" : "") + '" data-action="start-topic" data-topic="' + esc(tp.id) + '" data-n="' + n + '" data-fk="st-' + n + '">' + plural(n, "question") + '</button>';
      }).join("") + '</div></div>';
    html += '<div class="card"><h2 class="h2">Your progress here</h2><dl class="stats">' +
      stat("Tried", p.attempted + " of " + p.total) +
      stat("Right on first try", p.firstCorrect) +
      stat("First try with help", p.firstHinted) +
      stat("Missed on first try", p.firstWrong) +
      stat("Due for review", p.due) +
      stat("Holding well (7+ day interval)", p.solid) + '</dl></div>';
    html += '</section>';
    return html;
  }
  function stat(k, v) { return '<div><dt>' + esc(k) + '</dt><dd>' + esc(v) + '</dd></div>'; }

  function lessonBody(tp, moreKey) {
    const open = ui[moreKey] === tp.id;
    let html = '<ul class="bullets">' + tp.lesson.summary.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("") + '</ul>';
    if (tp.lesson.more && tp.lesson.more.length) {
      html += '<button class="btn ghost small" aria-expanded="' + open + '" data-action="toggle-lesson-more" data-key="' + moreKey + '" data-topic="' + esc(tp.id) + '" data-fk="lm">' + (open ? "Show less" : "Explain more") + '</button>';
      if (open) html += '<ul class="bullets more">' + tp.lesson.more.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("") + '</ul>';
    }
    html += '<p class="tiny muted">Revisit: ' + esc(pageRef(tp.lesson.pages)) + '</p>';
    return html;
  }

  // ------------------------------------------------------------ sprint
  function viewSprint() {
    const s = state.session;
    if (!s) return '<section class="stack"><h1 class="h1">No sprint running</h1><button class="btn primary big" data-action="start-mixed" data-autofocus>Start a small sprint</button></section>';
    if (s.done) return viewSummary();
    const step = s.steps[s.index];
    let html = '<section class="stack sprint">';
    html += '<div class="sprintbar"><span class="stepcount" aria-label="Step ' + (s.index + 1) + ' of ' + s.steps.length + '">' +
      s.steps.map(function (_, i) { return '<span class="dot' + (i < s.index ? " done" : i === s.index ? " now" : "") + '"></span>'; }).join("") +
      '<span class="tiny">' + (s.index + 1) + ' / ' + s.steps.length + '</span></span>' +
      '<span class="sprintctl"><button class="btn ghost small" data-action="toggle-focus" data-fk="focus" aria-pressed="' + !!state.prefs.focusMode + '">Focus ' + (state.prefs.focusMode ? "on" : "off") + '</button>' +
      '<button class="btn ghost small" data-action="pause" data-fk="pause">Pause</button></span></div>';

    if (step.kind === "lesson") html += viewLessonStep(idx.topicById[step.topicId]);
    else html += viewActivity(idx.activities[step.id], s.current, step);
    html += '</section>';
    return html;
  }

  function viewLessonStep(tp) {
    return '<article class="card qcard" aria-labelledby="qhead"><p class="eyebrow">Mini-lesson · ' + esc(tp.objective) + '</p>' +
      '<h1 class="h2" id="qhead">' + esc(tp.title) + '</h1>' + lessonBody(tp, "sprint-more") +
      '<div class="actions"><button class="btn primary big" data-action="next" data-fk="next" data-autofocus>Got it, show me a question</button>' +
      '<button class="btn ghost" data-action="next" data-fk="skip">I know this, skip</button></div></article>';
  }

  function viewActivity(a, cur, step) {
    const tp = topicOf(a.id);
    let html = '<article class="card qcard" aria-labelledby="qhead">';
    html += '<p class="eyebrow">' + esc(a.format) + (step.review ? ' · <span class="chip soft">Review</span>' : "") + ' · ' + esc(tp.title) + '</p>';
    html += '<h1 class="h2 prompt" id="qhead" tabindex="-1"' + (cur.answered || (a.type === "recall" && !cur.revealed) ? "" : " data-autofocus") + '>' + esc(a.type === "recall" ? a.front : a.prompt) + '</h1>';
    if (a.artifact) {
      html += '<figure class="artifact"><figcaption>' + esc(a.artifact.title || "Sample") + ' <span class="tiny muted">(simulated)</span></figcaption><pre tabindex="0">' + esc(a.artifact.body) + '</pre></figure>';
    }
    if (a.type === "choice" || a.type === "multi") html += viewOptions(a, cur);
    else if (a.type === "match") html += viewMatch(a, cur);
    else if (a.type === "order") html += viewOrder(a, cur);
    else if (a.type === "recall") html += viewRecall(a, cur);

    if (cur.hintShown && !cur.answered) html += '<p class="hint" role="status"><strong>Hint:</strong> ' + esc(a.hint) + '</p>';

    if (!cur.answered) {
      html += '<div class="actions">';
      if (a.type !== "recall") {
        html += '<button class="btn primary big" data-action="check" data-fk="check"' + (canCheck(a, cur) ? "" : " disabled") + '>Check answer</button>';
      }
      if (a.hint && !cur.hintShown) html += '<button class="btn ghost" data-action="hint" data-fk="hint">Show a hint <span class="tiny muted">(no penalty)</span></button>';
      html += '</div>';
    } else {
      html += viewFeedback(a, cur, tp);
    }
    html += '</article>';
    return html;
  }

  function canCheck(a, cur) {
    const r = cur.response || {};
    if (a.type === "choice") return r.selected != null;
    if (a.type === "multi") return (r.selected || []).length > 0;
    if (a.type === "match") return a.items.every(function (_, i) { return r.answers && r.answers[i]; });
    return true;
  }

  function viewOptions(a, cur) {
    const multi = a.type === "multi";
    const r = cur.response || {};
    const sel = multi ? (r.selected || []) : (r.selected != null ? [r.selected] : []);
    let html = multi ? '<p class="tiny muted">Select all that apply.</p>' : "";
    html += '<div class="options" role="group" aria-label="Answer options">';
    cur.layout.optionOrder.forEach(function (orig, pos) {
      const o = a.options[orig];
      const chosen = sel.indexOf(orig) >= 0;
      let cls = "opt";
      let mark = "";
      if (cur.answered) {
        if (o.ok) { cls += " right"; mark = '<span class="mark" aria-label="correct answer">✓</span>'; }
        else if (chosen) { cls += " wrong"; mark = '<span class="mark" aria-label="your choice, incorrect">✗</span>'; }
      } else if (chosen) cls += " chosen";
      html += '<button class="' + cls + '" data-action="pick" data-i="' + orig + '" data-fk="opt-' + orig + '" aria-pressed="' + chosen + '"' + (cur.answered ? " disabled" : "") + '>' +
        '<span class="key">' + (pos + 1) + '</span><span class="otext">' + esc(o.t) +
        (cur.answered ? '<span class="why">' + (chosen && !o.ok ? "You picked this. " : chosen && o.ok ? "You picked this. " : "") + esc(o.why) + '</span>' : "") +
        '</span>' + mark + '</button>';
    });
    html += '</div>';
    return html;
  }

  function viewMatch(a, cur) {
    const ans = (cur.response && cur.response.answers) || {};
    let html = '<ol class="match">';
    cur.layout.itemOrder.forEach(function (i) {
      const it = a.items[i];
      const id = "m-" + i;
      const v = ans[i] || "";
      let res = "";
      if (cur.answered) {
        const ok = v === it.a;
        res = '<p class="mres ' + (ok ? "right" : "wrong") + '">' + (ok ? "✓ Correct. " : "✗ You chose " + esc(v) + ". The answer is <strong>" + esc(it.a) + "</strong>. ") + esc(it.why) + '</p>';
      }
      html += '<li><label for="' + id + '">' + esc(it.t) + '</label>' +
        '<select id="' + id + '" data-action="match" data-i="' + i + '" data-fk="' + id + '"' + (cur.answered ? " disabled" : "") + '>' +
        '<option value="">Choose…</option>' + cur.layout.choiceOrder.map(function (ci) {
          const c = a.choices[ci];
          return '<option' + (c === v ? " selected" : "") + '>' + esc(c) + '</option>';
        }).join("") + '</select>' + res + '</li>';
    });
    html += '</ol>';
    return html;
  }

  function viewOrder(a, cur) {
    const order = cur.response.order;
    let html = '<p class="tiny muted">Use the arrow buttons to move steps. First step at the top.</p><ol class="order">';
    order.forEach(function (orig, pos) {
      const st = a.steps[orig];
      let res = "";
      let cls = "";
      if (cur.answered) {
        const ok = orig === pos;
        cls = ok ? " right" : " wrong";
        res = '<span class="why">' + (ok ? "✓ Right spot. " : "✗ This belongs at step " + (orig + 1) + ". ") + esc(st.why || "") + '</span>';
      }
      html += '<li class="ostep' + cls + '"><span class="onum">' + (pos + 1) + '</span><span class="otext">' + esc(st.t) + res + '</span>';
      if (!cur.answered) {
        html += '<span class="omove"><button class="btn icon" data-action="up" data-i="' + orig + '" data-fk="up-' + orig + '" aria-label="Move up: ' + esc(st.t) + '"' + (pos === 0 ? " disabled" : "") + '>↑</button>' +
          '<button class="btn icon" data-action="down" data-i="' + orig + '" data-fk="down-' + orig + '" aria-label="Move down: ' + esc(st.t) + '"' + (pos === order.length - 1 ? " disabled" : "") + '>↓</button></span>';
      }
      html += '</li>';
    });
    html += '</ol>';
    return html;
  }

  function viewRecall(a, cur) {
    if (!cur.revealed) {
      return '<p class="muted">Think of your answer first. Saying it out loud helps.</p>' +
        '<div class="actions"><button class="btn primary big" data-action="reveal" data-fk="reveal" data-autofocus>Reveal answer</button></div>';
    }
    let html = '<div class="reveal" role="status"><p class="eyebrow">Answer</p><p>' + esc(a.back) + '</p></div>';
    if (!cur.answered) {
      html += '<p class="muted">How did you do? Be honest. It only decides when this comes back.</p>' +
        '<div class="btnrow rate"><button class="btn" data-action="rate" data-r="knew" data-fk="r-knew">I knew it</button>' +
        '<button class="btn" data-action="rate" data-r="partly" data-fk="r-partly">Partly</button>' +
        '<button class="btn" data-action="rate" data-r="not" data-fk="r-not">Not yet</button></div>';
    }
    return html;
  }

  function viewFeedback(a, cur, tp) {
    const r = cur.result;
    const s = state.session;
    let head;
    if (a.type === "recall") {
      head = r.outcome === "correct" ? "Great recall." : r.outcome === "assisted" ? "Partly is progress. It'll come back soon." : "No problem. It'll come back in a few minutes.";
    } else if (r.correct) head = pick(PRAISE) + (cur.hintShown ? " (with a hint, which still counts as learning)" : "");
    else head = pick(GENTLE) + (r.score > 0 && r.score < 1 ? " You got " + Math.round(r.score * 100) + "% of it." : "");
    const moreText = a.more || null;
    const open = ui.feedbackMore === a.id;
    let html = '<div class="feedback ' + (r.correct ? "good" : r.outcome === "assisted" ? "mid" : "low") + '" role="status" aria-live="polite">';
    html += '<p class="fhead">' + esc(head) + '</p>';
    if (a.explain) html += '<p>' + esc(a.explain) + '</p>';
    if (moreText || (tp.lesson.more && tp.lesson.more.length)) {
      html += '<button class="btn ghost small" aria-expanded="' + open + '" data-action="feedback-more" data-fk="fmore">' + (open ? "Show less" : "Explain more") + '</button>';
      if (open) {
        html += moreText ? '<p class="more">' + esc(moreText) + '</p>'
          : '<ul class="bullets more">' + tp.lesson.more.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("") + '</ul>';
      }
    }
    html += '<p class="tiny muted">Source: ' + esc(pageRef(a.pages)) + ' · +' + r.xpGained + ' XP</p>';
    html += '</div>';
    html += '<div class="actions">';
    const last = s.index === s.steps.length - 1;
    html += '<button class="btn primary big" data-action="next" data-fk="next" data-autofocus>' + (last ? "Finish sprint" : "Next") + '</button>';
    if (r.correct && a.type !== "recall") {
      html += cur.unsure
        ? '<p class="tiny muted">Marked as unsure. It will come back sooner.</p>'
        : '<button class="btn ghost" data-action="unsure" data-fk="unsure">I guessed / wasn\'t sure</button>';
    }
    if (!last) html += '<button class="btn ghost" data-action="end-early" data-fk="end">Stop here (that\'s fine)</button>';
    html += '</div>';
    return html;
  }

  function viewSummary() {
    const s = state.session;
    const sum = E.summarizeSession(s);
    const brk = E.breakSuggestion(state, now());
    let html = '<section class="stack"><div class="card"><p class="eyebrow">Sprint complete</p><h1 class="h1">Nice stopping point.</h1>';
    html += '<dl class="stats">' + stat("Questions", sum.questions) + stat("Right first go", sum.correctFirstGo) +
      stat("Right with help or unsure", sum.assisted) + stat("Coming back soon", sum.missed) + stat("XP earned", sum.xp) + '</dl>';
    if (sum.missed) html += '<p class="muted">Missed items come back in about 10 minutes, then spread out as you get them right.</p>';
    html += brk ? '<p class="breaknote">' + esc(brk) + '</p>' : '<p class="muted">Want to stop here? Everything is saved. Coming back tomorrow beats cramming today.</p>';
    html += '<div class="btnrow"><button class="btn primary" data-action="again" data-n="1" data-fk="again1" data-autofocus>One more question</button>' +
      '<button class="btn" data-action="again" data-n="3" data-fk="again3">Another 3</button>' +
      '<button class="btn ghost" data-action="done" data-fk="done">I\'m done for now</button></div></div></section>';
    return html;
  }

  // Built domains, for wording like "Domains 1-2" and their combined exam weight.
  function builtDomains() { return idx.domains.filter(function (d) { return d.built; }); }
  function builtCount() { return builtDomains().length; }
  function builtWeight() { return builtDomains().reduce(function (n, d) { return n + d.weight; }, 0); }
  function builtDomainsText() {
    const n = builtDomains().map(function (d) { return parseInt(d.number, 10); });
    if (n.length === 1) return "Domain " + n[0];
    const contiguous = n.every(function (x, i) { return i === 0 || x === n[i - 1] + 1; });
    return "Domains " + (contiguous ? n[0] + "–" + n[n.length - 1] : n.join(", "));
  }

  // ------------------------------------------------------------ glossary
  function viewGlossary() {
    return '<section class="stack"><h1 class="h1">Glossary</h1>' +
      '<p class="muted">Plain-English definitions. Currently covers ' + builtDomainsText() + '. More terms arrive as domains are built.</p>' +
      '<label class="search"><span class="sr">Search the glossary</span><input type="search" id="gq" placeholder="Search terms, e.g. salt, OCSP, PEP" value="' + esc(ui.glossaryQuery) + '" data-fk="gq" autocomplete="off"></label>' +
      '<div id="gresults" aria-live="polite"></div></section>';
  }
  function renderGlossaryResults() {
    const box = document.getElementById("gresults");
    if (!box) return;
    const q = ui.glossaryQuery.trim().toLowerCase();
    const list = S.glossary.filter(function (g) {
      return !q || (g.term + " " + g.def + " " + (g.ex || "")).toLowerCase().indexOf(q) >= 0;
    }).sort(function (a, b) {
      const at = a.term.toLowerCase().indexOf(q) === 0 ? 0 : 1, bt = b.term.toLowerCase().indexOf(q) === 0 ? 0 : 1;
      return (at - bt) || a.term.localeCompare(b.term);
    });
    box.innerHTML = '<p class="tiny muted">' + plural(list.length, "term") + '</p>' + list.map(function (g) {
      return '<div class="card gterm"><h2 class="h3">' + esc(g.term) + '</h2><p>' + esc(g.def) + '</p>' +
        (g.ex ? '<p class="muted"><em>Example:</em> ' + esc(g.ex) + '</p>' : "") +
        '<p class="tiny muted">' + esc(pageRef(g.pages)) + '</p></div>';
    }).join("") || '<p>No matches. Try a shorter word.</p>';
  }

  // ------------------------------------------------------------ progress
  function viewProgress() {
    const t = now();
    const st = E.overallStats(state, idx, t);
    const firsts = st.firstCorrect + st.firstHinted + st.firstWrong;
    let html = '<section class="stack"><h1 class="h1">Progress</h1>';
    html += '<div class="card notice"><strong>This isn\'t a readiness score.</strong> Only ' + builtDomainsText() + ' (about ' + builtWeight() + '% of the exam) ' + (builtCount() === 1 ? 'is' : 'are') + ' built so far. ' +
      'Readiness needs all five domains, retention over weeks, and full-length timed practice. XP measures effort, not mastery.</div>';
    html += '<div class="card"><h2 class="h2">Overall</h2><dl class="stats">' +
      stat("XP (effort)", st.xp) +
      stat("Activities tried", st.attempted + " of " + st.builtTotal + " built") +
      stat("Holding well (7+ day interval)", st.solid) +
      stat("Due now", st.due) +
      stat("Total answers", st.answered) + '</dl>' +
      '<h3 class="h3">First attempts</h3><p class="muted">Your first try at each activity, counted separately from later reviews.</p><dl class="stats">' +
      stat("Right, no help", st.firstCorrect) + stat("Right with a hint (or partial recall)", st.firstHinted) + stat("Missed", st.firstWrong) +
      stat("First-try accuracy", firsts ? pct(st.firstAccuracy) + " of " + firsts : "–") + '</dl></div>';
    html += '<div class="card"><h2 class="h2">By topic</h2><ul class="list">';
    idx.topics.forEach(function (tp) {
      const p = E.topicProgress(state, tp, t);
      html += '<li><a class="row" href="#/topic/' + esc(tp.id) + '"><span><strong>' + esc(tp.objective + " " + tp.title) + '</strong>' +
        '<span class="tiny muted block">First try: ' + p.firstCorrect + ' right · ' + p.firstHinted + ' with help · ' + p.firstWrong + ' missed' + (p.due ? ' · ' + p.due + ' due' : '') + '</span></span>' +
        '<span class="rowmeta">' + progressBar(p.attempted, p.total) + '<span class="tiny">' + p.attempted + '/' + p.total + '</span></span></a></li>';
    });
    html += '</ul></div>';
    html += '<div class="card"><h2 class="h2">Exam domains</h2><ul class="list">' + idx.domains.map(function (d) {
      return '<li class="row static"><span>' + esc(d.number + " " + d.title) + ' <span class="tiny muted">(' + d.weight + '%)</span></span><span class="chip ' + (d.built ? "ok" : "todo") + '">' + (d.built ? "Built" : "Not built yet") + '</span></li>';
    }).join("") + '</ul></div></section>';
    return html;
  }

  // ------------------------------------------------------------ coverage
  function viewCoverage() {
    const src = S.source;
    const deep = src.deepRead;
    function isDeep(p) { return Object.keys(deep).some(function (k) { return p >= deep[k][0] && p <= deep[k][1]; }); }
    const pageSections = {};
    idx.domains.forEach(function (d) { d.sections.forEach(function (sec) { sec.pdfPages.forEach(function (p) { (pageSections[p] = pageSections[p] || []).push(sec.objective + " " + sec.title); }); }); });
    const builtPages = new Set();
    idx.topics.forEach(function (t) { t.pages.forEach(function (p) { builtPages.add(p); }); });
    let counts = { built: 0, mapped: 0, none: 0 };
    for (let p = 1; p <= src.totalPdfPages; p++) {
      if (src.nonContentPages[p]) counts.none++; else if (builtPages.has(p)) counts.built++; else counts.mapped++;
    }
    let html = '<section class="stack"><a class="back" href="#/library">← Topics</a><h1 class="h1">Coverage checklist</h1>';
    html += '<div class="card"><p><strong>Exam:</strong> ' + esc(src.exam) + '<br><span class="tiny muted">' + esc(src.examEvidence) + '</span></p>' +
      '<p><strong>Source:</strong> ' + esc(src.title) + ', ' + esc(src.version) + '. The PDF itself isn\'t included in this app.</p>' +
      '<dl class="stats">' + stat("Content pages with built lessons and practice", counts.built) +
      stat("Content pages mapped, not built yet", counts.mapped) + stat("Non-study pages (cover, contents, promo)", counts.none) + '</dl></div>';
    html += '<div class="card"><h2 class="h2">Flags and unclear spots</h2><ul class="bullets">' + src.flags.map(function (f) {
      return '<li>' + esc(f.text) + ' <span class="tiny muted">(' + esc(pageRef(f.pages.length === 2 && f.pages[1] - f.pages[0] > 2 ? range(f.pages) : f.pages)) + ')</span></li>';
    }).join("") + '</ul></div>';
    const groups = [{ name: "Front matter", from: 1, to: 9 }].concat(idx.domains.map(function (d) {
      return { name: d.number + " " + d.title, from: d.pdfRange[0], to: d.pdfRange[1] };
    })).concat([{ name: "Back matter", from: 106, to: 107 }]);
    groups.forEach(function (g) {
      html += '<details class="card"><summary><strong>' + esc(g.name) + '</strong> <span class="tiny muted">PDF ' + g.from + '–' + g.to + '</span></summary><ul class="pages">';
      for (let p = g.from; p <= g.to; p++) {
        let status, cls;
        if (src.nonContentPages[p]) { status = src.nonContentPages[p]; cls = "none"; }
        else if (builtPages.has(p)) { status = isDeep(p) ? "Read in detail · content built" : "Content built"; cls = "ok"; }
        else { status = "Text extracted and mapped · not built yet"; cls = "todo"; }
        const heads = (S.map.pageHeadings[p] || []).slice(0, 12);
        html += '<li class="' + cls + '"><span class="pnum">PDF ' + p + (p >= 10 && p <= 105 ? ' · p.' + (p - OFFSET) : "") + '</span>' +
          '<span><span class="pstat">' + esc(status) + '</span>' +
          (pageSections[p] ? '<span class="tiny block">' + esc(pageSections[p].join(" | ")) + '</span>' : "") +
          (heads.length && !src.nonContentPages[p] ? '<span class="tiny muted block">Headings: ' + esc(heads.join(", ")) + '</span>' : "") +
          '</span></li>';
      }
      html += '</ul></details>';
    });
    html += '</section>';
    return html;
  }

  // ------------------------------------------------------------ settings
  function viewSettings() {
    let html = '<section class="stack"><h1 class="h1">Settings and backup</h1>';
    html += '<div class="card notice"><strong>Your progress lives only in this browser.</strong> It doesn\'t sync between devices or browsers, and clearing site data erases it. ' +
      'Export a backup now and then, and import it on another device to carry on there.</div>';
    html += '<div class="card"><h2 class="h2">Backup</h2><div class="btnrow">' +
      '<button class="btn primary" data-action="export" data-fk="export">Export progress (JSON)</button>' +
      '<label class="btn filebtn" data-fk="importlbl">Import a backup<input type="file" accept="application/json,.json" id="importfile" class="sr"></label></div>';
    if (ui.importError) html += '<p class="warn" role="alert">' + esc(ui.importError) + '</p>';
    if (ui.importPreview) {
      html += '<div class="card soft" role="status"><p>This backup has <strong>' + ui.importPreview.xp + ' XP</strong> and <strong>' + Object.keys(ui.importPreview.cards).length + '</strong> practiced activities. ' +
        'It will replace what\'s in this browser now (' + state.xp + ' XP). A copy of your current progress is kept as a safety net.</p>' +
        '<div class="btnrow"><button class="btn primary" data-action="import-confirm" data-fk="ic" data-autofocus>Replace with backup</button><button class="btn ghost" data-action="import-cancel" data-fk="icx">Cancel</button></div></div>';
    }
    if (ui.flash) html += '<p class="ok" role="status">' + esc(ui.flash) + '</p>';
    html += '</div>';
    html += '<div class="card"><h2 class="h2">Comfort</h2>' +
      '<label class="toggle"><input type="checkbox" data-action="pref-focus" data-fk="pf"' + (state.prefs.focusMode ? " checked" : "") + '> Focus mode during sprints (hides the top navigation)</label>' +
      '<fieldset class="themes"><legend>Theme</legend>' + ["auto", "light", "dark"].map(function (t) {
        return '<label><input type="radio" name="theme" value="' + t + '" data-action="pref-theme" data-fk="th-' + t + '"' + (state.prefs.theme === t ? " checked" : "") + '> ' + t[0].toUpperCase() + t.slice(1) + '</label>';
      }).join("") + '</fieldset>' +
      '<p class="tiny muted">No timers, sounds, streaks or leaderboards. Keyboard: 1–9 picks an answer, H shows a hint, Enter checks or moves on.</p></div>';
    html += '<div class="card"><h2 class="h2">Start over</h2>';
    html += ui.confirmReset
      ? '<p>This erases all progress in this browser. Export first if you might want it back.</p><div class="btnrow"><button class="btn danger" data-action="reset-confirm" data-fk="rc">Yes, erase my progress</button><button class="btn ghost" data-action="reset-cancel" data-fk="rcx" data-autofocus>Keep it</button></div>'
      : '<button class="btn ghost" data-action="reset" data-fk="reset">Reset progress…</button>';
    html += '</div>';
    html += '<p class="tiny muted"><a href="#/coverage">Coverage checklist and source notes</a> · Content: ' + esc(S.source.title) + ', ' + esc(S.source.version) + '. Lessons and questions are original. This is a personal study tool.</p></section>';
    return html;
  }

  // ------------------------------------------------------------ actions
  function startSprint(mode, size, opts) {
    const s = E.startSession(state, idx, size, mode, opts || {}, now());
    ui.recommend = null;
    if (!s) { ui.flash = "Nothing to review yet. Start a small sprint first and reviews will appear here."; save(); go("home"); render(); return; }
    save();
    go("sprint");
  }

  function doContinue() {
    if (state.session && !state.session.done) { go("sprint"); return; }
    const cur = E.currentTopic(state, idx);
    if (cur) startSprint("topic", state.prefs.sprintSize, { topicId: cur.id });
    else startSprint("review", state.prefs.sprintSize);
  }

  function handle(action, el) {
    const s = state.session;
    const cur = s && s.current;
    const t = now();
    switch (action) {
      case "size": state.prefs.sprintSize = +el.getAttribute("data-n"); save(); render(); break;
      case "start-mixed": startSprint("mixed", state.prefs.sprintSize); break;
      case "start-topic": startSprint("topic", +el.getAttribute("data-n"), { topicId: el.getAttribute("data-topic") }); break;
      case "resume": go("sprint"); break;
      case "continue": doContinue(); break;
      case "review": startSprint("review", state.prefs.sprintSize); break;
      case "recommend": ui.recommend = E.recommendNext(state, idx, t); render(); break;
      case "do-recommend": {
        const rec = ui.recommend || E.recommendNext(state, idx, t);
        if (rec.action === "resume") go("sprint");
        else if (rec.action === "topic") startSprint("topic", state.prefs.sprintSize, { topicId: rec.topicId });
        else startSprint("review", state.prefs.sprintSize);
        break;
      }
      case "toggle-lesson-more": {
        const key = el.getAttribute("data-key");
        ui[key] = ui[key] === el.getAttribute("data-topic") ? null : el.getAttribute("data-topic");
        render(); break;
      }
      case "toggle-focus": state.prefs.focusMode = !state.prefs.focusMode; save(); render(); break;
      case "pause": s.updatedAt = t; save(); go("home"); break;
      case "pick": {
        if (!cur || cur.answered) return;
        const i = +el.getAttribute("data-i");
        const a = idx.activities[s.steps[s.index].id];
        if (a.type === "multi") {
          const arr = cur.response.selected;
          const k = arr.indexOf(i);
          if (k >= 0) arr.splice(k, 1); else arr.push(i);
        } else cur.response = { selected: i };
        save(); render(); break;
      }
      case "up": case "down": {
        if (!cur || cur.answered) return;
        const i = +el.getAttribute("data-i");
        const ord = cur.response.order;
        const pos = ord.indexOf(i);
        const to = action === "up" ? pos - 1 : pos + 1;
        if (to < 0 || to >= ord.length) return;
        ord[pos] = ord[to]; ord[to] = i;
        save(); render();
        // keep focus on the moved item, even if that button became disabled
        const fk = document.querySelector('[data-fk="' + action + "-" + i + '"]');
        if (fk && fk.disabled) { const other = document.querySelector('[data-fk="' + (action === "up" ? "down" : "up") + "-" + i + '"]'); if (other) other.focus(); }
        break;
      }
      case "hint": if (cur && !cur.answered) { cur.hintShown = true; save(); render(); } break;
      case "check": {
        if (!cur || cur.answered) return;
        const a = idx.activities[s.steps[s.index].id];
        if (!canCheck(a, cur)) return;
        E.submitCurrent(state, idx, t); ui.feedbackMore = null; save(); render(); break;
      }
      case "reveal": if (cur) { cur.revealed = true; save(); render(); } break;
      case "rate": {
        if (!cur || cur.answered) return;
        cur.response = { rating: el.getAttribute("data-r") };
        E.submitCurrent(state, idx, t); ui.feedbackMore = null; save(); render(); break;
      }
      case "unsure": E.flagUnsure(state, t); save(); render(); break;
      case "feedback-more": {
        const id = s.steps[s.index].id;
        if (ui.feedbackMore === id) ui.feedbackMore = null;
        else { ui.feedbackMore = id; const xp = E.markExplainMore(state, id); s.xp += xp; }
        save(); render(); break;
      }
      case "next": {
        if (!s) return;
        const step = s.steps[s.index];
        if (step.kind === "activity" && !cur.answered) return;
        ui["sprint-more"] = null; ui.feedbackMore = null;
        E.advance(state, idx, t);
        save(); render(); window.scrollTo(0, 0); break;
      }
      case "end-early": {
        s.steps = s.steps.slice(0, s.index + 1);
        E.advance(state, idx, t);
        save(); render(); break;
      }
      case "again": state.session = null; startSprint("mixed", +el.getAttribute("data-n")); break;
      case "done": state.session = null; save(); go("home"); break;
      case "export": exportProgress(); break;
      case "import-confirm": {
        try { localStorage.setItem(BACKUP_KEY, E.serialize(state)); } catch (e) { /* ignore */ }
        state = ui.importPreview; ui.importPreview = null; ui.flash = "Backup imported. Welcome back."; save(); render(); break;
      }
      case "import-cancel": ui.importPreview = null; render(); break;
      case "reset": ui.confirmReset = true; render(); break;
      case "reset-cancel": ui.confirmReset = false; render(); break;
      case "reset-confirm": {
        try { localStorage.setItem(BACKUP_KEY, E.serialize(state)); } catch (e) { /* ignore */ }
        state = E.defaultState(); ui.confirmReset = false; ui.flash = "Progress reset. A safety copy was kept in this browser."; save(); render(); break;
      }
    }
  }

  function exportProgress() {
    const text = E.exportState(state, now());
    const blob = new Blob([text], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "secplus701-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    ui.flash = "Backup downloaded. Keep it somewhere safe, like cloud storage or email to yourself.";
    render();
  }

  // ------------------------------------------------------------ events
  document.addEventListener("click", function (e) {
    const el = e.target.closest("[data-action]");
    if (!el || el.tagName === "SELECT" || el.tagName === "INPUT") return;
    if (el.disabled) return;
    e.preventDefault();
    handle(el.getAttribute("data-action"), el);
  });

  document.addEventListener("change", function (e) {
    const el = e.target;
    const action = el.getAttribute && el.getAttribute("data-action");
    if (action === "match") {
      const cur = state.session && state.session.current;
      if (!cur || cur.answered) return;
      cur.response.answers[+el.getAttribute("data-i")] = el.value;
      save(); render();
    } else if (action === "pref-focus") {
      state.prefs.focusMode = el.checked; save();
    } else if (action === "pref-theme") {
      state.prefs.theme = el.value; save(); applyTheme();
    } else if (el.id === "importfile" && el.files && el.files[0]) {
      const f = el.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        try { ui.importPreview = E.importState(String(reader.result)); ui.importError = null; }
        catch (err) { ui.importPreview = null; ui.importError = err.message; }
        ui.flash = null; render();
      };
      reader.readAsText(f);
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "gq") { ui.glossaryQuery = e.target.value; renderGlossaryResults(); }
  });

  document.addEventListener("keydown", function (e) {
    if (route().name !== "sprint" || !state.session || state.session.done) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "select" || tag === "input" || tag === "textarea" || e.altKey || e.ctrlKey || e.metaKey) return;
    const s = state.session, cur = s.current, step = s.steps[s.index];
    if (step.kind === "activity" && !cur.answered) {
      const a = idx.activities[step.id];
      if ((a.type === "choice" || a.type === "multi") && /^[1-9]$/.test(e.key)) {
        const orig = cur.layout.optionOrder[+e.key - 1];
        if (orig != null) { e.preventDefault(); const b = document.querySelector('[data-fk="opt-' + orig + '"]'); if (b) b.focus(); handle("pick", { getAttribute: function () { return String(orig); } }); }
        return;
      }
      if (e.key === "h" || e.key === "H") { e.preventDefault(); handle("hint"); return; }
    }
    if (e.key === "Enter" && tag !== "button" && tag !== "a" && tag !== "label") {
      e.preventDefault();
      if (step.kind === "lesson" || cur.answered) handle("next");
      else handle("check");
    }
  });

  window.addEventListener("hashchange", function () { ui.recommend = null; ui.importError = null; ui.flash = null; ui.confirmReset = false; render(); document.getElementById("main").focus({ preventScroll: true }); });
  window.addEventListener("storage", function (e) { if (e.key === KEY) { state = loadState(); render(); } });

  // test hook (read-only snapshot) for automated checks
  window.__secplus = { getState: function () { return JSON.parse(E.serialize(state)); }, idx: idx };

  render();
})();
