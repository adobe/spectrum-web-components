## Description

An `<sp-color-loupe>` shows the output color that would otherwise be covered by a cursor, stylus, or finger during color selection.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@future-ui/color-loupe?style=for-the-badge)](https://www.npmjs.com/package/@future-ui/color-loupe)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@future-ui/color-loupe?style=for-the-badge)](https://bundlephobia.com/result?p=@future-ui/color-loupe)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/crxLSSCXLFPpmUsM6GJQ/src/index.ts)

```
yarn add @future-ui/color-loupe
```

Import the side effectful registration of `<sp-color-loupe>` via:

```
import '@future-ui/color-loupe/sp-color-loupe.js';
```

When looking to leverage the `ColorLoupe` base class as a type and/or for extension purposes, do so via:

```
import { ColorLoupe } from '@future-ui/color-loupe';
```

## Example

```html
<sp-color-loupe open style="position: relative"></sp-color-loupe>
```
