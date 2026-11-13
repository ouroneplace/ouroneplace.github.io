# One Place — repository agent operating instructions

These instructions guide coding assistants and other contributors working in this repository. They **do not** authorize a merge, release, or public-site change, and never override the founder's explicit decisions.

## First actions — verify, don't assume

1. Read the current GitHub **Parallel Build Control Board**: https://github.com/ouroneplace/ouroneplace.github.io/issues/63.
2. Fetch the current `main` SHA and open PRs before claiming work. Do not assume a prior conversation, draft SHA, or displayed status is still current.
3. Read `docs/DEVELOPMENT-QA-WORKFLOW.md`, `docs/life-area-quality-standard.md`, and `docs/PARALLEL-DEVELOPMENT-OPERATING-STANDARD.md` when present.
4. Inspect accepted visitor experiences and pending PRs in the assigned area. Avoid duplicate tools/pages and preserve every approved feature.
5. Declare your owner/team and one real visitor outcome. Do not take another team's life area without Project HQ reassigning the task in issue #63.

## Roles and branch boundaries

- **Project HQ** — the sole integrator of shared site files, global navigation, `index.html`, global assets/config, `.github/workflows/*`, `scripts/verify_live_site.cjs`, release manifests and merges into `main`, subject to explicit founder release approval.
- **Team A** — Family & Caregiving; Health & Wellness; Mental Health & Safety; Aging & Accessibility; Emergencies & Preparedness.
- **Team B** — Money & Bills; Housing & Utilities; Work & Careers; Business & Entrepreneurship; Veterans & Military Families; Legal & Consumer Rights.
- **Team C** — Learning & Education; Technology & Digital Safety; Relationships & Communication; Daily Life & Organization; Transportation & Travel; Creativity & Legacy; Community & Civic Life.

Development teams work on unique `team-a/*`, `team-b/*`, or `team-c/*` branches from a **verified current** `main` and change only their own feature pages, scoped tests and feature-specific documentation. Avoid shared files; instead deliver exact shared-file integration requirements in the PR. HQ owns `hq/*`, `integration/*`, or `ops/*` branches.

Do not silently rebase, overwrite, merge, close, or delete another team's PR, branch, issue, or approved artifact. Resolve unavoidable cross-area source changes through an HQ review first.

## Visitor value and safety

One Place teaches people to **understand → practice → plan → act**. Each experience needs truthful functionality, concise and actionable teaching, plain English, accessible recovery, and a specific safe outcome. Do not create hollow previews, duplicated tools, fake scores, simulated professional services, or misleading claims of completeness.

Treat privacy, accessibility and region-specific law/health/finance rules as design requirements. Use primary sources when available, confirm links and dates, and distinguish fact from inference. Mark examples fictional. Never collect or transmit private user details without specific consent and a reviewed purpose. Public GitHub branches and GitHub Pages are not private simply because the URL is unfamiliar.

## Checks — efficient, but never skipped

While coding, run `npm run test:quick`, focused Playwright tests, syntax and source-preservation checks. Verify 320, 390, 1366, 1920 px and 200% text, keyboard/screen-reader semantics, reduced motion, no-JavaScript fallback, error/edit/reset cases, no unexpected network writes, safe official links and high-stakes escalation boundaries as applicable.

Before a release candidate is recommended, run full `npm test` / repository CI on the **exact final proposed commit SHA** and record the actual completed outcome; automated tests do not replace layout/visual and founder experiential review. If code changes after a green run, it is a new head and must be retested.

After a **founder-approved** merge only, Project HQ confirms GitHub Pages deployed the exact merge SHA, all required file-byte integrity checks pass, mobile/desktop live smoke succeeds, and full main-branch regression passes. Don't claim deployment or success merely because a PR was merged.

Minimize wasted CI by grouping coherent edits and running focused checks before pushing; don't open a new PR for every documentation sentence. Do not sacrifice test coverage to reduce waiting. Existing PR #41 is a pending CI worker benchmark; use evidence before changing full-suite concurrency.

## Required PR handoff

A draft PR must state: team; one visitor outcome; exact branch and commit; changed/untouched files; official evidence; privacy and safety limits; focused/quick/full completed test results with run links; responsive/keyboard/no-JS proof; HQ-only homepage/navigation/smoke/manifest changes; unresolved concerns; and whether founder action is needed. Link the handoff in issue #63.

The founder may say `next`/`continue` to advance independent authorized work. It does **not** grant publication authorization. Conversations do not exchange state or continue background work automatically. HQ owns release decisions and integration, and the founder retains final design, priority and publication authority.

**Never edit the closed, unmerged GitHub Field Guide PR #55 into One Place.**
