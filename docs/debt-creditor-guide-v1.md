# ONE PLACE · Debt & Creditor Guide v1 · Founder prototype

**Approved in conversation:** November 7, 2026. **Status:** Private draft implementation; not approved for public release. This enhances **Money & Bills → Understand debt and creditor options** (existing solution ID \`s002\`). No change to approved site priorities, other 71 solutions, existing PR #1 (CFPB links / planner return), or PR #2 (Our Story).

## Purpose

Turn the general three-step debt-and-creditor page into a short, actionable learning experience:
1. **Understand** the common situation and the appropriate limits.
2. **Consider options** based on one of five self-selected categories.
3. **Practice** with editable, clearly labeled example wording. The examples are not sent, do not constitute verified legal forms, and do not simulate live AI or a real creditor.
4. **Act** by checking steps and downloading a locally produced TXT next-step plan.

Paths: card payment hardship; contacted by collector; disputed/unknown debt; received court papers; comparison of relief/counseling options. The court route is prominently urgent and avoids inventing or calculating state deadlines. Collection validation notices and lawsuit responses are treated separately; some dispute rights depend on a timely written response.

## Technical implementation

- New page: \`one-place/debt-creditor-guide.html\`. Self-contained, no build dependencies. \`noindex,nofollow,noarchive\` remains on the draft page.
- Existing root solution \`/index.html?service=s002\` gains a **private founder draft** invitation linking to this page *on this branch only*; 18 life areas and 72 solution records remain unchanged.
- Back link targets \`../index.html?area=Money%20%26%20Bills\`; other links open One Place home and the existing Money & Bills planner.
- Browser-only dynamic DOM, no storage, form submission, analytics, tracking, account, paid feature, external code or AI inference. TXT plan generated with Blob / object URL after a direct click.
- Editable text must be fictional or non-sensitive; no account numbers, addresses, passwords, health details, or identifying debt information. Official outbound links open only on an explicit click and have separate privacy policies.
- This is general U.S. information. Not an individualized debt recommendation, lawsuit answer, credit-score prediction, attorney interaction, credit reporting or bank connection.

## Official research (checked November 7, 2026)

- CFPB, card payment difficulties: https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-i-cant-pay-my-credit-card-bills-en-1697/
- CFPB, validation notices: https://www.consumerfinance.gov/ask-cfpb/what-information-does-a-debt-collector-have-to-give-me-about-the-debt-en-331/
- CFPB, debt believed not owed: https://www.consumerfinance.gov/ask-cfpb/what-can-i-do-if-a-debt-collector-contacts-me-about-a-debt-i-already-paid-or-dont-think-i-owe-en-1403/
- CFPB, responding to debt lawsuits: https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-sued-by-a-debt-collector-or-creditor-en-334/
- FTC, avoiding debt-relief scams (March 2026): https://consumer.ftc.gov/consumer-alerts/2026/03/looking-debt-relief-heres-how-avoid-scam

These links were researched but must be retested on the founder's device before approval; guidance, consumer protections and external sites can change. State law may add protections; the guide does not determine location-specific deadlines.

## Founder acceptance checklist

- On the integrated draft preview, open \`index.html?service=s002\`, select **Try the private guide**, and verify correct destination.
- Test all five paths: correct title, three distinct starting steps, path-specific warning, source link, editable practice wording, three checkboxes and one optional action.
- Try a fictional edit, check a task, download TXT, confirm content and privacy disclaimer, then choose **Start over / clear**.
- Use the **← Money & Bills** link and confirm it returns to the existing category's four options. Test at 320px and desktop width; check no horizontal clipping, keyboard focus and action tap targets.
- Confirm **court papers** path prioritizes the deadline and legal assistance and never pretends a sample is a filed answer.
- Test offline/no outgoing request until the user explicitly opens official sources.
- Leave other draft PRs undisturbed. **Do not merge, publish or spend** without later explicit founder approval.

Automated Playwright coverage: \`tests/debt-creditor-guide.spec.cjs\`. Browser automation alone is not founder acceptance.
