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

For breaking changes, prefix with the marker:

```
🚨 BREAKING: `Component` — Description of what broke and how to migrate. [#PR](link)
```

That's it. Component name in backticks, em dash, consumer-facing description, PR link.

## Writing a changeset

Run `yarn changeset`, select the affected packages, choose a bump type, then write the body using the format above.

### Bump types

| Bump type | When to use | Example |
|---|---|---|
| `patch` | Bug fix, no API change | Fixed a rendering issue |
| `minor` | New feature, backwards-compatible | Added a new attribute |
| `major` | Breaking change requiring consumer update | Renamed or removed an attribute |

### Examples

**Patch** (bug fix):

```markdown
---
'@adobe/spectrum-wc': patch
---

`Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](https://github.com/adobe/spectrum-web-components/pull/6285)
```

**Minor** (new feature):

```markdown
---
'@adobe/spectrum-wc': minor
---

`Button` — Added `justified` attribute for full-width layout. [#6254](https://github.com/adobe/spectrum-web-components/pull/6254)
```

**Major** (breaking change):

```markdown
---
'@adobe/spectrum-wc': major
---

🚨 BREAKING: `Avatar` — Renamed `label` attribute to `alt`. Removed `href` link mode; wrap in a native `<a>` instead. [#6113](https://github.com/adobe/spectrum-web-components/pull/6113)
```

**Multiple changes in one changeset** (when a single PR affects multiple components):

```markdown
---
'@adobe/spectrum-wc': major
---

🚨 BREAKING: `Badge` — Default `variant` changed from `informative` to `neutral`. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
`Badge` — Added `subtle` and `outline` style attributes. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
`Status Light` — Added new color variants: `pink`, `turquoise`, `brown`, `cinnamon`, `silver`. [#6122](https://github.com/adobe/spectrum-web-components/pull/6122)
```

### Rules

- **One changeset per PR** (preferred). Multiple are allowed when a PR contains unrelated changes.
- **Include `@spectrum-web-components/core`** in the frontmatter when core logic changed. The `linked` config in `.changeset/config.json` versions core and swc together automatically.
- **Write for consumers, not contributors.** Describe user-visible impact, not implementation details.
- **PR review is the quality gate.** What you write shows up in the CHANGELOG exactly as written — reviewers should check changeset quality alongside code quality.

## CHANGELOG output

At release time, the script collates changeset entries under a version heading. `🚨 BREAKING` entries sort to the top. The result looks like this:

```markdown
## 2.1.0

- 🚨 BREAKING: `Avatar` — Renamed `label` to `alt`. Removed `href`. [#6113](link)
- `Button` — Added `justified` attribute for full-width layout. [#6254](link)
- `Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](link)
```

For major releases with many entries, add section headings for scannability:

```markdown
## 2.0.0-beta1

First public beta of `@adobe/spectrum-wc`.

### Breaking changes

- 🚨 BREAKING: `Button` — Renamed `treatment` to `fill-style`, removed `href` link mode. [#6254](link)
- 🚨 BREAKING: `Avatar` — Renamed `label` to `alt`, default `size` changed from 100 to 500. [#6113](link)

### Added

- `Button` — Added `justified` attribute. [#6254](link)
- `Conversational AI` — New pattern for AI chat surfaces. [#6170](link)

### Fixed

- `Progress Circle` — Added missing `role` and ARIA attributes. [#6001](link)
```

Section headings are optional — use them only when a release has enough entries to benefit from grouping.

## How it works

The `.changeset/config.json` points to a custom changelog function (`scripts/changelog-passthrough.cjs`) instead of the default `@changesets/changelog-github`. This function:

1. Receives the changeset body from the changesets library
2. Returns it as a CHANGELOG bullet — **no commit hashes, no author attributions, no reformatting**
3. The changesets `version` command collates all entries under the computed version heading

The function is intentionally minimal (~20 lines). If you need to understand or maintain it, read `scripts/changelog-passthrough.cjs`.
