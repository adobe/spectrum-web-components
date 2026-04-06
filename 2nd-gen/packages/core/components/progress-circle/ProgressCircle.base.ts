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
} from '@spectrum-web-components/core/controllers/language-resolution.js';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

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
   * Whether the progress circle shows indeterminate progress (loading state).
   *
   * When true, displays an animated loading indicator instead of a specific progress value.
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * Accessible label for the progress circle.
   *
   * Used to provide context about what is loading or progressing.
   */
  @property({ type: String })
  public label = '';

  /**
   * Progress value from 0 to 100.
   *
   * Only relevant when indeterminate is false. Values outside that range or
   * non-finite numbers are clamped to 0–100 (non-finite becomes 0).
   */
  @property({ type: Number })
  public progress = 0;

  private languageResolver = new LanguageResolutionController(this);

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /** True when light DOM has element nodes or non-whitespace text (no default slot). */
  private static hasMeaningfulLightDomChildren(host: HTMLElement): boolean {
    for (const node of host.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
    }
    return false;
  }

  private warnDeprecatedLightDomChildren(): void {
    if (!window.__swc?.DEBUG) {
      return;
    }
    if (!ProgressCircleBase.hasMeaningfulLightDomChildren(this)) {
      return;
    }
    window.__swc.warn(
      this,
      `<${this.localName}> no longer has a default slot. Light DOM children are not rendered and are not used for an accessible name. Use the "label" attribute or property, or "aria-label" / "aria-labelledby" on the host instead.`,
      'https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/components-progress-circle--docs',
      { level: 'deprecation' }
    );
  }

  private static clampProgress(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.min(100, Math.max(0, value));
  }

  protected override willUpdate(changes: PropertyValues): void {
    if (changes.has('progress')) {
      const clamped = ProgressCircleBase.clampProgress(this.progress);
      if (clamped !== this.progress) {
        this.progress = clamped;
      }
    }
    super.willUpdate(changes);
  }

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'progressbar');
    }
  }

  private formatProgress(): string {
    return new Intl.NumberFormat(this.languageResolver.language, {
      style: 'percent',
      unitDisplay: 'narrow',
    }).format(this.progress / 100);
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('indeterminate')) {
      if (this.indeterminate) {
        this.removeAttribute('aria-valuemin');
        this.removeAttribute('aria-valuemax');
        this.removeAttribute('aria-valuenow');
        this.removeAttribute('aria-valuetext');
      } else {
        this.setAttribute('aria-valuemin', '0');
        this.setAttribute('aria-valuemax', '100');
        this.setAttribute('aria-valuenow', String(this.progress));
        this.setAttribute('aria-valuetext', this.formatProgress());
      }
    }
    if (!this.indeterminate && changes.has('progress')) {
      this.setAttribute('aria-valuenow', String(this.progress));
      this.setAttribute('aria-valuetext', this.formatProgress());
    }
    if (!this.indeterminate && changes.has(languageResolverUpdatedSymbol)) {
      this.setAttribute('aria-valuetext', this.formatProgress());
    }
    if (changes.has('label')) {
      if (this.label.length) {
        this.setAttribute('aria-label', this.label);
      } else if (changes.get('label') === this.getAttribute('aria-label')) {
        this.removeAttribute('aria-label');
      }
    }

    const hasAccessibleName = (): boolean => {
      return Boolean(
        this.label ||
        this.getAttribute('aria-label') ||
        this.getAttribute('aria-labelledby')
      );
    };

    if (window.__swc?.DEBUG) {
      this.warnDeprecatedLightDomChildren();
      if (!hasAccessibleName() && this.getAttribute('role') === 'progressbar') {
        window.__swc?.warn(
          this,
          `<${this.localName}> elements need one of the following to be accessible:`,
          'https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/components-progress-circle--docs',
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
    }
  }
}
