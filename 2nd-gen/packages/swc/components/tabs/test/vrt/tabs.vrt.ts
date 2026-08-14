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

import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  TAB_DENSITIES,
  type TabDensity,
  TABS_DIRECTIONS,
  type TabsDirection,
} from '@adobe/spectrum-wc-core/components/tabs';

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Tabs/Tabs VRT',
  component: 'swc-tabs',
  tags: ['dev'],
};

export default meta;

// Helpers

type TabCase = {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  iconOnly?: boolean;
  forceState?: ForcedPseudoState;
};

const tab = ({
  id,
  label,
  disabled = false,
  icon,
  iconOnly = false,
  forceState,
}: TabCase) => html`
  <swc-tab
    tab-id=${id}
    ?disabled=${disabled}
    data-force-state=${forceState ?? nothing}
    aria-label=${iconOnly ? label : nothing}
  >
    ${icon
      ? html`
          <span slot="icon" aria-hidden="true">${icon}</span>
        `
      : nothing}
    ${iconOnly ? nothing : label}
  </swc-tab>
`;

const panel = (id: string, content: string) => html`
  <swc-tab-panel tab-id=${id}>
    <p>${content}</p>
  </swc-tab-panel>
`;

// Default 3-tab content shared by every case below that doesn't need its own
// custom anatomy/state combination. `tab-id` is reused across separate
// `swc-tabs` instances deliberately: each container only ever queries its own
// direct children (Tabs.base.ts's `managePanels`/`handleTabSlotChange`), so
// IDs don't need to be page-unique the way the auto-generated `id` attribute
// (used for ARIA wiring) does.
const DEFAULT_TABS = html`
  ${tab({ id: '1', label: 'Overview' })}
  ${tab({ id: '2', label: 'Specifications' })}
  ${tab({ id: '3', label: 'Guidelines' })}
`;

const DEFAULT_PANELS = html`
  ${panel('1', 'Overview content for the selected tab.')}
  ${panel('2', 'Specifications content goes here.')}
  ${panel('3', 'Guidelines content goes here.')}
`;

type TabsGroupCase = {
  direction?: TabsDirection;
  density?: TabDensity;
  disabled?: boolean;
  selected?: string;
  accessibleLabel: string;
  tabs?: unknown;
  panels?: unknown;
};

const renderTabs = ({
  direction,
  density,
  disabled = false,
  selected = '1',
  accessibleLabel,
  tabs = DEFAULT_TABS,
  panels = DEFAULT_PANELS,
}: TabsGroupCase) => html`
  <swc-tabs
    direction=${ifDefined(direction)}
    density=${ifDefined(density)}
    ?disabled=${disabled}
    selected=${selected}
    accessible-label=${accessibleLabel}
  >
    ${tabs} ${panels}
  </swc-tabs>
`;

// Density labels double as captions: `accessible-label` is aria-only (see
// Tabs.ts's render), so nothing in the visible output otherwise distinguishes
// a `compact` group from a `regular` one within the same direction row. Kept
// local rather than added to the shared `.storybook/helpers/vrt.ts` (which
// would affect every other VRT file using it) to keep this VRT-only PR
// scoped to tabs.
const DENSITY_LABELS = {
  regular: 'Regular',
  compact: 'Compact',
} as const satisfies Record<TabDensity, string>;

const withCaption = (content: unknown, label: string) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: var(--swc-spacing-100);"
  >
    ${content}
    <span class="swc-Detail swc-Detail--sizeM">${label}</span>
  </div>
