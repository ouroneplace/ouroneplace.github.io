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


### Real CI font-metric mismatch and corrected narrow-phone cap — Nov 12, 2026 Central

First enlarged-word regression on source head \`7216fd33074f66c7fc90751e82c8d9d0d0559633\` ran full Actions #43350555711: **697 passed, 1 failed**, specifically 320px/200% word-integrity; CI Chromium split \`preparation.\`, \`compensation\`, and \`information\` despite independent local Chromium passing at 200%. The failing GitHub trace HTML was downloaded, and its Git blob matched the current source at that head, ruling out stale code. Browser font metrics differ across environments.

Refined ONLY ≤370px page/panel padding and H1/H2/H3 caps (40/36/32 CSS px maximum at this extreme), keeping normal 320px heading sizes and enlarging paragraph text at 200%. Independent Chromium tests passed at 320px/200%, **225% and 250%** root text (no word breaks in selected headings/choices/actions and no lateral overflow); unchanged 390px and desktop layout checks remain valid. The committed full-suite test was **not weakened**; the next exact-head CI run must still pass before HQ intake. Native screen-reader/physical-device editorial gates remain open.


### Second CI font-width follow-up — Nov 12 Central (GitHub Nov 13 UTC)

Full exact-head run [43352016536](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43352016536) on \`5863034abeef52d384a5f591ac1629cfc698b557\` still **failed 1 of 698**, with 697 passing: 320px/200% Word Range test reported \`compensation\` and \`information\` in nested H3 elements (first H1 \`preparation.\` problem now fixed). The strict test remains unchanged. Tightened only the **≤370px nested panels and card padding to 6px**, and H3 max font-size to 28 CSS px in this exceptional mobile enlarged-text layout (bold semantic H3 retained; body text remains full 200%). Exact updated page byte-for-byte local Chromium: no split words/no horizontal overflow at normal 320/390/1366/1920, enlarged 320 at 200%, 225%, 250%, enlarged 390 at 200%, plus 320/250% with system-ui, Arial, DejaVu Sans, Liberation Sans and Noto Sans. The previous CI failure is recorded, not ignored; the next exact-head run must pass the unchanged test.

### Keyboard pathway focus handoff — November 12, 2026 Central

An independent Chromium keyboard-only route check on the previously green Veterans source found that Enter on a noncurrent pathway displayed the correct article but left `document.activeElement` on `BODY` rather than the new `<article tabindex="-1" aria-labelledby="...">`. This obscures the focus target and can make it harder for keyboard or assistive-technology readers to understand the switch. The feature-owned `choose()` handler now focuses **only newly selected** lesson articles with `focus({preventScroll:true})` after unhiding them. It does not focus on initial page load, does not hijack the privacy anchor, or change plan/checklist persistence semantics. In local Chromium at 320px, Enter on Caregiving moved focus to `ARTICLE#caregiving`, next Tab reached its first checkbox, and privacy-link navigation preserved the reviewed plan. The pre-fix source focused `BODY` under the same test. A focused Playwright test now covers Enter → article focus → checkbox Tab/Space → reviewed plan → privacy → another pathway/focus/invalidation. Native screen-reader announcements and physical devices remain an independent HQ gate. The full exact-commit GitHub Actions result is separately recorded; previous green run does not validate this change.

### Print and paper-fallback QA — November 12, 2026 Central

Independent browser print-media audit on the exact source verified that a reviewed Veterans plan remains fully visible (no maximum-height clip), the active lesson stays visible, and the page navigation/action controls are excluded from printed pages. In JavaScript-disabled print mode, all eight teaching pathways and their government reading references remain visible, while plan-export controls remain unavailable; the paper-instructions fallback remains present. Two focused Playwright regression tests now lock these distinct states. This is test and evidence only; the latest source HTML and all approved visitor-facing work remain byte-identical. Chromium print-media computed-style coverage is not a physical printer/PDF or assistive-technology certification. A fresh exact-head GitHub Actions pass is required before the PR can again be marked full QA green.
