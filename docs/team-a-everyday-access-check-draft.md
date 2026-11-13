# Team A — Everyday Access Check v1.0: evidence, QA, HQ handoff

**Area:** Existing Aging & Accessibility life area (no new area or catalog card).
**State:** DRAFT · branch only · unmerged · unpublished · no founder acceptance.
**Date of source review:** 2026-11-12.
**Baseline:** verified `main` commit `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`.
**Team A branch:** `team-a/aging-access-everyday-check-20261112`.
**Files owned:** `one-place/everyday-access-check.html` and `tests/everyday-access-check.spec.cjs`, plus this document.
**Protected files:** no changes to `index.html`, shared navigation/styles, workflows, production smoke, manifests or sitewide configuration.

## 1. Gap investigation and non-duplication

At the baseline, the Aging & Accessibility area has one generic three-action downloadable area kit in `index.html` (identify barrier, explore alternatives, confirm consent) and its existing catalog offerings. It does not teach a complete, specific barrier-to-accommodation-and-verification skill on its own.

Already present:
- `one-place/family-handoff.html` coordinates names, responsibility ownership and review; **do not duplicate**.
- `one-place/care-navigation.html` supports appointments, transition from hospital, results/referrals and clinic-access contact; **do not duplicate**.
- `one-place/health-wellness.html` contains health-literacy and appointment preparation; **do not duplicate**.
- Open draft PR #62 adds a nonclinical Support Skills & Safety Lab and wellness starters, among other life-area work. These remain **unmerged and unpublished**. The access checker is intentionally about everyday physical/communication barriers, not emotional support, diagnosis, medical routines, care coordination or crisis counseling.
- Other open PRs such as #64/#65 are independent HQ operational/cross-domain drafts and are not dependencies.

**Chosen first complete visitor outcome:** A visitor can identify one everyday access barrier, compare a safer adjustment, choose when to seek help, practice one fictional safety decision, and review a plain-language plan or use a no-JS/paper alternative.

## 2. What the page genuinely does

- Five distinct self-contained guides: **movement, vision, hearing/alerts, information/technology, limited energy/temporary limitation**. Each includes WHY, NOTICE, TRY, CHECK, COMMON MISTAKE and STOP/HELP.
- Three simple selectors (barrier, location and next support action) create a *reviewable, human-readable plan* with an actionable observation, a choice-appropriate next step, an explicitly scoped location consideration, a check and a stop condition.
- Re-review is necessary after changing a selection; an old reviewed plan is hidden and print is disabled. Empty/partial forms do not produce a plan. Reset requires confirmation and a canceled reset preserves work. No free-text field collects sensitive records.
- A fictional blocked-hallway scenario explains three answers; the safe option is *ask and clear the route*, not squeeze past hazards or remove a device. The check is informational, unscored, non-certified and resettable.
- Static lessons and a six-question paper worksheet remain available **without JavaScript**. A `details` explanation of the scenario is always available. Visitors can use the browser's own print function; print is only invoked by a deliberate button after review.
- Self-contained page; no third-party scripts, CSS, images, tracking, network requests, accounts, personal-data entry, server writes, `localStorage`, `sessionStorage`, embedded services or synthetic safety scores.

**Important limitation:** The preview is in English and does not diagnose disability, assess capacity, certify a route, prescribe assistive devices, promise interpreter coverage, evaluate building compliance or verify a physical home. A plan is not evidence of a successful real-world accommodation.

## 3. Twelve quality lenses

