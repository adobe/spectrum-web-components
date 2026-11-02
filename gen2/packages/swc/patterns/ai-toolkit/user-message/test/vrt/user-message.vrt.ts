/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
    10| * governing permissions and limitations under the License.
 */

import { html, nothing } from 'lit';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-user-message.js';
import '../../../upload-attachment/swc-upload-attachment.js';
import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import type { UserMessage, UserMessageType } from '../../UserMessage.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/User message/User message VRT',
  component: 'swc-user-message',
  tags: ['dev'],
  // Snapshot-only; drop the panel so auto-generated controls don't clutter Chromatic.
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

const SHORT_COPY =
  'Can you help me create a 45-minute presentation, with animations, for an executive update?';
const LONG_COPY =
  'Draft a detailed launch plan covering positioning, target segments, channel strategy, budget allocation, and a week-by-week rollout timeline for the next two quarters, then list the key risks and open questions to review.';

const TITLE = 'Hilton commercial assets';
const SUBTITLE = '2026';
const LONG_FILE_NAME = `${'VeryLongAttachmentNamePortion'.repeat(12)}.pdf`;

type AttachmentSlots = 'titleAndSubtitle' | 'titleOnly' | 'truncated';

type MessageCase = {
  type?: UserMessageType;
  count?: number;
  slots?: AttachmentSlots;
  copy?: string;
  lang?: string;
  maxInlineSize?: string;
};

const cardThumbnail = html`
  <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
`;

const mediaThumbnail = html`
  <img slot="thumbnail" src="images/card-preview.jpg" alt="Campaign preview" />
`;

const attachmentSlots = (slots: AttachmentSlots) => {
  const title = slots === 'truncated' ? LONG_FILE_NAME : TITLE;
  const subtitle = slots === 'truncated' ? LONG_FILE_NAME : SUBTITLE;

  return html`
    ${cardThumbnail}
    <span slot="title">${title}</span>
    ${slots === 'titleOnly'
      ? nothing
      : html`
          <span slot="subtitle">${subtitle}</span>
        `}
  `;
};

const renderMessage = ({
  type = 'copy',
  count = 1,
  slots = 'titleAndSubtitle',
  copy = SHORT_COPY,
  lang,
  maxInlineSize,
}: MessageCase) => {
  const message =
    type === 'copy'
      ? html`
          <swc-user-message type="copy" lang=${lang ?? nothing}>
            ${copy}
          </swc-user-message>
        `
      : html`
          <swc-user-message type=${type} lang=${lang ?? nothing}>
            ${Array.from({ length: count }, () =>
              type === 'card'
                ? html`
                    <swc-upload-attachment slot="thumbnail" type="card">
                      ${attachmentSlots(slots)}
                    </swc-upload-attachment>
                  `
                : mediaThumbnail
            )}
          </swc-user-message>
        `;

  return maxInlineSize
    ? html`
        <div style="max-inline-size: ${maxInlineSize};">${message}</div>
      `
    : message;
};

const captioned = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: start; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

// Card tiles also cover title+subtitle vs title-only slot anatomy.
const SLOT_LABELS = {
  titleAndSubtitle: 'Title + subtitle',
  titleOnly: 'Title only',
} as const satisfies Record<Exclude<AttachmentSlots, 'truncated'>, string>;

const TYPE_PERMUTATIONS = createPermutations([
  { type: ['copy'] },
  { type: ['card'], slots: ['titleAndSubtitle', 'titleOnly'] },
  { type: ['media'], count: [1, 2, 7] },
  { type: ['card'], count: [2, 6] },
]);

const renderTypePermutation = (permutation: MessageCase) => {
  const message = renderMessage(permutation);
  if (permutation.count) {
    return captioned(
      message,
      `${permutation.count} ${permutation.type === 'card' ? 'documents' : 'images'}`
    );
  }
  const { slots } = permutation;
  // Copy is identifiable from its own text. Card title-only vs
  // title+subtitle are near-identical without a caption.
  return slots === 'titleAndSubtitle' || slots === 'titleOnly'
    ? captioned(message, SLOT_LABELS[slots])
    : message;
};

const typeRows = () =>
  groupPermutationsBy(TYPE_PERMUTATIONS, 'type').map(([type, cases]) =>
    row(
      cases.map((permutation) =>
        renderTypePermutation(permutation as MessageCase)
      ),
      type
    )
  );

