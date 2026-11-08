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
