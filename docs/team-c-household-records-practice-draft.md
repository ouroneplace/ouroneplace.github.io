# Team C — Household Records Practice: source and QA ledger

**Area:** Daily Life & Organization. **Team:** C. **Date:** November 13, 2026 Central (GitHub November 14 UTC). **Source baseline:** founder-approved current `main=3e159fe9793d984c3f3051a9df83310890ec0ba9` after RC-05. **Tracking:** [Team C seven-area audit #95](https://github.com/ouroneplace/ouroneplace.github.io/issues/95) and [HQ board #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63).

**STATUS: SOURCE-ONLY DRAFT. NOT merged, published, founder-accepted, area-v1.0 certified, or authorized for release.**

## Distinct user problem and actual outcome

The accepted Daily Life & Organization catalog advertises "Organize essential family records," but the generic four-offer area does not teach a first-party records retrieval routine. Existing independently source-green [Team C PR #69](https://github.com/ouroneplace/ouroneplace.github.io/pull/69) teaches *one task, four moves*, not a document system. Accepted Family & Caregiving's Family Handoff Toolkit coordinates care tasks; Housing Home Skills teaches physical maintenance. Team B's contemporaneous business-records draft #92 teaches business receipts, refunds and expenses. This new exercise does not duplicate any of those.

Visitor learns a safe five-move method for (1) naming a **document type** without exposing identifiers, (2) choosing appropriate protected storage, (3) deciding authorized access, (4) genuinely checking retrieval, and (5) finding the proper issuer when missing. Three fictional cases teach replacement, privacy and emergency-first boundaries; nine original option-specific explanations. A printable blank **paper-only** category checklist and all learning text exist in static HTML without JavaScript. Optional `Print paper worksheet` button only calls the browser print function on explicit click. No data-entry form for real people, copies or records.

## Official U.S. sources independently opened November 13, 2026 Central

1. Federal Trade Commission, [How To Organize Your Important Papers Before a Disaster Strikes](https://consumer.ftc.gov/articles/how-organize-your-important-papers-disaster-strikes), 2023: safe inventory, protected physical/digital access and periodic review. Does **not** require any specific product, bank box, cloud provider or fee from visitor.
2. Federal Trade Commission, [Protecting your personal information: Which documents to keep and which to shred](https://consumer.ftc.gov/consumer-alerts/2025/06/protecting-your-personal-information-which-documents-keep-which-shred), 2025: private-paper handling and the need to avoid carelessly disposing of important records. The lesson **does not present fixed retention periods as universally controlling**, and instructs checking record-specific applicable requirements.
3. USAGov, [How to replace lost or stolen ID cards](https://www.usa.gov/replace-vital-documents), 2025: replacing various identity documents depends on the correct issuing agency, proof and jurisdiction. The page does not issue or replace records and cannot determine a visitor's eligibility/cost.

All three URLs are click-only `https://` optional external anchors with `rel="noopener noreferrer"`. Source age is stated, not claimed as a current rule for every locale. The lesson does not offer tax, medical, legal or identity-recovery services.

## Three independently owned file paths only

- `one-place/household-records-practice.html`: self-contained accessible free education page, 3 cases/9 reasons, 5-move guide, print-only blank category worksheet, native no-JS disclosures, minimal safe JS.
- `tests/household-records-practice.spec.cjs`: planned 14 Playwright tests: 320/390/1366/1920 geometry & screenshot checks; two 200%-root text widths; 3 full choice/review/change/reset loops (all 9 reasons); 2 no-JS widths; actual keyboard skip/selection; no writes, no offsite load and empty local/session storage; official links and real area route; print-mode readability.
- `docs/team-c-household-records-practice-draft.md`: this evidence/limitations/handoff ledger.

**No shared `index.html`, catalog, manifest, accepted-area HTML, parent team files, live Pages workflows or hold-sensitive sources changed.** All three are new Team C-owned paths. Source PR must stay OPEN DRAFT until exact-head CI passes and HQ assumes integration.

## Accessibility, privacy, safe stop, inclusion

- All text and each answer explanation statically available without script; disabled interactive submit buttons prevent nonfunctional forms. Native `details/summary` works without JS. Correct skip-link target, landmarks, fieldset/legend, radio labels, live feedback, focus visibility, reduced-motion and print CSS; design checks must validate 320/390/1366/1920 + 200% text.
- No actual names, ID/passport/social-security numbers, medical/insurance/financial contents, usernames, passwords, copies, exact locations of valuables, contact info, document uploads or persistent browser storage are solicited. Only fictional radio choices in session. Explicit warning against placing sensitive values in unprotected print-outs.
- Emergency scenario prioritizes safe evacuation and urgent help over obtaining papers. Advice is a general U.S. starting point; local laws, issuer processes, family/disability needs, emergencies, access to printers/security tools and consent differ. No promise of digital backups or storage/replacement outcomes.
- Real-world accessible native VoiceOver/TalkBack, physical-device usability, plain-language comprehension by diverse first-time learners, and independent privacy/security specialist review **are NOT yet performed** and cannot be inferred from synthetic browser CI.

## Mandatory source/release gates

1. Independently inspect exact HEAD and compare with the accepted base; assert exactly the 3 added paths, 0 modifications/deletions to accepted work.
2. Run Playwright focused + whole GitHub `npm test` suite on exact current PR head (including actual temporary main+feature merge checkout) and read completed job logs. Never present CI green before it is.
3. If anything fails, Team C repairs narrowly on the same branch, reruns and updates source SHA/blob evidence. Check static audit, JavaScript syntax, true no-JS and print, keyboard, 320/390/1366/1920/200%-root reflow and private/no-network constraints.
4. After final source green, give exact three blob SHAs/commit/run and limitations to HQ through issue #63 and the PR description; keep Team C single active source WIP to one.
5. HQ only: selectively intake onto then-current approved `main` with separate navigation/manifest scope, source/safety verification, exact integrated full CI, and **specific new founder release authorization** before any merge/Pages public site action. Then exact deployed SHA/bytes, live desktop/mobile smoke and postmerge browser suite. Held HQ PR #79 and independent issue #81 work are not altered.

**Not an area-wide v1.0 milestone.** This is one bounded visitor outcome under the twelve-lens standard.
