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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/tabs';

import {
  TABS_DIRECTIONS,
  type TabsDirection,
} from '../../../../core/components/tabs/Tabs.types.js';
import {
  DEFAULT_ELEMENT_SIZES,
  type DefaultElementSize,
} from '../../../../core/mixins/sized-mixin.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-tabs');

argTypes.direction = {
  ...argTypes.direction,
  control: { type: 'select' },
  options: [...TABS_DIRECTIONS],
};

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: [...DEFAULT_ELEMENT_SIZES],
};

argTypes.quiet = {
  ...argTypes.quiet,
  control: { type: 'boolean' },
};

argTypes.compact = {
  ...argTypes.compact,
  control: { type: 'boolean' },
};

argTypes.emphasized = {
  ...argTypes.emphasized,
  control: { type: 'boolean' },
};

argTypes.auto = {
  ...argTypes.auto,
  control: { type: 'boolean' },
};

argTypes.disabled = {
  ...argTypes.disabled,
  control: { type: 'boolean' },
};

const events = ['change'];

/**
 * Tabs organize content into multiple sections and allow users to navigate
 * between them. Only one section of content is visible at a time.
 *
 * Uses a three-element architecture: `<swc-tabs>` (container),
 * `<swc-tab>` (individual tab items), and `<swc-tab-panel>` (panel content).
 * Tabs and panels are matched by their `value` attributes.
 *
 * **Usage note — breaking changes from 1st-gen:**
 *
 * - **Default size:** 2nd-gen defaults to `size="m"`. 1st-gen had no default size (B12).
 * - **Disabled tabs:** In 2nd-gen, disabled tabs remain focusable via arrow keys per WAI-ARIA APG
 *   but cannot be activated. 1st-gen skipped disabled tabs entirely (B9).
 * - **`vertical-right` removed:** `direction="vertical-right"` is no longer supported.
 *   Use `direction="vertical"` instead (B13).
 * - **Label wrapper removed:** The `<label>` element inside `sp-tab` shadow DOM has been
 *   replaced by a `<span>`. Consumers targeting `label` inside tab shadow DOM must update (B8).
 * - **ARIA fix:** `aria-orientation` is now co-located with `role="tablist"` on the same
 *   inner element, fixing a 1st-gen bug where they were on different nodes (B5).
 */
