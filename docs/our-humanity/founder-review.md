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
