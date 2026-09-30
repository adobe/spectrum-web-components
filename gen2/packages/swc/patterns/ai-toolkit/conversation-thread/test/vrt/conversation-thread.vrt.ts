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

import '../../swc-conversation-thread.js';
import '../../../conversation-turn/swc-conversation-turn.js';
import '../../../message-feedback/swc-message-feedback.js';
import '../../../response-status/swc-response-status.js';
import '../../../system-message/swc-system-message.js';
import '../../../user-message/swc-user-message.js';

import {
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Conversation thread/Conversation thread VRT',
  component: 'swc-conversation-thread',
  tags: ['dev'],
  // Snapshot-only; without explicit argTypes the auto-generated controls also
  // surface private internals, so drop the panel.
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

const COLUMN_WIDTH = '480px';
const NARROW_WIDTH = '280px';

const LONG_USER =
  'Draft a detailed launch plan covering positioning, target segments, channel strategy, budget allocation, and a week-by-week rollout timeline for the next two quarters.';

const CJK_USER = {
  ja: '添付されたキャンペーン資料を要約して、次の役員向けプレゼンに使えるようにしてください。',
  ko: '첨부된 캠페인 자료를 요약해서 다음 임원 보고 프레젠테이션에 바로 쓸 수 있게 만들어 주세요.',
  zh: '请把附上的营销资料汇总成一份可直接用于高管汇报的演示提纲。',
} as const;

const CJK_SYSTEM = {
  ja: 'キャンペーン資料をオーディエンスとチャネルごとに整理し、役員向けに短い要約を作成しました。',
  ko: '캠페인 자료를 대상과 채널별로 정리해 임원 보고용 짧은 요약을 작성했습니다.',
  zh: '已按受众和渠道整理营销资料，并写成一份适合高管汇报的简要摘要。',
} as const;

type CjkLang = keyof typeof CJK_USER;

const userTurn = (text: string) => html`
  <swc-conversation-turn type="user">
    <swc-user-message>${text}</swc-user-message>
  </swc-conversation-turn>
`;

const systemTurn = (text: string, withChrome = false) => html`
  <swc-conversation-turn type="system">
    <swc-system-message>
      ${withChrome
        ? html`
            <swc-response-status slot="status" status="complete">
              <span slot="label">Response complete</span>
            </swc-response-status>
          `
        : nothing}
      <div class="swc-Typography--prose">
        <p>${text}</p>
      </div>
      ${withChrome
        ? html`
            <swc-message-feedback slot="feedback"></swc-message-feedback>
          `
        : nothing}
    </swc-system-message>
  </swc-conversation-turn>
`;

type ThreadKind = 'mixed' | 'consecutive-user' | 'wrapping' | 'cjk';

type ThreadCase = {
  kind: ThreadKind;
  lang?: CjkLang;
};

const threadChildren = ({ kind, lang = 'ja' }: ThreadCase) => {
  switch (kind) {
    case 'consecutive-user':
      return html`
        ${userTurn('Can you summarize the attached campaign assets?')}
        ${userTurn('Please keep the summary to one paragraph.')}
      `;
    case 'wrapping':
      return html`
        ${userTurn(LONG_USER)}
        ${systemTurn(
          'Here is a concise summary based on the files you shared. I grouped themes by audience and channel.',
          true
        )}
        ${userTurn('Great. Can you shorten that into three slides?')}
      `;
    case 'cjk':
      return html`
        ${userTurn(CJK_USER[lang])} ${systemTurn(CJK_SYSTEM[lang], true)}
      `;
    case 'mixed':
      return html`
        ${userTurn('Can you summarize the attached campaign assets?')}
        ${systemTurn(
          'Here is a concise summary based on the files you shared. I grouped themes by audience and channel.',
          true
        )}
        ${userTurn('Great. Can you shorten that into three slides?')}
      `;
  }
};

const renderThread = (testCase: ThreadCase) => {
  const width =
    testCase.kind === 'wrapping' || testCase.kind === 'cjk'
      ? NARROW_WIDTH
      : COLUMN_WIDTH;

  return html`
    <div style="inline-size: ${width};">
      <swc-conversation-thread lang=${testCase.lang ?? nothing}>
        ${threadChildren(testCase)}
      </swc-conversation-thread>
    </div>
  `;
};

// The thread's own CSS is a column flex + gap. Mixed covers the typical
// composition and the gap between opposite-type turns; consecutive user
// covers the same gap between two end-aligned bubbles (distinct from a
// turn's tighter group-gap). Wrapping checks `inline-size: 100%` in a
// narrow column. CJK is composed-pattern text metrics, not thread CSS.
//
// Forced-colors is skipped: the thread has no color of its own, so only
// slotted messages would shift, and that's their VRT. Hover/focus/active
// have no thread rules (focus rings live on conversation-turn). The
// FullPattern docs demo is a timed behavior fixture, not deterministic
// snapshot content. `accessible-label` on turns is aria-only.
const permutationContent = () => html`
  ${row([renderThread({ kind: 'mixed' })], 'Mixed')}
  ${row([renderThread({ kind: 'consecutive-user' })], 'Consecutive user')}
  ${row([renderThread({ kind: 'wrapping' })], 'Wrapping')}
  ${row(
    (['ja', 'ko', 'zh'] as const).map((lang) =>
      renderThread({ kind: 'cjk', lang })
    ),
    'CJK language'
  )}
`;

// VRT stories

// Light/ltr and dark/rtl in one snapshot. Column direction is unchanged in
// RTL; the rtl pass still covers child alignment inherited through the
// thread's full-width column.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};
