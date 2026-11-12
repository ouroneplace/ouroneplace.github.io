# GitHub Field Guide — first-person One Place project literacy
Date: November 12, 2026 (Central)
Status: Draft for founder experience. No publication approval.

## Purpose
Build an actual, short, understandable learning experience about GitHub using the founder's real One Place repo, not disconnected terminology or coding exercises. This is part of the existing **Learning & Education** life area; not a new category, catalog offering, login feature, or separate subscription.

## Four learner outcomes
1. Tell the source repository (Code) apart from the published One Place visitor site; inspect index.html.
2. Explain why a draft pull request and a development branch do not automatically publish site changes; use PR #53 as a fixed historical example.
3. Understand that a red X is a test workflow failure requiring log investigation, not proof the live site broke. Nov 12 PR #54 case study: 682 passed and 1 failed because an ambiguous locator matched two Studio links; one-line test selector fix, not a visitor-page defect.
4. Distinguish approval/merge from exact GitHub Pages deployment and post-merge live verification; use PR #53 deploy and regression evidence.

Every topic has: plain language, one concrete real action with official GitHub URLs, one ungraded choice with explanatory feedback, navigation to previous/next, and an explicit privacy/release-boundary reminder. Visitors can skip any question. JavaScript enhances one-at-a-time display; with JavaScript off, all four educational topics and links remain visible, with disabled answer-check buttons (and no form submission).

## Verified project evidence
- Public project repository: https://github.com/ouroneplace/ouroneplace.github.io
- Published site: https://ouroneplace.github.io/
- Published PR #53: https://github.com/ouroneplace/ouroneplace.github.io/pull/53
- Historical failed PR #54 regression: https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43290949256
- PR #53 Pages deployment: https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43286732387
- PR #53 post-merge regression: https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43286734302
- GitHub official guide to workflow run logs: https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs
- Official docs consulted: https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/changing-the-stage-of-a-pull-request and https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

All historical examples are dated; the learner is warned that PR status and test status can change. The field guide does not claim a historical screenshot is current, access private GitHub data, or need account credentials. Selecting explicit external links may open GitHub in a new tab; nothing is fetched from a third party on page load.

## Code and QA boundary
- New page: `one-place/github-field-guide.html`.
- Existing homepage: one extra discoverable, free lesson link **only** on the Learning & Education area view; existing 18 areas/72 solution offerings and 4 cards for that area unchanged.
- New 13 focused browser tests: four viewports 320/390/1366/1920, four explanation/repair flows, previous/next/browser Back, 320px+200% text and keyboard, no-JS readability, area integration and privacy/official links.
- Add guide to production desktop/mobile smoke and exact published file manifest (21 → 22 relative to current `main`).
- This draft record. No approved Health, Housing, Family, Money, TEAL or other site paths altered.

The current main baseline is `a67bafac6e5ce68a5263c4cc268a14eaa934bd81`. Separate unpublished PR #54 uses that same baseline and modifies the same production smoke/manifest files; resolve any conflicts intentionally if one is approved before the other. Do not lose either release gate or mix their approval scopes.

## Review gates
Current-head quick audit/full Playwright regression and independent 320/390/1366/1920 and enlarged-text visual check must pass before founder publication decision. Do not claim UX accessibility certification or founder approval solely from CI. After any separately authorized merge, check exact-SHA Pages, current file-count integrity (rebase if another draft merged first), desktop/mobile live smoke, and post-merge full regression.

**No merge or publication without explicit founder authorization.**