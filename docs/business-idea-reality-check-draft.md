# One Place — Business Idea Reality Check: development and QA ledger
Date: November 12, 2026 · One Place v7
Status: **Unpublished draft** — not a business recommendation, founder review, or release approval

## Problem and outcome
Business & Entrepreneurship's public entry presently offers two free outside-resource guides and two unlaunched "tool preview/future service" listings. Visitors need at least one first-party practical exercise that helps them evaluate a small, low-risk business idea **before spending**. Don't create a generic business directory or pretend an idea has demand.

Build a **one-product / one-service monthly reality check**:
1. Think about a customer problem and a no-spend way to verify it.
2. Understand unit price, per-sale variable cost, ongoing monthly fixed costs, projected sales, and what a contribution margin means.
3. Enter **fictional or rough inputs** and calculate revenue, variable expenses, contribution per sale, estimated after-entered-cost balance, and break-even number of sales where mathematically possible.
4. Review a plain-text estimate and optionally download locally, with confirmation. Edit or clear assumptions and invalidate stale results; never silently upload or save notes.

Three fictional editable examples: local service (price 50, variable 15, fixed 350, units 12 → margin 35, break-even 10, balance +70); handmade item (18, 9, 90, 8 → margin 9, break-even 10, balance -18); one-on-one lesson (35, 2, 120, 6 → margin 33, break-even 4, balance +78). Examples are not market research, price recommendations or promises.

## Mathematical and safety boundaries
- All prices/costs in the **same unspecified currency**, up to two decimal places, no conversion. Monthly units are nonnegative integers; assumed single product/service. Use integer cents to avoid float rounding at usual money values, then display two decimals.
- Break-even formula for positive contribution: ceiling(monthly fixed costs / (price − variable cost)). If contribution is zero and fixed costs positive: impossible to cover them at that price. If contribution is zero with zero fixed costs: revenues and entered expenses balance at any volume, but no margin for profit. If contribution is negative: each extra sale creates a loss on variable expenses, so no profitable break-even at that price.
- This is neither actual profit, taxes, owner compensation, cash flow, market confirmation nor permission to borrow/spend. **Many omitted costs** (owner time, labor, startup assets, taxes, licenses, fees, returns, debt payments, uncertainty and seasonal variation) can make the result optimistic.
- No user identity, account, bank data or customer personal information requested. No backend writes, analytics, storage, tracking, or third-party request until a visitor deliberately opens an external original source. Browser may restore form fields; downloaded local text stays on a device and may be accessible to others.
- Accessibility: labels, focus to invalid field, live status, 320/390/1366/1920 reflow, 200% text, keyboard, no-script static reading with disabled action buttons.
- State/consent: blank/negative/zero/invalid/over-limit/two-decimal input validation; positive, zero and negative contribution cases; all three examples; overwrite cancel/accept; clear cancel/accept; delayed download consent, edit-after-review invalidation, harmless text injection, no storage.

## Primary references independently checked Nov 12 2026
- SBA small business planning, customer/competitor research and startup expenses: https://www.sba.gov/counseling/plan-your-business/
- SBA break-even explanation and formula: https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point
- IRS estimated taxes: https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes

The site links original U.S. sources, identifies their jurisdiction, and tells international visitors to consult applicable local rules rather than asserting U.S. standards universally.

