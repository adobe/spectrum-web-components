## Description

An `sp-thumbnail` can be used in a variety of locations as a way to display a preview of an image, layer, or effect. `sp-thumbnail` elements are not keyboard-focusable since they're intended to be used inside of a component that a user sets focus to (such as select lists or tree items).

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/thumbnail?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/thumbnail)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/thumbnail?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/thumbnail)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/OmypHtHAzCQKJ4wUD77Y/src/index.ts)

```
yarn add @spectrum-web-components/thumbnail
```

Import the side effectful registration of `<sp-thumbnail>` via:

```
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
```

When looking to leverage the `Thumbnail` base class as a type and/or for extension purposes, do so via:

```
import { Thumbnail } from '@spectrum-web-components/thumbnail';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="xss">Extra Extra Small</sp-tab>
<sp-tab-panel value="xxs">

```html
<sp-thumbnail size="xxs">
    <img src="https://place.dog/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="xs">Extra Small</sp-tab>
<sp-tab-panel value="xs">

```html
<sp-thumbnail size="xs">
    <img src="https://place.dog/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-thumbnail size="s">
    <img src="https://place.dog/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-thumbnail size="m">
    <img src="https://place.dog/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-thumbnail size="l">
    <img src="https://place.dog/100/100" alt="Demo Image" />
</sp-thumbnail>
```

</sp-tab-panel>
</sp-tabs>

## Focused or selected

When `focused` or `selected` the `sp-thumbnail` element will be displayed as follows:

```html
<div style="display: flex; gap: var(--spectrum-global-dimension-size-100);">
    <sp-thumbnail focused>
        <img src="https://place.dog/100/100" alt="Demo Image" />
    </sp-thumbnail>
    <sp-thumbnail selected>
        <img src="https://place.dog/100/100" alt="Demo Image" />
    </sp-thumbnail>
</div>
```

## Representing non-square content

By default, an `sp-thumbnail` will ensure that the entirety of the content that it respresents is visible by letterboxing that content with a checkerboard background when its aspect ratio is not square.

```html
<div style="display: flex; gap: var(--spectrum-global-dimension-size-100);">
    <sp-thumbnail>
        <img src="https://place.dog/300/400" alt="Eiffel Tower at night" />
    </sp-thumbnail>

    <sp-thumbnail>
        <img
            src="https://place.dog/500/100"
            alt="Landscape with mountains and lake"
        />
    </sp-thumbnail>
</div>
```

The `background` attribute takes a string value of the CSS "background" property in order to customize the letterboxing.

```html
<div style="display: flex; gap: var(--spectrum-global-dimension-size-100);">
    <sp-thumbnail background="red">
        <img src="https://place.dog/300/400" alt="Eiffel Tower at night" />
    </sp-thumbnail>

    <sp-thumbnail background="#00ff00">
        <img
            src="https://place.dog/500/100"
            alt="Landscape with mountains and lake"
        />
    </sp-thumbnail>
</div>
```

The `cover` attribute will cause the content to fill the space provided by the `sp-thumbnail` element:

```html
<div style="display: flex; gap: var(--spectrum-global-dimension-size-100);">
    <sp-thumbnail cover>
        <img src="https://place.dog/300/400" alt="Eiffel Tower at night" />
    </sp-thumbnail>

    <sp-thumbnail cover>
        <img
            src="https://place.dog/500/100"
            alt="Landscape with mountains and lake"
        />
    </sp-thumbnail>
</div>
```
