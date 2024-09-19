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

import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    now,
    Time,
    toCalendarDateTime,
    toZoned,
    ZonedDateTime,
} from '@internationalized/date';
import { NumberParser } from '@internationalized/number';
import {
    CSSResultArray,
    html,
    nothing,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ClassInfo,
    classMap,
    ifDefined,
    StyleInfo,
    styleMap,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import { Calendar, type DateValue } from '@spectrum-web-components/calendar';
import { ManageHelpText } from '@spectrum-web-components/help-text/src/manage-help-text.js';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';

import styles from './date-time-picker.css.js';
import {
    DateTimePickerValue,
    EditableSegmentType,
    Precision,
    SegmentTypes,
} from './types.js';

// TODO: Load dependencies lazily when possible
import '@spectrum-web-components/calendar/sp-calendar.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import {
    convertHourTo24hFormat,
    dateToCalendarDateTime,
    getDate,
    isCalendarDate,
    isCalendarDateTime,
    isNumber,
    isZonedDateTime,
} from './helpers.js';
import { DateTimeSegments } from './segments/DateTimeSegments.js';
import { EditableSegment } from './segments/EditableSegment.js';
import { LiteralSegment } from './segments/LiteralSegment.js';
import { SegmentsFactory } from './segments/SegmentsFactory.js';
import { ClearModifier } from './segments/modifiers/ClearModifier.js';
import { DecrementModifier } from './segments/modifiers/DecrementModifier.js';
import { IncrementModifier } from './segments/modifiers/IncrementModifier.js';
import { InputModifier } from './segments/modifiers/InputModifier.js';
import { type SegmentsModifierParams } from './segments/modifiers/SegmentsModifier.js';

/**
 * @element sp-date-time-picker
 *
 * @event change - Announces when a new date/time is defined by emitting a `Date` object
 *
 * @slot calendar-icon - The icon used in the calendar button
 * @slot help-text - Default or non-negative help text to associate to your form element
 * @slot negative-help-text - Negative help text to associate to your form element when `invalid`
 */
