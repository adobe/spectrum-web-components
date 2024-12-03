## Description

An `<sp-color-loupe>` shows the output color that would otherwise be covered by a cursor, stylus, or finger during color selection.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-loupe?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-loupe)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-loupe?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-loupe)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/crxLSSCXLFPpmUsM6GJQ/src/index.ts)

```
yarn add @spectrum-web-components/color-loupe
```

Import the side effectful registration of `<sp-color-loupe>` via:

```
import '@spectrum-web-components/color-loupe/sp-color-loupe.js';
```

When looking to leverage the `ColorLoupe` base class as a type and/or for extension purposes, do so via:

```
import { ColorLoupe } from '@spectrum-web-components/color-loupe';
```

## Example

```html
<div style="padding: 100px 0 0;">
    <div style="position:relative">
        <sp-color-loupe open="" dir="ltr"></sp-color-loupe>
    </div>
</div>
```
