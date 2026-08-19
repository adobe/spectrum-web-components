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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import type { CustomPropertyCase } from '../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Typography/Typography VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Typography has no custom-elements-manifest, so the manifest-driven
// verifyCustomPropertyCoverage() (used by component custom-property VRTs)
// has nothing to check cases against. DOCUMENTED_TYPOGRAPHY_PROPERTIES is
// the manual equivalent: it must stay in sync with the "CSS custom
// properties" table in typography.mdx, and
// verifyTypographyCustomPropertyCoverage() below fails if a case is missing,
// duplicated, or covers a property that isn't in this list - the same
// safety net link-custom-properties.vrt.ts gets from DOCUMENTED_LINK_PROPERTIES,
// minus the manifest.
//
// Scope: Heading/Title/Body/Detail also expose margin-top/bottom multiplier
// variables (Code has no `--margins` modifier) and CJK-specific font-size/
// line-height/letter-spacing overrides, but those are internal plumbing
// feeding the "real" property (e.g. `--swc-heading-margin-top` is the actual
// override point; the multiplier just computes its default) - intentionally
// excluded from the tested surface.

// Every variant shares the same eight-property shape (font-family, font-size,
// font-weight, line-height, font-color, letter-spacing, margin-top,
// margin-bottom), so cases are generated from one suffix/value table rather
// than hand-typed per variant. Override values are chosen to be obviously
// different regardless of each variant's own default: `cursive` for
// font-family (visibly distinct from both the sans and serif token stacks),
// `64px` for font-size (larger than any variant's default), `900` for
// font-weight, `3` for line-height, `magenta` for font-color, `0.3em` for
// letter-spacing, and `40px` for the block margins.
const CORE_PROPERTY_SUFFIXES = [
  { suffix: 'font-family', value: 'cursive' },
  { suffix: 'font-size', value: '64px' },
  { suffix: 'font-weight', value: '900' },
  { suffix: 'line-height', value: '3' },
  { suffix: 'font-color', value: 'magenta' },
  { suffix: 'letter-spacing', value: '0.3em' },
  { suffix: 'margin-top', value: '40px' },
  { suffix: 'margin-bottom', value: '40px' },
] as const;

const casesFor = (prefix: string): readonly CustomPropertyCase[] =>
  CORE_PROPERTY_SUFFIXES.map(({ suffix, value }) => ({
    property: `--swc-${prefix}-${suffix}`,
    value,
  }));

// Mirrors typography.mdx's "CSS custom properties" table exactly (sorted,
// to match coveredCustomProperties()'s own sort), so an addition or removal
// on either side trips verifyTypographyCustomPropertyCoverage() below.
const DOCUMENTED_TYPOGRAPHY_PROPERTIES = [
  '--swc-body-font-color',
  '--swc-body-font-family',
  '--swc-body-font-size',
  '--swc-body-font-weight',
  '--swc-body-letter-spacing',
  '--swc-body-line-height',
  '--swc-body-margin-bottom',
  '--swc-body-margin-top',
  '--swc-detail-font-color',
  '--swc-detail-font-family',
  '--swc-detail-font-size',
  '--swc-detail-font-weight',
  '--swc-detail-letter-spacing',
  '--swc-detail-line-height',
  '--swc-detail-margin-bottom',
  '--swc-detail-margin-top',
  '--swc-heading-font-color',
  '--swc-heading-font-family',
  '--swc-heading-font-size',
  '--swc-heading-font-weight',
  '--swc-heading-letter-spacing',
  '--swc-heading-line-height',
  '--swc-heading-margin-bottom',
  '--swc-heading-margin-top',
  '--swc-monospace-font-color',
  '--swc-monospace-font-family',
  '--swc-monospace-font-size',
  '--swc-monospace-font-weight',
  '--swc-monospace-letter-spacing',
  '--swc-monospace-line-height',
  '--swc-monospace-margin-bottom',
  '--swc-monospace-margin-top',
  '--swc-title-font-color',
  '--swc-title-font-family',
  '--swc-title-font-size',
  '--swc-title-font-weight',
  '--swc-title-letter-spacing',
  '--swc-title-line-height',
  '--swc-title-margin-bottom',
  '--swc-title-margin-top',
] as const;

