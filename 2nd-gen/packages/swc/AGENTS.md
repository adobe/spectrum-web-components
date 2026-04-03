# swc

`@adobe/spectrum-wc` — the rendering layer. Extends abstract base classes from `@spectrum-web-components/core` and adds `render()`, CSS, element registration, Storybook stories, and tests.

## Structure

```text
swc/
├── components/        # One folder per component
│   └── badge/
│       ├── Badge.ts       # Concrete class — extends core base, adds render() and CSS
│       ├── badge.css      # Component styles (token-based)
│       ├── index.ts       # Element registration and re-exports
│       ├── stories/
│       └── test/
├── stylesheets/       # Generated design tokens and typography (do not edit by hand)
├── utils/             # test-utils.ts, a11y-helpers.ts
└── .storybook/        # Storybook config, decorators, custom addons
```

Use [Badge](./components/badge/) as the reference implementation.

## Does NOT belong here

- Shared logic, validation, or lifecycle hooks — goes in the core base class
- Type definitions or const arrays — goes in `Component.types.ts` in core
- `abstract` class definitions — goes in core
- Anything 1st-gen also needs — goes in core

## Where to look next

- [`../core/AGENTS.md`](../core/AGENTS.md) — base classes and types
- [`../../AGENTS.md`](../../AGENTS.md) — 2nd-gen overview
