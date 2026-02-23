<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Tools vs packages: where code lives

<!-- Document title (editable) -->

# Tools vs packages: where code lives

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Rule of thumb](#rule-of-thumb)
- [Decision process](#decision-process)
- [What counts as a component (packages)](#what-counts-as-a-component-packages)
- [What counts as a tool or utility](#what-counts-as-a-tool-or-utility)
- [1st-gen and 2nd-gen layout](#1st-gen-and-2nd-gen-layout)
- [Unbundling and "Utilities"](#unbundling-and-utilities)
- [Deliverables (code, Storybook, docs)](#deliverables-code-storybook-docs)

</details>

<!-- Document content (editable) -->

## Overview

In Spectrum Web Components, the public documentation and repo layout split content into **Components** (from `packages/`) and **Tools** (from `tools/` in 1st-gen, or `packages/tools/` in 2nd-gen). This split is **not** defined in Figma or design specs; it is an engineering and documentation convention. This guide documents how we decide where new or existing code belongs so that contributors and maintainers can apply a consistent rule of thumb.

## Rule of thumb

- **Packages (Components)** — End-user-facing UI that has a design counterpart (e.g. in Figma or Spectrum design). If someone would drag a component onto a canvas in design tooling, it's a component. Examples: Button, Card, Dialog, Textfield, Badge.
- **Tools / utilities** — Foundational or shared infrastructure that is **not** a design component: base classes, theme and tokens, layout utilities (e.g. grid), reactive controllers, build-time or design-token tooling, and similar. These support components but are not components themselves. Examples: [Base](https://opensource.adobe.com/spectrum-web-components/tools/base/) (`SpectrumElement`), [Theme](https://opensource.adobe.com/spectrum-web-components/tools/theme/), [Grid](https://opensource.adobe.com/spectrum-web-components/tools/grid/), [Bundle](https://opensource.adobe.com/spectrum-web-components/tools/bundle/), reactive controllers, token packages.

Use this when adding new code, moving code between 1st-gen and 2nd-gen, or when discussing whether to unbundle or rename the "Tools" category (e.g. to "Utilities").

## Decision process

When evaluating where something should live:

1. **Is it a design component?**  
   Does it correspond to a discrete, user-facing UI element in Spectrum (Figma, design specs)?  
   - **Yes** → Put it in **packages** (Components).  
   - **No** → Continue.

2. **Is it a base class, mixin, theme, or shared behavior?**  
   Does it exist mainly to be extended or composed by components, or to provide theme/tokens/direction?  
   - **Yes** → Treat as **tool/utility** (e.g. base, theme, shared, reactive controllers).

3. **Is it a layout or visual utility with no direct design component?**  
   Examples: grid, opacity checkerboard.  
   - **Yes** → **Tool/utility**.

4. **Is it build-time or design-token tooling?**  
   Examples: token processing, PostCSS plugins, VS Code token extension.  
   - **Yes** → **Tool/utility** (in 2nd-gen this lives under `packages/tools/`).

5. **Everything else**  
   If it's optional packaging (e.g. bundle that re-exports many components), treat as **tool/utility**.

This process is a **rule of thumb**, not a formal flowchart in Figma. When in doubt, discuss with the team and align on whether the item is "something we document as a component" vs "something we document as a tool/utility."

## What counts as a component (packages)

- Has a clear Spectrum design counterpart (Figma or equivalent).
- Is a single, named UI element that end users interact with or see (buttons, inputs, cards, dialogs, etc.).
- Typically has its own Storybook story under the Components section and is listed in the Components area of the docs site.

## What counts as a tool or utility

- **Base / foundation** — e.g. `SpectrumElement`, `SpectrumMixin` ([Base](https://opensource.adobe.com/spectrum-web-components/tools/base/)).
- **Theme and tokens** — theme wrapper, design tokens, core tokens.
- **Layout / visual helpers** — grid, opacity checkerboard; layout or alignment utilities that are not standalone design components.
- **Shared behavior** — reactive controllers, dependency manager, element resolution, roving tab index, etc.
- **Build and design-token tooling** — token packages, PostCSS plugins, VS Code extensions (e.g. in 2nd-gen `packages/tools/`).
- **Meta packaging** — bundle that aggregates many components for convenience.

## 1st-gen and 2nd-gen layout

- **1st-gen**  
  - **Components:** `1st-gen/packages/` → docs "Components" nav.  
  - **Tools:** `1st-gen/tools/` → docs "Tools" nav (base, grid, theme, bundle, shared, styles, reactive-controllers, etc.).  
  - The docs build uses path: content under `packages/` is "component," under `tools/` is "tool."

- **2nd-gen**  
  - **Components:** `2nd-gen/packages/swc/` (concrete components), with shared logic in `2nd-gen/packages/core/`.  
  - **Tools:** `2nd-gen/packages/tools/` (e.g. swc-tokens, postcss-token, swc-vscode-token).  
  - Base/theme-style foundation may live in `packages/core/` or equivalent rather than a separate "tools" folder; the same rule of thumb still applies (not a design component → treat as tool/utility for docs and naming).

## Unbundling and "Utilities"

In the future, we may revisit:

- Whether the current "Tools" category should be **unbundled** (smaller, more focused packages).
- Whether the category should be **renamed** (e.g. to "Utilities") for clarity.

The **rule of thumb above does not change**: something that is not a design component stays in the non-component category (tools/utilities), whether that category is named "Tools" or "Utilities" and whether it is one package or many. Documentation and process for "where does this live?" should reference this guide and the decision process here.

## Deliverables (code, Storybook, docs)

- **Code** — New or moved tools/utilities should live in the appropriate folder (`tools/` in 1st-gen, `packages/tools/` or equivalent in 2nd-gen) and follow existing patterns (e.g. base, theme, grid).
- **Storybook** — Tools that have a visual or interactive aspect (e.g. theme, grid) can have Storybook stories under the Tools section when it helps explain usage; not every tool needs a story (e.g. pure base classes or build-time tools).
- **Contributor docs** — This document is the **contributor-facing process** for evaluating tools vs packages. It is not in Figma; it lives in the repo and is linked from project planning (e.g. SWC-1486) and from [Working in the SWC repo](03_working-in-the-swc-repo.md#repository-structure).
