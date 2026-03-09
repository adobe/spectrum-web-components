<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Playwright accessibility testing

<!-- Document title (editable) -->

# Playwright accessibility testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When to use](#when-to-use)
- [File naming](#file-naming)
- [File structure](#file-structure)
- [Organizing a11y tests](#organizing-a11y-tests)
- [Test naming](#test-naming)
- [Testing ARIA roles, labels, properties, and states](#testing-aria-roles-labels-properties-and-states)
- [Testing keyboard interactions](#testing-keyboard-interactions)
- [What to test per component type](#what-to-test-per-component-type)
- [ARIA snapshot tests](#aria-snapshot-tests)
- [aXe validation tests](#axe-validation-tests)
- [What to cover](#what-to-cover)
- [Story IDs](#story-ids)

</details>

<!-- Document content (editable) -->

Playwright tests check that components meet accessibility standards. They run in a real browser against Storybook stories. Beyond automated rule checks, these tests verify that ARIA roles, labels, properties, and states are correct — and that keyboard interactions change those states as expected.

## When to use

Use Playwright a11y tests for:

- ARIA roles, labels, properties, and states
- Keyboard navigation and how it changes ARIA states
- ARIA tree structure validation (via ARIA snapshots)
- WCAG 2.0/2.1 Level A and AA compliance (via aXe-core)
- Color contrast checks
- Focus management (focus order, focus trapping, focus return)
- Cross-browser accessibility behavior

## File naming

Accessibility test files use the pattern `<component>.a11y.spec.ts` and live in the component's `test/` folder.

## File structure

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

## Organizing a11y tests

Group tests into `describe` blocks by concern:

1. **ARIA attributes** — Verify roles, labels, properties, and states on individual elements.
2. **Keyboard interactions** — Verify that keyboard actions change focus and ARIA states correctly.
3. **ARIA snapshots** — Verify the full accessibility tree structure against a baseline.
4. **aXe validation** — Run automated WCAG compliance checks.

Not every component needs all four groups. A simple non-interactive component like Badge only needs ARIA snapshots and aXe validation. An interactive component like Tabs or Menu needs all four.

## Test naming

Use descriptive names that say what is being checked:

| Good | Bad |
| --- | --- |
| `'should have role="tablist" on the container'` | `'a11y test'` |
| `'should set aria-selected="true" on the active tab'` | `'test tab selection'` |
| `'should move focus to next tab on ArrowRight'` | `'keyboard test'` |
| `'should not have accessibility violations - semantic variants'` | `'test variants'` |
| `'should verify color contrast'` | `'contrast'` |

## Testing ARIA roles, labels, properties, and states

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

## Testing keyboard interactions

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

## What to test per component type

Different components need different levels of accessibility testing. Use this table as a guide:

| Component type | ARIA attributes | Keyboard interactions | ARIA snapshots | aXe validation |
| --- | --- | --- | --- | --- |
| Non-interactive (badge, status light) | Role only (if any) | Not needed | Yes | Yes |
| Simple interactive (button, link) | Role, label, disabled | Click via Enter/Space | Yes | Yes |
| Selection (tabs, radio group, menu) | Role, selected, expanded | Arrow keys, Enter, Space, focus movement | Yes | Yes |
| Form controls (textfield, checkbox, slider) | Role, label, value, checked, invalid | Arrow keys, Enter, Space, value changes | Yes | Yes |
| Overlay (dialog, popover, tooltip) | Role, label, expanded, modal | Escape, Tab trapping, focus return | Yes | Yes |

## ARIA snapshot tests

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

## aXe validation tests

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

## What to cover

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

## Story IDs

Find the story ID from the Storybook URL. For 2nd-gen components:

```
http://localhost:6006/?path=/story/components-badge--default
                                   ^^^^^^^^^^^^^^^^^^^^^^^^
                                   This is the story ID
```
