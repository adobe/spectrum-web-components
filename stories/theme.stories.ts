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
import { withKnobs, boolean, radios, text } from '@storybook/addon-knobs';
import * as MediumIcons from '../src/icons/icons-medium';

import { defineCustomElements, Icon } from '../src';

import '../src/button';
import '../src/switch';
import '../src/slider';
import '../src/themes';

defineCustomElements(Icon, ...Object.values(MediumIcons));

storiesOf('Theme', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const colorOptions = {
            Light: 'light',
            Dark: 'dark',
        };
        const color = radios('Color stop', colorOptions, colorOptions.Light);
        return html`
            <style color="text/css">
                #example {
                    width: 500px;
                    padding: 3em;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(--spectrum-global-color-gray-800);
                }

                #buttons {
                    margin-top: 2em;
                }
            </style>
            <sp-theme color="${color}">
                <div id="example">
                    <div>
                        <sp-slider
                            value="5"
                            step="1"
                            min="1"
                            max="11"
                            label="Volume"
                            id="volume-slider"
                        ></sp-slider>
                    </div>
                    <div><sp-switch>Overdrive</sp-switch></div>
                    <div id="buttons">
                        <sp-button variant="primary">Cancel</sp-button>
                        <sp-button variant="cta">Continue</sp-button>
                    </div>
                </div>
            </sp-theme>
        `;
    })
    .add('Nested theme', () => {
        const colorOptions = {
            Light: 'light',
            Dark: 'dark',
        };
        const outer = radios(
            'Outer color stop',
            colorOptions,
            colorOptions.Light
        );
        const inner = outer === 'light' ? 'dark' : 'light';
        return html`
            <style type="text/css">
                #outer {
                    width: 500px;
                    padding: 3em;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(--spectrum-global-color-gray-800);
                }

                #inner {
                    margin-top: 2em;
                    padding: 2em;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(--spectrum-global-color-gray-800);
                }

                #buttons {
                    margin-top: 2em;
                }
            </style>
            <sp-theme color="${outer}">
                <div id="outer">
                    <div>
                        <sp-slider
                            value="5"
                            step="1"
                            min="1"
                            max="11"
                            label="Volume"
                            id="volume-slider"
                        ></sp-slider>
                    </div>
                    <div><sp-switch>Overdrive</sp-switch></div>
                    <div id="buttons">
                        <sp-button variant="primary">Cancel</sp-button>
                        <sp-button variant="cta">Continue</sp-button>
                    </div>
                    <sp-theme color="${inner}">
                        <div id="inner">
                            <div>
                                <sp-slider
                                    value="5"
                                    step="1"
                                    min="1"
                                    max="11"
                                    label="Volume"
                                    id="volume-slider-inner"
                                ></sp-slider>
                            </div>
                            <div><sp-switch>Overdrive</sp-switch></div>
                            <div id="buttons-inner">
                                <sp-button variant="primary">Cancel</sp-button>
                                <sp-button variant="cta">Continue</sp-button>
                            </div>
                        </div>
                    </sp-theme>
                </div>
            </sp-theme>
        `;
    })
    .add('Nested color', () => {
        return html`
            <style type="text/css">
                #outer {
                    width: 500px;
                    padding: 3em;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(--spectrum-global-color-gray-800);
                }

                #inner {
                    margin-top: 2em;
                    padding: 2em;
                    background-color: var(--spectrum-global-color-gray-100);
                    color: var(--spectrum-global-color-gray-800);
                }

                #buttons {
                    margin-top: 2em;
                }
            </style>
            <sp-theme color="dark">
                <div id="outer">
                    <div>
                        <sp-slider
                            value="5"
                            step="1"
                            min="1"
                            max="11"
                            label="Volume"
                            id="volume-slider"
                        ></sp-slider>
                    </div>
                    <div><sp-switch>Overdrive</sp-switch></div>
                    <div id="buttons">
                        <sp-button variant="primary">Cancel</sp-button>
                        <sp-button variant="cta">Continue</sp-button>
                    </div>
                    <sp-theme-light>
                        <div id="inner">
                            <div>
                                <sp-slider
                                    value="5"
                                    step="1"
                                    min="1"
                                    max="11"
                                    label="Volume"
                                    id="volume-slider-inner"
                                ></sp-slider>
                            </div>
                            <div><sp-switch>Overdrive</sp-switch></div>
                            <div id="buttons-inner">
                                <sp-button variant="primary">Cancel</sp-button>
                                <sp-button variant="cta">Continue</sp-button>
                            </div>
                        </div>
                    </sp-theme-light>
                </div>
            </sp-theme>
        `;
    });
