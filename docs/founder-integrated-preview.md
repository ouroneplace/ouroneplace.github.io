# ONE PLACE — Combined Founder Preview (Unreleased)
Date: November 8, 2026 · **NOT a release candidate / DO NOT MERGE**

This testing-only branch is derived from Housing & Utilities draft PR #5 and includes the Our Humanity draft PR #4 files and links. It exists because the founder saw no Our Humanity menu on the current public homepage and had to download separate ZIPs to test each part of one website.

## What to open
1. Download this branch as a ZIP and extract it. Open `index.html` in Chrome (or use a local HTTP server if browser navigation limitations appear).
2. Top menu → **Our Humanity**. Explore the original human experience and Curiosity Studio.
3. Home → **Housing & Utilities** → **Home Skills Academy** (36 introductory guides).
4. Home → Housing → one of the existing four free services. Verify all paths and return links.
5. Do not test with real family names, addresses, bank information or sensitive details.

## Status / source of truth
- PR #3: Debt & Creditor Guide; unchanged and **not bundled** in this preview.
- PR #4: Our Humanity + Curiosity Studio, separate draft.
- PR #5: Housing & Utilities + Home Skills Academy, separate draft.
- This combined branch is a **snapshot for founder testing**. As the source branches evolve, it can become stale. Tests must identify exact head revisions.
- Only authorized development was combined. **No merge to main, GitHub Pages deployment, paid services, analytics, accounts, visitor outreach or publication**.
- GitHub repository source and pull requests may be publicly visible even when features are not deployed to the website. Do not interpret 'founder preview' as access-controlled confidentiality.
- Our Humanity and Housing are adjacent content, not replacements for 18/72 catalog, Human Literacy, TEAL, or existing approved tools.

## Gate for a future public release
- Consolidate accepted feature changes through an intentional, reviewed merge plan, not by blindly merging multiple overlapping PRs.
- Verify navigation, key visitor tasks, content/health/safety accuracy, phones, 200% zoom, keyboards, accessibility, download, resilience and privacy.
- Separate founder acceptance and explicit final deployment approval remain mandatory. Passing CI doesn't equal acceptance.


## November 8, 2026 — Founder unified-preview desktop walkthrough (2m 38s)

Founder submitted a 158-second desktop Chrome recording of an extracted local preview. The video had no audio, and no recording or personal device path was uploaded into this repository.

**Directly observed:** Our Humanity opened and its scenario choices displayed; Curiosity Studio's RGB and symmetry activities were visible; Housing & Utilities assistance, safety and task-planning pages appeared; Home Skills Academy room filters moved among laundry and hazard-recognition subjects; the beginner toolkit and lesson expansion/collapse were used. Recorded views show continuity among several One Place experiences within one downloaded ZIP. This does not itself verify the exact tested Git commit, all navigation links, or every control.

**Confirmed usability defect:** After opening two Home Skills lessons, the founder switched to Laundry. The interface announced “2 lessons open” although both open lessons were filtered out of view. This preserved state correctly but confused visible and hidden counts. The current draft now says how many open lessons are hidden by filters and updates that status as filters/search change. A Playwright test reproduces the sequence and checks that “Close open lessons” clears all open entries.

**Unresolved before acceptance:** Demonstrate mobile 320px and 200% zoom in real browsers, keyboard and assistive technologies, accuracy and teaching quality of task-specific references, task-list file import/export, successful completion of a safe physical household task, and visual instructional aids. The recording is evidence of observed usage, **not** complete founder approval or evidence of practical repair competence.

The website's production main branch remains outside this review; publication and merging still require separate explicit founder approval.
