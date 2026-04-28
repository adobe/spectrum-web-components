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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
import {
  property,
  query,
} from '@spectrum-web-components/base/src/decorators.js';
import { SizedMixin } from '@spectrum-web-components/base/src/sizedMixin.js';
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import { getLabelFromSlot } from '@spectrum-web-components/shared/src/get-label-from-slot.js';

import {
  PROGRESS_CIRCLE_VALID_SIZES,
  ProgressCircleStaticColor,
} from './ProgressCircle.types.js';

/**
 * A progress circle component that visually represents the completion progress of a task.
 * Can be used in both determinate (with specific progress value) and indeterminate (loading) states.
 *
 * @attribute {ElementSize} size - The size of the progress circle.
 *
 * @slot - Accessible label for the progress circle.
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
   */
  static readonly STATIC_COLORS: readonly string[];

  /**
   * @internal
   *
   * Static color variant for use on different backgrounds.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ProgressCircleStaticColor;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Whether the progress circle shows indeterminate progress (loading state).
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  /**
   * Accessible label for the progress circle.
   */
  @property({ type: String })
  public label = '';

  /**
   * Progress value from 0 to 100.
   */
  @property({ type: Number })
  public progress = 0;

  private languageResolver = new LanguageResolutionController(this);

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * @internal
   */
  @query('slot')
  private slotEl!: HTMLSlotElement;

  protected makeRotation(rotation: number): string | undefined {
    return this.indeterminate
      ? undefined
      : `transform: rotate(${rotation}deg);`;
  }

  protected handleSlotchange(): void {
    const labelFromSlot = getLabelFromSlot(this.label, this.slotEl);
    if (labelFromSlot) {
      this.label = labelFromSlot;
    }
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
        this.setAttribute('aria-valuenow', '' + this.progress);
        this.setAttribute('aria-valuetext', this.formatProgress());
      }
    }
    if (!this.indeterminate && changes.has('progress')) {
      this.setAttribute('aria-valuenow', '' + this.progress);
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
        this.getAttribute('aria-labelledby') ||
        this.slotEl.assignedNodes().length
      );
    };

    if (window.__swc?.DEBUG) {
      if (changes.has('indeterminate') && this.indeterminate) {
        window.__swc.warn(
          this,
          `<${this.localName}> the "indeterminate" attribute is deprecated and will be removed in Spectrum 2. Omit the "progress" attribute (or set it to null) to indicate indeterminate progress.`,
          'https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/progress-circle-consumer-migration-guide--docs',
          { level: 'deprecation' }
        );
      }
      const hasLightDomChildren = Array.from(
        this.slotEl?.assignedNodes() ?? []
      ).some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      );
      if (hasLightDomChildren) {
        window.__swc.warn(
          this,
          `<${this.localName}> light DOM children are deprecated as a labelling mechanism and will not be rendered in Spectrum 2. Use the "label" attribute or "aria-label" on the host instead.`,
          'https://opensource.adobe.com/spectrum-web-components/second-gen/?path=/docs/progress-circle-consumer-migration-guide--docs',
          { level: 'deprecation' }
        );
      }
      if (!hasAccessibleName() && this.getAttribute('role') === 'progressbar') {
        window.__swc?.warn(
          this,
          '<sp-progress-circle> elements need one of the following to be accessible:',
          'https://opensource.adobe.com/spectrum-web-components/components/progress-circle/#accessibility',
          {
            type: 'accessibility',
            issues: [
              'value supplied to the "label" attribute, which will be displayed visually as part of the element, or',
              'text content supplied directly to the <sp-progress-circle> element, or',
              'value supplied to the "aria-label" attribute, which will only be provided to screen readers, or',
              'an element ID reference supplied to the "aria-labelledby" attribute, which will be provided by screen readers and will need to be managed manually by the parent application.',
            ],
          }
        );
      }
    }
  }
}
