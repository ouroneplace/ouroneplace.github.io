# CURRENT POLICY — Public Live Updates (Founder approved November 8, 2026, ~9:16 PM Central)

The founder explicitly chose **ONE PLACE public website as the always-current version**, without a separate preview or ZIP-review process. This supersedes the earlier founder-preview publishing plan below. Keep GitHub Pages publishing from protected `main`, not `founder-preview`. Implement changes on a working branch, run browser checks and merge via the required pull request to `main`; GitHub Pages publishes after the merge. No formal prepublication founder preview is required for ordinary content changes. Postpublication founder review and corrections occur at the same public URL: https://ouroneplace.github.io/.

Retain branch protection and automated regression checks; public visibility does not remove security, privacy, or safety obligations. Do not publish private financial/medical/family information, passwords, or licensed content. Label incomplete offerings accurately; do not imply deployed features are functional if they're not. Get specific approval for money, external accounts, or significant commitments. As verified November 9, all ten approved lessons use published Descript embeds and are live; the original local MP4 files for Lessons 01–03 are in the repository. Do not treat the earlier missing-Lesson-03-file or former local-player workflow as current. Descript availability and accessible media alternatives remain distinct quality checks. Earlier sections below describe the superseded staging proposal only.

## November 9 source-of-truth checkpoint

- Current public workflow: working branch → PR → browser regression success → squash merge to `main` → GitHub Pages deployment verification. No ZIP or separate founder preview needed for ordinary approved updates.
- Ten live video lessons now share the founder-approved centered heading and Descript player format; each has independent See It and Understand It stages plus Practice, Remember It, Results and Live It. This supersedes the old notes below about Lesson 03 being unavailable.
- [OP-104 / HL-119 current founder acceptance guide](../review/HL-119-founder-acceptance.md) specifies representative real-device, keyboard, playback and accessibility checks. The prior review's local clone commands and 10-second MP4 controls are historical only.
- Published baseline at this checkpoint: `main` `760e4e28d5c5f12e1663f6eec3b44493d4a8d358`, [Pages success](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/42589725553), [post-merge browser suite success](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/42589727160). Verify new deployments again rather than using this as a permanent release SHA.
- Ordinary live updates remain authorized; financial expenditure, private information, outside services and substantial new functionality require appropriate separate decision gates. Open draft PRs #3–#5 remain unmerged and are not blanket-release approvals.

---

# HISTORICAL ONLY — ONE PLACE Always-current Founder Preview (superseded)

**Source branch:** `founder-preview` (public repository). **Intended site URL after GitHub Pages configuration:** https://ouroneplace.github.io/

## Single working-version policy
1. Work on `founder-preview` as the integrated, always-current review branch. After each accepted change, update this branch and allow GitHub Pages to republish it. Do **not** rely on old ZIP downloads for routine founder review.
2. GitHub Pages > Build and deployment > Deploy from a branch > **founder-preview** / **(root)** > Save. This one-time administrative setting **cannot be changed by our current GitHub file-edit connection**. It replaces the *published content* at the existing URL, without merging or editing protected `main`.
3. Publish only founder-approved, non-sensitive materials. This repository and GitHub Pages website are public even if called a founder preview. Avoid personal data, private family stories, credentials, and unpublished media that the founder wants confidential.
4. `main` remains protected and serves as the formal release baseline; it is NOT the live draft source while Pages points at `founder-preview`. Final release to `main` requires separate founder review.
5. The browser regression workflow runs on pushes to `founder-preview`. Check Actions after changes; a passing browser test does not substitute for final founder acceptance.
6. Do not automatically merge PRs #1–#6. The preview may integrate reviewed pieces independently; preserve their history and boundaries.

## Integrated as of November 8, 2026
- Current unified ONE PLACE homepage, Our Humanity, Curiosity Studio, Housing & Utilities, and Home Skills Academy from combined draft PR #6.
- Human Literacy Lesson 3 split into distinct **See It** and **Understand It** stages to match Lesson 2, with complete Practice, Remember, Results, and Live It stages. Controls remain available through shared helper; existing Lesson 1 and 2 media intact.
- Approved founder video expected at `media/lesson03.mp4`. **As of this record, the binary is not yet in GitHub.** It must be uploaded once to **this branch's media directory**. File SHA-256: `a6d02e0faa9a5fd1fd52259a13abd2b5a1270344e6e06534773074b410a807ce`, 20,688,575 bytes. After upload the player becomes visible automatically. No code edit is needed for the player.
- Money & Bills includes a link to the Debt & Creditor Guide v1 from PR #3. Original four catalog offerings remain in place. Confirm all five fictional situations in founder review; no live creditor communication or data connection.
- Corrected CFPB resource URLs from separate Money & Bills fixes.
- No purchases, analytics connection, or real data storage.

## Setup remaining
A repository administrator must choose `founder-preview` as the GitHub Pages publishing branch and commit the approved `lesson03.mp4` to `media/` on that branch. Until that happens, the existing public URL remains the older site and the video remains available only in the local review packages. Do not represent the preview as deployed until it is actually observed at the public URL.

## Next review
After first deployment, check homepage, Our Humanity, Housing & Utilities, Money & Bills -> Debt & Creditor Guide, and Human Literacy Lesson 3 in Chrome. Video audio is intentionally silent. Check browser seeking and Return Home navigation. Desktop founder review before manual mobile acceptance, per founder preference.
