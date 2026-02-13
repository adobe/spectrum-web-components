<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / 2nd gen testing

<!-- Document title (editable) -->

# 2nd gen testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Where to put tests](#where-to-put-tests)
- [Test file structure](#test-file-structure)
    - [Meta and imports](#meta-and-imports)
    - [Standard sections](#standard-sections)
    - [Section placement guide](#section-placement-guide)
- [Writing test stories](#writing-test-stories)
    - [Using the step function](#using-the-step-function)
    - [Using getComponent](#using-getcomponent)
    - [Using getComponents](#using-getcomponents)
    - [Attribute and property checks](#attribute-and-property-checks)
    - [Testing variant collections](#testing-variant-collections)
- [Testing warnings and debug messages](#testing-warnings-and-debug-messages)
- [Code coverage](#code-coverage)
    - [Coverage thresholds](#coverage-thresholds)
    - [Auto-updating thresholds](#auto-updating-thresholds)
- [A11y checks with aXe](#a11y-checks-with-axe)
- [Testing command reference](#testing-command-reference)
- [Guidelines](#guidelines)

</details>

<!-- Document content (editable) -->

## Overview

2nd gen components use Storybook play functions as the primary test layer. Tests live in dedicated test story files so docs stories remain clean and test stories only appear in development Storybook.

## Where to put tests

- Keep docs stories in `2nd-gen/packages/swc/components/<component>/stories/<component>.stories.ts`.
- Add test stories in `2nd-gen/packages/swc/components/<component>/test/<component>.test.ts`.
- Reuse the base stories and metadata from the main stories file.
- Test stories run in development Storybook only and are excluded from `storybook:build`.

## Test file structure

### Meta and imports

Every test file starts with the copyright header, imports, and a meta export that spreads the main stories meta. The `tags: ['!autodocs', 'dev']` ensure test stories are excluded from docs and only appear in dev Storybook.

```ts
import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Badge } from '@adobe/swc/badge';

import '@adobe/swc/badge';

import { getComponent, setupSwcWarningSpy } from '../../../utils/test-utils.js';
import { meta } from '../stories/badge.stories.js';
import { Overview, Sizes } from '../stories/badge.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Badge/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;
```

### Standard sections

Organize test stories into exactly **5 sections** using visual separator comments. Every test file follows this order — skip sections that don't apply to the component.

| # | Section | What it covers |
| --- | --- | --- |
| 1 | **Defaults** | Overview test verifying initial property values and rendering |
| 2 | **Properties / Attributes** | Mutations, reflection, attribute-property sync, sizes, static colors, ARIA attributes |
| 3 | **Slots** | Slotted content, anatomy, label fallbacks |
| 4 | **Variants / States** | Semantic, non-semantic, outline, subtle variants; indeterminate, disabled, progress values, state transitions |
| 5 | **Dev mode warnings** | `DEBUG` mode validation, unsupported attribute warnings |

```ts
// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = { /* ... */ };

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = { /* ... */ };

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = { /* ... */ };

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SemanticVariantsTest: Story = { /* ... */ };

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = { /* ... */ };
```

### Section placement guide

Use this table to decide where a test belongs:

| Test type | Section |
| --- | --- |
| Default values after first render | Defaults |
| Setting / clearing a property or attribute | Properties / Attributes |
| Size variations (s, m, l, xl) | Properties / Attributes |
| Static color attribute | Properties / Attributes |
| ARIA label, role override | Properties / Attributes |
| Slot content rendering | Slots |
| Label fallback from slot | Slots |
| Semantic / non-semantic variant list | Variants / States |
| Outline, subtle, fixed positioning | Variants / States |
| Indeterminate, disabled, progress values | Variants / States |
| State transitions (e.g., determinate → indeterminate) | Variants / States |
| Invalid value warnings | Dev mode warnings |
| Unsupported attribute warnings | Dev mode warnings |
| Valid value no-warning checks | Dev mode warnings |

## Writing test stories

### Using the step function

Always destructure `step` from the play function arguments and wrap assertions in labeled steps. This provides descriptive output in both the Storybook UI and CI logs, making it much easier to identify which assertion failed.

```ts
export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step(
            'renders expected default values and slot content',
            async () => {
                expect(badge.variant).toBe('informative');
                expect(badge.size).toBe('m');
                expect(badge.textContent?.trim()).toBeTruthy();
            }
        );
    },
};
```

For multi-step tests, use multiple `step` calls to describe each phase:

```ts
play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('initially has fixed attribute', async () => {
        expect(badge.fixed).toBe('block-start');
        expect(badge.hasAttribute('fixed')).toBe(true);
    });

    await step('removes fixed attribute when set to undefined', async () => {
        badge.fixed = undefined;
        await badge.updateComplete;

        expect(badge.fixed).toBeFalsy();
        expect(badge.hasAttribute('fixed')).toBe(false);
    });
},
```

### Using getComponent

Use the `getComponent<T>` helper from `test-utils.ts` to query a component and automatically await its `updateComplete` promise in one call:

```ts
import { getComponent } from '../../../utils/test-utils.js';

// Instead of:
const badge = canvasElement.querySelector('swc-badge') as Badge;
await badge.updateComplete;

// Use:
const badge = await getComponent<Badge>(canvasElement, 'swc-badge');
```

### Using getComponents

When a story renders multiple components, use the `getComponents<T>` helper to query all matching elements and await their updates in one call:

```ts
import { getComponents } from '../../../utils/test-utils.js';

// Instead of:
const badges = Array.from(canvasElement.querySelectorAll('swc-badge')) as Badge[];
await Promise.all(badges.map((badge) => badge.updateComplete));

// Use:
const badges = await getComponents<Badge>(canvasElement, 'swc-badge');
```

You can also pass more specific selectors to narrow the query:

```ts
const staticCircles = await getComponents<ProgressCircle>(
    canvasElement,
    'swc-progress-circle[static-color]'
);
```

### Attribute and property checks

Prefer focused assertions inside each step. Use `await element.updateComplete` after mutating a property to wait for the render update before asserting.

### Testing variant collections

When a story renders a list (semantic variants, color variants, sizes), loop over the rendered elements inside a step:

```ts
await step('renders all semantic variant values', async () => {
    for (const variant of BADGE_VARIANTS_SEMANTIC) {
        const badge = canvasElement.querySelector(
            `swc-badge[variant="${variant}"]`
        ) as Badge | null;
        await badge?.updateComplete;
        expect(badge).toBeTruthy();
        expect(badge?.variant).toBe(variant);
    }
});
```

## Testing warnings and debug messages

Use `withWarningSpy` from `test-utils.ts` to capture `__swc` warning calls. It enables DEBUG mode, runs your callback, and automatically restores the original state — no manual `try/finally` needed.

```ts
import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';

export const InvalidVariantWarningTest: Story = {
    render: () => html`<swc-badge>Label</swc-badge>`,
    play: async ({ canvasElement, step }) => {
        const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

        await step(
            'warns when an invalid variant is set in DEBUG mode',
            () =>
                withWarningSpy(async (warnCalls) => {
                    badge.variant = 'not-a-variant' as unknown as Badge['variant'];
                    await badge.updateComplete;

                    expect(warnCalls.length).toBeGreaterThan(0);
                    expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
                })
        );
    },
};
```

If you need lower-level control (e.g., checking `swcGlobals` directly), `setupSwcWarningSpy()` is still available — just remember to call `restore()` in a `finally` block.

## Code coverage

Coverage is collected via the Storybook Vitest project using the V8 provider. Run it with:

```sh
yarn workspace @adobe/swc test:coverage
```

### Coverage thresholds

We enforce per-path coverage thresholds in `2nd-gen/packages/swc/vitest.config.js`. Different parts of the codebase have different targets:

| Path pattern | Target | What it covers |
| --- | --- | --- |
| `components/**/*.{ts,js}` | **100%** lines, functions, statements | SWC component implementations |
| `**/packages/core/components/**/*.{ts,js}` | **100%** lines, functions, statements | Core component base classes |
| `**/packages/core/shared/**/*.{ts,js}` | **70%** lines, functions, statements | Shared utilities (lower bar while starting out) |

The higher bar on component code ensures that every component and its base class are thoroughly tested. The shared utilities threshold is lower because some utility code may be difficult to exercise through component-level tests alone — the threshold will ratchet upward automatically as coverage improves.

### Auto-updating thresholds

The coverage config uses `autoUpdate` with `Math.floor` to automatically ratchet thresholds upward. When your tests push coverage above the current threshold, the config file updates itself to lock in the new minimum. This prevents regressions without requiring manual threshold bumps.

```js
thresholds: {
    autoUpdate: (value) => Math.floor(value),
    // ...per-path thresholds
}
```

## A11y checks with aXe

Some components include dedicated Playwright accessibility test files (e.g., `badge.a11y.spec.ts`, `status-light.a11y.spec.ts`) that use `@axe-core/playwright` for comprehensive WCAG validation and ARIA snapshot testing.

Run the Storybook test suite with:

```sh
yarn workspace @adobe/swc test
```

## Testing command reference

| Purpose | Command | Notes |
| --- | --- | --- |
| Run Storybook tests (headless) | `yarn workspace @adobe/swc test` | Runs Storybook tests with aXe checks. |
| Run tests in UI mode | `yarn workspace @adobe/swc test:ui` | Uses Vitest UI for interactive debugging. |
| Run tests in a visible browser | `yarn workspace @adobe/swc test:browser` | Launches browser for live debugging. |
| Run tests with coverage | `yarn workspace @adobe/swc test:coverage` | Generates coverage for Storybook tests. |

## Guidelines

- Keep each test story focused on one behavior.
- Always destructure `step` from the play function and wrap assertions in labeled steps.
- Use `getComponent<T>` from `test-utils.ts` to query and await a single component.
- Use `getComponents<T>` from `test-utils.ts` to query and await multiple components.
- Use `await element.updateComplete` after property mutations before asserting.
- Use `canvasElement` inside story `play` to scope selectors.
- Keep test stories in the component's `test` folder and reuse base stories.
- Organize test stories into the 5 standard sections in order: Defaults → Properties / Attributes → Slots → Variants / States → Dev mode warnings. Skip sections that don't apply.
- Use `withWarningSpy` for warning tests — it handles setup and teardown automatically.
