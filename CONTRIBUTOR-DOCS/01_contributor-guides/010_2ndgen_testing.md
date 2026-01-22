## 2nd gen Storybook testing

This document describes how the 2nd gen components use Storybook play functions as the primary test layer. Tests live in each component folder and are imported into stories so the same rendered markup is used for both docs and tests.

## Where to put tests

- Create helper tests in `2nd-gen/packages/swc/components/<component>/test/<component>.test.ts`.
- Import those helpers into `2nd-gen/packages/swc/components/<component>/stories/<component>.stories.ts`.
- Call the helpers from each story’s `play` function.

## Base test helper structure

Use `@storybook/test` for assertions and keep each helper focused on a single behavior.

```ts
import { expect } from '@storybook/test';
import type { Badge } from '@adobe/swc/badge';
import '@adobe/swc/badge';

const testBadgeDefaults = async (badge: Badge): Promise<void> => {
    await expect(badge.variant).toBe('informative');
    await expect(badge.subtle).toBe(false);
};

export { testBadgeDefaults };
```

## Story play usage

Import the helpers and call them from a `play` function with the rendered element.

```ts
import type { StoryObj as Story } from '@storybook/web-components';
import { Badge } from '@adobe/swc/badge';
import {
    testBadgeDefaults,
} from '../test/badge.test.js';

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const badge = canvasElement.querySelector('swc-badge') as Badge;
        await testBadgeDefaults(badge);
    },
};
```

## Attribute and property checks

Prefer small helpers that assert a single behavior, similar to the badge tests.

```ts
import { expect } from '@storybook/test';
import type { StatusLight } from '@adobe/swc/status-light';
import '@adobe/swc/status-light';

const testVariantPropertySetViaAttribute = async (
    statusLight: StatusLight
): Promise<void> => {
    statusLight.setAttribute('variant', 'negative');
    await statusLight.updateComplete;
    await expect(statusLight.variant).toBe('negative');
    await expect(statusLight.getAttribute('variant')).toBe('negative');
};

export { testVariantPropertySetViaAttribute };
```

## Testing variant collections

When a story renders a list (semantic variants, color variants, sizes), use a helper that loops through the rendered elements.

```ts
import { expect } from '@storybook/test';
import { StatusLight } from '@adobe/swc/status-light';
import '@adobe/swc/status-light';

const testSemanticVariants = async (root: ParentNode): Promise<void> => {
    for (const variant of StatusLight.VARIANTS_SEMANTIC) {
        const statusLight = root.querySelector(
            `swc-status-light[variant="${variant}"]`
        ) as StatusLight | null;
        await expect(statusLight).toBeTruthy();
    }
};

export { testSemanticVariants };
```

## A11y checks with aXe

Storybook tests run aXe after each story render via `2nd-gen/packages/swc/.storybook/test-runner.ts`. The test runner uses `@axe-core/playwright` and fails the story when violations are detected.

Run the Storybook test suite (including aXe) with:

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

Use `getSwcTestGlobals()` from `2nd-gen/packages/swc/utils/test-utils.ts` to access and override the `__swc` warning channel in a safe, typed way.

```ts
import { expect } from '@storybook/test';
import type { StatusLight } from '@adobe/swc/status-light';
import { getSwcTestGlobals } from '../../utils/test-utils.js';

const testUnsupportedVariantWarning = async (
    statusLight: StatusLight
): Promise<void> => {
    const swcGlobals = getSwcTestGlobals();
    const originalWarn = swcGlobals.warn;
    const warnings: unknown[][] = [];

    swcGlobals.warn = (...args: unknown[]) => warnings.push(args);
    swcGlobals.DEBUG = true;
    swcGlobals.issuedWarnings = new Set();

    statusLight.setAttribute('variant', 'accent');
    await statusLight.updateComplete;

    await expect(warnings.length).toBeGreaterThan(0);
    swcGlobals.warn = originalWarn;
};
```

## Guidelines

- Keep each helper focused on one behavior.
- Use `await <element>.updateComplete` when you expect a render update.
- Use `canvasElement` inside story `play` to scope selectors.
- Keep helpers in the component’s `test` folder and import them from stories.

