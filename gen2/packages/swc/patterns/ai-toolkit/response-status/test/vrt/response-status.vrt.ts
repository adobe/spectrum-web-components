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

const LONG_DESCRIPTION =
  'Prioritizing data from your documents like the ‘2023 Annual Report’ and press releases. Cross-referencing each source against the quarterly figures, reconciling discrepancies between the filed numbers and the summary tables, and flagging any line items that need a second pass. Prioritizing data from your documents like the ‘2023 Annual Report’ and press releases. Cross-referencing each source against the quarterly figures, reconciling discrepancies between the filed numbers and the summary tables, and flagging any line items that need a second pass.';

// A realistic completed-step trail feeding into a current step that carries
// a description long enough to exceed the step detail's vertical scroll cap,
// used by the ContainerCheck story below alongside the pasted-code case,
// which exercises the detail panel's horizontal scroll instead.
const CONTAINER_CHECK_PRIOR_STEPS = [
  {
    label: 'Looked through linked repositories and shared drives',
    description:
      'Indexed every folder shared with this conversation, including the finance, investor-relations, and engineering drives, to find the source documents referenced in the request.',
  },
  { label: 'Opened the 2023 and 2024 annual reports' },
  {
    label: 'Extracted quarterly figures from investor call transcripts',
    description:
      'Pulled revenue, margin, and headcount figures mentioned across all four quarterly earnings calls for both fiscal years.',
  },
  { label: 'Cross-referenced press releases against internal summaries' },
] as const;

const CONTAINER_CHECK_STEP_DESCRIPTION =
  'Cross-referencing the 2023 and 2024 annual reports against the quarterly filings, reconciling discrepancies between the filed numbers and the summary tables circulated internally, flagging line items that need a second pass, and noting which figures still need sign-off from finance before they can be cited in the final response.';

// Pasted straight into a step's description, same shape an agent echoing a
// tool result would produce: multi-line, unbroken code lines long enough to
// force `.swc-ResponseStatusStep-detailScroll`'s horizontal scrollbar
// instead of wrapping (see response-status-step.css `::slotted(pre)`).
const CONTAINER_CHECK_STEP_CODE = `document.querySelectorAll('.annual-gallery').forEach((gallery) => {
	const months = gallery.querySelectorAll('.annual-gallery__month');
	const previous = gallery.querySelector('.annual-gallery__prev');
	const next = gallery.querySelector('.annual-gallery__next');
	const counter = gallery.querySelector('.annual-gallery__counter');

	// Automatically start on the current month
	let current = new Date().getMonth();

	const update = () => {
		months.forEach((month, index) => {
			month.hidden = index !== current;
		});

		counter.textContent = \`\${current + 1} / \${months.length}\`;

		previous.disabled = current === 0;
		next.disabled = current === months.length - 1;
	};

	previous.addEventListener('click', () => {
		if (current > 0) {
			current--;
			update();
		}
	});

	next.addEventListener('click', () => {
		if (current < months.length - 1) {
			current++;
			update();
		}
	});

	update();
});`;

type ForcedState = 'hover' | 'focus-visible';

type StepCase = {
  status: ResponseStatusStepStatus;
  label: string;
  description?: string;
  open?: boolean;
  forceState?: ForcedState;
  // Distinguishes the overflowing description from the step toggle: both live
  // on the same host, so `data-force-state` alone can't pick the internal.
  forceTarget?: 'scroll';
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
  forceTarget,
}: StepCase) => html`
  <swc-response-status-step
    status=${status}
    ?open=${open}
    data-force-state=${forceState ?? nothing}
    data-force-target=${forceTarget ?? nothing}
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
  forceState?: ForcedState;
  maxInlineSize?: string;
};

const renderStatus = ({
  status,
  label,
  lang,
  open = false,
  steps,
  forceState,
  maxInlineSize = '320px',
}: StatusCase) => html`
  <swc-response-status
    status=${status}
    ?open=${open}
    accessible-label="Execution steps"
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
    style="max-inline-size: ${maxInlineSize};"
  >
    <span slot="label">${label ?? statusLabels[status]}</span>
    ${steps ?? nothing}
  </swc-response-status>
