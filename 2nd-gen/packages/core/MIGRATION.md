# Migration guide

When migrating functionality from 1st-gen to 2nd-gen `@spectrum-web-components/core`, place files according to their type:

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

## 1st-gen → 2nd-gen file map

Tracks what moved, where it landed, and any changes made during the move.

### Mixins

| 1st-gen source                              | 2nd-gen core                      | Notes                                                                  |
| ------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `tools/shared/src/focusable.ts`             | `mixins/focusable.ts`             | Extends `SpectrumElement` directly (drops `FocusVisiblePolyfillMixin`) |
| `tools/shared/src/observe-slot-presence.ts` | `mixins/observe-slot-presence.ts` |                                                                        |
| `tools/shared/src/observe-slot-text.ts`     | `mixins/observe-slot-text.ts`     |                                                                        |
| _(various packages)_                        | `mixins/sized-mixin.ts`           |                                                                        |

#### Not moved

| 1st-gen source                        | Reason                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `tools/shared/src/focus-visible.ts`   | Polyfill shim — modern browsers support `:focus-visible` natively. No longer needed in 2nd-gen.                                             |
| `tools/shared/src/like-anchor.ts`     | Mixin removed. Anchor-like properties (`href`, `target`, etc.) will be added directly to components that need them, reducing one abstraction layer. |
| `tools/shared/src/get-active-element.ts`      | Only used by a single component — inline where needed rather than shared.                                                                       |
| `tools/shared/src/get-deep-element-from-point.ts` | Only used by overlay — inline in the component when overlay is migrated.                                                                   |
| `tools/shared/src/reparent-children.ts`       | Only used by overlay — inline in the component when overlay is migrated.                                                                        |

### Utils

| 1st-gen source                                    | 2nd-gen core                           | Notes                                          |
| ------------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `tools/shared/src/focusable-selectors.ts`         | `utils/focus-utils.ts`                 | Typo fix: `userFocuable` → `userFocusable`     |
| `tools/shared/src/first-focusable-in.ts`          | `utils/focus-utils.ts`                 | Consolidated with focusable selectors          |
| `tools/shared/src/get-label-from-slot.ts`         | `utils/get-label-from-slot.ts`         |                                                |
| `tools/shared/src/platform.ts`                    | `utils/platform.ts`                    |                                                |
| `tools/shared/src/random-id.ts`                   | `utils/random-id.ts`                   |                                                |
| _(n/a)_                                           | `utils/capitalize.ts`                  | New in 2nd-gen                                 |

### Controllers

| 1st-gen source | 2nd-gen core | Notes |
|---|---|---|
| `tools/reactive-controllers/src/ColorController.ts` | `controllers/color-controller.ts` | `ColorController`, `Color`, `ColorTypes` |
| `tools/reactive-controllers/src/DependencyManger.ts` | `controllers/dependency-manager.ts` | Fixed filename typo: `Manger` → `Manager` |
| `tools/reactive-controllers/src/ElementResolution.ts` | `controllers/element-resolution.ts` | `ElementResolutionController`, `elementResolverUpdatedSymbol` |
| `tools/reactive-controllers/src/LanguageResolution.ts` | `controllers/language-resolution.ts` | |
| `tools/reactive-controllers/src/MatchMedia.ts` | `controllers/match-media.ts` | `MatchMediaController`, `DARK_MODE`, `IS_MOBILE`, `IS_TOUCH_DEVICE` |

#### Not moved

| 1st-gen source | Reason |
|---|---|
| `tools/reactive-controllers/src/PendingState.ts` | Has a `progress-circle` component dependency and little value as shared code — prefer inlining where needed. |
| `tools/reactive-controllers/src/SystemContextResolution.ts` | No longer needed in 2nd-gen — `sp-theme` context resolution is removed. |

### Element

| 1st-gen source  | 2nd-gen core                  | Notes                              |
| --------------- | ----------------------------- | ---------------------------------- |
| `packages/base` | `element/spectrum-element.ts` | `SpectrumElement`, `SpectrumMixin` |
| _(n/a)_         | `element/define-element.ts`   | New in 2nd-gen                     |
