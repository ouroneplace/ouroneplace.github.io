# Team A — Everyday Access Check v1.0: evidence, QA, HQ handoff

**Area:** Existing Aging & Accessibility life area (no new area or catalog card).
**State:** DRAFT · branch only · unmerged · unpublished · no founder acceptance.
**Date of source review:** 2026-11-12.
**Baseline:** verified `main` commit `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`.
**Team A branch:** `team-a/aging-access-everyday-check-20261112`.
**Files owned:** `one-place/everyday-access-check.html` and `tests/everyday-access-check.spec.cjs`, plus this document.
**Protected files:** no changes to `index.html`, shared navigation/styles, workflows, production smoke, manifests or sitewide configuration.

## 1. Gap investigation and non-duplication

At the baseline, the Aging & Accessibility area has one generic three-action downloadable area kit in `index.html` (identify barrier, explore alternatives, confirm consent) and its existing catalog offerings. It does not teach a complete, specific barrier-to-accommodation-and-verification skill on its own.

Already present:
- `one-place/family-handoff.html` coordinates names, responsibility ownership and review; **do not duplicate**.
- `one-place/care-navigation.html` supports appointments, transition from hospital, results/referrals and clinic-access contact; **do not duplicate**.
- `one-place/health-wellness.html` contains health-literacy and appointment preparation; **do not duplicate**.
- Open draft PR #62 adds a nonclinical Support Skills & Safety Lab and wellness starters, among other life-area work. These remain **unmerged and unpublished**. The access checker is intentionally about everyday physical/communication barriers, not emotional support, diagnosis, medical routines, care coordination or crisis counseling.
- Other open PRs such as #64/#65 are independent HQ operational/cross-domain drafts and are not dependencies.

**Chosen first complete visitor outcome:** A visitor can identify one everyday access barrier, compare a safer adjustment, choose when to seek help, practice one fictional safety decision, and review a plain-language plan or use a no-JS/paper alternative.

## 2. What the page genuinely does

- Five distinct self-contained guides: **movement, vision, hearing/alerts, information/technology, limited energy/temporary limitation**. Each includes WHY, NOTICE, TRY, CHECK, COMMON MISTAKE and STOP/HELP.
- Three simple selectors (barrier, location and next support action) create a *reviewable, human-readable plan* with an actionable observation, a choice-appropriate next step, an explicitly scoped location consideration, a check and a stop condition.
- Re-review is necessary after changing a selection; an old reviewed plan is hidden and print is disabled. Empty/partial forms do not produce a plan. Reset requires confirmation and a canceled reset preserves work. No free-text field collects sensitive records.
- A fictional blocked-hallway scenario explains three answers; the safe option is *ask and clear the route*, not squeeze past hazards or remove a device. The check is informational, unscored, non-certified and resettable.
- Static lessons and a six-question paper worksheet remain available **without JavaScript**. A `details` explanation of the scenario is always available. Visitors can use the browser's own print function; print is only invoked by a deliberate button after review.
- Self-contained page; no third-party scripts, CSS, images, tracking, network requests, accounts, personal-data entry, server writes, `localStorage`, `sessionStorage`, embedded services or synthetic safety scores.

**Important limitation:** The preview is in English and does not diagnose disability, assess capacity, certify a route, prescribe assistive devices, promise interpreter coverage, evaluate building compliance or verify a physical home. A plan is not evidence of a successful real-world accommodation.

## 3. Twelve quality lenses

1. **Entry:** clear purpose, five static guides and three-question planner; no keyword required.
2. **Problem map:** covers home, community/travel, appointment; movement, sight, hearing, information, fatigue/temporary barriers. Not a comprehensive home audit or accessibility-law reference.
3. **First-party outcome:** reviewed custom next-step text, safety decision practice and paper worksheet.
4. **Teaching:** WHY, NOTICE, TRY, CHECK, COMMON MISTAKE, STOP/HELP in each guide.
5. **Safety:** immediate danger call local emergency services; no dangerous transfer, untested ramp or alarm, medication change, structural DIY, false medical authority; urgent sudden symptoms escalate.
6. **Evidence:** sources and date below; global versus U.S./UK distinctions explicit; original sources preferred.
7. **Truthful labeling:** draft preview only; no provider matching, account, or guaranteed compliance.
8. **Navigation:** standalone guide links to existing Aging & Accessibility area, One Place home, Family Handoff and Care Navigation; homepage integration held for HQ.
9. **Privacy:** no names, diagnoses, ID numbers or free text; changes held in transient DOM only, no network writes or browser storage; browser print may create a physical/digital copy controlled by the visitor.
10. **Accessibility:** semantic headings, `label`/`select`, `fieldset`/`legend` practice, focus visibility, skip link, status regions, no motion-dependent UI, responsive wrapping, no-JS learning fallback; device/screen-reader audits still needed.
11. **State and recovery:** empty, partial, each path, edited invalidation, canceled/accepted reset, blank/right/wrong quiz answers, quiz reset, user-controlled print covered by focused automated tests.
12. **Evidence gates:** tests run against exact HEAD, full current-head regression, 320/390/1366/1920, 200% text, keyboard/no-JS, privacy, source quality and real device review must be recorded before HQ integration/founder acceptance.

