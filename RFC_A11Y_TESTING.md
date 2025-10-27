# RFC: Playwright accessibility testing POC

## Overview

This RFC proposes adding automated accessibility testing to Spectrum Web Components using Playwright. This POC demonstrates two complementary approaches:

1. **ARIA snapshot testing** - Captures and validates the accessibility tree structure
2. **aXe rule validation** - Automated WCAG compliance checking

## Motivation

- **Catch regressions early**: Automated tests prevent accessibility issues from reaching production
- **Shift left**: Identify accessibility problems during development, not after release
- **Complement manual testing**: Automation covers ~30-40% of WCAG rules, freeing QA for complex scenarios
- **Living documentation**: ARIA snapshots serve as accessibility specifications

## Implementation

### Components tested (POC)

- **Badge**: Simple component with semantic variants
- **Status Light**: Component with size variants and states

### Test structure

```
first-gen/
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Added @axe-core/playwright + test scripts
└── test/playwright-a11y/
    ├── README.md                 # Quick start guide
    ├── aria-snapshots.spec.ts    # ARIA tree snapshot tests
    └── axe-validation.spec.ts    # aXe WCAG compliance tests
```

### Key decisions

**1. WCAG-only scanning**

- Excludes best-practice rules (e.g., "page must have h1")
- Focuses on WCAG 2.0/2.1 Level A/AA compliance
- Reasoning: We test isolated components, not full pages

**2. Element visibility waits**

- Waits for specific elements before testing
- More reliable than `waitForLoadState('networkidle')`
- Faster test execution

**3. Storybook integration**

- Tests run against existing Storybook stories
- No duplication of component setup
- Leverages existing isolation

## Running tests

```bash
# Install dependencies (if needed)
cd first-gen && yarn install

# Run all accessibility tests
yarn test:a11y

# Run with UI (great for debugging)
yarn test:a11y:ui

# Run specific test file
yarn test:a11y aria-snapshots.spec.ts
```

## Test results

### Current POC status

✅ **14/14 tests passing**

- 6 ARIA snapshot tests
    - Badge (default, icons, semantic variants)
    - Status Light (sizes, disabled state)
- 8 aXe validation tests
    - Badge (default, semantic, icons, color contrast)
    - Status Light (sizes, disabled, color contrast)

### Example ARIA snapshot

```yaml
- text: Default
```

On first run, Playwright creates baseline snapshots. Subsequent runs compare against these baselines, failing if the accessibility tree changes unexpectedly.

### Example aXe validation

```typescript
const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

expect(accessibilityScanResults.violations).toEqual([]);
```

Automatically checks ~50+ accessibility rules per component.

## Benefits

### For developers

- **Fast feedback**: Catch issues in seconds, not days
- **Clear failures**: Tests explain what's wrong and how to fix it
- **No setup needed**: Tests use existing Storybook stories

### For QA

- **Focus on complex scenarios**: Automation handles repetitive checks
- **Regression prevention**: Tests run on every PR
- **Documentation**: ARIA snapshots show expected structure

### For the project

- **Scalable**: Easy to add new components
- **CI-ready**: Runs in headless mode on CircleCI
- **Low maintenance**: Tests update with component changes

## Scaling plan

### Phase 1: Core components (POC) ✅

- Badge
- Status Light

### Phase 2: High-priority components

- Button (all variants)
- Textfield, Checkbox, Radio (form controls)
- Dialog, Tooltip (overlays)

### Phase 3: Complex components

- Action Menu (interactive)
- Tabs (keyboard navigation)
- Tables (ARIA grid patterns)

### Phase 4: Integration

- Add to CI pipeline
- Set up Playwright test reporting
- Create accessibility dashboard

## Testing approach comparison

| Method             | Coverage | Speed | Setup | Best for             |
| ------------------ | -------- | ----- | ----- | -------------------- |
| **Manual**         | 100%     | Slow  | High  | Complex interactions |
| **ARIA snapshots** | ~40%     | Fast  | Low   | Structure validation |
| **aXe validation** | ~50%     | Fast  | Low   | WCAG compliance      |
| **Screen readers** | 100%     | Slow  | High  | User experience      |

**Recommendation**: Use all four methods for comprehensive coverage.

## Open questions

1. **Should we test all Storybook stories or create dedicated a11y stories?**
    - Current: Using existing stories
    - Pro: No duplication
    - Con: Stories may not cover all a11y scenarios

2. **How do we handle components that require user interaction?**
    - Current: Manual clicks in tests (e.g., Action Menu)
    - Alternative: Playwright interactions built into tests

3. **Should ARIA snapshot failures block PRs?**
    - Pro: Prevents unintentional accessibility changes
    - Con: May be too strict for rapid iteration

4. **Integration with existing test suite?**
    - Option A: Keep separate (`yarn test:a11y`)
    - Option B: Integrate with main test suite (`yarn test`)

## Next steps

1. **Review this POC** - Get feedback from team
2. **Expand to Phase 2 components** - Button, form controls
3. **Add to CI** - Run on every PR
4. **Document patterns** - Create guide for adding new tests
5. **Train team** - Workshop on writing accessibility tests

## Resources

- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [ARIA Snapshots Documentation](https://playwright.dev/docs/aria-snapshots)
- [aXe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Success metrics

- **Coverage**: % of components with automated a11y tests
- **Violations caught**: # of issues found before reaching QA
- **Test stability**: % of test runs that pass consistently
- **Developer adoption**: # of PRs including new a11y tests

## Conclusion

This POC demonstrates that automated accessibility testing with Playwright is:

- ✅ **Feasible**: 14 tests running successfully
- ✅ **Fast**: ~6 seconds for full suite
- ✅ **Maintainable**: Tests use existing Storybook stories
- ✅ **Valuable**: Catches real accessibility issues

**Recommendation**: Proceed with Phase 2 expansion to high-priority components.
