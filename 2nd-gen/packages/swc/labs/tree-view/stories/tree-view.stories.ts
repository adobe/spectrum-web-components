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
 * A tree view component for displaying hierarchical data such as file systems,
 * navigation structures, or nested categories. Items can be expanded and collapsed
 * to reveal or hide their children.
 */
const meta: Meta = {
  title: 'Tree view',
  component: 'swc-tree-view',
  parameters: {
    docs: {
      subtitle: 'A hierarchical tree view for browsing nested content.',
    },
  },
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <swc-tree-view>
      <swc-tree-view-item label="Documents" expanded>
        <swc-tree-view-item label="Design assets" expanded>
          <swc-tree-view-item label="logo.svg"></swc-tree-view-item>
          <swc-tree-view-item label="banner.png"></swc-tree-view-item>
          <swc-tree-view-item label="icons.ai"></swc-tree-view-item>
        </swc-tree-view-item>
        <swc-tree-view-item label="README.md"></swc-tree-view-item>
        <swc-tree-view-item label="package.json"></swc-tree-view-item>
      </swc-tree-view-item>
      <swc-tree-view-item label="Reports">
        <swc-tree-view-item label="Q1-2026.pdf"></swc-tree-view-item>
        <swc-tree-view-item label="Q2-2026.pdf"></swc-tree-view-item>
      </swc-tree-view-item>
    </swc-tree-view>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * A realistic file browser tree with folders containing various file types.
 * The Documents folder is expanded to show its contents, while Reports is collapsed.
 */
export const FileBrowser: Story = {
  render: () => html`
    <swc-tree-view>
      <swc-tree-view-item label="Documents" expanded>
        <swc-tree-view-item label="Design assets" expanded>
          <swc-tree-view-item label="logo.svg"></swc-tree-view-item>
          <swc-tree-view-item label="banner.png"></swc-tree-view-item>
          <swc-tree-view-item label="icons.ai"></swc-tree-view-item>
        </swc-tree-view-item>
        <swc-tree-view-item label="README.md"></swc-tree-view-item>
        <swc-tree-view-item label="package.json"></swc-tree-view-item>
      </swc-tree-view-item>
      <swc-tree-view-item label="Reports">
        <swc-tree-view-item label="Q1-2026.pdf"></swc-tree-view-item>
        <swc-tree-view-item label="Q2-2026.pdf"></swc-tree-view-item>
      </swc-tree-view-item>
    </swc-tree-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 1 },
};
FileBrowser.storyName = 'File browser';

/**
 * Demonstrates deeply nested levels (3+) to verify indentation
 * scales correctly at each depth.
 */
export const NestedLevels: Story = {
  render: () => html`
    <swc-tree-view>
      <swc-tree-view-item label="Level 0 - Root" expanded>
        <swc-tree-view-item label="Level 1 - Components" expanded>
          <swc-tree-view-item label="Level 2 - Button" expanded>
            <swc-tree-view-item
              label="Level 3 - Button.ts"
            ></swc-tree-view-item>
            <swc-tree-view-item
              label="Level 3 - button.css"
            ></swc-tree-view-item>
            <swc-tree-view-item label="Level 3 - Stories" expanded>
              <swc-tree-view-item
                label="Level 4 - button.stories.ts"
              ></swc-tree-view-item>
            </swc-tree-view-item>
          </swc-tree-view-item>
          <swc-tree-view-item label="Level 2 - Icon">
            <swc-tree-view-item label="Level 3 - Icon.ts"></swc-tree-view-item>
          </swc-tree-view-item>
        </swc-tree-view-item>
        <swc-tree-view-item label="Level 1 - Utilities">
          <swc-tree-view-item label="Level 2 - helpers.ts"></swc-tree-view-item>
        </swc-tree-view-item>
      </swc-tree-view-item>
    </swc-tree-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 2 },
};
NestedLevels.storyName = 'Nested levels';

/**
 * Items can be marked as selected to indicate the currently active item
 * in the tree. Selection is controlled via the `selected` attribute.
 */
export const Selection: Story = {
  render: () => html`
    <swc-tree-view>
      <swc-tree-view-item label="src" expanded>
        <swc-tree-view-item label="components" expanded>
          <swc-tree-view-item label="App.ts" selected></swc-tree-view-item>
          <swc-tree-view-item label="Header.ts"></swc-tree-view-item>
          <swc-tree-view-item label="Footer.ts"></swc-tree-view-item>
        </swc-tree-view-item>
        <swc-tree-view-item label="styles">
          <swc-tree-view-item label="main.css"></swc-tree-view-item>
        </swc-tree-view-item>
        <swc-tree-view-item label="index.ts"></swc-tree-view-item>
      </swc-tree-view-item>
    </swc-tree-view>
  `,
  tags: ['options'],
  parameters: { 'section-order': 3 },
};
