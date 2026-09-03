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

import '../../swc-response-status.js';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import type { ResponseStatusStepStatus } from '../../response-status-step/ResponseStatusStep.js';
import {
  RESPONSE_STATUSES,
  type ResponseStatusStatus,
} from '../../ResponseStatus.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Response status/Response status VRT',
  component: 'swc-response-status',
  tags: ['dev'],
};

export default meta;

// Helpers

const statusLabels: Record<ResponseStatusStatus, string> = {
  active: 'Generating response',
  complete: 'Response complete',
  stopped: 'You stopped the response',
};

type StepCase = {
  status: ResponseStatusStepStatus;
  label: string;
  description?: string;
  open?: boolean;
  forceState?: 'hover';
};

// A step's own label/description spans are live-projected via `<slot>`, so
// `:lang()` inside response-status-step.css already resolves through
// ordinary attribute inheritance from an ancestor `lang` (here, the host
// `<swc-response-status lang="...">` set in the CJK row below) without
// needing the attribute repeated on these light-DOM children.
const renderStep = ({
  status,
  label,
  description,
  open = false,
  forceState,
}: StepCase) => html`
  <swc-response-status-step
    status=${status}
    ?open=${open}
    data-force-state=${forceState ?? nothing}
  >
    <span slot="label">${label}</span>
    ${description
      ? html`
          <span slot="description">${description}</span>
        `
      : nothing}
  </swc-response-status-step>
`;

type StatusCase = {
  status: ResponseStatusStatus;
  label?: string;
  lang?: string;
  open?: boolean;
  steps?: unknown;
  forceState?: 'hover';
};

const renderStatus = ({
  status,
  label,
  lang,
  open = false,
  steps,
  forceState,
}: StatusCase) => html`
  <swc-response-status
    status=${status}
    ?open=${open}
    accessible-label="Execution steps"
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
    style="max-inline-size: 320px;"
  >
    <span slot="label">${label ?? statusLabels[status]}</span>
    ${steps ?? nothing}
  </swc-response-status>
`;

const forceDisclosureRowHover = forcePseudoStates(
  'swc-response-status[data-force-state]',
  '.swc-ResponseStatus-row--button'
);

const forceStepToggleHover = forcePseudoStates(
  'swc-response-status-step[data-force-state]',
  '.swc-ResponseStatusStep-toggle'
);

// The active-status leading icon is a live, JS-ticked `swc-pixel-loader`
// (not a CSS animation Chromatic can freeze on its own), so pause it on its
// settled frame; otherwise every active-status case would snapshot whatever
// random mid-animation frame happened to be showing.
const pauseLoaders = ({ canvasElement }: { canvasElement: HTMLElement }) => {
  canvasElement.querySelectorAll('swc-response-status').forEach((status) => {
    const loader = status.shadowRoot?.querySelector('swc-pixel-loader');
    if (loader) {
      (loader as HTMLElement & { paused: boolean }).paused = true;
    }
  });
};

const forceAll = async (
  context: Parameters<typeof forceDisclosureRowHover>[0]
) => {
  await forceDisclosureRowHover(context);
  await forceStepToggleHover(context);
  pauseLoaders(context);
};

