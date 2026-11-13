# Wellness Routine Builder — Guided Starters · Draft QA & founder review
2026-11-12 · One Place v7 · **Unpublished draft, not a change to approved visitor experiences**

## Visitor outcome and actual gap
Issue #49 targets useful, adaptable wellness habits that are not a prescription or judgment. The existing Health & Wellness page **already contains** a functional free Wellness Routine Builder with one cue, one personal step, a gentler fallback, review text, edit/reset behavior and no server storage. The gap was that a first-time visitor had to invent every field from scratch. **Do not create another wellness lab or duplicate the builder.**

Add a small first-party set of **four fictional, editable starter plans** next to the existing builder. These are examples of planning structure, not activity prescriptions or personalized dietary/fluid advice:
1. Sleep and rest — after setting aside a phone, improve surroundings; gentler pause without forcing sleep.
2. Gentle movement — after an existing rest break, consider only a movement suitable for one's abilities and clinician advice; rest or ask for guidance if unsure.
3. Food and hydration — check one choice against any individual dietary instructions; defer uncertain food/fluid choices to the care team.
4. Daily care organization — jot down one question or follow-up step; fallback to a short reminder.

Each example fills the existing *editable* topic/reminder/action/fallback fields. No example creates a finished routine until the visitor chooses "Build my routine." If any existing free-text fields are populated, show a native browser confirmation before replacing them; Cancel changes nothing. The builder still supports entirely custom plans, editing, re-creation, and clearing. All note fields remain local to this browser page; no persistence, analytics, server data, score, streak, notifications or clinical prediction.

## Evidence and bounds
- MedlinePlus general healthy living overview: https://medlineplus.gov/healthyliving.html (retrieved Nov 12, 2026) — small achievable lifestyle steps; preventive health context.
- CDC increasing physical activity among adults with disabilities (Apr 7, 2025): https://www.cdc.gov/disability-and-health/conditions/physical-activity.html — activity should fit people's actual abilities; care professionals can advise on appropriate types and amounts.
- These are U.S. general-information sources, not worldwide eligibility or personal clinical guidance. The user-facing copy explicitly prioritizes individual clinician instructions on activity, nutrition and fluids, acknowledges worldwide variation, and allows the option to rest or ask for guidance.

## Scope / preservation ledger
Baseline published `main`: `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`, verified after PR #54 Care Navigation Guide release and 683/683 post-merge browser tests.
- Modified only the `#habits` area (plus its local example event handler and a scoped CSS hidden rule) of `one-place/health-wellness.html`. The existing Appointment Preparation Studio's `#plan` markup, script and file export code remain unmodified. Four original Health & Wellness starting cards remain.
- Added `tests/wellness-guided-starters.spec.cjs` (eight browser tests) to check all four examples, confirmation cancel/accept, reset, keyboard, responsive widths 320/390/1366/1920 and 320+200% text, no JS graceful static guidance, no network writes/persistence and safe official links.
- Modified `scripts/verify_live_site.cjs` to smoke-check starter visibility/edit/build/reset/reflow at 1366 and 320px; existing 22-file exact Pages manifest is unchanged because `health-wellness.html` is already monitored.
- This documentation file. No new life-area category, catalog card, standalone tool or GitHub Field Guide.

## 12-lens quality considerations
1. Entry: examples visible right within the existing Health & Wellness → Wellness Routine Builder path.
2. Problem map: choosing rest/movement/food/care organizational steps; a free-text builder still supports other goals.
3. Outcome: a usable personalized **draft only** after explicitly building, not a diagnosis or habit score.
4. Teaching: explain cues, gentle alternatives, editable fictional examples and when a routine does not fit.
5. Safety: exercise/food/fluid limitations defer to personal healthcare plan; no forced goals.
6. Evidence: official MedlinePlus/CDC source links with safe external labels.
7. Honest labels: examples explicitly fictional; no saved progress or notifications.
8. Navigation: existing four routes and One Place Home links preserved.
9. Privacy: no server or storage, deliberate action before creating result; avoid overwriting notes without confirmation.
10. Access: keyboard and screen-reader native buttons/labels; narrow screens and enlarged text; controls hidden without JS while static guidance remains.
11. Recovery: cancel overwrite; accept intentional replacement; editing invalidates old generated text; clear removes inputs; optional fallback.
12. Proof: tests and screenshot-first-time-user assessment must be recorded separately; tests do not constitute founder approval.

## QA gates
Perform focused Playwright plus `npm run test:quick` on current head, full GitHub Actions `npm test` on the proposed PR, mobile/desktop layout review, and source-preservation review. Never assume past CI certifies changed head. Record any failures and correct tests/code before release decision. After explicit approval only: merge and verify exact-SHA Pages, 22 monitored file-byte integrity, live desktop/mobile smoke and post-merge full regression.

**No automatic publication. No founder acceptance of the entire Health & Wellness v1.0 from approving this incremental enhancement.**