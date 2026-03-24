<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Testing utilities

<!-- Document title (editable) -->

# Testing utilities

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [`getComponent<T>(canvasElement, selector)`](#getcomponenttcanvaselement-selector)
- [`getComponents<T>(canvasElement, selector)`](#getcomponentstcanvaselement-selector)
- [`fixture<T>(template)`](#fixturettemplate)
- [`withWarningSpy(callback)`](#withwarningspycallback)
- [`setupSwcWarningSpy()`](#setupswcwarningspy)
- [`gotoStory(page, storyId, elementSelector)`](#gotostorypage-storyid-elementselector)
- [`waitForCustomElement(page, tagName)`](#waitforcustomelementpage-tagname)
- [`waitForStoryReady(page, elementSelector)`](#waitforstoryreadypage-elementselector)

</details>

<!-- Document content (editable) -->

Test utilities live in `2nd-gen/packages/swc/utils/`.

## `getComponent<T>(canvasElement, selector)`

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

## `getComponents<T>(canvasElement, selector)`

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

## `fixture<T>(template)`

Render a Lit template and return the first element. Useful for standalone tests outside of Storybook stories:

```typescript
import { fixture } from '../../../utils/test-utils.js';

const badge = await fixture<Badge>(html`<swc-badge>Label</swc-badge>`);
```

## `withWarningSpy(callback)`

Enable DEBUG mode, capture warning calls, and automatically restore state:

```typescript
import { withWarningSpy } from '../../../utils/test-utils.js';

await withWarningSpy(async (warnCalls) => {
  badge.variant = 'invalid' as Badge['variant'];
  await badge.updateComplete;
  expect(warnCalls.length, 'warning count for invalid variant').toBeGreaterThan(0);
});
```

## `setupSwcWarningSpy()`

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

## `gotoStory(page, storyId, elementSelector)`

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

## `waitForCustomElement(page, tagName)`

Wait for a custom element to be defined in the registry (Playwright only):

```typescript
import { waitForCustomElement } from '../../../utils/a11y-helpers.js';

await waitForCustomElement(page, 'swc-badge');
```

## `waitForStoryReady(page, elementSelector)`

Wait for a Storybook story to render and the component to be visible (Playwright only):

```typescript
import { waitForStoryReady } from '../../../utils/a11y-helpers.js';

const element = await waitForStoryReady(page, 'swc-badge');
```
