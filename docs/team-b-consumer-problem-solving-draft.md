# Team B — Consumer Problem-Solving Practice v1 | source & HQ handoff

Date: November 12, 2026 · State: **unpublished independent draft** (not an agency service or founder-accepted feature).
Baseline verified main: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`.
Owner: Team B, Legal & Consumer Rights; issue #63 claim.

## Visitor outcome
A visitor can study three explicitly fictional consumer problems (missing purchase, unexplained U.S. financial fee, suspected prize scam); choose and explain a safe first step; mark example evidence they can locate; edit an in-browser fact summary and specific request or safety next step; review a plain-text plan; and optionally download it after explicit shared-device warning. A no-JS reader gets all three explanations, questions, authorities and a paper fallback. This fills an actual teaching gap: published Legal category offered links and generic organizer/action-plan placeholders but no worked dispute practice.

## Original U.S. government sources checked November 12, 2026
- FTC, resolving ordinary seller issues and preserving records: https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions
- FTC, sample customer complaint letter: https://consumer.ftc.gov/articles/sample-customer-complaint-letter
- FTC, examples of distinct credit/debit card dispute processes: https://consumer.ftc.gov/articles/sample-letter-disputing-credit-and-debit-card-charges
- FTC fraud reporting: https://reportfraud.ftc.gov/ (FTC uses reports to track patterns; **does not resolve individual refunds**)
- USA.gov, consumer complaints, service and product-routing guidance: https://www.usa.gov/consumer-complaints
- USA.gov, state consumer protection offices: https://www.usa.gov/state-consumer
- USA.gov, legal aid including military, disability and low-income help: https://www.usa.gov/legal-aid
- CFPB, supported financial product categories and scope: https://www.consumerfinance.gov/complaint/
- CFPB, process, company response and transparency/privacy: https://www.consumerfinance.gov/complaint/process/

All links are marked external, HTTPS and opened with noopener/noreferrer. No authoritative source guarantees an individual outcome. Some deadlines, consumer rights and authorities vary by U.S. state, type of financial product, payment method, cross-border jurisdiction and situation. No fixed filing or resolution deadline is calculated. No international rule or remedy is asserted; other countries require their own regulators and legal aid.

## Behavioral safety & privacy
- Educational, fictional cases only; no jurisdiction-specific legal advice, individualized deadlines, statutes, litigation steps or refund guarantee.
- No personal identity inputs, payments, debt uploads, bank connections, applications or complaint submissions. Two small, length-limited editable practice textareas expressly warn against sensitive content.
- No fetch, XHR, remote scripts, tracking or browser storage. In-page plan uses `textContent` and local memory only; user edits invalidate reviewed downloads. On reset or replacing dirty work with a different fictional case, confirmation protects edits. A canceled download preserves the draft.
- Files are local device copies and may be seen by other people. Ordinary GitHub Pages host logs and external government pages are outside this app's control.
- Urgent notices, court disputes, account compromise and time-sensitive rights require prompt official or qualified local help; reports do not pause every legal clock.

## Source-owned technical scope
1. `one-place/consumer-problem-solving.html` — one new self-contained, responsive page.
2. `tests/consumer-problem-solving.spec.cjs` — focused Playwright behavior and accessibility/privacy test.
3. `docs/team-b-consumer-problem-solving-draft.md` — this quality/source/coordination record.

No existing page or HQ-owned `index.html`, site nav/global assets, shared config, `scripts/verify_live_site.cjs`, workflows or deployed-file manifest touched. No modifications to accepted Money/Housing/Family/Health, TEAL, videos, PR #62 Career/Business, or PR #66 Veterans.

## Required tests & evidence
Run on the exact branch head: `npm run test:quick`, then `npx playwright test tests/consumer-problem-solving.spec.cjs`, then full CI `npm test`. Do not claim a passed test that has only been committed.
Focused spec covers all 3 situations, reasoning choices and explanations, evidence counts, form blank/edit/limit states, cancel/confirm case changes, reset and download, edited-text injection as inert text, privacy/navigation state, no-JS, widths 320/390/1366/1920, 320px plus 200% text/keyboard, no horizontal overflow, no storage/network writes, official source link isolation.
Automation alone does not establish actual visual aesthetics, independent screen-reader/software behavior, real-world legal sufficiency or founder acceptance. Record observed run results and manual checks separately.

## HQ-only integration instructions (never Team B edits)
- After source PR is green, reconcile with current main and any released/integrating PRs first. Inside the existing `Legal & Consumer Rights` area view in `index.html`, add one truthful link `one-place/consumer-problem-solving.html`. Do not add a nineteenth life area, alter four original offerings, or duplicate the existing placeholder cards.
- Add this exact page path to the HQ-owned deployed-file-byte integrity manifest while preserving all entries from any approved PR #62 or other integrations. Extend `scripts/verify_live_site.cjs` for an inexpensive 320/1366 smoke: visit path, select financial case, review the plan, edit text to invalidate download, navigate back to area. Do not touch these shared files from the Team B source branch.
- Run combined exact-head full CI and browser visual/semantic review on integrated code. Founder alone authorizes a specified merge/release, followed by exact Pages SHA, byte-integrity and live mobile/desktop smoke and main post-merge regression. Do not publish from this draft.

## Intentional omissions
No real complaint filing, online submission, PDF/legal-letter generator for court, identity or credit analysis, case tracking, accessibility certification, local-law library, regulatory deadline determination, translated legal guidance, international regulator directory, or legal representation. Review official sources before acting.

Founder action at source draft: **No founder action needed.**
