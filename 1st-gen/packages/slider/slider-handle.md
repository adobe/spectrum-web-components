## Overview

Some advanced slider uses require more than one handle. One example of this is the
range slider. `<sp-slider>` supports multiple handles via the `<sp-slider-handle>` sub-component, although it would be very rare to ever require more than two handles.

`<sp-slider-handle>` is unnecessary for single-handle sliders. Always slot two or more `<sp-slider-handle>` components together.
To customize the properties of a single-handle slider (`normalization`, `value`, etc), set them on the `<sp-slider>` element directly.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/slider)

```
yarn add @spectrum-web-components/slider
```

Import the side effectful registration of `<sp-slider>` and `<sp-slider-handle>` via:

```
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/slider/sp-slider-handle.js';
```

## Anatomy

When two or more sliders are present, the `label` attribute can be used to identify each handle to assistive technology. For form submission, the `name` property is a unique identifier for each handle. Each handle will also have its own `value` based on its position on the slider.

```html
<sp-slider variant="range" step="1" min="0" max="255">
    Output Levels
    <sp-slider-handle
        slot="handle"
        name="min"
        label="Minimum"
        value="5"
    ></sp-slider-handle>
    <sp-slider-handle
        slot="handle"
        name="max"
        label="Maximum"
        value="250"
    ></sp-slider-handle>
</sp-slider>
```

For slider handles that have the same numeric range, you can specify `min="previous"` or `max="next"` to constrain handles by the values of their `previous/nextElementSiblings`. Keep in mind that the _first_ slider handle with not have a `previous` handle to be its `min` and the _last_ slider handle will not have a `next` handle to be its `max`.

```html
<sp-slider step="1" min="0" max="255">
    Output Levels
    <sp-slider-handle
        slot="handle"
        name="low"
        label="Low"
        value="5"
        max="next"
    ></sp-slider-handle>
    <sp-slider-handle
        slot="handle"
        name="mid"
        label="Mid"
        value="100"
        min="previous"
        max="next"
    ></sp-slider-handle>
    <sp-slider-handle
        slot="handle"
        name="high"
        label="High"
        value="250"
        min="previous"
    ></sp-slider-handle>
</sp-slider>
```

### Accessibility

#### Include a label

For sliders with more than one handle, each slider handle should have a label. A slider without a label is ambiguous and not accessible.

Review the accessibility guidelines for the [slider](../slider).
