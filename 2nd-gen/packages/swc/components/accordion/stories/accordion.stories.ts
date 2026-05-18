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

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-accordion>` and `<swc-accordion-item>` elements implement the
 * [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd>: Moves focus into and between item header buttons
 * - <kbd>Enter</kbd>: Activates the focused header button (browser-native click behavior)
 * - <kbd>Space</kbd>: Toggles the focused item and prevents page scroll
 *
 * #### ARIA implementation
 *
 * 1. **Heading wrapper**: Each header button is wrapped in an `h2`–`h6` element matching
 *    the accordion's `level` attribute
 * 2. **`aria-expanded`**: Set to `"true"` on open items, `"false"` on closed items
 * 3. **`aria-controls`**: Points from the header button to the panel (`id="content"`)
 * 4. **Panel role**: The panel has `role="region"` and `aria-labelledby` pointing to the
 *    header button, making it a labeled landmark
 * 5. **`aria-disabled`**: Set on the header button (not the native `disabled` attribute)
 *    so disabled items remain keyboard-reachable
 * 6. **`hidden`**: Added to closed panels to remove them from the accessibility tree
 * 7. **`inert`**: Added to disabled-item panels to block interaction with their contents
 *
 * ### Best practices
 *
 * - Set a `level` that continues the existing page heading hierarchy without skipping levels
 * - Provide meaningful, unique label text for each item so screen reader users can
 *   navigate the heading list
 * - When using the `actions` slot, include the item subject in the action's accessible
 *   name (e.g., "Edit Alchemy" rather than "Edit") so it is unambiguous out of context
 * - Always set `density` explicitly; use `regular` when unsure
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-accordion level="3" density="regular">
      <swc-accordion-item open>
        <span slot="label">Alchemy</span>
        <button slot="actions" aria-label="Edit Alchemy">Edit</button>
        Alchemy is an ancient branch of natural philosophy, a philosophical and
        protoscientific tradition that was historically practiced in China,
        India, the Muslim world, and Europe.
      </swc-accordion-item>
      <swc-accordion-item>
        <span slot="label">Astrology</span>
        <button slot="actions" aria-label="Edit Astrology">Edit</button>
        Astrology is a range of divinatory practices, recognized as
        pseudoscientific since the 18th century, that propose that information
        about human affairs and terrestrial events may be discerned by studying
        the apparent positions of celestial objects.
      </swc-accordion-item>
      <swc-accordion-item disabled>
        <span slot="label">Natural magic (disabled)</span>
        Natural magic in the context of early modern Europe was a branch of
        philosophy that treated occult forces as resulting from natural causes.
      </swc-accordion-item>
    </swc-accordion>
  `,
  tags: ['a11y'],
};
