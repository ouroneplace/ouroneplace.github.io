# ONE PLACE — Combined Founder Preview (Unreleased)
Date: November 8, 2026 · **NOT a release candidate / DO NOT MERGE**

This testing-only branch is derived from Housing & Utilities draft PR #5 and includes the Our Humanity draft PR #4 files and links. It exists because the founder saw no Our Humanity menu on the current public homepage and had to download separate ZIPs to test each part of one website.

## What to open
1. Download this branch as a ZIP and extract it. Open `index.html` in Chrome (or use a local HTTP server if browser navigation limitations appear).
2. Top menu → **Our Humanity**. Explore the original human experience and Curiosity Studio.
3. Home → **Housing & Utilities** → **Home Skills Academy** (36 introductory guides).
4. Home → Housing → one of the existing four free services. Verify all paths and return links.
5. Do not test with real family names, addresses, bank information or sensitive details.

## Status / source of truth
- PR #3: Debt & Creditor Guide; unchanged and **not bundled** in this preview.
- PR #4: Our Humanity + Curiosity Studio, separate draft.
- PR #5: Housing & Utilities + Home Skills Academy, separate draft.
- This combined branch is a **snapshot for founder testing**. As the source branches evolve, it can become stale. Tests must identify exact head revisions.
- Only authorized development was combined. **No merge to main, GitHub Pages deployment, paid services, analytics, accounts, visitor outreach or publication**.
- GitHub repository source and pull requests may be publicly visible even when features are not deployed to the website. Do not interpret 'founder preview' as access-controlled confidentiality.
- Our Humanity and Housing are adjacent content, not replacements for 18/72 catalog, Human Literacy, TEAL, or existing approved tools.

## Gate for a future public release
- Consolidate accepted feature changes through an intentional, reviewed merge plan, not by blindly merging multiple overlapping PRs.
- Verify navigation, key visitor tasks, content/health/safety accuracy, phones, 200% zoom, keyboards, accessibility, download, resilience and privacy.
- Separate founder acceptance and explicit final deployment approval remain mandatory. Passing CI doesn't equal acceptance.


## November 8, 2026 — Founder unified-preview desktop walkthrough (2m 38s)

Founder submitted a 158-second desktop Chrome recording of an extracted local preview. The video had no audio, and no recording or personal device path was uploaded into this repository.

**Directly observed:** Our Humanity opened and its scenario choices displayed; Curiosity Studio's RGB and symmetry activities were visible; Housing & Utilities assistance, safety and task-planning pages appeared; Home Skills Academy room filters moved among laundry and hazard-recognition subjects; the beginner toolkit and lesson expansion/collapse were used. Recorded views show continuity among several One Place experiences within one downloaded ZIP. This does not itself verify the exact tested Git commit, all navigation links, or every control.

**Confirmed usability defect:** After opening two Home Skills lessons, the founder switched to Laundry. The interface announced “2 lessons open” although both open lessons were filtered out of view. This preserved state correctly but confused visible and hidden counts. The current draft now says how many open lessons are hidden by filters and updates that status as filters/search change. A Playwright test reproduces the sequence and checks that “Close open lessons” clears all open entries.

**Unresolved before acceptance:** Demonstrate mobile 320px and 200% zoom in real browsers, keyboard and assistive technologies, accuracy and teaching quality of task-specific references, task-list file import/export, successful completion of a safe physical household task, and visual instructional aids. The recording is evidence of observed usage, **not** complete founder approval or evidence of practical repair competence.

The website's production main branch remains outside this review; publication and merging still require separate explicit founder approval.


## November 8, 2026 — Visual learning refinement (founder QA remains open)

The founder's ongoing request to refine Home Skills identified a weakness in text-only teaching: a visitor can follow written steps without recognizing a part, its orientation, or the intended result.

**Four original inline SVG instructional schematics** now accompany existing lessons without adding pages, paid services, third-party images or loading resources:
- `skill-6` toilet dye test: tank/flapper/bowl flow and what colored bowl water suggests. Supported by EPA WaterSense: https://www.epa.gov/watersense/home-maintenance
- `skill-8` faucet aerator: recognizably separate spout, sealing washer, filter/screen insert and housing. Reference is the existing DOE aerator installation job aid: https://www.energy.gov/cmei/scep/wap/articles/job-aid-24-2-install-low-flow-faucet-aerator
- `skill-19` HVAC air-filter direction: return air, filter, arrow, and air-handler orientation. Refined reference to a step-by-step PNNL guide: https://basc.pnnl.gov/diy-guides/replace-air-filter-located-furnace-or-central-heat-pump-air-filter-slot
- `skill-24` roof, gutter, downspout, extension and water directed away from foundation. Refined reference to DOE Building Science: https://bsesc.energy.gov/energy-basics/stormwater-gutters-downspouts

