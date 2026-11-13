<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Testing overview

<!-- Document title (editable) -->

# Testing overview

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [What to test](#what-to-test)
- [Testing forms](#testing-forms)
- [What not to test](#what-not-to-test)
- [Excluding stories from tests](#excluding-stories-from-tests)

</details>

<!-- Document content (editable) -->

Tests should be short, flat, and easy to read. When you look at a test, you should understand what it does right away. If a test feels complex, simplify it. Test behavior that users care about, not internal details.

> "Design your test for system 1 — when looking at test code it should _feel_ as easy as modifying an HTML document."
> — [JavaScript testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices#%EF%B8%8F-0-the-golden-rule-design-for-lean-testing)

## What to test

Test things that users and developers depend on:

- All public properties and their defaults
- All attributes, especially reflected ones
- All slots and slotted content
- All custom events
- All user interactions (click, keyboard)
- All accessibility features (ARIA roles, labels, properties, states)
- All variants and states
- Error handling and edge cases
- Dev mode warnings for invalid usage

## Testing forms

- **Component tests** cover value, validity, reset, disabled behavior, state restoration, and events. Keep them beside the component, even when they use `<form>` or `FormData`.
- **Integration tests** cover controls working together. The shared [Forms integration suite](../../../gen2/packages/swc/patterns/forms/test/forms.test.ts) checks combined submission, native and custom validation, reset, disabled groups, and buttonless submission with multiple Text fields.

When adding a form component:

1. Test its own behavior locally and add it to relevant shared scenarios without duplicating local checks.
2. Add a focused scenario for new interactions between controls. Preserve specific assertions when moving tests.

Keep test fixtures independent of the pattern's example and its handlers. Native placeholders do not prove that future custom components work. Reuse existing DOM helpers and keep form operations and assertions visible.

In development Storybook, open **Patterns > Forms** for the manual **Playground** and automated **Tests**. Both are excluded from production builds.

Run the suite directly, or through `yarn test:gen2`:

```bash
yarn workspace @adobe/spectrum-wc exec vitest run patterns/forms/test/forms.test.ts --project storybook
```

Cover browser-enforced submission blocking without `novalidate` and application-controlled errors with it. With `novalidate`, submit events still fire, but `form.checkValidity()` must reflect every control.

Use [Playwright for trusted keyboard input](02_storybook-testing.md#native-dismissal-and-trusted-input); Storybook keyboard events are simulated.

## What not to test

- Internal implementation details (private methods, internal state)
- CSS class names or shadow DOM structure (use VRT instead)
- Framework internals (Lit rendering, Storybook internals)
- Third-party library behavior
- Every possible prop combination (test meaningful ones)

## Excluding stories from tests

The `'!test'` tag excludes a story from all three automated test runners at once:

- **Vitest play functions** — the story's `play` function is not executed
- **aXe WCAG compliance** (`test:a11y` via `test-runner.ts`) — axe does not analyze the story
- **Visual regression tests** — the story is not captured in VRT snapshots

Use `'!test'` only when automated testing would produce **false positives** — results that appear as failures but do not reflect real defects. The most common case is static-color stories: axe evaluates contrast against the page background, not the decorator's gradient, so a `static-color="white"` button fails contrast thresholds in isolation even though it passes in real usage on a dark background.

```typescript
export const StaticColors: Story = {
  // axe reports false-positive contrast failures because it evaluates colors
  // against the page background, not the staticColorsDemo gradient decorator.
  tags: ['options', '!test'],
  parameters: { staticColorsDemo: true },
};
```

**Appropriate uses:**

- A story depends on a background or layout context (e.g., a gradient decorator) that axe cannot account for when checking contrast
- A story is a pure animation or motion demo with no stable DOM state to assert against

**Inappropriate uses:**

- The story is complex or hard to test — simplify or split it instead
- The story has a real accessibility issue — fix the issue rather than excluding the story
- The story simply lacks a `play` function — omitting `play` is fine; adding `!test` creates a gap in aXe and VRT coverage too

Every `'!test'` story is a blind spot across all three test layers. Add a comment explaining the reason when you apply the tag, and add a corresponding test story with a custom render (see [Testing static color variants](02_storybook-testing.md#testing-static-color-variants)) to restore behavioral coverage.

The `'!dev'` tag is separate: it removes a story from the development Storybook sidebar without affecting any test runner.
