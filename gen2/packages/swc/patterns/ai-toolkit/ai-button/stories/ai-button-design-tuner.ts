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

/**
 * Design tuning panel for the AI button glass effect. A prototyping aid for
 * the design spike, not public API: it writes the private
 * `--_swc-ai-button-*` properties as inline styles on the shadow `<button>`
 * (which beats the class declarations), and the pointer spring constants
 * through the internal `motionTuning` field.
 */

import type { PropertyValues, TemplateResult } from 'lit';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import '../swc-ai-button.js';

import type { AIButton } from '../AIButton.js';

type Theme = 'light' | 'dark';
type MotionKey = keyof AIButton['motionTuning'];

type Knob =
  /** A private numeric custom property; `unit` is appended to the value, `suffix` only to the readout. */
  | {
      kind: 'number';
      name: string;
      label: string;
      min: number;
      max: number;
      step: number;
      unit?: 'px' | '%';
      suffix?: '%';
    }
  /** A themed color: `name` gets a -light or -dark suffix for the previewed theme. */
  | { kind: 'color'; name: string; label: string; alpha?: boolean }
  /** A pointer spring constant on the element's `motionTuning` field. */
  | {
      kind: 'motion';
      name: MotionKey;
      label: string;
      min: number;
      max: number;
      step: number;
    }
  /** The public brand color on the host. */
  | { kind: 'brand'; label: string };

interface Group {
  id: string;
  label: string;
  /** Plain-language summary of which part of the effect the group controls. */
  description: string;
  knobs: Knob[];
}

interface ColorOverride {
  hex?: string;
  alpha?: number;
}

const PREFIX = '--_swc-ai-button-';
const BRAND_PROPERTY = '--swc-ai-button-brand-color';
const SIZES = ['s', 'm', 'l', 'xl'] as const;

const num = (
  name: string,
  label: string,
  min: number,
  max: number,
  step: number,
  unit?: 'px' | '%'
): Knob => ({ kind: 'number', name, label, min, max, step, unit });
/** A 0–100 reflection alpha, written unitless because the CSS scales it by the color's own alpha. */
const alpha = (name: string, label: string): Knob => ({
  kind: 'number',
  name,
  label,
  min: 0,
  max: 100,
  step: 1,
  suffix: '%',
});
const color = (name: string, label: string, alpha = true): Knob => ({
  kind: 'color',
  name,
  label,
  alpha,
});
const motion = (
  name: MotionKey,
  label: string,
  min: number,
  max: number,
  step: number
): Knob => ({ kind: 'motion', name, label, min, max, step });

