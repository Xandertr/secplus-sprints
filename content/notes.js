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
  deepRead: { d1: [10, 26], d2: [27, 51], d3: [51, 67] },
  flags: [
    { pages: [5, 8], text: "Domain names differ inside the notes. The table of contents says '4.0 - Operations and Incident Response' and '5.0 - Governance, Risk, and Compliance'. The introduction (PDF p.8) says 'Security Operations' and 'Security Program Management and Oversight'. This app uses the introduction's names." },
    { pages: [8], text: "Domain weights (12/22/18/28/20%) come from the introduction. The notes point to CompTIA's official objectives for the full list. The app hasn't checked against that external document." },
    { pages: [6, 74, 75], text: "The table of contents lists '4.3 - Penetration Testing' twice (printed pp. 65 and 66). In the body it's one section spanning PDF pp. 74-75, treated here as one topic." },
    { pages: [15], text: "Under 'Policy Administrator' there's a stray fragment ('address, etc.') that seems to belong to the adaptive identity bullet on PDF p.14 (IP address, etc.). It looks like a layout glitch, so the app doesn't treat it as a separate fact." },
    { pages: [24], text: "Blockchain has only a few bullets. The step-by-step process is in a six-panel diagram, so the order activity paraphrases the diagram, which was viewed as an image." },
    { pages: [12, 15, 19, 21, 22, 23, 26], text: "These Domain 1 pages contain diagrams. Their labels were read from the text layer, and pages 15, 22, 23 and 24 were also checked as rendered images." },
    { pages: [31, 32, 35, 40, 44, 46, 47], text: "These Domain 2 pages contain diagrams (misinformation process, DLL injection, buffer overflow, XSS, fileless virus, worm, pass the hash, session hijacking, CSRF, SSL stripping). Labels were read from the text layer, and pages 31, 40, 46 and 48 were also checked as rendered images." },
    { pages: [32], text: "Race condition example: the notes give the 'expected outcome' of two $50 transfers as 'A has $50, B has $150 (or A has $0 and B has $200)', which reads like one transfer vs. two. The bad outcome (A $50, B $200) depends on the stated assumption that deposits are immediate and withdrawals aren't. The order activity follows the notes' steps." },
    { pages: [32], text: "Race condition page uses a two-column layout that extracts out of order (Mars rover Spirit and Tesla Pwn2Own bullets interleave). The lesson pairs them by meaning, not by extracted line order." },
    { pages: [36], text: "Cloud vulnerabilities quotes two statistics (76% not using MFA on management consoles, 63% of production code unpatched for CVSS 7.0+) without naming a source or year. The app mentions them only as the notes' figures and doesn't quiz on the numbers." },
    { pages: [45], text: "Application Attacks (PDF 45-46) repeats the injection, SQL injection, buffer overflow and replay attack bullets from earlier sections word for word. The app covers each once in its own topic and doesn't duplicate questions." },
    { pages: [48], text: "Password Attacks: 'A hash example' (SHA-256) and the brute force bullet 'The hash:' have no hash value shown in the text layer or the rendered page. The app doesn't invent an example hash." },
    { pages: [50], text: "Mitigation Techniques says auto-update is 'not always the best option' without saying why. The recall card offers a likely reason from the OS vulnerabilities page (patches can break things) and says so." },
    { pages: [51], text: "PDF 51 holds the end of 2.5 Hardening Techniques and the start of 3.1 Cloud Infrastructures. Domain 2 activities only use its 2.5 content." },
    { pages: [51, 52], text: "PDF 51 starts 3.1 Cloud Infrastructures. The shared responsibility matrix on PDF 52 is a diagram, read as a rendered image: in SaaS the customer manages data, devices and accounts, and identity is shared; PaaS also shares applications and network controls; in IaaS the customer manages everything from the OS up." },
    { pages: [54, 64], text: "The High availability bullets appear twice, in 3.1 Other Infrastructure Concepts (PDF 54) and 3.4 Resiliency (PDF 64). The app teaches them in both topics." },
    { pages: [63, 64], text: "3.3 Protecting Data repeats the hashing, masking and tokenization material from 1.4. The app gives it fresh questions with a data-protection angle rather than duplicating Domain 1's." },
    { pages: [66, 67], text: "'Recovery testing' is both its own section (PDF 66) and a sub-heading inside Backups (PDF 67). The app treats the section as the main topic." },
    { pages: [52, 54, 56, 57, 58, 61], text: "These Domain 3 pages contain diagrams. Labels were read from the text layer, and pages 52 and 56 were also checked as rendered images." },
    { pages: [57], text: "The IPS page's text layer contains stray fragments ('1', '(explicit)') from a diagram. They aren't separate topics." },
    { pages: [68, 105], text: "Domains 4-5: text was extracted and mapped to sections, but not yet read in detail or turned into lessons. The headings listed in the coverage view were extracted automatically and may miss diagram-only content." }
  ],
  // Sub-headings whose content is taught under different words. tests/coverage.test.js checks
  // that every taughtAs term really appears in that section's topic.
  headingAliases: [
    { page: 13, heading: "AAA framework", taughtAs: ["identification", "authentication", "authorization", "accounting"] },
    { page: 14, heading: "Compare and contrast", taughtAs: ["compare the current state", "weaknesses"] },
    { page: 14, heading: "Planes of operation", taughtAs: ["data plane", "control plane"] },
    { page: 14, heading: "Controlling trust", taughtAs: ["adaptive identity", "threat scope reduction", "policy-driven access control"] },
    { page: 16, heading: "Video surveillance", taughtAs: ["cctv", "motion", "object detection"] },
    { page: 20, heading: "Transport encryption", taughtAs: ["https", "vpn", "ipsec"] },
    { page: 20, heading: "Cryptographic keys", taughtAs: ["the key is the secret", "algorithms are usually public"] },
    { page: 20, heading: "Real-time encryption/decryption", taughtAs: ["session key", "ephemeral", "unpredictable"] },
    { page: 21, heading: "Keeping data private", taughtAs: ["secure enclave"] },
    { page: 29, heading: "Tricks and misdirection", taughtAs: ["typosquatting", "pretexting"] },
    { page: 29, heading: "Phishing with different bait", taughtAs: ["vishing", "smishing"] },
    { page: 30, heading: "Because that’s where the money is", taughtAs: ["bank"] },
    { page: 33, heading: "Software updates", taughtAs: ["known-good backup"] },
    { page: 34, heading: "Hacking a Subaru", taughtAs: ["subaru"] },
    { page: 36, heading: "VM escape protection", taughtAs: ["vm escape"] },
    { page: 36, heading: "Security in the cloud", taughtAs: ["mfa"] },
    { page: 39, heading: "Your data is valuable", taughtAs: ["personal data"] },
    { page: 41, heading: "Real-world logic bombs", taughtAs: ["south korea"] },
    { page: 43, heading: "It started as a normal day", taughtAs: ["deauthentication"] },
    { page: 46, heading: "The client and the server", taughtAs: ["client"] },
    { page: 49, heading: "Published/documented", taughtAs: ["published"] },
    { page: 51, heading: "Finding intrusions", taughtAs: ["hips"] }
  ],
  // Sub-headings deliberately not taught, with the reason.
  coverageSkips: [
    { page: 30, heading: "Treasury intending your serious attention.”", reason: "Not a real heading. It's the tail of a sample spam message on the Phishing page that text extraction picked up as a heading." },
    { page: 48, heading: "A hash example", reason: "The notes show no actual hash value here (already flagged). The point that SHA-256 is widely used is taught in the password attacks topic." }
  ]
};
