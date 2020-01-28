## Description

To ensure that content the requires it (modals, menus, etc) can escape overflow rules, the z-index, et al, Spectrum Web Components provides an overlay system that is made up of three interrelated elements, `<overlay-trigger>`, `<active-overlay>`, and `<sp-theme>`. DOM that should be overlaid on _hover_ (`[slot="hover-content"]`) and _click_ (`[slot="click-content"]`) are outlined in the light DOM content of an `<overlay-trigger>`. Said content will be overlayed onto the DOM via an `<active-overlay>` element that will be appended to the `<body>`. Content delivered in this way will acquire CSS Custom Properties for `color` and `size` from the trigger's nearest ancestor `<sp-theme>`.

Note: Cascading styles not applied via `<sp-theme>` are not currently projected along with the overlay content. To ensure that any additionoal styles for the overlaid content are applied, use the `style` attribute directly or encapsulate this content in a custom element that applies its styles via shadow DOM.

### Installation

```
npm install @spectrum-web-components/overlay

# or

yarn add @spectrum-web-components/overlay
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
    <sp-button variant="primary" slot="trigger">
        Bottom Popover
    </sp-button>
    <sp-popover dialog slot="click-content" direction="bottom" tip open>
        <div class="options-popover-content">
            <sp-slider
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Awesomeness"
            ></sp-slider>
            <sp-button>Press Me</sp-button>
        </div>
    </sp-popover>
    <div slot="hover-content" class="tooltip" delay="100">
        Tooltip
    </div>
</overlay-trigger>
```
