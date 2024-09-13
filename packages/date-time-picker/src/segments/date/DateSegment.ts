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
import { DateSegmentType } from '../../types';
import { EditableSegment } from '../EditableSegment';

export abstract class DateSegment extends EditableSegment {
    constructor(
        public override type: DateSegmentType,
        formatted: string
    ) {
        super(type, formatted);
    }

    public abstract setLimits(currentDate: ZonedDateTime): void;
    public abstract setLimits(
        currentDate: ZonedDateTime,
        month?: number,
        year?: number
    ): void;
}
