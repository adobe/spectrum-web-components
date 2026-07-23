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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { DropzoneBase } from '@adobe/spectrum-wc-core/components/dropzone';

import visuallyHiddenStyles from '../../stylesheets/_lit-styles/visually-hidden.css';
import styles from './dropzone.css';

/**
 * A drop zone is a target area that accepts dragged-and-dropped content, typically files,
 * from the operating system or from within the same page. It pairs a visual drop area with
 * a required browse button or link that opens the OS file picker for keyboard users.
 *
 * `role="group"` is fixed on the host element. Provide an accessible name via `aria-label`
 * or `aria-labelledby` so assistive technology can announce the upload purpose.
 *
 * @element swc-dropzone
 * @since 2.0.0
 *
 * @slot - Slot for the illustrated message and browse control. Hidden automatically when
 *   `filled` is `true`. A browse button or link **must** always be provided so keyboard
 *   users can upload files.
 * @slot filled-content - Slot for the uploaded-state content (e.g. an image preview).
 *   Shown automatically when `filled` is `true`; hidden otherwise.
 *
 * @fires swc-dropzone-should-accept - Cancelable event fired on every native `dragover`
 *   tick while a drag is over the zone, not just on entry. Cancel to reject the dragged
 *   payload and set the cursor to `none`.
 * @fires swc-dropzone-dragover - Fired once when dragged files enter the zone and are
 *   accepted; does not repeat on subsequent `dragover` ticks while still hovering.
 * @fires swc-dropzone-dragleave - Fired when dragged files leave the zone.
 * @fires swc-dropzone-drop - Fired when files are dropped on the zone. Set `filled` in
 *   your handler to transition the zone to its filled state.
 *
 * @cssprop --swc-dropzone-background-color - Background color of the drop zone. Defaults to transparent; overridden to a subtle accent tint in the dragged state.
 * @cssprop --swc-dropzone-border-color - Border color. Defaults to the gray-300 token in the default state; overridden to the accent visual color in the dragged and focus-within states.
 * @cssprop --swc-dropzone-border-style - Border style. Defaults to dashed; overridden to solid in the dragged and focus-within states.
 * @cssprop --swc-dropzone-padding - Padding inside the drop zone. Defaults vary by size: spacing-300 (s), spacing-400 (m), spacing-600 (l).
 * @cssprop --swc-illustrated-message-illustration-color - Illustration color cascaded into a slotted `swc-illustrated-message`. Unset by default; overridden to the accent-visual-color token in the dragged state.
 */
export class Dropzone extends DropzoneBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Message announced via the built-in status region when a file is dragged over an
   * empty drop zone. Override to localize.
   *
   * @attr dragged-message
   * @default 'File ready to drop'
   */
  @property({ type: String, attribute: 'dragged-message' })
  public draggedMessage = 'File ready to drop';

  /**
   * Message announced via the built-in status region when a file is accepted.
   * Override to localize.
   *
   * @attr filled-message
   * @default 'File accepted'
   */
  @property({ type: String, attribute: 'filled-message' })
  public filledMessage = 'File accepted';

  /**
   * Message announced via the built-in status region when a file is dragged over an
   * already-filled drop zone. Override to localize.
   *
   * @attr replace-message
   * @default 'Drop to replace existing file'
   */
  @property({ type: String, attribute: 'replace-message' })
  public replaceMessage = 'Drop to replace existing file';

  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * Called synchronously on drag-enter and drag-leave so the status region is
   * updated before the next Lit render cycle completes. The drop case is handled
   * by `updated()` so that `filled` has been set by the consumer's handler first.
   *
   * @param isDragged - `true` when drag enters; `false` when it leaves.
   * @internal
   */
  protected override _onDragStateChange(isDragged: boolean): void {
    const el = this._statusEl;
    if (el) {
      el.textContent = this._statusText(isDragged, this.filled);
    }
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [visuallyHiddenStyles, styles];
  }

  /** @internal Ref to the shadow DOM status region for live announcements. */
  private get _statusEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector('[role="status"]') ?? null;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    if (window.__swc?.DEBUG) {
      this._warnMissingAccessibleName();
    }
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('dragged') || changes.has('filled')) {
      this._updateStatusRegion();
    }

    if (window.__swc?.DEBUG && changes.has('dragged')) {
      this._warnMissingAccessibleName();
    }
  }

  /**
   * Updates the shadow DOM `role="status"` text to match the current drag/fill state.
   * Called from `updated()` after Lit re-renders.
   *
   * @internal
   */
  private _updateStatusRegion(): void {
    const el = this._statusEl;
    if (el) {
      el.textContent = this._statusText(this.dragged, this.filled);
    }
  }

  /** @internal */
  private _statusText(isDragged: boolean, isFilled: boolean): string {
    if (isDragged && isFilled) {
      return this.replaceMessage;
    } else if (isDragged) {
      return this.draggedMessage;
    } else if (isFilled) {
      return this.filledMessage;
    }
    return '';
  }

  /** @internal */
  private _hasWarnedNoAccessibleName = false;

  /** @internal */
  private _warnMissingAccessibleName(): void {
    if (
      this.getAttribute('aria-label') ||
      this.getAttribute('aria-labelledby')
    ) {
      this._hasWarnedNoAccessibleName = false;
      return;
    }
    if (this._hasWarnedNoAccessibleName) {
      return;
    }
    this._hasWarnedNoAccessibleName = true;
    window.__swc?.warn(
      this,
      `<${this.localName}> requires an accessible name describing the upload purpose.`,
      'https://opensource.adobe.com/spectrum-web-components/?path=/docs/dropzone--docs',
      {
        type: 'accessibility',
        issues: [
          'add aria-label="Upload files" (or a purpose-specific label) to <swc-dropzone>, or',
          'add aria-labelledby referencing a visible heading that describes the drop zone.',
        ],
      }
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Dropzone">
        <div
          role="status"
          aria-live="polite"
          class="swc-Dropzone-status swc-VisuallyHidden"
        ></div>
        ${this.filled
          ? html`
              <slot name="filled-content"></slot>
            `
          : html`
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            `}
      </div>
    `;
  }
}
