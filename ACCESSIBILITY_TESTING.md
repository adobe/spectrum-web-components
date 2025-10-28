# Accessibility testing

Automated accessibility testing for Spectrum Web Components using Playwright.

## Quick start

```zsh
# From project root
yarn test:a11y              # Run all tests (both generations)
yarn test:a11y:1st          # Run only 1st generation tests
yarn test:a11y:2nd          # Run only 2nd generation tests
yarn test:a11y:ui           # Interactive UI mode (great for debugging)
```

Tests automatically start the required Storybook instances and run in Chromium.

## What we test

Two complementary approaches:

### 1. ARIA snapshots

Captures the accessibility tree structure and compares it to a baseline. Detects unintentional changes to:

- ARIA roles
- ARIA attributes
- Text content
- Accessibility tree structure

**Coverage:** ~40% of accessibility issues

### 2. aXe-core validation

Automatically checks ~50+ WCAG 2.0/2.1 Level A/AA rules:

- Color contrast
- Keyboard navigation
- ARIA validity
- Semantic HTML
- Focus management

**Coverage:** ~50% of accessibility issues

**Together:** These catch the most common accessibility issues early in development.

## Adding tests to a component

### 1st generation components

Create `<component>.a11y.spec.ts` in your component's `test/` directory:

```typescript
// first-gen/packages/badge/test/badge.a11y.spec.ts

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory } from '../../../test/a11y-helpers.js';

test.describe('Badge - ARIA Snapshots', () => {
    test('should have correct accessibility tree', async ({ page }) => {
        const badge = await gotoStory(page, 'badge--default', 'sp-badge');
        await expect(badge).toMatchAriaSnapshot();
    });
});

test.describe('Badge - aXe Validation', () => {
    test('should not have accessibility violations', async ({ page }) => {
        await gotoStory(page, 'badge--default', 'sp-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
```

**Key details:**

- Story ID: `'badge--default'` (check Storybook URL at `localhost:8080`)
- Element name: `'sp-badge'` (the custom element tag name)
- Helper import: `'../../../test/a11y-helpers.js'` (shared helpers)

### 2nd generation components

Same pattern, different details:

```typescript
// second-gen/packages/swc/components/badge/test/badge.a11y.spec.ts

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gotoStory } from '../../../../../../first-gen/test/a11y-helpers.js';

test.describe('Badge - ARIA Snapshots', () => {
    test('should have correct accessibility tree', async ({ page }) => {
        const badge = await gotoStory(
            page,
            'components-badge--default', // 2nd gen story ID format
            'swc-badge' // 2nd gen element name
        );
        await expect(badge).toMatchAriaSnapshot();
    });
});

test.describe('Badge - aXe Validation', () => {
    test('should not have accessibility violations', async ({ page }) => {
        await gotoStory(page, 'components-badge--default', 'swc-badge');

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
});
```

**Key differences:**

- Story ID: `'components-badge--default'` (check Storybook URL at `localhost:6006`)
- Element name: `'swc-badge'` (instead of `sp-badge`)
- Storybook port: 6006 (vs 8080 for 1st gen) - automatically handled by Playwright

## Test helper reference

Shared helpers live in `first-gen/test/a11y-helpers.ts` and work for both generations.

### `gotoStory(page, storyId, elementSelector)`

Navigate to a Storybook story and wait deterministically for the component to be ready.

**Parameters:**

- `page`: Playwright Page object
- `storyId`: Storybook story ID (from the URL)
- `elementSelector`: CSS selector for the component (usually the custom element name)

**Returns:** Playwright `Locator` for the component

**Example:**

```typescript
// Wait for component to be fully ready
const badge = await gotoStory(page, 'badge--default', 'sp-badge');

// Now safe to test
await expect(badge).toMatchAriaSnapshot();
```

**How it works:**

1. Navigates to story URL
2. Waits for custom element definition (`customElements.whenDefined`)
3. Waits for Storybook to render content
4. Waits for element visibility
5. Waits for Web Component upgrade

This eliminates flaky tests caused by testing components before they're ready.

### `waitForCustomElement(page, tagName)`

Wait for a custom element to be defined.

```typescript
await waitForCustomElement(page, 'sp-badge');
```

### `waitForStoryReady(page, elementSelector)`

Wait for Storybook story to render and component to be visible.

```typescript
const element = await waitForStoryReady(page, 'sp-badge');
```

## Finding story IDs

Open Storybook and navigate to your component. The story ID is in the URL:

**1st gen** (`localhost:8080`):

```
http://localhost:8080/?path=/story/badge--default
                                     ^^^^^^^^^^^^^
                                     Story ID
```

**2nd gen** (`localhost:6006`):

```
http://localhost:6006/?path=/story/components-badge--default
                                     ^^^^^^^^^^^^^^^^^^^^^^^^
                                     Story ID
```

## Running tests

### From project root

```zsh
yarn test:a11y              # All tests (both generations)
yarn test:a11y:1st          # Only 1st generation
yarn test:a11y:2nd          # Only 2nd generation
yarn test:a11y:ui           # Interactive UI mode
```

