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
import type { ResponseStatusStatus } from '../../../response-status/ResponseStatus.js';

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
            <swc-response-status
              slot="status"
              status="complete"
              style="--swc-response-status-label-max-lines: 1;"
            >
              <span slot="label">
                Response complete: reviewed the source material, verified the
                findings, and prepared the final response
              </span>
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

// Break-my-ui style worst-case copy: a realistic but maximal user request and
// a step description long enough to exceed the step detail's scroll cap, so
// every status below actually shows the thread's scrolling affordances
// instead of just wrapping once.
const EDGE_USER_PROMPT =
  'Can you review every quarterly filing, press release, investor call transcript, and internal engineering note across all linked repositories and shared drives, then draft a fully source-cited summary with page references for each claim?';

const EDGE_STEP_DESCRIPTION =
  'Cross-referencing the 2023 and 2024 annual reports against the quarterly filings, reconciling discrepancies between the filed numbers and the summary tables circulated internally, flagging line items that need a second pass, and noting which figures still need sign-off from finance before they can be cited in the final response.';

// A realistic completed-step trail, longest ones first so they're already
// visible in the collapsed snapshot, feeding into a current step (the one
// matching the thread's own status) that carries the long, scrolling
// description above.
const EDGE_PRIOR_STEPS = [
  {
    label: 'Looked through linked repositories and shared drives',
    description:
      'Indexed every folder shared with this conversation, including the finance, investor-relations, and engineering drives, to find the source documents referenced in the request.',
  },
  {
    label: 'Opened the 2023 and 2024 annual reports',
  },
  {
    label: 'Extracted quarterly figures from investor call transcripts',
    description:
      'Pulled revenue, margin, and headcount figures mentioned across all four quarterly earnings calls for both fiscal years.',
  },
  {
    label: 'Cross-referenced press releases against internal summaries',
  },
] as const;

type EdgeCaseConfig = {
  label: string;
  reply: string;
  /** How many of EDGE_PRIOR_STEPS are already complete before the current step. */
  priorStepCount: number;
  currentStepLabel: string;
  currentStepDescription: string;
  /** Render `currentStepDescription` as a `<pre>` (code sample) instead of plain text. */
  currentStepDescriptionIsCode: boolean;
};

const edgeCaseCopy: Record<ResponseStatusStatus, EdgeCaseConfig> = {
  active: {
    label:
      'Reviewing quarterly filings, press releases, investor call transcripts, and internal engineering notes across every linked repository and shared drive',
    reply: 'Working on it…',
    priorStepCount: 4,
    currentStepLabel:
      'Reconciling quarterly filings against internal summaries',
    currentStepDescription: EDGE_STEP_DESCRIPTION,
    currentStepDescriptionIsCode: false,
  },
  stopped: {
    label: 'You stopped the response',
    reply: 'The response was stopped before it finished.',
    priorStepCount: 2,
    currentStepLabel:
      'Reconciling quarterly filings against internal summaries',
    currentStepDescription: EDGE_STEP_DESCRIPTION,
    currentStepDescriptionIsCode: false,
  },
  complete: {
    label: 'Response complete',
    reply:
      'Here is the fully source-cited summary you asked for, with page references for each figure.',
    priorStepCount: 4,
    currentStepLabel: 'Reconciled quarterly filings against internal summaries',
    currentStepDescription: EDGE_STEP_DESCRIPTION,
    currentStepDescriptionIsCode: false,
  },
};

const edgeCaseTurn = (
  status: ResponseStatusStatus,
  overrides: Partial<EdgeCaseConfig> = {}
) => {
  const {
    label,
    reply,
    priorStepCount,
    currentStepLabel,
    currentStepDescription,
    currentStepDescriptionIsCode,
  } = {
    ...edgeCaseCopy[status],
    ...overrides,
  };

  return html`
    ${userTurn(EDGE_USER_PROMPT)}
    <swc-conversation-turn type="system">
      <swc-system-message>
        <swc-response-status
          slot="status"
          status=${status}
          open
          accessible-label="Execution steps"
          style="--swc-response-status-label-max-lines: 1;"
        >
          <span slot="label">${label}</span>
          ${EDGE_PRIOR_STEPS.slice(0, priorStepCount).map(
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
            <span slot="label">${currentStepLabel}</span>
            ${currentStepDescriptionIsCode
              ? html`
                  <pre slot="description">${currentStepDescription}</pre>
                `
              : html`
                  <span slot="description">${currentStepDescription}</span>
                `}
          </swc-response-status-step>
        </swc-response-status>
        <div class="swc-Typography--prose">
          <p>${reply}</p>
        </div>
        <swc-message-feedback slot="feedback"></swc-message-feedback>
      </swc-system-message>
    </swc-conversation-turn>
  `;
};

// VRT stories

