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
import { html, radios } from '@open-wc/demoing-storybook';

import '../sp-theme.js';
import '../src/themes.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/slider/sp-slider.js';
import { TemplateResult } from 'lit-html';

export default {
    component: 'sp-theme',
    title: 'Theme',
};

const storyStyles = html`
    <style type="text/css">
        #outer,
        #example {
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
`;

export const Default = (): TemplateResult => {
    const colorOptions = {
        Light: 'light',
        Dark: 'dark',
    };
    const color = radios('Color stop', colorOptions, colorOptions.Light);
    return html`
        ${storyStyles}
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
};

export const displayFlex = (): TemplateResult => html`
    <style type="text/css">
        #flex-theme {
            display: flex;
            flex-direction: row;
        }
        #flex-theme sp-button {
            flex: 0 0;
        }
        #flex-theme #middle-button {
            flex: 1 0;
        }
    </style>
    <sp-theme id="flex-theme" color="dark">
        <sp-button>Start</sp-button>
        <sp-button id="middle-button">Middle</sp-button>
        <sp-button>End</sp-button>
    </sp-theme>
`;

export const none = (): TemplateResult => html`
    ${storyStyles}
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
    <sp-theme></sp-theme>
`;

export const nestedTheme = (): TemplateResult => {
    const colorOptions = {
        Light: 'light',
        Dark: 'dark',
    };
    const outer = radios('Outer color stop', colorOptions, colorOptions.Light);
    const inner = outer === 'light' ? 'dark' : 'light';
    return html`
        ${storyStyles}
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
};

export const reverseColorNestedTheme = (): TemplateResult => {
    const colorOptions = {
        Light: 'light',
        Dark: 'dark',
    };
    const outer = radios('Outer color stop', colorOptions, colorOptions.Light);
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
        <sp-theme color="${inner}">
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
                <sp-theme color="${outer}">
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
};
