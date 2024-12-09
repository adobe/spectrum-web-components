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
import { getDayPeriodModifier } from '../../helpers';

export class HourSegment extends EditableSegment {
    public minValue: number = 0;
    public maxValue: number = 23;
    public value?: number;

    constructor(formatted: string, label: string) {
        super(SegmentTypes.Hour, formatted, label);
    }

    public setLimits(is12HourClock?: boolean): void {
        this.minValue = 0;
        this.maxValue = 23;

        if (is12HourClock) {
            this.minValue = 0;
            this.maxValue = 11;
        }

        this.updateValueToLimits();
    }

    public override setValueFromDate(
        currentDate: ZonedDateTime,
        is12HourClock?: boolean
    ): void {
        if (is12HourClock)
            this.value =
                currentDate.hour - getDayPeriodModifier(currentDate.hour);
        else super.setValueFromDate(currentDate);
    }

    /**
     * Returns the limits used to validate a user typed-in value.
     *
     * Different limits are needed when the user is typing in the hour segment and the clock is in 12-hour format due to the fact that
     * the hour value of 0 should be displayed as 12. Therefore, in the 12h format, the user should be able to type in "12" but not "00",
     * for the 00 time, which is represented by the value of 0 of the hour segment.
     */
    protected override get inputValidationLimits(): {
        minValue: number;
        maxValue: number;
    } {
        const isAmPm = this.maxValue === 11;

        return {
            minValue: isAmPm ? 1 : 0,
            maxValue: isAmPm ? 12 : 23,
        };
    }
}
