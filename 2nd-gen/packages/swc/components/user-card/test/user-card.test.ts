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

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { UserCard } from '@adobe/spectrum-wc/user-card';
import { CARD_VALID_SIZES } from '@adobe/spectrum-wc-core/components/card/index.js';
import { USER_CARD_VARIANTS } from '@adobe/spectrum-wc-core/components/user-card/index.js';

import '@adobe/spectrum-wc/components/user-card/swc-user-card.js';
import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';

// Tests scoped to what swc-user-card adds on top of the shared CardBase
// behavior, which is already fully covered through swc-card
// (test/card.test.ts). This is also the first concrete card to exercise the
// renderCardTemplate() glyph callback, per the card family plan's
// "Untestable at this phase" table.
export default {
  title: 'Card/User card/Tests',
  component: 'swc-user-card',
  tags: ['!autodocs', 'dev'],
  parameters: {
    docs: { disable: true, page: null },
  },
} as Meta;

const avatarGlyph = (): ReturnType<typeof html> => html`
  <swc-avatar
    slot="avatar"
    src="./images/avatar-preview.png"
    alt="Jane Doe"
  ></swc-avatar>
`;

const previewImage = (): ReturnType<typeof html> => html`
  <img slot="preview" src="./images/card-preview.jpg" alt="" />
`;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-user-card></swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step('renders expected default property values', async () => {
      expect(card.variant, 'default variant is primary').toBe('primary');
      expect(card.size, 'default size is m').toBe('m');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variant restriction
// ──────────────────────────────────────────────────────────────

export const VariantValuesTest: Story = {
  render: () => html`
    <swc-user-card></swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step('accepts every variant valid for a user card', async () => {
      for (const variant of USER_CARD_VARIANTS) {
        card.variant = variant;
        await card.updateComplete;
        expect(card.variant, `variant property is "${variant}"`).toBe(variant);
      }
    });
  },
};

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-user-card></swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step(
      'warns when "quiet" is set, since it is not supported on swc-user-card',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.variant = 'quiet' as unknown as UserCard['variant'];
          await card.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for the unsupported "quiet" variant'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message references variant'
          ).toContain('variant');
        })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-user-card variant="secondary"></swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step('does not warn for a variant valid on swc-user-card', () =>
      withWarningSpy(async (warnCalls) => {
        card.variant = 'tertiary';
        await card.updateComplete;

        expect(
          warnCalls.length,
          'no warnings are emitted for a valid variant'
        ).toBe(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots and anatomy
// ──────────────────────────────────────────────────────────────

export const AvatarGlyphSlotTest: Story = {
  render: () => html`
    <swc-user-card>
      ${avatarGlyph()}
      <span slot="title">Jane Doe</span>
      <span slot="description">Product designer</span>
    </swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step('routes avatar content into the avatar glyph slot', () => {
      const avatarSlot = card.renderRoot.querySelector<HTMLSlotElement>(
        'slot[name="avatar"]'
      );
      expect(avatarSlot, 'avatar slot exists').toBeTruthy();
      const assigned = avatarSlot?.assignedElements() ?? [];
      expect(assigned.length, 'the avatar is assigned to the slot').toBe(1);
      expect(
        assigned[0]?.tagName.toLowerCase(),
        'the assigned element is a swc-avatar'
      ).toBe('swc-avatar');
    });
  },
};

export const NoGlyphCallbackOmittedTest: Story = {
  render: () => html`
    <swc-user-card>
      <span slot="title">Jane Doe</span>
    </swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step('renders the avatar slot even when left empty', () => {
      const avatarSlot = card.renderRoot.querySelector<HTMLSlotElement>(
        'slot[name="avatar"]'
      );
      expect(
        avatarSlot,
        'avatar slot exists with no assigned content'
      ).toBeTruthy();
      expect(
        avatarSlot?.assignedElements().length,
        'no elements are assigned to the avatar slot'
      ).toBe(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Avatar size propagation
// ──────────────────────────────────────────────────────────────

export const AvatarSizePropagationTest: Story = {
  render: () => html`
    <swc-user-card size="l">${avatarGlyph()}</swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');
    const avatar = card.querySelector('[slot="avatar"]') as HTMLElement;

    await step(
      'sets the avatar size from the fixed scale matching the card size',
      async () => {
        expect(
          avatar.getAttribute('size'),
          'avatar size matches the card size="l" mapping'
        ).toBe('700');
      }
    );

    await step(
      'updates the propagated size reactively when the card size changes',
      async () => {
        card.size = 'xl';
        await card.updateComplete;

        expect(
          avatar.getAttribute('size'),
          'avatar size matches the card size="xl" mapping'
        ).toBe('900');
      }
    );

    await step(
      'overwrites a size the consumer set directly on the avatar',
      async () => {
        avatar.setAttribute('size', '1500');
        card.size = 'm';
        await card.updateComplete;

        expect(
          avatar.getAttribute('size'),
          "the card's mapping overwrites the consumer-set size"
        ).toBe('500');
      }
    );

    await step(
      'propagates to an avatar slotted in after the initial render',
      async () => {
        card.size = 's';
        await card.updateComplete;

        const avatarSlot = card.renderRoot.querySelector(
          'slot[name="avatar"]'
        ) as HTMLSlotElement;
        const slotChanged = new Promise<void>((resolve) =>
          avatarSlot.addEventListener('slotchange', () => resolve(), {
            once: true,
          })
        );

        const lateAvatar = document.createElement('swc-avatar');
        lateAvatar.slot = 'avatar';
        card.appendChild(lateAvatar);

        await slotChanged;

        expect(
          lateAvatar.getAttribute('size'),
          'size propagates to an avatar slotted in after the initial render'
        ).toBe('300');
        card.removeChild(lateAvatar);
      }
    );
  },
};

