# Digital Safety Practice Lab — One Place Development Draft
Date: November 12, 2026 · status: UNPUBLISHED, draft only

## Problem and visitor outcome
The existing "Technology & Digital Safety" life area includes two general resource/guide promises and two explicitly unlaunched previews, but not a first-party interactive practice experience. Offer real independent-judgment training now, without pretending every technology or security problem is solved.

**Four complete fictional micro-lessons:** (1) unexpected package fee text; (2) urgent family voice impersonation; (3) one-time sign-in code/social engineering and unique passwords/MFA; (4) recovery steps after sending money. Each includes a fictional story, explanation of WHY the story is risky, a concrete safe response, three decision options with explanatory feedback for blank/unsafe/safe, reset, common errors and when to stop/seek help. The final one-page checklist says: pause → verify independently → protect → respond.

## Authoritative original sources (verified November 12, 2026)
- FTC "How To Recognize and Avoid Phishing Scams": https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams
- FTC "What To Do if You Were Scammed": https://consumer.ftc.gov/articles/what-do-if-you-were-scammed
- CISA "Secure Our World: 4 Easy Ways to Stay Safe Online": https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-4-Easy-Ways-Stay-Safe-Online-Tip-Sheet.pdf
- FTC reporting (U.S. only): https://reportfraud.ftc.gov/

Scope: Educational decision practice, not an anti-malware scanner, fraud determination, technical support or refund/legal guarantee. The examples apply broadly, but linked reporting channels and rights are U.S.-specific; other countries use their relevant national cybersecurity and consumer-protection bodies. Do not ask visitors to paste real suspicious messages, passwords, one-time codes or banking details. Do not include fake clickable scam links even in fictional examples.

## Preservation and boundaries
Production base: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` (Care Navigation Guide post-merge verified on 683/683 tests).
The new work is on `feature/digital-safety-scam-practice-20261112` only, not on main.
1. New `one-place/digital-safety-practice.html` — standalone self-contained HTML/CSS, four lessons, 12 simulated answer choices, no app storage/analytics or user-input fields other than radio practice choices.
2. `index.html` — one added link only when the visitor enters **Technology & Digital Safety**; preserves existing 18 life areas, 72 catalog offerings and all original four category cards.
3. `tests/digital-safety-practice.spec.cjs` — 12 Playwright checks, including 320/390/1366/1920 mobile/desktop, 320px+200% text, keyboard interaction, no-JS content, correct/incorrect/reset, privacy, safe official links, area-link navigation.
4. `scripts/verify_live_site.cjs` — validate four lessons and one decision flow on 1366px desktop + 320px mobile.
5. `.github/workflows/verify-live-site.yml` — exact-source Pages integrity manifest expands 22 → **23 files**, adding this standalone page. No other monitoring rules changed.
6. This draft ledger.

No edits to accepted Health & Wellness Studio, Care Navigation Guide, Health Costs/Health Literacy labs, Home Skills Academy, Money & Bills, Family & Caregiving, lessons/video, TEAL or legacy catalog registry. No GitHub Field Guide.

## Twelve-lens review plan
1. **Entry:** existing Technology & Digital Safety area offers one plainly labeled free practice link.
2. **Map:** identity impersonation, unexpected links, personal account defense, immediate damage response; deeper topics remain future scope.
3. **Usable outcome:** after any lesson, a visitor knows an independent method and next action.
4. **Teaching:** WHY + WHAT + HOW + CHECK + COMMON MISTAKE + STOP in each lesson, non-shaming feedback.
5. **Safety:** no real credentials; no link to fake actor; no promises of recouping money; prompt local emergency/support action where needed.
6. **Evidence:** FTC/CISA originals, U.S. scope and international variation explicit.
7. **Truth:** four examples are fictional; no tracking, auto-detection, notifications or scored capability claims.
8. **Navigation:** home, area, four anchors, Back/history; remain in site.
9. **Privacy:** no free-text intake, cookie, browser storage or server write; official outside pages opened only by visitor.
10. **Accessibility:** headings, semantic forms, fieldsets/legends and labels, status announcement, 320 and 200% text reflow, keyboard, reduced motion, no-JS fallback teaching.
11. **State:** blank choice, incorrect choice, right answer, reset, change selection, reload.
12. **Proof:** current-head CI, focused Playwright, source preservation, desktop/mobile screenshot review, founder decision, then exact published SHA/23 monitored files/live smoke/full post-merge regression if authorized.

## Required release gates
Development is authorized; publication is **not assumed** from "next" or general permission to keep building. Main is a public GitHub Pages website; undisclosed address is not a privacy boundary. The founder can review when convenient, but no deployment/merge until the appropriate publication decision under the established One Place workflow. Track current-head test result and any follow-on fixes, then separately verify the merged release if approved.

## Other in-flight draft
PR #56 (guided Wellness Routine examples) is independent. Its first run #43321717143 failed a legacy Playwright locator because there are now two `noscript p` elements; the page enhancement itself passed its other checks. A scoped selector test repair was committed as `88295f38ba998811437ecac0b5907e4d991be5a6` on the **PR #56 branch**, not this branch. Do not treat that as merge approval or include those changes in this PR.
