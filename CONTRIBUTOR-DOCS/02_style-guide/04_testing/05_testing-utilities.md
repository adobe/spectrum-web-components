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

</details>

<!-- Document content (editable) -->

Shared test utilities live in [`gen2/test/helpers/`](../../../gen2/test/helpers/), with one file per helper and barrel exports for each entry point. Import DOM helpers from `@swc-test-helpers/dom` and Playwright helpers from `@swc-test-helpers/playwright`.

Keep reusable helpers here and component- or controller-specific setup beside its tests. Test helpers are not a public component API.

Run `yarn test:helper` to verify helper imports and editor discovery. These checks also run before `yarn test:gen2`.

## `getComponent<T>(canvasElement, selector)`

Query a single component and await its `updateComplete`:

```typescript
import { getComponent } from '@swc-test-helpers/dom';

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
import { getComponents } from '@swc-test-helpers/dom';

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
import { fixture } from '@swc-test-helpers/dom';

const badge = await fixture<Badge>(html`<swc-badge>Label</swc-badge>`);
```

## `withWarningSpy(callback)`

Enable DEBUG mode, capture warning calls, and automatically restore state:

```typescript
import { withWarningSpy } from '@swc-test-helpers/dom';

await withWarningSpy(async (warnCalls) => {
  badge.variant = 'invalid' as Badge['variant'];
  await badge.updateComplete;
  expect(warnCalls.length, 'warning count for invalid variant').toBeGreaterThan(0);
});
```

## `setupSwcWarningSpy()`

Lower-level warning spy when you need direct access to `swcGlobals`. Remember to call `restore()` in a `finally` block:

```typescript
import { setupSwcWarningSpy } from '@swc-test-helpers/dom';

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
import { gotoStory } from '@swc-test-helpers/playwright';

const badge = await gotoStory(page, 'components-badge--default', 'swc-badge');
```

How it works:

1. Navigates to the story URL
2. Waits for Storybook to render content
3. Waits for element visibility
4. If the element is a custom element, waits for it to be defined in the registry

This eliminates flaky tests caused by testing components before they are ready.

## `waitForCustomElement(page, tagName)`

Wait for a custom element to be defined in the registry (Playwright only):

```typescript
import { waitForCustomElement } from '@swc-test-helpers/playwright';

await waitForCustomElement(page, 'swc-badge');
```
