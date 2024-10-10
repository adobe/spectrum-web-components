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
    getMinimumDayInMonth,
    ZonedDateTime,
} from '@internationalized/date';
import { isNumber } from '../../helpers.js';
import {
    DEFAULT_LEAP_YEAR,
    MAX_DAYS_PER_MONTH,
    SegmentTypes,
} from '../../types.js';
import { EditableSegment } from '../EditableSegment.js';

export class DaySegment extends EditableSegment {
    public minValue: number = 1;
    public maxValue: number = 31;
    public value?: number;

    constructor(formatted: string) {
        super(SegmentTypes.Day, formatted);
    }

    public setLimits(
        currentDate: ZonedDateTime,
        month?: number,
        year?: number
    ): void {
        if (!isNumber(month)) {
            this.minValue = 1;
            this.maxValue = MAX_DAYS_PER_MONTH;
            return;
        }

        if (!isNumber(year)) year = DEFAULT_LEAP_YEAR;

        const dateToUse = new CalendarDate(year, month, 1);
        this.maxValue = currentDate.calendar.getDaysInMonth(dateToUse);
        this.minValue = getMinimumDayInMonth(dateToUse);
        this.updateValueToLimits();
    }
}
