<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Tools vs packages: where code lives

<!-- Document title (editable) -->

# Tools vs packages: where code lives

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Decision process](#decision-process)
- [2nd-gen layout](#2nd-gen-layout)
- [Abstraction targets (2nd-gen)](#abstraction-targets-2nd-gen)
- [Migration and deprecation for reclassified items](#migration-and-deprecation-for-reclassified-items)
- [Deliverables (code, Storybook, docs)](#deliverables-code-storybook-docs)

</details>

<!-- Document content (editable) -->

## Overview

**Scope: 1st-gen → 2nd-gen.** This guide applies when migrating or designing for 2nd-gen (where we can rethink placement). 1st-gen stays as-is: packages/ for components, tools/ for tools.

Not everything falls neatly into "component" or "tool"—the deciding factor is whether code depends on the rendering layer (Spectrum styles, theming). The [decision process](#decision-process) below replaces the old binary split.

## Decision process

When deciding where something lives in 2nd-gen, ask: **does it depend on the rendering layer?**

| Category | Rendering-layer dependent? | Web component? | Code location | Docs category | Examples |
|----------|---------------------------|----------------|---------------|---------------|----------|
| **UI-less artifact** | No (same in S1 and S2) | No | `core/` | Tools/Utilities | Reactive controllers, grid logic, truncation logic, pure utility functions, DnD engine |
| **Design component** | Yes | Yes | `swc/components/` | Components | Button, Card, Dialog, Badge |
| **UI artifact (WC, not a design component)** | Yes (theme-dependent) | Yes | `swc/components/` (recategorize in docs) | Tools/Utilities | `sp-asset` |
| **UI artifact (non-WC)** | Yes (style/token dependent) | No | `swc/utils/`, `swc/stylesheets/`, or `swc/shared/` | Tools/Utilities | CSS utilities, typography classes, opacity checkerboard, token/style helpers |
| **Build-time tooling** | No | No | `tools/` | Tools/Utilities | PostCSS plugins, token packages, VS Code extension |

The key distinction: **UI-less** code goes in `core/` (it works the same regardless of Spectrum version); **UI** code that depends on Spectrum styles goes in `swc/` (even if it's a utility, not a design component).

For placement within `core/`, see [packages/core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md).

## 2nd-gen layout

- **`core/`** — UI-less foundational code: element/, mixins/, controllers/, utils/, and components/ for base classes. No rendering-layer dependency.
- **`swc/components/`** — All web components we ship, including both design components (Button, Card) and infrastructure WCs (`sp-asset`). Code location reflects what it *is*; docs categorization reflects how consumers *think about it*.
- **`swc/stylesheets/`** — Global CSS shipped outside of any web component: token imports (`tokens.css`), base application styles (`swc.css`), and typography classes (`typography.css`). These are rendering-layer dependent but not tied to a single component.
- **`swc/shared/`** — Shared rendering-layer-dependent code that is reused across multiple SWC components but is not a standalone component or stylesheet (e.g. shared templates, lit directives, or style fragments). *(Planned — does not exist on disk yet.)*
- **`swc/utils/`** — SWC-specific helper modules: test utilities, a11y helpers, and other non-component JS/TS that depends on the rendering layer.
- **`tools/`** — Build-time and design-token tooling (swc-tokens, postcss-token, swc-vscode-token).

## Abstraction targets (2nd-gen)

When reclassifying 1st-gen tools or tool-like components for 2nd-gen, use the [decision process](#decision-process) to determine the category, then target the appropriate abstraction:

| 1st-gen package / tool | 2nd-gen abstraction | Location / form |
| ---------------------- | ------------------- | ---------------- |
| **Asset** | Web component (unchanged) | Remains in `components/`; recategorize under Tools/Utilities in docs since it is not a Spectrum design component |
| **Opacity-Checkerboard** | CSS utility class | Shared CSS (utility class only; no custom element) |
| **Grid** | CSS layout utilities | Shared CSS or layout utilities (e.g. layout tokens or utility classes) |
| **Truncated** | CSS utility + optional JS helper | CSS for truncation styling; optional small JS helper in `core/utils/` if dynamic behavior is needed |

## Migration and deprecation for reclassified items

When a 1st-gen **component** or **tool** is reclassified in 2nd-gen as a utility (e.g. CSS + helpers instead of a full package):

1. **Do not** migrate 1:1 as a new 2nd-gen component package. Implement the 2nd-gen side as the chosen abstraction (utils, CSS utilities, etc.) as in [Abstraction targets](#abstraction-targets-2nd-gen).

2. **1st-gen:** Keep the existing package supported until a deprecation path is agreed. When deprecating:
   - Add a deprecation notice in the 1st-gen package (e.g. in README and/or `package.json` deprecation field).
   - Document the 2nd-gen replacement. Note that not all utilities belong in `core/`—if the utility depends on the rendering layer or carries Spectrum 2 styles (e.g. a reclassified `swc-asset`), it may live in `swc/utils/` instead of `core/utils/`.
   - Follow the project's deprecation and changelog process so consumers can plan migration.

3. **Docs and Storybook:** Update contributor and public docs to point to the new abstraction.

4. **Timeline:** Define deprecation timeline and any major-version plan in the same way as other 1st-gen deprecations (e.g. in RFCs, Jira, or project planning), so consumers know when to migrate.

## Deliverables (code, Storybook, docs)

- **Code** — Place code according to [2nd-gen layout](#2nd-gen-layout). Do not add new 1st-gen-style top-level "tools" packages in 2nd-gen.
- **Storybook** — Tools with a visual or interactive aspect (e.g. theme, grid) can have stories; pure base classes or build-time tools typically do not need one.
- **Contributor docs** — This document is the contributor-facing process for evaluating tools vs packages in 2nd-gen.
