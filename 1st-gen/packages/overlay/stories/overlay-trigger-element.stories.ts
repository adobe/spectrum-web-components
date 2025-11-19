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
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/button/sp-button.js';
import { DialogWrapper } from '@spectrum-web-components/dialog';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import {
    openOverlay,
    Placement,
    TriggerInteractions,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/picker/sp-picker.js';
import { Popover } from '@spectrum-web-components/popover';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { render } from 'lit-html';

export default {
    title: 'Overlay/API Reference/overlay-trigger',
    component: 'overlay-trigger',
    parameters: {
        docs: {
            description: {
                component:
                    'The `<overlay-trigger>` element enables multiple interaction types (hover + click) on the same trigger element. Use this when you need different content for different interactions, like a tooltip on hover and a popover on click.',
            },
        },
    },
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
    },
    args: {
        placement: 'bottom',
        offset: 0,
    },
};

interface Properties {
    placement: Placement;
    offset: number;
    open?: string;
    type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;
}

// ====================
// BASIC USAGE
// ====================

/**
 * Hover and click - multiple interactions on one trigger
 *
 * **Use case:** Button with tooltip on hover and popover on click
 *
 * **Key features:**
 * - triggered-by="hover click" enables both interactions
 * - Different content for each interaction type
 * - Single overlay-trigger element wraps trigger and content
 * - Automatic lifecycle management
 *
 * 📖 [overlay-trigger Documentation](./overlay-trigger.md)
 */
export const HoverAndClick = ({
    placement,
    offset,
    open,
    type,
}: Properties): TemplateResult => {
    return html`
        <style>
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
        <overlay-trigger
            triggered-by="click hover"
            id="trigger"
            placement="${placement}"
            offset="${offset}"
            open=${ifDefined(
                open as 'click' | 'hover' | 'longpress' | undefined
            )}
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

HoverAndClick.parameters = {
    docs: {
        description: {
            story: 'Basic overlay-trigger example with both hover tooltip and click popover on the same trigger. Demonstrates nested triggers and interactive content.',
        },
    },
};

/**
 * Click only - simple click interaction
 *
 * **Use case:** Single click interaction without hover tooltip
 *
 * **Key features:**
 * - triggered-by="click" for click-only interaction
 * - Simpler than multiple interactions
 * - Good for dropdowns and action menus
 *
 * 📖 [overlay-trigger Documentation](./overlay-trigger.md)
 */
export const ClickOnly = (): TemplateResult => {
    return html`
        <overlay-trigger type="modal" triggered-by="click">
            <sp-button variant="primary" slot="trigger">Open Menu</sp-button>
            <sp-popover slot="click-content" placement="bottom" tip>
                <sp-dialog size="s" no-divider>
                    <p>This opens on click only</p>
                    <p>No tooltip on hover</p>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

ClickOnly.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: "Simple click-only interaction. Use when you don't need a hover tooltip.",
        },
    },
};

/**
 * Hover only - tooltip interaction
 *
 * **Use case:** Simple tooltip without click behavior
 *
 * **Key features:**
 * - triggered-by="hover" for hover-only interaction
 * - Perfect for icon labels and help text
 * - Uses sp-tooltip component
 *
 * 📖 [Tooltip Component](../../tooltip/README.md)
 */
export const HoverOnly = (): TemplateResult => {
    return html`
        <overlay-trigger placement="top" triggered-by="hover">
            <sp-action-button slot="trigger">
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-tooltip slot="hover-content" delayed>Search</sp-tooltip>
        </overlay-trigger>
    `;
};

HoverOnly.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Simple hover-only tooltip. Common pattern for icon buttons and toolbar actions.',
        },
    },
};

/**
 * Longpress - advanced options on long press
 *
 * **Use case:** Advanced options revealed on 300ms hold (mobile-friendly)
 *
 * **Key features:**
 * - hold-affordance attribute shows visual indicator
 * - Works with touch, mouse, and keyboard (Space or Alt+Down)
 * - Automatically adds aria-describedby for accessibility
 * - Useful for tool palettes and action groups
 *
 * 📖 [LongpressController Documentation](./ARCHITECTURE.md#longpresscontroller)
 */
