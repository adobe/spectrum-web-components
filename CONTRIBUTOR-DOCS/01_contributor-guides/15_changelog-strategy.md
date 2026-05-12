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

> On the rare occasion a change is breaking, prefix with `🚨 BREAKING:` — but most 2nd-gen work is additive (new components, new features, bug fixes), so this should be uncommon.

## Writing a changeset

Run `yarn changeset`, select the affected packages, choose a bump type, then write the body using the format above.

### Bump types

| Bump type | When to use | Example |
|---|---|---|
| `minor` | New component or new feature | Added a new component or attribute |
| `patch` | Bug fix, no API change | Fixed a rendering issue |
| `major` | Breaking change requiring consumer update (rare) | Renamed or removed an attribute |

### Examples

**New component** (the most common case during migration):

```markdown
---
'@adobe/spectrum-wc': minor
---

`Button` — Added `<swc-button>` with full Spectrum 2 visual fidelity. See the [component docs](https://opensource.adobe.com/spectrum-web-components/?path=/docs/components-button--readme) and [consumer migration guide](https://opensource.adobe.com/spectrum-web-components/?path=/docs/components-button-consumer-migration-guide--readme). [#6254](https://github.com/adobe/spectrum-web-components/pull/6254)
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

**Multiple changes in one changeset** (when a single PR affects multiple components):

```markdown
---
'@adobe/spectrum-wc': minor
---

`Badge` — Added `subtle` and `outline` style attributes. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
`Status Light` — Added new color variants: `pink`, `turquoise`, `brown`, `cinnamon`, `silver`. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
```

### Rules

- **One changeset per PR** (preferred). Multiple are allowed when a PR contains unrelated changes.
- **Include `@spectrum-web-components/core`** in the frontmatter when core logic changed. The `linked` config in `.changeset/config.json` versions core and swc together automatically.
- **Write for consumers, not contributors.** Describe user-visible impact, not implementation details.
- **PR review is the quality gate.** What you write shows up in the CHANGELOG exactly as written — reviewers should check changeset quality alongside code quality.

## CHANGELOG output

At release time, the script collates changeset entries under a version heading. A typical release looks like this:

```markdown
## 2.1.0

- `Button` — Added `justified` attribute for full-width layout. [#6254](link)
- `Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](link)
```

For larger releases with many entries, add section headings for scannability:

```markdown
## 2.0.0-beta2

### Added

- `Checkbox` — Added `<swc-checkbox>` with Spectrum 2 tokens. See the [component docs](link) and [consumer migration guide](link). [#6300](link)
- `Conversational AI` — New pattern for AI chat surfaces. [#6170](link)

### Fixed

- `Progress Circle` — Added missing `role` and ARIA attributes. [#6001](link)
```

Section headings are optional — use them only when a release has enough entries to benefit from grouping.

## How it works

The release pipeline has two steps that shape the 2nd-gen CHANGELOG:

1. **Passthrough** — `.changeset/config.json` points to a custom changelog function (`scripts/changelog-passthrough.cjs`) instead of the default `@changesets/changelog-github`. It receives the changeset body and returns it as a CHANGELOG bullet — no commit hashes, no author attributions, no reformatting.
2. **Cleanup** — The changesets library adds `### Minor Changes` / `### Patch Changes` headings automatically. A post-processing script (`scripts/clean-changelog.cjs`) strips those headings from the 2nd-gen CHANGELOGs so entries are flat bullets under the version heading. This runs automatically during `yarn publish` (see `scripts/publish.js`).

Both scripts are intentionally minimal. If you need to understand or maintain them, read `scripts/changelog-passthrough.cjs` and `scripts/clean-changelog.cjs`.
