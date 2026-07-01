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

import { TAB_DENSITIES } from '@spectrum-web-components/core/components/tabs/index.js';

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import {
  forcePseudoState,
  row,
  theme,
} from '../../../.storybook/helpers/index.js';

// ────────────────
//    METADATA
// ────────────────

const meta: Meta = {
  title: 'Tabs/VRT',
  component: 'swc-tabs',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  tags: ['dev'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

// One tab group per density: default, selected, and disabled tabs, each
// paired with a matching panel (Tabs warns if a tab has no matching panel).
const tabGroup = (density: (typeof TAB_DENSITIES)[number]) => html`
  <swc-tabs selected="2" density=${density} accessible-label="Product details">
    <swc-tab tab-id="1">Overview</swc-tab>
    <swc-tab tab-id="2">Specifications</swc-tab>
    <swc-tab tab-id="3" disabled>Guidelines</swc-tab>
    <swc-tab-panel tab-id="1">Overview content.</swc-tab-panel>
    <swc-tab-panel tab-id="2">Specifications content.</swc-tab-panel>
    <swc-tab-panel tab-id="3">Guidelines content.</swc-tab-panel>
  </swc-tabs>
`;

// ──────────────────────────
//    VRT STORIES
// ──────────────────────────

// Regular/compact density, each with default/selected/disabled tabs, plus
// forced hover/focus-visible/active on standalone tabs. Rendered once in
// light/ltr and once in dark/rtl below, all in a single story/snapshot.
//
// Tab's hover/active/focus-visible rules are all `:host(:hover)` etc. (see
// tab.css) — styled on the host itself, not an internal shadow part like
// Button's `.swc-Button:hover`. forcePseudoState() with no internalSelector
// adds the forced class straight to the host for that case.
const permutationContent = () => html`
  ${row(TAB_DENSITIES.map((density) => tabGroup(density)))}
  ${row(
    (['hover', 'focus-visible', 'active'] as const).map(
      (state) => html`
        <swc-tab data-force-state=${state} tab-id=${state}>${state}</swc-tab>
      `
    )
  )}
`;

export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: {
    styles: { display: 'flex', 'flex-direction': 'column', gap: '16px' },
    // The global default (preview.ts) only autoplays under Chromatic, so the
    // forced hover/focus-visible/active row below wouldn't otherwise render
    // in local dev/the Chromatic addon panel without manually triggering play.
    autoplay: true,
  },
  play: async ({ canvasElement }) => {
    canvasElement
      .querySelectorAll<HTMLElement>('swc-tab[data-force-state]')
      .forEach((host) => {
        const state = host.dataset.forceState as
          | 'hover'
          | 'focus-visible'
          | 'active';
        forcePseudoState(host, state);
      });
  },
};
