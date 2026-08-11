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
import {
  DURATION_MS,
  ICONS,
  PIXEL_LOADER_PRESET_NAMES,
  PRESETS,
} from './data.js';
import {
  computeCornerRadii,
  CornerRadii,
  cornerRadiiToBorderRadius,
} from './geometry.js';

import styles from './pixel-loader.css';

export { PIXEL_LOADER_ICON_NAMES, PIXEL_LOADER_PRESET_NAMES } from './data.js';
export type { PixelLoaderIconName, PixelLoaderPresetName } from './data.js';

/**
 * The Conversational AI pixel loader: an assembling/disassembling "pixel-fall"
 * icon animation for loading and generating states. A grid of cells drops in to
 * assemble the active icon, holds, then drops away before the next loop.
 *
 * @element swc-pixel-loader
 */
export class PixelLoader extends SpectrumElement {
  private static readonly CORNER_RADIUS = '2px';

  /** Icon to display. Ignored while `preset` is set. */
  @property({ type: String, reflect: true })
  public icon: PixelLoaderIconName = 'aiLogo';

  /**
   * Cycles through a themed sequence of icons, one per loop, instead of a
   * single `icon`.
   */
  @property({ type: String, reflect: true })
  public preset?: PixelLoaderPresetName;

  /** Renders the fully-settled, non-animating appearance. */
  @property({ type: Boolean, reflect: true })
  public paused = false;

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
    super.updated(changed);

    if (changed.has('preset')) {
      this._presetIndex = 0;
    }

    // Resync on `paused` too: pausing (or reduced motion) must stop the preset
    // ticker so a frozen loader holds one icon instead of cycling on a timer.
    if (changed.has('preset') || changed.has('paused')) {
      this._syncTicker();
    }

    if (
      changed.has('icon') ||
      changed.has('preset') ||
      changed.has('paused') ||
      changed.has('_presetIndex')
    ) {
      this._playCells();
    }
  }

  private _prefersReducedMotion(): boolean {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Whether the loader should render its frozen, non-animating appearance:
   * when explicitly `paused`, or when the user has requested reduced motion.
   * Both suppress the cell animation and the preset ticker.
   */
  private get _isStatic(): boolean {
    return this.paused || this._prefersReducedMotion();
  }

  private _isValidPreset(preset: string): preset is PixelLoaderPresetName {
    return (PIXEL_LOADER_PRESET_NAMES as readonly string[]).includes(preset);
  }

  /**
   * Validated `preset`; guards against attribute values that don't match a
   * `PixelLoaderPresetName` (e.g. an unset Storybook control arg serialized
   * as the literal string `"undefined"` rather than the attribute being
   * absent).
   */
  private get _resolvedPreset(): PixelLoaderPresetName | undefined {
    return this.preset && this._isValidPreset(this.preset)
      ? this.preset
      : undefined;
  }

  private _presetIcons(): PixelLoaderIconName[] | undefined {
    const preset = this._resolvedPreset;
    return preset ? PRESETS[preset] : undefined;
  }

  /**
   * Resolves the cells for the icon currently on screen in one place, so
   * `render()` and `_playCells()` each do a single preset lookup instead of
   * separately deriving the active icon name, its cell list, and whether a
   * preset is active.
   */
  private get _activeCells(): { cells: Cell[]; isPreset: boolean } {
    const icons = this._presetIcons();
    const iconName = icons
      ? icons[this._presetIndex % icons.length]
      : this.icon;

    return {
      cells: ICONS[iconName] ?? ICONS.aiLogo,
      isPreset: Boolean(icons),
    };
  }

  private _syncTicker(): void {
    this._stopTicker();

    const icons = this._presetIcons();
    if (!icons || !this.isConnected || this._isStatic) {
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
    const { cells, isPreset } = this._activeCells;
    const renderStatic = this._isStatic;

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
          'border-radius': cornerRadiiToBorderRadius(
            radii,
            PixelLoader.CORNER_RADIUS
          ),
        })}
      ></div>
    `;
  }

  protected override render(): TemplateResult {
    const { cells } = this._activeCells;
    const radii = computeCornerRadii(cells);

    return html`
      <div class="swc-PixelLoader" role="progressbar" aria-label=${this.label}>
        ${cells.map((cell, index) => this._renderCell(cell, radii[index]))}
      </div>
    `;
  }
}
