# Team B — Subscription Terms Before You Agree: draft source and QA ledger

**Date:** November 14, 2026 (Central); source reviewed against four original U.S. government web pages.
**Status:** Independent Team B LEGAL & CONSUMER RIGHTS educational draft. NOT merged, published, founder-approved or certified as Legal/Consumer area-wide v1.0.
**Approved main starting point:** `ec45d1e2ee25f8b13a4b62aa46166f2348cc52e4` (HQ founder-authorized RC-08 Small Business Records, live 31/31, postmerge browser CI still in progress at assignment start). HQ simultaneously owns independent RC-09 Household Records draft; do not change or overlap it. Source team owns only the three new files in this branch.

## Verified gap / do not duplicate existing source

Current public MONEY & BILLS guides discuss prioritizing bills/creditors and private planning. Published Business Idea Reality Check and Small Business Records are educational business tools. Existing Legal/Consumer [PR #71](https://github.com/ouroneplace/ouroneplace.github.io/pull/71) teaches **reactive** consumer problem solving (missing lamp purchase, unfamiliar statement entry, prize-fee scam), draft letters, evidence, and complaint sources, with no pre-signup subscription terms teaching outcome. This new **pre-agreement** consumer skill asks: *What should I understand before entering payment details?* It does not file a complaint, interpret a real contract, or provide an automatic cancellation service.

## Visitor outcome

Four fictional U.S.-style service offers, deliberately invented and unrelated to real providers, each with a single **most important missing/easy-to-miss question**:
- **A $0 seven-day trial, then $12/month:** ask exactly when billing starts and what cancellation cutoff applies (dates intentionally not supplied).
- **B $5/month with prechecked extra $3/month:** ask which optional service was actively selected and total ongoing cost.
- **C first-month $4 then $18/month:** ask about recurring renewal price and frequency after the promotional period.
- **D recurring exercise-video service with missing cancellation instructions:** ask how cancellation works, when it takes effect and how confirmation is kept.

Each case has plain **WHY / HOW / CHECK / COMMON MISTAKE / STOP** and a native `details` model answer always available without JS. With JavaScript, four native labelled selectors expose all four possible next questions. Review returns plain text `WHY` and `ASK` for each of 16 case/choice combinations, including wrong answers (not false legal classifications). Blank review focuses the first missing question. Any edit invalidates stale feedback. Reset clears all four selections and old feedback without a destructive confirmation, because no real personal or persistent data is present. No local recording or exporting.

**Boundaries:** Not real offer price quotes, advice to buy/cancel, universal rules about automatic renewal, interpretation of law, a legally enforceable contract, payment processor, guaranteed dispute resolution, tax or financial advice. Product/contract terms, federal/state laws, deadline rules and safeguards can vary. Pressure, missing terms or suspicious links are reasons to pause and seek verified official information. Users should not paste contracts, card numbers, account credentials, addresses or other personal information into this site. No backend writes, cookies, local/session storage, sensitive free-text, analytics, third-party scripts or background requests. Links open external originals only when deliberately clicked.

## Primary public references — independently opened November 14, 2026

1. [FTC: Getting In and Out of Free Trials, Auto-Renewals, and Negative Option Subscriptions](https://consumer.ftc.gov/articles/getting-and-out-free-trials-auto-renewals-and-negative-option-subscriptions) — check terms, trial length, billing starts, cancellation deadlines, prechecked choices and regular renewal price.
2. [FTC: LA Fitness made it difficult for people to cancel gym memberships, FTC says](https://consumer.ftc.gov/consumer-alerts/2025/08/la-fitness-made-it-difficult-people-cancel-gym-memberships-ftc-says) — concrete caution to check automatic-renewal and cancellation terms; historical enforcement allegations are not a claim any fictitious service broke the law.
3. [FTC: How to stop subscriptions you never ordered](https://consumer.ftc.gov/consumer-alerts/2023/05/how-stop-subscriptions-you-never-ordered) — record cancellation requests and payments; consult authorized payment-provider processes for disputes. No blanket dispute timing guarantees given here.
4. [USAGov: How to file a complaint about a company's products or services](https://www.usa.gov/company-product-service-complaints) — gather relevant sale/contract documents and use provider/appropriate consumer or legal channels when needed; page updated July 2, 2026.

These sources explain U.S. consumer education, not a universal individualized legal outcome. Critically, the lesson does **not** rely on the legal status of any particular FTC subscription rule, which may change through litigation or rulemaking. No fixed universal deadlines or enforcement promises. Real financial/personal records should be handled through trusted provider channels.

## Change control / exactly three Team B-owned ADD-only paths

- `one-place/subscription-terms-practice.html` — accessible original case teaching and optional ephemeral review.
- `tests/subscription-terms-practice.spec.cjs` — 17 focused Playwright behaviors.
- `docs/team-b-subscription-terms-practice-draft.md` — this evidence dossier.

No edits to `index.html`, One Place shared navigation, site scripts, GitHub Actions, published pages, other team files, approved RC-08 or draft RC-09. HQ exclusively owns discoverability and published-file monitoring in its own later candidate.

## 12-lens implementation and QA contract

| Lens | Implementation and remaining gate |
| --- | --- |
| Entry | Explicit Legal & Consumer Rights context, back/home links and keyboard skip |
| Needs map | Pre-agreement free-trial/optional-add-on/promo-price/cancel questions; not an entire consumer-law curriculum |
| Usable outcome | Four actionable question rehearsals with reasons; not a directory |
| Teaching | WHY/HOW/CHECK/COMMON MISTAKE/STOP and static model for each case |
| Safety | No actual contract/legal rights determination, account access or claim that cancellation succeeded |
| Evidence | Four official, individually verified U.S. original source URLs, jurisdiction caveat |
| Truthful labels | Fictional exercise, no real subscription, no active buying/cancel service |
| Navigation | Relative home/area links, skip-to-main, external original links on deliberate click |
| Privacy | Only invented select choices, no form send/storage/export, cookies, analytics or third-party loads |
| Accessibility | Native select/details/status, no-JS reading, keyboard, 320/390/1366/1920, 200% text, reduced-motion |
| Recovery | Blank validation first focus, stale review invalidation, reset restored focus and output cleanup |
| Evidence | Exact PR head and file blob hashes, actual Actions logs, manual/device/AT/specialist limitations |

## Source QA, integration and founder gates

1. Parse full inline JS and focus-spec JS; audit unique HTML IDs, direct sources and precise three-file scope. Quick check + focused Playwright where runner available.
2. Required full **exact-head** GitHub Actions `npm test` (not an older branch's green result): 17 focused tests cover all 16 category pairings, invalid/blank/edit/reset, 320/390/1366/1920 reflow, 200% phone text, no-JS at 320 and 1366, keyboard, no automatic offsite/network writes/storage, original source links. Inspect actual job logs before claiming pass.
3. Fix any focused or regression failure only in Team B's three source/test/doc files, preserve accepted work, rerun exact-head green and record provenance.
4. After source-green, HQ separately selects a priority and selectively imports only tested Git blobs onto the then-current founder-approved `main`. HQ, **not Team B**, adds Legal/Consumer area discoverability, live smoke and monitored deployment manifest under narrow scope; no conflicting parallel HQ PR.
5. HQ runs full integrated head CI, risk-proportionate manual review, original source checks and any appropriate human/legal/AT review. Automated Chromium passing is **not** proof of real phone, native VoiceOver/TalkBack, contract enforceability, state/federal legal sufficiency or first-time comprehension.
6. Separate explicit founder publication authorization required before public merge. After approved merge, verify exact Pages SHA, deployed byte identity, live desktop/mobile/no-JS smoke and post-merge regression. Preserve [founder-held PR #79](https://github.com/ouroneplace/ouroneplace.github.io/pull/79) and its [independent #81 review gates](https://github.com/ouroneplace/ouroneplace.github.io/issues/81); newer approval doesn't transfer to either.

**Team B's six-area v1.0 and One Place 18-area v1.0 remain NOT COMPLETE.**
