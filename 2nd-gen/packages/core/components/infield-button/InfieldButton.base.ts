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

import { property } from 'lit/decorators.js';

import { ButtonBase } from '@spectrum-web-components/core/components/button';
import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  INFIELD_BUTTON_VALID_SIZES,
  type InfieldButtonSize,
} from './InfieldButton.types.js';

/**
 * Abstract base class for infield button components. Extends ButtonBase with a
 * restricted size set, quiet treatment, and non-focusable shadow root.
 *
 * Infield buttons are always embedded inside a form field (e.g. number field). They are
 * clickable via pointer only; they are not in the tab order and not independently focusable.
 * All keyboard behavior is owned by the parent field, which also provides the visible
 * focus ring. The parent field is expected to set the `size` attribute.
 *
 * @slot icon - Icon to display inside the button.
 *
 * @attribute {ElementSize} size - Size delegated from the parent field. Defaults to
 *   medium when no parent sets it, though standalone usage is not supported.
 */
export abstract class InfieldButtonBase extends ButtonBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /** @internal */
  static override readonly VALID_SIZES: readonly InfieldButtonSize[] =
    INFIELD_BUTTON_VALID_SIZES;

  // Infield buttons are clickable but never independently focusable. The parent field
  // owns keyboard behavior and supplies the only focus ring.
  static override shadowRootOptions: ShadowRootInit = {
    ...SpectrumElement.shadowRootOptions,
    delegatesFocus: false,
  };

  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Applies the quiet (no-border) visual treatment. Used when the infield button
   * is part of a quiet field variant.
   */
  @property({ type: Boolean, reflect: true })
  public quiet: boolean = false;
}
