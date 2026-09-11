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
import { validateEnum } from '@adobe/spectrum-wc-core/utils/index.js';

import { DragAndDropController } from '../../controllers/drag-and-drop-controller/index.js';
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
 * @attribute {DropzoneSize} size - Controls the illustrated icon scale and container dimensions.
 *
 * @slot - Slot for the illustrated message and browse control. Hidden automatically when `filled` is true.
 * @slot filled-content - Slot for the uploaded-state content (e.g. an image preview). Shown automatically when `filled` is true; hidden otherwise.
 *
 * @fires swc-dropzone-should-accept - Cancelable event fired on every native `dragover`
 *   tick while a drag is over the zone, not just on entry. Cancel to reject the dragged
 *   payload and set the cursor to `none`.
 * @fires swc-dropzone-dragover - Fired once when dragged files enter the zone and are
 *   accepted; does not repeat on subsequent `dragover` ticks while still hovering.
 * @fires swc-dropzone-dragleave - Fired when an accepted drag leaves the zone after a
 *   100 ms debounce, or immediately when it becomes rejected. Detail is a plain snapshot
 *   `{ clientX, clientY, relatedTarget }` captured synchronously from the native event.
 * @fires swc-dropzone-drop - Fired when files are dropped on the zone. `element.dragged`
 *   is still `true` when this event fires; it transitions to `false` after dispatch.
 */
export abstract class DropzoneBase extends SizedMixin(SpectrumElement, {
  validSizes: DROPZONE_VALID_SIZES,
}) {
  /**
   * The size of the drop zone.
   *
   * @default m
   */
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
    } else {
      validateEnum(this, {
        prop: 'drop-effect',
        value,
        valid: DROP_EFFECTS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-dropzone--docs',
      });
    }
  }

  /** @internal */
  private _dropEffect: DropEffect = DROPZONE_DEFAULT_DROP_EFFECT;

  // ──────────────────────────
  //     IMPLEMENTATION
  // ──────────────────────────

  constructor() {
    super();
    new DragAndDropController(this, {
      isDragged: () => this.dragged,
      shouldAccept: (event) =>
        this.dispatchEvent(
          new CustomEvent<DragEvent>(SWC_DROPZONE_SHOULD_ACCEPT_EVENT, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: event,
          })
        ),
      dropEffect: () => this._dropEffect,
      onDragEnter: (event) => {
        this.dragged = true;
        this.dispatchEvent(
          new CustomEvent<DragEvent>(SWC_DROPZONE_DRAGOVER_EVENT, {
            bubbles: true,
            composed: true,
            detail: event,
          })
        );
      },
      onDragLeave: (snapshot) => {
        this.dragged = false;
        this.dispatchEvent(
          new CustomEvent<DropzoneDragLeaveDetail>(
            SWC_DROPZONE_DRAGLEAVE_EVENT,
            {
              bubbles: true,
              composed: true,
              detail: snapshot,
            }
          )
        );
      },
      onDrop: (event) => {
        // Dispatch before clearing `dragged`; `updated()` handles the status region after `filled` settles.
        this.dispatchEvent(
          new CustomEvent<DragEvent>(SWC_DROPZONE_DROP_EVENT, {
            bubbles: true,
            composed: true,
            detail: event,
          })
        );
        this.dragged = false;
      },
    });
  }

  /** @internal */
  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => this.size,
      selector: 'swc-illustrated-message',
    }
  );

  /** @internal */
  protected handleDefaultSlotChange(): void {
    this._sizePropagation.propagate();
  }
}
