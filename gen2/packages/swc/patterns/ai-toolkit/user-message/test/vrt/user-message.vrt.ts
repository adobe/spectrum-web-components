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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-user-message.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import type { UserMessageType } from '../../UserMessage.js';

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
  slots?: AttachmentSlots;
  copy?: string;
  lang?: string;
  maxInlineSize?: string;
};

const cardThumbnail = html`
  <img slot="thumbnail" src="images/card-preview.jpg" alt="File preview" />
`;

const mediaThumbnail = html`
  <img slot="thumbnail" src="images/card-preview.jpg" alt="Campaign preview" />
`;

const attachmentSlots = (type: 'card' | 'media', slots: AttachmentSlots) => {
  const thumbnail = type === 'card' ? cardThumbnail : mediaThumbnail;
  const title = slots === 'truncated' ? LONG_FILE_NAME : TITLE;
  const subtitle = slots === 'truncated' ? LONG_FILE_NAME : SUBTITLE;

  return html`
    ${thumbnail}
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
            ${attachmentSlots(type, slots)}
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

// Type is the primary visual axis (copy bubble vs card vs media). Card and
// media also cover title+subtitle vs title-only slot anatomy.
const SLOT_LABELS = {
  titleAndSubtitle: 'Title + subtitle',
  titleOnly: 'Title only',
} as const satisfies Record<Exclude<AttachmentSlots, 'truncated'>, string>;

const TYPE_PERMUTATIONS = createPermutations([
  { type: ['copy'] },
  { type: ['card', 'media'], slots: ['titleAndSubtitle', 'titleOnly'] },
]);

const renderTypePermutation = (permutation: MessageCase) => {
  const message = renderMessage(permutation);
  const { slots } = permutation;
  // Copy is identifiable from its own text. Card/media title-only vs
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

const extraRows = () => [
  // Narrow column forces wrap before the 536px cap; unconstrained long copy
  // hits that cap. Captions distinguish the two widths, which otherwise read
  // as similar wrapping bubbles.
  row(
    [
      captioned(
        renderMessage({ copy: LONG_COPY, maxInlineSize: '220px' }),
        'Narrow column (220px)'
      ),
      captioned(renderMessage({ copy: LONG_COPY }), 'Max inline size (536px)'),
    ],
    'Wrapping'
  ),
  // Unbroken filenames exercise the ellipsis rules on card and media title
  // and subtitle slots.
  row(
    [
      renderMessage({ type: 'card', slots: 'truncated' }),
      renderMessage({ type: 'media', slots: 'truncated' }),
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

const permutationContent = () => [...typeRows(), ...extraRows()];

// Renders content in light/ltr and dark/rtl (that pair covers both axes) in one
// story so each matrix costs a single snapshot.
const bothThemes = (content: unknown) => html`
  ${theme(content, 'light', 'ltr')} ${theme(content, 'dark', 'rtl')}
`;

// VRT stories

// Copy / card / media types (including title-only attachment anatomy), wrapping
// at a narrow column and at the 536px cap, ellipsis truncation, and CJK
// line-height. User message has no :hover/:focus/:active rules of its own
// (focus rings live on swc-conversation-turn), so there is no forced
// pseudo-state row.
export const Permutations: Story = {
  render: () => bothThemes(permutationContent()),
  parameters: vrtParameters,
};

// Forced-colors remaps the gray-50 bubble fill, gray-800/900 text, and the
// transparent border. Those tokens do not vary across wrapping, truncation, or
// CJK, so the three types are enough.
export const ForcedColors: Story = {
  render: () => theme(typeRows(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
