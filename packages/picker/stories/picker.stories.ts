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

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import { states } from './states.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { spreadProps } from '../../../test/lit-helpers.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';
import '../../overlay/stories/index.js';
import { handleChange, StoryArgs, Template } from './template.js';
import { argTypes } from './args.js';

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
        onChange: { action: 'change' },
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
        ...argTypes,
    },
};

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-1">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${handleChange(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${spreadProps(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
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

export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
    disabled: true,
};

export const tooltip = (args: StoryArgs): TemplateResult => {
    const { open, ...rest } = args;
    return html`
        <sp-field-label for="picker-1">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-1"
            @change=${handleChange(args)}
            label="Select a Country with a very long label, too long, in fact"
            ${spreadProps(rest)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
            <sp-tooltip
                slot="tooltip"
                ?open=${open}
                self-managed
                placement="right"
            >
                This Picker wants to know where you live.
            </sp-tooltip>
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
tooltip.args = {
    open: true,
};
tooltip.decorators = [isOverlayOpen];

export const noVisibleLabel = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-picker
            @change=${handleChange(args)}
            label="Where do you live?"
            ${spreadProps(args)}
        >
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
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

export const slottedLabel = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-picker @change=${handleChange(args)} ${spreadProps(args)}>
            <span slot="label">Where do you live?</span>
            <sp-menu-item value="option-1">Deselect</sp-menu-item>
            <sp-menu-item value="option-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="option-3">Feather...</sp-menu-item>
            <sp-menu-item value="option-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="option-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="option-6">
                Make Work Path
            </sp-menu-item>
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
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
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

export const icons = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            value="1"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};

export const iconsNone = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            value="1"
            icons="none"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};
iconsNone.args = {
    open: true,
};
iconsNone.decorators = [isOverlayOpen];

export const iconValue = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            icons="only"
            style="--spectrum-picker-width: 100px"
            value="2"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon"></sp-icon-edit>
                Edit
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon"></sp-icon-copy>
                Copy
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon"></sp-icon-delete>
                Delete
            </sp-menu-item>
        </sp-picker>
    `;
};

export const iconsOnly = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-quiet">
            Choose an action type...
        </sp-field-label>
        <sp-picker
            ${spreadProps(args)}
            id="picker-quiet"
            @change=${handleChange(args)}
            label="Pick an action"
            style="--spectrum-picker-width: 100px"
            value="3"
        >
            <sp-menu-item value="1">
                <sp-icon-edit slot="icon" label="Edit"></sp-icon-edit>
            </sp-menu-item>
            <sp-menu-item value="2">
                <sp-icon-copy slot="icon" label="Copy"></sp-icon-copy>
            </sp-menu-item>
            <sp-menu-item value="3">
                <sp-icon-delete slot="icon" label="Delete"></sp-icon-delete>
            </sp-menu-item>
        </sp-picker>
    `;
};
iconsOnly.args = {
    open: true,
};
iconsOnly.decorators = [isOverlayOpen];

export const Open = (args: StoryArgs): TemplateResult => {
    return html`
        <style>
            fieldset {
                float: left;
                clear: left;
                margin-bottom: 15px;
            }
            .backdrop-filter-test {
                backdrop-filter: saturate(80%);
            }
        </style>
        <fieldset class="backdrop-filter-test">
            <sp-field-label for="picker-open">
                Where do you live?
            </sp-field-label>
            <sp-picker
                id="picker-open"
                label="Open picker"
                ${spreadProps(args)}
                @change=${handleChange(args)}
            >
                <span slot="label">
                    Select a Country with a very long label, too long, in fact
                </span>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Feather...</sp-menu-item>
                <sp-menu-item>Select and Mask...</sp-menu-item>
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
                @change=${handleChange(args)}
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
Open.decorators = [isOverlayOpen];

export const initialValue = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-field-label for="picker-initial">Where do you live?</sp-field-label>
        <sp-picker
            id="picker-initial"
            @change=${handleChange(args)}
            value="item-2"
            ${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};

export const readonly = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-picker
            @change=${handleChange(args)}
            readonly
            value="item-2"
            ${spreadProps(args)}
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu-item value="item-1">Deselect</sp-menu-item>
            <sp-menu-item value="item-2">Select Inverse</sp-menu-item>
            <sp-menu-item value="item-3">Feather...</sp-menu-item>
            <sp-menu-item value="item-4">Select and Mask...</sp-menu-item>
            <sp-menu-item value="item-5">Save Selection</sp-menu-item>
            <sp-menu-item disabled value="item-6">Make Work Path</sp-menu-item>
        </sp-picker>
    `;
};

export const custom = (args: StoryArgs): TemplateResult => {
    const initialState = 'lb1-mo';
    return html`
        <sp-field-label for="picker-state">
            What state do you live in?
        </sp-field-label>
        <sp-picker
            style="width: 400px;"
            @change=${handleChange(args)}
            id="picker-state"
            label="Pick a state"
            ${spreadProps(args)}
            value=${initialState}
        >
            ${states.map(
                (state) => html`
                    <sp-menu-item
                        id=${state.id}
                        value=${state.id}
                        ?selected=${state.id === initialState}
                    >
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
custom.decorators = [isOverlayOpen];
