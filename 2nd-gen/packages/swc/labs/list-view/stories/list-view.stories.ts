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

/**
 * A list view component for displaying flat collections of items such as files,
 * records, or resources. Each item can show a label, description, optional icon,
 * selection checkbox, and navigation chevron.
 */
const meta: Meta = {
  title: 'List view',
  component: 'swc-list-view',
  parameters: {
    docs: {
      subtitle:
        'A vertical list for browsing and selecting items in a collection.',
    },
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-list-view>
      <swc-list-view-item
        label="Coral reef survey"
        description="PDF - 2.4 MB"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Deep sea exploration"
        description="Presentation - 14 slides"
        selected
      ></swc-list-view-item>
      <swc-list-view-item
        label="Tidal patterns 2026"
        description="Spreadsheet - 340 rows"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Marine biology notes"
        description="Document - 12 pages"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Archived samples"
        description="Folder - 8 items"
        navigable
      ></swc-list-view-item>
    </swc-list-view>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * An ocean-themed file browser matching the Figma design example.
 * Folders show a navigation chevron and folder icon; files show a file icon.
 */
export const FileBrowser: Story = {
  render: () => html`
    <swc-list-view>
      <swc-list-view-item
        label="Atlantic Ocean"
        description="12 items"
        navigable
      >
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path
            d="M2 4.5A1.5 1.5 0 013.5 3h4.586a1 1 0 01.707.293L10.5 5H16.5A1.5 1.5 0 0118 6.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 15.5v-11z"
          />
        </svg>
      </swc-list-view-item>
      <swc-list-view-item
        label="Pacific Ocean"
        description="26 items"
        navigable
      >
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path
            d="M2 4.5A1.5 1.5 0 013.5 3h4.586a1 1 0 01.707.293L10.5 5H16.5A1.5 1.5 0 0118 6.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 15.5v-11z"
          />
        </svg>
      </swc-list-view-item>
      <swc-list-view-item
        label="Marine life"
        description="PDF - 8.1 MB"
        selected
      >
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path
            d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z"
          />
        </svg>
      </swc-list-view-item>
      <swc-list-view-item label="Climates" description="PDF - 3.5 MB">
        <svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path
            d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z"
          />
        </svg>
      </swc-list-view-item>
    </swc-list-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};
FileBrowser.storyName = 'File browser';

/**
 * Demonstrates various selection states: unselected, selected, and disabled items.
 * Selection is toggled by clicking on an item's checkbox area.
 */
export const Selection: Story = {
  render: () => html`
    <swc-list-view>
      <swc-list-view-item
        label="Selected item"
        description="This item is pre-selected"
        selected
      ></swc-list-view-item>
      <swc-list-view-item
        label="Unselected item"
        description="Click to select this item"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Another selected item"
        description="Also pre-selected"
        selected
      ></swc-list-view-item>
      <swc-list-view-item
        label="Disabled item"
        description="This item cannot be interacted with"
        disabled
      ></swc-list-view-item>
      <swc-list-view-item
        label="Non-selectable item"
        description="No checkbox shown"
        .selectable=${false}
      ></swc-list-view-item>
    </swc-list-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};

/**
 * The quiet variant removes the outer border and background, allowing the list
 * to blend into the surrounding layout. Useful when the list is embedded within
 * a panel or sidebar that already provides visual containment.
 */
export const QuietStyle: Story = {
  render: () => html`
    <swc-list-view quiet>
      <swc-list-view-item
        label="Arctic waters"
        description="Temperature data - 2024"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Tropical currents"
        description="Flow analysis - Q3 2025"
        selected
      ></swc-list-view-item>
      <swc-list-view-item
        label="Southern Ocean depths"
        description="Bathymetry scan results"
      ></swc-list-view-item>
      <swc-list-view-item
        label="Salinity measurements"
        description="Lab report - pending review"
        navigable
      ></swc-list-view-item>
    </swc-list-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
QuietStyle.storyName = 'Quiet style';
