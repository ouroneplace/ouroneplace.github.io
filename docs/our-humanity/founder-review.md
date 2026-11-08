# ONE PLACE — Our Humanity · Founder-review brief

Status: draft only · 8 November 2026 · new review branch · **NOT approved for release**

## Why this exists
One Place should be pleasant to visit when a person needs practical help, wants to understand life, or simply feels curious. The main site remains an accessible catalog of **18 life areas and 72 planned offerings**. This is a complementary experience, not a replacement, a separate product, a simulated therapist, or an authority that decides what is best for people.

**Proposed promise:** Come as you are. Explore the strengths and vulnerabilities of humanity. Learn, practice, enjoy, or simply be. No account, scores, pressure or required disclosure.

**Founder's philosophy is distinct:** TEAL = Trinity Equals Amazing Love; Respect for Self, Others and Everything; Peace, Love and Happiness. “Earth: The Planet of Love. We are One.” is explicitly aspirational. The **approved private TEAL-101 v1.1** is NOT copied into the public source or rewritten here.

## Delivery on this branch
- `one-place/our-humanity.html`: a first integrated static chapter, accessible without signing in or using AI; 5 thematic rooms, 28 explorations, 4 simulated situations, 13 source links, and a calm "Surprise me" navigation action.
- `index.html`: one plainly labeled entry in the existing home hero; no changes to 18 categories, 72 views, lessons, simulator, TEAL, tools, metrics, or source code for previous features. Site root navigation remains seven links to preserve known acceptance requirements.
- `tests/our-humanity.spec.cjs`: page arrival and return, rooms and source count, scenario interactions, basic privacy, keyboard, and 320/390/768/1366px layout smoke checks.

## What the research supports (and what it does not)
1. **Multidimensional well-being:** OECD, *How's Life? 2024*, describes income, work, housing, health, skills, environment, safety, balance, relationships and civic life. It does not prove this new webpage will improve well-being.
   https://www.oecd.org/en/publications/2024/11/how-s-life-2024_bdcf2f9f.html
2. **Social connection:** WHO, June 2025, distinguishes relationship number, function and quality; isolation and loneliness are different. Do not equate solitude with pathology.
   https://www.who.int/news-room/questions-and-answers/item/social-connection
3. **Learning, context and motivation:** National Academies, *How People Learn II* (2018): prior experience, emotion, culture, retrieval, belonging, agency and autonomy influence learning. Avoid presenting one activity as a proven treatment.
   https://www.nationalacademies.org/read/24783/chapter/2
   https://www.nationalacademies.org/read/24783/chapter/8
4. **Opportunity and circumstance:** CDC social determinants of health (2026): life outcomes depend on economic, educational, healthcare, neighborhood and social conditions. Do not moralize poverty or blame survivors for harm.
   https://www.cdc.gov/infrastructure/public-health-systems-emerging-practices/social-determinants-of-health.html
5. **Violence prevention and family protection:** CDC identifies risk and protective factors at individual, relationship and community levels. Boundaries, safety and accountability take priority over enforced reconciliation.
   https://www.cdc.gov/violence-prevention/about/index.html
   https://www.cdc.gov/aces/risk-factors/index.html
   https://www.cdc.gov/intimate-partner-violence/risk-factors/
6. **Moral diversity:** Annual Review of Psychology (2025), cross-cultural moral judgement: a shared sensitivity to perceived harm can coexist with different interpretations. This is not proof that all moral systems are equivalent.
   https://pubmed.ncbi.nlm.nih.gov/39413201/
7. **Leisure:** BLS 2025 American Time Use Survey finds adults spend meaningful time on socializing, reading, exercise, sports, TV and games; these are descriptive U.S. data, not a model of the world's entertainment tastes.
   https://www.bls.gov/news.release/atus.nr0.htm
8. **Autonomy and accessibility:** W3C WCAG 2.2 provides accessibility criteria. FTC documents manipulative digital design. A welcoming home must preserve agency, understandable choices and easy exits.
   https://www.w3.org/TR/wcag/
   https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers

