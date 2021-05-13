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

import '../sp-picker.js';
import { Picker } from '../';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import { states } from './states.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { spreadProps } from '@open-wc/lit-helpers';

export default {
    title: 'Picker',
    component: 'sp-picker',
    args: {
        disabled: false,
        invalid: false,
        open: false,
        quiet: false,
    },
    argTypes: {
        disabled: {
            name: 'disabled',
            type: { name: 'boolean', required: false },
            description:
                'Disable this control. It will not receive focus or events.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        invalid: {
            name: 'invalid',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the menu is open or not.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: 'boolean',
        },
        quiet: {
            name: 'quiet',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

interface StoryArgs {
    disabled?: boolean;
    invalid?: boolean;
    open?: boolean;
    quiet?: boolean;
}

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-1">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-1"
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                console.log(`Change: ${picker.value}`);
            }}"
            label="Select a Country with a very long label, too long, in fact"
            ...=${spreadProps(args)}
        >
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};

export const quiet = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet">Where do you live?</sp-field-label>
        <sp-picker
            ...=${spreadProps(args)}
            id="picker-quiet"
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                console.log(`Change: ${picker.value}`);
            }}"
            label="Pick an item"
        >
            <sp-menu-item value="1">Item 1</sp-menu-item>
            <sp-menu-item value="2">Item 2</sp-menu-item>
            <sp-menu-item value="3">Item 3</sp-menu-item>
            <sp-menu-item value="4">Item 4</sp-menu-item>
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};
quiet.args = {
    quiet: true,
};

export const Open = (args: StoryArgs): TemplateResult => {
    return html`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
        </style>
        <fieldset>
            <sp-field-label for="picker-open">
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-open"
                label="Open picker"
                ...=${spreadProps(args)}
                @change="${(event: Event): void => {
                    const picker = event.target as Picker;
                    console.log(`Change: ${picker.value}`);
                }}"
            >
                <span slot="label">
                    Select a Country with a very long label, too long, in fact
                </span>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Save Selection</sp-menu-item>
                <sp-menu-item disabled>Make Work Path</sp-menu-item>
            </sp-picker>
        </fieldset>
        <fieldset>
            <sp-field-label for="picker-closed">
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-closed"
                label="Picker that displays below the options"
                @change="${(event: Event): void => {
                    const picker = event.target as Picker;
                    console.log(`Change: ${picker.value}`);
                }}"
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu-item>Not so many options...</sp-menu-item>
            </sp-picker>
        </fieldset>
    `;
};
Open.args = {
    open: true,
};

export const initialValue = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-initial">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-initial"
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                console.log(`Change: ${picker.value}`);
            }}"
            value="item-2"
            ...=${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};

export const readonly = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-picker
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                console.log(`Change: ${picker.value}`);
            }}"
            readonly
            value="item-2"
            ...=${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};

export const custom = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-state">
            What state do you live in?
        </sp-field-label>
        <sp-picker
            style="width: 400px;"
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                console.log(`Change: ${picker.value}`);
            }}"
            id="picker-state"
            label="Pick a state"
            ...=${spreadProps(args)}
        >
            ${states.map(
                (state) => html`
                    <sp-menu-item id=${state.id} value=${state.id}>
                        ${state.label}
                    </sp-menu-item>
                `
            )}
        </sp-picker>
        <p>This is some text.</p>
        <p>This is some text.</p>
        <p>
            This is a
            <a href="#anchor">link</a>
            .
        </p>
    `;
};

custom.args = {
    open: true,
};
