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
import { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';

import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '../controllers/language-resolution.js';
import type { ElementSize } from './sized-mixin.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

export const LINEAR_PROGRESS_VALID_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];
export type LinearProgressSize = (typeof LINEAR_PROGRESS_VALID_SIZES)[number];

export const LINEAR_PROGRESS_STATIC_COLORS = ['white', 'black'] as const;
export type LinearProgressStaticColor =
  (typeof LINEAR_PROGRESS_STATIC_COLORS)[number];

export const LINEAR_PROGRESS_LABEL_POSITIONS = ['top', 'side'] as const;
export type LinearProgressLabelPosition =
  (typeof LINEAR_PROGRESS_LABEL_POSITIONS)[number];

const DEFAULT_FORMAT_OPTIONS: Intl.NumberFormatOptions = { style: 'percent' };

export interface LinearProgressInterface {
  value: number;
  minValue: number;
  maxValue: number;
  accessibleLabel: string;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
  labelPosition: LinearProgressLabelPosition;
  staticColor?: LinearProgressStaticColor;
  readonly clampedValue: number;
  readonly fillPercent: number;
  readonly formattedValue: string;
  readonly hasLabelSlotContent: boolean;
  readonly hasDescriptionSlotContent: boolean;
  readonly labelContainerId: string;
  readonly descriptionContainerId: string;
  onLabelSlotChange(event: Event): void;
  onDescriptionSlotChange(event: Event): void;
}

let nextLinearProgressId = 0;

function isSlotted(slot: HTMLSlotElement): boolean {
  return slot.assignedNodes({ flatten: true }).some((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      return true;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      return Boolean(node.textContent?.trim());
    }
    return false;
  });
}

/**
 * Thin mixin shared by linear progress components (`<swc-meter>`, future
 * `<swc-progress-bar>`). Owns the typed property declarations, value
 * clamping, locale formatting, slot tracking, and DEBUG accessible-name
 * warning that both components need.
 *
 * Intentionally silent on `role` and animation — those stay in each
 * component's own base class.
 *
 * Consumers wire the exposed `onLabelSlotChange` / `onDescriptionSlotChange`
 * handlers to the `@slotchange` event on the corresponding slots in their
 * render template, and read `clampedValue`, `fillPercent`, `formattedValue`,
 * `labelContainerId`, `descriptionContainerId`, and the boolean slot flags
 * from the same render template.
 */
