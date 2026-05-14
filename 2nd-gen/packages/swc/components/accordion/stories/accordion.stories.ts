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

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * An accordion groups related content sections, each behind a header that can
 * be expanded or collapsed. Args, argTypes, and controls are added in a later commit
 * once the component API is defined.
 */
const meta: Meta = {
  title: 'Accordion',
  component: 'swc-accordion',
  parameters: {
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
  render: () => html`
    <swc-accordion>
      <swc-accordion-item>Sample content</swc-accordion-item>
    </swc-accordion>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-accordion>
      <swc-accordion-item>Sample content</swc-accordion-item>
    </swc-accordion>
  `,
  tags: ['overview'],
};
