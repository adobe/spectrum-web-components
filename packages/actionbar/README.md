## Description

A `<sp-actionbar>` delivers a floating action bar that is a convenient way to deliver stateful actions in cases like selection mode. `<sp-actionbar>` can be deployed in two variants beyond the default: `[varient="fixed"]`, to position the element in relation to the page, and `[variant=sticky]`, to position the content in relation to content that may scroll.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/actionbar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/actionbar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/actionbar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/actionbar)

```
yarn add @spectrum-web-components/actionbar
```

Import the side effectful registration of `<sp-actionbar>` via:

```
import '@spectrum-web-components/actionbar/sp-actionbar.js';
```

When looking to leverage the `Actionbar` base class as a type and/or for extension purposes, do so via:

```
import { Actionbar } from '@spectrum-web-components/actionbar';
```

## Example

```html
<sp-actionbar open>
    <sp-checkbox indeterminate>228 Selected</sp-checkbox>
    <div class="spectrum-ButtonGroup">
        <sp-action-button quiet label="Edit">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-action-button quiet label="More">
            <sp-icon-more slot="icon"></sp-icon-more>
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
    Toggle fixed actionbar
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
        Toggle sticky actionbar
    </sp-button>
</section>
```