export function LinearProgressMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<LinearProgressInterface> {
  class LinearProgressElement
    extends constructor
    implements LinearProgressInterface
  {
    /**
     * Current value. Clamped into `[minValue, maxValue]` before being
     * exposed via `clampedValue` and `fillPercent`.
     */
    @property({ type: Number, reflect: true })
    public value = 0;

    /**
     * Bottom of the value range.
     */
    @property({ type: Number, reflect: true, attribute: 'min-value' })
    public minValue = 0;

    /**
     * Top of the value range.
     */
    @property({ type: Number, reflect: true, attribute: 'max-value' })
    public maxValue = 100;

    /**
     * Rare-case accessible-name fallback used when there is no visible
     * `label` slot content (for example, a data grid of meters).
     * Renders into `aria-label` on the role element when set.
     */
    @property({ type: String, reflect: true, attribute: 'accessible-label' })
    public accessibleLabel = '';

    /**
     * Custom value text (e.g. `"1 of 4"`). Overrides the auto-formatted
     * value in both rendered text and `aria-valuetext`.
     */
    @property({ type: String, attribute: 'value-label' })
    public valueLabel?: string;

    /**
     * `Intl.NumberFormatOptions` used to format the visible value and
     * `aria-valuetext` when `valueLabel` is unset. JS property only —
     * no attribute (full `Intl.NumberFormat` pass-through).
     */
    @property({ attribute: false })
    public formatOptions?: Intl.NumberFormatOptions;

    /**
     * Position of the label relative to the bar.
     */
    @property({ type: String, reflect: true, attribute: 'label-position' })
    public labelPosition: LinearProgressLabelPosition = 'top';

    /**
     * Static color override for use on images or colored backgrounds.
     */
    @property({ type: String, reflect: true, attribute: 'static-color' })
    public staticColor?: LinearProgressStaticColor;

    private readonly languageResolver = new LanguageResolutionController(this);

    private readonly _instanceId = ++nextLinearProgressId;

    private _hasLabelSlotContent = false;
    private _hasDescriptionSlotContent = false;

    public get labelContainerId(): string {
      return `swc-linear-progress-label-${this._instanceId}`;
    }

    public get descriptionContainerId(): string {
      return `swc-linear-progress-description-${this._instanceId}`;
    }

    public get hasLabelSlotContent(): boolean {
      return this._hasLabelSlotContent;
    }

    public get hasDescriptionSlotContent(): boolean {
      return this._hasDescriptionSlotContent;
    }

    public get clampedValue(): number {
      const value = Number.isFinite(this.value) ? this.value : 0;
      const min = Number.isFinite(this.minValue) ? this.minValue : 0;
      const max = Number.isFinite(this.maxValue) ? this.maxValue : 100;
      const lo = Math.min(min, max);
      const hi = Math.max(min, max);
      return Math.min(hi, Math.max(lo, value));
    }

    public get fillPercent(): number {
      const min = Number.isFinite(this.minValue) ? this.minValue : 0;
      const max = Number.isFinite(this.maxValue) ? this.maxValue : 100;
      if (max === min) {
        return 0;
      }
      const fraction = (this.clampedValue - min) / (max - min);
      return Math.min(100, Math.max(0, fraction * 100));
    }

    public get formattedValue(): string {
      if (this.valueLabel) {
        return this.valueLabel;
      }
      const min = Number.isFinite(this.minValue) ? this.minValue : 0;
      const max = Number.isFinite(this.maxValue) ? this.maxValue : 100;
      const options = this.formatOptions ?? DEFAULT_FORMAT_OPTIONS;
      const formatter = new Intl.NumberFormat(
        this.languageResolver.language,
        options
      );
      // Percent style consumes a fraction; every other style consumes the
      // raw value.
      if (options.style === 'percent') {
        const fraction =
          max === min ? 0 : (this.clampedValue - min) / (max - min);
        return formatter.format(fraction);
      }
      return formatter.format(this.clampedValue);
    }

    public onLabelSlotChange(event: Event): void {
      const slot = event.target as HTMLSlotElement;
      const next = isSlotted(slot);
      if (next !== this._hasLabelSlotContent) {
        this._hasLabelSlotContent = next;
        this.requestUpdate();
      }
    }

    public onDescriptionSlotChange(event: Event): void {
      const slot = event.target as HTMLSlotElement;
      const next = isSlotted(slot);
      if (next !== this._hasDescriptionSlotContent) {
        this._hasDescriptionSlotContent = next;
        this.requestUpdate();
      }
    }

    protected override willUpdate(changes: PropertyValues): void {
      // Surfacing relevant property changes is enough — formatted output
      // is derived from getters, so no internal state to recompute here.
      // Hook is left for subclasses that need pre-render work.
      super.willUpdate(changes);
    }

    protected override updated(changes: PropertyValues): void {
      super.updated(changes);

      if (changes.has(languageResolverUpdatedSymbol)) {
        // Locale shifted; re-render so formatted value + aria-valuetext refresh.
        this.requestUpdate();
      }

      if (window.__swc?.DEBUG) {
        this.warnMissingAccessibleName();
      }
    }

    private warnMissingAccessibleName(): void {
      if (this._hasLabelSlotContent || this.accessibleLabel) {
        return;
      }
      window.__swc?.warn(
        this,
        `<${this.localName}> requires an accessible name.`,
        'https://opensource.adobe.com/spectrum-web-components/components/meter/',
        {
          type: 'accessibility',
          issues: [
            'add visible label content via the "label" named slot, or',
            'set the "accessible-label" attribute (or "accessibleLabel" property) when there is no visible label, for example a data grid of meters.',
          ],
        }
      );
    }
  }
  return LinearProgressElement as unknown as T &
    Constructor<LinearProgressInterface>;
}
