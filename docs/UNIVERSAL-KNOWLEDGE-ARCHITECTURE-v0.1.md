# One Place — Universal Knowledge & Planetary Stewardship Architecture v0.1

**Founder's north star (Nov 12, 2026):** One Place should increasingly preserve and make usable the most important human knowledge for everyday survival, growth, relationships, society, the planet, discovery, and the future. If other sites became unavailable, One Place should still offer useful explanations, decisions and durable learning. **This is an aspiration and design test, not a claim that a website can hold all knowledge or replace experts, communities, original research or working emergency services.**

**Status:** Private proposed architecture on a draft branch. Not approved to publish, not a redesign of the current public site.

## Core product rule

Every One Place learning unit must stand on its own as much as practical: a person should obtain a meaningful fact, understand why it matters, try a safe example, know uncertainty/limitations, and leave with a practical action or better question **without requiring a click to another website**. Original primary source links support verification and further study but are not substitutes for the core lesson.

**Know → Understand → Check → Practice → Apply → Revisit.** Provide several ways to learn; none should be mandatory. Each visitor can enter through a need, curiosity, a specific question, or discovery.

## Four front-door paths

1. **Help with something now:** urgency, safety, practical steps; a clear threshold for professional, local, emergency or trusted-person help.
2. **Learn to do something:** simple teaching, materials/preparation, safe steps, a useful worked example, pitfalls, check and recovery.
3. **Understand the world:** foundational concepts in nature, sciences, history, languages, culture, society, technology and the universe; do not confuse widespread claims with verified facts.
4. **Care for our shared future:** Earth's interdependent systems, clean air/water/soil, biodiversity, responsible technology, peaceful cooperation, resilience and future discoveries. Avoid moralizing or pretending impacts are identical everywhere.

Current **18 life areas / 72 catalog offerings remain intact**. The atlas is a cross-cutting *knowledge map*, not a nineteenth life area, rebranding, or replacement for approved mentors and lessons. Existing Our Humanity and Curiosity Studio provide human exploration and light/symmetry experiences; the Atlas must link coherently when approved, not duplicate those designs.

## Twelve broad knowledge shelves, intentionally expandable

| Shelf | Foundational coverage to grow toward | Existing One Place bridges |
|---|---|---|
| 1. Human body, health and care | Body systems, prevention, healthy choices, medical literacy, consent, emergency boundaries | Health & Wellness, Family & Caregiving |
| 2. Mind, relationships and meaning | Cognition, emotions, communication, culture, ethics, conflict, beliefs and diverse traditions | Human Literacy, Relationships, Mental Health |
| 3. Home and everyday capability | Water, food, shelter, cooking, hygiene, maintenance, basic energy and utilities | Housing, Daily Life, Home Skills |
| 4. Learning, reasoning and evidence | Scientific method, numeracy, source quality, uncertainty, media and AI literacy | Learning & Education, Lessons, Simulator |
| 5. Earth systems and living things | Climate versus weather, water cycles, ecosystems, biodiversity, oceans, soil, resource limits | Emergencies, Community, future Earth lessons |
| 6. Matter, energy and fundamental science | Physics, chemistry, mathematics, geology, biology and lab safety | Curiosity Studio, future science pathways |
| 7. Technology and engineering | Electronics, computing, internet safety, materials, infrastructure, engineering tradeoffs | Technology & Digital Safety |
| 8. Human history and cultural heritage | Time, migration, civilizations, languages, creative arts, indigenous/local knowledge, multiple perspectives | Creativity & Legacy, Our Humanity |
| 9. Society, rights and civic cooperation | Local/global institutions, economics, law, governance, participation, evidence and disagreement | Legal & Consumer Rights, Community |
| 10. Work, money and creation | Employment, enterprise, trade, money management, design and ethical innovation | Money, Work, Business, Veterans |
| 11. Earth-to-space exploration | Solar system, stars, galaxies, instruments, observation, uncertainty and space safety | Curiosity Studio, future sky modules |
| 12. Resilience and long-term future | Emergency preparation, food/water access, systems risk, sustainability, adaptation, peace and intergenerational stewardship | Emergencies, Housing, TEAL |

Coverage is **planned**, never claimed complete. Do not claim humanity or cultures can be represented with a single narrative; avoid flattening indigenous, local and living traditions into Western institutional sources alone.

## Knowledge unit contract (for future structured content)

