<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Code coverage

<!-- Document title (editable) -->

# Code coverage

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Coverage thresholds](#coverage-thresholds)
- [Auto-updating thresholds](#auto-updating-thresholds)
- [Checking coverage](#checking-coverage)

</details>

<!-- Document content (editable) -->

Coverage is collected by the Storybook Vitest project using the V8 provider.

## Coverage thresholds

We enforce per-path thresholds in `vitest.config.js`:

| Path pattern | Target | What it covers |
| --- | --- | --- |
| `components/**/*.{ts,js}` | **100%** lines, functions, statements | SWC component implementations |
| `**/packages/core/components/**/*.{ts,js}` | **100%** lines, functions, statements | Core component base classes |
| `**/packages/core/shared/**/*.{ts,js}` | **70%** lines, functions, statements | Shared utilities |

Component code and base classes require 100% coverage. Shared utilities have a lower threshold that ratchets upward as coverage improves.

## Auto-updating thresholds

The coverage config uses `autoUpdate` with `Math.floor` to automatically lock in improvements:

```javascript
thresholds: {
  autoUpdate: (value) => Math.floor(value),
}
```

When your tests push coverage above the current threshold, the config file updates itself. This prevents regressions without manual threshold bumps.

## Checking coverage

```bash
yarn workspace @adobe/swc test:coverage
```

Review the generated report. If coverage drops below the threshold, add tests to cover the gap before merging.
