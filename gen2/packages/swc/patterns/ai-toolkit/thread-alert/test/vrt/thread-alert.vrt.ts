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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-thread-alert.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

import {
  captioned,
  createPermutations,
  forcedColorsVrtParameters,
  forcePseudoStates,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Thread alert/Thread alert VRT',
  component: 'swc-thread-alert',
  tags: ['dev'],
};

export default meta;

// Helpers

const VARIANTS = [
  'informative',
  'positive',
  'notice',
  'negative',
  'neutral',
] as const;

type AlertCase = {
  variant?: (typeof VARIANTS)[number];
  actions?: boolean;
  dismiss?: boolean;
  message?: string;
  inlineSize?: string;
  lang?: string;
  focus?: boolean;
};

const renderAlert = ({
  variant,
  actions = false,
  dismiss = false,
  message = 'Your request is ready.',
  inlineSize = '300px',
  lang,
  focus = false,
}: AlertCase = {}) => html`
  <swc-thread-alert
    variant=${variant ?? nothing}
    lang=${lang ?? nothing}
    tabindex=${focus ? '-1' : nothing}
    data-force-state=${focus ? 'focus' : nothing}
    style="inline-size: ${inlineSize}; max-inline-size: 100%;"
  >
    <span>${message}</span>
    ${actions
      ? html`
          <swc-button slot="actions" size="s">Try again</swc-button>
        `
      : nothing}
    ${dismiss
      ? html`
          <swc-close-button
            slot="dismiss"
            size="s"
            accessible-label="Dismiss message"
          ></swc-close-button>
        `
      : nothing}
  </swc-thread-alert>
`;

const ALERT_PERMUTATIONS = createPermutations([
  {
    variant: VARIANTS,
    actions: [false, true],
    dismiss: [false, true],
  },
]);

const anatomyLabel = ({ actions, dismiss }: AlertCase) =>
  actions
    ? dismiss
      ? 'Action and dismissal'
      : 'Action only'
    : dismiss
      ? 'Dismissal only'
      : 'Text only';

const forceFocus = forcePseudoStates(
  'swc-thread-alert[data-force-state="focus"]'
);

const verifyFocus = async (context: { canvasElement: HTMLElement }) => {
  await forceFocus(context);
  const hosts = context.canvasElement.querySelectorAll(
    'swc-thread-alert[data-force-state="focus"]'
  );
  await expect(hosts.length).toBeGreaterThan(0);
  for (const host of hosts) {
    await expect(getComputedStyle(host).outlineStyle).toBe('solid');
  }
};

const permutationContent = () => html`
  ${row([renderAlert()], 'Default variant and minimum height')}
  ${groupPermutationsBy(ALERT_PERMUTATIONS, 'variant').map(
    ([variant, permutations]) =>
      row(
        permutations.map((permutation) =>
          captioned(renderAlert(permutation), anatomyLabel(permutation))
        ),
        variant
      )
  )}
  ${row(
    [
      captioned(
        renderAlert({
          variant: 'negative',
          actions: true,
          dismiss: true,
          inlineSize: '220px',
          message:
            'Your response could not be completed. Check your connection, then try again.',
        }),
        'Narrow with controls'
      ),
      captioned(
        renderAlert({
          variant: 'notice',
          inlineSize: '220px',
          message: 'request_0123456789abcdefghijklmnopqrstuvwxyz0123456789',
        }),
        'Unbroken request identifier'
      ),
    ],
    'Wrapping'
  )}
  ${row(
    [
      html`
        <swc-thread-alert
          variant="negative"
          style="inline-size: 420px; max-inline-size: 100%;"
        >
          <span>Your response could not be completed.</span>
          <swc-button slot="actions" size="s">Try again</swc-button>
          <swc-button slot="actions" size="s">Edit request</swc-button>
          <swc-close-button
            slot="dismiss"
            size="s"
            accessible-label="Dismiss message"
          ></swc-close-button>
        </swc-thread-alert>
      `,
    ],
    'Multiple actions'
  )}
  ${row(
    [
      html`
        <swc-thread-alert
          variant="informative"
          style="inline-size: 300px; max-inline-size: 100%;"
        >
          <span>Your response was saved.</span>
          <a class="swc-Link" slot="actions" href="#saved-response">
            View response
          </a>
        </swc-thread-alert>
      `,
    ],
    'Link action'
  )}
  ${row(
    [
      html`
        <div
          style="padding: 16px; background-color: var(--swc-background-layer-1-color);"
        >
          ${renderAlert({ variant: 'notice', dismiss: true })}
        </div>
      `,
      html`
        <div style="padding: 16px; background-color: var(--swc-gray-100);">
          ${renderAlert({ variant: 'neutral', dismiss: true })}
        </div>
      `,
    ],
    'Translucency on layer 1 and gray 100'
  )}
  ${row(
    [
      html`
        <div class="swc-theme swc-theme--sizeL">
          ${captioned(renderAlert(), 'Text only: 40px minimum')}
        </div>
      `,
      html`
        <div class="swc-theme swc-theme--sizeL">
          ${captioned(
            renderAlert({ variant: 'notice', actions: true, dismiss: true }),
            'With controls'
          )}
        </div>
      `,
    ],
    'Large scale'
  )}
  ${row(
    [
      captioned(
        renderAlert({
          lang: 'ja',
          inlineSize: '220px',
          message: 'リクエストを完了できませんでした。接続を確認してください。',
        }),
        'Japanese'
      ),
      captioned(
        renderAlert({
          lang: 'ko',
          inlineSize: '220px',
          message:
            '요청을 완료하지 못했습니다. 연결을 확인하고 다시 시도하세요.',
        }),
        'Korean'
      ),
      captioned(
        renderAlert({
          lang: 'zh',
          inlineSize: '220px',
          message: '无法完成请求。请检查连接，然后重试。',
        }),
        'Chinese'
      ),
    ],
    'CJK wrapping'
  )}
  ${row([renderAlert({ focus: true })], 'Programmatic focus')}
`;

// VRT stories

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: verifyFocus,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: verifyFocus,
};
