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

import { ZonedDateTime } from '@internationalized/date';
import { SegmentTypes } from '../../types';
import { EditableSegment } from '../EditableSegment';

export class YearSegment extends EditableSegment {
    public minValue: number = 1;
    public maxValue: number = 9999;
    public value?: number;

    constructor(formatted: string, label: string) {
        super(SegmentTypes.Year, formatted, label);
    }

    public setLimits(currentDate: ZonedDateTime): void {
        this.minValue = 1;
        this.maxValue = currentDate.calendar.getYearsInEra(currentDate);
        this.updateValueToLimits();
    }

    public override increment(currentDate: ZonedDateTime): void {
        if (this.value === undefined) this.value = currentDate.year;
        else super.increment();
    }

    public override decrement(currentDate: ZonedDateTime): void {
        if (this.value === undefined) this.value = currentDate.year;
        else super.decrement();
    }

    public override clear(): void {
        if (this.value === undefined) return;
        const newValue = Math.floor(this.value / 10);
        this.value = newValue > 0 ? newValue : undefined;
    }
}