Each concept must have a stable ID, owning shelf, audience/reading level, language/locale, difficulty, motivation/entry path, title, one-sentence purpose, `what-we-know`, `why-it-matters`, `simple-explanation`, `worked-example`, `try-it-safely`, `common-confusion`, `when-to-stop`, `one-small-next-step`, and `source-evidence`. It also needs copyright/license provenance, reviewed date, next scheduled review, dependencies and revision history. Structured data must not replace readable pages or break static/no-JS use.

Suggested per-claim metadata:

```yaml
claim_id: earth.water-cycle.v1.001
kind: "observed finding | well-established model | consensus | interpretation | prediction | opinion"
claim: "Complete, precise, context-bounded sentence"
status: "verified | contested | evolving | needs-review"
confidence_explanation: "Why we know, and what could change"
scope: "global physical principle; regional examples differ"
sources:
  - uri: "https://relevant-original-source.example/"
    publisher: "Named original institution or primary author"
    title: "Actual document or data title"
    published_or_updated: "YYYY-MM-DD or unknown"
    accessed: "YYYY-MM-DD"
    evidence_role: "primary measurement | review | teaching background"
licenses_and_permissions:
  original_words: "paraphrased / openly licensed / public domain / rights reviewed"
review:
  reviewed_by: "Role (not invented identity)"
  date: "YYYY-MM-DD"
  next_check: "YYYY-MM-DD or on triggering event"
```

**Never display a fabricated confidence percentage or “verified” badge from merely having a URL.** Maintain an explicit citation trail and human review of claims when feasible; honest unknowns are better than confident misinformation. Distinguish observations, interpretation and forecasts.

## Reliability and resilience tiers

- **Tier 0: Core standalone text** — useful instructions and safe context included in readable semantic HTML, functional without JavaScript. Original sources are referenced but are not prerequisites for comprehension. Keep essential pages lightweight, printable and readable at 320 px / 200% text.
- **Tier 1: Controlled downloadable packs** — openly licensed or original One Place text, diagrams with alt text, optional PDF/plain-text exports and language editions after provenance/copyright review; no user secrets embedded. Validate actual offline file behavior before claiming it works.
- **Tier 2: Optional installable/offline reader** — progressively enhanced cache/service worker with explicit scope, storage/privacy consent, cache-version migration, delete/reset, security/integrity checks and careful medical/legal update warnings. This is *not implemented* and should never be deployed across the whole site untested.
- **Tier 3: Knowledge preservation and succession** — reproducible open data formats, versioned source manifests, mirrors/backup plans, accessible long-term archives and a governance/succession model. Copyright, privacy, community consent and vulnerable-species protections remain binding even in preservation projects.
- **Tier 4: AI-assisted personalization** — optional, disclosed, source-grounded, privacy-minimizing, recoverable. No silent data transfer, invented local capability, or black-box authority over the user's decisions.

If the entire internet, power infrastructure or real-world supply systems disappear, a single online site cannot meet all needs. Offline and printed materials can make some knowledge resilient, but cannot replace physical resources, experts, emergency response or living communities. Avoid presenting a technology-dependent solution as an absolute guarantee.

## Global inclusion and evidence rules

- Write one plain-English paragraph before jargon. Optional layers may include a picture with equivalent alt text, a short worked example, a practice question, optional audio/captions, a printable version and a deeper technical explanation. Favor usefulness over decoration.
- Internationalize progressively: local law, currency, measurements, emergency numbers, benefits, weather and resources are never treated as universally U.S. default. Use SI units and optionally local equivalents, preserve dates and locale; actual translations need fluent review and correct safety nuances before public claims.
- Accessibility: W3C WCAG 2.2 as minimum reference, test 320/390/1366/1920 and 200% enlarged text, keyboard, low bandwidth, reduced motion, assistive technology, color independence, screen-reader cues and no-JS fallbacks. Do not falsely claim conformance on automatic test pass alone.
- Source hierarchy: original measurements/publications and primary materials where possible; then credible syntheses and independent corroboration. Community knowledge and lived experience matter, but do not use anecdote as a substitute for measurement for contested empirical claims.
- For political, ethical, cultural and religious disagreement: articulate the real perspectives, their evidence and contested assumptions fairly; avoid false equivalence and partisan advocacy.
- Safety first: no do-it-yourself high-risk medical interventions, hazardous construction, dangerous engineering, weapons or sensitive exploitation instructions. Explain when professional or emergency help is essential.
- Open access isn't lawless copying. Protect copyrighted works, privacy, indigenous sacred knowledge, endangered species locations, children's information and confidential data.

