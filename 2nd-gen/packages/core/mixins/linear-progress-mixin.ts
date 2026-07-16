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

import { LanguageResolutionController } from '../controllers/language-resolution.js';
import {
  ObserveSlotPresence,
  type SlotPresenceObservingInterface,
} from './observe-slot-presence.js';
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

const LABEL_SLOT_SELECTOR = '[slot="label"]';
const DESCRIPTION_SLOT_SELECTOR = '[slot="description"]';

export interface LinearProgressInterface extends SlotPresenceObservingInterface {
  value: number;
  minValue: number;
  maxValue: number;
  accessibleLabel: string;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
  labelPosition: LinearProgressLabelPosition;
  staticColor?: LinearProgressStaticColor;
  readonly sanitizedMin: number;
  readonly sanitizedMax: number;
  readonly clampedValue: number;
  readonly fillPercent: number;
  readonly formattedValue: string;
  readonly hasLabelSlotContent: boolean;
  readonly hasDescriptionSlotContent: boolean;
  readonly labelContainerId: string;
  readonly descriptionContainerId: string;
}

let nextLinearProgressId = 0;

/**
 * Mixin for linear progress components. Owns the typed property
 * declarations, sanitized range + value, locale formatting, light-DOM
 * slot presence tracking (so the shadow-DOM containers and slots can
 * be fully conditional), and the DEBUG accessible-name warning.
 *
 * Intentionally silent on `role` and animation — those stay in each
 * component's own base class.
 */
