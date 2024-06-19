/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect, fixture } from '@open-wc/testing';
import { html } from '@open-wc/testing';
import { ComboboxOption } from '@spectrum-web-components/combobox';
import '@spectrum-web-components/combobox/sp-combobox.js';
import { MenuItem } from '@spectrum-web-components/menu';
import { fruits } from '../stories/index.js';

export type TestableCombobox = HTMLElement & {
    activeDescendant: ComboboxOption;
    autocomplete: 'none' | 'list';
    availableOptions: ComboboxOption[];
    focused: boolean;
    focusElement: HTMLInputElement;
    open: boolean;
    optionEls: MenuItem[];
    options: ComboboxOption[];
    shadowRoot: ShadowRoot;
    value: string;
    pending: boolean;
};

export type AccessibleNamedNode = {
    description: string;
    name: string;
    role: string;
    value?: string;
};

export const comboboxFixture = async (): Promise<TestableCombobox> => {
    const el = await fixture<TestableCombobox>(html`
        <sp-combobox
            .autocomplete=${'list'}
            label="Combobox"
            .options=${fruits}
        >
            Combobox
        </sp-combobox>
    `);

    return el;
};

export const testActiveElement = (
    el: TestableCombobox,
    testId: string
): void => {
    expect(el.activeDescendant?.value).to.equal(testId);
    const activeElement = el.shadowRoot.querySelector(
        `#${el.activeDescendant.value}`
    ) as HTMLElement;
    expect(activeElement.getAttribute('aria-selected')).to.equal('true');
};

export const isWebKit =
    /AppleWebKit/.test(window.navigator.userAgent) &&
    !/Chrome/.test(window.navigator.userAgent);
