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
import { NumberFormatter } from '@internationalized/number';
import { convertHourTo24hFormat, isNumber } from '../helpers';
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

export class SegmentsFormatter {
    private dateFormatter: DateFormatter;
    private numberFormatter: NumberFormatter;
    private currentDate: ZonedDateTime;

    constructor(dateFormatter: DateFormatter, currentDate: ZonedDateTime) {
        this.dateFormatter = dateFormatter;
        this.currentDate = currentDate;
        this.numberFormatter = new NumberFormatter(
            this.dateFormatter.resolvedOptions().locale,
            { useGrouping: false }
        );
    }

    /**
     * Formats all the `DateTimeSegments` to have the formatted property based on the value property, according to the date formatter.
     * @param segments - `DateTimeSegments` to format
     * @returns Formatted DateTimeSegments
     */
    public format(segments: DateTimeSegments): DateTimeSegments {
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
        segments = new DateTimeSegments(segments.all);

        const { year, month, day, hour, minute, second } = dateInfo;
        const date = new Date(year, month - 1, day, hour, minute, second);

        if (!segments.year) return;
        // Avoid unexpected display (e.g., "2" becoming "1902").
        segments.year.formatted = this.numberFormatter.format(year);

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
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ];

        for (const segmentType of segmentTypesToPad) {
            const segment = segments[segmentType];
            if (!segment) continue;
            segment.formatted = segment.formatted.padStart(
                2,
                this.numberFormatter.format(0)
            );
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

        // Allow 29th of February to be displayed if the year is not set
        const year = segments.year.value ?? DEFAULT_LEAP_YEAR;

        const dayPeriod = segments.dayPeriod?.value;
        let hour = segments.hour?.value;

        if (!isNumber(hour)) {
            if (isNumber(dayPeriod)) hour = dayPeriod;
            else hour = this.currentDate.hour;
        } else if (isNumber(dayPeriod)) {
            hour = convertHourTo24hFormat(hour, dayPeriod);
        }
        const minute = segments.minute?.value ?? this.currentDate.minute;
        const second = segments.second?.value ?? this.currentDate.second;

        return { year, month, day, hour, minute, second };
    }
}
