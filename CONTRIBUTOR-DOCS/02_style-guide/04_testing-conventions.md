# Testing conventions

This guide explains how to write tests for 2nd-gen components. Good tests catch bugs before users see them, make sure components are accessible, document how components should work, and give you confidence when changing code.

We use three types of tests:

| Type | Tool | File pattern | What it covers |
| --- | --- | --- | --- |
| Interaction tests | Storybook play functions | `*.test.ts` | Properties, slots, events, warnings |
| Accessibility tests | Playwright + aXe | `*.a11y.spec.ts` | ARIA tree, WCAG compliance |
| Visual regression tests | Storybook + Chromatic | Story files | Rendering across browsers and themes |

## The golden rule

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

## Anatomy of a test

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

## Storybook play function tests

Play function tests are the primary test layer for 2nd-gen components. They run inside the browser as part of Storybook, powered by Vitest.

### When to use

Use play function tests for:

- Default property values
- Property and attribute reflection
- Slot rendering
- Variant and state verification
- Dev mode warnings
- Any behavior that can be verified through the DOM

### File location and naming

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

### File structure

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
import { meta } from '../stories/badge.stories.js';
import { Overview, Sizes } from '../stories/badge.stories.js';

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

### Standard sections

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

### Section placement guide

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

### Writing test stories

#### Reuse docs stories

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

When a base story does not render what you need, provide a custom `render`:

```typescript
export const FixedClearingTest: Story = {
  render: () => html`
    <swc-badge fixed="block-start" variant="informative">Pinned</swc-badge>
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

#### Use the `step` function

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

#### Wait for updates

After changing a property, always `await element.updateComplete` before asserting. This waits for Lit's rendering cycle to finish:

```typescript
badge.variant = 'positive';
await badge.updateComplete;
expect(badge.getAttribute('variant'), 'variant attribute').toBe('positive');
```

#### Test variant collections

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

### Testing patterns

#### Testing defaults

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

#### Testing property reflection

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

#### Testing slots

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

#### Testing dev mode warnings

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

#### Testing composed components

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

## Playwright accessibility tests

Playwright tests check that components meet accessibility standards. They run in a real browser against Storybook stories. Beyond automated rule checks, these tests verify that ARIA roles, labels, properties, and states are correct — and that keyboard interactions change those states as expected.

### When to use

Use Playwright a11y tests for:

- ARIA roles, labels, properties, and states
- Keyboard navigation and how it changes ARIA states
- ARIA tree structure validation (via ARIA snapshots)
- WCAG 2.0/2.1 Level A and AA compliance (via aXe-core)
- Color contrast checks
- Focus management (focus order, focus trapping, focus return)
- Cross-browser accessibility behavior

### File naming

Accessibility test files use the pattern `<component>.a11y.spec.ts` and live in the component's `test/` folder.

### File structure

```typescript
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

test.describe('Badge - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default badge', async ({
    page,
  }) => {
    const badge = await gotoStory(
      page,
      'components-badge--default',
      'swc-badge'
    );
    const snapshot = await badge.ariaSnapshot();

    expect(snapshot, 'ARIA snapshot for default badge').toBeTruthy();
    await expect(badge).toMatchAriaSnapshot();
  });
});

test.describe('Badge - aXe Validation', () => {
  test('should not have accessibility violations - default', async ({
    page,
  }) => {
    await gotoStory(page, 'components-badge--default', 'swc-badge');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations, 'WCAG violations for default badge').toEqual([]);
  });
});
```

### Organizing a11y tests

Group tests into `describe` blocks by concern:

1. **ARIA attributes** — Verify roles, labels, properties, and states on individual elements.
2. **Keyboard interactions** — Verify that keyboard actions change focus and ARIA states correctly.
3. **ARIA snapshots** — Verify the full accessibility tree structure against a baseline.
4. **aXe validation** — Run automated WCAG compliance checks.

Not every component needs all four groups. A simple non-interactive component like Badge only needs ARIA snapshots and aXe validation. An interactive component like Tabs or Menu needs all four.

### Test naming

Use descriptive names that say what is being checked:

| Good | Bad |
| --- | --- |
| `'should have role="tablist" on the container'` | `'a11y test'` |
| `'should set aria-selected="true" on the active tab'` | `'test tab selection'` |
| `'should move focus to next tab on ArrowRight'` | `'keyboard test'` |
| `'should not have accessibility violations - semantic variants'` | `'test variants'` |
| `'should verify color contrast'` | `'contrast'` |

### Testing ARIA roles, labels, properties, and states

