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

export interface DragItem {
    [mimeType: string]: string | (() => Promise<string>);
}

export interface DragControllerOptions {
    getItems: () => DragItem[];
    onDragStart?: (event: DragStartEvent) => void;
    onDragEnd?: (event: DragEndEvent) => void;
    renderDragPreview?: (items: DragItem[]) => HTMLElement;
    disabled?: boolean;
}

export interface DragStartEvent {
    items: DragItem[];
    source: HTMLElement;
}

export interface DragEndEvent {
    items: DragItem[];
    source: HTMLElement;
    dropEffect: string;
}

export class DragController implements ReactiveController {
    private host: ReactiveElement;
    private options: DragControllerOptions;

    public isDragging = false;
    public dragItems: DragItem[] = [];

    private dragStartHandler = this.handleDragStart.bind(this);
    private dragEndHandler = this.handleDragEnd.bind(this);
    private keydownHandler = this.handleKeydown.bind(this);
    private pointerDownHandler = this.handlePointerDown.bind(this);

    private keyboardDragMode = false;
    private currentDropTarget: HTMLElement | null = null;

    constructor(host: ReactiveElement, options: DragControllerOptions) {
        this.host = host;
        this.options = options;
        this.host.addController(this);
    }

    hostConnected(): void {
        const element = this.host as unknown as HTMLElement;

        // Make element focusable for keyboard interaction
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        // Add ARIA role if not present
        if (!element.hasAttribute('role')) {
            element.setAttribute('role', 'button');
        }

        // Set up event listeners
        element.addEventListener('dragstart', this.dragStartHandler);
        element.addEventListener('dragend', this.dragEndHandler);
        element.addEventListener('keydown', this.keydownHandler);
        element.addEventListener('pointerdown', this.pointerDownHandler);

        // Enable native drag and drop
        element.draggable = true;
    }

    hostDisconnected(): void {
        const element = this.host as unknown as HTMLElement;
        element.removeEventListener('dragstart', this.dragStartHandler);
        element.removeEventListener('dragend', this.dragEndHandler);
        element.removeEventListener('keydown', this.keydownHandler);
        element.removeEventListener('pointerdown', this.pointerDownHandler);
    }

    private handleDragStart(event: DragEvent): void {
        if (this.options.disabled) {
            event.preventDefault();
            return;
        }

        this.isDragging = true;
        this.dragItems = this.options.getItems();

        // Set drag data
        if (event.dataTransfer) {
            this.dragItems.forEach((item) => {
                Object.entries(item).forEach(([mimeType, data]) => {
                    const dataString = typeof data === 'string' ? data : '';
                    event.dataTransfer!.setData(mimeType, dataString);
                });
            });

            event.dataTransfer.effectAllowed = 'move';
        }

        // Set ARIA attributes
        const element = this.host as unknown as HTMLElement;
        element.setAttribute('aria-grabbed', 'true');

        // Custom drag preview
        if (this.options.renderDragPreview) {
            const preview = this.options.renderDragPreview(this.dragItems);
            document.body.appendChild(preview);
            event.dataTransfer?.setDragImage(preview, 0, 0);
            // Clean up preview after drag starts
            setTimeout(() => document.body.removeChild(preview), 0);
        }

        // Dispatch custom event
        const dragStartEvent = new CustomEvent('sp-drag-start', {
            detail: { items: this.dragItems, source: element },
            bubbles: true,
        });
        element.dispatchEvent(dragStartEvent);

        this.options.onDragStart?.({ items: this.dragItems, source: element });
        this.host.requestUpdate();
    }

    private handleDragEnd(event: DragEvent): void {
        this.isDragging = false;

        const element = this.host as unknown as HTMLElement;
        element.setAttribute('aria-grabbed', 'false');

        // Exit keyboard drag mode if active
        if (this.keyboardDragMode) {
            this.exitKeyboardDragMode();
        }

        // Dispatch custom event
        const dragEndEvent = new CustomEvent('sp-drag-end', {
            detail: {
                items: this.dragItems,
                source: element,
                dropEffect: event.dataTransfer?.dropEffect || 'none',
            },
            bubbles: true,
        });
        element.dispatchEvent(dragEndEvent);

        this.options.onDragEnd?.({
            items: this.dragItems,
            source: element,
            dropEffect: event.dataTransfer?.dropEffect || 'none',
        });

        this.dragItems = [];
        this.host.requestUpdate();
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (this.options.disabled) return;

        switch (event.key) {
            case 'Enter':
            case ' ':
                if (!this.keyboardDragMode) {
                    this.enterKeyboardDragMode();
                } else {
                    this.performKeyboardDrop();
                }
                event.preventDefault();
                break;

            case 'Escape':
                if (this.keyboardDragMode) {
                    this.exitKeyboardDragMode();
                    event.preventDefault();
                }
                break;

            case 'Tab':
                if (this.keyboardDragMode) {
                    this.navigateDropTargets(event.shiftKey ? -1 : 1);
                    event.preventDefault();
                }
                break;
        }
    }

