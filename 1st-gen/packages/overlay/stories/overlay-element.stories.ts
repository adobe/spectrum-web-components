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

import { Placement } from '@floating-ui/dom';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { html, render, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-anchor-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-polygon-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-rect-select.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { notAgain } from '../../dialog/stories/dialog-base.stories.js';
import { OverlayTypes } from '../src/overlay-types.js';
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
            description: 'Whether the overlay is initially open.',
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

// ====================
// BASIC USAGE
// ====================

/**
 * Click interaction - overlay opens on button click
 *
 * **Use case:** Display additional content when user clicks a trigger element
 *
 * **Key features:**
 * - trigger="id@click" binds click event to trigger element
 * - type="auto" closes when clicking outside
 * - Keyboard accessible (Enter/Space to trigger)
 *
 * 📖 [Interactions Guide](./README.md#interactions)
 */
export const ClickInteraction = (args: Properties): TemplateResult =>
    Template(args);
ClickInteraction.args = {
    interaction: 'click',
    placement: 'right',
    style: 'container-type' as WrapperStyleType,
    type: 'auto',
};
ClickInteraction.parameters = {
    docs: {
        description: {
            story: 'Basic click interaction showing popover on button click. Closes when clicking outside or pressing Escape.',
        },
    },
};

/**
 * Hover interaction - overlay opens on mouse hover
 *
 * **Use case:** Show contextual information when user hovers over an element
 *
 * **Key features:**
 * - trigger="id@hover" binds hover event to trigger element
 * - Typically used with tooltips (type="hint")
 * - Supports delayed attribute for better UX
 *
 * 📖 [Interactions Guide](./README.md#interactions)
 */
export const HoverInteraction = (args: Properties): TemplateResult =>
    Template(args);
HoverInteraction.args = {
    interaction: 'hover',
    placement: 'right',
    style: 'will-change',
};
HoverInteraction.parameters = {
    docs: {
        description: {
            story: 'Hover interaction showing overlay when mouse enters trigger element. Useful for tooltips and contextual help.',
        },
    },
};

/**
 * Longpress interaction - overlay opens on long press
 *
 * **Use case:** Advanced options revealed on 300ms hold (useful for mobile)
 *
 * **Key features:**
 * - trigger="id@longpress" binds longpress event
 * - Useful for touch interfaces and mobile
 * - Hold affordance can be added to trigger button
 *
 * 📖 [Interactions Guide](./README.md#interactions)
 */
export const LongpressInteraction = (args: Properties): TemplateResult =>
    Template(args);
LongpressInteraction.args = {
    interaction: 'longpress',
    placement: 'right',
    style: 'container-type',
    type: 'auto',
};
LongpressInteraction.parameters = {
    docs: {
        description: {
            story: 'Longpress gesture (300ms hold) opens overlay. Works with touch, mouse, and keyboard (Space or Alt+Down).',
        },
    },
};

/**
 * Tooltip variant - simple hover tooltip
 *
 * **Use case:** Quick help text or labels for icons
 *
 * **Key features:**
 * - Uses sp-tooltip instead of sp-popover
 * - type="hint" for non-blocking behavior
 * - delayed attribute prevents immediate show
 *
 * 📖 [Tooltip Component](../../tooltip/README.md)
 */
export const TooltipVariant = ({
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
TooltipVariant.args = {
    interaction: 'hover',
    placement: 'right',
};
TooltipVariant.parameters = {
    docs: {
        description: {
            story: 'Simple tooltip example using sp-tooltip component. Best for brief help text and icon labels.',
        },
    },
};

// ====================
// OVERLAY TYPES
// ====================

/**
 * Modal type - blocks page interaction
 *
 * **Use case:** Require user attention before proceeding
 *
 * **Key features:**
 * - type="modal" blocks interaction with page content
 * - User must interact with overlay or press ESC to close
 * - Automatically manages focus and keyboard navigation
 * - Use with sp-dialog-wrapper for consistent modal dialogs
 *
 * 📖 [Overlay Types Guide](./README.md#overlay-types)
 */
export const ModalType = (args: Properties): TemplateResult => Template(args);
ModalType.args = {
    interaction: 'click',
    placement: 'right',
    style: 'will-change',
    type: 'modal',
};
ModalType.parameters = {
    docs: {
        description: {
            story: 'Modal overlay blocks page interaction until user closes it. Use for important decisions or required input.',
        },
    },
};

/**
 * Page type - full page takeover
 *
 * **Use case:** Full-screen modals, wizards, or complex forms
 *
 * **Key features:**
 * - type="page" for full-screen overlays
 * - Often used with sp-dialog-wrapper mode="fullscreenTakeover"
 * - Manages focus and prevents page scrolling
 * - Typically has its own close button
 *
 * 📖 [Overlay Types Guide](./README.md#overlay-types)
 */
export const PageType = ({
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
PageType.args = {
    interaction: 'click',
    placement: 'right',
    type: 'page',
};
PageType.parameters = {
    docs: {
        description: {
            story: 'Page type overlay takes over the entire viewport. Use for complex workflows, wizards, or full-screen modals.',
        },
    },
};

/**
 * Auto type - smart non-modal behavior
 *
 * **Use case:** Most common type for popovers and dropdowns
 *
 * **Key features:**
 * - type="auto" closes when clicking outside
 * - Allows interaction with page if overlay doesn't have focus
 * - Good default for most use cases
 * - Automatically manages light dismiss behavior
 *
 * 📖 [Overlay Types Guide](./README.md#overlay-types)
 */
export const AutoType = (args: Properties): TemplateResult => Template(args);
AutoType.args = {
    interaction: 'click',
    placement: 'right',
    style: 'container-type',
    type: 'auto',
};
AutoType.parameters = {
    docs: {
        description: {
            story: 'Auto type is the most common choice. Closes when clicking outside, allows normal page interaction.',
        },
    },
};

/**
 * Hint type - non-blocking tooltips
 *
 * **Use case:** Tooltips and non-interactive help text
 *
 * **Key features:**
 * - type="hint" never blocks page interaction
 * - Use with sp-tooltip for consistency
 * - Automatically closes on mouse leave or focus change
 * - Best for brief contextual help
 *
 * 📖 [Overlay Types Guide](./README.md#overlay-types)
 */
export const HintType = ({
    interaction,
    open,
    placement,
    delayed,
}: Properties): TemplateResult => html`
    <sp-action-button id="trigger">Hover me</sp-action-button>
    <sp-overlay
        ?open=${open}
        ?delayed=${delayed}
        trigger="trigger@${interaction}"
        type="hint"
        placement=${ifDefined(placement)}
    >
        <sp-tooltip>This is a hint that doesn't block interaction</sp-tooltip>
    </sp-overlay>
`;
HintType.args = {
    interaction: 'hover',
    placement: 'top',
    delayed: true,
};
HintType.parameters = {
    docs: {
        description: {
            story: 'Hint type never blocks page interaction. Perfect for tooltips and brief contextual information.',
        },
    },
};

/**
 * Type comparison - visual comparison of all overlay types
 *
 * **Use case:** Understand differences between overlay types
 *
 * **Key features:**
 * - Side-by-side comparison of all types
 * - Shows behavior differences
 * - Helps choose the right type
 *
 * 📖 [Overlay Types Guide](./README.md#overlay-types)
 */
export const TypeComparison = (): TemplateResult => html`
    <style>
        .type-comparison {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .type-card {
            padding: 20px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
            text-align: center;
        }
        .type-card h3 {
            margin-top: 0;
            font-size: 14px;
            color: var(--spectrum-gray-900);
        }
        .type-card p {
            font-size: 12px;
            color: var(--spectrum-gray-700);
            margin: 10px 0;
        }
    </style>
    <div class="type-comparison">
        <div class="type-card">
            <h3>modal</h3>
            <sp-button id="modal-trigger">Open</sp-button>
            <sp-overlay trigger="modal-trigger@click" type="modal">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        Modal - blocks page
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>Blocks all page interaction</p>
        </div>
        <div class="type-card">
            <h3>auto</h3>
            <sp-button id="auto-trigger">Open</sp-button>
            <sp-overlay trigger="auto-trigger@click" type="auto">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        Auto - light dismiss
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>Closes when clicking outside</p>
        </div>
        <div class="type-card">
            <h3>hint</h3>
            <sp-button id="hint-trigger">Hover</sp-button>
            <sp-overlay trigger="hint-trigger@hover" type="hint" delayed>
                <sp-tooltip>Hint - never blocks</sp-tooltip>
            </sp-overlay>
            <p>Never blocks interaction</p>
        </div>
        <div class="type-card">
            <h3>manual</h3>
            <sp-button id="manual-trigger">Open</sp-button>
            <sp-overlay trigger="manual-trigger@click" type="manual">
                <sp-popover
                    style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"
                >
                    <sp-dialog size="s" no-divider>
                        Manual - you control position
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>You control positioning</p>
        </div>
    </div>
`;
TypeComparison.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Compare all overlay types side by side to understand their different behaviors.',
        },
    },
};

// ====================
// POSITIONING
// ====================

/**
 * Placement demo - interactive placement options
 *
 * **Use case:** Understand all placement options
 *
 * **Key features:**
 * - Shows all 12 placement options
 * - Demonstrates auto-adjustment at viewport edges
 * - Includes offset and transformed container examples
 *
 * 📖 [Positioning Guide](./README.md#positioning)
 */
export const PlacementDemo = (): TemplateResult => html`
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
        .placement-item span {
            font-size: 12px;
            color: var(--spectrum-gray-700);
        }
        .transformed-demo {
            transform: translateX(-50%);
            position: relative;
            left: 50%;
            margin: 40px 0;
            padding: 20px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
        }
    </style>
    <h3 style="text-align: center;">Standard Placements</h3>
    <div class="placement-grid">
        ${[
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
        ].map(
            (placement) => html`
                <div class="placement-item">
                    <sp-button id="${placement}-trigger">
                        ${placement}
                    </sp-button>
                    <sp-overlay
                        trigger="${placement}-trigger@click"
                        type="auto"
                        placement="${placement as Placement}"
                    >
                        <sp-popover>
                            <sp-dialog size="s" no-divider>
                                Placement: ${placement}
                            </sp-dialog>
                        </sp-popover>
                    </sp-overlay>
                </div>
            `
        )}
    </div>
    <h3 style="text-align: center; margin-top: 40px;">Transformed Container</h3>
    <div class="transformed-demo">
        <p style="margin: 0 0 10px 0; text-align: center;">
            Overlay positioning works correctly even in transformed containers
        </p>
        <sp-button
            id="transformed-trigger"
            style="display: block; margin: 0 auto;"
        >
            Open Overlay
        </sp-button>
        <sp-overlay
            trigger="transformed-trigger@click"
            type="auto"
            placement="bottom"
        >
            <sp-popover>
                <sp-dialog size="s" no-divider>
                    Works in transformed containers!
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`;
PlacementDemo.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Comprehensive demo of all placement options, including behavior in transformed containers.',
        },
    },
};