These are deliberately simplified explanatory sketches, **not installation drawings**, guarantees, or substitutes for the correct appliance/fixture manual and local codes. They have semantic SVG titles and detailed descriptions, text captions, 320px responsive fit and user-controlled enlarged horizontal inspection with keyboard focus. A new “Start with a picture” section allows direct entry into the four lessons and clears conflicting search filters rather than hiding the chosen result. The 36-lesson catalog, caution labels, safety warnings and links to the core Housing guide remain.

**Verified-source basis:** EPA describes the toilet dye test and worn flappers; the Department of Energy describes roof runoff and foundation exposure; the PNNL guide describes matching air-filter direction to equipment; the DOE weatherization job aid explains faucet aerator components. The particular sketches are original interpretive diagrams.

**New automation:** Assert all four diagrams and semantic descriptions; verified direct source URLs; keyboard navigation and auto-reveal despite unrelated filters; zoom and horizontal internal scrolling at 320px without whole-page overflow. Automated tests alone do not prove the diagram is understandable by a new user, accurate for every device, or usable with a screen reader.

**Next quality gates:** Manually review each diagram at 320px, 200% zoom and in ChromeVox/TalkBack; check color-independent understanding; confirm actual hardware/model differences; audit the remaining 32 text-only lessons for which diagrams, original photos, simple videos or more specific manufacturer instructions are appropriate. This is incremental progress within Housing, **not** acceptance of an exhaustive home-repair course.

**Change control:** No merge, public deploy, visitor tracking, cloud account, external resource purchase, new area or change to founder priorities. Keep PR #5 and PR #6 separate from `main` until explicitly authorized.

## November 8, 2026 — v2 incremental review coverage
The founder-only combined preview now includes five Home-Care Schedule timeframes, 13 lesson-linked routine tasks, eight original diagrams, and eight optional three-choice explanations (four new this slice). All appear under the existing Home Skills Academy, with no added life area or commercial product. New dishwasher-filter and washer-hose resources are manufacturer-specific examples; visitors must check the manual for their own model. Updated Playwright checks cover links, visual semantics, lesson access after filters, ephemeral non-scored feedback, and 320px layout.

**Acceptance remains open.** Required before any integration decision: inspect all eight diagrams and 28 remaining text-only lessons, 200% zoom, ChromeVox/TalkBack, correct stop conditions, field relevance, safe hands-on outcomes and unchanged other categories. PR #3 is still separate; do not blindly merge overlapping drafts. No release, payments, user-data collection or outside testing authorized.

## November 8, 2026 — v2 complete first-pass why and mistake teaching
The combined preview now includes **12** model-cautious original instructional sketches and **12** practice questions; **24** Home Skills lessons remain text-only. All **36** lessons explain why a task matters and warn about a common mistake, with practical steps, verification and stop conditions preserved. Four newest illustrations focus on flappers, dryer exhaust, extension-cord damage and smoke alarm testing. External manufacturer and government sources remain context, not guarantees that the same equipment or legal conditions apply. The unchanged 18-area and 72-offering structure, Humanity navigation and draft-review restrictions remain intact.

The combined preview is not the production branch, and proof of browser test success is not founder acceptance. Before public consideration, independently verify all 36 lessons, mobile and 200% zoom, keyboard/screen-reader flows, safe physical comprehension and links; carry out a deliberate merge plan that avoids overlapping PR changes.

## November 8, 2026 — v2 moisture and water skills, 16 diagram checkpoint
The unified founder preview now holds 16 original instructional schematics, 16 optional understanding checks and 36 why/mistake pairs across the same 36 introductory Home Skills lessons. Newly illustrated: sink-plunger safety, caulk over moisture warnings, hose-connector sealing washer, and safe leak spotting. The 13-task maintenance schedule and all four Housing offerings remain. Twenty other Home Skills lessons still lack built-in diagrams. The source/QA ledger is in `docs/housing-utilities/founder-review.md`; scripts and illustrations are conceptual and do not replace model-specific instructions.
This is a local downloaded founder review, not deployed production. No merge, release, spending or visitor-data collection, and separate founder approval remains required.

