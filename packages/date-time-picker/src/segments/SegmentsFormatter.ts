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
import { convertHourTo24hFormat, getDate } from '../helpers';
import { DEFAULT_LEAP_YEAR, SegmentTypes } from '../types';
import { DateTimeSegments } from './DateTimeSegments';

interface DateInfo {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}

/**
 * If the segment has a `value`, it defines the text used in the UI formatted according to the locale. At this
 * moment we are formatting the value of a specific segment, but it is not possible to generate a valid Date object
 * with just one piece of information (day, month, year, etc.), so we need to define a "base date" to be used
 * together with the value of the segment.
 *
 * For example, if the current segment is the day segment, but the month and year segment have not yet been defined,
 * we need to choose a month and a year to be used in composing the date that will be used in formatting, after all,
 * there is no day without a month and a year.
 *
 * @param segment - Segment to format the value
 */
export class SegmentsFormatter {
    private dateFormatter: DateFormatter;
    private currentDate: ZonedDateTime;

    constructor(dateFormatter: DateFormatter, currentDate: ZonedDateTime) {
        this.dateFormatter = dateFormatter;
        this.currentDate = currentDate;
    }

    public format(segments: DateTimeSegments): DateTimeSegments {
        segments = structuredClone(segments);
        if (!segments.year || !segments.month || !segments.day) return segments;

        const dateInfo = this.getDateInfoWithDefaults(segments);
        if (!dateInfo) return segments;

        this.setSegmentsFormatted(segments, dateInfo);
        this.padSegmentsFormatted(segments);

        return segments;
    }

    private setSegmentsFormatted(
        segments: DateTimeSegments,
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
        if (!segments.year) return;
        segments.year.formatted = String(year);

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
            const segment = segments[segmentType];
            if (!segment) continue;

            const formattedPart = formattedDateParts.find(
                (part) => part.type === segmentType
            )?.value;
            if (!formattedPart) continue;

            segment.formatted = formattedPart;
        }
    }

    private padSegmentsFormatted(segments: DateTimeSegments): void {
        if (!segments.hour) return;

        const segmentTypesToPad = [
            SegmentTypes.Month,
            SegmentTypes.Day,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ];

        if (segments.dayPeriod) {
            const formattedHour = segments.hour.formatted;
            segments.hour.formatted = formattedHour.padStart(1, '0');
        } else {
            const formattedHour = segments.hour.formatted;
            segments.hour.formatted = formattedHour.padStart(2, '0');
        }

        for (const segmentType of segmentTypesToPad) {
            const segment = segments[segmentType];
            if (!segment) continue;
            segment.formatted = segment.formatted.padStart(2, '0');
        }
    }

    private getDateInfoWithDefaults(
        segments: DateTimeSegments
    ): DateInfo | undefined {
        if (!segments.year || !segments.month || !segments.day) return;

        const day =
            segments.day.value ?? getMinimumDayInMonth(this.currentDate);
        const month =
            segments.month.value ?? getMinimumMonthInYear(this.currentDate);

        /**
         * If the day being formatted is February 29th but the year segment has not yet been filled, we need to use a
         * leap year to allow the 29th to remain, otherwise, if we use the current year and it is not a leap year, the
         * day that would be displayed would be March 1st, as February 29th would not exist and JavaScript “moves” the
         * day to the next day.
         */
        const year = segments.year.value ?? DEFAULT_LEAP_YEAR;

        let hour = segments.hour?.value ?? this.currentDate.hour;
        const minute = segments.minute?.value ?? this.currentDate.minute;
        const second = segments.second?.value ?? this.currentDate.second;

        const dayPeriod = segments.dayPeriod?.value;
        if (dayPeriod) hour = convertHourTo24hFormat(hour, dayPeriod);

        return { year, month, day, hour, minute, second };
    }
}
