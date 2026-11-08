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
