# 1st-gen/tools

Shared packages used by all 1st-gen components. Before writing any new utility, mixin, or controller, check here first — the pattern likely already exists.

## Packages

| Package                | Purpose                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `base`                 | `SpectrumElement`, `SizedMixin`, Lit re-exports, decorators          |
| `shared`               | `Focusable`, `ObserveSlot*`, `LikeAnchor`, DOM utilities             |
| `reactive-controllers` | `FocusGroup`, `RovingTabindex`, `PendingState`, `ColorController`, … |
| `styles`               | Global Spectrum design tokens as CSS                                 |
| `theme`                | `sp-theme` — the theming provider custom element                     |

## Where to look next

- [`../AGENTS.md`](../AGENTS.md) — 1st-gen overview
- [`../packages/AGENTS.md`](../packages/AGENTS.md) — component packages
