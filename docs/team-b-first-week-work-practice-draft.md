# Team B — First Week at Work Practice (source-only draft)

**Status:** Independent draft, unmerged, unpublished, no founder acceptance or publication authorization.
**Area:** Work & Careers. **Team:** B. **Published starting baseline:** `351f39542709cd246fdd95a53873e5aae5bd6730` (founder-approved RC-03).
**Scope:** Only `one-place/first-week-work-practice.html`, `tests/first-week-work-practice.spec.cjs` and this document. This proposal does not modify any approved page, shared navigation, manifest, CI workflow or other team's files.

## Distinct visitor outcome

Existing **published** `one-place/career-readiness-planner.html` teaches career direction, truthful interview examples, editable plans and employer/job scam verification. It does not teach the everyday **first-week on-the-job** skills proposed here. This separate module teaches:
1. Ask for a specific checklist, priority and deadline when task instructions are vague.
2. Compare actual worked hours with an official record and ask for the appropriate correction route without guessing at wages or editing official records.
3. Ask for clearer or written work instructions and check comprehension without publicly requesting a coworker's medical disclosure.

Visitors get WHY/HOW/CHECK/COMMON MISTAKE/STOP for each fictional situation, three choices per case, nine distinct why/next explanations, and independently readable model wording in native `details`. The page does not accept names, actual work-hour values, employer IDs or medical histories. It is entirely educational, not a reporting or payroll calculator. No browser storage, data download, cookies, external scripts or automatic off-site requests are in scope. External sources require a deliberate click.

## Official-source check (November 13, 2026 CT)

- U.S. Department of Labor, `https://www.dol.gov/agencies/whd/fact-sheets/21-flsa-recordkeeping`. Employer records of hours worked are important, and covered recordkeeping requirements are context-dependent. We do **not** assert universal overtime rules, exemptions, record-retention periods for workers, or resolve individual pay.
- EEOC, `https://www.eeoc.gov/laws/guidance/enforcement-guidance-reasonable-accommodation-and-undue-hardship-under-ada`. Accommodation requests can involve changes in communication methods and workplace practices; eligibility/medical documentation and undue hardship depend on facts. We teach an ordinary request for clear instructions, **not** a promise of a legal accommodation.
- OSHA, `https://www.osha.gov/workers`. Worker-facing U.S. safety protections, training and reporting routes; the page uses this only to establish the boundary to pause unsafe work and seek appropriate help. It does **not** overstate the fact-specific legal right to refuse particular work or invent deadlines.
- Context and region: These are U.S. official sources, not worldwide law. Employer rules, pay entitlements, protections, state plans, unions and collective bargaining may differ. A practice page cannot establish whether a real workplace is safe or whether a legal claim applies.

## Twelve quality lenses — initial source design / test contract

| Lens | Implemented or bounded outcome |
|---|---|
| Entry | Clear heading, plain lead, Work & Careers and One Place return paths, skip link |
| Coverage | Practical onboarding communication and record checking, distinct from job search/interview planner |
| On-site use | Three case decisions, nine contextual explanations, paper/model responses |
| Teaching | WHY/HOW/CHECK/COMMON MISTAKE/STOP, immediate next action |
| Safety | No confident legal/pay advice; specific STOP for dangerous/unknown tasks and real disputes |
| Evidence | Three source links to primary DOL/EEOC/OSHA guidance with region boundaries |
| Truth labels | Three fictional situations, no false employer or agency service |
| Navigation | Area and home relative links, ordinary browser history, `main` skip target |
| Privacy | No personal input, storage, tracking, upload, automatic download or external loads |
| Accessibility | Native semantic sections, form labels, status announcements, `details`, keyboard, 320/390/1366/1920, 200% text, script-off guides |
| Recovery | Blank-choice explanation, stale feedback cleared when choice changes, reversible per-case reset |
| Proof | Focused Playwright source tests and required GitHub Actions full exact-head CI; do not claim manual/native-device checks without evidence |

## Verification gates and limitations

Source creation is not a pass. Run `npm run test:quick`, `npx playwright test tests/first-week-work-practice.spec.cjs`, and full `npm test` in GitHub Actions on the **final exact PR HEAD**; inspect actual job logs. Focused tests cover all three cases × three responses, blank/stale/reset, phone and desktop reflow, 200%-text, keyboard skip focus, JS-disabled full guidance, source attributes and no network/storage side effects. Any failure requires correction, with a new exact-head run. Screen-reader/native Android/iPhone, first-time human comprehension, real workplace/outcome and independent labor-law sufficiency are not claimed by browser automation.

**HQ integration contract:** After source-green handoff, HQ may select only the three Team B-owned ADD-only Git blobs onto then-current public `main`; add optional area-specific discovery and deployment manifest under HQ ownership, with combined exact-head CI, visual and safety/privacy checks. Never combine into [founder-held PR #79](https://github.com/ouroneplace/ouroneplace.github.io/pull/79), or treat `next` as publication approval. Explicit founder-scoped release authorization is required before any merge/deploy. Verify actual Pages SHA, live bytes and postmerge regression only **after** an authorized release.

**Version 1.0:** A single source feature is not area-wide Work & Careers or Team B six-area v1.0 acceptance. Founder-approved Money & Bills and Housing & Utilities stay protected.
