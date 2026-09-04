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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-conversation-turn.js';
import '../../../system-message/swc-system-message.js';
import '../../../user-message/swc-user-message.js';

import type { ForcedPseudoState } from '../../../../../.storybook/helpers/index.js';
import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Conversation turn/Conversation turn VRT',
  component: 'swc-conversation-turn',
  tags: ['dev'],
  // Snapshot-only; without explicit argTypes the auto-generated controls also
  // surface private internals, so drop the panel.
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

const COLUMN_WIDTH = '480px';
const NARROW_WIDTH = '280px';

const SHORT_USER = 'Can you summarize the attached campaign assets?';
const LONG_USER =
  'Draft a detailed launch plan covering positioning, target segments, channel strategy, budget allocation, and a week-by-week rollout timeline for the next two quarters.';
const SHORT_SYSTEM =
  'Here is a concise summary based on the files you shared. I grouped themes by audience and channel.';

const CJK_USER = {
  ja: '添付されたキャンペーン資料を要約して、次の役員向けプレゼンに使えるようにしてください。',
  ko: '첨부된 캠페인 자료를 요약해서 다음 임원 보고 프레젠테이션에 바로 쓸 수 있게 만들어 주세요.',
  zh: '请把附上的营销资料汇总成一份可直接用于高管汇报的演示提纲。',
} as const;

type CjkLang = keyof typeof CJK_USER;

const userCopy = (text: string) => html`
  <swc-user-message>${text}</swc-user-message>
`;

const userCard = () => html`
  <swc-user-message type="card">
    <div
      slot="thumbnail"
      role="img"
      aria-label="File"
      style="inline-size: 32px; block-size: 32px; border-radius: 3px; background: var(--swc-gray-200);"
    ></div>
    <span slot="title">Brand guidelines</span>
    <span slot="subtitle">PDF</span>
  </swc-user-message>
`;

const userMedia = () => html`
  <swc-user-message type="media">
    <div
      slot="thumbnail"
      role="img"
      aria-label="Campaign still"
      style="background: linear-gradient(135deg, #a78bfa, #f472b6);"
    ></div>
    <span slot="title">Campaign still</span>
    <span slot="subtitle">2026</span>
  </swc-user-message>
`;

const systemBody = (text: string) => html`
  <swc-system-message>
    <div class="swc-Typography--prose">
      <p>${text}</p>
    </div>
  </swc-system-message>
`;

type TurnContent = 'copy' | 'card' | 'media' | 'grouped' | 'wrapping' | 'cjk';

type TurnCase = {
  type: 'user' | 'system';
  content?: TurnContent;
  lang?: CjkLang;
  forceState?: ForcedPseudoState;
};

const turnChildren = ({ type, content = 'copy', lang }: TurnCase) => {
  if (type === 'system') {
    if (content === 'grouped') {
      return html`
        ${systemBody(SHORT_SYSTEM)} ${systemBody('A second stacked reply.')}
      `;
    }
    return systemBody(SHORT_SYSTEM);
  }

  switch (content) {
    case 'card':
      return userCard();
    case 'media':
      return userMedia();
    case 'grouped':
      return html`
        ${userCopy(SHORT_USER)} ${userCard()} ${userMedia()}
      `;
    case 'wrapping':
      return userCopy(LONG_USER);
    case 'cjk':
      return userCopy(CJK_USER[lang ?? 'ja']);
    default:
      return userCopy(SHORT_USER);
  }
};

const renderTurn = (testCase: TurnCase) => {
  const width =
    testCase.content === 'wrapping' || testCase.content === 'cjk'
      ? NARROW_WIDTH
      : COLUMN_WIDTH;

  return html`
    <div style="inline-size: ${width};">
      <swc-conversation-turn
        type=${testCase.type}
        lang=${testCase.lang ?? nothing}
        data-force-state=${testCase.forceState ?? nothing}
      >
        ${turnChildren(testCase)}
      </swc-conversation-turn>
    </div>
  `;
};

const forceTurnStates = forcePseudoStates(
  'swc-conversation-turn[data-force-state]'
);

// `type` is the only visual attribute: user end-aligns and sizes to the
// bubble, system start-aligns and stretches. Grouped slots exercise
// `--swc-conversation-turn-group-gap` plus mixed-width end alignment.
// Card/media are included only because their narrower intrinsic widths make
// that alignment readable — their own chrome is not this wrapper's coverage.
// `accessible-label` is aria-only (no pixels). Hover/active have no rules.
const permutationContent = () => html`
  ${row([renderTurn({ type: 'user' })], 'User')}
  ${row([renderTurn({ type: 'system' })], 'System')}
  ${row([renderTurn({ type: 'user', content: 'grouped' })], 'User grouped')}
  ${row([renderTurn({ type: 'system', content: 'grouped' })], 'System grouped')}
  ${row(
    [
      renderTurn({ type: 'user', content: 'card' }),
      renderTurn({ type: 'user', content: 'media' }),
    ],
    'User attachments'
  )}
  ${row([renderTurn({ type: 'user', content: 'wrapping' })], 'Wrapping')}
  ${row(
    (['ja', 'ko', 'zh'] as const).map((lang) =>
      renderTurn({ type: 'user', content: 'cjk', lang })
    ),
    'CJK language'
  )}
  ${row(
    [
      renderTurn({
        type: 'user',
        content: 'grouped',
        forceState: 'focus-visible',
      }),
      renderTurn({ type: 'system', forceState: 'focus-visible' }),
    ],
    'focus-visible'
  )}
`;

// Forced-colors replaces the page palette; the turn's own contribution is
// the focus ring (`focus-indicator-color`). Alignment is included so the
// ring is checked on both bubble shapes.
const forcedColorsContent = () => html`
  ${row([renderTurn({ type: 'user' })], 'User')}
  ${row([renderTurn({ type: 'system' })], 'System')}
  ${row(
    [
      renderTurn({
        type: 'user',
        content: 'grouped',
        forceState: 'focus-visible',
      }),
      renderTurn({ type: 'system', forceState: 'focus-visible' }),
    ],
    'focus-visible'
  )}
`;

// VRT stories

// Light/ltr and dark/rtl in one snapshot; the rtl pass covers user
// `flex-end` / system `flex-start` mirroring.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceTurnStates,
};

export const ForcedColors: Story = {
  render: () => theme(forcedColorsContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceTurnStates,
};
