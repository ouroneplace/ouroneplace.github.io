# Support Skills & Safety Lab — development evidence and QA checkpoint
November 12, 2026 · One Place v7 · DRAFT / UNPUBLISHED

## Why this exists
The existing Mental Health & Safety area has generic entry points and resource links but lacks a first-party, interactive, non-clinical skill for someone who wants to support a friend or family member responsibly. This draft adds usable, easy-to-understand practice without requiring disclosure of private health history. Do not imply a chat bot or mental-health service is available.

## Scope: four fictional decision situations
1. Someone seems more withdrawn: avoid diagnosing; ask privately and listen without pressure.
2. Someone requests space: respect autonomy while offering a later check-in, unless immediate safety changes the response.
3. A person describes a near-term self-harm plan: stop ordinary practice, seek appropriate local emergency/crisis help promptly, do not promise secrecy, follow professional guidance.
4. Supporter overload: state realistic boundaries, share responsibilities or seek support while making sure no dependent/immediately endangered person is abandoned.

Each has a brief story, why the issue matters, supportive examples, a clear action sequence, an escalation boundary, a three-choice decision with blank, incorrect, correct and reset feedback, plus a common summary: notice → ask → listen → connect.

## Critical safety design
- Immediate safety message is **above** the activities. If imminent danger exists, this site cannot triage or summon emergency help; people should immediately contact locally appropriate emergency services.
- U.S. examples clearly distinguish 988 crisis support from 911 emergency response. Outside the U.S., use verified local crisis/emergency services. Do not assert US services apply worldwide.
- No diagnosis, therapy, symptom scoring, crisis intake, free-text private information, account, storage, outbound tracking, or promise of live monitoring.
- No moral scoring or punitive/shaming feedback. Respect autonomy and culture except where immediate safety obligations require qualified help.
- No original proprietary WHO/NHS/988 text copied verbatim; summarize action principles only.

## Evidence verified November 12, 2026
- WHO *Doing What Matters in Times of Stress*: https://www.who.int/publications/i/item/9789240003927 — accessible coping and stress skills across contexts.
- WHO *Psychological first aid: Guide for field workers*: https://www.who.int/publications/i/item/9789241548205 — humane supportive practical help respectful of dignity, culture and abilities.
- NHS Every Mind Matters *Helping others*: https://www.nhs.uk/every-mind-matters/supporting-others/helping-others/ — respectful listening, offering practical help, not forcing someone to talk, caring for supporter.
- 988 Lifeline *Warning Signs*: https://988lifeline.org/learn/warning-signs/ — serious warning signs, U.S. crisis support; this is not a risk-assessment tool.
- 988 Lifeline official urgent route: https://988lifeline.org/

## Exact file scope and source preservation
Published baseline `main` at `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`, verified after Care Navigation release (683/683 post-merge tests).
- New `one-place/support-skills-safety.html`: four educational scenarios and scripted decisions; all explanatory instructions remain readable without JavaScript, with disabled check buttons.
- `index.html`: one area-only link at **Mental Health & Safety**; existing 18 areas/72 catalog entries/four cards unchanged.
- `tests/support-skills-safety.spec.cjs`: 13 browser tests across 320/390/1366/1920, 320px+200% text, keyboard, no-JS, urgent safety warning, privacy, answer changes and area integration.
- `scripts/verify_live_site.cjs`: live desktop/mobile smoke checks immediate warning, four lessons, a safe simulated decision.
- `.github/workflows/verify-live-site.yml`: 22→23 exact monitored published application files to include the new page.
- This ledger. No changes to accepted Health & Wellness Studio, Care Navigation Guide, Money/Housing/Family, TEAL, existing videos or tools.

## Twelve-lens quality standard
1. Entry: choose the existing Mental Health & Safety life area, then free Support Skills & Safety Lab.
2. Map: ordinary support, respecting boundaries, urgent response, supporter limits. Does not claim total mental-health coverage.
3. Outcome: real-world words and practical actions in a decision practice.
4. Teaching: each path includes why, what, sequence, answer check, common wrong moves and when to stop.
5. Safety: crisis escalation first, not hidden behind a quiz; avoid unauthorized advice.
6. Evidence: WHO global, NHS UK, 988 US. Region distinctions explicit.
7. Truth: no live support, crisis alert, score, therapy, or personal data handling.
8. Navigation: four anchors, site home, area return and browser history.
9. Privacy: no private inputs, user identifiers, writes, third-party requests on page load or local storage.
10. Access: readable no-JS lessons, accessible fieldsets and feedback status, keyboard, mobile, enlarged text and reduced-motion support.
11. State: blank, incorrect, correct, edit and reset tested.
12. Proof: current-head CI + visual review and founder decision before merge, exact-SHA deployment and live and post-merge checks after any approved merge.

## Parallel workstreams and merge conflicts
Draft PR #56 enhances Wellness Routine Builder and PR #57 builds Digital Safety. Each lives on its own branch based on the same accepted `main`. Both PR #57 and this PR touch `index.html`, the live-site smoke script and the exact-deploy manifest. **When either is authorized to merge first, reconcile the remaining draft with current main** and re-run exact-current-head regression. Never overwrite another approved area's source, drop a monitored path or bundle independent approvals.

## Release control
This draft is not merged, not deployed and not founder-accepted. New work may proceed without waiting for other CI runs. A green test is not clinical validation. No publication based solely on generic "next" or a belief that the public website has no visitors. Explicit narrow founder approval and final QA remain gates.
