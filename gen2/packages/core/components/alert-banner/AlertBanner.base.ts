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
import { CSSResultArray, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  resolveEnum,
  validateEnum,
} from '@adobe/spectrum-wc-core/utils/index.js';

import {
  ALERT_BANNER_VALID_VARIANTS,
  type AlertBannerVariant,
} from './AlertBanner.types.js';

/**
 * An alert banner shows pressing and high-signal messages, such as system alerts.
 * It is meant to be noticed and prompt users to take action.
 *
 * @slot - The main content of the alert banner.
 * @slot action - An optional action button for the alert banner.
 *
 * @fires close - Dispatched when the alert banner is dismissed. Cancelable.
 */
export abstract class AlertBannerBase extends SpectrumElement {
  public static override get styles(): CSSResultArray {
    return [];
  }

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Controls the display of the alert banner.
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Whether to include an icon-only close button to dismiss the alert banner.
   */
  @property({ type: Boolean, reflect: true })
  public dismissible = false;

  /**
   * The variant applies specific styling when set to `negative` or `info`.
   * Invalid values are kept as set, warn in dev mode, and render as neutral.
   */
  @property({
    type: String,
    reflect: true,
    // An empty variant means "unset", so it leaves no attribute behind.
    converter: {
      fromAttribute: (value: string | null) => value ?? '',
      toAttribute: (value: string) => value || null,
    },
  })
  public variant: AlertBannerVariant = '';

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected isValidVariant(variant: string): boolean {
    return (ALERT_BANNER_VALID_VARIANTS as readonly string[]).includes(variant);
  }

  /**
   * @internal
   *
   * The variant used for rendering. Invalid values are kept on `variant` as
   * set and resolve to the default (`''`) here.
   */
  protected get resolvedVariant(): AlertBannerVariant {
    return resolveEnum(this.variant, ALERT_BANNER_VALID_VARIANTS, '');
  }

  protected abstract renderIcon(variant: string): TemplateResult;

  protected shouldClose(): void {
    const applyDefault = this.dispatchEvent(
      new CustomEvent('close', {
        composed: true,
        bubbles: true,
        cancelable: true,
      })
    );
    if (applyDefault) {
      this.close();
    }
  }

  public close(): void {
    this.open = false;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'Escape' && this.dismissible) {
      this.shouldClose();
    }
  }

  protected override update(changes: PropertyValues): void {
    // An empty variant is the unset default, not an invalid value.
    if (this.variant) {
      validateEnum(this, {
        prop: 'variant',
        value: this.variant,
        valid: ALERT_BANNER_VALID_VARIANTS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-alert-banner--docs',
      });
    }
    super.update(changes);
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('open')) {
      if (this.open) {
        this.addEventListener('keydown', this.handleKeydown);
      } else {
        this.removeEventListener('keydown', this.handleKeydown);
      }
    }
  }
}
