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
import { action } from '@open-wc/demoing-storybook';

import '../sp-picker.js';
import { Picker } from '../';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { states } from './states.js';

export default {
    title: 'Picker',
    component: 'sp-picker',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-picker
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                action(`Change: ${picker.value}`)();
            }}"
            label="Select a Country with a very long label, too long, in fact"
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

export const quiet = (): TemplateResult => {
    return html`
        <sp-picker
            quiet
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                action(`Change: ${picker.value}`)();
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

export const Open = (): TemplateResult => {
    return html`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
        </style>
        <fieldset>
            <sp-picker
                label="Open picker"
                open
                @change="${(event: Event): void => {
                    const picker = event.target as Picker;
                    action(`Change: ${picker.value}`)();
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
            <sp-picker
                label="Picker that displays below the options"
                @change="${(event: Event): void => {
                    const picker = event.target as Picker;
                    action(`Change: ${picker.value}`)();
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

export const initialValue = (): TemplateResult => {
    return html`
        <sp-picker
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                action(`Change: ${picker.value}`)();
            }}"
            value="item-2"
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

export const custom = (): TemplateResult => {
    return html`
        <sp-picker
            style="width: 400px;"
            @change="${(event: Event): void => {
                const picker = event.target as Picker;
                action(`Change: ${picker.value}`)();
            }}"
            label="Pick a state"
        >
            <sp-menu style="max-height: 400px;">
                ${states.map(
                    (state) => html`
                        <sp-menu-item id=${state.id} value=${state.id}>
                            ${state.label}
                        </sp-menu-item>
                    `
                )}
            </sp-menu>
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
