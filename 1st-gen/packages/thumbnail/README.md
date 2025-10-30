## Overview

An `sp-thumbnail` can be used in a variety of locations as a way to display a preview of an image, layer, or effect.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/thumbnail?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/thumbnail)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/thumbnail?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/thumbnail)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-p4qyy5j2)

```zsh
yarn add @spectrum-web-components/thumbnail
```

Import the side effectful registration of `<sp-thumbnail>` via:

```js
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
```

When looking to leverage the `Thumbnail` base class as a type and/or for extension purposes, do so via:

```js
import { Thumbnail } from '@spectrum-web-components/thumbnail';
```

### Options

#### Sizes

<sp-tabs selected="500" auto label="Size Attribute Options">
<sp-tab value="50">50</sp-tab>
<sp-tab-panel value="50">

```html
<sp-thumbnail size="50">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="75">75</sp-tab>
<sp-tab-panel value="75">

```html
<sp-thumbnail size="75">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="100">100</sp-tab>
<sp-tab-panel value="100">

```html
<sp-thumbnail size="100">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="200">200</sp-tab>
<sp-tab-panel value="200">

```html
<sp-thumbnail size="200">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="300">300</sp-tab>
<sp-tab-panel value="300">

```html
<sp-thumbnail size="300">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="400">400</sp-tab>
<sp-tab-panel value="400">

```html
<sp-thumbnail size="400">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="500">500</sp-tab>
<sp-tab-panel value="500">

```html
<sp-thumbnail size="500">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="600">600</sp-tab>
<sp-tab-panel value="600">

```html
<sp-thumbnail size="600">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="700">700</sp-tab>
<sp-tab-panel value="700">

```html
<sp-thumbnail size="700">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="800">800</sp-tab>
<sp-tab-panel value="800">

```html
<sp-thumbnail size="800">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="900">900</sp-tab>
<sp-tab-panel value="900">

```html
<sp-thumbnail size="900">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="1000">1000</sp-tab>
<sp-tab-panel value="1000">

```html
<sp-thumbnail size="1000">
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
</sp-tabs>

#### Representing non-square content

By default, an `sp-thumbnail` will ensure that the entirety of the content that it respresents is visible by letterboxing that content with a checkerboard background when its aspect ratio is not square.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
    <sp-thumbnail>
        <img src="https://picsum.photos/300/400" alt="Demo Image" />
    </sp-thumbnail>

    <sp-thumbnail>
        <img src="https://picsum.photos/500/100" alt="Demo Image" />
    </sp-thumbnail>
</div>
```

The `background` attribute takes a string value of the CSS "background" property in order to customize the letterboxing.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
    <sp-thumbnail background="red">
        <img src="https://picsum.photos/300/400" alt="Demo Image" />
    </sp-thumbnail>

    <sp-thumbnail background="#00ff00">
        <img src="https://picsum.photos/500/100" alt="Demo Image" />
    </sp-thumbnail>
</div>
```

The `cover` attribute will cause the content to fill the space provided by the `sp-thumbnail` element:

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
    <sp-thumbnail cover>
        <img src="https://picsum.photos/300/400" alt="Demo Image" />
    </sp-thumbnail>

    <sp-thumbnail cover>
        <img src="https://picsum.photos/500/100" alt="Demo Image" />
    </sp-thumbnail>
</div>
```

#### Layer and Layer Selected

For when `sp-thumbail` is used in layer management (such as the Compact or Detail Layers panels). The thumbnail is given a thick blue border to indicate its selection when used in layer management.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
    <sp-thumbnail layer>
        <img src="https://picsum.photos/400/400" alt="Demo Image" />
    </sp-thumbnail>

    <sp-thumbnail layer selected>
        <img src="https://picsum.photos/500/100" alt="Demo Image" />
    </sp-thumbnail>
</div>
```

### States

#### Focused

When `focused` the `sp-thumbnail` element will be displayed as follows:

```html
<sp-thumbnail focused>
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

#### Disabled

Thumbnail should only be displayed as disabled if the entire component is also disabled.
When `disabled` the `sp-thumbnail` element will be displayed as follows:

```html
<sp-thumbnail disabled>
    <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

### Accessibility

`alt` attributes must be set on the `img` element inside of the `sp-thumbnail` element.
