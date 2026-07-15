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

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import customElementsManifest from '../../../../.storybook/custom-elements.json';
import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

const meta: Meta = {
  title: 'Avatar/Avatar VRT',
  component: 'swc-avatar',
  tags: ['dev'],
};

export default meta;

type AvatarCustomPropertyCase = CustomPropertyCase<`--swc-avatar-${string}`> & {
  outline?: boolean;
  disabled?: boolean;
};

const PLACEHOLDER_SRC = 'https://picsum.photos/id/64/500/500';

const CUSTOM_PROPERTY_CASES: readonly AvatarCustomPropertyCase[] = [
  { property: '--swc-avatar-size', value: '96px' },
  { property: '--swc-avatar-outline-color', value: 'magenta', outline: true },
  { property: '--swc-avatar-outline-width', value: '8px', outline: true },
  { property: '--swc-avatar-opacity-disabled', value: '0.2', disabled: true },
];

const renderAvatarCustomProperty = (
  { outline, disabled }: AvatarCustomPropertyCase,
  style?: string
) => html`
  <swc-avatar
    src=${PLACEHOLDER_SRC}
    alt="Jane Doe"
    size="500"
    ?outline=${outline}
    ?disabled=${disabled}
    style=${style ?? ''}
  ></swc-avatar>
`;

const coveredAvatarCustomProperties = coveredCustomProperties(
  CUSTOM_PROPERTY_CASES
);

const verifyCoverage = async () =>
  verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/avatar/Avatar.ts',
    declarationName: 'Avatar',
    coveredProperties: coveredAvatarCustomProperties,
  });

const customPropertiesContent = () =>
  customPropertyRows(CUSTOM_PROPERTY_CASES, renderAvatarCustomProperty);

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
