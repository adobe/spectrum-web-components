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
import { html, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

// APPROACH 1: Using Controllers directly
import { DragController } from '../src/DragController.js';
import { DropController } from '../src/DropController.js';

// APPROACH 2: Using Mixins
import { DraggableMixin } from '../src/DraggableMixin.js';
import { DropTargetMixin } from '../src/DropTargetMixin.js';

export default {
    component: 'drag-drop-demo',
    title: 'Drag and Drop/Combined Approaches',
    argTypes: {},
    args: {},
};

// ==============================================================================
// APPROACH 1: Pure Controllers (Direct usage, maximum control)
// ==============================================================================

class ControllerDraggable extends LitElement {
    @property({ type: String })
    public itemId = '';

    @property({ type: String })
    public label = '';

    private _dragController = new DragController(this, {
        getItems: () => {
            console.log('[ControllerDraggable] getItems called');
            return [
                {
                    'application/x-item': this.itemId,
                    'text/plain': this.label,
                },
            ];
        },
        onDragStart: () => {
            console.log('[ControllerDraggable] onDragStart');
            this.style.opacity = '0.5';
        },
        onDragEnd: () => {
            console.log('[ControllerDraggable] onDragEnd');
            this.style.opacity = '1';
        },
    });

    static override styles = css`
        :host {
            display: block;
            padding: 12px 16px;
            background: var(--spectrum-gray-200);
            border: 2px solid var(--spectrum-gray-400);
            border-radius: 4px;
            cursor: grab;
            margin: 4px;
        }
        :host(:hover) {
            background: var(--spectrum-gray-300);
        }
    `;

    override disconnectedCallback() {
        super.disconnectedCallback();
        void this._dragController;
    }

    override render() {
        return html`
            ${this.label}
        `;
    }
}
customElements.define('controller-draggable', ControllerDraggable);

class ControllerDropZone extends LitElement {
    @property({ type: String })
    public label = 'Drop Zone';

    @property({ type: Boolean, reflect: true })
    public filled = false;

    private _dropController = new DropController(this, {
        acceptedTypes: ['application/x-item'],
        onDrop: (event) => {
            const itemId = event.items[0]?.['application/x-item'];
            console.log('[Controller] Dropped:', itemId);
            this.filled = true;
            this.requestUpdate(); // Force re-render
            setTimeout(() => {
                this.filled = false;
                this.requestUpdate(); // Force re-render
            }, 1000);
        },
        onDropEnter: () => {
            console.log('[Controller] Drop enter');
            this.classList.add('drag-over');
        },
        onDropExit: () => {
            console.log('[Controller] Drop exit');
            this.classList.remove('drag-over');
        },
    });

    static override styles = css`
        :host {
            display: block;
            min-height: 100px;
            padding: 24px;
            border: 2px dashed var(--spectrum-gray-400);
            border-radius: 4px;
            text-align: center;
            transition: all 0.2s;
        }
        :host(.drag-over) {
            border-color: var(--spectrum-blue-500);
            background: var(--spectrum-blue-300);
            border-style: solid;
        }
        :host(.drop-success),
        :host([filled]) {
            border-color: var(--spectrum-green-500);
            background: var(--spectrum-green-300);
            border-style: solid;
        }
    `;

    override disconnectedCallback() {
        super.disconnectedCallback();
        void this._dropController;
    }

    override render() {
        return html`
            <div>${this.label} ${this.filled ? '✓ Dropped!' : ''}</div>
        `;
    }
}
customElements.define('controller-drop-zone', ControllerDropZone);

// ==============================================================================
// APPROACH 2: Mixins (Simpler API, built-in events)
// ==============================================================================

class MixinDraggable extends DraggableMixin(SpectrumElement) {
    @property({ type: String })
    public itemId = '';

    @property({ type: String })
    public label = '';

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: block;
                    padding: 12px 16px;
                    background: var(--spectrum-blue-200);
                    border: 2px solid var(--spectrum-blue-400);
                    border-radius: 4px;
                    cursor: grab;
                    margin: 4px;
                }
                :host(:hover) {
                    background: var(--spectrum-blue-300);
                }
                :host([aria-grabbed='true']) {
                    opacity: 0.5;
                }
            `,
        ];
    }

    public override getDragItems() {
        return [
            {
                'application/x-item': this.itemId,
                'text/plain': this.label,
            },
        ];
    }

    protected override render(): TemplateResult {
        return spHtml`${this.label}`;
    }
}
customElements.define('mixin-draggable', MixinDraggable);

class MixinDropZone extends DropTargetMixin(SpectrumElement) {
    @property({ type: String })
    public label = 'Drop Zone';

    @property({ type: Boolean, reflect: true })
    public filled = false;

    public override acceptedTypes = ['application/x-item'];

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: block;
                    min-height: 100px;
                    padding: 24px;
                    border: 2px dashed var(--spectrum-gray-400);
                    border-radius: 4px;
                    text-align: center;
                    transition: all 0.2s;
                }
                :host([aria-dropeffect='move']),
                :host([aria-dropeffect='copy']) {
                    border-color: var(--spectrum-blue-500);
                    background: var(--spectrum-blue-300);
                    border-style: solid;
                }
                :host([filled]) {
                    border-color: var(--spectrum-green-500);
                    background: var(--spectrum-green-300);
                    border-style: solid;
                }
            `,
        ];
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-drop', (event: Event) => {
            const customEvent = event as CustomEvent;
            const itemId = customEvent.detail.items[0]?.['application/x-item'];
            console.log('[Mixin] Dropped:', itemId);
            this.filled = true;
            this.requestUpdate();
            setTimeout(() => {
                this.filled = false;
                this.requestUpdate();
            }, 800);
        });
    }

    protected override render(): TemplateResult {
        return spHtml`
            <div>${this.label} ${this.filled ? '✓ Dropped!' : ''}</div>
        `;
    }
}
customElements.define('mixin-drop-zone', MixinDropZone);

