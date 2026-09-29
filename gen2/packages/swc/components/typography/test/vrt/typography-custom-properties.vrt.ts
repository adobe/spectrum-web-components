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
import typographyDocumentation from '../../typography.mdx?raw';

// Metadata

const meta: Meta = {
  title: 'Typography/Typography VRT',
  tags: ['dev'],
};

export default meta;

// Helpers

// Typography is CSS-only, with no custom element declaration to pass to
// verifyCustomPropertyCoverage(). Read its documented API table directly
// instead of keeping a second, test-local copy of that inventory.
//
// Scope: margin-top/bottom multiplier variables are internal plumbing
// (not consumer-set) and excluded. CJK font-size/line-height/letter-spacing
// overrides are real override points, just scoped to `:lang(zh|ja|ko)`,
// so they're covered below alongside their base properties.

// Every variant shares the same eight-property shape (font-family, font-size,
// font-weight, line-height, font-color, letter-spacing, margin-top,
// margin-bottom), so cases are generated from one suffix/value table rather
// than hand-typed per variant. Override values are chosen to be obviously
// different from any variant's default.
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

const HEADING_PROPERTY_CASES = casesFor('heading');
const TITLE_PROPERTY_CASES = casesFor('title');
const BODY_PROPERTY_CASES = casesFor('body');
const DETAIL_PROPERTY_CASES = casesFor('detail');
const CODE_PROPERTY_CASES = casesFor('monospace');

// Mirrors CORE_PROPERTY_SUFFIXES for the `--swc-*-cjk-*` override points
// (see the top-of-file note on why they're tested separately). Values
// differ from CORE_PROPERTY_SUFFIXES so a case rendered without its `lang`
// attribute would still look wrong, rather than accidentally matching the
// core override.
const CJK_PROPERTY_SUFFIXES = [
  { suffix: 'cjk-font-size', value: '48px' },
  { suffix: 'cjk-line-height', value: '4' },
  { suffix: 'cjk-letter-spacing', value: '0.5em' },
] as const;

type CjkSuffix = (typeof CJK_PROPERTY_SUFFIXES)[number]['suffix'];

const cjkCasesFor = (
  prefix: string,
  suffixes: readonly CjkSuffix[]
): readonly CustomPropertyCase[] =>
  CJK_PROPERTY_SUFFIXES.filter(({ suffix }) => suffixes.includes(suffix)).map(
    ({ suffix, value }) => ({
      property: `--swc-${prefix}-${suffix}`,
      value,
    })
  );

const ALL_CJK_SUFFIXES: readonly CjkSuffix[] = [
  'cjk-font-size',
  'cjk-line-height',
  'cjk-letter-spacing',
];

// Detail overrides only line-height/letter-spacing under :lang(); Code
// (monospace) overrides only line-height. See typography.css.
const HEADING_CJK_PROPERTY_CASES = cjkCasesFor('heading', ALL_CJK_SUFFIXES);
const TITLE_CJK_PROPERTY_CASES = cjkCasesFor('title', ALL_CJK_SUFFIXES);
const BODY_CJK_PROPERTY_CASES = cjkCasesFor('body', ALL_CJK_SUFFIXES);
const DETAIL_CJK_PROPERTY_CASES = cjkCasesFor('detail', [
  'cjk-line-height',
  'cjk-letter-spacing',
]);
const CODE_CJK_PROPERTY_CASES = cjkCasesFor('monospace', ['cjk-line-height']);

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

// `lang="ja"` activates the `:lang(zh|ja|ko)` scope so the cjk-* override
// actually resolves; without it, e.g. `--swc-heading-cjk-line-height`
// would have no visible effect. Heading/Title/Body text reuses
// typography.vrt.ts's CJK content; Detail/Code have no counterpart there,
// so this adds representative copy for those two.
const renderHeadingCjkCase = (
  _case: CustomPropertyCase,
  style?: string
) => html`
  <h2 class="swc-Heading" lang="ja" style="${SAMPLE_WIDTH} ${style ?? ''}">
    承認ワークフローを開始
  </h2>
`;

const renderTitleCjkCase = (_case: CustomPropertyCase, style?: string) => html`
  <h3 class="swc-Title" lang="ja" style="${SAMPLE_WIDTH} ${style ?? ''}">
    仕様
  </h3>
`;

const renderBodyCjkCase = (_case: CustomPropertyCase, style?: string) => html`
  <p class="swc-Body" lang="ja" style="${SAMPLE_WIDTH} ${style ?? ''}">
    アップロードまたはインポートしてください。
  </p>
`;

const renderDetailCjkCase = (_case: CustomPropertyCase, style?: string) => html`
  <p class="swc-Detail" lang="ja" style="${SAMPLE_WIDTH} ${style ?? ''}">
    補足情報
  </p>
`;

const renderCodeCjkCase = (_case: CustomPropertyCase, style?: string) => html`
  <code class="swc-Code" lang="ja" style="${SAMPLE_WIDTH} ${style ?? ''}">
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
  ${sectionHeading('Heading · CJK')}
  ${customPropertyRows(HEADING_CJK_PROPERTY_CASES, renderHeadingCjkCase)}
  ${sectionHeading('Title')}
  ${customPropertyRows(TITLE_PROPERTY_CASES, renderTitleCase)}
  ${sectionHeading('Title · CJK')}
  ${customPropertyRows(TITLE_CJK_PROPERTY_CASES, renderTitleCjkCase)}
  ${sectionHeading('Body')}
  ${customPropertyRows(BODY_PROPERTY_CASES, renderBodyCase)}
  ${sectionHeading('Body · CJK')}
  ${customPropertyRows(BODY_CJK_PROPERTY_CASES, renderBodyCjkCase)}
  ${sectionHeading('Detail')}
  ${customPropertyRows(DETAIL_PROPERTY_CASES, renderDetailCase)}
  ${sectionHeading('Detail · CJK')}
  ${customPropertyRows(DETAIL_CJK_PROPERTY_CASES, renderDetailCjkCase)}
  ${sectionHeading('Code')}
  ${customPropertyRows(CODE_PROPERTY_CASES, renderCodeCase)}
  ${sectionHeading('Code · CJK')}
  ${customPropertyRows(CODE_CJK_PROPERTY_CASES, renderCodeCjkCase)}
`;

const coveredTypographyProperties = coveredCustomProperties([
  ...HEADING_PROPERTY_CASES,
  ...HEADING_CJK_PROPERTY_CASES,
  ...TITLE_PROPERTY_CASES,
  ...TITLE_CJK_PROPERTY_CASES,
  ...BODY_PROPERTY_CASES,
  ...BODY_CJK_PROPERTY_CASES,
  ...DETAIL_PROPERTY_CASES,
  ...DETAIL_CJK_PROPERTY_CASES,
  ...CODE_PROPERTY_CASES,
  ...CODE_CJK_PROPERTY_CASES,
]);

const verifyTypographyCustomPropertyCoverage = async () => {
  const documentedProperties = [
    ...typographyDocumentation.matchAll(/^\|\s*`(--swc-[\w-]+)`\s*\|/gm),
  ]
    .map(([, property]) => property)
    .sort();

  await expect(documentedProperties.length).toBeGreaterThan(0);
  await expect(documentedProperties).toHaveLength(
    new Set(documentedProperties).size
  );
  await expect(coveredTypographyProperties).toHaveLength(
    new Set(coveredTypographyProperties).size
  );
  await expect(coveredTypographyProperties).toEqual(documentedProperties);
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(customPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyTypographyCustomPropertyCoverage,
};
