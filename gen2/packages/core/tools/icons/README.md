# Icon generation tools

Build-time helpers shared by the two icon generators:

| Generator                                                             | Family         | Command                        |
| --------------------------------------------------------------------- | -------------- | ------------------------------ |
| `gen2/packages/swc/components/ui-icons/scripts/generate-ui-icons.mjs` | UI icons       | `yarn generate:ui-icons`       |
| `gen2/packages/icons/scripts/generate-workflow-icons.mjs`             | Workflow icons | `yarn generate:workflow-icons` |

The icons package also uses `format.mjs` in `scripts/copy-icon-base-styles.mjs` (`yarn generate:icon-styles`).

| File         | Exports                                 | Purpose                                                                        |
| ------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| `format.mjs` | `LICENSE`, `generatedBanner`, `toKebab` | License header, "do not edit" banner, and PascalCase to kebab-case conversion  |
| `svg.mjs`    | `cleanSvg`, `A4U_FILL`, `SWC_FILL`      | Rewrites the A4U fill to `var(--swc-icon-color, currentColor)`, then runs SVGO |

## Why core

Both `@adobe/spectrum-wc` and `@adobe/spectrum-wc-icons` depend on core, and the icons package must not depend on swc. Keeping the helpers here gives both generators one copy without a new dependency edge.

These files are not part of the published package: core ships only `dist/`, and its build compiles `.ts` entries only. Generators import them by relative path (for example `../../core/tools/icons/format.mjs`), not through a package export. `svgo` is a core devDependency for this reason.

## Changing a helper

A change here affects both families. After editing, regenerate both (source SVGs required; see each family's `icon-source/README.md`) and review the diff in both packages.
