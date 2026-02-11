<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / 2ndgen_testing

<!-- Document title (editable) -->

# 2ndgen_testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [2nd gen Storybook testing](#2nd-gen-storybook-testing)
- [Where to put tests](#where-to-put-tests)
- [Test story structure](#test-story-structure)
- [Attribute and property checks](#attribute-and-property-checks)
- [Testing variant collections](#testing-variant-collections)
- [A11y checks with aXe](#a11y-checks-with-axe)
- [Coverage for Storybook tests](#coverage-for-storybook-tests)
- [Testing command reference](#testing-command-reference)
- [Testing warnings and debug messages](#testing-warnings-and-debug-messages)
- [Guidelines](#guidelines)

</details>

<!-- Document content (editable) -->

## 2nd gen Storybook testing

This document describes how 2nd gen components use Storybook play functions as the primary test layer. Tests live in dedicated test story files so docs stories remain clean and test stories only appear in development Storybook.

## Where to put tests

- Keep docs stories in `2nd-gen/packages/swc/components/<component>/stories/<component>.stories.ts`.
- Add test stories in `2nd-gen/packages/swc/components/<component>/test/<component>.test.ts`.
- Reuse the base stories and metadata from the main stories file.
- Test stories run in development Storybook only and are excluded from `storybook:build`.


## Test story structure

Write tests directly inside each test story’s `play` function. These stories reuse the base render/args from the main stories file.

```ts
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { Badge } from '@adobe/swc/badge';
import { meta, Default } from '../stories/badge.stories.js';

export default {
    ...meta,
    title: 'Badge/Tests',
    parameters: { ...meta.parameters, docs: { disable: true, page: null } },
    tags: ['!autodocs', 'dev'],
} as Meta;

export const DefaultTest: Story = {
    ...Default,
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;
        expect(badge.variant).toBe('informative');
    },
};
```

## Attribute and property checks

Prefer focused assertions inside each play function. Use `await <element>.updateComplete` when you expect a render update.

## Testing variant collections

When a story renders a list (semantic variants, color variants, sizes), loop over the rendered elements inside `play`.

## A11y checks with aXe

Some components include dedicated Playwright accessibility test files (e.g., `badge.a11y.spec.ts`, `status-light.a11y.spec.ts`) that use `@axe-core/playwright` for comprehensive WCAG validation and ARIA snapshot testing.

Run the Storybook test suite with:

```sh
yarn workspace @adobe/swc test
```

## Coverage for Storybook tests

Coverage is collected through the Storybook Vitest project. Use:

```sh
yarn workspace @adobe/swc test:coverage
```

## Testing command reference

| Purpose | Command | Notes |
| --- | --- | --- |
| Run Storybook tests (headless) | `yarn workspace @adobe/swc test` | Runs Storybook tests with aXe checks. |
| Run tests in UI mode | `yarn workspace @adobe/swc test:ui` | Uses Vitest UI for interactive debugging. |
| Run tests in a visible browser | `yarn workspace @adobe/swc test:browser` | Launches browser for live debugging. |
| Run tests with coverage | `yarn workspace @adobe/swc test:coverage` | Generates coverage for Storybook tests. |

## Testing warnings and debug messages

Use `setupSwcWarningSpy()` from `2nd-gen/packages/swc/utils/test-utils.ts` to access and override the `__swc` warning channel in a safe, typed way.

```ts
import { expect } from '@storybook/test';
import type { StatusLight } from '@adobe/swc/status-light';
import { setupSwcWarningSpy } from '../../utils/test-utils.js';

const testUnsupportedVariantWarning = async (
    statusLight: StatusLight
): Promise<void> => {
    const { warnCalls, restore } = setupSwcWarningSpy();

    statusLight.setAttribute('variant', 'accent');
    await statusLight.updateComplete;

    await expect(warnCalls.length).toBeGreaterThan(0);
    restore();
};
```

## Guidelines

- Keep each test story focused on one behavior.
- Use `await <element>.updateComplete` when you expect a render update.
- Use `canvasElement` inside story `play` to scope selectors.
- Keep test stories in the component’s `test` folder and reuse base stories.

