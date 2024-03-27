## Description

`<sp-slider>` allows users to quickly select a value within a range. They should be used when the upper and lower bounds of the range are invariable.

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

When leveraging the `editable` attribute, the `@spectrum-web-components/number-field/sp-number-field.js` dependency will be asynchronously loaded via a dynamic import to reduce JS payload for applications not leveraging this feature. In the case that you would like to import those transverse dependencies statically, import the side effectful registration of `<sp-slider>` as follows:

```
import '@spectrum-web-components/slider/sync/sp-slider.js';
```

When looking to leverage the `Slider` base class as a type and/or for extension purposes, do so via:

```
import { Slider } from '@spectrum-web-components/slider';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-slider label="Slider Label" size="s"></sp-slider>
<sp-slider label="Slider Label - Editable" editable size="s"></sp-slider>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-slider label="Slider Label"></sp-slider>
<sp-slider label="Slider Label - Editable" editable></sp-slider>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-slider label="Slider Label" size="l"></sp-slider>
<sp-slider label="Slider Label - Editable" editable size="l"></sp-slider>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-slider label="Slider Label" size="xl"></sp-slider>
<sp-slider label="Slider Label - Editable" editable size="xl"></sp-slider>
```

</sp-tab-panel>
</sp-tabs>

## Variants

### Standard

```html
<sp-slider label="Slider Label"></sp-slider>
<sp-slider label="Slider Label - Disabled" disabled></sp-slider>
```

### Filled

```html
<sp-slider
    label="Slider Label"
    max="1"
    variant="filled"
    min="0"
    value=".5"
    step="0.01"
></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    max="1"
    variant="filled"
    min="0"
    value=".5"
    step="0.01"
    disabled
></sp-slider>
```

### fill-start

When both `fill-start` and `variant="filled"` are used in `<sp-slider>`, the `fill-start` property takes priority, and the `variant="filled"` css will not apply.

```html
<sp-slider
    label="Slider Label"
    max="1"
    fill-start
    variant="filled"
    min="0"
    value=".5"
    step="0.01"
></sp-slider>
<sp-slider
    label="Slider Label"
    max="1"
    fill-start
    variant="filled"
    min="0"
    value=".5"
    step="0.01"
    disabled
></sp-slider>
```

### fill-start with value

```html
<sp-slider
    id="fill-start-slider"
    label="Fill Start greater than Value"
    max="1"
    min="0"
    value=".3"
    step="0.1"
    fill-start="0.7"
    variant="filled"
></sp-slider>
<sp-slider
    id="fill-start-slider"
    label="Fill Start less than Value"
    max="1"
    min="0"
    value=".7"
    step="0.1"
    fill-start="0.25"
    variant="filled"
></sp-slider>
<sp-slider
    label="Slider Label"
    max="1"
    min="0"
    value=".7"
    step="0.1"
    fill-start="0.25"
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

### Editable

An `<sp-slider>` element can be paired with an `<sp-number-field>` element via the `editable` attribute. The `<sp-number-field>` will be passed all of the standard options from the `<sp-slider>` element (e.g. `min`, `max`, `formatOptions`, etc.) and will also accept the `hide-stepper` attribute in order to prevent the display of its stepper UI.

```html
<sp-slider
    label="Angle (editable)"
    editable
    hide-stepper
    min="0"
    max="360"
    format-options='{
        "style": "unit",
        "unit": "degree",
        "unitDisplay": "narrow"
    }'
></sp-slider>
<sp-slider
    label="Hours of the day (editable)"
    editable
    max="24"
    min="0"
    value="7.25"
    step="0.25"
    style="--spectrum-slider-editable-number-field-width: 100px;"
    format-options='{
        "style": "unit",
        "unit": "hour"
    }'