const GROUPS: Group[] = [
  {
    id: 'surface',
    label: 'Surface',
    description:
      'The frosted-glass body of the button. Set its tint and opacity, the label color, and how much it blurs and saturates what is behind it. Gloss is the soft light dome across the top. Brand color retints every brand-based color at once.',
    knobs: [
      { kind: 'brand', label: 'Brand color' },
      color('label-color', 'Label', false),
      color('surface', 'Surface'),
      num('backdrop-blur', 'Backdrop blur', 0, 40, 1, 'px'),
      num('backdrop-saturate', 'Backdrop saturation', 100, 300, 5, '%'),
      color('gloss', 'Gloss'),
      num('gloss-width', 'Gloss width', 0, 150, 1, '%'),
      num('gloss-height', 'Gloss height', 0, 150, 1, '%'),
      num('gloss-fade', 'Gloss fade stop', 0, 100, 1, '%'),
      color('gloss-edge', 'Gloss inner glow'),
      num('gloss-edge-blur', 'Gloss inner glow blur', 0, 40, 1, 'px'),
    ],
  },
  {
    id: 'nebula',
    label: 'Nebula',
    description:
      'The blurred color glow that rises from below the bottom edge. The color stops go from left to right over a pale mist. The edges set where the glow sits, blur sets how soft it is, and the pointer settings set how much it brightens, saturates, grows, and leans toward the pointer.',
    knobs: [
      color('nebula-1', 'Stop 1 (left)'),
      color('nebula-2', 'Stop 2'),
      color('nebula-3', 'Stop 3'),
      color('nebula-4', 'Stop 4 (right)'),
      color('nebula-mist', 'Mist'),
      num('nebula-top', 'Top edge', -50, 100, 1, '%'),
      num('nebula-inline', 'Side edges', -60, 20, 1, '%'),
      num('nebula-bottom', 'Bottom edge', -120, 0, 1, '%'),
      num('nebula-blur', 'Nebula blur (× height)', 0, 0.6, 0.01),
      num('nebula-opacity', 'Resting opacity', 0, 1, 0.01),
      num('nebula-glow-opacity', 'Pointer opacity boost', 0, 1, 0.01),
      num('nebula-glow-saturate', 'Pointer saturation boost', 0, 1.5, 0.01),
      num('nebula-glow-scale', 'Pointer scale boost', 0, 0.3, 0.005),
      num('nebula-shift-x', 'Pointer lean x', 0, 20, 0.5),
      num('nebula-shift-y', 'Pointer lean y', 0, 20, 0.5),
    ],
  },
  {
    id: 'pointer',
    label: 'Pointer light',
    description:
      'The light that shows when the pointer comes near: a hairline on the edge, a halo outside the button, and a caustic glow, rim band, and glint inside the glass. All layers get stronger as the pointer comes closer. Speed flare adds more when the pointer moves fast. The alpha of the rim and specular colors scales all layers.',
    knobs: [
      color('rim', 'Rim color'),
      color('specular', 'Specular color'),
      num('glow-base', 'Glow strength', 0, 1.5, 0.01),
      num('glow-energy', 'Speed flare', 0, 1, 0.01),
      num('edge-width', 'Edge hairline width', 0, 3, 0.25, 'px'),
      alpha('edge-alpha', 'Edge hairline alpha'),
      alpha('far-edge-alpha', 'Far edge alpha'),
      alpha('halo-alpha', 'Halo alpha'),
      num('halo-blur', 'Halo blur', 0, 60, 1, 'px'),
      num('halo-energy-blur', 'Halo speed blur', 0, 40, 1, 'px'),
      alpha('caustic-alpha', 'Caustic alpha'),
      num('caustic-size', 'Caustic size (× height)', 0, 2, 0.01),
      alpha('rim-band-alpha', 'Rim band alpha'),
      num('rim-band-width', 'Rim band width (× height)', 0, 1, 0.01),
      num('rim-band-spread', 'Rim band spread (× height)', 0, 0.2, 0.005),
      alpha('rim-glint-alpha', 'Rim glint alpha'),
      num('rim-glint-width', 'Rim glint width (× height)', 0, 0.3, 0.005),
      num('glass-reach', 'Light reach (× height)', 0.2, 2.5, 0.01),
    ],
  },
  {
    id: 'rim',
    label: 'Rim and stroke',
    description:
      'Thin lines on the edge of the button. The specular crescent follows the pointer. The stroke is a faint static line (dark mode only by default). The bottom rim is a colored hairline along the lower edge (light mode only by default).',
    knobs: [
      num('specular-width', 'Specular width', 0, 4, 0.25, 'px'),
      num('specular-size', 'Specular reach (× height)', 0, 2, 0.01),
      alpha('specular-alpha', 'Specular alpha'),
      alpha('specular-rim-alpha', 'Specular falloff alpha'),
      color('stroke-top', 'Stroke top'),
      color('stroke-bottom', 'Stroke bottom'),
      color('bottom-rim-1', 'Bottom rim left'),
      color('bottom-rim-2', 'Bottom rim middle'),
      color('bottom-rim-3', 'Bottom rim right'),
      num('bottom-rim-width', 'Bottom rim width', 0, 4, 0.25, 'px'),
      num('bottom-rim-fade', 'Bottom rim fade start', 0, 100, 1, '%'),
    ],
  },
  {
    id: 'shadow',
    label: 'Shadow',
    description:
      'The soft drop shadow under the button. Set its color, its strength, how far it drops (offset), and how far it spreads (blur).',
    knobs: [
      color('shadow', 'Shadow color'),
      num('shadow-strength', 'Shadow strength', 0, 3, 0.05),
      num('shadow-offset-scale', 'Shadow offset scale', 0, 3, 0.05),
      num('shadow-blur-scale', 'Shadow blur scale', 0, 3, 0.05),
    ],
  },
  {
    id: 'motion',
    label: 'Motion',
    description:
      'How the pointer light moves. Proximity radius is how far from the button the light starts. Stiffness and damping control the spring that makes the light lag behind the pointer and settle. The rates control how fast the light fades in and out. Press scale is how much the button shrinks when you press it. Values other than press scale go to DEFAULT_MOTION in AIButton.ts, not CSS.',
    knobs: [
      num('press-scale', 'Press scale', 0.8, 1, 0.005),
      motion('proximityRadius', 'Proximity radius (px)', 0, 400, 5),
      motion('springStiffness', 'Spring stiffness', 10, 600, 5),
      motion('springDamping', 'Spring damping', 1, 60, 0.5),
      motion('proximityRate', 'Proximity rate (1/s)', 1, 30, 0.5),
      motion('energyRate', 'Speed decay rate (1/s)', 0.5, 20, 0.5),
      motion('energySpeed', 'Full-flare speed (px/ms)', 0.2, 10, 0.1),
    ],
  },
];

