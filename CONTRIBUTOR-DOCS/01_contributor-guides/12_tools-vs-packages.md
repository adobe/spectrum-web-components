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
- [Abstraction targets (2nd-gen)](#abstraction-targets-2nd-gen)
- [Migration and deprecation for reclassified items](#migration-and-deprecation-for-reclassified-items)
- [Unbundling and "Utilities"](#unbundling-and-utilities)
- [Deliverables (code, Storybook, docs)](#deliverables-code-storybook-docs)

</details>

<!-- Document content (editable) -->

## Overview

**Scope: 1st-gen → 2nd-gen.** This guide applies when migrating or designing for **2nd-gen**, where we have the flexibility to rethink where code lives. We are not prescribing changes to 1st-gen layout; 1st-gen remains as-is (packages/ for components, tools/ for tools).

In 2nd-gen, the split is **Components** (user-facing UI with a design counterpart) vs **tools/utilities** (foundation, shared behavior, layout, build-time tooling). That split is not defined in Figma or design specs; it is an engineering and documentation convention. Where that non-component code lives in 2nd-gen—e.g. `core/element`, `core/mixins`, `core/controllers`, `core/utils`, `swc/utils`—is defined in [packages/core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md); this guide is consistent with it. This guide documents how we decide where new or migrated code belongs so that contributors and maintainers apply a consistent rule of thumb.

When bringing 1st-gen tools or tool-like components into 2nd-gen, we **do not** migrate them 1:1 as full component packages. Instead, we abstract them into simpler forms (e.g. helper functions, CSS utilities, layout utilities) that give the right abstraction level and avoid unnecessary custom elements where a lighter-weight solution suffices.

## Rule of thumb

- **Packages (Components)** — End-user-facing UI that has a design counterpart (e.g. in Figma or Spectrum design). If someone would drag a component onto a canvas in design tooling, it's a component. Examples: Button, Card, Dialog, Textfield, Badge.
- **Tools / utilities** — Foundational or shared infrastructure that is **not** a design component: base classes, theme and tokens, layout utilities (e.g. grid), reactive controllers, build-time or design-token tooling, and similar. These support components but are not components themselves. Examples: [Base](https://opensource.adobe.com/spectrum-web-components/tools/base/) (`SpectrumElement`), [Theme](https://opensource.adobe.com/spectrum-web-components/tools/theme/), [Grid](https://opensource.adobe.com/spectrum-web-components/tools/grid/), [Bundle](https://opensource.adobe.com/spectrum-web-components/tools/bundle/), reactive controllers, token packages.

Use this when adding or migrating code into 2nd-gen, or when discussing whether to unbundle or rename the "Tools" category (e.g. to "Utilities").

## Decision process

When evaluating where something should live:

1. **Is it a design component?**  
   Does it correspond to a discrete, user-facing UI element in Spectrum (Figma, design specs)?  
   - **Yes** → Put it in **packages** (Components): in 1st-gen that's `packages/`; in 2nd-gen that's `packages/swc/components/`.  
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
- **Location:** 1st-gen `packages/`; 2nd-gen `packages/swc/components/`.

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
  - **Components:** Concrete components in `packages/swc/components/`; shared component base classes in `packages/core/components/`.  
  - **Non-component (tools/utilities):** Foundational code lives in `packages/core/` (element/, mixins/, controllers/, utils/, and components/ for base classes) and in `packages/swc/utils/` for SWC-specific helpers (e.g. a11y, test utils). Build-time and token tooling live in `packages/tools/`.  
  - **Placement within core:** [packages/core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md) defines where to put migrated code by type; the rule of thumb in this guide aligns with that structure.

## Abstraction targets (2nd-gen)

When reclassifying 1st-gen tools or tool-like components for 2nd-gen, prefer these lighter-weight abstractions instead of full custom-element packages:

| 1st-gen package / tool | 2nd-gen abstraction | Location / form |
| ---------------------- | ------------------- | ---------------- |
| **Asset** (or asset-like behavior) | SVG helper functions | `core/utils/` (e.g. shared helpers for rendering or processing SVG / asset content) |
| **Opacity-Checkerboard** | CSS utility class | Shared CSS (utility class only; no custom element) |
| **Grid** | CSS layout utilities | Shared CSS or layout utilities (e.g. layout tokens or utility classes) |
| **Truncated** | CSS utility + optional JS helper | CSS for truncation styling; optional small JS helper in `core/utils/` if dynamic behavior is needed |

These are **targets to aim for** when designing 2nd-gen equivalents: the right abstraction level is a small utility or shared CSS, not a full component package, unless the use case clearly requires a custom element. Where the table says `core/utils/`, place the code in `packages/core/utils/` and follow [core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md) (e.g. utility functions → `utils/`).

## Migration and deprecation for reclassified items

When a 1st-gen **component** or **tool** is reclassified in 2nd-gen as a utility (e.g. CSS + helpers instead of a full package):

1. **Do not** migrate 1:1 as a new 2nd-gen component package. Implement the 2nd-gen side as the chosen abstraction (utils, CSS utilities, etc.) as in [Abstraction targets](#abstraction-targets-2nd-gen).

2. **1st-gen:** Keep the existing package supported until a deprecation path is agreed. When deprecating:
   - Add a deprecation notice in the 1st-gen package (e.g. in README and/or `package.json` deprecation field).
   - Document the 2nd-gen replacement (e.g. "Use the CSS utility in …" or "Use the helpers in `core/utils/…`").
   - Follow the project’s deprecation and changelog process so consumers can plan migration.

3. **Docs and Storybook:** Update contributor and public docs to point to the new abstraction. If the old item had Storybook stories, add guidance or examples that show the new pattern (e.g. a doc page or story that demonstrates the CSS utility or helper usage).

4. **Timeline:** Define deprecation timeline and any major-version plan in the same way as other 1st-gen deprecations (e.g. in RFCs, Jira, or project planning), so consumers know when to migrate.

This path applies whether the reclassified item was previously under Components or Tools in 1st-gen; the important part is that 2nd-gen exposes the **simpler abstraction** and 1st-gen is deprecated in a clear, documented way.

## Unbundling and "Utilities"

In the future, we may revisit:

- Whether the current "Tools" category should be **unbundled** (smaller, more focused packages).
- Whether the category should be **renamed** (e.g. to "Utilities") for clarity.

The **rule of thumb above does not change**: something that is not a design component stays in the non-component category (tools/utilities), whether that category is named "Tools" or "Utilities" and whether it is one package or many. Documentation and process for "where does this live?" should reference this guide and the decision process here.

## Deliverables (code, Storybook, docs)

- **Code (2nd-gen)** — Non-component code belongs in `packages/core/` (element/, mixins/, controllers/, utils/, or components/ for base classes — see [core/MIGRATION.md](../../../2nd-gen/packages/core/MIGRATION.md)), in `packages/swc/utils/` for SWC-specific helpers, or in `packages/tools/` for build-time/token tooling. Do not add new 1st-gen-style “tools” packages under a separate top-level tools folder in 2nd-gen.
- **Storybook** — Tools that have a visual or interactive aspect (e.g. theme, grid) can have Storybook stories under the Tools section when it helps explain usage; not every tool needs a story (e.g. pure base classes or build-time tools).
- **Contributor docs** — This document is the **contributor-facing process** for evaluating tools vs packages when working in 2nd-gen.