Every interactive component must have correct ARIA attributes. Test these directly by querying the rendered element and checking attribute values.

**Roles** — Verify the component exposes the correct role:

```typescript
test.describe('Tabs - ARIA Attributes', () => {
  test('should have correct roles on container and items', async ({ page }) => {
    const tabs = await gotoStory(page, 'components-tabs--default', 'swc-tabs');

    const role = await tabs.getAttribute('role');
    expect(role, 'tabs container role').toBe('tablist');

    const firstTab = tabs.locator('swc-tab').first();
    const tabRole = await firstTab.getAttribute('role');
    expect(tabRole, 'individual tab role').toBe('tab');
  });
});
```

**Labels** — Verify `aria-label`, `aria-labelledby`, or visible label text:

```typescript
test('should expose aria-label from label attribute', async ({ page }) => {
  const progressCircle = await gotoStory(
    page,
    'components-progress-circle--default',
    'swc-progress-circle'
  );

  const ariaLabel = await progressCircle.getAttribute('aria-label');
  expect(ariaLabel, 'aria-label value').toBeTruthy();
});
```

**Properties and states** — Verify attributes like `aria-selected`, `aria-disabled`, `aria-expanded`, and `aria-valuenow`. After checking individual attributes, take an ARIA snapshot to capture the full tree so future regressions are caught:

```typescript
test('should set aria-selected on the active tab', async ({ page }) => {
  const tabs = await gotoStory(page, 'components-tabs--default', 'swc-tabs');

  const selectedTab = tabs.locator('swc-tab[selected]');
  const ariaSelected = await selectedTab.getAttribute('aria-selected');
  expect(ariaSelected, 'aria-selected on active tab').toBe('true');

  const unselectedTab = tabs.locator('swc-tab:not([selected])').first();
  const unselectedAriaSelected = await unselectedTab.getAttribute('aria-selected');
  expect(unselectedAriaSelected, 'aria-selected on inactive tab').toBe('false');

  await expect(tabs).toMatchAriaSnapshot();
});

test('should set aria-disabled when disabled', async ({ page }) => {
  const button = await gotoStory(
    page,
    'components-button--disabled',
    'swc-button'
  );

  const ariaDisabled = await button.getAttribute('aria-disabled');
  expect(ariaDisabled, 'aria-disabled on disabled button').toBe('true');

  await expect(button).toMatchAriaSnapshot();
});
```

### Testing keyboard interactions

Keyboard tests verify two things: that focus moves correctly, and that ARIA states update in response to keyboard actions. These tests should follow real user flows — press a key, then check what changed.

**Always take an ARIA snapshot after a state change.** Whenever a keyboard action changes the component's state (selection, expansion, checked, etc.), call `toMatchAriaSnapshot()` to capture the full accessibility tree in that new state. This catches regressions that individual attribute checks might miss — like a role disappearing, a label changing, or a child element dropping out of the tree.

**Focus movement** — Verify that keyboard navigation moves focus to the right element:

```typescript
test.describe('Tabs - Keyboard Interactions', () => {
  test('should move focus to next tab on ArrowRight', async ({ page }) => {
    const tabs = await gotoStory(page, 'components-tabs--default', 'swc-tabs');

    const firstTab = tabs.locator('swc-tab').first();
    const secondTab = tabs.locator('swc-tab').nth(1);

    await firstTab.focus();
    expect(
      await firstTab.evaluate((el) => document.activeElement === el),
      'focus on first tab before keypress'
    ).toBe(true);

    await page.keyboard.press('ArrowRight');

    expect(
      await secondTab.evaluate((el) => document.activeElement === el),
      'focus on second tab after ArrowRight'
    ).toBe(true);
  });
});
```

**State changes from keyboard** — Verify that ARIA states update after keyboard actions, and take an ARIA snapshot to capture the full tree in the new state:

```typescript
test('should update aria-selected after Enter on a tab', async ({ page }) => {
  const tabs = await gotoStory(page, 'components-tabs--default', 'swc-tabs');

  const secondTab = tabs.locator('swc-tab').nth(1);
  await secondTab.focus();
  await page.keyboard.press('Enter');

  const ariaSelected = await secondTab.getAttribute('aria-selected');
  expect(ariaSelected, 'aria-selected after Enter').toBe('true');

  await expect(tabs).toMatchAriaSnapshot();
});

test('should toggle aria-expanded on Space', async ({ page }) => {
  const disclosure = await gotoStory(
    page,
    'components-disclosure--default',
    'swc-disclosure'
  );

  const trigger = disclosure.locator('[role="button"]');
  const expandedBefore = await trigger.getAttribute('aria-expanded');
  expect(expandedBefore, 'aria-expanded before Space').toBe('false');

  await expect(disclosure).toMatchAriaSnapshot();

  await trigger.focus();
  await page.keyboard.press('Space');

  const expandedAfter = await trigger.getAttribute('aria-expanded');
  expect(expandedAfter, 'aria-expanded after Space').toBe('true');

  await expect(disclosure).toMatchAriaSnapshot();
});
```

