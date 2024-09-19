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

// import { ZonedDateTime } from '@internationalized/date';
import { DateFormatter, ZonedDateTime } from '@internationalized/date';
import { SegmentType, SegmentTypes } from '../types';
import { DateTimeSegments, Segment } from './DateTimeSegments';
import { LiteralSegment } from './LiteralSegment';
import { DaySegment } from './date/DaySegment';
import { MonthSegment } from './date/MonthSegment';
import { YearSegment } from './date/YearSegment';
import { DayPeriodSegment } from './time/DayPeriodSegment';
import { HourSegment } from './time/HourSegment';
import { MinuteSegment } from './time/MinuteSegment';
import { SecondSegment } from './time/SecondSegment';

export class SegmentsFactory {
    dateFormatter: DateFormatter;
    constructor(dateFormatter: DateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    createSegments(
        currentDate: ZonedDateTime,
        shouldSetSegmentsValues: boolean = false
    ): DateTimeSegments {
        const date = currentDate.toDate();
        const createdSegments = this.dateFormatter
            .formatToParts(date)
            .map((part) => {
                const type = part.type as SegmentType;
                const formatted = part.value;

                return this.createSegment(type, formatted);
            });

        const segments = new DateTimeSegments(createdSegments);

        const year = segments.year!;
        const month = segments.month!;
        const day = segments.day!;

        year.setLimits(currentDate);
        month.setLimits(currentDate);
        if (shouldSetSegmentsValues) {
            year.setValueFromDate(currentDate);
            month.setValueFromDate(currentDate);
        }

        day.setLimits(currentDate, month.value, year.value);
        if (shouldSetSegmentsValues) day.setValueFromDate(currentDate);

        const hour = segments.hour;
        const minute = segments.minute;
        const second = segments.second;
        const dayPeriod = segments.dayPeriod;

        if (dayPeriod) dayPeriod.setLocalizedLimits(this.dateFormatter);

        if (!hour) return segments;

        const is12HourFormat = Boolean(dayPeriod);
        hour.setLimits(is12HourFormat);
        if (shouldSetSegmentsValues) {
            hour.setValueFromDate(currentDate, is12HourFormat);

            if (is12HourFormat) {
                const dayPeriod = segments.dayPeriod!;
                dayPeriod.setValueFromDate(currentDate);
            }

            if (!minute) return segments;
            minute.setValueFromDate(currentDate);

            if (!second) return segments;
            second.setValueFromDate(currentDate);
        }

        return segments;
    }

    private createSegment(type: SegmentType, formatted: string): Segment {
        let segment: Segment;

        switch (type) {
            case SegmentTypes.Year:
                segment = new YearSegment(formatted);
                break;
            case SegmentTypes.Month:
                segment = new MonthSegment(formatted);
                break;
            case SegmentTypes.Day:
                segment = new DaySegment(formatted);
                break;
            case SegmentTypes.Hour:
                segment = new HourSegment(formatted);
                break;
            case SegmentTypes.Minute:
                segment = new MinuteSegment(formatted);
                break;
            case SegmentTypes.Second:
                segment = new SecondSegment(formatted);
                break;
            case SegmentTypes.DayPeriod:
                segment = new DayPeriodSegment(formatted);
                break;
            default:
                segment = new LiteralSegment(formatted);
        }

        return segment;
    }
}
