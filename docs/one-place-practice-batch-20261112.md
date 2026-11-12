# One Place three-area integration preview — November 12, 2026
Status: integrated draft branch, **not merged, not published, not founder-accepted**.

## Why an integration branch
The founder asked One Place to keep moving without pausing for long GitHub regressions and will test the experiences when ready. Three related improvements were built in independent PRs. Two of those add links to the same homepage section code and both alter the same live-site smoke and exact-file manifest. Merging those blindly can drop checks or links. This combined branch resolves the overlap intentionally so the founder can eventually review **one consistent, fully tested set** rather than coordinate technical conflicts.

## Combined visitor outcomes
- **Wellness Routine Builder (from PR #56):** one already working, private Health & Wellness builder gains four editable, fictional starting examples (rest, adaptable movement, food planning mindful of restrictions, care organization). Never auto-builds and asks before replacing entered free text. Existing accepted Appointment Preparation Studio remains unchanged.
- **Digital Safety Practice Lab (from PR #57):** four first-party fictional scam-prevention decisions; recognize suspicious requests, verify contact independently, protect accounts, respond to suspected payment scams. FTC/CISA original sources, worldwide reporting caveat, no real messages or credentials.
- **Support Skills & Safety Lab (from PR #58):** four first-party fictional communication/safety decisions; notice distress without diagnosing, honor boundaries, recognize credible imminent danger, balance caregiver/supporter limits. WHO/NHS/988 originals, crisis/emergency warning before lessons, U.S. versus worldwide resource differentiation. Not therapy or emergency response.

## Exact integration structure
Base was published `main` `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` (Care Navigation Guide).
- Source blobs for **new pages** and all **three focused test files** were copied exactly from their most recent source branches (no reauthoring).
- Entire Health & Wellness page and scoped legacy test selector were copied from current PR #56.
- `index.html`: merged *two* strictly area-scoped links; removing both restores base bytes exactly. Existing 18 life areas and 72 catalog offerings unchanged.
- `scripts/verify_live_site.cjs`: three verified independent smoke additions merged in order before the untouched video regression and all previous smoke steps. Care Navigation remains included.
- `.github/workflows/verify-live-site.yml`: monitored source-to-deployment byte list expands from 22 to **24 files** (Digital Safety and Support Skills added, Wellness already monitored).
- Each independent PR's draft source and 12-lens evidence ledger is copied; this batch record tracks integrated status.

## Technical and human gates
The **individual** branch outcomes are not sufficient for a combined release. PR #56's exact-head full browser regression **691/691 PASS** is recorded separately. PR #57's initial six test-harness failures were traced and selector/text tests corrected; all visitor pages remained intact. PR #58 proactively receives the same test-locator corrections. Current-head CI on both independent PRs and **full integrated current-head CI** must complete successfully before a scoped release decision. Verify 320/390/1366/1920 mobile/desktop, 320px + 200% text, keyboard/no-JS, privacy, reasons/feedback/reset, official links and prior approvals. Automated reflow alone does not establish visual founder acceptance.

**No unattended background execution.** The assistant may progress development in a conversation and can continue upon subsequent user instructions; the full site is public and can be discovered even without sharing its URL. A draft is not a protected/private server, but until merged its code is not on the published One Place website. No broad claim of full Health, Mental Health or Digital Safety area acceptance.

## If approved for a combined release
1. Check current main, exact integrated head SHA, full current-head passing CI and resolved conflicts.
2. Merge only the approved batch.
3. Confirm exact-SHA GitHub Pages deployment, **24/24 byte-identical published files**, desktop/mobile smoke, complete post-merge regression.
4. Record actual outcome, then close any superseded independent drafts. If the founder prefers separate feature-by-feature release, retain independent PR gates and reconcile each after the first merge; do not mix approvals.
