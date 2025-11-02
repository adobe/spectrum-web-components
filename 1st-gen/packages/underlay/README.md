## Overview

An `<sp-underlay>` provides a visual layer between overlay content and the rest of your application. It is commonly used with modal dialogs and other overlay elements to create a visual separation and prevent interaction with the background content while the overlay is active.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/underlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/underlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/underlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/underlay)

```
yarn add @spectrum-web-components/underlay
```

Import the side effectful registration of `<sp-underlay>` via:

```
import '@spectrum-web-components/underlay/sp-underlay.js';
```

When looking to leverage the `Underlay` base class as a type and/or for extension purposes, do so via:

```
import { Underlay } from '@spectrum-web-components/underlay';
```

### Examples

#### Basic Usage

When using an `<sp-underlay>` with overlay content, place it as a sibling element before your overlay content.

```html
<style>
    sp-underlay:not([open]) + sp-dialog {
        display: none;
    }
    sp-underlay + sp-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        background: var(--spectrum-gray-100);
    }
</style>

<sp-button
    onclick="
        console.log(this.nextElementSibling);
        this.nextElementSibling.open = true;
    "
>
    Open dialog with underlay element
</sp-button>

<sp-underlay></sp-underlay>
<sp-dialog size="s">
    <h1 slot="heading">Hello, I'm an overlay!</h1>
    <p>Enjoy your day...</p>
    <sp-button
        slot="button"
        onclick="
            this.parentElement.previousElementSibling.open = false;
        "
    >
        Close
    </sp-button>
</sp-dialog>
```

### Styling

To ensure proper layering of your overlay content with the underlay, use appropriate CSS:

```html
<style>
    /* Hide overlay content when underlay is closed */
    sp-underlay:not([open]) + sp-dialog {
        display: none;
    }

    /* Position overlay content above the underlay */
    sp-underlay + sp-dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }
</style>
```

### Accessibility

The `<sp-underlay>` element helps create an accessible modal experience by:

1. Providing visual separation between modal content and the rest of the page
2. Supporting proper focus management when used with modal dialogs
3. Helping communicate the modal state to assistive technologies
