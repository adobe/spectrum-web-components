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
import { CSSResultArray } from '@spectrum-web-components/base';
import { state } from '@spectrum-web-components/base/src/decorators.js';
import { InputSegments } from '@spectrum-web-components/input-segments';

import styles from './time-field.css.js';

/**
 * @element sp-time-field
 *
 * @event change - Announces when a new time is defined by emitting a `Date` object
 *
 * @slot help-text - Default or non-negative help text to associate to your form element
 * @slot negative-help-text - Negative help text to associate to your form element when `invalid`
 */
export class TimeField extends InputSegments {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    @state()
    override includeTime = true;
}
