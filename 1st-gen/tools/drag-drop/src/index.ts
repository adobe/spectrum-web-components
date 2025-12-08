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

/**
 * APPROACH 1: Pure Controllers (Headless, Zero UI)
 * 
 * These controllers provide drag-and-drop logic with no UI assumptions.
 * Teams can use these directly for maximum control.
 */

export * from './DragController.js';
export * from './DropController.js';
export * from './AutoscrollController.js';
export * from './DropIndicatorController.js';

/**
 * APPROACH 2: Mixins (Developer-friendly composition)
 * 
 * These mixins wrap the controllers and provide a simpler API.
 * Teams can extend their components with drag-and-drop behavior.
 */

export * from './DraggableMixin.js';
export * from './DropTargetMixin.js';

/**
 * Common types used by both approaches
 */

export type DragItem = Record<string, string | Promise<string>>;

export type DropOperation = 'copy' | 'move' | 'link' | 'none';

export interface DragStartEvent {
    items: DragItem[];
    source: HTMLElement;
}

export interface DragEndEvent {
    items: DragItem[];
    source: HTMLElement;
    dropEffect: DropOperation;
}

export interface DragMoveEvent {
    items: DragItem[];
    source: HTMLElement;
    x: number;
    y: number;
}

export interface DropEvent {
    items: DragItem[];
    source: HTMLElement;
    target: HTMLElement;
}