export const meta: Meta = {
  title: 'Tabs',
  component: 'swc-tabs',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: { handles: events },
    docs: {
      subtitle: 'Organize content into sections navigated by a tab bar',
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PLACEHOLDER',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/PLACEHOLDER',
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

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<DefaultElementSize, string>;

const directionLabels = {
  horizontal: 'Horizontal',
  vertical: 'Vertical',
} as const satisfies Record<TabsDirection, string>;

interface TabGroupOptions {
  size?: DefaultElementSize;
  direction?: TabsDirection;
  label?: string;
  selected?: string;
  quiet?: boolean;
  compact?: boolean;
  emphasized?: boolean;
  auto?: boolean;
  disabled?: boolean;
  tabs?: TemplateResult;
  panels?: TemplateResult;
}

const defaultTabs = html`
  <swc-tab value="1">Overview</swc-tab>
  <swc-tab value="2">Specifications</swc-tab>
  <swc-tab value="3">Guidelines</swc-tab>
`;

const defaultPanels = html`
  <swc-tab-panel value="1">
    <p>Overview content for the selected tab.</p>
  </swc-tab-panel>
  <swc-tab-panel value="2">
    <p>Specifications content goes here.</p>
  </swc-tab-panel>
  <swc-tab-panel value="3">
    <p>Guidelines content goes here.</p>
  </swc-tab-panel>
`;

const renderTabGroup = ({
  size = 'm',
  direction = 'horizontal',
  label = 'Product details',
  selected = '1',
  quiet = false,
  compact = false,
  emphasized = false,
  auto = false,
  disabled = false,
  tabs = defaultTabs,
  panels = defaultPanels,
}: TabGroupOptions = {}) => html`
  <swc-tabs
    selected=${selected}
    size=${size}
    direction=${direction}
    label=${label}
    ?quiet=${quiet}
    ?compact=${compact}
    ?emphasized=${emphasized}
    ?auto=${auto}
    ?disabled=${disabled}
  >
    ${tabs} ${panels}
  </swc-tabs>
`;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  render: () => renderTabGroup(),
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
 * - **value** (on `swc-tab` and `swc-tab-panel`): Unique identifier linking tab to panel
 * - **label** (on `swc-tabs`): Accessible name for the tablist
 * - **label** (on `swc-tab`): Fallback text when the default slot is empty
 * - **direction**: Layout direction (`horizontal` or `vertical`)
 * - **size**: Typography and spacing size (`s`, `m`, `l`, `xl`)
 *
 * All variations shown below: text-only tabs, icon with label, and
 * icon-only (with `label` attribute for accessible naming).
 *
 * **Breaking change (B8):** In 1st-gen, the default slot content was wrapped
 * in a `<label>` element inside shadow DOM. The `<label>` has been removed
 * in 2nd-gen to avoid conflicting semantics with `role="tab"`.
 */
export const Anatomy: Story = {
  render: () => html`
    <p><strong>Text-only tabs</strong></p>
    ${renderTabGroup({
      label: 'Text-only example',
    })}
    <br />
    <p><strong>Tabs with icons</strong></p>
    ${renderTabGroup({
      label: 'Icon and text example',
      tabs: html`
        <swc-tab value="1">
          <span slot="icon" aria-hidden="true">☰</span>
          Dashboard
        </swc-tab>
        <swc-tab value="2">
          <span slot="icon" aria-hidden="true">📊</span>
          Reports
        </swc-tab>
        <swc-tab value="3">
          <span slot="icon" aria-hidden="true">⚙</span>
          Settings
        </swc-tab>
      `,
      panels: html`
        <swc-tab-panel value="1"><p>Dashboard content.</p></swc-tab-panel>
        <swc-tab-panel value="2"><p>Reports content.</p></swc-tab-panel>
        <swc-tab-panel value="3"><p>Settings content.</p></swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Icon-only tabs</strong></p>
    ${renderTabGroup({
      label: 'Icon-only example',
      tabs: html`
        <swc-tab value="1" label="Dashboard">
          <span slot="icon" aria-hidden="true">☰</span>
        </swc-tab>
        <swc-tab value="2" label="Reports">
          <span slot="icon" aria-hidden="true">📊</span>
        </swc-tab>
        <swc-tab value="3" label="Settings">
          <span slot="icon" aria-hidden="true">⚙</span>
        </swc-tab>
      `,
      panels: html`
        <swc-tab-panel value="1"><p>Dashboard content.</p></swc-tab-panel>
        <swc-tab-panel value="2"><p>Reports content.</p></swc-tab-panel>
        <swc-tab-panel value="3"><p>Settings content.</p></swc-tab-panel>
      `,
    })}
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Tabs come in 4 sizes to fit various contexts:
 *
 * - **Small (s)**: Compact spaces or secondary navigation
 * - **Medium (m)**: Default size for most use cases
 * - **Large (l)**: Prominent or primary navigation
 * - **Extra-large (xl)**: Maximum emphasis
 *
 * **Breaking change (B12):** In 1st-gen, no default size was applied
 * (`SizedMixin` used `noDefaultSize: true`). In 2nd-gen, the default
 * is `size="m"` to align with Spectrum 2.
 *
 * All sizes shown below for comparison.
 */
export const Sizes: Story = {
  render: () => html`
    ${DEFAULT_ELEMENT_SIZES.map(
      (size) => html`
        <p><strong>${sizeLabels[size]} (${size})</strong></p>
        ${renderTabGroup({
          size,
          label: `${sizeLabels[size]} size example`,
        })}
        <br />
      `
    )}
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
 * **Breaking change (B13):** `direction="vertical-right"` was supported
 * in 1st-gen but has been removed in 2nd-gen. It was an SWC addition not
 * present in Spectrum CSS. Use `direction="vertical"` instead.
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
          label: `${directionLabels[dir]} example`,
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

/**
 * Visual variant options modify the tab list appearance:
 *
 * - **Quiet**: Removes the divider line for a subtler appearance
 * - **Compact**: Reduces spacing between tabs
 * - **Emphasized**: Applies a visually emphasized style to the selection indicator
 *
 * These variants can be combined. The 1st-gen documentation recommends
 * using compact together with quiet for best results (compact alone
 * without quiet is not a recommended pattern).
 *
 * All single variants shown below for comparison.
 */
export const VisualVariants: Story = {
  render: () => html`
    <p><strong>Quiet</strong></p>
    ${renderTabGroup({ quiet: true, label: 'Quiet tabs' })}
    <br />
    <p><strong>Compact</strong></p>
    ${renderTabGroup({ compact: true, label: 'Compact tabs' })}
    <br />
    <p><strong>Emphasized</strong></p>
    ${renderTabGroup({ emphasized: true, label: 'Emphasized tabs' })}
  `,
  tags: ['options'],
  parameters: {
    'section-order': 3,
  },
};

/**
 * Visual variants can be combined for different visual treatments:
 *
 * - **Quiet + Compact**: The recommended combination for secondary
 *   navigation in tight spaces. Removes the divider and reduces spacing.
 * - **Emphasized + Quiet**: Bold selection indicator without the divider.
 *
 * All combinations shown below for comparison.
 */
export const CombinedVariants: Story = {
  render: () => html`
    <p><strong>Quiet + Compact</strong></p>
    ${renderTabGroup({
      quiet: true,
      compact: true,
      label: 'Quiet compact tabs',
    })}
    <br />
    <p><strong>Emphasized + Quiet</strong></p>
    ${renderTabGroup({
      emphasized: true,
      quiet: true,
      label: 'Emphasized quiet tabs',
    })}
    <br />
    <p><strong>Emphasized + Compact</strong></p>
    ${renderTabGroup({
      emphasized: true,
      compact: true,
      label: 'Emphasized compact tabs',
    })}
    <br />
    <p><strong>Quiet + Compact + Emphasized</strong></p>
    ${renderTabGroup({
      quiet: true,
      compact: true,
      emphasized: true,
      label: 'All variants combined',
    })}
  `,
  tags: ['options', 'dev'],
  parameters: {
    'section-order': 4,
  },
};
CombinedVariants.storyName = 'Combined variants';

/**
 * Vertical direction works with all visual variants. Each combination
 * changes the layout and styling of the tab list.
 *
 * All vertical variant combinations shown below for comparison.
 */
export const VerticalVariants: Story = {
  render: () => html`
    <p><strong>Vertical</strong></p>
    ${renderTabGroup({
      direction: 'vertical',
      label: 'Vertical tabs',
    })}
    <br />
    <p><strong>Vertical + Quiet</strong></p>
    ${renderTabGroup({
      direction: 'vertical',
      quiet: true,
      label: 'Vertical quiet tabs',
    })}
    <br />
    <p><strong>Vertical + Compact</strong></p>
    ${renderTabGroup({
      direction: 'vertical',
      compact: true,
      label: 'Vertical compact tabs',
    })}
    <br />
    <p><strong>Vertical + Emphasized</strong></p>
    ${renderTabGroup({
      direction: 'vertical',
      emphasized: true,
      label: 'Vertical emphasized tabs',
    })}
  `,
  tags: ['options', 'dev'],
  parameters: {
    'section-order': 5,
  },
};
VerticalVariants.storyName = 'Vertical variants';

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
 * **Breaking change (B9):** In 1st-gen, disabled tabs were skipped entirely
 * by keyboard navigation (`RovingTabindexController` filtered them out). In
 * 2nd-gen, disabled tabs are focusable via arrow keys but not activatable
 * (Enter, Space, and click are guarded). This is a behavioral reversal —
 * disabled tabs change from invisible-to-keyboard to focusable-but-inert.
 *
 * All states shown below for comparison.
 */
export const States: Story = {
  render: () => html`
    <p><strong>Individual disabled tab</strong></p>
    ${renderTabGroup({
      selected: 'selected',
      label: 'Individual states',
      tabs: html`
        <swc-tab value="default">Default</swc-tab>
        <swc-tab value="selected">Selected</swc-tab>
        <swc-tab value="disabled" disabled>Disabled</swc-tab>
      `,
      panels: html`
        <swc-tab-panel value="default">
          <p>Default tab content.</p>
        </swc-tab-panel>
        <swc-tab-panel value="selected">
          <p>Selected tab content.</p>
        </swc-tab-panel>
        <swc-tab-panel value="disabled">
          <p>Disabled tab content.</p>
        </swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Disabled container</strong></p>
    ${renderTabGroup({
      disabled: true,
      label: 'Disabled container',
    })}
  `,
  tags: ['states'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

/**
 * ### Activation modes
 *
 * The `auto` property controls how tabs are activated:
 *
 * - **Manual (default)**: Arrow keys move focus between tabs without
 *   changing the selected tab. Enter or Space activates the focused tab.
 *   Use manual activation when loading tab content is expensive (e.g.,
 *   network requests).
 * - **Automatic**: Selection follows focus — as the user arrows between
 *   tabs, the selection updates immediately. Use automatic activation
 *   only when tab content can be displayed instantly.
 *
 * ### Events
 *
 * - **change**: Fired when the selected tab changes. This event is
 *   cancelable — calling `preventDefault()` reverts the selection.
 *
 * ```javascript
 * tabs.addEventListener('change', (event) => {
 *   console.log('Selected:', event.target.selected);
 *   // Optionally prevent the change:
 *   // event.preventDefault();
 * });
 * ```
 *
 * Both activation modes shown below for comparison.
 */
export const ActivationModes: Story = {
  render: () => html`
    <p><strong>Manual activation (default)</strong></p>
    ${renderTabGroup({
      label: 'Manual activation',
      panels: html`
        <swc-tab-panel value="1">
          <p>Use arrow keys to move focus, then Enter or Space to select.</p>
        </swc-tab-panel>
        <swc-tab-panel value="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel value="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
    <br />
    <p><strong>Automatic activation</strong></p>
    ${renderTabGroup({
      auto: true,
      label: 'Automatic activation',
      panels: html`
        <swc-tab-panel value="1">
          <p>Arrow keys immediately select and display content.</p>
        </swc-tab-panel>
        <swc-tab-panel value="2"><p>Specifications content.</p></swc-tab-panel>
        <swc-tab-panel value="3"><p>Guidelines content.</p></swc-tab-panel>
      `,
    })}
  `,
  tags: ['behaviors'],
};

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
 *   (manual mode only; in auto mode, tabs activate on focus)
 *
 * #### ARIA implementation
 *
 * 1. **Roles**: `tablist` on the inner container, `tab` on each tab
 *    item, `tabpanel` on each panel
 * 2. **Labeling**: `aria-label` on the tablist from the `label` property
 * 3. **States**: `aria-selected` on tabs, `aria-disabled` on disabled
 *    tabs and on the tablist when the container is disabled
 * 4. **Orientation**: `aria-orientation="vertical"` set on the same
 *    element as `role="tablist"` when `direction="vertical"` (fixing a
 *    1st-gen bug where they were on different elements, B5)
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
 * - Always provide a `label` attribute on `swc-tabs` for the tablist
 *   accessible name
 * - Use meaningful, concise text labels for each tab
 * - For icon-only tabs, provide a `label` attribute on `swc-tab` as
 *   the accessible name (since there is no visible text content)
 * - Use the `value` attribute to link tabs to their panels
 * - Avoid disabling all tabs — at least one should be interactive
 * - Test with screen readers (VoiceOver, NVDA, JAWS) to verify tab
 *   names, selection announcements, and panel content are accessible
 */
export const Accessibility: Story = {
  render: () => html`
    ${renderTabGroup({
      label: 'Account settings',
      tabs: html`
        <swc-tab value="1">Dashboard</swc-tab>
        <swc-tab value="2">Reports</swc-tab>
        <swc-tab value="3" disabled>Admin (restricted)</swc-tab>
      `,
      panels: html`
        <swc-tab-panel value="1">
          <p>Dashboard content visible to all users.</p>
        </swc-tab-panel>
        <swc-tab-panel value="2">
          <p>Reports section with data visualizations.</p>
        </swc-tab-panel>
        <swc-tab-panel value="3">
          <p>Admin settings (restricted access).</p>
        </swc-tab-panel>
      `,
    })}
  `,
  tags: ['a11y'],
};
