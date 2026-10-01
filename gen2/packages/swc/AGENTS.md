# swc

`@adobe/spectrum-wc` — the rendering layer. Extends abstract base classes from `@adobe/spectrum-wc-core` and adds `render()`, CSS, element registration, Storybook stories, and tests.

## Structure

```text
swc/
├── components/        # One folder per component
│   └── badge/
│       ├── Badge.ts       # Concrete class — extends core base, adds render() and CSS
│       ├── badge.css      # Component styles (token-based)
│       ├── index.ts       # Class and type re-exports; does not register the element
│       ├── swc-badge.ts  # Element registration
│       ├── stories/
│       └── test/
├── stylesheets/       # Generated design tokens and typography (do not edit by hand)
├── utils/             # test-utils.ts, a11y-helpers.ts
└── .storybook/        # Storybook config, decorators, custom addons
```

Use [Badge](./components/badge/) as the reference implementation.

The package uses wildcard subpath exports for class barrels, direct class files (for subclassing), and `swc-*.js` registration modules. Prefer the barrel for class imports and the registration module for element use. Generated chunks and CSS-as-JS modules may also resolve through these wildcards, but they are not supported import paths. The package root has no export.

## Does NOT belong here

- Shared logic, validation, or lifecycle hooks — goes in the core base class
- Type definitions or const arrays — goes in `Component.types.ts` in core
- `abstract` class definitions — goes in core
- Anything 1st-gen also needs — goes in core

## Where to look next

- [`../core/AGENTS.md`](../core/AGENTS.md) — base classes and types
- [`../../AGENTS.md`](../../AGENTS.md) — gen2 overview
