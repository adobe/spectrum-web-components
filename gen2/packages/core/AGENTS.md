# core

`@adobe/spectrum-wc-core` — abstract base classes, mixins, types, and utilities shared by both 1st-gen and gen2. No rendering, no CSS, no element registration.

## Structure

```text
core/
├── element.ts     # Barrel for element/ (imported as `@adobe/spectrum-wc-core/element.js`)
├── element/       # SpectrumElement base class, defineElement, version tracking
├── mixins/        # SizedMixin, PendingMixin, LinearProgressMixin
├── controllers/   # LanguageResolutionController, PlacementController, SlotPresenceController, SlotTextController, …
├── utils/         # capitalize, getLabelFromSlot
├── tools/         # build-time helpers, not built or published (icons/: shared icon generator helpers)
└── components/    # One folder per component
    ├── badge.ts     # Barrel: re-exports the base class and types
    └── badge/
        ├── Badge.base.ts    # Abstract base class — logic only, no render()
        └── Badge.types.ts   # Const arrays, enums, TypeScript types
```

Barrels are sibling `<name>.ts` files, not `<name>/index.ts`, so every public import path ends in `.js` (for example `@adobe/spectrum-wc-core/components/badge.js`). The `package.json` exports list each barrel explicitly; when you add a barrel, add a matching `./<path>.js` entry.

Use [Badge](./components/badge/) as the reference implementation.

## Does NOT belong here

- `render()` — goes in the SWC concrete class
- CSS / `static get styles()` — goes in SWC
- `customElements.define()` / `defineElement()` — goes in the SWC `swc-<tag>.ts` registration module
- S2-only props — goes in SWC with a `@todo` to move to base once 1st-gen is removed

## Where to look next

- [`../swc/AGENTS.md`](../swc/AGENTS.md) — rendering layer
- [`../../AGENTS.md`](../../AGENTS.md) — gen2 overview
