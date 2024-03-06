## Description

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

```html
<sp-calendar></sp-calendar>
```

## To-do list

-   Implement a cache mechanism to store the value of `today` and use this value to initialise `currentDate`
-   Include a condition to run the `setWeekdays()` method only when really needed
-   Attribute 'role="heading"' removed, due to error 'The "heading" role requires the attribute "aria-level"'
-   Translate the "Previous" text used in the "title" and "aria-label" of the button displayed in the header of the calendar
-   Translate the "Next" text used in the "title" and "aria-label" of the button displayed in the header of the calendar
-   The title must include "Today," and " selected" translated to the current language
-   Implement keyboard navigation
-   Add support for other types of calendars - [React Calendar: International Calendars](https://react-spectrum.adobe.com/react-spectrum/Calendar.html#international-calendars)
-   Include `aria-label` in calendar for accessibility - [React Calendar: Labeling](https://react-spectrum.adobe.com/react-spectrum/Calendar.html#labeling)
-   Complete documentation
-   Add/Review unit tests
