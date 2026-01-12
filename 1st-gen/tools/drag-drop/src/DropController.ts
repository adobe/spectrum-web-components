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

import { ReactiveController, ReactiveElement } from 'lit';
import type { DragItem, DropOperation } from './DragController.js';

// Re-export types for convenience
export type { DragItem, DropOperation };

export interface DropEvent {
    items: DragItem[];
    source: HTMLElement;
    target: HTMLElement;
}

export interface DropControllerOptions {
    acceptedTypes?: string[];
    onDrop?: (event: DropEvent) => void;
    onDropEnter?: (event: DropEvent) => void;
    onDropExit?: (event: DropEvent) => void;
    getDropOperation?: (types: Set<string>) => DropOperation;
    disabled?: boolean;
}

export class DropController implements ReactiveController {
    private host: ReactiveElement;
    private options: DropControllerOptions;

    public isDropTarget = false;
    public isValidDropTarget = false;

    private dragEnterCount = 0;
    private dragSource: HTMLElement | null = null;

    private dragEnterHandler = this.handleDragEnter.bind(this);
    private dragOverHandler = this.handleDragOver.bind(this);
    private dragLeaveHandler = this.handleDragLeave.bind(this);
    private dropHandler = this.handleDrop.bind(this);
    private customDropHandler = this.handleCustomDrop.bind(this);
    private dragStartHandler = this.handleDragStart.bind(this);

    constructor(host: ReactiveElement, options: DropControllerOptions = {}) {
        this.host = host;
        this.options = options;
        this.host.addController(this);
    }

    hostConnected(): void {
        const element = this.host as unknown as HTMLElement;
        
        console.log('[DropController] hostConnected', {
            element: element.tagName,
            acceptedTypes: this.options.acceptedTypes
        });

        // Mark as drop target for keyboard navigation
        element.setAttribute('data-drop-target', 'true');

        // Make element focusable for keyboard interaction
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        // Set up event listeners
        element.addEventListener('dragenter', this.dragEnterHandler);
        element.addEventListener('dragover', this.dragOverHandler);
        element.addEventListener('dragleave', this.dragLeaveHandler);
        element.addEventListener('drop', this.dropHandler);
        element.addEventListener(
            'sp-drop',
            this.customDropHandler as EventListener
        );
        // Listen for drag start events to track the source
        document.addEventListener(
            'sp-drag-start',
            this.dragStartHandler as EventListener
        );
    }

    hostDisconnected(): void {
        const element = this.host as unknown as HTMLElement;
        element.removeEventListener('dragenter', this.dragEnterHandler);
        element.removeEventListener('dragover', this.dragOverHandler);
        element.removeEventListener('dragleave', this.dragLeaveHandler);
        element.removeEventListener('drop', this.dropHandler);
        element.removeEventListener(
            'sp-drop',
            this.customDropHandler as EventListener
        );
        document.removeEventListener(
            'sp-drag-start',
            this.dragStartHandler as EventListener
        );
    }

    private handleDragStart(event: Event): void {
        // Track the drag source from the custom event
        const customEvent = event as CustomEvent;
        if (customEvent.detail?.source) {
            this.dragSource = customEvent.detail.source as HTMLElement;
        }
    }

    private handleDragEnter(event: DragEvent): void {
        if (this.options.disabled) return;

        this.dragEnterCount++;
        console.log('[DropController] dragenter', {
            count: this.dragEnterCount,
            types: event.dataTransfer?.types
        });

        if (this.dragEnterCount === 1) {
            this.isDropTarget = true;
            this.isValidDropTarget = this.validateDropTarget(event);

            const element = this.host as unknown as HTMLElement;

            // Try to find the drag source if not already tracked
            if (!this.dragSource) {
                // Fallback: try to find element with aria-grabbed="true"
                const grabbedElement = document.querySelector(
                    '[aria-grabbed="true"]'
                ) as HTMLElement;
                if (grabbedElement) {
                    this.dragSource = grabbedElement;
                }
            }

            const dropOperation = this.isValidDropTarget
                ? this.getDropOperation(event)
                : 'none';
            element.setAttribute('aria-dropeffect', dropOperation);

            if (this.isValidDropTarget) {
                const dropEvent: DropEvent = {
                    items: this.extractDragItems(event),
                    source: this.dragSource || (event.target as HTMLElement),
                    target: element,
                };

                this.options.onDropEnter?.(dropEvent);

                // Dispatch custom event
                const dropEnterEvent = new CustomEvent('sp-drop-enter', {
                    detail: dropEvent,
                    bubbles: true,
                });
                element.dispatchEvent(dropEnterEvent);
            }

            this.host.requestUpdate();
        }
    }

