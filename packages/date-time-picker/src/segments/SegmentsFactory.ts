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
import {
    EditableSegmentType,
    Segment,
    SegmentType,
    SegmentTypes,
} from '../types';
import { EditableSegment } from './EditableSegment';
import { LiteralSegment } from './LiteralSegment';
import { DaySegment } from './date/DaySegment';
import { MonthSegment } from './date/MonthSegment';
import { YearSegment } from './date/YearSegment';
import { DayPeriodSegment } from './time/DayPeriodSegment';
import { HourSegment } from './time/HourSegment';
import { MinuteSegment } from './time/MinuteSegment';
import { SecondSegment } from './time/SecondSegment';

interface DateSegments {
    year: YearSegment;
    month: MonthSegment;
    day: DaySegment;
}

export class SegmentsFactory {
    dateFormatter: DateFormatter;
    constructor(dateFormatter: DateFormatter) {
        this.dateFormatter = dateFormatter;
    }

    private get is12HourFormat(): boolean {
        return Boolean(this.dateFormatter.resolvedOptions().hour12);
    }

    createSegments(
        currentDate: ZonedDateTime,
        shouldSetSegmentsValues: boolean = false
    ): Segment[] {
        const date = currentDate.toDate();
        const segments = this.dateFormatter.formatToParts(date).map((part) => {
            const type = part.type as SegmentType;
            const formatted = part.value;

            return this.createSegment(type, formatted);
        });

        const { year, month, day } = this.getDateSegments(segments);

        year.setLimits(currentDate);
        month.setLimits(currentDate);
        if (shouldSetSegmentsValues) {
            year.setValue(currentDate);
            month.setValue(currentDate);
        }

        day.setLimits(currentDate, month.value, year.value);
        day.setValue(currentDate);

        const hour = this.getEditableSegmentByType(
            segments,
            SegmentTypes.Hour
        ) as HourSegment;

        hour.setLimits(this.is12HourFormat);
        if (shouldSetSegmentsValues) {
            hour.setValue(currentDate, this.is12HourFormat);

            if (this.is12HourFormat) {
                const dayPeriod = this.getEditableSegmentByType(
                    segments,
                    SegmentTypes.DayPeriod
                ) as DayPeriodSegment;
                dayPeriod.setValue(currentDate, this.is12HourFormat);
            }
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

    private getDateSegments(segments: Segment[]): DateSegments {
        const year = this.getEditableSegmentByType(
            segments,
            SegmentTypes.Year
        ) as YearSegment;

        const month = this.getEditableSegmentByType(
            segments,
            SegmentTypes.Month
        ) as MonthSegment;

        const day = this.getEditableSegmentByType(
            segments,
            SegmentTypes.Day
        ) as DaySegment;

        return { year, month, day };
    }

    private getEditableSegmentByType(
        segments: Segment[],
        type: EditableSegmentType
    ): EditableSegment {
        return segments.find(
            (segment) => segment.type === type
        ) as EditableSegment;
    }
}