1. **Entry:** clear purpose, five static guides and three-question planner; no keyword required.
2. **Problem map:** covers home, community/travel, appointment; movement, sight, hearing, information, fatigue/temporary barriers. Not a comprehensive home audit or accessibility-law reference.
3. **First-party outcome:** reviewed custom next-step text, safety decision practice and paper worksheet.
4. **Teaching:** WHY, NOTICE, TRY, CHECK, COMMON MISTAKE, STOP/HELP in each guide.
5. **Safety:** immediate danger call local emergency services; no dangerous transfer, untested ramp or alarm, medication change, structural DIY, false medical authority; urgent sudden symptoms escalate.
6. **Evidence:** sources and date below; global versus U.S./UK distinctions explicit; original sources preferred.
7. **Truthful labeling:** draft preview only; no provider matching, account, or guaranteed compliance.
8. **Navigation:** standalone guide links to existing Aging & Accessibility area, One Place home, Family Handoff and Care Navigation; homepage integration held for HQ.
9. **Privacy:** no names, diagnoses, ID numbers or free text; changes held in transient DOM only, no network writes or browser storage; browser print may create a physical/digital copy controlled by the visitor.
10. **Accessibility:** semantic headings, `label`/`select`, `fieldset`/`legend` practice, focus visibility, skip link, status regions, no motion-dependent UI, responsive wrapping, no-JS learning fallback; device/screen-reader audits still needed.
11. **State and recovery:** empty, partial, each path, edited invalidation, canceled/accepted reset, blank/right/wrong quiz answers, quiz reset, user-controlled print covered by focused automated tests.
12. **Evidence gates:** tests run against exact HEAD, full current-head regression, 320/390/1366/1920, 200% text, keyboard/no-JS, privacy, source quality and real device review must be recorded before HQ integration/founder acceptance.

## 4. Original evidence (links independently reviewed Nov 12, 2026)

