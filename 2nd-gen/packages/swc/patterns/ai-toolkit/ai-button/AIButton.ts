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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ButtonBase } from '@adobe/spectrum-wc-core/components/button';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { SparkleIcon } from '../utils/icons/index.js';

import styles from './ai-button.css';

/** Distance (px) beyond the button edge at which the pointer glow starts. */
const PROXIMITY_RADIUS = 140;

/**
 * A button that triggers an AI-powered action, with a branded gradient
 * treatment. The sparkle icon is always shown; the label comes from the
 * default slot and is optional (icon-only buttons need an `accessible-label`).
 *
 * Retint the whole button by overriding the `--swc-ai-button-brand-color`
 * custom property (an OKLCH color) inline or from a stylesheet.
 *
 * A border reflection tracks the pointer: the glow strengthens as the pointer
 * approaches (`--_swc-ai-button-proximity`) and lights the edge nearest it
 * (`--_swc-ai-button-pointer-x/y`).
 *
 * @element swc-ai-button
 * @slot - Button label text.
 * @cssprop --swc-ai-button-brand-color - OKLCH hue anchor the gradient derives from.
 * @since 2.0.0-beta.3
 */
export class AIButton extends ButtonBase {
  /**
   * AI buttons always render the sparkle icon; treat as icon-present for
   * shared {@link ButtonBase} accessibility checks.
   *
   * @internal
   */
  protected override get hasIcon(): boolean {
    return true;
  }

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  private _pointerFrame = 0;

  private _handlePointerMove = (event: PointerEvent): void => {
    if (this._pointerFrame) {
      return;
    }
    const { clientX, clientY } = event;
    this._pointerFrame = requestAnimationFrame(() => {
      this._pointerFrame = 0;
      this._updateProximity(clientX, clientY);
    });
  };

  private _updateProximity(clientX: number, clientY: number): void {
    if (this.disabled) {
      return;
    }
    const rect = this.getBoundingClientRect();
    // Nearest-point distance from the pointer to the button box (0 when inside).
    const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
    const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
    const distance = Math.hypot(dx, dy);
    const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS);

    const px = ((clientX - rect.left) / rect.width) * 100;
    const py = ((clientY - rect.top) / rect.height) * 100;

    this.style.setProperty('--_swc-ai-button-proximity', `${proximity}`);
    this.style.setProperty('--_swc-ai-button-pointer-x', `${px}%`);
    this.style.setProperty('--_swc-ai-button-pointer-y', `${py}%`);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('pointermove', this._handlePointerMove, {
      passive: true,
    });
  }

  public override disconnectedCallback(): void {
    window.removeEventListener('pointermove', this._handlePointerMove);
    if (this._pointerFrame) {
      cancelAnimationFrame(this._pointerFrame);
      this._pointerFrame = 0;
    }
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    return html`
      <button
        class=${classMap({
          'swc-AIButton': true,
          'is-icon-only': !this.hasLabel,
        })}
        type="button"
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-label=${ifDefined(this.accessibleLabel ?? undefined)}
      >
        <span class="swc-AIButton-reflection" aria-hidden="true"></span>
        <swc-icon class="swc-AIButton-icon" aria-hidden="true">
          ${SparkleIcon()}
        </swc-icon>
        <span class="swc-AIButton-label">
          <slot @slotchange=${this.slotText.handleSlotChange}></slot>
        </span>
      </button>
    `;
  }
}
