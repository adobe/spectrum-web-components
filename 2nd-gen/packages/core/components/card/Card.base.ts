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
  type ElementSize,
  SizedMixin,
} from '@adobe/spectrum-wc-core/mixins/index.js';

import { SlotAttributePropagationController } from '../../controllers/slot-attribute-propagation/index.js';
import {
  CARD_DENSITIES,
  CARD_VALID_SIZES,
  CARD_VARIANTS,
  type CardDensity,
  type CardSize,
  type CardVariant,
  SWC_CARD_CLICK_EVENT,
} from './Card.types.js';

/**
 * Abstract base class for all card-family components. Owns the semantics
 * shared across every card type: sizing, visual variant, and density.
 *
 * @attribute {ElementSize} size - The size of the card.
 *
 * @fires swc-card-click - Dispatched when a `selectable` card is activated (click, Enter, or Space).
 *
 * @slot preview - Primary preview content
 * @slot title - Card title
 * @slot actions - Optional action controls
 * @slot description - Supporting description text
 * @slot footer - Optional footer content
 * @slot - Additional body content
 *
 * @cssprop --swc-card-base-max-inline-size - Maximum inline size of the card. Defaults to 280px, overridden per size.
 * @cssprop --swc-card-base-border-radius - Corner radius of the card. Defaults to the extra-large corner-radius token, overridden per size.
 * @cssprop --swc-card-base-box-shadow - Box shadow (elevation) of the card. Defaults to the emphasized drop-shadow token; overridden by the tertiary variant, selectable focus, and title-as-link/selectable hover.
 * @cssprop --swc-card-base-background-color - Background color of the card. Defaults to the layer-2 background token; overridden by the secondary, tertiary, and quiet variants.
 * @cssprop --swc-card-base-preview-aspect-ratio - Aspect ratio of the preview slot. Defaults to 3/2.
 * @cssprop --swc-card-base-title-font-size - Font size of the title slot. Defaults to the medium font-size token, overridden per size.
 * @cssprop --swc-card-base-title-line-height - Line height of the title slot. Defaults to the medium line-height token, overridden per size.
 * @cssprop --swc-card-base-description-font-size - Font size of the description slot and default slot content. Defaults to a smaller font-size token, overridden per size.
 * @cssprop --swc-card-base-action-component-height - Height used to vertically balance slotted actions content. Defaults to the smallest component-height token, overridden per size.
 * @cssprop --swc-card-base-content-header-gap - Column gap between the title and actions slots. Defaults to the medium base-gap token, overridden per size.
 * @cssprop --swc-card-base-content-padding - Padding of the content region. Defaults to the medium container-padding token; overridden by density.
 * @cssprop --swc-card-base-content-padding-regular - Content padding used at the default (regular) density, per size.
 * @cssprop --swc-card-base-content-padding-compact - Content padding used at compact density, per size.
 * @cssprop --swc-card-base-content-padding-spacious - Content padding used at spacious density, per size.
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
   */
  @property({ type: Boolean, reflect: true, attribute: 'title-as-link' })
  public titleAsLink = false;

  /**
   * Makes the card focusable and captures surface clicks (excluding nested
   * interactive targets) to dispatch a `swc-card-click` event, independent
   * of `titleAsLink`.
   *
   * @todo No ARIA role is set yet; deferred until a future `CardView`
   * selection model determines the appropriate role.
   */
  @property({ type: Boolean, reflect: true })
  public selectable = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Keeps a slotted action control's `size` one step smaller than the
   * card's own `size`.
   */
  private readonly _sizePropagation = new SlotAttributePropagationController(
    this,
    {
      attribute: 'size',
      getValue: () => CardBase.getSmallerSize(this.size),
      slotName: 'actions',
    }
  );

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this.handleSurfaceClick);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('click', this.handleSurfaceClick);
    this.removeEventListener('keydown', this.handleSelectableKeydown);
    super.disconnectedCallback();
  }

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // renderCardTemplate() doesn't take a slotchange callback, so the
    // listener is attached imperatively rather than declaratively in the
    // template — the slot node itself persists across re-renders.
    this.renderRoot
      ?.querySelector('slot[name="actions"]')
      ?.addEventListener('slotchange', this.handleActionsSlotChange);
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
          { level: 'low', issues: [`density="${this.density}"`] }
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
          { level: 'high', issues: ['title-as-link'] }
        );
      }

      if (changedProperties.has('size')) {
        this.checkActionsSupport();
      }
    }
  }

  /**
   * @internal
   *
   * The card's own `title` slot element.
   */
  protected getTitleSlotElement(): HTMLSlotElement | null {
    return this.renderRoot?.querySelector('slot[name="title"]') ?? null;
  }

  /**
   * @internal
   *
   * The card's own `actions` slot element.
   */
  protected getActionsSlotElement(): HTMLSlotElement | null {
    return this.renderRoot?.querySelector('slot[name="actions"]') ?? null;
  }

  /**
   * Whether the `actions` slot is supported for this card's current state.
   * `xs` cards don't have room for it. Concrete classes may override this
   * to exclude the slot for other reasons, independent of size.
   */
  protected get actionsSupported(): boolean {
    return this.size !== 'xs';
  }

  /**
   * @internal
   *
   * Warns in dev mode when the `actions` slot has content but isn't
   * supported for the current state. Visual suppression is handled in
   * CSS, not here.
   */
  private checkActionsSupport(): void {
    if (
      window.__swc?.DEBUG &&
      !this.actionsSupported &&
      (this.getActionsSlotElement()?.assignedElements({ flatten: true })
        .length ?? 0) > 0
    ) {
      window.__swc.warn(
        this,
        `<${this.localName}> has content in the "actions" slot, but actions are not supported for this card (size="${this.size}").`,
        'https://opensource.adobe.com/spectrum-web-components/components/card/',
        { level: 'medium', issues: ['actions'] }
      );
    }
  }

  /**
   * @internal
   *
   * The `title` slot's link: either the assigned element itself
   * (`<a slot="title" href="...">`) or an anchor nested inside a wrapper
   * (`<span slot="title"><a href="...">`). Requires `href`.
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
   *
   * Whether `node` has its own interaction/focus semantics, via the
   * `tabIndex` IDL property rather than the `tabindex` attribute — this
   * also correctly excludes `tabindex="-1"` and disabled controls.
   */
  private static isFocusable(node: EventTarget): boolean {
    return node instanceof HTMLElement && node.tabIndex >= 0;
  }

  /**
   * @internal
   *
   * The size one step below `size` in `CARD_VALID_SIZES`, clamped at the
   * smallest size.
   */
  private static getSmallerSize(size: ElementSize): CardSize {
    const index = CARD_VALID_SIZES.indexOf(size as CardSize);
    return CARD_VALID_SIZES[Math.max(index - 1, 0)];
  }

  /**
   * Re-propagates the `actions` slot's `size` for elements assigned after
   * the initial render — wired to the slot's `slotchange` in
   * `firstUpdated()`.
   */
  protected readonly handleActionsSlotChange = (): void => {
    this._sizePropagation.propagate();
    this.checkActionsSupport();
  };

  /**
   * Proxies a qualifying surface click to `titleAsLink`'s link and/or
   * dispatches `swc-card-click` for `selectable`, after filtering out
   * clicks that landed on a nested interactive target or followed a
   * text-selection drag.
   */
  protected readonly handleSurfaceClick = (event: Event): void => {
    if (!this.titleAsLink && !this.selectable) {
      return;
    }
    // A text-selection drag still fires `click` on mouseup; a non-collapsed
    // selection at that point means the user was selecting text, not
    // clicking through the card.
    if (document.getSelection()?.isCollapsed === false) {
      return;
    }
    const path = event.composedPath();
    const precedingPath = path.slice(0, path.indexOf(this));
    const actionsSlot = this.getActionsSlotElement();
    const hitInteractiveTarget =
      // The actions slot is always excluded, since it's contractually
      // for interactive content regardless of whether a control reflects
      // focusability correctly.
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
        new Event(SWC_CARD_CLICK_EVENT, { bubbles: true, composed: true })
      );
    }
  };

  /**
   * Enter and Space both activate the card, even though a bare link
   * conventionally responds to Enter only — the card's own activation
   * contract takes precedence once `selectable` makes it the focused
   * target.
   */
  protected readonly handleSelectableKeydown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      this.handleSurfaceClick(event);
    }
  };
}
