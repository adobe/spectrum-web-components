## Overview

`<sp-number-field>` elements are used for numeric inputs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/number-field?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/number-field)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/number-field?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/number-field)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-drmcfxlv)

```
yarn add @spectrum-web-components/number-field
```

Import the side effectful registration of `<sp-number-field>` via:

```
import '@spectrum-web-components/number-field/sp-number-field.js';
```

When looking to leverage the `NumberField` base class as a type and/or for extension purposes, do so via:

```
import { NumberField } from '@spectrum-web-components/number-field';
```

### Anatomy

A number field consists of an input field for numeric values and optional stepper buttons for incrementing and decrementing the value. The stepper UI can be hidden using the `hide-stepper` attribute.

```html
<sp-number-field
    format-options='{
        "style": "unit",
        "unit": "MPH",
        "unitDisplay": "long"
    }'
>
    What is the air-speed velocity of an unladen swallow?
</sp-number-field>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-number-field label="Size" value="1024" size="s"></sp-number-field>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-number-field label="Size" value="1024" size="m"></sp-number-field>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-number-field label="Size" value="1024" size="l"></sp-number-field>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-number-field label="Size" value="1024" size="xl"></sp-number-field>
```

</sp-tab-panel>
</sp-tabs>

#### Formatting

An `<sp-number-field>` element will process its numeric value with `new Intl.NumberFormat(this.resolvedLanguage, this.formatOptions).format(this.value)` in order to prepare it for visual delivery in the input. In order to customize this processing supply your own `Intl.NumberFormatOptions` via the `formatOptions` property, or `format-options` attribute as seen below.

`this.resolvedLanguage` represents the language in which the `<sp-number-field>` element is currently being delivered. By default, this value will represent the language established by the `lang` attribute on the root `<html>` element while falling back to `navigator.language` when that is not present. This value can be customized via a language context provided by a parent element that listens for the `sp-language-context` event and supplies update language settings to the `callback` function contained therein. Applications leveraging the [`<sp-theme>`](./components/theme) element to manage the visual delivery or text direction of their content will be also be provided a reactive context for supplying language information to its descendants.

<sp-tabs selected="decimals" auto label="Number Formatting">
<sp-tab value="decimals">Decimals</sp-tab>
<sp-tab-panel value="decimals">

The following example uses the `signDisplay` option to include the plus sign for positive numbers, for example to display an offset from some value. In addition, it always displays a minimum of 1 digit after the decimal point, and allows up to 2 fraction digits. If the user enters more than 2 fraction digits, the result will be rounded.

```html
<sp-number-field
    value="0"
    format-options='{
        "signDisplay": "exceptZero",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 2
    }'
>
    Adjust exposure
</sp-number-field>
```

</sp-tab-panel>
<sp-tab value="percentages">Percentages</sp-tab>
<sp-tab-panel value="percentages">

The `style: 'percent'` option can be passed to the `formatOptions` property to treat the value as a percentage. In this mode, the value is multiplied by 100 before it is displayed, i.e. `0.45` is displayed as "45%". The reverse is also true: when the user enters a value, the `change` event will be triggered with the entered value divided by 100. When the percent option is enabled, the default step automatically changes to 0.01 such that incrementing and decrementing occurs by 1%. This can be overridden with the step property.

```html
<sp-number-field
    value="0.05"
    format-options='{
        "style": "percent"
    }'
>
    Sales tax
</sp-number-field>
```

</sp-tab-panel>
<sp-tab value="currency">Currency values</sp-tab>
<sp-tab-panel value="currency">

The `style: 'currency'` option can be passed to the `formatOptions` property to treat the value as a currency value. The `currency` option must also be passed to set the currency code (e.g. `USD`) to use. In addition, the `currencyDisplay` option can be used to choose whether to display the currency `symbol`, currency `code`, or currency `name`. Finally, the `currencySign` option can be set to `accounting` to use accounting notation for negative numbers, which uses parentheses rather than a minus sign in some locales.

If you need to allow the user to change the currency, you should include a separate dropdown next to the `sp-number-field`. The `sp-number-field` itself will not determine the currency from the user input.

