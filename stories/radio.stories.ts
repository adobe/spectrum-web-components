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
import '../src/radio';

storiesOf('Radio', module)
    .add('Default', () => {
        return html`
            <sp-radio>Radio</sp-radio>
        `;
    })
    .add('Checked', () => {
        return html`
            <sp-radio checked>Radio</sp-radio>
        `;
    })
    .add('Quiet', () => {
        return html`
            <sp-radio quiet>Radio</sp-radio>
        `;
    })
    .add('Quiet checked', () => {
        return html`
            <sp-radio quiet checked>Radio</sp-radio>
        `;
    })
    .add('Autofocus', () => {
        return html`
            <sp-radio autofocus>Radio</sp-radio>
        `;
    })
    .add('Invalid', () => {
        return html`
            <sp-radio invalid>Radio</sp-radio>
        `;
    })
    .add('Invalid checked', () => {
        return html`
            <sp-radio invalid checked>Radio</sp-radio>
        `;
    })
    .add('Disabled', () => {
        return html`
            <sp-radio disabled>Radio</sp-radio>
        `;
    })
    .add('Disabled checked', () => {
        return html`
            <sp-radio disabled checked>Radio</sp-radio>
        `;
    })

    .add('Label below', () => {
        return html`
            <sp-radio label-below>Radio</sp-radio>
        `;
    })
    .add('Label below checked', () => {
        return html`
            <sp-radio label-below checked>Radio</sp-radio>
        `;
    })
    .add('Tab index example', () => {
        return html`
            <div>
                <sp-radio name="tab-example" tabindex="0">Radio 0</sp-radio>
            </div>
            <div>
                <sp-radio name="tab-example" disabled tabindex="2">
                    Radio 2
                </sp-radio>
            </div>
            <div>
                <sp-radio name="tab-example" tabindex="3">Radio 3</sp-radio>
            </div>
            <div>
                <sp-radio name="tab-example" tabindex="1">Radio 1</sp-radio>
            </div>
        `;
    });
