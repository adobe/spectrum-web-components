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

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import {
  KEYBOARD_ACTIVATIONS,
  type KeyboardActivation,
  TAB_DENSITIES,
  type TabDensity,
  TABS_DIRECTIONS,
  type TabsDirection,
} from '../../../../core/components/tabs/Tabs.types.js';

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
 * [migration guide](../migration.md), not in Storybook copy.
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
    'keyboard-activation': 'manual',
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
        'manual') as KeyboardActivation,
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PLACEHOLDER',
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
  keyboardActivation = 'manual',
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
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
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

/**
 * ### Visual structure
 *
 * A tabs component consists of:
 *
 * 1. **Tab list** — A horizontal or vertical row of tab items
 * 2. **Tab items** — Clickable labels representing each section
 * 3. **Selection indicator** — A visual line highlighting the active tab
 * 4. **Tab panels** — Content areas associated with each tab
 *
 * ### Technical structure
 *
 * #### Slots
 *
 * - **Default slot** (on `swc-tabs`): Accepts `swc-tab` elements
 * - **tab-panel slot** (on `swc-tabs`): Accepts `swc-tab-panel` elements
 * - **Default slot** (on `swc-tab`): Text label content
 * - **icon slot** (on `swc-tab`): Optional icon displayed before the label
 * - **Default slot** (on `swc-tab-panel`): Panel content (any HTML)
 *
 * #### Properties
 *
 * Properties that render visual content:
 *
 * - **selected** (on `swc-tabs`): Value of the currently active tab
 * - **tab-id** (on `swc-tab` and `swc-tab-panel`): Unique identifier linking tab to panel
 * - **accessible-label** (on `swc-tabs`): Accessible name for the tablist
 * - **aria-label** (on `swc-tab`): Accessible name for icon-only tabs
 * - **direction**: Layout direction (`horizontal` or `vertical`)
 * - **keyboard-activation**: `manual` (default) or `automatic` (selection follows focus)
 * - **density**: `regular` (default) or `compact` spacing
 *
 * Examples below: text-only, icon + text, and icon-only tabs.
 */
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

/**
 * `density="compact"` reduces spacing between tabs. Default is `regular`.
 */
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
  parameters: {
    'section-order': 1,
  },
};

