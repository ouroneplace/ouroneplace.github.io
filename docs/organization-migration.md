# ONE PLACE organization website migration

Authorized November 7, 2026: copy approved public source main to
`ouroneplace/ouroneplace.github.io` and publish at https://ouroneplace.github.io/.

## Provenance and preservation

- Source baseline: `302cbeb18dec85fd6753469a55b20ce8a18b75ea`, 282 reachable
  commits at capture. The destination adds migration commits on top of this
  ancestry; no shallow/squashed copy or mirror of draft branches is used.
- The ten lessons, five-experience flows, approved video/art assets, Life Simulator
  and scripted Coach, TEAL, 18 life areas / 72 entries, two free tools, source
  licenses and existing tests remain. Main is the only source publication input.
- Unapproved draft features, private materials, prior owners, priorities and
  acceptance history remain governed by the existing project register. This
  migration adds no Everyday Mentor backend or private curriculum.
- The original source repository, branch, site and public URL are not written,
  renamed, disabled or redirected.

## Destination adaptations

Canonical/social metadata and exact-origin TEAL sharing guards now use the
organization root. Preview sharing still excludes a preview URL, query or
fragment. Internal educational-resource entries point to this site's Human
Literacy section / approved lessons. All component navigation remains relative.
The review launcher and its integrity fixtures use the new codeload repository
and ZIP root. Historical evidence/source links remain historical. `.nojekyll`
keeps static files out of Jekyll processing.

Pages should use **Deploy from a branch → main → /(root)** with HTTPS. No custom
domain, payment, tracking, account service or paid integration is introduced.
Existing browser CI runs the full suite. The manual deployed-site workflow tests
the actual host after deployment. Workflow logs, commit SHAs and Pages settings
are the execution evidence; a prepared workflow alone does not prove publication.

The hostname change creates a different browser-storage origin. Old local
learning records do not migrate automatically. The old site remains available;
existing export/delete features are preserved. No private records are read or
transferred during migration.

## Verification boundaries

Full regression includes lesson completion/quiz controls, simulator behavior,
media range/seek, navigation, 320px reflow, keyboard and sampled privacy checks.
Canonical tests cover the new public origin, local previews, lookalike hosts and
query/fragment exclusion. Live verification checks all 18 areas / 72 internal
views, all ten lessons, simulator, TEAL, both tools, returns, error responses and
320px width. Automated viewport emulation is not a physical-phone test or full
screen-reader/WCAG certification. External provider availability and broader
learning effectiveness remain separate evidence.

## Founder checklist after the deployed host is verified

1. Open https://ouroneplace.github.io/ on Chromebook. Confirm ONE PLACE, search
   and one life-area route, then return Home.
2. Open Human Literacy → Lesson 01, check video and a familiar lesson interaction,
   then try Life Simulator and TEAL, using their One Place Home returns.
3. Use fictional examples in Money & Bills and Family & Caregiving; check
   editing, local download/reset and representative 320px / keyboard navigation.

Record PASS or specific failures with the page URL and tested revision. Do not
infer new human acceptance from automated checks or close older unrelated gates.

## Recovery and future releases

The original site remains the fallback and receives no automatic redirect.
If a destination defect appears, retain its failed SHA and fix/revert only the
destination migration delta with a normal reviewed commit; never force-reset or
rewrite the preserved history or modify the original as a shortcut. Any old-site
redirect requires verification and a separate founder decision. Paid services,
tracking, unrelated draft features and changes of scope remain unapproved.
