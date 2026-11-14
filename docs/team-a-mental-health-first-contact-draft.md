# Team A — Finding Support: First Contact Practice (source-only draft)

Date: November 13, 2026 CT / November 14 UTC. Team A Mental Health & Safety. Individual working visitor outcome; not whole-area nor five-area v1.0 completion.

## Verified baseline and gap
Draft based on founder-approved public `main=997f51a7b03e486011ba70251f811cd65d207438` (HQ founder-scoped RC-06 Device Care). Existing published `one-place/calm-moment-practice.html` teaches optional self-coping, support requests and *recognizing when* professional help may matter. Existing `one-place/support-skills-safety.html` teaches helping **another person** with boundaries/urgent risk. Public main Mental Health area offers external crisis/treatment URLs and a future service preview, not a first-party practical first-care-access inquiry. This source fills the gap after deciding to look for help: identify a verified route to qualified care, ask about actual availability/cost/coverage, and confirm virtual/accessibility/privacy arrangements. Do NOT duplicate coping, crisis risk assessment, therapy, mental health tests or navigator listings. No modification to existing source or held PR #79.

## Real outcomes
- Three original fictional nonurgent cases: credible provider starting route (primary care, health plan, SAMHSA etc); affordability/new-patient intake without unfounded guarantees; accessible/secure telehealth versus in-person follow-up. Each WHY, HOW, CHECK RESULT, MISTAKE, STOP and one 3-option decision practice (9 option-specific explanations).
- Optional local-only sample inquiry builder with 3 non-personal dropdowns: appointment question/verified contact route/what to confirm; generates a generic sentence selected manually for copy. Stale sample clears on change/reset. No names, diagnosis, symptoms, ages, addresses, numbers, insurance ID, payment credentials, email, phone, login, uploads, browser storage, automatic network calls or generated diagnoses. The site does not verify, book, send or retain the inquiry. No-JavaScript static teaching and written sample remain readable/printable; disabled interactive controls are not hollow.
- Front-of-page crisis/urgent boundary: U.S. 988 (call/text for crisis support), 911 for life-threatening emergency, verified local resources elsewhere; active danger -> leave lesson. No safety classification or clinical urgency decisions based on choices.

## Primary official sources directly reviewed Nov 2026
1. NIMH help locator and question preparation: https://www.nimh.nih.gov/health/find-help
2. SAMHSA, find health care/support and confirm availability/insurance: https://www.samhsa.gov/find-support/health-care-or-support
3. SAMHSA low-cost/sliding fees: https://www.samhsa.gov/find-support/how-to-pay-for-treatment/free-or-low-cost-treatment
4. SAMHSA first appointment, access/transport/insurance question prep: https://www.samhsa.gov/find-support/health-care-or-support/how-to-set-up-an-appointment
5. NIMH virtual mental health care, coverage/security/experience: https://www.nimh.nih.gov/health/publications/what-is-telemental-health
Also checked NIMH crisis/988 guidance and official 988 site; 988 route opt-in. U.S.-specific scope, no assertion of coverage/appointment availability or advice for any particular person. A good provider fit is individual; credentials/licensure and actual appointment, secure portal, payment and access must be verified by the visitor with live provider.

## Twelve-lens quality and QA contract
Visitor starts from a real care-access barrier; map nonurgent route, cost/access, problem when first call fails and urgent escalation. Real self-contained skills/fictional practice plus local-only inquiry. WHY/WHAT/HOW/CHECK/MISTAKE/STOP, respectful privacy, no false guarantees, official sources/dates, true availability vs future services, area/home/back and print/no-JS paths. Focused Playwright covers four viewport widths (320/390/1366/1920), 200% root-text on 320px, keyboard/skip/fieldsets/feedback, all 9 option explanations, blank/correct/unsafe/stale/reset, sample builder empty/complete/changed/reset/select, no browser storage/network writes/auto third-party calls, 988 and 5 official source link semantics. Must inspect actual exact-head GitHub Actions full `npm test` and job logs. Automated tests DO NOT establish human first-time comprehensibility, physical device/native screen reader, clinician or licensed mental-health professional review, payment/eligibility, privacy of external sites, or WCAG certification.

## Scope and HQ handoff
Exactly 3 ADDED Team A-owned files only:
- `one-place/mental-health-first-contact.html`
- `tests/mental-health-first-contact.spec.cjs`
- `docs/team-a-mental-health-first-contact-draft.md`

Do not edit accepted public homepage/other areas, legacy Team A work, HQ manifests/test smoke/CI, RC-06 Device Care, other team files or held #79. HQ exclusively owns scoped integration onto then-current approved main, needed area discoverability/live verifier, combined QA, proportional clinical safety/real-world accessibility verification, and seeking specific founder release authorization before merge/Pages. Existing #81 four independent review streams remain unresolved. Source-green alone is NOT five-area Team A milestone or entire Mental Health & Safety v1.0.