export function LinearProgressMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<LinearProgressInterface> {
  class LinearProgressElement
    extends ObserveSlotPresence(constructor, [
      LABEL_SLOT_SELECTOR,
      DESCRIPTION_SLOT_SELECTOR,
    ])
    implements LinearProgressInterface
  {
    /**
     * Current value. Sanitized via `clampedValue` for rendering and
     * `aria-valuenow`.
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
    @property({ type: String, attribute: 'accessible-label' })
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

    /**
     * @internal
     *
     * Documentation URL used in DEBUG warnings. Derived from the custom
     * element tag name so each concrete component gets an accurate link
     * with no per-subclass override needed (e.g. `swc-meter` →
     * `components-meter--docs`, `swc-progress-bar` →
     * `components-progress-bar--docs`).
     */
    protected get docsHref(): string {
      const name = this.localName.replace(/^swc-/, '');
      return `https://spectrum-web-components.adobe.com/?path=/docs/components-${name}--docs`;
    }

    /**
     * @internal
     */
    public get labelContainerId(): string {
      return `swc-linear-progress-label-${this._instanceId}`;
    }

    /**
     * @internal
     */
    public get descriptionContainerId(): string {
      return `swc-linear-progress-description-${this._instanceId}`;
    }

    /**
     * @internal
     */
    public get hasLabelSlotContent(): boolean {
      return this.getSlotContentPresence(LABEL_SLOT_SELECTOR);
    }

    /**
     * @internal
     */
    public get hasDescriptionSlotContent(): boolean {
      return this.getSlotContentPresence(DESCRIPTION_SLOT_SELECTOR);
    }

    /**
     * @internal
     *
     * Sanitized lower bound: falls back to 0 when `minValue` is non-finite,
     * and to the smaller of (min, max) when the two are reversed. ARIA
     * `aria-valuemin`, `aria-valuenow`, `aria-valuetext`, and the rendered
     * fill all read from the same sanitized range so screen-reader output
     * stays internally consistent.
     */
    public get sanitizedMin(): number {
      const min = Number.isFinite(this.minValue) ? this.minValue : 0;
      const max = Number.isFinite(this.maxValue) ? this.maxValue : 100;
      return Math.min(min, max);
    }

    /**
     * @internal
     *
     * Sanitized upper bound. See `sanitizedMin`.
     */
    public get sanitizedMax(): number {
      const min = Number.isFinite(this.minValue) ? this.minValue : 0;
      const max = Number.isFinite(this.maxValue) ? this.maxValue : 100;
      return Math.max(min, max);
    }

    /**
     * @internal
     */
    public get clampedValue(): number {
      const value = Number.isFinite(this.value) ? this.value : 0;
      return Math.min(this.sanitizedMax, Math.max(this.sanitizedMin, value));
    }

    /**
     * @internal
     */
    public get fillPercent(): number {
      const min = this.sanitizedMin;
      const max = this.sanitizedMax;
      if (max === min) {
        return 0;
      }
      const fraction = (this.clampedValue - min) / (max - min);
      return Math.min(100, Math.max(0, fraction * 100));
    }

    /**
     * @internal
     */
    public get formattedValue(): string {
      if (this.valueLabel) {
        return this.valueLabel;
      }
      const min = this.sanitizedMin;
      const max = this.sanitizedMax;
      // Treat anything that is not a plain options object (null, undefined,
      // empty string from Storybook helpers, etc.) as "no override" and
      // fall back to the percent default.
      const providedOptions =
        this.formatOptions &&
        typeof this.formatOptions === 'object' &&
        Object.keys(this.formatOptions).length > 0
          ? this.formatOptions
          : DEFAULT_FORMAT_OPTIONS;
      const formatter = new Intl.NumberFormat(
        this.languageResolver.language,
        providedOptions
      );
      // Percent style consumes a fraction; every other style consumes the
      // raw value.
      if (providedOptions.style === 'percent') {
        const fraction =
          max === min ? 0 : (this.clampedValue - min) / (max - min);
        return formatter.format(fraction);
      }
      return formatter.format(this.clampedValue);
    }

    protected override updated(changes: PropertyValues): void {
      super.updated(changes);

      // Locale changes are picked up automatically: the
      // `LanguageResolutionController` requests an update with
      // `languageResolverUpdatedSymbol`, which re-runs `render()`. The
      // render template reads `formattedValue` (which reads
      // `languageResolver.language` lazily), so the new locale is already
      // reflected in this render cycle. No second `requestUpdate()`
      // needed here.

      // Only re-evaluate the accessible-name fallback when the inputs
      // that determine it actually change, so the warning does not fire
      // on every property update during development.
      if (
        window.__swc?.DEBUG &&
        (changes.has('accessibleLabel') || !this._hasWarnedNoAccessibleName)
      ) {
        this.warnMissingAccessibleName();
      }

      // Surface a dev warning when `value` falls outside the resolved
      // range. The value is still clamped for rendering and ARIA, but the
      // clamp is otherwise silent, so flag it as a likely authoring error.
      if (
        window.__swc?.DEBUG &&
        (changes.has('value') ||
          changes.has('minValue') ||
          changes.has('maxValue'))
      ) {
        this.warnValueOutOfRange();
      }
    }

    private _hasWarnedNoAccessibleName = false;

    private _hasWarnedValueOutOfRange = false;

    private warnValueOutOfRange(): void {
      const value = this.value;
      const min = this.sanitizedMin;
      const max = this.sanitizedMax;
      if (!Number.isFinite(value) || (value >= min && value <= max)) {
        this._hasWarnedValueOutOfRange = false;
        return;
      }
      if (this._hasWarnedValueOutOfRange) {
        return;
      }
      this._hasWarnedValueOutOfRange = true;
      window.__swc?.warn(
        this,
        `<${this.localName}> "value" (${value}) is outside the [${min}, ${max}] range and was clamped to ${this.clampedValue}.`,
        this.docsHref,
        {
          issues: [
            'set "value" within the "min-value" and "max-value" range, or',
            'adjust "min-value"/"max-value" so the range includes the value.',
          ],
        }
      );
    }

    private warnMissingAccessibleName(): void {
      if (this.hasLabelSlotContent || this.accessibleLabel) {
        this._hasWarnedNoAccessibleName = false;
        return;
      }
      this._hasWarnedNoAccessibleName = true;
      window.__swc?.warn(
        this,
        `<${this.localName}> requires an accessible name.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            'add visible label content via the "label" named slot, or',
            'set the "accessible-label" attribute (or "accessibleLabel" property) when there is no visible label.',
          ],
        }
      );
    }
  }
  return LinearProgressElement as unknown as T &
    Constructor<LinearProgressInterface>;
}
