// Prints CONTENT_MAP.md from the content files. Run: node scripts/content-map.js > CONTENT_MAP.md
const load = require("../tests/load");
const { S, idx } = load();
const off = S.source.printedPageOffset;
const pr = ps => ps.length > 1 ? `${ps[0]}–${ps[ps.length - 1]}` : `${ps[0]}`;
const out = [];
out.push("# Content map: Security+ SY0-701", "");
out.push(`Source: ${S.source.title}, ${S.source.version}. ${S.source.examEvidence}`, "");
out.push(`Page numbers are PDF pages, with printed page numbers in brackets (printed = PDF − ${off}). Study content runs PDF 10–105. The other PDF pages are ${Object.keys(S.source.nonContentPages).join(", ")} (cover, front matter, promo).`, "");
let built = 0, total = 0;
for (const d of idx.domains) {
  out.push(`## ${d.number} ${d.title} (${d.weight}%), PDF ${pr(d.pdfRange)} [${d.pdfRange[0] - off}–${d.pdfRange[1] - off}]: ${d.built ? "BUILT" : "not built yet"}`, "");
  out.push("| Obj. | Section | PDF pages | Status | Activities |", "|---|---|---|---|---|");
  for (const s of d.sections) {
    total++;
    const t = d.topics.find(t => t.objective === s.objective && t.section === s.title);
    if (t) built++;
    out.push(`| ${s.objective} | ${s.title} | ${s.pdfPages.join(", ")} | ${t ? "✅ built" : "⬜ not built yet"} | ${t ? t.activities.length : "–"} |`);
  }
  out.push("");
}
out.push(`**Sections built: ${built} of ${total}.** Activities: ${Object.keys(idx.activities).length}. Glossary terms: ${S.glossary.length}.`, "");
out.push("## Flags and unclear material", "");
for (const f of S.source.flags) out.push(`- ${f.text} (PDF ${f.pages.join(", ")})`);
console.log(out.join("\n"));
