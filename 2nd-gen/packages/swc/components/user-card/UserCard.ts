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

import {
  CardBase,
  type CardSize,
} from '@adobe/spectrum-wc-core/components/card';
import {
  USER_CARD_VARIANTS,
  type UserCardVariant,
} from '@adobe/spectrum-wc-core/components/user-card';
import { SlotAttributePropagationController } from '@adobe/spectrum-wc-core/controllers/index.js';

import { renderCardTemplate } from '../card/card-template.js';

import sharedStyles from '../../stylesheets/_lit-styles/card-template.css';
import styles from './user-card.css';

/**
 * The `swc-avatar` `size` propagated onto the `avatar` slot for each card
 * `size`. Overwrites any `size` the consumer set on their own avatar.
 */
const AVATAR_SIZE_BY_CARD_SIZE = {
  xs: '100',
  s: '300',
  m: '500',
  l: '700',
  xl: '900',
} as const satisfies Record<CardSize, string>;

/**
 * @element swc-user-card
 * @since 2.0.0-beta.1
 *
 * @example
 * <swc-user-card>
 *   <swc-avatar slot="avatar" src="/path/to/avatar.jpg" alt="Jane Doe"></swc-avatar>
 *   <span slot="title">Jane Doe</span>
 *   <span slot="description">Product designer</span>
 * </swc-user-card>
 *
 * @example
 * <swc-user-card>
 *   <img slot="preview" src="/path/to/banner.jpg" alt="" />
 *   <swc-avatar slot="avatar" src="/path/to/avatar.jpg" alt="Jane Doe"></swc-avatar>
 *   <span slot="title">Jane Doe</span>
 *   <span slot="description">Product designer</span>
 * </swc-user-card>
 *
 * @slot avatar - The person's avatar. Expects a `swc-avatar` (or equivalent);
 * see [Avatar](../?path=/docs/components-avatar--docs) for its labeling
 * contract. The card manages the avatar's `size` (matching the card's own
 * `size`) and `outline` attributes, overwriting any values the consumer
 * sets directly.
 */
export class UserCard extends CardBase {
  // ─────────────────────────
  //     API TO OVERRIDE
  // ─────────────────────────

  /**
   * @internal
   */
  static override readonly VARIANTS: readonly UserCardVariant[] =
    USER_CARD_VARIANTS;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  /**
   * Keeps the slotted avatar's `size` in sync with the card's own `size`,
   * via the fixed `AVATAR_SIZE_BY_CARD_SIZE` scale.
   */
  private readonly _avatarSizePropagation =
    new SlotAttributePropagationController(this, {
      attribute: 'size',
      getValue: () => AVATAR_SIZE_BY_CARD_SIZE[this.size as CardSize],
      slotName: 'avatar',
    });

  /**
   * Always sets `outline` on the slotted avatar, so it reads clearly
   * whether or not it overlaps a `preview` banner. Paired with a fixed
   * 2px `--swc-avatar-outline-width` in `user-card.css`.
   */
  private readonly _avatarOutlinePropagation =
    new SlotAttributePropagationController(this, {
      attribute: 'outline',
      getValue: () => '',
      slotName: 'avatar',
    });

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.renderRoot
      ?.querySelector('slot[name="avatar"]')
      ?.addEventListener('slotchange', this._handleAvatarSlotChange);
  }

  private readonly _handleAvatarSlotChange = (): void => {
    this._avatarSizePropagation.propagate();
    this._avatarOutlinePropagation.propagate();
  };

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [sharedStyles, styles];
  }

  protected override render(): TemplateResult {
    return renderCardTemplate({
      cardClass: 'UserCard',
      hasDefaultSlotContent: this.slotHasContent,
      onDefaultSlotChange: this.slotText.handleSlotChange,
      renderGlyph: () => html`
        <slot name="avatar"></slot>
      `,
    });
  }
}