`;

const captioned = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: start; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

const forceDisclosureRowStates = forcePseudoStates(
  'swc-response-status[data-force-state]',
  '.swc-ResponseStatus-headerTrail--button'
);

const forceStepToggleStates = forcePseudoStates(
  'swc-response-status-step[data-force-state]:not([data-force-target="scroll"])',
  '.swc-ResponseStatusStep-toggle'
);

const forceStepScrollStates = forcePseudoStates(
  'swc-response-status-step[data-force-target="scroll"]',
  '.swc-ResponseStatusStep-detailScroll'
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
  context: Parameters<typeof forceDisclosureRowStates>[0]
) => {
  await forceDisclosureRowStates(context);
  await forceStepToggleStates(context);
  await forceStepScrollStates(context);
  pauseLoaders(context);
};

// Every whole-response status with no steps (bare status row: loader icon,
// checkmark, or the icon-less stopped row), every status with steps attached
// but the timeline collapsed (disclosure chrome, chevron pointing closed),
// and every status with the timeline expanded (chevron open, step list
// visible; the active+open case also exercises the generic "Processing…"
// header fallback since an active step is present while open). Step
// disclosure (collapsed vs. expanded detail panel side by side), a
// description long enough to overflow the scroll cap, forced hover and
// focus-visible on each focusable control (header disclosure, step toggle,
// overflowing description), settled multi-line label wrapping with ellipsis past
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
          description: LONG_DESCRIPTION,
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
      captioned(
        renderStatus({
          status: 'active',
          open: true,
          forceState: 'focus-visible',
          steps: renderStep({
            status: 'active',
            label: 'Searching repositories',
          }),
        }),
        'Header disclosure'
      ),
      captioned(
        renderStatus({
          status: 'complete',
          label: 'Thought for 9 seconds',
          open: true,
          steps: renderStep({
            status: 'complete',
            label: 'Compose response',
            description: 'Synthesizing findings into a structured comparison.',
            forceState: 'focus-visible',
          }),
        }),
        'Step toggle'
      ),
      captioned(
        renderStatus({
          status: 'active',
          open: true,
          steps: renderStep({
            status: 'active',
            label: 'Reviewing internal documentation',
            description: LONG_DESCRIPTION,
            open: true,
            forceState: 'focus-visible',
            forceTarget: 'scroll',
          }),
        }),
        'Scroll region'
      ),
    ],
    'Forced focus'
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

// Realistic, worst-case content at the response status's own min/max
// container-width cap: a long trail of completed steps feeding into a
// current step whose description either exceeds the detail panel's
// vertical scroll cap (prose) or its horizontal scroll cap (pasted code),
// so the panel's two scroll axes are each exercised by their own row.
const containerCheckStatus = (
  status: ResponseStatusStatus,
  {
    priorStepCount = 4,
    descriptionIsCode = false,
  }: { priorStepCount?: number; descriptionIsCode?: boolean } = {}
) =>
  renderStatus({
    status,
    label: statusLabels[status],
    open: true,
    // Fluid, not the suite's default 320px cap: this story snapshots the
    // component's own min/max clamp() reacting to the Chromatic viewport
    // modes below, which a fixed inline size would otherwise override.
    maxInlineSize: '100%',
    steps: html`
      ${CONTAINER_CHECK_PRIOR_STEPS.slice(0, priorStepCount).map(
        (step) => html`
          <swc-response-status-step status="complete">
            <span slot="label">${step.label}</span>
            ${'description' in step
              ? html`
                  <span slot="description">${step.description}</span>
                `
              : nothing}
          </swc-response-status-step>
        `
      )}
      <swc-response-status-step status=${status} open>
        <span slot="label">
          Reconciling quarterly filings against internal summaries
        </span>
        ${descriptionIsCode
          ? html`
              <pre slot="description">${CONTAINER_CHECK_STEP_CODE}</pre>
            `
          : html`
              <span slot="description">
                ${CONTAINER_CHECK_STEP_DESCRIPTION}
              </span>
            `}
      </swc-response-status-step>
    `,
  });

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

// Its own snapshot (rather than a row in Permutations) so it can claim
// taller Chromatic viewports: this content is long enough that the default
// viewport modes would clip it.
export const ContainerCheck: Story = {
  render: () =>
    theme(
      html`
        ${row([containerCheckStatus('active')], 'Active')}
        ${row(
          [containerCheckStatus('stopped', { priorStepCount: 2 })],
          'Stopped'
        )}
        ${row([containerCheckStatus('complete')], 'Complete')}
        ${row(
          [
            containerCheckStatus('active', {
              priorStepCount: 0,
              descriptionIsCode: true,
            }),
          ],
          'Active with code sample (horizontal scroll)'
        )}
      `,
      'light',
      'ltr'
    ),
  parameters: {
    ...vrtParameters,
    chromatic: {
      modes: {
        mobile: { viewport: { width: 320, height: 1300 } },
        tablet: { viewport: { width: 500, height: 1300 } },
        desktop: { viewport: { width: 1280, height: 1500 } },
      },
    },
  },
  play: forceAll,
};
