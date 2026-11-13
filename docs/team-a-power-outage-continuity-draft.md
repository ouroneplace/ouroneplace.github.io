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
5. Draft robots noindex/nofollow remains until HQ decides index policy as part of specific founder-authorized release.
6. Integrated-current-head CI, source/privacy/device review and founder authorization must precede any merge. After approval HQ verifies deployed SHA, file bytes, live mobile/desktop smoke and full main regression.

**Founder action: NONE at draft stage.** Project HQ owns integration and release decisions. A future fire/storm guide can be a separate independently testable experience.
