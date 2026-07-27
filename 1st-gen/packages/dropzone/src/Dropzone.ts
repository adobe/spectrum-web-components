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

import {
  CSSResultArray,
  html,
  PropertyValues,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import dropzoneStyles from './dropzone.css.js';

/**
 * @deprecated Not exported from `@spectrum-web-components/dropzone` in a future release. Use `DragEvent` directly.
 */
export type DropzoneEventDetail = DragEvent;

export type DropEffects = 'copy' | 'move' | 'link' | 'none';

/**
 * @element sp-dropzone
 *
 * @slot - The default slot on an `sp-dropzone` is a great place to place upload instructions
 * built with an `sp-illustrated-message` or other information, possibly even built from data
 * provided by the upload, to support users successfully interacting with the drag and drop
 * based features of your application
 *
 * @fires sp-dropzone-should-accept - A cancellable event that confirms whether or not
 * a file dropped on the UI should be accepted.
 * @fires sp-dropzone-dragover - Announces when files have been dragged over the UI, but not yet dropped.
 * @fires sp-dropzone-dragleave - Announces when dragged files have been moved out of the UI without having been dropped.
 * @fires sp-dropzone-drop - Announces when dragged files have been dropped on the UI.
 */
export class Dropzone extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [dropzoneStyles];
  }

  /**
   * Controls the feedback (typically visual) the user is given during a drag and drop operation
   *
   * @attr
   * @type {'copy' | 'move' | 'link' | 'none'}
   */
  public get dropEffect(): DropEffects {
    return this._dropEffect;
  }

  public set dropEffect(value: DropEffects) {
    if (['copy', 'move', 'link', 'none'].includes(value)) {
      this._dropEffect = value;
    }
  }

  private _dropEffect: DropEffects = 'copy';

  /**
   * Indicates that files are currently being dragged over the dropzone.
   *
   * @deprecated The `isDragged` property will be replaced by `dragged` in a future release. The `dragged` attribute is unchanged.
   */
  @property({ type: Boolean, reflect: true, attribute: 'dragged' })
  public isDragged = false;

  /**
   * Set this property to indicate that the component is in a filled state.
   *
   * @deprecated The `isFilled` property will be replaced by `filled` in a future release. The `filled` attribute is unchanged.
   */
  @property({ type: Boolean, attribute: 'filled' })
  public isFilled = false;

  private debouncedDragLeave: number | null = null;

  public override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('drop', this.onDrop);
    this.addEventListener('dragover', this.onDragOver);
    this.addEventListener('dragleave', this.onDragLeave);

    if (
      window.__swc?.DEBUG &&
      (this.onDragOver !== Dropzone.prototype.onDragOver ||
        this.onDragLeave !== Dropzone.prototype.onDragLeave ||
        this.onDrop !== Dropzone.prototype.onDrop)
    ) {
      window.__swc.warn(
        this,
        `<${this.localName}> "onDragOver", "onDragLeave", and "onDrop" are deprecated as public, overridable methods and will become non-public in a future release.`,
        'https://opensource.adobe.com/spectrum-web-components/components/dropzone/',
        { level: 'deprecation' }
      );
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (!window.__swc?.DEBUG) {
      return;
    }
    if (changes.has('isDragged') && this.isDragged) {
      window.__swc.warn(
        this,
        `The "isDragged" property on <${this.localName}> has been deprecated and will be removed in a future release. Use "dragged" instead.`,
        'https://opensource.adobe.com/spectrum-web-components/components/dropzone/',
        { level: 'deprecation' }
      );
    }
    if (changes.has('isFilled') && this.isFilled) {
      window.__swc.warn(
        this,
        `The "isFilled" property on <${this.localName}> has been deprecated and will be removed in a future release. Use "filled" instead.`,
        'https://opensource.adobe.com/spectrum-web-components/components/dropzone/',
        { level: 'deprecation' }
      );
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('drop', this.onDrop);
    this.removeEventListener('dragover', this.onDragOver);
    this.removeEventListener('dragleave', this.onDragLeave);

    this.clearDebouncedDragLeave();
  }

  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  public onDragOver(event: DragEvent): void {
    /**
     * Required for Chrome/Windows to consistently allow dropping.
     * Without preventDefault(), Chrome may suppress the drop event.
     */
    event.preventDefault();

    const shouldAcceptEvent = new CustomEvent<DragEvent>(
      'sp-dropzone-should-accept',
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: event,
      }
    );

    const shouldAccept = this.dispatchEvent(shouldAcceptEvent);

    if (!event.dataTransfer) {
      return;
    }

    if (!shouldAccept) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    this.clearDebouncedDragLeave();

    if (!this.isDragged) {
      this.isDragged = true;

      if (window.__swc?.DEBUG) {
        window.__swc.warn(
          this,
          `<${this.localName}> events will be renamed with a "swc-dropzone-" prefix in a future release (for example, "sp-dropzone-should-accept" becomes "swc-dropzone-should-accept").`,
          'https://opensource.adobe.com/spectrum-web-components/components/dropzone/',
          { level: 'deprecation' }
        );
      }
    }

    event.dataTransfer.dropEffect = this.dropEffect;

    this.dispatchEvent(
      new CustomEvent<DragEvent>('sp-dropzone-dragover', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  public onDragLeave(event: DragEvent): void {
    /**
     * Ignore internal dragleave events triggered while moving
     * between children inside the dropzone.
     */
    if (event.relatedTarget && this.contains(event.relatedTarget as Node)) {
      return;
    }

    this.clearDebouncedDragLeave();

    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;

      this.dispatchEvent(
        new CustomEvent<DragEvent>('sp-dropzone-dragleave', {
          bubbles: true,
          composed: true,
          detail: event,
        })
      );
    }, 100);
  }

  /**
   * @deprecated This method will become non-public in a future release. Overriding it is deprecated.
   */
  public onDrop(event: DragEvent): void {
    /**
     * Prevent browser default behavior (opening files in browser).
     */
    event.preventDefault();

    if (!this.isDragged) {
      return;
    }

    this.clearDebouncedDragLeave();

    this.isDragged = false;

    this.dispatchEvent(
      new CustomEvent<DragEvent>('sp-dropzone-drop', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  protected override render(): TemplateResult {
    return html`
      <slot></slot>
    `;
  }

  protected clearDebouncedDragLeave(): void {
    if (this.debouncedDragLeave !== null) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    'sp-dropzone:should-accept': CustomEvent<DragEvent>;
    'sp-dropzone:dragover': CustomEvent<DragEvent>;
    'sp-dropzone:dragleave': CustomEvent<DragEvent>;
    'sp-dropzone:drop': CustomEvent<DragEvent>;
  }
}
