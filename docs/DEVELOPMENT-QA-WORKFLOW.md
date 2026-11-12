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