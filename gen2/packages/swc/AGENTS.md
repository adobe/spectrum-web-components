# swc

`@adobe/spectrum-wc` — the rendering layer. Extends abstract base classes from `@adobe/spectrum-wc-core` and adds `render()`, CSS, element registration, Storybook stories, and tests.

## Structure

```text
swc/
├── components/        # One folder per component
│   └── badge/
│       ├── Badge.ts       # Concrete class — extends core base, adds render() and CSS
│       ├── badge.css      # Component styles (token-based)
│       ├── index.ts       # Re-exports the class
│       ├── swc-badge.ts   # Registers <swc-badge> and its dependencies
│       ├── stories/
│       └── test/
├── stylesheets/       # Generated design tokens and typography (do not edit by hand)
├── utils/             # test-utils.ts, a11y-helpers.ts
└── .storybook/        # Storybook config, decorators, custom addons
```

Use [Badge](./components/badge/) as the reference implementation.

## Element registration

The concrete class declares `static tagName`. If it renders other SWC elements in its shadow root or needs child elements to work, it lists their classes in `static dependencies`. `swc-<tag>.ts` registers the class and its dependencies with `Component.define()`. Component modules never import another component's `swc-*.js` file; ESLint reports it. See [Element registration](../../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/01_file-organization.md#element-registration).

## Does NOT belong here

- Shared logic, validation, or lifecycle hooks — goes in the core base class
- Type definitions or const arrays — goes in `Component.types.ts` in core
- `abstract` class definitions — goes in core
- Anything 1st-gen also needs — goes in core

## Where to look next

- [`../core/AGENTS.md`](../core/AGENTS.md) — base classes and types
- [`../../AGENTS.md`](../../AGENTS.md) — gen2 overview
