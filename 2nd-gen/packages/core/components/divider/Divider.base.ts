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

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';
import { SizedMixin } from '@spectrum-web-components/core/mixins/index.js';

import {
  DIVIDER_STATIC_COLORS,
  DIVIDER_VALID_SIZES,
  type DividerSize,
  type DividerStaticColor,
} from './Divider.types.js';

/**
 * A divider separates and distinguishes sections of content or groups of menu items.
 *
 * Layout sizing: horizontal dividers fill the **inline size** of the container (`inline-size: 100%`
 * with a minimum track); vertical dividers fill the **block size** (`block-size: 100%` with a minimum
 * track). When the percentage basis does not resolve (for example a lone flex item in a row),
 * set a definite width or height on the host or an ancestor so the line can render predictably.
 *
 * @attribute {ElementSize} size - The size of the divider.
 */
export abstract class DividerBase extends SizedMixin(SpectrumElement, {
  validSizes: DIVIDER_VALID_SIZES,
}) {
  /**
   * The size of the divider.
   *
   * @default m
   */
  declare public size: DividerSize;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * @internal
   *
   * A readonly array of the valid static color variants for the divider.
   */
  static readonly STATIC_COLORS: readonly string[] = DIVIDER_STATIC_COLORS;

  /**
   * Whether the divider is vertical. If false, the divider is horizontal. The default is false.
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * The static color variant to use for the divider.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: DividerStaticColor;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override update(changedProperties: PropertyValues): void {
    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof DividerBase;
      if (
        typeof this.staticColor !== 'undefined' &&
        !constructor.STATIC_COLORS.includes(this.staticColor)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "static-color" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/divider/',
          {
            issues: [...constructor.STATIC_COLORS],
          }
        );
      }
    }
    super.update(changedProperties);
  }

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);
    this.setAttribute('role', 'separator');
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has('vertical')) {
      if (this.vertical) {
        this.setAttribute('aria-orientation', 'vertical');
      } else {
        this.removeAttribute('aria-orientation');
      }
    }
  }
}
