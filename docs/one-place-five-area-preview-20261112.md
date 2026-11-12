# One Place — five-area integrated founder preview
Date: November 12, 2026 · **DRAFT, UNMERGED, UNPUBLISHED**

## Why one integrated preview?
The founder explicitly wants continued One Place development without waiting on each long regression, and intends to test when ready. A series of independent life-area PRs touched overlapping homepage area rendering, live production smoke, and exact deployed file manifests. This combined branch resolves those changes once and preserves all previously accepted pages so that one integrated preview can be reviewed and authorized independently of the development schedule.

## Five visitor outcomes integrated
1. **Health & Wellness — Guided Routine examples** (source PR #56): Four fictional editable starters inside the existing private Wellness Routine Builder. User-controlled, no automatic plan creation, consent before replacing nonempty fields. The accepted Appointment Preparation Studio is untouched.
2. **Technology & Digital Safety — Digital Safety Practice Lab** (source PR #57): Four first-party fictional scam decisions covering delivery texts, impersonation, sign-in codes and suspected payment fraud, with original FTC/CISA evidence, nonjudgmental explanations, privacy and worldwide caveats.
3. **Mental Health & Safety — Support Skills & Safety Lab** (source PR #58): Four nonclinical fictional support decisions covering respecting space, checking in, immediate danger escalation and caregiver/supporter limits; urgent help visible above the exercises; WHO/NHS/988 originals, no crisis intake or diagnosis.
4. **Work & Careers — Career Readiness Planner** (source PR #60): Four editable fictional job-stage starters, honest transferable skill/interview examples, reviewed local text export with confirmation, clear/reset consent, job-scam recognition, and print CSS showing only the reviewed plan. Official CareerOneStop/FTC/EEOC original references and regional caveats.
5. **Business & Entrepreneurship — Business Idea Reality Check** (source PR #61): Three fictional one-product/service scenarios, no-spend demand testing, nonnegative cost validation, integer-cent arithmetic with unit-level break-even ceil, positive/zero/negative contribution cases, reviewed optional local export and explicit limitations. Official SBA/IRS originals, same-currency and worldwide caveats.

## Exact integration provenance
- Base accepted published main: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` (Care Navigation Guide, Pages and post-merge 683/683 pass).
- Starting source: integrated **PR #59** head `a8e15147b81c31b285eb7fb9d8d09af9125e0a75`, which passed **716/716** Playwright tests and 0 site audit issues at exact head.
- Copied the **current** Career and Business new-page/test/evidence blob contents from their independent PR #60 and #61 branches, preserving those source versions.
- Homepage `index.html`: existing PR #59 Technology and Mental Health scoped links plus two more narrowly scoped conditions for Work & Careers and Business & Entrepreneurship. No catalog data edits; 18 life areas, 72 entries, and four original cards per area remain.
- `one-place/health-wellness.html`: identical to PR #59 tested page, retaining both original teaching routes and accepted Studio script and form.
- `scripts/verify_live_site.cjs`: intentionally concatenated the already separate five scenario smoke checks, preserving all original production routing, accepted Money/Housing/Family/Health and video privacy checks.
- `.github/workflows/verify-live-site.yml`: exact Pages byte-integrity list includes the two new pages added in PR #59 (Digital Safety, Support Skills) plus Career Planner and Business Reality Check: **16 named application files plus 10 lesson pages = 26 monitored files**.
- All four preexisting original `docs/*-draft.md` ledgers plus Career/Business ledgers retained. This file is the integrated checkpoint.
- Unrelated historical GitHub learning PR #55 remains closed and unmerged. The user explicitly excluded it from One Place.

## Risk and safety
No automatic site data writes, tracking, medical/counseling decisions, account sign-in, job matching or financial guarantees. Clinical crises require appropriate real-world local responders. Financial projections omit costs, taxes, labor and market proof. Fictional examples are not recommendations or personal claims. U.S. government sources are clearly U.S.-scoped; WHO/NHS sources are separately identified, with international variation.

The live website is publicly accessible whether or not the founder shares its address. Publishing anything remains a distinct decision. A draft PR in a public repository is not a confidential private page, but its HTML is not part of the GitHub Pages site's deployed main content until merged.

## QA and acceptance gates
- Independent PR #59 full integration CI: **716/716 passed**, zero audit issues.
- Independent PR #60 latest full CI: **701/701 passed**, zero audit issues, including one actual print-media regression.
- Independent PR #61 original full regression was **in progress** during this integration (do not claim pass or fail yet).
- The five-area batch must pass its own **exact-current-head full regression**, responsive tests at 320/390/1366/1920, 320px+200% text, keyboard/no-JS, privacy, source preservation, numerical edge cases, user-consent scenarios and safety links. Automated reflow is not a substitute for independent visual screenshot review or founder experiential acceptance.
- No merge or publication from generic `next`/`continue`. If founder approves this exact **five-feature batch**, recheck main and exact SHA and merge only this PR; verify exact Pages SHA, **26/26** byte-identical application files, 1366/320 live navigation/smoke, and full post-merge browser suite. Close or mark redundant independent PRs only after successful release, without deleting their evidence.
- Whole-area acceptance for Health & Wellness, Technology & Digital Safety, Mental Health & Safety, Work & Careers and Business & Entrepreneurship remains separate, even if individual features are approved.
- Other work may continue on fresh branches without waiting for this full test run, but integration must not silently overwrite source with newer untested content.
