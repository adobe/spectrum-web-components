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
import { html, number, radios } from '@open-wc/demoing-storybook';
import { TemplateResult } from 'lit-element';

import { Placement } from '../';
import '../../button';
import '../../popover';
import '../../slider';
import '../../radio';
import '../../radio-group';
import '../../tooltip';
import '../../theme';
import { Color } from '../../theme';

import './overlay-story-components';

const storyStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        #root-theme {
            height: 100%;
            margin: 0;
        }

        #root-theme {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: blue;
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;

export default {
    title: 'Overlay',
};

export const Default = (): TemplateResult => {
    const positionOptions = {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
    };
    const placement = radios(
        'Type',
        positionOptions,
        positionOptions.bottom
    ) as Placement;
    const offset = number('Offset', 6);

    return html`
        ${storyStyles}
        <overlay-trigger
            id="trigger"
            placement="${placement}"
            offset="${offset}"
        >
            <sp-button variant="primary" slot="trigger">
                Show Popover
            </sp-button>
            <sp-popover
                dialog
                slot="click-content"
                direction="${placement}"
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
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover
                            dialog
                            slot="click-content"
                            direction="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                Another Popover
                            </div>
                        </sp-popover>

                        <sp-tooltip
                            slot="hover-content"
                            delay="100"
                            open
                            tip="bottom"
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </div>
            </sp-popover>
            <sp-tooltip open slot="hover-content" delay="100" tip="bottom">
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const deepNesting = (): TemplateResult => {
    const colorOptions = {
        Light: 'light',
        Dark: 'dark',
    };
    const color = radios(
        'Color stop',
        colorOptions,
        colorOptions.Light
    ) as Color;
    const outter = color === 'light' ? 'dark' : 'light';
    return html`
        ${storyStyles}
        <sp-theme color=${outter}>
            <sp-theme color=${color}>
                <recursive-popover
                    style="
                        background-color: var(--spectrum-global-color-gray-100);
                        color: var(--spectrum-global-color-gray-800);
                        padding: var(--spectrum-global-dimension-size-225);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `;
};

export const edges = (): TemplateResult => {
    return html`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger class="demo top-left" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const updated = (): TemplateResult => {
    return html`
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delay="100" open tip="bottom">
                    Drag Me!!
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `;
};

export const updatedSide = (): TemplateResult => {
    return html`
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delay="100" open tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `;
};
