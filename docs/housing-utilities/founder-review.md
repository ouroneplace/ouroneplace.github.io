# ONE PLACE — Housing & Utilities v1 · Founder review

**Status:** Private development / draft only; November 8, 2026.
**Repository:** `ouroneplace/ouroneplace.github.io`; separate feature branch from main. The currently public site is unchanged.
**Scope:** One of the original 18 life areas. Preserve the 18-category/72-offering catalog and all unrelated services, PRs, lessons, TEAL and Our Humanity.

## Why this improvement
The existing Housing & Utilities category listed four entries, but the free entries shared generic three-step text, the maintenance planner was a minimal demonstration, and the fourth was a future assisted-service placeholder. This draft replaces that dead-end experience with a useful, coherent **free U.S. educational resource**, without claiming to offer professional case management, live inventory or services.

## Four existing offerings, now concretely implemented

| Existing label | Real experience in one unified HTML page | Route |
| --- | --- | --- |
| Find rental or housing assistance | Select one of five scenarios, see tailored next steps and vetted starting sources | `#assist` |
| Learn home safety essentials | Emergency cautions, five review checkboxes with live count | `#safety` |
| Home Maintenance Planner | Edit, add, remove, reset tasks (12 task max), each with timing note | `#maintenance` |
| Housing Next-Step Navigator | Assemble a plan from selected situation, safety checklist and task list; edit, download unencrypted TXT, print only the plan, reset | `#plan` |

**Integration:** `index.html?area=Housing%20%26%20Utilities` lists the four actual experiences with accurate FREE labels. Existing service IDs `s005`–`s008` navigate to the new corresponding anchors; other categories and service IDs remain unchanged. Existing homepage search results remain functional. The new guide at `one-place/housing-utilities.html` is self-contained and can be opened directly from an extracted ZIP.

**Five assistance situations:** rent/eviction notices, bill/disconnection concern, urgent shelter need, repairs/unsafe conditions, and affordable housing search. Local rules, eligibility, funding, operating hours, and court deadlines **are not verified by the tool**. No legal filing directions, right-to-withhold-rent advice, guaranteed housing, government impersonation, or automated application submission.

## Editorial evidence and vetted starting sources

Last web review: **November 8, 2026**. Check links and policy changes again before release. These sources support specific guidance but not outcomes or actual program availability.

