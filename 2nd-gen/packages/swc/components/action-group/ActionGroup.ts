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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import {
  ActionGroupBase,
  type ActionGroupStaticColor,
} from '@spectrum-web-components/core/components/action-group';

import styles from './action-group.css';

/**
 * An action group clusters related action buttons together with composite
 * keyboard navigation: one Tab stop into the strip, arrow keys move among
 * `swc-action-button` and `swc-action-menu` children.
 *
 * Unlike `swc-button-group`, which lets Tab reach each button independently,
 * action group owns composite navigation (one Tab stop; arrow keys move
 * among items).
 *
 * @element swc-action-group
 * @since 2.0.0
 *
 * @slot - One or more `swc-action-button` or `swc-action-menu` elements.
 *
 * @example
 * <swc-action-group label="Text formatting">
 *   <swc-action-button label="Bold">Bold</swc-action-button>
 *   <swc-action-button label="Italic">Italic</swc-action-button>
 * </swc-action-group>
 *
 * @example
 * <swc-action-group orientation="vertical" label="Alignment">
 *   <swc-action-button label="Left">Left</swc-action-button>
 *   <swc-action-button label="Center">Center</swc-action-button>
 * </swc-action-group>
 */
export class ActionGroup extends ActionGroupBase {
  // ───────────────────
  //     API ADDITIONS
  // ───────────────────

  /**
   * Whether the group uses compact density. Buttons visually join by
   * collapsing shared borders and resetting interior border-radius values.
   *
   * Has no visual effect when `quiet` is also set.
   */
  @property({ type: Boolean, reflect: true })
  public compact = false;

  /**
   * Whether the group and its children use the quiet visual style.
   *
   * Propagated to all slotted `swc-action-button` and `swc-action-menu`
   * children. Also disables the compact border-join styling when both
   * `compact` and `quiet` are set.
   */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /**
   * Whether slotted children should expand equally to fill the available
   * inline width of the group.
   */
  @property({ type: Boolean, reflect: true })
  public justified = false;

  /**
   * The static color variant to apply when the group is placed over an image
   * or colored background. Propagated to all slotted children.
   *
   * - `"white"`: use on dark or colored backgrounds.
   * - `"black"`: use on light backgrounds.
   */
  @property({ type: String, reflect: true, attribute: 'static-color' })
  public staticColor?: ActionGroupStaticColor;

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html`
      <slot role="presentation" @slotchange=${this.handleSlotchange}></slot>
    `;
  }

  protected override handleSlotchange(): void {
    super.handleSlotchange();
    this.propagateVisualStateToChildren();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (
      changed.has('quiet') ||
      changed.has('size') ||
      changed.has('staticColor') ||
      // `compact` is pre-wired here so children re-render when the attribute
      // changes, but the attribute is not propagated via JS — it affects layout
      // via CSS cascade on ::slotted() selectors (wired in Phase 5).
      changed.has('compact')
    ) {
      this.propagateVisualStateToChildren();
    }

    if (window.__swc?.DEBUG) {
      const constructor = this.constructor as typeof ActionGroup;
      if (
        this.staticColor !== undefined &&
        !constructor.STATIC_COLORS.includes(this.staticColor)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> element expects the "static-color" attribute to be one of the following: ${constructor.STATIC_COLORS.join(', ')}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/action-group/',
          { issues: [...constructor.STATIC_COLORS] }
        );
      }
    }
  }

  /**
   * @internal
   *
   * Propagates visual attributes (`quiet`, `size`, `staticColor`) to slotted
   * children. Called on slot change and when any of these properties update.
   *
   * Note: `compact` affects children via CSS custom property cascade
   * (`::slotted(:first-child)` / `::slotted(:last-child)` in Phase 5) rather
   * than JS attribute propagation.
   */
  private propagateVisualStateToChildren(): void {
    for (const child of this.managedChildren ?? []) {
      if (this.quiet) {
        child.setAttribute('quiet', '');
      } else {
        child.removeAttribute('quiet');
      }

      if (this.size) {
        child.setAttribute('size', this.size);
      }

      if (this.staticColor !== undefined) {
        child.setAttribute('static-color', this.staticColor);
      } else {
        child.removeAttribute('static-color');
      }
    }
  }
}
