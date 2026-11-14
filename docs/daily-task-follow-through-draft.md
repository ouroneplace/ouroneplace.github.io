# Team C — One Task, Four Moves (Daily Life & Organization v0.1)

**Date:** November 12, 2026 · **State:** TEAM C DRAFT SOURCE ONLY. No publication, integration, merge or founder acceptance.
**Base:** verified main 2b2a32ed3a33de82af8ec96fa788b9f8045eb776
**Team:** C · Daily Life & Organization
**Coordination:** https://github.com/ouroneplace/ouroneplace.github.io/issues/63

## November 13, 2026 — public learning indexing and real area-return checks

- **Release policy gap:** This standalone public-facing educational draft had a meaningful title/description but no explicit robots directive. Omission alone does NOT prohibit indexing; unlike a `noindex`, it uses the search engine's usual defaults. The already published four educational pages and latest Team A draft use explicit `index,follow` for transparent discoverability policy.
- **Focused source-only alignment:** Added exactly one `<meta name="robots" content="index,follow">` without changing page body, lessons, private plan behavior, reset safety, sources, layout, or external requests. This is an indexing *request*, not proof that Google or another engine will actually index or rank the page; nothing publishes until HQ releases it.
- **Focused browser check:** At 320px and 1366px, check exactly one policy tag, accurate H1, actual Daily Life area link navigation and heading, and no horizontal overflow after return. Existing broader privacy, no-JS, 200% text, full workflow and reset tests remain intact. Exact new-head CI must complete before claiming this revision passed.
- **Coordination boundary:** Original founder-authorized published `main` `05501c9643e4fbf1fd876a18e3347bff15ea4b8e` (#78) remains unchanged; HQ current two-area [PR #79](https://github.com/ouroneplace/ouroneplace.github.io/pull/79) is a separate scope (Aging/Conversation) and must not be modified to import this new Daily Life source. This Team C branch remains OPEN DRAFT only.

## November 13, 2026 — prevent accidental destruction of visitor-authored plans

- **Observed source behavior:** The prior full reset discarded all four typed fields and radio choices on one click, without a confirmation. This is distinct from the already protected Load Example action and risks losing visitor work.
- **Scoped correction:** Before resetting any selected or typed input, ask for a browser-native confirmation identifying all four plan fields, options, and reflections. Cancel preserves draft text, selections and feedback, with a non-destructive status message. When nothing is entered or chosen, reset stays one click. Deliberate Clear Plan remains unchanged. No storage, uploads or new services.
- **Regression added:** Cancel after custom wording plus an unreviewed choice; confirm then clear; prior full reset after an example; empty reset produces no prompt. New exact-head GitHub CI is required to establish PASS; previous green run is historical.
- **Published-baseline correction:** Current founder-authorized main after PR #78 is `05501c9643e4fbf1fd876a18e3347bff15ea4b8e` with a 27-file integrity manifest. Source-only QA does not establish fresh-main HQ integrated tests, live release or native screen-reader approval. HQ owns all shared integration/publication.

## The user problem and one outcome

The existing Daily Life & Organization catalogue contains generic resource/preview entries for organizing records, planning routines, a weekly life planner and household reset concept. That is not an implemented first-party, teach-and-practice outcome. Published docs/one-place-transition.md and docs/teal/README.md say there is no standalone published Universal Life Mentor or Everyday Mentor application. We therefore **do not** invent, replace or duplicate a mentor, nor build another general planner.

**One outcome:** In a fictional community-class preparation, visitors can reason through and rehearse how to PREPARE, DO, CHECK and REMEMBER one manageable task, explain a useful versus unsafe/unrealistic action, and optionally edit a four-move plan without giving One Place personal details.

This is practical task-execution literacy, not a checklist-only "planner", an inaccessible lecture, therapy, artificial motivation, gamified scoring or a live AI assistant.

## Page details and safety

- PREPARE: consult original requirement and choose a safe reachable starting place; avoid unnecessary spending or broad guesses.
- DO: put both class items together in a safe, reachable location, use accessible alternatives, pause or ask for willing help, and never climb unsafely.
- CHECK: compare actual items to original class instructions, check accessibility and unobstructed path instead of inferring success from effort or another person's claim.
- REMEMBER: choose accessible cues (print, picture, tactile, spoken or existing calendar) near an established routine; protect privacy and avoid assuming a smartphone or payment.
- Twelve fictional three-choice responses across four moves get distinct reasoning feedback with no grades. All four move explanations and a full example live in static HTML native disclosures and work without JavaScript.
- Optional four editable fields, 350 characters each, begin blank, use no storage or network. Load example is available after four optional reflections but never overwrites visitor-authored text. Explicit clear and reset exist. Reload clears.
- English-only. Roommates/families, shared spaces, support choices, visual/hearing/mobility access and time limits vary; no universal recommended method. If needs exceed safe access, stop and request appropriate local support.
- No medical advice, personal cognition assessment, child-data collection, task reminder service, tracking, paid work, new apps, scheduled alerts or claims of independent competency.

## Verified original sources (accessed November 12, 2026)

1. [Royal College of Occupational Therapists — managing energy](https://www.rcot.co.uk/learn-about-occupational-therapy/ot-advice/lift-up/energy): advocates pacing, smaller tasks, rests, planning, prioritising and keeping everyday items within easy reach. This source discusses energy limits, but the One Place practice is general, nonclinical education.
2. [Cheshire and Wirral Partnership NHS Foundation Trust — ideas for coping with memory difficulties](https://www.cwp.nhs.uk/getting-help/leaflet-library/test-leaflet-library/Ideas-for-coping-with-memory-difficulties): includes routines, agreed places for items, written cues, calendar prompts, clocks and notes. These are possible strategies, not guaranteed solutions or a diagnosis.
3. [One Place development quality standard](life-area-quality-standard.md) and live Human Literacy/TEAL values: independently check results, respect capacity and autonomy. The four-move lesson/scenario are original educational syntheses, not material endorsed by these source organizations.

Source links are normal anchors, explicitly optional, marked external with target="_blank" and rel="noopener noreferrer". No outside hosts are contacted until a visitor chooses to follow an external link. The site is educational; external organizations manage their own regional information/privacy.

## Privacy, accessibility and no-JS

Only one HTML file with inline CSS+JS; no scripts, fonts, frameworks, cookies, backend, storage, provider calls, telemetry, paid services or download. The user is told not to enter names or sensitive data. All four editable fields and selected options are lost when the page closes or reloads. Other apps/browser extensions can have separate risks.

Uses landmarks; one h1; native fieldsets/legends, label/input associations, details/summary; keyboard-native choices; 44px+ controls; live status feedback; visible focus; reflow to 320px; 200% enlarged text; forced-colors and reduced-motion CSS. No full WCAG conformance claim or hands-on screen-reader/physical-device evidence yet. Core teaching and complete example are no-JavaScript accessible; interaction is optional.

## Owned file scope

- one-place/daily-task-follow-through.html (one new page)
- tests/daily-task-follow-through.spec.cjs (new focused Playwright tests)
- docs/daily-task-follow-through-draft.md (this ledger)

No modifications to existing pages or shared site files. PR #68 Relationships work and all existing TEAL, Home Skills, Family Handoff, simulator and mentor materials are not touched.

## HQ integration handoff — requests only, not Team C edits

1. After source QA, add one truthful active internal link inside existing root **Daily Life & Organization** area at index.html?area=Daily%20Life%20%26%20Organization to **one-place/daily-task-follow-through.html** labeled "Practice finishing one daily task". Do not create a 19th life area, replace four existing catalog entries, mislabel a new product or modify a broad mentor system. Include direct route and Area/Home/Back smoke.
2. HQ adds this one exact path to scripts/verify_live_site.cjs and its current exact-deployed-files manifest **on the final combined integration branch only**; do not copy an old file count into a new release candidate. Include one smoke journey: navigate from area; choose first decision; enter own plan text; try loading example; confirm text preservation; reset.
3. Reconcile with other drafts (especially #62, #67 and #68), maintaining approved site code and no global changes from Team C. Run integrated full npm test on exact new head, 320/390/1366/1920 and 200% text, keyboard/screen reader, reduced-motion, no-JS, source/privacy/link tests, visual inspection, no unexpected persistence/outbound requests.
4. Only after specific founder approval for this scope may HQ merge or publish. Verify exact Pages deployment SHA, expected file bytes, mobile/desktop smoke and main post-merge regression. No shared CI edits by Team C.

## QA ledger — do not infer green

| Gate | Evidence | Status |
| --- | --- | --- |
| Baseline and nonduplication | Main SHA above, docs/one-place-transition.md, docs/teal/README.md, root catalog and open PR review | Checked |
| Authoritative source URLs/content | RCOT and NHS pages independently checked Nov 12, 2026 | Checked; not clinical validation |
| New HTML/JS syntax | JS parse of inline script and spec at blob-creation | Checked |
| Fast repository audit | npm run test:quick on exact candidate | Pending |
| Focused browser tests | npx playwright test tests/daily-task-follow-through.spec.cjs | Pending |
| Full GitHub CI | npm test on draft PR exact head | Pending |
| Visual and access | Automated 320/390/1366/1920, 200%-text/keyboard/no-JS tests to run; human review TBD | Pending |
| HQ integration, founder and live | Separate decision and HQ release gate | Not authorized |

**Assessment:** one focused skill-learning slice; no claim that mastering the fictional case means full task independence.
**Founder decision:** No action needed for independent source draft. HQ integrates only after verified QA; a scoped release choice can be proposed later.