`;

const permutationContent = () => html`
  ${TABS_DIRECTIONS.map((direction) =>
    row(
      TAB_DENSITIES.map((density) =>
        withCaption(
          renderTabs({
            direction,
            density,
            accessibleLabel: `${direction} ${density} example`,
          }),
          DENSITY_LABELS[density]
        )
      ),
      direction
    )
  )}
  ${row(
    [
      renderTabs({
        selected: 'selected',
        accessibleLabel: 'Individual tab states',
        tabs: html`
          ${tab({ id: 'default', label: 'Default' })}
          ${tab({ id: 'selected', label: 'Selected' })}
          ${tab({ id: 'disabled', label: 'Disabled', disabled: true })}
        `,
        panels: html`
          ${panel('default', 'Default tab content.')}
          ${panel('selected', 'Selected tab content.')}
          ${panel('disabled', 'Disabled tab content.')}
        `,
      }),
    ],
    'Tab states'
  )}
  ${row(
    [renderTabs({ disabled: true, accessibleLabel: 'Disabled container' })],
    'Disabled container'
  )}
  ${row(
    [
      renderTabs({
        accessibleLabel: 'Text-only anatomy',
      }),
      renderTabs({
        accessibleLabel: 'Icon and text anatomy',
        tabs: html`
          ${tab({ id: '1', label: 'Dashboard', icon: '☰' })}
          ${tab({ id: '2', label: 'Reports', icon: '📊' })}
          ${tab({ id: '3', label: 'Settings', icon: '⚙' })}
        `,
        panels: html`
          ${panel('1', 'Dashboard content.')} ${panel('2', 'Reports content.')}
          ${panel('3', 'Settings content.')}
        `,
      }),
      renderTabs({
        accessibleLabel: 'Icon-only anatomy',
        tabs: html`
          ${tab({ id: '1', label: 'Dashboard', icon: '☰', iconOnly: true })}
          ${tab({ id: '2', label: 'Reports', icon: '📊', iconOnly: true })}
          ${tab({ id: '3', label: 'Settings', icon: '⚙', iconOnly: true })}
        `,
        panels: html`
          ${panel('1', 'Dashboard content.')} ${panel('2', 'Reports content.')}
          ${panel('3', 'Settings content.')}
        `,
      }),
    ],
    'Anatomy'
  )}
  ${row(
    [
      renderTabs({
        accessibleLabel: 'Forced pseudo-states',
        tabs: html`
          ${tab({ id: '1', label: 'Hover', forceState: 'hover' })}
          ${tab({
            id: '2',
            label: 'Focus-visible',
            forceState: 'focus-visible',
          })}
          ${tab({ id: '3', label: 'Active', forceState: 'active' })}
        `,
        panels: html`
          ${panel('1', 'Hover content.')} ${panel('2', 'Focus content.')}
          ${panel('3', 'Active content.')}
        `,
      }),
    ],
    'Forced states'
  )}
  ${row(
    [
      renderTabs({
        accessibleLabel: '承認ワークフロー',
        tabs: html`
          ${tab({ id: '1', label: '概要' })} ${tab({ id: '2', label: '仕様' })}
          ${tab({ id: '3', label: 'ガイドライン' })}
        `,
        panels: html`
          ${panel('1', '概要コンテンツ。')} ${panel('2', '仕様コンテンツ。')}
          ${panel('3', 'ガイドラインコンテンツ。')}
        `,
      }),
      renderTabs({
        accessibleLabel: '승인 워크플로',
        tabs: html`
          ${tab({ id: '1', label: '개요' })} ${tab({ id: '2', label: '사양' })}
          ${tab({ id: '3', label: '가이드라인' })}
        `,
        panels: html`
          ${panel('1', '개요 콘텐츠.')} ${panel('2', '사양 콘텐츠.')}
          ${panel('3', '가이드라인 콘텐츠.')}
        `,
      }),
      renderTabs({
        accessibleLabel: '审批工作流',
        tabs: html`
          ${tab({ id: '1', label: '概览' })} ${tab({ id: '2', label: '规格' })}
          ${tab({ id: '3', label: '准则' })}
        `,
        panels: html`
          ${panel('1', '概览内容。')} ${panel('2', '规格内容。')}
          ${panel('3', '准则内容。')}
        `,
      }),
    ],
    'CJK language'
  )}
`;

const forceTabStates = forcePseudoStates('swc-tab[data-force-state]');

// VRT stories

// Direction (horizontal, vertical) x density (regular, compact), individual
// tab states (default/selected/disabled within one group), a fully disabled
// container, anatomy (text-only, icon+text, icon-only), forced
// hover/focus-visible/active on individual tabs (see the `play` function
// below - tab.css styles these on `:host()` directly, so no internal
// selector is needed), and CJK tab labels. Rendered once in light/ltr and
// once in dark/rtl below (that combination covers both axes; RTL also
// exercises the selection indicator's mirrored `transform-origin` for
// horizontal direction), all still in a single story so it costs one
// snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceTabStates,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly, unlike :hover/:active/:focus-visible above. Forced-colors mode
// replaces the whole page's palette, so it needs its own story/snapshot
// rather than folding into Permutations. Tab, Tabs' selection indicator, and
// TabPanel all define their own forced-colors overrides, so this covers all
// three parts of the three-element architecture.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceTabStates,
};
