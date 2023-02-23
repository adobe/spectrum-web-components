## Description

The `<sp-color-handle>` is used to select a colour on an `<sp-color-area>`, `<sp-color-slider>`, or `<sp-color-wheel>`. It functions similarly to the handle on an `<sp-slider>`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/color-handle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/color-handle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/color-handle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/color-handle)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/crxLSSCXLFPpmUsM6GJQ/src/index.ts)

```
yarn add @spectrum-web-components/color-handle
```

Import the side effectful registration of `<sp-color-handle>` via:

```
import '@spectrum-web-components/color-handle/sp-color-handle.js';
```

When looking to leverage the `ColorHandle` base class as a type and/or for extension purposes, do so via:

```
import { ColorHandle } from '@spectrum-web-components/color-handle';
```

## Standard

```html
<sp-color-handle></sp-color-handle>
```

## Disabled

```html
<sp-color-handle disabled></sp-color-handle>
```

## Open

When the `<sp-color-handle>` uses the `open` property, the `<sp-color-loupe>` component can be used above the handle to show the selected color that would otherwise be covered by a mouse, stylus, or finger on the down/touch state. This can be customized to appear only on finger-input, or always appear regardless of input type.

```html
<div style="height: 72px"></div>
<sp-color-handle open></sp-color-handle>
```
