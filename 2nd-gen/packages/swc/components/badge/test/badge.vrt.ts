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

import '@adobe/spectrum-wc/badge';

import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS_COLOR,
  BADGE_VARIANTS_SEMANTIC,
  FIXED_VALUES,
} from '../../../../core/components/badge/Badge.types.js';
import { meta } from '../stories/badge.stories.js';

// VRT stories are the single source of Chromatic snapshots. Everything else is
// opted out of snapshots globally in `.storybook/preview.ts`; this meta re-enables
// them for stories defined in this file.
export default {
  ...meta,
  title: 'Badge/VRT',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
    layout: 'padded',
    // The permutations grid handles its own layout; turn off the shared flex decorator.
    flexLayout: false,
    chromatic: { disableSnapshot: false },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

const gridStyle = `
  display: grid;
  gap: 16px;
  padding: 16px;
  font-family: system-ui, sans-serif;
`;

const rowStyle = `
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const labelStyle = `
  font-size: 11px;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const sectionLabel = (text: string) => html`
  <div style=${labelStyle}>${text}</div>
`;

/**
 * Dense permutations grid that is the single Chromatic snapshot for Badge.
 *
 * Covers the visual axes that matter for regression detection:
 * - semantic variants × sizes × styles (default, subtle, outline)
 * - non-semantic color variants (default and subtle)
 * - anatomy combinations (label, icon, icon + label)
 * - fixed positioning
 * - text wrapping
 *
 * Interactive states are not applicable for Badge (non-interactive element).
 */
export const Permutations: Story = {
  render: () => html`
    <div style=${gridStyle}>
      ${sectionLabel('Semantic · default fill · s / m / l / xl')}
      ${BADGE_VARIANTS_SEMANTIC.map(
        (variant) => html`
          <div style=${rowStyle}>
            ${BADGE_VALID_SIZES.map(
              (size) => html`
                <swc-badge variant=${variant} size=${size}>
                  ${variant}
                </swc-badge>
              `
            )}
          </div>
        `
      )}
      ${sectionLabel('Semantic · subtle · s / m / l / xl')}
      ${BADGE_VARIANTS_SEMANTIC.map(
        (variant) => html`
          <div style=${rowStyle}>
            ${BADGE_VALID_SIZES.map(
              (size) => html`
                <swc-badge variant=${variant} size=${size} subtle>
                  ${variant}
                </swc-badge>
              `
            )}
          </div>
        `
      )}
      ${sectionLabel('Semantic · outline · s / m / l / xl')}
      ${BADGE_VARIANTS_SEMANTIC.map(
        (variant) => html`
          <div style=${rowStyle}>
            ${BADGE_VALID_SIZES.map(
              (size) => html`
                <swc-badge variant=${variant} size=${size} outline>
                  ${variant}
                </swc-badge>
              `
            )}
          </div>
        `
      )}
      ${sectionLabel('Non-semantic · default fill')}
      <div style=${rowStyle}>
        ${BADGE_VARIANTS_COLOR.map(
          (variant) => html`
            <swc-badge variant=${variant} size="m">${variant}</swc-badge>
          `
        )}
      </div>
      ${sectionLabel('Non-semantic · subtle')}
      <div style=${rowStyle}>
        ${BADGE_VARIANTS_COLOR.map(
          (variant) => html`
            <swc-badge variant=${variant} size="m" subtle>${variant}</swc-badge>
          `
        )}
      </div>
      ${sectionLabel('Anatomy · label / icon / icon + label')}
      <div style=${rowStyle}>
        <swc-badge variant="informative">Label only</swc-badge>
        <swc-badge variant="informative" aria-label="Icon only">
          <span slot="icon">✓</span>
        </swc-badge>
        <swc-badge variant="informative">
          <span slot="icon">✓</span>
          Icon and label
        </swc-badge>
      </div>
      ${sectionLabel('Fixed positions')}
      <div style=${rowStyle}>
        ${FIXED_VALUES.map(
          (fixed) => html`
            <swc-badge variant="informative" fixed=${fixed}>${fixed}</swc-badge>
          `
        )}
      </div>
      ${sectionLabel('Text wrapping')}
      <div style=${rowStyle}>
        <swc-badge variant="informative" style="max-inline-size: 120px">
          Document review pending approval from manager
        </swc-badge>
      </div>
    </div>
  `,
};