const HEADING_PROPERTY_CASES = casesFor('heading');
const TITLE_PROPERTY_CASES = casesFor('title');
const BODY_PROPERTY_CASES = casesFor('body');
const DETAIL_PROPERTY_CASES = casesFor('detail');
const CODE_PROPERTY_CASES = casesFor('monospace');

// A fixed narrow width on every sample (reference and override alike) so
// `line-height`'s effect is visible: at the default single-line sample
// length, an overridden line-height has nothing to show against.
const SAMPLE_WIDTH = 'max-inline-size: 160px;';

const renderHeadingCase = (_case: CustomPropertyCase, style?: string) => html`
  <h2 class="swc-Heading" style="${SAMPLE_WIDTH} ${style ?? ''}">
    Reserved for main page heading
  </h2>
`;

const renderTitleCase = (_case: CustomPropertyCase, style?: string) => html`
  <h3 class="swc-Title" style="${SAMPLE_WIDTH} ${style ?? ''}">
    Important information and wayfinding
  </h3>
`;

const renderBodyCase = (_case: CustomPropertyCase, style?: string) => html`
  <p class="swc-Body" style="${SAMPLE_WIDTH} ${style ?? ''}">
    Body copy should be readable and comfortable for longer blocks of text.
  </p>
`;

const renderDetailCase = (_case: CustomPropertyCase, style?: string) => html`
  <p class="swc-Detail" style="${SAMPLE_WIDTH} ${style ?? ''}">
    Supporting metadata
  </p>
`;

const renderCodeCase = (_case: CustomPropertyCase, style?: string) => html`
  <code class="swc-Code" style="${SAMPLE_WIDTH} ${style ?? ''}">
    console.log('Hello world');
  </code>
`;

// A plain heading, not `row()`: `customPropertyRows()` already returns one
// fully-built `row()` per property, so wrapping that array in another
// `row()` would flex-wrap those pre-built blocks together instead of
// stacking them.
const sectionHeading = (label: string) => html`
  <span class="swc-Detail swc-Detail--sizeM" style="font-weight: bold;">
    ${label}
  </span>
`;

const customPropertiesContent = () => html`
  ${sectionHeading('Heading')}
  ${customPropertyRows(HEADING_PROPERTY_CASES, renderHeadingCase)}
  ${sectionHeading('Title')}
  ${customPropertyRows(TITLE_PROPERTY_CASES, renderTitleCase)}
  ${sectionHeading('Body')}
  ${customPropertyRows(BODY_PROPERTY_CASES, renderBodyCase)}
  ${sectionHeading('Detail')}
  ${customPropertyRows(DETAIL_PROPERTY_CASES, renderDetailCase)}
  ${sectionHeading('Code')}
  ${customPropertyRows(CODE_PROPERTY_CASES, renderCodeCase)}
`;

const coveredTypographyProperties = coveredCustomProperties([
  ...HEADING_PROPERTY_CASES,
  ...TITLE_PROPERTY_CASES,
  ...BODY_PROPERTY_CASES,
  ...DETAIL_PROPERTY_CASES,
  ...CODE_PROPERTY_CASES,
]);

// Manual stand-in for verifyCustomPropertyCoverage(): no duplicate cases
// (e.g. from calling casesFor() twice for the same prefix), and the covered
// set matches typography.mdx's documented list exactly (both are sorted, so
// an extra or missing property trips the equality check).
const verifyTypographyCustomPropertyCoverage = async () => {
  await expect(coveredTypographyProperties).toHaveLength(
    new Set(coveredTypographyProperties).size
  );
  await expect(coveredTypographyProperties).toEqual([
    ...DOCUMENTED_TYPOGRAPHY_PROPERTIES,
  ]);
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyTypographyCustomPropertyCoverage,
};
