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
import { convertHourTo24hFormat, isNumber } from '../helpers';
import {
    EditableSegmentType,
    Precision,
    Precisions,
    SegmentTypes,
} from '../types';
import { DaySegment } from './date/DaySegment';
import { MonthSegment } from './date/MonthSegment';
import { YearSegment } from './date/YearSegment';
import { EditableSegment } from './EditableSegment';
import { LiteralSegment } from './LiteralSegment';
import { DayPeriodSegment } from './time/DayPeriodSegment';
import { HourSegment } from './time/HourSegment';
import { MinuteSegment } from './time/MinuteSegment';
import { SecondSegment } from './time/SecondSegment';

export type Segment = EditableSegment | LiteralSegment;

export class DateTimeSegments {
    private segments: Segment[];
    constructor(segments: Segment[]) {
        this.segments = segments;
    }

    public get all(): Segment[] {
        return this.segments;
    }

    public get year(): YearSegment | undefined {
        const yearSegment = this.getByType(SegmentTypes.Year);
        if (yearSegment) return yearSegment as YearSegment;
        return;
    }

    public get month(): MonthSegment | undefined {
        const monthSegment = this.getByType(SegmentTypes.Month);
        if (monthSegment) return monthSegment as MonthSegment;
        return;
    }

    public get day(): DaySegment | undefined {
        const daySegment = this.getByType(SegmentTypes.Day);
        if (daySegment) return daySegment as DaySegment;
        return;
    }

    public get hour(): HourSegment | undefined {
        const hourSegment = this.getByType(SegmentTypes.Hour);
        if (hourSegment) return hourSegment as HourSegment;
        return;
    }

    public get minute(): MinuteSegment | undefined {
        const minuteSegment = this.getByType(SegmentTypes.Minute);
        if (minuteSegment) return minuteSegment as MinuteSegment;
        return;
    }

    public get second(): SecondSegment | undefined {
        const secondSegment = this.getByType(SegmentTypes.Second);
        if (secondSegment) return secondSegment as SecondSegment;
        return;
    }

    public get dayPeriod(): DayPeriodSegment | undefined {
        const dayPeriodSegment = this.getByType(SegmentTypes.DayPeriod);
        if (dayPeriodSegment) return dayPeriodSegment as DayPeriodSegment;
        return;
    }

    public getByType(type: EditableSegmentType): EditableSegment | undefined {
        return this.segments.find(
            (segment) => segment.type === type
        ) as EditableSegment;
    }

    /**
     * Returns a `CalendarDate` object with the year, month and day values of the segments if they are all defined. The time values
     * are checked and included based on the precision provided, returning a `CalendarDateTime` instead.
     *
     * @param precision - The precision to use when creating the date object
     */
    public getFormattedDate(
        precision: Precision = Precisions.Day
    ): CalendarDate | CalendarDateTime | undefined {
        const year = this.year?.value;
        const month = this.month?.value;
        const day = this.day?.value;

        if (!isNumber(year) || !isNumber(month) || !isNumber(day)) return;

        if (precision === Precisions.Day)
            return new CalendarDate(year, month, day);

        let hour = this.hour?.value;
        if (!isNumber(hour)) return;

        if (this.dayPeriod) {
            const dayPeriod = this.dayPeriod.value;
            if (!isNumber(dayPeriod)) return;
            hour = convertHourTo24hFormat(hour, dayPeriod);
        }

        if (precision === Precisions.Hour)
            return new CalendarDateTime(year, month, day, hour);

        const minute = this.minute?.value;
        if (!isNumber(minute)) return;

        if (precision === Precisions.Minute)
            return new CalendarDateTime(year, month, day, hour, minute);

        const second = this.second?.value;
        if (!isNumber(second)) return;

        return new CalendarDateTime(year, month, day, hour, minute, second);
    }
}
