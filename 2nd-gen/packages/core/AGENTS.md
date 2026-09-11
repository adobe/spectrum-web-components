# core

`@adobe/spectrum-wc-core` — abstract base classes, mixins, types, and utilities shared by both gen1 and 2nd-gen. No rendering, no CSS, no element registration.

## Structure

```text
core/
├── element/       # SpectrumElement base class, defineElement, version tracking
├── mixins/        # SizedMixin, PendingMixin, LinearProgressMixin
├── controllers/   # LanguageResolutionController, PlacementController, SlotPresenceController, SlotTextController, …
├── utils/         # capitalize, getLabelFromSlot
└── components/    # One folder per component
    └── badge/
        ├── Badge.base.ts    # Abstract base class — logic only, no render()
        ├── Badge.types.ts   # Const arrays, enums, TypeScript types
        └── index.ts
```

Use [Badge](./components/badge/) as the reference implementation.

## Does NOT belong here

- `render()` — goes in the SWC concrete class
- CSS / `static get styles()` — goes in SWC
- `customElements.define()` / `defineElement()` — goes in SWC `index.ts`
- S2-only props — goes in SWC with a `@todo` to move to base once gen1 is removed

## Where to look next

- [`../swc/AGENTS.md`](../swc/AGENTS.md) — rendering layer
- [`../../AGENTS.md`](../../AGENTS.md) — 2nd-gen overview
