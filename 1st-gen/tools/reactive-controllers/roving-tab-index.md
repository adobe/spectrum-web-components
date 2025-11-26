## Overview

The `RovingTabindexController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that implements the [roving tabindex pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex), a key accessibility technique for managing keyboard navigation in composite widgets. This pattern allows multiple focusable elements to be represented by a single `tabindex=0` element in the tab order, while making all elements accessible via arrow keys. This enables keyboard users to quickly tab through a page without stopping on every item in a large collection.

### Features

- **Keyboard navigation**: Manages arrow key navigation (Left, Right, Up, Down, Home, End) through collections
- **Flexible direction modes**: Supports horizontal, vertical, both, and grid navigation patterns
- **Focus management**: Automatically manages `tabindex` attributes on elements
- **Customizable behavior**: Configure which element receives initial focus and how elements respond to keyboard input
- **Accessibility compliant**: Implements WCAG accessibility patterns for keyboard navigation

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `RovingTabindexController` via:

```typescript
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
```

### Examples

#### Basic usage

A Container element that manages a collection of `<sp-button>` elements that are slotted into it from outside might look like the following:

```typescript
import { html, LitElement } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';

class Container extends LitElement {
    rovingTabindexController = new RovingTabindexController()<Button>(this, {
        elements: () => [...this.querySelectorAll('sp-button')],
    });

    render() {
        return html`
            <slot></slot>
        `;
    }
}
```

The above will default to entering the Container element via the first `<sp-button>` element every time while making all slotted `<sp-button>` elements accessible via the the arrow key (ArrowLeft, ArrowRight, ArrowUp, and ArrowDown) managed tab order.

#### Configuration options

A `Container` can further customize the implementation of the `RovingTabindexController` with the following options:

- `direction` to customize how and which arrow keys manage what element is to be focused and accepts a either a string of `both`, `vertical`, `horizontal`, or `grid` or a method returning one of those strings
- `elementEnterAction` enacts actions other than `focus` on the entered element which accepts a method with a signature of `(el: T) => void`
- `elements` provides the elements that will have their `tabindex` managed via a method with a signature of `() => T[]`
- `focusInIndex` to control what element will recieve `tabindex=0` while focus is outside of the `Container` and accepts a method with a signature of `(_elements: T[]) => number`
- `isFocusableElement` describes the state an element much be in to receive `focus` via a method with a signature of `(el: T) => boolean`
- `listenerScope` outlines which parts on a container's DOM when listening for arrow key presses via an element reference or a method returning an element reference with the signature `() => HTMLElement`

#### Horizontal navigation

Restrict navigation to horizontal arrow keys only:

```typescript
import { html, LitElement } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';

class HorizontalToolbar extends LitElement {
    rovingTabindexController = new RovingTabindexController<Button>(this, {
        elements: () => [...this.querySelectorAll('sp-button')],
        direction: 'horizontal',
    });

