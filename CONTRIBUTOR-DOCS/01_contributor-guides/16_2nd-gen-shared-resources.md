<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / 2nd-gen shared resources quick reference

<!-- Document title (editable) -->

# 2nd-gen shared resources quick reference

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Controllers](#controllers)
- [Mixins](#mixins)
- [Utilities](#utilities)
- [Directives](#directives)
- [Base class and dev-mode warnings](#base-class-and-dev-mode-warnings)
- [Not yet adopted](#not-yet-adopted)
- [Patterns (`swc/patterns/conversational-ai`)](#patterns-swcpatternsconversational-ai)
- [Attribute and slot vocabulary](#attribute-and-slot-vocabulary)
- [Where to go deeper](#where-to-go-deeper)

</details>

<!-- Document content (editable) -->

## Overview

Index of shared, reusable resources in 2nd-gen: controllers, mixins, utilities, and directives in `@adobe/spectrum-wc-core`, plus a few sibling-package helpers. For each one: what it does and who currently uses it. Check here before writing new logic that a controller, mixin, or utility may already cover.

> **Scope:** `2nd-gen/packages/core` (controllers, mixins, utils, directives, element) and its consumers: components in `2nd-gen/packages/swc/components`, and patterns in `2nd-gen/packages/swc/patterns/conversational-ai`. Test-only tooling is out of scope; see [2nd gen testing](11_2ndgen_testing.md). Update "used by" as adoption changes.
>
> ⚠️ **Important:** Composition happens at two layers. Most controllers/mixins are applied on the shared abstract `*Base` class in `core/components/*` and inherited by every concrete element. A few (`PendingMixin`) are applied one layer up, directly on the concrete element in `swc/components/*` (e.g. `Button extends PendingMixin(ButtonBase)`). Check both layers before concluding something isn't in use.

## Controllers

| Controller | What it does | Used by |
|---|---|---|
| `PlacementController` | Floating UI-based positioning (flip, shift, arrow, size) for anchored surfaces | `tooltip`, `popover` |
| `HoverController` | Hover and keyboard-focus wiring for native-Popover-API triggers | `tooltip` |
| `FocusgroupNavigationController` | Roving-tabindex arrow key navigation for composite widgets ([Open UI `focusgroup`](https://open-ui.org/components/focusgroup.explainer/)-aligned). See [Focus management](14_focus-management.md) | `tabs`, `message-feedback`, `conversation-thread` |
| `SlotAttributePropagationController` | Propagates a host attribute (e.g. `size`) to slotted children | `card`, `dropzone`, `illustrated-message`, `button-group` |
| `SlotPresenceController` | Observes whether slotted content matching a selector is present | `button`, `action-button`, `badge`, `accordion` |
| `SlotTextController` | Observes whether a slot has meaningful text/element content | `card`, `button`, `action-button`, `illustrated-message`, `badge` |
| `LiveSelectionController` | Coordinates single/multiple selection across event-dispatching children | `accordion` |
| `PageScrollLockController` | Reference-counted page scroll lock for stacked blocking surfaces | `popover` |
| `PendingController` | Delayed busy-state activation, size freeze, pending accessible name | `button`, `action-button` (via `PendingMixin`) |
| `LanguageResolutionController` | Resolves locale (from `<html lang>`, `navigator.language`, or a language-provider event) for formatting. See [Controller composition](../02_style-guide/02_typescript/14_controller-composition.md#languageresolutioncontroller) | `progress-circle`; also `progress-bar`, `meter` (via `LinearProgressMixin`) |
| `ColorController` | `colorjs.io` conversion wrapper | none |

## Mixins

| Mixin | What it does | Used by |
|---|---|---|
| `SizedMixin` | Reactive `size` property with per-component valid-size enforcement | `button`, `button-group`, `badge`, `card`, `accordion`, `status-light`, `divider`, `dropzone`, `icon`, `infield-button`, `meter`, `progress-bar`, `progress-circle` |
| `LinearProgressMixin` | Shared value/label/percent-format logic for linear-progress components | `progress-bar`, `meter` |
| `PendingMixin` | `pending`/`pending-label` properties, click suppression, built on `PendingController` | `button`, `action-button` |
| `DisabledMixin` | Reactive `disabled` with `aria-disabled` (not native `disabled`), tabindex/blur handling. See [Focus management](14_focus-management.md#disabledmixin) | none (`button` still hand-rolls `disabled`) |

## Utilities

| Utility | What it does | Used by |
|---|---|---|
| `resolveTrigger()` | Resolves `for` ID / `triggerElement` to a trigger, and its AT-facing inner `<button>` across shadow boundaries | `tooltip`, `popover` |
| `getActiveElement()` | Deepest focused element, across shadow boundaries | `popover`, `conversation-thread` |
| `deepContains()` | Shadow-piercing containment check | `popover`, `prompt-field` |
| `registerDismissible()` / `unregisterDismissible()` / `isTopDismissible()` (`dismissibleStack`) | LIFO stack coordinating Escape handling across top-layer mechanisms | `popover` |
| `warnIf()`, `validateEnum()` | Batched, deduped dev-mode warning framework (see below and [Debug and validation](../02_style-guide/02_typescript/17_debug-validation.md)) | 10+ components, `prompt-field`, `pixel-loader` |
| `focusableSelector` | Spec-based focusable-element selector. See [Focus management](14_focus-management.md#focusableselector-and-tabbableselector) | `prompt-field` |
| `tabbableSelector` | Spec-based tabbable-element selector | none |
| `isFocusVisibleInTree()` | `:focus-visible` check across shadow roots | none |
| `getLabelFromSlot()` | Derives a text label from slotted content | `upload-artifact` |
| `validateRequiredSlot()`, `validateAllowedChildren()` | Dev-mode structural validation | `validateAllowedChildren`: 1 component |
| `isDebug()` | Whether dev mode is active (the gate `warnIf`/`validateEnum` build on) | `progress-circle`, `card`, `dropzone`; also `progress-bar`, `meter` (via `LinearProgressMixin`) |
| `capitalize()` | Capitalizes first character of a string | `progress-circle`, `divider` |
| `physicalSide()` | Drops alignment suffix from a placement (`bottom-start` to `bottom`) | `popover` |
| `runAfterTransition()` | Runs a callback once an element's CSS transition settles (or synchronously if none will run); built on `hasActiveTransition()`/`maxTransitionDurationMs()` in the same file | `popover` |
| `uniqueId()` (`swc/utils/id.ts`, not `core`) | Collision-resistant component ID generation | `prompt-field`, `suggestion`, `response-status`, `message-sources` |

## Directives

| Directive | What it does | Used by |
|---|---|---|
| `renderPendingSpinner` | Renders the busy-state spinner; called via `PendingController.renderPendingState()` | `button`, `action-button` |

## Base class and dev-mode warnings

`SpectrumElement` is a minimal `LitElement` subclass (`VERSION`/`CORE_VERSION` only). Focus, sizing, disabled, and pending state are opt-in composition, not inheritance. See [Focus management](14_focus-management.md#overview).

`window.__swc.warn` batches and dedupes dev-mode warnings per microtask. `warnIf()` and `validateEnum()` are its public entry points; see [Debug and validation](../02_style-guide/02_typescript/17_debug-validation.md) for the full API and conventions.

## Not yet adopted

Exist in `core` (or a sibling utils location) with no current consumer:

- `DisabledMixin`
- `ColorController`
- `isFocusVisibleInTree()`
- `tabbableSelector`

## Patterns (`swc/patterns/conversational-ai`)

Patterns build directly on core resources and on components, not on their own `*Base` class.

| Pattern | Core/utils used | Components embedded |
|---|---|---|
| `prompt-field` | `deepContains()`, `focusableSelector`, `warnIf()`, `uniqueId()` | `action-button`, `icon` |
| `upload-artifact` | `getLabelFromSlot()` | `action-button`, `icon` |
| `message-feedback` | `FocusgroupNavigationController` | `icon` |
| `response-status` | `uniqueId()` | `icon` |
| `message-sources` | `uniqueId()` | `icon` |
| `suggestion` (`SuggestionGroup`) | `uniqueId()` | — |
| `suggestion-item` | — | `icon` |
| `conversation-thread` | `FocusgroupNavigationController`, `getActiveElement()` | — |
| `pixel-loader` | `validateEnum()` | — |

`prompt-field` has the widest dependency surface. Check its stories when changing `action-button`, `icon`, `FocusgroupNavigationController`, `deepContains()`, or the dev-validation utilities.

## Attribute and slot vocabulary

**Attributes:**

- **`size`**: reactive enum (`xxs`–`xxl`, narrowed per component) via `SizedMixin`.
- **`variant`**: semantic style variant, meaning is component-specific (`tooltip`'s `neutral`, `meter`'s `informative`, `card`'s `primary`).
- **`disabled`**: should signal via `aria-disabled` per `DisabledMixin` (see [Focus management](14_focus-management.md#why-aria-disabled)); not all components migrated yet.
- **`quiet`**: reduced-emphasis visual treatment.
- **`density`**: spacing/compactness.
- **`static-color`**: fixed `white`/`black` rendering regardless of theme.
- **`for`**: ID reference to a trigger element, resolved via `resolveTrigger()` (`tooltip`, `popover`).
- **`placement`**: anchored-position side/alignment, consumed by `PlacementController`.

**Slots:**

- **`icon`**: most common named slot; presence via `SlotPresenceController`.
- **`label`**: label content; text presence via `SlotTextController`.
- **`description`**: secondary/supporting text.
- **`actions`**: action controls; often paired with `SlotAttributePropagationController`.
- **`title`**: heading/title content.
- Unnamed (default) slot: primary content.

## Where to go deeper

- [Focus management](14_focus-management.md): `DisabledMixin`, `delegatesFocus`, `FocusgroupNavigationController`
- [Mixin composition](../02_style-guide/02_typescript/13_mixin-composition.md), [Controller composition](../02_style-guide/02_typescript/14_controller-composition.md), [Directive composition](../02_style-guide/02_typescript/15_directive-composition.md): how to write and compose these, not just what exists
- [Debug and validation](../02_style-guide/02_typescript/17_debug-validation.md): full API for `warnIf()`, `validateEnum()`, and the deprecation-warning system
- [Component migration plans](../03_project-planning/03_components/README.md): per-component rationale
- `2nd-gen/packages/core`: source of truth for everything above