```html
<sp-number-field
    value="45"
    format-options='{
        "style": "currency",
        "currency": "EUR",
        "currencyDisplay": "code",
        "currencySign": "accounting"
    }'
>
    Transaction amount
</sp-number-field>
```

</sp-tab-panel>
<sp-tab value="units">Units</sp-tab>
<sp-tab-panel value="units">

The `style: 'unit'` option can be passed to the `formatOptions` property to format the value with a unit of measurement. The `unit` option must also be passed to set which unit to use (e.g. `inch`). In addition, the `unitDisplay` option can be used to choose whether to display the unit in `long`, `short`, or `narrow` format.

If you need to allow the user to change the unit, you should include a separate dropdown next to the number field. The number field itself will not determine the unit from the user input.

Note: The unit style is not currently supported in Safari. A [polyfill](https://formatjs.io/docs/polyfills/intl-numberformat/) may be necessary.

```html
<sp-number-field
    value="4"
    format-options='{
        "style": "unit",
        "unit": "inch",
        "unitDisplay": "long"
    }'
>
    Package width
</sp-number-field>
```

</sp-tab-panel>
<sp-tab value="custom-units">Custom Units</sp-tab>
<sp-tab-panel value="custom-units">

While `Intl.NumberFormatOptions` does support a [wide range of units](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier), it is possible to encounter units (e.g. the graphics units of `pixel`, `pixels`, `points`, etc.) that are not supported therein. When this occurs, an `<sp-number-field>` element will attempt to polyfill support for this unit. See the following example delivering `{ style: "unit", unit: "px" }` below:

```html
<sp-number-field
    value="500"
    format-options='{
        "style": "unit",
        "unit": "px"
    }'
>
    Document width in pixels
</sp-number-field>
```

Note: the polyfilling done here is very simplistic and is triggered by supplying options that would otherwise cause the `Intl.NumberFormat()` call to throw an error. Once the unsupporting unit of `px` causes the construction of the object to throw, a back up formatter/parser pair will be created without the supplied unit data. When the `style` is set to `unit`, the `unit` value of will be adopted as the _static_ unit display. This means that neither pluralization or translation will be handled within the `<sp-number-field>` element itself. If pluralization or translation is important to the delivered interface, please be sure to handle passing those strings into to element via the `formatOptions` property reactively to the value of the element or locale of that page in question.

</sp-tab-panel>
<sp-tab value="min-max">Minimum and maximum values</sp-tab>
<sp-tab-panel value="min-max">

The `min` and `max` properties can be used to limit the entered value to a specific range. The value will be clamped when the user commits the value to the `<sp-number-field>` element. In addition, the increment and decrement buttons will be disabled when the value is within one step value from the bounds. Ranges can be open ended by only providing a value for either `min` or `max` rather than both.

If a valid range is known ahead of time, it is a good idea to provide it to `<sp-number-field>` so it can optimize the experience. For example, when the minimum value is greater than or equal to zero, it is possible to use a numeric keyboard on iOS rather than a full text keyboard (necessary to enter a minus sign).

```html
<sp-number-field value="4" min="0" max="255">Red value</sp-number-field>
```

</sp-tab-panel>
<sp-tab value="step">Step values</sp-tab>
<sp-tab-panel value="step">

The step prop can be used to snap the value to certain increments. If there is a `min` defined, the steps are calculated starting from that minimum value. For example, if `min === 2`, and `step === 3`, the valid step values would be 2, 5, 8, 11, etc. If no `min` is defined, the steps are calculated starting from zero and extending in both directions. In other words, such that the values are evenly divisible by the step. A step can be any positive decimal. If no step is defined, any decimal value may be typed, but incrementing and decrementing snaps the value to an integer.

If the user types a value that is between two steps and blurs the input, the value will be snapped to the nearest step. When incrementing or decrementing, the value is snapped to the nearest step that is higher or lower, respectively. When incrementing or decrementing from an empty field, the value starts at the minValue or maxValue, respectively, if defined. Otherwise, the value starts from 0.

<!-- prettier-ignore -->
```html
<sp-number-field step="10">Step</sp-number-field>
<sp-number-field min="2" step="3">Step + min</sp-number-field>
<sp-number-field min="2"  max="21" step="3">Step + min + max</sp-number-field>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Invalid

The `invalid` attribute indicates that the number field's value is invalid. When set, appropriate ARIA attributes will be automatically applied.

```html
<sp-number-field
    invalid
    style="width: 130px"
    value="10"
    min="0"
    max="0.3"
    step="0.01"
    format-options='{
        "style": "currency",
        "currency": "USD",
        "currencyDisplay": "code",
        "currencySign": "accounting",
        "minimumFractionDigits": 2,
        "maximumFractionDigits": 2
    }'