/**
 * Focus management - control focus behavior
 *
 * **Use case:** Control how focus is managed when overlay opens
 *
 * **Key features:**
 * - receivesFocus="auto" - Smart focus management (default)
 * - receivesFocus="true" - Always move focus to overlay
 * - receivesFocus="false" - Never move focus
 *
 * 📖 [Accessibility Guide](./ACCESSIBILITY.md#focus-management)
 */
export const FocusManagement = (): TemplateResult => html`
    <style>
        .focus-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            padding: 20px;
        }
        .focus-card {
            padding: 20px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
        }
        .focus-card h3 {
            margin-top: 0;
            font-size: 14px;
        }
        .focus-card p {
            font-size: 12px;
            color: var(--spectrum-gray-700);
        }
    </style>
    <div class="focus-demo">
        <div class="focus-card">
            <h3>receivesFocus="auto" (default)</h3>
            <sp-button id="auto-focus-trigger">Open</sp-button>
            <sp-overlay
                trigger="auto-focus-trigger@click"
                type="auto"
                .receivesFocus=${'auto'}
            >
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <a href="#test">Focusable link</a>
                        <p>Focus moves here automatically</p>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>Focus moves to overlay if it has focusable elements</p>
        </div>
        <div class="focus-card">
            <h3>receivesFocus="true"</h3>
            <sp-button id="true-focus-trigger">Open</sp-button>
            <sp-overlay
                trigger="true-focus-trigger@click"
                type="auto"
                .receivesFocus=${'true'}
            >
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <p>Focus always moves here</p>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>Focus always moves to overlay</p>
        </div>
        <div class="focus-card">
            <h3>receivesFocus="false"</h3>
            <sp-button id="false-focus-trigger">Open</sp-button>
            <sp-overlay
                trigger="false-focus-trigger@click"
                type="auto"
                .receivesFocus=${'false'}
            >
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <a href="#test">This won't get focus</a>
                        <p>Focus stays on trigger</p>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <p>Focus stays on trigger button</p>
        </div>
    </div>
`;
FocusManagement.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates the three focus management modes: auto, true, and false. Use auto for most cases.',
        },
    },
};

