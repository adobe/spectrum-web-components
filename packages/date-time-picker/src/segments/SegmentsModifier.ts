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
import { getEditableSegmentByType } from '../helpers';
import { EditableSegmentType, Segment, SegmentTypes } from '../types';
import { DaySegment } from './date/DaySegment';
import { type EditableSegment } from './EditableSegment';
import { SegmentsFormatter } from './SegmentsFormatter';

export abstract class SegmentsModifier {
    segments: Segment[];
    dateFormatter: DateFormatter;
    constructor(dateFormatter: DateFormatter, segments: Segment[]) {
        this.segments = Array.from(segments);
        this.dateFormatter = dateFormatter;
    }

    public modify(
        segmentType: EditableSegmentType,
        currentDate: ZonedDateTime
    ): Segment[] {
        const segment = getEditableSegmentByType(this.segments, segmentType);
        this.modifySegment(segment, currentDate);

        const shouldUpdateDayLimits =
            segmentType === SegmentTypes.Month || SegmentTypes.Year;

        if (shouldUpdateDayLimits) {
            const year = getEditableSegmentByType(
                this.segments,
                SegmentTypes.Year
            );
            const month = getEditableSegmentByType(
                this.segments,
                SegmentTypes.Month
            );
            const day = getEditableSegmentByType(
                this.segments,
                SegmentTypes.Day
            ) as DaySegment;
            day.setLimits(currentDate, month.value, year.value);
        }

        const segmentsFormatter = new SegmentsFormatter(this.dateFormatter);
        this.segments = segmentsFormatter.format(this.segments, currentDate);

        return this.segments;
    }

    protected abstract modifySegment(
        segment: EditableSegment,
        currentDate: ZonedDateTime
    ): void;
}

export class IncrementModifier extends SegmentsModifier {
    protected modifySegment(
        segment: EditableSegment,
        currentDate: ZonedDateTime
    ): void {
        segment.increment(currentDate);
    }
}

export class DecrementModifier extends SegmentsModifier {
    protected modifySegment(
        segment: EditableSegment,
        currentDate: ZonedDateTime
    ): void {
        segment.decrement(currentDate);
    }
}
