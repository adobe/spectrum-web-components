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
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { html, nothing, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
// Import Overlay type for type casting
import type { Overlay } from '@spectrum-web-components/overlay';

const iconOptions: {
    [key: string]: ({
        width,
        height,
        hidden,
        title,
    }?: {
        width?: number;
        height?: number;
        hidden?: boolean;
        title?: string;
    }) => TemplateResult | string;
} = {
    '': () => html``,
    negative: () => html`
        <sp-icon-alert slot="icon"></sp-icon-alert>
    `,
    positive: () => html`
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    `,
    info: () => html`
        <sp-icon-info slot="icon"></sp-icon-info>
    `,
};

export default {
    component: 'sp-tooltip',
    title: 'Tooltip',
};

interface Properties {
    delayed?: boolean;
    disabled?: boolean;
    open?: boolean;
    placement?: Placement;
    variant?: string;
    text?: string;
    offset?: number;
}

export const Default = ({
    open,
    placement,
    variant,
    text,
}: Properties): TemplateResult => {
    return html`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${text}
        </sp-tooltip>
    `;
};
Default.args = {
    open: true,
    placement: 'top',
    variant: '',
    text: 'Tooltip',
};
Default.argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the tooltip is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description: 'The placement of the tooltip in relation to its parent',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'top' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
        },
    },
    text: {
        name: 'text',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        description: 'The style of the tooltip.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['info', 'positive', 'negative', ''],
        },
    },
};

export const wIcon = ({
    open,
    placement,
    variant,
    text,
}: Properties): TemplateResult => {
    return html`
        <sp-tooltip ?open=${open} placement=${placement} variant=${variant}>
            ${!!variant ? iconOptions[variant]() : nothing} ${text}
        </sp-tooltip>
    `;
};
wIcon.args = {
    open: true,
    placement: 'top',
    text: 'Tooltip',
    variant: 'negative',
};
wIcon.argTypes = {
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the tooltip is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description: 'The placement of the tooltip in relation to its parent',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'top' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
        },
    },
    text: {
        name: 'text',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: 'text',
    },
    variant: {
        name: 'variant',
        type: { name: 'string', required: false },
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: '' },
        },
        control: {
            type: 'inline-radio',
            options: ['info', 'positive', 'negative', ''],
        },
    },
};

const overlayStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator > div {
            display: contents;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            gap: 24px;
        }

        sp-button:nth-of-type(1) {
            margin-top: 24px;
        }
    </style>
`;

const overlaid = (openPlacement: Placement): TemplateResult => {
    return html`
        ${overlayStyles}
        ${(
            [
                ['bottom', ''],
                ['left', 'negative'],
                ['right', 'positive'],
                ['top', 'info'],
                ['top-start', ''],
            ] as [Placement, string][]
        ).map(([placement, variant]) => {
            return html`
                <sp-button id="trigger-${placement}" label="${placement} test">
                    Hover for ${variant ? variant : 'tooltip'} on the
                    ${placement}
                </sp-button>
                <sp-overlay
                    trigger="trigger-${placement}@hover"
                    type="hint"
                    placement=${placement}
                    open=${ifDefined(
                        openPlacement === placement ? 'hover' : undefined
                    )}
                >
                    <sp-tooltip variant=${variant} placement=${placement}>
                        ${placement}
                    </sp-tooltip>
                </sp-overlay>
            `;
        })}
    `;
};

export const overlaidTop = (): TemplateResult => overlaid('top');
export const overlaidRight = (): TemplateResult => overlaid('right');
export const overlaidBottom = (): TemplateResult => overlaid('bottom');
export const overlaidLeft = (): TemplateResult => overlaid('left');
export const overlaidTopStart = (): TemplateResult => overlaid('top-start');

export const selfManaged = ({
    placement,
    open,
    offset,
    delayed,
    disabled,
}: Properties): TemplateResult => html`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        This is a button.
        <sp-tooltip
            self-managed
            placement=${placement}
            offset=${offset}
            ?delayed=${delayed}
            ?disabled=${disabled}
            ?open=${open}
        >
            Add paragraph text by dragging the Text tool on the canvas to use
            this feature
        </sp-tooltip>
    </sp-action-button>
