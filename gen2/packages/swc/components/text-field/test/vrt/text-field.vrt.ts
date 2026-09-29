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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  TEXT_FIELD_LABEL_POSITIONS,
  TEXT_FIELD_VALID_SIZES,
  type TextFieldLabelPosition,
  type TextFieldNecessityIndicator,
  type TextFieldSize,
} from '@adobe/spectrum-wc-core/components/text-field';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';
import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';
import '@adobe/spectrum-wc-icons/swc-icon-mention.js';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  SIZE_LABELS,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Text field/Text field VRT',
  component: 'swc-text-field',
  tags: ['dev'],
};

export default meta;

// ────────────────
//    HELPERS
// ────────────────

const forceTextFieldStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  // Hover and focus-within target the internal control; keyboard focus targets
  // the host's custom state.
  await forcePseudoStates(
    'swc-text-field[data-force-state="hover"], swc-text-field[data-force-state="focus-within"]',
    '.swc-TextField-control'
  )({ canvasElement });
  await forcePseudoStates('swc-text-field[data-force-state="focus-visible"]')({
    canvasElement,
  });
};

type TextFieldCase = {
  size?: TextFieldSize;
  labelPosition?: TextFieldLabelPosition;
  necessityIndicator?: TextFieldNecessityIndicator;
  label?: string;
  description?: string;
  errorText?: string;
  accessibleLabel?: string;
  placeholder?: string;
  value?: string;
  prefix?: TemplateResult;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  extraStyle?: string;
  lang?: string;
  forceState?: 'hover' | 'focus-visible' | 'focus-within';
};

const renderCase = ({
  size,
  labelPosition,
  necessityIndicator,
  label,
  description,
  errorText,
  accessibleLabel,
  placeholder,
  value = '',
  prefix,
  required = false,
  readonly = false,
  disabled = false,
  invalid = false,
  extraStyle,
  lang,
  forceState,
}: TextFieldCase) => {
  const wrapperStyle = `inline-size: 220px;${extraStyle ? ` ${extraStyle}` : ''}`;
  return html`
    <div style=${wrapperStyle}>
      <swc-text-field
        size=${ifDefined(size)}
        label-position=${ifDefined(labelPosition)}
        necessity-indicator=${ifDefined(necessityIndicator)}
        accessible-label=${ifDefined(accessibleLabel)}
        placeholder=${ifDefined(placeholder)}
        .value=${value}
        ?required=${required}
        ?readonly=${readonly}
        ?disabled=${disabled}
        ?invalid=${invalid}
        lang=${ifDefined(lang)}
        data-force-state=${ifDefined(forceState)}
      >
        ${label
          ? html`
              <span slot="label">${label}</span>
            `
          : nothing}
        ${prefix ?? nothing}
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
      </swc-text-field>
    </div>
  `;
};

const labelPositionLabels = {
  top: 'Top label',
  side: 'Side label',
} as const satisfies Record<TextFieldLabelPosition, string>;

const permutationContent = () => html`
  ${row(
    TEXT_FIELD_VALID_SIZES.map((size) =>
      renderCase({
        size,
        label: SIZE_LABELS[size],
        description: 'Field help text',
      })
    ),
    'Sizes'
  )}
  ${row(
    TEXT_FIELD_LABEL_POSITIONS.map((labelPosition) =>
      renderCase({
        labelPosition,
        label: labelPositionLabels[labelPosition],
      })
    ),
    'Label position'
  )}
  ${row(
    [
      renderCase({
        necessityIndicator: 'icon',
        required: true,
        label: 'Icon · required',
      }),
      renderCase({
        necessityIndicator: 'label',
        required: true,
        label: 'Label · required',
      }),
      renderCase({
        necessityIndicator: 'label',
        label: 'Label · optional',
      }),
    ],
    'Necessity indicator'
  )}
  ${row(
    [
      renderCase({ label: 'Default' }),
      renderCase({
        label: 'Read-only',
        readonly: true,
        value: 'Read-only value',
      }),
      renderCase({
        label: 'Disabled',
        disabled: true,
        value: 'Disabled value',
      }),
      renderCase({
        label: 'Disabled placeholder',
        disabled: true,
        placeholder: 'Placeholder',
      }),
      renderCase({
        label: 'Invalid',
        invalid: true,
        description: 'Field help text',
        errorText: 'Enter a valid value',
      }),
      renderCase({
        label: 'Invalid + disabled',
        invalid: true,
        disabled: true,
        description: 'Field help text',
        errorText: 'Enter a valid value',
      }),
    ],
    'States'
  )}
  ${row(
    [
      renderCase({ label: 'Label only' }),
      renderCase({
        label: 'Label + description',
        description: 'Extra help text below the field.',
      }),
      renderCase({
        accessibleLabel: 'Screen-reader-only label',
        placeholder: 'No visible label',
      }),
    ],
    'Anatomy'
  )}
  ${row(
    [
      renderCase({
        label: 'URL',
        placeholder: 'example.com',
        prefix: html`
          <span slot="prefix">https://</span>
        `,
      }),
      renderCase({
        label: 'Mention',
        placeholder: 'username',
        prefix: html`
          <swc-icon-mention slot="prefix"></swc-icon-mention>
        `,
      }),
      renderCase({
        label: 'User email',
        placeholder: 'contact@example.com',
        prefix: html`
          <swc-avatar
            slot="prefix"
            src="./images/avatar-preview.png"
            alt=""
          ></swc-avatar>
        `,
      }),
    ],
    'Prefix'
  )}
  ${row(
    [
      renderCase({ label: 'Default', forceState: 'hover' }),
      renderCase({
        label: 'Invalid',
        invalid: true,
        errorText: 'Enter a valid value',
        forceState: 'hover',
      }),
    ],
    'Hover'
  )}
  ${row(
    [
      renderCase({ label: 'Default', forceState: 'focus-within' }),
      renderCase({
        label: 'Invalid',
        invalid: true,
        errorText: 'Enter a valid value',
        forceState: 'focus-within',
      }),
    ],
    'Focus within'
  )}
  ${row(
    [
      renderCase({ label: 'Default', forceState: 'focus-visible' }),
      renderCase({
        label: 'Invalid',
        invalid: true,
        errorText: 'Enter a valid value',
        forceState: 'focus-visible',
      }),
    ],
    'Keyboard focus'
  )}
  ${row(
    [
      renderCase({
        label:
          'This top label wraps across multiple lines because it is quite long',
        placeholder: 'Placeholder',
      }),
      renderCase({
        labelPosition: 'side',
        label: 'This side label wraps and the input shrinks',
        placeholder: 'Placeholder',
        extraStyle: 'inline-size: 360px;',
      }),
      renderCase({
        labelPosition: 'side',
        label: 'Tightly capped label wraps early',
        placeholder: 'Placeholder',
        extraStyle:
          'inline-size: 360px; --swc-field-label-max-inline-size: 120px;',
      }),
    ],
    'Wrapping'
  )}
  ${row(
    [
      renderCase({ lang: 'ja', label: '承認ワークフローの入力値' }),
      renderCase({ lang: 'ko', label: '승인 워크플로 입력값' }),
      renderCase({ lang: 'zh', label: '审批工作流输入值' }),
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
  play: forceTextFieldStates,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceTextFieldStates,
};
