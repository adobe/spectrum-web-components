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
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import {
    DateTimePicker,
    EditableSegmentType,
    SegmentPlaceholders,
} from '@spectrum-web-components/date-time-picker';
import '@spectrum-web-components/date-time-picker/sp-date-time-picker.js';
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
        <sp-theme lang=${locale} color="light" scale="medium">
            <sp-date-time-picker
                ...=${spreadProps(props)}
            ></sp-date-time-picker>
        </sp-theme>
    `);
    const el = wrapped.querySelector('sp-date-time-picker') as DateTimePicker;
    await elementUpdated(el);
    return el;
}

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

export function expectPlaceholders(
    editableSegments: EditableSegments,
    exceptions: HTMLElement[] = []
): void {
    for (const segment of editableSegments.filter(
        (segment) => !exceptions.includes(segment)
    ))
        expectPlaceholder(segment);
}

export function expectPlaceholder(segment: HTMLElement): void {
    expect(isPlaceholderSegment(segment)).to.be.true;
}

function isPlaceholderSegment(segment: HTMLElement): boolean {
    const type = segment.dataset.type as EditableSegmentType;
    const placeholder = SegmentPlaceholders[type];

    if (segment.innerText !== placeholder) return false;

    return true;
}

export function sendKeyMultipleTimes(
    key: string,
    times: number
): Promise<void[]> {
    return Promise.all(
        Array.from({ length: times }).map(() => sendKeys({ press: key }))
    );
}
