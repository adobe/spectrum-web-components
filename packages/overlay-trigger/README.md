## Overview

An **overlay-trigger** is used to overlay content that is positioned relative to
another control. Two kinds of triggers are supported, `hover` and `click`. Each
may have it's own content.

Please note that you need to wrap your UI in an
[`overlay-root`](/components/overlay-root) component, which acts as a host for
the overlay content. You only need a single `overlay-root` for all of your
overlays.

### Installation

```
npm install @spectrum-web-components/overlay-trigger

# or

yarn add @spectrum-web-components/overlay-trigger
```

## Example

```html
<style>
    overlay-root {
        position: relative;
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

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
<overlay-root placement="bottom" offset="6">
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
</overlay-root>
```
