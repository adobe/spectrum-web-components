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
import { ifDefined } from 'lit-html/directives/if-defined';

import '../';
import { actionbarVariants } from '../';
import { boolean, select } from '@storybook/addon-knobs';

storiesOf('Actionbar', module).add('Default', () => {
    const variants = ['', ...actionbarVariants];
    return html`
        <style>
            :root {
                --spectrum-global-animation-duration-0: 0ms;
                --spectrum-global-animation-duration-100: 130ms;
                --spectrum-global-animation-duration-200: 160ms;
                --spectrum-global-animation-duration-300: 190ms;
                --spectrum-global-animation-duration-400: 220ms;
                --spectrum-global-animation-duration-500: 250ms;
                --spectrum-global-animation-duration-600: 300ms;
                --spectrum-global-animation-duration-700: 350ms;
                --spectrum-global-animation-duration-800: 400ms;
                --spectrum-global-animation-duration-900: 450ms;
                --spectrum-global-animation-duration-1000: 500ms;
                --spectrum-global-animation-duration-2000: 1000ms;
                --spectrum-global-animation-duration-4000: 2000ms;
                --spectrum-global-animation-ease-in-out: cubic-bezier(
                    0.45,
                    0,
                    0.4,
                    1
                );
                --spectrum-global-animation-ease-in: cubic-bezier(0.5, 0, 1, 1);
                --spectrum-global-animation-ease-out: cubic-bezier(
                    0,
                    0,
                    0.4,
                    1
                );
                --spectrum-global-animation-linear: cubic-bezier(0, 0, 1, 1);

                --spectrum-actionbar-height: var(
                    --spectrum-global-dimension-size-600
                );
                --spectrum-actionbar-padding-x: var(
                    --spectrum-global-dimension-size-200
                );
                --spectrum-actionbar-margin-x: var(
                    --spectrum-global-dimension-size-200
                );
                --spectrum-actionbar-offset-y: var(
                    --spectrum-global-dimension-size-200
                );

                --spectrum-actionbar-min-width: 280px;
                --spectrum-actionbar-max-width: 960px;
            }
        </style>
        <sp-actionbar
            ?open=${boolean('Open', true, 'Element')}
            variant=${ifDefined(
                select('Variant', variants, variants[0], 'Element') || undefined
            )}
        >
            <sp-checkbox indeterminate>228 Selected</sp-checkbox>
            <div class="spectrum-ButtonGroup">
                <sp-action-button quiet>
                    <svg
                        slot="icon"
                        id="spectrum-icon-18-Edit"
                        viewBox="0 0 36 36"
                    >
                        <path
                            d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                        ></path>
                    </svg>
                </sp-action-button>
                <sp-action-button quiet>
                    <svg
                        slot="icon"
                        id="spectrum-icon-18-More"
                        viewBox="0 0 36 36"
                    >
                        <circle cx="17.8" cy="18.2" r="3.4"></circle>
                        <circle cx="29.5" cy="18.2" r="3.4"></circle>
                        <circle cx="6.1" cy="18.2" r="3.4"></circle>
                    </svg>
                </sp-action-button>
            </div>
        </sp-actionbar>
    `;
});
