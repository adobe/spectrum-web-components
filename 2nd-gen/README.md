# Spectrum Web Components — Second Generation

This workspace contains the second generation of Spectrum Web Components (SWC), built on Spectrum 2 design tokens with modern tooling and architecture.

## Packages

- **[@spectrum-web-components/core](./packages/core)** — abstract base classes providing behavior and API for 2nd-gen components
- **[@adobe/spectrum-wc](./packages/swc)** — concrete component implementations with styling

## Documentation

- **[Get started (for consumers)](../CONTRIBUTOR-DOCS/for-consumers/get-started.md)** — install and render your first component. The same content renders interactively under **Get started** in Storybook.
- **[Contributor docs](../CONTRIBUTOR-DOCS/README.md)** — architecture, development workflows, migration guides, and project planning.

## Local development

```bash
# From the repository root
yarn install
yarn build
yarn storybook
```
