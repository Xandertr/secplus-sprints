# Security+ Sprints (SY0-701)

A personal, ADHD-friendly study app for CompTIA Security+ **SY0-701**, built from Professor Messer's SY0-701 Course Notes (v1.07).
It's a static web app with no build step, no accounts, no API keys and no paid services.

> The source PDF is **not** included and shouldn't be committed or published. Lessons and questions are original wording, with PDF page references so you can look things up in your own copy.

## Run it

- **Simplest:** open `index.html` in a browser (works from `file://`).
- **Local server:** `python3 -m http.server 8000`, then open http://localhost:8000
- **Hosting:** any static host works (GitHub Pages, Netlify, Cloudflare Pages). Upload the folder as is.

## What's built

| | |
|---|---|
| Exam version | SY0-701 (identified from the notes' title, copyright and intro pages) |
| Domain 1: General Security Concepts | **Built:** 18 topics, 78 activities, lessons, glossary |
| Domains 2–5 | Mapped to sections and PDF pages, shown as **Not built yet** |

See `CONTENT_MAP.md`, or the in-app **Coverage checklist**, for page-by-page status and flagged unclear spots.

## How studying works

- **Sprints** of 1, 3 or 5 questions, one thing on screen at a time. Stop after any question.
- A **mini-lesson** comes before the first question of a new topic. You can skip it.
- **Hints** are free. XP isn't reduced, but the answer counts as "with help" in first-attempt stats.
- **Feedback** explains the right answer and every alternative, plus "Explain more" and the PDF page.
- **"I guessed / wasn't sure"** brings a correct answer back sooner.
- **Spaced review:** a miss returns in about 10 minutes, then intervals grow (1 → 3 → 8 → 20 days…). Sprints mix due reviews with new material.
- **Pause anywhere.** The exact question, answer order and your selection are saved after every tap.
- **Focus mode** (on by default during sprints) hides navigation.
- No timers, sounds, streaks or leaderboards.
- Keyboard: `1`–`9` choose an answer, `H` shows a hint, `Enter` checks or moves on. Order tasks use ↑/↓ buttons instead of dragging.

## Progress and backups

Progress is stored in this browser's `localStorage`. **It doesn't sync** between devices or browsers, and clearing site data erases it.
Use **Settings → Export progress** to download a JSON backup, and **Import** to restore it anywhere.

## Adding content

All study material lives in `content/`. UI code doesn't need to change. See `content/README.md`.

## Tests

```bash
npm test                    # content validation + engine unit tests (Node 18+)
npm run e2e                 # browser run with Playwright (serve the folder first; see package.json)
node scripts/content-map.js > CONTENT_MAP.md   # regenerate the coverage map
```

What's verified: scoring for every activity type, explanations on every option, page references inside each topic's section,
answer-length bias (the correct option isn't predictably the longest), spaced-review scheduling, pause/reload/resume,
first-attempt stats vs hinted answers, export → reset → import, keyboard answering, mobile layout with no sideways scroll, and no console errors.
