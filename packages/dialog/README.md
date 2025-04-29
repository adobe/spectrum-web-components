## Description

`sp-dialog` displays important information that users need to acknowledge. They appear over the interface and block further interactions. When used directly the `sp-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/RSDikStPmUPSioVpCsYb/src/index.ts)

```
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```
import '@spectrum-web-components/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```
import { Dialog } from '@spectrum-web-components/dialog';
```

## Sizes

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

## Variants

### Dismissable

When supplied with the `dissmissable` attribute an `<sp-dialog>` element will surface a "close" button afordance that will dispatch a DOM event with the name of `close` when pressed.

Note: the `dissmissable` attribute will not be followed when `mode="fullscreen"` or `mode="fullscreenTakeover"` are applies in accordance with the Spectrum specification.

```html
<sp-dialog size="m" dismissable>
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

### No Divider

```html
<sp-dialog size="m" dismissable no-divider>
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

### Hero

```html
<sp-dialog size="medium" dismissable no-divider>
    <div
        slot="hero"
        style="background-image: url(https://picsum.photos/1400/260)"
    ></div>
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
