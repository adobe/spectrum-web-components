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