## Scoped technical change and preservation
Published main baseline: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` (PR #54 Care Navigation fully live-verified).
- New `one-place/business-idea-reality-check.html` original first-party learning + private calculator.
- One Business & Entrepreneurship-only link in `index.html`. Existing 18 areas, 72 catalog listings and four original Business cards untouched.
- New `tests/business-idea-reality-check.spec.cjs` first-party tests for all mathematical edge cases, 3 examples, mobile/desktop, 200% text, keyboard, original links, no JavaScript, privacy, safety, deliberate download and restoration.
- `scripts/verify_live_site.cjs` adds scenario math and reset to 1366/320px live smoke.
- `.github/workflows/verify-live-site.yml` extends the exact release manifest 22 → **23 files** with the new page.
- This draft evidence ledger.

Explicitly do NOT touch accepted Money & Bills, Housing & Utilities, Family & Caregiving, Appointment Preparation Studio, Care Navigation Guide, Health Labs, TEAL philosophy, video pages, or the discarded GitHub learning draft.

## Twelve-lens area-quality check
1. Entry: one unmistakably free practical link under Business & Entrepreneurship.
2. Problem map: early idea validation, single-offer costs, pricing risk, and first no-spend learning step; not total business education.
3. Actual outcome: explainable, locally reviewed numeric estimate and next step.
4. Teaching: what/why/how/check/stop; show contribution vs price, fixed/variable.
5. Safety: no business financing, tax, legal, insurance or regulatory guarantees; warns about omitted costs and false demand.
6. Evidence: direct SBA and IRS U.S. sources verified in current development; international variation.
7. Honest labels: fictional examples, estimate rather than guaranteed profit, no fake unavailable button or promise.
8. Navigation: area, Home, in-page sections and browser Back.
9. Privacy: no credentials, private notes not sent or saved; downloads only on explicit confirmation.
10. Accessibility: 320px, text zoom, keyboard and screen reader labels, reduced motion, no-JS teaching fallback.
11. State/recovery: invalid/blank/edge arithmetic, overwrite/review/change/reset, downloaded copy caveat.
12. Proof: code and source audit, focused Playwright, full current-head CI, visual inspection, narrow founder publication gate, exact deployed source and smoke and postmerge regression.

## Parallel release management
PR #59 combines Health Wellness starters, Digital Safety and Support Skills with **716/716 CI pass** at exact head `a8e15147b81c31b285eb7fb9d8d09af9125e0a75`. PR #60 adds Career Readiness and is undergoing separately revised print-view CI. This business draft is based on the last approved public `main`, not those unpublished drafts. These branches touch some of the same `index.html`, live smoke and Pages manifest. **If another PR merges first, reconcile all links and smoke checks against new `main`; monitor 24, 25, then 26 files as applicable. Never blindly apply a stale manifest.**

No merger or publication without explicit scoped founder decision, even if the address has not been shared. Public GitHub Pages is discoverable and does not enforce privacy via secrecy. No blanket acceptance of whole Business & Entrepreneurship area.


### No-JavaScript dead-input protection — November 13, 2026 (Central)

On the exact prior Business source HTML blob \`4809a15ca2189534d3a6c73ce9d190f26595da18\`, the six text-entry controls (price, variable cost, fixed cost, sales count, customer question and next step) remained natively enabled when JavaScript was absent, even though calculate/export/clear buttons were disabled and the notice stated that calculations require JavaScript. Visitors could enter detailed estimates that the page could not review, reset or download. This is a truthfulness/work-preservation defect, not evidence of data transmission. **Source-only repair:** all six editable fields are now native \`disabled\` by default and enabled immediately by the existing page script when it initializes successfully. The no-script explanation explicitly names the fields; all four static lessons and three official source links remain available without JavaScript. Focused browser regression asserts all six disabled in a fresh script-free context and all six enabled in the live scripted experience, in addition to retained calculation, privacy and print tests. Browser/CI evidence must be run on the new exact HEAD; previous source green results are historical.

**Integration warning:** This source PR #61 was already inherited byte-for-byte into HQ's frozen #62 and new FAQ-preserving draft #78. Patching only the original Team B source changes its Git blob; neither HQ integration draft was modified or certified by this change. HQ must explicitly choose whether to import this single source correction into its *next* bounded integration head, with a new combined CI run. Do not force-merge any of PR #61's stale \`index.html\`, live verifier script or Pages workflow over the approved FAQ and 23-file verification baseline. No founder publication authorization is inferred.
