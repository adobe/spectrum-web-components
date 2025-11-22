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
import {
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { state } from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import {
    OverlayContentTypes,
    OverlayOpenCloseDetail,
    Placement,
    TriggerInteractions,
} from '@spectrum-web-components/overlay';
import {
    InsertionOptions,
    trigger,
} from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';

export default {
    title: 'Overlay/API Reference/trigger() directive',
    parameters: {
        docs: {
            description: {
                component:
                    'The `trigger()` directive provides a Lit-specific API for creating overlays with excellent TypeScript support and template-based development. Use this when working with Lit framework for the most ergonomic developer experience.',
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
        open: {
            name: 'open',
            type: { name: 'boolean', required: false },
            description: 'Whether the overlay is initially open.',
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

// ====================
// BASIC USAGE
// ====================

/**
 * Basic popover with trigger directive
 *
 * **Use case:** Simple popover in Lit template
 *
 * **Key features:**
 * - Lit template-based API
 * - Reactive content updates
 * - TypeScript support
 * - Clean, functional syntax
 *
 * 📖 [Trigger Directive Guide](./trigger-directive.md)
 */
export const BasicPopover = ({ open }: Properties = {}): TemplateResult => {
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

BasicPopover.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Basic popover using trigger() directive. Clean, template-based API perfect for Lit projects.',
        },
    },
};

/**
 * Simple tooltip with tooltip directive
 *
 * **Use case:** Quick tooltip in Lit template
 *
 * **Key features:**
 * - Specialized tooltip() directive
 * - Even simpler than trigger()
 * - Automatic hover behavior
 * - Perfect for icon buttons
 *
 * 📖 [Tooltip Directive Guide](../../tooltip/README.md#directive)
 */
export const SimpleTooltip = (): TemplateResult => {
    return html`
        <sp-action-button
            ${tooltip(
                () => html`
                    Save your changes (⌘S)
                `
            )}
        >
            Save
        </sp-action-button>
    `;
};

SimpleTooltip.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Simple tooltip using the specialized tooltip() directive. Cleaner than trigger() for simple tooltips.',
        },
    },
};

/**
 * With configuration options
 *
 * **Use case:** Configure placement, offset, and interaction types
 *
 * **Key features:**
 * - overlayOptions for placement, offset, type
 * - triggerInteraction for click/hover/longpress
 * - open property for programmatic control
 * - Full TypeScript autocomplete
 *
 * 📖 [Trigger Directive Configuration](./trigger-directive.md#options)
 */
export const WithConfiguration = ({
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
                <sp-slider
                    value="5"
                    step="0.5"
                    min="0"
                    max="20"
                    label="Awesomeness"
                ></sp-slider>
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
                                    Another Popover
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
            </sp-dialog>
        </sp-popover>
    `;
    return html`
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

WithConfiguration.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates all configuration options for the trigger() directive including placement, offset, and interaction types.',
        },
    },
};

// ====================
// CONFIGURATION
// ====================

/**
 * Placement options demo
 *
 * **Use case:** Show all available placements
 *
 * **Key features:**
 * - All 12 placement options
 * - overlayOptions.placement property
 * - Auto-adjustment at viewport edges
 *
 * 📖 [Positioning Guide](./README.md#positioning)
 */
export const PlacementOptions = (): TemplateResult => {
    const placements: Placement[] = [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
    ];

    return html`
        <style>
            .placement-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 40px;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
            }
            .placement-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
        </style>
        <div class="placement-grid">
            ${placements.map(
                (placement) => html`
                    <div class="placement-item">
                        <sp-button
                            ${trigger(
                                () => html`
                                    <sp-popover>
                                        <sp-dialog size="s" no-divider>
                                            ${placement}
                                        </sp-dialog>
                                    </sp-popover>
                                `,
                                {
                                    overlayOptions: { placement },
                                }
                            )}
                        >
                            ${placement}
                        </sp-button>
                    </div>
                `
            )}
        </div>
    `;
};

PlacementOptions.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Interactive demo of all 12 placement options available with the trigger() directive.',
        },
    },
};

/**
 * Trigger interactions
 *
 * **Use case:** Different interaction types (click, hover, longpress)
 *
 * **Key features:**
 * - triggerInteraction: 'click' | 'hover' | 'longpress'
 * - Keyboard accessible
 * - Works with all overlay types
 *
 * 📖 [Interactions Guide](./README.md#interactions)
 */
