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
  ACTION_GROUP_ORIENTATIONS,
  ACTION_GROUP_VALID_SIZES,
  type ActionGroupOrientation,
  type ActionGroupSize,
} from './ActionGroup.types.js';

/**
 * An action group clusters related action buttons together with composite
 * keyboard navigation (one Tab stop; arrow keys move among items).
 *
 * This base class owns the accessibility semantics, `label` → `aria-label`
 * management, `disabled` state contract, and child collection logic.
 * Rendering and styling live in the concrete SWC subclass.
 *
 * @slot - One or more `swc-action-button` or `swc-action-menu` elements.
 *
 * @attribute {ActionGroupSize} size - The size of the group and its children.
 */
export abstract class ActionGroupBase extends SizedMixin(SpectrumElement, {
  validSizes: ACTION_GROUP_VALID_SIZES,
  noDefaultSize: true,
}) {
  /**
   * The size of the action group. Propagated to all slotted children.
   */
  declare public size: ActionGroupSize;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * @internal
   */
  static readonly ORIENTATIONS: readonly string[] = ACTION_GROUP_ORIENTATIONS;

  /**
   * The layout direction of the action group.
   *
   * `aria-orientation` is set to `"vertical"` when `orientation="vertical"`.
   * It is omitted for `"horizontal"` since that is the implicit default for
   * `role="group"`.
   *
   * Breaking change: replaces the 1st-gen `vertical` boolean attribute.
   *
   * @default horizontal
   */
  @property({ type: String, reflect: true })
  public orientation: ActionGroupOrientation = 'horizontal';

  /**
   * Accessible label for the group. Reflected to `aria-label` on the host.
   *
   * Recommended whenever the strip has a distinct purpose. An empty value
   * removes the `aria-label` attribute.
   */
  @property({ type: String })
  public label = '';

  /**
   * Whether the group and all of its children are disabled.
   *
   * Sets `aria-disabled="true"` on the host and propagates the state to
   * each managed child. Children remain keyboard-reachable so that screen
   * reader users can still discover the group.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  protected override firstUpdated(changed: PropertyValues<this>): void {
    super.firstUpdated(changed);
    this.setAttribute('role', 'group');
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has('label')) {
      if (this.label) {
        this.setAttribute('aria-label', this.label);
      } else {
        this.removeAttribute('aria-label');
      }
    }

    if (changed.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changed.has('orientation')) {
      if (this.orientation === 'vertical') {
        this.setAttribute('aria-orientation', 'vertical');
      } else {
        this.removeAttribute('aria-orientation');
      }
    }

    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof ActionGroupBase;
      if (!constructor.ORIENTATIONS.includes(this.orientation)) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "orientation" attribute to be one of the following:`,
          'https://opensource.adobe.com/spectrum-web-components/components/action-group/',
          { issues: [...constructor.ORIENTATIONS] }
        );
      }
    }
  }
}
