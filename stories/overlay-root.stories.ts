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
import { withKnobs, number, radios } from '@storybook/addon-knobs';
import { html } from 'lit-html';

import '../src/overlay-root';
import '../src/overlay-trigger';
import '../src/button';
import '../src/popover';
import '../src/slider';

storiesOf('Overlay Root', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const positionOptions = {
            top: 'top',
            bottom: 'bottom',
            left: 'left',
            right: 'right',
        };
        const position = radios(
            'Type',
            positionOptions,
            positionOptions.bottom
        );
        const offset = number('Offset', 6);

        return html`
            <style>
                html,
                body,
                #root,
                #root-inner {
                    height: 100%;
                }

                overlay-root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                overlay-trigger {
                    flex: none;
                }
            </style>
            <overlay-root placement="bottom" offset="${offset}">
                <overlay-trigger
                    id="trigger"
                    placement="${position}"
                    offset="${offset}"
                >
                    <sp-button variant="primary" slot="trigger">
                        Show Popover
                    </sp-button>
                    <sp-popover
                        dialog
                        slot="click-content"
                        direction="${position}"
                        tip
                        open
                    >
                        <div class="options-popover-content">
                            <sp-slider
                                value="5"
                                step="0.5"
                                min="0"
                                max="20"
                                label="Awesomeness"
                            ></sp-slider>
                            <sp-button>Press Me</sp-button>
                        </div>
                    </sp-popover>
                    <div slot="hover-content" class="tooltip" delay="100">
                        Tooltip
                    </div>
                </overlay-trigger>
            </overlay-root>
        `;
    });
