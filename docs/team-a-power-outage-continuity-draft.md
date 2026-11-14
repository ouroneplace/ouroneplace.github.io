# Team A — Power Outage Continuity Check v1: QA and HQ handoff

**DRAFT only — unmerged, unpublished, not founder accepted.**  
**Date of source review:** 12 November 2026 (Central).  
**Published base:** main 2b2a32ed3a33de82af8ec96fa788b9f8045eb776.  
**Branch:** team-a/power-outage-continuity-20261112.  
**Files owned:** one-place/power-outage-continuity.html, tests/power-outage-continuity.spec.cjs, this document. No shared files are modified.

## 1. Verified gap and no duplication

The published Emergencies & Preparedness area has four original catalog offerings and a generic three-step action kit; there is no first-party outage-specific continuity lesson and decision aid. The accepted Housing Home Skills Academy contains emergency supplies, smoke/CO alarm and safety lessons; they are **preserved and not duplicated**. Family Handoff and Care Navigation cover responsibilities and appointments, not outages. Draft #62 covers Wellness and Support Skills; separate draft #67 covers ordinary non-disaster accessibility barriers.

**One outcome:** a person identifies an outage-critical dependency, chooses a safe preparation or response step, checks what must be confirmed, recognizes escalation boundaries, rejects indoor fuel-burning equipment and leaves with a printable plan or paper worksheet. Non-goals: no live alerts, forecast, rescue scheduling, clinician, utility-service guarantee, specialized generator installation or real-time shelter discovery.

## 2. Actual visitor feature

- Five independent lessons: powered devices/mobility; medicine cold storage; accessible alerts and communication; safe relocation; pets, service animals and dependents. Each teaches why, before, during, after, common mistake, and how to check/stop.
- Three non-sensitive selectors: priority, phase and chosen support approach; locally reviewed output includes phase-specific action, check, and stop/help. Edit invalidates review; print button is disabled before review; reset requires confirmation. No free-text personal data or export sent to a service.
- Fictional generator-in-open-garage decision exercise with two unsafe choices, one safe choice, distinct reasoning, blank/reset and script-free disclosure.
- Seven-question paper guide and all educational lessons survive without JS. No cookies, tracking, network writes, storage, embedded external resources, account or fabricated availability.
- Explicit separation of **ordinary preparation**, **during-outage response**, and **post-restoration verification**. Emergency danger always takes priority over the planner.

## 3. Sources (checked on 12 Nov 2026)

