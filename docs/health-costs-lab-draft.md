# Health Costs Practice Lab — separate draft review record
Date: November 12, 2026 (Central)
Status: Draft only — not merged, not public, not founder-accepted

## Why this slice
[Health & Wellness issue #49](https://github.com/ouroneplace/ouroneplace.github.io/issues/49) explicitly includes learning to understand medical bills and insurance terms. The released Health & Wellness page introduces premiums, deductibles and networks but not practical skills for checking an Explanation of Benefits or a bill. This standalone Lab fills that specific gap without rewriting the already accepted Appointment Preparation Studio or the Health Literacy Practice Lab.

## Visitor outcome
Four source-linked, fictional practice lessons:
1. Know the difference between an insurer Explanation of Benefits (EOB) and a provider bill.
2. Compare the service dates, charges, plan payments, earlier payments, and claimed patient responsibility instead of paying blindly.
3. Understand cost-sharing terminology and compare likely total costs, covered services and provider networks.
4. Ask for an itemized statement and billing/insurance clarification when a charge is unexpected, while checking local assistance, protections and deadlines.

Each lesson includes why, what, how, result check, common mistake, and a stop-and-ask boundary. Answers are never uploaded, stored, graded or linked to a person. Static teaching and official links remain usable without JavaScript; submit buttons are disabled by default and enabled after submit interception is installed. The scope is clearly marked as U.S. general education; plan, program, state and country rules vary. Never interpret personal bills or guarantee savings, deadlines, or eligibility.

## Primary sources checked November 12, 2026
- [CMS: How to read an Explanation of Benefits](https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/guides-resources/read-explanation-benefits)
- [CMS: How to read your medical bill](https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/guides-resources/how-read-your-bill)
- [HealthCare.gov: Glossary of Health Coverage and Medical Terms](https://www.healthcare.gov/SBC-GLOSSARY/)
- [CFPB: What to do if you cannot pay a medical bill](https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-i-cant-pay-a-medical-bill-en-2125/)

The source list is background educational evidence and not a legal, insurance, clinical or financial determination for an individual. External links are clearly labeled.

## Changed file boundary
- New: `one-place/health-costs-lab.html`.
- Existing Health Center: add exactly one link under the coverage guide; preserve approved Studio source and behavior.
- New: `tests/health-costs-lab.spec.cjs` (13 focused scenarios).
- Existing smoke verifier: visit and interact with the new Lab in desktop/mobile public post-release smoke.
- Existing Pages integrity workflow: increase exact application file manifest from 20 to 21.
- This draft record.

## QA evidence and acceptance gates
Initial source/content review completed; 13 focused automated browser cases authored for 320, 390, 1366, 1920 viewports; each lesson's blank, incorrect, correct and reset flows; keyboard plus enlarged text; no-JS default; network/browser-storage privacy; route round-trip to accepted Studio; and official link attributes.

Full exact-head CI, visual screenshots at the required viewports, actual first-time-user experience, and founder review are **not yet claimed**. The post-merge PR #52 baseline full regression is a separate in-progress check and must be reconciled independently.

**No merge/publication without explicit new founder authorization.** After any such approval, verify exact-SHA Pages deployment, 21-file integrity, public interactive smoke, and post-merge regression. Preserve other approved categories, all 18 life areas, 72 catalog paths, existing lesson videos and TEAL content.