export const TriggerInteractionTypes = (): TemplateResult => {
    return html`
        <div style="display: flex; gap: 20px; align-items: center;">
            <sp-button
                ${trigger(
                    () => html`
                        <sp-popover>
                            <sp-dialog size="s" no-divider>
                                Click interaction
                            </sp-dialog>
                        </sp-popover>
                    `,
                    { triggerInteraction: 'click' }
                )}
            >
                Click Me
            </sp-button>

            <sp-button
                ${trigger(
                    () => html`
                        <sp-popover>
                            <sp-dialog size="s" no-divider>
                                Hover interaction
                            </sp-dialog>
                        </sp-popover>
                    `,
                    { triggerInteraction: 'hover' }
                )}
            >
                Hover Me
            </sp-button>

            <sp-button
                hold-affordance
                ${trigger(
                    () => html`
                        <sp-popover>
                            <sp-dialog size="s" no-divider>
                                Longpress interaction (300ms)
                            </sp-dialog>
                        </sp-popover>
                    `,
                    { triggerInteraction: 'longpress' }
                )}
            >
                Press & Hold
            </sp-button>
        </div>
    `;
};

TriggerInteractionTypes.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates the three interaction types available with trigger(): click, hover, and longpress.',
        },
    },
};

/**
 * Custom insertion
 *
 * **Use case:** Control where overlay is inserted in DOM
 *
 * **Key features:**
 * - insertionOptions.el - target element
 * - insertionOptions.where - insertion position
 * - Useful for portal patterns
 *
 * 📖 [Advanced Patterns](./trigger-directive.md#insertion-options)
 */
export const CustomInsertion = (): TemplateResult => {
    const renderPopover = (): TemplateResult => html`
        <sp-popover>
            <sp-dialog no-divider>
                This overlay is inserted at a custom location
            </sp-dialog>
        </sp-popover>
    `;

    return html`
        <sp-button
            ${trigger(renderPopover, {
                insertionOptions: {
                    el: () =>
                        document.querySelector('#other-element') as HTMLElement,
                    where: 'afterbegin',
                },
            })}
        >
            Open Popover
        </sp-button>
        <div
            id="other-element"
            style="margin-top: 20px; padding: 20px; background: var(--spectrum-gray-100); border-radius: 8px;"
        >
            <p>Overlay will be inserted here (check DOM inspector)</p>
        </div>
    `;
};

CustomInsertion.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Custom insertion location using insertionOptions. Overlay is inserted in a specific element rather than next to trigger.',
        },
    },
};

// ====================
// LIT INTEGRATION
// ====================

/**
 * Reactive state management
 *
 * **Use case:** Control overlay state from component properties
 *
 * **Key features:**
 * - open property for programmatic control
 * - Reactive to state changes
 * - sp-opened/sp-closed events
 * - Full Lit reactivity support
 *
 * 📖 [Lit Integration Guide](./trigger-directive.md#reactive-state)
 */
export const ReactiveState = (): TemplateResult => {
    class ManagedOverlayTrigger extends LitElement {
        @state()
        private accessor isRenderOverlay = false;

        @state()
        private accessor isOpenState = false;

        protected override render(): TemplateResult {
            return html`
                <sp-button
                    @click=${() => {
                        this.isRenderOverlay = !this.isRenderOverlay;
                    }}
                >
                    Toggle Overlay Render Button
                </sp-button>

                <sp-button
                    @click=${() => {
                        this.isRenderOverlay = true;
                        this.isOpenState = true;
                    }}
                >
                    Create Overlay Render Button And Open Overlay
                </sp-button>

                ${this.isRenderOverlay ? this.renderOverlayButton() : html``}
            `;
        }

        private renderOverlayButton(): TemplateResult {
            return html`
                <sp-button
                    ?selected=${this.isOpenState}
                    ${trigger(
                        () => html`
                            <sp-popover
                                @sp-opened=${(
                                    event: CustomEvent<OverlayOpenCloseDetail>
                                ) => {
                                    if (event.target !== event.currentTarget) {
                                        return;
                                    }
                                    this.isOpenState = true;
                                }}
                                @sp-closed=${(
                                    event: CustomEvent<OverlayOpenCloseDetail>
                                ) => {
                                    if (event.target !== event.currentTarget) {
                                        return;
                                    }
                                    this.isOpenState = false;
                                }}
                            >
                                <h1>My Test Popover</h1>
                            </sp-popover>
                        `,
                        {
                            triggerInteraction: 'click',
                            overlayOptions: { placement: 'bottom-end' },
                            open: this.isOpenState,
                        }
                    )}
                >
                    Toggle Popover
                </sp-button>
            `;
        }
    }

    customElements.define('managed-overlay-trigger', ManagedOverlayTrigger);

    return html`
        <managed-overlay-trigger></managed-overlay-trigger>
    `;
};