**Focus trapping** — For components like dialogs and menus, verify that <kbd>Tab</kbd> cycles within the component and <kbd>Escape</kbd> returns focus:

```typescript
test('should trap focus inside dialog', async ({ page }) => {
  const dialog = await gotoStory(
    page,
    'components-dialog--default',
    'swc-dialog'
  );

  const firstFocusable = dialog.locator('button').first();
  const lastFocusable = dialog.locator('button').last();

  await lastFocusable.focus();
  await page.keyboard.press('Tab');

  expect(
    await firstFocusable.evaluate((el) => document.activeElement === el),
    'focus wraps to first element after Tab from last'
  ).toBe(true);
});

test('should return focus to trigger on Escape', async ({ page }) => {
  const trigger = page.locator('swc-button.trigger');
  await trigger.click();

  await page.keyboard.press('Escape');

  expect(
    await trigger.evaluate((el) => document.activeElement === el),
    'focus returns to trigger after Escape'
  ).toBe(true);
});
```

### What to test per component type

Different components need different levels of accessibility testing. Use this table as a guide:

| Component type | ARIA attributes | Keyboard interactions | ARIA snapshots | aXe validation |
| --- | --- | --- | --- | --- |
| Non-interactive (badge, status light) | Role only (if any) | Not needed | Yes | Yes |
| Simple interactive (button, link) | Role, label, disabled | Click via Enter/Space | Yes | Yes |
| Selection (tabs, radio group, menu) | Role, selected, expanded | Arrow keys, Enter, Space, focus movement | Yes | Yes |
| Form controls (textfield, checkbox, slider) | Role, label, value, checked, invalid | Arrow keys, Enter, Space, value changes | Yes | Yes |
| Overlay (dialog, popover, tooltip) | Role, label, expanded, modal | Escape, Tab trapping, focus return | Yes | Yes |

### ARIA snapshot tests

ARIA snapshots capture the accessibility tree and compare it to a saved baseline:

```typescript
test('should have correct accessibility tree structure', async ({ page }) => {
  const statusLight = await gotoStory(
    page,
    'components-status-light--default',
    'swc-status-light'
  );

  const snapshot = await statusLight.ariaSnapshot();
  expect(snapshot, 'ARIA snapshot for default status light').toBeTruthy();
  await expect(statusLight).toMatchAriaSnapshot();
});
```

When you intentionally change a component's accessibility tree, update the snapshots:

```bash
yarn test:a11y <component> --update-snapshots
```

### aXe validation tests

aXe-core checks ~50+ WCAG rules automatically. Always test with the standard WCAG tag set:

```typescript
test('should not have accessibility violations - default', async ({ page }) => {
  await gotoStory(page, 'components-badge--default', 'swc-badge');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations, 'WCAG violations for default badge').toEqual([]);
});
```

For targeted checks (like color contrast), use `.withRules()`:

```typescript
test('should verify color contrast', async ({ page }) => {
  await gotoStory(page, 'components-status-light--default', 'swc-status-light');

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast'])
    .analyze();

  expect(results.violations, 'color contrast violations').toEqual([]);
});
```

### What to cover

**Always test:**

- ARIA roles on the component and its interactive children
- ARIA labels (`aria-label`, `aria-labelledby`, or visible text)
- ARIA states that change with interaction (`aria-selected`, `aria-expanded`, `aria-checked`, `aria-disabled`)
- Keyboard navigation (arrow keys for selection components, Tab for focus order)
- Focus movement after keyboard actions
- ARIA snapshot for the default state
- ARIA snapshot after every state change (selection, expansion, disabled toggle, value change)
- aXe validation for the default state and all semantic variants

**Test when applicable:**

- Focus trapping (overlays, dialogs, menus)
- Focus return after dismissal (Escape, click outside)
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (sliders, progress)
- `aria-live` announcements (status messages, loading states)
- Size variants and interactive states (disabled, selected, focused)

**You do not need to test:**

- Every color combination
- Every possible prop combination
- Styling details (use VRT for that)

### Story IDs

