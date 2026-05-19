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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

import {
  ACCORDION_DENSITIES,
  ACCORDION_VALID_SIZES,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from '../../../../core/components/accordion/Accordion.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-accordion');

argTypes.density = {
  ...argTypes.density,
  control: { type: 'select' },
  options: [...ACCORDION_DENSITIES],
  table: {
    ...argTypes.density?.table,
    category: 'attributes',
    defaultValue: { summary: 'regular' },
  },
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ['', ...ACCORDION_VALID_SIZES],
  table: {
    ...argTypes.size?.table,
    category: 'attributes',
  },
};

argTypes.level = {
  ...argTypes.level,
  control: { type: 'number', min: 2, max: 6 },
  table: {
    ...argTypes.level?.table,
    category: 'attributes',
    defaultValue: { summary: '3' },
  },
};

const defaultItems = html`
  <swc-accordion-item>
    <span slot="label">Alchemy</span>
    Alchemy is an ancient branch of natural philosophy, a philosophical and
    protoscientific tradition that was historically practiced in China, India,
    the Muslim world, and Europe.
  </swc-accordion-item>
  <swc-accordion-item>
    <span slot="label">Astrology</span>
    Astrology is a range of divinatory practices, recognized as pseudoscientific
    since the 18th century, that propose that information about human affairs
    and terrestrial events may be discerned by studying the apparent positions
    of celestial objects.
  </swc-accordion-item>
  <swc-accordion-item open>
    <span slot="label">Natural magic</span>
    Natural magic in the context of early modern Europe was a branch of
    philosophy that treated occult forces as resulting from natural causes, not
    from divine or demonic intervention.
  </swc-accordion-item>
`;

/**
 * An accordion groups related content sections, each behind a header that can
 * be expanded or collapsed. Only one section is open at a time by default;
 * set `allow-multiple` to let any number of sections be open simultaneously.
 */
const meta: Meta = {
  title: 'Accordion',
  component: 'swc-accordion',
  args,
  argTypes,
  render: (args) => template(args, defaultItems),
  parameters: {
    actions: { handles: [SWC_ACCORDION_ITEM_TOGGLE_EVENT] },
    docs: {
      subtitle: 'Groups related content sections behind expandable headers.',
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    density: 'regular',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    density: 'regular',
  },
  tags: ['overview'],
};