// ====================
// ADVANCED FEATURES
// ====================

/**
 * Multiple overlays per trigger
 *
 * **Use case:** Different overlays for different interactions
 *
 * **Key features:**
 * - Multiple sp-overlay elements can share same trigger
 * - Different interaction types (click, hover, longpress)
 * - Each overlay can have different content and behavior
 *
 * 📖 [Advanced Patterns](./README.md#multiple-overlays-per-trigger)
 */
export const MultipleOverlaysPerTrigger = ({
    delayed,
}: Properties): TemplateResult => html`
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
MultipleOverlaysPerTrigger.parameters = {
    docs: {
        description: {
            story: 'Multiple overlay elements targeting the same trigger with different interactions. Useful for progressive disclosure.',
        },
    },
};

/**
 * Nested modal overlays
 *
 * **Use case:** Modals that open other modals
 *
 * **Key features:**
 * - Proper stacking and z-index management
 * - Focus management across modal stack
 * - ESC key closes innermost modal first
 *
 * 📖 [Advanced Patterns](./README.md#nested-overlays)
 */
export const NestedModalOverlays = (): TemplateResult => html`
    <div style="padding: 20px;">
        <sp-button id="outerTrigger" variant="primary">
            Open Outer Modal
        </sp-button>

        <sp-overlay id="outerOverlay" type="auto" trigger="outerTrigger@click">
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
NestedModalOverlays.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Demonstrates nested modal overlays with proper stacking, focus management, and keyboard navigation.',
        },
    },
};

