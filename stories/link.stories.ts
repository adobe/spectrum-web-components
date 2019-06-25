/*
Copyright 2018 Adobe. All rights reserved.
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
import '../src/link';

storiesOf('Link', module)
    .add('Default', () => {
        // prettier-ignore
        return html`
            This is a <sp-link href="#">link</sp-link>.
        `;
    })
    .add('Quiet', () => {
        // prettier-ignore
        return html`
            This is a <sp-link quiet href="#">quiet link</sp-link>.
        `;
    })
    .add('Over Background', () => {
        return html`
            <div
                style="background-color: rgb(255, 160, 175); padding: 15px 20px; display: inline-block;"
            >
                <p style="color: rgb(240, 240, 240);">
                    This
                    <sp-link over-background href="#">link</sp-link>
                    has a background.
                </p>
            </div>
        `;
    });
