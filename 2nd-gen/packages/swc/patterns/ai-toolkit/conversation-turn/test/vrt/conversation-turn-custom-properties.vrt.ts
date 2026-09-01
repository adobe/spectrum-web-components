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

import '../../swc-conversation-turn.js';
import '../../../user-message/swc-user-message.js';

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Conversation turn/Conversation turn VRT',
  component: 'swc-conversation-turn',
  tags: ['dev'],
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

// Two stacked bubbles so the gap override is visible. `40px` is obviously
// larger than the spacing-100 default (~8px).
const CUSTOM_PROPERTY_CASES: readonly CustomPropertyCase<`--swc-conversation-turn-${string}`>[] =
  [{ property: '--swc-conversation-turn-group-gap', value: '40px' }];

const renderTurnCase = (_testCase: CustomPropertyCase, style?: string) => html`
  <swc-conversation-turn type="user" style="inline-size: 320px; ${style ?? ''}">
    <swc-user-message>First grouped message.</swc-user-message>
    <swc-user-message>Second grouped message.</swc-user-message>
  </swc-conversation-turn>
`;

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderTurnCase);

const coveredConversationTurnCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/conversation-turn/ConversationTurn.ts',
    declarationName: 'ConversationTurn',
    coveredProperties: coveredConversationTurnCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