## Editorial commitments
- No claims of mind reading or universal personality profiling. No labeling people good or bad.
- Broad human patterns are provisional and context-dependent; not all societies, families, individuals or eras are alike.
- Love is not permission to abuse, control or demand reconciliation. Separate safer conflict repair from dangerous or coercive situations.
- Present TEAL as a voluntary philosophy, not religion, politics, medical truth or a test of worthiness.
- No subscriptions, timers, guilt, compulsive streaks, manipulative praise or social comparison.
- Page does not ask for or retain personal responses; none of its scripts uses fetch, external APIs, analytics, cookies or local/session storage.
- No claim that static website delivery, third-party links, browsers or operating systems are perfectly private. External links leave One Place.
- Personal stories supplied to ChatGPT by the founder must never be posted as visitor-facing anecdotes without separate explicit approval.
- High-stakes legal, financial, mental-health and medical concerns require qualified services and appropriate local safety resources.
- No autoplay media, no forced prompt, and no one-size-fits-all 'correct' choice.

## Founder acceptance and release gates
- Confirm links to/from One Place, free tools, Human Literacy and TEAL on real desktop/phone.
- Test 320px, 390px, 768px, 1366px; 200% zoom; normal and reduced motion; ChromeVox/TalkBack; keyboard details/summary; print layout.
- Check source availability, currency, readability and whether interpretations fairly distinguish evidence from opinion.
- Verify no added outbound network calls on initial load, no accidental persistence, no unwanted public collection, and appropriate external-link disclosures.
- Review sensitive scenarios for coercive dynamics, victim-blaming, cultural assumptions and unqualified crisis/medical advice.
- Review the editorial framing; have readers with different needs and backgrounds try the page.
- Run exact-head CI, resolve regressions, then request separate founder approval **before merging or publishing**. A draft PR and its public GitHub *source code* are not a deployed preview.
- Do not change existing scope, priorities, approved lessons/TEAL master, main branch, live GitHub Pages, or expenditure commitments.

## Next possible slices — ideas, not authorized commitments
- Sourced micro-lessons with audio/captions, multilingual accessibility, low-literacy layouts, and alternate reading levels.
- A carefully reviewed "Just Curious" library with science, music, art, history, nature and free interactive experiences.
- Community-tested examples for living alone, couples, chosen family, parenting, caregiving, work, aging and grief.
- Independent review of limitations and global inclusivity.

The first slice should remain small enough for a founder to inspect and enjoy. It is a starting room in a very large house, not a claim to have solved humanity.

## 2026-11-08 founder screen-recording walkthrough (three clips; observation, not release acceptance)
The founder supplied three visual walkthroughs of the **extracted local HTML copy**, approximately 45, 51, and 94 seconds. The original recordings were reviewed in the private ChatGPT conversation; **recordings and full local device paths are not committed to this public repository**.

**Observed:**
- The welcome, five room links, topic summaries and expanded explanations rendered; multiple rooms were browsed, including self, love, family, society, and joy.
- Practice choices expanded to reveal consequences. “Surprise me” navigated into the content. End-of-page references and return-to-home controls appeared.
- The founder navigated back to One Place Home and entered Human Literacy lesson routes. This establishes visible usability for those observed routes only; no complete automated/mobile acceptance is implied.
- One click to the TEAL directory in the extracted copy opened Chrome's folder index rather than TEAL. The file had used a directory-only relative link; now use explicit `../teal/index.html` and `../human-literacy/index.html` so local `file://` ZIP reviews don't depend on directory index behavior. A regression test checks HTTP routing; founder should still retest the extracted copy.
- Collapsing subjects could leave an oversized empty area because grid items stretched to the height of neighboring expanded cards. Add `align-items:start` to topic grid and a layout regression assertion.
- The first “Try this” sentence began with an extra “Try:”; removed the duplicate instruction.

**Not established:** independent source accuracy, all 28 subject links, screen-reader semantics, phone layout, 200% zoom, completion by someone unfamiliar with the project, and final editorial acceptance. No claim that every feature passed. The video browsing included a local folder index; this was a viewing defect, not proof the hosted production website had the same route error.

**Follow-up:** Update the extracted ZIP to the newest draft head, verify TEAL and Human Literacy navigation in that copy, check expanded/collapsed card heights, then separately evaluate readability and whether this feels like a welcoming exploratory home rather than a lengthy reference list. Keep all existing founder acceptance and publication gates open.

## 2026-11-08 — Interactive discovery slice (draft only)
**Why:** The screen recordings confirmed functional reading and practice content, but the page still resembled an encyclopedia. Many visitors don't arrive knowing which question to ask. The new optional `#begin` experience gives them four small situations without requiring a personal disclosure, AI account, assessment, or chatbot.

