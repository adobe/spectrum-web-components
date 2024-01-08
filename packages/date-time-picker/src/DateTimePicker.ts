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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import { InputSegments } from '@spectrum-web-components/input-segments';

import styles from './date-time-picker.css.js';

// TODO: Load dependencies lazily when possible
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/popover/sp-popover.js';

/**
 * @element sp-date-time-picker
 *
 * @event change - Announces when a new date/time is defined by emitting a `Date` object
 *
 * @slot calendar-icon - The icon used in the calendar button
 * @slot help-text - Default or non-negative help text to associate to your form element
 * @slot negative-help-text - Negative help text to associate to your form element when `invalid`
 */
export class DateTimePicker extends InputSegments {
    public static override get styles(): CSSResultArray {
        return [...super.styles, styles];
    }

    /**
     * Indicates whether the picker should be displayed or not
     */
    @property({ type: Boolean, reflect: true })
    public open = false;

    @state()
    override includeDate = true;

    @state()
    override includeTime = true;

    @state()
    private pickerDate?: Date;

    protected override renderField(): TemplateResult {
        return html`
            ${this.renderInputContent()} ${this.renderPicker()}
        `;
    }

    public renderPicker(): TemplateResult {
        const isDisabled = this.disabled || this.readonly;

        return html`
            <div class="picker">
                ${this.renderStateIcons()}

                <sp-picker-button
                    ?open=${this.open}
                    ?quiet=${this.quiet}
                    ?invalid=${this.invalid}
                    ?disabled=${isDisabled}
                    @click=${this.showPicker}
                >
                    <slot name="calendar-icon" slot="icon">
                        <sp-icon-calendar></sp-icon-calendar>
                    </slot>
                </sp-picker-button>

                <!-- TODO: Enable "receives-focus" when calendar is navigable via keyboard -->
                <sp-overlay
                    placement="bottom-start"
                    receives-focus="false"
                    .triggerElement=${this as HTMLElement}
                    ?open=${this.open}
                    @sp-closed=${this.hidePicker}
                >
                    <sp-popover class="popover">
                        <div class="popover-content">
                            <sp-calendar
                                .selectedDate=${this.pickerDate}
                                @change=${this.handleDate}
                            ></sp-calendar>
                        </div>
                    </sp-popover>
                </sp-overlay>
            </div>
        `;
    }

    public showPicker(): void {
        this.pickerDate = this.getDateFromSegments();
        this.open = true;
    }

    public hidePicker(): void {
        this.setNewDateTime();
        this.emitNewDateTime();

        this.pickerDate = undefined;
        this.open = false;
    }

    /**
     * Updates the value of the internal property used to define the date used by the calendar with the value received
     *
     * @param event - Event with the value emitted by the calendar
     */
    private handleDate(event: CustomEvent<Date | undefined>): void {
        event.stopPropagation();

        const dateTime = event.detail;

        if (dateTime) {
            this.updateCurrentDate(dateTime);
        }
    }

    /**
     * Updates the segments using the `Date` object emitted by the calendar inside the picker
     */
    private updateCurrentDate(dateTime: Date): void {
        this.pickerDate = dateTime;

        const { year, month, day } = this.dateToCalendarDateTime(dateTime);

        if (!this.yearSegment || !this.monthSegment || !this.daySegment) {
            return;
        }

        this.yearSegment.value = year;
        this.formatValue(this.yearSegment);

        this.monthSegment.value = month;
        this.formatValue(this.monthSegment);

        this.daySegment.value = day;
        this.formatValue(this.daySegment);

        this.requestUpdate();
    }
}
