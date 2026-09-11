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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
} from '@adobe/spectrum-wc-core/components/button-group';

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Button group/Button group VRT',
  component: 'swc-button-group',
  tags: ['dev'],
};

export default meta;

// Helpers

type ButtonCase = {
  label: string;
  disabled?: boolean;
  lang?: string;
};

// Plain children keep the snapshot on the group's own axes; each button's own
// visuals are covered by button's VRT.
const btn = ({ label, disabled = false, lang }: ButtonCase) => html`
  <swc-button ?disabled=${disabled} lang=${ifDefined(lang)}>
    ${label}
  </swc-button>
`;

type GroupCase = {
  size?: (typeof BUTTON_GROUP_SIZES)[number];
  orientation?: (typeof BUTTON_GROUP_ORIENTATIONS)[number];
  align?: (typeof BUTTON_GROUP_ALIGNMENTS)[number];
  disabled?: boolean;
  buttons: unknown;
  // Explicit width so alignment and wrapping have room to act; the group is
  // only wider than its content when told to be.
  width?: string;
};

const renderGroup = ({
  size,
  orientation,
  align,
  disabled = false,
  buttons,
  width = '260px',
}: GroupCase) => html`
  <swc-button-group
    size=${ifDefined(size)}
    orientation=${ifDefined(orientation)}
    align=${ifDefined(align)}
    ?disabled=${disabled}
    style="inline-size: ${width};"
  >
    ${buttons}
  </swc-button-group>
`;

// One labeled row per axis the group owns: sizes, both orientations, alignment
// in each orientation, disabled propagation, flex-wrapping, and CJK labels.
const permutationContent = () => html`
  ${row(
    BUTTON_GROUP_SIZES.map((size) =>
      renderGroup({
        size,
        width: '220px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
        `,
      })
    ),
    'Sizes'
  )}
  ${row(
    [
      renderGroup({
        orientation: 'horizontal',
        width: '260px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
        `,
      }),
      renderGroup({
        orientation: 'vertical',
        width: '160px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
        `,
      }),
    ],
    'Orientation'
  )}
  ${row(
    BUTTON_GROUP_ALIGNMENTS.map((align) =>
      renderGroup({
        align,
        width: '320px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
        `,
      })
    ),
    'Alignment (horizontal)'
  )}
  ${row(
    BUTTON_GROUP_ALIGNMENTS.map((align) =>
      renderGroup({
        orientation: 'vertical',
        align,
        width: '200px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
        `,
      })
    ),
    'Alignment (vertical)'
  )}
  ${row(
    [
      renderGroup({
        disabled: true,
        width: '320px',
        buttons: html`
          ${btn({ label: 'Save' })} ${btn({ label: 'Cancel' })}
          ${btn({ label: 'Reset' })}
        `,
      }),
      renderGroup({
        width: '320px',
        buttons: html`
          ${btn({ label: 'Copy' })} ${btn({ label: 'Paste', disabled: true })}
        `,
      }),
    ],
    'Disabled'
  )}
  ${row(
    [
      renderGroup({
        width: '240px',
        buttons: html`
          ${btn({ label: 'One' })} ${btn({ label: 'Two' })}
          ${btn({ label: 'Three' })} ${btn({ label: 'Four' })}
          ${btn({ label: 'Five' })}
        `,
      }),
    ],
    'Wrapping'
  )}
  ${row(
    [
      renderGroup({
        width: '260px',
        buttons: html`
          ${btn({ label: '保存', lang: 'ja' })}
          ${btn({ label: 'キャンセル', lang: 'ja' })}
        `,
      }),
      renderGroup({
        width: '220px',
        buttons: html`
          ${btn({ label: '저장', lang: 'ko' })}
          ${btn({ label: '취소', lang: 'ko' })}
        `,
      }),
      renderGroup({
        width: '220px',
        buttons: html`
          ${btn({ label: '保存', lang: 'zh' })}
          ${btn({ label: '取消', lang: 'zh' })}
        `,
      }),
    ],
    'CJK language'
  )}
`;

// VRT stories

// Light/ltr and dark/rtl in one snapshot; the rtl pass doubles as directional
// coverage since flow and start/end alignment mirror.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// No forced-colors story: the group's CSS is pure flexbox layout with no color
// of its own, so only the child buttons shift under forced-colors, and that's
// covered by button's VRT.