**What changed:** The existing five rooms, 28 subjects, four practice scenarios, citations, source links, footer, and site pathways remain. A compact **Start anywhere** section now offers:
1. **Understand a feeling:** An unanswered message invites awareness of what is known versus assumed.
2. **Understand someone:** A conflict statement invites perspective-taking without surrendering boundaries.
3. **Share the care:** A family responsibility example offers concrete help, capacity limits, and a route to the existing `family-handoff.html` tool.
4. **Just be curious:** A sensory observation invites wonder without an achievement or problem-solving requirement.

Each presents three optional responses and a short, contextual explanation. A visitor may change approaches, open a relevant existing topic, browse the rest of the chapter, or leave. There is no correct-choice score, psychological inference, stored answer, tracker, or external script. It is a **curated educational exercise**, not personalized professional guidance or a substitute for the more detailed Life Simulator.

**Accessibility & engineering:** Static initial scenario and subject links remain useful without script execution. Ordinary native buttons expose `aria-pressed`; the explanatory feedback uses an `aria-live=polite` region. At 500px and under, navigation/choice buttons reflow. Reduced-motion preferences are respected by the original page. Tests have been added for all four branches, selected-button semantics, keyboard activation, absence of network/storage activity, and four viewport widths; these are smoke checks, **not a certified accessibility audit**.

**Founder gates remain:** Readability and pacing on real phone, ChromeVox/TalkBack, practical usefulness and perception of safety, source accuracy, representative usability review, final acceptance, and separate permission to publish. Exact-head CI must pass after these edits. Do not commit any private family examples; all situations are fictional and general. Keep original One Place site and pending priorities unchanged.

## 2026-11-08 — Curiosity Studio · light and patterns (draft only)
**Purpose:** Turn “just curious” into genuinely enjoyable, low-pressure activity with visual and text feedback. This is part of the approved One Place → Discover → Explore & Experience direction, **not a new standalone project** or a change of website priorities.

