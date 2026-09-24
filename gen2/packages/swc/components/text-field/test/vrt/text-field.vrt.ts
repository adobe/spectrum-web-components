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

// Text field draws its keyboard focus ring off a custom `:state(keyboard-focused)`
// element-internals state, not `:host(:focus-visible)`, because text inputs match
// `:focus-visible` on pointer click. The shared `forcePseudoStates` helper only
// mirrors `:hover`/`:focus-visible`/`:active`, so mirror the keyboard-focused
// rule separately: rewrite `:host(:state(keyboard-focused))` as
// `:host([data-forced-focus-visible])` in the shadow root's adopted sheets.
const KEYBOARD_FOCUSED_SELECTOR = ':host(:state(keyboard-focused))';
const KEYBOARD_FOCUSED_MIRROR = ':host([data-forced-focus-visible])';

const mirrorCache = new WeakMap<CSSStyleSheet, CSSStyleSheet | null>();
const augmentedRoots = new WeakSet<ShadowRoot>();

const mirrorKeyboardFocusedRules = (
  sheet: CSSStyleSheet
): CSSStyleSheet | null => {
  const rules: string[] = [];
  for (const rule of sheet.cssRules) {
    if (
      rule instanceof CSSStyleRule &&
      rule.cssText.includes(KEYBOARD_FOCUSED_SELECTOR)
    ) {
      rules.push(
        rule.cssText
          .split(KEYBOARD_FOCUSED_SELECTOR)
          .join(KEYBOARD_FOCUSED_MIRROR)
      );
    }
  }
  if (!rules.length) {
    return null;
  }
  const mirror = new CSSStyleSheet();
  rules.forEach((cssText, index) => mirror.insertRule(cssText, index));
  return mirror;
};

const augmentKeyboardFocused = (root: ShadowRoot): void => {
  if (augmentedRoots.has(root)) {
    return;
  }
  augmentedRoots.add(root);
  const mirrors = root.adoptedStyleSheets
    .map((sheet) => {
      if (!mirrorCache.has(sheet)) {
        mirrorCache.set(sheet, mirrorKeyboardFocusedRules(sheet));
      }
      return mirrorCache.get(sheet) ?? null;
    })
    .filter((sheet): sheet is CSSStyleSheet => sheet !== null);
  if (mirrors.length) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...mirrors];
  }
};

const forceTextFieldStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  // Shared helper covers `:hover` on the internal control wrapper.
  await forcePseudoStates(
    'swc-text-field[data-force-state]',
    '.swc-TextField-control'
  )({ canvasElement });

  // Custom mirror for the keyboard-focused ring on hosts tagged focus-visible.
  canvasElement
    .querySelectorAll<HTMLElement>(
      'swc-text-field[data-force-state="focus-visible"]'
    )
    .forEach((host) => {
      if (!host.shadowRoot) {
        return;
      }
      augmentKeyboardFocused(host.shadowRoot);
      host.setAttribute('data-forced-focus-visible', '');
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
  forceState?: 'hover' | 'focus-visible';
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
        errorText: 'Enter a valid value.',
      }),
      renderCase({
        label: 'Invalid + disabled',
        invalid: true,
        disabled: true,
        description: 'Field help text',
        errorText: 'Enter a valid value.',
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
      renderCase({ label: 'Hover', forceState: 'hover' }),
      renderCase({ label: 'Focus-visible', forceState: 'focus-visible' }),
      renderCase({
        label: 'Invalid hover',
        invalid: true,
        errorText: 'Enter a valid value.',
        forceState: 'hover',
      }),
      renderCase({
        label: 'Invalid focus-visible',
        invalid: true,
        errorText: 'Enter a valid value.',
        forceState: 'focus-visible',
      }),
    ],
    'Forced pseudo-states'
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
      }),
      renderCase({
        labelPosition: 'side',
        label: 'Tightly capped label wraps early',
        placeholder: 'Placeholder',
        extraStyle: '--swc-field-label-max-inline-size: 120px;',
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
