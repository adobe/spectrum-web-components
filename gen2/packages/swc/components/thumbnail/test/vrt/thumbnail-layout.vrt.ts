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

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import {
  layoutContexts,
  layoutContextsLegend,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Thumbnail/Thumbnail VRT',
  component: 'swc-thumbnail',
  tags: ['dev'],
};

export default meta;

// Helpers

const SQUARE_SRC = './images/avatar-preview.png';

const layoutContent = () => html`
  ${layoutContextsLegend}
  ${layoutContexts(
    html`
      <swc-thumbnail>
        <img src=${SQUARE_SRC} alt="Preview" />
      </swc-thumbnail>
    `,
    {
      descriptions: {
        'inline-flow':
          'A block host takes its own line between the text and has no descender gap.',
      },
    }
  )}
`;

// VRT stories

// A thumbnail is a fixed-size image frame, so its host box should match the
// rendered frame in every flex and grid context an app is likely to place it
// in.
export const LayoutContexts: Story = {
  render: () => theme(layoutContent(), 'light', 'ltr'),
  parameters: vrtParameters,
};
