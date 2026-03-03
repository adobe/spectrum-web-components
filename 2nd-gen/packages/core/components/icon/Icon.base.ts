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
import { property, queryAssignedElements } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import { ICON_VALID_SIZES } from './Icon.types.js';

/**
 * An icon renderer that displays slotted SVG markup.
 *
 * @attribute {string} label - Accessible label for the icon.
 * @attribute {string} size - T-shirt icon size.
 */
export abstract class IconBase extends SizedMixin(SpectrumElement, {
  validSizes: [...ICON_VALID_SIZES],
}) {
  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Accessible label for the icon.
   */
  @property()
  public label = '';

  @queryAssignedElements({ flatten: true })
  private defaultSlotElements!: Element[];

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.updateSlottedIcon();
    this.updateHostAccessibility();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      this.updateSlottedIcon();
      this.updateHostAccessibility();
    }
  }

  protected handleSlotChange(): void {
    this.updateSlottedIcon();
  }

  private updateSlottedIcon(): void {
    const [slotted] = this.defaultSlotElements;
    if (!slotted) {
      return;
    }
    const svgElement =
      slotted instanceof SVGElement ? slotted : slotted.querySelector?.('svg');
    if (!svgElement) {
      return;
    }
    svgElement.setAttribute('role', 'img');
    if (this.label) {
      svgElement.setAttribute('aria-label', this.label);
      svgElement.removeAttribute('aria-hidden');
    } else {
      svgElement.setAttribute('aria-hidden', 'true');
      svgElement.removeAttribute('aria-label');
    }
  }

  private updateHostAccessibility(): void {
    if (this.label) {
      this.removeAttribute('aria-hidden');
    } else {
      this.setAttribute('aria-hidden', 'true');
    }
  }
}
