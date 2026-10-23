// Content checks: structure, explanations, page references, answer-length bias.
const test = require("node:test");
const assert = require("node:assert");
const load = require("./load");
const { S, idx } = load();

const FIRST = 10, LAST = 105;

test("every built topic maps to a real section of the notes", () => {
  for (const d of idx.domains) for (const t of d.topics) {
    const sec = d.sections.find(s => s.objective === t.objective && s.title === t.section);
    assert.ok(sec, `${t.id}: no section ${t.objective} ${t.section}`);
    for (const p of t.pages) assert.ok(sec.pdfPages.includes(p), `${t.id}: page ${p} not in section pages ${sec.pdfPages}`);
  }
});

test("every section in a built domain has a topic (no silent gaps)", () => {
  for (const d of idx.domains.filter(d => d.built)) for (const s of d.sections) {
    assert.ok(d.topics.some(t => t.objective === s.objective && t.section === s.title), `missing topic for ${s.objective} ${s.title}`);
  }
});

test("activities are well formed, explained and page-referenced", () => {
  const ids = new Set();
  for (const t of idx.topics) {
    assert.ok(t.lesson && t.lesson.summary.length >= 2, `${t.id} lesson`);
    for (const p of t.lesson.pages) assert.ok(t.pages.includes(p), `${t.id} lesson page ${p}`);
    for (const a of t.activities) {
      assert.ok(!ids.has(a.id), "duplicate id " + a.id); ids.add(a.id);
      assert.ok(a.pages && a.pages.length, a.id + " pages");
      for (const p of a.pages) {
        assert.ok(p >= FIRST && p <= LAST, a.id + " page out of range");
        assert.ok(t.pages.includes(p), `${a.id}: page ${p} outside topic pages ${t.pages}`);
      }
      if (a.type !== "recall") { assert.ok(a.hint, a.id + " hint"); assert.ok(a.explain, a.id + " explain"); assert.ok(a.prompt, a.id + " prompt"); }
      if (a.type === "choice") {
        assert.strictEqual(a.options.filter(o => o.ok).length, 1, a.id + " exactly one correct");
        assert.ok(a.options.length >= 3);
        for (const o of a.options) assert.ok(o.why, a.id + " option why: " + o.t);
      } else if (a.type === "multi") {
        assert.ok(a.options.filter(o => o.ok).length >= 1);
        for (const o of a.options) assert.ok(o.why, a.id + " option why");
      } else if (a.type === "match") {
        for (const it of a.items) { assert.ok(a.choices.includes(it.a), `${a.id}: answer ${it.a} not in choices`); assert.ok(it.why); }
      } else if (a.type === "order") {
        assert.ok(a.steps.length >= 3, a.id + " order needs >=3 steps");
      } else if (a.type === "recall") {
        assert.ok(a.front && a.back);
      } else assert.fail("unknown type " + a.type);
    }
  }
});

test("correct answer length gives no clue (no length rank dominates)", () => {
  const choice = idx.topics.flatMap(t => t.activities).filter(a => a.type === "choice");
  const ranks = [0, 0, 0, 0, 0];
  for (const a of choice) {
    const lens = a.options.map(o => o.t.length);
    const ok = lens[a.options.findIndex(o => o.ok)];
    ranks[lens.filter(x => x > ok).length]++;
  }
  console.log("  length rank of the correct option (0 = longest):", ranks.join(" / "), "of", choice.length);
  for (const r of ranks) assert.ok(r / choice.length <= 0.45, "one length rank dominates: " + ranks);
});

test("activity format mix covers all requested activity styles", () => {
  const acts = idx.topics.flatMap(t => t.activities);
  const formats = new Set(acts.map(a => a.format));
  for (const f of ["Scenario", "Troubleshoot", "Next action", "Compare", "Match", "Order", "Recall", "Investigate"]) assert.ok(formats.has(f), "missing format " + f);
  console.log("  activities:", acts.length, "by type:", JSON.stringify(acts.reduce((m, a) => (m[a.type] = (m[a.type] || 0) + 1, m), {})));
});

test("glossary entries reference real content pages", () => {
  for (const g of S.glossary) { assert.ok(g.def); for (const p of g.pages) assert.ok(p >= FIRST && p <= LAST, g.term); }
});
