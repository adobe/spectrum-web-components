/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// ──────────────────
//     SIZES
// ──────────────────

export type DropzoneSize = 's' | 'm' | 'l';

export const DROPZONE_VALID_SIZES = [
  's',
  'm',
  'l',
] as const satisfies readonly DropzoneSize[];

// ──────────────────
//     DROP EFFECT
// ──────────────────

/** Valid OS drag-cursor feedback values for the drop zone. */
export type DropEffect = 'copy' | 'move' | 'link' | 'none';

export const DROP_EFFECTS = [
  'copy',
  'move',
  'link',
  'none',
] as const satisfies readonly DropEffect[];

// ──────────────────
//     EVENTS
// ──────────────────

/** Fired when files are dragged over the drop zone; cancelable to reject. */
export const SWC_DROPZONE_SHOULD_ACCEPT_EVENT = 'swc-dropzone-should-accept';

/** Fired when files are dragged over the drop zone and accepted. */
export const SWC_DROPZONE_DRAGOVER_EVENT = 'swc-dropzone-dragover';

/** Fired when dragged files leave the drop zone without being dropped. */
export const SWC_DROPZONE_DRAGLEAVE_EVENT = 'swc-dropzone-dragleave';

/** Fired when files are dropped on the drop zone. */
export const SWC_DROPZONE_DROP_EVENT = 'swc-dropzone-drop';

/**
 * Detail emitted with `swc-dropzone-dragleave`. Values are captured synchronously
 * from the native `DragEvent` before the 100 ms debounce timer fires, preventing
 * stale reads from a recycled event object.
 */
export interface DropzoneDragLeaveDetail {
  clientX: number;
  clientY: number;
  relatedTarget: EventTarget | null;
}

/** Type alias retained for consumers who imported `DropzoneEventDetail` from the 1st-gen package. */
export type DropzoneEventDetail = DragEvent;

declare global {
  interface GlobalEventHandlersEventMap {
    [SWC_DROPZONE_SHOULD_ACCEPT_EVENT]: CustomEvent<DragEvent>;
    [SWC_DROPZONE_DRAGOVER_EVENT]: CustomEvent<DragEvent>;
    [SWC_DROPZONE_DRAGLEAVE_EVENT]: CustomEvent<DropzoneDragLeaveDetail>;
    [SWC_DROPZONE_DROP_EVENT]: CustomEvent<DragEvent>;
  }
}
