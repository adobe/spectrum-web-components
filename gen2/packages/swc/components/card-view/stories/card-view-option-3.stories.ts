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
import type { Meta, StoryObj } from '@storybook/web-components';

import { photos, prototypeMeta } from './story-helpers.js';

/**
 * Preserves native reading structure and independent controls without a composite widget.
 */
const meta: Meta = {
  ...prototypeMeta('swc-card-view-option-3'),
  title: 'Card view/Option 3',
  parameters: {
    ...prototypeMeta('swc-card-view-option-3').parameters,
    docs: {
      subtitle:
        'Native list with normal Tab navigation and explicit selection.',
    },
  },
  tags: ['migrated'],
};

export default meta;

export const Grid: StoryObj = {
  args: { layout: 'grid' },
  tags: ['overview', 'options'],
};
export const Waterfall: StoryObj = {
  args: { layout: 'waterfall' },
  tags: ['options'],
};
export const Accessibility: StoryObj = {
  args: {
    items: photos.map((item, index) => ({ ...item, disabled: index === 2 })),
  },
  tags: ['a11y'],
};
