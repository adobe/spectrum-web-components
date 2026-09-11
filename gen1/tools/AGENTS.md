# gen1/tools

Shared packages used by all gen1 components. Before writing any new utility, mixin, or controller, check here first — the pattern likely already exists.

## Packages

| Package                | Purpose                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| `base`                 | `SpectrumElement`, `SizedMixin`, Lit re-exports, decorators          |
| `bundle`               | Meta-package re-exporting all gen1 components for prototyping     |
| `grid`                 | `sp-grid` — Spectrum grid layout component                           |
| `opacity-checkerboard` | CSS utility for checkerboard transparency background                 |
| `reactive-controllers` | `FocusGroup`, `RovingTabindex`, `PendingState`, `ColorController`, … |
| `shared`               | `Focusable`, `ObserveSlot*`, `LikeAnchor`, DOM utilities             |
| `styles`               | Global Spectrum design tokens as CSS                                 |
| `theme`                | `sp-theme` — the theming provider custom element                     |
| `truncated`            | `sp-truncated` — text truncation with ellipsis                       |

## Where to look next

- [`../AGENTS.md`](../AGENTS.md) — gen1 overview
- [`../packages/AGENTS.md`](../packages/AGENTS.md) — component packages