ReactiveState.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates reactive state management with Lit component properties controlling overlay state.',
        },
    },
};

/**
 * Event handling
 *
 * **Use case:** Respond to overlay open/close events
 *
 * **Key features:**
 * - sp-opened event when overlay opens
 * - sp-closed event when overlay closes
 * - Access to overlay element
 * - OverlayOpenCloseDetail type info
 *
 * 📖 [Event Handling Guide](./trigger-directive.md#events)
 */
export const EventHandling = (): TemplateResult => {
    let eventLog: string[] = [];

    const logEvent = (eventName: string): void => {
        eventLog = [
            ...eventLog,
            `${new Date().toLocaleTimeString()}: ${eventName}`,
        ];
        const logEl = document.querySelector('#event-log');
        if (logEl) {
            logEl.innerHTML = eventLog.slice(-5).join('<br>');
        }
    };

    return html`
        <sp-button
            ${trigger(
                () => html`
                    <sp-popover
                        @sp-opened=${() => logEvent('Overlay opened')}
                        @sp-closed=${() => logEvent('Overlay closed')}
                    >
                        <sp-dialog size="s" no-divider>
                            <p>Open and close this overlay to see events</p>
                            <p>Check the log below</p>
                        </sp-dialog>
                    </sp-popover>
                `
            )}
        >
            Toggle Overlay
        </sp-button>
        <div
            id="event-log"
            style="margin-top: 20px; padding: 15px; background: var(--spectrum-gray-100); border-radius: 8px; font-family: monospace; font-size: 12px; min-height: 80px;"
        >
            No events yet...
        </div>
    `;
};

EventHandling.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Event handling with sp-opened and sp-closed events. Monitor overlay lifecycle events.',
        },
    },
};

/**
 * Nested directives
 *
 * **Use case:** Overlays within overlays using directives
 *
 * **Key features:**
 * - Proper stacking of nested overlays
 * - Each overlay has its own trigger directive
 * - Focus management across nesting levels
 *
 * 📖 [Advanced Patterns](./trigger-directive.md#nesting)
 */
export const NestedDirectives = (): TemplateResult => {
    return html`
        <sp-button
            ${trigger(
                () => html`
                    <sp-popover>
                        <sp-dialog no-divider>
                            <p>First level overlay</p>
                            <sp-button
                                ${trigger(
                                    () => html`
                                        <sp-popover>
                                            <sp-dialog size="s" no-divider>
                                                <p>Second level overlay</p>
                                                <sp-button
                                                    ${trigger(
                                                        () => html`
                                                            <sp-popover>
                                                                <sp-dialog
                                                                    size="s"
                                                                    no-divider
                                                                >
                                                                    Third level!
                                                                </sp-dialog>
                                                            </sp-popover>
                                                        `
                                                    )}
                                                >
                                                    Open Third
                                                </sp-button>
                                            </sp-dialog>
                                        </sp-popover>
                                    `
                                )}
                            >
                                Open Second
                            </sp-button>
                        </sp-dialog>
                    </sp-popover>
                `
            )}
        >
            Open First
        </sp-button>
    `;
};

NestedDirectives.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Nested trigger() directives demonstrating proper stacking and focus management across multiple levels.',
        },
    },
};

/**
 * Combined with tooltip directive
 *
 * **Use case:** Tooltip on hover + popover on click
 *
 * **Key features:**
 * - tooltip() directive for hover
 * - trigger() directive for click
 * - Both on same element
 * - Clean, declarative syntax
 *
 * 📖 [Combining Directives](./trigger-directive.md#combining-directives)
 */
export const WithTooltipDirective = (): TemplateResult => {
    return html`
        <sp-button
            ${tooltip(
                () => html`
                    Click to open popover
                `
            )}
            ${trigger(
                () => html`
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>This is the popover content</p>
                            <p>Hover showed tooltip, click shows this</p>
                        </sp-dialog>
                    </sp-popover>
                `,
                { triggerInteraction: 'click' }
            )}
        >
            Hover & Click Me
        </sp-button>
    `;
};

WithTooltipDirective.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Combining tooltip() and trigger() directives on the same element for hover tooltip + click popover.',
        },
    },
};