## November 8, 2026 — v2 20-illustration checkpoint
Housing's founder-only Academy now has 20 original learning diagrams and 20 optional explanatory questions. Four new examples show the refrigerator door gasket, washable metal versus replaceable charcoal hood filters, model-specific thermostat schedules, and mowing preparation with children/bystanders excluded. All 36 lessons preserve WHY, tools, practical steps, common mistakes, result checks and stop/escalate warnings. The 13-task maintenance schedule remains linked, and 16 lessons remain without diagrams.

The v2 draft remains an integrated download preview rather than production or authority to merge overlapping PRs. Automated browser tests are necessary but insufficient; first-time-user comprehension, assistive technologies, correct appliance manuals and safety claims, source freshness, and real household task outcomes still require careful review. No account, spending, release, telemetry, or new area has been approved.

## November 8, 2026 — v2 28-illustration founder checkpoint
The combined founder-only preview now includes the same 36 Home Skills lessons, 28 illustrated simplified concepts, 28 optional explanatory checks, 36 WHY and common-mistake notices, and 13 linked home-care starter tasks. The eight latest diagrams include cleaning, refrigerator coils, floor types, drywall lead hazards, HVAC clues, ground-level roof inspections, CO evacuation, and inclusive emergency kits.

**Remaining content:** eight text-only lessons; five expert-only hazardous-work guides should teach recognition and escalation, not unsafe DIY. The unchanged 18 original categories and 72 site offerings, Our Humanity entry, and separate PRs are retained. This branch is not a published or private-hosted website, and browser checks do not replace founder, accessibility, source-validity, or real-world safety review. Do not merge or release without separate founder authorization.

## November 8, 2026 — v2 all 36 illustrated and searchable visual finder
This founder-only combined branch now holds 36 distinct Home Skills diagrams and optional safety-comprehension questions, one per skill. Every lesson continues to teach why, tools, steps/observations, common error, result check and stop/escalate. The final eight cover ordinary hinge/irrigation observation, dangerous tree work and five non-DIY specialist hazard areas. The former lengthy 36-button picture finder has been reordered and constrained to a searchable, internally scrollable menu, matching labels, titles and areas, without persistence or tracking. There are still 13 scheduled lesson shortcuts, five maintenance timeframes, the same original 18 categories and 72 offerings, and the separate draft Our Humanity experience.

This is **visual coverage, not full curriculum acceptance**: verify links, practical learning quality, cautious expert-only wording, assistive technologies, 200% zoom, 320px mobile, downloaded ZIP behavior, and homeowner/renter access. Do not merge overlapping PRs blindly. The combined branch has no release authorization, payment, data collection or outsider testing.

## November 8, 2026 — Founder screen-recording review, 4m24s
Video: founder-provided screen recording `Screen recording 2026-11-08 4.01.57 PM.webm`, duration 264 seconds, 1920×1080, silent (no audio track). Observed navigation: ONE PLACE Housing & Utilities → Home Skills Academy; initial picture finder and task-timed maintenance schedule; numerous illustrated safety and routine lessons with wrong/correct choices; Housing guide and homepage return. Evidence supports a functioning **desktop walkthrough**, not every action, model or URL passing end-to-end, not mobile, keyboard, screen-reader or hands-on safety acceptance. Do not commit video/private cursor or screen content.

Founder-video problems identified independently: large adjacent blank space from two-column expanded lesson cards; multiple long lessons staying open and requiring unnecessary scrolling; 36 repeated generic source-warning paragraphs despite global notice; and identical feedback for both wrong choices in a question, not explaining the selected mistake. Changes applied to PR #5 and this combined PR #6: focused single-open default, explicit opt-in compare mode, expanded single lesson spanning the two-column grid with readable width, 36 redundant disclaimers consolidated into the existing global safety/evidence warning, 72 unique wrong-choice feedback reasons across 36 questions and preserved educational guidance, and corrected obsolete 28-shortcut test to 36. The actual source references and stop/escalation instructions remain.

Remaining open risks: the extra picture search and general lesson search may duplicate concepts; some lesson summaries and the large reference catalog may still impose cognitive load; content is an introduction, not a comprehensive homeowner repair academy; the recorded branch homepage uses existing "Public preview" text, which should be checked for mismatch with founder-only draft status; external links, error recovery, mobile at 320px, 200% zoom, screen reader, color/contrast, model-specific safety and novice practical skill demonstration need independent checking. The video is not a founder acceptance statement. No merge, public release, new scope or spending.

