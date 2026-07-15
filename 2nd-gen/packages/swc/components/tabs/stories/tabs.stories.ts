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

import { html, type TemplateResult } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  KEYBOARD_ACTIVATIONS,
  type KeyboardActivation,
  TAB_DENSITIES,
  type TabDensity,
  TABS_DIRECTIONS,
  type TabsDirection,
} from '@spectrum-web-components/core/components/tabs/index.js';

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

const events = ['change'];

/**
 * Tabs organize content into multiple sections and allow users to navigate
 * between them. Only one section of content is visible at a time.
 *
 * Uses a three-element architecture: `<swc-tabs>` (container),
 * `<swc-tab>` (individual tab items), and `<swc-tab-panel>` (panel content).
 * Tabs and panels are matched by their `tab-id` attributes.
 *
 * Breaking changes and migration steps from `sp-tabs` live in the
 * [migration guide](?path=/docs/components-tabs-migration-guide--docs), not in Storybook copy.
 */
export const meta: Meta = {
  title: 'Tabs',
  component: 'swc-tabs',
  argTypes: {
    selected: { control: 'text' },
    'accessible-label': { control: 'text' },
    direction: {
      control: { type: 'select' },
      options: [...TABS_DIRECTIONS],
    },
    'keyboard-activation': {
      control: { type: 'select' },
      options: [...KEYBOARD_ACTIVATIONS],
    },
    density: {
      control: { type: 'select' },
      options: [...TAB_DENSITIES],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    selected: '1',
    'accessible-label': 'Product details',
    direction: 'horizontal',
    'keyboard-activation': 'automatic',
    density: 'regular',
    disabled: false,
  },
  render: (args) => {
    const raw = args as Record<string, unknown>;

    return renderTabGroup({
      selected: args.selected as string,
      accessibleLabel: (raw['accessible-label'] ?? 'Product details') as string,
      direction: args.direction as TabsDirection,
      keyboardActivation: (raw['keyboard-activation'] ??
        'automatic') as KeyboardActivation,
      density: args.density as TabDensity,
      disabled: Boolean(args.disabled),
    });
  },
  parameters: {
    actions: { handles: events },
    docs: {
      subtitle: 'Organize content into sections navigated by a tab bar',
      source: { type: 'dynamic' },
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-5jtmpzjk?file=src%2Fmy-element.ts',
    },
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Tabs',
  excludeStories: ['meta'],
} as Meta;

// ────────────────────
//    HELPERS
// ────────────────────

const directionLabels = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
} as const satisfies Record<TabsDirection, string>;

interface TabGroupOptions {
  direction?: TabsDirection;
  accessibleLabel?: string;
  selected?: string;
  keyboardActivation?: KeyboardActivation;
  density?: TabDensity;
  disabled?: boolean;
  tabs?: TemplateResult;
  panels?: TemplateResult;
}

const defaultTabs = html`
  <swc-tab tab-id="1">Overview</swc-tab>
  <swc-tab tab-id="2">Specifications</swc-tab>
  <swc-tab tab-id="3">Guidelines</swc-tab>
`;

const defaultPanels = html`
  <swc-tab-panel tab-id="1">
    <p>Overview content for the selected tab.</p>
  </swc-tab-panel>
  <swc-tab-panel tab-id="2">
    <p>Specifications content goes here.</p>
  </swc-tab-panel>
  <swc-tab-panel tab-id="3">
    <p>Guidelines content goes here.</p>
  </swc-tab-panel>
`;

const renderTabGroup = ({
  direction = 'horizontal',
  accessibleLabel = 'Product details',
  selected = '1',
  keyboardActivation = 'automatic',
  density = 'regular',
  disabled = false,
  tabs = defaultTabs,
  panels = defaultPanels,
}: TabGroupOptions = {}) => html`
  <swc-tabs
    selected=${selected}
    direction=${direction}
    accessible-label=${accessibleLabel}
    keyboard-activation=${keyboardActivation}
    density=${density}
    ?disabled=${disabled}
  >
    ${tabs} ${panels}
  </swc-tabs>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => renderTabGroup(),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <p><strong>Text-only tabs</strong></p>
    ${renderTabGroup({
      accessibleLabel: 'Text-only example',
    })}
    <br />
    <p><strong>Tabs with icons</strong></p>
    ${renderTabGroup({
      accessibleLabel: 'Icon and text example',
      tabs: html`
        <swc-tab tab-id="1">
          <span slot="icon" aria-hidden="true">☰</span>
          Dashboard
        </swc-tab>
        <swc-tab tab-id="2">
          <span slot="icon" aria-hidden="true">📊</span>
          Reports
        </swc-tab>
        <swc-tab tab-id="3">
          <span slot="icon" aria-hidden="true">⚙</span>
          Settings
        </swc-tab>
      `,
      panels: html`
        <swc-tab-panel tab-id="1"><p>Dashboard content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Reports content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Settings content.</p></swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Icon-only tabs</strong></p>
    ${renderTabGroup({
      accessibleLabel: 'Icon-only example',
      tabs: html`
        <swc-tab tab-id="1" aria-label="Dashboard">
          <span slot="icon" aria-hidden="true">☰</span>
        </swc-tab>
        <swc-tab tab-id="2" aria-label="Reports">
          <span slot="icon" aria-hidden="true">📊</span>
        </swc-tab>
        <swc-tab tab-id="3" aria-label="Settings">
          <span slot="icon" aria-hidden="true">⚙</span>
        </swc-tab>
      `,
      panels: html`
        <swc-tab-panel tab-id="1"><p>Dashboard content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Reports content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Settings content.</p></swc-tab-panel>
      `,
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const DensityVariants: Story = {
  render: () => html`
    <p><strong>Regular (default)</strong></p>
    ${renderTabGroup({ accessibleLabel: 'Regular density' })}
    <br />
    <p><strong>Compact</strong></p>
    ${renderTabGroup({
      density: 'compact',
      accessibleLabel: 'Compact density',
    })}
  `,
  tags: ['options'],
};

export const Directions: Story = {
  render: () => html`
    ${TABS_DIRECTIONS.map(
      (dir) => html`
        <p><strong>${directionLabels[dir]}</strong></p>
        ${renderTabGroup({
          direction: dir,
          accessibleLabel: `${directionLabels[dir]} example`,
        })}
        <br />
      `
    )}
  `,
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () => html`
    <p><strong>Individual disabled tab</strong></p>
    ${renderTabGroup({
      selected: 'selected',
      accessibleLabel: 'Individual states',
      tabs: html`
        <swc-tab tab-id="default">Default</swc-tab>
        <swc-tab tab-id="selected">Selected</swc-tab>
        <swc-tab tab-id="disabled" disabled>Disabled</swc-tab>
      `,
      panels: html`
        <swc-tab-panel tab-id="default">
          <p>Default tab content.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="selected">
          <p>Selected tab content.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="disabled">
          <p>Disabled tab content.</p>
        </swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Disabled container</strong></p>
    ${renderTabGroup({
      disabled: true,
      accessibleLabel: 'Disabled container',
    })}
  `,
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const ActivationModes: Story = {
  render: () => html`
    <p><strong>Automatic activation (default)</strong></p>
    ${renderTabGroup({
      accessibleLabel: 'Automatic activation',
      panels: html`
        <swc-tab-panel tab-id="1">
          <p>Arrow keys immediately select and display content.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Manual activation</strong></p>
    ${renderTabGroup({
      keyboardActivation: 'manual',
      accessibleLabel: 'Manual activation',
      panels: html`
        <swc-tab-panel tab-id="1">
          <p>Use arrow keys to move focus, then Enter or Space to select.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
  `,
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    ${renderTabGroup({
      accessibleLabel: 'Account settings',
      tabs: html`
        <swc-tab tab-id="1">Dashboard</swc-tab>
        <swc-tab tab-id="2">Reports</swc-tab>
        <swc-tab tab-id="3" disabled>Admin (restricted)</swc-tab>
      `,
      panels: html`
        <swc-tab-panel tab-id="1">
          <p>Dashboard content visible to all users.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2">
          <p>Reports section with data visualizations.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="3">
          <p>Admin settings (restricted access).</p>
        </swc-tab-panel>
      `,
    })}
  `,
  tags: ['a11y'],
};
