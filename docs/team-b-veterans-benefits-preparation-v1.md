# Team B — Veterans Benefits Preparation v1.0 | Draft QA and HQ handoff

Status: independent, unpublished Team B development; founder has not reviewed or approved release.
Reviewed November 12, 2026. Baseline main: 2b2a32ed3a33de82af8ec96fa788b9f8045eb776.

## What visitors can do
- Eight U.S.-specific first-party pathways: disability, health care, education, family caregiver, survivors, transition/employment, VA home loans, decision reviews.
- Each path teaches why the issue matters, three possible record categories, three concrete questions, a safe next step, authoritative government links, and a clear eligibility limitation.
- An optional in-page checklist produces a reviewed text plan and asks permission before a local download. Path/checkbox edits invalidate any prior plan. Clear requires confirmation.
- No free-text fields, login, upload, application, storage, bank connection, payment, analytics, third-party script, automatic navigation to government forms, eligibility scoring or promise.
- No-JavaScript readers see all eight complete guides and official links; inactive controls remain disabled.

## Source and jurisdiction controls
All named VA benefits are U.S.-specific; non-U.S. visitors are directed to their own country's responsible authority. Source review was conducted November 12, 2026. Core official primary-source references:
- VA claim evidence: https://www.va.gov/disability/how-to-file-claim/evidence-needed/ and https://www.benefits.va.gov/compensation/evidence.asp
- VA intent to file (May 2026 revision): https://www.va.gov/forms/21-0966/
- VA health care application: https://www.va.gov/health-care/how-to-apply/
- VA education eligibility/applications: https://www.va.gov/education/eligibility/ and https://www.va.gov/education/how-to-apply/
- VA PCAFC eligibility and joint application: https://www.va.gov/family-and-caregiver-benefits/health-and-disability/comprehensive-assistance-for-family-caregivers/
- VA DIC: https://www.va.gov/family-and-caregiver-benefits/survivor-compensation/dependency-indemnity-compensation/
- DOL TAP / spouse and caregiver opportunities: https://www.dol.gov/agencies/vets/programs/tap
- VA VR&E criteria: https://www.va.gov/careers-employment/vocational-rehabilitation/eligibility/
- VA COE: https://www.va.gov/housing-assistance/home-loans/eligibility/
- VA review options/deadlines: https://www.va.gov/resources/choosing-a-decision-review-option/ and https://www.va.gov/resources/decision-reviews-faqs/
- VA accredited help: https://www.va.gov/get-help-from-accredited-representative/
- VA benefit scam protection: https://www.va.gov/resources/how-to-protect-your-identity-and-your-va-benefits-from-scammers/
- VA military records: https://www.va.gov/records/get-military-service-records/

## Limits and explicit omissions
- The guide does not decide any program's eligibility, estimate compensation, calculate effective dates or deadlines, interpret an individual discharge, verify application status, or apply on anyone's behalf.
- Check actual decision letters for review deadlines; not all review options accept new evidence. Intent-to-file is not universal.
- PCAFC rating alone is insufficient; VR&E applications include counselor evaluation; COE is not a home loan approval.
- Official source websites and policies can change. No international program-specific guidance yet; no localized phone numbers, forms, languages or case-specific instructions.
- Static site hosting may retain ordinary access logs; any local text download may be accessible on a shared device. Native screen-reader testing remains a manual acceptance gate.

## Scope and QA
New files only: one-place/veterans-benefits-preparation.html; tests/veterans-benefits-preparation.spec.cjs; docs/team-b-veterans-benefits-preparation-v1.md.
Does not modify index.html, global navigation, shared workflows, scripts/verify_live_site.cjs, Money/Housing accepted pages, or PR #62 Career/Business drafts.
Focused Playwright covers eight pathways, 320/390/1366/1920 widths, 200% text/keyboard, no JS, download consent, clear cancel/confirm, edit/review invalidation, privacy/network/storage and government-source link safety.
Run npm run test:quick; npx playwright test tests/veterans-benefits-preparation.spec.cjs; npm test on exact PR head. Record actual run results separately. Automated tests alone are not a manual screen-reader or founder visual approval.

## HQ integration instructions (HQ-owned shared files only)
1. After this PR passes CI and founder authorizes the release, reconcile with current main and any merged cross-team PRs before merge. Do not merge merely because this draft exists.
2. Add one clearly labeled link, href="one-place/veterans-benefits-preparation.html", to the existing Veterans & Military Families area view in index.html without changing the 18/72 catalog or replacing its other entries. Use an existing-area first-party tool style; do not create a new area.
3. On a separate HQ integration branch, extend scripts/verify_live_site.cjs with a direct-path smoke check (select Health, mark example, review plan, verify source and no stale plan after edit) and extend .github/workflows/verify-live-site.yml exact-byte manifest for this new page, preserving all entries from PR #62 or other releases. Do not assume a fixed manifest count.
4. Run integrated regression against the latest main, visual checks at 320/390/1366/1920 and enlarged text, assistive technology, link review and actual browser download. Obtain the founder's explicit publication permission.
5. After authorized merge, confirm Pages exact deployed SHA, deep link and homepage entry, official links, and production desktop/mobile smoke; report deployed outcome separately.

## Founder authority
No founder action needed during independent development. HQ may collect a release decision after tested integration. The founder will do experience review on their chosen schedule.


### Independent large-text readability repair — November 12, 2026 (Central)

The exact previous source head at 320px/200% root text had mid-word fragments in the heading, selected topic, buttons and later subheadings despite no horizontal scrolling (12 split non-whitespace tokens in an independent Chromium Range geometry review; 390px/200% had 21). That is a readability defect, not evidence of a WCAG failure. The narrow mobile-only CSS correction uses full-width pathway choices, modest fixed padding, and capped **heading/choice/control** sizes while keeping body paragraphs at the requested 200% enlargement. At 320 and 390px enlarged text, the same exact-browser word geometry found **zero split words** across visible headings, pathway labels and action buttons (natural hyphen breaks excluded). 320/390/1366/1920px normal and 320/390px 200% all had no horizontal overflow; inspected actual Chrome render of action controls and disability case. Focused browser tests now pin these word-integrity and width behaviors. Real native screen-reader/physical-device and founder subjective approval remain unverified. This is a source-only draft repair, not a publication decision.
