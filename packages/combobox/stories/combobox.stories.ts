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

import { html, TemplateResult } from '@spectrum-web-components/base';

import { ComboboxOption } from '..';
import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/combobox/sp-combobox-item.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

export default {
    title: 'Combobox',
    component: 'sp-combobox',
};

export const Default = (): TemplateResult => {
    const options: ComboboxOption[] = [
        { id: 'thing1', value: 'Abc Thing 1' },
        { id: 'thing1a', value: 'Bde Thing 2' },
        { id: 'thing1b', value: 'Bef Thing 3' },
        { id: 'thing4', value: 'Efg Thing 4' },
        { id: 'athing1', value: 'Abc Thing 1' },
        { id: 'athing1a', value: 'Bde Thing 2' },
        { id: 'athing1b', value: 'Bef Thing 3' },
        { id: 'athing4', value: 'Efg Thing 4' },
    ];
    return html`
        <sp-field-label for="combobox-1" style="margin-block-start: 100vh;">
            Things
        </sp-field-label>
        <sp-combobox
            id="combobox-1"
            .options=${options}
            style="margin-block-end: 100vh;"
        ></sp-combobox>
    `;
};

export const matches = (): TemplateResult => {
    const options: ComboboxOption[] = [
        { id: 'o1', value: 'Aaaaaaaaaaaaa' },
        { id: 'o2', value: 'Abaaaaaaaaaaa' },
        { id: 'o3', value: 'Abcaaaaaaaaaa' },
        { id: 'o4', value: 'Abcdaaaaaaaaa' },
        { id: 'o5', value: 'Abcdeaaaaaaaa' },
        { id: 'o6', value: 'Abcdefaaaaaaa' },
        { id: 'o7', value: 'Abcdefgaaaaaa' },
        { id: 'o8', value: 'Abcdefghaaaaa' },
        { id: 'o9', value: 'Abcdefghiaaaa' },
        { id: 'o10', value: 'Abcdefghijaaa' },
        { id: 'o11', value: 'Abcdefghijkaa' },
        { id: 'o12', value: 'Abcdefghijkla' },
        { id: 'o13', value: 'Abcdefghijklm' },
    ];
    return html`
        <sp-field-label for="combobox-2">Things</sp-field-label>
        <sp-combobox
            id="combobox-2"
            .options=${options}
            autocomplete="list"
        ></sp-combobox>
    `;
};

const optionsK: ComboboxOption[] = [
    { id: 'o1', value: 'Auto' },
    { id: 'o2', value: '-100' },
    { id: 'o3', value: '-75' },
    { id: 'o4', value: '-50' },
    { id: 'o5', value: '-25' },
    { id: 'o6', value: '-10' },
    { id: 'o7', value: '-5' },
    { id: 'o8', value: '0' },
    { id: 'o9', value: '5' },
    { id: 'o10', value: '10' },
    { id: 'o11', value: '25' },
    { id: 'o12', value: '50' },
    { id: 'o13', value: '75' },
    { id: 'o14', value: '100' },
    { id: 'o15', value: '200' },
];

const optionsL: ComboboxOption[] = [
    { id: 'o1', value: 'Auto' },
    { id: 'o2', value: '6 pt' },
    { id: 'o3', value: '8 pt' },
    { id: 'o4', value: '9 pt' },
    { id: 'o5', value: '10 pt' },
    { id: 'o6', value: '11 pt' },
    { id: 'o7', value: '12 pt' },
    { id: 'o8', value: '14 pt' },
    { id: 'o9', value: '16 pt' },
    { id: 'o10', value: '18 pt' },
    { id: 'o11', value: '24 pt' },
    { id: 'o12', value: '30 pt' },
    { id: 'o13', value: '36 pt' },
    { id: 'o14', value: '48 pt' },
    { id: 'o15', value: '60 pt' },
    { id: 'o16', value: '72 pt' },
];

export const kerning = (): TemplateResult => {
    return html`
        <sp-field-label side-aligned="start" for="combobox-3">K</sp-field-label>
        <sp-combobox
            id="combobox-3"
            .options=${optionsK}
            .autocomplete=${'none'}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-4">L</sp-field-label>
        <sp-combobox
            id="combobox-4"
            .options=${optionsL}
            .autocomplete=${'none'}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
            label-position="inline-start"
        ></sp-combobox>
    `;
};

export const kerningLightDOM = (): TemplateResult => {
    return html`
        <sp-field-label side-aligned="start" for="combobox-5">K</sp-field-label>
        <sp-combobox
            .autocomplete=${'none'}
            id="combobox-5"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${optionsK.map(
                (option) => html`
                    <sp-menu-item id=${option.id} value=${option.value}>
                        ${option.value}
                    </sp-menu-item>
                `
            )}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-6">K</sp-field-label>
        <sp-combobox
            .autocomplete=${'none'}
            id="combobox-6"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${optionsL.map(
                (option) => html`
                    <sp-menu-item id=${option.id} value=${option.value}>
                        ${option.value}
                    </sp-menu-item>
                `
            )}
        </sp-combobox>
    `;
};

export const withTooltip = (): TemplateResult => {
    return html`
        <sp-combobox
            .autocomplete=${'none'}
            id="combobox-6"
            label="Kerning"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${optionsL.map(
                (option) => html`
                    <sp-menu-item id=${option.id} value=${option.value}>
                        ${option.value}
                    </sp-menu-item>
                `
            )}
            <sp-tooltip slot="tooltip" self-managed placement="right" open>
                Kerning
            </sp-tooltip>
        </sp-combobox>
    `;
};
