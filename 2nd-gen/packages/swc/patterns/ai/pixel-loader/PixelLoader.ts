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
import { validateEnum } from '@adobe/spectrum-wc-core/utils';

import {
  cellScaleKeyframes,
  cellTranslateKeyframes,
  durationForCells,
  groupOpacityKeyframes,
  loopFramesFor,
  reducedMotionDuration,
  reducedMotionKeyframes,
  reducedMotionLoopFrames,
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
import {
  ICONS,
  PIXEL_LOADER_ICON_NAMES,
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
 * How the loader animates, derived once from `paused` and the reduced-motion
 * preference (see `_animationMode`). Every play/ticker/commit decision keys off
 * this rather than re-testing the two conditions:
 * - `static`: frozen on the settled frame (`paused`).
 * - `reduced`: an in-place, row-by-row opacity fade (`prefers-reduced-motion`).
 * - `full`: the per-cell falling-and-scaling build.
 */
type AnimationMode = 'static' | 'reduced' | 'full';

/** Docs URL attributed to dev-mode validation warnings. */
const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-pixel-loader--docs';

/**
 * The AI pixel loader: an assembling/disassembling "pixel-fall"
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

    // On reconnect, `disconnectedCallback` cancelled the cell animations, but no
    // property changes, so Lit does not re-render and `updated()` never re-runs
    // `_playCells()`; a single-icon loader would come back frozen. Restart the
    // build here to mirror the cancel on disconnect. Guarded to reconnect
    // (`hasUpdated`): the first connect has no rendered cells yet, and the
    // initial `updated()` handles the first play.
    if (this.hasUpdated) {
      this._playCells();
    }
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

  // Dev-only warnings for invalid `icon` / `preset` values. Both silently fall
  // back (icon -> aiLogo, preset -> dropped), so surface the misuse in DEBUG
  // builds. `undefined`/`""` mean "no preset" and never warn; the literal
  // `"undefined"` is the Storybook "unset" sentinel `_resolvedPreset` guards
  // against, so it is excluded here too.
  private _validateProps(changed: PropertyValues): void {
    if (changed.has('icon')) {
      validateEnum(this, {
        prop: 'icon',
        value: this.icon,
        valid: PIXEL_LOADER_ICON_NAMES,
        url: DOCS_URL,
      });
    }

    // Cast for the runtime value: an attribute can carry any string, and the
    // `"undefined"` sentinel is not part of the declared type.
    const preset = this.preset as string | undefined;
    if (changed.has('preset') && preset && preset !== 'undefined') {
      validateEnum(this, {
        prop: 'preset',
        value: preset,
        valid: PIXEL_LOADER_PRESET_NAMES,
        url: DOCS_URL,
      });
    }
  }

  protected override willUpdate(changed: PropertyValues): void {
    this._validateProps(changed);

    // Reset the cycle before render. Doing this in `updated()` is too late:
    // `render()` would already have drawn `newPreset[oldIndex]`, then
    // `_playCells()` would animate that DOM against `newPreset[0]`'s cells.
    if (changed.has('preset')) {
      this._presetIndex = 0;
    }

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

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);

    // The rendered cells only change when the active icon does (icon swap,
    // preset, or preset step); drop the cached lookups for just those cases so
    // cell-preserving updates (e.g. toggling `paused`) reuse them rather than
    // re-querying the shadow root.
    if (
      changed.has('_displayedIcon') ||
      changed.has('preset') ||
      changed.has('_presetIndex')
    ) {
      this._containerCache = null;
      this._cellElsCache = null;
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

  /** The single source of truth for how the loader animates right now. */
  private get _animationMode(): AnimationMode {
    if (this.paused) {
      return 'static';
    }
    return this._prefersReducedMotion() ? 'reduced' : 'full';
  }

  /**
   * Duration of one loader cycle for `cells`, in ms. Reduced motion runs the
   * shorter row-fade cycle instead of the full per-cell falling build.
   */
  private _cycleDuration(cells: readonly Cell[]): number {
    return this._animationMode === 'reduced'
      ? reducedMotionDuration(cells)
      : durationForCells(cells);
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

  /** Cells for a named icon, guarding against an unknown name. */
  private _cellsForIcon(name: PixelLoaderIconName): Cell[] {
    return ICONS[name] ?? ICONS.aiLogo;
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
      cells: this._cellsForIcon(iconName),
      isPreset: Boolean(icons),
    };
  }

  private _syncTicker(): void {
    this._stopTicker();

    // Reduced motion still cycles (the fade communicates activity); only the
    // static (paused) mode stops the preset ticker.
    const icons = this._presetIcons();
    if (!icons || !this.isConnected || this._animationMode === 'static') {
      return;
    }

    // Advance one icon per cycle. The interval is the current preset icon's own
    // cycle duration (reduced motion swaps in its shorter row-fade cycle), so
    // the ticker stays in step. Derive its cells from the `icons` list already
    // resolved above rather than re-resolving the preset via `_activeCells`.
    const cells = this._cellsForIcon(icons[this._presetIndex % icons.length]);
    this._ticker = window.setInterval(() => {
      this._presetIndex = (this._presetIndex + 1) % icons.length;
    }, this._cycleDuration(cells));
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
    // Only the full falling build has a drop to finish before swapping. Presets,
    // the static and reduced modes (no falling build to settle), an idle loader,
    // and an already-matching icon all commit the new icon immediately.
    return (
      Boolean(this._resolvedPreset) ||
      this._animationMode !== 'full' ||
      this._animations.length === 0 ||
      this._displayedIcon === this.icon
    );
  }

  /** Cached lookup of the `.swc-PixelLoader` container in the shadow root. */
  private _container(): HTMLElement | null {
    return (this._containerCache ??=
      this.shadowRoot?.querySelector<HTMLElement>('.swc-PixelLoader') ?? null);
  }

  /**
   * Eases the current icon from its in-progress frame to the settled state,
   * then swaps to the requested `icon` and builds it. This softens a mid-build
   * icon change into "finish assembling, then transition" instead of a snap.
   */
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
    const mode = this._animationMode;

    // Clear any inline values a previous render left behind so a stale value
    // never becomes the Web Animations implicit offset-0 keyframe on the next
    // play (the "artifact from the previous cycle" when toggling `paused`).
    cellEls.forEach((cellEl) => {
      cellEl.style.removeProperty('translate');
      cellEl.style.removeProperty('scale');
      cellEl.style.removeProperty('opacity');
    });
    container?.style.removeProperty('opacity');

    // Static (paused): hold the fully-settled frame with no animation.
    if (mode === 'static') {
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

    const options: KeyframeAnimationOptions = {
      duration: this._cycleDuration(cells),
      iterations: isPreset ? 1 : Infinity,
      fill: 'forwards',
      easing: 'linear',
    };

    // Reduced motion: fade the grid in and out one row at a time in place, with
    // no transform and no group envelope, so it still signals activity without
    // the falling or scaling motion.
    if (mode === 'reduced') {
      const rowTotal = reducedMotionLoopFrames(cells);
      cellEls.forEach((cellEl, index) => {
        const cell = cells[index];
        if (!cell) {
          return;
        }
        this._animations.push(
          cellEl.animate(reducedMotionKeyframes(cell, cells, rowTotal), options)
        );
      });
      return;
    }

    const total = loopFramesFor(cells);

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
