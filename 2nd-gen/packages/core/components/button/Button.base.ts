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

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  ObserveSlotPresence,
  ObserveSlotText,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';

import { BUTTON_VALID_SIZES } from './Button.types.js';

/**
 * Abstract base class for all button-like components. Owns shared semantic
 * concerns: interaction state, sizing, slot-derived icon/label state,
 * accessible-name resolution, and host-to-internal-button attribute forwarding.
 *
 * Visual API specific to `sp-button` (`variant`, `fill-style`, `static-color`)
 * is intentionally absent so that ActionButton, ClearButton, CloseButton,
 * PickerButton, and InfieldButton can extend this base without inheriting
 * the `swc-button` visual surface.
 *
 * @attribute {ElementSize} size - The size of the button.
 *
 * @todo We currently have 3 levels of mixins on this class, but the mixin
 * composition guide recommends a maximum of 2. Explore reducing after milestone 2.
 */
export abstract class ButtonBase extends SizedMixin(
  ObserveSlotText(ObserveSlotPresence(SpectrumElement, '[slot="icon"]'), ''),
  { validSizes: BUTTON_VALID_SIZES }
) {
  static override shadowRootOptions: ShadowRootInit = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: true,
  };

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * Whether the button is disabled. Removes focusability and prevents
   * interaction.
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Accessible label forwarded to the internal `<button>` element as
   * `aria-label`. Required for icon-only buttons, which have no visible text.
   */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel?: string;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected get hasIcon(): boolean {
    return this.slotContentIsPresent;
  }

  protected get hasLabel(): boolean {
    return this.slotHasContent;
  }

  /**
   * Returns the set of attributes that should be forwarded to the internal
   * semantic `<button>` element, if not otherwise directly managed.
   *
   * @internal
   */
  protected getForwardedButtonAttributes(): Record<
    string,
    string | boolean | undefined
  > {
    return {
      disabled: this.disabled,
    };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Capture phase so slotted light-DOM clicks are suppressed before host
    // listeners (e.g. Storybook actions) run.
    this.addEventListener('click', this.handleClick, true);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('click', this.handleClick, true);
    super.disconnectedCallback();
  }

  /**
   * Suppresses click activation while the button is `disabled`.
   *
   * Slotted icon content lives in the light DOM, so pointer clicks on icons
   * bypass the disabled inner `<button>` and bubble on the host. The host
   * listener (capture) and inner `@click` binding both call this handler.
   */
  protected readonly handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    if (window.__swc?.DEBUG) {
      if (this.hasIcon && !this.hasLabel && !this.accessibleLabel) {
        window.__swc.warn(
          this,
          `<${this.localName}> with an icon and no label must have an "accessible-label" attribute to be accessible.`,
          'https://opensource.adobe.com/spectrum-web-components/components/button/#icon-only',
          { issues: ['accessible-label'] }
        );
      }
    }
  }
}
