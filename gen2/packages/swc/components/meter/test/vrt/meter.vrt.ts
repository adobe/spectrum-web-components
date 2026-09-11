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

import {
  METER_VARIANTS,
  type MeterVariant,
} from '@adobe/spectrum-wc-core/components/meter';
import {
  LINEAR_PROGRESS_LABEL_POSITIONS,
  LINEAR_PROGRESS_STATIC_COLORS,
  LINEAR_PROGRESS_VALID_SIZES,
  type LinearProgressLabelPosition,
  type LinearProgressSize,
  type LinearProgressStaticColor,
} from '@adobe/spectrum-wc-core/mixins/index.js';

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

import {
  forcedColorsVrtParameters,
  row,
  SIZE_LABELS,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Meter/Meter VRT',
  component: 'swc-meter',
  tags: ['dev'],
};

export default meta;

// Helpers

const variantLabels = {
  informative: 'Informative',
  positive: 'Positive',
  notice: 'Notice',
  negative: 'Negative',
} as const satisfies Record<MeterVariant, string>;

const labelPositionLabels = {
  top: 'Top label',
  side: 'Side label',
} as const satisfies Record<LinearProgressLabelPosition, string>;

const staticColorLabels = {
  white: 'Static white',
  black: 'Static black',
} as const satisfies Record<LinearProgressStaticColor, string>;

type MeterCase = {
  size?: LinearProgressSize;
  variant?: MeterVariant;
  value?: number;
  minValue?: number;
  maxValue?: number;
  labelPosition?: LinearProgressLabelPosition;
  staticColor?: LinearProgressStaticColor;
  label?: string;
  description?: string;
  accessibleLabel?: string;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
  lang?: string;
  style?: string;
};

// `formatOptions` is a JS-only property (no attribute), so it's set via a
// `.formatOptions=` property binding rather than an attribute like the rest
// of these cases.
const renderMeter = ({
  size,
  variant,
  value = 50,
  minValue,
  maxValue,
  labelPosition,
  staticColor,
  label,
  description,
  accessibleLabel,
  valueLabel,
  formatOptions,
  lang,
  style,
}: MeterCase) => html`
  <swc-meter
    size=${size ?? nothing}
    variant=${variant ?? nothing}
    value=${value}
    min-value=${minValue ?? nothing}
    max-value=${maxValue ?? nothing}
    label-position=${labelPosition ?? nothing}
    static-color=${staticColor ?? nothing}
    accessible-label=${accessibleLabel ?? nothing}
    value-label=${valueLabel ?? nothing}
    lang=${lang ?? nothing}
    style=${style ?? nothing}
    .formatOptions=${formatOptions}
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
  </swc-meter>
`;

// Every size and variant (each independent of the other, since size only
// scales thickness/font-size and variant only swaps the fill color — no
// interaction effect to cross-check), both label positions, the CSS-visible
// range edges (0 %, midpoint, 100 %), an over-range value clamped to a full
// bar while `value-label` still reports the real underlying number, every
// anatomy combination from the docs Anatomy story (label only, label +
// description, accessible-label-only fallback, custom value text), the
// custom-range and format-options behaviors, label wrapping, CJK label
// rendering (line-height differs under linear-progress-base.css's
// `:lang(ja/zh/ko)` rule), and static colors on their contrast backgrounds.
const permutationContent = () => html`
  ${row(
    LINEAR_PROGRESS_VALID_SIZES.map((size) =>
      renderMeter({ size, label: SIZE_LABELS[size] })
    ),
    'Sizes'
  )}
  ${row(
    METER_VARIANTS.map((variant) =>
      renderMeter({ variant, label: variantLabels[variant] })
    ),
    'Variants'
  )}
  ${row(
    LINEAR_PROGRESS_LABEL_POSITIONS.map((labelPosition) =>
      renderMeter({
        labelPosition,
        label: labelPositionLabels[labelPosition],
      })
    ),
    'Label position'
  )}
  ${row(
    [
      renderMeter({ value: 0, label: '0%' }),
      renderMeter({ value: 25, label: '25%' }),
      renderMeter({ value: 50, label: '50%' }),
      renderMeter({ value: 75, label: '75%' }),
      renderMeter({ value: 100, label: '100%' }),
      renderMeter({
        value: 150,
        maxValue: 100,
        label: 'Over 100%',
        valueLabel: '150%',
      }),
    ],
    'Values'
  )}
  ${row(
    [
      renderMeter({ value: 40, label: 'Label only' }),
      renderMeter({
        value: 40,
        label: 'Label and description',
        description: 'Additional context below the bar',
      }),
      renderMeter({ value: 40, accessibleLabel: 'Screen-reader-only label' }),
      renderMeter({
        value: 40,
        label: 'Custom value text',
        valueLabel: '1 of 4',
      }),
    ],
    'Anatomy'
  )}
  ${row(
    [
      renderMeter({
        minValue: 0,
        maxValue: 10,
        value: 3,
        label: 'Custom range',
        valueLabel: '3 of 10',
      }),
      renderMeter({
        value: 42,
        label: 'Format options',
        formatOptions: { style: 'currency', currency: 'USD' },
      }),
    ],
    'Behaviors'
  )}
  ${row(
    [
      renderMeter({
        label:
          'A label long enough to wrap onto multiple lines within the available inline space',
        style: 'max-inline-size: 200px;',
      }),
    ],
    'Wrapping'
  )}
  ${row(
    [
      renderMeter({ lang: 'ja', label: '承認ワークフローの進行状況' }),
      renderMeter({ lang: 'ko', label: '승인 워크플로 진행 상황' }),
      renderMeter({ lang: 'zh', label: '审批工作流进度' }),
    ],
    'CJK language'
  )}
  ${LINEAR_PROGRESS_STATIC_COLORS.map((staticColor) =>
    staticColorBackground(
      row(
        [
          renderMeter({ staticColor, label: staticColorLabels[staticColor] }),
          renderMeter({
            staticColor,
            labelPosition: 'side',
            label: `${staticColorLabels[staticColor]} · side label`,
          }),
        ],
        staticColorLabels[staticColor]
      ),
      staticColor
    )
  )}
`;

// VRT stories

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
