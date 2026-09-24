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
import { query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ButtonBase } from '@adobe/spectrum-wc-core/components/button';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { SparkleIcon } from '../utils/icons/index.js';

import styles from './ai-button.css';

const DEFAULT_MOTION = {
  /** Distance (px) beyond the button edge at which the pointer light starts. */
  proximityRadius: 160,
  /** Spring tuning for the light source: slightly underdamped for a liquid lag. */
  springStiffness: 140,
  springDamping: 17,
  /** Exponential smoothing rates (1/s) for proximity and pointer-speed energy. */
  proximityRate: 9,
  energyRate: 4,
  /** Pointer speed (px/ms) that maps to full energy. */
  energySpeed: 2.5,
};

const SETTLE_EPSILON = 0.001;

/**
 * A button that triggers an AI-powered action, with a branded gradient
 * treatment. The sparkle icon is always shown; the label comes from the
 * default slot and is optional (icon-only buttons need an `accessible-label`).
 *
 * Retint the whole button by overriding the `--swc-ai-button-brand-color`
 * custom property (an OKLCH color) inline or from a stylesheet.
 *
 * The frosted-glass surface reacts to the pointer: a spring-driven light
 * source follows it, so the rim, caustic, and specular crescent light up from
 * the direction the pointer approaches, strengthen with proximity, and flare
 * briefly with pointer speed. Motion snaps without easing under
 * `prefers-reduced-motion`.
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

  @query('.swc-AIButton')
  private _button?: HTMLButtonElement;

  /**
   * Pointer-light motion tuning, read every frame. A prototyping hook for the
   * design tuning story, not public API.
   *
   * @internal
   */
  public motionTuning = { ...DEFAULT_MOTION };

  private _frame = 0;
  private _lastTime = 0;
  private _pointer: { x: number; y: number; t: number } | null = null;
  private _reducedMotion = false;

  /** Light source offset from the button center (px), with spring velocity. */
  private _light = { x: 0, y: 0, vx: 0, vy: 0 };
  private _proximity = 0;
  private _targetProximity = 0;
  private _energy = 0;
  private _targetEnergy = 0;

  private _handlePointerMove = (event: PointerEvent): void => {
    const previous = this._pointer;
    const now = event.timeStamp;
    if (previous && now > previous.t) {
      const speed =
        Math.hypot(event.clientX - previous.x, event.clientY - previous.y) /
        (now - previous.t);
      this._targetEnergy = Math.max(
        this._targetEnergy,
        Math.min(1, speed / this.motionTuning.energySpeed)
      );
    }
    this._pointer = { x: event.clientX, y: event.clientY, t: now };
    this._startLoop();
  };

  private _handlePointerOut = (event: PointerEvent): void => {
    // Pointer left the window: let the light fade out where it last was.
    if (!event.relatedTarget) {
      this._pointer = null;
      this._startLoop();
    }
  };

  private _startLoop(): void {
    if (!this._frame) {
      this._lastTime = 0;
      this._frame = requestAnimationFrame(this._tick);
    }
  }

  private _tick = (time: number): void => {
    this._frame = 0;
    const dt = this._lastTime
      ? Math.min((time - this._lastTime) / 1000, 1 / 20)
      : 1 / 60;
    this._lastTime = time;

    const {
      proximityRadius,
      springStiffness,
      springDamping,
      proximityRate,
      energyRate,
    } = this.motionTuning;
    const rect = this.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    let targetX = this._light.x;
    let targetY = this._light.y;

    if (this._pointer && !this.disabled && rect.width && rect.height) {
      const { x, y } = this._pointer;
      targetX = x - (rect.left + halfWidth);
      targetY = y - (rect.top + halfHeight);
      // Nearest-point distance from the pointer to the button box (0 inside).
      const dx = Math.max(rect.left - x, 0, x - rect.right);
      const dy = Math.max(rect.top - y, 0, y - rect.bottom);
      const reach = Math.max(0, 1 - Math.hypot(dx, dy) / proximityRadius);
      // Smoothstep so the light blooms in gently instead of linearly.
      this._targetProximity = reach * reach * (3 - 2 * reach);
    } else {
      this._targetProximity = 0;
    }

    const light = this._light;
    const idle =
      this._targetProximity === 0 &&
      this._proximity < SETTLE_EPSILON &&
      this._energy < SETTLE_EPSILON;
    if (idle) {
      // Out of reach and faded: track the pointer silently so the light
      // enters from the side the pointer approaches, then stop until it moves.
      light.x = targetX;
      light.y = targetY;
      light.vx = light.vy = 0;
      this._targetEnergy = 0;
      if (this._proximity || this._energy) {
        this._proximity = 0;
        this._energy = 0;
        this._writeLight(halfWidth, halfHeight);
      }
      return;
    }

    if (this._reducedMotion) {
      light.x = targetX;
      light.y = targetY;
      light.vx = light.vy = 0;
      this._proximity = this._targetProximity;
      this._energy = 0;
      this._targetEnergy = 0;
    } else {
      light.vx +=
        (springStiffness * (targetX - light.x) - springDamping * light.vx) * dt;
      light.vy +=
        (springStiffness * (targetY - light.y) - springDamping * light.vy) * dt;
      light.x += light.vx * dt;
      light.y += light.vy * dt;

      this._proximity +=
        (this._targetProximity - this._proximity) *
        (1 - Math.exp(-proximityRate * dt));
      // Energy rises fast with pointer speed near the button, then decays.
      const energyTarget = this._targetEnergy * this._proximity;
      const rate = energyTarget > this._energy ? energyRate * 3 : energyRate;
      this._energy +=
        (energyTarget - this._energy) * (1 - Math.exp(-rate * dt));
      this._targetEnergy *= Math.exp(-energyRate * 2 * dt);
    }

    this._writeLight(halfWidth, halfHeight);

    const settled =
      Math.abs(this._targetProximity - this._proximity) < SETTLE_EPSILON &&
      Math.abs(targetX - light.x) < 0.1 &&
      Math.abs(targetY - light.y) < 0.1 &&
      Math.hypot(light.vx, light.vy) < 0.1 &&
      this._energy < SETTLE_EPSILON &&
      this._targetEnergy < SETTLE_EPSILON;
    if (!settled) {
      this._frame = requestAnimationFrame(this._tick);
    }
  };

  private _writeLight(halfWidth: number, halfHeight: number): void {
    const button = this._button;
    if (!button || !halfWidth || !halfHeight) {
      return;
    }
    const { x, y } = this._light;
    // Direction toward the light, scaled so the center is neutral (0) and the
    // edge is fully directional (1).
    const nx = x / halfWidth;
    const ny = y / halfHeight;
    const length = Math.hypot(nx, ny);
    const strength = Math.min(1, length);
    const dirX = length ? (nx / length) * strength : 0;
    const dirY = length ? (ny / length) * strength : 0;
    // Light position clamped to the button box, for the radial caustic.
    const lightX = (Math.min(1, Math.max(-1, nx)) + 1) * 50;
    const lightY = (Math.min(1, Math.max(-1, ny)) + 1) * 50;

    const { style } = button;
    style.setProperty('--_swc-ai-button-proximity', this._proximity.toFixed(3));
    style.setProperty('--_swc-ai-button-energy', this._energy.toFixed(3));
    style.setProperty('--_swc-ai-button-dir-x', dirX.toFixed(3));
    style.setProperty('--_swc-ai-button-dir-y', dirY.toFixed(3));
    style.setProperty('--_swc-ai-button-light-x', `${lightX.toFixed(2)}%`);
    style.setProperty('--_swc-ai-button-light-y', `${lightY.toFixed(2)}%`);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('pointermove', this._handlePointerMove, {
      passive: true,
    });
    window.addEventListener('pointerout', this._handlePointerOut, {
      passive: true,
    });
  }

  public override disconnectedCallback(): void {
    window.removeEventListener('pointermove', this._handlePointerMove);
    window.removeEventListener('pointerout', this._handlePointerOut);
    if (this._frame) {
      cancelAnimationFrame(this._frame);
      this._frame = 0;
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
        <span class="swc-AIButton-nebula" aria-hidden="true"></span>
        <span class="swc-AIButton-glass" aria-hidden="true"></span>
        <span class="swc-AIButton-specular" aria-hidden="true"></span>
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
