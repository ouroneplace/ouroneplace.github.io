# Team C — Story Sharing Consent Practice (Creativity & Legacy, draft v0.1)

**Team:** C. **Date:** November 12, 2026 (Central). **Source baseline:** protected main `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`. **Coordination:** https://github.com/ouroneplace/ouroneplace.github.io/issues/63

**State:** Team-owned development draft. Not merged, deployed, presented as a public feature, founder-accepted, legally approved or certified for handling sensitive stories.

## November 13, 2026 — protect an invitation against accidental full reset

- **Verified source gap:** “Start over and clear everything” immediately removed typed invitation text and choices, even if the visitor had an unsaved draft. That is unnecessary data loss; the separate “Clear invitation wording only” control intentionally stays unchanged.
- **Narrow fix:** If there is any invitation text or selected reflection, request native browser confirmation describing removal of invitation text, choices and reflections. Cancel keeps all text, checked responses, reasoning feedback and progress, and announces that reset was canceled. Confirm clears everything as before. Empty practice resets immediately without a prompt; no persistence, tracking, new data handling, third-party requests or redesign.
- **New tests:** Cancel preserves a custom invitation, reviewed explanation and unreviewed selection; subsequent Confirm clears; empty reset creates no prompt; existing full reset test now explicitly confirms. Do not cite the previous 707/707 green head as proof of this change: exact new-head GitHub CI must finish.
- **Release protection:** This is a Team C source-only draft. Current founder-authorized published source is `05501c9643e4fbf1fd876a18e3347bff15ea4b8e` after PR #78 with 27 monitored files. HQ alone owns integration/publication, full integrated-head regression and founder authorization.

## Gap and real visitor outcome

The existing Creativity & Legacy catalog offers starting a family story/memoir, a creative project plan, a Legacy Story Builder and a Life Story Roadmap. Those currently use generic catalog/preview guidance, not an original first-party interactive exercise teaching how to responsibly ask another human to contribute. It would be misleading to turn personal narratives into content without an informed choice by the person sharing.

**Single outcome:** In one fictional family music-history case, visitors practice three decision points: invite the storyteller clearly without emotional pressure, honor a request to skip or stop, and obtain separate approval for any different audience/format before sharing. Visitors may optionally practice a general invitation with wording that is editable but never stored or submitted.

This is *not* an interview recorder, AI biography writer, family data repository, audio-to-text service, actual legal release, archival repository, consent record, user authentication, public publishing workflow, copyright transfer tool, or assessment of another person's decisional capacity.

## Human-readable teaching method

1. **Invite clearly:** Ask Morgan whether they want to talk about music, why Alex asks, how notes/recordings might be used, and who might read them. Different uses require discussion; no coercion or claim that a family relationship equals recording permission.
2. **Honor a changed mind:** Morgan stops answering about a conflict; Alex may offer to skip, change topics, pause or stop, and must not treat third-party claims as Morgan's account.
3. **Confirm use:** Consent to family notes does not authorize named public social posts. Review exact quotation, attribution, audience and restrictions before use; if Morgan declines, do not post. Avoid promising that already-distributed copies can always be retrieved.
4. **Optional real-life transfer:** Three distinct explanations per move (9 total), a neutral example of an invitation, optional draft textarea and a deliberate clear/reset. Example loading only after all three practice reflections; handwritten custom text is protected from overwriting. The sample is readable without the form.
5. **No-JS path:** Original scenario, every why/how instruction, three explanatory disclosures and a full ethical invitation remain available without JavaScript. No real names, family stories, recordings or consent signatures collected.

Respect and care matter, but ethical permission is not the same as a jurisdiction-specific legal contract. Recording laws, copyright/attribution, children, capacity, vulnerable narrators, community rights and archive policies vary; people need relevant local advice where necessary. Refusal or lack of access should not trigger pressure, guilt or inferred legal incapacity.

## Authoritative source checks — Nov 12, 2026

