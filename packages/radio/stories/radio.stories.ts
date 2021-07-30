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

import '../sp-radio.js';
import '../sp-radio-group.js';
import { spreadProps } from '../../../test/lit-helpers.js';

export default {
    component: 'sp-radio',
    title: 'Radio',
    argTypes: {
        checked: {
            name: 'checked',
            type: { name: 'boolean', required: false },
            description: 'Represents when the input is checked',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: 'boolean',
        },
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
        emphasized: {
            name: 'emphasized',
            type: { name: 'boolean', required: false },
            description: "Set the button's state to emphasized.",
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
    },
    args: {
        checked: false,
        disabled: false,
        emphasized: false,
        invalid: false,
    },
};

interface StoryArgs {
    checked?: boolean;
    disabled?: boolean;
    emphasized?: boolean;
    invalid?: boolean;
    readonly?: boolean;
    [prop: string]: any;
}

function renderRadio(args: StoryArgs): TemplateResult {
    return html`
        <sp-radio ${spreadProps(args)}>Radio</sp-radio>
    `;
}
export const Default = (args: StoryArgs): TemplateResult => renderRadio(args);

export const readonly = (args: StoryArgs): TemplateResult =>
    renderRadio({
        ...args,
        readonly: true,
    });
readonly.args = {
    checked: true,
};

export const Emphasized = (args: StoryArgs): TemplateResult =>
    renderRadio(args);
Emphasized.args = {
    checked: true,
    emphasized: true,
};

export const Autofocus = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-radio autofocus ${spreadProps(args)}>Radio</sp-radio>
    `;
};

export const Invalid = (args: StoryArgs): TemplateResult => renderRadio(args);
Invalid.args = {
    invalid: true,
};

export const Disabled = (args: StoryArgs): TemplateResult => renderRadio(args);
Disabled.args = {
    disabled: true,
};

export const labelBelow = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-radio label-below ${spreadProps(args)}>Radio</sp-radio>
    `;
};
labelBelow.story = {
    name: 'Label below',
};

const values = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
};

export const groupExample = (): TemplateResult => {
    return html`
        <sp-radio-group vertical selected="1" name="group-example">
            <sp-radio value=${values.first}>Option 1</sp-radio>
            <sp-radio value=${values.second}>Option 2</sp-radio>
            <sp-radio value=${values.third}>Option 3</sp-radio>
            <sp-radio value=${values.fourth}>Option 4</sp-radio>
        </sp-radio-group>
    `;
};

export const horizontalGroup = (): TemplateResult => {
    return html`
        <sp-radio-group horizontal selected="first" name="group-example">
            <sp-radio value="first">Option 1</sp-radio>
            <sp-radio value="second">Option 2</sp-radio>
            <sp-radio value="third">Option 3</sp-radio>
            <sp-radio value="fourth">Option 4</sp-radio>
        </sp-radio-group>
    `;
};

export const horizontalLabelBelowGroup = (): TemplateResult => {
    return html`
        <sp-radio-group horizontal selected="first" name="group-example">
            <sp-radio value="first" label-below>Option 1</sp-radio>
            <sp-radio value="second" label-below>Option 2</sp-radio>
            <sp-radio value="third" label-below>Option 3</sp-radio>
            <sp-radio value="fourth" label-below>Option 4</sp-radio>
        </sp-radio-group>
    `;
};

export const tabIndexExample = (): TemplateResult => {
    return html`
        <sp-radio-group vertical name="group-example">
            <sp-radio emphasized value="zero" tabindex="0">
                Tab Index 0
            </sp-radio>
            <sp-radio disabled value="three" tabindex="3">Tab Index 3</sp-radio>
            <sp-radio value="one" tabindex="1" autofocus>Tab Index 1</sp-radio>
            <sp-radio value="four" tabindex="4">Tab Index 4</sp-radio>
            <sp-radio invalid value="two" tabindex="2">Tab Index 2</sp-radio>
        </sp-radio-group>
    `;
};

export const horizontalTabIndexExample = (): TemplateResult => {
    return html`
        <sp-radio-group horizontal name="group-example">
            <sp-radio emphasized value="zero" tabindex="0">
                Tab Index 0
            </sp-radio>
            <sp-radio disabled value="three" tabindex="3">Tab Index 3</sp-radio>
            <sp-radio value="one" tabindex="1" autofocus>Tab Index 1</sp-radio>
            <sp-radio value="four" tabindex="4">Tab Index 4</sp-radio>
            <sp-radio invalid value="two" tabindex="2">Tab Index 2</sp-radio>
        </sp-radio-group>
    `;
};

tabIndexExample.story = {
    name: 'Tab index example',
};
