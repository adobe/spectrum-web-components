## Description

The `<sp-date-time-picker>` element allows users to select a date and time by combining multiple individually editable segments with a Calendar popover.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/date-time-picker?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/date-time-picker)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/date-time-picker?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/date-time-picker)

```
yarn add @spectrum-web-components/date-time-picker
```

Import the side effectful registration of `<sp-date-time-picker>` via:

```
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
```

When looking to leverage the `DateTimePicker` base class as a type and/or for extension purposes, do so via:

```
import { DateTimePicker } from '@spectrum-web-components/date-time-picker';
```

## Example

By default, the `<sp-date-time-picker>` element will display a placeholder value that should indicate the format used.

```html
<sp-field-label for="dtp-example">
    Event date
    <sp-field-label>
        <sp-date-time-picker id="dtp-example"></sp-date-time-picker>
    </sp-field-label>
</sp-field-label>
```

## Value

A pre-selected date value can be provided to the `<sp-date-time-picker>` element and it will be displayed in the individual editable segments accordingly.
More about these types and when to use each one can be found on the [`@internationalized/date` page](https://react-spectrum.adobe.com/internationalized/date/index.html). (When creating instances of `ZonedDateTime`, make sure to use the `toZoned` function if you're not sure about the timezone offset for your date object to correctly account for DTS)

To clear the element's value and all the segments, the `clear` method can be used. (`element.clear()`)

```ts
import { CalendarDateTime } from '@internationalized/date';

<sp-date-time-picker
    .value=${new CalendarDateTime(2020, 2, 14, 8, 30)}
></sp-date-time-picker>
```

## Minimum and maximum values

The `min` and `max` properties can be used to limit the selected value to a specific range. Ranges can be open, by providing only one of the mentioned properties, or closed, when both `min` and `max` are provided.

If the provided closed interval is not a valid one (e.g `min > max`), the assignment of those properties gets ignored. Also, if a pre-selected value doesn't comply with the interval, it gets ignored and the element will behave as it wouldn't have a `value` provided.

The users will still be able to commit typed-in date values that do not comply with the `min` and `max` constraints interval even if they are provided, case in which the element will be in an invalid state and the `negative-help-text` slot content will be displayed, if provided.

```html-live
    <div id="dtp-with-min-max"></div>

    <script type="module">
        import { CalendarDateTime } from '@internationalized/date';
        import { SpectrumElement } from '@spectrum-web-components/base';
        import { html, render } from 'lit';
        import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
        import '@spectrum-web-components/field-label/sp-field-label.js';

        class DTPWithMinMax extends SpectrumElement {
            render(){
                return html`
                <sp-field-label for="dtp-min-max">Event date</sp-field-label>
                <sp-date-time-picker
                    id="dtp-min-max"
                    .min=${new CalendarDateTime(2020, 2, 14, 8, 30)}
                    .max=${new CalendarDateTime(2020, 2, 19, 16, 20)}
                    <sp-help-text slot="negative-help-text">
                        Please select a valid date
                    </sp-help-text>
                ></sp-date-time-picker>`
            }
        }

        customElements.define("dtp-with-min-max", DTPWithMinMax);

        onCodeExamplesLoaded(() => {
            const root = document.querySelector('#dtp-with-min-max');
            root.innerHTML = '';
            render(html`<dtp-with-min-max></dtp-with-min-max>`, root);
        })
    </script>
```

<script type="module">
    window.onCodeExamplesLoaded = (callback) => {
        customElements.whenDefined('code-example').then(() => {
            Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(callback);
        });
    }
</script>

<script type="module">
    import { CalendarDateTime } from '@internationalized/date';
    import { SpectrumElement } from '@spectrum-web-components/base';
    import { html, render } from 'lit';
    import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
    import '@spectrum-web-components/field-label/sp-field-label.js';

    class DTPWithMinMax extends SpectrumElement {
        render(){
            return html`
            <sp-field-label for="dtp-min-max">Event date</sp-field-label>
            <sp-date-time-picker
                id="dtp-min-max"
                .min=${new CalendarDateTime(2020, 2, 14, 8, 30)}
                .max=${new CalendarDateTime(2020, 2, 19, 16, 20)}
                <sp-help-text slot="negative-help-text">
                    Please select a valid date
                </sp-help-text>
            ></sp-date-time-picker>`
        }
    }

    customElements.define("dtp-with-min-max", DTPWithMinMax);

    onCodeExamplesLoaded(() => {
        const root = document.querySelector('#dtp-with-min-max');
        root.innerHTML = '';
        render(html`<dtp-with-min-max></dtp-with-min-max>`, root);
    })
</script>

## Precision

The `precision` property of the `<sp-date-time-picker>` element represents the granularity used to display the time editable segments. When this is not provided it will default to `minute`.

<sp-tabs selected="day" auto label="Precision Attribute Options">
<sp-tab value="day">Day</sp-tab>
<sp-tab-panel value="day">

```html
<sp-field-label for="dtp-day">
    Event date
    <sp-field-label>
        <sp-date-time-picker precision="day" id="dtp-day"></sp-date-time-picker>
    </sp-field-label>
</sp-field-label>
```

</sp-tab-panel>
<sp-tab value="hour">Hour</sp-tab>
<sp-tab-panel value="hour">

```html
<sp-field-label for="dtp-hour">
    Event date
    <sp-field-label>
        <sp-date-time-picker
            precision="hour"
            id="dtp-hour"
        ></sp-date-time-picker>
    </sp-field-label>
</sp-field-label>
```

</sp-tab-panel>
<sp-tab value="minute">Minute</sp-tab>
<sp-tab-panel value="minute">

```html
<sp-field-label for="dtp-minute">
    Event date
    <sp-field-label>
        <sp-date-time-picker
            precision="minute"
            id="dtp-minute"
        ></sp-date-time-picker>
    </sp-field-label>
</sp-field-label>
```

</sp-tab-panel>
<sp-tab value="second">Second</sp-tab>
<sp-tab-panel value="second">

```html
<sp-field-label for="dtp-second">
    Event date
    <sp-field-label>
        <sp-date-time-picker
            precision="second"
            id="dtp-second"
        ></sp-date-time-picker>
    </sp-field-label>
</sp-field-label>
```

</sp-tab-panel>
</sp-tabs>

### Precision and property types mappings

The `<sp-date-time-picker>` element's `value`, `min` and `max` properties are all of `DateValue` type (`DateValue = CalendarDate | CalendarDateTime | ZonedDateTime`).

If multiple mentioned properties are provided but with different date types, all of them will be converted to the most specific one, the order of precedence being: `ZonedDateTime`, `CalendarDateTime` and `CalendarDate`. After that, the default `precision` will change, being `day` for `CalendarDate`, and `minute` for the rest.

When the `precision` is provided, it takes precedence over the most specific date type, modifying it if needed to contain all the information.

## Events

In order to react to date selection changes and user input, consumers can leverage the `input` and `change` events. The `input` event announces when the user's input changes the component's segments, while the `change` event announces when a new date (and time) is committed by the user.

```ts
import { DateValue } from '@internationalized/date';
import { DateTimePicker } from '@spectrum-web-components/date-time-picker';

const handleDateTimePickerChange = (event: Event) => {
    const selectedDate = (event.target as DateTimePicker).value;
    // use the selectedDate...
};
```

## Internationalization

The `<sp-date-time-picker>` element supports multiple locales and updates its content accordingly.
`element.locale` represents the language in which the `<sp-date-time-picker>` element is currently being delivered. By default, the value will represent the language established by the `lang` attribute on the root `<html>` element, with a fallback to `navigator.language`. This can be customized via a language context provider by a parent element that listens for `sp-language-context` event and supplies update language settings to the `callback` function. Applications leveraging the [`<sp-theme>`](./components/theme) element to manage the visual delivery or text direction of their content will also be provided with a reactive context for supplying language information to its descendants.

While providing support for screen readers, the element needs some labels to be internationalized by the consumer to offer non-english alternatives. This can be done via the `labels` property.