- [Oral History Association — Oral History Best Practices](https://oralhistory.org/best-practices/): planning, transparent purpose and audience, narrators' informed agreement, open-ended questions, respect for declined subjects, opportunity to review, preservation and access agreements. OHA guidance is not One Place endorsement.
- [Smithsonian Center for Folklife and Cultural Heritage — The Interview](https://folklife.si.edu/the-smithsonian-folklife-and-oral-history-interviewing-guide/the-interview/smithsonian): explains permission before interviewing/recording, intended use of notes and recordings, preparation, and respectful interviewing.
- [Boston Public Library — Oral History Informed Consent](https://guides.bpl.org/OralHistory/consent): purpose, potential uses/risks, narrator choice, consent and distinct agreements for publication. Context-specific; templates are not legal advice.

These sources are U.S.-origin professional/educational guidance, not exhaustive global law or an assurance the page replaces trained oral-history practice. Quotes, scenario and UX explanations on this page are original educational illustrations, not endorsements or copied interview material. The sample Morgan/Alex account is completely fictional.

## Privacy, accessibility and truth

The page uses only inline HTML/CSS/JS, with no external SDK, images, fonts, tracking, server posts, storage, cookies, recordings, transcript analysis, microphoned permissions, notifications, files or downloads. Three external source links are explicitly opt-in and use noopener noreferrer; nothing contacts them before a visitor clicks. A visitor's generic practice textarea is capped at 800 characters and exists only in current page memory; browser reload/reset clears it; browser extensions or shared devices can affect privacy separately.

Semantic landmarks, visible skip link, one h1, native radio fieldsets and legends, three live polite feedback regions, editable labeled textarea, native details/summary no-JS path, 46px button targets and reduced-motion/forced-colors CSS. Real physical device and native screen-reader validation remain an independent gate.

## Source ownership and preservation

- `one-place/story-sharing-consent.html` — new self-contained page.
- `tests/story-sharing-consent.spec.cjs` — new focused Playwright tests.
- `docs/story-sharing-consent-draft.md` — new evidence ledger and exact HQ handoff.

No existing published/accepted page, Life Simulator, Human Literacy Lesson, home catalog, TEAL philosophy, published team site assets, `index.html`, global nav/CSS/JS, CI or deployment integrity manifest, or any other team's feature files have been changed. Other Team C source drafts (#68, #69, #73) and HQ integration PR #72 stay separate. Frozen PR #62 remains untouched.

## HQ-only integration requests — not Team C edits

1. On the future HQ integration candidate, add one truthful internal link **"Practice inviting someone to share a story"** inside the existing root `index.html?area=Creativity%20%26%20Legacy` to `one-place/story-sharing-consent.html`, preserving 18 life areas, all 72 original catalog offerings, and all other links.
2. Add the exact new path once to the HQ-owned file manifest within `scripts/verify_live_site.cjs`; derive the count from the final combined tree. Add one narrow smoke flow: area link → make one reflection → complete three moves → write unique text → attempt example without overwrite → reset → return home/area.
3. Independently review the current sources, actual UI screenshots/reflow (320/390/1366/1920, 320+200%-text), actual assistive tech/keyboard/reduced-motion/no-JS, privacy/no extra requests, input edits/blank/reset and original approved work. Execute full `npm test` on the exact future *integrated* head, not solely this source PR. Avoid expanding already-frozen PR #62 or currently assembled HQ PR #72. Preserve/source-track #68 even if incorporated verbatim in #72.
4. Only after specific founder-scoped release authorization should HQ merge or publish; verify exact Pages deployed SHA/bytes, desktop and mobile public smoke and full post-merge regression. A draft PR is never release consent.

## QA ledger — initial source state

| Gate | Evidence | Status |
| --- | --- | --- |
| Protected main / active PRs / accepted work / board | GitHub main SHA and issue #63, #62/#64/#65/#68/#69/#72/#73, published standards and founder record inspected | Checked |
| Ethical original sources and global limits | OHA/Smithsonian/BPL source pages reviewed Nov 12, 2026 | Reviewed |
| Inline script and focused test syntax | Parsed before source blob generation | Checked |
| No-JS/static semantics and privacy code patterns | Actual Git blobs; pending final structure check | Pending |
| Fast `npm run test:quick` + focused Playwright | New exact-head current PR workflow (or local verified execution) | Pending |
| Full `npm test` on exact source PR head | GitHub Actions run on draft head | Pending |
| Independent real visual and screen-reader validation | Manual and physical device, not solely browser automation | Pending |
| HQ integration and publication | Exact merged-deployment SHA + founder acceptance | Not authorized |

**Recommendation:** Once exact-head CI is green, hand this source-only teaching outcome to HQ for a later separate batch. **Founder decision: No action needed.**
