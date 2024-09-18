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
import { EditableSegment } from '../EditableSegment';
import { AM, PM, SegmentTypes } from '../../types';
import { getAmPmModifier } from '../../helpers';

export class DayPeriodSegment extends EditableSegment {
    public minValue: typeof AM = AM;
    public maxValue: typeof PM = PM;
    public value?: typeof AM | typeof PM;

    constructor(formatted: string) {
        super(SegmentTypes.DayPeriod, formatted);
    }

    private toggleAmPm(): void {
        if (this.value === AM) this.value = PM;
        else this.value = AM;
    }

    public override increment(): void {
        if (this.value === undefined) this.value = this.minValue;
        else this.toggleAmPm();
    }

    public override decrement(): void {
        if (this.value === undefined) this.value = this.maxValue;
        else this.toggleAmPm();
    }

    public override setValueFromDate(currentDate: ZonedDateTime): void {
        this.value = getAmPmModifier(currentDate.hour);
    }

    public override handleInput(): void {
        return;
    }
}
