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
  CARD_DENSITIES,
  CARD_VALID_SIZES,
  CARD_VARIANTS,
  type CardDensity,
  type CardVariant,
} from './Card.types.js';

/**
 * Abstract base class for all card-family components. Owns the semantics
 * shared across every card type: sizing, visual variant, and density.
 *
 * `swc-card`, `swc-asset-card`, `swc-user-card`, and `swc-product-card` each
 * extend this base directly and render the shared anatomy via
 * `renderCardTemplate()` in `swc/components/card/card-template.ts`. That
 * template also carries a collection placeholder and an avatar/thumbnail
 * glyph, each supplied per-component via `renderCollection`/`renderGlyph`.
 *
 * @slot preview - Primary preview content
 * @slot title - Card title
 * @slot actions - Optional action controls
 * @slot description - Supporting description text
 * @slot footer - Optional footer content
 * @slot - Additional body content
 */
export abstract class CardBase extends SizedMixin(SpectrumElement, {
  validSizes: CARD_VALID_SIZES,
}) {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   */
  static readonly VARIANTS: readonly CardVariant[] = CARD_VARIANTS;

  /**
   * @internal
   */
  static readonly DENSITIES: readonly CardDensity[] = CARD_DENSITIES;

  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * The visual variant of the card.
   *
   * @default primary
   */
  @property({ type: String, reflect: true })
  public variant: CardVariant = 'primary';

  /**
   * The density of the card, controlling internal spacing and gaps.
   *
   * @default regular
   */
  @property({ type: String, reflect: true })
  public density: CardDensity = 'regular';

  /**
   * Indicates the consumer has wrapped their `title` slot content in a real
   * link. Extends that link's hit area to cover the card surface while
   * leaving navigation entirely consumer-owned — Card accepts no `href`.
   *
   * @todo Naming, and the `::slotted(a)::after` vs. click-proxy mechanism,
   * are still open. See the card family plan, A11y-3 / Q2.
   */
  @property({ type: Boolean, reflect: true, attribute: 'title-as-link' })
  public titleAsLink = false;

  /**
   * Makes the card focusable and captures surface clicks (excluding nested
   * interactive targets) to dispatch a `swc-card-click` event, independent
   * of `titleAsLink`. Lays groundwork for a future `CardView` selection
   * model without Card owning selected-state UI itself.
   *
   * @todo Event name and `tabindex` management details are still open. See
   * the card family plan, A11y-3 / Q3.
   * @todo No `role` is set when `selectable` is true — deferred rather than
   * defaulting to `role="button"`, since the eventual `CardView` selection
   * model may call for a different role (e.g. `option`/`gridcell`) that
   * `role="button"` would be wrong to have committed to today. See the card
   * family plan, A11y-3 / Q8.
   */
  @property({ type: Boolean, reflect: true })
  public selectable = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.handleSurfaceClick);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('click', this.handleSurfaceClick);
    this.removeEventListener('keydown', this.handleSelectableKeydown);
    super.disconnectedCallback();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('selectable')) {
      if (this.selectable) {
        this.setAttribute('tabindex', '0');
        this.addEventListener('keydown', this.handleSelectableKeydown);
      } else {
        this.removeAttribute('tabindex');
        this.removeEventListener('keydown', this.handleSelectableKeydown);
      }
    }

    if (window.__swc?.DEBUG) {
      const { VARIANTS, DENSITIES } = this.constructor as typeof CardBase;

      if (
        changedProperties.has('variant') &&
        !VARIANTS.includes(this.variant)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> received an invalid "variant" value of "${this.variant}". Valid values are ${VARIANTS.join(', ')}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/card/',
          { issues: [`variant="${this.variant}"`] }
        );
      }

      if (
        changedProperties.has('density') &&
        !DENSITIES.includes(this.density)
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> received an invalid "density" value of "${this.density}". Valid values are ${DENSITIES.join(', ')}.`,
          'https://opensource.adobe.com/spectrum-web-components/components/card/',
          { issues: [`density="${this.density}"`] }
        );
      }

      if (
        changedProperties.has('titleAsLink') &&
        this.titleAsLink &&
        !this.getTitleLinkElement()
      ) {
        window.__swc.warn(
          this,
          `<${this.localName}> has "title-as-link" set but no link element was found in the "title" slot.`,
          'https://opensource.adobe.com/spectrum-web-components/components/card/',
          { issues: ['title-as-link'] }
        );
      }
    }
  }

  /**
   * @internal
   * The card's own `title` slot element, or `null` before the concrete
   * class's `renderCardTemplate()` call has rendered.
   */
  protected getTitleSlotElement(): HTMLSlotElement | null {
    return this.renderRoot?.querySelector('slot[name="title"]') ?? null;
  }

  /**
   * @internal
   * The `title` slot's link, supporting both forms consumers reasonably
   * use: the assigned element itself is the anchor (`<a slot="title"
   * href="...">`), or the anchor is nested inside a wrapper (`<span
   * slot="title"><a href="...">`). Requires `href` — a link with no
   * destination can't usefully be clicked-through.
   */
  protected getTitleLinkElement(): HTMLAnchorElement | null {
    const assigned = this.getTitleSlotElement()?.assignedElements({
      flatten: true,
    });
    for (const element of assigned ?? []) {
      if (element instanceof HTMLAnchorElement && element.href) {
        return element;
      }
      const nested = element.querySelector<HTMLAnchorElement>('a[href]');
      if (nested) {
        return nested;
      }
    }
    return null;
  }

  /**
   * @internal
   * Whether `node` provides its own interaction/focus semantics. Checking
   * the `tabIndex` IDL property (rather than the `tabindex` attribute or a
   * tag-name list) correctly covers natively-interactive elements
   * (`button`, `input`, `select`, `textarea`, `a[href]`) with no explicit
   * attribute, excludes `tabindex="-1"` (focusable for scripting, not a
   * click target) and disabled controls, and works for a custom element's
   * internal shadow-DOM control too — `composedPath()` already traverses
   * into other elements' shadow roots for composed events like `click`, so
   * an internal `<button>` inside e.g. `<swc-button>` is inspected directly
   * regardless of which shadow tree it belongs to.
   */
  private static isFocusable(node: EventTarget): boolean {
    return node instanceof HTMLElement && node.tabIndex >= 0;
  }

  private readonly handleSurfaceClick = (event: Event): void => {
    if (!this.titleAsLink && !this.selectable) {
      return;
    }
    const path = event.composedPath();
    const precedingPath = path.slice(0, path.indexOf(this));
    const actionsSlot = this.renderRoot?.querySelector('slot[name="actions"]');
    const hitInteractiveTarget =
      // The `actions` slot is unconditionally excluded, defense-in-depth,
      // since it's contractually for interactive content regardless of
      // whether a given control correctly reflects focusability.
      (actionsSlot && precedingPath.includes(actionsSlot)) ||
      precedingPath.some(CardBase.isFocusable);
    if (hitInteractiveTarget) {
      return;
    }
    if (this.titleAsLink) {
      this.getTitleLinkElement()?.click();
    }
    if (this.selectable) {
      this.dispatchEvent(
        new Event('swc-card-click', { bubbles: true, composed: true })
      );
    }
  };

  /**
   * `tabindex` is only ever added alongside this listener (see `updated()`)
   * and removed alongside its removal — a focusable card is never left
   * without keyboard activation. Enter and Space are treated identically
   * and both proxy to `titleAsLink`'s link when set, even though a bare
   * link conventionally responds to Enter only: the card's own activation
   * contract (Enter+Space, more button-like) is authoritative once
   * `selectable` makes the card itself the focused target, regardless of
   * what that activation happens to proxy to.
   */
  private readonly handleSelectableKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      this.handleSurfaceClick(event);
    }
  };
}