// Light/ltr and dark/rtl in one snapshot. Column direction is unchanged in
// RTL; the rtl pass still covers child alignment inherited through the
// thread's full-width column.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: {
    ...vrtParameters,
    chromatic: {
      modes: {
        mobile: { viewport: { width: 320, height: 800 } },
        tablet: { viewport: { width: 500, height: 900 } },
        desktop: { viewport: { width: 1280, height: 1000 } },
      },
    },
  },
};

// Worst-case content for each status at the same three widths, relying only
// on the thread's real column width per mode (no manual width wrapper) so
// the long label and the step-detail scroll region render exactly as a
// consumer's own container would constrain them.
//
// The active-status leading icon is a live, JS-ticked `swc-pixel-loader`, so
// it's paused on a settled frame the same way response-status.vrt.ts does;
// otherwise the snapshot would capture a random mid-animation frame.
// A realistic case: an agent echoing a code snippet straight into a step's
// description. Passed as one multi-line string, same as any other
// description, so indentation/line breaks render verbatim inside the
// monospace `<pre>` support in `response-status-step.css`.
const SAMPLE_STEP_CODE = `document.querySelectorAll('.annual-gallery').forEach((gallery) => {
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

export const ResponseStatusContainerCheck: Story = {
  render: () => html`
    ${theme(
      html`
        ${row([edgeCaseTurn('active')], 'Active')}
        ${row([edgeCaseTurn('stopped')], 'Stopped')}
        ${row([edgeCaseTurn('complete')], 'Complete')}
        ${row(
          [
            edgeCaseTurn('active', {
              currentStepDescription: SAMPLE_STEP_CODE,
              currentStepDescriptionIsCode: true,
              priorStepCount: 0,
            }),
          ],
          'Active with code sample'
        )}
      `,
      'light',
      'ltr'
    )}
  `,
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
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    canvasElement.querySelectorAll('swc-response-status').forEach((status) => {
      const loader = status.shadowRoot?.querySelector('swc-pixel-loader');
      if (loader) {
        (loader as HTMLElement & { paused: boolean }).paused = true;
      }
    });
  },
};

// TEMPORARY — break-ui finding, SWC-2626: a step label with no break
// opportunity (a bare hash/filename/URL, same shape real tool-call labels
// take) overflows `.swc-ResponseStatusStep-toggle` instead of wrapping,
// because that element only has `inline-size: fit-content` and is missing
// the `max-inline-size: 100%` clamp its header-row sibling
// (`.swc-ResponseStatus-headerTrailCrossfade`) already has. Remove this
// story once response-status-step.css carries the fix.
const WORST_CASE_STEP_LABEL =
  'Reviewing https://example.com/workspaces/acme/finance/q3/filings/9f8e7d6c5b4a4c3d8e2f1a0b9c8d7e6f.parquet and investor-relations-quarterly-ridership-and-revenue-reconciliation-dataset.parquet across every linked repository';

// Same catalog mix as the label above (hash, email, URL with a query
// string, camera-style filename, bracketed/dashed filename) so the detail
// panel is exercised by the same kind of unbreakable tokens, in addition to
// the already-covered long-sentence scroll case.
const WORST_CASE_STEP_DESCRIPTION =
  'Cross-referencing 9f8e7d6c-5b4a-4c3d-8e2f-1a0b9c8d7e6f against bartholomew.fitzgerald@northwind-industries-holdings.example.com and https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved, reconciling IMG_20250914_183022_HDR_portrait_edited_edited.HEIC against Q3 Board Deck — FINAL (revised) v12 [approved by legal].pdf, then flagging unresolved line items for finance sign-off.';

export const StepLabelOverflowBreakUiFinding: Story = {
  render: () => html`
    ${theme(
      html`
        ${row(
          [
            edgeCaseTurn('active', {
              label: WORST_CASE_STEP_LABEL,
              currentStepLabel: WORST_CASE_STEP_LABEL,
              currentStepDescription: WORST_CASE_STEP_DESCRIPTION,
              priorStepCount: 0,
            }),
          ],
          'Unbreakable step label (hash/URL/filename, no spaces)'
        )}
        ${row(
          [
            edgeCaseTurn('active', {
              currentStepDescription: SAMPLE_STEP_CODE,
              currentStepDescriptionIsCode: true,
              priorStepCount: 0,
            }),
          ],
          'Sample code pasted into step description (now styled as code)'
        )}
      `,
      'light',
      'ltr'
    )}
  `,
  parameters: {
    ...vrtParameters,
    chromatic: {
      modes: {
        mobile: { viewport: { width: 320, height: 1200 } },
        tablet: { viewport: { width: 500, height: 1200 } },
        desktop: { viewport: { width: 1280, height: 1200 } },
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    canvasElement.querySelectorAll('swc-response-status').forEach((status) => {
      const loader = status.shadowRoot?.querySelector('swc-pixel-loader');
      if (loader) {
        (loader as HTMLElement & { paused: boolean }).paused = true;
      }
    });
  },
};
