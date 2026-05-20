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

**What you write in the changeset is what appears in the CHANGELOG.** The release script is a collator, not a transformer. It reads your changeset body verbatim, prepends a bullet, and groups entries under a version heading. No rewriting, no reformatting. The only enrichment is a PR link, auto-appended if you omit it.

## The format

Every changelog entry — whether in a `.changeset/*.md` file or in the final `CHANGELOG.md` — follows this pattern:

```
`Component` — Description of the change. [#PR](link)
```

That's it. Component name in backticks, em dash, consumer-facing description, PR link. The **PR link is auto-appended** at release time if you omit it — so you can write the changeset before opening your PR and the link will be resolved from the commit.

> Breaking changes are not expected until the full component set is migrated. If one does arise, prefix with `BREAKING:` in the changeset body and coordinate with the team before merging.

## Writing a changeset

Run `yarn changeset` to start the interactive CLI. It will list every package in the monorepo. For 2nd-gen work, select one of these two packages:

| Package | When to select |
|---|---|
| `@adobe/spectrum-wc` | Any component change (new component, feature, bug fix) |
| `@spectrum-web-components/core` | Changes to shared core logic (mixins, controllers, base classes) |

Skip all `@spectrum-web-components/*` 1st-gen packages — those follow a separate process. If your PR changes both core and a component, run `yarn changeset` twice and create one changeset for each package.

After selecting the package, choose a bump type, then write the body using the format above.

### Bump types

Bump types follow [semantic versioning](https://semver.org/) — the version number communicates the nature of the change to consumers.

| Bump type | When to use | Example |
|---|---|---|
| `minor` | New component, new feature, or deprecating an attribute with a new replacement | Added a new component or attribute, deprecated `label` in favor of `alt` |
| `patch` | Bug fix, deprecation warning, or non-breaking internal change | Fixed a rendering issue, added Gen1 deprecation warning |
| `major` | Breaking change requiring consumer update (rare — requires detailed planning and cross-team communication before merging) | Renamed or removed an attribute |

### Examples

**New component** (the most common case during migration). Always link to the component's Storybook docs and migration guide so consumers know where to find details. You can omit the PR link — it is auto-appended at release time:

```markdown
---
'@adobe/spectrum-wc': minor
---

`Accordion` — Added `<swc-accordion>` with Spectrum 2 tokens. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-accordion--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-accordion-migration-guide--docs).
```

**Patch** (bug fix):

```markdown
---
'@adobe/spectrum-wc': patch
---

`Badge` — Fixed contrast ratio in dark theme for `notice` variant.
```

**Minor** (new feature on an existing component):

```markdown
---
'@adobe/spectrum-wc': minor
---

`Button` — Added `justified` attribute for full-width layout.
```

**Multiple components with different bump types** — if a single PR adds a feature (minor) and fixes a bug (patch), create a separate changeset for each so the bump types are correct:

```markdown
---
'@adobe/spectrum-wc': minor
---

`Badge` — Added `subtle` and `outline` style attributes.
```

```markdown
---
'@adobe/spectrum-wc': patch
---

`Status Light` — Fixed missing `cyan` variant in forced-colors mode.
```

### Rules

- **One changeset per PR** is the default. Most PRs touch a single component and need a single changeset. Create multiple changesets only when the PR contains changes with different bump types (e.g., a minor addition and a patch fix).
- **Select the right package** in the changeset frontmatter. The `linked` config in `.changeset/config.json` keeps `@adobe/spectrum-wc` and `@spectrum-web-components/core` at the same version automatically — you only need to list the one you touched:

  | What changed | Frontmatter |
  |---|---|
  | Component change (e.g., added `<swc-checkbox>`) | `'@adobe/spectrum-wc': minor` |
  | Core change (e.g., new mixin in core) | `'@spectrum-web-components/core': minor` |
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

At release time, changesets collates entries under a version heading, grouped by bump type (`### Minor Changes`, `### Patch Changes`). The output is fully automated — no manual editing required.

**Typical release** — a minor feature and a patch fix in the same release:

```markdown
## 2.1.0

### Minor Changes

- `Button` — Added wiggle radius to button. [#6210](https://github.com/adobe/spectrum-web-components/pull/6210)

### Patch Changes

- `Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](https://github.com/adobe/spectrum-web-components/pull/6285)
```

**Single-entry release** — when only one changeset ships:

```markdown
## 2.0.1

### Patch Changes

- `Badge` — Fixed contrast ratio in dark theme for `notice` variant. [#6285](https://github.com/adobe/spectrum-web-components/pull/6285)
```

## How it works

`.changeset/config.json` points to a custom changelog function (`scripts/changelog-passthrough.cjs`) instead of the default `@changesets/changelog-github`. It receives the changeset body and returns it as a CHANGELOG bullet — no commit hashes, no author attributions, no reformatting. If the body does not already contain a PR link (`[#123](url)`), the script resolves one from the commit via the GitHub API and appends it automatically. Changesets handles the rest: version headings, bump-type grouping, and collation.

The script is intentionally minimal. If you need to understand or maintain it, read `scripts/changelog-passthrough.cjs`.
