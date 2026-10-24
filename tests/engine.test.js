// Engine checks: scoring, spaced review, sprint building, pause/resume, export/import.
const test = require("node:test");
const assert = require("node:assert");
const load = require("./load");
const { E, idx } = load();
const T0 = Date.UTC(2026, 9, 23, 9, 0, 0);
const A = id => idx.activities[id];

test("choice grading uses original indexes regardless of shuffle", () => {
  const a = A("d1-pki-a2");
  const ok = a.options.findIndex(o => o.ok);
  assert.strictEqual(E.grade(a, { selected: ok }).correct, true);
  assert.strictEqual(E.grade(a, { selected: (ok + 1) % a.options.length }).correct, false);
  const layout = E.presentActivity(a, E.makeRng(7));
  assert.deepStrictEqual([...layout.optionOrder].sort(), [0, 1, 2, 3]);
});

test("multi, match and order grading give partial credit and exact correctness", () => {
  const m = A("d1-hashing-a2");
  const right = m.options.map((o, i) => o.ok ? i : -1).filter(i => i >= 0);
  assert.strictEqual(E.grade(m, { selected: right }).correct, true);
  const partial = E.grade(m, { selected: right.slice(1) });
  assert.strictEqual(partial.correct, false);
  assert.ok(partial.score > 0 && partial.score < 1);

  const mt = A("d1-cia-a1");
  const all = {}; mt.items.forEach((it, i) => all[i] = it.a);
  assert.strictEqual(E.grade(mt, { answers: all }).correct, true);
  const oneWrong = Object.assign({}, all, { 0: "Availability" });
  const g = E.grade(mt, { answers: oneWrong });
  assert.strictEqual(g.correct, false); assert.strictEqual(g.parts[0], false); assert.strictEqual(g.parts[1], true);

  const o = A("d1-aaa-a1");
  assert.strictEqual(E.grade(o, { order: [0, 1, 2, 3] }).correct, true);
  const swapped = E.grade(o, { order: [1, 0, 2, 3] });
  assert.strictEqual(swapped.correct, false); assert.strictEqual(swapped.score, 0.5);
});

test("order activities never start already solved", () => {
  for (let seed = 1; seed < 300; seed++) {
    const l = E.presentActivity(A("d1-techchange-a3"), E.makeRng(seed));
    assert.ok(!l.stepOrder.every((v, i) => v === i), "solved at seed " + seed);
  }
});

test("spaced repetition: wrong comes back in ~10 min, correct grows, assisted grows slowly", () => {
  let c = E.schedule(null, "wrong", T0);
  assert.strictEqual(c.due, T0 + 10 * E.MIN); assert.strictEqual(c.interval, 0);
  c = E.schedule(c, "correct", T0); assert.strictEqual(c.interval, 1);
  c = E.schedule(c, "correct", T0); assert.strictEqual(c.interval, 3);
  c = E.schedule(c, "correct", T0); assert.strictEqual(c.interval, 8);
  const a = E.schedule(c, "assisted", T0); assert.strictEqual(a.interval, 10);
  const w = E.schedule(c, "wrong", T0); assert.strictEqual(w.interval, 0); assert.strictEqual(w.lapses, 2);
});

test("first-attempt accuracy is tracked separately from hinted answers and reviews", () => {
  const st = E.defaultState();
  const ok = id => ({ correct: true, score: 1 });
  E.recordAnswer(st, "d1-pki-a2", ok(), { usedHint: false }, T0);
  E.recordAnswer(st, "d1-pki-a3", ok(), { usedHint: true }, T0);
  E.recordAnswer(st, "d1-pki-a1", { correct: false, score: 0.4 }, {}, T0);
  // later correct answer must not rewrite the first attempt
  E.recordAnswer(st, "d1-pki-a1", { correct: true, score: 1 }, {}, T0 + 11 * E.MIN);
  const p = E.topicProgress(st, idx.topicById["d1-pki"], T0 + 11 * E.MIN);
  assert.strictEqual(p.firstCorrect, 1); assert.strictEqual(p.firstHinted, 1); assert.strictEqual(p.firstWrong, 1);
  assert.strictEqual(st.first["d1-pki-a1"].outcome, "wrong");
  // XP: participation counts even when wrong
  assert.ok(st.xp >= 5 * 4);
});

test("hint use earns XP (no punishment) but is recorded as assisted", () => {
  const st = E.defaultState();
  const r1 = E.recordAnswer(st, "d1-cia-a2", { correct: true, score: 1 }, { usedHint: true }, T0);
  assert.strictEqual(r1.outcome, "assisted");
  assert.strictEqual(r1.xpGained, E.XP.attempt + E.XP.hint);
});

test("mixed sprint: lesson first for new topic, then requested number of questions", () => {
  const st = E.defaultState();
  const steps = E.buildSprint(st, idx, 3, "mixed", {}, T0);
  assert.strictEqual(steps[0].kind, "lesson");
  assert.strictEqual(steps[0].topicId, idx.topics[0].id);
  assert.strictEqual(steps.filter(s => s.kind === "activity").length, 3);
  for (const n of [1, 5]) assert.strictEqual(E.buildSprint(st, idx, n, "mixed", {}, T0).filter(s => s.kind === "activity").length, n);
});

