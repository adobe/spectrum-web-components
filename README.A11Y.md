# Playwright Accessibility Testing - Proof of Concept

Branch: `cdransfeldt/test-playwright-aria-snapshots`

## What This Demonstrates

Two complementary approaches to accessibility testing using Playwright:

1. **ARIA Snapshots** - Test accessibility tree structure for regressions
2. **aXe-core Validation** - Automated WCAG 2.0/2.1/2.2 compliance checking

Focused on **Badge** and **Status Light** components as proof of concept.

## Quick Start

```bash
cd first-gen

# Install Playwright
npx playwright install chromium

# Run tests (starts Storybook automatically)
yarn test:a11y

# View results
open test/playwright-a11y/report/index.html
```

## What's Included

### Test Files

- `aria-snapshots.spec.ts` - Accessibility tree regression tests
- `axe-validation.spec.ts` - Automated WCAG rule validation

### Components Tested

- Badge (default, variants, with icons, color contrast)
- Status Light (status variants, disabled states, ARIA)
- Additional examples (Button, Checkbox, Tabs, etc.)

### Configuration

- Updated `playwright.config.ts` to support a11y tests
- Added `test:a11y` and `test:a11y:ui` npm scripts
- Auto-starts Storybook on port 8080

## Example Tests

### ARIA Snapshot (Regression Test)

```typescript
test('badge accessibility tree should not change', async ({ page }) => {
    await page.goto(
        'http://localhost:8080/iframe.html?id=badge--positive&viewMode=story'
    );
    const badge = page.locator('sp-badge').first();
    await expect(badge).toMatchAriaSnapshot();
});
```

### aXe Validation (Rule Check)

```typescript
test('badge should pass WCAG checks', async ({ page }) => {
    await page.goto(
        'http://localhost:8080/iframe.html?id=badge--positive&viewMode=story'
    );
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
});
```

## Commands

```bash
yarn test:a11y              # Run all tests
yarn test:a11y:ui           # Interactive UI mode
yarn test:a11y --update     # Update snapshots
```

## Files Changed

```
first-gen/
├── playwright.config.ts               (updated)
├── package.json                       (added scripts)
└── test/playwright-a11y/
    ├── README.md                      (guide)
    ├── aria-snapshots.spec.ts         (tests)
    └── axe-validation.spec.ts         (tests)
```

## Why This Approach?

- ✅ **Automated** - Catches issues before they ship
- ✅ **Regression tests** - ARIA snapshots prevent breaking changes
- ✅ **Standards-based** - aXe-core checks against WCAG guidelines
- ✅ **CI-ready** - Integrates into existing pipelines
- ✅ **Lightweight** - Minimal setup, maximum value

## Next Steps

1. Run the tests: `yarn test:a11y`
2. Review the examples in `test/playwright-a11y/`
3. Add tests for other components using the same patterns
4. Integrate into CI/CD pipeline

## Resources

- [Playwright ARIA Snapshots](https://playwright.dev/docs/aria-snapshots)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [aXe-core Documentation](https://github.com/dequelabs/axe-core)
