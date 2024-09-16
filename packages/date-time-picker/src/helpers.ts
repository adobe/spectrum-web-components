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

import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import { AM, EditableSegmentType, PM, Segment } from './types';
import { EditableSegment } from './segments/EditableSegment';

/**
 * An utility to check if the given value is a number (not `undefined`)
 *
 * @param value - Number to check
 */
export function isNumber(value: number | undefined): value is number {
    return typeof value === 'number';
}

/**
 * Returns a `Date` type object using information extracted from a `CalendarDateTime` type object. The month must be
 * decremented by 1 because the `Date` object uses months ranging from 0 (January) to 11 (December)
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
 * Indicates whether the hour entered is PM or not
 *
 * @param hour - The hour to check
 */
export function isHourPM(hour: number): boolean {
    return hour >= PM;
}

/**
 * Returns the corresponding “modifier” (0 for “AM” and 12 for “PM”) for the given hour
 *
 * @param hour - The hour to identify the modifier
 */
export function getAmPmModifier(hour: number): typeof AM | typeof PM {
    return isHourPM(hour) ? PM : AM;
}

/**
 * Switches the value of the AM/PM segment from `AM` to `PM` or vice versa
 *
 * @param value - Current value
 */
export function toggleAmPm(value: number): typeof AM | typeof PM {
    return value === AM ? PM : AM;
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

export function dateToCalendarDate(date: Date): CalendarDate {
    return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    );
}

export function getEditableSegmentByType(
    segments: Segment[],
    type: EditableSegmentType
): EditableSegment {
    return segments.find((segment) => segment.type === type) as EditableSegment;
}
