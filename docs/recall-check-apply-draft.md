# Team C — Recall, Check, Apply Lab (Learning & Education v0.1)

**Date:** 2026-11-12 (Central). **Owner:** Team C. **Main baseline:** 2b2a32ed3a33de82af8ec96fa788b9f8045eb776. **Coordination:** https://github.com/ouroneplace/ouroneplace.github.io/issues/63

**Status:** SOURCE DRAFT. Not merged, not deployed, not approved by the founder.

## Problem and one visitor outcome

Existing Human Literacy lessons practice communication, self-reflection and decisions. Curiosity Studio demonstrates patterns, and HQ-owned draft Knowledge Atlas PR #65 teaches source literacy and foundational facts. This is a distinct narrow learning-technique exercise: recall a source from memory, compare with its actual wording, distinguish unknowns from facts, and apply verified details when the hypothetical situation changes.

**Visitor outcome:** Using one fictional workshop notice, a learner can recall useful information without pressure, check the original, avoid inventing details, and select an appropriate next step for someone with different needs.

**Not built:** Memory diagnosis, grading, student intelligence score, actual workshop registration, external AI tutor, time-based review reminders, saved learning record, Knowledge Atlas extension, certification, analytics or personal data submission.

## Teaching mechanics

1. **Recall:** An original invented community-workshop notice explains Saturday 10:00 a.m., paper provided, pencil optional, side entrance step-free, other support unspecified. Visitors may hide the notice and attempt spoken, paper or optional typed recall; they can reopen at any time.
2. **Check:** Visitor reveals source comparison. The page does not read or score their writing. Two scenarios compare what the source actually says against invented supply guarantees or unproven support claims; each of six options has distinct editorial feedback.
3. **Apply:** Hypothetical Mina has no pencil and needs step-free access. Three decision explanations show how to use the note's genuine conditions while checking other access needs with the organizer. No forced decision and no outcome guarantee.
4. **Transfer:** One repeatable approach for a new real lesson or instruction: recall, check with the source, identify one supported action and one unknown, and revisit on another day if useful. An optional note is local to the page and can be cleared.
5. **No JavaScript:** Original notice, all explanations, method, summary and citations are in static semantic HTML disclosures. No-JS visitor can use paper or their own voice.

This teaches an educational strategy, not recognition of patterns in an AI-scored transcript. Text is never interpreted, not even as a simplistic keyword grade.

## Original research source ledger (verified 2026-11-12)

- [Roediger & Karpicke, 2006, Psychological Science: retrieval testing versus restudy](https://pubmed.ncbi.nlm.nih.gov/16507066/), PMID 16507066, original experiments: retrieval practice supported delayed retention in controlled contexts. Does not establish lasting improvement from this single page.
- [Dunlosky et al., 2013, Psychological Science in the Public Interest: learning-techniques review](https://pubmed.ncbi.nlm.nih.gov/26173288/), PMID 26173288: practice testing and distributed practice can support learning; feedback and contexts matter.

These researchers did not create, endorse or review One Place. The community-workshop notice is fictional; its event and access claims are invented as exercise content, not public services or verified local arrangements. Worldwide educational, language and accessibility contexts differ; no real-life attendance/medical/education advice is established.

## Safety, privacy, accessibility

The exercise has no backend, account, credentials, tracking, API calls, outside assets, cookies or browser storage. External research links are optional, explicitly marked, and protected by noreferrer/noopener. Typing is not transmitted, saved, graded, copied or interpreted; reloading or reset discards it. Visitors are advised to avoid sensitive details, and told browser extensions/shared devices may behave differently.

Source uses one h1, meaningful headings, radio fieldsets/legends, textarea labels, native details/summary, labeled buttons, clear focus indicators, live status announcements, reduced-motion and forced-colors rules. Full physical-device and screen-reader certification is not claimed. A no-JS full learning pathway exists.

## Exactly three Team C files

- one-place/recall-check-apply.html — standalone first-party page.
- tests/recall-check-apply.spec.cjs — scenario, state, privacy, no-JS and viewport cases.
- docs/recall-check-apply-draft.md — evidence and HQ-only integration handoff.

No shared files, existing lessons, Curiosity Studio, Knowledge Atlas, PR #68, PR #69, main or workflows were modified.

## HQ-only integration (not Team C edits)

1. Add one truthful internal link **Practice remembering and applying a lesson** in the existing Learning & Education root area (index.html?area=Learning%20%26%20Education) pointing to one-place/recall-check-apply.html. Retain the 18 life areas and 72 catalog offerings; do not duplicate or rename Knowledge Atlas and Curiosity Studio.
2. Add the exact new page to the HQ-owned deployed file list and scripts/verify_live_site.cjs, with the final number derived from actual integrated paths. Add a smoke journey: area link → hide notice → edit recall → compare → exercise answer → reset → area return.
3. Integrate into a **separate future candidate**, not frozen PR #62; reconcile current main and the other team source PRs, including independent Team C #68/#69. Run exact-head integrated npm test, all responsive/200%-text/keyboard/no-JS checks, genuine screen-reader and screenshot-based visual review, source/privacy/safety verification, and regression protecting founder-accepted experiences.
4. Only HQ controls shared files, merge, and deployed integrity. Only a founder's explicit scoped approval authorizes publishing. After approval, verify exact Pages deployment SHA, correct file bytes, mobile/desktop live smoke, main full regression and later founder acceptance.

## QA ledger

| Gate | Evidence | Status |
| --- | --- | --- |
| Main/open PR/nonduplicate/accepted-work review | Verified main, board #63, PRs #64/#65/#68/#69, founder record and live lesson code | Reviewed |
| Research source review | Two PubMed original research listings checked | Reviewed |
| Static syntax/DOM/privacy review | New inline code and test source after blob creation | In progress |
| Repository fast / focused Playwright | Run on exact Team C HEAD | Pending |
| Full exact-head CI | GitHub Actions run on PR HEAD | Pending |
| Manual physical screen reader, source safety and visual at 320/390/1366/1920 + 200% | Independent QA | Pending |
| HQ combined-head integration / founder permission / exact live deployment | Release gate | Not authorized |

**Recommendation:** Hand off as a small source-only draft after exact-head QA and seek later independent HQ integration. **Founder decision: No action needed.**
