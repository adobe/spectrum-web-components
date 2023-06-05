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
import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import styles from './calendar.css.js';
import { property } from 'lit/decorators.js';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js';

/**
 * @element sp-calendar
 */
export class Calendar extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    padded = false;

    protected override render(): TemplateResult {
        return html`
            <div class="spectrum-Calendar-header">
                <div class="spectrum-Calendar-title">August 2017</div>

                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Previous"
                    title="Previous"
                    class="spectrum-Calendar-prevMonth"
                >
                    <sp-icon-chevron-left slot="icon"></sp-icon-chevron-left>
                </sp-action-button>

                <sp-action-button
                    quiet
                    size="s"
                    aria-label="Next"
                    title="Next"
                    class="spectrum-Calendar-nextMonth"
                >
                    <sp-icon-chevron-right slot="icon"></sp-icon-chevron-right>
                </sp-action-button>
            </div>

            <div
                class="spectrum-Calendar-body"
                role="grid"
                tabindex="0"
                aria-readonly="true"
                aria-disabled="false"
            >
                <table role="presentation" class="spectrum-Calendar-table">
                    <thead role="presentation">
                        <tr role="row">
                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Sunday"
                                >
                                    S
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Monday"
                                >
                                    M
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Tuesday"
                                >
                                    T
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Wednesday"
                                >
                                    W
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Thursday"
                                >
                                    T
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Friday"
                                >
                                    F
                                </abbr>
                            </th>

                            <th
                                role="columnheader"
                                scope="col"
                                class="spectrum-Calendar-tableCell"
                            >
                                <abbr
                                    class="spectrum-Calendar-dayOfWeek"
                                    title="Saturday"
                                >
                                    S
                                </abbr>
                            </th>
                        </tr>
                    </thead>

                    <tbody role="presentation">
                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, July 30, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    30
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, July 31, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    31
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, August 1, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    1
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Today, Wednesday, August 2, 2017 selected"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-today"
                                >
                                    2
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, August 3, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    3
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, August 4, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    4
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="true"
                                aria-invalid="false"
                                title="Saturday, August 5, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-selected"
                                >
                                    5
                                </span>
                            </td>
                        </tr>

                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, August 6, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    6
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, August 7, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    7
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, August 8, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    8
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Wednesday, August 9, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    9
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, August 10, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    10
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, August 11, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    11
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Saturday, August 12, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    12
                                </span>
                            </td>
                        </tr>

                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, August 13, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    13
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, August 14, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    14
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, August 15, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    15
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Wednesday, August 16, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    16
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, August 17, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    17
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, August 18, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    18
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Saturday, August 19, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    19
                                </span>
                            </td>
                        </tr>

                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, August 20, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    20
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, August 21, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    21
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, August 22, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    22
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Wednesday, August 23, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    23
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, August 24, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    24
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, August 25, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    25
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Saturday, August 26, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    26
                                </span>
                            </td>
                        </tr>

                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, August 27, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    27
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, August 28, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    28
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, August 29, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    29
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Wednesday, August 30, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    30
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                tabindex="-1"
                                aria-disabled="false"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, August 31, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date"
                                >
                                    31
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, September 1, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    1
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Saturday, September 2, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    2
                                </span>
                            </td>
                        </tr>

                        <tr role="row">
                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Sunday, September 3, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    3
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Monday, September 4, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    4
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Tuesday, September 5, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    5
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Wednesday, September 6, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    6
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Thursday, September 7, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    7
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Friday, September 8, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    8
                                </span>
                            </td>

                            <td
                                role="gridcell"
                                class="spectrum-Calendar-tableCell"
                                aria-disabled="true"
                                aria-selected="false"
                                aria-invalid="false"
                                title="Saturday, September 9, 2017"
                            >
                                <span
                                    role="presentation"
                                    class="spectrum-Calendar-date is-outsideMonth"
                                >
                                    9
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
}
