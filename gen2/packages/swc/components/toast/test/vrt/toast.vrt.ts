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
import { ifDefined } from 'lit/directives/if-defined.js';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  TOAST_VARIANTS,
  type ToastVariant,
} from '@adobe/spectrum-wc-core/components/toast';

import '@adobe/spectrum-wc/components/toast/swc-toast.js';

import {
  forcedColorsVrtParameters,
  forcePseudoState,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// TODO(SWC-2655): add peek-stack depth and Show all coverage.
// TODO(SWC-2654): add expanded-view, scrim, and Clear all / Collapse coverage.

// Metadata

const meta: Meta = {
  title: 'Toast/Toast VRT',
  component: 'swc-toast',
  tags: ['dev'],
};

export default meta;

// Helpers

type FocusTarget = 'host' | 'action' | 'close';

type ToastSpec = {
  message: string;
  variant?: ToastVariant;
  actionLabel?: string;
  lang?: string;
  open?: boolean;
  focus?: FocusTarget;
};

const longMessage =
  'Your changes to the project have been saved and shared with everyone who has access to it.';

const longWord = 'Supercalifragilisticexpialidocious'.repeat(4);

const cjkMessages = {
  ja: 'ファイルが保存され、プロジェクトにアクセスできる全員と共有されました',
  ko: '파일이 저장되었으며 프로젝트에 액세스할 수 있는 모든 사용자와 공유되었습니다',
  zh: '文件已保存，并已与有权访问该项目的所有人共享',
} as const;

const toast = ({
  message,
  variant,
  actionLabel,
  lang,
  open = true,
  focus,
}: ToastSpec) => html`
  <swc-toast
    ?open=${open}
    variant=${ifDefined(variant)}
    action-label=${ifDefined(actionLabel)}
    lang=${ifDefined(lang)}
    data-force-focus=${ifDefined(focus)}
  >
    ${message}
  </swc-toast>
`;

const column = (children: unknown) => html`
  <div
    style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--swc-spacing-300);"
  >
    ${children}
  </div>
`;

const variantRows = () =>
  TOAST_VARIANTS.map((variant) =>
    row(
      html`
        ${toast({ message: 'File saved', variant })}
        ${toast({ message: 'File archived', variant, actionLabel: 'Undo' })}
      `,
      variant
    )
  );

const wrappingRow = () =>
  row(
    column(html`
      ${toast({ message: longMessage, actionLabel: 'Undo' })}
      ${toast({ message: longMessage, variant: 'positive' })}
      ${toast({ message: longWord, variant: 'info' })}
    `),
    'Wrapping'
  );

const cjkRow = () =>
  row(
    column(
      (['ja', 'ko', 'zh'] as const).map((lang) =>
        toast({ message: cjkMessages[lang], variant: 'info', lang })
      )
    ),
    'CJK line-height (lang ja / ko / zh)'
  );

const focusRow = () =>
  row(
    html`
      ${toast({ message: 'Toast focused', actionLabel: 'Undo', focus: 'host' })}
      ${toast({
        message: 'Action focused',
        actionLabel: 'Undo',
        focus: 'action',
      })}
      ${toast({
        message: 'Close focused',
        actionLabel: 'Undo',
        focus: 'close',
      })}
    `,
    'Focus visible'
  );

const closedRow = () =>
  row(
    toast({ message: 'Closed toast', variant: 'info', open: false }),
    'Closed (renders nothing)'
  );

const content = ({ cjk = false }: { cjk?: boolean } = {}) => html`
  ${variantRows()} ${wrappingRow()} ${cjk ? cjkRow() : ''} ${focusRow()}
  ${closedRow()}
`;

const internalFocusTargets: Record<
  Exclude<FocusTarget, 'host'>,
  [string, string]
> = {
  action: ['swc-button', '.swc-Button'],
  close: ['swc-close-button', '.swc-CloseButton'],
};

// Waits for each open toast's enter transition, then forces focus-visible on
// the host or on its action or close button.
const settleAndForceFocus = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const toasts = Array.from(
    canvasElement.querySelectorAll('swc-toast[open]')
  ) as (HTMLElement & { updateComplete: Promise<boolean> })[];
  await Promise.all(toasts.map((el) => el.updateComplete));
  await waitFor(() => {
    toasts.forEach((el) => {
      const surface = el.shadowRoot?.querySelector('.swc-Toast');
      expect(surface && getComputedStyle(surface).opacity).toBe('1');
    });
  });

  toasts.forEach((el) => {
    const focus = el.dataset.forceFocus as FocusTarget | undefined;
    if (!focus) {
      return;
    }
    if (focus === 'host') {
      forcePseudoState(el, 'focus-visible');
      return;
    }
    const [tagName, internalSelector] = internalFocusTargets[focus];
    const target = el.shadowRoot?.querySelector(tagName);
    if (target) {
      forcePseudoState(target, 'focus-visible', internalSelector);
    }
  });
};

// VRT stories

// CJK is LTR, so it appears only in the light/LTR block.
export const Permutations: Story = {
  render: () => html`
    ${theme(content({ cjk: true }), 'light', 'ltr')}
    ${theme(content(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: settleAndForceFocus,
};

export const ForcedColors: Story = {
  render: () => html`
    ${theme(content(), 'light', 'ltr')}
  `,
  parameters: forcedColorsVrtParameters,
  play: settleAndForceFocus,
};