- [USAGov — Avoid eviction](https://www.usa.gov/avoid-eviction) and [CFPB — What to do if you're facing eviction](https://www.consumerfinance.gov/housing/housing-insecurity/help-for-renters/what-to-do-if-youre-facing-eviction/): eviction notices, counsel, local rights and response deadlines.
- [USAGov — emergency rent assistance](https://www.usa.gov/emergency-pay-rent) and [United Way 211 — housing expenses](https://211.org/get-help/housing-expenses): identifying local assistance; providers and availability vary.
- [HUD — About housing counseling](https://www.hud.gov/hud-partners/single-family-about-housing-counseling): counseling assistance, referrals at **800-569-4287**, languages and fees. HUD states counseling related to eviction, foreclosure and homelessness is free; other counseling may charge limited fees.
- [USAGov — energy bills](https://www.usa.gov/help-with-energy-bills): LIHEAP varies across states, tribes and territories; utility shutoff protections and procedures differ by provider/area. [211 billing guidance](https://211.org/get-help/i-need-help-paying-my-bills).
- [HUD — rental assistance](https://www.hud.gov/topics/rental_assistance) and [USAGov — rental groups](https://www.usa.gov/rent-help-groups): public housing agency, housing counselor and eligibility starting points.
- [USAGov — home repair programs](https://www.usa.gov/home-repair-programs): no blanket guarantee of free home repairs, different local programs.
- [USFA — smoke alarms](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/): test monthly and follow manufacturer guidance.
- [CDC — carbon-monoxide prevention](https://www.cdc.gov/natural-disasters/psa-toolkit/avoiding-carbon-monoxide-poisoning.html): never run generators indoors; keep them outside at least 20 feet from windows, doors and vents.

## Trust, consent, and safety design
- Designed for U.S. use. Global help, jurisdiction-specific legal procedures, guarantees, live availability, eligibility determinations, case management and emergency intervention are outside this v1 scope.
- No account, checkout, site analytics, backend, cloud storage, API, auto-submission or external JavaScript in the new page. It does *not* assert that the visitor's browser/device, server logs, downloads or third-party links are private.
- Inputs are never interpreted as professional advice. All entries stay in the webpage's memory until navigation/refresh; plan download is a **plain-text, unencrypted file** and printing may expose contents to printer history or other people.
- New file and interface do not collect address, health status, household demographics, income, names, or bank details. Editable free-text inputs still permit visitors to enter sensitive text at their own risk. Use fictional entries during founder QA.
- Checklist checkmarks indicate visitor review, not home inspection or safety certification.
- Emergency guidance comes before steps. Never encourage touching fallen wires, investigating gas leaks, self-repairing dangerous systems or ignoring court documents.
- No 'future service' or paid product presentation in the Housing category. All other 17 categories retain their own existing development status and labeling.

## Automated QA scope
`tests/housing-utilities.spec.cjs` tests:
- The four cards, deep links and legacy service route compatibility, plus homepage search.
- Five scenario choices, correct resource targets and no invented guarantees.
- Live checklist count; add/edit/remove/reset maintenance list; unique input labels.
- Generate-edit-export TXT, reset, print-only content, and disabled actions for an empty plan.
- 320, 390, 768 and 1366 pixel widths, keyboard activation, no initial third-party requests or local/session storage.
- The tests run in GitHub Actions upon opening the draft PR; **passing automated tests is not final founder acceptance**.

## Open founder acceptance checks
- Physical Android and Chromebook navigation, including local-extracted ZIP links.
- Text size and 200% browser zoom, keyboard-only use, ChromeVox/TalkBack, varying font sizes and reduced-motion settings.
- Confirm print layout, TXT contents, exact task editing behavior, the empty/maximum cases, and that no personal data is saved to the website.
- Visit each source and review it independently for current language, availability and regional relevance.
- Inspect emergency wording with qualified subject-matter review before public release.
- Verify four categories in isolation and no regressions in the remaining 17 life areas or prior PRs.
- Final decision and separate explicit merge/release approval are **not granted** by this development assignment.

## Next project phase
After this first guide's functional and editorial check, improve remaining life areas **one at a time**. Reuse the same review model, preserve original four-offering count in every area unless founder approves a catalog change, avoid duplicate features and hollow preview cards, and distinguish implemented functionality from conceptual offerings. Continue to let the founder enjoy the work without a release deadline.

## 2026-11-08 founder walkthrough analysis and refinement (source file kept private)
Founder submitted a **5-minute, 56-second screen recording without audio** of the extracted review build, made in desktop Chrome. This record contains only generalized observations, **not family details, personally entered task values, the video, screenshot files, or the local device path**.

### What the recording visually confirms
- The five assistance paths were selected; the appropriate headings, steps, first-sentence scripts and source links changed. Several external providers opened in browser tabs, including USAGov, 211 and HUD; website opening does **not** verify local availability, eligibility or outcome.
- Safety cautions and the five review checkboxes were displayed and interacted with. A checked box records visitor review, not professional home-safety certification.
- The maintenance planner accepted additional tasks and frequencies, editing existing entries and removing an entry. This is strong evidence of basic practical workflow, not just decorative cards.
- The Next-Step Navigator generated text incorporating selected guidance and edited tasks; the browser's print-preview dialog opened; a TXT download was requested. A different, previously downloaded text guide appeared in the editor at one point; **the recording itself does not prove that the Housing TXT contents were inspected**, although separate automated tests check the output.
- The recording did not cover the four original catalog cards, 320-pixel mobile view, full keyboard/screen-reader use, every error boundary, or a real assistance application.

### Defects or risks identified and addressed in this draft
1. **Insufficiently focused shelter referral**: The shelter path previously linked a generic HUD offices page. Replaced it with the verified, purpose-built HUD **Find Shelter** resource at https://www.hud.gov/FindShelter.
2. **Too many external destinations without explicit orientation**: The guide already opened external resources in new tabs; its explanatory note now explicitly says so and warns that external providers may display optional donation or sign-in prompts. There are no paid One Place requirements.
3. **Plan can become stale when inputs change**: After generating a plan, changing a situation, checklist item, or maintenance task now displays a warning that the text is not automatically synchronized. Existing manual edits are protected by a confirmation before regeneration; the visitor can preserve them instead.
4. **Maintenance tasks disappeared on refresh**: A planner that takes time to fill in needs a reasonable way to continue later. Added **Save task list** and **Open saved task list** using a locally created JSON file, explicit import validation, file-size and task-count limits, confirmation before replacing the existing list, and a clear warning that downloaded JSON is unencrypted. It does **not** add cloud storage, accounts, analytics or background saving. Bad or unsupported files leave existing tasks intact.
5. **Privacy language accuracy**: Removed an absolute claim of 'no tracking' that could be misread as a promise about hosting-provider logs or browsers. The new text truthfully describes that this page sends no form entries to a One Place server.

### Remaining product judgment before acceptance
- The guide is U.S.-focused; it is not a current local-housing search engine or licensed legal representative. Actual eligibility, waitlists, eviction deadlines and utility protections must be checked with local qualified resources.
- Urgent danger requires clear exit/dispatch language; multiple safety checkboxes do not substitute for inspection.
- The new maintenance import/export and plan-regeneration confirmation need real Chromebook and phone testing, plus 200% zoom and assistive technology review.
- Manual usability review still needed for whether visitors understand that a plain TXT plan, editable maintenance list and optional JSON backup are different artifacts.
- Preserve founder review and release boundaries: **no merge, publication, paid services or new collection of visitor information**. PR #3, PR #4, other life-area catalog routes and priorities remain unchanged.

### Additional content improvement discovered in the recording
The recorded flow eventually produced a plan after several tasks had been added and a different housing situation selected. Previously, every exported plan repeated the same generic 211/HUD URLs regardless of situation. The new generator now inserts **that specific scenario's labeled resource links**, so shelter yields HUD Find Shelter and repair yields home-repair guidance. Tests check that unrelated scenario links do not leak into those plans.

The planner is now described accurately as a **manual worksheet without automatic reminders**. A saved, locally held JSON file allows continuation after reloading, but it is the visitor's responsibility to keep the file private, avoid sensitive details on shared devices, and import it when returning. This improves continuity without a hosted account.

**Current QA state:** The exact-head full regression suite runs against the newest PR commit. Do not mark it passed until GitHub reports success. Screen recording alone does not demonstrate the new features (they were added after the recording).

## 2026-11-08 12:48 PM — Second founder walk-through: Home Skills and main navigation (5m29s)
**Evidence:** Founder-uploaded desktop Chrome screen recording (no audio). The private recording and any local file paths are not copied into GitHub.

**Observed coverage:** The recording begins in the Housing & Utilities category with all four original entries present. It navigates to the expanded Housing guide, then the Home Skills Academy. The founder opens practical lessons covering cleaning, accessible refrigerator care, dishwasher/range-hood filters, toilet leak tests and flappers, aerators and simple drains, dryer lint/venting and washer hoses, doors and weatherstripping, drywall and lighting, HVAC, exterior drainage, lawn and roof warnings, smoke and CO alarms, emergency preparedness, and expert-only hazard categories. Several source destinations visibly open as separate browser tabs, including EPA WaterSense, USFA dryer safety, DOE and CPSC material. The founder returns to the planner and main One Place homepage.

**Important gap the recording confirms:** The **Our Humanity** menu is absent in the tested main homepage at about 5:06–5:24. That is consistent with opening the Housing-only ZIP rather than the **separate unified founder branch** `review/integrated-one-place-founder-20261108` (PR #6). PR #5 never included the Our Humanity menu. Do not treat this as an Our Humanity defect in PR #6 or proof the live website was updated. Our test instructions must distinguish the ZIPs and lead with the combined branch.

**Product-level assessment:** The 36-guide library offers real text, preparatory tools, short actions, verification and stop conditions. It is **not yet a complete home-maintenance course**: the founder video does not establish independent repair competence or cover equipment-specific procedures, guided images/videos, seasonal inventory, renters, accessibility or learning recall. Search filters, close-all, mobile responsiveness, 200% zoom, and task progression require separate checks. Several opened external sites take time to load; the video is not proof that particular URLs are permanently broken.

**New refinements committed in response:**
- A starter toolkit and instructions for finding a manufacturer manual before work.
- A Close open lessons control, with accessible count, to prevent a very long stack of expanded lessons.
- Five “Expert needed” lessons now use the heading **Recognize the hazard — do not attempt the repair**, not the misleading invitation to try the repair step by step.
- Replaced five weak/general source links with task-relevant background: DOE exterior door weatherstripping job aid; DOE faucet aerator job aid; University of Minnesota lawn mower safety; Penn State Extension tree pruning safety; and a clearly labeled commercial how-to on squeaky hinges. External links may include marketing; no purchase is required.
- New Playwright regression tests cover the toolkit, open-state control, expert heading and exact selected sources.
- Synced the same lesson-library changes into combined PR #6. This does not merge any PR or deploy to GitHub Pages.

**Remaining safeguards:** Independently review/maintain source links (background source is not always a specific model tutorial), add original visuals and accessible alternatives where they materially improve learning, do device and real-world safe task trials with fictional/non-sensitive data, ensure provenance and copyright compliance, and preserve expert escalation warnings. Only the founder can mark acceptance after manual review. No spending/release authority.


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

## November 8, 2026 — Whole-home starter schedule (founder testing only)
An optional expandable home-care schedule now provides 13 lesson-specific tasks across five frequencies (every use, monthly, every few months, seasonally/after weather, and yearly). Each button opens the corresponding existing Home Skills lesson and clears conflicting filters. There is a link back to the editable Housing planner, without implying that reminders or automatic task tracking exist.

Intervals are examples only, not universal requirements. Manufacturer instructions, household needs, actual equipment, local weather, renter permissions and professional advice take precedence. Roof and gutter review is from the ground only. This feature has no accounts, reminders, uploads, or payment component. Playwright regression was added for all 13 targets, five expanders, filter reset, keyboard focus and 320px overflow. Automated success and founder usability acceptance remain separate. No merge, publication or spending is authorized.

## November 8, 2026 — Visual skill recognition and self-check slice
Four additional original inline SVG concept diagrams were added, covering removable dishwasher filters (lesson 4), dryer lint screens versus exhaust ducts (11), washer hose inspection points (13), and door weatherstripping contact (16). Each has a descriptive SVG title/desc, simplified-model warning, caption, optional enlarge/fit control, and direct shortcut from "Start with a picture." Together with the four existing drawings, eight of 36 lessons now have a visual concept aid.

Each illustrated lesson now has one optional three-choice understanding check with explicit explanatory feedback; wrong answers are teaching opportunities, not user scores or safety certification. Feedback and selection are ephemeral page state, not sent to a service or stored. Tests check correctness of key responses, ARIA pressed state, filter reset, no persistence and 320px reflow.

Source review: updated the dishwasher filter's overly generic CDC cleaning link to Whirlpool's official removable-filter guidance (which distinguishes removable versus maintenance-free styles); updated the washer hose's broad EPA reference to GE Appliances' washer leak diagnosis. These are labeled manufacturer examples, **not universal model instructions**, and can contain vendor marketing. Other background links remain optional. The dryer and weatherstripping lessons continue citing USFA and DOE respectively.

Remaining review: confirm the drawings communicate to first-time learners, verify each with assistive technology and large-text zoom, test physical-device accuracy against actual appliance manuals, inspect captions for color independence, and prioritize the remaining 28 text-only lessons according to safety and learning impact. No merger, publication, payment or founder acceptance is authorized.

## 2026-11-08 — Safety-centered visual lesson expansion (v2)
Added four more original explanatory SVG diagrams, bringing illustrated Home Skills lessons to 12 of 36 and optional three-choice self-checks to 12 of 36. New diagrams and checks: toilet flapper mechanism (7, EPA WaterSense), safely recognizing dryer exhaust restrictions (12, U.S. Fire Administration), damaged electrical cords (18, CPSC), smoke alarm test controls and escape planning (28, U.S. Fire Administration). No diagram teaches dangerous live electrical work, roof climbing, gas work, or unsafe forced plumbing. Actual designs differ and manufacturer guidance prevails.

Relevant safety sources: https://www.epa.gov/watersense/home-maintenance ; https://www.usfa.fema.gov/downloads/pdf/publications/clothes_dryer_fire_safety_flyer.pdf ; https://www.cpsc.gov/s3fs-public/5032.pdf ; https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/smoke-alarms/ . The cord lesson now links to the task-relevant CPSC reference.

The Academy now includes 12 visual shortcut buttons in addition to 13 scheduled tasks. The remaining 24 lessons are still text-only; the project does not claim comprehensive handyman certification. Founder QA remains open for safe physical practice, equipment-specific variations, screen readers, enlarged text, 320px layout and source verification. No merges or publication approved.

## November 8, 2026 — Curriculum-wide why / mistakes review
Every one of the 36 Home Skills lessons now explicitly explains **why the task matters** and flags **one task-specific common mistake**. These are short, plain-language educational notes adjacent to the existing instructions, intended outcomes, stop conditions, model caveats and supporting references. The five expert-only lessons retain their non-DIY framing, and warnings emphasize stopping rather than trying dangerous work. This brings consistent WHY + HOW + VERIFY + COMMON MISTAKE + WHEN TO STOP structure to the introductory library, while preserving all 36 lessons and original 18/72 site catalog. Tests assert 36 unique explanations, 36 unique mistake warnings, nine representative lesson disclosures and 320px fit. This is still editorial educational content, not evidence of independent competency, source freshness for all URLs, manufacturer compatibility or founder approval. No merge/publication authorized.

## November 8, 2026 — Water and moisture visual-learning slice (founder-only)
Added four original concept drawings and four optional, non-scored questions: (9) slow-drain plunger and overflow opening, with chemical-cleaner stop rules; (10) clean/dry caulk joint versus damp/moldy joint; (23) garden-hose connector sealing washer; (31) under-sink visible leak inspection points, with electrical-water hazard cautions. The Academy now has **16 of 36** illustrated lessons and **16 of 36** optional understanding checks; the other 20 remain text-only. The "Start with a picture" selector has 16 shortcuts and the existing 13 maintenance schedule tasks are unchanged.

Evidence review: Lowe's accessible household-plumbing educational tutorial supports mechanical sink plunging and cautions against plunging after chemical cleaner: https://www.lowes.com/n/how-to/clear-clogged-drain (commercial page, optional, not an endorsement). EPA warns against caulking over mold or moisture: https://www.epa.gov/mold/what-are-basic-mold-cleanup-steps . EPA WaterSense covers garden-hose connection washers and detecting leaks: https://www.epa.gov/watersense/fix-leak-week and https://www.epa.gov/watersense/home-maintenance . Background links for lessons 9 and 23 were made task-specific. All depictions remain schematic, not diagnostic proof or hardware-specific repair instructions.

Tests check sixteen unique diagrams/checks, four new source links and semantic titles/descriptions, all sixteen shortcuts, recovery from contradictory filters, unsafe-answer feedback, no browser storage and 320-pixel reflow. Founder testing, source freshness, model/accessibility verification and hands-on safety assessment remain open. No merge, public release, paid access, new category or visitor tracking is authorized.

## November 8, 2026 — Appliance, climate and outdoor safety visual learning slice
Four additional original explanatory SVGs and optional three-choice safety checks bring the introductory Home Skills library to **20 illustrated lessons out of 36** (20 practice checks; 16 text-only remain). New lessons: refrigerator door seals (2), metal vs charcoal range-hood grease filters (5), thermostat schedules and heat-pump caution (20), and mower pre-use safety including bystanders and thrown objects (26). The existing 36 WHY and common-mistake pairs, 13 maintenance schedule tasks, 18 life areas and 72 original offerings are unchanged. The "Start with a picture" section now links to 20 visual lessons.

Evidence sources and caveats: ENERGY STAR refrigeration guidance https://www.energystar.gov/products/refrigerators supports checking airtight door seals; this does not mean all gasket repairs are DIY. GE Appliances https://products.geappliances.com/appliance/gea-support-search-content?contentId=18983 distinguishes washable grease and replaceable charcoal filters; it is a manufacturer example only. ENERGY STAR https://www.energystar.gov/products/smart_thermostats recommends compatibility, and heat pump-specific thermostat behavior must be checked with manufacturer documentation (additional context: https://www.energy.gov/cmei/femp/purchasing-energy-efficient-residential-air-source-heat-pumps). CPSC https://www.cpsc.gov/Newsroom/News-Releases/2012/CPSC-Issues-Safety-Tips-For-Rotary-Power-Mowers warns of debris, bystanders, children and guard removal. No drawing is a model-specific repair plan; hidden electrical/fuel/moving-part work remains out of scope.

Tests: 20 semantic SVG diagrams and 20 optional learning checks, four references, correct answer explanations, direct lesson links after filtering, optional zoom and 320px no-overflow checks. These tests do not prove screen reader quality, safety accuracy for all hardware, source freshness, or real-world task competence. No merge/public release, spending, or founder acceptance.

## November 8, 2026 — Eight cross-domain instructional concepts; 28 of 36 illustrated
New illustrated, semantic SVG and explanatory non-scored checks cover: (1) clean before any optional disinfection, (3) appliance-model-approved refrigerator coil access, (14) floor-material-specific moisture limits, (17) cosmetic drywall versus pre-1978 lead-dust warning, (21) HVAC symptom recognition and stop/escalate conditions, (25) roofing and gutters observed from ground without ladders, (29) carbon monoxide alarm immediate evacuation and emergency contact, (30) inclusive emergency supply planning with medication, mobility, electricity backup and communications. This brings the Home Skills academy to **28 of 36 illustrated**, **28 optional checks**, while preserving 36 WHY, 36 common-mistake notices and all 13 schedule tasks. The eight remaining text-only guides cover hinge lubrication, garden irrigation, tree-work danger, and five expert-only hazardous-work subjects.

Source review: CDC cleaning and disinfecting https://www.cdc.gov/hygiene/about/when-and-how-to-clean-and-disinfect-your-home.html ; ENERGY STAR refrigerators https://www.energystar.gov/products/refrigerators and HVAC https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist ; EPA lead-safe DIY https://www.epa.gov/lead/lead-safe-renovations-diyers ; OSHA ladder safety https://www.osha.gov/sites/default/files/publications/OSHA3660.pdf ; CDC CO basics (updated October 26, 2026) https://www.cdc.gov/carbon-monoxide/about/index.html ; CDC emergency personal needs https://www.cdc.gov/prepare-your-health/take-action/personal-needs.html . Existing cited links are retained unless a task-specific source explicitly replaced a broad one. These guides are U.S.-oriented, simplified, and not emergency-dispatch systems or individualized advice. Avoid assuming any illustrated equipment geometry is universal.

Additional Playwright tests assert 28 unique diagram/lesson pairs and matching checks, semantic SVG descriptions, correct and incorrect feedback, 320px fit and diagram zoom, no browser score storage, and navigation recovery after an unrelated search/area filter. The public site remains unchanged; physical-device/manual validity, assistive-technology testing and actual beginner practice remain prerequisites for founder acceptance. No merge, spending, or outside user testing.
