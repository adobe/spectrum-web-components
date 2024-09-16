/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { DateValue } from '@spectrum-web-components/calendar';

export type DateTimePickerValue = DateValue;

export const SegmentTypes = {
    Year: 'year',
    Month: 'month',
    Day: 'day',
    Hour: 'hour',
    Minute: 'minute',
    Second: 'second',
    DayPeriod: 'dayPeriod',
    Literal: 'literal',
} as const;

export type SegmentType = (typeof SegmentTypes)[keyof typeof SegmentTypes];

export type EditableSegmentType = Exclude<SegmentType, 'literal'>;

export const DateSegmentTypes = {
    Day: SegmentTypes.Day,
    Month: SegmentTypes.Month,
    Year: SegmentTypes.Year,
} as const;

export type DateSegmentType =
    (typeof DateSegmentTypes)[keyof typeof DateSegmentTypes];

export const TimeSegmentTypes = {
    Hour: SegmentTypes.Hour,
    Minute: SegmentTypes.Minute,
    Second: SegmentTypes.Second,
    DayPeriod: SegmentTypes.DayPeriod,
} as const;

export type TimeSegmentType =
    (typeof TimeSegmentTypes)[keyof typeof TimeSegmentTypes];

export const SegmentPlaceholders: Readonly<
    Record<EditableSegmentType, string>
> = {
    [SegmentTypes.Year]: '––––',
    [SegmentTypes.Month]: '––',
    [SegmentTypes.Day]: '––',
    [SegmentTypes.Hour]: '––',
    [SegmentTypes.Minute]: '––',
    [SegmentTypes.Second]: '––',
    [SegmentTypes.DayPeriod]: 'AM',
};

export type SegmentPlaceholder =
    (typeof SegmentPlaceholders)[EditableSegmentType];

export interface Segment {
    type: SegmentType;
    formatted: string;
}

export interface EditableSegment extends Segment {
    placeholder: SegmentPlaceholder;
    value?: number;
    minValue: number;
    maxValue: number;
}

export const MandatorySegmentTypes = {
    ...DateSegmentTypes,
    [SegmentTypes.Literal]: SegmentTypes.Literal,
} as const;

export type SegmentLimits = Pick<EditableSegment, 'minValue' | 'maxValue'>;

/**
 * Value and limits of a segment. They are all optional, as literal segments have none of these properties
 */
export type SegmentValueAndLimits = Pick<
    EditableSegment,
    'value' | 'minValue' | 'maxValue'
>;

/**
 * Value and limits of a segment, however the limits are mandatory, as it is known that they have already been defined
 */
export interface SegmentDetails
    extends Omit<SegmentValueAndLimits, 'minValue' | 'maxValue'> {
    minValue: number;
    maxValue: number;
}

export type Precision = 'day' | 'hour' | 'minute' | 'second';

export const MAX_DAYS_PER_MONTH = 31;
export const MAX_DAYS_IN_LEAP_FEBRUARY = 29;

/** AM modifier: `0` hours */
export const AM = 0;

/** PM modifier: `12` hours */
export const PM = 12;

export const MIN_HOUR_AM = AM;
export const MAX_HOUR_AM = 11;

export const MIN_HOUR_PM = PM;
export const MAX_HOUR_PM = 23;

/** A base leap year used to allow for maximum number of days in February */
export const DEFAULT_LEAP_YEAR = 2000;
