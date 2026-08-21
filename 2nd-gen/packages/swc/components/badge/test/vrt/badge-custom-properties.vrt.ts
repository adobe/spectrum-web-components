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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/badge/swc-badge.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';
import { Checkmark100Icon } from '../../../icon/elements/index.js';

// Metadata

const meta: Meta = {
  title: 'Badge/Badge VRT',
  component: 'swc-badge',
  tags: ['dev'],
};

export default meta;

// Helpers

// --swc-badge-gap and --swc-badge-icon-size only resolve with an icon
// present. --swc-badge-with-icon-padding-inline only resolves with both an
// icon and a label. --swc-badge-with-icon-only-padding-inline/-block only
// resolve in the no-label icon-only state. --swc-badge-outline-*
// properties only resolve on a semantic variant with `outline` set.
// --swc-badge-padding-inline/-inline-start are tested without an icon: the
// icon+label state re-declares `--swc-badge-padding-inline-start` on the
// internal `.swc-Badge` element itself (badge.css's
// `:where(:has(.swc-Badge-icon):not(.swc-Badge--no-label))` rule), which
// wins over any inherited override regardless of the host's inline style.
type BadgePropertyCase = CustomPropertyCase<`--swc-badge-${string}`> & {
  withIcon?: boolean;
  iconOnly?: boolean;
  outline?: boolean;
  wrap?: boolean;
};

const BADGE_PROPERTY_CASES: readonly BadgePropertyCase[] = [
  { property: '--swc-badge-height', value: '48px' },
  { property: '--swc-badge-corner-radius', value: '0px' },
  { property: '--swc-badge-gap', value: '24px', withIcon: true },
  { property: '--swc-badge-padding-block', value: '24px' },
  { property: '--swc-badge-padding-inline', value: '32px' },
  { property: '--swc-badge-padding-inline-start', value: '4px' },
  { property: '--swc-badge-font-size', value: '24px' },
  {
    property: '--swc-badge-line-height',
    value: '3',
    wrap: true,
  },
  { property: '--swc-badge-icon-size', value: '32px', withIcon: true },
  {
    property: '--swc-badge-label-icon-color',
    value: 'magenta',
    withIcon: true,
  },
  { property: '--swc-badge-background-color', value: 'magenta' },
  { property: '--swc-badge-border-color', value: 'magenta' },
  {
    property: '--swc-badge-with-icon-padding-inline',
    value: '40px',
    withIcon: true,
  },
  {
    property: '--swc-badge-with-icon-only-padding-inline',
    value: '40px',
    iconOnly: true,
  },
  {
    property: '--swc-badge-with-icon-only-padding-block',
    value: '40px',
    iconOnly: true,
  },
  {
    property: '--swc-badge-outline-background-color',
    value: 'magenta',
    outline: true,
  },
  {
    property: '--swc-badge-outline-label-icon-color',
    value: 'magenta',
    outline: true,
  },
];

const renderPropertyCase = (
  { withIcon, iconOnly, outline, wrap }: BadgePropertyCase,
  style?: string
) => {
  const variant = outline ? 'positive' : 'neutral';
  const label = outline ? 'Approved' : 'Archived';
  // Two words so the 70px `wrap` constraint actually breaks the label across
  // lines: a single word never wraps at a narrow width since badge.css sets
  // no overflow-wrap/word-break, which would leave line-height's multi-line
  // spacing effect untested.
  const wrapLabel = 'Document review';
  const wrapStyle = wrap ? 'max-inline-size: 70px;' : '';
  const combinedStyle = `${wrapStyle}${style ?? ''}`;

  if (iconOnly) {
    return html`
      <swc-badge
        variant=${variant}
        ?outline=${outline}
        role="img"
        aria-label=${label}
        style=${combinedStyle || nothing}
      >
        <swc-icon slot="icon">${Checkmark100Icon()}</swc-icon>
      </swc-badge>
    `;
  }

  return html`
    <swc-badge
      variant=${variant}
      ?outline=${outline}
      style=${combinedStyle || nothing}
    >
      ${withIcon
        ? html`
            <swc-icon slot="icon" aria-hidden="true">
              ${Checkmark100Icon()}
            </swc-icon>
          `
        : nothing}
      ${wrap ? wrapLabel : label}
    </swc-badge>
  `;
};

const modPropertiesContent = () =>
  customPropertyRows(BADGE_PROPERTY_CASES, renderPropertyCase);

const coveredBadgeCustomProperties =
  coveredCustomProperties(BADGE_PROPERTY_CASES);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/badge/Badge.ts',
    declarationName: 'Badge',
    coveredProperties: coveredBadgeCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
