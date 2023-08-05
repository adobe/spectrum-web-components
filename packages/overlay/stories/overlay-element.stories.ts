/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-anchor-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-polygon-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-rect-select.js';
import { Placement } from '@floating-ui/dom';
import { OverlayTypes } from '../src/overlay-types.js';
import { notAgain } from '../../dialog/stories/dialog-base.stories.js';

export default {
    title: 'Overlay Element',
    component: 'sp-overlay',
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

type Properties = {
    delayed: boolean;
    interaction: 'click' | 'hover' | 'longpress';
    open?: boolean;
    placement?: Placement;
    type?: OverlayTypes;
};

const Template = ({
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
        offset="-10"
    >
        <sp-popover dialog>
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
        </sp-popover>
    </sp-overlay>
`;

export const modal = (args: Properties): TemplateResult => Template(args);
modal.args = {
    interaction: 'click',
    placement: 'right',
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

export const click = (args: Properties): TemplateResult => Template(args);
click.args = {
    interaction: 'click',
    placement: 'right',
    type: 'auto',
};

export const hover = (args: Properties): TemplateResult => Template(args);
hover.args = {
    interaction: 'hover',
    placement: 'right',
};

export const longpress = (args: Properties): TemplateResult => Template(args);
longpress.args = {
    interaction: 'longpress',
    placement: 'right',
    type: 'auto',
};

export const all = ({ delayed }: Properties): TemplateResult => html`
    <sp-action-button id="trigger" hold-affordance>
        Open the overlay
    </sp-action-button>
    <sp-overlay trigger="trigger@click" type="auto" placement="right">
        <sp-popover dialog>Click content</sp-popover>
    </sp-overlay>
    <sp-overlay ?delayed=${delayed} trigger="trigger@hover">
        <sp-tooltip>Hover content</sp-tooltip>
    </sp-overlay>
    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">
        <sp-popover dialog>Longpress content</sp-popover>
    </sp-overlay>
`;

export const actionGroup = ({ delayed }: Properties): TemplateResult => {
    const popoverOffset = [6, -13] as [number, number];
    return html`
        <style>
            sp-popover sp-action-group {
                padding: var(--spectrum-actiongroup-vertical-spacing-regular);
            }
            .root {
                inset-inline-end: 3em;
                inset-block-start: 3em;
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
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-1@hover">
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
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover">
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
        <sp-overlay ?delayed=${delayed} trigger="trigger-3@hover" open>
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
