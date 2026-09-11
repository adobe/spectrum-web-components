# Migration guide

> **Note:** 1st-gen and 2nd-gen are **independent** — there is no runtime dependency between them. Code in 2nd-gen core is for 2nd-gen components only. 1st-gen has its own self-contained implementations.

When building 2nd-gen components (using 1st-gen as a reference), place files according to their type:

| Type                   | Location       | Examples                            |
| ---------------------- | -------------- | ----------------------------------- |
| Element infrastructure | `element/`     | `SpectrumElement`, `defineElement`  |
| Mixins                 | `mixins/`      | `SizedMixin`, `ObserveSlotPresence` |
| Reactive controllers   | `controllers/` | `FocusGroup`, `RovingTabindex`      |
| Utility functions      | `utils/`       | `getLabelFromSlot`, `capitalize`    |
| Component base classes | `components/`  | `Badge.base.ts`, `Asset.base.ts`    |

## Naming

- Use kebab-case for all new files (e.g., `sized-mixin.ts`, `focus-group.ts`)

## Component-specific code

Component-specific mixins should live alongside their component, unless multiple components depend on them:

- `mixins/` — when the behavior is generic
- `components/` — when specific to a component family