Find the story ID from the Storybook URL. For 2nd-gen components:

```
http://localhost:6006/?path=/story/components-badge--default
                                   ^^^^^^^^^^^^^^^^^^^^^^^^
                                   This is the story ID
```

## Visual regression tests

Visual regression testing (VRT) catches rendering changes across browsers and themes. Stories themselves serve as the test cases — Chromatic captures screenshots and compares them to baselines.

### When to use

VRT covers things that are hard to test programmatically:

- Color and styling
- Layout and spacing
- Cross-browser rendering
- Theme support (light, dark, high contrast)
- Animation states

### How it works

Every story is a VRT test case. When you create a story in your `*.stories.ts` file, it automatically becomes part of VRT. No extra code is needed.

Stories tagged with `'!test'` are excluded from VRT runs (useful for interactive-only demos like `StaticColors`).

### Tips for reliable VRT

- Use deterministic content (no random data, no timestamps)
- Use static image IDs from picsum.photos (see stories format guide)
- Disable animations in test mode (Playwright config sets `reducedMotion: 'reduce'`)
- Keep stories focused — one visual state per story is easier to debug

## Test utilities reference

Test utilities live in `2nd-gen/packages/swc/utils/`.

### `getComponent<T>(canvasElement, selector)`

Query a single component and await its `updateComplete`:

```typescript
import { getComponent } from '../../../utils/test-utils.js';

const badge = await getComponent<Badge>(canvasElement, 'swc-badge');
```

This replaces the manual pattern:

```typescript
const badge = canvasElement.querySelector('swc-badge') as Badge;
await badge.updateComplete;
```

### `getComponents<T>(canvasElement, selector)`

Query multiple components and await all their updates:

```typescript
import { getComponents } from '../../../utils/test-utils.js';

const badges = await getComponents<Badge>(canvasElement, 'swc-badge');
```

You can pass more specific selectors:

```typescript
const staticCircles = await getComponents<ProgressCircle>(
  canvasElement,
  'swc-progress-circle[static-color]'
);
```

### `fixture<T>(template)`

Render a Lit template and return the first element. Useful for standalone tests outside of Storybook stories:

```typescript
import { fixture } from '../../../utils/test-utils.js';

const badge = await fixture<Badge>(html`<swc-badge>Label</swc-badge>`);
```

### `withWarningSpy(callback)`

Enable DEBUG mode, capture warning calls, and automatically restore state:

```typescript
import { withWarningSpy } from '../../../utils/test-utils.js';

await withWarningSpy(async (warnCalls) => {
  badge.variant = 'invalid' as Badge['variant'];
  await badge.updateComplete;
  expect(warnCalls.length, 'warning count for invalid variant').toBeGreaterThan(0);
});
```

### `setupSwcWarningSpy()`

Lower-level warning spy when you need direct access to `swcGlobals`. Remember to call `restore()` in a `finally` block:

```typescript
import { setupSwcWarningSpy } from '../../../utils/test-utils.js';

const { warnCalls, restore } = setupSwcWarningSpy();
try {
  badge.variant = 'invalid' as Badge['variant'];
  await badge.updateComplete;
  expect(warnCalls.length, 'warning count for invalid variant').toBeGreaterThan(0);
} finally {
  restore();
}
```

Prefer `withWarningSpy` in most cases — it handles the try/finally for you.

### `gotoStory(page, storyId, elementSelector)`

Navigate to a Storybook story and wait for the component to be ready (Playwright only):

```typescript
import { gotoStory } from '../../../utils/a11y-helpers.js';

const badge = await gotoStory(page, 'components-badge--default', 'swc-badge');
```

How it works:

1. Navigates to the story URL
2. Waits for custom element definition (`customElements.whenDefined`)
3. Waits for Storybook to render content
4. Waits for element visibility
5. Waits for web component upgrade

This eliminates flaky tests caused by testing components before they are ready.

### `waitForCustomElement(page, tagName)`

Wait for a custom element to be defined in the registry (Playwright only):

```typescript
import { waitForCustomElement } from '../../../utils/a11y-helpers.js';

await waitForCustomElement(page, 'swc-badge');
```

### `waitForStoryReady(page, elementSelector)`

Wait for a Storybook story to render and the component to be visible (Playwright only):

```typescript
import { waitForStoryReady } from '../../../utils/a11y-helpers.js';

const element = await waitForStoryReady(page, 'swc-badge');
```

## Code coverage

Coverage is collected by the Storybook Vitest project using the V8 provider.

### Coverage thresholds

We enforce per-path thresholds in `vitest.config.js`:

