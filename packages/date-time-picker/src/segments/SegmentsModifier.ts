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
import { NumberParser } from '@internationalized/number';
import { getEditableSegmentByType } from '../helpers';
import {
    EditableSegmentType,
    Segment,
    SegmentType,
    SegmentTypes,
} from '../types';
import { DaySegment } from './date/DaySegment';
import { type EditableSegment } from './EditableSegment';
import { SegmentsFormatter } from './SegmentsFormatter';
import { YearSegment } from './date/YearSegment';
import { MonthSegment } from './date/MonthSegment';

export interface SegmentsModifierParams {
    dateFormatter: DateFormatter;
    segments: Segment[];
    currentDate: ZonedDateTime;
}

export interface InputSegmentsModifierParams extends SegmentsModifierParams {
    eventData: string | null;
    numberParser: NumberParser;
}

interface DateSegments {
    year: YearSegment;
    month: MonthSegment;
    day: DaySegment;
}

export abstract class SegmentsModifier {
    protected segments: Segment[];
    protected dateFormatter: DateFormatter;
    protected currentDate: ZonedDateTime;
    constructor(params: SegmentsModifierParams) {
        const { dateFormatter, segments, currentDate } = params;
        this.segments = Array.from(segments);
        this.dateFormatter = dateFormatter;
        this.currentDate = currentDate;
    }

    public modify(segmentType: EditableSegmentType): Segment[] {
        const segment = getEditableSegmentByType(this.segments, segmentType);
        this.modifySegment(segment);

        this.updateSegmentsLimits(segmentType);

        const segmentsFormatter = new SegmentsFormatter(this.dateFormatter);
        this.segments = segmentsFormatter.format(
            this.segments,
            this.currentDate
        );

        return this.segments;
    }

    private updateSegmentsLimits(modifiedSegmentType: SegmentType): void {
        const changedYear = modifiedSegmentType === SegmentTypes.Year;
        const changedMonth = modifiedSegmentType === SegmentTypes.Month;

        const { year, month, day } = this.getDateSegments(this.segments);

        if (changedYear) {
            month.setLimits(this.currentDate);
            day.setLimits(this.currentDate, month.value, year.value);
        }

        if (changedMonth)
            day.setLimits(this.currentDate, month.value, year.value);
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

    protected abstract modifySegment(segment: EditableSegment): void;
}

export class IncrementModifier extends SegmentsModifier {
    protected modifySegment(segment: EditableSegment): void {
        segment.increment(this.currentDate);
    }
}

export class DecrementModifier extends SegmentsModifier {
    protected modifySegment(segment: EditableSegment): void {
        segment.decrement(this.currentDate);
    }
}

export class ClearModifier extends SegmentsModifier {
    protected modifySegment(segment: EditableSegment): void {
        segment.clear();
    }
}

export class InputModifier extends SegmentsModifier {
    private eventData: string | null;
    private numberParser: NumberParser;

    constructor(params: InputSegmentsModifierParams) {
        const { dateFormatter, segments, currentDate } = params;
        super({ dateFormatter, segments, currentDate });
        this.eventData = params.eventData;
        this.numberParser = params.numberParser;
    }

    protected modifySegment(segment: EditableSegment): void {
        if (this.eventData === null) return;
        segment.handleInput(this.eventData, this.numberParser);
    }
}