const toHex = (channels: number[]): string =>
  `#${channels
    .map((channel) =>
      Math.round(Math.min(1, Math.max(0, channel)) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;

const hexToRgb = (hex: string): string =>
  [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16)).join(' ');

const round = (value: number): number => Math.round(value * 1000) / 1000;

@customElement('swc-ai-button-design-tuner')
export class AIButtonDesignTuner extends LitElement {
  public static override styles = css`
    /* Controls pinned on the left with their own scroll; the preview fills the rest and never scrolls away. */
    :host {
      display: grid;
      grid-template-columns: minmax(320px, 420px) minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr);
      block-size: 100vh;
      font-family: system-ui, sans-serif;
      font-size: 12px;
      color: rgb(34 34 34);
    }

    .preview {
      display: flex;
      grid-column: 2;
      grid-row: 1;
      flex-wrap: wrap;
      /* Wider than the default 160px proximity radius, so pointing at one button doesn't light the other. */
      gap: 200px;
      align-items: center;
      justify-content: center;
      align-content: center;
      overflow: auto;
      padding: 64px;
      background: light-dark(rgb(255 255 255), rgb(29 29 29));
    }

    .reference {
      display: none;
    }

    /* Positioned, so the visually hidden labels stay inside its scroll area. */
    .panel {
      position: relative;
      display: flex;
      grid-column: 1;
      grid-row: 1;
      flex-direction: column;
      gap: 8px;
      overflow: auto;
      padding: 12px;
      background: rgb(245 245 245);
      border-inline-end: 1px solid rgb(218 218 218);
    }

    .about {
      margin: 0 0 6px;
      color: rgb(80 80 80);
    }

    .about summary {
      cursor: pointer;
    }

    .about p {
      margin: 4px 0 0;
      line-height: 1.4;
    }

    /* Narrow canvas: preview on top, controls scroll below it. */
    @media (max-width: 720px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: 40vh minmax(0, 1fr);
      }

      .preview {
        grid-column: 1;
        grid-row: 1;
        padding: 24px;
      }

      .panel {
        grid-column: 1;
        grid-row: 2;
        border-inline-end: 0;
        border-block-start: 1px solid rgb(218 218 218);
      }
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .hint {
      margin: 0;
      color: rgb(80 80 80);
    }

    fieldset {
      margin: 0;
      padding: 4px 8px 8px;
      border: 1px solid rgb(218 218 218);
      border-radius: 6px;
    }

    legend {
      display: flex;
      gap: 8px;
      align-items: center;
      font-weight: 600;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 110px 92px;
      gap: 8px;
      align-items: center;
      min-block-size: 24px;
    }

    .row.changed .name,
    .row.changed .swatch {
      font-weight: 600;
    }

    .swatch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
    }

    .color:not(:has(input[type='range'])) .swatch {
      grid-column: 1 / 3;
    }

    input[type='range'] {
      inline-size: 100%;
      margin: 0;
    }

    input[type='color'] {
      inline-size: 32px;
      block-size: 20px;
      padding: 0;
      border: 0;
      background: none;
    }

    output {
      font-variant-numeric: tabular-nums;
      text-align: end;
      white-space: nowrap;
    }

    button,
    select {
      font: inherit;
    }

    button[aria-pressed='true'] {
      color: rgb(255 255 255);
      background: rgb(34 34 34);
    }

    .reset {
      font-weight: 400;
    }

    textarea {
      box-sizing: border-box;
      inline-size: 100%;
      font-family: ui-monospace, monospace;
      font-size: 11px;
    }

    .visually-hidden {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  `;

  @property({ reflect: true })
  public theme: Theme = 'light';

  @state()
  private size: (typeof SIZES)[number] = 'm';

  @state()
  private numbers = new Map<string, number>();

  @state()
  private colors = new Map<string, ColorOverride>();

  @state()
  private motions = new Map<MotionKey, number>();

  @state()
  private brand?: string;

  @state()
  private copyStatus = '';

  /** Pristine button that never gets overrides; the source of the defaults. */
  @query('.reference')
  private reference?: AIButton;

  @query('.probe')
  private probe?: HTMLElement;

  private brandDefault?: string;

  private get previews(): AIButton[] {
    return [
      ...this.renderRoot.querySelectorAll<AIButton>('.preview swc-ai-button'),
    ];
  }

  protected override async firstUpdated(): Promise<void> {
    await this.reference?.updateComplete;
    this.brandDefault = this.resolveColor(
      getComputedStyle(this.reference!).getPropertyValue(BRAND_PROPERTY)
    ).hex;
    this.requestUpdate();
  }

  protected override async updated(changed: PropertyValues): Promise<void> {
    super.updated(changed);
    await Promise.all(this.previews.map((button) => button.updateComplete));
    this.previews.forEach((button) => this.apply(button));
  }

  // ────────────────
  //    DEFAULTS
  // ────────────────

  /** Reads a private property off the pristine reference button. */
  private readDefault(name: string): string {
    const button = this.reference?.shadowRoot?.querySelector('button');
    return button ? getComputedStyle(button).getPropertyValue(name).trim() : '';
  }

  /** Normalizes any CSS color to an sRGB hex plus alpha (0–100). */
  private resolveColor(value: string): { hex: string; alpha: number } {
    const probe = this.probe;
    if (!probe || !value) {
      return { hex: '#000000', alpha: 100 };
    }
    probe.style.color = `color(from ${value} srgb r g b / alpha)`;
    const match = getComputedStyle(probe).color.match(
      /srgb ([-\d.e]+) ([-\d.e]+) ([-\d.e]+)(?: \/ ([-\d.e]+))?/
    );
    if (!match) {
      return { hex: '#000000', alpha: 100 };
    }
    const [r, g, b] = match.slice(1, 4).map(Number);
    return {
      hex: toHex([r, g, b]),
      alpha: Math.round((match[4] === undefined ? 1 : Number(match[4])) * 100),
    };
  }

  private themed(name: string, theme: Theme = this.theme): string {
    return `${PREFIX}${name}-${theme}`;
  }

  private numberValue(name: string): number {
    return (
      this.numbers.get(name) ?? parseFloat(this.readDefault(PREFIX + name))
    );
  }

  private colorValue(name: string): { hex: string; alpha: number } {
    const property = this.themed(name);
    const base = this.resolveColor(this.readDefault(property));
    const override = this.colors.get(property);
    return {
      hex: override?.hex ?? base.hex,
      alpha: override?.alpha ?? base.alpha,
    };
  }

  private motionValue(name: MotionKey): number {
    return this.motions.get(name) ?? this.reference?.motionTuning[name] ?? 0;
  }

  // ────────────────
  //    OVERRIDES
  // ────────────────

  /** CSS value for a color override; untouched colors keep their exact default. */
  private colorCss(property: string, override: ColorOverride): string {
    const base = this.resolveColor(this.readDefault(property));
    const alpha = override.alpha ?? base.alpha;
    if (override.hex) {
      return `rgb(${hexToRgb(override.hex)} / ${alpha}%)`;
    }
    // Alpha-only change: keep the exact default color, resolved to plain OKLCH.
    const probe = this.probe!;
    probe.style.color = `oklch(from ${this.readDefault(property)} l c h / ${alpha}%)`;
    return getComputedStyle(probe).color;
  }

  /** Every CSS override as [property, value] pairs, in panel order. */
  private cssOverrides(): [string, string][] {
    const entries: [string, string][] = [];
    for (const knob of GROUPS.flatMap((group) => group.knobs)) {
      if (knob.kind === 'number' && this.numbers.has(knob.name)) {
        entries.push([
          PREFIX + knob.name,
          `${this.numbers.get(knob.name)}${knob.unit ?? ''}`,
        ]);
      } else if (knob.kind === 'color') {
        for (const theme of ['light', 'dark'] as const) {
          const property = this.themed(knob.name, theme);
          const override = this.colors.get(property);
          if (override) {
            entries.push([property, this.colorCss(property, override)]);
          }
        }
      }
    }
    return entries;
  }

  private apply(button: AIButton): void {
    const inner = button.shadowRoot?.querySelector('button');
    if (!inner) {
      return;
    }
    const overrides = new Map(this.cssOverrides());
    for (const knob of GROUPS.flatMap((group) => group.knobs)) {
      const properties =
        knob.kind === 'number'
          ? [PREFIX + knob.name]
          : knob.kind === 'color'
            ? [this.themed(knob.name, 'light'), this.themed(knob.name, 'dark')]
            : [];
      for (const name of properties) {
        const value = overrides.get(name);
        if (value) {
          inner.style.setProperty(name, value);
        } else {
          inner.style.removeProperty(name);
        }
      }
    }
    Object.assign(
      button.motionTuning,
      this.reference?.motionTuning,
      Object.fromEntries(this.motions)
    );
  }

  /** Retints the reference right away, so this render reads the new defaults. */
  private setBrand(value: string | undefined): void {
    if (value) {
      this.reference?.style.setProperty(BRAND_PROPERTY, value);
    } else {
      this.reference?.style.removeProperty(BRAND_PROPERTY);
    }
    this.brand = value;
  }

  private setNumber(name: string, value: number): void {
    this.numbers = new Map(this.numbers).set(name, value);
  }

  private setColor(name: string, change: ColorOverride): void {
    const property = this.themed(name);
    this.colors = new Map(this.colors).set(property, {
      ...this.colors.get(property),
      ...change,
    });
  }

  private setMotion(name: MotionKey, value: number): void {
    this.motions = new Map(this.motions).set(name, value);
  }

  private resetGroup(group: Group): void {
    const numbers = new Map(this.numbers);
    const colors = new Map(this.colors);
    const motions = new Map(this.motions);
    for (const knob of group.knobs) {
      if (knob.kind === 'number') {
        numbers.delete(knob.name);
      } else if (knob.kind === 'color') {
        colors.delete(this.themed(knob.name, 'light'));
        colors.delete(this.themed(knob.name, 'dark'));
      } else if (knob.kind === 'motion') {
        motions.delete(knob.name);
      } else {
        this.setBrand(undefined);
      }
    }
    this.numbers = numbers;
    this.colors = colors;
    this.motions = motions;
  }

  private resetAll(): void {
    GROUPS.forEach((group) => this.resetGroup(group));
  }

  // ────────────────
  //    HANDLERS
  // ────────────────

  private handleBrandInput(event: Event): void {
    this.setBrand((event.target as HTMLInputElement).value);
  }

  private handleColorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setColor(input.dataset.name!, { hex: input.value });
  }

  private handleAlphaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setColor(input.dataset.name!, { alpha: Number(input.value) });
  }

  private handleRangeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (input.dataset.kind === 'motion') {
      this.setMotion(input.dataset.name as MotionKey, value);
    } else {
      this.setNumber(input.dataset.name!, value);
    }
  }

  private handleSizeChange(event: Event): void {
    this.size = (event.target as HTMLSelectElement)
      .value as (typeof SIZES)[number];
  }

  private toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }

  private handleGroupReset(event: Event): void {
    const id = (event.currentTarget as HTMLElement).dataset.group;
    const group = GROUPS.find((candidate) => candidate.id === id);
    if (group) {
      this.resetGroup(group);
    }
  }

  // ────────────────
  //    COPY CSS
  // ────────────────

  private cssSnippet(): string {
    const lines = ['/* swc-ai-button design tuning overrides */'];
    if (this.brand) {
      lines.push('swc-ai-button {', `  ${BRAND_PROPERTY}: ${this.brand};`, '}');
    }
    const overrides = this.cssOverrides();
    if (overrides.length) {
      lines.push(
        '.swc-AIButton {',
        ...overrides.map(([name, value]) => `  ${name}: ${value};`),
        '}'
      );
    }
    if (this.motions.size) {
      lines.push(
        '/* Motion (DEFAULT_MOTION in AIButton.ts) */',
        ...[...this.motions].map(([name, value]) => `/* ${name}: ${value} */`)
      );
    }
    if (lines.length === 1) {
      lines.push('/* No overrides: every value is at its default. */');
    }
    return lines.join('\n');
  }

  private async copyCss(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.cssSnippet());
      this.copyStatus = 'Copied';
    } catch {
      this.copyStatus = 'Copy failed: select the CSS below';
    }
    setTimeout(() => {
      this.copyStatus = '';
    }, 2000);
  }

  // ────────────────
  //    RENDERING
  // ────────────────

  private renderKnob(knob: Knob): TemplateResult {
    if (knob.kind === 'brand') {
      const value = this.brand ?? this.brandDefault ?? '#000000';
      return html`
        <label class="row">
          <span class="name">${knob.label}</span>
          <input type="color" .value=${value} @input=${this.handleBrandInput} />
          <output aria-live="off">${value}</output>
        </label>
      `;
    }
    if (knob.kind === 'color') {
      const { hex, alpha } = this.colorValue(knob.name);
      const changed = this.colors.has(this.themed(knob.name));
      return html`
        <div class="row color ${changed ? 'changed' : ''}">
          <label class="swatch">
            <span class="name">${knob.label}</span>
            <input
              type="color"
              .value=${hex}
              data-name=${knob.name}
              @input=${this.handleColorInput}
            />
          </label>
          ${knob.alpha
            ? html`
                <input
                  type="range"
                  aria-label="${knob.label} alpha"
                  min="0"
                  max="100"
                  step="1"
                  .value=${String(alpha)}
                  data-name=${knob.name}
                  @input=${this.handleAlphaInput}
                />
              `
            : nothing}
          <output aria-live="off">
            ${hex}${knob.alpha ? ` ${alpha}%` : ''}
          </output>
        </div>
      `;
    }
    const value =
      knob.kind === 'number'
        ? this.numberValue(knob.name)
        : this.motionValue(knob.name);
    const changed =
      knob.kind === 'number'
        ? this.numbers.has(knob.name)
        : this.motions.has(knob.name);
    const unit = knob.kind === 'number' ? (knob.unit ?? knob.suffix ?? '') : '';
    return html`
      <label class="row ${changed ? 'changed' : ''}">
        <span class="name">${knob.label}</span>
        <input
          type="range"
          min=${knob.min}
          max=${knob.max}
          step=${knob.step}
          .value=${String(value)}
          data-name=${knob.name}
          data-kind=${knob.kind}
          @input=${this.handleRangeInput}
        />
        <output aria-live="off">
          ${Number.isNaN(value) ? '–' : `${round(value)}${unit}`}
        </output>
      </label>
    `;
  }

  protected override render(): TemplateResult {
    const hostStyle = this.brand ? `${BRAND_PROPERTY}: ${this.brand}` : '';
    return html`
      <div class="preview" style="color-scheme: ${this.theme}">
        <swc-ai-button size=${this.size} style=${hostStyle}>
          Ask AI
        </swc-ai-button>
        <swc-ai-button
          size=${this.size}
          style=${hostStyle}
          accessible-label="Ask AI"
        ></swc-ai-button>
      </div>
      <swc-ai-button
        class="reference"
        accessible-label="Reference"
        hidden
        aria-hidden="true"
      ></swc-ai-button>
      <span class="probe" hidden></span>
      <div class="panel">
        <div class="toolbar">
          <label for="size">Size</label>
          <select
            id="size"
            .value=${this.size}
            @change=${this.handleSizeChange}
          >
            ${SIZES.map(
              (size) => html`
                <option value=${size} ?selected=${size === this.size}>
                  ${size.toUpperCase()}
                </option>
              `
            )}
          </select>
          <button
            type="button"
            aria-pressed=${this.theme === 'dark' ? 'true' : 'false'}
            @click=${this.toggleTheme}
          >
            Dark background
          </button>
          <button type="button" @click=${this.resetAll}>Reset all</button>
          <button type="button" @click=${this.copyCss}>Copy CSS</button>
          <span class="status" role="status">${this.copyStatus}</span>
        </div>
        <p class="hint">
          Colors edit the ${this.theme} theme; switch the background to tune the
          other one.
        </p>
        ${GROUPS.map(
          (group) => html`
            <fieldset>
              <legend>
                ${group.label}
                <button
                  type="button"
                  class="reset"
                  data-group=${group.id}
                  @click=${this.handleGroupReset}
                >
                  Reset
                  <span class="visually-hidden">${group.label}</span>
                </button>
              </legend>
              <details class="about">
                <summary>What does this control?</summary>
                <p>${group.description}</p>
              </details>
              ${group.knobs.map((knob) => this.renderKnob(knob))}
            </fieldset>
          `
        )}
        <details>
          <summary>CSS overrides</summary>
          <textarea
            readonly
            rows="8"
            aria-label="CSS overrides"
            .value=${this.cssSnippet()}
          ></textarea>
        </details>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swc-ai-button-design-tuner': AIButtonDesignTuner;
  }
}
