## Description

`sp-dialog` displays important information that users need to acknowledge. They appear over the interface and block further interactions. When used directly the `sp-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)

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

## Examples

View this component in [Storybook](storybook/?path=/story/dialog).

## Variants

### Small

```html
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-dialog open size="small" force-inline>
    <h2 slot="title">Disclaimer</h2>
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

### Medium

```html
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-dialog open size="medium" force-inline>
    <h2 slot="title">Disclaimer</h2>
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

### Large

```html
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-dialog open size="large" force-inline>
    <h2 slot="title">Disclaimer</h2>
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

### Dismissible

```html
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-button
    onClick="this.nextElementSibling.open = !this.nextElementSibling.open"
    variant="primary"
>
    Toggle Dialog
</sp-button>
<sp-dialog open size="medium" dismissible force-inline>
    <h2 slot="title">Disclaimer</h2>
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
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-button
    onClick="this.nextElementSibling.nextElementSibling.toggleAttribute('force-inline')"
    variant="primary"
>
    Toggle `force-inline`
</sp-button>
<sp-button
    onClick="this.nextElementSibling.open = !this.nextElementSibling.open"
    variant="primary"
>
    Toggle Dialog
</sp-button>
<sp-dialog open size="medium" dismissible no-divider force-inline>
    <h2 slot="title">Disclaimer</h2>
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
<style>
    [force-inline] {
        /* force demo to display inline */
        position: relative;
        transform: none;
        margin: 0 auto;
        left: auto;
        top: auto;
    }
</style>
<sp-button
    onClick="this.nextElementSibling.open = !this.nextElementSibling.open"
    variant="primary"
>
    Toggle Dialog
</sp-button>
<sp-dialog open size="medium" dismissible no-divider force-inline>
    <div
        slot="hero"
        style="background-image: url(https://placedog.net/500/280)"
    ></div>
    <h2 slot="title">Disclaimer</h2>
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