1. [CDC individual emergency planning](https://www.cdc.gov/disability-emergency-preparedness/people-with-disabilities/make-a-plan.html), Sep 2024 — accessible communication, assistive equipment, people, mobility and evacuation arrangements.
2. [CDC stay connected](https://www.cdc.gov/prepare-your-health/plan-ahead/stay-connected.html), Apr 2024 — multiple contact methods, family reunification and pet inclusion.
3. [CDC power sources](https://www.cdc.gov/prepare-your-health/take-action/power-sources.html), Apr 2024 — backup power and lighting, powered devices and CO alarms.
4. [CDC carbon monoxide](https://www.cdc.gov/carbon-monoxide/about/), source live — generators outside, more than 20 feet from doors/windows/vents, never inside garages even open; use battery-powered CO detection.
5. [FDA safe drug use after disasters](https://www.fda.gov/drugs/emergency-preparedness-drugs/safe-drug-use-after-natural-disaster), updated 2026 — product-dependent medication refrigeration, provider/pharmacist guidance, avoid unsafe assumptions.
6. [CDC disability-specific kit](https://www.cdc.gov/disability-emergency-preparedness/people-with-disabilities/build-a-kit.html), Sep 2024 — supplies, medicines, assistive batteries, communication aids.
7. [CDC disability preparedness](https://www.cdc.gov/disability-emergency-preparedness/people-with-disabilities/index.html), reviewed 2025 — local voluntary registries do not guarantee rescue.

All linked original resources are **U.S.-authored**. Their principles may be useful worldwide, but local emergency numbers, laws, shelters, animal rules, available supplies and alert channels differ. 911 is explicitly described as U.S.-only; the site does not claim global equipment standards or eligibility. No assumptions about rescue, clinical efficacy, medicine stability, generator compatibility or actual public service availability.

## 4. Twelve-lens quality review

1. Entry: plain, no prompt knowledge, three-selector short action or full static guide.
2. Problem map: five outage dependencies across preparation, response, recovery; deliberately not full-disaster coverage.
3. Real outcome: reviewed contextual next step, practice explanation and paper plan.
4. Teaching: why/before/during/after/mistake/check-stop in all five.
5. Safety: CO, electrical hazards, medication, medical devices, unsafe transfers and evacuation stop rules; current local alerts supersede generic learning.
6. Evidence: seven primary sources and jurisdiction scope.
7. Honesty: no bogus availability, live data, score or remote care.
8. Navigation: standalone area, home, accepted Housing and Family links; HQ will add area entry.
9. Privacy: no names, diagnoses, phone numbers, addresses or ID; no local storage, server writes or third-party loading. Printing is visitor-controlled.
10. Accessibility: native labels/selects/radios, skip link, visible focus, status feedback, responsive wrapping, reduced motion, no-JS paper alternative; real screen-reader audits remain open.
11. State: blank, partial, 15 combinations, edit, cancel/reset, print gate, correct/incorrect/blank quiz, no-JS.
12. Proof: tests exist, exact-head CI, device visual review, original source accuracy and HQ integration checks are mandatory; no early acceptance claim.

## 5. QA ledger and exact commands

- Fast check: npm run test:quick.
- Focused check: npx playwright test tests/power-outage-continuity.spec.cjs.
- Full gate: npm test, exact PR head, after focused fixes.
- Focused test assertions: 320/390/1366/1920; 320 at 200% font; content structure; all fifteen priority/phase combinations; urgent help; blank/partial/change/reset/cancel/print; keyboard/semantic feedback; non-script reading; no third-party calls, storage, cookies or personal fields; verified original outbound destinations.
- At initial authoring, runtime **not yet claimed passed**. Syntax and changed-file checks must be recorded separately. Automated browser assertions do not validate actual assistive technology, clinical safety, first-time-user competence or local shelter/power support.

## 6. HQ integration only

1. Add one area-specific entry on the existing Emergencies & Preparedness page in index.html: target one-place/power-outage-continuity.html, label **Power Outage Continuity Check — plan a safe next step**. Keep the existing 18/72 catalog and generic kit unchanged.
2. Verify return link to index.html?area=Emergencies%20%26%20Preparedness, Back and home. No shared navigation changes by Team A.
3. HQ desktop 1366 and mobile 320 smoke: from Emergency area open page, select equipment + during + stop, review critical escalation, edit to invalidate, check CO exercise, return to area.
4. Add one exact HTML path to HQ source-to-Pages byte manifest after checking the actual integrated main and other pending candidates; never assume #62 is already deployed.
5. Standalone educational source now requests `index,follow` for a *possible future approved public release*, consistent with the accepted FAQ and HQ five-area launch policy. This is neither search-listing assurance nor publication authorization; HQ must inspect the actual deployed metadata after a specifically approved merge.
6. Integrated-current-head CI, source/privacy/device review and founder authorization must precede any merge. After approval HQ verifies deployed SHA, file bytes, live mobile/desktop smoke and full main regression.

**Founder action: NONE at draft stage.** Project HQ owns integration and release decisions. A future fire/storm guide can be a separate independently testable experience.


## Source and print refinement (Nov 12–13, 2026)

Directly revisited all seven official source URLs. CDC CO Poisoning Basics (updated Oct 26, 2026) says portable generators outdoors **more than 20 feet** from doors, windows and vents, never in a garage even if open; the previous “at least 20 feet” phrase was corrected in the page's main warning and practice explanation. The “Print reviewed step” control now uses print-only CSS to hide unrelated lessons and print the selected reviewed outcome rather than every guide; when JavaScript is off, ordinary browser print still includes the complete static teaching and paper worksheet. Focused Playwright now explicitly exercises print media, review invalidation and distance wording. Re-run exact-head QA before treating this edit as verified.


## Mobile 200%-text headline reflow correction — Nov 12, 2026 Central

Independent source CSS audit and local headless Chromium fixture reproduced a visitor-readable quality defect at **320px viewport with 200% root font**: headline `Power Outage Continuity Check` renders the word **“Continuity” in two fragments**, despite passing the prior *horizontal overflow only* test. The existing heading `clamp(1.75rem,5vw,2.75rem)` produced a 56px heading with a 32px root and 288px available content width, allowing `overflow-wrap:anywhere` to break the word. This is not automatically a WCAG failure, but it is an avoidable readability regression, similar to issues HQ identified in the separately scoped Aging/Conversation features.

**Narrow repair in existing Team A source only:** For viewports ≤390px, set `h1{font-size:clamp(1.15rem,calc(5vw + 12px),1.75rem);overflow-wrap:normal;word-break:normal}`. Original 320px normal-font heading remains 28px; 320px 200%-text heading becomes 36.8px against 32px body/root, so still enlarged. Existing desktop CSS, ordinary body text, full zoom, accessible semantics and critical safety text remain unchanged. Local Chromium CSS fixture measured 320/390 normal and enlarged roots and 1366 normal; all four headline words occupy one text fragment at both 320 states and no horizontal scroll. **That isolated fixture is preliminary, not a full feature or native device screenshot.** Added focused full-page Playwright assertions for each word via DOM Range at 320 with 100% and 200% text, heading ≥1.1x root, and zero horizontal overflow. Prior #70 green Actions run 43340687346 (698/698) is at the *old* source head and does NOT certify this new correction. Require fresh exact-head CI PASS before HQ source intake. No new feature, shared files, released content, original official sources or privacy behavior changed.


## Closed-select choice legibility — Nov 12, 2026 Central

Independent local headless Chromium fixture using the actual draft's CSS and option text confirmed selected text truncation inside closed native select controls (even though the document did not overflow). At **320px** and normal 16px root, the `#priority` “Refrigerated medicines or healthcare supplies” text measures **345px** while the native control measures **260px** (approximately 206px content width); the `#support` “I need to confirm an arrangement with a person or service” text measures **439px** in that same 260px control. At **390px**, both selects are only **330px**. At 200% root text, the actual label text grows further (priority 690px, support 879px), while the control remains fluidly constrained to the phone. These are measured font/width constraints, not proof of exact native ellipsis pixels, user harm or formal WCAG failure.

The scoped visitor fix adds a nearby full-text, wrapping `<output for=...>` echo for **priority, phase and approach**, preserving the native selects' labels, keyboard, required validation, focus, review-invalidation and print gate. Outputs stay empty/hidden until an option is chosen; on change they display the exact selected `textContent`; a canceled clear preserves them and a confirmed clear hides/empties them. No private information, storage, network access or external scripts. No-JavaScript static lessons and paper guide remain unchanged. Added focused full-page Playwright tests for both 320 and 390 widths: visible full labels, text wrapping/containment at normal and 200% root, all review/change/cancel/confirmed-clear states. This is an existing feature defect repair, not a new release/feature branch. Previous #70 **699/699** passing run 43353593740 at HEAD `29f3975d...` is historical; the new exact-head browser suite must pass before this repair is certified.


## Independent safety-source and print-state QA — November 13, 2026 Central

Re-fetched the actual current official **CDC Carbon Monoxide (CO) Poisoning Basics** (reviewed Oct 26, 2026), **CDC Power Sources**, **CDC Making an Emergency Plan** (disability inclusion), and **FDA Safe Drug Use After a Natural Disaster**. CDC explicitly calls for portable generators **more than 20 feet** outside from doors/windows/vents, never inside or an open garage, with battery-backed CO alarms; FDA directs people to labeled medication temperatures and professional advice, and makes specific life-sustaining-medicine exceptions rather than a blanket discard instruction; CDC recommends disability-inclusive contacts, alternative communication and accessible evacuation. The existing One Place Power Outage copy matches those limits and does not promise that a utility registry, backup battery or any medicine is automatically safe. **No safety-text or external-link change justified.** This is source-topic review, not a physical generator or clinical validation.

The previous exact-head 701/701 run verified reviewed-only print and invalidated class on edit, but did not assert the *actual print-media DOM* before review or after the edit, nor with JavaScript disabled. Added focused Playwright tests that protect against an empty/stale `#reviewed` block becoming printable, keep the static five lessons and paper checklist printable before review/after edit, show only the deliberately reviewed preparation note when it is valid, and preserve the full paper route with JavaScript disabled. This is scoped test/evidence-only maintenance; the visitor page Git blob and its long-choice readability fix remain **unchanged**. Former 701/701 PASS at `ff8d497f...` is historical; new exact-head CI must complete before QA-green status for this revised test suite.


## Released-destination browser navigation regression — November 13, 2026 Central

Re-checked the latest GitHub **published main** after FAQ PR #77: actual accepted `one-place/home-skills.html#skill-30` resolves to the “Make a household emergency supplies plan” lesson, current `one-place/family-handoff.html` exists with heading “Share the care. Make the next step clear.”, and the published `index.html` explicitly parses `new URLSearchParams(location.search).get('area')` to render the matched Emergencies & Preparedness area. The existing Power Outage source links were already correct; the focused test had only asserted `href` strings, which would not catch a future target-page change. Added independent real-browser navigation assertions at **320px and 1366px** using actual clicks to each destination, browser Back to the draft source page, and confirmed relevant displayed target headings/offering. This is **test + scoped evidence only**, not a visitor-facing change or a new feature. Preserve approved Home Skills, Family Handoff, FAQ and 18/72 site. No source change justified; run new exact-HEAD full CI before claiming this new browser route coverage green. Historical `706/706` at prior `7d7ccd...` remains proof only for the older test revision.


## Public educational discoverability parity — November 13, 2026 Central

Source-only future launch correction for existing Team A **draft PR #70**, not a release: replace the unique `<meta name="robots" content="noindex,nofollow">` in `one-place/power-outage-continuity.html` with `index,follow`. This aligns the proposed publicly discoverable educational page with the founder-approved FAQ and HQ's later approved five-area public release. Search robots directives do not provide privacy protection and `index,follow` cannot guarantee indexing. No lesson wording, generator/CO warning, medicine/equipment safety caution, JavaScript, selectors, accessibility/layout, outbound links, or privacy behavior changes.

Focused Playwright cases at **320px** and **1366px** verify one robots tag, exact public indexing instruction, visible title and the unchanged Emergencies & Preparedness area link. Existing responsive, 200%-text, no-JavaScript, print, privacy, focus and destination-click checks remain intact. The change is limited to the three Team A feature-owned paths (HTML, test and this QA record); the independent Fire Escape draft #74 is intentionally untouched. **New exact-head GitHub Actions full regression is required** before considering this latest source revision QA-green; earlier 706+/706+ evidence applies only to older source commits.

The protected published baseline has moved forward through founder-authorized HQ PR #78; HQ must source-import these three files into a candidate based on its **then-current main**, preserve accepted work, and rerun combined-head CI/visual/safety/founder gates. Team A has no authority to modify HQ-owned `index.html`, shared smoke, Pages manifest or release branches. **DRAFT, UNMERGED, UNPUBLISHED; no founder acceptance or release approval implied.**


## Quiz feedback invalidation — November 13, 2026 Central

**Issue found on source review:** In the fictional generator/CO safety exercise, checking the appropriate `b` response displayed `Best first response`. Selecting the unsafe `a` or `c` radio answer afterwards did not clear that previous success message unless the visitor actively clicked `Check reasoning` again. Existing tests covered individual checked options and reset, not the answer-changed-after-feedback transition. A reassuring statement attached to an unreviewed unsafe selection is misleading; repair is limited to this illustrative learning activity and is not professional emergency-response certification.

**Narrow Team A-owned repair:** The existing quiz fieldset listens for `change` on `input[name="decision"]` and immediately replaces any prior correctness text with the neutral `Choice selected. Check reasoning for updated feedback.` The original explanation logic, official CO and generator safety content, safety stops, area navigation, print/no-JS/accessibility/privacy behavior remain unchanged. Two new Playwright tests at **320px** and **1366px** verify safe → unsafe → safe changes clear previous feedback before the next Check click, and newly checked feedback is accurate. Changes confined to this feature HTML, focused test, and this evidence document; no HQ shared files, accepted site, merge or publication.

**Fresh CI required:** Prior full [793/793 success](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43528448951) validates the *previous* HEAD `ea122856df69388ba2f463cbf19e04b25414dd5d`, not the updated listener or test. Record exact new source-head Playwright and zero audit errors before telling HQ it is ready for later current-main import. HQ must run fresh integrated tests and receive specific founder release approval before any Pages publication. Native device, screen-reader and professional emergency review remain separate gates.
