## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/alert-dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/alert-dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/alert-dialog)

```
yarn add @spectrum-web-components/alert-dialog
```

Import the side effectful registration of `<sp-alert-dialog>` via:

```
import '@spectrum-web-components/alert-dialog/sp-alert-dialog.js';
```

When looking to leverage the `AlertDialog` base class as a type and/or for extension purposes, do so via:

```
import { AlertDialog } from '@spectrum-web-components/alert-dialog';
```

## Example

```html
<sp-alert-dialog>
    <h2 slot="heading">Enable Smart Filters?</h2>
    <p>Something that might happen a lot is about to happen.</p>
    <p>
        The click events for the "OK" button are bound to the story not to the
        components in specific.
    </p>
</sp-alert-dialog>
```
