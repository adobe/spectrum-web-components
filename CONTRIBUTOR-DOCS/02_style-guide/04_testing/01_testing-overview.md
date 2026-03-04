<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Testing overview

<!-- Document title (editable) -->

# Testing overview

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [What to test](#what-to-test)
- [What not to test](#what-not-to-test)
- [Anatomy of an interaction test](#anatomy-of-an-interaction-test)
    - [Use descriptive text in assertions](#use-descriptive-text-in-assertions)

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

## What not to test

- Internal implementation details (private methods, internal state)
- CSS class names or shadow DOM structure (use VRT instead)
- Framework internals (Lit rendering, Storybook internals)
- Third-party library behavior
- Every possible prop combination (test meaningful ones)

## Anatomy of an interaction test

Every test follows three steps: **arrange**, **act**, **assert**.

```typescript
play: async ({ canvasElement, step }) => {
  // Arrange: get the component
  const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

  await step('removes fixed attribute when set to undefined', async () => {
    // Act: change something
    badge.fixed = undefined;
    await badge.updateComplete;

    // Assert: check the result
    expect(badge.fixed, 'fixed property value').toBeFalsy();
    expect(badge.hasAttribute('fixed'), 'fixed attribute presence').toBe(false);
  });
},
```

- **Arrange** — Set up the component and any data you need.
- **Act** — Do something (change a property, click a button, fire an event).
- **Assert** — Check that the result matches what you expect.

Keep each step focused on one thing. If your test covers multiple behaviors, use multiple `step` calls.

### Use descriptive text in assertions

Always pass a human-readable message as the second argument to `expect()`. When a test fails, this message appears in the output alongside the expected and received values. Without it, you only see raw values, which makes debugging harder.

```typescript
// Good: failure message tells you exactly what went wrong
expect(badge.variant, 'badge default variant').toBe('informative');
expect(badge.size, 'badge default size').toBe('m');
expect(badge.textContent?.trim(), 'badge to have slot content').toBeTruthy();

// Bad: failure only shows "expected 'neutral' to be 'informative'"
expect(badge.variant).toBe('informative');
```

Keep messages short and specific. Describe the thing being checked, not the expected value:

| Good | Bad |
| --- | --- |
| `'default variant'` | `'variant should be informative'` |
| `'fixed attribute presence'` | `'should have fixed attribute'` |
| `'icon slot element'` | `'the icon slot should be truthy'` |
| `'warning count for invalid variant'` | `'expect warnCalls length to be greater than 0'` |
