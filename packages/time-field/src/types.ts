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
export type Granularity = 'hour' | 'minute' | 'second';

export const timeSegmentTypes: Intl.DateTimeFormatPartTypes[] = [
    'hour',
    'minute',
    'second',
    'dayPeriod',
    'literal',
];

export interface TimeSegment extends Omit<Intl.DateTimeFormatPart, 'value'> {
    /** The formatted text for the segment */
    formattedText?: string;

    /** A placeholder string for the segment */
    placeholder?: string;

    /** The numeric value for the segment, if applicable */
    currentValue?: number;

    /** The minimum numeric value for the segment, if applicable */
    minValue?: number;

    /** The maximum numeric value for the segment, if applicable */
    maxValue?: number;
}

export type TimeSegmentValueAndLimits = Pick<
    TimeSegment,
    'currentValue' | 'minValue' | 'maxValue'
>;