// Every whole-response status with no steps (bare status row: loader icon,
// checkmark, or the icon-less stopped row), every status with steps attached
// but the timeline collapsed (disclosure chrome, chevron pointing closed),
// and every status with the timeline expanded (chevron open, step list
// visible; the active+open case also exercises the generic "Processing…"
// header fallback since an active step is present while open). Step
// disclosure (collapsed vs. expanded detail panel side by side), a
// description long enough to overflow the scroll cap, forced hover on both
// the response row and a step's own toggle (the only pseudo-states either
// stylesheet defines), settled multi-line label wrapping with ellipsis past
// the 2-line cap, and CJK label/step text complete the coverage.
const permutationContent = () => html`
  ${row(
    RESPONSE_STATUSES.map((status) => renderStatus({ status })),
    'Statuses'
  )}
  ${row(
    RESPONSE_STATUSES.map((status) =>
      renderStatus({
        status,
        // Empty label with the timeline closed falls back to the active
        // step's own label (only reachable while `status="active"`; see
        // `_getHeaderLabel` in ResponseStatus.ts), distinct from the
        // generic "Processing…" fallback covered once the timeline is open.
        label: status === 'active' ? '' : undefined,
        steps: html`
          ${renderStep({
            status: 'complete',
            label: 'Looked through documentation',
          })}
          ${renderStep({ status: 'active', label: 'Searching repositories' })}
        `,
      })
    ),
    'With steps (collapsed)'
  )}
  ${row(
    [
      renderStatus({
        status: 'active',
        // Empty label slot with the timeline open and an active step present
        // triggers the generic "Processing…" header fallback (see
        // `_showsGenericProcessingLabel` in ResponseStatus.ts) instead of
        // either a consumer-provided label or the active step's own label.
        label: '',
        open: true,
        steps: html`
          ${renderStep({
            status: 'complete',
            label: 'Looked through documentation',
          })}
          ${renderStep({ status: 'active', label: 'Searching repositories' })}
        `,
      }),
      renderStatus({
        status: 'complete',
        label: 'Thought for 9 seconds',
        open: true,
        steps: html`
          ${renderStep({
            status: 'complete',
            label: 'Looked through documentation',
          })}
          ${renderStep({ status: 'complete', label: 'Compose response' })}
        `,
      }),
      renderStatus({
        status: 'stopped',
        open: true,
        steps: html`
          ${renderStep({
            status: 'complete',
            label: 'Looked through documentation',
          })}
          ${renderStep({ status: 'stopped', label: 'Searching repositories' })}
        `,
      }),
    ],
    'With steps (expanded)'
  )}
  ${row(
    [
      renderStatus({
        status: 'complete',
        label: 'Thought for 9 seconds',
        open: true,
        steps: html`
          ${renderStep({
            status: 'complete',
            label: 'Looked through documentation',
            description: 'Scanned 12 internal knowledge base articles.',
          })}
          ${renderStep({
            status: 'complete',
            label: 'Compose response',
            description: 'Synthesizing findings into a structured comparison.',
            open: true,
          })}
        `,
      }),
    ],
    'Step disclosure: collapsed vs. expanded'
  )}
  ${row(
    [
      renderStatus({
        status: 'active',
        open: true,
        steps: renderStep({
          status: 'active',
          label: 'Reviewing internal documentation',
          description:
            'Prioritizing data from your documents like the ‘2023 Annual Report’ and press releases. Cross-referencing each source against the quarterly figures, reconciling discrepancies between the filed numbers and the summary tables, and flagging any line items that need a second pass.',
          open: true,
        }),
      }),
    ],
    'Long description (scroll region)'
  )}
  ${row(
    [
      renderStatus({
        status: 'active',
        open: true,
        forceState: 'hover',
        steps: renderStep({
          status: 'active',
          label: 'Searching repositories',
        }),
      }),
      renderStatus({
        status: 'complete',
        label: 'Thought for 9 seconds',
        open: true,
        steps: renderStep({
          status: 'complete',
          label: 'Compose response',
          description: 'Synthesizing findings into a structured comparison.',
          forceState: 'hover',
        }),
      }),
    ],
    'Forced hover'
  )}
  ${row(
    [
      renderStatus({
        status: 'active',
        label:
          'Reviewing quarterly filings, press releases, and internal notes across every linked repository to compile a complete answer',
      }),
    ],
    'Wrapping (2-line cap)'
  )}
  ${row(
    [
      renderStatus({
        status: 'active',
        open: true,
        lang: 'ja',
        label: '欧州とアジアのクルーズ旅行パッケージを検索しています',
        steps: renderStep({
          status: 'active',
          label: 'ドキュメントを検索しています',
          description: '内部リポジトリの検索結果を確認しています。',
        }),
      }),
      renderStatus({
        status: 'active',
        open: true,
        lang: 'ko',
        label: '유럽과 아시아의 크루즈 여행 패키지를 검색하고 있습니다',
        steps: renderStep({
          status: 'active',
          label: '문서를 검토하고 있습니다',
          description: '내부 저장소 검색 결과를 확인하고 있습니다.',
        }),
      }),
      renderStatus({
        status: 'active',
        open: true,
        lang: 'zh',
        label: '正在搜索欧洲和亚洲的邮轮旅行套餐',
        steps: renderStep({
          status: 'active',
          label: '正在查阅文档',
          description: '正在检查内部存储库的搜索结果。',
        }),
      }),
    ],
    'CJK language'
  )}
`;

// VRT stories

// Rendered once in light/ltr and once in dark/rtl (that combination covers
// both axes, including the row's RTL mirroring), all still in a single story
// so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceAll,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot
// rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceAll,
};
