// Browser check of the real UI. Run: node tests/e2e.js <url> <screenshot dir>
const { chromium } = require("playwright");
const assert = require("node:assert");
const fs = require("fs");
const URL_ = process.argv[2], SHOTS = process.argv[3];
const log = (...a) => console.log("✓", ...a);

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.clock.install({ time: new Date("2026-10-23T09:00:00Z") });

  const state = () => page.evaluate(() => window.__secplus.getState());
  const act = id => page.evaluate(id => window.__secplus.idx.activities[id], id);
  const noHScroll = async name => {
    const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    assert.ok(sw <= iw, `${name}: horizontal scroll ${sw} > ${iw}`);
  };
  async function answer(correct) {
    const s = await state();
    const step = s.session.steps[s.session.index];
    const a = await act(step.id);
    const cur = s.session.current;
    if (a.type === "choice" || a.type === "multi") {
      const targets = a.type === "choice"
        ? [a.options.findIndex(o => correct ? o.ok : !o.ok)]
        : a.options.map((o, i) => (correct ? o.ok : !o.ok) ? i : -1).filter(i => i >= 0);
      for (const i of targets) await page.click(`[data-fk="opt-${i}"]`);
      await page.click('[data-action="check"]');
    } else if (a.type === "match") {
      for (let i = 0; i < a.items.length; i++) {
        const v = correct ? a.items[i].a : a.choices.find(c => c !== a.items[i].a);
        await page.selectOption(`#m-${i}`, v);
      }
      await page.click('[data-action="check"]');
    } else if (a.type === "order") {
      if (correct) {
        // bubble each step into place using the accessible up buttons
        for (let target = 0; target < a.steps.length; target++) {
          for (;;) {
            const o = (await state()).session.current.response.order;
            const pos = o.indexOf(target);
            if (pos === target) break;
            await page.click(`[data-fk="up-${target}"]`);
          }
        }
      }
      await page.click('[data-action="check"]');
    } else if (a.type === "recall") {
      await page.click('[data-action="reveal"]');
      await page.click(`[data-action="rate"][data-r="${correct ? "knew" : "not"}"]`);
    }
    return a;
  }

  // 1. Home
  await page.goto(URL_);
  await page.waitForSelector("text=Start a small sprint");
  await noHScroll("home");
  await page.screenshot({ path: SHOTS + "/01-home.png", fullPage: true });
  log("home renders");

  // 2. Start 3-question sprint, lesson first, focus mode hides nav
  await page.click('[data-action="size"][data-n="3"]');
  await page.click('[data-action="start-mixed"]');
  await page.waitForSelector("text=Mini-lesson");
  assert.ok(await page.locator("#topbar").isHidden(), "focus mode hides nav");
  await page.click('[data-action="toggle-lesson-more"]');
  await page.waitForSelector(".bullets.more");
  await page.screenshot({ path: SHOTS + "/02-lesson.png", fullPage: true });
  await page.click('[data-action="next"][data-fk="next"]');
  log("lesson step + explain more + focus mode");

  // 3. Question 1: hint, then answer correctly
  let s = await state();
  let a1 = await act(s.session.steps[s.session.index].id);
  await page.click('[data-action="hint"]');
  await page.waitForSelector(".hint");
  await answer(true);
  await page.waitForSelector(".feedback.good");
  const fb = await page.textContent(".feedback");
  assert.match(fb, /PDF p\. \d+/, "page reference shown");
  assert.match(fb, /hint/, "hint acknowledged without penalty");
  s = await state();
  assert.strictEqual(s.first[a1.id].outcome, "assisted", "first attempt with hint tracked separately");
  assert.strictEqual(s.cards[a1.id].last, "assisted");
  await page.screenshot({ path: SHOTS + "/03-feedback-hinted.png", fullPage: true });
  log("hinted correct answer:", a1.id, a1.type);

  // 4. Question 2: pick an option, reload, resume exactly
  await page.click('[data-action="next"]');
  s = await state();
  const q2 = s.session.steps[s.session.index];
  const a2 = await act(q2.id);
  let preState;
  if (a2.type === "choice") {
    const wrongI = a2.options.findIndex(o => !o.ok);
    await page.click(`[data-fk="opt-${wrongI}"]`);
  } else if (a2.type === "match") {
    await page.selectOption("#m-0", a2.items[0].a);
  }
  preState = (await state()).session;
  const optTextsBefore = await page.$$eval(".opt .otext, .match label, .ostep .otext", els => els.map(e => e.textContent));
  // a) refresh while on the question: comes straight back to it
  await page.reload();
  await page.waitForSelector(".qcard");
  assert.deepStrictEqual((await state()).session.current, preState.current, "refresh keeps the question as it was");
  // b) close the app and reopen it at the home screen
  await page.goto("about:blank");
  await page.goto(URL_);
  await page.waitForSelector("text=Continue where I stopped");
  assert.match(await page.textContent(".resume"), new RegExp(`step ${preState.index + 1} of ${preState.steps.length}`));
  await page.screenshot({ path: SHOTS + "/04-home-paused.png", fullPage: true });
  await page.click('[data-action="resume"]');
  await page.waitForSelector(".qcard");
  const after = (await state()).session;
  assert.deepStrictEqual(after.current, preState.current, "selection, layout and hint state restored");
  const optTextsAfter = await page.$$eval(".opt .otext, .match label, .ostep .otext", els => els.map(e => e.textContent));
  assert.deepStrictEqual(optTextsAfter, optTextsBefore, "same answer order after resume");
  log("pause/reload/resume restores exact question state:", a2.id, a2.type);

  // 5. Answer q2 wrong -> explanations for every alternative
  if (a2.type === "choice") {
    await page.click('[data-action="check"]');
    const whys = await page.$$eval(".opt .why", els => els.length);
    assert.strictEqual(whys, a2.options.length, "every option explained");
    assert.ok(await page.locator(".opt.right").count() === 1 && await page.locator(".opt.wrong").count() === 1);
  } else {
    await answer(false);
  }
  await page.waitForSelector(".feedback");
  await page.screenshot({ path: SHOTS + "/05-feedback-wrong.png", fullPage: true });
  s = await state();
  assert.strictEqual(s.cards[a2.id].last, "wrong");
  assert.strictEqual(s.cards[a2.id].due - Date.parse("2026-10-23T09:00:00Z") <= 11 * 60000, true);
  log("wrong answer explained and scheduled for ~10 min");

  // 6. Question 3 via keyboard where possible, then finish
  await page.click('[data-action="next"]');
  s = await state();
  const a3 = await act(s.session.steps[s.session.index].id);
  if (a3.type === "choice") {
    await page.keyboard.press("1");
    await page.locator("#qhead").focus();
    await page.keyboard.press("Enter");
    await page.waitForSelector(".feedback");
    log("keyboard: 1 selects, Enter checks");
  } else await answer(true);
  await page.click('[data-action="next"]');
  await page.waitForSelector("text=Nice stopping point");
  await page.screenshot({ path: SHOTS + "/06-summary.png", fullPage: true });
  log("sprint summary / stopping point");
  await page.click('[data-action="done"]');

  // 7. Spaced review: nothing due now; after 11 minutes the missed item is due
  await page.waitForSelector("text=Start a small sprint");
  assert.match(await page.textContent(".grid2"), /Nothing due/, "nothing due yet");
  await page.clock.fastForward("11:00");
  await page.goto(URL_ + "#/home"); await page.reload();
  await page.waitForSelector("text=Review");
  const dueNow = Object.values((await state()).cards).filter(c => c.due <= Date.parse("2026-10-23T09:11:00Z")).length;
  assert.ok(dueNow >= 1);
  assert.match(await page.textContent(".grid2"), new RegExp(dueNow + " items? due"));
  await page.click('[data-action="recommend"]');
  await page.waitForSelector(".card.soft");
  await page.click('[data-action="review"]');
  await page.waitForSelector(".qcard");
  s = await state();
  assert.strictEqual(s.session.steps[0].id, a2.id, "missed item comes back first in review");
  assert.match(await page.textContent(".eyebrow"), /Review/);
  await answer(true);
  s = await state();
  assert.strictEqual(s.cards[a2.id].interval, 1, "relearned item now waits a day");
  assert.strictEqual(s.first[a2.id].outcome, "wrong", "first-attempt record unchanged by review");
  log("spaced review returns the missed item; first-attempt stats unchanged");
  await page.click('[data-action="pause"]');

  // 8. Library, topic, coverage, glossary, progress pages (mobile: no horizontal scroll)
  for (const [route, text, shot] of [["library", "5.0 Security Program Management", "07-library"], ["topic/d1-zerotrust", "Practice this topic", "08-topic"], ["coverage", "Flags and unclear spots", "09-coverage"], ["progress", "isn't a readiness score", "10-progress"], ["settings", "lives only in this browser", "11-settings"]]) {
    await page.goto(URL_ + "#/" + route);
    await page.waitForSelector(`text=${text}`);
    await noHScroll(route);
    await page.screenshot({ path: `${SHOTS}/${shot}.png`, fullPage: route !== "coverage" });
  }
  await page.goto(URL_ + "#/glossary");
  await page.fill("#gq", "salt");
  await page.waitForSelector(".gterm >> text=Salt");
  const n = await page.locator(".gterm").count();
  assert.ok(n >= 1 && n < 10);
  await page.screenshot({ path: SHOTS + "/12-glossary.png" });
  log("library / topic / coverage / progress / settings / glossary search");

  // 8b. Pick a chapter: home -> chapters -> jump to a domain -> study that domain only
  await page.goto(URL_ + "#/home");
  await page.click('[data-fk="pick-chapter"]');
  await page.click('[data-fk="jump-d4"]');
  await page.waitForSelector("#dom-d4[open]");
  assert.ok(!(await page.locator("#dom-d1").evaluate(d => d.open)), "other domains stay closed");
  await noHScroll("library/d4");
  await page.screenshot({ path: SHOTS + "/13-chapters-d4.png" });
  await page.click('[data-fk="sd-d4-3"]');
  await page.waitForSelector("text=Got it, show me a question");
  const ds = (await state()).session;
  assert.strictEqual(ds.mode, "domain");
  const dIdx = await page.evaluate(() => window.__secplus.idx);
  for (const st of ds.steps) {
    const tid = st.kind === "lesson" ? st.topicId : dIdx.activities[st.id].topicId;
    assert.strictEqual(dIdx.topicById[tid].domainId, "d4");
  }
  await page.click('[data-action="pause"]');
  await page.goto(URL_ + "#/topic/d4-firewalls");
  await page.click("a.back");
  await page.waitForSelector("#dom-d4[open]");
  log("pick a chapter: jump to domain 4, study only domain 4, back link returns there");

  // 9. Export -> reset -> import restores progress
  const before = await state();
  await page.goto(URL_ + "#/settings");
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click('[data-action="export"]')]);
  const file = SHOTS + "/backup.json";
  await dl.saveAs(file);
  const exported = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.strictEqual(exported.state.xp, before.xp);
  await page.click('[data-action="reset"]');
  await page.click('[data-action="reset-confirm"]');
  assert.strictEqual((await state()).xp, 0);
  // bad file first
  fs.writeFileSync(SHOTS + "/bad.json", "{oops");
  await page.setInputFiles("#importfile", SHOTS + "/bad.json");
  await page.waitForSelector("text=isn't valid JSON");
  await page.setInputFiles("#importfile", file);
  await page.waitForSelector('[data-action="import-confirm"]');
  await page.click('[data-action="import-confirm"]');
  await page.waitForSelector("text=Backup imported");
  const restored = await state();
  assert.strictEqual(restored.xp, before.xp);
  assert.deepStrictEqual(restored.cards, before.cards);
  assert.deepStrictEqual(restored.first, before.first);
  log("export → reset → import restores XP, review cards and first-attempt stats; bad file rejected");

  // 10. Order (accessible up/down buttons) and a wrong multiple-choice answer, deterministic topic
  await page.goto(URL_ + "#/topic/d1-nonrep");
  await page.click('[data-action="start-topic"][data-n="3"]');
  await page.waitForSelector(".qcard");
  s = await state();
  if (s.session.steps[s.session.index].kind === "lesson") await page.click('[data-action="next"][data-fk="next"]');
  s = await state();
  assert.strictEqual(s.session.steps[s.session.index].id, "d1-nonrep-a1");
  await answer(true);
  await page.waitForSelector(".feedback.good");
  assert.strictEqual(await page.locator(".ostep.right").count(), 6);
  log("order activity solved with keyboard-accessible move buttons");
  await page.click('[data-action="next"]');
  const ch = await act("d1-nonrep-a2");
  await page.click(`[data-fk="opt-${ch.options.findIndex(o => !o.ok)}"]`);
  await page.click('[data-action="check"]');
  await page.waitForSelector(".feedback.low");
  assert.strictEqual(await page.locator(".opt .why").count(), ch.options.length, "why shown for every option");
  assert.strictEqual(await page.locator(".opt.right").count(), 1);
  assert.strictEqual(await page.locator(".opt.wrong").count(), 1);
  await page.screenshot({ path: SHOTS + "/14-choice-wrong.png", fullPage: true });
  log("wrong choice: correct answer marked, every alternative explained");
  await page.click('[data-action="end-early"]');
  await page.waitForSelector("text=Nice stopping point");
  log("stop early is allowed and still shows a summary");

  // 11. Desktop width + dark theme screenshot
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(URL_ + "#/home");
  await page.click('[data-action="start-mixed"]');
  await page.waitForSelector(".qcard");
  await page.screenshot({ path: SHOTS + "/13-desktop-dark.png" });

  assert.deepStrictEqual(errors, [], "no console errors");
  log("no console errors");
  await browser.close();
})().catch(e => { console.error("✗", e.message); process.exit(1); });
