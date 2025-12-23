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

import { ReactiveElement } from 'lit';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import {
    DragController,
    DragControllerOptions,
    DragItem,
    DropOperation,
} from './DragController.js';

/**
 * Constructor type for mixin pattern
 */
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Interface for elements using DraggableMixin
 */
export interface DraggableElement extends ReactiveElement {
    disabled: boolean;
    allowedDropOperations: DropOperation[];
    isDragging: boolean;
    dragItems: DragItem[];
    dragController: DragController;
    getDragItems(): DragItem[];
    renderDragPreview?(items: DragItem[]): HTMLElement;
}

/**
 * Options for DraggableMixin
 */
export interface DraggableMixinOptions {
    defaultAllowedDropOperations?: DropOperation[];
}

/**
 * DraggableMixin - APPROACH 2
 * 
 * Adds drag functionality to any component using DragController internally.
 * This is a higher-level abstraction that provides:
 * - Automatic controller setup
 * - Event dispatching
 * - Reactive properties
 * 
 * Usage:
 * ```typescript
 * class MyItem extends DraggableMixin(SpectrumElement) {
 *   getDragItems() {
 *     return [{ 'application/x-item': this.id }];
 *   }
 * 
 *   render() {
 *     return html`<div>My custom UI</div>`;
 *   }
 * }
 * ```
 */
export function DraggableMixin<T extends Constructor<ReactiveElement>>(
    constructor: T,
    options: DraggableMixinOptions = {}
): T & Constructor<DraggableElement> {
    class MixedElement extends constructor {
        @property({ type: Boolean, reflect: true })
        public disabled = false;

        @property({ type: Array, attribute: 'allowed-drop-operations' })
        public allowedDropOperations: DropOperation[] =
            options.defaultAllowedDropOperations || ['move'];

        public dragController!: DragController;

        public get isDragging(): boolean {
            return this.dragController?.isDragging || false;
        }

        public get dragItems(): DragItem[] {
            return this.dragController?.dragItems || [];
        }

        /**
         * Override this method to provide custom drag items.
         * Default implementation uses element id and text content.
         */
        public getDragItems(): DragItem[] {
            const element = this as unknown as HTMLElement;
            return [
                {
                    'application/x-draggable': element.id || '',
                    'text/plain': element.textContent?.trim() || '',
                },
            ];
        }

        /**
         * Override this method to provide a custom drag preview.
         */
        public renderDragPreview?(_items: DragItem[]): HTMLElement;

        public override connectedCallback(): void {
            super.connectedCallback();

            const controllerOptions: DragControllerOptions = {
                getItems: () => this.getDragItems(),
                getAllowedDropOperations: () => this.allowedDropOperations,
                disabled: this.disabled,
                renderDragPreview: this.renderDragPreview
                    ? this.renderDragPreview.bind(this)
                    : undefined,
                onDragStart: (event) => {
                    this.dispatchEvent(
                        new CustomEvent('sp-drag-start', {
                            detail: event,
                            bubbles: true,
                            composed: true,
                        })
                    );
                },
                onDragEnd: (event) => {
                    this.dispatchEvent(
                        new CustomEvent('sp-drag-end', {
                            detail: event,
                            bubbles: true,
                            composed: true,
                        })
                    );
                },
                onDragMove: (event) => {
                    this.dispatchEvent(
                        new CustomEvent('sp-drag-move', {
                            detail: event,
                            bubbles: true,
                            composed: true,
                        })
                    );
                },
            };

            this.dragController = new DragController(this, controllerOptions);
        }

        public override updated(
            changedProperties: Map<string | number | symbol, unknown>
        ): void {
            super.updated(changedProperties);

            if (changedProperties.has('disabled') && this.dragController) {
                this.dragController.updateOptions({ disabled: this.disabled });
            }

            if (
                changedProperties.has('allowedDropOperations') &&
                this.dragController
            ) {
                this.dragController.updateOptions({
                    getAllowedDropOperations: () => this.allowedDropOperations,
                });
            }
        }
    }

    return MixedElement as T & Constructor<DraggableElement>;
}