test("due reviews are mixed into new sprints and missed items return", () => {
  const st = E.defaultState();
  E.startSession(st, idx, 1, "mixed", {}, T0, E.makeRng(1));
  E.advance(st, idx, T0); // lesson
  const id = st.session.steps[st.session.index].id;
  const a = A(id);
  // answer wrong on purpose
  if (a.type === "choice") st.session.current.response = { selected: a.options.findIndex(o => !o.ok) };
  else if (a.type === "recall") st.session.current.response = { rating: "not" };
  else if (a.type === "match") st.session.current.response = { answers: {} };
  E.submitCurrent(st, idx, T0);
  E.advance(st, idx, T0);
  assert.ok(st.session.done);
  // not due immediately
  assert.strictEqual(E.dueItems(st, idx, T0 + 5 * E.MIN).length, 0);
  // due after 10 minutes and included in the next mixed sprint
  const later = T0 + 11 * E.MIN;
  assert.deepStrictEqual(E.dueItems(st, idx, later), [id]);
  const steps = E.buildSprint(st, idx, 3, "mixed", {}, later);
  assert.ok(steps.some(s => s.id === id && s.review));
  assert.ok(steps.some(s => s.kind === "activity" && !s.review), "new material is mixed in");
  const rec = E.recommendNext(st, idx, later);
  assert.ok(rec.action === "topic" || rec.action === "review");
});

test("pause/resume: a serialized session restores the exact step, layout and selection", () => {
  const st = E.defaultState();
  E.startSession(st, idx, 3, "mixed", {}, T0, E.makeRng(42));
  E.advance(st, idx, T0, E.makeRng(43)); // past the lesson
  const cur = st.session.current;
  const a = A(st.session.steps[st.session.index].id);
  if (a.type === "choice") cur.response = { selected: cur.layout.optionOrder[2] };
  cur.hintShown = true;
  const restored = E.migrate(JSON.parse(E.serialize(st)));
  assert.strictEqual(restored.session.index, st.session.index);
  assert.deepStrictEqual(restored.session.current, cur);
  assert.deepStrictEqual(restored.session.steps, st.session.steps);
});

test("'I wasn't sure' turns a correct answer into a shorter review interval", () => {
  const st = E.defaultState();
  E.startSession(st, idx, 1, "topic", { topicId: "d1-pki" }, T0, E.makeRng(3));
  E.advance(st, idx, T0);
  const id = st.session.steps[st.session.index].id;
  const a = A(id);
  assert.strictEqual(a.type, "match");
  const ans = {}; a.items.forEach((it, i) => ans[i] = it.a);
  st.session.current.response = { answers: ans };
  E.submitCurrent(st, idx, T0);
  assert.strictEqual(st.cards[id].last, "correct");
  E.flagUnsure(st, T0);
  assert.strictEqual(st.cards[id].last, "assisted");
  assert.strictEqual(st.cards[id].interval, 1);
  assert.strictEqual(st.cards[id].seen, 1);
});

test("export/import round-trips and rejects bad files", () => {
  const st = E.defaultState();
  E.recordAnswer(st, "d1-pki-a2", { correct: true, score: 1 }, {}, T0);
  E.markLessonSeen(st, "d1-pki", T0);
  const text = E.exportState(st, T0);
  const back = E.importState(text);
  assert.deepStrictEqual(back.cards, st.cards);
  assert.strictEqual(back.xp, st.xp);
  assert.deepStrictEqual(back.topics, st.topics);
  assert.throws(() => E.importState("not json"), /valid JSON/);
  assert.throws(() => E.importState(JSON.stringify({ hello: 1 })), /isn't a progress backup/);
  assert.throws(() => E.importState(JSON.stringify({ app: "secplus-701-study", state: { xp: 1, cards: { x: { due: "soon" } } } })), /malformed/);
});

test("review mode with nothing practiced returns no sprint", () => {
  const st = E.defaultState();
  assert.strictEqual(E.startSession(st, idx, 3, "review", {}, T0), null);
});

test("domain sprint only uses that domain, starts with its first chapter, and falls back to its own weak items", () => {
  const st = E.defaultState();
  const inD3 = id => idx.topicById[idx.activities[id].topicId].domainId === "d3";
  const steps = E.buildSprint(st, idx, 5, "domain", { domainId: "d3" }, T0);
  const acts = steps.filter(s => s.kind === "activity");
  assert.strictEqual(acts.length, 5);
  assert.ok(acts.every(s => inD3(s.id)));
  assert.strictEqual(steps[0].kind, "lesson");
  assert.strictEqual(steps[0].topicId, idx.topics.find(t => t.domainId === "d3").id);
  // every domain can build a full sprint from a fresh start
  for (const d of idx.domains) assert.strictEqual(E.buildSprint(st, idx, 3, "domain", { domainId: d.id }, T0).filter(s => s.kind === "activity").length, 3, d.id);
});