export const Longpress = (): TemplateResult => {
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

Longpress.parameters = {
    docs: {
        description: {
            story: 'Longpress gesture opens additional options after 300ms hold. Mobile-friendly and keyboard accessible.',
        },
    },
};

// ====================
// ADVANCED PATTERNS
// ====================

/**
 * Context menu pattern - right-click menu at cursor
 *
 * **Use case:** Position overlay at specific coordinates (e.g., right-click menu)
 *
 * **Key features:**
 * - VirtualTrigger positions at clientX/clientY coordinates
 * - Imperative API (openOverlay) for dynamic creation
 * - notImmediatelyClosable prevents instant dismiss from mouseup
 * - Perfect for context menus
 *
 * 📖 [Imperative API - VirtualTrigger](./imperative-api.md#virtualtrigger-patterns)
 */
export const ContextMenuPattern = (args: Properties): TemplateResult => {
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
            .context-area {
                display: grid;
                grid-template-columns: 1fr 1fr;
                height: 100%;
            }
            .context-area > div {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px;
                border: 2px dashed var(--spectrum-gray-400);
                background: var(--spectrum-gray-100);
            }
        </style>
        <div class="app-root">
            <div class="context-area">
                <div
                    id="start"
                    @contextmenu=${{
                        capture: true,
                        handleEvent: handleContextmenu,
                    }}
                >
                    <p>Right-click here for "start" menu</p>
                </div>
                <div
                    id="end"
                    @contextmenu=${{
                        capture: true,
                        handleEvent: handleContextmenu,
                    }}
                >
                    <p>Right-click here for "end" menu</p>
                </div>
            </div>
        </div>
    `;
};

ContextMenuPattern.args = {
    placement: 'right-start' as Placement,
};

ContextMenuPattern.parameters = {
    docs: {
        description: {
            story: 'Context menu positioned at cursor coordinates using VirtualTrigger. Right-click in either area to see different menus.',
        },
    },
};

/**
 * Nested triggers - overlays within overlays
 *
 * **Use case:** Complex nested overlay scenarios
 *
 * **Key features:**
 * - Proper stacking and z-index management
 * - Focus management across overlay stack
 * - ESC key closes innermost overlay first
 * - Self-managed tooltips within overlays
 *
 * 📖 [Advanced Patterns](./README.md#nested-overlays)
 */
export const NestedTriggers = (): TemplateResult => html`
    <overlay-trigger triggered-by="click">
        <sp-button variant="primary" slot="trigger">Open popover</sp-button>
        <sp-popover slot="click-content" placement="bottom" tip>
            <sp-dialog no-divider>
                <p>Let us open another overlay here</p>
                <overlay-trigger triggered-by="click">
                    <sp-button variant="primary" slot="trigger">
                        Open sub popover
                    </sp-button>
                    <sp-popover slot="click-content" placement="bottom" tip>
                        <sp-dialog no-divider>
                            <p>
                                Render an action button with tooltips. Clicking
                                the action button shouldn't close everything
                            </p>
                            <sp-action-button>
                                Button with self-managed tooltip
                                <sp-tooltip self-managed placement="top">
                                    Deep Child ToolTip
                                </sp-tooltip>
                            </sp-action-button>
                            <sp-action-button>Just a button</sp-action-button>
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
            </sp-dialog>
        </sp-popover>
    </overlay-trigger>
`;

NestedTriggers.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Nested overlay-trigger elements with proper stacking. Includes self-managed tooltips within nested popovers.',
        },
    },
};

/**
 * Hover with interactive content
 *
 * **Use case:** Hover tooltips with focusable interactive elements
 *
 * **Key features:**
 * - 300ms hover delay before close
 * - Mouse can move into overlay content
 * - Tab navigation supported
 * - Escape key closes overlay
 *
 * 📖 [HoverController Documentation](./ARCHITECTURE.md#hovercontroller)
 */
export const HoverWithInteractiveContent = (): TemplateResult => {
    return html`
        <div
            style="display: flex; gap: 20px; flex-direction: column; padding: 40px;"
        >
            <overlay-trigger triggered-by="hover" placement="right">
                <sp-button slot="trigger">
                    Hover for interactive buttons
                </sp-button>
                <sp-popover slot="hover-content" tip>
                    <sp-dialog size="s" no-divider>
                        <h3 style="margin-top: 0;">Interactive content</h3>
                        <p>Tab into these buttons:</p>
                        <div
                            style="display: flex; gap: 8px; flex-direction: column;"
                        >
                            <sp-button>Action 1</sp-button>
                            <sp-button>Action 2</sp-button>
                            <sp-button>Action 3</sp-button>
                        </div>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>

            <overlay-trigger triggered-by="hover" placement="right">
                <sp-button slot="trigger">
                    Hover for interactive links
                </sp-button>
                <sp-popover slot="hover-content" tip>
                    <sp-dialog size="s" no-divider>
                        <h3 style="margin-top: 0;">Quick links</h3>
                        <ul>
                            <li>
                                <sp-link href="#example1">
                                    Example link 1
                                </sp-link>
                            </li>
                            <li>
                                <sp-link href="#example2">
                                    Example link 2
                                </sp-link>
                            </li>
                            <li>
                                <sp-link href="#example3">
                                    Example link 3
                                </sp-link>
                            </li>
                        </ul>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </div>
    `;
};

HoverWithInteractiveContent.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Hover overlay with interactive content like buttons and links. Content remains open as user moves mouse into overlay.',
        },
    },
};

/**
 * Triggered-by optimization
 *
 * **Performance feature:** Only requested interaction controllers are initialized
 *
 * **Key benefits:**
 * - Reduced memory footprint
 * - Fewer event listeners
 * - Faster initialization
 * - Prevents race conditions
 *
 * 📖 [Performance Guide](./PERFORMANCE.md#triggered-by-optimization)
 */
export const TriggeredByOptimization = (): TemplateResult => {
    return html`
        <h2>triggered-by attribute optimization</h2>
        <p>
            This demo shows different ways to trigger overlays using the
            <code>triggered-by</code>
            attribute.
        </p>
        <p>
            <strong>Pro tip:</strong>
            Inspect the DOM to verify that only the respective overlay elements
            are being rendered into the DOM based on the
            <code>triggered-by</code>
            value.
        </p>
        <p>
            Unused interaction types aren't rendered. This improves performance,
            reduces the number of unnecessary DOM nodes and avoids race
            conditions in slot reparenting.
        </p>
        <div style="display: flex; gap: 20px; flex-direction: column;">
            <!-- Click and hover only -->
            <overlay-trigger triggered-by="click hover">
                <sp-button slot="trigger">Click and hover trigger</sp-button>
                <sp-popover slot="click-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Click content</sp-dialog>
                </sp-popover>
                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
            </overlay-trigger>

            <!-- Longpress only -->
            <overlay-trigger triggered-by="longpress">
                <sp-button slot="trigger">Longpress trigger</sp-button>
                <sp-popover slot="longpress-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Longpress content</sp-dialog>
                </sp-popover>
                <div slot="longpress-describedby-descriptor">
                    Press and hold to reveal more options
                </div>
            </overlay-trigger>

            <!-- Click only -->
            <overlay-trigger triggered-by="click">
                <sp-button slot="trigger">Click only trigger</sp-button>
                <sp-popover slot="click-content" direction="right" tip>
                    <sp-dialog size="s" no-divider>Click content</sp-dialog>
                </sp-popover>
            </overlay-trigger>

            <!-- Hover only -->
            <overlay-trigger triggered-by="hover">
                <sp-button slot="trigger">Hover only trigger</sp-button>
                <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
            </overlay-trigger>
        </div>
    `;
};

TriggeredByOptimization.parameters = {
    docs: {
        description: {
            story: 'Demonstrates how triggered-by optimizes DOM by only rendering needed interaction types. Inspect DOM to see the difference.',
        },
    },
};

// ====================
// MODAL PATTERNS
// ====================

/**
 * Modal with picker - complex modal content
 *
 * **Use case:** Modal dialog containing a picker component
 *
 * **Key features:**
 * - Proper z-index stacking for nested overlays
 * - Picker overlay doesn't close dialog
 * - Focus management between modal and picker
 *
 * 📖 [Integration Examples](./README.md#complex-modals)
 */
export const ModalWithPicker = (): TemplateResult => {
    return html`
        <style>
            body {
                --swc-margin-test: 10px;
                margin: var(--swc-margin-test);
            }
            sp-story-decorator::part(container) {
                min-height: calc(100vh - (2 * var(--swc-margin-test)));
                padding: 0;
                display: grid;
                place-content: center;
            }
        </style>
        <overlay-trigger type="modal" triggered-by="click">
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                dismissable
                underlay
                footer="Content for footer"
            >
                <sp-field-label for="test-picker">
                    Selection type:
                </sp-field-label>
                <sp-picker id="test-picker">
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-picker>
            </sp-dialog-wrapper>
            <sp-button slot="trigger" variant="primary">
                Toggle Dialog
            </sp-button>
        </overlay-trigger>
    `;
};

ModalWithPicker.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Modal dialog containing a picker component. Demonstrates proper overlay stacking and focus management.',
        },
    },
};

/**
 * Managed dialog buttons - dialog wrapper with events
 *
 * **Use case:** Modal dialog with managed action buttons
 *
 * **Key features:**
 * - sp-dialog-wrapper provides confirm/cancel/secondary buttons
 * - Events for button clicks (@confirm, @cancel, @secondary)
 * - Automatic underlay and dismissable behavior
 *
 * 📖 [Dialog Integration](./FORMS-INTEGRATION.md#dialog-patterns)
 */
export const ManagedDialogButtons = (): TemplateResult => {
    const closeEvent = new Event('close', { bubbles: true, composed: true });
    return html`
        <overlay-trigger type="modal" triggered-by="click">
            <sp-button slot="trigger">Open</sp-button>
            <sp-dialog-wrapper
                underlay
                slot="click-content"
                headline="Wrapped Dialog w/ Hero Image"
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
            >
                <p>
                    The
                    <code>sp-dialog-wrapper</code>
                    element has been prepared for use in an
                    <code>overlay-trigger</code>
                    element by its combination of modal, underlay, etc. styles
                    and features.
                </p>
            </sp-dialog-wrapper>
        </overlay-trigger>
        <p style="margin-top: 20px;">This is some text after the trigger.</p>
    `;
};

ManagedDialogButtons.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Dialog wrapper with managed action buttons and events. Use for confirmation dialogs and form submissions.',
        },
    },
};

/**
 * Nested modal types - modal within non-modal
 *
 * **Use case:** Modal overlay opened from inline/auto overlay
 *
 * **Key features:**
 * - Proper stacking of different overlay types
 * - Modal can be opened from non-modal overlay
 * - Focus management across different overlay types
 *
 * 📖 [Advanced Patterns](./README.md#nested-overlay-types)
 */
export const NestedModalTypes = (): TemplateResult => {
    return html`
        <overlay-trigger type="auto" triggered-by="click">
            <sp-button variant="primary" slot="trigger">
                Open inline overlay
            </sp-button>
            <sp-popover slot="click-content">
                <sp-dialog size="s" no-divider>
                    <overlay-trigger type="modal" triggered-by="click">
                        <sp-button variant="primary" slot="trigger">
                            Open modal overlay
                        </sp-button>
                        <sp-popover slot="click-content">
                            <sp-dialog size="s" no-divider>
                                Modal overlay
                            </sp-dialog>
                        </sp-popover>
                    </overlay-trigger>
                </sp-dialog>
            </sp-popover>
        </overlay-trigger>
    `;
};

NestedModalTypes.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates nesting different overlay types. Modal overlay can be opened from inline/auto overlays.',
        },
    },
};
