# Content files

Load order (see `index.html`): `map.js` → `notes.js` → `glossary.js` → `domainN.js`.
To add a domain, create `content/domainN.js` (for example `domain3.js`) with the same shape as `domain1.js` and `domain2.js` and add a `<script>` tag for it in `index.html`.
The library switches that domain from "Not built yet" to "Built" automatically.

## Topic

```js
{
  id: "d2-phishing",          // unique
  objective: "2.2",           // must match a section in map.js
  section: "Phishing",        // exact section title from map.js
  title: "Phishing",          // display title
  pages: [29],                // PDF pages (printed page = PDF page - 9)
  lesson: { summary: ["..."], more: ["..."], pages: [29] },
  activities: [ ... ]
}
```

## Activities

Shared fields: `id`, `type`, `format` (label shown to the learner: Scenario, Troubleshoot, Next action, Compare, Match, Order, Recall, Investigate),
`prompt`, `hint`, `explain`, optional `more`, optional `artifact: { kind: "log", title, body }` for simulated logs, emails or configs, and `pages`.

| type | fields |
|---|---|
| `choice` | `options: [{ t, ok?: true, why }]`, exactly one `ok` |
| `multi` | `options: [{ t, ok?: true, why }]`, one or more `ok` |
| `match` | `choices: [labels]`, `items: [{ t, a: label, why }]` (labels can repeat, so this also works for classify-into-buckets) |
| `order` | `steps: [{ t, why }]` in the **correct** order (the app shuffles them) |
| `recall` | `front`, `back` (self-rated: knew it / partly / not yet) |

Rules (checked by `npm test`):
- Every option has a `why`. Answer order is randomized at display time.
- Across `choice` questions, the correct option mustn't be predictably the longest or shortest.
- `pages` must fall inside the topic's section pages in `map.js`. Never invent a page.
- Write in your own words. Don't paste passages from the notes.
- Activity `id`s are the spaced-review keys. Don't rename them once people have progress.