## First practical proof

A new self-contained **One Place Knowledge Atlas — Foundation** HTML prototype belongs on an HQ-owned draft feature branch. It must offer real first-party teaching and practice, not a map of future empty promises:
- A global-knowledge introduction that names gaps honestly;
- A small set of *actual* foundational concepts on human health literacy, everyday choices, evidence checking, Earth stewardship and solar system literacy;
- One visible source/limitation per subject, with built-in explanation;
- Multiple fictional source-checking situations to practice independent judgment;
- An accessible path back to current accepted 18-area services and original authoritative sources;
- No tracking, logins, user identity collection or third-party network requests on page load;
- A safe no-JS version with all core lessons still readable;
- No source file edits to already accepted programs or global site navigation. HQ may later link it through one controlled integration after founder approval.

## Project management and prioritization

Align to [Parallel Build Control Board #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63) and pending PR #64 operating standard. HQ owns cross-shelf integration, the knowledge-quality registry, claim audit, design consistency, source manifest and adoption of future website navigation changes. Teams A/B/C create scoped knowledge modules in their own area; prevent global architecture churn.

Prioritize: **severity/urgency of real human need**, number of people helped and equity, educational transfer, evidence clarity, durability under low connectivity, accessibility, global relevance, and low maintenance effort. Every proposed topic must pass a gap check against existing content before starting.

### Phased, measurable development

1. **Foundation:** knowledge taxonomy, source provenance template, first self-contained proof, baseline accessibility/privacy tests, and small-scope founder teaching review. Preserve existing 18/72 exactly.
2. **Depth:** build one carefully reviewed foundational module per shelf; audit factual reliability, actual visitor comprehension, translated safety and accessibility; add local variants only with evidence and expertise.
3. **Resilience:** add openly licensed exports, reproducible source registries, low-bandwidth packages and optional controlled offline capability, then validate disconnection/reconnect and stale-content warnings.
4. **Stewardship:** independent subject specialists and community reviewers as feasible, rigorous feedback/correction workflows, documented succession and funding/copyright/privacy governance.

**Success measure is not number of pages.** Track independently useful lessons, verified original sources, correction turnaround, comprehension in short first-time-user checks, time to a safe next step, accessibility test coverage, publishing regressions and founder effort. Do not invent improvement numbers.

## Evidence used to set direction (verified Nov 12, 2026)

- UNESCO, *Recommendation on Open Science* (adopted 2021): https://www.unesco.org/en/legal-affairs/recommendation-open-science — equity, transparency, multiple kinds of knowledge, rights and protection of sensitive information.
- IFLA/UNESCO, *Public Library Manifesto 2022*: https://www.ifla.org/public-library-manifesto/ — lifelong learning, cultural diversity, free access and community support.
- W3C, *WCAG 2.2*: https://www.w3.org/TR/WCAG22/ — inclusive, accessible content standards.
- WHO, *Health Literacy* (Dec 2025): https://www.who.int/news-room/fact-sheets/detail/health-literacy — ability to find, understand, appraise and use information.
- UNEP, *Nature-based solutions*: https://www.unep.org/en/what-we-do/nature-and-land-action/nature-based-solutions/overview-nature-based-solutions — care for ecosystems and people together.
- NASA, *Solar System Facts*: https://science.nasa.gov/solar-system/solar-system-facts/ — accessible solar-system facts and context.
- MDN, *PWA Offline and Background Operation*: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation — optional offline architecture; no claim One Place has this yet.

These references support educational direction; they do not alone validate every future claim or visitor interface.

## Status / founder gate

**Draft only.** One Place's published `main` remains `2b2a32ed3a33de82af8ec96fa788b9f8045eb776` at architecture creation. Five-area PR #62 was separately technically green, 753/753, and remains unpublished. PR #64 is a separate pending operating-standard draft. Do not merge or silently bundle this Knowledge Atlas proof with #62 or #64. The founder may approve or revise a scoped Atlas release after actual integrated/current-head QA and layout review. Full area/shelf acceptances remain separate.

The founding vision may guide independent design work, but `next` and ambitious language do **not** substitute for explicit approval to change public `main`.
