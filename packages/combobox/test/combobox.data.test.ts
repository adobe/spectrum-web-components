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
    fixture,
    html,
    nextFrame,
    waitUntil,
} from '@open-wc/testing';

import '../sp-combobox.js';
import '../sp-combobox-item.js';
import { Combobox, ComboboxItem, ComboboxOption } from '..';
import { TestableCombobox } from './combobox.test.js';
import { SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { customElement } from '@spectrum-web-components/base/src/decorators.js';

const options: ComboboxOption[] = [
    { id: 'thing1', value: 'Abc Thing 1' },
    { id: 'thing1a', value: 'Bde Thing 2' },
    { id: 'thing1b', value: 'Bef Thing 3' },
    { id: 'thing4', value: 'Efg Thing 4' },
];

const comboboxFixture = async (): Promise<TestableCombobox> => {
    const el = await fixture<TestableCombobox>(
        html`
            <sp-combobox .options=${options}>Combobox Test</sp-combobox>
        `
    );
    await elementUpdated(el);

    return el;
};

@customElement('combobox-slot-test-el')
export class TestEl extends SpectrumElement {
    protected override render(): TemplateResult {
        return html`
            <sp-combobox>
                <slot></slot>
                <slot slot="option" name="option"></slot>
            </sp-combobox>
        `;
    }
}

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
                    <sp-combobox-item id="pineapple">
                        Pineapple
                    </sp-combobox-item>
                    <sp-combobox-item id="yuzu">Yuzu</sp-combobox-item>
                    <sp-combobox-item id="kumquat">Kumquat</sp-combobox-item>
                    <sp-combobox-item id="lychee">Lychee</sp-combobox-item>
                    <sp-combobox-item id="durian">Durian</sp-combobox-item>
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        expect(el.options).to.deep.equal([
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
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        expect(el.options).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const item = document.createElement('sp-combobox-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        el.append(item);

        await elementUpdated(el);
        await nextFrame();

        expect(el.options).to.deep.equal([...options, newOption]);
    });
    it('accepts updated value as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        expect(el.options).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-combobox-item:first-of-type'
        ) as ComboboxItem;
        option1.textContent = newOption.value;

        await elementUpdated(el);
        await nextFrame();

        const newOptions = options.slice();
        newOptions[0].value = newOption.value;

        expect(el.options).to.deep.equal(newOptions);
    });
    it('accepts updated id as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        expect(el.options).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-combobox-item:first-of-type'
        ) as ComboboxItem;
        option1.id = newOption.id;

        await elementUpdated(el);
        await nextFrame();

        const newOptions = options.slice();
        newOptions[0].id = newOption.id;

        expect(el.options).to.deep.equal(newOptions);
    });
    it('accepts replacement options as html', async () => {
        const el = await fixture<TestableCombobox>(
            html`
                <sp-combobox>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </sp-combobox>
            `
        );
        await elementUpdated(el);

        expect(el.options).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const option1 = el.querySelector(
            'sp-combobox-item:first-of-type'
        ) as ComboboxItem;
        option1.remove();
        const item = document.createElement('sp-combobox-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        el.insertAdjacentElement('afterbegin', item);

        await elementUpdated(el);
        await nextFrame();

        const newOptions = options.slice();
        newOptions[0].id = newOption.id;
        newOptions[0].value = newOption.value;

        expect(el.options).to.deep.equal(newOptions);
    });
    it('accepts options through slots', async () => {
        const test = await fixture<TestableCombobox>(
            html`
                <combobox-slot-test-el>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </combobox-slot-test-el>
            `
        );
        const el = test.shadowRoot.querySelector('sp-combobox') as Combobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => !!el.options.length);

        expect(el.options).to.deep.equal(options);
    });
    it('accepts adding through slots', async () => {
        const test = await fixture<TestableCombobox>(
            html`
                <combobox-slot-test-el>
                    Combobox Test
                    ${options.map((option) => {
                        return html`
                            <sp-combobox-item id=${option.id}>
                                ${option.value}
                            </sp-combobox-item>
                        `;
                    })}
                </combobox-slot-test-el>
            `
        );
        const el = test.shadowRoot.querySelector('sp-combobox') as Combobox;
        await elementUpdated(test);
        await elementUpdated(el);

        await waitUntil(() => !!el.options.length);

        expect(el.options).to.deep.equal(options);

        const newOption = {
            id: 'another-option',
            value: 'Another Option',
        };

        const item = document.createElement('sp-combobox-item');
        item.id = newOption.id;
        item.textContent = newOption.value;
        test.append(item);

        await elementUpdated(test);
        await elementUpdated(el);

        expect(el.options).to.deep.equal([...options, newOption]);
    });
});
