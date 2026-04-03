# 1st-Gen Projects — Agent Guide

Supporting workspaces that are not components and are not published as part of the component library. These exist to support development, documentation, and testing infrastructure.

Do not look here for component logic or shared utilities — those live in `packages/` and `tools/` respectively.

---

## Workspaces

### `css-custom-vars-viewer`

An interactive browser tool for inspecting and exploring CSS custom properties defined in Spectrum tokens. Useful for understanding what token values are available and how they change across themes and scales.

### `documentation`

The documentation site generator. Contains the source for the component documentation site, including usage examples, API references, and contributor guides. Not the same as Storybook — this is the public-facing docs output.

### `story-decorator`

Storybook decorator components used to wrap stories with theme providers, layout helpers, and other context needed for stories to render correctly. If a story needs a specific wrapping context (e.g. `sp-theme`, specific layout), the decorator likely already provides it.

### `templates`

Starter templates for creating new components or projects using 1st-gen Spectrum Web Components.

### `types`

Shared TypeScript type definitions used across multiple packages that don't belong to any single component or tool.

### `vrt-compare`

Visual regression testing (VRT) tooling. Provides the comparison infrastructure for diffing baseline screenshots against current output. Used in CI to catch unintended visual changes.
