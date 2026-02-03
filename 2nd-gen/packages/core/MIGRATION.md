# Core migration map (1st‑gen → 2nd‑gen)

This document tracks 1st‑gen items and where they should land in the 2nd‑gen `@spectrum-web-components/core` structure.

## Base classes and mixins

- `tools/base/Base.ts` → `core/base/spectrum-element.ts`
- `tools/base/define-element.ts` → `core/base/define-element.ts`
- `tools/base/sizedMixin.ts` → `core/mixins/sized-mixin.ts`
- `tools/base/SpectrumMixin` → `core/base/spectrum-element.ts`

## Shared mixins

- `tools/shared/focusable.ts` → `core/mixins/focusable.ts`
- `tools/shared/like-anchor.ts` → `core/mixins/like-anchor.ts`
- `tools/shared/observe-slot-presence.ts` → `core/mixins/observe-slot-presence.ts` (or `core/utils/observe-slot-presence.ts` if kept as a utility)
- `tools/shared/observe-slot-text.ts` → `core/mixins/observe-slot-text.ts` (or `core/utils/observe-slot-text.ts` if kept as a utility)
- `tools/shared/focus-visible-polyfill.ts` → `core/mixins/focus-visible-polyfill.ts`

## Utilities

- `tools/shared/get-active-element.ts` → `core/utils/get-active-element.ts`
- `tools/shared/get-deep-element-from-point.ts` → `core/utils/get-deep-element-from-point.ts`
- `tools/shared/get-label-from-slot.ts` → `core/utils/get-label-from-slot.ts`
- `tools/shared/platform.ts` → `core/utils/platform.ts`
- `tools/shared/reparent-children.ts` → `core/utils/reparent-children.ts`

## Reactive controllers

- `tools/reactive-controllers/ColorController.ts` → `core/controllers/color-controller.ts`
- `tools/reactive-controllers/DependencyManager.ts` → `core/controllers/dependency-manager.ts`
- `tools/reactive-controllers/ElementResolution.ts` → `core/controllers/element-resolution.ts`
- `tools/reactive-controllers/FocusGroup.ts` → `core/controllers/focus-group.ts`
- `tools/reactive-controllers/LanguageResolution.ts` → `core/controllers/language-resolution.ts`
- `tools/reactive-controllers/MatchMedia.ts` → `core/controllers/match-media.ts`
- `tools/reactive-controllers/PendingState.ts` → `core/controllers/pending-state.ts`
- `tools/reactive-controllers/RovingTabindex.ts` → `core/controllers/roving-tabindex.ts`
- `tools/reactive-controllers/SystemContextResolution.ts` → `core/controllers/system-context-resolution.ts`

## Component-specific shared code

Component-specific mixins should live alongside their component, unless multiple components depend on them. If shared, place them in:

- `core/mixins/` when the behavior is generic
- `core/components/` when the behavior is specific to a family of components

## Notes

- Keep the `shared/` directory as a compatibility layer until all internal imports have migrated to the new top-level folders.
- Prefer kebab-case file names for all new files in `core/`.
- When moving code, update exports so that both the new path and any required legacy path remain available during transition.
