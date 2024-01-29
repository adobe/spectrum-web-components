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

import {
    elementUpdated,
    expect,
    html,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';

import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/combobox/sp-combobox-item.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { fixture } from '../../../test/testing-helpers.js';
import { Combobox } from '..';
import { comboboxFixture, TestableCombobox } from './index.js';
import { SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { customElement } from '@spectrum-web-components/base/src/decorators.js';
import { MenuItem } from '@spectrum-web-components/menu';
import { fruits } from '../stories/index.js';

@customElement('combobox-slot-test-el')
export class TestEl extends SpectrumElement {
    protected override render(): TemplateResult {
        return html`
            <sp-combobox>
                <slot></slot>
            </sp-combobox>
        `;
    }
}

const options = fruits;

describe('Combobox Data', () => {
    afterEach(() => {
        const overlays = document.querySelectorAll('active-overlay');
        overlays.forEach((overlay) => overlay.remove());
    });
    it('accepts options as property', async () => {
        const el = await comboboxFixture();

        expect(el.options).to.deep.equal(options);
    });
    it('accepts options as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    <sp-menu-item id="pineapple">Pineapple</sp-menu-item>
                    <sp-menu-item id="yuzu">Yuzu</sp-menu-item>
                    <sp-menu-item id="kumquat">Kumquat</sp-menu-item>
                    <sp-menu-item id="lychee">Lychee</sp-menu-item>
                    <sp-menu-item id="durian">Durian</sp-menu-item>
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        const processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));
        expect(processedOptions).to.deep.equal([
            {
                id: 'pineapple',
                value: 'Pineapple',
            },
            {
                id: 'yuzu',
                value: 'Yuzu',
            },
            {
                id: 'kumquat',
                value: 'Kumquat',
            },
            {
                id: 'lychee',
                value: 'Lychee',
            },
            {
                id: 'durian',
                value: 'Durian',
            },
        ]);
    });
    it('accepts additional options as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const item = document.createElement('sp-menu-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        el.append(item);

        await elementUpdated(el);

        processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal([...options, newOption]);
    });
    it('accepts updated value as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.textContent = newOption.value;

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].value = newOption.value;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(newOptions);
    });
    it('accepts updated id as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.id = newOption.id;

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].id = newOption.id;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(newOptions);
    });
    it('accepts replacement options as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.remove();
        const item = document.createElement('sp-menu-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        el.insertAdjacentElement('afterbegin', item);

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].id = newOption.id;
        newOptions[0].value = newOption.value;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);
    });
    it('accepts options through slots', async () => {
        const test = await fixture<TestableCombobox>(
            html`
                <combobox-slot-test-el>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </combobox-slot-test-el>
            `
        );
        const el = test.shadowRoot.querySelector('sp-combobox') as Combobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return !!el.optionEls?.length;
        });

        const processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);
    });
    it('accepts adding through slots', async function () {
        const test = await fixture<TestableCombobox>(
            html`
                <combobox-slot-test-el>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-menu-item id=${option.id}>
                                ${option.value}
                            </sp-menu-item>
                        `;
                    })}
                </combobox-slot-test-el>
            `
        );
        const el = test.shadowRoot.querySelector('sp-combobox') as Combobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return !!el.optionEls?.length;
        });

        let processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const item = document.createElement('sp-menu-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        test.append(item);

        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return el.availableOptions?.length === 13;
        });

        processedOptions = el.availableOptions.map(({ id, value }) => ({
            id,
            value,
        }));
        expect(processedOptions).to.deep.equal([...options, newOption]);
    });
});
