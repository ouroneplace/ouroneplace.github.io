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

### Keyboard case-switch focus repair — November 12, 2026 Central

Independent 320px Chromium keyboard navigation on the preceding Consumer source showed that pressing Enter on a different case link selected the correct case but left `document.activeElement` on `BODY`, losing a useful focus target. The new existing-feature `route()` step focuses the newly displayed `<article tabindex="-1" aria-labelledby="...">` **only after an accepted route switch**. It does not change initial-load focus, does not focus the privacy section, and does not override canceled switches or the existing dirty/evidence/reviewed-plan confirmation. Local exact-source before/after: `BODY` → `ARTICLE#scam`; subsequent Tab reached the case evidence checkbox, Space checked it, Privacy & limits preserved the reviewed plan, and an accepted case switch focused `ARTICLE#financial` while invalidating the old plan. One focused Playwright regression covering the sequence was added; native screen-reader announcements and physical-device observations are still pending HQ QA. No new feature, user data collection, official agency/source content edit, or deployment/publication.


### Mobile enlarged-text word integrity audit — November 12, 2026 (Central)

An independent Chromium geometry audit of the exact prior source HTML Git blob `5cb46231384756e418feb27bb817db7cf7f85c4f` found **28 split-word instances in visible 320px/200%-text heading, quiz and navigation labels**, and 22 at 390px/200%; both layouts had no horizontal overflow, so the existing width-only tests missed the actual readability problem. Representative words included `Understand`, `unexplained`, `investigate`, `Government`, and `International`. Those are readability observations, not a formal WCAG finding.

The narrow ≤430px-only mobile CSS caps heading, pathway-link, action, quiz-label, and related metadata sizes while keeping body/paragraph text at actual 200%-root enlargement. Fixed 8px panel/case padding and 6px practice inset prevent nested controls from squeezing long words. Independent local Chromium checks on **all three visible cases** at 320px and 390px with 200% text found **zero split alphabetic words**, zero horizontal overflow, and readable reviewed-plan controls. For the most constrained 320px/200% setting, the same result held across system-ui, Arial, DejaVu Sans, Liberation Sans and Noto Sans. Normal 320/390/1366/1920 width checks also showed zero horizontal scroll. Two feature Playwright regressions now assert actual word-Range integrity and plan operability for both mobile widths at 200% text; prior tests are retained.

This is a source-only draft quality repair and does not certify physical mobile devices, real native screen-reader spoken order, browser source-link availability or founder acceptance. Exact-head full GitHub Actions regression is a separate gate, and no site publication was authorized.


### Quiz-choice recovery on case switching — November 13, 2026 (Central)

Independent exact-source review found that changing fictional cases after selecting an answer and checking reasoning previously bypassed the unsaved-work confirmation unless the visitor also edited the draft, reviewed a plan or checked evidence. Existing \`setCase()\` clears all case quiz radio choices and feedback; the missed guard therefore erased a completed practice attempt without warning. This is ephemeral, fictional training progress, not personal or submitted data. The confirmation condition now also checks whether a radio answer is selected in the **currently displayed case**; prompt wording accurately names practice choices and any reviewed draft. Cancel preserves the current lesson/hash, answer, feedback and the intact fictional starter; acceptance switches cases, resets quiz selections/feedback and retains the existing focus handoff; clean, untouched case browsing stays prompt-free. The focused test now covers exact cancel/accept/recovery and existing three-case quiz practice expressly accepts the warning before discarding work. No educational cases, FTC/CFPB source links, private draft/export, no-JS behavior, personal-data storage or published site changed. Local JS syntax and test syntax checks completed; a full exact-head GitHub Actions pass is still required before source QA can be called green.

### Public indexing and actual first-party navigation — November 13, 2026 (Central)

The source page originally had no HTML `robots` directive. That did **not** block indexing; this Team B draft now declares `<meta name="robots" content="index,follow">` explicitly to match the founder-approved public FAQ and HQ's published educational-page policy. Exactly one visitor HTML metadata tag was added, with the original full page content verified byte-for-byte identical after removing that tag. Indexing permission does **not** guarantee search visibility, imply private access controls or grant founder publication permission.

Four browser checks were added: 320px/1366px verify the unique exact robots directive while retaining the U.S.-specific warning/H1; 320px/1366px follow the existing Home brand and Legal & Consumer Rights area header/footer links, including browser Back to the exact current fictional financial-charge lesson, with the existing four-area-offer view and correct URL/headings. These checks replace previous href-only confidence for those journeys; they do not change the educational examples, outbound official sources, privacy, downloads, JS/no-JS, or shared homepage. The new exact-commit full CI must complete separately; prior 711/711 green was on the earlier head `6250a28c7bda3b458554167dfe3a149a3eafffe6`. Future HQ intake must select only the three Team B feature-owned files from the divergent branch, redo integrated QA on current main and obtain specific founder release authorization.