## November 8, 2026 — Beginner learning paths beyond the 36 lesson catalog
Within the **existing** Home Skills area, six expandable hand-tool concepts now connect to actual lessons. A collapsed, symptom-first safety decision guide covers sink drainage, toilet running, dryer drying and exterior door drafts with Yes/No/Not sure choices. It explains the next safe observation or stop/escalation, and opens the exact corresponding lesson; it never claims to diagnose a fault or conduct professional services. These complement rather than replace the 36 visual lessons, 13 routine schedule links, and existing picture finder and whole-library search. Browser checks for navigation, semantic controls, small screens, no storage and distinct branches are pending/required; source and actual equipment model differences remain open. This is unreleased and subject to founder approval; no merge, payment, telemetry, outside access or extra site offerings.

## November 8, 2026 — Three-stage novice decision practice
The combined founder-only Housing draft includes a new optional, collapsed safe-decision practice for three scenarios—faucet aerator, accessible HVAC return filter, removable dishwasher filter—each with three stages and individual explanations. The user may choose **Not sure — stop and consult the manual** at any point rather than guess. Progress is local page state only, not stored or submitted; no scoring, certification, telemetry, products or service offers. Existing 36 lessons, 36 diagrams, 36 checks, 6 tool basics, 4 problem-first situations, 13 maintenance checks, 4 Housing offerings and 18/72 catalog remain. Refer to `docs/housing-utilities/founder-review.md` for test plan and safety references. The downloadable preview is not the public site; accessibility, safety-content, actual novice practice and full browser suite verification are still open. Publication/merges remain unauthorized.

## November 8, 2026 — Founder desktop screen recording, 5:27 PM (4m29s)
Reviewed the supplied 1920×1080 silent desktop walkthrough of the downloaded combined founder branch. Confirmed on-screen navigation from Housing & Utilities (the current **four free active experiences**) into Home Skills, six tool basics, symptom-based help, the three-stage practice with a safe wrong-answer explanation and finish action, maintenance intervals, 36 illustration-backed lessons and quizzes, expert-only STOP guidance, and eventual return to the maintenance planner and homepage. No obvious navigational dead end in the observed sequence. The founder intentionally used the compare lessons mode; long uneven card heights cause some blank neighboring column space, but this is not evidence that focused single-lesson reading is broken. Some routes were not clicked individually; video does not verify mobile, screen readers, link destinations, genuine equipment-specific outcomes, downloads or real-world task performance. Founder acceptance remains OPEN.

One visible draft-state inconsistency was confirmed: combined `index.html` displayed **PUBLIC PREVIEW · NO PURCHASES** even though this is an undeployed local founder testing ZIP. Changed only this branch's index header to **FOUNDER DRAFT · NO PURCHASES** and added a browser assertion. This is a label correction, not access control: source from this public GitHub repository remains visible to others. The `main` branch and public website are unchanged. No merges, publication, spending, telemetry, or changes to the 18 life-area/72-offering scope.

## November 8, 2026 — Lesson 03 founder MP4 — local/private overlay only
The founder supplied `Human_Literacy_Lesson_03_REMAKE_Review(1).mp4` for Lesson 3. File inspected (H.264 portrait 768×1152, 15 fps, 3:54.93, silent, full decode passed). Its visible title is **Managing Big Emotions**, broadly aligned with the site's existing `lessons/03/index.html` curriculum **Recognizing and Managing Emotional Reactions**. Several densely written screens need further reading-speed review. The filename denotes a review version; do not infer final approval. SHA-256 of the exact MP4: `a6d02e0faa9a5fd1fd52259a13abd2b5a1270344e6e06534773074b410a807ce`.

The combined founder draft's Lesson 3 **See It** stage now provides a silent portrait video slot, uses the shared seek/download controls from Lessons 1–2, and leaves the original introductory text and five learning stages intact. It **reveals the player only when media metadata loads**; with the MP4 absent, the video slot is invisible and existing lesson flows continue unchanged. The media source is `../../media/lesson03.mp4` relative to `lessons/03/index.html`.

**Privacy boundary:** The MP4 was **not** uploaded to this public GitHub repository (even draft branches are publicly readable), and nothing was merged or deployed. A separate conversation download `Lesson03_Founder_Review_Media.zip` includes only the renamed `media/lesson03.mp4` and instructions. For offline founder review, download this branch, extract it, copy the overlay's `media/lesson03.mp4` into the root `media` folder, and open `lessons/03/index.html` in Chrome. No modification to `main`. Source-level tests cover no-media fallback and control initialization; actual local MP4 playback/seek/download, text pacing, accessibility, matching lesson imagery and founder acceptance must still be verified. Never call this an approved production master without the founder's explicit review.
