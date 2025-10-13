## Description

The `RovingTabindexController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that implements the [roving tabindex pattern](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex), a key accessibility technique for managing keyboard navigation in composite widgets. This pattern allows multiple focusable elements to be represented by a single `tabindex=0` element in the tab order, while making all elements accessible via arrow keys. This enables keyboard users to quickly tab through a page without stopping on every item in a large collection.

### Features

- **Keyboard navigation**: Manages arrow key navigation (Left, Right, Up, Down, Home, End) through collections
- **Flexible direction modes**: Supports horizontal, vertical, both, and grid navigation patterns
- **Focus management**: Automatically manages `tabindex` attributes on elements
- **Customizable behavior**: Configure which element receives initial focus and how elements respond to keyboard input
- **Accessibility compliant**: Implements WCAG accessibility patterns for keyboard navigation

## API

The `RovingTabindexController` extends `FocusGroupController` and inherits all of its functionality while adding tabindex management capabilities.

### Constructor

```typescript
new RovingTabindexController<T extends HTMLElement>(
    host: ReactiveElement,
    config: RovingTabindexConfig<T>
)
```

**Parameters:**

- `host` (ReactiveElement): The host element that uses this controller
- `config` (RovingTabindexConfig<T>): Configuration object with the following options:

### Configuration options

#### `elements` (required)

- **Type**: `() => T[]`
- **Description**: Function that returns an array of elements to be managed by the controller

#### `direction`

- **Type**: `'horizontal' | 'vertical' | 'both' | 'grid' | (() => DirectionTypes)`
- **Default**: `'both'`
- **Description**: Defines which arrow keys are active:
    - `'horizontal'`: Only `ArrowLeft` and `ArrowRight`
    - `'vertical'`: Only `ArrowUp` and `ArrowDown`
    - `'both'`: All four arrow keys
    - `'grid'`: All four arrow keys with 2D grid navigation

#### `elementEnterAction`

- **Type**: `(el: T) => void`
- **Default**: No-op
- **Description**: Callback executed when an element receives focus, before the focus actually moves

#### `focusInIndex`

- **Type**: `(elements: T[]) => number`
- **Default**: `() => 0`
- **Description**: Determines which element receives `tabindex=0` when focus enters the container

#### `isFocusableElement`

- **Type**: `(el: T) => boolean`
- **Default**: `() => true`
- **Description**: Predicate to determine if an element can receive focus (useful for skipping disabled elements)

#### `hostDelegatesFocus`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether the host element uses `delegatesFocus` in its shadow root

#### `listenerScope`

- **Type**: `HTMLElement | (() => HTMLElement)`
- **Default**: Host element
- **Description**: Element to attach keyboard event listeners to

### Properties

#### `currentIndex`

- **Type**: `number`
- **Description**: Index of the currently focused element
- **Settable**: Yes

#### `direction`

- **Type**: `'horizontal' | 'vertical' | 'both' | 'grid'`
- **Description**: Current navigation direction mode
- **Settable**: Via configuration

#### `elements`

- **Type**: `T[]`
- **Description**: Array of managed elements
- **Settable**: No (computed from `elements` config function)

#### `focusInElement`

- **Type**: `T`
- **Description**: The element that should receive focus when entering the container
- **Settable**: No (computed from `focusInIndex`)

### Methods

#### `focus(options?: FocusOptions): void`

Focuses the current element in the managed collection.

#### `manageTabindexes(): void`

Updates `tabindex` attributes on all managed elements based on the current focus state.

#### `clearElementCache(offset?: number): void`

Clears the cached elements array and optionally sets an offset for virtualized lists.

#### `manage(): void`

Starts managing the elements (enables keyboard navigation).

#### `unmanage(): void`

Stops managing the elements (disables keyboard navigation and resets tabindexes).

#### `reset(): void`

Resets focus to the initial element defined by `focusInIndex`.

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `RovingTabindexController` via:

```
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
```

## Examples

### Basic usage

A `Container` element that manages a collection of `<sp-button>` elements:

```typescript
import { html, LitElement } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/button/sp-button.js';

class ButtonGroup extends LitElement {
    rovingTabindexController = new RovingTabindexController<Button>(this, {
        elements: () => [...this.querySelectorAll('sp-button')],
    });

