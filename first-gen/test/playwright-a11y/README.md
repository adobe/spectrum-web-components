# Playwright accessibility testing - Proof of Concept

Simple demonstration of Playwright ARIA snapshots and aXe-core validation for Badge and Status Light components.

## Quick Start

```bash
# 1. Install Playwright
npx playwright install chromium

# 2. Run tests (Storybook will start automatically)
yarn test:a11y

# 3. View results
open test/playwright-a11y/report/index.html
```

## What's Tested

### Badge Component

- ✅ ARIA snapshot of accessibility tree
- ✅ aXe validation (WCAG compliance)
- ✅ Color contrast checks
- ✅ All semantic variants

### Status Light Component

- ✅ ARIA snapshot of accessibility tree
- ✅ aXe validation (WCAG compliance)
- ✅ Color contrast for indicators
- ✅ Status variants and disabled states

## Files

```
first-gen/
├── playwright.config.ts               # Updated to support a11y tests
├── package.json                       # Added test:a11y scripts
└── test/playwright-a11y/
    ├── aria-snapshots.spec.ts         # ARIA tree regression tests
    └── axe-validation.spec.ts         # Automated WCAG validation
```

## Example Usage

### ARIA Snapshots (Regression Testing)

```typescript
test('badge accessibility tree should not change', async ({ page }) => {
    await page.goto(
        'http://localhost:8080/iframe.html?id=badge--positive&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    const badge = page.locator('sp-badge').first();
    await expect(badge).toMatchAriaSnapshot();
});
```

### aXe Validation (Rule Checking)

```typescript
test('badge should not have accessibility violations', async ({ page }) => {
    await page.goto(
        'http://localhost:8080/iframe.html?id=badge--positive&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
});
```

## Commands

```bash
# Run all tests
yarn test:a11y

# Interactive UI mode
yarn test:a11y:ui

# Update ARIA snapshots
yarn test:a11y --update-snapshots
```

## Integration

Add to CI/CD:

```yaml
- name: Run accessibility tests
  run: |
      cd first-gen
      yarn test:a11y
```

## Resources

- [Playwright ARIA Snapshots](https://playwright.dev/docs/aria-snapshots)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [aXe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
