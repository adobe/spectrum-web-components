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

import { EditableSegmentType, SegmentTypes } from '../types';
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
}
