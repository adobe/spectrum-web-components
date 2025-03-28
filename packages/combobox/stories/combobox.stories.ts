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
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { Combobox, ComboboxOption } from '../src/Combobox.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
import { query, state } from '@spectrum-web-components/base/src/decorators.js';
import { live } from '@spectrum-web-components/base/src/directives.js';
import { countries, fruits, Properties } from './index.js';
import { Template } from './template.js';
import { argTypes } from './args.js';

export default {
    title: 'Combobox',
    component: 'sp-combobox',
    args: {
        open: false,
        disabled: false,
        invalid: false,
        pending: false,
        readonly: false,
        quiet: false,
    },
    argTypes,
};

export const Default = {
    render: (args: Properties): TemplateResult => Template(args),
};

export const disabled = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        disabled: true,
        value: 'Azerbaijan',
    },
};

export const invalid = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        invalid: true,
    },
};

export const pending = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        pending: true,
    },
};

export const quiet = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        quiet: true,
    },
};

export const readonly = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        readonly: true,
        value: 'Solomon Islands',
    },
};

export const hasDisabledItems = {
    render: (args: Properties): TemplateResult => {
        // let's create a new array from countries and set the disabled property to true if the value is in args.disabledItems
        const countriesWithDisabledItems = countries.map((country) => ({
            ...country,
            disabled: args.disabledItems?.includes(country.itemText),
        }));

        return html`
            <sp-field-label side-aligned="start" for="combobox-disabled-items">
                Some fruits are disabled (light DOM)
            </sp-field-label>
            <sp-combobox
                id="combobox-disabled-items"
                style="min-width: 80px;--spectrum-textfield-m-min-width:0; width:160px;"
            >
                ${fruits.map(
                    (fruit) => html`
                        <sp-menu-item
                            id=${fruit.value}
                            value=${fruit.value}
                            ?disabled=${args.disabledItems?.includes(
                                fruit.value
                            )}
                        >
                            ${fruit.itemText}
                        </sp-menu-item>
                    `
                )}
            </sp-combobox>
            <sp-field-label
                side-aligned="start"
                for="combobox-disabled-countries"
            >
                Some countries are disabled (shadow DOM)
            </sp-field-label>
            <sp-combobox
                id="combobox-disabled-countries"
                .options=${countriesWithDisabledItems}
                .value=${args.value || ''}
            ></sp-combobox>
        `;
    },

    args: {
        disabledItems: [
            'banana',
            'lemon',
            'pear',
            'Albania',
            'Azerbaijan',
            'Solomon Islands',
        ],
    },

    swc_vrt: {
        skip: true,
    },
};

export const listAutocomplete = {
    render: (args: Properties): TemplateResult => Template(args),

    args: {
        autocomplete: 'list',
    },
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

export const controlled = {
    render: (): TemplateResult => {
        return html`
            <controlled-combo></controlled-combo>
        `;
    },

    swc_vrt: {
        skip: true,
    },

    parameters: {
        // Disables Chromatic's snapshotting on a global level
        chromatic: { disableSnapshot: true },
    },
};
