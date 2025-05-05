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
import { DateValue, isSameDay } from '@internationalized/date';
import {
    elementUpdated,
    expect,
    fixture,
    html,
    oneEvent,
} from '@open-wc/testing';
import { Calendar } from '@spectrum-web-components/calendar';
import {
    DateTimePicker,
    EditableSegmentType,
    SegmentPlaceholders,
} from '@spectrum-web-components/date-time-picker';
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import '@spectrum-web-components/theme/sp-theme.js';
import { sendKeys } from '@web/test-runner-commands';
import { spreadProps } from '../../../test/lit-helpers.js';

export interface EditableSegments extends Array<HTMLElement> {
    getByType: (type: EditableSegmentType) => HTMLElement;
}

export async function fixtureElement({
    locale = 'en-US',
    props = {},
}: {
    locale?: string;
    props?: { [prop: string]: unknown };
} = {}): Promise<DateTimePicker> {
    const wrapped = await fixture<HTMLElement>(html`
        <sp-theme
            system=${'spectrum'}
            lang=${locale}
            color="light"
            scale="medium"
        >
            <sp-date-time-picker
                ...=${spreadProps(props)}
            ></sp-date-time-picker>
        </sp-theme>
    `);
    const el = wrapped.querySelector('sp-date-time-picker') as DateTimePicker;
    await elementUpdated(el);
    return el;
}

/**
 * Returns an array of all editable segments in the DateTimePicker
 * with a `getByType` method to find a segment by type.
 * @param element - The DateTimePicker to get the segments from
 */
export function getEditableSegments(element: DateTimePicker): EditableSegments {
    const elements = Array.from(
        element.shadowRoot.querySelectorAll('.editable-segment')
    );

    Object.defineProperty(elements, 'getByType', {
        value: function (type: EditableSegmentType): HTMLElement {
            return this.find(
                (segment: HTMLElement) => segment.dataset.type === type
            );
        },
    });
    return elements as EditableSegments;
}

/**
 * Sends the specified key the given number of times.
 * @param key - The key to send
 * @param times - The number of times to send the key
 */
export function sendKeyMultipleTimes(
    key: string,
    times: number
): Promise<void[]> {
    return Promise.all(
        Array.from({ length: times }).map(() => sendKeys({ press: key }))
    );
}

/**
 * Opens the Calendar by focusing the Calendar button and pressing Enter.
 * @param element - The DateTimePicker with the Calendar to open
 */
export async function openCalendar(element: DateTimePicker): Promise<void> {
    const calendarButton = element.shadowRoot!.querySelector(
        'sp-picker-button'
    ) as HTMLElement;

    const opened = oneEvent(element, 'sp-opened');
    calendarButton.focus();
    await sendKeys({ press: 'Enter' });
    await opened;
}

/**
 * Simulates a date selection in the Calendar by dispatching a change event with the given date.
 * @param element - The DateTimePicker with the Calendar to dispatch the event on
 * @param date - The date to set the Calendar to
 */
export async function dispatchCalendarChange(
    element: DateTimePicker,
    date: DateValue
): Promise<void> {
    const calendarEl = element.shadowRoot!.querySelector(
        'sp-calendar'
    ) as Calendar;

    calendarEl.value = date;
    calendarEl.dispatchEvent(
        new CustomEvent('change', { bubbles: true, composed: true })
    );
    await elementUpdated(element);
}

/**
 * Computes the x and y coordinates of the center of the given element, rounded to the nearest integer.
 * @param element - The element to get the center of
 * @returns - The x and y coordinates of the center of the element
 */
export function getElementCenter(element: HTMLElement): [number, number] {
    const rect = element.getBoundingClientRect();
    return [
        Math.round(rect.left + rect.width / 2),
        Math.round(rect.top + rect.height / 2),
    ];
}

/**
 * Asserts that the given editable segments have only placeholders.
 * @param editableSegments - The segments to check
 * @param exceptions - Segments that are allowed to have content
 */
export function expectPlaceholders(
    editableSegments: EditableSegments,
    exceptions: HTMLElement[] = []
): void {
    for (const segment of editableSegments.filter(
        (segment) => !exceptions.includes(segment)
    ))
        expectPlaceholder(segment);
}

/**
 * Asserts that the given segment is a placeholder and does not have a value.
 * @param segment - The segment to check
 */
export function expectPlaceholder(segment: HTMLElement): void {
    expect(isPlaceholderSegment(segment)).to.be.true;
}

function isPlaceholderSegment(segment: HTMLElement): boolean {
    const type = segment.dataset.type as EditableSegmentType;
    const placeholder = SegmentPlaceholders[type];

    if (segment.innerText !== placeholder) return false;

    return true;
}

/**
 * Asserts that the given date values are the same day.
 * @param a - The first date value
 * @param b - The second date value
 * @param message - The message to display if the assertion fails
 */
export function expectSameDates(
    a: DateValue,
    b: DateValue,
    message?: string
): void {
    expect(isSameDay(a, b), message).to.be.true;
}

/**
 * Asserts that the given element is focused.
 * @param rootEl - The document or shadow root to check the active element of
 * @param focusedEl - The element that should be focused
 * @param message - The message to display if the assertion fails
 */
export function expectFocused(
    rootEl: Document | ShadowRoot,
    focusedEl: HTMLElement,
    message?: string
): void {
    expect(rootEl.activeElement === focusedEl, message).to.be.true;
}

export function isCalendarOpen(element: DateTimePicker): boolean {
    const calendar = element.shadowRoot.querySelector('sp-calendar');
    const calendarOverlay = calendar?.closest('sp-overlay') as Overlay;
    return calendarOverlay.open;
}
