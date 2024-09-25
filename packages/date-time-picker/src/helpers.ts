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

export function getDayPeriodModifier(hour: number): typeof AM | typeof PM {
    return hour >= PM ? PM : AM;
}
