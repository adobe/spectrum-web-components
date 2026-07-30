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
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import {
  buildCellKeyframes,
  SETTLED_OPACITY,
  SETTLED_TRANSFORM,
} from './animation.js';
import type {
  Cell,
  PixelLoaderIconName,
  PixelLoaderPresetName,
} from './data.js';
import { DURATION_MS, ICONS, PRESETS } from './data.js';
import {
  computeCornerRadii,
  CornerRadii,
  cornerRadiiToBorderRadius,
} from './geometry.js';

import styles from './pixel-loader.css';

export { ICON_NAMES, PRESET_NAMES } from './data.js';
export type { PixelLoaderIconName, PixelLoaderPresetName } from './data.js';

const CORNER_RADIUS = '2px';

/**
 * Prototype shell for the Conversational AI pixel loader pattern unit: an
 * assembling/disassembling "pixel-fall" icon animation for loading states.
 * Ported from the design spec; see that document for the full behavioral
 * spec.
 *
 * @element swc-pixel-loader
 */
export class PixelLoader extends SpectrumElement {
  /** Icon to display. Ignored while `preset` is set. */
  @property({ type: String, reflect: true })
  public icon: PixelLoaderIconName = 'aiLogo';

  /**
   * Cycles through a themed sequence of icons, one per loop, instead of a
   * single `icon`.
   */
  @property({ type: String, reflect: true })
  public preset: PixelLoaderPresetName | undefined = undefined;

  /** Renders the fully-settled, non-animating appearance. */
  @property({ type: Boolean, reflect: true })
  public paused = false;

  /** Rendered size, in any valid CSS length. */
  @property({ type: String, reflect: true })
  public size = '56px';

  /** Accessible label for the loading indicator. */
  @property({ type: String, reflect: true })
  public label = 'Loading';

  @state()
  private _presetIndex = 0;

  private _animations: Animation[] = [];

  private _ticker: number | null = null;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    this._syncTicker();
  }

  public override disconnectedCallback(): void {
    this._stopTicker();
    this._cancelAnimations();

    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('preset')) {
      this._presetIndex = 0;
      this._syncTicker();
    }

    this._playCells();
  }

  private _prefersReducedMotion(): boolean {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Resolves `preset` against the known preset table, guarding against
   * attribute values that don't match a `PixelLoaderPresetName` (e.g. an
   * unset Storybook control arg serialized as the literal string
   * `"undefined"` rather than the attribute being absent).
   */
  private _presetIcons(): PixelLoaderIconName[] | undefined {
    return this.preset ? PRESETS[this.preset] : undefined;
  }

  private get _activeIconName(): PixelLoaderIconName {
    const icons = this._presetIcons();
    if (icons) {
      return icons[this._presetIndex % icons.length];
    }

    return this.icon;
  }

  private get _cells(): Cell[] {
    return ICONS[this._activeIconName] ?? ICONS.aiLogo;
  }

  private _syncTicker(): void {
    this._stopTicker();

    const icons = this._presetIcons();
    if (!icons || !this.isConnected) {
      return;
    }

    this._ticker = window.setInterval(() => {
      this._presetIndex = (this._presetIndex + 1) % icons.length;
    }, DURATION_MS);
  }

  private _stopTicker(): void {
    if (this._ticker !== null) {
      window.clearInterval(this._ticker);
      this._ticker = null;
    }
  }

  private _cancelAnimations(): void {
    this._animations.forEach((animation) => animation.cancel());
    this._animations = [];
  }

  private _playCells(): void {
    this._cancelAnimations();

    const cellEls = Array.from(
      this.shadowRoot?.querySelectorAll<HTMLElement>('.swc-PixelLoader-cell') ??
        []
    );
    const cells = this._cells;
    const renderStatic = this.paused || this._prefersReducedMotion();
    const isPreset = Boolean(this._presetIcons());

    cellEls.forEach((cellEl, index) => {
      const cell = cells[index];
      if (!cell) {
        return;
      }

      if (renderStatic) {
        cellEl.style.transform = SETTLED_TRANSFORM;
        cellEl.style.opacity = String(SETTLED_OPACITY);
        return;
      }

      const animation = cellEl.animate(buildCellKeyframes(cell), {
        duration: DURATION_MS,
        iterations: isPreset ? 1 : Infinity,
        fill: 'forwards',
      });
      this._animations.push(animation);
    });
  }

  private _renderCell(cell: Cell, radii: CornerRadii): TemplateResult {
    return html`
      <div
        class="swc-PixelLoader-cell"
        style=${styleMap({
          'grid-column': String(cell.col + 1),
          'grid-row': String(cell.row + 1),
          'border-radius': cornerRadiiToBorderRadius(radii, CORNER_RADIUS),
        })}
      ></div>
    `;
  }

  protected override render(): TemplateResult {
    const cells = this._cells;
    const radii = computeCornerRadii(cells);

    return html`
      <div
        class="swc-PixelLoader"
        style=${styleMap({ '--swc-pixel-loader-size': this.size })}
        role="img"
        aria-label=${this.label}
      >
        ${cells.map((cell, index) => this._renderCell(cell, radii[index]))}
      </div>
    `;
  }
}
