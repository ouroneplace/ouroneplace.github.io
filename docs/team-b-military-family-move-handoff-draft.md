# Team B — Military Family Move Handoff Practice: source and QA ledger

**Date:** November 13, 2026 Central / November 14 UTC.
**Status:** SOURCE DEVELOPMENT DRAFT. Not public, not area-v1.0-certified, no founder authorization to merge or publish. This work is separate from HQ RC-07 Work integration and separate from all held RC-02 PR #79 evidence streams.
**Assigned area:** Veterans & Military Families / Team B.
**Approved public branch baseline at start:** `997f51a7b03e486011ba70251f811cd65d207438` (RC-06 verified). Update current main before any future HQ intake and do not blindly merge stale branch history.

## Nonduplication / visitor skill

Existing Team B [source-ready but unpublished Veterans Benefits Preparation PR #66](https://github.com/ouroneplace/ouroneplace.github.io/pull/66) has eight benefit-specific pathways (VA disability, health care, education, caregiving, survivors, transition/VR&E, housing, review) with private records/plan practice. It **does not** provide a practical military PCS family handoff rehearsal that sorts which installation or official resource to ask first. Existing Team C household records/Device Care and other teams' safety/care resources are also distinct. Current government Plan My Move already provides **personalized full moving checklists**, so we deliberately **do not duplicate its itinerary, collect installation/move dates or invent reimbursable benefits**.

Four *fictional* scenarios teach selecting an appropriate official *information starting point*:
1. **A—Move planning / logistics:** installation Relocation Assistance / Plan My Move and confirmation with the actual transportation office.
2. **B—Child’s school transition:** installation School Liaison Program for record/enrollment questions.
3. **C—Health plan move/address:** official TRICARE Moving guidance and DEERS information; never dis-enroll or change plan based solely on fictional lesson.
4. **D—Specialized family services continuity:** EFMP Family Support office for information, referrals and warm handoff to gaining installation; distinct from actual medical treatment, eligibility decisions or assignment coordination.

The page offers a clear **NAME → FIND → ASK → CHECK** method, and for every scenario WHY, HOW, CHECK, COMMON MISTAKE and WHEN TO STOP. Four native `details` model responses are always available without scripts. Optional Javascript-backed selectors classify each of four cases among all four sources; every right/wrong selection returns specific WHY and an ASK question. Blank review focuses first missing, edited choice hides stale feedback, reset clears all invented options and the review without confirmation because nothing personal or durable exists. No scores about real eligibility, no service/move profile, no account, forms, files, local storage, third-party API, export, print or automatic government navigation.

## Official evidence independently checked on November 13, 2026 Central

Five linked U.S. official sources were each opened and content reviewed:
- Military OneSource: [Relocation Assistance Program](https://www.militaryonesource.mil/benefits/relocation-assistance-program/) — installation support and transportation contact navigation, housing, schools, family employment and other broad referrals. No reimbursement policy or approvals are implied.
- Military OneSource: [Plan My Move](https://www.militaryonesource.mil/resources/network/plan-my-move/) — separate government personalized moving checklist; it may request location/family details and has its own data practices. This One Place practice does not collect them.
- Military OneSource: [School Liaison Program](https://www.militaryonesource.mil/benefits/school-liaison-program/) — pre-K–12 student transitions, records/enrollment resources and special education referrals. No eligibility or placement guarantee.
- Defense Health Agency: [TRICARE Moving](https://www.tricare.mil/LifeEvents/Moving) — check plan-specific changes and DEERS update when moving, but no deadline claims/cost calculations are supplied here.
- Military OneSource: [EFMP Resources / Family Support](https://www.militaryonesource.mil/resources/millife-guides/efmp-resources/) — non-clinical family support and possible warm handoff to the gaining installation. Do not claim support is automatic, that EFMP provides medical treatment, or a particular assignment is approved.

U.S. military relocation information only. Families outside covered circumstances or different services should follow their own authorized channels. This practice does not interpret orders, deadlines, reimbursement, TRICARE policy changes, school placement, EFMP eligibility, immigration status or clinical needs. For urgent care or emergencies, this site does not substitute for emergency services. Never request/disclose diagnoses, military identifiers, orders, child's records or other private details through this site.

## Scope: exactly three new Team B-owned files

- `one-place/military-family-move-handoff.html`: semantic independent, nonduplicate free teaching and private fictional sorting
- `tests/military-family-move-handoff.spec.cjs`: focused automated QA; all sixteen case/source combinations exercised
- `docs/team-b-military-family-move-handoff-draft.md`: evidence and HQ handoff (this file)

No existing pages, shared navigation, index/catalog, shipping scripts, GitHub Actions deployment manifest or other team files touched. No change to approved Money & Bills, Housing, TEAL, HQ RC-06 or active RC-07 PR #99.

## Twelve-lens quality and proof

| Lens | Honest implementation / remaining gate |
| --- | --- |
| Entry | Clear Veterans & Military Families context, relative home/area paths and keyboard skip link; HQ still owns homepage discovery |
| Needs | PCS basics, school transition, health plan address, specialized family continuity—does not claim full military service curriculum |
| Outcome | Four case-to-contact decisions with reasons and safer next question; fictional only |
| Teaching | WHAT, WHY, HOW, CHECK, MISTAKE and STOP both in static case text and optional practice feedback |
| Safety | No eligibility/benefits, plan change, official submission, diagnosis or timeline promise |
| Evidence | Five primary current official U.S. source URLs; exact content review; no third-party autofetch |
| Honest labels | Learning practice, no account/agency affiliation, no Plan My Move replacement |
| Navigation | Home/area links, skip-to-main; original source tabs deliberately opt-in |
| Privacy | Zero real personal/sensitive inputs; ephemeral invented selectors, no analytics/storage/writes |
| Accessibility | Focusable main, native summary/details/selects, aria-live results, 320/390/1366/1920, 200% text, no-JS model answers, reduced motion |
| State/recovery | Blank validation/focus, answer-change invalidation, reset complete feedback/choices cleanup; explicit `clearPractice` avoids DOM name shadowing |
| Proof | Exact source SHA and immutable file blobs; GitHub Actions actual full/quick test output; no unverified native-device/AT/human claims |

## Required QA and source-readiness gate

1. Source parses and HTML duplicate-ID/links audit independently; run `npm run test:quick` and `npx playwright test tests/military-family-move-handoff.spec.cjs` when a test runner is accessible.
2. Required **exact-current-head** GitHub Actions `npm test` must complete successfully: validate 17 focused browser cases, including full 16 wrong/right combinations, script-off at 320 & 1366, reflow at 320/390/1366/1920, 200% text at 320/390, keyboard first focus and controls, unsafe external-request/storage/write absence, stale response and reset semantics, original official links.
3. Inspect actual Actions logs and exact test merge baseline; any real failure must be fixed in only these source/spec/docs files and re-run. Do not call passed before full exact-head evidence.
4. HQ must, **after Team B source QA green**, selectively import the exact three tested Git blobs on then-current founder-approved main; older branch history must NOT overwrite newer accepted releases. HQ alone owns new Veterans entry link, Pages manifest count and published smoke workflow. No duplicate HQ PR if another feature already in active integration.
5. HQ must confirm independent visual/manual/first-time usability and risk-based expert review where appropriate. Chromium tests do not prove actual smartphones, native VoiceOver/TalkBack, international policy accuracy, official officer approval, or real family comprehension.
6. Only a new specific founder publication approval authorizes merge; then HQ verifies exact Pages deployment SHA, monitored published bytes, live desktop/mobile/no-JS smoke and post-merge full regression. PR #79 [FOUNDER HOLD](https://github.com/ouroneplace/ouroneplace.github.io/pull/79) and its #81 four independent review streams stay separate.

**This source assignment is only one valuable Veterans & Military Families outcome. Team B all-six Version 1.0 milestone is NOT COMPLETE.**
