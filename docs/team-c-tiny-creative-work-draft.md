# Team C — Make, Revise, Keep: Tiny Creative Work (source-only draft)

**Area:** Creativity & Legacy. **Date:** November 13, 2026 Central (GitHub November 14 UTC). **Team C.** Source base: founder-approved public `main=997f51a7b03e486011ba70251f811cd65d207438` (RC-06 Everyday Device Care fully released, live verified). [Seven-area v1.0 gap inventory #95](https://github.com/ouroneplace/ouroneplace.github.io/issues/95), [HQ board #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63).

**OPEN SOURCE-ONLY DRAFT: NOT MERGED / NOT PUBLISHED / NO FOUNDER RELEASE AUTHORIZATION.** This is one useful scoped feature, **NOT** whole-area Creativity & Legacy or Team C seven-area v1.0 acceptance.

## Distinct user problem, not a competing feature

Current published `one-place/curiosity-studio.html` teaches exploratory color and symmetry; public `one-place/our-humanity.html` provides reflective scenarios; older Team C independently source-green [PR #75](https://github.com/ouroneplace/ouroneplace.github.io/pull/75) teaches **consent to invite, record and share someone else's oral history**. None of these supplies a first-party workflow for a visitor to **create an original tiny written work, revise it, and make a real private copy**. The four Creativity & Legacy area cards offer external prompts and tool previews; they are not a replacement for actual making.

This draft provides three plain-language moves with an original fictional sample and a fully editable three-line creative piece in the browser: notice a specific detail, reframe it, keep one intentional revision. A visitor may title the piece, preview it, revise without losing typed text, explicitly request a plain-text file on their device, or print; all three moves and the original full example are usable with JavaScript off on paper. Every enabled action is real, non-scored and optional. No generative text claims or AI ownership promises.

## Authoritative primary sources checked November 13, 2026 CT

1. **U.S. Copyright Office, [What is Copyright?](https://www.copyright.gov/what-is-copyright/)**: Protection in the U.S. may attach to sufficiently original human-created expression once fixed; many short phrases and mere generic ideas are not protected. No claim is made that each three-line piece must qualify, that the user owns other people's work, or that the exercise substitutes for registration/advice.
2. **Library of Congress, [Reformatting and Digital Preservation FAQ](https://www.loc.gov/preservation/about/faqs/reformatting.html)**: Decide what to save, organize files and keep separate backups if important. A plain-text file downloaded to one device is **not a verified backup**; explain checking that it opens and storing a safe second copy. Do not require cloud accounts or payment.

The page links directly to these two original official pages, optional click-only `https://`, `target="_blank"`, `rel="noopener noreferrer"`. No jurisdiction-unspecific guarantee of ownership or file permanence.

## Three team-only files

1. `one-place/tiny-creative-work.html`: self-contained visitor lesson and local-only small creative writing experience; 3 textareas + title, 80/180-character limits, blank/missing feedback, reviewed preview using `textContent` to avoid HTML/script injection, local Blob/plain-text download only after explicit click, optional print, canceled destructive actions preserve writing, editing invalidates stale preview but retains authored inputs, print CSS, full no-JS model and native disclosure.
2. `tests/tiny-creative-work.spec.cjs`: **16 intended browser cases**: four viewports 320/390/1366/1920 with screenshots, two 200%-root text reflow widths, missing line and focus, XSS-safe literal preview and stale output invalidation, example overwrite Cancel/Confirm, Clear Cancel/Confirm plus blank, actual Blob download event, script-off at 320/1366 with complete model, keyboard skip/Enter, network/storage/privacy/external official links/area return, and print-media correctness.
3. `docs/team-c-tiny-creative-work-draft.md`: this content/source/test ledger.

No modifications to shared homepage/catalog, `scripts/verify_live_site.cjs`, GitHub workflow or manifests, any accepted page, Team A/B files, held HQ #79 or independent #81 streams. HQ controls new area discoverability and integration. Do not infer this branch is published because of a permitted `index,follow` search preference.

## Truth, privacy, safety and accessibility

- All input is confined to the loaded browser page until the visitor *chooses* Download/Print. No login, submissions, permanent browser storage, server transport, network requests to third parties, cookies, analytics, external libraries, tracking or automatic upload. Content only appears in user-side text fields and a `textContent` preview. File download uses a local object URL, not remote service; test explicit user gesture and warn about shared devices/printers.
- Replace Sample and Clear require native `window.confirm` **only if some authored field is nonempty**. Cancel retains all authored text and current preview; Confirm loads sample or clears. Editing afterward hides stale preview and disables save/print until reviewed again. Never erase/overwrite just for a failed form check.
- No real names, identifying details, intimate stories or copyrighted text are requested. Warn against sharing anyone else's story, coerced publication or using material without permission. Fictional sample text is original to One Place; no reuse of creative media or songs. No sharing/social posting button.
- Native real keyboard navigation and skip link to focusable main, visible focus, semantic labels, helpful status region, reduced motion, adaptive layout. Static paper process including three-line prompts and complete original sample remains available with scripts off. Browser Print menu is available without scripts.
- Synthetic Chromium passing will **not** certify real phones, native VoiceOver/TalkBack, unassisted novice usability, copyright legality of an actual work, long-term reliability of a file, or the entire Creativity & Legacy life area.

## Required exact-head QA and HQ handoff

1. Compare draft source HEAD against current protected base; expect exactly 3 **ADD-only Team C files**, no accepted changes/deletions.
2. Verify HTML/JS syntactic validity, unique IDs/links, focused expected 16-case test, 320/390/1366/1920 with 200%-root text, no-JS at 320/1366, keyboard, copy/download/print recovery, dialog cancellation, safe text rendering and no network/storage.
3. Run full actual GitHub Actions `npm test` at exact source head, inspect real browser job stdout and failure diagnostics. Fix any defects on SAME source branch, do not misreport pending CI as PASS. Then read back all immutable blob SHAs and record scope/provenance, official sources and remaining risks in PR and HQ board #63.
4. HQ later: selectively import on then-approved `main`, add *only authorized* area link / live verification, run new combined-head QA and appropriate independent usability, obtain fresh specific founder release approval prior to merge/Pages; validate exact deployment SHA, bytes, public live phone/desktop path and postmerge regression.
5. Founder-held #79, four #81 streams, RC-06 approved release, prior Team C #97 Household Records source-green handoff and all earlier founder-accepted materials remain protected.

**No founder decision needed during source development.**
