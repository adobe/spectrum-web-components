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
    DateFormatter,
    getMinimumDayInMonth,
    getMinimumMonthInYear,
    ZonedDateTime,
} from '@internationalized/date';
import {
    convertHourTo24hFormat,
    getDate,
    getEditableSegmentByType,
} from '../helpers';
import { DEFAULT_LEAP_YEAR, Segment, SegmentTypes } from '../types';
import { type DaySegment } from './date/DaySegment';
import { type MonthSegment } from './date/MonthSegment';
import { type YearSegment } from './date/YearSegment';
import { type DayPeriodSegment } from './time/DayPeriodSegment';
import { type HourSegment } from './time/HourSegment';
import { type MinuteSegment } from './time/MinuteSegment';
import { type SecondSegment } from './time/SecondSegment';

interface DateSegments {
    year: YearSegment;
    month: MonthSegment;
    day: DaySegment;
}

interface TimeSegments {
    hour: HourSegment;
    minute: MinuteSegment;
    second: SecondSegment;
    dayPeriod?: DayPeriodSegment;
}

interface DateInfo {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

export class SegmentsFormatter {
    dateFormatter: DateFormatter;
    constructor(dateFormatter: DateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    public format(segments: Segment[], currentDate: ZonedDateTime): Segment[] {
        segments = [...segments];
        // TODO: these can be changed because individual date/time segments are not needed
        const dateSegments = this.getDateSegments(segments);
        const timeSegments = this.getTimeSegments(segments);
        const segmentsDict = { ...dateSegments, ...timeSegments };

        const dateInfo = this.getDateInfoWithDefaults(
            segmentsDict,
            currentDate
        );

        this.setSegmentsFormatted(segmentsDict, dateInfo);
        this.padSegmentsFormatted(segmentsDict);

        return segments;
    }

    private setSegmentsFormatted(
        segmentsDict: DateSegments & TimeSegments,
        dateInfo: DateInfo
    ): void {
        const { year, month, day, hour, minute, second } = dateInfo;
        const date = getDate(year, month, day);
        if (!date) return;

        date.setHours(hour, minute, second);

        /**
         * For the year we do not use the value returned by the formatter, to avoid that the typed year is displayed in
         * an unexpected way. For example, when typing “2”, the year would be formatted as “1902”, but we keep it as it
         * is being displayed on the screen. If the user wants to enter the year “1902”, he will enter number by number
         */
        segmentsDict.year.formatted = String(year);

        const segmentTypesToFormat = [
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
            SegmentTypes.DayPeriod,
        ];
        const formattedDateParts = this.dateFormatter.formatToParts(date);
        for (const segmentType of segmentTypesToFormat) {
            const segment = segmentsDict[segmentType];
            if (!segment) continue;

            const formattedPart = formattedDateParts.find(
                (part) => part.type === segmentType
            )?.value;
            if (!formattedPart) continue;

            segment.formatted = formattedPart;
        }
    }

    private padSegmentsFormatted(
        segmentsDict: DateSegments & TimeSegments
    ): void {
        const segmentTypesToPad = [
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ];

        if (segmentsDict.dayPeriod) {
            const formattedHour = segmentsDict.hour.formatted;
            segmentsDict.hour.formatted = formattedHour.padStart(1, '0');
        } else {
            const formattedHour = segmentsDict.hour.formatted;
            segmentsDict.hour.formatted = formattedHour.padStart(2, '0');
        }

        for (const segmentType of segmentTypesToPad) {
            const segment = segmentsDict[segmentType];
            if (!segment) continue;
            segment.formatted = segment.formatted.padStart(2, '0');
        }
    }

    private getDateInfoWithDefaults(
        segments: DateSegments & TimeSegments,
        currentDate: ZonedDateTime
    ): DateInfo {
        const day = segments.day.value ?? getMinimumDayInMonth(currentDate);
        const month =
            segments.month.value ?? getMinimumMonthInYear(currentDate);

        /**
         * If the day being formatted is February 29th but the year segment has not yet been filled, we need to use a
         * leap year to allow the 29th to remain, otherwise, if we use the current year and it is not a leap year, the
         * day that would be displayed would be March 1st, as February 29th would not exist and JavaScript “moves” the
         * day to the next day.
         */
        const year = segments.year.value ?? DEFAULT_LEAP_YEAR;

        let hour = segments.hour?.value ?? currentDate.hour;
        const minute = segments.minute?.value ?? currentDate.minute;
        const second = segments.second?.value ?? currentDate.second;

        const dayPeriod = segments.dayPeriod?.value;
        if (dayPeriod) hour = convertHourTo24hFormat(hour, dayPeriod);

        return { year, month, day, hour, minute, second };
    }

    private getDateSegments(segments: Segment[]): DateSegments {
        const year = getEditableSegmentByType(
            segments,
            SegmentTypes.Year
        ) as YearSegment;

        const month = getEditableSegmentByType(
            segments,
            SegmentTypes.Month
        ) as MonthSegment;

        const day = getEditableSegmentByType(
            segments,
            SegmentTypes.Day
        ) as DaySegment;

        return { year, month, day };
    }

    private getTimeSegments(segments: Segment[]): TimeSegments {
        const hour = getEditableSegmentByType(
            segments,
            SegmentTypes.Hour
        ) as HourSegment;

        const minute = getEditableSegmentByType(
            segments,
            SegmentTypes.Minute
        ) as MinuteSegment;

        const second = getEditableSegmentByType(
            segments,
            SegmentTypes.Second
        ) as SecondSegment;

        const dayPeriod = getEditableSegmentByType(
            segments,
            SegmentTypes.DayPeriod
        ) as DayPeriodSegment;

        return { hour, minute, second, ...(dayPeriod ? { dayPeriod } : {}) };
    }
}
