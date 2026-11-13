# Career Readiness Planner — founder development and QA record
Date: November 12, 2026 · One Place v7 · **Unpublished draft**

## Why
Work & Careers currently has two generic external-resource entry points and two future/tool previews. A visitor who wants to learn a career skill or prepare for an interview has no first-party way to produce a useful, honest plan. Build one small, complete outcome rather than another directory or generic three-choice quiz.

## Usable outcome
A privacy-minded, account-free **Career Readiness Planner** with four linked stages:
1. Choose a realistic career direction or training goal.
2. Identify one truthful transferable skill and a specific situation.
3. Practice an interview-ready explanation: situation → what I personally did → result or what I learned.
4. Choose a doable next action and independently verify any prospective employer.

The page offers four **fictional, editable** structured examples: first job, changing careers, returning after a break, flexible work. These do not automatically claim personal qualifications. A visitor may replace them with truthful information, build a reviewed plan, download a `.txt` file or print by explicit confirmation, and clear the draft with a protective confirmation. Canceling replacement or clear preserves current work. Editing a reviewed plan invalidates export until rereview.

The page never generates invented achievements, employment projections, salary claims, legal advice or job postings. No login, résumé upload, employer/bank identity input or automated matching.

## International, safety and evidence guardrails
- Transferable skills can be evidenced from work, training, volunteering, family responsibilities or projects when described truthfully, without requiring sensitive personal history.
- The job security checklist warns against surprise unverified recruiters, upfront employment or equipment fees, fake check deposit-and-return requests, and premature identity/bank disclosure. Verify employers through independently known company channels; no site can guarantee a job offer is safe.
- U.S. EEOC rules about reasonable accommodation during job applications are **U.S.-specific**. Other countries require separate local rules; the planner does not make an individual discrimination finding.
- The page provides direct original guidance:
  - CareerOneStop (U.S. Department of Labor sponsored), relevant resume skills: https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/top-portion-of-resume.aspx (retrieved Nov 12, 2026).
  - FTC Job Scams: https://consumer.ftc.gov/articles/job-scams (retrieved Nov 12, 2026).
  - EEOC Job Applicants and ADA: https://www.eeoc.gov/laws/guidance/job-applicants-and-ada (retrieved Nov 12, 2026).

## Exact change scope
Published main baseline: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` (Care Navigation release).
- New `one-place/career-readiness-planner.html`, first-party static HTML/CSS/JS and no network calls until visitor clicks an external reference.
- `index.html`: exactly one link only inside the existing **Work & Careers** area view; no 19th area, no changed catalog card, no inflated claim of available services.
- New `tests/career-readiness-planner.spec.cjs`: tests for four example starters, all 320/390/1366/1920 layouts and 200% text, blank/invalid inputs, overwrite and clear cancel/accept, explicit download with exact content, keyboard, no-JS, escaped input, privacy/no network writes/storage, homepage source preservation and safe external links.
- `scripts/verify_live_site.cjs`: first-party desktop/mobile smoke exercises example, deliberate review and confirmed clear.
- `.github/workflows/verify-live-site.yml`: exact byte integrity expands **22 to 23** monitored application files.
- This documentation file. All previously approved features unmodified; no GitHub Field Guide.

## Twelve-lens completeness check
1. Entry: Work & Careers homepage area, free planner clearly labeled, four catalog cards remain.
2. Map: direction, skill proof, interview explanation, job-offer verification, optional accessible hiring.
3. Useful result: reviewed/printable/downloadable action plan; no background job matching or made-up results.
4. Teaching: what/why/how, real-skill example and action/learning, common mistakes and independent verification.
5. Safety: no employment guarantee, financial fees or identity disclosure, legal regional caveats.
6. Evidence: official CareerOneStop/FTC/EEOC original references and visible checking date.
7. Truth: fictional examples explicitly labeled; visitors must edit accurately before sharing.
8. Navigation: homepage area, One Place home, anchors, history; no dead links.
9. Privacy: local only, no browser storage, no automatic file, explicit download/print with shared-computer warning; browser field restoration caveat.
10. Accessibility: native labels, keyboard controls, 320/390/1366/1920 and 320px+200% text, focus status, reduced motion, clear no-JS educational fallback.
11. Recovery: blank/partial inputs, edited-after-review, replace cancel/accept, clear cancel/accept, download cancel/accept, print confirmation.
12. Proof: exact current-head tests and recorded findings, desktop/mobile visual verification and separate founder release decision; no claim of whole Work & Careers acceptance.

## Release and parallel development
This is a **new independent draft** from published main, not the three-area integrated PR #59. Their proposed links and smoke/manifest files overlap; **if one is approved and merged first, reconcile the other against new main and rerun CI** to preserve *all* monitor paths and checks. Never blindly overwrite the live-site manifest to 23 if PR #59 has already added 24; the combined published count would be 25.

Full current-head CI must pass before asking for narrow founder release approval. Founder will test on their chosen schedule and does not need to manually diagnose CI. No draft is an unseen private production site: public GitHub branches may be discoverable. No publication without explicit founder authorization for this specific PR.
