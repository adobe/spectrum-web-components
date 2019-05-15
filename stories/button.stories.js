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
import { action } from '@storybook/addon-actions';

import { defineCustomElements, Button } from '../lib';

defineCustomElements(Button);

storiesOf('Button', module)
    .add('Default', () => {
        return renderButtonPair({});
    })
    .add('variant: cta', () => {
        return renderButtonPair({
            variant: 'cta',
        });
    })
    .add('variant: primary', () => {
        return renderButtonPair({
            variant: 'primary',
        });
    })
    .add('variant: secondary', () => {
        return renderButtonPair({
            variant: 'secondary',
        });
    })
    .add('variant: overBackground', () => {
        return html`
            <div
                style='background-color: rgb(15, 121, 125); color: rgb(15, 121, 125); padding: 15px 20px; display: "inline-block"'
            >
                ${renderButtonPair({
                    variant: 'overBackground',
                })}
            </div>
        `;
    })
    .add('attribute: warning', () => {
        return renderButtonPair({
            variant: 'cta',
            warning: 'true',
        });
    })
    .add('min-width button', () => {
        return html`
            <div>
                <style>
                    sp-button {
                        min-width: 300px;
                    }
                </style>
                ${renderButtonPair({
                    variant: 'cta',
                })}
            </div>
        `;
    });

function renderButton(properties) {
    if (properties.variant) {
        return html`
            <sp-button
                variant="${properties.variant}"
                .quiet="${!!properties.quiet}"
                .disabled=${!!properties.disabled}
                .warning=${!!properties.warning}
                @click=${action(`Click ${properties.variant}`)}
            >
                Click Me
            </sp-button>
        `;
    } else {
        return html`
            <sp-button
                .quiet="${!!properties.quiet}"
                .disabled=${!!properties.disabled}
                .warning=${!!properties.warning}
                @click=${action(`Click ${properties.variant}`)}
            >
                Click Me
            </sp-button>
        `;
    }
}

function renderButtonPair(properties) {
    const disabled = Object.assign({}, properties, { disabled: true });
    return html`
        <div>
            ${renderButton(properties)} ${renderButton(disabled)}
        </div>
    `;
}
