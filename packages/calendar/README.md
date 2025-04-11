## Description

`<sp-calendar>` elements display all the days within a given month, indicating the current day. Users can also see past or future months, and select a specific date via pointer, <kbd>Space</kbd> or <kbd>Enter</kbd>.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/calendar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/calendar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/calendar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/calendar)

```
yarn add @spectrum-web-components/calendar
```

Import the side effectful registration of `<sp-calendar>` via:

```
import '@spectrum-web-components/calendar/sp-calendar.js';
```

When looking to leverage the `Calendar` base class as a type and/or for extension purposes, do so via:

```
import { Calendar } from '@spectrum-web-components/calendar';
```

## Example

By default, the `<sp-calendar>` element will display the current month with emphasis on the current day and no pre-selected date.

```html
<sp-calendar></sp-calendar>
```

## Value

A pre-selected date value can be provided to the `<sp-calendar>` element and it will dictate the displayed month of the element.
Setting the `value` property requires a `DateValue` type (`DateValue = CalendarDate | CalendarDateTime | ZonedDateTime`).
When reading the value by `element.value`, the consumer will always receive a `CalendarDate` type value.
More about these types and when to use each one can be found on the [`@internationalized/date` page](https://react-spectrum.adobe.com/internationalized/date/index.html).

To clear the element's value, the `clear` method can be used. (`element.clear()`)

```ts
import {CalendarDate} from '@internationalized/date';

<sp-calendar id="min-max-calendar"
    .value=${new CalendarDate(2020, 2, 14)}
></sp-calendar>
```

## Minimum and maximum values

The `min` and `max` properties can be used to limit the selected value to a specific range. Ranges can be open, by providing only one of the mentioned properties, or closed, when both `min` and `max` are provided. These properties are also of `DateValue` type, but will always be of `CalendarDate` type when read, similar to `value`.

If the provided closed interval is not a valid one (e.g `min > max`), the assignment of those properties gets ignored. The same way, if a pre-selected value doesn't comply with the interval, it gets ignored and the element will behave as it wouldn't have a `value` provided.

```html-live
    <div id="calendar-with-min-max"></div>

    <script type="module">
        import { CalendarDate } from '@internationalized/date';
        import { SpectrumElement } from '@spectrum-web-components/base';
        import { html, render } from 'lit';
        import '@spectrum-web-components/calendar/sp-calendar.js';

        class CalendarWithMinMax extends SpectrumElement {
            render(){
                return html`
                <sp-calendar
                    .min=${new CalendarDate(2020, 2, 14)}
                    .max=${new CalendarDate(2020, 2, 19)}
                ></sp-calendar>`
            }
        }

        customElements.define("calendar-with-min-max", CalendarWithMinMax);

        onCodeExamplesLoaded(() => {
            const root = document.querySelector('#calendar-with-min-max');
            root.innerHTML = '';
            render(html`<calendar-with-min-max></calendar-with-min-max>`, root);
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
    import { CalendarDate } from '@internationalized/date';
    import { SpectrumElement } from '@spectrum-web-components/base';
    import { html, render } from 'lit';
    import '@spectrum-web-components/calendar/sp-calendar.js';

    class CalendarWithMinMax extends SpectrumElement {
        render(){
            return html`
            <sp-calendar
                .min=${new CalendarDate(2020, 2, 14)}
                .max=${new CalendarDate(2020, 2, 19)}
            ></sp-calendar>`
        }
    }

    customElements.define("calendar-with-min-max", CalendarWithMinMax);

    onCodeExamplesLoaded(() => {
        const root = document.querySelector('#calendar-with-min-max');
        root.innerHTML = '';
        render(html`<calendar-with-min-max></calendar-with-min-max>`, root);
    })
</script>

## Events

In order to react to date selection changes, consumers can leverage the `change` event and read the value of the event target in the handler.

```ts
import { CalendarDate } from '@internationalized/date';
import { Calendar } from '@spectrum-web-components/calendar';

const handleCalendarChange = (event: Event) => {
    const selectedDate = (event.target as Calendar).value as CalendarDate;
    // use the selectedDate...
};
```

## Internationalization

The `<sp-calendar>` element supports multiple locales and updates its content accordingly.
`element.locale` represents the language in which the `<sp-calendar>` element is currently being delivered. By default, the value will represent the language established by the `lang` attribute on the root `<html>` element, with a fallback to `navigator.language`. This can be customized via a language context provider by a parent element that listens for `sp-language-context` event and supplies update language settings to the `callback` function. Applications leveraging the [`<sp-theme>`](./components/theme) element to manage the visual delivery or text direction of their content will also be provided with a reactive context for supplying language information to its descendants.

Currently the `<sp-calendar>` elements supports only the Gregorian calendar and the AD era.

While providing support for screen readers, the element needs some labels to be internationalized by the consumer to offer non-english alternatives. This can be done via the `labels` property.
