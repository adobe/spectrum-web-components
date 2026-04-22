<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Contributor guides](../../README.md) / [Authoring contributor docs](../README.md) / Templates / [Quickstart title]

<!-- Document title (editable) -->

# [Quickstart title]

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Install](#install)
- [Your first [thing]](#your-first-thing)
- [Framework support](#framework-support)
- [Where to go next](#where-to-go-next)
- [Authoring notes (remove when copying)](#authoring-notes-remove-when-copying)

</details>

<!-- Document content (editable) -->

[One-sentence hook: what a reader will be able to do after this page. Keep it consumer-focused, not maintainer-focused.]

## Install

[The absolute minimum install steps. Prefer one canonical path (Vanilla / npm). Alternatives go under a later section, not here.]

```bash
yarn add [package]
```

[Side-effectful import block, if applicable.]

```ts
import '[package]/[entry]';
```

[Stylesheet or bootstrap step, if applicable.]

```html
<link rel="stylesheet" href="[stylesheet path]" />
```

[One-line pointer out to customization / advanced setup. No deep overrides on this page.]

## Your first [thing]

[Minimal copy-paste example that works with only the Install steps above. No optional props, no advanced patterns.]

```html
[example]
```

## Framework support

[One line per supported or planned framework. Do not expand into a multi-framework tab section — link out to per-framework guides if they exist.]

## Where to go next

[4–5 bullet links, each one line. Group by audience or by depth, not by alphabetical order.]

- **[Reference]** — [one-line hook]
- **[Customization]** — [one-line hook]
- **[Accessibility]** — [one-line hook]
- **[Contributing]** — [one-line hook]

---

## Authoring notes (remove when copying)

**When to use this template.** Consumer-facing quickstart pages that answer "I just installed this — what now?" Not for deep feature guides, not for maintainer setup.

**Keep it short.** A consumer should finish reading in under 5 minutes. If the page grows past that, split it.

**Canonical path only.** Show the one recommended install flow. Alternatives (CDN, framework-specific, edge cases) live on dedicated pages and link in.

**Heading discipline.** Sentence case. Keyword-first phrasing (`Install`, `Framework support` — not `Installing SWC` or `What about frameworks`).

**No prose paragraphs over three sentences.** Prefer code blocks, bullets, and short transitions.
