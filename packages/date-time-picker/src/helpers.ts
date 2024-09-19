/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CalendarDate,
    CalendarDateTime,
    ZonedDateTime,
} from '@internationalized/date';
import { DateValue } from '@spectrum-web-components/calendar';
import { AM, PM } from './types';

export function isNumber(value: number | undefined): value is number {
    return typeof value === 'number';
}

export function isZonedDateTime(date: DateValue): date is ZonedDateTime {
    return date instanceof ZonedDateTime;
}

export function isCalendarDateTime(date: DateValue): date is CalendarDateTime {
    return date instanceof CalendarDateTime;
}

export function isCalendarDate(date: DateValue): date is CalendarDate {
    return date instanceof CalendarDate;
}

export function convertHourTo24hFormat(
    hour: number,
    dayPeriod: typeof AM | typeof PM
): number {
    return (hour = (hour % PM) + dayPeriod);
}

/**
 * Returns the corresponding “modifier” (0 for “AM” and 12 for “PM”) for the given hour
 *
 * @param hour - The hour to identify the modifier
 */
export function getAmPmModifier(hour: number): typeof AM | typeof PM {
    return hour >= PM ? PM : AM;
}

/**
 * Creates a `Date` type object using the date information extracted from a `CalendarDate` type-like object.
 *
 * @param year - Year that will be used to create the new `Date`
 * @param month - Month (1 to 12) that will be used to create the new `Date`
 * @param day - Day that will be used to create the new `Date`
 */
export function getDate(
    year: number | undefined,
    month: number | undefined,
    day: number | undefined
): Date | undefined {
    return isNumber(year) && isNumber(month) && isNumber(day)
        ? new Date(year, month - 1, day)
        : undefined;
}

/**
 * Converts an object of type `Date` to `CalendarDateTime`. The month must be incremented by 1 to create a new
 * `CalendarDateTime`, as it uses months ranging from 1 (January) to 12 (December), as opposed to `Date`, whose
 * months range from 0 (January) to 11 ( December)
 *
 * @param date - `Date` object to “convert”
 */
export function dateToCalendarDateTime(date: Date): CalendarDateTime {
    return new CalendarDateTime(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    );
}
