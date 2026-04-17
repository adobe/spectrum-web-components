<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Focus Management Strategy: 2nd-Gen Proposal

<!-- Document title (editable) -->

# Focus Management Strategy: 2nd-Gen Proposal

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Value Impact](#value-impact)
    - [Accessibility](#accessibility)
    - [Consumer Experience](#consumer-experience)
    - [Author Maintenance](#author-maintenance)
- [1. Why Change?](#1-why-change)
    - [1st-Gen Architecture](#1st-gen-architecture)
    - [2nd-Gen Architecture](#2nd-gen-architecture)
- [2. What Exists in 2nd-Gen Today](#2-what-exists-in-2nd-gen-today)
    - [Already implemented](#already-implemented)
    - [Not yet implemented](#not-yet-implemented)
- [3. What We're Building](#3-what-were-building)
    - [3.1 File structure](#31-file-structure)
    - [3.2 Design principles](#32-design-principles)
- [4. New Components in Detail](#4-new-components-in-detail)
    - [4.1 `DisabledMixin`](#41-disabledmixin)
    - [4.2 `delegatesFocus: true`](#42-delegatesfocus-true)
    - [4.3 Choosing a Focus Strategy](#43-choosing-a-focus-strategy)
    - [4.4 `FocusgroupNavigationController`](#44-focusgroupnavigationcontroller)
    - [4.5 Utilities](#45-utilities)
- [5. Migration Path](#5-migration-path)
    - [Phase 1: Core Utilities](#phase-1-core-utilities)
    - [Phase 2: Controller](#phase-2-controller)
    - [Phase 3: Mixin](#phase-3-mixin)
    - [Phase 4: Component Migration](#phase-4-component-migration)
- [6. Component Migration Guide](#6-component-migration-guide)
    - [Category A: Host is the focus target (no delegation needed)](#category-a-host-is-the-focus-target-no-delegation-needed)
    - [Category B: Focus delegates to an inner element (use `delegatesFocus: true`)](#category-b-focus-delegates-to-an-inner-element-use-delegatesfocus-true)
    - [Category C: Focus group containers (use `FocusgroupNavigationController`)](#category-c-focus-group-containers-use-focusgroupnavigationcontroller)
- [7. What's Removed and Why](#7-whats-removed-and-why)
- [8. 1st-Gen vs 2nd-Gen Comparison](#8-1st-gen-vs-2nd-gen-comparison)
- [9. Open Questions](#9-open-questions)
- [Appendix A: Code Sketches](#appendix-a-code-sketches)
    - [A.1 `DisabledMixin`](#a1-disabledmixin)
    - [A.2 `delegatesFocus: true` Usage Example](#a2-delegatesfocus-true-usage-example)
    - [A.3 `FocusgroupNavigationController` Config API](#a3-focusgroupnavigationcontroller-config-api)
    - [A.4 `FocusgroupNavigationController` Usage Example](#a4-focusgroupnavigationcontroller-usage-example)
    - [A.5 `focusable-selectors.ts`](#a5-focusable-selectorsts)
    - [A.6 `get-active-element.ts`](#a6-get-active-elementts)
    - [A.7 Updated `hasVisibleFocusInTree()`](#a7-updated-hasvisiblefocusintree)
- [Appendix B: Focus Containment (Overlay) — OUT OF SCOPE](#appendix-b-focus-containment-overlay--out-of-scope)

</details>

<!-- Document content (editable) -->

## Summary

This proposal redesigns focus management for 2nd-gen Spectrum Web Components. The core change is moving from a **deep inheritance chain** to a lean strategy built on two primitives: **native `delegatesFocus`** for host-to-inner-element focus delegation, and **`FocusgroupNavigationController`** for keyboard navigation within composite widgets. A new **`DisabledMixin`** handles disabled state as a separate concern. The controller is aligned with the emerging [Open UI `focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/) so that it can deprecate gracefully as browsers ship native support.

> **Scope:** Core infrastructure and standard components only. Overlay, dialog, and dropdown focus concerns (focus trapping, focus restoration, overlay stacking) are **out of scope** and will be addressed when those components are migrated.

---

## Value Impact

Accepting this strategy resolves known accessibility defects, improves the consumer experience for products built on SWC, and significantly reduces the maintenance burden for component authors. The issues below are inherent to the 1st-gen `Focusable` architecture and cannot be fixed without the structural changes this proposal introduces.

### Accessibility

1. **Eliminates double tab stops.** The 1st-gen `Focusable` base class intercepts `tabIndex` with a getter/setter pair guarded by a `manipulatingTabindex` flag. When the flag's synchronous toggle falls out of sync — or when `focusElement` returns the wrong element during a lifecycle race — the host and the inner element can both hold `tabindex="0"`, creating two tab stops for a single control. `delegatesFocus: true` makes this structurally impossible: the browser manages a single tab stop with zero JavaScript.

2. **Fixes broken disabled-state discoverability.** 1st-gen bundles disabled handling inside `Focusable`, where `handleDisabledChanged()` branches on whether `focusElement.disabled` exists as a property. This leads to inconsistent behavior — some components use native `disabled` (removing the element from the tab order entirely), others use `aria-disabled`, with no clear contract. `DisabledMixin` standardizes on `aria-disabled` so disabled controls remain discoverable by screen readers (see [§4.1](#41-disabledmixin) for the full rationale), while components wrapping native form controls explicitly set `disabled` on the inner element.

3. **Removes unreliable focus-ring detection.** The `:focus-visible` polyfill (`FocusVisiblePolyfillMixin`) loads an external script, toggles `data-js-focus-visible` attributes, and falls back to a `.focus-visible` CSS class — all to solve a problem browsers have natively supported for 4+ years. The polyfill introduces timing-dependent states where focus rings appear incorrectly or not at all. Removing it in favor of native `:focus-visible` makes focus indication deterministic.

4. **Standardizes keyboard navigation across composite widgets.** 1st-gen splits roving tabindex logic across two controllers (`FocusGroupController` + `RovingTabindexController`) with inconsistent APIs and no built-in support for RTL, page navigation, or typeahead. Components that need these behaviors implement ad-hoc workarounds. `FocusgroupNavigationController` provides a single controller with consistent RTL-aware arrow keys, `skipDisabled`, `pageStep`, and `focusFirstItemByTextPrefix()` — covering WAI-ARIA APG keyboard patterns out of the box (see [§4.4](#44-focusgroupnavigationcontroller)).

### Consumer Experience

5. **Removes "stranded focus" states.** In 1st-gen, clicking on non-interactive regions of a component (padding, decorative areas) can leave focus in an ambiguous state because `Focusable` relies on JavaScript `focus()`/`blur()` overrides to route clicks. With `delegatesFocus: true`, the browser natively forwards any click on the host to the first focusable child — no JavaScript routing needed, no edge cases where focus lands nowhere.

6. **Ensures consistent behavior across browsers.** 1st-gen carries Safari-specific workarounds (e.g., `SAFARI_FOCUS_RING_CLASS` in Picker's `MobileController`) and Firefox-era `delegatesFocus` fallbacks. These platform-specific code paths create inconsistencies that surface as product bugs. The 2nd-gen approach relies on browser features that have been stable across all targets for 4+ years, eliminating the need for platform branching.

7. **Makes disabled components behave predictably.** Because `aria-disabled` doesn't block click events (unlike native `disabled`), 1st-gen has no enforced pattern for guarding click handlers — some components check, some don't. `DisabledMixin` establishes a clear contract: the mixin handles host-level ARIA and tabindex; the component guards its own interaction handlers. This prevents the consumer-facing bug where clicking a "disabled" button still triggers its action.

### Author Maintenance

8. **Reduces the component authoring surface.** A 1st-gen focusable component must: extend `Focusable`, implement a `focusElement` getter (runtime-only enforcement), understand when `selfManageFocusElement` applies, avoid conflicting with `manipulatingTabindex`, and manually re-dispatch focus/blur events. A 2nd-gen component adds `delegatesFocus: true` (one line) and optionally mixes in `DisabledMixin`. The focusElement getter, tabIndex interception, and polyfill coordination are gone entirely.

9. **Eliminates the runtime-only `focusElement` contract.** The 1st-gen `focusElement` getter throws at runtime if not implemented — there is no compile-time enforcement. This means missing or incorrect implementations are only caught during manual testing. 2nd-gen eliminates this contract: `delegatesFocus` delegates to the first focusable child by template order, which is verifiable by reading the template.

10. **Unblocks migration of all 24 focusable components.** Every component extending `Focusable` is blocked until the replacement primitives exist. This proposal delivers those primitives and categorizes all 24 components into three migration patterns (A/B/C in [§6](#6-component-migration-guide)), providing a concrete path for each.

11. **Aligns with the platform trajectory.** `FocusgroupNavigationController` mirrors the [Open UI `focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/) so that when browsers ship native focus-group behavior, the controller can be progressively deprecated rather than wholesale replaced — reducing future migration cost.

---

## 1. Why Change?

### 1st-Gen Architecture

Every focusable component in 1st-gen inherits from a four-level class chain:

```
LitElement
 └─ SpectrumElement
     └─ FocusVisiblePolyfillMixin(SpectrumElement)
         └─ Focusable
             └─ YourComponent
```

This creates several problems:

- **All-or-nothing inheritance** — Components that only need disabled-state handling must also inherit focus delegation, tabIndex management, autofocus, and polyfill coordination
- **Dead polyfill code** — `FocusVisiblePolyfillMixin` exists for the WICG `:focus-visible` polyfill, but all target browsers now support `:focus-visible` natively
- **Fragile tabIndex management** — The `Focusable` base class overrides the `tabIndex` getter/setter with a `manipulatingTabindex` boolean flag to prevent infinite loops, making the code difficult to reason about and a source of bugs
- **Runtime-only contract** — The required `focusElement` getter throws an error at runtime if not implemented; there is no compile-time enforcement
- **Escape hatches** — `selfManageFocusElement` exists solely to work around conflicts between `Focusable`'s tabIndex management and `RovingTabindexController` (used by ActionMenu and Picker, both marked `@deprecated`)

### 2nd-Gen Architecture

The new design replaces the entire inheritance chain with three composable, opt-in primitives:

```
SpectrumElement (base, no focus logic)
 ├── + DisabledMixin                    (opt-in disabled state)
 ├── + delegatesFocus: true             (native browser focus delegation)
 └── + FocusgroupNavigationController   (opt-in roving tabindex + arrow keys)
```

Components compose only what they need:

```typescript
// 1st-gen: forced inheritance of everything
class MyTextfield extends Focusable { ... }

// 2nd-gen: opt-in to just what you need
class MyTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
}
```

---

## 2. What Exists in 2nd-Gen Today

### Already implemented

- `SpectrumMixin` with `hasVisibleFocusInTree()` — needs cleanup (dead code + legacy `.focus-visible` fallback)
- `LanguageResolutionController` — done
- `SizedMixin` — done
- `SlotPresenceController` / `SlotTextController` — done (converted from `ObserveSlotPresence` / `ObserveSlotText` mixins to controllers)

### Not yet implemented

- `DisabledMixin` (extracted from `Focusable`)
- `FocusgroupNavigationController` (consolidated from 1st-gen `FocusGroupController` + `RovingTabindexController`)
- Focus utilities (`focusable-selectors`, `first-focusable-in`, `get-active-element`)

---

## 3. What We're Building

### 3.1 File structure

```
2nd-gen/packages/core/
├── controllers/
│   ├── focus-group-navigation-controller/
│   │   ├── src/focus-group-navigation-controller.ts   NEW
│   │   ├── stories/                                   NEW
│   │   ├── test/                                      NEW
│   │   └── focus-group-navigation-controller.md       NEW
│   ├── focus-group-navigation-controller.ts           NEW (re-export entry)
│   ├── slot-presence.ts          NEW (converted from mixin)
│   ├── slot-text.ts              NEW (converted from mixin)
│   ├── language-resolution.ts    existing
│   └── index.ts
├── mixins/
│   ├── disabled-mixin.ts         NEW
│   ├── sized-mixin.ts            existing
│   └── index.ts
├── utils/
│   ├── focusable-selectors.ts    NEW (migrated + simplified)
│   ├── first-focusable-in.ts     NEW (migrated, low priority)
│   ├── get-active-element.ts     NEW (migrated)
│   └── index.ts
└── element/
    └── spectrum-element.ts       existing (cleanup only)
```

### 3.2 Design principles

1. **Leverage the platform** — Use native `delegatesFocus`, `:focus-visible`, and `inert` instead of custom JavaScript solutions
2. **Composition over inheritance** — A controller and a mixin, not a base class
3. **Separate concerns** — Disabled state, focus delegation, and keyboard navigation are independent
4. **Minimal API surface** — Two primitives (`delegatesFocus` + `FocusgroupNavigationController`) cover all focus scenarios
5. **Align with emerging standards** — `FocusgroupNavigationController` mirrors the [Open UI `focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/) naming and semantics so it can deprecate gracefully as browsers ship native support

---

## 4. New Components in Detail

### 4.1 `DisabledMixin`

> A mixin that adds a reactive `disabled` property with associated accessibility behavior.

**When to use:** Any interactive component that can be disabled — buttons, inputs, links, menu items, sliders, etc.

**What it does:**
- Adds `disabled` as a reflected boolean property
- Sets `aria-disabled="true"` when disabled
- Removes element from tab order (`tabindex="-1"`) when disabled
- Blurs the element if it has focus when disabled
- Restores previous tabindex when re-enabled

**Why `aria-disabled` instead of the native `disabled` attribute:** The mixin uses `aria-disabled="true"` on the host element rather than the native `disabled` attribute. This is a deliberate choice — [see Kitty Giraudel's analysis](https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/) for the full rationale. The key tradeoffs:

| | `disabled` | `aria-disabled` |
|--|-----------|-----------------|
| Focusable? | No — removed from tab order entirely | Yes — remains keyboard-accessible |
| Click events? | Blocked by browser | Still fire (must guard in handler) |
| Form submission? | Value excluded | Value still submits |
| Screen readers | Announces disabled + unavailable | Announces disabled, element still discoverable |

For **web components**, `aria-disabled` is the right default because:
- Custom elements are not native form controls — the browser's `disabled` attribute has no built-in effect on a custom element host. We'd be reimplementing the behavior either way.
- Keeping the host discoverable (focusable + announced) is generally better UX — screen reader users can still find the element, understand what it does, and learn why it's disabled via surrounding context or tooltips.
- Components that wrap a native form control (e.g., textfield wrapping `<input>`) should **also** set the native `disabled` on the inner element to get correct platform behavior (no value submission, native styling). The mixin handles the host; the component's `render()` handles the inner element.
- Components where true removal from the tab order is desired (rare) can supplement with `tabindex="-1"` — the mixin already does this.

**When a component might need the native `disabled`:** If a component participates in `<form>` submission via `ElementInternals` and should exclude its value when disabled, the component should set `this.internals.setFormValue(null)` in its disabled handler. The mixin provides the reactive `disabled` property; the component decides how to act on it.

**Why `update()` instead of `updated()`:** Disabled-state side effects must apply _before_ the render pass. Using `updated()` would leave a single frame where the component renders as enabled but is behaviorally disabled, allowing the element to be briefly focusable/clickable.

See [Appendix A.1](#a1-disabledmixin) for the full implementation sketch.

---

### 4.2 `delegatesFocus: true`

> A native browser feature that automatically delegates focus from the host element to the first focusable child inside the shadow root.

This is the primary mechanism for focus delegation in 2nd-gen, replacing the entire `Focusable` base class and its `focusElement` getter pattern.

**What it does:**
- Calling `.focus()` on the host automatically focuses the first focusable child in the shadow DOM — custom `focus()` and `blur()` overrides become redundant
- Clicks anywhere on the host element — including padding areas and decorative regions outside the inner control — automatically forward focus to the first focusable child, eliminating "stranded focus" states
- The host matches `:focus` and `:focus-within` when any inner element is focused, enabling unified focus styling via CSS alone (no JavaScript class toggling needed)
- Zero JavaScript required — it's a one-line shadow root option

**Browser support:** Fully supported in all target browsers for 4+ years (Chrome 53, Safari 15, Firefox 94, Edge 79). Firefox-specific issues that previously motivated manual workarounds were resolved in Firefox 94-104 (2021-2022).

**When to use it:** Use `delegatesFocus` only when **there is exactly one place focus should ever go** inside the shadow root. If a component has multiple internal focus targets or manages its own focus routing (e.g., combobox, slider with multiple handles), do not use delegation — manage focus explicitly instead.

**How to use it:**

```typescript
class MyTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
}
```

**Template requirement:** The intended focus target must be the **first focusable element** in the shadow DOM template. During migration, verify or restructure each component's template to ensure this. For most components (textfields, checkboxes, links, color inputs), the interactive element is already first.

#### Implementation Gotchas

1. **Do not set `tabindex` on the host element.** When `delegatesFocus` is active, adding `tabindex="0"` to the host creates **two tab stops** — the host receives focus first, then the inner element. This breaks keyboard navigation. `DisabledMixin` should only set `tabindex="-1"` (to remove from tab order when disabled), never `tabindex="0"`.

2. **Focus/blur events do not bubble out of the shadow root.** `delegatesFocus` handles focus *routing* but not event *bubbling*. Native `focus` and `blur` events are trapped inside the shadow boundary. Components that need to expose `focus`/`blur` events to consumers must re-dispatch them as composed, bubbling events from the host:

   ```typescript
   private _handleFocus(event: FocusEvent): void {
     this.dispatchEvent(new FocusEvent('focus', {
       bubbles: true,
       composed: true,
       relatedTarget: event.relatedTarget,
     }));
   }
   ```

3. **`:focus` on host is a pseudo-class match, not actual focus.** The host matches `:focus` for CSS styling purposes when an inner element is focused, but `document.activeElement` still points to the host (the inner element is reachable via `shadowRoot.activeElement`). This is the expected behavior and is what `getActiveElement()` traverses.

#### CSS Considerations

- **`:focus-visible` on the inner element** — Use this for focus ring styling on the actual interactive element (input, button, etc.)
- **`:focus-within` on the host** — Use this for container-level styling when any descendant is focused (e.g., border color changes on a textfield wrapper)
- **`:focus` on the host** — With `delegatesFocus`, the host matches `:focus` when the inner element is focused. This enables host-level focus styling without JavaScript. Prefer `:focus-within` for clarity unless specifically targeting the delegated focus state.
- **Remove `outline` from the host** — If the host has a default focus outline, suppress it (`outline: none` on `:host`) and style the inner element's focus ring instead to avoid double focus indicators

See [Appendix A.2](#a2-delegatesfocus-true-usage-example) for a full component example.

---

### 4.3 Choosing a Focus Strategy

Use this flowchart to determine which approach a component should use:

```md
                ┌──────────────────────────────┐
                │ Does the component manage    │
                │ focus across CHILD elements? │
                │ (e.g., tabs, radio group)    │
                └──────────┬───────────────────┘
                           │
                  ┌────────▼────────┐
                  │      YES        │──────► Use FocusgroupNavigationController
                  │ (Tabs,          │
                  │  ActionGroup,   │        See §4.4 and Appendix A.4
                  │  RadioGroup,    │
                  │  Menu, etc)     │
                  └────────┬────────┘
                           │ NO — component manages its OWN focus
                  ┌────────▼─────────────────┐
                  │ Does the host element    │
                  │ itself receive focus?    │
                  └────────┬─────────────────┘
                           │
                  ┌────────▼────────┐
                  │      YES        │──────► No delegation needed.
                  │ (ButtonBase,    │        Use DisabledMixin only.
                  │  MenuItem, etc) │
                  └────────┬────────┘        See §4.1 and Appendix A.1
                           │ NO
                  ┌────────▼─────────────────┐
                  │ Focus should delegate to │
                  │ a SINGLE inner element   │
                  └────────┬─────────────────┘
                           │
                  ┌────────▼────────┐
                  │ (Textfield,     │──────► Use delegatesFocus: true
                  │  Checkbox,      │        Ensure focus target is FIRST
                  │  Link,          │        focusable in shadow DOM.
                  │  ColorWheel,    │        Do NOT set tabindex on host.
                  │  AccordionItem, │
                  │  etc)           │        See §4.2 and Appendix A.2
                  └─────────────────┘
```

---

### 4.4 `FocusgroupNavigationController`

> A Lit reactive controller implementing the [roving tabindex pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) and directional navigation aligned with the proposed [Open UI `focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/).

**When to use:** Composite widgets that should appear as a **single tab stop** with arrow key navigation between children — following WAI-ARIA patterns for toolbars, tablists, menu bars, listboxes, and grids.

**What it handles:**
- Arrow key navigation across four direction modes: `horizontal`, `vertical`, `both`, and `grid`
- RTL-aware — horizontal arrow keys respect the host's `dir` attribute
- Home/End key jumps (Ctrl+Home / Ctrl+End in grid mode jump to first/last cell)
- Optional wrapping at list boundaries (`wrap: true`)
- Optional Page Up/Page Down support (`pageStep`) — moves by N items (linear) or N rows (grid)
- Optional skipping of disabled items (`skipDisabled: true`) — checks both `disabled` and `aria-disabled="true"`
- Automatic `tabindex` management: active item gets `tabindex="0"`, all others get `tabindex="-1"`
- Optional last-focused memory (`memory: true`, default) — Tab re-enters at the last active item
- Grid navigation via bounding-rect layout (no manual column-count configuration needed)
- Typeahead via `focusFirstItemByTextPrefix()` — updates roving tabindex to the first item matching a text prefix
- Custom event `swc-focusgroup-navigation-active-change` dispatched on active item changes
- Capture-phase keyboard event handling for reliable shadow DOM interception

**How roving tabindex works:**

```
Tab into group:
  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
  │ A    │  │ B    │  │ C    │  │ D    │
  │ [0]  │  │ [-1] │  │ [-1] │  │ [-1] │
  └──┬───┘  └──────┘  └──────┘  └──────┘
     │ ← Tab lands here (tabindex="0")
     ▼
Arrow Right → focus moves to B:
  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
  │ A    │  │ B    │  │ C    │  │ D    │
  │ [-1] │  │ [0]  │  │ [-1] │  │ [-1] │
  └──────┘  └──┬───┘  └──────┘  └──────┘
               │ ← Only B has tabindex="0"

Tab out, then Tab back in → returns to B (memory: true):
  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
  │ A    │  │ B    │  │ C    │  │ D    │
  │ [-1] │  │ [0]  │  │ [-1] │  │ [-1] │
  └──────┘  └──┬───┘  └──────┘  └──────┘
               │ ← Remembers last-focused element
```

**Examples:**
- `<sp-action-group>` — roving across action buttons (horizontal)
- `<sp-radio-group>` — roving across radios with auto-selection via `onActiveItemChange`
- `<sp-tabs>` — roving across tab elements
- `<sp-sidenav>` — roving across nav items (vertical)
- `<sp-menu>` — roving across menu items (vertical)
- `<sp-swatch-group>` — roving across swatches in grid layout

**Config API:**

```typescript
type FocusgroupDirection = 'horizontal' | 'vertical' | 'both' | 'grid';

type FocusgroupNavigationOptions = {
  getItems: () => HTMLElement[];       // Returns current set of navigable items
  direction: FocusgroupDirection;      // Arrow key axis mode
  wrap?: boolean;                      // Wrap at boundaries (default: false)
  memory?: boolean;                    // Re-enter at last active item (default: true)
  skipDisabled?: boolean;              // Skip disabled/aria-disabled items (default: false)
  onActiveItemChange?: (el: HTMLElement | null) => void;  // Callback after active item changes
  pageStep?: number;                   // Page Up/Down step size (0 or omitted = disabled)
};
```

**Public methods:**

| Method | Description |
|--------|-------------|
| `getActiveItem()` | Returns the item currently holding `tabindex="0"`, or `null` |
| `setActiveItem(item)` | Sets the roving tab stop to `item` without calling `.focus()`. Returns `false` if item is ineligible |
| `refresh()` | Re-reads `getItems()`, applies roving tabindex, restores memory if applicable. Call after dynamic DOM changes |
| `setOptions(partial)` | Merges partial options and calls `refresh()` |
| `focusFirstItemByTextPrefix(prefix)` | Typeahead: sets active item to first match by `textContent`. Returns `true` if found |

**Internal architecture:** Consolidated from 1st-gen's two-class hierarchy (`FocusGroupController` base + `RovingTabindexController` subclass) into a single self-contained controller. Grid mode uses bounding-rect layout to derive rows and columns from actual element positions — no manual `directionLength` configuration needed.

**Changes from 1st-gen:**

| What | 1st-Gen | 2nd-Gen |
|------|---------|---------|
| Name | `RovingTabindexController` / `FocusGroupController` | `FocusgroupNavigationController` (Open UI aligned) |
| Grid layout | Manual `directionLength` (default 5) | Bounding-rect derived rows/columns |
| RTL support | Manual `isLTR` check | Built-in via host `dir` attribute |
| Keyboard handler | Bubble phase on host | Capture phase for reliable shadow DOM interception |
| Typeahead | Not built in | `focusFirstItemByTextPrefix()` |
| Page navigation | Not supported | `pageStep` option for Page Up/Down |
| Disabled skipping | `isFocusableElement` callback | `skipDisabled` option (checks `disabled` + `aria-disabled`) |
| Event notification | None | `swc-focusgroup-navigation-active-change` custom event |
| Virtualization | `offset` property built in | Deferred until a virtualizing component is migrated |

**Native `focusgroup` (future):** The controller is designed to deprecate gracefully. When browsers ship the `focusgroup` attribute, the roving tabindex management and keyboard interception can be removed first. Options like `grid` bounding-rect layout, `pageStep`, and `skipDisabled` may remain useful longer if the platform surface stays narrower.

See [Appendix A.3](#a3-focusgroupnavigationcontroller-config-api) for the full config interface and [Appendix A.4](#a4-focusgroupnavigationcontroller-usage-example) for a usage example.

#### Design evolution: `RovingTabindexController` → `FocusgroupNavigationController`

Earlier drafts of this proposal (and the version shared in Slack) used `RovingTabindexController` — a direct consolidation of the 1st-gen `FocusGroupController` + `RovingTabindexController` into a single class with a cleaned-up but structurally similar API. During implementation (PR #6134), the controller was redesigned to align with the [Open UI `focusgroup` attribute proposal](https://open-ui.org/components/focusgroup.explainer/), resulting in both a renamed class and a meaningfully different API shape.

This was a deliberate evolution, not accidental drift. The key changes:

| Earlier draft (`RovingTabindexController`) | Final (`FocusgroupNavigationController`) | Why |
|---|---|---|
| `elements: () => T[]` | `getItems: () => HTMLElement[]` | Aligns with `focusgroup` semantics; no generic type parameter needed |
| `elementEnterAction` / `focusInIndex` callbacks | `onActiveItemChange` single callback | Simpler API — one hook instead of two, called after the active item changes |
| `isFocusableElement: (el) => boolean` | `skipDisabled: boolean` | Declarative flag instead of imperative callback; checks both `disabled` and `aria-disabled` automatically |
| `directionLength: number` (manual grid columns) | Removed — bounding-rect layout | Grid rows/columns derived from actual element positions; no manual configuration |
| `clearElementCache()` | `refresh()` | Broader responsibility — re-reads items, applies tabindex, restores memory |
| No typeahead | `focusFirstItemByTextPrefix()` | Built-in typeahead support |
| No page navigation | `pageStep` option | Built-in Page Up/Down |
| No wrap/memory options | `wrap`, `memory` | Explicit boolean flags matching `focusgroup` attribute semantics |

The Open UI alignment means the controller's options map conceptually to the `focusgroup` HTML attribute's parameters, positioning the codebase to deprecate the controller incrementally as browsers ship native support.

---

### 4.5 Utilities

#### `get-active-element.ts`

> Returns the truly focused element by traversing shadow DOM boundaries.

`document.activeElement` stops at shadow hosts. This utility follows `shadowRoot.activeElement` chains to find the deepest focused element. Used by `FocusgroupNavigationController` and `hasVisibleFocusInTree()`.

**Relationship to `hasVisibleFocusInTree()`:** They answer different questions:

```
getActiveElement()           → "Which element has focus?"     → returns HTMLElement
hasVisibleFocusInTree()      → "Should I show a focus ring?"  → returns boolean
```

`hasVisibleFocusInTree()` should use `getActiveElement()` internally (its current implementation duplicates the shadow DOM traversal):

```typescript
public hasVisibleFocusInTree(): boolean {
  const active = getActiveElement(this.getRootNode() as Document);
  return active?.matches(':focus-visible') ?? false;
}
```

#### `focusable-selectors.ts`

> CSS selector strings matching focusable and tabbable DOM elements per the HTML spec.

Two exports:
- `focusableSelector` — matches elements that can receive focus programmatically (via `.focus()`)
- `tabbableSelector` — subset reachable via Tab key (excludes `tabindex="-1"`)

**Change from 1st-gen:** Removes the custom `[focusable]:not([focusable="false"])` selector. The `[focusable]` attribute was a 1st-gen workaround for focus delegation that is no longer needed.

See [Appendix A.5](#a5-focusable-selectorsts) for the full selector definitions.

#### `first-focusable-in.ts` *(low priority)*

> Finds the first focusable element in a DOM subtree or among a slot's assigned nodes.

> **Note:** This utility's primary consumers are overlay, dialog, and dropdown components (out of scope). It should be migrated as a general-purpose utility, but its usage will only materialize when those components are migrated.

---

## 5. Migration Path

### Phase 1: Core Utilities

1. Clean up `hasVisibleFocusInTree()` in `spectrum-element.ts`
   - Remove dead ancestor-chain code
   - Remove `.focus-visible` CSS class fallback
   - Use `getActiveElement()` internally
2. Add `get-active-element.ts` to `utils/`
3. Add `focusable-selectors.ts` to `utils/`

### Phase 2: Controller

4. Add `FocusgroupNavigationController` to `controllers/` (consolidates 1st-gen `FocusGroupController` + `RovingTabindexController`, aligned with Open UI `focusgroup`)

### Phase 3: Mixin

5. Add `DisabledMixin` to `mixins/`

### Phase 4: Component Migration

Apply the appropriate strategy per component (see migration guide below).

---

## 6. Component Migration Guide

Each component falls into one of three categories:

### Category A: Host is the focus target (no delegation needed)

These components focus themselves. They only need `DisabledMixin`.

- ButtonBase
- Swatch
- MenuItem

**Pattern:**

```typescript
class SpButton extends DisabledMixin(SpectrumElement) {
  // Host receives focus directly — no delegation, no controller

  private handleClick(): void {
    if (this.disabled) return; // Required — aria-disabled does NOT block clicks
    this.dispatchEvent(new Event('action'));
  }
}
```

> **⚠️ `aria-disabled` does not block click events.** Unlike the native `disabled` attribute, `aria-disabled` leaves the element interactive at the DOM level. Every interaction handler (`click`, `keydown Enter/Space`, pointer events) must explicitly check `if (this.disabled) return;`. This applies to all categories — any component using `DisabledMixin` must guard its handlers. See [§4.1](#41-disabledmixin) for the full rationale.

### Category B: Focus delegates to an inner element (use `delegatesFocus: true`)

These components delegate focus to an inner element. Add `delegatesFocus: true` to shadow root options and ensure the focus target is the **first focusable element** in the shadow DOM template.

| Component | Focus Target | Migration Notes |
|-----------|-------------|-----------------|
| Textfield | Inner `<input>` / `<textarea>` | Verify `<input>` is first focusable in template |
| Link | Inner `<a>` | Verify `<a>` is first focusable in template |
| Checkbox | Inner `<input>` | Already uses `delegatesFocus` in 1st-gen |
| TopNavItem | Inner `<a>` | Verify `<a>` is first focusable in template |
| SidenavItem | `#item-link` | Restructure template so link is first focusable |
| BreadcrumbItem | `#item-link` | Restructure template so link is first focusable |
| AccordionItem | `#header` button | Restructure template so header button is first focusable |
| ColorWheel | Inner `<input>` | Verify `<input>` is first focusable in template |
| ColorSlider | Inner `<input>` | Verify `<input>` is first focusable in template |
| Slider | Handle `<input>` | Verify handle input is first focusable in template |
| ActionMenu | Inner button | Verify button is first focusable in template |
| Picker | Inner button | Verify button is first focusable in template |
| Avatar | Inner `<a>` (when linked) | Conditional; `<a>` only present when `href` is set |

**Pattern:**

```typescript
class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  // Browser handles focus() → first focusable child
  // Do NOT set tabindex on host — creates double tab stop (see §4.2)
  // Re-dispatch focus/blur if consumers need those events (see §4.2)
}
```

### Category C: Focus group containers (use `FocusgroupNavigationController`)

These components manage focus across their children, not themselves.

| Component | Direction | Notes |
|-----------|----------|-------|
| Tabs | Both | Auto-selects on focus when `auto` prop set via `onActiveItemChange` |
| ActionGroup | Horizontal | Also uses `delegatesFocus: true` |
| RadioGroup | Horizontal | Auto-selects on focus via `onActiveItemChange` |
| Sidenav | Vertical | |
| Menu | Vertical | Also uses `delegatesFocus: true` |
| Accordion | Vertical | Only uses `delegatesFocus: true` |
| SwatchGroup | Grid | Uses bounding-rect layout |
| Tags | Horizontal | |

**Pattern:**

```typescript
class SpTabs extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-tab')],
    direction: 'horizontal',
    wrap: true,
    onActiveItemChange: (tab) => {
      if (this.auto && tab) this.selectTab(tab);
    },
  });
}
```

---

## 7. What's Removed and Why

The following 1st-gen concepts are **not carried forward** to 2nd-gen. Each removal is a deliberate decision — this section explains the reasoning so that contributors migrating components understand why these APIs no longer exist and what replaced them.

> **Quick reference:** If you're migrating a component and looking for a specific 1st-gen API, use the table at the end of this section.

- **`FocusVisiblePolyfillMixin`** — Existed to load the WICG `:focus-visible` polyfill for browsers that lacked native support. All target browsers have supported `:focus-visible` natively for 4+ years (Chrome 86, Safari 15.4, Firefox 85). The polyfill introduced timing-dependent states where focus rings could appear incorrectly or not at all, and required coordinating `data-js-focus-visible` attributes across the DOM. Removing it makes focus indication deterministic with zero runtime cost.

- **`Focusable` base class** — The central problem this proposal solves. `Focusable` bundles four independent concerns (focus delegation, disabled state, tabIndex management, and polyfill coordination) into a single inheritance slot, forcing every focusable component to inherit all of them. This creates the deep inheritance chain documented in [§1](#1-why-change) and prevents components from opting into only what they need. Replaced by `DisabledMixin` (disabled state) + native `delegatesFocus` (focus delegation) as independent, composable primitives.

- **`focusElement` getter pattern** — Every component extending `Focusable` must implement a `focusElement` getter that returns the intended focus target. This contract is enforced only at runtime (a thrown error) — there is no compile-time safety, meaning missing or incorrect implementations are only discovered during manual testing. The getter also creates a parallel focus-routing system that can conflict with `delegatesFocus`. Replaced by template order: `delegatesFocus: true` delegates to the first focusable child in the shadow DOM, which is verifiable by reading the template.

- **`manipulatingTabindex` flag** — `Focusable` overrides the `tabIndex` getter/setter with a boolean flag to prevent infinite loops when the base class and the component both try to set `tabIndex`. This flag-guarded state machine is difficult to reason about and is a known source of bugs — when the synchronous toggle falls out of sync (e.g., due to async lifecycle timing), the host and inner element can both hold `tabindex="0"`, creating double tab stops. `delegatesFocus` eliminates the tabIndex override entirely, making the loop impossible.

- **`[focusable]` attribute** — A 1st-gen convention where components added a `[focusable]` attribute to indicate they could receive focus. This was used by parent components and utilities to identify focusable children. With `delegatesFocus`, the host is natively focusable (it participates in the tab order through the browser's focus delegation), so the attribute is unnecessary. The updated `focusableSelector` in [§4.5](#45-utilities) uses standard HTML focusability rules only.

- **`selfManageFocusElement`** — A boolean getter override used by exactly two components (ActionMenu and Picker) to opt out of `Focusable`'s automatic tabIndex management. It exists because `Focusable`'s tabIndex interception conflicts with `RovingTabindexController` when both try to manage the same element's tabIndex. The conflict is structural to the inheritance approach — `Focusable` assumes it owns tabIndex, but the controller also needs to set it. In 2nd-gen, `Focusable`'s tabIndex interception is gone entirely, so the conflict cannot occur and the escape hatch is unnecessary.

- **1st-gen `FocusGroupController` / `RovingTabindexController`** — Two separate controllers with overlapping responsibilities (`FocusGroupController` as a base class, `RovingTabindexController` as a subclass). The split forced components to understand which class to use and created an inconsistent API surface. Superseded by `FocusgroupNavigationController`, which consolidates both into a single controller aligned with the Open UI `focusgroup` attribute, adding bounding-rect grid layout, RTL support, typeahead, and page navigation. See the [design evolution note in §4.4](#design-evolution-rovingtabindexcontroller--focusgroupnavigationcontroller) for the full API mapping.

- **`focus-visible.ts`** — The entire polyfill loader file: script injection, `data-js-focus-visible` attribute management, and global event listeners for tracking focus method (keyboard vs pointer). All of this is replaced by the browser's native `:focus-visible` pseudo-class, which requires no JavaScript.

- **`.focus-visible` CSS class fallback** — Used in `hasVisibleFocusInTree()` as a fallback for browsers that only supported the polyfill's CSS class instead of the native pseudo-class. Since all target browsers now support `:focus-visible`, the fallback path is dead code. The simplified `hasVisibleFocusInTree()` checks only `activeElement.matches(':focus-visible')`.

- **Autofocus synthetic KeyboardEvent hack** — 1st-gen dispatched a synthetic `KeyboardEvent` followed by two `requestAnimationFrame` waits to trick the polyfill into showing a focus ring on autofocused elements. Browsers now correctly apply `:focus-visible` to programmatically focused elements, making the hack unnecessary.

#### If you're looking for...

| 1st-gen API | 2nd-gen replacement | Notes |
|---|---|---|
| `extends Focusable` | `extends DisabledMixin(SpectrumElement)` + `delegatesFocus: true` | See [§6 Category B](#category-b-focus-delegates-to-an-inner-element-use-delegatesfocus-true) |
| `get focusElement()` | Template order (first focusable child) | Ensure focus target is first in shadow DOM |
| `this.tabIndex` / `manipulatingTabindex` | Handled by `delegatesFocus` | Do not set `tabindex` on host |
| `selfManageFocusElement` | Not needed | Conflict no longer exists |
| `[focusable]` attribute | Not needed | Host is natively focusable via delegation |
| `FocusGroupController` | `FocusgroupNavigationController` | See [§4.4](#44-focusgroupnavigationcontroller) |
| `RovingTabindexController` (1st-gen) | `FocusgroupNavigationController` | See [§4.4 evolution note](#design-evolution-rovingtabindexcontroller--focusgroupnavigationcontroller) |
| `FocusVisiblePolyfillMixin` | Native `:focus-visible` | No import needed |
| `hasVisibleFocusInTree()` | Same method, simplified | Uses `getActiveElement()` internally |

---

## 8. 1st-Gen vs 2nd-Gen Comparison

| Concern | 1st-Gen | 2nd-Gen |
|---------|---------|---------|
| Focus-visible detection | Polyfill mixin + `hasVisibleFocusInTree()` | Native `:focus-visible` + simplified `hasVisibleFocusInTree()` |
| Focus delegation | `Focusable` base class with `focusElement` getter | Native `delegatesFocus: true` on shadow root |
| Disabled state | Bundled into `Focusable` base class | Standalone `DisabledMixin` |
| TabIndex management | Complex getter/setter with `manipulatingTabindex` flag | Handled natively by `delegatesFocus` and `FocusgroupNavigationController` |
| Roving tabindex | `RovingTabindexController` | `FocusgroupNavigationController` (Open UI aligned, bounding-rect grid, RTL, typeahead, page nav) |
| Focus groups | `FocusGroupController` (separate public class) | Consolidated into `FocusgroupNavigationController` |
| Autofocus | Synthetic KeyboardEvent + 2 rAF waits | Native `autofocus` attribute |
| Focusable selectors | Include custom `[focusable]` selector | Standard HTML selectors only |

---

## 9. Open Questions

1. ~~**Grid `directionLength` default:**~~ **Resolved.** `FocusgroupNavigationController` uses bounding-rect layout to derive rows and columns from actual element positions. No manual `directionLength` configuration is needed — the arbitrary default of 5 from 1st-gen is eliminated.

2. **Virtualization `offset` property:**
   - Not included in the initial `FocusgroupNavigationController`. Will be added (or extracted to a subclass) when a virtualizing component is migrated.

3. **Components where the focus target is not the first focusable child:**
   - SidenavItem, BreadcrumbItem, and AccordionItem currently delegate to inner elements that may not be first in the shadow DOM. 
   - **During migration, their templates should be restructured so the intended focus target comes first.**
   - If restructuring isn't feasible for a specific component, that component can override `focus()` directly as a one-off.

4. **`referenceTarget` and `aria-activedescendant` across shadow boundaries:**
   - The experimental [`referenceTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#referencetarget) option for `attachShadow()` would allow ARIA ID references (like `aria-activedescendant`) to cross shadow DOM boundaries. Today, IDs are scoped to their shadow root, which forces roving tabindex for patterns where `aria-activedescendant` would otherwise be the better fit (e.g., combobox with a shadow-DOM listbox, where focus should stay on the input while visually tracking the active option).
   - If `referenceTarget` ships in browsers, some components currently requiring `FocusgroupNavigationController` (particularly Picker and Combobox) could use `aria-activedescendant` instead — a simpler pattern where focus doesn't move between elements. This aligns with our "leverage the platform" design principle.
   - **No action needed today** — no browser has shipped this yet. Monitor the [Shadow DOM reference target explainer](https://github.com/nicuveo/CrossRootAriaReflection) and revisit when browser support materializes.

---

## Appendix A: Code Sketches

These are implementation sketches to make the proposal concrete. They are **not final implementations** — expect changes during development. Each is referenced from the relevant section above.

---

### A.1 `DisabledMixin`

Referenced from [§4.1](#41-disabledmixin).

```typescript
import { property, type PropertyValues, type ReactiveElement } from 'lit';
import type { Constructor } from '../types.js';

export interface DisabledInterface {
  disabled: boolean;
}

export function DisabledMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<DisabledInterface> {
  class DisabledElement extends constructor {
    @property({ type: Boolean, reflect: true })
    disabled = false;

    // Uses update() (not updated()) so side effects apply BEFORE render.
    // See §4.1 for rationale.
    protected override update(changedProperties: PropertyValues): void {
      if (changedProperties.has('disabled')) {
        if (this.disabled) {
          // Host gets aria-disabled for screen reader discoverability.
          // Components wrapping native form controls should ALSO set
          // disabled on the inner element in render() — see §4.1.
          this.setAttribute('aria-disabled', 'true');
          if (this.hasAttribute('tabindex')) {
            this.dataset.prevTabindex = this.getAttribute('tabindex')!;
            this.setAttribute('tabindex', '-1');
          }
          if (this.matches(':focus-within')) {
            (this.shadowRoot?.activeElement as HTMLElement)?.blur();
          }
        } else {
          this.removeAttribute('aria-disabled');
          if (this.dataset.prevTabindex !== undefined) {
            this.setAttribute('tabindex', this.dataset.prevTabindex);
            delete this.dataset.prevTabindex;
          }
        }
      }
      super.update(changedProperties);
    }
  }
  return DisabledElement;
}
```

---

### A.2 `delegatesFocus: true` Usage Example

Referenced from [§4.2](#42-delegatesfocus-true).

```typescript
import { DisabledMixin } from '@spectrum-web-components/core/mixins';
import { SpectrumElement } from '@spectrum-web-components/core/element';
import { html, css } from 'lit';

class SpCheckbox extends DisabledMixin(SpectrumElement) {
  // Browser automatically delegates focus to the <input> (first focusable child)
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  // No focusElement getter needed.
  // No focus()/blur()/click() overrides needed.
  // The browser handles all of this.

  static override styles = css`
    /* Suppress host focus outline — the inner element owns the focus ring */
    :host {
      outline: none;
    }
    /* Use :focus-within on host for container-level styling */
    :host(:focus-within) {
      border-color: var(--spectrum-focus-indicator-color);
    }
    /* Use :focus-visible on inner element for keyboard focus ring */
    input:focus-visible {
      outline: 2px solid var(--spectrum-focus-indicator-color);
    }
  `;

  override render() {
    // ⚠️ <input> MUST be the first focusable element in the template
    return html`
      <input
        type="checkbox"
        id="input"
        ?disabled=${this.disabled}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
      />
      <label for="input"><slot></slot></label>
    `;
  }

  // Re-dispatch focus/blur as composed events so they cross the shadow boundary.
  // delegatesFocus handles focus routing, but NOT event bubbling.
  private _handleFocus(event: FocusEvent): void {
    this.dispatchEvent(new FocusEvent('focus', {
      bubbles: true,
      composed: true,
      relatedTarget: event.relatedTarget,
    }));
  }

  private _handleBlur(event: FocusEvent): void {
    this.dispatchEvent(new FocusEvent('blur', {
      bubbles: true,
      composed: true,
      relatedTarget: event.relatedTarget,
    }));
  }
}
```

---

### A.3 `FocusgroupNavigationController` Config API

Referenced from [§4.4](#44-focusgroupnavigationcontroller).

```typescript
export type FocusgroupDirection = 'horizontal' | 'vertical' | 'both' | 'grid';

export type FocusgroupNavigationOptions = {
  /**
   * Returns the current set of items that participate in roving tabindex and
   * directional navigation. Callers typically close over the host (for example
   * querying slotted or shadow DOM children).
   */
  getItems: () => HTMLElement[];

  /**
   * Determines which arrow keys move focus and how grid navigation is computed.
   * - horizontal: inline-axis arrows (respects dir)
   * - vertical: block-axis arrows
   * - both: all four arrows on the same linear getItems() order
   * - grid: bounding-rect derived rows/columns; Ctrl+Home/Ctrl+End for first/last cell
   */
  direction: FocusgroupDirection;

  /** Wrap from last to first (and reverse). Default: false. */
  wrap?: boolean;

  /** Re-enter at last-focused item on Tab. Default: true. */
  memory?: boolean;

  /** Skip disabled / aria-disabled="true" items. Default: false. */
  skipDisabled?: boolean;

  /** Called after the active item changes. Receives the new active element or null. */
  onActiveItemChange?: (active: HTMLElement | null) => void;

  /**
   * Page Up/Down step size. For linear modes, moves by N items.
   * For grid, moves by N rows (column clamped). 0 or omitted disables page keys.
   */
  pageStep?: number;
};
```

---

### A.4 `FocusgroupNavigationController` Usage Example

Referenced from [§4.4](#44-focusgroupnavigationcontroller).

```typescript
import {
  FocusgroupNavigationController,
} from '@spectrum-web-components/core/controllers';
import { SpectrumElement } from '@spectrum-web-components/core/element';

class SpTabs extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-tab')] as HTMLElement[],
    direction: 'horizontal',
    wrap: true,
    // Auto-select tab on arrow key navigation when `auto` prop is set
    onActiveItemChange: (tab: HTMLElement | null) => {
      if (this.auto && tab) {
        this.selectTab(tab);
      }
    },
  });

  protected override firstUpdated(): void {
    super.firstUpdated();
    this.navigation.refresh();
  }

  get focusElement(): HTMLElement | null {
    return this.navigation.getActiveItem();
  }
}
```

---

### A.5 `focusable-selectors.ts`

Referenced from [§4.5 focusable-selectors.ts](#focusable-selectorsts).

```typescript
/** Matches elements that can receive focus programmatically (via .focus()). */
export const focusableSelector = [
  'input:not([inert]):not([disabled])',
  'select:not([inert]):not([disabled])',
  'textarea:not([inert]):not([disabled])',
  'a[href]:not([inert])',
  'button:not([inert]):not([disabled])',
  '[tabindex]:not([inert])',
  'audio[controls]:not([inert])',
  'video[controls]:not([inert])',
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  'details>summary:first-of-type:not([inert])',
  'details:not([inert])',
].join(',');

/** Matches elements reachable via Tab key (excludes tabindex="-1"). */
export const tabbableSelector = focusableSelector
  .split(',')
  .map((s) => s + ':not([tabindex="-1"])')
  .join(',');
```

---

### A.6 `get-active-element.ts`

Referenced from [§4.5 get-active-element.ts](#get-active-elementts).

```typescript
/**
 * Returns the deepest focused element by traversing shadow DOM boundaries.
 * `document.activeElement` stops at shadow hosts; this follows the chain.
 */
export function getActiveElement(
  root: Document | ShadowRoot = document
): HTMLElement | null {
  let current = root.activeElement as HTMLElement | null;
  while (current?.shadowRoot?.activeElement) {
    current = current.shadowRoot.activeElement as HTMLElement;
  }
  return current;
}
```

---

### A.7 Updated `hasVisibleFocusInTree()`

Referenced from [§4.5 get-active-element.ts](#get-active-elementts) and [§2](#2-what-exists-in-2nd-gen-today).

Shows how the existing `SpectrumMixin` method simplifies by using `getActiveElement()`:

```typescript
// Before (current 2nd-gen — dead code + legacy fallback)
public hasVisibleFocusInTree(): boolean {
  const getAncestors = (root: Document = document): HTMLElement[] => {
    let currentNode = root.activeElement as HTMLElement;
    while (currentNode?.shadowRoot && currentNode.shadowRoot.activeElement) {
      currentNode = currentNode.shadowRoot.activeElement as HTMLElement;
    }
    // ⚠️ Dead code: ancestor chain is built but never consumed
    const ancestors: HTMLElement[] = currentNode ? [currentNode] : [];
    while (currentNode) {
      const ancestor = currentNode.assignedSlot || currentNode.parentElement
        || (currentNode.getRootNode() as ShadowRoot)?.host;
      if (ancestor) ancestors.push(ancestor as HTMLElement);
      currentNode = ancestor as HTMLElement;
    }
    return ancestors;
  };
  const activeElement = getAncestors(this.getRootNode() as Document)[0];
  if (!activeElement) return false;
  return (
    activeElement.matches(':focus-visible') ||
    activeElement.matches('.focus-visible') // ⚠️ Legacy polyfill fallback
  );
}
```

```ts
// After (proposed cleanup)
public hasVisibleFocusInTree(): boolean {
  const active = getActiveElement(this.getRootNode() as Document);
  return active?.matches(':focus-visible') ?? false;
}
```

---

## Appendix B: Focus Containment (Overlay) — OUT OF SCOPE

This section documents the target architecture for when overlay/dialog/dropdown components are migrated. It is not part of the core focus management work.

**Target approach:**
- Use `<dialog>.showModal()` for modals (native focus trap + Escape handling + `::backdrop`)
- Use `inert` attribute on background content for non-dialog modals
- Restore focus to trigger element on close via a `returnFocus()` utility
- Remove the `focus-trap` npm dependency