## 4. Original evidence (links independently reviewed Nov 12, 2026)

- [WHO — Assistive technology](https://www.who.int/news-room/fact-sheets/detail/assistive-technology) (Jan 2024): assistive products can support mobility, hearing, vision, cognition and communication, across life stages, including temporary needs; access varies worldwide.
- [U.S. National Institute on Aging — Preventing Falls at Home: Room by Room](https://www.nia.nih.gov/health/falls-and-falls-prevention/preventing-falls-home-room-room): walking hazards, light, clutter, safe organization, stair and bathroom support. U.S. source; not global building law.
- [U.S. CDC — Preventing Falls](https://www.cdc.gov/falls/prevention/): trip hazards, lighting, grab bars, rails and professional fall-risk assessment guidance; older-adult focus.
- [W3C WAI — Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/): keyboard use, clear and readable content, media alternatives, inclusive formats.
- [W3C WAI — Auditory abilities and barriers](https://www.w3.org/WAI/people-use-web/abilities-barriers/auditory/): captions, transcripts, sign-language differences and alternatives to audio-only communication.
- [UK NHS — Home adaptations](https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/home-adaptations/): professional equipment and home adaptation assessment in UK context. **UK local council services/eligibility are not global entitlements.**
- [UK NHS — Vision loss](https://www.nhs.uk/conditions/vision-loss/): abrupt inability to see requires emergency assessment. This supports the stop condition; the site's local emergency-number wording is country-specific.

The page paraphrases short, supported points and links to primary sources. Sources explain principles, not formal clinical or onsite accessibility approval. Jurisdiction-specific emergency number *911* is labeled U.S.-only. Facility rules, payment, technology support, insurance and local access are not assumed.

## 5. Quality assurance ledger

### Intended checks

- `npm run test:quick` (migration, audit and JS syntax).
- `npx playwright test tests/everyday-access-check.spec.cjs` against the exact draft head.
- `npm test` current-head full suite (including historical accepted area coverage).
- Review layout at 320, 390, 1366, 1920 and 200%-font/320.
- Keyboard, semantic screen-reader structure, and actual ChromeVox/TalkBack checks if available.
- Disabled JS with static guides and paper fallback; malformed/blank, changes, reset cancel/confirm, quiz all branches, print only after review, privacy/no third-party calls.
- Preserve all prior main files and ongoing PR #62; compare exact branch-vs-main file list.

**Truthful evidence state at creation:** The feature and focused Playwright spec are committed. Runtime browser, full regression, hands-on assistive technology and live-site checks **are not yet represented as passed** until separately verified. A passing CI run does not equal clinical validation or founder acceptance.

## 6. Exact HQ-only integration requests (do not execute inside Team A)

1. **Aging area link in `index.html`:** On the existing `?area=Aging%20%26%20Accessibility` area view, add one prominent, clearly named action such as `<a href="one-place/everyday-access-check.html">Start the Everyday Access Check — barrier and safe next step</a>`. Preserve the current 18 categories, 72 original offerings, existing area action kit, links and other life areas; do not create a duplicate Aging area. Link should be introduced under existing Aging & Accessibility heading or a clearly marked area-specific section, not within Family or Health.
2. **Navigation and back:** Verify `../index.html?area=Aging%20%26%20Accessibility` remains correct from the feature page and browser Back works on deep links. Do not globally change shared nav for this one feature.
3. **Production smoke:** HQ add desktop (1366px) and mobile (320px) navigation from Aging area to the new guide; select `movement`, `home`, `ask`, review a plan, edit to clear review, and check quiz. Verify exact deployed page content only **after authorized merge**.
4. **Deployed-file manifest:** If HQ's release candidate monitors exact GitHub Pages bytes, append `one-place/everyday-access-check.html` once and adjust the expected count based on the **actual integrated head**. PR #62 is still draft; do not assume a 26- or 27-file count until actual integration. Keep all existing monitored files unchanged.
5. **Robots/launch (reconciled November 13, 2026):** The page now has `index,follow` in this **unmerged source draft**, matching the founder-approved published FAQ and HQ RC-01 public-release discoverability policy. This metadata requests indexing after an authorized publication, but **does not itself publish anything**, guarantee search appearance, or provide privacy. HQ retains release authorization and shall verify the actual deployed page after a separately approved merge.
6. **Release order:** This draft is **not** based on #62 or #64. If either merges first, integrate against the newer main and rerun full current-head CI. Founder must authorize the specific release batch; no auto-merge or silent publication.

## 7. Outstanding risk / recommendation

Automated layout and text assertions cannot establish real-device screen reader usability, true accessibility of a home, personal suitability of assistive products, accurate interpretation/translation, or national/local law. A first-time visitor/specialist review is appropriate before acceptance; there is no need to ask the founder to inspect repeatedly. Prefer a contained Team A draft for HQ review, then integrate only after the QA and release gates are independently satisfied.

**Founder action at draft stage: NONE.** HQ owns next integration/release proposal. Team A can continue targeted fixes on this feature without modifying shared files.


## 8. Exact-head regression defect and recovery (Nov 12–13, 2026)

Initial full run [43337577175](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43337577175) at `a033bc6c50c17eb0d091b90f0dad06d1ecb7b83a` **FAILED: 697 passed, 1 failed**. The failure was the no-JavaScript test not finding the `<noscript>`-only fallback message. Fix: render the fallback as ordinary static HTML, then hide it only when the local script successfully starts; with JS disabled, it remains visible while the interactive form is suppressed. This makes degradation truthful even when the script does not run. The focused and full suites must be rerun on the repair's exact new SHA before reporting passed.


## HQ RC-02 targeted readability follow-up (Nov 12, 2026)

At Project HQ's request on #67 (comments 6841350084 and 6841460249), assessed exact RC-02 screenshots at 390px and 320px/200% enlarged root font. No horizontal overflow existed; two *readability* issues remained: selected native `#support` wording was truncated when the select was closed on 390px, and `h1` split a word awkwardly at 320px/200%. Source-only remedy in the existing draft #67: accessible visible `<output for="support">` next to the native control, using `textContent` and `aria-live="polite"`, blank/hidden until selected, updated on change and cleared only on confirmed reset. Native selection, keyboard, invalidation, no-JS and consent semantics stay intact. A narrow mobile heading cap and natural word-wrapping rule preserve 200% root text and ordinary body size without hiding overflowing text. Also cap mobile h2 proportionally to maintain visual hierarchy. A local Chromium CSS reproduction at 320px/200% showed each title word on its own intact line, a 40px h1 vs 32px body and no horizontal overflow; **this is a limited CSS reproduction, not an integrated screenshot or a substitute for full-source Playwright**. New focused assertions cover visible 390px complete support echo, state changes and reset, plus word fragments, font size and horizontal overflow at 320px/200%. Both source scripts parse; all exact-head CI must be re-run. HQ must reimport changed #67 source bytes into RC-02 #72 without editing other features, then refresh integrated CI/screenshots. Prior #67 green run 43338895460 and #72 green run 43345597093 apply to their earlier SHAs only.


## Scoped print-only defect correction (Nov 12–13, 2026)

Post-699/699 source review found a genuine untested print defect: the old `@media print` rule included `#reviewed{display:block!important}`, which overrides the HTML `hidden` attribute for the unreviewed output, and the dedicated **Print reviewed plan** control printed unrelated lessons, quizzes and worksheet. This was not discovered by the earlier test because it only counted `window.print()` calls. Revised the existing Team A feature page to apply `body.print-reviewed` **only after valid review**, suppress all unrelated sections in print media, and remove the class upon any input edit or confirmed reset. No JS/native browser print still shows the original static teaching and paper worksheet with the unreviewed output hidden. Added real print-media Playwright checks before review, after review, after edit and without JS. The prior green 699/699 run is historical evidence for the earlier SHA and does not certify this correction; require a new exact-head green run before HQ reimports #67 into RC-02. No shared navigation, home catalog, accepted components, source safety guidance or other team work modified.


## Published-destination click and Back QA — November 13, 2026 Central

Rechecked the published baseline `3da93fc7e754af9e2ca50b6c98ce45734c57b1fc`: actual `one-place/family-handoff.html` displays the approved “Share the care. Make the next step clear.” heading; `one-place/care-navigation.html` displays “Care Navigation Guide”; `index.html?area=Aging%20%26%20Accessibility` uses the current `URLSearchParams` area renderer and contains “Find older-adult community resources.” All three destination pages exist and are current published paths. Before this QA addition, the Everyday Access spec checked only `href` values for those links, so it could not detect an inaccessible or misdirected destination. Added **320px and 1366px real Chromium navigation tests**, clicking Family Handoff, browser Back, Care Navigation, browser Back, and the original Aging & Accessibility area header, verifying correct destination heading/offering and return to the source draft. These are focused tests of existing accepted paths, **not new features**. This commit changes only the Team A test and evidence document; `one-place/everyday-access-check.html` stays byte-identical to prior source-green blob `3358c8afc58670663ae5e47b609360ca89230d8d`. Earlier 700/700 on source head `72748a8...` remains historical; exact new-head full CI is required before claiming the new navigation tests passed. HQ RC-02 #72 currently has exact 3/3 source-file parity with the old Team A head and should only import the newly verified spec/doc later in a **HQ-owned latest-main** candidate, without touching its own separate conversation practice or shared site files. No merge, release or publication authorization.


## 320px/200%-text nested card readability correction — 13 November 2026 Central

**Evidence, not a new feature:** Independently inspected HQ RC-02 #72 already-downloaded visual artifact `hq-rc02-visual-evidence-20312a.zip` at the exact old source, including real Chromium `320-access-200-percent-text.png` (320px × 62,441px). Although its no-horizontal-overflow gate passed, intro text visibly split **accommodation** mid-word and deeply nested lessons reduced paragraph widths so severely that many words broke every 1–3 letters. This created an unusually long and difficult-to-read page at 200% root text. This is a readability defect, **not a proven formal WCAG failure**; physical phone and native AT still require real testing.

**Controlled reproduction:** Standalone Chromium Playwright fixture transcribing the exact published Team A layout CSS with actual introductory, safety and sample lesson text. At **320px and 200%**: pre-fix nested lesson width **190px**, **15** sampled long-word breaks and sample document height **8,345px**; proposed **bounded spacing-only** correction yields lesson width **282px**, **1** sampled long-word break and height **5,315px** (~36% shorter). At **390px/200%**, 260→344px lesson and 3→0 sampled long-word breaks. All tested 320/390/1366 ordinary/enlarged fixture cases had **zero horizontal overflow**. This fixture is directional evidence and not a replacement for full-page CI.

**Exact source correction:** Update only existing narrow-screen `@media(max-width:680px)` layout: bound `main` horizontal padding via `clamp(9px,2.8vw,13px)`, bound `.panel,.lesson` padding to same rule, and `.note` padding via `clamp(10px,3vw,16px)`. Keep **100%/1.55 root text, all font sizes, lesson text, safety notices, selector/print behavior, keyboard, no-JS and privacy unchanged**. Desktop styles remain the same. Add real Playwright 320px/390px 200% guards requiring 260px+ usable lesson width, 32px+ paragraph text, a whole-word `accommodation` in intro and zero horizontal overflow; existing broad test suite remains unchanged. Test-only threshold represents a practical measured readability floor for this viewport, not an accessibility certification. Need exact new-head full CI and visual screenshot review before HQ imports this source update. Preserve HQ's separate Conversation Repair and accepted FAQ/Home Skills/Health Studio; HQ RC-02 remains frozen until reassembled on then-current main. No merge/publication authorized.


## Future public discoverability parity — November 13, 2026 Central

Compared current Team A three feature source drafts to published FAQ and HQ RC-01 current source: Everyday Access, Home Fire Escape Rehearsal, Power Outage Continuity Check all still had `noindex,nofollow` in their isolated unmerged HTML, whereas founder-approved published FAQ and HQ's current public-release RC-01 pages use `index,follow`. A future approved public release should not inadvertently tell crawlers to exclude its practical lessons. This change aligns **only Everyday Access PR #67**: one robots meta `noindex,nofollow` → `index,follow`, no HTML copy, client code, links, controls, CSS, header/nav, privacy cautions, accessibility behavior or lesson data changed. Two new Playwright 320px / 1366px source meta + navigation checks prevent a quiet reversal. This is a request to search engines, **not a guarantee** of indexing; robots metadata never protects visitor data, and neither file is publicly deployed through this commit. The other two stable Emergency drafts remain untouched; HQ may decide their own indexing at future release readiness. Preserve approved 23-file published FAQ site, release authority and current Team A 200%-text source fix. Full exact-new-head CI required before claiming green.


## Safety quiz-feedback-state invalidation — November 13, 2026 Central

**Reason to repair before future public review:** An independent read of the current Everyday Access page and its focused Playwright test found that `#checkAnswer` set the visible `#feedback` explanation only when pressed. After checking the safe `a` choice (“Best first step”), selecting an unsafe `b` or `c` radio button left the previous favorable explanation on screen until the visitor deliberately checked reasoning again. The existing tests verified individual answer results and reset, but not the **answer changed after feedback** transition. This is a misleading safety-practice state, not a claim about physical emergency response.

**Narrow feature-owned repair:** Add one change listener on the existing `#practice` fieldset that responds only to a changed `input[name="answer"]` and immediately replaces old feedback with the neutral “Choice selected. Check my reasoning for feedback.” Existing question, correct/incorrect explanations, answer reset, live-region role, CSS, area navigation, privacy/offline/print logic and accepted published files are preserved. Add two focused browser cases (320px and 1366px) for safe→unsafe→safe transitions, requiring stale feedback to disappear before any new Check click and newly checked feedback to be accurate. No new feature branch, no HQ shared files, no release authorization.

**Evidence gate:** This fixes an actual source-logic/test-coverage gap, but code+test source CI on the new exact head and QA evidence **must pass before HQ imports the new blobs**. Previously successful [Team A #67 source 711/711](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43513006538) and HQ [#79 current-main combined 825/825](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43531331055) are **historical heads** and cannot certify this new repair. HQ #79 currently contains the older Team A three blobs, so HQ must deliberately import only latest green Team A #67 feature/test/doc into a new integrated head if a future release is pursued; rerun full combined tests, screenshot and manifest verification. Do not merge either draft or publish without explicit separate founder approval. Physical-device/native screen-reader and qualified safety review remain open.


## Native select boundary contrast audit — November 13, 2026 Central / November 14 UTC

**Source-level accessibility finding under founder hold:** The three Everyday Access planner `<select>` controls have a 2px solid border rendered on white inputs inside a white panel. The original border color `#729e93` against white `#ffffff` produces **2.988:1** sRGB relative-luminance contrast, just below **3:1** where that boundary is relied upon to identify an interactive form control under WCAG 2.2 non-text contrast principles. This is a *calculated CSS property comparison*, not a human/device/AT evaluation or declaration that every browser fails WCAG.

**Minimal Team A-only corrective change:** Darken exactly one shared feature CSS select border token to `#6c968b`, yielding approximately **3.295:1** on white. Do not change accessible names, browser-native select styling/behavior, focus outline, font size, 200%-text mobile spacing, selected-support echo, quiz, source references, or accepted website. The resulting visual difference is limited to the three select boundaries on this feature page, and requires fresh combined-candidate screenshots if HQ ever reimports it.

**Focused regression:** Added Playwright cases at **320px** and **1366px** that read the actual computed `borderTopColor` and `backgroundColor` of `#barrier`, `#place` and `#support`, calculate sRGB contrast and require at least **3.2:1** for a modest margin above the normative 3:1 floor. Existing old-head **795/795** source CI and held PR #79 **827/827** combined CI remain historical evidence and **cannot certify the new CSS/test**. Require exact updated source head CI + focused tests and QA log before HQ imports any blobs; afterward HQ must run **new exact combined CI and visual artifact checks**. No publication, native phone, actual TalkBack/VoiceOver, independent usability or qualified mobility/safety review has occurred from this change.

**Founder HOLD stays active:** HQ Issue #81 has 21 open human review gates and explicitly bars publishing current PR #79. The CSS adjustment does not close any checklist item and does not authorize release. Team A retains source/test/doc ownership only; HQ decides timing of any future reimport based on original founder hold and its own integration queue. Do not reopen successfully tested or approved site features.