></sp-slider>
```

#### Quiet

```html
<sp-slider quiet editable value="50"></sp-slider>
<sp-slider quiet disabled editable value="50"></sp-slider>
```

#### Default value

Slider will reset to its `default-value` when the user double clicks on the slider handle or if the user presses the `escape` key when the slider handle is focused.

```html
<sp-slider value="50" default-value="20"></sp-slider>
```

Note: If a slider with `default-value` attribute is contained in a modal and the slider-handle is focused then the following interaction will occur on pressing the `escape` key:

-   If the slider value is different from the default value then the slider value will be reset to the default value and the modal will not be closed.
-   If the slider value is equal to the default value then the modal will be closed.

#### Indeterminate

The indeterminate attribute will be passed to the internal `<sp-number-field>` element and alter its visual delivery until a change has been made to the `<sp-slider>` element at which point the `change` event that is dispatched can be understood as always removing the indeterminate attribute from the `<sp-slider>`.

```html
<sp-slider indeterminate editable value="50"></sp-slider>
<sp-slider indeterminate disabled editable value="50"></sp-slider>
```

## Advanced normalization

By default, `sp-slider` assumes a linear scale between the `min` and `max` values.
For advanced applications, it is sometimes necessary to specify a custom
"normalization."

Normalization is the process of converting a slider to a value between 0 and 1 where
0 represents the minimum and 1 represents the maximum. See the <a href="../../storybook/index.html?path=/story/slider--three-handles-complex" target="_blank">"Three Handles Complex" example in the playground</a>.

## Labels and Formatting

An `<sp-slider>` or `<sp-slider-handle>` element will process its numeric value with `new Intl.NumberFormat(this.resolvedLanguage, this.formatOptions).format(this.value)` in order to prepare it for visual delivery in the input. In order to customize this processing supply your own `Intl.NumberFormatOptions` via the `formatOptions` property, or `format-options` attribute as seen below.

`this.resolvedLanguage` represents the language in which the `<sp-slider>` or `<sp-slider-handle>` element is currently being delivered. By default, this value will represent the language established by the `lang` attribute on the root `<html>` element while falling back to `navigator.language` when that is not present. This value can be customized via a language context provided by a parent element that listens for the `sp-language-context` event and supplies updated language settings to the `callback` function contained therein. Applications leveraging the [`<sp-theme>`](./components/theme) element to manage the visual delivery or text direction of their content will also be provided a reactive context for supplying language information to its descendants.

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

More advanced formatting is available by specifying a formatting function to
the `getAriaHandleText` property on an `sp-slider` or `sp-slider-handle`. Or,
for a multi-handle slider, you can format the combined value label for all
handles by passing a formatting function to the `getAriaValueText` property
on the parent `sp-slider`.

### Units not included in `Intl.NumberFormatOptions`

While `Intl.NumberFormatOptions` does support a [wide range of units](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier), it is possible to encounter units (e.g. the graphics units of `pixel`, `pixels`, `points`, etc.) that are not supported therein. When this occurs, an `<sp-slider>` element will attempt to polyfill support for this unit. See the following example delivering `{ style: "unit", unit: "px" }` below:

```html
<sp-slider
    style="width: 200px"
    value="500"
    format-options='{
        "style": "unit",
        "unit": "px"
    }'
>
    Document width in pixels
</sp-slider>
```

Note: the polyfilling done here is very simplistic and is triggered by supplying options that would otherwise cause the `Intl.NumberFormat()` call to throw an error. Once the unsupporting unit of `px` causes the construction of the object to throw, a backup formatter/parser pair will be created without the supplied unit data. When the `style` is set to `unit`, the `unit` value will be adopted as the _static_ unit display. This means that neither pluralization nor translation will be handled within the `<sp-number-field>` element itself. If pluralization or translation is important to the delivered interface, please be sure to handle passing those strings into to element via the `formatOptions` property reactively to the value of the element or locale of that page in question.

### Label Visibility

By default, an `<sp-slider>` element has both a "text" label and a "value" label. The "value" label is output by the element itself based on its state, but the "text" label must be supplied by the consuming developer in order for the `<sp-slider>` to be delivered in an accessible manner.

Either or both of these can be suppressed visually as needed by your application UI, while still fulfilling their role in delivering a quality accessibility tree to the browser. This delivery is controlled by the `label-visibility` attribute (or `labelVisibility` property) which accepts `text`, `value`, or `none` as values.

Use `label-visibility="text"` to suppress the "value" label:

```html
<sp-slider
    label="No visible value label"
    label-visibility="text"
    value="50"
></sp-slider>
```

Use `label-visibility="value"` to suppress the "text" label:

```html
<sp-slider label="No visible text label" label-visibility="value"></sp-slider>
```

Use `label-visibility="none"` to suppress the "text" label:

```html
<sp-slider label="No visible labels" label-visibility="none"></sp-slider>
```

In each case outlined above the content for both labels will be made available to screen readers, so be sure to manage the content delivered to visitors in that context.

## Events

Like the `<input type="range">` element after which the `<sp-slider>` is fashioned, it will dispatch `input` events in a stream culminating with a `change` event (representing the final commit of the `value` to the element) once the user has finished interacting with the element. Both other these events can access the `value` of their dispatching target via `event.target.value`. In this way, a steaming listener pattern similar to the following can prove useful:

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
