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

import '../../swc-user-message.js';

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';
import type { UserMessageType } from '../../UserMessage.js';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/User message/User message VRT',
  component: 'swc-user-message',
  tags: ['dev'],
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

// Every `--swc-user-message-*` custom property documented on the element is a
// public contract. One row per property: a reference bubble beside the same
// bubble with that one property overridden to an obviously different value.
// verifyCustomPropertyCoverage() (play function) asserts this list stays a
// superset of the API-table properties in the CEM.
type UserMessagePropertyCase =
  CustomPropertyCase<`--swc-user-message-${string}`> & {
    // card/media-scoped properties only render on their matching type.
    type?: UserMessageType;
  };

const USER_MESSAGE_PROPERTY_CASES: readonly UserMessagePropertyCase[] = [
  { property: '--swc-user-message-padding-block', value: '0px' },
  { property: '--swc-user-message-padding-inline', value: '0px' },
  {
    property: '--swc-user-message-card-padding',
    value: '0px',
    type: 'card',
  },
  {
    property: '--swc-user-message-media-padding',
    value: '0px',
    type: 'media',
  },
  {
    property: '--swc-user-message-attachment-card-gap',
    value: '0px',
    type: 'card',
  },
  {
    property: '--swc-user-message-attachment-media-gap',
    value: '0px',
    type: 'media',
  },
  {
    property: '--swc-user-message-meta-gap',
    value: '48px',
    type: 'card',
  },
];

const cardThumbnail = html`
  <img slot="thumbnail" src="images/card-preview.jpg" alt="File preview" />
`;

const mediaThumbnail = html`
  <img slot="thumbnail" src="images/card-preview.jpg" alt="Campaign preview" />
`;

const modPropertyMessage = (
  { type = 'copy' }: UserMessagePropertyCase,
  style?: string
) =>
  type === 'copy'
    ? html`
        <swc-user-message type="copy" style=${style ?? nothing}>
          Can you help me create a 45-minute presentation?
        </swc-user-message>
      `
    : html`
        <swc-user-message type=${type} style=${style ?? nothing}>
          ${type === 'card' ? cardThumbnail : mediaThumbnail}
          <span slot="title">Hilton commercial assets</span>
          <span slot="subtitle">2026</span>
        </swc-user-message>
      `;

const modPropertiesContent = () =>
  customPropertyRows(USER_MESSAGE_PROPERTY_CASES, modPropertyMessage);

const coveredUserMessageCustomProperties = coveredCustomProperties(
  USER_MESSAGE_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/user-message/UserMessage.ts',
    declarationName: 'UserMessage',
    coveredProperties: coveredUserMessageCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
