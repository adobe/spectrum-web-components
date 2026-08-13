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

import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'Progress circle/Progress circle VRT',
  component: 'swc-progress-circle',
  tags: ['dev'],
};

export default meta;

// Helpers

// Every `--swc-progress-circle-*` custom property is a public contract (see
// the component's @cssprop JSDoc), so a future CSS refactor that quietly
// drops one would be a breaking change. One row per property: a reference
// circle next to the same circle with that one property overridden to an
// obviously different value, so a real difference confirms the override
// still works. Rendered determinate at 50% so both track and fill are
// simultaneously visible, which the two color properties need.
//
// `thickness` is tested as a decrease: ProgressCircle.ts's SVG radius is
// computed from a fixed per-size stroke-width, independent of this property,
// so increasing thickness clips the stroke past that radius (a real
// component bug, out of scope here). Decreasing has no such ceiling.
type ProgressCirclePropertyCase =
  CustomPropertyCase<`--swc-progress-circle-${string}`>;

const PROGRESS_CIRCLE_PROPERTY_CASES: readonly ProgressCirclePropertyCase[] = [
  { property: '--swc-progress-circle-size', value: '80px' },
  { property: '--swc-progress-circle-track-border-color', value: 'magenta' },
  { property: '--swc-progress-circle-fill-border-color', value: 'magenta' },
  { property: '--swc-progress-circle-thickness', value: '1px' },
];

const renderPropertyCase = (
  _testCase: ProgressCirclePropertyCase,
  style?: string
) => html`
  <swc-progress-circle
    progress="50"
    label="Processing request"
    style=${style ?? nothing}
  ></swc-progress-circle>
`;

const modPropertiesContent = () =>
  customPropertyRows(PROGRESS_CIRCLE_PROPERTY_CASES, renderPropertyCase);

const coveredProgressCircleCustomProperties = coveredCustomProperties(
  PROGRESS_CIRCLE_PROPERTY_CASES
);

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'components/progress-circle/ProgressCircle.ts',
    declarationName: 'ProgressCircle',
    coveredProperties: coveredProgressCircleCustomProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
