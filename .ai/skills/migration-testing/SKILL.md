---
name: migration-testing
description: Phase 6 of 1st-gen to gen2 component migration. Use to write unit tests, accessibility tests, and Storybook play functions for a migrated component.
---

# Migration testing ([Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_gen2-component-migration/README.md))

[Phase 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_gen2-component-migration/README.md) of the 1st-gen → gen2 component migration. The goal is automated test coverage for behavior and accessibility — unit tests via Vitest, a11y tests via Playwright, and Storybook play functions.

## Mindset

You are a skeptic. Tests that always pass are not tests — they are documentation. Use the `test-driven-development` skill to ensure that each test would be able to catch a real regression. Write the failure case before writing the assertion. If you cannot imagine how a test could fail, it is not testing enough and should use `ask-questions` to flag the concern with the user.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before writing tests. Use it to derive the must-ship test matrix, breaking-change coverage, accessibility and behavior regressions, and any high-risk open questions that need regression protection. If it is missing, stale, or intentionally incomplete, derive the needed context from the implemented behavior and source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phases 4 (migration-a11y) and 5 (migration-styling) are complete
- The user asks to "add tests" or "write tests" for a migrated component
- The user asks to add play functions, a11y specs, or unit tests
- The user asks to add dedicated VRT stories for a migrated component
- The user refers to "Phase 6" of the gen2 component migration workstream

## When NOT to use

- Phases 4 and 5 are not complete — accessibility behavior and styling must be implemented before they can be tested
- You are fixing an existing test failure unrelated to migration

## How to invoke

- "Add tests for [component]"
- "Write tests for [component]"
- "Phase 6 for [component] migration"

---

## Workflow

Follow **[Phase 6: Testing](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-6-testing)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

If the implementation or the needed test coverage has drifted from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

For dedicated visual regression stories (`test/vrt/*.vrt.ts`), also use the [`vrt-authoring`](../vrt-authoring/SKILL.md) skill.

## Form-associated components

If the component is form-associated (any control that participates in a `<form>`: text field, checkbox, checkbox group, radio group, picker, combobox, and similar), its stories and tests **must** exercise it **inside a native `<form>`** and cover the full form lifecycle, per [forms strategy RFC §3.5](../../../CONTRIBUTOR-DOCS/03_project-planning/05_strategies/forms-strategy-rfc.md#35-testing-form-participation). This is required for every form-associated component, not a per-component choice. Cover all four:

- **Value on submit:** submitting the form yields the expected `FormData` (a control contributes its `name`/`value` when it has a value, and nothing when it does not; grouped multi-select controls contribute one entry per selection).
- **Validation:** a `required`/constrained control blocks submission and reports validity (`:invalid`/`:user-invalid`, `checkValidity()`/`reportValidity()`), clearing once satisfied; validate at the level the constraint lives.
- **Reset:** `form.reset()` restores every control to its default value via `formResetCallback()`.
- **Getting the value:** the value read on submit matches the value read programmatically, across value/no-value and post-reset states.

Add a story that renders the component in a `<form>` with submit and reset buttons; it doubles as the consumer-facing example and the fixture these tests drive. Use a native `<form>` for now, and move to a dedicated form component once one exists; likewise use **native** `<button type="submit">`/`<button type="reset">` for the surrounding controls until the clear-button component and the button form-association fast-follow are complete.

## Native dismissal and trusted input

`@storybook/test`'s `userEvent` dispatches synthetic events (`isTrusted === false`), which browser-native `popover`/`<dialog>` light-dismiss (Escape, outside/backdrop click) ignores, so a synthetic Escape does not dismiss a native overlay. Test that native path in the Playwright accessibility spec (`test/<component>.a11y.spec.ts`), which drives real, trusted input, not in a play function. Play-function files (`test/<component>.test.ts`) are indexed as dev Storybook stories, and importing `vitest/browser` there throws outside the Vitest runner, breaking the dev server. Component-authored JavaScript handlers (click-to-toggle, focus, keydown backstops) work with the synthetic `@storybook/test` `userEvent` and stay in play functions. See [Native dismissal and trusted input](../../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/02_storybook-testing.md#native-dismissal-and-trusted-input) for the full pattern.
