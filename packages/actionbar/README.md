## Overview

A `<sp-actionbar>` delivers a floating action bar that is a convenient way to deliver stateful actions in cases like selection mode. `<sp-actionbar>` can be deployed in two variants beyond the default: `[varient="fixed"]`, to position the element in relation to the page, and `[variant=sticky]`, to position the content in relation to content that may scroll.

### Installation

```
npm install @spectrum-web-components/actionbar

# or

yarn add @spectrum-web-components/actionbar
```

## Example

```html
<sp-actionbar open>
    <sp-checkbox indeterminate>228 Selected</sp-checkbox>
    <div class="spectrum-ButtonGroup">
        <sp-action-button quiet>
            <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
        </sp-action-button>
        <sp-action-button quiet>
            <svg slot="icon" id="spectrum-icon-18-More" viewBox="0 0 36 36">
                <circle cx="17.8" cy="18.2" r="3.4"></circle>
                <circle cx="29.5" cy="18.2" r="3.4"></circle>
                <circle cx="6.1" cy="18.2" r="3.4"></circle>
            </svg>
        </sp-action-button>
    </div>
</sp-actionbar>
```

## Variants

### Fixed

When using `[variant="fixed"]`, the `<sp-actionbar>` will display by default at the bottom left of the window and can be customized via CSS from the outside.

```html
<h4>Look down and to the left when toggling.</h4>
<sp-actionbar variant="fixed">
    <sp-checkbox indeterminate>228 Selected</sp-checkbox>
</sp-actionbar>
<sp-button
    onclick="javascript:this.previousElementSibling.open = !this.previousElementSibling.open;"
>
    Toggle Fixed Actionbar
</sp-button>
```

### Sticky

When using `[variant="sticky"]`, be sure you've spent some time touching up on [how `sticky` really works](https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46) to ensure the most successful delivery of your content.

```html
<section style="position: relative; max-height: 6em; overflow: auto;">
    <h4>Scroll down for toggle button</h4>
    <sp-actionbar variant="sticky" style="top: 0;">
        <sp-checkbox indeterminate>228 Selected</sp-checkbox>
    </sp-actionbar>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
    </p>
    <sp-button
        onclick="javascript:this.previousElementSibling.previousElementSibling.open = !this.previousElementSibling.previousElementSibling.open;"
    >
        Toggle Sticky Actionbar
    </sp-button>
</section>
```
