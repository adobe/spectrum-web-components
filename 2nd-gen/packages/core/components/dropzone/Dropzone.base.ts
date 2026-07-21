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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';

import { SlotAttributePropagationController } from '../../controllers/slot-attribute-propagation-controller/index.js';
import {
  DROP_EFFECTS,
  type DropEffect,
  DROPZONE_DEFAULT_DROP_EFFECT,
  DROPZONE_VALID_SIZES,
  type DropzoneDragLeaveDetail,
  type DropzoneSize,
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
 * @slot - Slot for the illustrated message and browse control. Hidden automatically when `filled` is true.
 * @slot filled-content - Slot for the uploaded-state content (e.g. an image preview). Shown automatically when `filled` is true; hidden otherwise.
 *
 * @fires swc-dropzone-should-accept - Cancelable event fired on every native `dragover`
 *   tick while a drag is over the zone, not just on entry. Cancel to reject the dragged
 *   payload and set the cursor to `none`.
 * @fires swc-dropzone-dragover - Fired once when dragged files enter the zone and are
 *   accepted; does not repeat on subsequent `dragover` ticks while still hovering.
 * @fires swc-dropzone-dragleave - Fired when dragged files leave the zone after a 100 ms
 *   debounce. Detail is a plain snapshot `{ clientX, clientY, relatedTarget }` captured
 *   synchronously from the native event before the timer fires.
 * @fires swc-dropzone-drop - Fired when files are dropped on the zone. `element.dragged`
 *   is still `true` when this event fires; it transitions to `false` after dispatch.
 */
export abstract class DropzoneBase extends SizedMixin(SpectrumElement, {
  validSizes: DROPZONE_VALID_SIZES,
}) {
  declare public size: DropzoneSize;

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
   * Maps directly to `DataTransfer.dropEffect`. Settable via the `drop-effect`
   * attribute, but property changes do not reflect back to the attribute
   * because it controls browser chrome, not component state.
   *
   * @attr drop-effect
   * @type {'copy' | 'move' | 'link' | 'none'}
   * @default 'copy'
   */
  @property({ type: String, attribute: 'drop-effect' })
  public get dropEffect(): DropEffect {
    return this._dropEffect;
  }

  public set dropEffect(value: DropEffect | null) {
    // Lit passes `null` here when the `drop-effect` attribute is removed;
    // treat that as "reset to the default" rather than an invalid value.
    if (value === null) {
      const oldValue = this._dropEffect;
      this._dropEffect = DROPZONE_DEFAULT_DROP_EFFECT;
      this.requestUpdate('dropEffect', oldValue);
    } else if ((DROP_EFFECTS as readonly string[]).includes(value)) {
      const oldValue = this._dropEffect;
      this._dropEffect = value;
      this.requestUpdate('dropEffect', oldValue);
    } else if (window.__swc?.DEBUG) {
      window.__swc?.warn(
        this,
        `<${this.localName}> "dropEffect" received an invalid value: "${value}". Must be one of: ${DROP_EFFECTS.join(', ')}.`,
        'https://opensource.adobe.com/spectrum-web-components/?path=/docs/dropzone--docs',
        { type: 'api' }
      );
    }
  }

  private _dropEffect: DropEffect = DROPZONE_DEFAULT_DROP_EFFECT;

  // ──────────────────────────
  //     IMPLEMENTATION
  // ──────────────────────────

  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
      selector: 'swc-illustrated-message',
    }
  );

  protected handleDefaultSlotChange(): void {
    this._sizePropagation.propagate();
  }

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

    if (!event.dataTransfer) {
      return;
    }

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

    if (!accepted) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    this._clearDragLeaveTimer();
    event.dataTransfer.dropEffect = this._dropEffect;

    // `should-accept` above re-fires on every native `dragover` tick (a
    // browser requirement: `dropEffect` must be reasserted on each one), but
    // `dragged` only actually changes once per hover session, so this
    // informational event fires on entry only, not on every tick.
    if (!this.dragged) {
      this.dragged = true;
      this._onDragStateChange(true);

      this.dispatchEvent(
        new CustomEvent<DragEvent>(SWC_DROPZONE_DRAGOVER_EVENT, {
          bubbles: true,
          composed: true,
          detail: event,
        })
      );
    }
  };

  /** @internal */
  private readonly _onDragLeave = (event: DragEvent): void => {
    if (event.relatedTarget && this.contains(event.relatedTarget as Node)) {
      return;
    }

    this._clearDragLeaveTimer();

    // Capture values synchronously; browsers recycle DragEvent objects after
    // the synchronous handler returns, so reading them inside setTimeout is unsafe.
    const { clientX, clientY, relatedTarget } = event;

    this._dragLeaveTimer = setTimeout(() => {
      this._dragLeaveTimer = null;
      this.dragged = false;
      this._onDragStateChange(false);

      this.dispatchEvent(
        new CustomEvent<DropzoneDragLeaveDetail>(SWC_DROPZONE_DRAGLEAVE_EVENT, {
          bubbles: true,
          composed: true,
          detail: { clientX, clientY, relatedTarget },
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
    // Dispatch before clearing `dragged`; `updated()` handles the status region after `filled` settles.
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
   * Called when the `dragged` state changes. Subclasses implement this to
   * update the shadow DOM status region for accessibility announcements.
   *
   * @param isDragged - `true` when drag enters; `false` when it leaves.
   * @internal
   */
  protected abstract _onDragStateChange(isDragged: boolean): void;

  /** @internal */
  private _clearDragLeaveTimer(): void {
    if (this._dragLeaveTimer !== null) {
      clearTimeout(this._dragLeaveTimer);
      this._dragLeaveTimer = null;
    }
  }
}