>
    It's one banana, Michael, how much could it cost?
    <sp-help-text variant="negative" slot="help-text-negative">
        Value should be between $0 and $0.3.
    </sp-help-text>
</sp-number-field>
```

#### Valid

The `valid` attribute indicates that the number field's value is valid.

```html
<sp-number-field
    valid
    style="width: 130px"
    value="0.23"
    min="0"
    max="0.3"
    step="0.01"
    format-options='{
        "style": "currency",
        "currency": "USD",
        "currencyDisplay": "code",
        "currencySign": "accounting",
        "minimumFractionDigits": 2,
        "maximumFractionDigits": 2
    }'
>
    It's one banana, Michael, how much could it cost?
</sp-number-field>
```

#### Required

Use the `required` attribute to indicate a number field value is required. Dictate the validity or invalidity state of the text entry with the `valid` or `invalid` attributes.

```html
<sp-number-field required>Count</sp-number-field>
<sp-number-field required valid value="123">Count</sp-number-field>
<sp-number-field required invalid>Size</sp-number-field>
```

#### Disabled

The `disabled` attribute prevents the number field from receiving focus or events. The number field will appear faded.

```html
<sp-number-field disabled value="0">Number of tickets</sp-number-field>
```

#### Read-only

Number fields have a `readonly` attribute for when they’re in the disabled state but still need their labels to be shown. This allows for content to be copied, but not interacted with or changed.

```html
<sp-number-field readonly value="0">Number of tickets</sp-number-field>
```

### Behaviors

The number field works with the following interactions:

- the input field,
- <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> keys,
- the scroll wheel, or
- the stepper UI, when not hidden by the `hide-stepper` attribute.

The input value incrementally increases or decreases by the value of the `step` attribute. The <kbd>shift</kbd> key can be used to apply steps at 10 times (or the value of the `step-modifier` attribute times) their normal rate.

#### Default value

The `<sp-number-field>` component doesn't manage a default value by itself. This means that consumers can set the value of the number-field as an empty string by clearing the input. If we want the number-field to reset to a `default-value` when the user clears the input, we can listen for the `change` event on the number-field component and set its value to the desired `default-value` if the input is empty.

```html
<sp-number-field id="default" value="20">
    Default value of this number field is 42
</sp-number-field>

<script type="module">
    const numberField = document.querySelector('#default');

    numberField.addEventListener('change', (event) => {
        alert('change');
        const target = event.target;
        if (isNaN(target.value)) {
            target.value = '42';
        }
    });
</script>
```

### Accessibility

#### Labels

Every number field must have a label that clearly describes its purpose. Typically this label should be a visible label via the default slot. When a visible label is not required, the `label` attribute can be used to provide a hidden label for assistive technology.

<sp-number-field>Quantity</sp-number-field>
<sp-number-field label="Quantity"></sp-number-field>

#### Keyboard Navigation

Number fields support the following keyboard interactions:

- <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd> keys increment and decrement the value
- <kbd>Shift</kbd> + <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> applies steps at 10 times (or the value of `step-modifier`) the normal rate
- The scroll wheel can be used to increment and decrement the value when focused

#### Help Text

Consider providing help text to explain:

- The expected format of the input
- Any minimum or maximum values
- The meaning of units or special formatting (e.g., currency, percentages)
- Step increments if they differ from the default

<script type="module">
    customElements.whenDefined('sp-number-field').then(() => {
        const numberField = document.querySelector('#default');

        numberField.addEventListener('change', (event) => {
            alert('change');
            const target = event.target;
            if (isNaN(target.value)) {
                target.value = '42';
            }
        });
    });
</script>