export class DateTimePicker extends ManageHelpText(
    SizedMixin(Focusable, {
        noDefaultSize: true,
    })
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * The selected date of the component. If defined, this also indicates where the calendar opens.
     * If not, the calendar opens at the current month, and placeholder values are shown.
     */
    @property({ attribute: false })
    value?: DateTimePickerValue;

    /**
     * The minimum valid date a user can select
     */
    @property({ attribute: false })
    min?: DateValue;

    /**
     * The maximum valid date a user can select
     */
    @property({ attribute: false })
    max?: DateValue;

    /**
     * The granularity used to display the segments of the component's value
     */
    @property({ type: String, reflect: true })
    precision: Precision = SegmentTypes.Minute;

    /**
     * Whether the `value` held by the form control is invalid.
     */
    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * Whether a user can interact with the value of the form control
     */
    @property({ type: Boolean, reflect: true })
    public readonly = false;

    /**
     * Whether to display the form control with no visible background
     */
    @property({ type: Boolean, reflect: true })
    public quiet = false;

    /**
     * @private
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    @state()
    protected segments: DateTimeSegments = new DateTimeSegments([]);

    @state()
    public isCalendarOpen = false;

    @query('.editable-segment')
    firstEditableSegment!: HTMLDivElement;

    @query('.input')
    private input!: HTMLElement;

    private languageResolver = new LanguageResolutionController(this);
    private get locale(): string {
        return this.languageResolver.language;
    }

    private timeZone = getLocalTimeZone();
    private dateFormatter!: DateFormatter;
    private numberParser!: NumberParser;

    public override get focusElement(): HTMLElement {
        return this.firstEditableSegment;
    }

    private get mostSpecificDateValue(): DateValue {
        const dateValuesDefined = [this.value, this.min, this.max].filter(
            (date) => date !== undefined
        ) as DateValue[];

        const zonedDateTimes = dateValuesDefined.filter(isZonedDateTime);
        if (zonedDateTimes.length > 0) return zonedDateTimes[0];

        const dateTimes = dateValuesDefined.filter(isCalendarDateTime);
        if (dateTimes.length > 0) return dateTimes[0];

        const dates = dateValuesDefined.filter(isCalendarDate);
        return dates[0];
    }

    private currentDate: ZonedDateTime = now(this.timeZone);

    private convertToMostSpecificDateValue(): void {
        const dateValue = this.mostSpecificDateValue;
        let timeZone = this.timeZone;
        if (isZonedDateTime(dateValue)) {
            timeZone = dateValue.timeZone;
            this.value = this.value && toZoned(this.value, timeZone);
            this.min = this.min && toZoned(this.min, timeZone);
            this.max = this.max && toZoned(this.max, timeZone);
        } else if (isCalendarDateTime(dateValue)) {
            this.value = this.value && toCalendarDateTime(this.value);
            this.min = this.min && toCalendarDateTime(this.min);
            this.max = this.max && toCalendarDateTime(this.max);
        }

        if (this.value) this.currentDate = toZoned(this.value, timeZone);
    }

    constructor() {
        super();
        this.setNumberParser();
        this.setDateFormatter();
        this.setSegments();
    }

    public clear(): void {
        this.value = undefined;
    }

    private checkDatesCompliance(
        changesValue: boolean,
        changesMin: boolean,
        changesMax: boolean
    ): void {
        if (
            changesMax &&
            changesMin &&
            this.max &&
            this.min &&
            this.min.compare(this.max) > 0
        ) {
            window.__swc.warn(
                this,
                `<${this.localName}> expects the 'min' to be less than 'max'. Please ensure that 'min' property's date is earlier than 'max' property's date.`,
                'https://opensource.adobe.com/spectrum-web-components/components/date-time-picker' // TODO: update link
            );
            this.min = undefined;
            this.max = undefined;
        }

        if (changesValue && this.value) {
            const isNonCompliant =
                (this.min && this.value.compare(this.min) < 0) ||
                (this.max && this.value.compare(this.max) > 0);

            if (isNonCompliant) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> expects the preselected value to comply with the min and max constraints. Please ensure that 'value' property's date is in between the dates for the 'min' and 'max' properties.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/date-time-picker' // TODO: update link
                );
                this.value = undefined;
            }
        }
    }

    protected override willUpdate(changedProperties: PropertyValues): void {
        const changesValue = changedProperties.has('value');
        const changesMin = changedProperties.has('min');
        const changesMax = changedProperties.has('max');
        const changesDates = changesValue || changesMin || changesMax;
        const changesLocale = changedProperties.has(
            languageResolverUpdatedSymbol
        );
        const changesPrecision = changedProperties.has('precision');
        const changesSegments = changedProperties.has('segments');

        const shouldResetSegments =
            changesDates ||
            changesLocale ||
            changesPrecision ||
            (changesValue && this.value === undefined);

        if (changesDates) {
            this.convertToMostSpecificDateValue();
            this.checkDatesCompliance(changesValue, changesMin, changesMax);
        }

        if (changesLocale) this.setNumberParser();
        if (changesLocale || changesPrecision) this.setDateFormatter();
        if (changesSegments) {
            // TODO: if not all segments are defined, we should set the value to undefined
            this.updateValue();
        }

        if (shouldResetSegments) this.setSegments();
    }

    protected override render(): TemplateResult {
        return html`
            <div id="textfield">
                ${this.renderStateIcons()} ${this.renderInputContent()}
            </div>
            ${this.renderHelpText(this.invalid)}${this.renderPicker()}
        `;
    }

    protected renderStateIcons(): TemplateResult | typeof nothing {
        if (this.invalid)
            return html`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `;

        return nothing;
    }

    public renderPicker(): TemplateResult | typeof nothing {
        if (this.readonly) return nothing;

        return html`
            <sp-picker-button
                ?open=${this.isCalendarOpen}
                ?quiet=${this.quiet}
                ?invalid=${this.invalid}
                ?disabled=${this.disabled}
                @click=${() => (this.isCalendarOpen = true)}
            >
                <slot name="calendar-icon" slot="icon">
                    <sp-icon-calendar></sp-icon-calendar>
                </slot>
            </sp-picker-button>

            <sp-overlay
                .triggerElement=${this.input}
                placement="top"
                offset="0"
                receives-focus="true"
                ?open=${this.isCalendarOpen}
                @sp-closed=${() => (this.isCalendarOpen = false)}
            >
                <sp-popover>
                    <div class="popover-content">
                        <sp-calendar
                            .value=${this.value}
                            .min=${this.min}
                            .max=${this.max}
                            @change=${this.handleChange}
                        ></sp-calendar>
                    </div>
                </sp-popover>
            </sp-overlay>
        `;
    }

    private handleChange(event: Event): void {
        event.stopPropagation();
        this.isCalendarOpen = false;
        const calendarValue = (event.target as Calendar).value as CalendarDate;

        if (!this.includesTime) this.value = calendarValue;
        else {
            const hour = this.segments.hour?.value ?? 0;
            const minute = this.segments.minute?.value ?? 0;
            const second = this.segments.second?.value ?? 0;
            const time = new Time(hour, minute, second);
            this.value = toCalendarDateTime(calendarValue, time);
        }
    }

    private get includesTime(): boolean {
        const timePrecisions = [
            SegmentTypes.Hour,
            SegmentTypes.Minute,
            SegmentTypes.Second,
        ] as Precision[];
        return timePrecisions.includes(this.precision);
    }

    public renderInputContent(): TemplateResult {
        return html`
            <div class="input">
                <span
                    class="input-content"
                    @focusin=${() => (this.focused = !this.readonly)}
                    @focusout=${() => (this.focused = false)}
                >
                    ${this.segments.all.map((segment) =>
                        when(
                            segment.type === SegmentTypes.Literal,
                            () => this.renderLiteralSegment(segment),
                            () =>
                                this.renderEditableSegment(
                                    segment as EditableSegment
                                )
                        )
                    )}
                </span>
            </div>
        `;
    }

    public renderLiteralSegment(segment: LiteralSegment): TemplateResult {
        /**
         * We need this flag below to prevent Prettier from moving the content of the tag to the next line, which causes
         * problems on rendering because of spaces added before and after the content (indentation)
         */
        // prettier-ignore
        return html`
            <span
                class="literal-segment"
                data-test-id=${segment.type}
            >${segment.formatted ?? ''}</span>
        `;
    }

    public renderEditableSegment(segment: EditableSegment): TemplateResult {
        const isActive = !this.disabled && !this.readonly;
        const usePlaceholder = segment.value === undefined;

        const segmentClasses: ClassInfo = {
            'editable-segment': true,
            'is-placeholder': usePlaceholder,
        };

        const segmentStyles: StyleInfo = {
            'min-width': isNumber(segment.maxValue)
                ? `${String(segment.maxValue).length}ch`
                : undefined,
        };

        /**
         * When dealing with tags that have the `contenteditable` attribute, it is recommended that the tag content be
         * inserted using the `.innerText` property instead of using string interpolation:
         *
         * https://lit.dev/docs/templates/expressions/#invalid-locations:~:text=bind%20to%20the%20.innerText
         *
         * Although this is just a Lit recommendation (as described in the documentation itself, "beware"), we have
         * identified that the use of `.innerText` here is mandatory.
         *
         * We use the `input` event to define the content of the segment, and there are moments when we want to cancel
         * the default action of a key typed by the user (for example, when the user types a letter in which only
         * numbers are accepted), however, the `input` event action cannot be cancelled with `event.preventDefault()`,
         * and because of this, if we try to use string interpolation, it will break the references to the DOM that Lit
         * uses to dynamically update the content, but this problem does not occur when we bind to the `.innerText`
         * property.
         *
         * TODO: Include/review ARIA attributes for editable segments
         * TODO: Move `handle` functions call to a cache so that it doesn't cycle on the binding in each render pass
         */
        return html`
            <div
                role="spinbutton"
                contenteditable=${ifDefined(isActive ? true : undefined)}
                inputmode=${ifDefined(isActive ? 'numeric' : undefined)}
                tabindex=${ifDefined(isActive ? '0' : undefined)}
                aria-hidden=${ifDefined(usePlaceholder ? 'true' : undefined)}
                class=${classMap(segmentClasses)}
                style=${styleMap(segmentStyles)}
                data-type=${segment.type}
                @keydown=${this.handleKeydown}
                @beforeinput=${this.handleBeforeInput}
                @input=${this.handleInput}
                .innerText=${this.renderSegmentText(segment)}
            ></div>
        `;
    }

    protected renderSegmentText(segment: EditableSegment): string {
        const usePlaceholder = segment.value === undefined;

        return when(
            usePlaceholder,
            () => segment.placeholder ?? '',
            () => segment.formatted ?? ''
        );
    }

    protected handleKeydown(event: KeyboardEvent): void {
        const segmentType = (event.target as HTMLElement).dataset
            .type as EditableSegmentType;

        switch (event.code) {
            case 'ArrowUp': {
                this.incrementValue(segmentType);
                break;
            }
            case 'ArrowDown': {
                this.decrementValue(segmentType);
                break;
            }
            case 'ArrowRight': {
                this.focusNextSegment(event);
                break;
            }
            case 'ArrowLeft': {
                this.focusPreviousSegment(event);
                break;
            }
        }
    }

    private get modifierParams(): SegmentsModifierParams {
        return {
            dateFormatter: this.dateFormatter,
            segments: this.segments,
            currentDate: this.currentDate,
        };
    }

    private incrementValue(segmentType: EditableSegmentType): void {
        const incrementModifier = new IncrementModifier(this.modifierParams);
        this.segments = incrementModifier.modify(segmentType);
    }

    private decrementValue(segmentType: EditableSegmentType): void {
        const decrementModifier = new DecrementModifier(this.modifierParams);
        this.segments = decrementModifier.modify(segmentType);
    }

    private handleBeforeInput(event: InputEvent): void {
        const segmentType = (event.target as HTMLElement).dataset
            .type as EditableSegmentType;

        switch (event.inputType) {
            case 'deleteContentBackward':
            case 'deleteContentForward':
                event.preventDefault();
                this.clearContent(segmentType);
                break;
            case 'insertParagraph': // “Enter” key
            case 'insertLineBreak': // Shift + “Enter” keys
                event.preventDefault();
                break;
        }
    }

    private clearContent(segmentType: EditableSegmentType): void {
        const clearModifier = new ClearModifier(this.modifierParams);
        this.segments = clearModifier.modify(segmentType);
    }

    private handleInput(event: InputEvent): void {
        const segmentType = (event.target as HTMLElement).dataset
            .type as EditableSegmentType;

        const inputModifier = new InputModifier({
            ...this.modifierParams,
            eventData: event.data,
            numberParser: this.numberParser,
        });

        this.segments = inputModifier.modify(segmentType);

        this.updateContent(this.segments.getByType(segmentType)!, event);
    }

    /**
     * To define the content of elements with the `contenteditable` attribute with Lit we bind to the `.innerText`
     * property of the element instead of using string interpolation
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param event - Triggered event details
     */
    private updateContent(
        segment: EditableSegment,
        event: InputEvent | KeyboardEvent
    ): void {
        const segmentEl = event.target as HTMLElement;

        if (segmentEl) {
            const content =
                segment.value !== undefined
                    ? segment.formatted
                    : segment.placeholder;

            segmentEl.innerText = content ?? '';

            this.requestUpdate();
        }
    }

    private dispatchChange(): void {
        this.dispatchEvent(
            new CustomEvent('change', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Sets the new date/time object according to the configuration parameters and if the minimum required values for
     * each type (date only, time only or date and time together) were defined
     */
    protected updateValue(): void {
        const date = this.getDateFromSegments();
        if (!date) return;

        if (this.precision === SegmentTypes.Day) {
            this.value = dateToCalendarDateTime(date);
            this.dispatchChange();
            return;
        }

        const dateCalendar = dateToCalendarDateTime(date);

        const time = this.getTimeFromSegments();
        if (!time) return;

        const timeCalendarDateTime = dateToCalendarDateTime(time);

        this.value = dateCalendar.set({
            hour: timeCalendarDateTime.hour,
            minute: timeCalendarDateTime.minute,
            second: timeCalendarDateTime.second,
        });
        this.dispatchChange();
    }

    /**
     * Returns a `Date` object using the current values of the segments that make up the date, if they are filled
     */
    private getDateFromSegments(): Date | undefined {
        return getDate(
            this.segments.year?.value,
            this.segments.month?.value,
            this.segments.day?.value
        );
    }

    private isTimeDefined(): boolean {
        const hour = this.segments.hour?.value;
        const minute = this.segments.minute?.value;
        const second = this.segments.second?.value;

        const isHourPrecision = this.precision === SegmentTypes.Hour;
        const isMinutePrecision = this.precision === SegmentTypes.Minute;
        const isSecondPrecision = this.precision === SegmentTypes.Second;

        return (
            (isHourPrecision && isNumber(hour)) ||
            (isMinutePrecision && isNumber(hour) && isNumber(minute)) ||
            (isSecondPrecision &&
                isNumber(hour) &&
                isNumber(minute) &&
                isNumber(second))
        );
    }

    /**
     * Returns a `Date` object using the current values of the segments that make up the time, if they are filled. As it
     * is not possible to have a `Date` object without an associated date, we use the current date defined internally
     * instead of using the date defined in the date segments
     */
    private getTimeFromSegments(): Date | undefined {
        if (!this.isTimeDefined()) return;

        let hour = this.segments.hour?.value;
        const minute = this.segments.minute?.value;
        const second = this.segments.second?.value;

        const dateTime = this.currentDate.toDate();

        if (isNumber(hour)) {
            const dayPeriod = this.segments.dayPeriod!.value;
            if (isNumber(dayPeriod))
                hour = convertHourTo24hFormat(hour, dayPeriod);

            dateTime.setHours(hour);
        }

        if (isNumber(minute)) dateTime.setMinutes(minute);

        if (isNumber(second)) dateTime.setSeconds(second);

        return dateTime;
    }

    private setDateFormatter(): void {
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        let timeOptions: Intl.DateTimeFormatOptions = {};

        if (this.includesTime) {
            const minPrecisions: Precision[] = [
                SegmentTypes.Minute,
                SegmentTypes.Second,
            ];
            const includeMinutes = minPrecisions.includes(this.precision!);
            const includeSeconds = this.precision === SegmentTypes.Second;

            timeOptions = {
                hour: '2-digit',
                ...(includeMinutes && { minute: '2-digit' }),
                ...(includeSeconds && { second: '2-digit' }),
            };
        }

        this.dateFormatter = new DateFormatter(this.locale, {
            ...dateOptions,
            ...timeOptions,
        });
    }

    private setNumberParser(): void {
        this.numberParser = new NumberParser(this.locale, {
            maximumFractionDigits: 0,
        });
    }

    private setSegments(): void {
        const segmentsFactory = new SegmentsFactory(this.dateFormatter);
        const segments = segmentsFactory.createSegments(
            this.currentDate,
            this.value !== undefined
        );

        this.segments = segments;
    }

    /**
     * Focuses on the next editable segment, if any
     *
     * @param event - Triggered event details
     */
    private focusNextSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'next');
    }

    /**
     * Focuses on the previous editable segment, if any
     *
     * @param event - Triggered event details
     */
    private focusPreviousSegment(event: KeyboardEvent): void {
        this.focusSegment(event.target as HTMLDivElement, 'previous');
    }

    /**
     * Focuses the segment according to the direction, if there is one to focus on
     *
     * @param segment - Segment on which the event was triggered (the segment being changed)
     * @param elementToFocus - Defines which element will be focused: is it the previous one or the next one?
     */
    private focusSegment(
        segment: HTMLDivElement,
        elementToFocus: 'previous' | 'next'
    ): void {
        let segmentFound = false;
        let currentSegment = segment;

        while (!segmentFound) {
            const siblingSegment = (
                elementToFocus === 'previous'
                    ? currentSegment.previousElementSibling
                    : currentSegment.nextElementSibling
            ) as HTMLDivElement;

            // No more segments to focus on
            if (!siblingSegment) {
                break;
            }

            if (siblingSegment.getAttribute('contenteditable')) {
                siblingSegment.focus();
                segmentFound = true;
            }

            currentSegment = siblingSegment;
        }
    }
}
