<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Focus management

<!-- Document title (editable) -->

# Focus management

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [The three primitives](#the-three-primitives)
- [Choosing a focus strategy](#choosing-a-focus-strategy)
- [delegatesFocus: true](#delegatesfocus-true)
    - [When to use](#when-to-use)
    - [How to use](#how-to-use)
    - [Gotchas](#gotchas)
    - [CSS and focus styling](#css-and-focus-styling)
    - [Common mistakes (delegatesFocus)](#common-mistakes-delegatesfocus)
- [DisabledMixin](#disabledmixin)
    - [When to use](#when-to-use)
    - [How to use](#how-to-use)
    - [Why aria-disabled](#why-aria-disabled)
    - [Common mistakes (DisabledMixin)](#common-mistakes-disabledmixin)
- [FocusgroupNavigationController](#focusgroupnavigationcontroller)
    - [When to use](#when-to-use)
    - [How to use](#how-to-use)
    - [Configuration options](#configuration-options)
    - [Common mistakes (FocusgroupNavigationController)](#common-mistakes-focusgroupnavigationcontroller)
- [Focus utilities](#focus-utilities)
    - [getActiveElement()](#getactiveelement)
    - [focusableSelector and tabbableSelector](#focusableselector-and-tabbableselector)
    - [hasVisibleFocusInTree()](#hasvisiblefocusintree)
- [Migration from 1st-gen](#migration-from-1st-gen)
    - [Replacing Focusable base class](#replacing-focusable-base-class)
    - [Replacing focusElement getter](#replacing-focuselement-getter)
    - [Replacing FocusGroupController](#replacing-focusgroupcontroller)
- [Testing focus behavior](#testing-focus-behavior)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

## Overview

2nd-gen Spectrum Web Components use three composable, opt-in primitives for focus management instead of the 1st-gen `Focusable` base class inheritance chain. Each component picks only what it needs:

```
SpectrumElement (base, no focus logic)
 ├── + DisabledMixin                    (opt-in disabled state)
 ├── + delegatesFocus: true             (native browser focus delegation)
 └── + FocusgroupNavigationController   (opt-in roving tabindex + arrow keys)
```

This guide explains when and how to use each primitive, with correct examples and common mistakes to avoid.

> **Scope:** This guide covers core focus management for standard components. Overlay, dialog, and dropdown focus concerns (focus trapping, focus restoration, overlay stacking) are **out of scope** and will be documented when those components are migrated.

For the full technical rationale, see the [Focus Management Strategy RFC](../03_project-planning/05_strategies/focus-management-strategy-rfc.md).

---

## The three primitives

| Primitive | What it does | Import |
|-----------|-------------|--------|
| `delegatesFocus: true` | Browser-native focus delegation from host to first focusable child | Built-in (shadow root option) |
| `DisabledMixin` | Reactive `disabled` property with `aria-disabled`, tabindex, blur | `@spectrum-web-components/core/mixins` |
| `FocusgroupNavigationController` | Arrow key navigation + tabindex management for composite widgets (Open UI `focusgroup` aligned) | `@spectrum-web-components/core/controllers` |

---

## Choosing a focus strategy

Use this decision tree for every component:

1. **Does the component manage focus across child elements?** (e.g., tabs, radio group, menu)
   - **Yes** → Use `FocusgroupNavigationController`

2. **Does the host element itself receive focus?** (e.g., button, menu item)
   - **Yes** → Use `DisabledMixin` only. No delegation needed.

3. **Should focus go to a single inner element?** (e.g., textfield → `<input>`, link → `<a>`)
   - **Yes** → Use `delegatesFocus: true`. Ensure the focus target is the **first focusable element** in the shadow DOM template.

Most components also need `DisabledMixin` regardless of which focus strategy they use.

---

## delegatesFocus: true

### When to use

Use `delegatesFocus` when there is **exactly one place focus should ever go** inside the shadow root. This covers components like textfields, checkboxes, links, color inputs, and accordion items.

**Do not use** when:
- The component has multiple internal focus targets (e.g., combobox, multi-handle slider)
- The component manages its own focus routing (e.g., roving tabindex groups)
- The host element itself should be the focus target

### How to use

```typescript
import { DisabledMixin } from '@spectrum-web-components/core/mixins';
import { SpectrumElement } from '@spectrum-web-components/core/element';
import { html, css } from 'lit';

class SpCheckbox extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = css`
    /* Suppress host focus outline — the inner element owns the focus ring */
    :host {
      outline: none;
    }
    /* Container-level styling when focused */
    :host(:focus-within) {
      border-color: var(--spectrum-focus-indicator-color);
    }
    /* Keyboard focus ring on the actual interactive element */
    input:focus-visible {
      outline: 2px solid var(--spectrum-focus-indicator-color);
    }
  `;

  override render() {
    // The <input> MUST be the first focusable element in the template
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

  // Re-dispatch focus/blur as composed events so they cross the shadow boundary
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

### Gotchas

1. **Do not set `tabindex` on the host.** Adding `tabindex="0"` creates **two tab stops** — the host gets focus first, then the inner element. This breaks keyboard navigation entirely.

2. **Focus/blur events do not bubble out of the shadow root.** `delegatesFocus` handles focus *routing*, not event *bubbling*. If consumers need `focus`/`blur` events, you must re-dispatch them as composed events (see example above).

3. **The focus target must be first.** The browser always delegates to the **first focusable element** in the shadow DOM. If your template puts decorative elements or other controls before the primary interactive element, focus will land in the wrong place. Restructure the template if needed.

4. **`:focus` on the host is a pseudo-class match, not actual focus.** The host matches `:focus` for CSS styling when an inner element is focused, but `document.activeElement` still points to the host. Use `shadowRoot.activeElement` or `getActiveElement()` to find the real focused element.

### CSS and focus styling

| Selector | Where to use | Purpose |
|----------|-------------|---------|
| `:host(:focus-within)` | Host styles | Container-level styling when any descendant is focused |
| `:host(:focus)` | Host styles | Matches when inner element is focused (via delegation) |
| `input:focus-visible` | Shadow styles | Keyboard focus ring on the actual interactive element |
| `:host { outline: none; }` | Host styles | Suppress the default host focus outline to avoid double rings |

### Common mistakes (delegatesFocus)

```typescript
// BAD: tabindex on the host creates a double tab stop
class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0; // WRONG — creates two tab stops
  }
}
```

```typescript
// BAD: focus target is NOT the first focusable element
class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  override render() {
    return html`
      <button class="clear-btn">X</button>  <!-- Focus lands HERE, not the input -->
      <input type="text" />
    `;
  }
}
```

```typescript
// BAD: using delegatesFocus when the host should receive focus directly
class SpButton extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true, // WRONG — the host IS the interactive element
  };
}

// GOOD: host receives focus directly, no delegation needed
class SpButton extends DisabledMixin(SpectrumElement) {
  // No delegatesFocus — the host is the focus target
}
```

---

## DisabledMixin

### When to use

Any interactive component that can be disabled — buttons, inputs, links, menu items, sliders, etc. Most components that use `delegatesFocus` or `FocusgroupNavigationController` will also use `DisabledMixin`.

### How to use

```typescript
import { DisabledMixin } from '@spectrum-web-components/core/mixins';
import { SpectrumElement } from '@spectrum-web-components/core/element';
import { html } from 'lit';

class SpButton extends DisabledMixin(SpectrumElement) {
  override render() {
    return html`
      <!-- Also set disabled on the native inner element -->
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}
```

**What it does automatically:**
- Adds `disabled` as a reflected boolean property
- Sets `aria-disabled="true"` on the host when disabled
- Sets `tabindex="-1"` when disabled (preserves and restores the previous value)
- Blurs the element if it has focus when disabled
- Applies side effects in `update()` (before render) to prevent a 1-frame focusable gap

### Why aria-disabled

The mixin uses `aria-disabled` on the host instead of the native `disabled` attribute. This is intentional:

| | `disabled` | `aria-disabled` |
|--|-----------|-----------------|
| Focusable? | No — removed from tab order | Yes — remains keyboard-accessible |
| Click events? | Blocked by browser | Still fire (guard in handler) |
| Screen readers | Disabled + undiscoverable | Disabled but still discoverable |

Custom elements are not native form controls — the browser's `disabled` attribute has no built-in effect on a custom element host. Using `aria-disabled` keeps the element discoverable by assistive technology, which is generally better UX.

**Components wrapping native form controls** (textfield, checkbox, etc.) should **also** set `disabled` on the inner element in `render()` to get correct platform behavior.

For the full rationale, see [On disabled and aria-disabled attributes](https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/).

### Common mistakes (DisabledMixin)

```typescript
// BAD: not setting disabled on the inner native element
class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  override render() {
    // The inner <input> is still interactive even when host is "disabled"
    return html`<input type="text" />`; // WRONG — missing ?disabled=${this.disabled}
  }
}

// GOOD: propagate disabled to the inner element
class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  override render() {
    return html`<input type="text" ?disabled=${this.disabled} />`;
  }
}
```

```typescript
// BAD: using updated() instead of update() for disabled side effects
class SpButton extends DisabledMixin(SpectrumElement) {
  override updated(changed: PropertyValues) {
    super.updated(changed);
    // WRONG — this runs AFTER render, leaving a 1-frame gap where
    // the element is visually enabled but behaviorally disabled
    if (changed.has('disabled') && this.disabled) {
      this.style.pointerEvents = 'none';
    }
  }
}
```

```typescript
// BAD: not guarding click handlers when disabled
class SpButton extends DisabledMixin(SpectrumElement) {
  private handleClick() {
    // WRONG — aria-disabled doesn't block click events!
    this.dispatchEvent(new Event('action'));
  }

  // GOOD — guard against clicks when disabled
  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new Event('action'));
  }
}
```

---

## FocusgroupNavigationController

### When to use

Composite widgets that should appear as a **single tab stop** with arrow key navigation between children. This follows WAI-ARIA patterns for:
- Tablists (`<sp-tabs>`)
- Toolbars / action groups (`<sp-action-group>`)
- Radio groups (`<sp-radio-group>`)
- Menus (`<sp-menu>`)
- Listboxes, grids, tree views

The controller is aligned with the [Open UI `focusgroup` attribute](https://open-ui.org/components/focusgroup.explainer/) so it can deprecate gracefully as browsers ship native support.

### How to use

```typescript
import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers';
import { SpectrumElement } from '@spectrum-web-components/core/element';

class SpTabs extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-tab')] as HTMLElement[],
    direction: 'horizontal',
    wrap: true,
    // Auto-select tab on arrow key navigation
    onActiveItemChange: (tab) => {
      if (this.auto && tab) {
        this.selectTab(tab);
      }
    },
  });

  protected override firstUpdated(): void {
    super.firstUpdated();
    this.navigation.refresh();
  }

  // Expose the active item for external focus management
  get focusElement(): HTMLElement | null {
    return this.navigation.getActiveItem();
  }
}
```

**How it works at runtime:**

```
Tab into group → focus lands on element with tabindex="0":
  [ A: 0 ]  [ B: -1 ]  [ C: -1 ]  [ D: -1 ]

Arrow Right → tabindex swaps, focus moves to B:
  [ A: -1 ]  [ B: 0 ]  [ C: -1 ]  [ D: -1 ]

Tab out, then Tab back in → returns to B (memory: true, the default):
  [ A: -1 ]  [ B: 0 ]  [ C: -1 ]  [ D: -1 ]
```

### Configuration options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `getItems` | `() => HTMLElement[]` | **(required)** | Returns the current set of navigable items |
| `direction` | `FocusgroupDirection` | **(required)** | `'horizontal'`, `'vertical'`, `'both'`, or `'grid'` |
| `wrap` | `boolean` | `false` | Wrap from last to first (and reverse) at boundaries |
| `memory` | `boolean` | `true` | Re-enter at last-focused item on Tab |
| `skipDisabled` | `boolean` | `false` | Skip `disabled` and `aria-disabled="true"` items |
| `onActiveItemChange` | `(el: HTMLElement \| null) => void` | — | Callback after the active item changes |
| `pageStep` | `number` | — | Page Up/Down step size (items for linear, rows for grid). 0 or omitted disables page keys |

**Public methods:**

| Method | Description |
|--------|-------------|
| `getActiveItem()` | Returns the item currently holding `tabindex="0"`, or `null` |
| `setActiveItem(item)` | Sets the roving tab stop without calling `.focus()`. Returns `false` if ineligible |
| `refresh()` | Re-reads `getItems()`, applies roving tabindex, restores memory. Call after dynamic DOM changes |
| `setOptions(partial)` | Merges partial options and calls `refresh()` |
| `focusFirstItemByTextPrefix(prefix)` | Typeahead: sets active item to first match by `textContent`. Returns `true` if found |

**Key behaviors:**
- **RTL-aware** — Horizontal arrow keys respect the host's `dir` attribute
- **Grid mode** — Uses bounding-rect layout to derive rows and columns from actual element positions (no manual column count needed). Ctrl+Home / Ctrl+End jump to first/last cell
- **Capture-phase handlers** — Keyboard events are intercepted in the capture phase for reliable shadow DOM support
- **Custom event** — Dispatches `swc-focusgroup-navigation-active-change` (bubbling, composed) on active item changes

### Common mistakes (FocusgroupNavigationController)

```typescript
// BAD: getItems() returning a static array that goes stale
class SpTabs extends SpectrumElement {
  private tabs = [...this.querySelectorAll('sp-tab')]; // Captured once at construction

  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => this.tabs, // WRONG — won't reflect DOM changes
    direction: 'horizontal',
  });
}

// GOOD: getItems() queries live DOM every time
class SpTabs extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-tab')] as HTMLElement[],
    direction: 'horizontal',
  });
}
```

```typescript
// BAD: not calling refresh() after dynamic DOM changes
class SpMenu extends SpectrumElement {
  addItem(item: HTMLElement) {
    this.appendChild(item);
    // WRONG — controller may have stale tabindex state
  }
}

// GOOD: refresh after DOM mutations
class SpMenu extends SpectrumElement {
  addItem(item: HTMLElement) {
    this.appendChild(item);
    this.navigation.refresh();
  }
}
```

```typescript
// BAD: using skipDisabled when disabled items should remain focusable (e.g., menus)
class SpMenu extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-menu-item')] as HTMLElement[],
    direction: 'vertical',
    skipDisabled: true, // WRONG for menus — APG says disabled menu items may still be focusable
  });
}

// GOOD: leave skipDisabled as false (default) for menu patterns
class SpMenu extends SpectrumElement {
  private navigation = new FocusgroupNavigationController(this, {
    getItems: () => [...this.querySelectorAll('sp-menu-item')] as HTMLElement[],
    direction: 'vertical',
    // skipDisabled defaults to false — disabled items remain in sequence
  });
}
```

---

## Focus utilities

### getActiveElement()

Returns the deepest focused element by traversing shadow DOM boundaries. `document.activeElement` stops at shadow hosts — this follows the chain.

```typescript
import { getActiveElement } from '@spectrum-web-components/core/utils';

// Get the truly focused element across all shadow boundaries
const active = getActiveElement();

// Start from a specific root
const active = getActiveElement(this.getRootNode() as Document);
```

### focusableSelector and tabbableSelector

CSS selector strings matching focusable and tabbable elements per the HTML spec.

```typescript
import { focusableSelector, tabbableSelector } from '@spectrum-web-components/core/utils';

// Find the first focusable element in a container
const first = container.querySelector(focusableSelector);

// Find all tabbable elements (excludes tabindex="-1")
const tabbable = [...container.querySelectorAll(tabbableSelector)];
```

These use standard HTML focusability rules only. The 1st-gen `[focusable]` attribute selector is not included — native `delegatesFocus` replaces that workaround.

### hasVisibleFocusInTree()

Available on all `SpectrumElement` subclasses. Returns `true` if the deepest focused element in the current tree matches `:focus-visible` — i.e., the browser would show a focus ring.

```typescript
class SpButton extends SpectrumElement {
  private handleFocus() {
    if (this.hasVisibleFocusInTree()) {
      // Keyboard focus — show custom focus indicator
    }
  }
}
```

---

## Migration from 1st-gen

### Replacing Focusable base class

```typescript
// 1st-gen
import { Focusable } from '@spectrum-web-components/shared';

class SpTextfield extends Focusable {
  get focusElement() {
    return this.shadowRoot.querySelector('input');
  }
}

// 2nd-gen
import { DisabledMixin } from '@spectrum-web-components/core/mixins';
import { SpectrumElement } from '@spectrum-web-components/core/element';

class SpTextfield extends DisabledMixin(SpectrumElement) {
  static override shadowRootOptions = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };
  // No focusElement getter needed — browser handles it
}
```

> **⚠️ `aria-disabled` does not block click events.** Unlike the native `disabled` attribute used in 1st-gen's `Focusable`, `DisabledMixin` uses `aria-disabled` which leaves the element interactive at the DOM level. Every interaction handler must explicitly guard with `if (this.disabled) return;`. This is the most common migration mistake — in 1st-gen, the native `disabled` attribute on inner elements blocked clicks automatically; in 2nd-gen, you must guard them yourself.

### Replacing focusElement getter

The `focusElement` getter is no longer needed. `delegatesFocus: true` automatically delegates to the first focusable child. Make sure the focus target is first in the template:

```typescript
// 1st-gen: explicit focusElement
get focusElement() {
  return this.shadowRoot.querySelector('#inner-input');
}

// 2nd-gen: template order handles it
override render() {
  return html`
    <input id="inner-input" />  <!-- First focusable = focus target -->
    <span class="icon"></span>
  `;
}
```

### Replacing FocusGroupController

`FocusGroupController` and `RovingTabindexController` no longer exist as separate classes. Their logic is consolidated into `FocusgroupNavigationController`, which is aligned with the Open UI `focusgroup` attribute. If you were using either controller in 1st-gen, switch to `FocusgroupNavigationController`:

```typescript
// 1st-gen
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers';

// 2nd-gen
import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers';
```

Key API differences from 1st-gen:
- `elements` → `getItems` (function returning `HTMLElement[]`)
- `elementEnterAction` / `focusInIndex` → `onActiveItemChange` callback
- `isFocusableElement` → `skipDisabled` option (checks `disabled` + `aria-disabled`)
- `directionLength` → removed (grid uses bounding-rect layout automatically)
- `clearElementCache()` → `refresh()`
- New: `wrap`, `memory`, `pageStep`, `focusFirstItemByTextPrefix()`

---

## Testing focus behavior

When submitting a PR that affects focus management, you must verify:

**Keyboard testing:**
- [ ] Tab key moves focus into and out of the component correctly (single tab stop for roving groups)
- [ ] Arrow keys navigate within composite widgets in the expected direction
- [ ] Home/End jump to first/last item
- [ ] Disabled items are skipped during arrow key navigation
- [ ] Focus returns to the last-focused item when re-entering a roving group
- [ ] Focus ring is visible on keyboard focus (`:focus-visible`)
- [ ] No focus ring on mouse click

**Screen reader testing:**
- [ ] Component role and name are announced correctly
- [ ] Disabled state is announced (`aria-disabled`)
- [ ] Focus delegation announces the inner element, not the host

**Automated testing:**
- Write interaction tests using Storybook play functions to verify Tab, Arrow, Home/End behavior
- Include accessibility tests that validate ARIA snapshots

---

## Resources

- [Focus Management Strategy RFC](../03_project-planning/05_strategies/focus-management-strategy-rfc.md) — Full technical rationale
- [WAI-ARIA Roving Tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) — The pattern `FocusgroupNavigationController` implements
- [Open UI Focusgroup Explainer](https://open-ui.org/components/focusgroup.explainer/) — The emerging standard the controller aligns with
- [Shadow DOM delegatesFocus](https://frontendmasters.com/blog/shadow-dom-focus-delegation-getting-delegatesfocus-right/) — Implementation deep-dive
- [On disabled and aria-disabled](https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/) — Why `DisabledMixin` uses `aria-disabled`
- [Accessibility Testing Guide](09_accessibility-testing.md) — Automated and manual a11y testing
