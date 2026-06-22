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

import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  DROP_EFFECTS,
  type DropEffect,
  SWC_DROPZONE_DRAGLEAVE_EVENT,
  SWC_DROPZONE_DRAGOVER_EVENT,
  SWC_DROPZONE_DROP_EVENT,
  SWC_DROPZONE_SHOULD_ACCEPT_EVENT,
} from './Dropzone.types.js';

/**
 * Base class for the `<swc-dropzone>` drop zone component.
 *
 * Encapsulates all drag-and-drop event handling, state management, and
 * validation logic. Rendering, ARIA, and CSS are provided by the concrete
 * SWC subclass.
 *
 * @slot - Slot for the illustrated message, browse control, and any uploaded content.
 *
 * @fires swc-dropzone-should-accept - Cancelable event fired on `dragover`. Cancel to
 *   reject the dragged payload and set the cursor to `none`.
 * @fires swc-dropzone-dragover - Fired when dragged files are over the zone and accepted.
 * @fires swc-dropzone-dragleave - Fired when dragged files leave the zone after a 100 ms
 *   debounce. `event.detail.dataTransfer` may be `null` if the browser has already ended
 *   the drag session by the time the event fires.
 * @fires swc-dropzone-drop - Fired when files are dropped on the zone. `element.dragged`
 *   is still `true` when this event fires; it transitions to `false` after dispatch.
 */
export abstract class DropzoneBase extends SpectrumElement {
  // ──────────────────────────
  //     SHARED API
  // ──────────────────────────

  /**
   * Whether files are currently being dragged over the drop zone.
   * Set automatically by the component; also settable to reflect programmatic state.
   *
   * @attr dragged
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public dragged = false;

  /**
   * Whether the drop zone has received a file and is in the filled state.
   * Set by consuming code after a successful drop or browse-file selection to
   * switch the zone to its filled visual.
   *
   * @attr filled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public filled = false;

  /**
   * The OS drag-cursor feedback shown while a file is held over the zone.
   * Maps directly to `DataTransfer.dropEffect`. Does not reflect as an
   * attribute because it controls browser chrome, not component state.
   *
   * @type {'copy' | 'move' | 'link' | 'none'}
   * @default 'copy'
   */
  public get dropEffect(): DropEffect {
    return this._dropEffect;
  }

  public set dropEffect(value: DropEffect) {
    if ((DROP_EFFECTS as readonly string[]).includes(value)) {
      this._dropEffect = value;
    } else if (window.__swc?.DEBUG) {
      window.__swc?.warn(
        this,
        `<${this.localName}> "dropEffect" received an invalid value: "${value}". Must be one of: ${DROP_EFFECTS.join(', ')}.`,
        'https://opensource.adobe.com/spectrum-web-components/?path=/docs/dropzone--docs',
        { type: 'api' }
      );
    }
  }

  private _dropEffect: DropEffect = 'copy';

  // ──────────────────────────
  //     IMPLEMENTATION
  // ──────────────────────────

  /** Timer ID for debounced dragleave — prevents flickering on child drag events. */
  private _dragLeaveTimer: ReturnType<typeof setTimeout> | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('drop', this._onDrop);
    this.addEventListener('dragover', this._onDragOver);
    this.addEventListener('dragleave', this._onDragLeave);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('drop', this._onDrop);
    this.removeEventListener('dragover', this._onDragOver);
    this.removeEventListener('dragleave', this._onDragLeave);
    this._clearDragLeaveTimer();
  }

  /** @internal */
  private readonly _onDragOver = (event: DragEvent): void => {
    event.preventDefault();

    const shouldAcceptEvent = new CustomEvent<DragEvent>(
      SWC_DROPZONE_SHOULD_ACCEPT_EVENT,
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: event,
      }
    );

    const accepted = this.dispatchEvent(shouldAcceptEvent);

    if (!event.dataTransfer) {
      return;
    }

    if (!accepted) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    this._clearDragLeaveTimer();

    if (!this.dragged) {
      this.dragged = true;
      this._onDragStateChange(true);
    }

    event.dataTransfer.dropEffect = this._dropEffect;

    this.dispatchEvent(
      new CustomEvent<DragEvent>(SWC_DROPZONE_DRAGOVER_EVENT, {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  };

  /** @internal */
  private readonly _onDragLeave = (event: DragEvent): void => {
    if (event.relatedTarget && this.contains(event.relatedTarget as Node)) {
      return;
    }

    this._clearDragLeaveTimer();

    this._dragLeaveTimer = setTimeout(() => {
      this._dragLeaveTimer = null;
      this.dragged = false;
      this._onDragStateChange(false);

      this.dispatchEvent(
        new CustomEvent<DragEvent>(SWC_DROPZONE_DRAGLEAVE_EVENT, {
          bubbles: true,
          composed: true,
          detail: event,
        })
      );
    }, 100);
  };

  /** @internal */
  private readonly _onDrop = (event: DragEvent): void => {
    event.preventDefault();

    if (!this.dragged) {
      return;
    }

    this._clearDragLeaveTimer();
    // Update the status region synchronously before dispatch (matching _onDragLeave),
    // and dispatch while `dragged` is still `true` so listeners read correct state.
    this._onDragStateChange(false);
    this.dispatchEvent(
      new CustomEvent<DragEvent>(SWC_DROPZONE_DROP_EVENT, {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
    this.dragged = false;
  };

  // ──────────────────────────────
  //     API TO OVERRIDE
  // ──────────────────────────────

  /**
   * Called when the `dragged` state changes. Subclasses override this to
   * update the shadow DOM status region for accessibility announcements.
   *
   * @param _isDragged - `true` when drag enters; `false` when it leaves.
   * @internal
   */
  protected _onDragStateChange(_isDragged: boolean): void {
    // Implemented in the concrete SWC class.
  }

  /** @internal */
  private _clearDragLeaveTimer(): void {
    if (this._dragLeaveTimer !== null) {
      clearTimeout(this._dragLeaveTimer);
      this._dragLeaveTimer = null;
    }
  }
}