/**
 * Lazy loading pattern with slottable-request
 *
 * **Use case:** Performance optimization for heavy or numerous overlays
 *
 * **Key features:**
 * - Content created only when overlay opens
 * - Reduces initial DOM size
 * - slottable-request event for on-demand rendering
 * - Content removed when overlay closes
 *
 * 📖 [Performance Guide](./PERFORMANCE.md#lazy-loading)
 */
export const LazyLoadingPattern = (): TemplateResult => {
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
                              <div>
                                  This content was lazily loaded when the
                                  overlay opened!
                              </div>
                              <sp-button>Press Me</sp-button>
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
LazyLoadingPattern.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Lazy loading pattern using slottable-request event to create content on demand, improving initial page load performance.',
        },
    },
};

/**
 * With interactive content
 *
 * **Use case:** Overlays containing interactive elements like sliders or forms
 *
 * **Key features:**
 * - Interactive elements work correctly in overlays
 * - Focus management for form elements
 * - Click events don't close overlay prematurely
 *
 * 📖 [Forms Integration](./FORMS-INTEGRATION.md)
 */
export const WithInteractiveContent = (): TemplateResult => html`
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
WithInteractiveContent.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: "Overlay containing interactive elements like sliders and buttons. Clicks on interactive content don't close the overlay.",
        },
    },
};

/**
 * Integration with action groups
 *
 * **Use case:** Tool palettes or action groups with hover/longpress overlays
 *
 * **Key features:**
 * - Multiple action buttons with individual overlays
 * - Hover tooltips + longpress expanded options
 * - Efficient with triggered-by optimization
 *
 * 📖 [Integration Examples](./README.md#action-groups)
 */
export const IntegrationActionGroup = ({
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
            }
            .root > sp-action-group > sp-action-button {
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
IntegrationActionGroup.parameters = {
    docs: {
        description: {
            story: 'Integration example showing action groups with hover tooltips and longpress expanded options. Common pattern in tool palettes.',
        },
    },
};

// ====================
// TEST HELPERS
// ====================
// Legacy exports for test compatibility

export const click = (args: Properties): TemplateResult => Template(args);
click.args = {
    interaction: 'click',
    placement: 'right',
    style: 'container-type' as WrapperStyleType,
    type: 'auto',
};

export const receivesFocus = ({
    interaction,
    open,
    placement,
    receivesFocus,
    type,
}: Properties & { receivesFocus?: string }): TemplateResult => html`
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
} as Properties & { receivesFocus?: string };

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
