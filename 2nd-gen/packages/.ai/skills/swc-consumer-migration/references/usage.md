# Usage reference: parsing guides and applying migrations

This reference is loaded on demand by `swc-consumer-migration`. It explains how to interpret a consumer migration guide, walks through one worked example, and lists the post-migration checklist.

## How guides are structured

Every guide ships as a single `.mdx` (or `.md`) file. The skill expects this shape, with sentence-case headings:

```
# <Component> consumer migration guide

(One-paragraph summary: what changed at a glance.)

## What changed

### Renamed
(Markdown table: Area | Spectrum 1 | Spectrum 2)

### Added in Spectrum 2
(Markdown table: Addition | Notes)

### Removed in Spectrum 2
(Markdown table: Removed | Replacement)

## Update your code

### 1. Update the import
### 2. Rename the tag
### 3. <component-specific steps>

## Styling
(custom-property renames, semantic vs. non-semantic notes)

## Accessibility
(consumer-facing a11y deltas)

## Verification
(what to test after migrating)
```

When parsing, extract:

| From section                              | What the skill should pull out                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `## What changed > Renamed`               | Tag-name renames, package / import-path renames, custom-property renames                                     |
| `## What changed > Added in Spectrum 2`   | New attributes/props/slots — informational only, no automatic edits                                          |
| `## What changed > Removed in Spectrum 2` | Removed APIs that need a replacement decision; flag with `TODO(swc-migration):` if no 1:1 replacement exists |
| `## Update your code`                     | Concrete code transformations the skill should apply                                                         |
| `## Styling`                              | Custom-property renames the skill should apply across CSS and inline `style` strings                         |
| `## Accessibility`                        | Required attribute additions (e.g. `aria-label` for icon-only)                                               |
| `## Verification`                         | Checks to run after migration                                                                                |

Tables are the source of truth for renames. Code blocks under `## Update your code` are the source of truth for concrete transformations. Treat prose as commentary unless it contradicts the tables.

If a guide deviates from this structure (older guides, partial guides), parse defensively: search for the keywords "Before" / "After" inside fenced code blocks and fall back to surfacing the diff to the user for manual review.

## Worked example: badge

Source guide (shipped today): `2nd-gen/packages/swc/components/badge/consumer-migration-guide.mdx`.

After Step 1 collects guides, the skill reads `<cwd>/.swc-migration/guides/badge.md` and extracts:

- **Package rename:** `@spectrum-web-components/badge` → `@adobe/spectrum-wc/badge`
- **Import rename:** `@spectrum-web-components/badge/sp-badge.js` → `@adobe/spectrum-wc/badge`
- **Tag rename:** `<sp-badge>` → `<swc-badge>`
- **Custom-property rename:** `--mod-badge-*` and `--spectrum-badge-*` → `--swc-badge-*` (semantic variants only)
- **Removed exports:** `BADGE_VARIANTS`, `FIXED_VALUES`, `BadgeVariant`, `FixedValues` → use `Badge.VARIANTS`, `Badge.FIXED_VALUES`, or `typeof Badge.prototype.variant`
- **Accessibility delta:** add `aria-label` to icon-only badges; add `aria-hidden="true"` to decorative icons paired with text

Concrete edits the skill applies in the consumer's `src/`:

1. **Imports.** For every file that imports from `@spectrum-web-components/badge` (any sub-path), rewrite to the corresponding `@adobe/spectrum-wc/badge` import. If the original import had a sub-path (e.g. `/sp-badge.js`), drop the sub-path — the new package exposes the side-effectful registration via the package root.
2. **JSX/HTML tags.** Replace `<sp-badge` with `<swc-badge` and `</sp-badge>` with `</swc-badge>`. Preserve attributes and children. Apply across `.html`, `.htm`, `.tsx`, `.jsx`, `.ts`, `.js`, `.lit`, `.svelte`, `.vue`, `.mdx`.
3. **Named imports.** Replace named imports of `BADGE_VARIANTS` / `FIXED_VALUES` / `BadgeVariant` / `FixedValues` with `Badge.VARIANTS` / `Badge.FIXED_VALUES` / `typeof Badge.prototype.variant`. Pull `Badge` into scope if not already imported.
4. **Custom properties.** In CSS files, SCSS files, and inline `style=` strings, replace `--mod-badge-` and `--spectrum-badge-` with `--swc-badge-` only when the surrounding declaration applies to a semantic variant (positive / informative / negative / notice / neutral). Non-semantic per-color overrides have no replacement — leave them and flag with `TODO(swc-migration):` referencing the "Removed" table.
5. **Forced-colors.** `--highcontrast-badge-border-color` has no replacement. Flag every usage with `TODO(swc-migration): no forced-colors hook in Spectrum 2 badge` and leave the existing rule in place.
6. **Accessibility.** For every `<swc-badge>` whose only children are icons (no text node), add `aria-label="..."` if missing and surface a TODO for the user to fill in the label. For badges with both icon and text, add `aria-hidden="true"` to the icon element.

After applying edits, surface a per-file diff summary and stop for confirmation before moving on to the next component.

## Post-migration checklist

Run these after every component is migrated:

- [ ] **Imports resolve.** No file in the consumer's source still imports from `@spectrum-web-components/<migrated-component>`.
- [ ] **Tag references updated.** Search for the old tag name across all source files. Zero hits expected.
- [ ] **Type references updated.** TypeScript compiles. No `any` introduced where a 1st-gen named export used to be.
- [ ] **Custom properties.** Search for `--mod-<component>-` and `--spectrum-<component>-`. Either renamed to `--swc-<component>-` or flagged with `TODO(swc-migration):`.
- [ ] **Removed APIs.** Every removed API the consumer was using is either replaced or flagged with a `TODO(swc-migration):` comment. Nothing silently deleted.
- [ ] **Accessibility deltas applied.** For every component with an a11y delta in its guide, the corresponding markup change was applied or flagged.
- [ ] **Tests reference updated tags.** Test files (`*.test.*`, `*.spec.*`, `*.stories.*`) updated to use the new tag names and imports.
- [ ] **Lint and type check pass.** Run the consumer's existing scripts (do not invent new ones). If they fail, surface the failures verbatim and stop.

## What the skill does NOT do

- Bump dependency versions in `package.json` — the user runs their own install.
- Run install commands or modify lockfiles.
- Rewrite tests beyond import/tag substitution.
- Apply visual or design changes beyond what the guide explicitly specifies.
- Migrate components for which no guide was collected.

If any of those are needed, surface a clear note in the final report and let the user act.

## Re-running

Re-running `collect-guides.mjs` is safe and idempotent. It overwrites the previous guide copies and the manifest. Source files in the consumer project are never touched by the script — only by the agent applying migrations under explicit confirmation.
