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

import { html, nothing, type TemplateResult } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  CHECKBOX_VALID_SIZES,
  type CheckboxSize,
  type CheckboxStatus,
} from '@adobe/spectrum-wc-core/components/checkbox';

import '@adobe/spectrum-wc/components/checkbox/swc-checkbox.js';

import {
  forcedColorsVrtParameters,
  type ForcedPseudoState,
  forcePseudoState,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Checkbox/Checkbox VRT',
  component: 'swc-checkbox',
  tags: ['dev'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

type CheckboxCase = {
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  emphasized?: boolean;
  required?: boolean;
  fieldStatus?: CheckboxStatus;
  forceState?: ForcedPseudoState;
  label?: string | null;
  accessibleLabel?: string;
  description?: string;
  errorText?: string;
  lang?: string;
  inlineSize?: string;
  style?: string;
};

const renderCheckbox = ({
  size = 'm',
  checked = false,
  indeterminate = false,
  emphasized = false,
  required = false,
  fieldStatus,
  forceState,
  label = 'Send me product updates',
  accessibleLabel,
  description,
  errorText,
  lang,
  inlineSize,
  style,
}: CheckboxCase = {}): TemplateResult => html`
  <swc-checkbox
    size=${size}
    ?checked=${checked}
    ?indeterminate=${indeterminate}
    ?emphasized=${emphasized}
    ?required=${required}
    field-status=${fieldStatus ?? nothing}
    accessible-label=${accessibleLabel ?? nothing}
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
    style=${[inlineSize ? `inline-size: ${inlineSize};` : '', style ?? '']
      .join(' ')
      .trim() || nothing}
  >
    ${label
      ? html`
          <span slot="label">${label}</span>
        `
      : nothing}
    ${description
      ? html`
          <span slot="description">${description}</span>
        `
      : nothing}
    ${errorText
      ? html`
          <span slot="error-text">${errorText}</span>
        `
      : nothing}
  </swc-checkbox>
`;

/**
 * Hover and down are styled on the box-and-label row; keyboard focus is styled
 * from the native input.
 */
const FORCED_STATE_TARGETS: Record<ForcedPseudoState, string> = {
  hover: '.swc-Checkbox-control',
  active: '.swc-Checkbox-control',
  'focus-visible': '.swc-Checkbox-input',
  'focus-within': '.swc-Checkbox-control',
};

const forceCheckboxStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}): Promise<void> => {
  canvasElement
    .querySelectorAll<HTMLElement>('swc-checkbox[data-force-state]')
    .forEach((checkbox) => {
      const state = checkbox.dataset.forceState as ForcedPseudoState;
      forcePseudoState(checkbox, state, FORCED_STATE_TARGETS[state]);
    });
};

const selectionCases = (testCase: CheckboxCase = {}): TemplateResult[] => [
  renderCheckbox({ ...testCase, label: 'Unchecked' }),
  renderCheckbox({ ...testCase, checked: true, label: 'Checked' }),
  renderCheckbox({ ...testCase, indeterminate: true, label: 'Indeterminate' }),
];

const stateRows = (): TemplateResult[] =>
  (
    [
      ['Hover', 'hover'],
      ['Active', 'active'],
      ['Keyboard focus', 'focus-visible'],
    ] as const
  ).map(([label, forceState]) =>
    row(
      [
        ...selectionCases({ forceState }),
        renderCheckbox({
          forceState,
          emphasized: true,
          checked: true,
          label: 'Emphasized checked',
        }),
      ],
      label
    )
  );

const permutationContent = (): TemplateResult => html`
  ${CHECKBOX_VALID_SIZES.map((size) =>
    row(selectionCases({ size }), `Size ${size}`)
  )}
  ${row(selectionCases({ emphasized: true }), 'Emphasized')}
  ${row(
    [
      ...selectionCases({ fieldStatus: 'disabled' }),
      renderCheckbox({
        fieldStatus: 'disabled',
        emphasized: true,
        checked: true,
        label: 'Emphasized checked',
      }),
    ],
    'Disabled'
  )}
  ${row(selectionCases({ fieldStatus: 'readonly' }), 'Read-only')}
  ${stateRows()}
  ${row(
    [
      renderCheckbox({
        fieldStatus: 'invalid',
        required: true,
        label: 'With error text',
        errorText: 'Check this box to continue.',
      }),
      renderCheckbox({
        fieldStatus: 'invalid',
        label: 'With description',
        description: 'Required by your organization.',
      }),
      renderCheckbox({ fieldStatus: 'invalid', label: 'Icon only' }),
      html`
        <fieldset disabled style="border: 0; margin: 0; padding: 0;">
          ${renderCheckbox({
            fieldStatus: 'invalid',
            label: 'In a disabled fieldset',
            errorText: 'Check this box to continue.',
          })}
        </fieldset>
      `,
    ],
    'Invalid'
  )}
  ${row(
    [
      renderCheckbox({ description: 'We send one email a month.' }),
      renderCheckbox({
        fieldStatus: 'disabled',
        description: 'We send one email a month.',
      }),
    ],
    'Description'
  )}
  ${row(
    [
      renderCheckbox({ label: null, accessibleLabel: 'Select row' }),
      renderCheckbox({
        label: null,
        accessibleLabel: 'Select row',
        checked: true,
      }),
    ],
    'No visible label'
  )}
  ${row(
    CHECKBOX_VALID_SIZES.map((size) =>
      renderCheckbox({
        size,
        checked: true,
        inlineSize: '200px',
        label:
          'A long label wraps across several lines while the box stays on the first line',
      })
    ),
    'Wrapped label'
  )}
  ${row(
    [
      renderCheckbox({
        lang: 'ja',
        checked: true,
        label: '製品の最新情報を受け取る',
        description: '月に一度メールでお届けします',
      }),
      renderCheckbox({
        lang: 'ko',
        checked: true,
        label: '제품 업데이트 받기',
        description: '한 달에 한 번 이메일을 보내드립니다',
      }),
      renderCheckbox({
        lang: 'zh',
        checked: true,
        label: '接收产品更新',
        description: '我们每月发送一封电子邮件',
      }),
    ],
    'CJK language'
  )}
`;

// ────────────────
//    VRT STORIES
// ────────────────

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceCheckboxStates,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceCheckboxStates,
};
