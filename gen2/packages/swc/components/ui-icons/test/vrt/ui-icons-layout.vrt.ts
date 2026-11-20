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

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'UI icons/UI icons VRT',
  component: 'swc-ui-icon',
  tags: ['dev'],
};

export default meta;

// Helpers

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(html`
    <swc-ui-icon icon="arrow" size="m" accessible-label="Arrow"></swc-ui-icon>
  `)}
`;

// VRT stories

// A UI icon is a fixed-size glyph, so its host box should match the rendered
// icon in every flex and grid context an app is likely to place it in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
