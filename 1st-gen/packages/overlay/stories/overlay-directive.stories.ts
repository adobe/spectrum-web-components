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
import {
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    OverlayContentTypes,
    OverlayOpenCloseDetail,
    Placement,
    TriggerInteractions,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-open-in.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import {
    InsertionOptions,
    trigger,
} from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';

import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '../../../projects/story-decorator/src/types.js';

import './overlay-story-components.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { state } from '@spectrum-web-components/base/src/decorators.js';
import { cache } from 'lit/directives/cache.js';

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

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;

export default {
    title: 'Overlay Directive',
    argTypes: {
        offset: { control: 'number' },
        placement: {
            control: {
                type: 'inline-radio',
                options: [
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
            },
        },
        type: {
            control: {
                type: 'inline-radio',
                options: ['modal', 'replace', 'inline'],
            },
        },
        colorStop: {
            control: {
                type: 'inline-radio',
                options: ['light', 'dark'],
            },
        },
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
    },
    args: {
        placement: 'bottom',
        offset: 0,
        colorStop: 'light',
        triggerOn: 'click',
        open: false,
    },
};

interface Properties {
    placement?: Placement;
    offset?: number;
    triggerOn?: OverlayContentTypes;
    type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;
    insertionOptions?: InsertionOptions;
    open?: boolean;
}

const template = ({
    placement,
    offset,
    open,
    triggerOn,
    insertionOptions,
}: Properties): TemplateResult => {
    const renderTooltip = (): TemplateResult => html`
        Click to open a popover.
    `;
    const renderPopover = (): TemplateResult => html`
        <sp-popover placement="${ifDefined(placement)}" tip>
            <sp-dialog no-divider>
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
                    <sp-button
                        ${tooltip(
                            () => html`
                                Click to open another popover.
                            `
                        )}
                        ${trigger(
                            () => html`
                                <sp-popover placement="bottom" tip open>
                                    <sp-dialog size="s" no-divider>
                                        <div class="options-popover-content">
                                            Another Popover
                                        </div>
                                    </sp-dialog>
                                </sp-popover>
                            `,
                            {
                                triggerInteraction: 'click',
                                overlayOptions: {
                                    placement: 'bottom',
                                },
                            }
                        )}
                    >
                        Press Me
                    </sp-button>
                </div>
            </sp-dialog>
        </sp-popover>
    `;
    return html`
        ${storyStyles}
        <sp-button
            variant="primary"
            ${tooltip(renderTooltip)}
            ${trigger(renderPopover, {
                open,
                triggerInteraction: triggerOn,
                overlayOptions: {
                    placement,
                    offset,
                },
                insertionOptions: insertionOptions,
            })}
        >
            Show Popover
        </sp-button>
    `;
};

export const Default = ({ open }: Properties = {}): TemplateResult => {
    const renderPopover = (): TemplateResult => html`
        <sp-popover>
            <sp-dialog no-divider>Popover content goes here</sp-dialog>
        </sp-popover>
    `;
    const options = typeof open !== 'undefined' ? { open } : undefined;
    return html`
        <sp-button ${trigger(renderPopover, options)}>Open Popover</sp-button>
    `;
};

Default.swc_vrt = {
    skip: true,
};

Default.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const configured = (args: Properties): TemplateResult => template(args);

configured.swc_vrt = {
    skip: true,
};

configured.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const insertionOptions = (args: Properties = {}): TemplateResult => html`
    ${template(args)}
    <div id="other-element"></div>
`;

insertionOptions.args = {
    insertionOptions: {
        el: () => document.querySelector('#other-element'),
        where: 'afterbegin',
    },
} as Properties;

insertionOptions.swc_vrt = {
    skip: true,
};

insertionOptions.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

class ManagedOverlayTrigger extends LitElement {
    @state()
    private quickActionsEnabled = false;

    @state()
    private isMenuOpen = false;

    protected override render(): TemplateResult {
        return html`
            <div
                style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
            >
                <sp-field-label for="quick-actions-toggle">
                    Enable quick actions toolbar
                </sp-field-label>
                <sp-switch
                    id="quick-actions-toggle"
                    ?checked=${this.quickActionsEnabled}
                    @change=${() => {
                        this.quickActionsEnabled = !this.quickActionsEnabled;
                    }}
                >
                    ${this.quickActionsEnabled ? 'Enabled' : 'Disabled'}
                </sp-switch>

                <p
                    style="max-width: 600px; color: var(--spectrum-neutral-content-color-default); font-size: 14px; margin: 0;"
                >
                    The quick actions button below is wrapped with Lit's
                    <code>cache()</code>
                    directive, which preserves the DOM and component state when
                    toggled off instead of destroying it. This tests that the
                    overlay trigger properly handles reconnection without
                    errors.
                </p>

                ${cache(
                    this.quickActionsEnabled
                        ? this.renderQuickActionsButton()
                        : html``
                )}
            </div>
        `;
    }

    private renderQuickActionsButton(): TemplateResult {
        return html`
            <sp-action-button
                ?selected=${this.isMenuOpen}
                ${trigger(
                    () => html`
                        <sp-popover
                            @sp-opened=${(
                                event: CustomEvent<OverlayOpenCloseDetail>
                            ) => {
                                if (event.target !== event.currentTarget) {
                                    return;
                                }
                                this.isMenuOpen = true;
                            }}
                            @sp-closed=${(
                                event: CustomEvent<OverlayOpenCloseDetail>
                            ) => {
                                if (event.target !== event.currentTarget) {
                                    return;
                                }
                                this.isMenuOpen = false;
                            }}
                        >
                            <sp-menu>
                                <sp-menu-item>Copy</sp-menu-item>
                                <sp-menu-item>Paste</sp-menu-item>
                                <sp-menu-divider></sp-menu-divider>
                                <sp-menu-item>Delete</sp-menu-item>
                            </sp-menu>
                        </sp-popover>
                    `,
                    {
                        triggerInteraction: 'click',
                        overlayOptions: { placement: 'bottom-end' },
                        open: this.isMenuOpen,
                    }
                )}
            >
                Quick Actions
            </sp-action-button>
        `;
    }
}

customElements.define('managed-overlay-trigger', ManagedOverlayTrigger);

export const managedOverlayTrigger = (): TemplateResult => html`
    <managed-overlay-trigger></managed-overlay-trigger>
`;

managedOverlayTrigger.swc_vrt = {
    skip: true,
};

managedOverlayTrigger.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};
