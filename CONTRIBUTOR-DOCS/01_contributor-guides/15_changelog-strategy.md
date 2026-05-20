<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Changelog strategy

<!-- Document title (editable) -->

# Changelog strategy

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Core principle](#core-principle)
- [The format](#the-format)
- [Writing a changeset](#writing-a-changeset)
    - [Bump types](#bump-types)
    - [Examples](#examples)
    - [Rules](#rules)
- [CHANGELOG output](#changelog-output)
- [How it works](#how-it-works)

</details>

<!-- Document content (editable) -->

## Core principle

**What you write in the changeset is what appears in the CHANGELOG.** The release script is a collator, not a transformer. It reads your changeset body verbatim, prepends a bullet, and groups entries under a version heading. No rewriting, no enrichment, no surprises.

## The format

Every changelog entry — whether in a `.changeset/*.md` file or in the final `CHANGELOG.md` — follows this pattern:

```
`Component` — Description of the change. [#PR](link)
```

That's it. Component name in backticks, em dash, consumer-facing description, PR link.

> Breaking changes are not expected until the full component set is migrated. If one does arise, prefix with `BREAKING:` in the changeset body and coordinate with the team before merging.

## Writing a changeset

Run `yarn changeset`, select the affected packages, choose a bump type, then write the body using the format above.

### Bump types

Bump types follow [semantic versioning](https://semver.org/) — the version number communicates the nature of the change to consumers.

| Bump type | When to use | Example |
|---|---|---|
| `minor` | New component, new feature, or deprecating an attribute with a new replacement | Added a new component or attribute, deprecated `label` in favor of `alt` |
| `patch` | Bug fix, deprecation warning, or non-breaking internal change | Fixed a rendering issue, added Gen1 deprecation warning |
| `major` | Breaking change requiring consumer update (rare — requires detailed planning and cross-team communication before merging) | Renamed or removed an attribute |

### Examples

**New component** (the most common case during migration). Always link to the component's Storybook docs and migration guide so consumers know where to find details:

```markdown
---
'@adobe/spectrum-wc': minor
---

`Accordion` — Added `<swc-accordion>` with Spectrum 2 tokens. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-accordion--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-accordion-migration-guide--docs). [#7000](https://github.com/adobe/spectrum-web-components/pull/7000)
```

**Patch** (bug fix):

```markdown
---
'@adobe/spectrum-wc': patch
---

`Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](https://github.com/adobe/spectrum-web-components/pull/6285)
```

**Minor** (new feature on an existing component):

```markdown
---
'@adobe/spectrum-wc': minor
---

`Button` — Added `justified` attribute for full-width layout. [#6254](https://github.com/adobe/spectrum-web-components/pull/6254)
```

**Multiple components in one PR** — create a separate changeset for each component:

```markdown
---
'@adobe/spectrum-wc': minor
---

`Badge` — Added `subtle` and `outline` style attributes. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
```

```markdown
---
'@adobe/spectrum-wc': patch
---

`Status Light` — Fixed missing `cyan` variant in forced-colors mode. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
```

Separate changesets keep each entry clean and allow different bump types per component. Run `yarn changeset` once per component.

### Rules

- **One changeset per component change** (preferred). This ensures each CHANGELOG entry is self-contained and correctly typed.
- **Always list the package you changed** in the frontmatter. The `linked` config in `.changeset/config.json` keeps `@adobe/spectrum-wc` and `@spectrum-web-components/core` at the same version automatically — you only need to list the one you touched:

  | What changed | Frontmatter |
  |---|---|
  | Component only (e.g., added `<swc-checkbox>`) | `'@adobe/spectrum-wc': minor` |
  | Core only (e.g., new mixin in core) | `'@spectrum-web-components/core': minor` |
  | Both core and component in the same PR | Create **two changesets** — one for each package, each describing its own change |

- **Write for consumers, not contributors.** Describe user-visible impact, not implementation details. Use **past simple tense** ("Added", "Fixed", "Removed" — not "Adds", "Fixing", "Will remove"). When a change requires consumer action, append a `Consumer action:` note; for changes that need no action, omit it.

  | | Example |
  |---|---|
  | Good | `Badge` — Fixed contrast ratio in dark theme. No consumer action required. |
  | Good | `Button` — Added `justified` attribute for full-width layout. |
  | Good | `Avatar` — Removed `href` link mode. Consumer action: wrap in a native `<a>` instead. |
  | Bad | `Badge` — Fixes contrast ratio _(wrong tense)_ |
  | Bad | `Badge` — Refactored internal rendering pipeline _(implementation detail, not consumer-facing)_ |
- **PR review is the quality gate.** What you write shows up in the CHANGELOG exactly as written — reviewers should check changeset quality alongside code quality.

## CHANGELOG output

At release time, the script collates changeset entries under a version heading. The output is fully automated — no manual editing required.

**Typical non-breaking release** (minor or patch only) — one consumer-visible feature might look like this:

```markdown
## 2.1.0

- `Button` — Added wiggle radius to button. [#6210](link)
```

**Release that includes breaking changes** — major bullets appear before minor and patch. The result looks like this:

```markdown
## 0.2.0

- BREAKING: `Avatar` — Renamed `label` to `alt`. Removed `href`. [#6113](link)
- `Button` — Added `justified` attribute for full-width layout. [#6254](link)
- `Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](link)
```

## How it works

The release pipeline has two steps that shape the 2nd-gen CHANGELOG:

1. **Passthrough** — `.changeset/config.json` points to a custom changelog function (`scripts/changelog-passthrough.cjs`) instead of the default `@changesets/changelog-github`. It receives the changeset body and returns it as a CHANGELOG bullet — no commit hashes, no author attributions, no reformatting.
2. **Cleanup** — The changesets library adds `### Minor Changes` / `### Patch Changes` headings automatically. A post-processing script (`scripts/clean-changelog.cjs`) strips those headings from the 2nd-gen CHANGELOGs so entries are flat bullets under the version heading. This runs automatically during `yarn publish` (see `scripts/publish.js`).

Both scripts are intentionally minimal. If you need to understand or maintain them, read `scripts/changelog-passthrough.cjs` and `scripts/clean-changelog.cjs`.