    render() {
        return html`
            <div
                role="toolbar"
                aria-label="Formatting toolbar"
                aria-orientation="horizontal"
            >
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('horizontal-toolbar', HorizontalToolbar);
```

#### Selection with focus

Make the focused element the selected one:

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';

class SelectableGroup extends LitElement {
    @property({ attribute: false })
    selected?: Button;

    rovingTabindexController = new RovingTabindexController<Button>(this, {
        elements: () => [...this.querySelectorAll('sp-button')],
        direction: 'horizontal',
        focusInIndex: (buttons) => {
            return this.selected ? buttons.indexOf(this.selected) : 0;
        },
        elementEnterAction: (button) => {
            this.selected = button;
            // Update visual selection
            this.updateSelection();
        },
        isFocusableElement: (button) => !button.disabled,
    });

    static styles = css`
        ::slotted(sp-button[selected]) {
            background-color: var(--spectrum-global-color-blue-400);
        }
    `;

    updateSelection() {
        this.querySelectorAll('sp-button').forEach((button) => {
            button.toggleAttribute('selected', button === this.selected);
            button.setAttribute(
                'aria-selected',
                String(button === this.selected)
            );
        });
    }

    render() {
        return html`
            <div role="radiogroup" aria-label="Options">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('selectable-group', SelectableGroup);
```

This usage pattern is similar to what's seen in [`<sp-radio-group>`](../../components/radio/).

#### Vertical menu navigation

Create a vertical menu with arrow key navigation:

```typescript
import { html, LitElement, css } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import type { MenuItem } from '@spectrum-web-components/menu';

class VerticalMenu extends LitElement {
    rovingTabindexController = new RovingTabindexController<MenuItem>(this, {
        elements: () => [...this.querySelectorAll('sp-menu-item')],
        direction: 'vertical',
        isFocusableElement: (item) => !item.disabled,
    });

    static styles = css`
        :host {
            display: block;
            border: 1px solid var(--spectrum-global-color-gray-300);
            border-radius: 4px;
            padding: 4px 0;
        }
    `;

    render() {
        return html`
            <div role="menu" aria-label="Menu" aria-orientation="vertical">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('vertical-menu', VerticalMenu);
```

#### Grid navigation

Implements a 2D grid navigation:

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

class GridNavigator extends LitElement {
    @property({ type: Number })
    columns = 3;

    rovingTabindexController = new RovingTabindexController<HTMLElement>(this, {
        elements: () => [...this.querySelectorAll('.grid-item')],
        direction: 'grid',
    });

    static styles = css`
        .grid {
            display: grid;
            grid-template-columns: repeat(var(--columns, 3), 1fr);
            gap: 8px;
        }

        .grid-item {
            padding: 16px;
            border: 2px solid var(--spectrum-global-color-gray-300);
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
        }

        .grid-item:focus {
            outline: 2px solid var(--spectrum-global-color-blue-400);
            outline-offset: 2px;
        }
    `;

    updated() {
        // Set the grid column count for the controller
        this.rovingTabindexController.directionLength = this.columns;
    }

    render() {
        return html`
            <div
                class="grid"
                style="--columns: ${this.columns}"
                role="grid"
                aria-label="Grid navigator"
            >
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('grid-navigator', GridNavigator);
```

#### Tab panel navigation

Implements keyboard navigation for tabs:

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import type { Tab } from '@spectrum-web-components/tabs';

class TabList extends LitElement {
    @property({ attribute: false })
    selectedTab?: Tab;

    rovingTabindexController = new RovingTabindexController<Tab>(this, {
        elements: () => [...this.querySelectorAll('sp-tab')],
        direction: 'horizontal',
        focusInIndex: (tabs) => {
            return this.selectedTab ? tabs.indexOf(this.selectedTab) : 0;
        },
        elementEnterAction: (tab) => {
            this.selectTab(tab);
        },
        isFocusableElement: (tab) => !tab.disabled,
    });

    selectTab(tab: Tab) {
        this.selectedTab = tab;

        // Update ARIA attributes
        this.querySelectorAll('sp-tab').forEach((t) => {
            t.setAttribute('aria-selected', String(t === tab));
            t.setAttribute('tabindex', t === tab ? '0' : '-1');
        });

        // Dispatch event
        this.dispatchEvent(
            new CustomEvent('tab-select', {
                detail: { tab },
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <div role="tablist" aria-label="Content sections">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('tab-list', TabList);
```

### Accessibility

The `RovingTabindexController` implements the W3C ARIA Authoring Practices Guide's [roving tabindex pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex), which is essential for creating accessible composite widgets.

#### Why use roving tabindex?

Without roving tabindex, keyboard users would need to press Tab through every item in a collection (e.g., every button in a toolbar or every option in a listbox). For large collections, this significantly degrades the keyboard navigation experience. Roving tabindex solves this by:

1. Including only one element in the tab order (`tabindex="0"`)
2. Making all other elements programmatically focusable (`tabindex="-1"`)
3. Managing arrow key navigation between elements
4. Updating `tabindex` values as focus moves

#### ARIA roles and attributes

When using the `RovingTabindexController`, ensure you apply appropriate ARIA roles and attributes:

<sp-tabs selected="toolbars" auto label="For toolbars">
<sp-tab value="toolbars">For toolbars</sp-tab>
<sp-tab-panel value="toolbars">

```html-no-demo
<div role="toolbar" aria-label="Formatting tools" aria-orientation="horizontal">
    <!-- Managed elements -->
</div>
```

</sp-tab-panel>
<sp-tab value="tablist">For tab lists</sp-tab>
<sp-tab-panel value="tablist">

```html-no-demo
<div role="tablist" aria-label="Content sections">
    <button role="tab" aria-selected="true">Tab 1</button>
    <button role="tab" aria-selected="false">Tab 2</button>
</div>
```

</sp-tab-panel>
<sp-tab value="listboxes">For listboxes</sp-tab>
<sp-tab-panel value="listboxes">

```html-no-demo
<div role="listbox" aria-label="Options">
    <div role="option" aria-selected="false">Option 1</div>
    <div role="option" aria-selected="false">Option 2</div>
</div>
```

</sp-tab-panel>
<sp-tab value="radiogroups">For Radiogroups</sp-tab>
<sp-tab-panel value="radiogroups">

```html-no-demo
<div role="radiogroup" aria-label="Choices">
    <button role="radio" aria-checked="true">Choice 1</button>
    <button role="radio" aria-checked="false">Choice 2</button>
</div>
```

</sp-tab-panel>
<sp-tab value="menus">For menus</sp-tab>
<sp-tab-panel value="menus">

```html-no-demo
<div role="menu" aria-label="Actions" aria-orientation="vertical">
    <div role="menuitem">New</div>
    <div role="menuitem">Open</div>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Keyboard support

The `RovingTabindexController` provides the following keyboard interactions:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Key</sp-table-head-cell>
        <sp-table-head-cell>Direction Mode</sp-table-head-cell>
        <sp-table-head-cell>Action</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><kbd>Tab</kbd></sp-table-cell>
            <sp-table-cell>All</sp-table-cell>
            <sp-table-cell>Moves focus into or out of the composite widget</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>→</kbd> (Right Arrow)</sp-table-cell>
            <sp-table-cell>horizontal, both, grid</sp-table-cell>
            <sp-table-cell>Moves focus to the next element</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>←</kbd>(Left Arrow)</sp-table-cell>
            <sp-table-cell>horizontal, both, grid</sp-table-cell>
            <sp-table-cell>Moves focus to the previous element</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>↓</kbd> (Down Arrow)</sp-table-cell>
            <sp-table-cell>vertical, both, grid</sp-table-cell>
            <sp-table-cell>Moves focus to the next element (or down in grid)</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>↑</kbd> (Up Arrow)</sp-table-cell>
            <sp-table-cell>vertical, both, grid</sp-table-cell>
            <sp-table-cell>Moves focus to the previous element (or up in grid)</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

#### Disabled elements

**Important:** According to [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols), disabled items should remain focusable in these composite widgets:

- Options in a Listbox
- Menu items in a Menu or menu bar
- Tab elements in a set of Tabs
- Tree items in a Tree View

For these widgets, use `aria-disabled="true"` instead of the `disabled` attribute so items can still receive focus and be read in screen readers' forms/interactive mode:

```typescript
// For menu items, tabs, listbox options - DO NOT skip disabled items
rovingTabindexController = new RovingTabindexController<MenuItem>(this, {
    elements: () => [...this.querySelectorAll('sp-menu-item')],
    // Disabled items remain focusable for accessibility
    isFocusableElement: (item) => true,
});
```

For other controls like buttons or form inputs where disabled items should be skipped:

```typescript
// For buttons/forms - skip disabled items
rovingTabindexController = new RovingTabindexController<Button>(this, {
    elements: () => [...this.querySelectorAll('sp-button')],
    isFocusableElement: (button) => !button.disabled,
});
```

```html-no-demo
<!-- Buttons can use disabled attribute -->
<sp-button disabled>Disabled Button</sp-button>
```

### WCAG compliance

The roving tabindex pattern helps meet several WCAG success criteria:

- [2.1.1 Keyboard (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) - All functionality is available from keyboard
- [2.1.3 Keyboard (No Exception) (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-no-exception.html) - No keyboard traps
- [2.4.7 Focus Visible (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) - Focus indicator is visible

### References

- [ARIA Authoring Practices Guide - Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [ARIA Authoring Practices Guide - Composite Widgets](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_general_within)
- [WCAG 2.1 - Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible)

### Related components

The `RovingTabindexController` is used by these Spectrum Web Components:

- [`<sp-tabs>`](../../components/tabs/) - Tab navigation
- [`<sp-radio-group>`](../../components/radio/) - Radio button groups
- [`<sp-action-group>`](../../components/action-group/) - Action button groups
- [`<sp-menu>`](../../components/menu/) - Menu navigation
- [`<sp-table>`](../../components/table/) - Table keyboard navigation
