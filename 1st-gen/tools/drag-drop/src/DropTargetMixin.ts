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
    DropController,
    DropControllerOptions,
    DropEvent,
    DropOperation,
} from './DropController.js';

/**
 * Constructor type for mixin pattern
 */
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Interface for elements using DropTargetMixin
 */
export interface DropTargetElement extends ReactiveElement {
    disabled: boolean;
    acceptedTypes: string[];
    isDropTarget: boolean;
    isValidDropTarget: boolean;
    dropController: DropController;
    getDropOperation?(types: Set<string>): DropOperation;
}

/**
 * Options for DropTargetMixin
 */
export interface DropTargetMixinOptions {
    defaultAcceptedTypes?: string[];
}

/**
 * DropTargetMixin - APPROACH 2
 * 
 * Adds drop zone functionality to any component using DropController internally.
 * This is a higher-level abstraction that provides:
 * - Automatic controller setup
 * - Event dispatching
 * - Reactive properties for visual state
 * 
 * Usage:
 * ```typescript
 * class MyDropZone extends DropTargetMixin(SpectrumElement) {
 *   acceptedTypes = ['application/x-item'];
 * 
 *   connectedCallback() {
 *     super.connectedCallback();
 *     this.addEventListener('sp-drop', (e) => {
 *       console.log('Dropped:', e.detail.items);
 *     });
 *   }
 * 
 *   render() {
 *     return html`
 *       <div class="${this.isDropTarget ? 'active' : ''}">
 *         Drop zone
 *       </div>
 *     `;
 *   }
 * }
 * ```
 */
export function DropTargetMixin<T extends Constructor<ReactiveElement>>(
    constructor: T,
    options: DropTargetMixinOptions = {}
): T & Constructor<DropTargetElement> {
    class MixedElement extends constructor {
        @property({ type: Boolean, reflect: true })
        public disabled = false;

        @property({ type: Array, attribute: 'accepted-types' })
        public acceptedTypes: string[] = options.defaultAcceptedTypes || [];

        public dropController!: DropController;

        public get isDropTarget(): boolean {
            return this.dropController?.isDropTarget || false;
        }

        public get isValidDropTarget(): boolean {
            return this.dropController?.isValidDropTarget || false;
        }

        /**
         * Override this method to customize drop operation determination.
         */
        public getDropOperation?(_types: Set<string>): DropOperation;

        public override connectedCallback(): void {
            super.connectedCallback();

            const controllerOptions: DropControllerOptions = {
                acceptedTypes: this.acceptedTypes,
                disabled: this.disabled,
                getDropOperation: this.getDropOperation
                    ? this.getDropOperation.bind(this)
                    : undefined,
                onDrop: (event: DropEvent) => {
                    console.log('[DropTargetMixin] onDrop called', {
                        items: event.items
                    });
                    // Dispatch sp-drop event - mark it to prevent infinite loop
                    const customEvent = new CustomEvent('sp-drop', {
                        detail: event,
                        bubbles: true,
                        composed: true,
                    });
                    // Mark this event so handleCustomDrop knows it came from here
                    (customEvent as any).__fromMixinOnDrop = true;
                    this.dispatchEvent(customEvent);
                },
                onDropEnter: (event: DropEvent) => {
                    this.dispatchEvent(
                        new CustomEvent('sp-drop-enter', {
                            detail: event,
                            bubbles: true,
                            composed: true,
                        })
                    );
                },
                onDropExit: (event: DropEvent) => {
                    this.dispatchEvent(
                        new CustomEvent('sp-drop-exit', {
                            detail: event,
                            bubbles: true,
                            composed: true,
                        })
                    );
                },
            };

            this.dropController = new DropController(this, controllerOptions);
        }

        public override updated(
            changedProperties: Map<string | number | symbol, unknown>
        ): void {
            super.updated(changedProperties);

            if (changedProperties.has('disabled') && this.dropController) {
                this.dropController.updateOptions({ disabled: this.disabled });
            }

            if (changedProperties.has('acceptedTypes') && this.dropController) {
                this.dropController.updateOptions({
                    acceptedTypes: this.acceptedTypes,
                });
            }
        }
    }

    return MixedElement as T & Constructor<DropTargetElement>;
}
