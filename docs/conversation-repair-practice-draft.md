# Team C — Conversation Repair Practice v1.0 (draft, November 12, 2026)

**Owner:** Team C · Relationships & Communication
**Scope:** one standalone, first-party learning experience and focused tests.
**Main baseline verified before build:** 2b2a32ed3a33de82af8ec96fa788b9f8045eb776.
**Coordination:** [Parallel Build Control Board #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63).
**State:** source PR only; not merged, released, publicly linked, founder accepted or whole-area approved.

## November 13, 2026 — prevent accidental loss of conversation-repair wording

- **Verified page defect:** “Start over and clear practice” previously cleared unsaved draft wording and all checked responses without confirmation. The separate intentional Clear Wording action already existed and is unchanged.
- **Small repair:** If draft text is nonempty or any radio answer is selected, the page requests native browser confirmation; Cancel retains typed text, checked answers, live feedback and progress, reporting cancellation. Confirm clears all as before. When untouched, the reset remains immediate; no storage, tracking, account, submission, or external network dependency is introduced.
- **New focused tests:** Cancel preserves custom text plus mixed reviewed/unreviewed answer states; subsequent Confirm clears; empty reset is prompt-free; prior complete-reset path explicitly accepts confirmation. Test/inline script syntax was checked at commit creation; actual exact-head CI must finish before claiming PASS.
- **Integration divergence:** Prior PR #68 page/test/doc were blob-identical to frozen HQ draft PR #72; this QA fix updates Team C's source files **only**. HQ must later incorporate this new verified source when reconstructing #72 from current accepted main `05501c9643e4fbf1fd876a18e3347bff15ea4b8e` and preserve all 27 monitored release files. Do not directly edit #72 or blindly merge old HQ integration. Real-device/native AT and founder approval remain outstanding.

## Gap and visitor outcome

The existing Human Literacy lessons 05, 06 and 07 introduce listening, repair, and disagreement. The Life Simulator rehearses a fictional workplace conversation with a scripted coach. They do not currently offer one short, area-scoped **everyday-transfer** exercise that asks a visitor to distinguish fact from inferred motive, reflect someone's actual words, and formulate a specific bounded next step in the *same* household misunderstanding.

**Outcome:** The visitor can rehearse a fictional kitchen-chore misunderstanding, explain why different options might help or hurt, and edit one example response (or choose a pause) without needing to provide personal details or agree with any grading.

This is NOT a new general mentor, conversational AI, diagnostic tool, mediator, screening form, score, therapy, certificate, automated message or replacement for lessons 05–07, Everyday Mentor, Universal Life Mentor, Life Simulator, or TEAL. No existing experience or shared file is modified.

## Human-centered instructional design

1. **Notice:** Separate observed words and a messy counter from invented motives.
2. **Check:** Repeat a specific need and invite correction, or take a bounded pause without pressure.
3. **Choose:** State a realistic offer or boundary and request voluntary agreement on the next concrete task.
4. **Transfer:** Optional, editable locally constructed sample wording. Edits are preserved when regenerating is attempted, until the learner explicitly clears or resets. No auto-send and no automatic score.
5. **No JavaScript:** All step explanations, example disclosures, reference links and a complete example message remain in native HTML disclosures without interaction.

Each answer, including unhelpful fictional responses, has a distinct reasoning explanation rather than a binary success/failure grade. Someone who selects a harmful or overpromising phrase can still learn from the explanation and write their own alternative. Prompts explicitly acknowledge uncertainty and do not require a real-world conversation.

**Safety boundary:** Assumes an ordinary, non-coercive disagreement. Threats, intimidation, coercion, unequal power, abuse or unsafe communication invalidate the practice's assumptions. It is valid to pause, decline contact, seek trusted support or leave an unsafe setting. No advice to reconcile with an abuser or sacrifice boundaries. The site gives no universal local hotline or legal recommendation.

**Global and accessible use:** Fictional housemates avoid presuming marriage, gender, parent/child authority, culturally universal gestures or a fixed division of chores. Written in English; wording, norms, living arrangements, resources and laws vary. Text reflows, labels are native fieldset/legend and radio inputs, and feedback has live status regions. Native details provide explanatory fallbacks. Does not claim multilingual translation or full WCAG certification.

## Evidence and limits

Original public sources inspected on November 12, 2026:
- [NHS Every Mind Matters — Maintaining healthy relationships and mental wellbeing](https://www.nhs.uk/every-mind-matters/lifes-challenges/maintaining-healthy-relationships-and-mental-wellbeing/): active listening/repeating or asking to clarify, respectful boundaries, pauses in difficult conflict; English NHS general guidance, not legal rules.
- [National Domestic Violence Hotline — Healthy relationships](https://www.thehotline.org/resources/healthy-relationships/): equality, listening, autonomy, consent, boundary respect and recognition of abusive/coercive patterns; U.S. organization, not a worldwide emergency service.
- Existing One Place Lessons 05/06/07: approved scenario teaching about listening, responsibility, respectful disagreement. No code changes to these lessons.

Interpretation: The three-move conversation scaffold is an **original teaching adaptation**, not a clinical protocol or proof a relationship will improve. Selection feedback is editorial reasoning, not automated emotional assessment.

## Privacy and security

The page is a self-contained local HTML document with inline CSS/JavaScript, no libraries, API keys, backend, tracking, cookies, online fonts, images, requests to third parties or browser storage calls. Choosing an outside source link is an explicit navigation to a separate website. One editable response is held only in the active page's memory and is discarded on reload/close. Personal stories are neither requested nor transmitted. Explicit clear/reset; reloading a sample never silently overwrites visitor-edited text. Visitors should still avoid sensitive details in shared devices or browser extensions.

## Team-owned files

- one-place/conversation-repair-practice.html — standalone learning experience.
- tests/conversation-repair-practice.spec.cjs — focused browser tests for all feedback paths, blank/edit/clear/reset, links, mobile 320/390, desktop 1366/1920, 200% text, keyboard, no-JS, state and network/storage privacy.
- docs/conversation-repair-practice-draft.md — this feature QA/source and HQ handoff.

Do **not** merge independently or publish on the basis of this document.

## HQ-only integration contract (not a Team C code change)

1. In index.html area handling for Relationships & Communication, insert **one explicit active internal link** to one-place/conversation-repair-practice.html, labelled **"Practice a kitchen misunderstanding"** (or equivalent truthful visitor-facing text). Preserve 18 life areas, 72 catalog offerings, accepted prior area links, global menus, search and home. Do not label a new product, charge or external service. Verify index.html?area=Relationships%20%26%20Communication and direct linking.
2. If merging after other feature drafts (notably #62), integrate against actual current main/integration head, resolve only real conflicts and preserve already accepted experiences. This PR deliberately contains no overlapping shared files.
3. Add the new exact path to the **HQ-owned** deployed-file integrity manifest in scripts/verify_live_site.cjs (and any corresponding maintained manifest), and add a focused smoke step for the new area link and an editable response. Do not guess the number of files: derive the expected count from the final integration set.
4. During integrated QA, verify nav/back paths, source opt-in, rendered styles, keyboard and screen reader flow, 320/390/1366/1920 and 200% reflow, reduced-motion, no-JS access, privacy/no unexpected requests, and preservation of lessons 05–07 and simulator.
5. Require **full npm test on the current integration PR HEAD**, no conflicts and a documented visual/accessibility check; obtain explicit, scoped founder permission before merge. After approved merge, verify Pages exact deployed SHA, byte integrity and actual mobile/desktop smoke. No silent deployment or change to TEAL.

## Release evidence ledger

| Gate | Evidence | State |
| --- | --- | --- |
| Current main / duplicate audit | Main HEAD SHA above; lessons 05–07, simulator, PR #62 and issue #63 inspected | Reviewed |
| Source & privacy review | Two public original sources above; scope and static privacy architecture recorded | Reviewed; independent specialist review not claimed |
| HTML/JS quick audit | npm run test:quick on final Team C HEAD | Pending |
| Focused browser tests | npx playwright test tests/conversation-repair-practice.spec.cjs on final HEAD | Pending |
| Full exact-head CI | Initial SHA 33d8b2f: [run 43337185711](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43337185711) — 698 passed, 2 test failures. One ambiguous area-heading selector; one no-JS fallback assertion unable to locate noscript example. Corrected by using a visible native disclosure and exact h1 selector. Full new-head rerun required. | Prior head failed; current-head pending |
| Visual (320/390/1366/1920; 200% text) | Browser checks plus human inspection | Pending |
| Assistive tech | Native fieldsets, labels, focus and status; real screen-reader hands-on | Pending manual confirmation |
| HQ integration / live deployment | Separate HQ work and founder authorization | Not authorized |

A source PR is an **engineering handoff**, not proof of real-world conflict-resolution competency, worldwide applicability, full accessibility, publication or founder acceptance.

**Recommended founder action during source handoff:** None. HQ may collect and integrate when exact-head QA passes; the founder receives one scoped publication decision at a later gate.
