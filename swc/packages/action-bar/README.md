## Description

A `<sp-action-bar>` delivers a floating action bar that is a convenient way to deliver stateful actions in cases like selection mode. `<sp-action-bar>` can be deployed in two variants beyond the default: `[varient="fixed"]` to position the element in relation to the page, and `[variant=sticky]` to position the content in relation to content that may scroll.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-bar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-bar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-bar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-bar)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Tqvpr5Yolj9drzPab26O/src/index.ts)

```
yarn add @spectrum-web-components/action-bar
```

Import the side effectful registration of `<sp-action-bar>` via:

```
import '@spectrum-web-components/action-bar/sp-action-bar.js';
```

When looking to leverage the `ActionBar` base class as a type and/or for extension purposes, do so via:

```
import { ActionBar } from '@spectrum-web-components/action-bar';
```

## Example

```html
<sp-action-bar open>
    2 selected
    <sp-action-button slot="buttons" label="Edit">
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button slot="buttons" label="More">
        <sp-icon-more slot="icon"></sp-icon-more>
    </sp-action-button>
</sp-action-bar>
```

## Emphasized

Use the `emphasized` attribute to add priority to the information that is delivered within your `<sp-action-bar>` element:

```html
<sp-action-bar emphasized open>
    2 selected
    <sp-action-button slot="buttons" label="Edit">
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
    <sp-action-button slot="buttons" label="More">
        <sp-icon-more slot="icon"></sp-icon-more>
    </sp-action-button>
</sp-action-bar>
```

## Variants

### Fixed

When using `[variant="fixed"]`, the `<sp-action-bar>` will display by default at the bottom left of the window and can be customized via CSS from the outside.

```html
<h4>Look down and to the left when toggling.</h4>
<sp-button
    onclick="javascript:this.nextElementSibling.open = !this.nextElementSibling.open;"
>
    Toggle fixed action bar
</sp-button>
<sp-action-bar variant="fixed">2 selected</sp-action-bar>
```

### Sticky

When using `[variant="sticky"]`, be sure you've spent some time touching up on [how `sticky` really works](https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46) to ensure the most successful delivery of your content.

```html
<section style="position: relative; max-height: 6em; overflow: auto;">
    <h4>Scroll down for toggle button</h4>
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
        onclick="javascript:this.nextElementSibling.open = !this.nextElementSibling.open;"
    >
        Toggle sticky action bar
    </sp-button>
    <sp-action-bar variant="sticky" style="inset-block: 0px">
        2 selected
        <sp-action-button slot="buttons" label="Edit">
            <sp-icon-edit slot="icon"></sp-icon-edit>
        </sp-action-button>
        <sp-action-button slot="buttons" label="More">
            <sp-icon-more slot="icon"></sp-icon-more>
        </sp-action-button>
    </sp-action-bar>
</section>
```
