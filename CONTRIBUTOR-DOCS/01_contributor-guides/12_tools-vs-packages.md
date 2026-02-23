<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Tools vs packages: where code lives

<!-- Document title (editable) -->

# Tools vs packages: where code lives

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Rule of thumb](#rule-of-thumb)
- [1st-gen and 2nd-gen layout](#1st-gen-and-2nd-gen-layout)
- [Abstraction targets (2nd-gen)](#abstraction-targets-2nd-gen)
- [Migration and deprecation for reclassified items](#migration-and-deprecation-for-reclassified-items)
- [Unbundling and "Utilities"](#unbundling-and-utilities)
- [Deliverables (code, Storybook, docs)](#deliverables-code-storybook-docs)

</details>

<!-- Document content (editable) -->

## Overview

**Scope: 1st-gen → 2nd-gen.** This guide applies when migrating or designing for 2nd-gen (where we can rethink placement). 1st-gen stays as-is: packages/ for components, tools/ for tools.

In 2nd-gen, the split is **Components** (user-facing UI with a design counterpart) vs **tools/utilities** (foundation, shared behavior, layout, build-time tooling)—an engineering convention, not Figma. See [1st-gen and 2nd-gen layout](#1st-gen-and-2nd-gen-layout) for where each type of code lives.

## Rule of thumb

- **Packages (Components)** — End-user-facing UI that has a design counterpart (e.g. in Figma or Spectrum design). Examples: Button, Card, Dialog, Textfield, Badge.
- **Tools / utilities** — Foundational or shared infrastructure that is **not** a design component: base classes, theme and tokens, layout utilities (e.g. grid), reactive controllers, build-time or design-token tooling. Examples: [Base](https://opensource.adobe.com/spectrum-web-components/tools/base/) (`SpectrumElement`), [Theme](https://opensource.adobe.com/spectrum-web-components/tools/theme/), [Grid](https://opensource.adobe.com/spectrum-web-components/tools/grid/), [Bundle](https://opensource.adobe.com/spectrum-web-components/tools/bundle/), reactive controllers, token packages.

## 1st-gen and 2nd-gen layout

- **1st-gen**  
  - **Components:** `1st-gen/packages/` → docs "Components" nav.  
  - **Tools:** `1st-gen/tools/` → docs "Tools" nav (base, grid, theme, bundle, shared, styles, reactive-controllers, etc.).  
- **2nd-gen**  
  - **Components:** Concrete components in `packages/swc/components/`; shared component base classes in `packages/core/components/`.  
  - **Non-component (tools/utilities):** Foundational code lives in `packages/core/` (element/, mixins/, controllers/, utils/, and components/ for base classes) and in `packages/swc/utils/` for SWC-specific helpers (e.g. a11y, test utils). Build-time and token tooling live in `packages/tools/`. For exact placement within core, see [packages/core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md).

## Abstraction targets (2nd-gen)

When reclassifying 1st-gen tools or tool-like components for 2nd-gen, prefer these lighter-weight abstractions instead of full custom-element packages:

| 1st-gen package / tool | 2nd-gen abstraction | Location / form |
| ---------------------- | ------------------- | ---------------- |
| **Asset** (or asset-like behavior) | SVG helper functions | `core/utils/` (e.g. shared helpers for rendering or processing SVG / asset content) |
| **Opacity-Checkerboard** | CSS utility class | Shared CSS (utility class only; no custom element) |
| **Grid** | CSS layout utilities | Shared CSS or layout utilities (e.g. layout tokens or utility classes) |
| **Truncated** | CSS utility + optional JS helper | CSS for truncation styling; optional small JS helper in `core/utils/` if dynamic behavior is needed |

## Migration and deprecation for reclassified items

When a 1st-gen **component** or **tool** is reclassified in 2nd-gen as a utility (e.g. CSS + helpers instead of a full package):

1. **Do not** migrate 1:1 as a new 2nd-gen component package. Implement the 2nd-gen side as the chosen abstraction (utils, CSS utilities, etc.) as in [Abstraction targets](#abstraction-targets-2nd-gen).

2. **1st-gen:** Keep the existing package supported until a deprecation path is agreed. When deprecating:
   - Add a deprecation notice in the 1st-gen package (e.g. in README and/or `package.json` deprecation field).
   - Document the 2nd-gen replacement (e.g. "Use the CSS utility in …" or "Use the helpers in `core/utils/…`").
   - Follow the project's deprecation and changelog process so consumers can plan migration.

3. **Docs and Storybook:** Update contributor and public docs to point to the new abstraction.

4. **Timeline:** Define deprecation timeline and any major-version plan in the same way as other 1st-gen deprecations (e.g. in RFCs, Jira, or project planning), so consumers know when to migrate.

## Unbundling and "Utilities"

In the future, we may revisit:

- Whether the current "Tools" category should be **unbundled** (smaller, more focused packages).
- Whether the category should be **renamed** (e.g. to "Utilities") for clarity.

The rule of thumb is unchanged: non-component code stays in the tools/utilities category (whatever we name it or how we unbundle). Use this guide when deciding where something lives.

## Deliverables (code, Storybook, docs)

- **Code** — Place code according to [1st-gen and 2nd-gen layout](#1st-gen-and-2nd-gen-layout). Do not add new 1st-gen-style top-level "tools" packages in 2nd-gen.
- **Storybook** — Tools with a visual or interactive aspect (e.g. theme, grid) can have stories; pure base classes or build-time tools typically do not need one.
- **Contributor docs** — This document is the contributor-facing process for evaluating tools vs packages in 2nd-gen.
