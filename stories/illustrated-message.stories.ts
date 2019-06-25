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
import { withKnobs, boolean, radios, text } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../src/illustrated-message';

storiesOf('IllustratedMessage', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        return html`
            <sp-illustrated-message
                heading="Drag and Drop Your File"
                description="This message has italics"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="103"
                    viewBox="0 0 150 103"
                >
                    <use xlink:href="error_message_geometry.svg#error-notice" />
                </svg>
            </sp-illustrated-message>
        `;
    })
    .add('CTA', () => {
        return html`
            <sp-illustrated-message
                heading="Drag and Drop Your File"
                description="This message has no italics"
                cta
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="103"
                    viewBox="0 0 150 103"
                >
                    <use xlink:href="error_message_geometry.svg#error-notice" />
                </svg>
            </sp-illustrated-message>
        `;
    });