const galleryOverflowRow = (type: 'media' | 'card' = 'media') =>
  row(
    [
      html`
        <div data-gallery-overflow data-attachment-type=${type}>
          ${renderMessage({
            type,
            count: type === 'media' ? 24 : 14,
            maxInlineSize: '480px',
          })}
        </div>
      `,
    ],
    type === 'card' ? 'Document gallery overflow' : 'Gallery overflow'
  );

const verifyGalleryOverflow = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  for (const wrapper of canvasElement.querySelectorAll<HTMLElement>(
    '[data-gallery-overflow]'
  )) {
    const gallery = wrapper.querySelector<UserMessage>('swc-user-message')!;
    await gallery.updateComplete;
    const viewport = gallery.shadowRoot!.querySelector<HTMLElement>(
      '.swc-UserMessage-galleryViewport'
    )!;
    await waitFor(() => expect(viewport.getAttribute('tabindex')).toBe('0'));
    viewport.scrollTop = 0;
    if (
      CSS.supports('animation-timeline: scroll()') &&
      !matchMedia('(forced-colors: active)').matches
    ) {
      await waitFor(() =>
        expect(
          getComputedStyle(viewport).maskImage.match(/rgba?\(/g)?.length
        ).toBe(2)
      );
    }
  }
};

const extraRows = () => [
  // Narrow vs. capped column; the 75% cap normally lives on the parent turn,
  // so maxInlineSize reproduces it here in isolation.
  row(
    [
      captioned(
        renderMessage({ copy: LONG_COPY, maxInlineSize: '220px' }),
        'Narrow column (220px)'
      ),
      captioned(
        renderMessage({ copy: LONG_COPY, maxInlineSize: '75%' }),
        'Max inline size (75%)'
      ),
      captioned(
        renderMessage({ type: 'media', count: 7, maxInlineSize: '220px' }),
        'Narrow gallery (220px)'
      ),
      captioned(
        renderMessage({
          type: 'card',
          count: 6,
          maxInlineSize: '220px',
        }),
        'Single-column document gallery (220px)'
      ),
    ],
    'Wrapping'
  ),
  // Unbroken filenames exercise the card tile's title and subtitle truncation.
  row(
    [
      renderMessage({ type: 'card', slots: 'truncated' }),
      renderMessage({
        type: 'card',
        slots: 'truncated',
        maxInlineSize: '180px',
      }),
    ],
    'Truncation'
  ),
  row(
    [
      renderMessage({
        lang: 'ja',
        copy: '45分のプレゼンテーション作成を手伝ってもらえますか？',
      }),
      renderMessage({
        lang: 'ko',
        copy: '45분짜리 프레젠테이션 작성을 도와주실 수 있나요?',
      }),
      renderMessage({
        lang: 'zh',
        copy: '你能帮我做一份45分钟的演示文稿吗？',
      }),
    ],
    'CJK language'
  ),
];

const permutationContent = () => [
  ...typeRows(),
  ...extraRows(),
  galleryOverflowRow(),
  galleryOverflowRow('card'),
];

// Renders content in light/ltr and dark/rtl (that pair covers both axes) in one
// story so each matrix costs a single snapshot.
const bothThemes = (content: unknown) => html`
  ${theme(content, 'light', 'ltr')} ${theme(content, 'dark', 'rtl')}
`;

// VRT stories

// Copy / card / media types (including title-only card anatomy), wrapping
// at a narrow column and at the 536px cap, ellipsis truncation, and CJK
// line-height. User message has no :hover/:focus/:active rules of its own
// (focus rings live on swc-conversation-turn), so there is no forced
// pseudo-state row.
export const Permutations: Story = {
  render: () => bothThemes(permutationContent()),
  play: verifyGalleryOverflow,
  parameters: vrtParameters,
};

// Forced-colors remaps the gray-50 bubble fill, gray-800/900 text, and the
// transparent border. Those tokens do not vary across wrapping, truncation, or
// CJK, so the three types are enough.
export const ForcedColors: Story = {
  render: () =>
    theme(
      [...typeRows(), galleryOverflowRow(), galleryOverflowRow('card')],
      'light',
      'ltr'
    ),
  play: verifyGalleryOverflow,
  parameters: forcedColorsVrtParameters,
};