// ==============================================================================
// APPROACH 2 ADVANCED: Combining Both Mixins
// ==============================================================================

class ReorderableItem extends DraggableMixin(DropTargetMixin(SpectrumElement)) {
    @property({ attribute: false })
    public itemId = '';

    @property({ attribute: false })
    public label = '';

    public override acceptedTypes = ['application/x-reorderable'];

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: flex;
                    align-items: center;
                    padding: 12px;
                    background: var(--spectrum-gray-100);
                    border: 1px solid var(--spectrum-gray-300);
                    border-radius: 4px;
                    margin: 4px 0;
                    cursor: grab;
                }
                :host(:hover) {
                    background: var(--spectrum-gray-200);
                }
                :host([aria-grabbed='true']) {
                    opacity: 0.5;
                }
                /* Blue background when dragging over (drop target) */
                :host([aria-dropeffect='move']) {
                    background: var(--spectrum-blue-300);
                    border-color: var(--spectrum-blue-600);
                    border-width: 2px;
                    box-shadow: 0 0 0 3px rgba(20, 115, 230, 0.3);
                }
                :host(.drop-target-active) {
                    background: var(--spectrum-blue-300);
                    border-color: var(--spectrum-blue-600);
                    box-shadow: 0 0 0 3px rgba(20, 115, 230, 0.3);
                }
                /* Green background flash on successful drop */
                :host(.drop-success) {
                    background: var(--spectrum-green-400) !important;
                    border-color: var(--spectrum-green-600) !important;
                    box-shadow: 0 0 0 3px rgba(44, 173, 109, 0.4) !important;
                    transition: all 0.3s ease-out;
                }
                .handle {
                    margin-right: 8px;
                    color: var(--spectrum-gray-600);
                }
            `,
        ];
    }

    public override getDragItems() {
        return [
            {
                'application/x-reorderable': this.itemId,
                'text/plain': this.label,
            },
        ];
    }

    private handleDrop = (event: Event): void => {
        const customEvent = event as CustomEvent;
        const sourceId =
            customEvent.detail.items[0]?.['application/x-reorderable'];
        console.log('[ReorderableItem] Drop received', {
            sourceId,
            targetId: this.itemId,
        });

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
    };

    public override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-drop', this.handleDrop);
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('sp-drop', this.handleDrop);
    }

    protected override render(): TemplateResult {
        return spHtml`
            <span class="handle">⋮⋮</span>
            <span>${this.label}</span>
        `;
    }
}
customElements.define('reorderable-item', ReorderableItem);

// Reorderable list container that manages state
class ReorderableList extends SpectrumElement {
    @property({ attribute: false })
    public items: Array<{ id: string; label: string }> = [];

    static override get styles(): CSSResultArray {
        return [
            super.styles || [],
            css`
                :host {
                    display: block;
                }
                .item-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    position: relative;
                }
            `,
        ];
    }

    private handleReorder = (event: CustomEvent): void => {
        const { sourceId, targetId } = event.detail;
        console.log('[ReorderableList] Reorder event', { sourceId, targetId });

        // Stop event from bubbling further to prevent multiple handlers
        event.stopPropagation();

        const sourceIndex = this.items.findIndex(
            (item) => item.id === sourceId
        );
        const targetIndex = this.items.findIndex(
            (item) => item.id === targetId
        );

        if (sourceIndex === -1 || targetIndex === -1) {
            console.error('Could not find items', {
                sourceIndex,
                targetIndex,
            });
            return;
        }

        // Reorder the array - create new array reference to trigger Lit update
        const newItems = [...this.items];
        const [removed] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, removed);

        // Assign new array
        this.items = newItems;

        console.log(
            '[ReorderableList] Reordered:',
            this.items.map((i) => i.id).join(', ')
        );

        // Request update
        this.requestUpdate('items');
    };

    private boundHandleReorder = (event: Event): void => {
        this.handleReorder(event as CustomEvent);
    };

    public override connectedCallback(): void {
        super.connectedCallback();

        // Listen for drop enter/exit to show visual blue background indicator
        this.addEventListener('sp-drop-enter', (event: Event) => {
            const target = (event as CustomEvent).target as HTMLElement;
            if (target.tagName.toLowerCase() === 'reorderable-item') {
                target.classList.add('drop-target-active');
            }
        });

        this.addEventListener('sp-drop-exit', (event: Event) => {
            const target = (event as CustomEvent).target as HTMLElement;
            if (target.tagName.toLowerCase() === 'reorderable-item') {
                target.classList.remove('drop-target-active');
            }
        });

        // Add green flash on successful drop
        this.addEventListener('sp-drop', (event: Event) => {
            const target = (event as CustomEvent).target as HTMLElement;
            if (target.tagName.toLowerCase() === 'reorderable-item') {
                // Remove blue, add green on successful drop
                target.classList.remove('drop-target-active');
                target.classList.add('drop-success');
                setTimeout(() => {
                    target.classList.remove('drop-success');
                }, 800);
            }
        });

        // Use the bound handler to avoid duplicates
        this.addEventListener('reorder', this.boundHandleReorder);
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        // Clean up event listener
        this.removeEventListener('reorder', this.boundHandleReorder);
    }

    protected override render(): TemplateResult {
        console.log(
            '[ReorderableList] Rendering with items:',
            this.items.map((i) => i.id).join(', ')
        );
        return spHtml`
            <div class="item-container">
                ${repeat(
                    this.items,
                    (item) => item.id,
                    (item) => spHtml`
                        <reorderable-item
                            .itemId="${item.id}"
                            .label="${item.label}"
                        ></reorderable-item>
                    `
                )}
            </div>
        `;
    }
}
customElements.define('reorderable-list', ReorderableList);

// ==============================================================================
// STORIES
// ==============================================================================

const demoStyles = spHtml`
    <style>
        .demo-section {
            margin: 2em 0;
            padding: 1em;
            border: 1px solid var(--spectrum-gray-300);
            border-radius: 4px;
        }
        .demo-section h3 {
            margin-top: 0;
            color: var(--spectrum-gray-800);
        }
        .description {
            margin-bottom: 1em;
            color: var(--spectrum-gray-700);
            font-size: 14px;
        }
        .code-label {
            font-family: monospace;
            background: var(--spectrum-gray-100);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
        }
    </style>
