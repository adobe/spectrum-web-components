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
  cellScaleKeyframes,
  cellTranslateKeyframes,
  durationForCells,
  groupOpacityKeyframes,
  loopFramesFor,
  SETTLE_EASING,
  SETTLED_OPACITY,
  SETTLED_SCALE,
  SETTLED_TRANSLATE,
} from './animation.js';
import type {
  Cell,
  PixelLoaderIconName,
  PixelLoaderPresetName,
} from './data.js';
import { ICONS, PIXEL_LOADER_PRESET_NAMES, PRESETS } from './data.js';
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
 *
 * @cssprop --swc-pixel-loader-size - Rendered inline and block size of the loader. Defaults to 56px. There is no `size` attribute; set this custom property to resize the loader.
 * @cssprop --swc-pixel-loader-color - Color of the pixel cells. Defaults to `currentcolor`, so the loader inherits the surrounding text color unless overridden.
 */
export class PixelLoader extends SpectrumElement {
  // Relative so the rounding scales with `--swc-pixel-loader-size` and reads as
  // a soft "squircle" pixel at every size (a fixed px radius looks square when
  // the loader is enlarged). Only outward-facing corners round; see geometry.ts.
  private static readonly CORNER_RADIUS = '30%';

  /** Duration of the "finish the current build" ease before an icon swap. */
  private static readonly FINISH_MS = 200;

  // Settle an interrupted build along the same curve a cell recovers with in a
  // normal drop, so a finish-then-swap comes to rest identically.
  private static readonly EASE_FINISH = SETTLE_EASING;

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

  // Cached shadow-root lookups. The container and cell elements are stable
  // between renders, so query them once and reuse across `_playCells` /
  // `_finishThenSwap` calls (including the render-less reduced-motion and pause
  // paths). Invalidated in `updated` since a new icon/preset re-renders cells.
  private _containerCache: HTMLElement | null = null;
  private _cellElsCache: HTMLElement[] | null = null;

  private _ticker: number | null = null;

  private _reducedMotionQuery: MediaQueryList | null = null;

  /**
   * Icon currently on screen. Decoupled from the public `icon` so a mid-build
   * icon change can finish the current build before swapping (see
   * `_finishThenSwap`).
   */
  @state()
  private _displayedIcon: PixelLoaderIconName = 'aiLogo';

