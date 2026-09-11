# 1st-gen/packages

69 component packages and 9 shared tool packages. Components live in `packages/`; shared behavior and utilities live in `tools/` — check there before writing new code.

## Structure

```text
packages/
├── accordion/    # Component packages (alphabetical)
├── badge/
├── button/
└── ...           # 69 total

tools/
├── base/                  # SpectrumElement, SizedMixin, Lit re-exports
├── shared/                # Focusable, ObserveSlot*, LikeAnchor, DOM utilities
├── reactive-controllers/  # FocusGroup, RovingTabindex, PendingState, ...
├── styles/                # Global Spectrum tokens and CSS
└── theme/                 # sp-theme provider
```

Each component follows the same layout: `src/<ComponentName>.ts`, `sp-<name>.ts` (registration), `stories/`, `test/`, `package.json`.

## Where to look next

- [`../AGENTS.md`](../AGENTS.md) — 1st-gen overview and deprecation context
- [`../tools/AGENTS.md`](../tools/AGENTS.md) — shared tool packages
