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

import '@adobe/spectrum-wc/accordion';

/**
 * An accordion stacks sections with a header control each. Only one section stays open
 * unless `allow-multiple` is set. Header focus order is managed by
 * `CompositeFocusNavigationController` (native `focusgroup` when available).
 */
const meta: Meta = {
  title: 'Accordion',
  component: 'swc-accordion',
  parameters: {
    docs: {
      subtitle: `Stacked sections with expandable content and shared keyboard navigation`,
    },
  },
  tags: ['migrated'],
};

export default meta;

export { meta };

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  render: () => html`
    <swc-accordion style="max-inline-size: 40rem">
      <swc-accordion-item label="Shipping">
        Standard and express options at checkout.
      </swc-accordion-item>
      <swc-accordion-item label="Returns">
        Free returns within 30 days of delivery.
      </swc-accordion-item>
      <swc-accordion-item label="Support" disabled>
        Unavailable while we migrate systems.
      </swc-accordion-item>
    </swc-accordion>
  `,
};

export const AllowMultiple: Story = {
  name: 'Allow multiple',
  render: () => html`
    <swc-accordion allow-multiple style="max-inline-size: 40rem">
      <swc-accordion-item label="Section A" open>Content A</swc-accordion-item>
      <swc-accordion-item label="Section B" open>Content B</swc-accordion-item>
    </swc-accordion>
  `,
};
