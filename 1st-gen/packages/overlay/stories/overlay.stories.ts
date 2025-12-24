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

// Compatibility layer for tests that import from old overlay.stories.js
// This file re-exports stories from the reorganized story files

import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import {
    openOverlay,
    OverlayContentTypes,
    Placement,
    TriggerInteractions,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { render } from 'lit-html';
import './overlay-story-components.js';

export default {
    title: 'Overlay/Legacy/Test Helpers',
    component: 'overlay-trigger',
    // Exclude all stories from Storybook UI - this file only exists for test imports
    includeStories: /^$/,
    parameters: {
        docs: {
            description: {
                component:
                    'Legacy story exports for test compatibility. These stories are maintained for backward compatibility with existing tests. New tests should import from the reorganized story files.',
            },
        },
    },
};

const storyStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
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
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }
    </style>
`;

const definedOverlayDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <defined-overlay-ready></defined-overlay-ready>
    `;
};

type Properties = {
    placement: Placement;
    offset: number;
    open?: OverlayContentTypes;
    type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;
};

const template = ({
    placement,
    offset,
    open,
    type,
}: Properties): TemplateResult => {
    return html`
        ${storyStyles}
        <overlay-trigger
            triggered-by="click hover"
            id="trigger"
            placement="${placement}"
            offset="${offset}"
            open=${ifDefined(open)}
            type=${ifDefined(type)}
        >
            <sp-button variant="primary" slot="trigger">Show Popover</sp-button>
            <sp-popover slot="click-content" placement="${placement}" tip>
                <sp-dialog no-divider>
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                        default-value="10"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger
                        id="inner-trigger"
                        placement="bottom"
                        triggered-by="click hover"
                    >
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover slot="click-content" placement="bottom" tip>
                            <sp-dialog size="s" no-divider>
                                Another Popover
                            </sp-dialog>
                        </sp-popover>

                        <sp-tooltip slot="hover-content" delayed tip="bottom">
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
            <sp-tooltip
                slot="hover-content"
                ?delayed=${open !== 'hover'}
                tip="bottom"
            >
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const Default = (args: Properties): TemplateResult => template(args);

export const accordion = (): TemplateResult => {
    return html`
        <overlay-trigger
            type="modal"
            placement="top-start"
            triggered-by="click"
        >
            <style>
                sp-button {
                    margin-top: 70vh;
                }
            </style>
            <sp-button variant="primary" slot="trigger">
                Open overlay w/ accordion
            </sp-button>
            <sp-popover
                slot="click-content"
                style="overflow-y: scroll;position: static;"
            >
                <sp-dialog size="s" no-divider>
                    <sp-accordion allow-multiple>
                        <sp-accordion-item label="Some things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Other things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="More things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                        <sp-accordion-item label="Additional things">
                            <p>
                                Thing
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                more things
                            </p>
                        </sp-accordion-item>
                    </sp-accordion>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

export const clickAndHoverTarget = (): TemplateResult => {
    return html`
        <overlay-trigger type="modal" triggered-by="click hover">
            <sp-button variant="primary" slot="trigger">Button</sp-button>
            <sp-popover slot="click-content" placement="bottom" tip>
                Popover content
            </sp-popover>
            <sp-tooltip slot="hover-content" placement="right">
                Tooltip content
            </sp-tooltip>
        </overlay-trigger>
    `;
};

export const clickAndHoverTargets = (): TemplateResult => {
    return html`
        <div>
            ${storyStyles}
            <style>
                .friendly-target {
                    padding: 4px;
                    margin: 6px;
                    border: 2px solid black;
                    border-radius: 6px;
                    cursor: default;
                }
            </style>
            <overlay-trigger placement="right" triggered-by="click">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Click me
                </div>
                <sp-tooltip slot="click-content" tip="right">
                    Ok, now hover the other trigger
                </sp-tooltip>
            </overlay-trigger>
            <overlay-trigger placement="left" triggered-by="hover">
                <div class="friendly-target" slot="trigger" tabindex="0">
                    Then hover me
                </div>
                <sp-tooltip slot="hover-content" tip="right">
                    Now click my trigger -- I should stay open, but the other
                    overlay should close
                </sp-tooltip>
            </overlay-trigger>
        </div>
    `;
};

export const deep = (): TemplateResult => html`
    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">
            Open popover 1 with buttons + selfmanaged Tooltips
        </sp-button>
        <sp-popover slot="click-content" placement="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom">
                        My Tooltip 1
                    </sp-tooltip>
                    A
                </sp-action-button>
                <sp-action-button>
                    <sp-tooltip self-managed placement="bottom">
                        My Tooltip 1
                    </sp-tooltip>
                    B
                </sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>

    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">
            Open popover 2 with buttons without ToolTips
        </sp-button>
        <sp-popover slot="click-content" direction="bottom" tip>
            <sp-dialog size="s" no-divider>
                <sp-action-button>X</sp-action-button>
                <sp-action-button>Y</sp-action-button>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;

export const longpress = (): TemplateResult => {
    return html`
        <overlay-trigger triggered-by="longpress" placement="right-start">
            <sp-action-button slot="trigger" hold-affordance>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content">Search real hard...</sp-tooltip>
            <sp-popover slot="longpress-content" tip>
                <sp-action-group
                    @change=${(event: Event & { target: HTMLElement }) =>
                        event.target.dispatchEvent(
                            new Event('close', { bubbles: true })
                        )}
                    selects="single"
                    vertical
                    style="margin: calc(var(--spectrum-actiongroup-button-gap-y,calc(var(--swc-scale-factor) * 10px)) / 2);"
                >
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-magnify slot="icon"></sp-icon-magnify>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </overlay-trigger>
    `;
};

export const definedOverlayElement = (): TemplateResult => {
    return html`
        <overlay-trigger placement="bottom" type="modal" triggered-by="click">
            <sp-button variant="primary" slot="trigger">Open popover</sp-button>
            <sp-popover slot="click-content" placement="bottom">
                <sp-dialog no-divider>
                    <popover-content></popover-content>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

definedOverlayElement.decorators = [definedOverlayDecorator];

export const virtualElementV1 = (args: Properties): TemplateResult => {
    const contextMenuTemplate = (kind = ''): TemplateResult => html`
        <sp-popover
            style="width:300px;"
            @click=${(event: PointerEvent) => {
                if (
                    (event.target as HTMLElement).localName === 'sp-menu-item'
                ) {
                    event.target?.dispatchEvent(
                        new Event('close', { bubbles: true })
                    );
                }
            }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
    const handleContextmenu = async (event: PointerEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        const source = event.composedPath()[0] as HTMLDivElement;
        const { id } = source;
        const trigger = event.target as HTMLElement;
        const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
        const fragment = document.createDocumentFragment();
        render(contextMenuTemplate(id), fragment);
        const popover = fragment.querySelector('sp-popover') as Popover;

        openOverlay(trigger, 'click', popover, {
            placement: args.placement,
            receivesFocus: 'auto',
            virtualTrigger,
            offset: 0,
            notImmediatelyClosable: true,
        });
    };
    return html`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
                capture: true,
                handleEvent: handleContextmenu,
            }}
        ></start-end-contextmenu>
    `;
};

virtualElementV1.args = {
    placement: 'right-start' as Placement,
};

export const virtualElement = (args: Properties): TemplateResult => {
    const contextMenuTemplate = (kind = ''): TemplateResult => html`
        <sp-popover
            style="width:300px;"
            @click=${(event: PointerEvent) => {
                if (
                    (event.target as HTMLElement).localName === 'sp-menu-item'
                ) {
                    event.target?.dispatchEvent(
                        new Event('close', { bubbles: true })
                    );
                }
            }}
        >
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu source: ${kind}</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    `;
    const handleContextmenu = async (event: PointerEvent): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        const source = event.composedPath()[0] as HTMLDivElement;
        const { id } = source;
        const trigger = event.target as HTMLElement;
        const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
        const fragment = document.createDocumentFragment();
        render(contextMenuTemplate(id), fragment);
        const popover = fragment.querySelector('sp-popover') as Popover;

        const overlay = await openOverlay(popover, {
            trigger: virtualTrigger,
            placement: args.placement,
            offset: 0,
            notImmediatelyClosable: true,
            type: 'auto',
        });
        trigger.insertAdjacentElement('afterend', overlay);
    };
    return html`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
        </style>
        <start-end-contextmenu
            class="app-root"
            @contextmenu=${{
                capture: true,
                handleEvent: handleContextmenu,
            }}
        ></start-end-contextmenu>
    `;
};

virtualElement.args = {
    placement: 'right-start' as Placement,
};
