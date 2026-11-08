# Money & Bills — first-visit experience audit and correction

**Founder requested:** November 7, 2026. **Status:** Corrected in existing **draft PR #3**, not published. This is a simulated visitor assessment based on the founder's desktop screenshot and source review, **not actual user research or usability field testing**.

## Simulated visitors and likely problems

**Visitor A — essentials due:** I have $600 and need $900 rent plus $180 electricity, and payday is later. An immediately highlighted bill planner is useful but may imply the best first step is data entry; the visitor actually needs to check deadlines, contact landlords/utilities, and find community support. The old page made "Get help paying basic bills" compete with a calculator, future paid service, and duplicate generic checklist.

**Visitor B — payment dates:** My bills are due before my paycheck. I need cash-flow timing, not a static monthly remainder. The existing free planner supports dates and shortfalls; it should be the obvious first step for this visitor.

**Visitor C — collector notice:** A collector has called and I am unsure whether the debt is mine. I need validation information, dispute details, and a clear distinction between a collector letter and a court answer. The original generic creditor page did not provide enough detail. PR #3's separate Debt & Creditor Guide provides five educational paths without collecting private records.

**Visitor D — lawsuit:** I received a summons. I need an urgent deadline warning, a trusted source and legal help, not a generic "download my plan" route. Do not invent a deadline or provide a court filing.

**Visitor E — budgeting:** I have stable income but want to compare categories. The Budget Studio is an illustration rather than an account-connected planning service, and its status must be explicit.

## Problems found in the previous screenshot

1. Product taxonomy ("two free starting points, a preview and a future service") came before visitor intent and urgency.
2. The bill planner was emphasized for everyone, although not every money problem is cash-flow timing.
3. Four main cards had similar visual prominence even when one was unavailable and another illustrative.
4. A three-item generic action kit repeated content without adapting to the visitor's reason for arriving.
5. "Four ways to begin" and all the navigation competed with the visitor's actual first decision.
6. No urgent court-papers route surfaced at the category level.
7. Tool names alone did not distinguish education, assistance, fictional illustrations and actual free utilities.
8. Too much explanation about One Place's service inventory before a visitor could take a useful next action.

## Corrections implemented in the draft

- **"What do you need help with today?"** is the first task-specific section, with five buttons for essentials, bill timing, creditor contact, court papers, and a monthly budget.
- Each choice reveals two or three lines of context, three tailored practical steps, an honest warning, a **primary next-action link**, and an alternate official resource or free tool.
- Essential-bill help links to the existing free-help solution and United Way 211; bill timing links to the local planner; creditor situations link to the separately approved PR #3 draft guide with a CFPB alternative; court papers prioritize CFPB's lawsuit guidance; budgeting identifies the studio as illustrative.
- The existing **four Money & Bills solution entries remain unchanged** in their IDs, links and position in the 72-solution catalog. They are now introduced as additional ways to explore, with the future service unmistakably described as unavailable.
- The redundant generic Money & Bills area kit was removed from this category only. It remains on the other 17 categories.
- The duplicate top-level bill-planner promotional banner was removed only on the Money & Bills landing page; the existing free planner retains its direct route.
- Buttons have keyboard focus, selected state via \`aria-pressed\`, and at least 44px targets. The category and all outgoing links are responsive down to 320px.
- Choosing a situation does not send or store user data. No bank, credit, eligibility or legal determination is made.

## Official resources checked

- United Way 211 bill support: https://211.org/get-help/i-need-help-paying-my-bills
- CFPB household financial disruption and bill planning: https://www.consumerfinance.gov/consumer-tools/unexpected-job-loss/
- CFPB guidance when a collector contacts you: https://www.consumerfinance.gov/consumer-tools/debt-collection/know-your-rights-when-a-debt-collector-calls/
- CFPB debt lawsuit: https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-sued-by-a-debt-collector-or-creditor-en-334/

The page does not claim these sources guarantee assistance, settlement, or eligibility. Links must also be checked manually in the founder's browser before any release.

## Automated review and founder acceptance

New tests: \`tests/money-category-journey.spec.cjs\`, covering all five choice panels, primary routes, warnings, keyboard navigation, 320px/390px/1366px overflow, no external requests or local storage, and continuing presence of four catalog offers. Existing category/solution and debt-guide tests must still pass.

**Founder testing:** Open the draft Money & Bills category as a first-time visitor, choose every situation, follow the primary and secondary links, test the return paths from the planner and Debt Guide, then repeat on 320px. Verify that you can find relevant help quickly without being pressured into an unavailable product. The whole page does not need to fit on one screen if this would compromise clarity.

**Open improvements for future separate approval:** local/region-specific assistance lookup, verified translation and language access, context-sensitive practice scripts for essential-bill phone calls, better financial definitions, real accessibility testing with screen readers, live outside-link monitoring, and evidence from visitors. Do not implement these silently or claim they exist.

**Release control:** PR #3 remains draft. PR #1 (bill planner links and category return), PR #2 (Our Story copy) remain separately open. Do not merge or publish any changes without explicit founder approval. Do not alter established One Place priorities or enable payments, tracking, accounts or spending.
