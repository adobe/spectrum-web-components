## Description

`<sp-number-field>`s are used for numeric inputs. Upon interaction, the input value incrementally increases or decreases.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/number-field?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/number-field)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/number-field?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/number-field)

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

## Example

```html
<sp-number-field value="1024" style="width: 200px"></sp-number-field>
```

## Number formatting

An `<sp-number-field>` element will process its numeric value with `new Intl.NumberFormat(navigator.language, this.formatOptions).format(this.value)` in order to prepare it for visual delivery in the input. In order to customize this processing supply your own `Intl.NumberFormatOptions` via the `formatOptions` property, or `format-options` attribute as follows.

### Decimals

The following example uses the `signDisplay` option to include the plus sign for positive numbers, for example to display an offset from some value. In addition, it always displays a minimum of 1 digit after the decimal point, and allows up to 2 fraction digits. If the user enters more than 2 fraction digits, the result will be rounded.

```html
<sp-field-label for="decimals">Adjust exposure</sp-field-label>
<sp-number-field
    id="decimals"
    value="0"
    style="width: 100px"
    format-options='{
        "signDisplay": "exceptZero",
        "minimumFractionDigits": 1,
        "maximumFractionDigits": 2
    }'
></sp-number-field>
```

### Percentages

The `style: 'percent'` option can be passed to the `formatOptions` property to treat the value as a percentage. In this mode, the value is multiplied by 100 before it is displayed, i.e. `0.45` is displayed as "45%". The reverse is also true: when the user enters a value, the `change` event will be triggered with the entered value divided by 100. When the percent option is enabled, the default step automatically changes to 0.01 such that incrementing and decrementing occurs by 1%. This can be overridden with the step property.

```html
<sp-field-label for="percents">Sales tax</sp-field-label>
<sp-number-field
    id="percents"
    style="width: 200px"
    value="0.05"
    format-options='{
        "style": "percent"
    }'
></sp-number-field>
```

### Currency values

The `style: 'currency'` option can be passed to the `formatOptions` property to treat the value as a currency value. The `currency` option must also be passed to set the currency code (e.g. `USD`) to use. In addition, the `currencyDisplay` option can be used to choose whether to display the currency `symbol`, currency `code`, or currency `name`. Finally, the `currencySign` option can be set to `accounting` to use accounting notation for negative numbers, which uses parentheses rather than a minus sign in some locales.

If you need to allow the user to change the currency, you should include a separate dropdown next to the `sp-number-field`. The `sp-number-field` itself will not determine the currency from the user input.

```html
<sp-field-label for="currency">Transaction amount</sp-field-label>
<sp-number-field
    style="width: 200px"
    value="45"
    format-options='{
        "style": "currency",
        "currency": "EUR",
        "currencyDisplay": "code",
        "currencySign": "accounting"
    }'
></sp-number-field>
```

### Units

The `style: 'unit'` option can be passed to the `formatOptions` property to format the value with a unit of measurement. The `unit` option must also be passed to set which unit to use (e.g. `inch`). In addition, the `unitDisplay` option can be used to choose whether to display the unit in `long`, `short`, or `narrow` format.

If you need to allow the user to change the unit, you should include a separate dropdown next to the number field. The number field itself will not determine the unit from the user input.

Note: The unit style is not currently supported in Safari. A [polyfill](https://formatjs.io/docs/polyfills/intl-numberformat/) may be necessary.

```html
<sp-field-label for="units">Package width</sp-field-label>
<sp-number-field
    id="units"
    style="width: 200px"
    value="4"
    format-options='{
        "style": "unit",
        "unit": "inch",
        "unitDisplay": "long"
    }'
></sp-number-field>
```

## Minimum and maximum values

The `max` and `max` properties can be used to limit the entered value to a specific range. The value will be clamped when the user commits the value to the `<sp-number-field>` element. In addition, the increment and decrement buttons will be disabled when the value is within one step value from the bounds. Ranges can be open ended by only providing a value for either `min` or `max` rather than both.

If a valid range is known ahead of time, it is a good idea to provide it to `<sp-number-field>` so it can optimize the experience. For example, when the minimum value is greater than or equal to zero, it is possible to use a numeric keyboard on iOS rather than a full text keyboard (necessary to enter a minus sign).

```html
<sp-field-label for="red">Red value</sp-field-label>
<sp-number-field id="red" value="4" min="0" max="255"></sp-number-field>
```

## Step values

The step prop can be used to snap the value to certain increments. If there is a `min` defined, the steps are calculated starting from that minimum value. For example, if `min === 2`, and `step === 3`, the valid step values would be 2, 5, 8, 11, etc. If no `min` is defined, the steps are calculated starting from zero and extending in both directions. In other words, such that the values are evenly divisible by the step. A step can be any positive decimal. If no step is defined, any decimal value may be typed, but incrementing and decrementing snaps the value to an integer.

If the user types a value that is between two steps and blurs the input, the value will be snapped to the nearest step. When incrementing or decrementing, the value is snapped to the nearest step that is higher or lower, respectively. When incrementing or decrementing from an empty field, the value starts at the minValue or maxValue, respectively, if defined. Otherwise, the value starts from 0.

<!-- prettier-ignore -->
```html
<sp-field-label
    for="step"
>Step</sp-field-label>
<sp-number-field
    id="step"
    step="10"
></sp-number-field>

<sp-field-label
    for="step-min"
>Step + min</sp-field-label>
<sp-number-field
    id="step-min"
    min="2"
    step="3"
></sp-number-field>

<sp-field-label
    for="step-min-max"
>Step + min + max</sp-field-label>
<sp-number-field
    id="step-min-max"
    min="2"
    max="21"
    step="3"
></sp-number-field>
```
