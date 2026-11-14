# Team A — Alerts to Safe Action Practice (private source draft)

November 13, 2026 Central / November 14 GitHub UTC. Individual Emergencies & Preparedness outcome, not whole-area Version 1.0 acceptance.

## Gap assessment and nonduplication
Current public `main=e2cd592bb77dd53ab8081a312d8ba1a4e51669e7` includes the 18-area/72-offer catalog and the emergency area’s generic planning, links and prototype cards; it does not host a first-party weather-alert-to-protective-action lesson. Existing Team A SOURCE-GREEN, UNPUBLISHED drafts [PR #70 Power Outage Continuity](https://github.com/ouroneplace/ouroneplace.github.io/pull/70) and [PR #74 Home Fire Escape](https://github.com/ouroneplace/ouroneplace.github.io/pull/74) already teach those narrow hazards. This draft teaches **different** skills: independent alert channels; tornado WATCH versus WARNING; avoid flooded crossings and follow updated local evacuation instructions. It does not modify or merge any previous draft or public file.

## Visitor outcomes and safety boundaries
Three original fictional, non-scored choices, nine distinct reasons, three WHY/HOW/COMMON MISTAKE/STOP lessons, four opt-in NWS official sources, keyboard/reflow/no-JS static reading and print. No actual warnings or route lookups, no user data, location, addresses, credentials, maps, scores, browsers storage or network transmission on page load. Immediately stop website practice and follow local authorities/first responders in a real event. NWS tornado warning while in a sturdy home -> immediate interior shelter; evacuation from a flood area if authorities order it -> only by a verified safe route, never through floodwater. Each example explicitly names its **fictional context**; no universal rule that a person must leave or stay for every weather hazard. Access and mobile-home planning require local assessment ahead of time. Not an interactive life-safety response system.

## Primary sources directly opened and reviewed, November 2026
1. [NWS warning delivery channels](https://www.weather.gov/about/warning-dissemination) — WEA, NOAA Weather Radio and EAS.
2. [NWS Wireless Emergency Alerts](https://www.weather.gov/wrn/wea) — WEA do not cover all watch/warning types; seek details from trusted local sources.
3. [NWS Tornado Watch vs Warning](https://www.weather.gov/safety/tornado-ww) — watch preparation vs warning immediate protective action and structure caveats.
4. [NWS floodwater crossing danger](https://www.weather.gov/safety/flood-turn-around-dont-drown) — never cross flooded roadways; routes may be hidden/damaged.
Ready.gov guidance was consulted via indexed results, but direct automated Ready.gov requests returned HTTP 403 and therefore are **not** claimed as directly opened or verified official-page interactions. No third-party imagery/text copied. Sources have U.S. limits and change over time.

## Quality / tests to verify
All 12 required quality lenses apply. Four widths (320/390/1366/1920), 320px with 200% root text, semantic headings/fieldset/radios/status, skip link focus, all three internal anchors and two draft sibling paths, all nine explanatory options and stale-answer clearing, blank/correct/incorrect/reset, no-JS full static teaching and disabled dead-end controls, CSS print, local request and storage inspection, canonical robots/official link semantics. Run exact-HEAD `npm test` GitHub CI, inspect actual browser job/log and audit. Synthetic Chromium passing does not certify physical Android/iPhone, native TalkBack/VoiceOver, human comprehension, local emergency plans, disability accessibility in the field, or qualified emergency-safety subject review. Proportionate real-world risk review remains for HQ/publication.

## Ownership and release boundary
Add **exactly 3 NEW Team A-owned** files:
- `one-place/alerts-safe-action-practice.html`
- `tests/alerts-safe-action-practice.spec.cjs`
- `docs/team-a-alerts-safe-action-draft.md`

No accepted HTML page, homepage, shared navigation/config, browser workflows, live-site smoke, manifest, Team B/C source or HQ PR #79 changed. PR draft/source-only; HQ owns source intake on then-current `main`, future area discovery link if separately approved, integrated regression, exact-merge deployment QA, and requesting explicit founder-scoped release permission. Existing #79 HOLD/#81 independent review obligations untouched. This individual source handoff does not make whole Emergencies area or Team A 5/5 Version 1.0 complete.
