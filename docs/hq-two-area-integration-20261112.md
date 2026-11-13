# HQ RC-02 — Everyday Access + Conversation Repair integration (draft)

**Status:** PRE-RELEASE DRAFT ONLY. No merge, Pages publication, full integration QA certification or founder acceptance.
**Coordination:** https://github.com/ouroneplace/ouroneplace.github.io/issues/63
**Published baseline:** `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`.
**Source PRs:** Team A #67 at `ed024064094e97273100cd68d41e1e9cbf5194b5` (698/698 source-head browser tests); Team C #68 at `23b0d0b7c6408ae4acdb2ab78fadaa7ac247efa9` (700/700 source-head browser tests). Source tests do **not** certify this combined head.
**Excluded:** #62 frozen five-area release candidate; #64 operating docs; #65 Knowledge Atlas; Team B #66 pending source QA; Team A #70; Team B #71; Team C #69; old #3/#4/#5/#27; closed #55. No PR is closed by integration preparation.

## Two visitor outcomes
1. Aging & Accessibility: a free, first-party access-barrier education/plan with five static guides, optional reviewed plan, safer decision practice, paper/no-JS fallback and stop/help limits.
2. Relationships & Communication: a free, fictional communication rehearsal distinguishing observations from invented motives, reflective listening, voluntary bounded repair and a locally editable, unsent response.

## Provenance and change boundary
- Source files copied as **identical Git blobs** from exact PR #67/#68 heads: their two feature HTML pages, two feature-specific specs and two scoped evidence ledgers. The six original blob SHA values must be compared during PR review.
- HQ-only changes: existing `index.html` adds one link in each of the **existing** two area views; no 19th area, no fifth catalog offering, no approved content deletion or altered TEAL/lessons.
- HQ-only `scripts/verify_live_site.cjs` gains desktop/320px area-to-practice smoke, a reviewed access-plan invalidation and a fictional conversation response.
- HQ-only `.github/workflows/verify-live-site.yml` extends exact deployed-byte integrity with two new pages (existing 22 monitored files + 2 = **24**, assuming this baseline; rederive after future main merges).
- New `tests/hq-two-area-integration.spec.cjs` covers area navigation at 320/390/1366/1920, catalog count, substantive practice and recovery.

## Release gates and limitations
- New **combined-head** `npm run test:quick`, targeted integration Playwright and full `npm test` required. Record exact resulting run, duration and failure repair; old source-green runs cannot stand in.
- Independent manual 320/390/1366/1920 and 200%-text visual testing, keyboard/screen reader output, no-JS, reduced-motion, privacy/request checks, original official sources, cultural/region boundaries and founder perception remain to be verified. Built-in tests don't imply human acceptance.
- Access page currently declares `noindex,nofollow`. Deliberately decide search discoverability during authorized release preparation rather than silently changing a team feature; a public URL is not private.
- Each page is English-only and educational, not a guarantee of clinical access, equipment suitability, legal accommodations or successful relationships. No user message is sent; no account or analytics is created.
- **Reconciliation hazard:** if PR #62 releases before this branch, HQ must reconstruct the new area links and smoke/manifest against the **new actual published `main`**, preserving #62's four feature routes and 26-file manifest; never blindly merge overlapping old `index.html` and workflow versions.
- Only after specific founder scope approval: merge authorized changes once, verify actual Pages exact commit and all monitored bytes, then desktop/mobile live smoke and post-merge regression. Otherwise stay draft.

**Founder action:** No founder action needed at draft creation. HQ must finish technical QA before a one-experience-at-a-time review.
