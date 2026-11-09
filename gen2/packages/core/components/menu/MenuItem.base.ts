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
import { property, query } from 'lit/decorators.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import { SizedMixin } from '@adobe/spectrum-wc-core/mixins/index.js';
import { validateRequiredSlot } from '@adobe/spectrum-wc-core/utils/index.js';

import { MENU_ITEM_VALID_SIZES, type MenuItemSize } from './MenuItem.types.js';

const DOCS_URL =
  'https://spectrum-web-components.adobe.com/?path=/docs/components-menu--docs';

/**
 * Whether a key press should activate a row. Shared with `MenuBase`, which
 * claims the same keys on the way past, so the row and its menu cannot drift
 * on what counts as activation.
 *
 * A modified press belongs to the app or to assistive technology, not to the
 * row: Shift+Enter and Ctrl+Space stay available as shortcuts.
 *
 * @internal Exported only so `MenuBase` can share the definition.
 */
export const isMenuActivationKey = (event: KeyboardEvent): boolean => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }
  return event.key === 'Enter' || event.key === ' ';
};

/**
 * Base class for a menu row. Implements the row half of the
 * {@link https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | menu button}
 * pattern: `role="menuitem"` on the host, with the owning `swc-menu` driving
 * arrow-key navigation and roving tabindex across its rows.
 *
 * @attribute {MenuItemSize} size - Size of the row. Set by the owning
 *   `swc-menu`, which propagates its own size to every row it slots.
 *
 * @slot label - Required text of the row; provides its accessible name.
 * @slot visual - Optional leading icon or thumbnail.
 * @slot description - Optional secondary text; provides the accessible description.
 */
export abstract class MenuItemBase extends SizedMixin(SpectrumElement, {
  validSizes: MENU_ITEM_VALID_SIZES,
}) {
  /**
   * The size of the menu item.
   *
   * @default m
   */
  declare public size: MenuItemSize;

  /**
   * Whether the row is unavailable for interaction.
   *
   * Exposed as `aria-disabled`, never the native `disabled` attribute, so the
   * row keeps its place in the menu's roving tabindex and stays reachable by
   * arrow keys. A row a user cannot find is a row they cannot be told about.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether the pointer, rather than the keyboard, last moved focus to this
   * row. Suppresses the focus ring while it is set.
   *
   * The owning `swc-menu` sets it, because a row cannot tell which input moved
   * focus to it. `:focus-visible` alone is not enough: it stays on once a key
   * press has set the modality, so the ring would follow the pointer from row
   * to row and stay behind on the row the pointer left. 1st-gen carries the
   * same state the other way up, as a `focused` attribute it sets on keyboard
   * focus and clears on `mouseover`.
   *
   * @internal Set by the owning menu; not part of the row's public API.
   */
  @property({ type: Boolean, reflect: true, attribute: 'pointer-focus' })
  public pointerFocus = false;

  /**
   * Carries the row's name and description references. On `internals` they are
   * defaults a consumer's own attributes replace; writing them to `this` would
   * reflect onto the host and clobber whatever was already there.
   *
   * Not every piece of ARIA belongs here. `aria-disabled` stays a host
   * attribute, because the owning `swc-menu` reads it off the element to
   * decide whether a row may be activated.
   */
  protected readonly internals = this.attachInternals();

  @query('slot[name="label"]')
  private labelSlot?: HTMLSlotElement;

  @query('slot[name="description"]')
  private descriptionSlot?: HTMLSlotElement;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public constructor() {
    super();
    // Capture, so a disabled row swallows the click before it reaches a
    // consumer's own listener. `aria-disabled` keeps the row focusable, which
    // means it stays clickable too unless something stops the event here.
    this.addEventListener('click', this.handleClickCapture, { capture: true });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    // Set here, not in render(): `swc-menu` collects rows on `slotchange`,
    // which can run first. Always `menuitem`; selection rows ship as their
    // own components rather than as a role swap on this one.
    this.setAttribute('role', 'menuitem');
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('keyup', this.handleKeyUp);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('keyup', this.handleKeyUp);
    super.disconnectedCallback();
  }

  // Selection and closing happen on `keydown`, matching React Spectrum. The
  // row that receives the keydown is the row that activates, so there is no
  // press state spanning the two halves of a press and nothing to strand: a
  // press begun on the trigger lands its keydown there and only its keyup
  // reaches the row.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!isMenuActivationKey(event)) {
      return;
    }
    // Claimed even when the row is disabled or the press is a repeat, so Space
    // never scrolls the surface out from under the menu.
    event.preventDefault();
    if (event.repeat || this.disabled) {
      return;
    }
    // Turning the key into a click is what makes keyboard and pointer
    // activation reach the same consumer handler, and lets the owning menu
    // close through one path for both.
    this.click();
  };

  // The release is claimed but never acts. A row that still has focus, because
  // a consumer kept the menu open, must not activate a second time on the same
  // press.
  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    if (!isMenuActivationKey(event)) {
      return;
    }
    event.preventDefault();
  };

  private readonly handleClickCapture = (event: Event): void => {
    if (!this.disabled) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  // `slotchange` never fires for a slot that starts empty, so the first render
  // is the only chance to wire a row that arrives without content, and the
  // only chance for the missing-label warning to reach an empty one.
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.handleTextSlotChange();
  }

  /**
   * Names the row from its `label` slot and describes it from its
   * `description` slot. Wire this to both slots' `slotchange` event in the
   * SWC render().
   *
   * Element references rather than ID refs: the slotted content is
   * consumer-authored, so there is no `id` to point at.
   */
  protected handleTextSlotChange(): void {
    // Flattened, so a row whose slots are forwarded through another
    // component still resolves to the elements that actually render.
    const label = this.labelSlot?.assignedElements({ flatten: true }) ?? [];
    const description =
      this.descriptionSlot?.assignedElements({ flatten: true }) ?? [];
    // `menuitem` names from contents, so without explicit references the
    // description is folded into the name rather than announced as one.
    this.internals.ariaLabelledByElements = label.length > 0 ? label : null;
    this.internals.ariaDescribedByElements =
      description.length > 0 ? description : null;
    // Without a label the row falls back to naming from contents, which folds
    // any description into the name. Every row needs one.
    validateRequiredSlot(this, this.labelSlot, 'label', DOCS_URL, {
      type: 'accessibility',
    });
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    // Mapped by hand rather than via `DisabledMixin` (Q20): the mixin also
    // writes `tabindex`, which `FocusgroupNavigationController` owns here.
    // This runs on the first update too, so a hand-authored `aria-disabled`
    // is replaced by whatever `disabled` says. That is deliberate: the menu
    // reads the attribute to decide activation, so letting the two disagree
    // would make a row announce one thing and behave as another.
    if (changedProperties.has('disabled')) {
      this.ariaDisabled = this.disabled ? 'true' : null;
    }
  }
}
