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
import { EditableSegmentType, SegmentType, SegmentTypes } from '../../types';
import { DateTimeSegments } from '../DateTimeSegments';
import { type EditableSegment } from '../EditableSegment';
import { SegmentsFormatter } from '../SegmentsFormatter';

export interface SegmentsModifierParams {
    dateFormatter: DateFormatter;
    segments: DateTimeSegments;
    currentDate: ZonedDateTime;
}

export abstract class SegmentsModifier {
    protected segments: DateTimeSegments;
    protected dateFormatter: DateFormatter;
    protected currentDate: ZonedDateTime;

    constructor(params: SegmentsModifierParams) {
        const { dateFormatter, segments, currentDate } = params;
        this.segments = new DateTimeSegments(segments.all);
        this.dateFormatter = dateFormatter;
        this.currentDate = currentDate;
    }

    public modify(segmentType: EditableSegmentType): DateTimeSegments {
        const segment = this.segments.getByType(segmentType);
        if (!segment) return this.segments;

        this.modifySegment(segment);

        this.updateSegmentsLimits(segmentType);

        const segmentsFormatter = new SegmentsFormatter(
            this.dateFormatter,
            this.currentDate
        );
        this.segments = segmentsFormatter.format(this.segments);

        return this.segments;
    }

    private updateSegmentsLimits(modifiedSegmentType: SegmentType): void {
        const changedYear = modifiedSegmentType === SegmentTypes.Year;
        const changedMonth = modifiedSegmentType === SegmentTypes.Month;

        const year = this.segments.year;
        const month = this.segments.month;
        const day = this.segments.day;

        if (changedYear) {
            month?.setLimits(this.currentDate);
            day?.setLimits(this.currentDate, month?.value, year?.value);
        }

        if (changedMonth)
            day?.setLimits(this.currentDate, month?.value, year?.value);
    }

    protected abstract modifySegment(segment: EditableSegment): void;
}
