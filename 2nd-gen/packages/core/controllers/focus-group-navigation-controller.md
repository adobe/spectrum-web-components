# Focus group navigation controller

`FocusgroupNavigationController` implements the [roving `tabindex` pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#managingfocuswithincomponentsusingarovingtabindex) from the ARIA Authoring Practices Guide (APG) and directional keyboard behavior aligned with the Open UI [`focusgroup` explainer](https://open-ui.org/components/scoped-focusgroup.explainer/). Use it inside Lit-based custom elements (or any `ReactiveElement`) until native `focusgroup` is widely available.

## What it does

- Collapses the tab sequence to **one** tab stop for the composite by setting `tabindex="0"` on the active item and `tabindex="-1"` on the others it manages.
- Moves focus with **Arrow** keys according to `direction`: horizontal (inline axis), vertical (block axis), or **grid** (rows and columns from layout).
- Supports **Home** / **End** to jump to the first or last item (for `grid`, order is visual row-major).
- Optional **wrap** (end wraps to start) and **memory** (Tab returns to the last focused item), similar to `wrap` and `nomemory` concepts in the `focusgroup` proposal.

## Import

```typescript
import {
  FocusgroupNavigationController,
  focusgroupNavigationActiveChange,
} from '@spectrum-web-components/core/controllers/focus-group-navigation-controller.js';
```

## Basic usage

1. Construct the controller in your element’s `constructor`, passing `getItems` and `direction`.
2. Ensure `getItems` returns live `HTMLElement` references (for example from `this.renderRoot` or slotted content).
3. After the first render, if items live in shadow DOM, call **`refresh()`** from `firstUpdated` (or after slotting) so roving tabindex can run once nodes exist.
4. Provide appropriate **roles** and **labels** on the host and items (the controller does not set ARIA roles).

### Example (horizontal toolbar)

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers/focus-group-navigation-controller.js';

@customElement('my-format-toolbar')
export class MyFormatToolbar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      gap: 4px;
    }
  `;

  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: 'horizontal',
    wrap: true,
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('button')),
  });

  protected override firstUpdated(): void {
    super.firstUpdated();
    this.navigation.refresh();
  }

  protected override render() {
    return html`
      <button type="button">Bold</button>
      <button type="button">Italic</button>
      <button type="button">Underline</button>
    `;
  }
}
```

### Example (vertical list, skip disabled)

```typescript
this.navigation = new FocusgroupNavigationController(this, {
  direction: 'vertical',
  wrap: true,
  skipDisabled: true,
  getItems: () =>
    Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>('[role="menuitem"]')
    ),
});
```

### Example (grid)

Use `direction: 'grid'` when items are laid out in rows (for example CSS Grid). The controller groups items into rows using bounding rectangles, then maps Arrow keys to cell movement. **Home** / **End** use visual row-major order.

## API

| Member                              | Description                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `setOptions(partial)`               | Merge new options and reapply roving tabindex.                                                                             |
| `refresh()`                         | Re-query items and sync tabindex (call after DOM changes).                                                                 |
| `focusItem(element, focusOptions?)` | Programmatically focus an item and update roving tabindex. Returns `false` if the element is not in the current item list. |
| `getActiveItem()`                   | Returns the item with `tabindex="0"`, if any.                                                                              |

### Events

On the host, the controller dispatches **`swc-focusgroup-navigation-active-change`** (`focusgroupNavigationActiveChange`) with `detail: { activeElement }` when the active item changes.

### Options

| Option               | Type                                   | Default    | Description                                     |
| -------------------- | -------------------------------------- | ---------- | ----------------------------------------------- |
| `getItems`           | `() => HTMLElement[]`                  | (required) | Current navigable items.                        |
| `direction`          | `'horizontal' \| 'vertical' \| 'grid'` | (required) | Arrow-key mode.                                 |
| `wrap`               | `boolean`                              | `false`    | Wrap at ends.                                   |
| `memory`             | `boolean`                              | `true`     | Remember last focused for re-entry via Tab.     |
| `skipDisabled`       | `boolean`                              | `false`    | Skip `disabled` / `aria-disabled="true"` items. |
| `onActiveItemChange` | `(el) => void`                         | —          | Callback when active item changes.              |

## RTL and writing modes

For `horizontal`, **ArrowLeft** / **ArrowRight** follow the host’s resolved `dir` (`rtl` swaps forward/back). Vertical grid movement uses row geometry; column movement respects `dir` for left/right.

## Relationship to native `focusgroup`

Native `focusgroup` would supply guaranteed tab stops, memory, and arrow behavior in the browser. This controller provides a **JavaScript** implementation for custom elements: you keep explicit ARIA roles and selection logic, and use the controller for tabindex and arrow-key focus movement.

## See also

- [Keyboard navigation inside components (APG)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [Focusgroup explainer (Open UI)](https://open-ui.org/components/scoped-focusgroup.explainer/)
