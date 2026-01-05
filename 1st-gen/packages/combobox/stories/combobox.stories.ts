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
import { countries, fruits, StoryArgs } from './index.js';
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

export const Default = (args: StoryArgs): TemplateResult => Template(args);

export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
    value: 'Azerbaijan',
};

export const invalid = (args: StoryArgs): TemplateResult => Template(args);
invalid.args = {
    invalid: true,
};

export const pending = (args: StoryArgs): TemplateResult => Template(args);
pending.args = {
    pending: true,
};

export const quiet = (args: StoryArgs): TemplateResult => Template(args);
quiet.args = {
    quiet: true,
};

export const readonly = (args: StoryArgs): TemplateResult => Template(args);
readonly.args = {
    readonly: true,
    value: 'Solomon Islands',
};

export const hasDisabledItems = (args: StoryArgs): TemplateResult => {
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
                        ?disabled=${args.disabledItems?.includes(fruit.value)}
                    >
                        ${fruit.itemText}
                    </sp-menu-item>
                `
            )}
        </sp-combobox>
        <sp-field-label side-aligned="start" for="combobox-disabled-countries">
            Some countries are disabled (shadow DOM)
        </sp-field-label>
        <sp-combobox
            id="combobox-disabled-countries"
            .options=${countriesWithDisabledItems}
            .value=${args.value || ''}
        ></sp-combobox>
    `;
};
hasDisabledItems.args = {
    disabledItems: [
        'banana',
        'lemon',
        'pear',
        'Albania',
        'Azerbaijan',
        'Solomon Islands',
    ],
};
hasDisabledItems.swc_vrt = {
    skip: true,
};

export const listAutocomplete = (args: StoryArgs): TemplateResult =>
    Template(args);
listAutocomplete.args = {
    autocomplete: 'list',
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

controlled.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

/**
 * Test story to verify change event includes both value and itemText,
 * especially for options with duplicate itemText values.
 */
export const duplicateItemText = (): TemplateResult => {
    const optionsWithDuplicates: ComboboxOption[] = [
        { value: 'val1', itemText: 'Same Display Text' },
        { value: 'val2', itemText: 'Same Display Text' },
        { value: 'val3', itemText: 'Unique Text' },
    ];

    const handleChange = (event: CustomEvent): void => {
        const { value, itemText } = event.detail;

        // Update the output display
        const output = document.getElementById('change-event-output');
        if (output) {
            output.textContent = `value: "${value}", itemText: "${itemText}"`;
        }
    };

    return html`
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <sp-field-label for="combobox-duplicate-test">
                Options with duplicate itemText
            </sp-field-label>
            <sp-combobox
                id="combobox-duplicate-test"
                .options=${optionsWithDuplicates}
                @change=${handleChange}
                style="width: 200px;"
            ></sp-combobox>
            <div>
                <strong>Last change event:</strong>
                <code id="change-event-output">None yet</code>
            </div>
            <p style="color: gray; font-size: 12px;">
                Select "Same Display Text" multiple times from the dropdown.
                Each selection should show a different value (val1 or val2).
            </p>
        </div>
    `;
};
duplicateItemText.swc_vrt = {
    skip: true,
};
