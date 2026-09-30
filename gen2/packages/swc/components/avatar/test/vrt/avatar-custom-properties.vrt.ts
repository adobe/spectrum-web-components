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

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Avatar/Avatar VRT',
  component: 'swc-avatar',
  tags: ['dev'],
};

export default meta;

// Helpers

const PLACEHOLDER_SRC = './images/avatar-preview.png';

// --swc-avatar-outline-color/-width only resolve when `outline` is set, and
// --swc-avatar-opacity-disabled only resolves when `disabled` is set, so each
// case renders in the state where its property is actually live.
type AvatarPropertyCase = CustomPropertyCase<`--swc-avatar-${string}`> & {
  outline?: boolean;
  disabled?: boolean;
  // Fixed style applied to both the default and modified renders. Used by
  // --swc-avatar-outline-width to pin a visible outline color, since the
  // default token color is too pale against the light background to reveal
  // a width change on its own.
  baseStyle?: string;
};

const AVATAR_PROPERTY_CASES: readonly AvatarPropertyCase[] = [
  { property: '--swc-avatar-size', value: '120px' },
  { property: '--swc-avatar-outline-color', value: 'magenta', outline: true },
  {
    property: '--swc-avatar-outline-width',
    value: '8px',
    outline: true,
    baseStyle: '--swc-avatar-outline-color: magenta;',
  },
  {
    property: '--swc-avatar-opacity-disabled',
    value: '1',
    disabled: true,
  },
];

const renderPropertyCase = (
  { outline, disabled, baseStyle }: AvatarPropertyCase,
  style?: string
) => {
  const combinedStyle = [baseStyle, style].filter(Boolean).join(' ');
  return html`
    <swc-avatar
      src=${PLACEHOLDER_SRC}
      alt="Jane Doe"
      ?outline=${outline}
      ?disabled=${disabled}
      style=${combinedStyle || nothing}
    ></swc-avatar>
  `;
};

const modPropertiesContent = () =>
  customPropertyRows(AVATAR_PROPERTY_CASES, renderPropertyCase);

const coveredAvatarCustomProperties = coveredCustomProperties(
  AVATAR_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/avatar/Avatar.ts',
    declarationName: 'Avatar',
    coveredProperties: coveredAvatarCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