### From first-gen directory

```zsh
cd first-gen

yarn test:a11y                           # All tests
yarn test:a11y badge                     # Specific component
yarn test:a11y --project=1st-gen         # Only 1st gen
yarn test:a11y --project=2nd-gen         # Only 2nd gen
yarn test:a11y badge --update-snapshots  # Update ARIA baselines
yarn test:a11y:ui                        # UI mode
```

### Updating snapshots

When you intentionally change a component's accessibility tree:

```zsh
yarn test:a11y <component> --update-snapshots
```

This updates the baseline ARIA snapshots in `<component>.a11y.spec.ts-snapshots/`.

## Test results

### ARIA snapshot files

ARIA snapshots are saved as YAML files in `<test-file>-snapshots/`:

```yaml
# Example: Badge default variant
- text: 'Default'
```

These files are:

- ✅ **Committed to git** - They're the baseline
- ✅ **Updated with** `--update-snapshots`
- ✅ **Compared on every run** - Detect regressions

**When snapshots fail:**

1. Review the diff in the test output
2. If the change is intentional, update snapshots
3. If unexpected, fix the component

### aXe violations

When aXe finds violations, it reports:

- **What's wrong** - Rule that failed
- **Where it is** - Element selector
- **How to fix it** - Link to documentation

**Example:**

```
Expected: []
Received: [
  {
    id: "color-contrast",
    impact: "serious",
    description: "Ensures the contrast between foreground and background colors meets WCAG 2 AA",
    help: "Elements must have sufficient color contrast",
    helpUrl: "https://dequeuniversity.com/rules/axe/4.4/color-contrast",
    nodes: [...]
  }
]
```

## Best practices

### Test coverage

**Do test:**

- Default state
- All semantic variants (positive, negative, info, etc.)
- Size variants (s, m, l, xl)
- Interactive states (disabled, selected, focused)
- With different content (text, icons, numbers)

**Don't need to test:**

- Every color combination
- Every possible prop combination
- Styling details (use visual regression for that)

### When tests fail

**ARIA snapshot failures:**

1. Review the diff - is this intentional?
2. If yes: Update snapshots with `--update-snapshots`
3. If no: Fix the component to restore expected structure

**aXe violations:**

1. Read the violation message and linked docs
2. Fix the component to address the issue
3. Re-run tests to verify

**Test timeout/hanging:**

- Check that Storybook is running
- Verify the story ID is correct
- Ensure the element selector matches

### Tips

- **Start with ARIA snapshots** - They're fast to write and catch structural changes
- **Add aXe tests for critical paths** - Form controls, navigation, overlays
- **Use UI mode for debugging** - `yarn test:a11y:ui` shows live browser
- **Test variants separately** - One test per story keeps failures focused
- **Commit ARIA snapshots** - They're living documentation

## Configuration

### Playwright config

`first-gen/playwright.a11y.config.ts` defines two projects:

```typescript
projects: [
    {
        name: '1st-gen',
        testMatch: '**/packages/*/test/**/*.a11y.spec.ts',
        use: { baseURL: 'http://localhost:8080' },
    },
    {
        name: '2nd-gen',
        testMatch: '**/packages/swc/components/*/test/**/*.a11y.spec.ts',
        use: { baseURL: 'http://localhost:6006' },
    },
];
```

This allows both generations to run against their respective Storybook instances.

### Auto-starting Storybook

Tests automatically start Storybook when needed:

```typescript
webServer: [
    {
        command: 'yarn storybook',
        port: 8080,
        reuseExistingServer: !process.env.CI,
    },
    {
        command: 'cd ../second-gen/packages/swc && yarn storybook',
        port: 6006,
        reuseExistingServer: !process.env.CI,
    },
];
```

## File structure

```
spectrum-web-components/
├── ACCESSIBILITY_TESTING.md              # This guide
├── first-gen/
│   ├── playwright.a11y.config.ts         # Playwright config (both gens)
│   ├── package.json                      # Test scripts
│   ├── test/
│   │   └── a11y-helpers.ts               # Shared helpers (both gens)
│   └── packages/
│       ├── badge/test/
│       │   ├── badge.a11y.spec.ts                  # Tests
│       │   └── badge.a11y.spec.ts-snapshots/       # ARIA baselines
│       └── status-light/test/
│           ├── status-light.a11y.spec.ts
│           └── status-light.a11y.spec.ts-snapshots/
└── second-gen/packages/swc/components/
    ├── badge/test/
    │   ├── badge.a11y.spec.ts
    │   └── badge.a11y.spec.ts-snapshots/
    └── status-light/test/
        ├── status-light.a11y.spec.ts
        └── status-light.a11y.spec.ts-snapshots/
```

## Resources

- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Playwright ARIA snapshots](https://playwright.dev/docs/aria-snapshots)
- [aXe-core rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/)

## Benefits

**For developers:**

- Catch issues in seconds, not days
- Clear, actionable failure messages
- No manual testing needed for basic checks

**For the project:**

- Scalable to all components
- CI-ready (runs on every PR)
- Complements manual testing