**New page:** \`one-place/curiosity-studio.html\` (intentionally standalone for extracted ZIP previews). Reached through existing Our Humanity → Just be curious and the Wonder room; accessible from the current Our Humanity draft but **not deployed to production**.

**Activities:**
- **Mixing colored light:** Native keyboard-accessible red, green and blue brightness sliders (0–255), five preset buttons, a swatch and numeric RGB plus named-color readout. Screen RGB is an **illustration** of additive mixing, not paint, real spectral mixing, or color-vision equivalence. Initial yellow sample is red=255, green=255, blue=0.
- **Rotational symmetry:** Native range slider (3–12 petals), a labeled color selector, reset and surprise controls. The actual SVG uses n identical ellipses rotated by 360/n degrees around the same point; title, description, and text readout are updated with each change. The experience is not reliant solely on distinguishing colors.
- Both are playful, optional, lightweight, local, offline-compatible, and **do not ask for or retain personal information**. The page has no account, cookies, analytics, local/session storage, third-party scripts or outbound requests on load. Outside reading links activate only when clicked.

**Sources for high-level teaching claims:**
- University of Arizona optics outreach, additive red/green/blue light mixing: https://wp.optics.arizona.edu/oscoutreach/color-mixing/
- Khan Academy, introductory rotational symmetry: https://www.khanacademy.org/math/geometry-home/transformations/transformations-symmetry/v/example-rotating-polygons
These support the explanations, **not** a claim of measured learning improvement.

**Editorial repair:** Prior Our Humanity copy contained \`Try this: Try:\` in **27** topics. All duplicates were removed. Preserve all 28 topics, the four curated perspective moments and original practice scenarios.

**Verification gate:** \`tests/curiosity-studio.spec.cjs\` now checks the link from Our Humanity, color presets, keyboard slider adjustments, pattern count/angle, reset, surprise, phone widths (320/390), other widths (768/1366), and no automatic external requests or browser storage. Exact-head CI must finish successfully; real phone/Chromebook, 200% zoom and screen-reader testing remain necessary. Technical checks are not user acceptance. Existing PR #4 remains draft; no merge, public site change, paid service, tracking, new account or new priorities.

## 2026-11-08 — Founder Curiosity Studio recording review (4m 39s, visual observation)
The founder supplied one `.webm` screen recording of a Chromium/Chrome desktop walkthrough (1920×1080) covering Our Humanity and Curiosity Studio. It has **no audio track**, so this is evidence of visible actions and reactions, not spoken feedback. **The video and founder device paths remain private in the conversation; do not upload them to this public repository.**

### Recorded walkthrough — observed, not independently reproduced
- The founder used the Our Humanity page, saw and opened topic explanations and practice responses, and navigated the broader “Start anywhere” choices.
- The dedicated Curiosity Studio page loaded from the new Our Humanity path. Light sliders changed RGB numbers and the colored sample; a Yellow preset visibly restored RGB(255,255,0).
- The rotational-pattern experience visibly updated between six, nine and twelve petals and different colors (including teal and indigo). The numeric angle/readout tracked the changed petal count. Controls for Surprise and Reset were visible; the video is not proof of every possible state or keyboard path.
- The founder followed the optional University of Arizona and Khan Academy background links. The external Khan Academy website displayed a fundraising/donation panel. That is **third-party behavior**, not One Place advertising or a purchase requirement. We added wording before external links that they are optional, open in new tabs, and may show donation/sign-in requests.
- Return navigation to Our Humanity and movement into the existing Family Handoff tool and One Place homepage were visible; no evidence that the live production site was modified during this review.

### Confirmed defect found in the recording — fixed in draft
In Our Humanity → **Enjoy being alive**, the “Explore the Curiosity Studio” invitation was accidentally injected **inside** the first “Music, art and imagination” summary. The text visibly ran together, and the literal fragment `pan>+` appeared. Cause: content insertion used a previously computed character offset after earlier text replacements, splitting the closing `</span>` tag. This was a markup defect, not a browser rendering quirk.
- Repair: restore the exact first summary markup, move the Studio invitation to its own paragraph **before** the five-subject grid, and preserve the intact `<span>` elements.
- Regression: add a browser assertion that the separate invitation is present, the first summary has the exact expected text without an embedded link, all five Wonder subjects remain, and the invitation leads into Curiosity Studio.

### Still not demonstrated by the video
- Touch phone operation; 320px/390px responsive behavior; 200% zoom; screen reader; keyboard-only navigation; all preset states; reset correctness and rare random combinations; all 28 subject citations; comprehensive privacy, offline behavior or learning effectiveness.
- The Khan Academy donation notice does not mean One Place solicits money. This review made the external-source boundary clearer, but visitors should not be required to leave One Place to enjoy or understand its activities.

**Gate:** Recheck the exact current PR head in automated CI, then verify that the repaired Wonder topic has a clean heading and invitation in the extracted ZIP on desktop and phone. Founder acceptance and separate public release approval remain open. Preserve all current One Place commitments and original approved project priorities.

## 2026-11-08 — Final Curiosity Studio refinement before life-area work
The founder requested one final creative update to the Our Humanity chapter, then a transition to reviewing all **18 existing life areas**. No category implementation was authorized as part of this update.

**Confirmed CI failure resolved in code:** The 2026-11-08 workflow for head `4753d6c` reported **452 passed, 1 failed**. The failing test expected the old `#topic-27` link in the “Just be curious” moment, while the actual experience correctly linked to `curiosity-studio.html`. The assertion was updated to reflect the intentional navigation change; this is a stale test, **not proof that the page itself was broken**.

**New capability:** Curiosity Studio → symmetry pattern → **Keep this pattern (SVG)**. Visitors can download the pattern they created as a self-contained, printable vector image containing only the generated shapes. The saved graphic is 320×320 SVG with a solid background, current petals and palette, and descriptive SVG title/desc. Downloading uses a browser-generated Blob and ordinary download click—no remote service, upload, profile, account or persistent storage. Screen readers receive a status message after the download is requested, not an unverified claim that the file was saved.

**Verification added:** The browser test sets nine petals and indigo using accessible native controls, requests a download, checks the suggested filename and SVG shape count, and rejects script content. Exact-head GitHub Actions plus founder testing remain required; do not mark the new feature accepted prematurely.

**Next development work (separate review scope):** In the next phase, audit the **same 18 life areas and 72 planned offerings** already present in the One Place homepage. Do not introduce duplicated categories, silent new priorities, mislabel concept previews as usable services, or break the established Money & Bills, Family & Caregiving, TEAL, Human Literacy and Life Simulator paths. Evaluate each area for (a) real visitor problem, (b) usefulness beyond generic search, (c) clarity and safety, (d) actual implemented vs draft features, (e) mobile/keyboard navigation, (f) verified resources, and (g) test coverage. **No modification to the 18 areas was made in this phase.**