| Path pattern | Target | What it covers |
| --- | --- | --- |
| `components/**/*.{ts,js}` | **100%** lines, functions, statements | SWC component implementations |
| `**/packages/core/components/**/*.{ts,js}` | **100%** lines, functions, statements | Core component base classes |
| `**/packages/core/shared/**/*.{ts,js}` | **70%** lines, functions, statements | Shared utilities |

Component code and base classes require 100% coverage. Shared utilities have a lower threshold that ratchets upward as coverage improves.

### Auto-updating thresholds

The coverage config uses `autoUpdate` with `Math.floor` to automatically lock in improvements:

```javascript
thresholds: {
  autoUpdate: (value) => Math.floor(value),
}
```

When your tests push coverage above the current threshold, the config file updates itself. This prevents regressions without manual threshold bumps.

### Checking coverage

```bash
yarn workspace @adobe/swc test:coverage
```

Review the generated report. If coverage drops below the threshold, add tests to cover the gap before merging.

## Avoiding flaky tests

Flaky tests fail sometimes and pass other times. They waste time and erode trust in the test suite. Here are common causes and fixes, drawn from real fixes in this repository.

### Wait for components to be ready

Never assert on a component before it finishes rendering. Use `getComponent` or `getComponents` (which call `updateComplete` internally) instead of raw `querySelector`:

```typescript
// Good: waits for the component to finish rendering
const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

// Bad: component might not be ready yet
const badge = canvasElement.querySelector('swc-badge') as Badge;
```

### Avoid fixed timeouts

Do not use `setTimeout` or `sleep` to wait for things to happen. Use deterministic waits:

```typescript
// Good: wait for a specific condition
await badge.updateComplete;

// Bad: arbitrary delay
await new Promise((r) => setTimeout(r, 500));
```

### Handle race conditions

When waiting for async state changes, check the current state first, then wait for events. This pattern from the overlay flaky test fix prevents race conditions:

```typescript
// Good: check first, then wait
if (overlay.state === 'opened') {
  return Promise.resolve();
}

return await Promise.race([
  waitUntil(() => overlay.state === 'opened'),
  oneEvent(overlay, 'sp-opened'),
]);

// Bad: wait and check together (race condition)
return await waitUntil(
  () => overlay.state === 'opened' || oneEvent(overlay, 'sp-opened')
);
```

### Use deterministic content

Avoid random data, timestamps, or any content that changes between runs. This especially matters for VRT:

```typescript
// Good: static, predictable content
render: () => html`<swc-badge variant="informative">Active</swc-badge>`

// Bad: random content
render: () => html`<swc-badge>${Math.random()}</swc-badge>`
```

### Isolate test state

Each test should be independent. Use `withWarningSpy` (which handles setup and teardown) rather than sharing state across tests. If you use `setupSwcWarningSpy` directly, always restore in a `finally` block.

## Running tests

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

## PR review checklist

Use this checklist when reviewing test code in pull requests:

- [ ] Test file follows the five-section structure
- [ ] Each test story uses `step` with a descriptive label
- [ ] Every `expect()` call includes a descriptive message as the second argument
- [ ] Tests use `getComponent` / `getComponents` instead of raw `querySelector`
- [ ] Property mutations are followed by `await element.updateComplete`
- [ ] Warning tests use `withWarningSpy` and include both positive and negative cases
- [ ] Valid variant/size values are imported from the types file, not hardcoded
- [ ] ARIA roles, labels, and states are tested for interactive components
- [ ] Keyboard interactions are tested and verify ARIA state changes
- [ ] ARIA snapshot taken after every state change (selection, expansion, etc.)
- [ ] ARIA snapshot tests and aXe tests exist for the component
- [ ] No hardcoded timeouts or `setTimeout` usage
- [ ] No shared mutable state between test stories
- [ ] Coverage meets or exceeds thresholds

## Resources

- [Vitest documentation](https://vitest.dev/)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Playwright ARIA snapshots](https://playwright.dev/docs/aria-snapshots)
- [aXe-core rules reference](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Storybook play functions](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [JavaScript testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [What to test — web.dev](https://web.dev/articles/ta-what-to-test)
- [UI testing best practices](https://dev.to/bryce/ui-testing-best-practices-4ke4)
- [Red Hat Design System testing conventions](https://github.com/RedHat-UX/red-hat-design-system/wiki/Testing)
- [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility testing guide](../01_contributor-guides/09_accessibility-testing.md) (project-specific)
- [2nd gen testing guide](../01_contributor-guides/11_2ndgen_testing.md) (project-specific)
