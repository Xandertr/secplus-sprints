// Sub-heading coverage: every heading printed on a page of a built domain must be
// taught somewhere in a topic that covers that page (lesson or activity text), or be
// listed in SECPLUS.source.headingAliases (taught under other words, verified by keyword)
// or SECPLUS.source.coverageSkips (deliberately not taught, with a reason).
const test = require("node:test");
const assert = require("node:assert");
const load = require("./load");
const { S, idx } = load();

const STOP = new Set("the and for with from that this your what into over than when have more other about their there these those using used uses based types type some only also data".split(" "));
const norm = s => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9+./ -]/g, " ");
const words = s => norm(s).split(/[\s/-]+/).filter(w => w.length >= 3 && !STOP.has(w));
const stem = w => w.replace(/(ies|es|s|ing|ed)$/, "");

function topicText(t) {
  const parts = [t.title, t.section, ...t.lesson.summary, ...(t.lesson.more || [])];
  for (const a of t.activities) {
    parts.push(a.prompt || "", a.front || "", a.back || "", a.explain || "", a.more || "", a.hint || "");
    if (a.artifact) parts.push(a.artifact.body);
    for (const o of a.options || []) parts.push(o.t, o.why);
    for (const it of a.items || []) parts.push(it.t, it.a, it.why);
    for (const c of a.choices || []) parts.push(c);
    for (const st of a.steps || []) parts.push(st.t, st.why || "");
  }
  return norm(parts.join(" "));
}

function covered(heading, text) {
  const acr = (heading.match(/\(([A-Za-z0-9 /.-]{2,})\)/) || [])[1];
  if (acr && text.includes(norm(acr).trim())) return true;
  const ws = words(heading.replace(/\(.*?\)/g, " "));
  if (!ws.length) return true;
  const hit = ws.filter(w => text.includes(stem(w))).length;
  return hit / ws.length >= 0.6;
}

const headingSection = require("./heading-sections.json");

test("every sub-heading on built pages is taught (in its own section's topic) or deliberately skipped", () => {
  const skips = S.source.coverageSkips || [];
  // headings whose content is taught under other words: every taughtAs term must appear in the topic
  const aliases = S.source.headingAliases || [];
  const isSkipped = (p, h) => skips.some(s => s.page === p && s.heading === h);
  for (const s of skips) assert.ok(s.reason && s.reason.length > 10, "skip needs a reason: " + s.heading);
  const topicBySection = {};
  for (const t of idx.topics) topicBySection[t.objective + " " + t.section] = t;
  const missing = [];
  let checked = 0, skipped = 0;
  for (let p = 10; p <= 105; p++) {
    for (const h of S.map.pageHeadings[p] || []) {
      const sec = (headingSection[p] || {})[h];
      const t = sec && topicBySection[sec];
      if (!t) continue; // section not built yet
      if (isSkipped(p, h)) { skipped++; continue; }
      checked++;
      const text = topicText(t);
      const alias = aliases.find(x => x.page === p && x.heading === h);
      if (alias) {
        const absent = alias.taughtAs.filter(k => !text.includes(norm(k).trim()));
        if (absent.length) missing.push(`PDF ${p} [${sec}]: ${h} (alias terms not found: ${absent.join(", ")})`);
      } else if (!covered(h, text)) missing.push(`PDF ${p} [${sec}]: ${h}`);
    }
  }
  console.log(`  sub-headings checked: ${checked}, deliberately skipped: ${skipped}, uncovered: ${missing.length}`);
  if (missing.length) console.log("  " + missing.join("\n  "));
  assert.deepStrictEqual(missing, []);
});
