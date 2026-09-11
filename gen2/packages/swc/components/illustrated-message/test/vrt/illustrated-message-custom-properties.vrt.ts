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

import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import { illustration } from './illustration.js';

// Metadata

const meta: Meta = {
  title: 'Illustrated message/Illustrated message VRT',
  component: 'swc-illustrated-message',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-illustrated-message-*` custom property is a public contract
// (see the component's @cssprop JSDoc), so a future CSS refactor that quietly
// drops one would be a breaking change. One row per property: a reference
// message next to the same message with that one property overridden to an
// obviously different value, so a real difference confirms the override
// still works. `heading`/`description`/`containerInlineSize` let a case
// customize content only where the default short copy wouldn't make the
// override's effect visible (e.g. line-height needs wrapped text to show a
// difference).
type IllustratedMessagePropertyCase =
  CustomPropertyCase<`--swc-illustrated-message-${string}`> & {
    heading?: string;
    description?: string;
    containerInlineSize?: string;
  };

const DEFAULT_HEADING = 'Illustrated message title';
const DEFAULT_DESCRIPTION = 'Supporting description text.';

const ILLUSTRATED_MESSAGE_PROPERTY_CASES: readonly IllustratedMessagePropertyCase[] =
  [
    {
      property: '--swc-illustrated-message-max-inline-size',
      value: '160px',
      description:
        'Supporting description text long enough to wrap once the max inline size shrinks.',
    },
    { property: '--swc-illustrated-message-illustration-size', value: '40px' },
    {
      property: '--swc-illustrated-message-illustration-inline-size',
      value: '350px',
    },
    {
      property: '--swc-illustrated-message-illustration-block-size',
      value: '40px',
    },
    {
      property: '--swc-illustrated-message-illustration-color',
      value: 'magenta',
    },
    {
      property: '--swc-illustrated-message-illustration-to-content',
      value: '0px',
    },
    { property: '--swc-illustrated-message-heading-font-size', value: '10px' },
    {
      property: '--swc-illustrated-message-heading-line-height',
      value: '3',
      heading: 'A heading long enough to wrap across two lines',
      containerInlineSize: '160px',
    },
    {
      property: '--swc-illustrated-message-description-font-size',
      value: '10px',
    },
    {
      property: '--swc-illustrated-message-description-line-height',
      value: '3',
      description:
        'A description long enough to wrap across two lines so the line-height change is visible.',
      containerInlineSize: '160px',
    },
  ];

const renderPropertyCase = (
  {
    heading = DEFAULT_HEADING,
    description = DEFAULT_DESCRIPTION,
    containerInlineSize,
  }: IllustratedMessagePropertyCase,
  style?: string
) => {
  const message = html`
    <swc-illustrated-message style=${style ?? nothing}>
      ${illustration()}
      <h2 slot="heading">${heading}</h2>
      <span slot="description">${description}</span>
    </swc-illustrated-message>
  `;
  return containerInlineSize
    ? html`
        <div style="inline-size: ${containerInlineSize};">${message}</div>
      `
    : message;
};

const modPropertiesContent = () =>
  customPropertyRows(ILLUSTRATED_MESSAGE_PROPERTY_CASES, renderPropertyCase);

const coveredIllustratedMessageCustomProperties = coveredCustomProperties(
  ILLUSTRATED_MESSAGE_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/illustrated-message/IllustratedMessage.ts',
    declarationName: 'IllustratedMessage',
    coveredProperties: coveredIllustratedMessageCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
