# Team B — Small Business Records Practice (draft source and QA ledger)

**Status:** Source-only development; NOT merged, published, founder-accepted or qualified as complete Business & Entrepreneurship v1.0. No founder decision requested during source QA.
**Area / owner:** Business & Entrepreneurship / Team B.
**Public main baseline at first commit:** `e2cd592bb77dd53ab8081a312d8ba1a4e51669e7` (approved RC-04). Keep updated main and any HQ RC-05 changes intact; do not rebase/merge by assuming older source is public.
**Scope:** Exactly three NEW Team B-owned paths:
- `one-place/business-records-practice.html`
- `tests/business-records-practice.spec.cjs`
- `docs/team-b-business-records-practice-draft.md` (this file)
No homepage, catalog, shared navigation, scripts, manifests, deployment workflow, unrelated feature or other-team file may be edited from Team B's branch.

## Gap / non-duplication verified against current main and active PRs

Published `one-place/business-idea-reality-check.html` teaches no-spend market validation, fixed/variable costs, and one-offer monthly break-even; it does not teach the **day-to-day transaction/document classification** skill. The existing drafted Consumer Problem-Solving, Veterans benefits prep and First Week at Work lessons are different domains. No existing active standalone Business *Records Practice* PR or source page was found before claiming this feature. Preserve published Business calculator and its no-JS fixes.

## Visitor outcome and truthful limits

The visitor learns four practical moves—identify an event, preserve its source document, describe the event, check/separate records—then classifies four fictional situations:
- **A:** customer payment received for completed service ($80; keep receipt or payment confirmation).
- **B:** supplies purchased for a customer job ($24; keep itemized receipt and purpose).
- **C:** personal groceries inadvertently paid using sole proprietor's business card ($35; flag personal use, do not treat as business expense).
- **D:** customer refund/adjustment linked to an earlier sale ($20; retain both original and refund evidence).

Four native select menus offer the same four categories for each case. Review produces a contextual reason and evidence reminder for each entry, including incorrect matches; no input is transmitted. Blank review identifies and focuses the first unanswered field; any edit invalidates the old result; reset clears every practice classification without confirming because no personal or generated record is being destroyed. Every model answer is available independently in a native `details` element and through full HTML with scripts disabled. Responsive, keyboard focus, 200% text and semantic status messages are required.

**Do not overstate:** Introductory fictional sorting is neither a real ledger, a bookkeeping tool, a tax filing, a reconciliation, a deductible-expense determination, a profit calculation nor cash-flow advice. Different accounting methods, business entities, return policies, discounts, inventory and tax rules may change real treatment. Do not ask for real bank/card numbers, business confidential data or customer/employee details. No cookies, browser storage, analytics, third-party scripts, automatic off-site requests, user downloads, remote writes or background processing. External source links are opt-in.

## Primary official sources checked November 13, 2026 (Central)

1. IRS, **What kind of records should I keep**, https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep — records should show gross business income and expenses, and supporting documents (sales slips, invoices, receipts, paid bills, etc.) support business entries. Laws and types of records depend on business.
2. IRS, **Income & Expenses FAQ**, https://www.irs.gov/faqs/small-business-self-employed-other-business/income-expenses/income-expenses-1 — a personal payment from business funds is not automatically a business deduction; separate records are helpful; mixed use may require allocation.
3. SBA, **Manage your business**, https://www.sba.gov/counseling/manage-your-business/ — basic bookkeeping/finance practices aid small businesses and accounting help may be appropriate. SBA content is broad guidance and not a claim that any one method suffices.

Original IRS Publication 583 also provides context about journals/ledgers, document support, accounting methods, and proof that a payment by itself is not proof of a tax deduction: https://www.irs.gov/publications/p583 . No false retention period, business-wide entity rules or international tax advice. Date reflects source review, not endorsement.

## Twelve-lens quality checklist and evidence

| Lens | Source feature contract |
|---|---|
| Entry | Clear Work area context, business/home paths, skip-to-main |
| Scope | Actual routine recordkeeping education, distinct from startup calculator |
| Outcome | Four real-world-inspired yet explicitly fictional classification decisions and reasons |
| Teaching | WHAT/WHY/HOW/CHECK/COMMON MISTAKE/STOP + supporting documents and paper models |
| Safety | Avoid false deductions, fake invoices, privacy leaks and self-certification |
| Sources | Three current primary IRS/SBA references, U.S. scope clearly bounded |
| Honest labels | No claim to accounting, taxes, regulatory advice or completed ledger |
| Navigation | Main-site relative links, header/footer, browser back |
| Privacy | Fictional selectors only; no actual business details, persistence or network writes |
| Access | Keyboard, native selects/details, live status, no-JS education, 320/390/1366/1920 and 200% |
| Recovery | Invalid/blank focus, stale review invalidation, no-loss reset |
| Proof | Verify exact SHA, source commit/Git blobs, full CI and explicit manual limits; no invented acceptance |

## Source QA and release gate (until actual test completion)

Required: `npm run test:quick`, focused `npx playwright test tests/business-records-practice.spec.cjs`, and required full `npm test` via exact-current-head GitHub Actions. Inspect actual browser job log, static audit and JS parse output, test count and failures; fix failures only within Team B feature/spec/docs and rerun exact-head CI. Focused tests cover all 16 case-category combinations; four-correct, incomplete, review/change/reset, 320/390/1366/1920 reflow, 200% phone text, no-JS all four models, keyboard skip/select, network/storage/real-input absence, and three external sources. Automated Chromium results alone do NOT prove independent human usability, native VoiceOver/TalkBack, real hardware, international legal sufficiency or tax specialist assessment. Sources may evolve.

**HQ intake only when source QA green:** Confirm exact three feature Git blobs and selective import onto then-current approved public main; avoid merging stale branch history. HQ may add truthful Business-area discovery and monitored Pages files in a dedicated integration candidate, then independently run current-head full tests, manual/specialist checks proportionate to actual claim risk, and assess 18/72 site preservation. Founder controls any public release through a separate explicit scoped decision. After approved merge, HQ verifies exact Pages deployment SHA, deployed file bytes, live mobile/desktop smoke and postmerge full regression. Never include this independent feature in [founder-held #79](https://github.com/ouroneplace/ouroneplace.github.io/pull/79); independent [#81](https://github.com/ouroneplace/ouroneplace.github.io/issues/81) checks remain required for that hold.

**Team B six-area Version 1.0 remains NOT COMPLETE.** Money & Bills and Housing & Utilities are founder-accepted; Work, Business, Veterans and Legal & Consumer still need area-wide dossiers and HQ integration before claiming readiness.
