/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import {
    css,
    CSSResultArray,
    SpectrumElement,
    html as spHtml,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import type { AutoscrollController } from '../src/AutoscrollController.js';
import { DraggableMixin } from '../src/DraggableMixin.js';
import { DropTargetMixin } from '../src/DropTargetMixin.js';

// Dynamically import for instantiation
const loadAutoScroll = async (): Promise<
    typeof import('../src/AutoscrollController.js')
> => {
    return await import('../src/AutoscrollController.js');
};

// Type augmentation for window
declare global {
    interface Window {
        __swc_hack_knobs__: {
            defaultSystemVariant: string;
        };
    }
}

export default {
    component: 'autoscroll-demo',
    title: 'Drag and Drop/Autoscroll',
    argTypes: {},
    args: {},
};

// ==============================================================================
// HORIZONTAL AUTOSCROLL DEMO (Timeline/Sceneline use case)
// ==============================================================================

class HorizontalScrollItem extends DraggableMixin(
    DropTargetMixin(SpectrumElement)
) {
    // @ts-expect-error - Decorator typing issue with mixins
    @property({ attribute: 'item-id' })
    public itemId = '';

    // @ts-expect-error - Decorator typing issue with mixins
    @property()
    public label = '';

    // @ts-expect-error - Decorator typing issue with mixins
    @property()
    public color = 'blue';

    public override acceptedTypes = ['application/x-timeline-item'];

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: inline-block;
                    min-width: 120px;
                    height: 80px;
                    padding: 12px;
                    margin: 0 4px;
                    border: 2px solid var(--spectrum-global-color-gray-400);
                    border-radius: 4px;
                    background: var(--spectrum-global-color-gray-100);
                    cursor: grab;
                    user-select: none;
                    flex-shrink: 0;
                    box-sizing: border-box;
                }
                :host([aria-grabbed='true']) {
                    opacity: 0.5;
                }
                /* Blue background when dragging over */
                :host([aria-dropeffect='move']) {
                    background: var(--spectrum-global-color-blue-300);
                    border-color: var(--spectrum-global-color-blue-600);
                    border-width: 3px;
                    box-shadow: 0 0 0 3px rgba(20, 115, 230, 0.3);
                }
                /* Green background on successful drop */
                :host(.drop-success) {
                    background: var(
                        --spectrum-global-color-green-400
                    ) !important;
                    border-color: var(
                        --spectrum-global-color-green-600
                    ) !important;
                    box-shadow: 0 0 0 3px rgba(44, 173, 109, 0.4) !important;
                }
                :host([color='red']) {
                    background: var(--spectrum-global-color-red-200);
                }
                :host([color='green']) {
                    background: var(--spectrum-global-color-green-200);
                }
                :host([color='blue']) {
                    background: var(--spectrum-global-color-blue-200);
                }
            `,
        ];
    }

    public override getDragItems(): Array<Record<string, string>> {
        return [
            {
                'application/x-timeline-item': this.itemId,
                'text/plain': this.label,
            },
        ];
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-drop', (event: Event) => {
            const customEvent = event as CustomEvent;
            const sourceId =
                customEvent.detail.items[0]?.['application/x-timeline-item'];
            if (sourceId && sourceId !== this.itemId) {
                // Show green success feedback
                this.classList.add('drop-success');
                setTimeout(() => {
                    this.classList.remove('drop-success');
                }, 600);

                this.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: { sourceId, targetId: this.itemId },
                        bubbles: true,
                        composed: true,
                    })
                );
            }
        });
    }

    protected override render(): TemplateResult {
        return spHtml`
            <div>${this.label}</div>
        `;
    }
}
customElements.define('horizontal-scroll-item', HorizontalScrollItem);

class HorizontalTimeline extends SpectrumElement {
    // @ts-expect-error - Decorator typing issue with arrays
    @property({ attribute: false })
    public items: Array<{ id: string; label: string; color: string }> = [];

    private autoscroll?: AutoscrollController;

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: block;
                    padding: 16px;
                    border: 2px solid var(--spectrum-global-color-gray-300);
                    border-radius: 4px;
                    background: var(--spectrum-global-color-gray-50);
                }
                .timeline-container {
                    display: flex;
                    overflow-x: auto;
                    overflow-y: hidden;
                    padding: 16px;
                    gap: 8px;
                    min-height: 120px;
                    background: var(--spectrum-global-color-gray-200);
                    border-radius: 4px;
                }
                .timeline-container::-webkit-scrollbar {
                    height: 8px;
                }
                .timeline-container::-webkit-scrollbar-track {
                    background: var(--spectrum-global-color-gray-300);
                }
                .timeline-container::-webkit-scrollbar-thumb {
                    background: var(--spectrum-global-color-gray-500);
                    border-radius: 4px;
                }
            `,
        ];
    }

    public override async firstUpdated(): Promise<void> {
        // Get the scrollable container element
        const container = this.shadowRoot?.querySelector(
            '.timeline-container'
        ) as HTMLElement;
        if (container) {
            const { AutoscrollController } = await loadAutoScroll();
            this.autoscroll = new AutoscrollController(this, {
                enableX: true,
                enableY: false,
                threshold: 80,
                maxSpeed: 15,
                container: container,
                onScroll: (delta) => {
                    console.log(
                        '[Autoscroll] Scrolling horizontally:',
                        delta.x
                    );
                },
            });
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('reorder', (event: Event) => {
            const customEvent = event as CustomEvent;
            const { sourceId, targetId } = customEvent.detail;
            const sourceIndex = this.items.findIndex(
                (item) => item.id === sourceId
            );
            const targetIndex = this.items.findIndex(
                (item) => item.id === targetId
            );

            if (sourceIndex !== -1 && targetIndex !== -1) {
                const newItems = [...this.items];
                const [removed] = newItems.splice(sourceIndex, 1);
                newItems.splice(targetIndex, 0, removed);
                this.items = newItems;
                this.requestUpdate();
            }
        });
    }

    protected override render(): TemplateResult {
        return spHtml`
            <div class="timeline-container">
                ${this.items.map(
                    (item) => spHtml`
                        <horizontal-scroll-item
                            itemId="${item.id}"
                            label="${item.label}"
                            color="${item.color}"
                        ></horizontal-scroll-item>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('horizontal-timeline', HorizontalTimeline);

// ==============================================================================
// VERTICAL AUTOSCROLL DEMO (Layer Stack use case)
// ==============================================================================

class VerticalScrollItem extends DraggableMixin(
    DropTargetMixin(SpectrumElement)
) {
    // @ts-expect-error - Decorator typing issue with mixins
    @property({ attribute: 'item-id' })
    public itemId = '';

    // @ts-expect-error - Decorator typing issue with mixins
    @property()
    public label = '';

    public override acceptedTypes = ['application/x-layer'];

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    margin: 4px 0;
                    border: 2px solid var(--spectrum-global-color-gray-300);
                    border-radius: 4px;
                    background: var(--spectrum-global-color-gray-100);
                    cursor: grab;
                    user-select: none;
                }
                :host([aria-grabbed='true']) {
                    opacity: 0.5;
                }
                /* Blue background when valid drop target */
                :host([aria-dropeffect='move']) {
                    background: var(--spectrum-global-color-blue-300);
                    border-color: var(--spectrum-global-color-blue-600);
                    box-shadow: 0 0 0 3px rgba(20, 115, 230, 0.3);
                }
                /* Green flash on successful drop */
                :host(.drop-success) {
                    background: var(
                        --spectrum-global-color-green-400
                    ) !important;
                    border-color: var(
                        --spectrum-global-color-green-600
                    ) !important;
                    box-shadow: 0 0 0 3px rgba(44, 173, 109, 0.4) !important;
                    animation: dropSuccess 0.6s ease-out;
                }
                @keyframes dropSuccess {
                    0% {
                        background: var(--spectrum-global-color-green-400);
                        transform: scale(1.05);
                    }
                    100% {
                        background: var(--spectrum-global-color-gray-100);
                        transform: scale(1);
                    }
                }
                .handle {
                    margin-right: 12px;
                    color: var(--spectrum-global-color-gray-600);
                    font-size: 18px;
                }
            `,
        ];
    }

    public override getDragItems(): Array<Record<string, string>> {
        return [
            {
                'application/x-layer': this.itemId,
                'text/plain': this.label,
            },
        ];
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-drop', (event: Event) => {
            const customEvent = event as CustomEvent;
            const sourceId = customEvent.detail.items[0]?.['application/x-layer'];
            if (sourceId && sourceId !== this.itemId) {
                // Flash green on successful drop
                this.classList.add('drop-success');
                setTimeout(() => {
                    this.classList.remove('drop-success');
                }, 800);

                this.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: { sourceId, targetId: this.itemId },
                        bubbles: true,
                        composed: true,
                    })
                );
            }
        });
    }

    protected override render(): TemplateResult {
        return spHtml`
            <span class="handle">⋮⋮</span>
            <span>${this.label}</span>
        `;
    }
}
customElements.define('vertical-scroll-item', VerticalScrollItem);

class VerticalLayerStack extends SpectrumElement {
    // @ts-expect-error - Decorator typing issue with arrays
    @property({ attribute: false })
    public items: Array<{ id: string; label: string }> = [];

    private autoscroll?: AutoscrollController;

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: block;
                    padding: 16px;
                    border: 2px solid var(--spectrum-global-color-gray-300);
                    border-radius: 4px;
                    background: var(--spectrum-global-color-gray-50);
                }
                .layer-container {
                    max-height: 400px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 8px;
                    background: var(--spectrum-global-color-gray-200);
                    border-radius: 4px;
                }
                .layer-container::-webkit-scrollbar {
                    width: 8px;
                }
                .layer-container::-webkit-scrollbar-track {
                    background: var(--spectrum-global-color-gray-300);
                }
                .layer-container::-webkit-scrollbar-thumb {
                    background: var(--spectrum-global-color-gray-500);
                    border-radius: 4px;
                }
            `,
        ];
    }

    public override async firstUpdated(): Promise<void> {
        // Get the scrollable container element
        const container = this.shadowRoot?.querySelector(
            '.layer-container'
        ) as HTMLElement;
        if (container) {
            const { AutoscrollController } = await loadAutoScroll();
            this.autoscroll = new AutoscrollController(this, {
                enableX: false,
                enableY: true,
                threshold: 60,
                maxSpeed: 12,
                container: container,
                onScroll: (delta) => {
                    console.log('[Autoscroll] Scrolling vertically:', delta.y);
                },
            });
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('reorder', (event: Event) => {
            const customEvent = event as CustomEvent;
            const { sourceId, targetId } = customEvent.detail;
            const sourceIndex = this.items.findIndex(
                (item) => item.id === sourceId
            );
            const targetIndex = this.items.findIndex(
                (item) => item.id === targetId
            );

            if (sourceIndex !== -1 && targetIndex !== -1) {
                const newItems = [...this.items];
                const [removed] = newItems.splice(sourceIndex, 1);
                newItems.splice(targetIndex, 0, removed);
                this.items = newItems;
                this.requestUpdate();
            }
        });
    }

    protected override render(): TemplateResult {
        return spHtml`
            <div class="layer-container">
                ${this.items.map(
                    (item) => spHtml`
                        <vertical-scroll-item
                            itemId="${item.id}"
                            label="${item.label}"
                        ></vertical-scroll-item>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('vertical-layer-stack', VerticalLayerStack);

// ==============================================================================
// STORIES
// ==============================================================================

const demoStyles = spHtml`
    <style>
        .demo-section {
            margin: 2em 0;
            padding: 1.5em;
            border: 1px solid var(--spectrum-global-color-gray-300);
            border-radius: 4px;
        }
        .demo-section h3 {
            margin-top: 0;
            color: var(--spectrum-global-color-gray-800);
        }
        .description {
            margin-bottom: 1em;
            color: var(--spectrum-global-color-gray-700);
            font-size: 14px;
            line-height: 1.6;
        }
        .instructions {
            padding: 12px;
            margin: 16px 0;
            background: var(--spectrum-global-color-blue-100);
            border-left: 4px solid var(--spectrum-global-color-blue-500);
            border-radius: 4px;
        }
        .instructions strong {
            display: block;
            margin-bottom: 8px;
        }
    </style>
`;

export const HorizontalAutoscroll = (): TemplateResult => {
    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Horizontal Autoscroll (Timeline/Sceneline)</h3>
                <div class="description">
                    <strong>Use case:</strong> Audio/video timeline, Instagram carousel<br />
                    <strong>PRD requirement:</strong> Autoscroll on X axis when dragging near edges<br />
                    <strong>Scroll behavior:</strong> Speed increases as you get closer to edge
                </div>
                <div class="instructions">
                    <strong>Try it:</strong>
                    1. Drag any clip left or right<br />
                    2. Move your cursor near the left or right edge of the timeline<br />
                    3. Watch it autoscroll! Speed increases near the edge<br />
                    4. Drop to reorder clips
                </div>

                <horizontal-timeline
                    .items=${[
                        { id: '1', label: 'Clip 1', color: 'blue' },
                        { id: '2', label: 'Clip 2', color: 'green' },
                        { id: '3', label: 'Clip 3', color: 'red' },
                        { id: '4', label: 'Clip 4', color: 'blue' },
                        { id: '5', label: 'Clip 5', color: 'green' },
                        { id: '6', label: 'Clip 6', color: 'red' },
                        { id: '7', label: 'Clip 7', color: 'blue' },
                        { id: '8', label: 'Clip 8', color: 'green' },
                        { id: '9', label: 'Clip 9', color: 'red' },
                        { id: '10', label: 'Clip 10', color: 'blue' },
                    ]}
                ></horizontal-timeline>
            </div>
        </sp-theme>
    `;
};

export const VerticalAutoscroll = (): TemplateResult => {
    const items = Array.from({ length: 20 }, (_, i) => ({
        id: `layer-${i + 1}`,
        label: `Layer ${i + 1}`,
    }));

    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Vertical Autoscroll (Layer Stack)</h3>
                <div class="description">
                    <strong>Use case:</strong> Layer stack, page list<br />
                    <strong>PRD requirement:</strong> Autoscroll on Y axis when dragging near edges<br />
                    <strong>Scroll behavior:</strong> Dynamic speed based on proximity to edge
                </div>
                <div class="instructions">
                    <strong>Try it:</strong>
                    1. Drag any layer up or down<br />
                    2. Move your cursor near the top or bottom edge<br />
                    3. Watch it autoscroll smoothly!<br />
                    4. Drop to reorder layers
                </div>

                <vertical-layer-stack .items=${items}></vertical-layer-stack>
            </div>
        </sp-theme>
    `;
};

export const BothAxes = (): TemplateResult => {
    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Both Axes Autoscroll (Grid/Canvas)</h3>
                <div class="description">
                    <strong>Use case:</strong> Grid layouts, canvas editors<br />
                    <strong>PRD requirement:</strong> Autoscroll on both X and Y axes<br />
                    <strong>Coming soon:</strong> Grid layout demo with 2D autoscroll
                </div>
                <div class="instructions">
                    <strong>Configuration example:</strong>
                    <pre><code>new AutoscrollController(this, {
  enableX: true,  // Enable horizontal autoscroll
  enableY: true,  // Enable vertical autoscroll
  threshold: 50,  // Start scrolling 50px from edge
  maxSpeed: 10,   // Maximum scroll speed
  speedMultiplier: 1.0 // Speed adjustment
})</code></pre>
                </div>
            </div>
        </sp-theme>
    `;
};
