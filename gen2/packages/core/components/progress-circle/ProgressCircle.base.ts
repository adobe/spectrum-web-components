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

import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '@adobe/spectrum-wc-core/controllers/language-resolution.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import {
  isDebug,
  numberAttribute,
  parseNumericText,
  validateEnum,
  warnIf,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  PROGRESS_CIRCLE_VALID_SIZES,
  ProgressCircleStaticColor,
} from './ProgressCircle.types.js';

/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @attribute {ElementSize} size - The size of the progress circle.
 */
export abstract class ProgressCircleBase extends SizedMixin(SpectrumElement, {
  validSizes: PROGRESS_CIRCLE_VALID_SIZES,
}) {
  /**
   * The size of the progress circle.
   *
   * @default m
   */
  declare public size: (typeof PROGRESS_CIRCLE_VALID_SIZES)[number];

  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   *
   * A readonly array of the valid static colors for the progress circle.
   *
   * This is an actual internal property, intended not for customer use
   * but for use in internal validation logic, stories, tests, etc.
   *
   * Because S1 and S2 support different static colors, the value of this
   * property must be set in each subclass.
   */
  static readonly STATIC_COLORS: readonly string[];

  /**
   * @internal
   *
   * Static color variant for use on different backgrounds.
   *
   * This is a public property, but its valid values vary between S1 and S2,
   * so the property (and its docs) need to be redefined in each subclass.
   *
   * The type declared here is a union of the valid values for S1 and S2,
   * and should be narrowed in each subclass.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ProgressCircleStaticColor;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Accessible label for the progress circle.
   *
   * Used to provide context about what is loading or progressing.
   * When no accessible name is provided (no label, aria-label, or
   * aria-labelledby), a default "Loading" label is applied.
   *
   * @todo Localize the default "Loading" fallback via LanguageResolutionController
   * once a runtime i18n system for static strings is available.
   */
  @property({ type: String })
  public label = '';

  /**
   * Progress value from 0 to 100.
   *
   * When `null` (indeterminate), the component shows a loading animation.
   * Setting a number switches to determinate mode. Removing the `progress`
   * attribute or setting this property to `null` returns to indeterminate.
   * Values outside 0–100, non-finite numbers, and non-numeric text are kept
   * as set, warn in dev mode, and render clamped (anything that isn't a
   * finite number renders as 0).
   *
   * Reflected to the `progress` attribute when set; the attribute is omitted when indeterminate.
   */
  @property({
    type: Number,
    reflect: true,
    // Non-numeric text is kept so reflection never writes `NaN` over the
    // consumer's markup; a removed attribute returns to indeterminate.
    converter: numberAttribute(null),
  })
  public progress: number | null = null;

  private languageResolver = new LanguageResolutionController(this);

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * @todo Localize via LanguageResolutionController once a runtime i18n
   * system for static strings is available.
   */
  private static readonly DEFAULT_LABEL = 'Loading';

  /** True when light DOM has element nodes or non-whitespace text (no default slot). */
  private static hasMeaningfulLightDomChildren(host: HTMLElement): boolean {
    for (const node of host.childNodes) {
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      ) {
        return true;
      }
    }
    return false;
  }

  private hasAccessibleName(): boolean {
    return Boolean(
      this.label ||
      this.getAttribute('aria-label') ||
      this.getAttribute('aria-labelledby')
    );
  }

  /**
   * @internal
   *
   * The progress used for rendering and ARIA, clamped to 0–100 (non-finite
   * becomes 0), or `null` when indeterminate. `progress` keeps the value the
   * consumer set.
   */
  protected get clampedProgress(): number | null {
    const progress = parseNumericText(this.progress);
    if (progress === null || progress === undefined) {
      return null;
    }
    if (!Number.isFinite(progress)) {
      return 0;
    }
    return Math.min(100, Math.max(0, progress));
  }

  private formatProgress(): string {
    return new Intl.NumberFormat(this.languageResolver.language, {
      style: 'percent',
      unitDisplay: 'narrow',
    }).format((this.clampedProgress ?? 0) / 100);
  }

  private warnDeprecatedLightDomChildren(): void {
    warnIf(
      this,
      ProgressCircleBase.hasMeaningfulLightDomChildren(this),
      `<${this.localName}> no longer has a default slot. Light DOM children are not rendered and are not used for an accessible name. Use the "label" attribute or property, or "aria-label" / "aria-labelledby" on the host instead.`,
      'https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs',
      { level: 'deprecation' }
    );
  }

  protected override update(changes: PropertyValues): void {
    // `null` is the indeterminate state, not an invalid value.
    if (this.progress != null) {
      const received = String(this.progress);
      warnIf(
        this,
        this.clampedProgress !== parseNumericText(this.progress),
        `<${this.localName}> expects "progress" to be a number from 0 to 100. Received "${received}"; rendering ${this.clampedProgress}.`,
        'https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs',
        { issues: [`progress="${received}"`] }
      );
    }
    // `static-color` is optional; unset means the default colors.
    if (this.staticColor != null) {
      validateEnum(this, {
        prop: 'static-color',
        value: this.staticColor,
        valid: (this.constructor as typeof ProgressCircleBase).STATIC_COLORS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs',
      });
    }
    super.update(changes);
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'progressbar');
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('progress')) {
      const clampedProgress = this.clampedProgress;
      if (clampedProgress !== null) {
        this.setAttribute('aria-valuemin', '0');
        this.setAttribute('aria-valuemax', '100');
        this.setAttribute('aria-valuenow', String(clampedProgress));
        this.setAttribute('aria-valuetext', this.formatProgress());
      } else {
        this.removeAttribute('aria-valuemin');
        this.removeAttribute('aria-valuemax');
        this.removeAttribute('aria-valuenow');
        this.removeAttribute('aria-valuetext');
      }
    }

    if (this.progress !== null && changes.has(languageResolverUpdatedSymbol)) {
      this.setAttribute('aria-valuetext', this.formatProgress());
    }

    if (changes.has('label')) {
      if (this.label.length) {
        this.setAttribute('aria-label', this.label);
      } else if (changes.get('label') === this.getAttribute('aria-label')) {
        this.removeAttribute('aria-label');
      }
    }

    // Apply default accessible name fallback after handling explicit label changes.
    if (changes.has('label') && !this.hasAccessibleName()) {
      this.setAttribute('aria-label', ProgressCircleBase.DEFAULT_LABEL);
      warnIf(
        this,
        true,
        `<${this.localName}> requires an accessible name. A default label of "${ProgressCircleBase.DEFAULT_LABEL}" has been applied, but a more specific label should be provided via:`,
        'https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs',
        {
          type: 'accessibility',
          issues: [
            'value supplied to the "label" attribute, which will be displayed visually as part of the element, or',
            'value supplied to the "aria-label" attribute, which will only be provided to screen readers, or',
            'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.',
          ],
        }
      );
    }

    // Guard the call site: `hasMeaningfulLightDomChildren` traverses the light
    // DOM and the message is built eagerly as an argument, so both would run on
    // every `updated()` (including production) if passed straight to `warnIf`.
    // `isDebug()` skips that work entirely when validation is off.
    if (isDebug()) {
      this.warnDeprecatedLightDomChildren();
    }
  }
}
