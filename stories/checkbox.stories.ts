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
import * as MediumIcons from '../src/icons/icons-medium';
import '../src/checkbox';

import { defineCustomElements } from '../src';

defineCustomElements(...Object.values(MediumIcons));

storiesOf('Checkbox', module)
    .add('Default', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox
                @click="${action('Click')}"
                @change="${action('Change')}"
            >
                Checkbox
            </sp-checkbox>
        `;
    })
    .add('Checked', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox checked>Checkbox</sp-checkbox>
        `;
    })
    .add('Indeterminate', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox indeterminate>Checkbox</sp-checkbox>
        `;
    })
    .add('Quiet', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox quiet>Checkbox</sp-checkbox>
        `;
    })
    .add('Quiet checked', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox quiet checked>Checkbox</sp-checkbox>
        `;
    })
    .add('Quiet indeterminate', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox quiet indeterminate>Checkbox</sp-checkbox>
        `;
    })
    .add('Autofocus', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox autofocus>Checkbox</sp-checkbox>
        `;
    })
    .add('Invalid', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox invalid>Checkbox</sp-checkbox>
        `;
    })
    .add('Invalid checked', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox invalid checked>Checkbox</sp-checkbox>
        `;
    })
    .add('Invalid indeterminate', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
        `;
    })
    .add('Disabled', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox disabled>Checkbox</sp-checkbox>
        `;
    })
    .add('Disabled checked', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox disabled checked>Checkbox</sp-checkbox>
        `;
    })
    .add('Disabled indeterminate', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
        `;
    })
    .add('Tab index example', () => {
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
            <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
            <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
            <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
            <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
        `;
    });
