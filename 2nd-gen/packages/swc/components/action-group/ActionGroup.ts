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
import { FocusgroupNavigationController } from '@spectrum-web-components/core/controllers';

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
 * @cssprop --swc-action-group-gap - Space between children. Defaults to the medium spacing token (small spacing token at `xs`/`s` sizes).
 *
 * @example
 * <swc-action-group accessible-label="Text formatting">
 *   <swc-action-button>Bold</swc-action-button>
 *   <swc-action-button>Italic</swc-action-button>
 * </swc-action-group>
 *
 * @example
 * <swc-action-group orientation="vertical" accessible-label="Alignment">
 *   <swc-action-button>Left</swc-action-button>
 *   <swc-action-button>Center</swc-action-button>
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

  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  /**
   * Focuses the roving tab stop within the group. When the
   * `FocusgroupNavigationController` has memory, restores focus to the last
   * active item; otherwise falls back to the first managed child.
   */
  public override focus(options?: FocusOptions): void {
    const target =
      this.navigation.getActiveItem() ??
      this.managedChildren?.find((el) => !el.hasAttribute('disabled'));
    target?.focus(options);
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  /**
   * @internal
   *
   * Composite keyboard navigation controller. Manages roving `tabindex` among
   * slotted `swc-action-button` and `swc-action-menu` children. Direction is
   * initialized to `horizontal` and updated via `setOptions` whenever
   * `orientation` changes.
   *
   * `skipDisabled: false` keeps all children — including those with
   * `aria-disabled="true"` — in the roving tabindex sequence. This is
   * intentional: per APG toolbar guidance, disabled items should remain
   * keyboard-discoverable. Group-level `disabled` propagates `aria-disabled`
   * to all children; with skip enabled those children would all be excluded
   * and Tab could no longer enter the group.
   *
   * `wrap: true` matches the APG Toolbar example: arrow keys wrap from the
   * last item to the first and vice versa.
   */
  private readonly navigation = new FocusgroupNavigationController(this, {
    direction: this.orientation,
    wrap: true,
    skipDisabled: false,
    getItems: () => this.managedChildren ?? [],
  });

  /**
   * @internal
   *
   * Watches for `disabled` and `aria-disabled` attribute changes on individual
   * managed children. `slotchange` does not fire when an existing child's
   * disabled state changes, so without this observer the navigation controller
   * would hold a stale tab-stop assignment (e.g. btn1 retaining tabindex=0
   * after becoming disabled) and Tab could no longer enter the group.
   */
  private childObserver?: MutationObserver;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.childObserver = new MutationObserver(() => {
      this.navigation.refresh();
    });
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.childObserver?.disconnect();
    this.childObserver = undefined;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-ActionGroup">
        <slot role="presentation" @slotchange=${this.handleSlotchange}></slot>
      </div>
    `;
  }

  protected override handleSlotchange(): void {
    super.handleSlotchange();
    this.propagateVisualStateToChildren();

    this.childObserver?.disconnect();
    for (const child of this.managedChildren ?? []) {
      this.childObserver?.observe(child, {
        attributes: true,
        attributeFilter: ['disabled', 'aria-disabled'],
      });
    }

    this.navigation.refresh();
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);

    if (changed.has('orientation')) {
      this.navigation.setOptions({ direction: this.orientation });
    }

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