`;

export const Approach1Controllers = (): TemplateResult => {
    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Approach 1: Pure Controllers</h3>
                <div class="description">
                    <strong>Use case:</strong> Maximum control over UI and behavior.<br />
                    <strong>How it works:</strong> Directly instantiate
                    <span class="code-label">DragController</span> and
                    <span class="code-label">DropController</span> in your component.<br />
                    <strong>Pros:</strong> Zero assumptions, fully customizable<br />
                    <strong>Cons:</strong> More boilerplate code
                </div>

                <controller-draggable
                    itemId="item-1"
                    label="Drag me (Controller)"
                ></controller-draggable>
                <controller-draggable
                    itemId="item-2"
                    label="Or drag me (Controller)"
                ></controller-draggable>

                <controller-drop-zone
                    label="Drop here (Controller approach)"
                ></controller-drop-zone>
            </div>
        </sp-theme>
    `;
};

export const Approach2Mixins = (): TemplateResult => {
    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Approach 2: Mixins</h3>
                <div class="description">
                    <strong>Use case:</strong> Faster development with built-in event handling.<br />
                    <strong>How it works:</strong> Extend your component with
                    <span class="code-label">DraggableMixin</span> or
                    <span class="code-label">DropTargetMixin</span><br />
                    <strong>Pros:</strong> Less boilerplate, automatic event dispatching<br />
                    <strong>Cons:</strong> Less control than pure controllers
                </div>

                <mixin-draggable
                    itemId="item-3"
                    label="Drag me (Mixin)"
                ></mixin-draggable>
                <mixin-draggable
                    itemId="item-4"
                    label="Or drag me (Mixin)"
                ></mixin-draggable>

                <mixin-drop-zone
                    label="Drop here (Mixin approach)"
                ></mixin-drop-zone>
            </div>
        </sp-theme>
    `;
};

export const Approach2Advanced = (): TemplateResult => {
    const items = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
        { id: '4', label: 'Item 4' },
    ];

    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div class="demo-section">
                <h3>Approach 2 Advanced: Combined Mixins</h3>
                <div class="description">
                    <strong>Use case:</strong> Items that are both draggable and drop targets (reorderable lists).<br />
                    <strong>How it works:</strong> Use both
                    <span class="code-label">DraggableMixin</span> and
                    <span class="code-label">DropTargetMixin</span> together<br />
                    <strong>Example:</strong> Layer stack, page ordering, timeline clips
                </div>

                <reorderable-list .items=${items}></reorderable-list>
            </div>
        </sp-theme>
    `;
};

export const AllApproaches = (): TemplateResult => {
    return spHtml`
        ${demoStyles}
        <sp-theme
            color="light"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div style="padding: 2em;">
                <h2>Combined Approaches Demo</h2>
                <p>
                    This demo shows both approaches side-by-side. Both are built on the same
                    underlying controllers, but offer different levels of abstraction.
                </p>

                ${Approach1Controllers()}
                ${Approach2Mixins()}
                ${Approach2Advanced()}
            </div>
        </sp-theme>
    `;
};
