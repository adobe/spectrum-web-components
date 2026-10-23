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

| Path pattern | Threshold | What it covers |
| --- | --- | --- |
| `components/**/*.{ts,js}` | **99%** lines, functions, statements | SWC component implementations |
| `../core/components/**/*.{ts,js}` | **95%** lines, **94%** functions, **95%** statements | Core component base classes |
| `../core/controllers/*.{ts,js}` | **85%** lines, **90%** functions, **85%** statements | Reactive controllers |
| `../core/element/*.{ts,js}` | **94%** lines, **100%** functions, **94%** statements | Base element |
| `../core/mixins/*.{ts,js}` | **99%** lines, **100%** functions, **99%** statements | Shared mixins |

Component code and base classes aim for 100% coverage. Each threshold is the current coverage rounded down and ratchets upward as coverage improves.

Threshold globs match file paths relative to `gen2/packages/swc`, so core files must be written as `../core/...`. A glob that matches no files passes silently.

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
yarn workspace @spectrum-web-components/gen2 test:coverage
```

Review the generated report. If coverage drops below the threshold, add tests to cover the gap before merging.
