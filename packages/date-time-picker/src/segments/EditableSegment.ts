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
import { NumberParser } from '@internationalized/number';
import {
    EditableSegmentType,
    SegmentPlaceholder,
    SegmentPlaceholders,
    SegmentTypes,
} from '../types';

export abstract class EditableSegment {
    public type: EditableSegmentType;
    public formatted: string;
    public placeholder: SegmentPlaceholder;
    public abstract minValue: number;
    public abstract maxValue: number;
    public abstract value?: number;

    constructor(type: EditableSegmentType, formatted: string) {
        this.type = type;
        this.formatted = formatted;
        this.placeholder = SegmentPlaceholders[type];
    }

    public increment(_currentDate?: ZonedDateTime): void {
        if (this.value === undefined) this.value = this.minValue;
        else {
            this.value = this.value + 1;
            if (this.value > this.maxValue) this.value = this.minValue;
        }
    }

    public decrement(_currentDate?: ZonedDateTime): void {
        if (this.value === undefined) this.value = this.maxValue;
        else {
            this.value = this.value - 1;
            if (this.value < this.minValue) this.value = this.maxValue;
        }
    }

    public setValueFromDate(currentDate: ZonedDateTime): void {
        if (this.type !== SegmentTypes.DayPeriod)
            this.value = currentDate[this.type];
    }

    public clear(): void {
        this.value = undefined;
    }

    public handleInput(eventData: string, numberParser: NumberParser): void {
        const typedValue = numberParser.parse(eventData);
        if (isNaN(typedValue)) return;

        let newValue: number | undefined = numberParser.parse(
            `${this.value ?? ''}${typedValue}`
        );

        if (String(newValue).length > String(this.maxValue).length)
            newValue = numberParser.parse(String(newValue).slice(1));

        const { minValue, maxValue } = this.typedInLimits;

        if (newValue < minValue) {
            newValue = !this.isTypedValueCompliant(typedValue)
                ? this.value
                : typedValue;
        } else if (newValue > maxValue) {
            newValue = !this.isTypedValueCompliant(typedValue)
                ? this.value
                : typedValue;
        }

        this.value = newValue;
    }

    private isTypedValueCompliant(value: number): boolean {
        const { minValue, maxValue } = this.typedInLimits;
        return value >= minValue && value <= maxValue;
    }

    /**
     * Returns the limits used to validate a user typed-in value
     */
    protected get typedInLimits(): { minValue: number; maxValue: number } {
        return {
            minValue: this.minValue,
            maxValue: this.maxValue,
        };
    }

    public updateValueToLimits(): void {
        if (this.value === undefined) return;

        if (this.value < this.minValue) this.value = this.minValue;
        if (this.value > this.maxValue) this.value = this.maxValue;
    }
}