/**
 * Tabs support horizontal (default) and vertical layout directions.
 *
 * - **Horizontal**: Tabs are laid out in a row across the top. Arrow Left
 *   and Arrow Right navigate between tabs.
 * - **Vertical**: Tabs are stacked vertically along the side. Arrow Up
 *   and Arrow Down navigate between tabs. Sets `aria-orientation="vertical"`
 *   on the tablist element.
 *
 * `direction="vertical-right"` from 1st-gen is not supported; use
 * `direction="vertical"`. See the [migration guide](../migration.md).
 *
 * Both directions shown below for comparison.
 */
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
  parameters: {
    'section-order': 2,
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

/**
 * Tabs can exist in various states:
 *
 * - **Default**: Normal, interactive state
 * - **Selected**: The currently active tab (shown with selection indicator)
 * - **Disabled (individual)**: Tab exists but cannot be activated. In 2nd-gen,
 *   disabled tabs remain focusable via arrow keys per the
 *   [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 *   and use `aria-disabled="true"` instead of the native `disabled` attribute.
 * - **Disabled (container)**: The entire tab list is disabled. All interaction
 *   is suppressed and `aria-disabled="true"` is set on the tablist element.
 *
 * Disabled tabs remain focusable via arrow keys but cannot be activated; see
 * the [migration guide](../migration.md).
 */
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

/**
 *
 * `keyboard-activation="manual"` (default): Arrow keys move focus between
 * tabs without changing the selected tab until Enter or Space.
 *
 * `keyboard-activation="automatic"`: Selection follows focus when arrowing.
 *
 * ### Events
 *
 * - **change**: Fired when the selected tab changes. Cancelable via
 *   `preventDefault()` to revert selection.
 *
 * ```javascript
 * tabs.addEventListener('change', (event) => {
 *   console.log('Selected:', event.target.selected);
 * });
 * ```
 */
export const ActivationModes: Story = {
  render: () => html`
    <p><strong>Manual activation (default)</strong></p>
    ${renderTabGroup({
      accessibleLabel: 'Manual activation',
      panels: html`
        <swc-tab-panel tab-id="1">
          <p>Use arrow keys to move focus, then Enter or Space to select.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Automatic activation</strong></p>
    ${renderTabGroup({
      keyboardActivation: 'automatic',
      accessibleLabel: 'Automatic activation',
      panels: html`
        <swc-tab-panel tab-id="1">
          <p>Arrow keys immediately select and display content.</p>
        </swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel tab-id="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
  `,
  tags: ['behaviors'],
};

// ──────────────────────────────────
//    UPCOMING FEATURES STORIES
// ──────────────────────────────────

/**
 * ### Overflow
 *
 * - When tabs exceed the container width, overflowing tabs will collapse into a `<swc-picker>` dropdown
 */
export const UpcomingFeatures: Story = {
  tags: ['upcoming', 'description-only'],
};
UpcomingFeatures.storyName = 'Upcoming features';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-tabs>` component implements several accessibility features:
 *
 * #### Keyboard navigation
 *
 * - <kbd>Tab</kbd>: Moves focus into the tab list (to the selected or
 *   last-focused tab) and then out to the active panel
 * - <kbd>Shift+Tab</kbd>: Returns focus from panel to tab list
 * - <kbd>Arrow Left</kbd> / <kbd>Arrow Right</kbd>: Navigates between
 *   tabs in horizontal mode (swaps in RTL)
 * - <kbd>Arrow Up</kbd> / <kbd>Arrow Down</kbd>: Navigates between
 *   tabs in vertical mode
 * - <kbd>Home</kbd>: Moves focus to the first tab
 * - <kbd>End</kbd>: Moves focus to the last tab
 * - <kbd>Space</kbd> / <kbd>Enter</kbd>: Activates the focused tab
 *   (manual mode). In automatic activation, tabs activate when focused via arrows.
 *
 * #### ARIA implementation
 *
 * 1. **Roles**: `tablist` on the inner container, `tab` on each tab
 *    item, `tabpanel` on each panel
 * 2. **Labeling**: `aria-label` on the tablist from the `accessible-label` property
 * 3. **States**: `aria-selected` on tabs, `aria-disabled` on disabled
 *    tabs and on the tablist when the container is disabled
 * 4. **Orientation**: `aria-orientation="vertical"` on the same node as
 *    `role="tablist"` when `direction="vertical"`.
 * 5. **Relationships**: `aria-controls` on tabs and `aria-labelledby`
 *    on panels link each tab to its associated panel
 *
 * #### Roving tabindex
 *
 * The tablist uses a roving tabindex strategy: exactly one tab has
 * `tabindex="0"` at all times (the selected or last-focused tab),
 * while all other tabs have `tabindex="-1"`. This ensures a single
 * Tab stop for the tab list, with arrow keys for internal navigation.
 *
 * #### Disabled tabs
 *
 * Disabled tabs use `aria-disabled="true"` (not the native `disabled`
 * attribute) so they remain discoverable by assistive technology. They
 * are focusable via arrow keys but cannot be activated (Enter, Space,
 * and click are guarded).
 *
 * #### Tab panel focus management
 *
 * Active panels have `tabindex="0"` so they receive focus when the user
 * presses Tab from the tablist. When focus enters panel content, the
 * panel removes its own `tabindex` to avoid trapping Tab presses inside
 * the panel. On `focusout`, `tabindex` is restored.
 *
 * ### Best practices
 *
 * - Always provide an `accessible-label` attribute on `swc-tabs` for the
 *   tablist accessible name
 * - Use meaningful, concise text labels for each tab
 * - For icon-only tabs, provide an `aria-label` attribute on `swc-tab` as
 *   the accessible name (since there is no visible text content)
 * - Use the `tab-id` attribute to link tabs to their panels
 * - Avoid disabling all tabs — at least one should be interactive
 * - Test with screen readers (VoiceOver, NVDA, JAWS) to verify tab
 *   names, selection announcements, and panel content are accessible
 */
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
