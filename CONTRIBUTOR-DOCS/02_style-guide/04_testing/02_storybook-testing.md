<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Storybook testing

<!-- Document title (editable) -->

# Storybook testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When to use](#when-to-use)
- [File location and naming](#file-location-and-naming)
- [File structure](#file-structure)
- [Standard sections](#standard-sections)
- [Section placement guide](#section-placement-guide)
- [Writing test stories](#writing-test-stories)
    - [Reuse docs stories](#reuse-docs-stories)
    - [Use the `step` function](#use-the-step-function)
    - [Wait for updates](#wait-for-updates)
    - [Test variant collections](#test-variant-collections)
- [Testing patterns](#testing-patterns)
    - [Testing defaults](#testing-defaults)
    - [Testing property reflection](#testing-property-reflection)
    - [Testing slots](#testing-slots)
    - [Testing dev mode warnings](#testing-dev-mode-warnings)
    - [Testing composed components](#testing-composed-components)

</details>

<!-- Document content (editable) -->

Play function tests are the primary test layer for 2nd-gen components. They run inside the browser as part of Storybook, powered by Vitest.

## When to use

Use play function tests for:

- Default property values
- Property and attribute reflection
- Slot rendering
- Variant and state verification
- Dev mode warnings
- Any behavior that can be verified through the DOM

## File location and naming

Test files live in the component's `test/` folder:

```
components/
  badge/
    stories/
      badge.stories.ts     # docs stories
    test/
      badge.test.ts        # interaction tests
      badge.a11y.spec.ts   # accessibility tests
```

Name tests with the pattern `<FeatureName>Test` (e.g., `SizesTest`, `InvalidVariantWarningTest`, `AnatomyTest`, `SemanticVariantsTest`, `DevModeWarningsTest`).

## File structure

Every test file follows this structure:

```typescript
// Copyright header (lines 1–11)

// Imports
import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

// Component imports
import { Badge } from '@adobe/swc/badge';
import '@adobe/swc/badge';

import { getComponent, getComponents, withWarningSpy } from '../../../utils/test-utils.js';

// Story imports
import { meta, Overview, Sizes } from '../stories/badge.stories.js';

// Meta: reuse main story metadata, hide from docs
export default {
  ...meta,
  title: 'Badge/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Test stories organized into sections...
```

## Standard sections

Organize tests into exactly **five sections** using separator comments. Skip sections that do not apply.

| # | Section | What it covers |
| --- | --- | --- |
| 1 | **Defaults** | Initial property values and rendering |
| 2 | **Properties / Attributes** | Mutations, reflection, attribute-property sync, sizes, static colors, ARIA attributes |
| 3 | **Slots** | Slotted content, anatomy, label fallbacks |
| 4 | **Variants / States** | Semantic, non-semantic, outline, subtle variants; disabled, indeterminate, state transitions |
| 5 | **Dev mode warnings** | `DEBUG` mode validation, unsupported attribute warnings |

```typescript
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

## Section placement guide

Use this table to decide where a test belongs:

| Test type | Section |
| --- | --- |
| Default values after first render | Defaults |
| Setting or clearing a property or attribute | Properties / Attributes |
| Size variations (s, m, l, xl) | Properties / Attributes |
| Static color attribute | Properties / Attributes |
| ARIA label, role override | Properties / Attributes |
| Slot content rendering | Slots |
| Label fallback from slot | Slots |
| Semantic or non-semantic variant list | Variants / States |
| Outline, subtle, fixed positioning | Variants / States |
| Indeterminate, disabled, progress values | Variants / States |
| State transitions (e.g., determinate to indeterminate) | Variants / States |
| Invalid value warnings | Dev mode warnings |
| Unsupported attribute warnings | Dev mode warnings |
| Valid value no-warning checks | Dev mode warnings |

## Writing test stories

### Anatomy of an interaction test

Every interaction test follows three steps: **arrange**, **act**, **assert**. 

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

### Reuse docs stories

Test stories extend existing docs stories. Spread the base story and add a `play` function:

```typescript
import { Overview } from '../stories/badge.stories.js';

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('renders expected default values and slot content', async () => {
      expect(badge.variant, 'default variant').toBe('informative');
      expect(badge.size, 'default size').toBe('m');
      expect(badge.textContent?.trim(), 'slot content').toBeTruthy();
    });
  },
};
```

When a base story is close to what you need but requires different property values, override `args` instead of writing a full `render`:

```typescript
export const DisabledTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('renders in a disabled state', async () => {
      expect(badge.disabled, 'disabled property').toBe(true);
      expect(badge.hasAttribute('disabled'), 'disabled attribute presence').toBe(true);
    });
  },
};
```

When a base story does not render what you need even with different property values, provide a custom `render`:

```typescript
export const FixedClearingTest: Story = {
  render: () => html`
    <swc-badge fixed="block-start" variant="informative">Pinned</swc-badge>
    <span>This is a test of the composed component</span>
  `,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('initially has fixed attribute', async () => {
      expect(badge.fixed, 'fixed property value').toBe('block-start');
    });

    await step('removes fixed attribute when set to undefined', async () => {
      badge.fixed = undefined;
      await badge.updateComplete;
      expect(badge.hasAttribute('fixed'), 'fixed attribute presence').toBe(false);
    });
  },
};
```

### Use the `step` function

Always destructure `step` from the play function arguments and wrap assertions in labeled steps. Steps provide clear output in the Storybook UI and CI logs, so you know exactly which assertion failed.

```typescript
play: async ({ canvasElement, step }) => {
  const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

  await step('variant reflects to attribute after mutation', async () => {
    badge.variant = 'positive';
    await badge.updateComplete;
    expect(badge.getAttribute('variant'), 'variant attribute').toBe('positive');
  });
},
```

Write step labels that describe the expected behavior, not the code:

| Good | Bad |
| --- | --- |
| `'renders expected default values'` | `'test defaults'` |
| `'variant reflects to attribute after mutation'` | `'check variant'` |
| `'warns when outline is used with a non-semantic variant'` | `'test warning'` |

### Wait for updates

After changing a property, always `await element.updateComplete` before asserting. This waits for Lit's rendering cycle to finish:

```typescript
badge.variant = 'positive';
await badge.updateComplete;
expect(badge.getAttribute('variant'), 'variant attribute').toBe('positive');
```

### Test variant collections

When a story renders a list of variants, loop over the expected values and verify each one:

```typescript
await step('renders all semantic variant values', async () => {
  for (const variant of BADGE_VARIANTS_SEMANTIC) {
    const badge = canvasElement.querySelector(
      `swc-badge[variant="${variant}"]`
    ) as Badge | null;
    await badge?.updateComplete;
    expect(badge, `badge with variant="${variant}"`).toBeTruthy();
    expect(badge?.variant, `variant property for "${variant}"`).toBe(variant);
  }
});
```

Import valid values from the component's types file rather than hardcoding them. This keeps tests in sync with the source of truth.

## Testing patterns

### Testing defaults

Verify that a freshly rendered component has the expected default property values:

```typescript
export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('renders expected default values and slot content', async () => {
      expect(badge.variant, 'default variant').toBe('informative');
      expect(badge.size, 'default size').toBe('m');
      expect(badge.textContent?.trim(), 'slot content').toBeTruthy();
    });
  },
};
```

### Testing property reflection

Check that property changes reflect to attributes and vice versa:

```typescript
await step('variant reflects to attribute after mutation', async () => {
  badge.variant = 'positive';
  await badge.updateComplete;
  expect(badge.getAttribute('variant'), 'variant attribute after mutation').toBe('positive');
});

await step('subtle reflects to attribute after mutation', async () => {
  badge.subtle = true;
  await badge.updateComplete;
  expect(badge.hasAttribute('subtle'), 'subtle attribute presence').toBe(true);
});
```

### Testing slots

Query slotted content by looking for elements with `slot` attributes:

```typescript
export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const badges = await getComponents<Badge>(canvasElement, 'swc-badge');

    await step('includes icon slot content', async () => {
      const badgeWithIcon = badges.find((item) =>
        item.querySelector('[slot="icon"]')
      );
      expect(badgeWithIcon, 'badge with icon slot').toBeTruthy();
      const slottedIcon = badgeWithIcon?.querySelector('[slot="icon"]');
      expect(slottedIcon, 'slotted icon element').toBeTruthy();
    });
  },
};
```

### Testing dev mode warnings

Use `withWarningSpy` to capture `__swc.warn` calls. It enables DEBUG mode, runs your callback, and restores the original state automatically:

```typescript
export const InvalidVariantWarningTest: Story = {
  render: () => html`<swc-badge>Label</swc-badge>`,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        badge.variant = 'not-a-variant' as unknown as Badge['variant'];
        await badge.updateComplete;

        expect(warnCalls.length, 'warning count for invalid variant').toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || ''), 'warning message content').toContain('variant');
      })
    );
  },
};
```

Always include a companion test that verifies valid values do not trigger warnings:

```typescript
export const ValidVariantNoWarningTest: Story = {
  render: () => html`<swc-badge variant="positive">Approved</swc-badge>`,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('does not warn when a valid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        badge.variant = 'negative';
        await badge.updateComplete;
        expect(warnCalls.length, 'warning count for valid variant').toBe(0);
      })
    );
  },
};
```

### Testing composed components

When a component is used inside other markup, verify it still works:

```typescript
export const ComposedComponentTest: Story = {
  render: (args) => html`
    <div style="display: flex; gap: 10px;">
      ${meta.render?.(
        { ...Playground.args, ...args, variant: 'positive', 'default-slot': 'Positive' },
        {} as StoryContext
      )}
      <p>This is a test of the composed component</p>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step('renders within composed content', async () => {
      expect(statusLight.variant, 'variant in composed context').toBe('positive');
      expect(statusLight.textContent?.trim(), 'text content in composed context').toBeTruthy();
    });
  },
};
```
