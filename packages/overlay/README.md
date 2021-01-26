## Description

To ensure that content the requires it (modals, menus, etc) can escape overflow rules, the z-index, et al, Spectrum Web Components provides an overlay system that is made up of three interrelated elements, `<overlay-trigger>`, `<active-overlay>`, and `<sp-theme>`. DOM that should be overlaid on _hover_ (`[slot="hover-content"]`) and _click_ (`[slot="click-content"]`) are outlined in the light DOM content of an `<overlay-trigger>`. Said content will be overlayed onto the DOM via an `<active-overlay>` element that will be appended to the `<body>`. Content delivered in this way will acquire CSS Custom Properties for `color` and `size` from the trigger's nearest ancestor `<sp-theme>`.

Note: Cascading styles not applied via `<sp-theme>` are not currently projected along with the overlay content. To ensure that any additionoal styles for the overlaid content are applied, use the `style` attribute directly or encapsulate this content in a custom element that applies its styles via shadow DOM.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```
yarn add @spectrum-web-components/overlay
```

Import the side effectful registration of `<active-overlay>` or `<overlay-trigger>` via:

```
import '@spectrum-web-components/overlay/active-overlay.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
```

The default of `<overlay-trigger>` will load various dependencies asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<overlay-trigger>` as follows:

```
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
```

When looking to leverage the `ActiveOverlay` or `OverlayTrigger` base class as a type and/or for extension purposes, do so via:

```
import {
    ActiveOverlay,
    OverlayTrigger
} from '@spectrum-web-components/overlay';
```

## Example

```html
<style>
    overlay-trigger {
        flex: none;
    }

    .tooltip {
        background-color: var(--spectrum-global-color-gray-800);
        color: var(--spectrum-global-color-gray-50);
        padding: 4px 10px;
        font-size: 10px;
    }
</style>
<overlay-trigger id="trigger" placement="bottom" offset="6">
    <sp-button variant="primary" slot="trigger">Button popover</sp-button>
    <sp-popover dialog slot="click-content" direction="bottom" tip>
        <div class="options-popover-content">
            <sp-slider
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Awesomeness"
            ></sp-slider>
            <sp-button>Press me</sp-button>
        </div>
    </sp-popover>
    <sp-tooltip slot="hover-content" delayed>Tooltip</sp-tooltip>
</overlay-trigger>
```

## Accessibility

When using an `<overlay-trigger>` element, it is important to be sure the that content you project into `slot="trigger"` is "interactive". This means that an element within that branch of DOM will be able to receive focus and said element will appropriately convert keyboard interactions to `click` events similar to what you find with `<a href="#">Anchors</a>`, `<button>Buttons</button>`, etc. You can find further reading on the subject of accessible keyboard interactions at [https://www.w3.org/WAI/WCAG21/Understanding/keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard).
