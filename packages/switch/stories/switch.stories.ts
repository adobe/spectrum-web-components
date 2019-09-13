/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { html } from 'lit-html';
import { action } from '@storybook/addon-actions';

import '../';

storiesOf('Switch', module)
    .add('Default', () => {
        return html`
            <sp-switch
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Switch
            </sp-switch>
        `;
    })
    .add('Checked', () => {
        return html`
            <sp-switch
                checked
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Switch
            </sp-switch>
        `;
    })
    .add('Quiet', () => {
        return html`
            <sp-switch
                quiet
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Switch
            </sp-switch>
        `;
    })
    .add('Quiet checked', () => {
        return html`
            <sp-switch
                quiet
                checked
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Switch
            </sp-switch>
        `;
    })
    .add('Autofocus', () => {
        return html`
            <sp-switch
                autofocus
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Switch
            </sp-switch>
        `;
    })
    .add('Disabled', () => {
        return html`
            <sp-switch disabled>Switch</sp-switch>
        `;
    })
    .add('Disabled checked', () => {
        return html`
            <sp-switch disabled checked>Switch</sp-switch>
        `;
    });
