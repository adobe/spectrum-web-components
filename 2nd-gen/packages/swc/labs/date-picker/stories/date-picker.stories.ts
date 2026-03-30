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

import '../index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Date picker',
  component: 'swc-date-picker',
  parameters: {
    docs: {
      subtitle:
        'A date picker with an input field and calendar dropdown for selecting single dates or date ranges.',
    },
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <div style="padding-block-end: 340px;">
      <swc-date-picker
        label="Label"
        value="2025-02-15"
        open
      ></swc-date-picker>
    </div>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Shows a date range selection with start and end dates highlighted,
 * and the range between them visually connected.
 */
export const DateRange: Story = {
  render: () => html`
    <div style="padding-block-end: 340px;">
      <swc-date-picker
        label="Label"
        value="2025-02-02"
        range-end="2025-02-08"
        open
      ></swc-date-picker>
    </div>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};
DateRange.storyName = 'Date range';

/**
 * The closed state shows only the input field with the formatted date.
 * Click the input or calendar icon to open the dropdown.
 */
export const ClosedState: Story = {
  render: () => html`
    <swc-date-picker
      label="Label"
      value="2025-02-02"
      range-end="2025-02-08"
    ></swc-date-picker>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};
ClosedState.storyName = 'Closed state';

/**
 * The label text can be customized to describe what date the user is selecting.
 */
export const WithLabel: Story = {
  render: () => html`
    <swc-date-picker
      label="Departure date"
      value="2025-06-15"
    ></swc-date-picker>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
WithLabel.storyName = 'With label';
