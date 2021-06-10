## Description

Some advanced slider uses require more than one handle. One example of this is the
range slider above. `sp-slider` supports an arbitrary number of handles via the `<sp-slider-handle>` sub-component, although it would be very rare to ever require more than two handles.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/slider)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/U7LQv7LsAVBwJayJXG3B/src/index.ts)

```
yarn add @spectrum-web-components/slider
```

Import the side effectful registration of `<sp-slider>` and `<sp-slider-handle>` via:

```
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/slider/sp-slider-handle.js';
```

## Examples

### Range Slider

This examples uses the `"range"` variant along with two handles to create a range slider.

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

## Multi-handle Slider with Ordered Handles

For slider handles that have the same numeric range, you can specify `min="previous"` or `max="next"` to constrain handles by the values of their neighbours.

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
