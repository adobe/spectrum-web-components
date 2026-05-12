<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Running tests

<!-- Document title (editable) -->

# Running tests

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Troubleshooting](#troubleshooting)
    - [Test times out](#test-times-out)
    - [ARIA snapshot fails](#aria-snapshot-fails)
    - [aXe reports violations](#axe-reports-violations)
    - [Coverage below threshold](#coverage-below-threshold)
    - [Warning tests not capturing calls](#warning-tests-not-capturing-calls)

</details>

<!-- Document content (editable) -->

| Purpose | Command | Notes |
| --- | --- | --- |
| Run Storybook tests (headless) | `yarn workspace @adobe/swc test` | Runs play function tests with browser |
| Run tests in UI mode | `yarn workspace @adobe/swc test:ui` | Interactive Vitest UI for debugging |
| Run tests in visible browser | `yarn workspace @adobe/swc test:browser` | Browser window for live debugging |
| Run tests with coverage | `yarn workspace @adobe/swc test:coverage` | Generates V8 coverage report |
| Run all a11y tests | `yarn test:a11y` | Both 1st-gen and 2nd-gen |
| Run 2nd-gen a11y tests | `yarn test:a11y:2nd` | 2nd-gen only |
| Run a11y tests with UI | `yarn test:a11y:ui` | Interactive Playwright UI |
| Update ARIA snapshots | `yarn test:a11y <component> --update-snapshots` | After intentional a11y tree changes |

## Troubleshooting

### Test times out

- **Storybook not running** — Tests start Storybook automatically, but if it fails to start, check for port conflicts on 6006.
- **Wrong story ID** — Open Storybook and copy the story ID from the URL.
- **Wrong element selector** — Make sure the selector matches the custom element tag (e.g., `swc-badge`, not `sp-badge`).

### ARIA snapshot fails

1. Review the diff in the test output.
2. If the change is intentional, update snapshots with `--update-snapshots`.
3. If unexpected, fix the component.

### aXe reports violations

1. Read the violation message and the linked docs URL.
2. Fix the component to address the issue.
3. Re-run to verify.

### Coverage below threshold

1. Run `yarn workspace @adobe/swc test:coverage` to see the report.
2. Look for uncovered lines, functions, or branches.
3. Add test stories that exercise the uncovered code paths.
4. Re-run coverage to confirm.

### Warning tests not capturing calls

- Make sure `withWarningSpy` wraps the entire block where you change properties.
- Call `await badge.updateComplete` after setting properties — warnings fire during the update cycle.
- If the warning is only issued once, clear `issuedWarnings` by using a fresh `withWarningSpy` scope.
