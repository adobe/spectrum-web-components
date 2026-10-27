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
 * Compares visual and semantic navigation with one semantic row and 50 cards.
 */
const meta: Meta = {
  ...prototypeMeta('swc-card-view-grid-nowrap'),
  title: 'Card view',
  args: {
    ...prototypeMeta('swc-card-view-grid-nowrap').args,
    items: photos.slice(0, 50),
  },
  argTypes: {
    ...prototypeMeta('swc-card-view-grid-nowrap').argTypes,
    layout: { control: false, table: { disable: true } },
  },
  parameters: {
    ...prototypeMeta('swc-card-view-grid-nowrap').parameters,
    docs: {
      subtitle:
        'Single-row grid semantics with four keyboard navigation policies.',
    },
  },
  tags: ['migrated'],
};

export default meta;

export const GridNoWrap: StoryObj = {
  name: 'Grid NoWrap',
  tags: ['options'],
};

export const GridLoop: StoryObj = {
  render: prototypeMeta('swc-card-view-grid-loop').render,
  tags: ['options'],
};

export const GridAdvance: StoryObj = {
  render: prototypeMeta('swc-card-view-grid-advance').render,
  tags: ['options'],
};

export const GridSemantic: StoryObj = {
  render: prototypeMeta('swc-card-view-grid-semantic').render,
  tags: ['options'],
};

export const WaterfallNoWrap: StoryObj = {
  name: 'Waterfall NoWrap',
  render: prototypeMeta('swc-card-view-waterfall-nowrap').render,
  args: { layout: 'waterfall' },
  tags: ['options'],
};

export const WaterfallLoop: StoryObj = {
  render: prototypeMeta('swc-card-view-waterfall-loop').render,
  args: { layout: 'waterfall' },
  tags: ['options'],
};

export const WaterfallAdvance: StoryObj = {
  render: prototypeMeta('swc-card-view-waterfall-advance').render,
  args: { layout: 'waterfall' },
  tags: ['options'],
};

export const WaterfallSemantic: StoryObj = {
  render: prototypeMeta('swc-card-view-waterfall-semantic').render,
  args: { layout: 'waterfall' },
  tags: ['options'],
};
