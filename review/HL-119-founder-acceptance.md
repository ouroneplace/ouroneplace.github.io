# CURRENT — ONE PLACE OP-104 / HL-119 founder acceptance guide

**Updated:** November 9, 2026. **Public live testing; no local clone needed.**  
**Live entry:** https://ouroneplace.github.io/ · https://ouroneplace.github.io/human-literacy/  
**Verified baseline before this QA change:** `main` commit `760e4e28d5c5f12e1663f6eec3b44493d4a8d358`; Pages deployment [42589725553](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/42589725553) **success**; post-merge browser regression [42589727160](https://github.com/ouroneplace/ouroneplace.github.io/actions/runs/42589727160) **success**. On subsequent releases, verify the deployed commit again rather than treating this SHA as permanently current.  
**Source of record:** ONE PLACE Master Product Completion Register, existing HL-119, OP-104, B01/B10 and associated evidence; do not create a duplicate project.

**This section supersedes the historical November 1 guide archived below.** That older packet pointed to the former `humanliteracy/Human-literacy-online` repository, a pinned private draft, the former MP4 + 10-second custom controls, and a prepublication release lock. Do not use its clone commands, old URLs, video control checklist or staging instructions for the current public site.

## What is verified and what is not

1. All **ten** lessons are published on current ONE PLACE `main` with separate See It, Understand It, Practice, Remember It, Results and Live It screens. See It uses the founder-approved **large, centered Descript iframe** and one “Open Lesson N video in a new tab” link. The first three local MP4 master files are also present under `media/`; the other seven masters and independent fallback availability have not been verified within the repo.
2. Browser automation covers lesson links, headings, staged progression, quiz bypass protection (representative workflow), keyboard choices, responsive reflow, and other site journeys. The new outage regression intentionally blocks the **Descript** domain for all ten lessons and checks that text teaching and practice remain usable without the video host.
3. **Not yet certified:** playback and seeking on every physical device, captions and accessible descriptions, ChromeVox or other screen-reader output, full keyboard focus quality across real devices, actual learner comprehension, external-host continuity, or editorial and safety review of every area. A backup link pointing to the same Descript host is **not independent video failover**.

## One consolidated founder session — three natural routes

The founder has already visually reviewed the clean video/heading format. Do **not** repeat identical checks across all ten unless a new bug appears.

**A. Desktop/Chromebook — entry and video**: On the [lesson library](https://ouroneplace.github.io/human-literacy/), open [Lesson 01](https://ouroneplace.github.io/lessons/01/) and optionally [Lesson 10](https://ouroneplace.github.io/lessons/10/) as a recent-version cross-check. Confirm One Place Home and All Lessons, headings, and a play/pause and draggable timeline inside the Descript player. Test fullscreen only if desired. Record whether essential audio and visual information have usable alternatives; do not infer captions from text elsewhere on the page. Covers existing **HL-119-FINAL-01** and **-02**.

**B. Learn and navigate**: In one representative lesson, Continue to Understand It, read the scenario and factual-versus-interpretation explanation, compare all three answers in each practice situation, then complete Remember It. Confirm you cannot use Forward to bypass unanswered knowledge checks; revisit a completed step with Back/Forward, reach Results and Live It, and return Home. Record problems, not another ten-lesson duplicate pass. Covers existing **HL-119-FINAL-03** through **-06**.

**C. Real device and accessibility**: On one **actual Android phone**, check portrait layout, scroll, link taps, video seeking and whether text becomes clipped at large phone text. On a Chromebook use keyboard Tab/Shift+Tab/Enter for an accessible route; use **ChromeVox if already available and comfortable**. A 320-pixel simulated browser and automated 200% font-size test are valuable but do not replace this check. Log any untested item as **NOT TESTED**, not PASS. Covers existing **HL-119-FINAL-07** and relevant OP-104 mobile/keyboard routes.

Use fictional examples. Avoid sending private family, medical or financial data to the site. Optional lesson records may use local browser storage; third-party video and browser speech providers have their own data-processing boundaries.

## Acceptance and next steps

For each existing acceptance ID, record **PASS / FAIL / BLOCKED / NOT TESTED**, device, tested URL and deployed commit, plus a screenshot or concise observation only if a defect occurs. Prior founder-reported video/visual PASS evidence is retained; do not erase or misrepresent it. Browser CI success is technical evidence, not an independent human acceptance decision.

If a defect is reproduced, fix it on a fresh branch based on current `main`, rerun exact-head CI and publish ordinary changes using the founder-approved public-live workflow. Keep the approved ten-lesson design and all other priorities unchanged. Any new paid provider, personal-data collection, external AI service, or significant risk requires separate authorization.

---

## HISTORICAL ARCHIVE — 2026-11-01 packet (not current instructions)

The entire original record is retained below for traceability. Its private preview commands, publication restrictions, references to absent Understand It screens, and old player descriptions are **superseded by later founder approvals and the November 9 verified deployment**.

# HL-119 — Lesson 01 founder acceptance packet

**Prepared:** 2026-11-01 Central. **Private local test only.**  
**Existing actions:** HL-119 (P0, in progress), HL-102 (P0, curriculum), OP-103 (P0, separate founder review), OP-104 (P0, integrated draft).  
**Verified application revision:** `ead60168822be3741b5cdde2d4ca6c3c41d0af40` in [draft PR #9](https://github.com/humanliteracy/Human-literacy-online/pull/9).  
**Automated evidence:** [GitHub Actions run 41367924003](https://github.com/humanliteracy/Human-literacy-online/actions/runs/41367924003): **419/419 Chromium tests passed**; 0 broken links/errors. Eleven static missing-heading warnings are associated with JS-rendered pages; the corresponding 11 runtime heading checks passed. These are **not** physical-device or screen-reader certification.

## 1. Launch a reproducible local review without publishing

On the founder's **Chromebook Linux Terminal** (after turning on Linux and Git if necessary), use a **new separate folder** so existing work remains unchanged:

```sh
git clone --single-branch --branch review/op-104-integrated-founder-v1 \
  https://github.com/humanliteracy/Human-literacy-online.git \
  ~/op104-hl119-founder-review
cd ~/op104-hl119-founder-review
git switch --detach ead60168822be3741b5cdde2d4ca6c3c41d0af40
git rev-parse HEAD
python3 review/static_range_server.py 8765
```

The printed SHA must match `ead60168822be3741b5cdde2d4ca6c3c41d0af40`. Leave this terminal open while reviewing. The server binds only to **127.0.0.1**, supports MP4 byte-range requests, and does not make the preview public. Open **http://127.0.0.1:8765/lessons/01/** in Chrome. Do **not** open the public Pages site for this acceptance test because it uses a different revision.

If localhost refuses the connection, first confirm the terminal still displays the server startup message. If the folder already exists from an earlier attempt, **do not overwrite it**; use a new folder name. Stop the server with Ctrl+C after testing. If a different local service occupies port 8765, use 8766 in both the command and browser URL.

**Preview boundaries:** No merge, public deployment, new services, spending, telemetry, live payments, passwords, private family stories, or personal health details. Use fictional learning examples. Lesson reflections may be retained locally by the browser; review and delete them as part of privacy testing.

## 2. Seven founder checks, consolidated into one final session

Use these existing acceptance IDs in the **Acceptance** tab of the One Place master register; record observed **PASS / FAIL / BLOCKED**, device, exact SHA, and a screenshot or specific symptom. Do not infer success from the earlier browser run.

| ID | Review feature | Founder observation to capture |
|---|---|---|
| **HL-119-FINAL-01** | Entry/version | Lesson 01 opens at the pinned revision; One Place Home and All Lessons routes are clear; page is readable |
| **HL-119-FINAL-02** | **See It** video | Actual Play starts, timeline advances, back/forward 10-second controls and seek bar work; MP4 download opens; determine whether captions or an accessible text alternative are sufficient |
| **HL-119-FINAL-03** | **Understand It** | Text differentiates what happened, feelings, and interpretations accurately, respectfully and legibly |
| **HL-119-FINAL-04** | **Practice It** | Three choices in each of three scenes give meaningful feedback; Next requires the compared choices; keyboard focus remains usable |
| **HL-119-FINAL-05** | **Remember It** | Three questions require selection and submission; Forward cannot bypass unanswered questions or reveal correct answers early; Back/Forward revisit works |
| **HL-119-FINAL-06** | **Live It / return** | Results, real-world action, restart and navigation to One Place work; the action is voluntary and non-coercive |
| **HL-119-FINAL-07** | **Device & accessibility signoff** | Actual phone plus Chromebook keyboard and ChromeVox if available; check 320-pixel viewport, 200% text, horizontal overflow, button/heading announcements, and exit routes; record remaining limitations and explicit founder decision |

**Distinguish:** Chrome DevTools' 320px viewport is a useful emulation, not a physical mobile-device test; Playwright heading checks are not a screen-reader test. Natural vertical scrolling is acceptable. Do not mark a check passed if it is blocked or not observed.

## 3. Decision and endpoint

The original HL-119 endpoint remains **one complete, functional, mobile-friendly Lesson 01 with five experiences, choice-specific feedback, protected knowledge checks, independent navigation, real-world action, accessibility evidence and founder acceptance.** A passing browser suite is necessary but not sufficient.

The separate **HL-102** curriculum consistency issue remains: Lessons 03–10 currently lack a standalone Understand It screen in the reviewed source. Do not silently expand HL-119 or fabricate founder-approved content to resolve that issue.

After one combined founder session, enter seven outcomes in the existing register. Fix any **reproduced** failures in a review branch, rerun exact-head CI, then request one **final acceptance decision**. A final founder approval of the prototype **does not authorize merge or publication**. Only explicit release authorization may change `main` or public Pages.

**Release lock:** Draft PR #9 remains unmerged. No production changes or spending authorized.
