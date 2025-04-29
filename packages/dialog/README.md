## Overview

`sp-dialog` displays important information that users need to acknowledge. They appear over the interface and block further interactions. When used directly the `sp-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/RSDikStPmUPSioVpCsYb/src/index.ts)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```ts
import { Dialog } from '@spectrum-web-components/dialog';
```

### Anatomy

The dialog consists of several key parts:

-   A heading (via `slot="heading"`)
-   Content (via default slot)
-   Optional hero content (via `slot="hero"`)
-   Optional buttons (via `slot="button"`)
-   Optional footer content (via `slot="footer"`)
-   Optional dismiss button (via `dismissable` attribute)

```html
<sp-dialog size="s">
    <div
        slot="hero"
        style="background-image: url(https://picsum.photos/1400/260)"
    ></div>
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    <div slot="footer">Footer information</div>
    <sp-button slot="button">Button</sp-button>
</sp-dialog>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-dialog size="s">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-dialog size="m">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-dialog size="l">
    <h2 slot="heading">Disclaimer</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
    augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas diam
    in arcu cursus euismod quis viverra. Posuere ac ut consequat semper viverra
    nam libero justo laoreet. Enim ut tellus elementum sagittis vitae et leo
    duis ut. Neque laoreet suspendisse interdum consectetur libero id faucibus
    nisl. Diam volutpat commodo sed egestas egestas. Dolor magna eget est lorem
    ipsum dolor. Vitae suscipit tellus mauris a diam maecenas sed. Turpis in eu
    mi bibendum neque egestas congue. Rhoncus est pellentesque elit ullamcorper
    dignissim cras lobortis.
</sp-dialog>
```

</sp-tab-panel>
</sp-tabs>
