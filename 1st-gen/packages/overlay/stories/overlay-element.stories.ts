/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, render, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-anchor-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-polygon-select.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/table/sp-table-cell.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-rect-select.js';
import { Placement } from '@floating-ui/dom';
import { OverlayTypes } from '../src/overlay-types.js';
import { notAgain } from '../../dialog/stories/dialog-base.stories.js';
import './overlay-story-components.js';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from '../src/slottable-request-event.js';

export default {
    title: 'Overlay/API Reference/sp-overlay',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'The `<sp-overlay>` element provides declarative overlay functionality. This is the base element API for creating tooltips, popovers, and other floating UI elements with a single interaction type.',
            },
        },
    },
    args: {
        open: true,
        delayed: false,
    },
    argTypes: {
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the second accordion item is open.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        delayed: {
            name: 'delayed',
            type: { name: 'boolean', required: false },
            description: 'Whether the tooltips are delayed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

type WrapperStyleType = 'will-change' | 'container-type';

type Properties = {
    delayed: boolean;
    interaction: 'click' | 'hover' | 'longpress';
    open?: boolean;
    placement?: Placement;
    receivesFocus: 'true' | 'false' | 'auto';
    style?: WrapperStyleType;
    type?: OverlayTypes;
};

const Template = ({
    interaction,
    open,
    placement,
    type,
    delayed,
    style,
}: Properties): TemplateResult => html`
    ${style === 'will-change'
        ? html`
              <style>
                  .wrapper {
                      will-change: transform;
                  }
              </style>
          `
        : html`
              <style>
                  .wrapper {
                      container-type: size;
                  }
              </style>
          `}
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${ifDefined(type)}
            placement=${ifDefined(placement)}
            offset="-10"
        >
            <sp-popover ?delayed=${delayed}>
                <sp-dialog size="s" no-divider>
                    <p>
                        Content goes here.
                        ${type === 'modal' || type === 'page'
                            ? html`
                                  Or, a link,
                                  <sp-link
                                      href="https://opensource.adobe.com/spectrum-web-components"
                                  >
                                      Spectrum Web Components
                                  </sp-link>
                                  .
                              `
                            : ''}
                    </p>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`;

/**
 * Modal overlay - blocks page interaction
 * 
 * **Key features:**
 * - type="modal" blocks interaction with page content
 * - User must interact with overlay or press ESC to close
 * - Automatically manages focus and keyboard navigation
 * 
 * 📖 [Overlay Types Guide](./overlay-types.md#modal)
 */
export const modal = (args: Properties): TemplateResult => Template(args);
modal.args = {
    interaction: 'click',
    placement: 'right',
    style: 'will-change',
    type: 'modal',
};

export const page = ({
    interaction,
    open,
    placement,
    type,
}: Properties): TemplateResult => html`
    <sp-action-button id="trigger">Open the overlay</sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${ifDefined(type)}
        placement=${ifDefined(placement)}
    >
        ${notAgain()}
    </sp-overlay>
`;
page.args = {
    interaction: 'click',
    placement: 'right',
    type: 'page',
};

export const complexSlowPage = (): TemplateResult => html`
    <div style="padding: 20px;">

            <p>
                This is a complex slow page. It has a lot of content. Even with a lot of content on the page,
                the overlay should still be able to open and close without extreme delay.
            </p>

            <div
                style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
            >
                <sp-button style="margin: 20px;" id="trigger">
                    open modal
                </sp-button>
                <sp-overlay trigger="trigger@click" type="modal">
                    <sp-dialog-wrapper headline="Signin form" dismissable underlay>
                        <p>I am a modal type overlay.</p>
                        <sp-field-label>Enter your email</sp-field-label>
                        <sp-textfield placeholder="test@gmail.com"></sp-textfield>
                        <sp-action-button
                            onClick="
                                this.dispatchEvent(
                                    new Event('close', {
                                        bubbles: true,
                                        composed: true,
                                    })
                                );
                            "
                        >
                            Sign in
                        </sp-action-button>
                    </sp-dialog-wrapper>
                </sp-overlay>

                <sp-button id="pageTrigger" style="margin: 20px;">open page</sp-button>
                <sp-overlay trigger="pageTrigger@click" type="page">
                    <sp-dialog-wrapper
                        headline="Full screen menu"
                        mode="fullscreenTakeover"
                        cancel-label="Close"
                    >
                        <p>I am a page type overlay.</p>
                    </sp-dialog-wrapper>
                </sp-overlay>
                <style>
                    .chat-container {
                        position: fixed;
                        bottom: 1em;
                        left: 1em;
                    }
                </style>

                <sp-button id="manualTrigger" style="margin: 20px;">open manual</sp-button>
                <sp-overlay trigger="manualTrigger@click" type="manual">
                    <sp-popover class="chat-container">
                        <sp-dialog dismissable>
                            <span slot="heading">Chat Window</span>
                            <sp-textfield
                                placeholder="Enter your message"
                            ></sp-textfield>
                            <sp-action-button>Send</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>

            </div>
        </span>

        ${Array(30)
            .fill(0)
            .map(
                () => html`
                    <div style="margin-bottom: 20px;">
                        <sp-table>
                            <sp-table-head>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                                <sp-table-head-cell>
                                    Column Title
                                </sp-table-head-cell>
                            </sp-table-head>
                            <sp-table-body style="height: 200px">
                                <sp-table-row value="row1" class="row1">
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Alpha
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row2" class="row2">
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Bravo
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row3" class="row3">
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Charlie
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row4" class="row4">
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                    <sp-table-cell>
                                        Row Item Delta
                                    </sp-table-cell>
                                </sp-table-row>
                                <sp-table-row value="row5" class="row5">
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                    <sp-table-cell>Row Item Echo</sp-table-cell>
                                </sp-table-row>
                            </sp-table-body>
                        </sp-table>
                        <sp-action-group>
                            <sp-action-button>
                                <sp-icon-anchor-select
                                    slot="icon"
                                ></sp-icon-anchor-select>
                            </sp-action-button>
                            <sp-action-button>
                                <sp-icon-polygon-select
                                    slot="icon"
                                ></sp-icon-polygon-select>
                            </sp-action-button>
                            <sp-slider
                                value="5"
                                step="0.5"
                                min="0"
                                max="20"
                                label="Control"
                            ></sp-slider>
                        </sp-action-group>
                        <sp-menu-group>
                            <span slot="header">Menu Group</span>
                            <sp-menu-item>Option 1</sp-menu-item>
                            <sp-menu-item>Option 2</sp-menu-item>
                            <sp-menu-divider></sp-menu-divider>
                            <sp-menu-item>Option 3</sp-menu-item>
                        </sp-menu-group>
                    </div>
                `
            )}
    </div>
`;

complexSlowPage.swc_vrt = {
    skip: true,
};

complexSlowPage.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Click interaction - overlay opens on button click
 * 
 * **Key features:**
 * - trigger="id@click" binds click event to trigger element
 * - type="auto" closes when clicking outside
 * - Keyboard accessible (Enter/Space to trigger)
 * 
 * 📖 [Interactions Guide](./interactions.md#click)
 */
export const click = (args: Properties): TemplateResult => Template(args);
click.args = {
    interaction: 'click',
    placement: 'right',
    style: 'container-type' as WrapperStyleType,
    type: 'auto',
};

export const withSlider = (): TemplateResult => html`
    <sp-button id="triggerEl" variant="primary">Button popover</sp-button>
    <sp-overlay trigger="triggerEl@click" placement="bottom">
        <sp-popover tip>
            <sp-dialog no-divider class="options-popover-content">
                <p>Try clicking the slider after popover opens</p>
                <p>It shouldn't close the popover</p>
                <sp-slider
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Awesomeness"
                ></sp-slider>
                <sp-button>Press me</sp-button>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
`;
withSlider.swc_vrt = {
    skip: true,
};

withSlider.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

/**
 * Hover interaction - overlay opens on mouse hover
 * 
 * **Key features:**
 * - trigger="id@hover" binds hover event to trigger element
 * - Typically used with tooltips (type="hint")
 * - Supports delayed attribute for better UX
 * 
 * 📖 [Interactions Guide](./interactions.md#hover)
 */
export const hover = (args: Properties): TemplateResult => Template(args);
hover.args = {
    interaction: 'hover',
    placement: 'right',
    style: 'will-change',
};

export const hoverTooltip = ({
    interaction,
    open,
    placement,
    type,
}: Properties): TemplateResult => html`
    <style>
        .wrapper {
            will-change: transform;
        }
    </style>
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${ifDefined(type)}
            placement=${ifDefined(placement)}
            offset="-10"
        >
            <sp-tooltip>Tooltip goes here.</sp-tooltip>
        </sp-overlay>
    </div>
`;
hoverTooltip.args = {
    interaction: 'hover',
    placement: 'right',
};

/**
 * Longpress interaction - overlay opens on long press
 * 
 * **Key features:**
 * - trigger="id@longpress" binds longpress event
 * - Useful for touch interfaces and mobile
 * - Hold affordance can be added to trigger button
 * 
 * 📖 [Interactions Guide](./interactions.md#longpress)
 */
export const longpress = (args: Properties): TemplateResult => Template(args);
longpress.args = {
    interaction: 'longpress',
    placement: 'right',
    style: 'container-type',
    type: 'auto',
};

/**
 * Proxy for fully encapsulated overlay containers that need to
 * pass `focus` into a shadow child element.
 */
export const receivesFocus = ({
    interaction,
    open,
    placement,
    receivesFocus,
    type,
}: Properties): TemplateResult => html`
    <sp-action-button id="trigger">
        Open the overlay (with focus)
    </sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${ifDefined(type)}
        placement=${ifDefined(placement)}
        .receivesFocus=${receivesFocus}
    >
        <sp-popover>
            <sp-dialog size="s" no-divider>
                <a href="https://example.com">Click Content</a>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
`;
receivesFocus.args = {
    interaction: 'click',
    placement: 'bottom-start',
    type: 'auto',
    receivesFocus: 'true',
} as Properties;

export const transformed = (args: Properties): TemplateResult => html`
    <style>
        .transformed {
            transform: translateX(-50%);
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 100px;
            block-size: 50px;
        }
    </style>
    <div class="transformed">${Template(args)}</div>
`;
transformed.args = {
    interaction: 'click',
    placement: 'right',
    type: 'auto',
};

export const contained = (args: Properties): TemplateResult => html`
    <style>
        .contained {
            contain: strict;
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 200px;
            block-size: 50px;
            padding-block: 75px;
            padding-inline-start: 300px;
        }
    </style>
    <div class="contained">${Template(args)}</div>
`;
contained.args = {
    interaction: 'click',
    placement: 'right',
    type: 'auto',
};

export const all = ({ delayed }: Properties): TemplateResult => html`
    <sp-action-button id="trigger" hold-affordance>
        Open the overlay
    </sp-action-button>
    <sp-overlay trigger="trigger@click" type="auto" placement="right">
        <sp-popover>
            <sp-dialog size="s" no-divider>Click content</sp-dialog>
        </sp-popover>
    </sp-overlay>
    <sp-overlay ?delayed=${delayed} trigger="trigger@hover" type="hint">
        <sp-tooltip>Hover content</sp-tooltip>
    </sp-overlay>
    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">
        <sp-popover>
            <sp-dialog size="s" no-divider>Longpress content</sp-dialog>
        </sp-popover>
    </sp-overlay>
`;

export const actionGroup = ({ delayed }: Properties): TemplateResult => {
    const popoverOffset = [6, -13] as [number, number];
    return html`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
        </style>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
                <sp-action-menu label="More Actions" placement="left">
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-1@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-1@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            ?delayed=${delayed}
            trigger="trigger-3@hover"
            type="hint"
            open
        >
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `;
};

export const actionGroupWithFilters = ({
    delayed,
}: Properties): TemplateResult => {
    const popoverOffset = [6, -13] as [number, number];
    return html`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
                overflow: hidden;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
            sp-action-button,
            sp-action-menu {
                background-image: linear-gradient(
                    rgba(125, 125, 125, 0.2),
                    rgba(125, 125, 125, 0.2)
                );
                background-blend-mode: multiply;
                filter: brightness(1) saturate(1);
            }
        </style>
        <p>
            This story outlines some CSS usage that is not yet covered by the
            placement calculations within the Overlay API.
        </p>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                    <sp-overlay
                        trigger="trigger-1@longpress"
                        type="auto"
                        placement="right-start"
                        .offset=${popoverOffset}
                    >
                        <sp-popover tip>
                            <sp-action-group vertical quiet>
                                <sp-action-button>
                                    <sp-icon-anchor-select
                                        slot="icon"
                                    ></sp-icon-anchor-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-polygon-select
                                        slot="icon"
                                    ></sp-icon-polygon-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-rect-select
                                        slot="icon"
                                    ></sp-icon-rect-select>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </sp-overlay>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-menu label="More Actions">
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `;
};

// Test #3795 in browser
export const transientHover = (): TemplateResult => html`
    <transient-hover></transient-hover>
`;
transientHover.swc_vrt = {
    skip: true,
};

transientHover.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const lazyElements = (): TemplateResult => {
    const handleSlottableRequest = (event: SlottableRequestEvent): void => {
        const template =
            event.data === removeSlottableRequest
                ? undefined
                : html`
                      <sp-popover>
                          <sp-dialog no-divider>
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
                              <sp-button>
                                  Press Me
                                  <sp-tooltip self-managed delayed>
                                      Click to open another popover.
                                  </sp-tooltip>
                              </sp-button>
                          </sp-dialog>
                      </sp-popover>
                  `;
        render(template, event.target as HTMLElement);
    };
    return html`
        <sp-button id="button">Trigger</sp-button>
        <sp-overlay
            placement="bottom"
            type="auto"
            trigger="button@click"
            @slottable-request=${handleSlottableRequest}
        ></sp-overlay>
    `;
};

lazyElements.swc_vrt = {
    skip: true,
};

lazyElements.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const nestedModalOverlays = (): TemplateResult => html`
    <div style="padding: 20px;">
        <sp-button id="outerTrigger" variant="primary">
            Open Outer Modal
        </sp-button>

        <sp-overlay
            id="outerOverlay"
            type="auto"
            .triggerInteraction=${'click'}
            trigger="outerTrigger@click"
        >
            <sp-popover>
                <sp-dialog>
                    <p>
                        This is the outer modal content. Press ESC to close it.
                    </p>
                    <sp-button id="innerTrigger" variant="primary">
                        Open Inner Modal
                    </sp-button>
                    <sp-overlay
                        id="innerOverlay"
                        type="auto"
                        .triggerInteraction=${'click'}
                        trigger="innerTrigger@click"
                    >
                        <sp-popover>
                            <sp-dialog>
                                <p>
                                    This is the inner modal content. Press ESC
                                    to close this first, then the outer modal.
                                </p>
                            </sp-dialog>
                        </sp-popover>
                    </sp-overlay>
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`;

nestedModalOverlays.swc_vrt = {
    skip: true,
};

nestedModalOverlays.parameters = {
    chromatic: { disableSnapshot: true },
};
