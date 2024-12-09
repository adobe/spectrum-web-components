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

import { DateFormatter, ZonedDateTime } from '@internationalized/date';
import { NumberFormatter } from '@internationalized/number';
import {
    EditableSegmentType,
    LiteralSegmentType,
    SegmentType,
    SegmentTypes,
} from '../types';
import { DateTimeSegments, Segment } from './DateTimeSegments';
import { EditableSegment } from './EditableSegment';
import { LiteralSegment } from './LiteralSegment';
import { DaySegment } from './date/DaySegment';
import { MonthSegment } from './date/MonthSegment';
import { YearSegment } from './date/YearSegment';
import { DayPeriodSegment } from './time/DayPeriodSegment';
import { HourSegment } from './time/HourSegment';
import { MinuteSegment } from './time/MinuteSegment';
import { SecondSegment } from './time/SecondSegment';

export class SegmentsFactory {
    private dateFormatter: DateFormatter;
    private numberFormatter: NumberFormatter;
    private dateTimeFieldDisplayNames: Intl.DisplayNames;

    constructor(dateFormatter: DateFormatter) {
        this.dateFormatter = dateFormatter;

        const locale = this.dateFormatter.resolvedOptions().locale;
        this.numberFormatter = new NumberFormatter(locale, {
            useGrouping: false,
        });
        this.dateTimeFieldDisplayNames = new Intl.DisplayNames([locale], {
            type: 'dateTimeField',
        });
    }

    /**
     * Creates the `DateTimeSegments` needed for the DateTimePicker
     * @param currentDate - The date to create the segments from. This is used to set the limits and values of the segments.
     * @param setValues - If true, the segments will have their values set from the currentDate. If false, the segments will have no values.
     */
    createSegments(
        currentDate: ZonedDateTime,
        setValues: boolean = false
    ): DateTimeSegments {
        const date = new Date(
            currentDate.year,
            currentDate.month - 1, // 0-indexed in Date but 1-indexed in ZonedDateTime
            currentDate.day,
            currentDate.hour,
            currentDate.minute,
            currentDate.second
        );

        const createdSegments = this.dateFormatter
            .formatToParts(date)
            .map((part) => {
                const type = part.type as SegmentType;
                let formatted = part.value;
                // Avoid unexpected display (e.g., "2" becoming "1902").
                if (type === 'year')
                    formatted = this.numberFormatter.format(currentDate.year);
                return this.createSegment(type, formatted);
            });

        const segments = new DateTimeSegments(createdSegments);

        const year = segments.year!;
        const month = segments.month!;
        const day = segments.day!;

        year.setLimits(currentDate);
        month.setLimits(currentDate);
        if (setValues) {
            year.setValueFromDate(currentDate);
            month.setValueFromDate(currentDate);
        }

        day.setLimits(currentDate, month.value, year.value);
        if (setValues) day.setValueFromDate(currentDate);

        const hour = segments.hour;
        const minute = segments.minute;
        const second = segments.second;
        const dayPeriod = segments.dayPeriod;

        if (dayPeriod) dayPeriod.setLocalizedLimits(this.dateFormatter);

        if (!hour) return segments;

        const is12HourFormat = Boolean(dayPeriod);
        hour.setLimits(is12HourFormat);
        if (setValues) {
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

    private createSegment(
        type: EditableSegmentType | LiteralSegmentType,
        formatted: string
    ): Segment {
        const editableSegmentConstructors: Record<
            EditableSegmentType,
            new (formatted: string, label: string) => EditableSegment
        > = {
            [SegmentTypes.Year]: YearSegment,
            [SegmentTypes.Month]: MonthSegment,
            [SegmentTypes.Day]: DaySegment,
            [SegmentTypes.Hour]: HourSegment,
            [SegmentTypes.Minute]: MinuteSegment,
            [SegmentTypes.Second]: SecondSegment,
            [SegmentTypes.DayPeriod]: DayPeriodSegment,
        };

        if (type !== SegmentTypes.Literal) {
            const SegmentConstructor = editableSegmentConstructors[type];
            return new SegmentConstructor(
                formatted,
                this.displayNameOfType(type)
            );
        }

        return new LiteralSegment(formatted);
    }

    private displayNameOfType(type: EditableSegmentType): string {
        const label = this.dateTimeFieldDisplayNames.of(type);
        if (!label) return '';

        return label.charAt(0).toUpperCase() + label.slice(1);
    }
}
