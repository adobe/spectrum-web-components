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

import { CSSResultArray, html, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import styles from './pixel-loader.css';

// Pixel-fall logo animation for the AI generating indicator. Cells are
// absolutely-positioned divs in a fixed 1000-unit space scaled to `size`. The
// browser drives the motion via generated CSS @keyframes (no requestAnimationFrame,
// no SVG); each cell animates only `transform` and `opacity` with one `replace`
// animation each, so both composite on the GPU. Only the single `aiLogo` icon is
// ported (the load-bearing case) — a single icon is a pure infinite CSS loop with
// zero JS. When not playing, cells render settled and opaque (the poster frame).
// ponytail: single icon only; add the multi-icon sequence + timer if a preset is needed.

interface Cell {
  cx: number;
  cy: number;
  stagger: number;
  exitStart: number;
  fadeIn: [number, number];
  fadeOut: [number, number];
}

// ai-logo: 12-cell diamond with hand-tuned timings (source Lottie 1000×1000 canvas).
const AI_LOGO: Cell[] = [
  {
    cx: 500,
    cy: 800,
    stagger: 0,
    exitStart: 47,
    fadeIn: [1, 4],
    fadeOut: [47, 59],
  },
  {
    cx: 300,
    cy: 700,
    stagger: 2,
    exitStart: 48,
    fadeIn: [4, 7],
    fadeOut: [48, 60],
  },
  {
    cx: 700,
    cy: 700,
    stagger: 4,
    exitStart: 49,
    fadeIn: [6, 9],
    fadeOut: [49, 61],
  },
  {
    cx: 400,
    cy: 600,
    stagger: 6,
    exitStart: 50,
    fadeIn: [9, 12],
    fadeOut: [50, 62],
  },
  {
    cx: 600,
    cy: 600,
    stagger: 8,
    exitStart: 51,
    fadeIn: [13, 16],
    fadeOut: [51, 63],
  },
  {
    cx: 200,
    cy: 500,
    stagger: 10,
    exitStart: 52,
    fadeIn: [14, 17],
    fadeOut: [52, 64],
  },
  {
    cx: 800,
    cy: 500,
    stagger: 14,
    exitStart: 54,
    fadeIn: [18, 21],
    fadeOut: [54, 66],
  },
  {
    cx: 400,
    cy: 400,
    stagger: 16,
    exitStart: 55,
    fadeIn: [21, 24],
    fadeOut: [55, 67],
  },
  {
    cx: 600,
    cy: 400,
    stagger: 18,
    exitStart: 56,
    fadeIn: [23, 26],
    fadeOut: [56, 68],
  },
  {
    cx: 300,
    cy: 300,
    stagger: 20,
    exitStart: 57,
    fadeIn: [26, 29],
    fadeOut: [57, 69],
  },
  {
    cx: 700,
    cy: 300,
    stagger: 22,
    exitStart: 58,
    fadeIn: [27, 30],
    fadeOut: [58, 70],
  },
  {
    cx: 500,
    cy: 200,
    stagger: 24,
    exitStart: 59,
    fadeIn: [31, 34],
    fadeOut: [59, 71],
  },
];

// Easing control points → cubic-bezier in the generated keyframes. `fade` is linear.
const EASE = {
  drop: [0.333, 0, 0.667, 1],
  recover: [0.333, 0, 0.833, 1],
  exit: [0.563, 0, 0.906, 0.757],
  fade: [0.167, 0.167, 0.833, 0.833],
} as const;

const TOTAL_FRAMES = 72;
const FPS = 30;
const DURATION_MS = (TOTAL_FRAMES / FPS) * 1000; // 2.4s / cycle
const Y_START = -876.156;
const Y_OVERSHOOT = 18;
const Y_EXIT = 1015;
const VIEWBOX = 1000;
const CELL = 100;

type Stop = { f: number; decl: string; ease?: readonly number[] | null };

const pct = (frame: number): string =>
  `${+((frame / TOTAL_FRAMES) * 100).toFixed(4)}%`;
const cb = (c: readonly number[]): string => `cubic-bezier(${c.join(',')})`;

function emitKeyframes(name: string, stops: Stop[]): string {
  let body = '';
  let lastPct: string | null = null;
  for (const s of stops) {
    const p = pct(s.f);
    if (p === lastPct) {
      continue;
    }
    lastPct = p;
    const ease = s.ease ? `animation-timing-function:${cb(s.ease)};` : '';
    body += `${p}{${s.decl}${ease}}`;
  }
  return `@keyframes ${name}{${body}}`;
}

const ty = (v: number): string => `transform:translateY(${v}px);`;
const op = (v: number): string => `opacity:${v};`;

function cellYKeyframes(name: string, c: Cell): string {
  const s = c.stagger;
  const e = c.exitStart;
  const stops: Stop[] = [
    { f: 0, decl: ty(Y_START), ease: s > 0 ? null : EASE.drop },
  ];
  if (s > 0) {
    stops.push({ f: s, decl: ty(Y_START), ease: EASE.drop });
  }
  stops.push({ f: s + 10, decl: ty(Y_OVERSHOOT), ease: EASE.recover });
  stops.push({ f: s + 13, decl: ty(0) });
  stops.push({ f: e, decl: ty(0), ease: EASE.exit });
  stops.push({ f: e + 12, decl: ty(Y_EXIT) });
  stops.push({ f: TOTAL_FRAMES, decl: ty(Y_EXIT) });
  return emitKeyframes(name, stops);
}

function cellOpacityKeyframes(name: string, c: Cell): string {
  const [fi0, fi1] = c.fadeIn;
  const [fo0, fo1] = c.fadeOut;
  return emitKeyframes(name, [
    { f: 0, decl: op(0) },
    { f: fi0, decl: op(0), ease: EASE.fade },
    { f: fi1, decl: op(1) },
    { f: fo0, decl: op(1), ease: EASE.fade },
    { f: fo1, decl: op(0) },
    { f: TOTAL_FRAMES, decl: op(0) },
  ]);
}

// Icon is constant, so generate its keyframes once at module load.
const KEYFRAMES_CSS = AI_LOGO.map(
  (c, i) =>
    cellYKeyframes(`swc-pl-${i}-y`, c) +
    cellOpacityKeyframes(`swc-pl-${i}-o`, c)
).join('');

/**
 * Pixel-fall AI logo animation.
 *
 * @element swc-pixel-loader
 */
export class PixelLoader extends SpectrumElement {
  /** Rendered edge length in pixels. */
  @property({ type: Number })
  public size = 24;

  /** Whether the fall animation is running; when false, shows the settled poster frame. */
  @property({ type: Boolean, reflect: true })
  public playing = false;

  public static override get styles(): CSSResultArray {
    return [styles, unsafeCSS(KEYFRAMES_CSS)];
  }

  protected override render(): TemplateResult {
    const scale = this.size / VIEWBOX;
    return html`
      <div
        aria-hidden="true"
        class="canvas"
        style=${styleMap({
          inlineSize: `${this.size}px`,
          blockSize: `${this.size}px`,
        })}
      >
        <div class="space" style=${styleMap({ transform: `scale(${scale})` })}>
          ${AI_LOGO.map(
            (c, i) => html`
              <div
                class="cell"
                style=${styleMap({
                  left: `${c.cx - CELL / 2}px`,
                  top: `${c.cy - CELL / 2}px`,
                  animation: this.playing
                    ? `swc-pl-${i}-y ${DURATION_MS}ms linear infinite, swc-pl-${i}-o ${DURATION_MS}ms linear infinite`
                    : 'none',
                })}
              ></div>
            `
          )}
        </div>
      </div>
    `;
  }
}
