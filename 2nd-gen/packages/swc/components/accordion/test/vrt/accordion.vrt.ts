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
  ACCORDION_DENSITIES,
  ACCORDION_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/accordion';

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Accordion/Accordion VRT',
  component: 'swc-accordion',
  tags: ['dev'],
};

export default meta;

const forceAccordionItemStates = forcePseudoStates(
  'swc-accordion-item',
  'button'
);

const accordion = ({
  size,
  density = 'regular',
  quiet = false,
  disabled = false,
  cjk = false,
  state,
}: {
  size?: (typeof ACCORDION_VALID_SIZES)[number];
  density?: (typeof ACCORDION_DENSITIES)[number];
  quiet?: boolean;
  disabled?: boolean;
  cjk?: boolean;
  state?: string;
} = {}) => html`
  <swc-accordion
    size=${size ?? nothing}
    density=${density}
    ?quiet=${quiet}
    ?disabled=${disabled}
    allow-multiple
  >
    <swc-accordion-item open data-force-state=${state ?? nothing}>
      <span slot="label">${cjk ? '個人情報' : 'Personal information'}</span>
      <p>${cjk ? '名前と連絡先を管理します。' : 'Manage contact details.'}</p>
    </swc-accordion-item>
    <swc-accordion-item>
      <span slot="label">${cjk ? '請求先住所' : 'Billing address'}</span>
      <swc-button slot="actions" size="s" variant="secondary">Edit</swc-button>
      <p>
        ${cjk
          ? '支払い方法の確認に使用します。'
          : 'Used for payment verification.'}
      </p>
    </swc-accordion-item>
    <swc-accordion-item disabled>
      <span slot="label">${cjk ? '支払い方法' : 'Payment method'}</span>
      <p>
        ${cjk ? '管理者に連絡してください。' : 'Contact your administrator.'}
      </p>
    </swc-accordion-item>
  </swc-accordion>
`;

const accordionContent = () => html`
  ${row(
    ACCORDION_VALID_SIZES.map((size) => accordion({ size })),
    'Sizes'
  )}
  ${row(
    ACCORDION_DENSITIES.map((density) => accordion({ density })),
    'Densities'
  )}
  ${row([accordion({ quiet: true })], 'Quiet')}
  ${row([accordion({ disabled: true })], 'Disabled')}
  ${row([accordion({ state: 'hover' })], 'Hover')}
  ${row([accordion({ state: 'focus-visible' })], 'Focus visible')}
  ${row([accordion({ cjk: true })], 'CJK language')}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(accordionContent(), 'light', 'ltr')}
    ${theme(accordionContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceAccordionItemStates,
};

export const ForcedColors: Story = {
  render: () => theme(accordionContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceAccordionItemStates,
};
