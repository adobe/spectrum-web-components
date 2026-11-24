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

import { MenuItem } from '@adobe/spectrum-wc/menu';

import '@adobe/spectrum-wc-icons/swc-icon-copy.js';
import '@adobe/spectrum-wc/components/menu/swc-menu-item.js';
import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import type {
  CustomPropertyCase,
  ForcedPseudoState,
} from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  forcePseudoState,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Menu/Menu VRT',
  component: 'swc-menu-item',
  tags: ['dev'],
};

export default meta;

// Helpers
//
// Rows are rendered on their own, at the width a menu surface gives them,
// rather than inside open menus: the properties act on the row, and a bare row
// keeps each reference/override pair free of popover placement.

const SQUARE_SRC = './images/avatar-preview.png';
const ROW_INLINE_SIZE = 320;
const DESCRIPTION = 'Keeps the source formatting';
const SHORTCUT = '⌘⇧V';
const WRAPPING_LABEL =
  'Export the current selection as a flattened layered composite file';
const WRAPPING_DESCRIPTION =
  'Keeps the source formatting, including embedded colour profiles and any layer styles on the selection';

interface RowContent {
  label?: string;
  icon?: boolean;
  thumbnail?: boolean;
  description?: string;
  secondary?: string;
}

// The row has no fill at rest, so a property whose effect is only visible
// against the row's box (its padding, gap, minimum height or corner radius)
// is rendered with the hover fill forced on. State fills force their own
// state.
interface MenuItemCase extends CustomPropertyCase<`--swc-menu-item-${string}`> {
  content: RowContent;
  forceState?: ForcedPseudoState;
}

// Every value is chosen to be unmistakably different from its default at the
// medium size, so an override that silently stops applying collapses onto the
// reference and shows up in review.
const MENU_ITEM_PROPERTY_CASES: readonly MenuItemCase[] = [
  {
    property: '--swc-menu-item-min-block-size',
    value: '72px',
    content: {},
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-padding-block',
    value: '24px',
    content: {},
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-padding-inline',
    value: '48px',
    content: {},
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-gap',
    value: '40px',
    content: { icon: true, secondary: SHORTCUT },
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-corner-radius',
    value: '24px',
    content: {},
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-background-color',
    value: 'magenta',
    content: {},
  },
  {
    property: '--swc-menu-item-background-color-hover',
    value: 'magenta',
    content: {},
    forceState: 'hover',
  },
  {
    property: '--swc-menu-item-background-color-focus',
    value: 'magenta',
    content: {},
    forceState: 'focus-visible',
  },
  {
    property: '--swc-menu-item-background-color-down',
    value: 'magenta',
    content: {},
    forceState: 'active',
  },
  {
    property: '--swc-menu-item-label-color',
    value: 'magenta',
    content: {},
  },
  {
    property: '--swc-menu-item-label-font-size',
    value: '28px',
    content: {},
  },
  {
    // Needs a label that wraps, or there is only one line to space.
    property: '--swc-menu-item-label-line-height',
    value: '48px',
    content: { label: WRAPPING_LABEL },
  },
  {
    property: '--swc-menu-item-text-gap',
    value: '24px',
    content: { description: DESCRIPTION },
  },
  {
    property: '--swc-menu-item-description-color',
    value: 'magenta',
    content: { description: DESCRIPTION },
  },
  {
    property: '--swc-menu-item-description-font-size',
    value: '24px',
    content: { description: DESCRIPTION },
  },
  {
    property: '--swc-menu-item-description-line-height',
    value: '48px',
    content: { description: WRAPPING_DESCRIPTION },
  },
  {
    property: '--swc-menu-item-secondary-color',
    value: 'magenta',
    content: { secondary: SHORTCUT },
  },
  {
    property: '--swc-menu-item-icon-size',
    value: '48px',
    content: { icon: true },
  },
  {
    property: '--swc-menu-item-thumbnail-size',
    value: '80px',
    content: { thumbnail: true, description: DESCRIPTION },
  },
];

const renderPropertyCase = (testCase: MenuItemCase, style?: string) => {
  const {
    label = 'Paste special',
    icon,
    thumbnail,
    description,
    secondary,
  } = testCase.content;
  return html`
    <div style="inline-size: ${ROW_INLINE_SIZE}px;">
      <swc-menu-item
        style=${ifDefined(style)}
        data-force-state=${ifDefined(testCase.forceState)}
      >
        ${icon
          ? html`
              <swc-icon-copy slot="visual"></swc-icon-copy>
            `
          : nothing}
        ${thumbnail
          ? html`
              <swc-thumbnail slot="visual">
                <img src=${SQUARE_SRC} alt="" />
              </swc-thumbnail>
            `
          : nothing}
        <span slot="label">${label}</span>
        ${description
          ? html`
              <span slot="description">${description}</span>
            `
          : nothing}
        ${secondary
          ? html`
              <span slot="secondary">${secondary}</span>
            `
          : nothing}
      </swc-menu-item>
    </div>
  `;
};

const customPropertiesContent = () =>
  customPropertyRows(MENU_ITEM_PROPERTY_CASES, renderPropertyCase);

// The hover treatment is gated on `pointer-focus`, which the owning menu sets
// for a real pointer, so it is set here alongside the forced hover state.
const forceRowStates: NonNullable<Story['play']> = async ({
  canvasElement,
}) => {
  const items = [
    ...canvasElement.querySelectorAll<MenuItem>(
      'swc-menu-item[data-force-state]'
    ),
  ];
  await Promise.all(items.map((item) => item.updateComplete));
  items.forEach((item) => {
    const state = item.dataset.forceState as ForcedPseudoState;
    forcePseudoState(item, state);
    if (state === 'hover') {
      item.setAttribute('pointer-focus', '');
    }
  });
};

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/menu/MenuItem.ts',
    declarationName: 'MenuItem',
    coveredProperties: coveredCustomProperties(MENU_ITEM_PROPERTY_CASES),
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: async (context) => {
    await forceRowStates(context);
    await verifyCoverage();
  },
};