    private handlePointerDown(_event: PointerEvent): void {
        // Ensure we can receive focus for keyboard interactions
        const element = this.host as unknown as HTMLElement;
        const activeElement = (element.getRootNode() as Document | ShadowRoot)
            .activeElement;
        if (activeElement !== element) {
            element.focus();
        }
    }

    private enterKeyboardDragMode(): void {
        this.keyboardDragMode = true;
        this.isDragging = true;
        this.dragItems = this.options.getItems();

        const element = this.host as unknown as HTMLElement;
        element.setAttribute('aria-grabbed', 'true');

        // Announce to screen readers
        this.announceToScreenReader(
            'Item grabbed. Use Tab to navigate to drop targets, Enter to drop, Escape to cancel.'
        );

        // Dispatch drag start event
        const dragStartEvent = new CustomEvent('sp-drag-start', {
            detail: { items: this.dragItems, source: element },
            bubbles: true,
        });
        element.dispatchEvent(dragStartEvent);

        this.options.onDragStart?.({ items: this.dragItems, source: element });
        this.host.requestUpdate();
    }

    private exitKeyboardDragMode(): void {
        this.keyboardDragMode = false;
        this.isDragging = false;
        this.currentDropTarget = null;

        const element = this.host as unknown as HTMLElement;
        element.setAttribute('aria-grabbed', 'false');

        this.announceToScreenReader('Drop cancelled.');

        // Dispatch drag end event
        const dragEndEvent = new CustomEvent('sp-drag-end', {
            detail: {
                items: this.dragItems,
                source: element,
                dropEffect: 'none',
            },
            bubbles: true,
        });
        element.dispatchEvent(dragEndEvent);

        this.options.onDragEnd?.({
            items: this.dragItems,
            source: element,
            dropEffect: 'none',
        });

        this.dragItems = [];
        this.host.requestUpdate();
    }

    private navigateDropTargets(direction: number): void {
        // Find all drop targets in the document
        const dropTargets = Array.from(
            document.querySelectorAll('[data-drop-target="true"]')
        ) as HTMLElement[];

        if (dropTargets.length === 0) return;

        let currentIndex = this.currentDropTarget
            ? dropTargets.indexOf(this.currentDropTarget)
            : -1;

        currentIndex =
            (currentIndex + direction + dropTargets.length) %
            dropTargets.length;
        this.currentDropTarget = dropTargets[currentIndex];

        // Focus the drop target
        this.currentDropTarget.focus();

        // Announce the drop target
        const label =
            this.currentDropTarget.getAttribute('aria-label') ||
            this.currentDropTarget.textContent?.trim() ||
            'Drop target';
        this.announceToScreenReader(`Drop target: ${label}`);
    }

    private performKeyboardDrop(): void {
        if (!this.currentDropTarget) return;

        // Simulate a drop event on the current drop target
        const dropEvent = new CustomEvent('sp-drop', {
            detail: {
                items: this.dragItems,
                source: this.host,
                target: this.currentDropTarget,
            },
            bubbles: true,
        });

        this.currentDropTarget.dispatchEvent(dropEvent);
        this.announceToScreenReader('Item dropped successfully.');
        this.exitKeyboardDragMode();
    }

    private announceToScreenReader(message: string): void {
        // Create a live region for announcements
        let liveRegion = document.getElementById('drag-announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'drag-announcements';
            liveRegion.setAttribute('aria-live', 'assertive');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }

        liveRegion.textContent = message;
    }

    public updateOptions(options: Partial<DragControllerOptions>): void {
        this.options = { ...this.options, ...options };
    }
}