    private handleDragOver(event: DragEvent): void {
        if (this.options.disabled) return;
        
        console.log('[DropController] dragover', {
            isValid: this.isValidDropTarget
        });

        if (this.isValidDropTarget) {
            event.preventDefault();

            // Set the drop effect
            const dropOperation = this.getDropOperation(event);

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = dropOperation;
            }
        }
    }

    private getDropOperation(event: DragEvent): DropOperation {
        if (!event.dataTransfer) return 'none';

        const dropOperation =
            this.options.getDropOperation?.(
                new Set(event.dataTransfer.types || [])
            ) || 'move';

        // Validate drop operation
        const validDropOperations: DropOperation[] = [
            'copy',
            'move',
            'none',
            'link',
        ];
        return validDropOperations.includes(dropOperation as DropOperation)
            ? (dropOperation as DropOperation)
            : 'move';
    }

    private handleDragLeave(event: DragEvent): void {
        if (this.options.disabled) return;

        this.dragEnterCount--;

        if (this.dragEnterCount === 0) {
            this.isDropTarget = false;
            this.isValidDropTarget = false;

            const element = this.host as unknown as HTMLElement;
            element.setAttribute('aria-dropeffect', 'none');

            const dropEvent: DropEvent = {
                items: this.extractDragItems(event),
                source: this.dragSource || (event.target as HTMLElement),
                target: element,
            };

            this.options.onDropExit?.(dropEvent);

            // Dispatch custom event
            const dropExitEvent = new CustomEvent('sp-drop-exit', {
                detail: dropEvent,
                bubbles: true,
            });
            element.dispatchEvent(dropExitEvent);

            this.dragSource = null;
            this.host.requestUpdate();
        }
    }

    private handleDrop(event: DragEvent): void {
        console.log('[DropController] drop event', {
            disabled: this.options.disabled,
            isValid: this.isValidDropTarget
        });
        
        if (this.options.disabled || !this.isValidDropTarget) return;

        event.preventDefault();
        this.performDrop(event);
    }

    private handleCustomDrop(event: CustomEvent): void {
        if (this.options.disabled) return;
        
        // Prevent infinite loop - don't process events dispatched by mixin's onDrop
        if ((event as any).__fromMixinOnDrop) {
            return;
        }

        const { items, source, target } = event.detail;
        const dropEvent: DropEvent = { items, source, target };

        this.options.onDrop?.(dropEvent);

        // Reset state
        this.isDropTarget = false;
        this.isValidDropTarget = false;
        this.dragEnterCount = 0;
        this.dragSource = null;

        const element = this.host as unknown as HTMLElement;
        element.setAttribute('aria-dropeffect', 'none');

        this.host.requestUpdate();
    }

    private performDrop(event: DragEvent): void {
        const element = this.host as unknown as HTMLElement;
        const dropEvent: DropEvent = {
            items: this.extractDragItems(event),
            source: this.dragSource || (event.target as HTMLElement),
            target: element,
        };

        console.log('[DropController] performDrop called', {
            items: dropEvent.items,
            hasOnDrop: !!this.options.onDrop
        });

        // Call onDrop callback (mixin will dispatch sp-drop event)
        this.options.onDrop?.(dropEvent);

        // Reset state
        this.isDropTarget = false;
        this.isValidDropTarget = false;
        this.dragEnterCount = 0;
        this.dragSource = null;
        element.setAttribute('aria-dropeffect', 'none');

        this.host.requestUpdate();
    }

    private validateDropTarget(event: DragEvent): boolean {
        if (!event.dataTransfer) return false;

        const dragTypes = new Set(event.dataTransfer.types);
        const acceptedTypes = this.options.acceptedTypes;

        // If no accepted types specified, accept all
        if (!acceptedTypes || acceptedTypes.length === 0) {
            return true;
        }

        // Check if any drag type is accepted
        return acceptedTypes.some((type) => dragTypes.has(type));
    }

    private extractDragItems(event: DragEvent): DragItem[] {
        if (!event.dataTransfer) return [];

        const items: DragItem[] = [];
        const types = Array.from(event.dataTransfer.types);

        if (types.length > 0) {
            const item: DragItem = {};
            types.forEach((type) => {
                const data = event.dataTransfer!.getData(type);
                if (data) {
                    item[type] = data;
                }
            });
            if (Object.keys(item).length > 0) {
                items.push(item);
            }
        }

        return items;
    }

    public updateOptions(options: Partial<DropControllerOptions>): void {
        this.options = { ...this.options, ...options };
    }
}
