# Team A — Preventive Care Conversation Practice (source-only draft)

**Team:** A · **Area:** Health & Wellness · **Parent approved `main`:** `05501c9643e4fbf1fd876a18e3347bff15ea4b8e` · **Branch:** `team-a/health-prevention-conversation-20261113` · **Date:** November 13, 2026 Central.

## Visitor outcome and why this is a justified gap

Visitors can practice **four decisions to prepare for a preventive-care discussion without submitting medical data or receiving a personal screening/vaccination schedule**: (1) how to ask which services fit rather than acting on a general list, (2) finding official vaccination history, (3) asking about benefits, limitations and screening follow-up, and (4) checking cost/access and follow-through. Each lesson includes a WHY, key knowledge, HOW, CHECK, STOP condition, fully fictional three-choice scenario, readable explanation and official-source link.

**Source-backed baseline audit before starting:** Existing founder-approved `one-place/health-wellness.html` (blob `7c7e2ff93594e34773b610dbfd239812e3b9951f`) already provides coverage basics, visit preparation, Wellness Routine Builder and founder-accepted Appointment Preparation Studio. Existing released `health-literacy-lab.html` (blob `8c5bb94d8ef53659e6c60a8d5533e3fb88c956f4`) teaches OTC medicine labels, medicine questions, online health claims and handling screening results. `health-costs-lab.html` (blob `d2905c265ca118a502f8d774a17936975b6077d2`) teaches EOB/bill comparison and coverage concepts. `care-navigation.html` (blob `12a95207305ab995d44048a3bf734bd22ff9d051`) helps with appointments, discharge, pending results/referrals and access. The new lesson is **not** a duplicate prescription/medical advice tool, invoice checker, screening-results tracker or another editable appointment Studio. It fills the narrower upstream skill of **prevention planning and informed questions**. Do not overwrite accepted components.

**Parentage and scope:** Only add `one-place/preventive-care-conversation.html`, `tests/preventive-care-conversation.spec.cjs`, this Team A QA note to a source branch. **No homepage/Health hub, shared stylesheet, site manifest, workflow, TEAL, protected acceptance record or other team's files should be modified by Team A.** Any future discoverability link must be added by HQ when integrating a bounded release candidate from its then-current accepted main. This is **source content only** until further decision and release.

## Public official sources independently opened November 13, 2026

- U.S. Department of Health and Human Services, MyHealthfinder, *Find and Access Preventive Services* — `https://odphp.health.gov/myhealthfinder/doctor-visits/doctor-visits/find-and-access-preventive-services`. Relevant: clinician conversation, finding access, and costs; no universal coverage promise.
- MyHealthfinder, *Get Screened* — `https://odphp.health.gov/myhealthfinder/doctor-visits/screening-tests/get-screened`. Relevant: shared discussion of screening tests, benefits/risks, family context, getting results and insurance uncertainties.
- U.S. CDC, *Staying Up to Date with Your Vaccine Records* — `https://www.cdc.gov/vaccines-adults/recommended-vaccines/keeping-vaccine-records-up-to-date.html`. Relevant: records may be held by prior providers, schools/employers or local registries; no national one-stop personal CDC record.
- MyHealthfinder, *Answering Questions on MyHealthfinder* — `https://odphp.health.gov/myhealthfinder/answering-questions-myhealthfinder`. Relevant: official service recommendations depend on personal context; One Place intentionally neither asks for these health details nor calls the service on anyone's behalf.

**Important 2026 nuance:** Public vaccination schedule pages contain legal/provisional revisions and are time-sensitive. This new feature deliberately **does not embed any vaccine/screening ages, eligibility, intervals, contraindications or drug doses**, and sends visitors only to official sources/qualified clinicians. Outside the U.S., recommendation, coverage and record systems vary; avoid suggesting U.S. insurance laws are universal. No claim of specialist signoff has been made.

## Proportionate risk/QA matrix

| Aspect | Source implementation / required proof |
| --- | --- |
| Clinical scope | **Medium-risk educational guidance:** fictional decisions, no recommendation engine, age/sex/history or record uploads, no dose/test schedule. Stop/seek licensed advice; urgent concerns go to local services. Any later personalized clinical triage would be high-risk and require a separately authorized qualified review. |
| Real visitor value | Four complete real-world skills, checkable examples and paper prompts. No artificial scores, no sign-in, no external calls. |
| Privacy | No submitted personal data, local/session storage, cookies, tracking or network writes; checked by browser request/storage regression. |
| Safety state | Successful quiz feedback invalidates immediately upon any answer change; blank/unsafe/reset states tested in all four cases. |
| Accessibility | Native fieldset/legend/radio, visible `role=status`, skip-to-focusable main, keyboard, 320/390/1366/1920 and no-JS written explanations; actual physical Android/iOS and native screen reader result **not** asserted. |
| Sources & jurisdiction | Four official U.S. links, plainly marked external, use `noopener noreferrer`; dates and location scope in page. Actual future visitor browser link behavior and region-specific advice remain for integration QA. |
| Offline/print | All four teaching sections, no-device paper prompts and references available without JavaScript or on full-page print; interactive checking disabled without JS. |
| Integration | Current approved main preserved. HQ must reconcile an entry link, test on then-current main, run exact-head full CI/visual/privacy/link checks, determine further independent review proportional to material claims, and seek specific founder publication approval. |

## Test contract

Feature focused test: `npx playwright test tests/preventive-care-conversation.spec.cjs`.
Repository fast audit: `npm run test:quick`.
Repository required exact-head full regression: `npm test` via GitHub Actions; record actual pass/fail and real job log *after it completes*. The focused suite checks four content areas, 320/390/1366/1920 reflow and JS errors, all four correct/unsafe answer state transitions, changed-answer stale-feedback invalidation at 320/1366, reset/blank feedback, network/storage privacy, external-link safety, no-JS fallback/print, keyboard skip focus, and accepted internal destinations. **Do not claim any pass until the tested commit's CI log confirms it.**

## Honesty and milestone limits

This is **one new bounded skill**, not Health & Wellness whole-area Version 1.0 completion, not a merged/approved/published update and not Team A's entire 5-area completion. Family & Caregiving is already founder-accepted v1.0; Health whole-area needs source-backed coverage/QA assessment and HQ integration; Mental Health & Safety, Aging & Accessibility, Emergencies & Preparedness remain not fully certified. Existing founder-held HQ #79 with four independent human/real-device/native-AT/safety-evidence streams is **separate**; never widen/merge/publish it based on this source work. HQ alone owns integration and release decision preparation. No founder technical action needed to develop or test this source.