  /** Guards stale finish-then-swap completions against a newer change. */
  private _finishToken = 0;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (
      this._reducedMotionQuery === null &&
      typeof window.matchMedia === 'function'
    ) {
      this._reducedMotionQuery = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );
    }
    this._reducedMotionQuery?.addEventListener(
      'change',
      this._handleReducedMotionChange
    );

    this._syncTicker();
  }

  public override disconnectedCallback(): void {
    this._reducedMotionQuery?.removeEventListener(
      'change',
      this._handleReducedMotionChange
    );
    this._stopTicker();
    this._cancelAnimations();

    super.disconnectedCallback();
  }

  /**
   * Re-evaluates the static condition when the user toggles the OS
   * reduced-motion setting while the loader is mounted: stops or restarts the
   * preset ticker and re-renders the cells to match the new preference.
   */
  private _handleReducedMotionChange = (): void => {
    this._syncTicker();
    this._playCells();
  };

  protected override willUpdate(changed: PropertyValues<this>): void {
    // Removing the preset returns to single-icon mode: show the requested icon
    // right away rather than trying to finish a preset build that isn't there.
    if (changed.has('preset') && !this._resolvedPreset) {
      this._displayedIcon = this.icon;
    }

    // Commit an icon change before render unless a live build should finish
    // first; the deferred case is handled in `updated` via `_finishThenSwap`.
    if (changed.has('icon') && this._shouldCommitIconImmediately()) {
      this._displayedIcon = this.icon;
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    // A re-render can replace the cell elements (icon/preset changes the count),
    // so drop the cached lookups before anything below re-queries them.
    this._containerCache = null;
    this._cellElsCache = null;

    if (changed.has('preset')) {
      this._presetIndex = 0;
    }

    // Resync the ticker on `paused` (freeze stops cycling) and on each
    // `_presetIndex` step, since every icon's cycle duration differs.
    if (
      changed.has('preset') ||
      changed.has('paused') ||
      changed.has('_presetIndex')
    ) {
      this._syncTicker();
    }

    // A single-icon change willUpdate did not commit means a build is in
    // flight: let the current icon finish, then swap to the requested icon.
    if (changed.has('icon') && this._displayedIcon !== this.icon) {
      this._finishThenSwap();
    }

    if (
      changed.has('preset') ||
      changed.has('paused') ||
      changed.has('_presetIndex') ||
      (changed.has('_displayedIcon') && !this._resolvedPreset)
    ) {
      this._playCells();
    }
  }

  private _prefersReducedMotion(): boolean {
    if (this._reducedMotionQuery) {
      return this._reducedMotionQuery.matches;
    }

    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /**
   * Whether the loader renders its frozen, fully-settled appearance with no
   * animation: when explicitly `paused`, or when the user has requested reduced
   * motion (matching the React Spectrum loader, which stops the animation).
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
      : this._displayedIcon;

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

    // Advance one icon per cycle; the interval is the current icon's own
    // (dynamic) cycle duration.
    this._ticker = window.setInterval(() => {
      this._presetIndex = (this._presetIndex + 1) % icons.length;
    }, durationForCells(this._activeCells.cells));
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

  private _cellEls(): HTMLElement[] {
    return (this._cellElsCache ??= Array.from(
      this.shadowRoot?.querySelectorAll<HTMLElement>('.swc-PixelLoader-cell') ??
        []
    ));
  }

  private _shouldCommitIconImmediately(): boolean {
    // Nothing to finish when a preset drives the display, when the loader is
    // frozen (paused or reduced motion), when no build is running, or when the
    // icon already matches.
    return (
      Boolean(this._resolvedPreset) ||
      this._isStatic ||
      this._animations.length === 0 ||
      this._displayedIcon === this.icon
    );
  }

  /**
   * Eases the current icon from its in-progress frame to the settled state,
   * then swaps to the requested `icon` and builds it. This softens a mid-build
   * icon change into "finish assembling, then transition" instead of a snap.
   */
  private _container(): HTMLElement | null {
    return (this._containerCache ??=
      this.shadowRoot?.querySelector<HTMLElement>('.swc-PixelLoader') ?? null);
  }

  private _finishThenSwap(): void {
    const cellEls = this._cellEls();
    const container = this._container();

    // Snapshot each element's current animated value onto inline styles, cancel
    // the loop, then ease from that value to settled.
    this._animations.forEach((animation) => {
      try {
        animation.commitStyles();
      } catch {
        // The animation has no rendered target; nothing to snapshot.
      }
    });
    this._cancelAnimations();

    const options: KeyframeAnimationOptions = {
      duration: PixelLoader.FINISH_MS,
      easing: PixelLoader.EASE_FINISH,
      fill: 'forwards',
    };
    const finishing = cellEls.map((cellEl) =>
      cellEl.animate(
        [{ translate: SETTLED_TRANSLATE, scale: SETTLED_SCALE }],
        options
      )
    );
    if (container) {
      finishing.push(
        container.animate([{ opacity: SETTLED_OPACITY }], options)
      );
    }
    this._animations = finishing;

    const token = ++this._finishToken;
    void Promise.all(
      finishing.map((animation) => animation.finished.catch(() => undefined))
    ).then(() => {
      if (token === this._finishToken && this._displayedIcon !== this.icon) {
        this._displayedIcon = this.icon;
      }
    });
  }

  private _playCells(): void {
    this._cancelAnimations();

    const cellEls = this._cellEls();
    const container = this._container();
    const { cells, isPreset } = this._activeCells;
    // `paused` and reduced motion both freeze on the fully-settled icon.
    const renderStatic = this._isStatic;

    // Clear any inline values a previous render left behind so a stale value
    // never becomes the Web Animations implicit offset-0 keyframe on the next
    // play (the "artifact from the previous cycle" when toggling `paused`).
    cellEls.forEach((cellEl) => {
      cellEl.style.removeProperty('translate');
      cellEl.style.removeProperty('scale');
      cellEl.style.removeProperty('opacity');
    });
    container?.style.removeProperty('opacity');

    if (renderStatic) {
      cellEls.forEach((cellEl, index) => {
        if (!cells[index]) {
          return;
        }
        cellEl.style.translate = SETTLED_TRANSLATE;
        cellEl.style.scale = SETTLED_SCALE;
        cellEl.style.opacity = String(SETTLED_OPACITY);
      });
      if (container) {
        container.style.opacity = String(SETTLED_OPACITY);
      }
      return;
    }

    const total = loopFramesFor(cells);
    const options: KeyframeAnimationOptions = {
      duration: durationForCells(cells),
      iterations: isPreset ? 1 : Infinity,
      fill: 'forwards',
      easing: 'linear',
    };

    // Each cell runs a `translate` drop and a `scale` pop (separate animations
    // for their differing per-segment easings); the container runs one opacity
    // envelope so overlapping cells never stack their alpha.
    cellEls.forEach((cellEl, index) => {
      const cell = cells[index];
      if (!cell) {
        return;
      }
      this._animations.push(
        cellEl.animate(cellTranslateKeyframes(cell, total), options)
      );
      this._animations.push(
        cellEl.animate(cellScaleKeyframes(cell, total), options)
      );
    });

    if (container) {
      this._animations.push(
        container.animate(groupOpacityKeyframes(total), options)
      );
    }
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
