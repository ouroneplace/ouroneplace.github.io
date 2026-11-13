# Team A — Home Fire Escape Rehearsal v1 · source, QA and HQ handoff

**State:** DRAFT / unmerged / unpublished / not founder accepted.
**Date:** 12 November 2026 (Central), based on verified main `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`.
**Owner and category:** Team A, existing Emergencies & Preparedness life area. No new catalog entry or area.
**Branch:** `team-a/fire-escape-rehearsal-20261112`.
**Exact new files:** `one-place/home-fire-escape-rehearsal.html`, `tests/home-fire-escape-rehearsal.spec.cjs`, `docs/team-a-home-fire-escape-rehearsal-draft.md`.

## Distinct, useful visitor outcome

One visitor can recognize a fire escape or warning barrier, identify a possible safe preparation action, explain a stop/seek-professional boundary, practice a fictional smoky-hallway decision, and use a no-JS paper plan. There is no live emergency triage or fire safety certification.

The current published Emergencies & Preparedness catalog has a generic downloadable action kit but lacks an inclusive first-party *escape route + alarm + meeting point* teaching and practice workflow. This is distinct from:
- Accepted `one-place/home-skills.html` smoke/CO alarm maintenance and emergency supplies teaching, unchanged.
- Draft Team A PR #70 power outage continuity; no outage planning duplicated.
- Draft Team A PR #67 everyday non-disaster access barriers; no clinic navigation, handoff or physical assessment duplicated.
- Draft PR #62 Wellness and Support Skills; not merged or modified.

**Important real-fire boundary:** Do not practice if smoke or fire is present. Follow current local emergency responders and building-specific strategy. If safe exit is available, leave and stay out. If trapped, call emergency services, report your location and follow their guidance. No risky stairs/transfers, unsafe window trials, disabling alarms, or re-entry for pets. US 911 and UK 999 labels are not universal response numbers.

## What is implemented

- Five static lessons: two usable exits and outside meeting point; disability and mobility accommodations; alerts for hearing/sensory differences; dependents/pets; actual building fire strategy. Each explicitly covers WHY, BEFORE, PRACTICE, VERIFY, COMMON MISTAKE and STOP/HELP.
- Three non-sensitive selectors create a reviewed preparation note with concern-specific action/check/stop, setting-specific caution and chosen next approach. No name, location, diagnosis, phone, tracking or identification data. It is not a promise of a safe route, equipment or rescue.
- Changing any select invalidates the reviewed note and disables printing; reset asks before deleting work. After review, print-only CSS hides the rest of the page from the reviewed-step printout. Native browser print without JS prints the full learning and paper worksheet.
- Fictional alarm/smoky-hallway scenario: unsafe rush into smoke, safe leave/report/stay-out, unsafe wait-for-app; distinct corrective feedback, reset, no-JS explanation. This is safe reasoning practice, not a test of real behavior.
- Paper prompts: alerts, routes, meeting point, preferred accommodations, assistance and backup, building strategy, emergency contact. No account, third-party script, remote storage, secret uploads, medical records, or synthetic scores.

## Original evidence, retrieved/checked Nov 12, 2026