export const AvatarOutlinePropagationTest: Story = {
  render: () => html`
    <swc-user-card>${avatarGlyph()}</swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');
    const avatar = card.querySelector('[slot="avatar"]') as HTMLElement;

    await step('always sets outline on the slotted avatar', () => {
      expect(
        avatar.hasAttribute('outline'),
        'outline is present on the avatar by default'
      ).toBe(true);
    });

    await step(
      'propagates to an avatar slotted in after the initial render',
      async () => {
        const avatarSlot = card.renderRoot.querySelector(
          'slot[name="avatar"]'
        ) as HTMLSlotElement;
        const slotChanged = new Promise<void>((resolve) =>
          avatarSlot.addEventListener('slotchange', () => resolve(), {
            once: true,
          })
        );

        const lateAvatar = document.createElement('swc-avatar');
        lateAvatar.slot = 'avatar';
        card.appendChild(lateAvatar);

        await slotChanged;

        expect(
          lateAvatar.hasAttribute('outline'),
          'outline propagates to an avatar slotted in after the initial render'
        ).toBe(true);
        card.removeChild(lateAvatar);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: swc-user-card CSS layout contracts
// ──────────────────────────────────────────────────────────────

export const DefaultPreviewAspectRatioTest: Story = {
  render: () => html`
    <swc-user-card>${previewImage()}</swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<UserCard>(canvasElement, 'swc-user-card');

    await step(
      'defaults the preview aspect ratio custom property to 3/1',
      () => {
        expect(
          getComputedStyle(card)
            .getPropertyValue('--swc-card-base-preview-aspect-ratio')
            .trim(),
          'preview aspect ratio defaults to 3/1'
        ).toBe('3/1');
      }
    );
  },
};

export const AvatarOverlapWithPreviewTest: Story = {
  render: () => html`
    <swc-user-card class="with-preview">
      ${previewImage()} ${avatarGlyph()}
    </swc-user-card>
    <swc-user-card class="without-preview">${avatarGlyph()}</swc-user-card>
  `,
  play: async ({ canvasElement, step }) => {
    const withPreview = canvasElement.querySelector(
      'swc-user-card.with-preview'
    ) as UserCard;
    const withoutPreview = canvasElement.querySelector(
      'swc-user-card.without-preview'
    ) as UserCard;
    await withPreview.updateComplete;
    await withoutPreview.updateComplete;

    const avatarMarginBlockStart = (card: UserCard): string =>
      getComputedStyle(card.querySelector('[slot="avatar"]') as HTMLElement)
        .marginBlockStart;

    await step(
      'pulls the avatar up by a negative margin when a preview is present',
      () => {
        expect(
          avatarMarginBlockStart(withPreview).startsWith('-'),
          'avatar margin-block-start is negative when a preview exists'
        ).toBe(true);
      }
    );

    await step(
      'does not apply a negative margin when there is no preview',
      () => {
        expect(
          avatarMarginBlockStart(withoutPreview).startsWith('-'),
          'avatar margin-block-start is not negative without a preview'
        ).toBe(false);
      }
    );
  },
};

export const AvatarOverlapCenteredAcrossSizesTest: Story = {
  render: () => html`
    ${CARD_VALID_SIZES.map(
      (size) => html`
        <swc-user-card size=${size}>
          ${previewImage()} ${avatarGlyph()}
        </swc-user-card>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const cards = [
      ...canvasElement.querySelectorAll('swc-user-card'),
    ] as UserCard[];
    await Promise.all(cards.map((card) => card.updateComplete));

    await step(
      'centers the avatar on the media/content seam at every size',
      () => {
        for (const card of cards) {
          const media = card.renderRoot.querySelector(
            '.swc-CardBase-media'
          ) as HTMLElement;
          const avatar = card.querySelector('[slot="avatar"]') as HTMLElement;
          const mediaBottom = media.getBoundingClientRect().bottom;
          const avatarRect = avatar.getBoundingClientRect();
          const avatarCenter = avatarRect.top + avatarRect.height / 2;

          expect(
            Math.round(avatarCenter - mediaBottom),
            `size="${card.getAttribute('size')}": avatar is centered on the media/content seam`
          ).toBe(0);
        }
      }
    );
  },
};
