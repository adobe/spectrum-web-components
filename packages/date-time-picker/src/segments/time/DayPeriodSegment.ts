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
import { getDayPeriodModifier } from '../../helpers';
import { AM, PM, SegmentTypes } from '../../types';
import { EditableSegment } from '../EditableSegment';

export class DayPeriodSegment extends EditableSegment {
    public minValue: typeof AM = AM;
    public maxValue: typeof PM = PM;
    public value?: typeof AM | typeof PM;
    private localizedMinValue: string = 'AM';
    private localizedMaxValue: string = 'PM';

    constructor(formatted: string, label: string) {
        super(SegmentTypes.DayPeriod, formatted, label);
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
        this.value = getDayPeriodModifier(currentDate.hour);
    }

    public override handleInput(eventData: string): void {
        const charTypedIn = eventData.toLowerCase();
        const isCharFromAM = this.localizedMinValue
            .toLowerCase()
            .includes(charTypedIn);
        const isCharFromPM = this.localizedMaxValue
            .toLowerCase()
            .includes(charTypedIn);

        if (isCharFromAM && isCharFromPM) return;

        if (isCharFromAM) this.value = AM;
        if (isCharFromPM) this.value = PM;
        return;
    }

    public setLocalizedLimits(dateFormatter: DateFormatter): void {
        const amDate = new Date(0, 0, 0, this.minValue, 0);
        const pmDate = new Date(0, 0, 0, this.maxValue, 0);

        const [am, pm] = [amDate, pmDate].map(
            this.getDayPeriodFromDate.bind(this, dateFormatter)
        );

        if (am) this.localizedMinValue = am;
        if (pm) this.localizedMaxValue = pm;
    }

    private getDayPeriodFromDate(
        dateFormatter: DateFormatter,
        date: Date
    ): string | undefined {
        return dateFormatter
            .formatToParts(date)
            .find((part) => part.type === this.type)?.value;
    }
}