1. [U.S. Fire Administration — Home Fire Escape Plans](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/). USFA recommends a sketch with doors/windows, two ways out where possible, a clear route, external meeting point, and realistic household practice. Actual response and high-rise strategies differ; USFA high-rise text warns against ordinary elevators except as directed by firefighters.
2. [U.S. Fire Administration — Fire Safety for People with Disabilities](https://www.usfa.fema.gov/prevention/home-fires/at-risk-audiences/people-with-disabilities/). Inclusive warnings/alarms (vibration/visual signals), route choice and ability-sensitive plans. These are educational suggestions, not an individual safety certification.
3. [UK Government — Fire Safety in the Home (accessible)](https://www.gov.uk/government/publications/make-your-home-safe-from-fire/fire-safety-in-the-home-accessible-version). Home escape and smoke warnings; the publication explicitly says **Applies to England** (updated May 25, 2022). It must not be represented as an all-UK legal standard; elsewhere use the applicable local fire guidance.
4. [England Government — Residential PEEPs, Guidance for Responsible Persons](https://www.gov.uk/government/publications/residential-personal-emergency-evacuation-plans-residential-peeps/residential-peeps-guidance-for-responsible-persons). Updated 6 April 2026. A building-specific, consent-based accommodation process exists for certain buildings and residents in **England only**. Do not invent universal legal rights, building eligibility, fire strategies or equipment.
5. [Texas Department of Insurance — Evacuating Pets Safely](https://www.tdi.texas.gov/blog/evacuating-your-pets-safely.html). May 4, 2026: pets in an escape plan, but do not re-enter during an actual fire; tell responders if animals or people remain inside.

We paraphrase short points and avoid claiming professional validation. International/local rules, equipment, consent and responder capacity must be verified with the actual local organization.

## Twelve life-area quality lenses

1. **Entry**: use plain first-person barrier choices or static guidance without special prompt.
2. **Map**: planning, safe rehearsal, actual emergency limits, after-event responder contact; bounded to fire escape.
3. **Outcome**: context-based reviewed note, decision practice and paper rehearsal.
4. **Teach**: six named teaching elements in each of five lessons.
5. **Safety**: clear current-danger priority, smoke, stairs, transfers, alarms, pets, trapped callers, building strategies; qualified help boundaries.
6. **Evidence**: five official sources, date and jurisdiction stated.
7. **Truth**: educational draft, no rescue, inspection, guarantee, medical/legal determination, or live-alert service.
8. **Navigation**: direct standalone page links to existing Emergency area and home and accepted Home Skills alarm teaching; HQ to add source-area entry.
9. **Privacy**: only non-identifying selects and fictional radios; no storage, writes, tracking, third-party scripts or silent export. Explicit print choice.
10. **Accessibility**: keyboard-native controls, skip link, focus, status updates, low reading load, reduced motion, 320/390/1366/1920 responsive design and no-JS static/paper alternative. Actual screen reader and physical-access checks remain unverified.
11. **States**: blank/partial, five concerns × three settings, safe next-step choices, edited invalidation, cancel/confirm reset, print gate, quiz blank/wrong/correct/reset and no-JS.
12. **Proof**: exact-head automated results, real visual/device tests, source accuracy and HQ integrated/live QA required before release. Green CI is not clinical validation or founder acceptance.

## QA: exact commands and truthful status

- `npm run test:quick`: migration, static audit and syntax (must report actual completed outcome).
- `npx playwright test tests/home-fire-escape-rehearsal.spec.cjs`: feature-only suite.
- `npm test`: full exact-head current source PR, including all approved work.
- Focused test file targets 320/390/1366/1920 widths, 320 with 200% root text, all 15 concern/settings combinations, blank/partial and edited states, reset confirm/cancel, dedicated print-only plan, correct and unsafe choices, keyboard, no-JS, network/privacy and source links.
- At authoring: source scripts and test JS parse (static) and diff scope to be verified; **automated browser/CI, actual visual, VoiceOver/TalkBack/ChromeVox and first-time comprehension are not yet claimed passed**. Any new code head invalidates earlier CI. No actual home fire escape competence can be established by automated tests.

## HQ-only integration instructions

1. Add one targeted link within the existing `?area=Emergencies%20%26%20Preparedness` page: `href="one-place/home-fire-escape-rehearsal.html"`, label **Home Fire Escape Rehearsal — accessible exits and alerts**. Do **not** create another area or original catalog card, and do not remove its existing generic kit, Housing Home Skills or PR #70.
2. Verify Area return `../index.html?area=Emergencies%20%26%20Preparedness`, One Place home and browser Back.
3. Add desktop 1366 and mobile 320 smoke: open from Emergency area, select `mobility`, `shared`, `specialist`; review stop/help; change a choice to invalidate; attempt the smoky-hallway practice; navigate Home/Back.
4. Add `one-place/home-fire-escape-rehearsal.html` exactly once to the HQ exact Pages-file-byte manifest, **after** reconciling the actual future integration head. PR #62 remains frozen; do not silently add this feature to it.
5. Decide public-indexability from draft `noindex,nofollow` only as part of an explicitly approved publication. Keep other shared files/integration and CI decisions HQ-owned.
6. Require the exact integrated candidate head to pass full QA and visual/manual checks, then seek specific founder authorization. **No merge or publication** without it. After approval HQ verifies exact Pages SHA, file bytes, mobile/desktop smoke and main regression.

**Founder action at this stage: NONE.** This is an independently scoped draft for HQ intake, not an invitation for repeated founder testing.


## Official-source scope correction — November 12–13, 2026

Independently opened all five exact outbound original resource URLs. USFA home escape and disability safety pages, England GOV.UK accessible fire safety, April 2026 England Residential PEEPs guidance, and May 2026 Texas pet evacuation guidance all resolved to their intended primary sources. Found one overbroad regional label: GOV.UK's 2022 accessible home-fire page explicitly applies to **England**, not every UK jurisdiction. Fixed the linked resource label, clarified the overall jurisdiction limitation, and added a focused browser assertion to prevent regression. The PEEPs document is also expressly England-only and resident consent-based. This correction changes the feature's exact source SHA; previous green CI is historical until a new exact-head run passes.


## Existing Home Skills deep-link accuracy — November 12, 2026

Independent cross-feature source inspection read the actual **published** `one-place/home-skills.html` and confirmed that `#skill-28` is **Test smoke alarms**, `#skill-29` is **Check carbon monoxide alarms**, and `#skill-30` is **Make a household emergency supplies plan**. The Fire Escape Rehearsal's optional “Home Skills alarm teaching” link previously pointed to `#skill-29`, sending visitors to CO-alarm maintenance rather than the more relevant smoke-alarm lesson. This was a real content-navigation mismatch, not a 404; the earlier link test validated only the stale `href`. Corrected **only this new Team A page** to the accurate published `home-skills.html#skill-28` and clarified its visible label to “Home Skills smoke alarm lesson.” Added a focused full-page Playwright check that navigates to actual accepted Home Skills and verifies the target heading plus the distinct CO alarm target, so the repair cannot silently regress. **No modification whatsoever** to accepted Home Skills, its thirty-six lessons or external source destinations. The prior `697/697` green run is historic evidence for the former PR #74 source SHA and does not certify this new source head; exact-head CI must pass again.


## Mobile long-choice readability fix — November 12, 2026 Central

Independent local headless Chromium **native-select reproduction**, using the actual #74 CSS, 16px system font, and exact `#concern` option “Make fire alerts understandable and detectable”, measured its text at **356.13px** while the closed native control measures **260px at 320px** and **330px at 390px**. The browser cannot guarantee multi-line text inside a native closed select, so the selected meaning can be visually truncated until reopening the menu. The `#action` choice “Contact qualified fire or building staff” can similarly be shortened on narrow phones. This is a genuine readability gap, not a sideways-overflow or formal WCAG failure.

Added **two small real visible, wrapping `<output>` elements** adjacent to the still-native `#concern` and `#action` fields. Each is hidden and empty until a user chooses an option, then displays its complete actual selected text, updates on change, remains after a canceled clear, and empties only after confirmed clear. DOM text is set using `textContent`, without injected markup, storage or network activity. The existing validation and reviewed-note invalidation remain intact; JavaScript-off form is hidden and the five static lessons/paper workflow remain available. Added focused 320px/390px Playwright checks of actual full selected labels, visible wrapping geometry/no overflow, review invalidation, and clear cancel/confirm state. No new page, no shared-file edits, no change to escape safety instructions or source references. Local browser geometry reproduction is preliminary; exact-head full GitHub Actions must pass before this correction is considered source-verified. Earlier `697/697` green [run 43354327509](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43354327509) applies ONLY to older HEAD `d0bda4...`, not to this new change.
