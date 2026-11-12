# One Place development QA workflow

This is a working procedure, not a change to publication authorization.

## 1. Fast checks while editing

Run `npm run test:quick` after changing code. This includes migration, audit and JavaScript syntax checks. For Money & Bills work, run `npm run test:money` to add focused browser tests. For another feature, use `npx playwright test tests/<appropriate-file>.spec.cjs`.

## 2. Visual review

Verify at 320px and 390px phone widths and at 1366px and 1920px desktop widths. Compare approved banners and layouts to stored founder references. Check navigation, actual links, focus, overflow, and source text outside the page footer. Automated behavior passing does not establish pixel-level design approval.

## 3. Full release gate

Before merging into main, allow the required GitHub Actions workflow to run the full `npm test` suite against the current pull-request head. Do not merge with failure, cancellation, incomplete status or unresolved conflicts. Do not change accepted design or unrelated features to make tests pass. Fix genuine issues and update obsolete test expectations only when the intended behavior has changed.

## 4. Live deployment gate

After merge, confirm GitHub Pages deploys the exact merge commit. Spot-check the public feature, back navigation, approved homepage desktop and mobile, and critical external resource links. Do not report success until the public change is confirmed.

## 5. Accountability

Keep accepted work unchanged unless specifically included in scope. Record tests run, pass/fail evidence, known unresolved problems, and whether the change was merged or deployed. Prefer smaller, reversible changes over broad redesigns.

## 6. Founder decision and handoff standard (mandatory)

The assistant owns technical review, defect discovery, source verification, testing, and interpreting pull requests. Do not delegate those duties to the founder through vague requests such as "review the PR", "check it when convenient", or "let me know what you think."

Before every founder-facing status or handoff, explicitly communicate, concisely:

1. **Verified:** What was completed, with exact evidence (test result, run, commit, deployment) and what is not yet verified.
2. **Assessment:** What changes for visitors, any material risks or limitations, and a concrete recommendation.
3. **Founder decision:** Exactly one specific decision, with choices and the outcome of each. If no decision is required, write **"No founder action needed."** Do not call a technical inspection a founder decision.
4. **Next execution step:** What the assistant will do after that decision, including the release/QA gate. Never imply tests or publication are complete when they are not.

Example: "PR #42 changes only the live-site verification workflow and founder acceptance record; regression passed, production-triggered verification remains unproven. I recommend merging after final QA. Founder decision: approve merge and subsequent live-site check, or request revision. If approved, I will verify the exact deployment SHA and report the result." This is a communication example, not authorization to merge PR #42.

Do not ask for approval already granted. Do not repeatedly ask the founder to reproduce automated tests, locate defects, inspect YAML, or interpret logs. When founder visual or experiential review *is* necessary, specify the **one exact URL, action to perform, and success criterion**. Scope should be narrow; provide the expected result. If testing is in progress, say **"No action now; awaiting test outcome"**, not "review when convenient."

For each new One Place conversation, retrieve this guide and the current repository state before giving a development-status recommendation. This documentation is a reinforcement mechanism, not a guarantee that memory or future conversations will behave perfectly.
