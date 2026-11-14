# Team A — Caregiver Relief & Respite Practice (source-only draft)

November 14, 2026 UTC. Team A assignment: Family & Caregiving. This is a proposed **extension to an already founder-accepted area**, not a reopening, rewrite or re-acceptance of Family & Caregiving v1.0.

## Fresh current-state gap verification
Authored on founder-approved RC-07 `main=1820eb232a25f7e43bd285be1a1c784132ea5910`; read GitHub issue #63 and open PRs, `docs/DEVELOPMENT-QA-WORKFLOW.md`, `docs/founder-acceptance-record.md`, and 12-lens completeness standard. Existing accepted `one-place/family-handoff.html` coordinates daily helpers and tasks; published `one-place/support-skills-safety.html` teaches interpersonal boundaries and one's own support capacity; `one-place/care-navigation.html` focuses on medical transitions. None directly teaches **how to arrange a temporary caregiver break, verify respite options and safely cover care needs while a caregiver rests**. Do not change existing accepted tools or duplicate their task interface. All three new paths are ADD-only on their own Team A branch.

## Exact visitor outcome and safety constraints
- Three original fictional, nonurgent cases: specific safe respite ask respecting cared-for person's wishes, actual local respite/provider qualification/cost/availability/eligibility checks, and coverage confirmation for a planned break when the backup may not arrive. Each WHY/WHAT/HOW/CHECK/MISTAKE/STOP with three options and nine distinct explanations, all exposed via expandable HTML `details` when JavaScript is off.
- An optional **read-only, locally generated, manually selectable** 3-dropdown conversation builder with valid/blank/changed/reset states. No names, care needs, diagnoses, medical/financial/contact information, accounts, payment, upload, local/session storage, network POST or outgoing messages. Do not place a vulnerable person alone or use an untrained person for transfer, clinical decisions or medicines. Actual professional care plan governs all clinical tasks; legal consent and local rules vary. No guarantee of staff, price, benefits, coverage, Medicare/Medicaid payments, eligibility, access or availability.
- First-party page includes separate link to already accepted Family Handoff Toolkit for actual ordinary task assignments; this draft is educational only. No claim of live respite booking/directory, clinical assessment or crisis response.
- Safety message appears before any lessons: immediate danger -> local emergency services; if coverage is not secure, pause the leave plan and contact appropriate qualified help.

## Direct primary-source review November 14 2026
1. NIH/NIA: `https://www.nia.nih.gov/health/caregiving/what-respite-care` — purpose, formats, asking friends/family, varied costs and possible public coverage conditions.
2. NIH/NIA: `https://www.nia.nih.gov/health/caregiving/taking-care-yourself-tips-caregivers` — caregiver health and support.
3. Administration for Community Living: `https://acl.gov/programs/support-caregivers/national-family-caregiver-support-program` — federal grant-supported information, access help, counseling, caregiver training, respite; implementation and eligibility vary locally.
4. Eldercare Locator `https://eldercare.acl.gov/` — U.S. older-adult local support starting point, not confirmed provider or appointment.
All external sources open only by user click; no third-party library or analytics injected.

## QA/release contract
Focused `tests/caregiver-respite-practice.spec.cjs` has 14 cases: 4 widths 320/390/1366/1920; 3 decision lessons with all nine option explanations, blank/state invalidation/reset and no-JS `details`; visible upfront safety/consent; three-select builder blank/valid/edit/reset/manual copy; keyboard/skip/200% root text on 320; no-JS paper alternative; zero storage/network writes/external auto requests; official source semantics, accepted existing family-toolkit return. Actual GitHub Actions `npm test` exact PR head/full logs and 12-lens site audit required before final handoff. Browser testing is NOT first-time-user study, physical devices, native screen-reader testing, independent social-work/caregiver specialist or legal/clinical validation. Do not claim complete Family & Caregiving teaching/whole Team A 5-area Version 1.0 from an individual educational draft.

**Add-only ownership**
- `one-place/caregiver-respite-practice.html`
- `tests/caregiver-respite-practice.spec.cjs`
- `docs/team-a-caregiver-respite-draft.md`

Preserve approved homepage, `family-handoff.html`, Family & Caregiving v1.0 acceptance, all prior RC-05/06/07 public baselines, other teams and HQ RC-08, #79 explicit founder HOLD and #81 independent review streams. HQ exclusively owns selective integration onto then-current approved main, any area discoverability and verifier/manifest updates, fresh integrated CI, proportionate expert/human review and separately scoped **founder consent before public merge/Pages**. No release authority implied by this source PR.
