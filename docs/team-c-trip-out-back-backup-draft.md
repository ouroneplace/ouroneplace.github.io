# Team C — Trip Rehearsal: Out, Back & Backup (Transportation & Travel v0.1)

Date: November 13, 2026 (Central).
Owner: Team C; exclusive Transportation & Travel area.
Base: accepted main 05501c9643e4fbf1fd876a18e3347bff15ea4b8e (founder-authorized PR #78).
Status: DRAFT SOURCE ONLY. Not merged, deployed, accepted, certified or approved for publication.
Coordination: https://github.com/ouroneplace/ouroneplace.github.io/issues/63

## Independent user need and one practical outcome

The current four-card Transportation & Travel catalog offers transport-assistance links, affordable-trip ideas and preview-only Trip Cost/Accessible Travel tools. It does not teach someone to rehearse **the outbound journey, a workable return, accessibility/cost fit and a safe cancellation/backup decision**. This new page provides specific fictional practice without an account, payment, real schedule, location data or third-party requests. It does not promise any route or ride.

A visitor can explain why a saved timetable needs provider verification, stop when boarding is unsafe, and choose a confirmed safe alternative, trusted help or postponement when return service fails. They can edit four private text fields or use the complete paper example.

## Three Team C-owned paths only

- one-place/trip-out-back-backup.html — self-contained visitor page.
- tests/trip-out-back-backup.spec.cjs — focused Chromium/Playwright checks.
- docs/team-c-trip-out-back-backup-draft.md — this QA and integration record.

No homepage, shared script/style, workflow, release manifest, existing feature or founder-approved file is modified.

## Pre-release content correction — canceled return while already away

- Manual content review caught a real scenario mismatch before source-QA closure: the third fictional decision occurs *after* arrival at the library, when the return is canceled. Earlier advice to “postpone” the departure at that point was chronologically impossible. Postponement is valid only **before** leaving.
- Corrected scenario's best option, individualized explanation, no-JavaScript paper summary, private placeholder and example to distinguish **before departure** versus **already away**. After cancellation while already out, remain somewhere safe, contact the actual operator or trusted support and confirm a safe way home; seek local emergency help in immediate danger. Never promise that any alternate service exists.
- Added one focused Playwright test for already-away logic and paper backup text. This changes only Team C page, focused spec, feature QA doc. Initial CI for the prior head cannot certify this new revision; exact current-head full regression is required.

## Content, privacy, usability and safety boundaries

- Explicit robots index,follow requests future public educational discoverability; it neither forces search results nor authorizes publication.
- A Saturday library trip is fictional. No real route times, fares, local access guarantees, global/legal claims, emergency location or live provider status. Confirm actual details with the operator in the visitor's community.
- Three nonscoring situations have nine specifically explained options; checked responses receive meaningful reasons, revised choices invalidate stale feedback, and blank submission does not count as reviewed.
- Four editable plan textareas (320-character maximum). Loading a fictional example confirms before overwriting existing words; full reset confirms before destroying *any* writing or checked answer, even an unreviewed one. Cancel preserves writing, selected options, feedback and count. Empty reset is immediate.
- Work stays in the rendered page and is lost upon reload. No localStorage/sessionStorage, cookies, location, third-party runtime calls, form submission, uploads, accounts, booking, payment or tracking.
- Script-free fallback contains the full five teaching checks, safety stop, fictional scenario answers, both general official-source pointers, and expandable paper plan. Interactive controls remain hidden when scripting is unavailable instead of offering dead buttons.
- Opt-in external anchors: U.S. Federal Transit Administration (https://www.transit.dot.gov/) and USAGov ADA and public transit rights (https://www.usa.gov/disability-rights), both target blank + noopener noreferrer. These are general sources, **not** current local journey data or access eligibility verification.
- Respectful nonjudgmental language: a safe stop/postpone is valid, unsolicited stranger's ride is not a default backup, and personal contact details belong outside the webpage.

## Source-team QA checklist

1. Parse visitor inline JavaScript and Playwright spec syntax. Confirm exactly three radio-question groups, four text fields, explicit robots policy and safety guidance.
2. Focused browser checks: page title/H1/robots, five teaching steps, all nine individualized explanations, blank/stale answer resets, progress, typed plan editing, sample Cancel/Confirm/empty behavior, full reset Cancel/Confirm and blank behavior, privacy/no storage/no remote connections, real local Transportation/Human Literacy navigation, opt-in outside links, keyboard labels/status, reduced-motion operation and no-JS readable fallback.
3. Responsive proof: real full-page synthetic screenshots and geometry at 320/390 normal and 200%-sized text, plus 1366/1920 normal. Check no lateral overflow, distinct four content panels, safe button heights and section order. Synthetic Chromium is NOT human pixel or native assistive technology acceptance.
4. Exact new GitHub source-head full npm test against the latest published main via PR merge checkout, HTML/link audit and shipped JavaScript parser. Inspect complete job logs before marking full PASS. Fix real defects only, document any failures and reruns.
5. Future HQ integration owns its homepage Transportation-area entry, current-main merge staging, 27 accepted monitored published files, release manifest, live preview strategy, broader accessibility/physical-device/human review, specific founder release decision and post-merge integrity checks.

## Accessibility correction — skip-link focus reaches main

- **Actual isolated Chromium reproduction on the current markup pattern:** with `<a href="#main">` and nonfocusable `<main id="main">`, pressing Tab then Enter updates `#main` but `document.activeElement` is BODY. The same isolated page with `tabindex="-1"` on MAIN places real keyboard focus in MAIN; pressing Tab then advances to the first radio input. This reproduces the same mechanism separately observed in Team C Conversation Repair #68 and does not claim native assistive-technology validation.
- **Narrow visitor correction:** add only `tabindex="-1"` to the existing main landmark, without moving paragraphs, changing focus styles, visitor text, routing, privacy, or other DOM. The negative tabindex allows programmatic anchor focus without adding a new ordinary Tab stop.
- **Focused regression:** from page load, Tab focuses visible skip link, Enter changes URL to `#main`, MAIN becomes the active element, and the next Tab reaches the first response control. Requires exact new-head full browser CI, independent of the earlier 795/795 green run.
- **Remaining limits:** physical iOS/Android and native VoiceOver/TalkBack remain unverified; no claim of complete accessibility acceptance.

## Full regression failure and narrowly corrected assertions — November 13

- **Source-head CI actually failed:** [Actions #43539289848](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/43539289848) checkout `ea8374b` of source `b08f3b4aaa1b2091a4343dd1eba50403b75a72b8` into approved published `main 05501c9643e4fbf1fd876a18e3347bff15ea4b8e` completed with **793 passed, 2 failed**; 37 HTML audited with zero errors/structure warnings, 43 shipped scripts parsed, 23 of 25 Transportation focused cases passed. Both failures were source-test fixture mistakes introduced while adding post-arrival safety wording.
- **First failure:** The test asked `form[data-scene="2"]` itself to contain “After the library visit”. That paragraph is a preceding sibling inside the same `.scene`; now assert text in the form's containing scene. Do not move visitor content to satisfy the test.
- **Second failure:** The test still expected the obsolete fictional backup line “trusted support or postpone” after the actual visitor example was changed to distinguish already-away safety. Now assert the approved current example phrase **“If canceled while out, stay safe and ask trusted support”**, preserving its improved chronological meaning.
- **Scope:** Only this focused test and feature QA record changed versus failing source; visitor HTML, explanatory wording, safety limits, styles, storage/privacy and all published files stay byte-for-byte identical. Focused spec parses syntactically; **new exact-head GitHub Actions full CI is required before reporting PASS**. Prior 793 passing cases do not establish this new commit passes.

## Current external-source relevance check

- Independently retrieved the live FTA homepage (https://www.transit.dot.gov/) and the USAGov ADA rights page (https://www.usa.gov/disability-rights) on November 13, 2026 Central. Both resolved with source content. USAGov's general disability-services landing page emphasizes benefits, jobs and caregivers rather than travel; the new source now links to the more relevant ADA rights page, which explicitly discusses public transit and how to ask about access. The link remains an opt-in educational pointer, not legal advice or a provider access guarantee.
- Added focused DOM assertions for both exact official source URLs, retaining the external-link consent and rel/target checks. External page availability can change; no promise of link uptime or universal U.S./non-U.S. applicability.

## Unverified and held scope

Physical Android/iPhone, real native TalkBack/VoiceOver, unfamiliar/disabled visitor studies, expert access/safety review, real operator links/timetables, actual search indexing, manual visual acceptance and founder release approval are not established by browser CI.

Current HQ two-area PR #79 is explicitly **FOUNDER HOLD**: https://github.com/ouroneplace/ouroneplace.github.io/issues/81. It covers only Aging/Conversation; this Transportation experience must NOT be bundled or published through that hold.

All accepted work on main remains untouched. This is a standalone draft, not a public site update. Initial source checks can be claimed only after executing them; final exact-head GitHub CI remains pending until the run is completed.

Founder decision: No action needed.
