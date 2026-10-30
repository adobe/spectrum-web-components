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

import { navigationMeta } from './story-helpers.js';

/** A shortest-column waterfall traversed down each visual column before moving right. */
const meta: Meta = {
  ...navigationMeta(
    'swc-card-view-waterfall-top-to-bottom',
    'Visual-order navigation down each column, then right to the next.'
  ),
  title: 'Card view/Waterfall top to bottom',
};

export default meta;

export const Playground: StoryObj = { tags: ['behaviors'] };
