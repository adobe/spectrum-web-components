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

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoStates,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Thread alert/Thread alert VRT',
  component: 'swc-thread-alert',
  tags: ['dev'],
};

export default meta;

// Helpers

type AlertPropertyCase = CustomPropertyCase<`--swc-thread-alert-${string}`> & {
  focus?: boolean;
};

const PROPERTY_CASES: readonly AlertPropertyCase[] = [
  { property: '--swc-thread-alert-background-color', value: '#ffe600' },
  { property: '--swc-thread-alert-border-color', value: 'magenta' },
  { property: '--swc-thread-alert-border-width', value: '5px' },
  { property: '--swc-thread-alert-border-radius', value: '0px' },
  { property: '--swc-thread-alert-content-color', value: 'rebeccapurple' },
  { property: '--swc-thread-alert-icon-color', value: 'rebeccapurple' },
  { property: '--swc-thread-alert-icon-size', value: '36px' },
  { property: '--swc-thread-alert-min-block-size', value: '64px' },
  { property: '--swc-thread-alert-gap', value: '48px' },
  { property: '--swc-thread-alert-padding-block', value: '24px' },
  { property: '--swc-thread-alert-padding-inline-start', value: '48px' },
  { property: '--swc-thread-alert-padding-inline-end', value: '48px' },
  { property: '--swc-thread-alert-trailing-gap', value: '56px' },
  { property: '--swc-thread-alert-font-family', value: 'monospace' },
  { property: '--swc-thread-alert-font-size', value: '24px' },
  { property: '--swc-thread-alert-font-weight', value: '900' },
  { property: '--swc-thread-alert-line-height', value: '48px' },
  {
    property: '--swc-thread-alert-focus-indicator-color',
    value: 'magenta',
    focus: true,
  },
  {
    property: '--swc-thread-alert-focus-indicator-width',
    value: '8px',
    focus: true,
  },
  {
    property: '--swc-thread-alert-focus-indicator-offset',
    value: '10px',
    focus: true,
  },
];

const renderPropertyCase = (
  { focus = false }: AlertPropertyCase,
  style?: string
) => html`
  <div style="padding: ${focus ? '24px' : '0px'};">
    <swc-thread-alert
      variant="notice"
      tabindex=${focus ? '-1' : nothing}
      data-force-state=${focus ? 'focus' : nothing}
      style="inline-size: 280px; ${style ?? ''}"
    >
      <span>Message text</span>
      ${focus
        ? nothing
        : html`
            <swc-button slot="actions" size="s">Try again</swc-button>
            <swc-close-button
              slot="dismiss"
              size="s"
              accessible-label="Dismiss message"
            ></swc-close-button>
          `}
    </swc-thread-alert>
  </div>
`;

const coveredProperties = coveredCustomProperties(PROPERTY_CASES);
const forceFocus = forcePseudoStates(
  'swc-thread-alert[data-force-state="focus"]'
);

const verifyCoverage = async (context: { canvasElement: HTMLElement }) => {
  await forceFocus(context);
  const hosts = context.canvasElement.querySelectorAll(
    'swc-thread-alert[data-force-state="focus"]'
  );
  await expect(hosts).toHaveLength(6);
  for (const host of hosts) {
    await expect(getComputedStyle(host).outlineStyle).toBe('solid');
  }
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/thread-alert/ThreadAlert.ts',
    declarationName: 'ThreadAlert',
    coveredProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () =>
    theme(
      customPropertyRows(PROPERTY_CASES, renderPropertyCase),
      'light',
      'ltr'
    ),
  parameters: vrtParameters,
  play: verifyCoverage,
};
