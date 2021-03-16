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