    render() {
        return html`
            <div role="group" aria-label="Button group">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('button-group', ButtonGroup);
```

Usage:

```html
<button-group>
    <sp-button>First</sp-button>
    <sp-button>Second</sp-button>
    <sp-button>Third</sp-button>
</button-group>
```

### Horizontal navigation

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

### Selection with focus

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

This usage pattern is similar to what's seen in [`<sp-radio-group>`](../../packages/radio/).

### Vertical menu navigation

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

Usage:

```html
<vertical-menu>
    <sp-menu-item>New File</sp-menu-item>
    <sp-menu-item>Open File</sp-menu-item>
    <sp-menu-item disabled>Save</sp-menu-item>
    <sp-menu-item>Save As...</sp-menu-item>
</vertical-menu>
```

### Grid navigation

Implement 2D grid navigation:

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

### Tab panel navigation

Implement keyboard navigation for tabs:

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

### Composite widget with Home/End keys

Implement full keyboard support including Home and End keys:

```typescript
import { html, LitElement, css } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';

class ListBox extends LitElement {
    rovingTabindexController = new RovingTabindexController<HTMLElement>(this, {
        elements: () => [...this.querySelectorAll('[role="option"]')],
        direction: 'vertical',
        isFocusableElement: (option) => {
            return option.getAttribute('aria-disabled') !== 'true';
        },
    });

    static styles = css`
        :host {
            display: block;
            border: 1px solid var(--spectrum-global-color-gray-400);
            border-radius: 4px;
        }

        [role='option'] {
            padding: 8px 12px;
            cursor: pointer;
        }

        [role='option']:focus {
            background-color: var(--spectrum-global-color-blue-400);
            color: white;
            outline: none;
        }

        [role='option'][aria-disabled='true'] {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(event: KeyboardEvent) {
        // Home and End keys are handled by the controller
        if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
        }
    }

    render() {
        return html`
            <div role="listbox" aria-label="Options list">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('list-box', ListBox);
```

## Accessibility

The `RovingTabindexController` implements the W3C ARIA Authoring Practices Guide's [roving tabindex pattern](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex), which is essential for creating accessible composite widgets.

### Why use roving tabindex?

Without roving tabindex, keyboard users would need to press Tab through every item in a collection (e.g., every button in a toolbar or every option in a listbox). For large collections, this significantly degrades the keyboard navigation experience. Roving tabindex solves this by:

1. Including only one element in the tab order (`tabindex="0"`)
2. Making all other elements programmatically focusable (`tabindex="-1"`)
3. Managing arrow key navigation between elements
4. Updating `tabindex` values as focus moves

### ARIA roles and attributes

When using the `RovingTabindexController`, ensure you apply appropriate ARIA roles and attributes:

#### For toolbars:

```html
<div role="toolbar" aria-label="Formatting tools" aria-orientation="horizontal">
    <!-- Managed elements -->
</div>
```

#### For tab lists:

```html
<div role="tablist" aria-label="Content sections">
    <button role="tab" aria-selected="true">Tab 1</button>
    <button role="tab" aria-selected="false">Tab 2</button>
</div>
```

#### For listboxes:

```html
<div role="listbox" aria-label="Options">
    <div role="option" aria-selected="false">Option 1</div>
    <div role="option" aria-selected="false">Option 2</div>
</div>
```

#### For radiogroups:

```html
<div role="radiogroup" aria-label="Choices">
    <button role="radio" aria-checked="true">Choice 1</button>
    <button role="radio" aria-checked="false">Choice 2</button>
</div>
```

#### For menus:

```html
<div role="menu" aria-label="Actions" aria-orientation="vertical">
    <div role="menuitem">New</div>
    <div role="menuitem">Open</div>
</div>
```

### Keyboard support

The `RovingTabindexController` provides the following keyboard interactions:

| Key                 | Direction Mode         | Action                                              |
| ------------------- | ---------------------- | --------------------------------------------------- |
| **Tab**             | All                    | Moves focus into or out of the composite widget     |
| **→ (Right Arrow)** | horizontal, both, grid | Moves focus to the next element                     |
| **← (Left Arrow)**  | horizontal, both, grid | Moves focus to the previous element                 |
| **↓ (Down Arrow)**  | vertical, both, grid   | Moves focus to the next element (or down in grid)   |
| **↑ (Up Arrow)**    | vertical, both, grid   | Moves focus to the previous element (or up in grid) |
| **Home**            | All                    | Moves focus to the first element                    |
| **End**             | All                    | Moves focus to the last element                     |

### Focus indicators

Always provide clear visual focus indicators:

```css
.managed-element:focus {
    outline: 2px solid var(--spectrum-global-color-blue-400);
    outline-offset: 2px;
}

/* Or for high contrast */
@media (prefers-contrast: high) {
    .managed-element:focus {
        outline: 3px solid currentColor;
    }
}
```

### Disabled elements

Use the `isFocusableElement` option to skip disabled elements:

```typescript
rovingTabindexController = new RovingTabindexController<Button>(this, {
    elements: () => [...this.querySelectorAll('sp-button')],
    isFocusableElement: (button) => !button.disabled,
});
```

Ensure disabled elements have appropriate ARIA attributes:

```html
<sp-button disabled aria-disabled="true">Disabled</sp-button>
```

### Screen reader announcements

When selection changes, announce it to screen readers:

```typescript
elementEnterAction: (element) => {
    this.selected = element;

    // Update aria-selected
    this.elements.forEach((el) => {
        el.setAttribute('aria-selected', String(el === element));
    });

    // Optional: Announce change
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Selected: ${element.textContent}`;
    // ... add to DOM temporarily
};
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
- [Adobe Accessibility Guidelines](https://www.adobe.com/accessibility/products/spectrum.html)

## Events

The `RovingTabindexController` doesn't dispatch custom events directly. Host elements should dispatch their own events to communicate state changes (see examples above).

## Related components

The `RovingTabindexController` is used by these Spectrum Web Components:

- [`<sp-tabs>`](../../packages/tabs/) - Tab navigation
- [`<sp-radio-group>`](../../packages/radio/) - Radio button groups
- [`<sp-action-group>`](../../packages/action-group/) - Action button groups
- [`<sp-menu>`](../../packages/menu/) - Menu navigation
- [`<sp-table>`](../../packages/table/) - Table keyboard navigation

## Performance

- **Efficient tabindex updates**: Only updates tabindex when necessary
- **Element caching**: Caches the element list to avoid repeated DOM queries
- **Request animation frame**: Uses `requestAnimationFrame` for smooth tabindex updates

## Resources

- [Lit Reactive Controllers](https://lit.dev/docs/composition/controllers/) - Learn more about reactive controllers
- [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - Comprehensive guide to ARIA patterns
- [Managing focus with roving tabindex](https://web.dev/control-focus-with-tabindex/) - Web.dev article
- [Building accessible composite widgets](https://www.24a11y.com/2019/building-composite-widgets/)
