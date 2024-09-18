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
import { getAmPmModifier } from '../../helpers';

export class HourSegment extends EditableSegment {
    public minValue: number = 0;
    public maxValue: number = 23;
    public value?: number;

    constructor(formatted: string) {
        super(SegmentTypes.Hour, formatted);
    }

    public setLimits(is12HourClock?: boolean): void {
        this.minValue = 0;
        this.maxValue = 23;

        if (is12HourClock) {
            this.minValue = 0;
            this.maxValue = 11;
        }
    }

    public override setValueFromDate(
        currentDate: ZonedDateTime,
        is12HourClock?: boolean
    ): void {
        if (is12HourClock)
            this.value = currentDate.hour - getAmPmModifier(currentDate.hour);
        else super.setValueFromDate(currentDate);
    }
}
