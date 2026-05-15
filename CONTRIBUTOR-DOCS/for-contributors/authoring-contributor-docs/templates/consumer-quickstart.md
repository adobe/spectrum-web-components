<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Contributor guides](../../README.md) / [Authoring contributor docs](../README.md) / Templates / Consumer quickstart template

<!-- Document title (editable) -->

# Consumer quickstart template

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Required sections (in order)](#required-sections-in-order)
    - [1. H1: Welcome / quickstart title](#1-h1-welcome--quickstart-title)
    - [2. Install](#2-install)
    - [3. Your first component / first interaction](#3-your-first-component--first-interaction)
    - [4. Framework note](#4-framework-note)
    - [5. Where to go next](#5-where-to-go-next)
- [Optional sections](#optional-sections)
    - [Compatibility / supported browsers](#compatibility--supported-browsers)
    - [Troubleshooting](#troubleshooting)
    - [Migration note](#migration-note)
- [Heading rules](#heading-rules)
- [Voice and length](#voice-and-length)
- [Frontmatter](#frontmatter)
- [Reference implementation](#reference-implementation)

</details>

<!-- Document content (editable) -->

> **What this is.** A skeleton for consumer-facing quickstart pages (Get started, framework guides, integration guides). Clone this when adding a new consumer onboarding doc. Required sections are marked; optional sections only render when there's a meaningful answer.
>
> **Where it lives.** Consumer quickstart pages are **MDX SSOTs in `.storybook/docs/`**, not Markdown in CONTRIBUTOR-DOCS. The published Storybook is the canonical surface for consumer docs (see the [audience-based docs Storybook residency audit](../../../project-planning/05_strategies/audience-based-docs-storybook-residency-audit.md) for the principle). Translate this template's structure into MDX when authoring; keep the sections, headings, and ordering.
>
> **Cross-surface mirror.** If consumers also need a minimal-install snippet on GitHub, add an honest pointer in `2nd-gen/README.md` to the Storybook page — do not duplicate the prose.

## Required sections (in order)

### 1. H1: Welcome / quickstart title

One H1 at the top. Concrete and specific (e.g., "Welcome to Spectrum Web Components", "Getting started with the React wrappers"). Avoid generic "Introduction" or "Overview".

Follow the H1 with **one to two sentences** that frame the page: who it's for, what they'll learn, and (if relevant) the audience scope (vanilla JS vs framework, server-rendered vs client-only).

### 2. Install

Single code block. **No multi-framework tabs unless the audience genuinely splits.** For the vanilla-JS quickstart, only show the `yarn add` line plus the side-effectful import plus the stylesheet link.

```bash
yarn add <package-name>
```

```js
import '<package-name>/<component>';
```

```html
<link rel="stylesheet" href="node_modules/<package-name>/dist/<stylesheet>.css" />
```

If the doc covers a framework wrapper, replace with the wrapper's install + import pattern.

### 3. Your first component / first interaction

The smallest meaningful copy-paste example, followed by the rendered output. For Storybook MDX, this is the moment to use a live custom element inline or a `<Canvas>` of an existing story.

```html
<swc-foo variant="primary">Hello</swc-foo>
```

<!-- In MDX: render the actual element inline so consumers see what they're about to copy. -->

Pair this with one sentence acknowledging that this is the real component, and pointing at the Components section for more.

### 4. Framework note

**One short paragraph** acknowledging where the component model meets the consumer's framework:

- Which framework wrappers exist (or are planned)
- What's out of scope (and why — usually "the framework consumes custom elements natively")

Do not turn this into a comparison matrix. One line per fact.

### 5. Where to go next

Four to six links, each one-line. Cards are nice in Storybook MDX; bulleted links are fine if the surface doesn't support cards.

- **Components** — the full library
- **Customization** — the cheatsheet
- **Accessibility** — the overview
- **Contributing** — link out to GitHub for the contributor experience

## Optional sections

Only add these if the consumer audience needs them at this entry point.

### Compatibility / supported browsers

A small table if the answer is "modern evergreen browsers, no IE11". Skip if the answer is the same as the org default.

### Troubleshooting

Inline at the end of `Install` or `Your first component` only when there's a specific, common failure mode (e.g., missing stylesheet, custom element not registered). Keep to 3 bullets max; bigger troubleshooting goes in a separate dedicated page.

### Migration note

A one-liner pointing at the relevant per-component migration guide if this quickstart replaces a 1st-gen flow.

## Heading rules

- One H1, at the top.
- H2 for each top-level section above.
- H3 for sub-points within a section. Don't go deeper than H3 on a quickstart page.
- Use sentence case.

## Voice and length

- Direct. Imperative when telling the reader what to do.
- Under one screen of reading. If it grows past that, split into a "next steps" follow-up page rather than scrolling further.
- Show, don't describe. A live `<swc-badge>` beats three sentences explaining what a badge looks like.

## Frontmatter

Required keys:

- `audience: consumer`
- `genre: quickstart`
- `last-reviewed: YYYY-MM-DD`
- `status: draft | review | published`
- `tags: [...]`

The frontmatter informs the Storybook generator, search indexing, and any future doc-validity checks.

## Reference implementation

See `2nd-gen/packages/swc/.storybook/docs/get-started/index.mdx` — the canonical consumer welcome page authored from this template.