`;
selfManaged.args = {
    placement: 'top',
    open: true,
    offset: 6,
    delayed: false,
    disabled: false,
};
selfManaged.argTypes = {
    delayed: {
        name: 'delayed',
        type: { name: 'boolean', required: false },
        description: 'Whether to manage the tooltip with the warmup timer',
    },
    disabled: {
        name: 'disabled',
        type: { name: 'boolean', required: false },
        description: 'Whether the Tooltip is active and can be displayed',
    },
    offset: {
        name: 'offset',
        type: { name: 'number', required: false },
        description:
            'The pixel distance from the parent element to place the tooltip',
    },
    open: {
        name: 'open',
        type: { name: 'boolean', required: false },
        description: 'Whether the tooltip is open.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: false },
        },
        control: {
            type: 'boolean',
        },
    },
    placement: {
        name: 'placement',
        type: { name: 'string', required: false },
        description: 'The placement of the tooltip in relation to its parent',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'top' },
        },
        control: {
            type: 'inline-radio',
            options: [
                'auto',
                'auto-start',
                'auto-end',
                'top',
                'bottom',
                'right',
                'left',
                'top-start',
                'top-end',
                'bottom-start',
                'bottom-end',
                'right-start',
                'right-end',
                'left-start',
                'left-end',
                'none',
            ],
        },
    },
};

export const selfManagedIconOnly = (): TemplateResult => html`
    ${overlayStyles}
    <sp-action-button class="self-managed">
        <sp-icon-edit slot="icon"></sp-icon-edit>
        <sp-tooltip self-managed>This is a tooltip.</sp-tooltip>
    </sp-action-button>
    <hr />

    <sp-action-button class="self-managed">
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
`;

export const selfManagedFieldLabel = (): TemplateResult => html`
    <div style="display: inline-flex; flex-direction: column;">
        <sp-field-label for="input">
            <sp-icon-edit></sp-icon-edit>
            <sp-tooltip self-managed>Edit</sp-tooltip>
        </sp-field-label>
        <sp-textfield id="input"></sp-textfield>
    </div>
`;

export const draggable = (): TemplateResult => {
    const handleDragStart = (event: DragEvent): void => {
        event.dataTransfer?.setDragImage(
            event.target as HTMLElement,
            event.offsetX,
            event.offsetY
        );
    };
    return html`
        <sp-button>
            A simple button that should not be included in the DragImage
        </sp-button>
        <div
            draggable="true"
            id="draggableElement"
            @dragstart=${handleDragStart}
            style="margin-top: 16px; cursor: move; padding: 24px; border: red 1px solid;"
        >
            <p>Click and drag me to show DragImage</p>
            <sp-action-button>
                Action Button with self managed tooltip
                <sp-tooltip self-managed placement="bottom">
                    My Tooltip
                </sp-tooltip>
            </sp-action-button>
        </div>
    `;
};

draggable.swc_vrt = {
    skip: true,
};

draggable.parameters = {
    // Disables Chromatic's snapshotting on a global level
    chromatic: { disableSnapshot: true },
};

export const DelayedTooltipWithOverlay = (): TemplateResult => {
    return html`
        <div
            style="width: 100%; max-width: 800px; margin: 0 auto; padding: 20px;"
        >
            <h2>Delayed Tooltip Overlay Interaction Issue</h2>

            <div style="display: flex; gap: 24px; margin-bottom: 24px;">
                <!-- First overlay - this should stay open during tooltip warmup -->
                <sp-button variant="primary" id="button1">
                    Click to Open Popover
                </sp-button>
                <sp-overlay
                    trigger="button1@click"
                    placement="bottom"
                    id="popover-overlay"
                >
                    <sp-popover>
                        <div style="padding: 20px;">
                            <h3 style="margin-top: 0;">Opened Popover</h3>
                            <p>
                                This popover should stay open during tooltip
                                warmup
                            </p>
                            <p>
                                <strong>Steps to test:</strong>
                                With this popover open, hover the button to the
                                right.
                            </p>
                        </div>
                    </sp-popover>
                </sp-overlay>

                <overlay-trigger triggered-by="hover">
                    <sp-button
                        slot="trigger"
                        variant="secondary"
                        @pointerenter=${(event: Event) => {
                            // Capture phase event handler to stop propagation during warmup
                            // This ensures other overlays don't close prematurely
                            event.stopPropagation();
                        }}
                    >
                        Hover me
                    </sp-button>
                    <sp-tooltip
                        slot="hover-content"
                        delayed
                        placement="bottom"
                        @sp-opened=${() => {
                            const popoverOverlay = document.getElementById(
                                'popover-overlay'
                            ) as Overlay;
                            if (
                                popoverOverlay &&
                                popoverOverlay.hasAttribute('open')
                            ) {
                                popoverOverlay.open = false;
                            }
                        }}
                    >
                        This is a delayed tooltip
                    </sp-tooltip>
                </overlay-trigger>
            </div>

            <div
                style="border: 1px solid #ccc; padding: 20px; border-radius: 4px; background-color: #f5f5f5;"
            >
                <h3 style="margin-top: 0;">Expected Behavior</h3>
                <ol style="margin-left: 16px;">
                    <li>
                        Click the
                        <strong>Click to Open Popover</strong>
                        button to open the popover
                    </li>
                    <li>
                        Hover over the
                        <strong>Hover me</strong>
                        button
                    </li>
                    <li>
                        The popover should
                        <strong>remain open</strong>
                        during the tooltip's 1-second warmup period
                    </li>
                    <li>
                        The popover should
                        <strong>automatically close</strong>
                        when the tooltip appears in DOM
                    </li>
                </ol>
            </div>
        </div>
    `;
};
