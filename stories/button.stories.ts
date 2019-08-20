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
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as MediumIcons from '../src/icons/icons-medium';
import { TemplateResult } from 'lit-element';

import { defineCustomElements, Icon } from '../src';

import '../src/button';

defineCustomElements(Icon, ...Object.values(MediumIcons));

interface Properties {
    variant?: 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
    quiet?: boolean;
    content?: TemplateResult;
    disabled?: boolean;
    iconRight?: boolean;
}

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
    .add('variant: negative', () => {
        return renderButtonPair({
            variant: 'negative',
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
    .add('attribute: quiet, variant: primary', () => {
        return renderButtonPair({
            variant: 'primary',
            quiet: true,
        });
    })
    .add('attribute: quiet, variant: secondary', () => {
        return renderButtonPair({
            variant: 'secondary',
            quiet: true,
        });
    })
    .add('attribute: quiet, variant: negative', () => {
        return renderButtonPair({
            variant: 'negative',
            quiet: true,
        });
    })
    .add('attribute: quiet, variant: overBackground', () => {
        return html`
            <div
                style='background-color: rgb(15, 121, 125); color: rgb(15, 121, 125); padding: 15px 20px; display: "inline-block"'
            >
                ${renderButtonPair({
                    variant: 'overBackground',
                    quiet: true,
                })}
            </div>
        `;
    })
    .add('with icon', () => {
        const iconRight = boolean('Icon on Right', false);
        return html`
            <sp-icons-medium></sp-icons-medium>
            <style>
                .row {
                    padding: 10px;
                }
            </style>
            <div class="row">
                ${renderButtonPair({
                    variant: 'primary',
                    iconRight: iconRight,
                    content: html`
                        <sp-icon
                            slot="icon"
                            size="m"
                            name="ui:HelpMedium"
                        ></sp-icon>
                        Help
                    `,
                })}
            </div>
            <div class="row">
                ${renderButtonPair({
                    variant: 'primary',
                    iconRight: iconRight,
                    content: html`
                        <svg
                            slot="icon"
                            viewBox="0 0 36 36"
                            focusable="false"
                            aria-hidden="true"
                            role="img"
                        >
                            <path
                                d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                            ></path>
                        </svg>
                        Custom SVG
                    `,
                })}
            </div>
            <div class="row">
                <sp-button variant="secondary" icon-right>
                    <svg
                        slot="icon"
                        viewBox="0 0 36 36"
                        focusable="false"
                        aria-hidden="true"
                        role="img"
                    >
                        <path
                            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                        ></path>
                    </svg>
                    Custom SVG
                </sp-button>
                <sp-button variant="secondary">
                    <svg
                        slot="icon"
                        viewBox="0 0 36 36"
                        focusable="false"
                        aria-hidden="true"
                        role="img"
                    >
                        <path
                            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                        ></path>
                    </svg>
                    Custom SVG
                </sp-button>
            </div>
        `;
        return renderButtonPair({
            variant: 'primary',
            content: html`
                <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
            `,
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
    })
    .add('button with href', () => {
        return html`
            <sp-button href="https://github.com/adobe/spectrum-web-components">
                Github
            </sp-button>
        `;
    })
    .add('button with href target="_blank"', () => {
        return html`
            <sp-button
                href="https://github.com/adobe/spectrum-web-components"
                target="_blank"
            >
                Github
            </sp-button>
        `;
    });

function renderButton(properties: Properties): TemplateResult {
    if (properties.variant) {
        return html`
            <sp-button
                variant="${properties.variant}"
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                ?icon-right=${properties.iconRight}
                @click=${action(`Click ${properties.variant}`)}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    } else {
        return html`
            <sp-button
                ?quiet="${!!properties.quiet}"
                ?disabled=${!!properties.disabled}
                @click=${action(`Click ${properties.variant}`)}
            >
                ${properties.content || 'Click Me'}
            </sp-button>
        `;
    }
}

function renderButtonPair(properties: Properties): TemplateResult {
    const disabled = Object.assign({}, properties, { disabled: true });
    return html`
        ${renderButton(properties)} ${renderButton(disabled)}
    `;
}
