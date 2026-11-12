# ONE PLACE — Parallel Development Operating Standard v1.0

**Status:** PROPOSED in draft PR · November 12, 2026 · not yet a published-site or merge authorization  
**Control board:** https://github.com/ouroneplace/ouroneplace.github.io/issues/63  
**Related standards:** [Development QA workflow](DEVELOPMENT-QA-WORKFLOW.md) · [Life-area completeness and quality](life-area-quality-standard.md)

## Objective

Increase the number of **verified, genuinely useful visitor outcomes** while decreasing founder time, test-wait interruptions, needless repeated screenshots, duplicate PRs, lost approved work, and defects. One Place is not a race to accumulate pages. The founder controls design, priorities, human acceptance and every publication.

**Operating rule:** Parallelize *independent feature design and implementation*, not shared integration, global design decisions, or final releases.

## Single source of truth

- The live public source of truth is the actual current GitHub `main`, issues, PRs, current-head actions and the current control board. Memories, other chat summaries, and status copied into a different conversation are not proof of what is merged.
- [Issue #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63) is the **live, cross-chat coordination board**. Project HQ is the only editor/coordinator of the board's authoritative assignment and release statuses. Teams register work through issue comments and draft PRs.
- A development chat may discover that the board has not yet caught up with GitHub: **GitHub ref and CI status win**. Record the discrepancy for HQ; never act on a stale SHA.
- Work is not automatically done in background merely because another ChatGPT tab is open. A user interaction, a supported delegated workflow, or an explicitly configured automation is needed. GitHub Actions can independently run previously triggered CI.

## Responsibility / ownership

| Role | Owns | Never does without explicit consent |
|---|---|---|
| Founder | Product direction; TEAL philosophy; priorities; major design; experiential acceptance; scoped release decision | Need not debug code, reconcile branches or watch CI |
| Project HQ | Roadmap and issues; cross-team prioritization; shared files; integration branches; regression; release preparation; post-release checks | Merge/publish or expand release scope without founder approval |
| Team A | Health & Wellness, Family & Caregiving, Mental Health & Safety, Aging & Accessibility, Emergencies & Preparedness | Change another team area or shared site infrastructure |
| Team B | Money & Bills, Housing & Utilities, Work & Careers, Business & Entrepreneurship, Veterans & Military Families, Legal & Consumer Rights | Change another team area or shared site infrastructure |
| Team C | Learning & Education, Technology & Digital Safety, Relationships & Communication, Daily Life & Organization, Transportation & Travel, Creativity & Legacy, Community & Civic Life | Change another team area or shared site infrastructure |

Exactly 18 catalog areas; the live catalog's names and routes are authoritative. **Team boundaries are about file ownership and safe parallelism, not separate visual brands.** All experiences must feel like One Place.

**HQ-owned shared files:** `index.html`, global navigation/menus, shared CSS/JS/config, `scripts/verify_live_site.cjs`, `.github/workflows/*`, exact deployed-file manifests, homepage catalog registry and global QA standards. Teams provide precise patch *requests* and tests for the changed area rather than editing these paths.

**Team-owned files:** new area page(s), area-specific assets, feature-specific tests (`tests/<feature>.spec.cjs`) and scoped `docs/<feature>-draft.md` evidence ledgers. If modifying a shared existing area page is unavoidable, reserve it with HQ first; never let competing agents edit the same file on different active branches without a reconciliation plan.

## Concurrency limits to prevent backlog explosion

- Up to **three independent active feature builds** (one per team) is ideal initially. HQ may have one integrated release candidate under QA in parallel.
- Teams should complete a small, useful feature slice and put it through focused QA **before starting a second feature**. Once the draft PR and handoff are stable, they can move on without waiting for long full-suite CI on another team's work.
- HQ maintains a **single ordered integration queue**. Branches are based on current `main` unless intentionally integrating other PRs.
- A released or frozen candidate is **not expanded indefinitely**. Later work goes into a new batch.
- Prefer 1–3 closely related features per future founder-review release; an existing five-feature PR such as #62 may be reviewed separately as a legacy assembled bundle. Avoid repeatedly growing it with every new discovery.
- Do not duplicate pages or another team's functions. Search existing site pages, issue labels/descriptions, PR files and feature ledgers before implementation.

## Work item contract

Every feature should have one named human outcome with clear bounds. Example:

> A visitor can compare an unfamiliar job message to a fictional safer choice, explain why independent verification matters, and leave without entering personal identifiers.

A task is ready for development when it has:

1. **Problem and audience:** who needs the outcome and what existing feature fails to deliver;
2. **One measurable visitor outcome:** what someone can actually do when finished;
3. **Source/evidence plan:** authoritative original references; date/region; where uncertainty remains;
4. **Safety/privacy limits:** no diagnostic/legal/financial guarantees, no unexpected writes or tracking, consent before export;
5. **Non-goals:** what this slice will intentionally not do, especially overlapping features;
6. **Acceptance tests:** a representative real-world scenario, invalid/recovery paths and accessibility.

If no real visitor outcome can be stated, do not create a new page simply to increase coverage.

## Chat-to-GitHub lifecycle

1. **Refresh:** read issue #63, current `main` SHA, relevant existing features, open PRs and governing standards.
2. **Claim:** check ownership and existing task/PR; register the scoped work with HQ. Use branch prefix `team-a/`, `team-b/`, `team-c/`; name branch descriptively, with unique date/feature identifier. HQ uses `integration/`, `hq/` or `ops/`.
3. **Build:** implement *one* visitor outcome with explanations, exercises, consent and clear end state. Keep unrelated source untouched; preserve approved text/behavior.
4. **Fast feedback:** syntax, `npm run test:quick`, feature-only Playwright, source checksum/diff inspection. Debug here instead of repeatedly waiting 6–9 minutes for whole-site CI.
5. **Source-review:** compare changed files against claim. Team branch should not include shared files. Verify source links, safety limits, blank/invalid/edit/reset, privacy/network writes, and relevant global/local contexts.
6. **Draft PR:** when local feature and focused tests are coherent, open a draft PR (do not pre-open a PR for every small edit). Its description follows the PR template; link the work to issue #63. Record exact HEAD, not just branch name.
7. **Full current-head CI:** run repository full regression when appropriate for a candidate. If it fails, inspect exact logs, fix the cause, rerun on the new head; do not report stale green results as current.
8. **HQ intake:** check conflicts, provenance, safety evidence and new file paths. Reject destructive changes to approved work, empty feature promises, or missing ownership. Add HQ-owned scoped area link, smoke and deployed-file manifest in one integration commit set.
9. **Integrated QA:** test *the combined actual code* on the exact final integration SHA; repeat mobile/desktop, enlargement, keyboard and privacy checks, and do a visual layout review of critical pathways. CI for a source PR does not certify integrated code.
10. **Founder handoff:** state a concise visitor outcome, what is verified/unverified, one demo/preview location when available, known limits, one concrete release decision and the proposed post-release plan. Never demand that founder debug GitHub.
11. **Scoped release:** only after explicit founder approval for that specific feature/batch. Confirm base/head/CI and merge once. Verify Pages exact merged SHA, expected exact file bytes, live desktop/mobile journeys, and post-merge full tests before reporting released.
12. **Close the loop:** mark source PRs integrated or superseded only after release evidence; record version and any deferred corrections. Preserve traceable history.

Do not create a fake preview URL or claim an unmerged branch is already on Pages. If founder wants to test before release, provide a verified, locally served/approved preview or a reviewed screenshot recording, subject to available tools and explicit access limitations.

## QA layering: better speed, same standard

| Layer | Trigger | Checks | Who |
|---|---|---|---|
| A. Fast | Each coherent local edit set | `npm run test:quick`, static syntax, changed-file diff, source preservation | Team |
| B. Focused | Feature is usable or repaired | `npx playwright test tests/<feature>.spec.cjs`, visual spot check, privacy and edge cases | Team |
| C. Source PR | Candidate for HQ handoff | Full exact-head `npm test` CI, official link/source and safety review | Team/HQ |
| D. Integration | HQ assembled a release candidate | Full exact-head regression plus targeted cross-area/navigation and visual verification | HQ |
| E. Production | **After founder-approved merge** | Exact Pages SHA, live file-byte integrity, actual mobile/desktop smoke, full post-merge regression | HQ |

Full CI should remain a final gate, **not a blocker for separate, independent development conversations**. Prefer staging meaningful changes before pushing to avoid canceling and restarting redundant automatic runs. The already-open [PR #41](https://github.com/ouroneplace/ouroneplace.github.io/pull/41) tests a CI 3-worker variant; benchmark test duration, failure rate and resource contention against the current 2-worker baseline before adopting. Do not skip tests or blindly increase workers.

## Definition of Done / Done for whom?

- **Code complete:** feature code and focused tests exist, with no obvious unhandled error or privacy flaw.
- **Team QA passed:** own checks passed on exact branch head; handoff includes links, known limits and shared-file requests.
- **Integration QA passed:** HQ assembled exact combined code and current-head full CI and visual/functional checks passed; unmerged candidate is **ready for founder release decision**, not deployed.
- **Published and verified:** approved merge is on `main`; exact commit deployed and production monitoring and main regression passed.
- **Founder-accepted:** founder explicitly accepts the experience/area; this is separate from code completion and release.
- **Life area complete:** the 12-lens quality review and founder sign-off establish appropriate coverage. A green CI alone never certifies area completeness.

Do not collapse these statuses into one “done.”

## Founder communication rules

- Give **verified facts first**, with a bounded claim. State tests and SHA only if confirmed from GitHub.
- Mention only decisions the founder truly needs to make now. Otherwise: **No founder action needed.**
- Minimize repetitive screenshots and step-by-step “click this” review. HQ should prepare an intelligible demo scenario and one consolidated founder check after technical QA.
- Explicit “next” / “continue” advances the work in that chat but does **not** approve merge, publication, public changes to TEAL, paid services, or privacy-sensitive data handling.
- Don't promise independent background coding; use Work mode / supported delegation for a distinct authorized multi-step task where available, and automatic CI as appropriate.
- When founder review is requested, specify one exact test path, what to try, expected result and known limitations. Founder's responsibility is product judgment, not finding avoidable browser errors.

## Parallel-work verification and 7-day pilot

Baseline from Nov 12, 2026: published `main` `2b2a32ed3a33de82af8ec96fa788b9f8045eb776`, PR #62 was draft with 753/753 browser checks passed and zero audit errors/warnings, and full CI could take several minutes. These are **historical checkpoint facts**; refresh before claiming current.

During the first seven days of *actual parallel operation*, HQ records (do not invent values):
- New useful visitor outcomes with a functional demo;
- Percentage of focused/merged attempts that pass first-time QA;
- Duplicate PR or shared-file collision count;
- Full-suite runtime at exact run URLs, plus canceled/restarted runs;
- Escaped regressions on approved flows and number of repaired defects;
- Founder time spent testing/debugging and number of approval interruptions.

Review whether one/team + one/HQ integration improved throughput without increasing defects. If coordination or quality degrades, reduce concurrent builds before opening more chats. **One effective workflow is better than many idle or conflicting chats.**

## Known older PR triage

HQ should separately investigate open, stale PRs #3, #4, #5, #27 and #41. Do not auto-close, rebase, or merge historical work solely to make the PR list tidy. Some changes may already be superseded; confirm source lineage and founder priorities. PR #55 (GitHub Field Guide) is closed unmerged, and explicitly excluded from One Place.

## Cross-chat sync message

A development chat can be advanced with:

> Check current `main`, [issue #63](https://github.com/ouroneplace/ouroneplace.github.io/issues/63), and the current PR list. Continue only your assigned area work on a separate feature branch. Use fast/focused tests while building, create one scoped draft PR with a complete handoff, and leave shared files/integration to Project HQ. Do not publish.

Project HQ can be advanced with:

> Refresh the control board and all current PR/CI statuses. Reconcile completed team handoffs, prevent source overlap, update one current integration candidate, run exact-head QA, and report only verifiable results. Do not publish without my scoped approval.