- [WHO — Assistive technology](https://www.who.int/news-room/fact-sheets/detail/assistive-technology) (Jan 2024): assistive products can support mobility, hearing, vision, cognition and communication, across life stages, including temporary needs; access varies worldwide.
- [U.S. National Institute on Aging — Preventing Falls at Home: Room by Room](https://www.nia.nih.gov/health/falls-and-falls-prevention/preventing-falls-home-room-room): walking hazards, light, clutter, safe organization, stair and bathroom support. U.S. source; not global building law.
- [U.S. CDC — Preventing Falls](https://www.cdc.gov/falls/prevention/): trip hazards, lighting, grab bars, rails and professional fall-risk assessment guidance; older-adult focus.
- [W3C WAI — Accessibility Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/): keyboard use, clear and readable content, media alternatives, inclusive formats.
- [W3C WAI — Auditory abilities and barriers](https://www.w3.org/WAI/people-use-web/abilities-barriers/auditory/): captions, transcripts, sign-language differences and alternatives to audio-only communication.
- [UK NHS — Home adaptations](https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/home-adaptations/): professional equipment and home adaptation assessment in UK context. **UK local council services/eligibility are not global entitlements.**
- [UK NHS — Vision loss](https://www.nhs.uk/conditions/vision-loss/): abrupt inability to see requires emergency assessment. This supports the stop condition; the site's local emergency-number wording is country-specific.

The page paraphrases short, supported points and links to primary sources. Sources explain principles, not formal clinical or onsite accessibility approval. Jurisdiction-specific emergency number *911* is labeled U.S.-only. Facility rules, payment, technology support, insurance and local access are not assumed.

## 5. Quality assurance ledger

### Intended checks

- `npm run test:quick` (migration, audit and JS syntax).
- `npx playwright test tests/everyday-access-check.spec.cjs` against the exact draft head.
- `npm test` current-head full suite (including historical accepted area coverage).
- Review layout at 320, 390, 1366, 1920 and 200%-font/320.
- Keyboard, semantic screen-reader structure, and actual ChromeVox/TalkBack checks if available.
- Disabled JS with static guides and paper fallback; malformed/blank, changes, reset cancel/confirm, quiz all branches, print only after review, privacy/no third-party calls.
- Preserve all prior main files and ongoing PR #62; compare exact branch-vs-main file list.

**Truthful evidence state at creation:** The feature and focused Playwright spec are committed. Runtime browser, full regression, hands-on assistive technology and live-site checks **are not yet represented as passed** until separately verified. A passing CI run does not equal clinical validation or founder acceptance.

## 6. Exact HQ-only integration requests (do not execute inside Team A)

1. **Aging area link in `index.html`:** On the existing `?area=Aging%20%26%20Accessibility` area view, add one prominent, clearly named action such as `<a href="one-place/everyday-access-check.html">Start the Everyday Access Check — barrier and safe next step</a>`. Preserve the current 18 categories, 72 original offerings, existing area action kit, links and other life areas; do not create a duplicate Aging area. Link should be introduced under existing Aging & Accessibility heading or a clearly marked area-specific section, not within Family or Health.
2. **Navigation and back:** Verify `../index.html?area=Aging%20%26%20Accessibility` remains correct from the feature page and browser Back works on deep links. Do not globally change shared nav for this one feature.
3. **Production smoke:** HQ add desktop (1366px) and mobile (320px) navigation from Aging area to the new guide; select `movement`, `home`, `ask`, review a plan, edit to clear review, and check quiz. Verify exact deployed page content only **after authorized merge**.
4. **Deployed-file manifest:** If HQ's release candidate monitors exact GitHub Pages bytes, append `one-place/everyday-access-check.html` once and adjust the expected count based on the **actual integrated head**. PR #62 is still draft; do not assume a 26- or 27-file count until actual integration. Keep all existing monitored files unchanged.
5. **Robots/launch:** The new page intentionally has `noindex,nofollow` while it is a private development draft in a public repository. During a specifically approved publication, HQ and Team A should decide whether to change to `index,follow` (if public discovery is desired) in a scoped follow-up, test then integrate.
6. **Release order:** This draft is **not** based on #62 or #64. If either merges first, integrate against the newer main and rerun full current-head CI. Founder must authorize the specific release batch; no auto-merge or silent publication.

## 7. Outstanding risk / recommendation

Automated layout and text assertions cannot establish real-device screen reader usability, true accessibility of a home, personal suitability of assistive products, accurate interpretation/translation, or national/local law. A first-time visitor/specialist review is appropriate before acceptance; there is no need to ask the founder to inspect repeatedly. Prefer a contained Team A draft for HQ review, then integrate only after the QA and release gates are independently satisfied.

**Founder action at draft stage: NONE.** HQ owns next integration/release proposal. Team A can continue targeted fixes on this feature without modifying shared files.


## 8. Exact-head regression defect and recovery (Nov 12–13, 2026)

Initial full run [43337577175](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43337577175) at `a033bc6c50c17eb0d091b90f0dad06d1ecb7b83a` **FAILED: 697 passed, 1 failed**. The failure was the no-JavaScript test not finding the `<noscript>`-only fallback message. Fix: render the fallback as ordinary static HTML, then hide it only when the local script successfully starts; with JS disabled, it remains visible while the interactive form is suppressed. This makes degradation truthful even when the script does not run. The focused and full suites must be rerun on the repair's exact new SHA before reporting passed.


## HQ RC-02 targeted readability follow-up (Nov 12, 2026)

At Project HQ's request on #67 (comments 6841350084 and 6841460249), assessed exact RC-02 screenshots at 390px and 320px/200% enlarged root font. No horizontal overflow existed; two *readability* issues remained: selected native `#support` wording was truncated when the select was closed on 390px, and `h1` split a word awkwardly at 320px/200%. Source-only remedy in the existing draft #67: accessible visible `<output for="support">` next to the native control, using `textContent` and `aria-live="polite"`, blank/hidden until selected, updated on change and cleared only on confirmed reset. Native selection, keyboard, invalidation, no-JS and consent semantics stay intact. A narrow mobile heading cap and natural word-wrapping rule preserve 200% root text and ordinary body size without hiding overflowing text. Also cap mobile h2 proportionally to maintain visual hierarchy. A local Chromium CSS reproduction at 320px/200% showed each title word on its own intact line, a 40px h1 vs 32px body and no horizontal overflow; **this is a limited CSS reproduction, not an integrated screenshot or a substitute for full-source Playwright**. New focused assertions cover visible 390px complete support echo, state changes and reset, plus word fragments, font size and horizontal overflow at 320px/200%. Both source scripts parse; all exact-head CI must be re-run. HQ must reimport changed #67 source bytes into RC-02 #72 without editing other features, then refresh integrated CI/screenshots. Prior #67 green run 43338895460 and #72 green run 43345597093 apply to their earlier SHAs only.
