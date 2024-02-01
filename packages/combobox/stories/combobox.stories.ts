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
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import { countries, fruits } from './index.js';
import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Combobox, ComboboxOption } from '../src/Combobox.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
import { query, state } from '@spectrum-web-components/base/src/decorators.js';
import { live } from '@spectrum-web-components/base/src/directives.js';

export default {
    title: 'Combobox',
    component: 'sp-combobox',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-field-label for="combobox-1">Where do you live?</sp-field-label>
        <sp-combobox id="combobox-1" .options=${countries}></sp-combobox>
    `;
};

export const disabled = (): TemplateResult => {
    return html`
        <sp-field-label for="combobox-disabled">
            Where do you live?
        </sp-field-label>
        <sp-combobox
            disabled
            id="combobox-disabled"
            .options=${countries}
            value="Azerbaijan"
        ></sp-combobox>
    `;
};

export const readonly = (): TemplateResult => {
    return html`
        <sp-field-label for="combobox-readonly">
            Where do you live?
        </sp-field-label>
        <sp-combobox
            readonly
            id="combobox-readonly"
            .options=${countries}
            value="Solomon Islands"
        ></sp-combobox>
    `;
};

export const listAutocomplete = (): TemplateResult => {
    return html`
        <sp-field-label for="combobox-2">Where do you live?</sp-field-label>
        <sp-combobox
            id="combobox-2"
            .options=${countries}
            autocomplete="list"
        ></sp-combobox>
    `;
};

export const noAutocomplete = (): TemplateResult => {
    return html`
        <sp-field-label side-aligned="start" for="combobox-3">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-3"
            .options=${fruits}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-4">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-4"
            .options=${countries}
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        ></sp-combobox>
    `;
};

export const lightDOM = (): TemplateResult => {
    return html`
        <sp-field-label side-aligned="start" for="combobox-5">
            Fruit
        </sp-field-label>
        <sp-combobox
            id="combobox-5"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${fruits.map(
                (fruit) => html`
                    <sp-menu-item id=${fruit.value} value=${fruit.value}>
                        ${fruit.itemText}
                    </sp-menu-item>
                `
            )}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-6">
            Countries
        </sp-field-label>
        <sp-combobox
            id="combobox-6"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${countries.map(
                (country) => html`
                    <sp-menu-item id=${country.value} value=${country.value}>
                        ${country.itemText}
                    </sp-menu-item>
                `
            )}
        </sp-combobox>
    `;
};

export const withTooltip = (): TemplateResult => {
    return html`
        <sp-combobox
            id="combobox-6"
            label="Combobox with tooltip"
            style="min-width: 80px;--spectrum-textfield-m-min-width:0;width:100px;"
        >
            ${countries.map(
                (option) => html`
                    <sp-menu-item id=${option.value} value=${option.value}>
                        ${option.itemText}
                    </sp-menu-item>
                `
            )}
            <sp-tooltip slot="tooltip" self-managed placement="right" open>
                This combobox has a tooltip.
            </sp-tooltip>
        </sp-combobox>
    `;
};

export const withFieldLabel = (): TemplateResult => {
    return html`
        <sp-field-label for="combobox-7">Pick something</sp-field-label>
        <sp-combobox id="combobox-7" .options=${fruits}></sp-combobox>
    `;
};

export const withLabelAttribute = (): TemplateResult => {
    return html`
        <sp-combobox
            id="combobox-7"
            label="Pick something"
            .options=${fruits}
        ></sp-combobox>
    `;
};

export const withHelpText = (): TemplateResult => {
    return html`
        <sp-combobox id="combobox-7" label="Pick something" .options=${fruits}>
            <sp-help-text slot="help-text">
                These are fruits found in the game "Animal Crossing: New Leaf".
            </sp-help-text>
        </sp-combobox>
    `;
};

class ControlledCombo extends LitElement {
    static ages: ComboboxOption[] = Array.from({ length: 76 - 55 }, (_, n) => {
        const age = `${n + 55}`;
        return { value: age, itemText: age };
    });

    @state()
    private value = {
        raw: '',
        validated: `${ControlledCombo.ages[0].itemText}`,
    };

    @query('#age')
    private combobox!: Combobox;

    override render(): TemplateResult {
        return html`
            <sp-field-label for="age">
                Retirement age (try entering a non-number)
            </sp-field-label>
            <sp-combobox
                id="age"
                .options=${ControlledCombo.ages}
                .value=${live(this.value.validated)}
                @change=${this.onChange}
            ></sp-combobox>
        `;
    }

    private onChange(): void {
        this.value = {
            raw: this.combobox.value,
            validated: this.combobox.value.replace(/\D/g, '') || '55',
        };
    }
}
defineElement('controlled-combo', ControlledCombo);

export const controlled = (): TemplateResult => {
    return html`
        <controlled-combo></controlled-combo>
    `;
};
controlled.swc_vrt = {
    skip: true,
};
