## Description

`<sp-slider>` allows users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/slider)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/U7LQv7LsAVBwJayJXG3B/src/index.ts)

```
yarn add @spectrum-web-components/slider
```

Import the side effectful registration of `<sp-slider>` via:

```
import '@spectrum-web-components/slider/sp-slider.js';
```

When looking to leverage the `Slider` base class as a type and/or for extension purposes, do so via:

```
import { Slider } from '@spectrum-web-components/slider';
```

## Variants

### Standard

```html
<sp-slider label="Slider Label"></sp-slider>
<sp-slider label="Slider Label - Disabled" disabled></sp-slider>
```

### Filled

```html
<sp-slider label="Slider Label" variant="filled"></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="filled"
    disabled
></sp-slider>
```

### Tick

```html
<sp-slider label="Slider Label" variant="tick" tick-step="5"></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="tick"
    tick-step="5"
    disabled
></sp-slider>
```

### Tick with Labels

```html
<sp-slider
    label="Slider Label"
    variant="tick"
    tick-step="5"
    tick-labels
></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="tick"
    tick-step="5"
    tick-labels
    disabled
></sp-slider>
```

### Ramp

```html
<sp-slider label="Slider Label" variant="ramp"></sp-slider>
<sp-slider label="Slider Label - Disabled" variant="ramp" disabled></sp-slider>
```

## Advanced normalization

By default, `sp-slider` assumes a linear scale between the `min` and `max` values.
For advanced applications, it is sometimes necessary to specify a custom
"normalization."

Normalization is the process of converting a slider to a value between 0 and 1 where
0 represents the minimum and 1 represents the maximum. See the <a href="storybook/index.html?path=/story/slider--three-handles-complex" target="_blank">"Three Handles Complex" example in the playground</a>.

## Labels and Formatting

An `<sp-slider>` or `<sp-slider-handle>` element will process its numeric value with `new Intl.NumberFormat(navigator.language, this.formatOptions).format(this.value)` in order to prepare it for visual delivery in the input. In order to customize this processing supply your own `Intl.NumberFormatOptions` via the `formatOptions` property, or `format-options` attribute as follows.

```html
<sp-slider
    min="0"
    max="1"
    step="0.01"
    value="0.5"
    label="Slider Label"
    format-options='{
        "style": "percent"
    }'
></sp-slider>
```

More advanced formatting is avialable by specifying a formatting function to
the `getAriaHandleText` property on an `sp-slider` or `sp-slider-handle`. Or,
for a multi-handle slider, you can format the combined value label for all
handles by passing a formatting function to the `getAriaValueText` property
on the parent `sp-slider`.

You can suppress the value label altogether using the `hide-value-label`
attribute.

```html
<sp-slider label="No value label" hide-value-label></sp-slider>
```

## Events

Like the `<input type="range">` element after which the `<sp-slider>` is fashioned it will dispatch `input` events in a stream culminating with a `change` event (representing the final comit of the `value` to the element) once the user has discontinued with the element. Both other these events can access the `value` of their dispatching target via `event.target.value`. In this way a steaming listener patters similar to the following can prove useful:

```javascript
const slider = document.querySelector('sp-slider');

const endListener = ({ target }) => {
    target.addEventListener('input', startListener);
    target.removeEventListener('input', streamListener);
    target.removeEventListener('change', endListener);
    console.log(target.value);
};

const streamListener = ({ target }) => {
    console.log(target.value);
};

const startListener = ({ target }) => {
    target.removeEventListener('input', startListener);
    target.addEventListener('input', streamListener);
    target.addEventListener('change', endListener);
    console.log(target.value);
};

slider.addEventListener('input', startListener);
```
