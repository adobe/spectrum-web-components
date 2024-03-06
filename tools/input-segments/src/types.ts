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

export const dateSegmentTypes: Intl.DateTimeFormatPartTypes[] = [
    'day',
    'month',
    'year',
    'literal',
];

export const timeSegmentTypes: Intl.DateTimeFormatPartTypes[] = [
    'hour',
    'minute',
    'second',
    'dayPeriod',
    'literal',
];

type EditableSegmentTypes = Pick<
    Intl.DateTimeFormatPartTypesRegistry,
    'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'dayPeriod'
>;

export type EditableSegmentType = keyof EditableSegmentTypes;

export interface Segment extends Omit<Intl.DateTimeFormatPart, 'value'> {
    /** A placeholder string for the segment */
    placeholder?: string;

    /** The formatted text for the segment */
    formatted?: string;

    /** The numeric value for the segment, if applicable */
    value?: number;

    /** The minimum numeric value for the segment, if applicable */
    minValue?: number;

    /** The maximum numeric value for the segment, if applicable */
    maxValue?: number;
}

/**
 * Value and limits of a segment. They are all optional, as literal segments have none of these properties
 */
export type SegmentValueAndLimits = Pick<
    Segment,
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

export type TimeGranularity = 'hour' | 'minute' | 'second';

/** AM modifier: `0` hours */
export const AM = 0;

/** PM modifier: `12` hours */
export const PM = 12;

/** Minimum hour value if AM */
export const minHourAM = AM;

/** Maximum hour value if AM */
export const maxHourAM = 11;

/** Minimum hour value if PM */
export const minHourPM = PM;

/** Maximum hour value if PM */
export const maxHourPM = 23;
