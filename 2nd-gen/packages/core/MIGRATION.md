# Core migration map (1st‑gen → 2nd‑gen)

This document tracks 1st‑gen items and where they should land in the 2nd‑gen `@spectrum-web-components/core` structure.

## Base classes and mixins

- `tools/base/Base.ts` → `core/element/spectrum-element.ts`
- `tools/base/define-element.ts` → `core/element/define-element.ts`
- `tools/base/sizedMixin.ts` → `core/mixins/sized-mixin.ts`
- `tools/base/SpectrumMixin` → `core/element/spectrum-element.ts`

## Shared mixins

- `tools/shared/focusable.ts` → `core/mixins/focusable.ts`
- `tools/shared/like-anchor.ts` → `core/mixins/like-anchor.ts`
- `tools/shared/observe-slot-presence.ts` → `core/mixins/observe-slot-presence.ts` ✅ (also available via `core/utils/` for backward compatibility)
- `tools/shared/observe-slot-text.ts` → `core/mixins/observe-slot-text.ts` ✅ (also available via `core/utils/` for backward compatibility)
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

## Items not yet mapped

The following 1st-gen items are not yet mapped. Evaluate when needed:

### From `tools/base/`

- `async-directive.ts`
- `condition-attribute-with-id.ts`
- `constants.ts`
- `decorators.ts`
- `directive.ts`
- `directives.ts`
- `html.ts`
- `streaming-listener.ts`

### From `tools/shared/`

- `first-focusable-in.ts`
- `focus-visible.ts`
- `focusable-selectors.ts`
- `random-id.ts`

## Notes

- The `shared/` directory contains current implementations; 1st-gen re-exports from here.
- Prefer kebab-case file names for all new files in `core/`.
- When moving code, update exports so that both the new path and any required legacy path remain available during transition.
- Slot-observation mixins (`ObserveSlotPresence`, `ObserveSlotText`) are available from both `core/mixins/` (preferred) and `core/utils/`.
