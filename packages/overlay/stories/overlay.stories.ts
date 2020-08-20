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
import { html, number, select, radios } from '@open-wc/demoing-storybook';
import { TemplateResult } from '@spectrum-web-components/base';

import { Placement } from '../';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import { DialogWrapper } from '@spectrum-web-components/dialog';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Color } from '@spectrum-web-components/theme';

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
    const placement = select(
        'Placement',
        [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end',
            'auto',
            'auto-start',
            'auto-end',
            'none',
        ],
        'bottom'
    ) as Placement;

    const offset = number('Offset', 0);

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
                placement="${placement}"
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
                            placement="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                Another Popover
                            </div>
                        </sp-popover>

                        <sp-tooltip
                            slot="hover-content"
                            delayed
                            open
                            tip="bottom"
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </div>
            </sp-popover>
            <sp-tooltip open slot="hover-content" delayed tip="bottom">
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const inline = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="inline">
            <sp-button slot="trigger">Open</sp-button>
            <sp-overlay open slot="click-content">
                <sp-button
                    @click=${(event: Event & { target: HTMLElement }): void => {
                        event.target.dispatchEvent(closeEvent);
                    }}
                >
                    Close
                </sp-button>
            </sp-overlay>
        </overlay-trigger>
        <p>
            This is some text.
        </p>
        <p>
            This is some text.
        </p>
        <p>
            This is a
            <a href="#">link</a>
            .
        </p>
    `;
};

export const replace = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="replace">
            <sp-button slot="trigger">Open</sp-button>
            <sp-overlay open slot="click-content">
                <sp-button
                    @click=${(event: Event & { target: HTMLElement }): void => {
                        event.target.dispatchEvent(closeEvent);
                    }}
                >
                    Close
                </sp-button>
            </sp-overlay>
        </overlay-trigger>
        <p>
            This is some text.
        </p>
        <p>
            This is some text.
        </p>
        <p>
            This is a
            <a href="#">link</a>
            .
        </p>
    `;
};

export const modal = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="modal" placement="none">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                tabindex="0"
                underlay
                open
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
                style="width: 100vw; height: 100vh;"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
                @confirm=${(event: Event & { target: DialogWrapper }): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
                @secondary=${(
                    event: Event & { target: DialogWrapper }
                ): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
                @cancel=${(event: Event & { target: DialogWrapper }): void => {
                    event.target.dispatchEvent(closeEvent);
                }}
                @sp-overlay-closed=${(
                    event: Event & { target: DialogWrapper }
                ): void => {
                    event.target.open = true;
                }}
            >
                Content of the dialog
            </sp-dialog-wrapper>
        </overlay-trigger>
        <p>
            This is some text.
        </p>
        <p>
            This is some text.
        </p>
        <p>
            This is a
            <a href="#">link</a>
            .
        </p>
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
                    tabindex=""
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
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const updated = (): TemplateResult => {
    return html`
        ${storyStyles}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover
                    dialog
                    slot="click-content"
                    position="bottom"
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
                                placement="bottom"
                                tip
                                open
                            >
                                <div class="options-popover-content">
                                    Another Popover
                                </div>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                open
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </div>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `;
};

export const sideHoverDraggable = (): TemplateResult => {
    return html`
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="right">
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
