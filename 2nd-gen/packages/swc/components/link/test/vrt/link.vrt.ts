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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  staticColorBackground,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import {
  LINK_COLOR_VARIANTS,
  LINK_STATIC_VARIANTS,
  template,
} from '../../stories/link.template.js';

const meta: Meta = {
  title: 'Link/Link VRT',
  tags: ['dev'],
};

export default meta;

const forceLinkStates = forcePseudoStates('a');

const linkContent = () => html`
  ${row(
    LINK_COLOR_VARIANTS.map((variant) =>
      template({ context: 'explicit', variant, sampleText: variant })
    ),
    'Color variants'
  )}
  ${row(
    [
      template({
        context: 'explicit',
        standalone: true,
        sampleText: 'Standalone',
      }),
      template({
        context: 'explicit',
        standalone: true,
        quiet: true,
        sampleText: 'Quiet',
      }),
      template({ context: 'prose', sampleText: 'inline link' }),
      template({ context: 'links', sampleText: 'Privacy policy' }),
    ],
    'Contexts'
  )}
  ${row(
    [
      html`
        <a class="swc-Link" href="#" data-force-state="hover">Hover</a>
      `,
      html`
        <a class="swc-Link" href="#" data-force-state="focus-visible">Focus</a>
      `,
      html`
        <a class="swc-Link" href="#" data-force-state="active">Active</a>
      `,
    ],
    'States'
  )}
  ${row(
    [
      template({
        context: 'explicit',
        lang: 'ja',
        sampleText: '承認ワークフローを表示',
      }),
      template({
        context: 'explicit',
        lang: 'ko',
        sampleText: '승인 워크플로 보기',
      }),
      template({
        context: 'prose',
        lang: 'zh',
        sampleText: '查看审批工作流',
      }),
    ],
    'CJK language'
  )}
  ${LINK_STATIC_VARIANTS.map((variant) =>
    staticColorBackground(
      row(
        [
          template({
            context: 'explicit',
            variant,
            sampleText: variant,
          }),
          template({
            context: 'explicit',
            variant,
            standalone: true,
            quiet: true,
            sampleText: 'Quiet',
          }),
        ],
        variant
      ),
      variant === 'staticWhite' ? 'white' : 'black'
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(linkContent(), 'light', 'ltr')}
    ${theme(linkContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceLinkStates,
};

export const ForcedColors: Story = {
  render: () => theme(linkContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceLinkStates,
};
