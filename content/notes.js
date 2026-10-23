/*
 * Source facts, coverage status and flags about the course notes.
 * Everything here was checked against the PDF itself (text layer plus rendered page images where noted).
 */
window.SECPLUS = window.SECPLUS || {};
window.SECPLUS.source = {
  title: "Professor Messer's SY0-701 CompTIA Security+ Course Notes",
  version: "v1.07 (First Edition: October 2023)",
  exam: "CompTIA Security+ SY0-701",
  examEvidence: "Title page (PDF p.2), copyright page (PDF p.3) and introduction (PDF p.8) all name SY0-701.",
  totalPdfPages: 107,
  printedPageOffset: 9, // printed page number = PDF page - 9 (content runs PDF 10-105 = printed 1-96)
  nonContentPages: {
    "1": "Front cover (image)",
    "2": "Title page",
    "3": "Copyright and version",
    "4": "Table of contents",
    "5": "Table of contents",
    "6": "Table of contents",
    "7": "Logo page, no text",
    "8": "Introduction, exam format and domain weights",
    "9": "Logo page, no text",
    "106": "Promotional page (training links)",
    "107": "Back cover (image)"
  },
  // Pages read in detail, including rendered diagram images, to write built content.
  deepRead: { d1: [10, 26] },
  flags: [
    { pages: [5, 8], text: "Domain names differ inside the notes. The table of contents says '4.0 - Operations and Incident Response' and '5.0 - Governance, Risk, and Compliance'. The introduction (PDF p.8) says 'Security Operations' and 'Security Program Management and Oversight'. This app uses the introduction's names." },
    { pages: [8], text: "Domain weights (12/22/18/28/20%) come from the introduction. The notes point to CompTIA's official objectives for the full list. The app hasn't checked against that external document." },
    { pages: [6, 74, 75], text: "The table of contents lists '4.3 - Penetration Testing' twice (printed pp. 65 and 66). In the body it's one section spanning PDF pp. 74-75, treated here as one topic." },
    { pages: [15], text: "Under 'Policy Administrator' there's a stray fragment ('address, etc.') that seems to belong to the adaptive identity bullet on PDF p.14 (IP address, etc.). It looks like a layout glitch, so the app doesn't treat it as a separate fact." },
    { pages: [24], text: "Blockchain has only a few bullets. The step-by-step process is in a six-panel diagram, so the order activity paraphrases the diagram, which was viewed as an image." },
    { pages: [12, 15, 19, 21, 22, 23, 26], text: "These Domain 1 pages contain diagrams. Their labels were read from the text layer, and pages 15, 22, 23 and 24 were also checked as rendered images." },
    { pages: [27, 105], text: "Domains 2-5: text was extracted and mapped to sections, but not yet read in detail or turned into lessons. The headings listed in the coverage view were extracted automatically and may miss diagram-only content." }
  ]
};
