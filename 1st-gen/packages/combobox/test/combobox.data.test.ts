/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
    waitUntil,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { fixture } from '../../../test/testing-helpers.js';
import { comboboxFixture, TestableCombobox } from './helpers.js';
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
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                <sp-menu-item value="pineapple">Pineapple</sp-menu-item>
                <sp-menu-item value="yuzu">Yuzu</sp-menu-item>
                <sp-menu-item value="kumquat">Kumquat</sp-menu-item>
                <sp-menu-item value="lychee">Lychee</sp-menu-item>
                <sp-menu-item value="durian">Durian</sp-menu-item>
            </sp-combobox>
        `);
        await elementUpdated(el);

        const processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );
        expect(processedOptions).to.deep.equal([
            {
                value: 'pineapple',
                itemText: 'Pineapple',
            },
            {
                value: 'yuzu',
                itemText: 'Yuzu',
            },
            {
                value: 'kumquat',
                itemText: 'Kumquat',
            },
            {
                value: 'lychee',
                itemText: 'Lychee',
            },
            {
                value: 'durian',
                itemText: 'Durian',
            },
        ]);
    });
    it('accepts additional options as html', async () => {
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </sp-combobox>
        `);
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            value: 'another-option',
            itemText: 'Another Option',
        };

        const item = document.createElement('sp-menu-item');
        item.value = newOption.value;
        item.textContent = newOption.itemText;
        el.append(item);

        await elementUpdated(el);

        processedOptions = el.availableOptions.map(({ value, itemText }) => ({
            value,
            itemText,
        }));

        expect(processedOptions).to.deep.equal([...options, newOption]);
    });
    it('accepts updated value as html', async () => {
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </sp-combobox>
        `);
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            value: 'another-option',
            itemText: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.textContent = newOption.itemText;

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].value = newOption.value;
        newOptions[0].itemText = newOption.itemText;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ value, itemText }) => ({
            value,
            itemText,
        }));

        expect(processedOptions).to.deep.equal(newOptions);
    });
    it('accepts updated id as html', async () => {
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </sp-combobox>
        `);
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            value: 'another-option',
            itemText: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.value = newOption.value;

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].value = newOption.value;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ value, itemText }) => ({
            value,
            itemText,
        }));

        expect(processedOptions).to.deep.equal(newOptions);
    });
    it('accepts replacement options as html', async () => {
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </sp-combobox>
        `);
        await elementUpdated(el);

        let processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            value: 'another-option',
            itemText: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-menu-item:first-of-type'
        ) as MenuItem;
        option1.remove();
        const item = document.createElement('sp-menu-item');
        item.value = newOption.value;
        item.textContent = newOption.itemText;
        el.insertAdjacentElement('afterbegin', item);

        await elementUpdated(el);

        const newOptions = options.slice();
        newOptions[0].value = newOption.value;
        newOptions[0].itemText = newOption.itemText;

        await nextFrame();
        await nextFrame();

        processedOptions = el.availableOptions.map(({ value, itemText }) => ({
            value,
            itemText,
        }));

        expect(processedOptions).to.deep.equal(options);
    });
    it('accepts options through slots', async () => {
        const test = await fixture<SpectrumElement>(html`
            <combobox-slot-test-el>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </combobox-slot-test-el>
        `);
        const el = test.shadowRoot.querySelector(
            'sp-combobox'
        ) as unknown as TestableCombobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return !!el.optionEls?.length;
        });

        const processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);
    });
    it('accepts adding through slots', async function () {
        const test = await fixture<SpectrumElement>(html`
            <combobox-slot-test-el>
                Combobox Test
                ${options.map((option) => {
                    return html`
                        <sp-menu-item value=${option.value}>
                            ${option.itemText}
                        </sp-menu-item>
                    `;
                })}
            </combobox-slot-test-el>
        `);
        const el = test.shadowRoot.querySelector(
            'sp-combobox'
        ) as unknown as TestableCombobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return !!el.optionEls?.length;
        });

        let processedOptions = el.availableOptions.map(
            ({ value, itemText }) => ({
                value,
                itemText,
            })
        );

        expect(processedOptions).to.deep.equal(options);

        const newOption = {
            value: 'another-option',
            itemText: 'Another Option',
        };

        const item = document.createElement('sp-menu-item');
        item.value = newOption.value;
        item.textContent = newOption.itemText;
        test.append(item);

        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => {
            return el.availableOptions?.length === 13;
        });

        processedOptions = el.availableOptions.map(({ value, itemText }) => ({
            value,
            itemText,
        }));
        expect(processedOptions).to.deep.equal([...options, newOption]);
    });
    it('accepts numeric values as html', async () => {
        const el = await fixture<TestableCombobox>(html`
            <sp-combobox>
                Combobox Test
                <sp-menu-item value="1">Mambo no. 1</sp-menu-item>
                <sp-menu-item value="2">Mambo no. 2</sp-menu-item>
                <sp-menu-item value="3">Mambo no. 3</sp-menu-item>
                <sp-menu-item value="4">Mambo no. 4</sp-menu-item>
                <sp-menu-item value="5">Mambo no. 5</sp-menu-item>
            </sp-combobox>
        `);
        await elementUpdated(el);

        expect(el.activeDescendant).to.be.undefined;

        el.focus();
        await elementUpdated(el);

        await sendKeys({ press: 'ArrowDown' });
        await elementUpdated(el);

        expect(el.activeDescendant).to.not.be.undefined;
        expect(el.activeDescendant.value).to.equal('1');

        const activeDescendant = el.shadowRoot.getElementById('#1') as MenuItem;

        await elementUpdated(activeDescendant);
        await nextFrame();
        await nextFrame();

        const change = oneEvent(el, 'change');
        await sendKeys({ press: 'Enter' });

        await change;
        expect(el.open).to.be.false;
        expect(el.activeDescendant).to.be.undefined;
        expect(el.value).to.equal('Mambo no. 1');
    });
});
