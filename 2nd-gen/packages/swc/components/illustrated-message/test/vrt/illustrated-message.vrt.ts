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

import {
  ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
  ILLUSTRATED_MESSAGE_VALID_SIZES,
  type IllustratedMessageOrientation,
  type IllustratedMessageSize,
} from '@adobe/spectrum-wc-core/components/illustrated-message';

import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';
import { illustration } from './illustration.js';

// Metadata

const meta: Meta = {
  title: 'Illustrated message/Illustrated message VRT',
  component: 'swc-illustrated-message',
  tags: ['dev'],
};

export default meta;

// Helpers

type IllustratedMessageCase = {
  size?: IllustratedMessageSize;
  orientation?: IllustratedMessageOrientation;
  lang?: string;
};

const standardSlots = (
  heading: string,
  description = 'Supporting description text.'
) => html`
  ${illustration()}
  <h2 slot="heading">${heading}</h2>
  <span slot="description">${description}</span>
`;

const renderIllustratedMessage = (
  { size = 'm', orientation = 'vertical', lang }: IllustratedMessageCase,
  slots: unknown = standardSlots('Illustrated message title')
) => html`
  <swc-illustrated-message
    size=${size}
    orientation=${orientation}
    lang=${lang ?? nothing}
  >
    ${slots}
  </swc-illustrated-message>
`;

// Size labels double as the item's own heading text; the row grouping already
// conveys orientation, so size is the one axis each item needs to spell out.
const SIZE_LABELS: Record<IllustratedMessageSize, string> = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
};

const BASE_PERMUTATIONS = createPermutations([
  {
    size: ILLUSTRATED_MESSAGE_VALID_SIZES,
    orientation: ILLUSTRATED_MESSAGE_VALID_ORIENTATIONS,
  },
]);

const renderBasePermutation = (
  permutation: (typeof BASE_PERMUTATIONS)[number]
) =>
  renderIllustratedMessage(
    permutation,
    standardSlots(SIZE_LABELS[permutation.size])
  );

// Anatomy: slot combinations that change the rendered structure (illustration
// wrapper collapses entirely when the default slot has no assigned content),
// at a single size/orientation so the differences read as structural.
const anatomyCases = [
  renderIllustratedMessage(
    {},
    html`
      <h2 slot="heading">No illustration</h2>
      <span slot="description">
        Illustration slot left empty; its wrapper collapses instead of reserving
        space.
      </span>
    `
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h2 slot="heading">Heading only</h2>
    `
  ),
  renderIllustratedMessage(
    {},
    standardSlots('Heading and description', 'Optional supporting description.')
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h2 slot="heading">With a single action</h2>
      <span slot="description">Optional supporting description.</span>
      <swc-button slot="actions" variant="accent">Browse files</swc-button>
    `
  ),
];

// Actions receive `size` propagated automatically from the illustrated
// message; render at every size to confirm the button-group scales with it.
const actionsSizePropagationCases = ILLUSTRATED_MESSAGE_VALID_SIZES.map(
  (size) =>
    renderIllustratedMessage(
      { size },
      html`
        ${illustration()}
        <h2 slot="heading">No results found</h2>
        <span slot="description">Try adjusting your search or filters.</span>
        <swc-button-group slot="actions">
          <swc-button variant="accent">Clear filters</swc-button>
          <swc-button variant="secondary">Browse all</swc-button>
        </swc-button-group>
      `
    )
);

// Heading level range the base class documents (h2-h6). Written as literal
// cases since Lit templates can't take a dynamic tag name in tag position.
const headingLevelCases = [
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h2 slot="heading">Heading h2</h2>
      <span slot="description">Can be used for full-page empty states.</span>
    `
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h3 slot="heading">Heading h3</h3>
      <span slot="description">Can be used inside a page section.</span>
    `
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h4 slot="heading">Heading h4</h4>
      <span slot="description">Can be used inside a panel or card.</span>
    `
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h5 slot="heading">Heading h5</h5>
      <span slot="description">Can be used inside a nested section.</span>
    `
  ),
  renderIllustratedMessage(
    {},
    html`
      ${illustration()}
      <h6 slot="heading">Heading h6</h6>
      <span slot="description">Can be used at the deepest nesting level.</span>
    `
  ),
];

// Unclassed slotted headings inherit the slot's typography; a classed heading
// is left untouched by the `::slotted(...):not([class])` guard.
const classedHeadingCase = renderIllustratedMessage(
  {},
  html`
    ${illustration()}
    <h2
      slot="heading"
      class="vrt-custom-heading"
      style="color: green; font: italic 700 20px serif; margin: 0;"
    >
      Classed heading (unaffected)
    </h2>
    <span slot="description">
      This heading has its own class, so it keeps its own styles instead of
      inheriting the slot's typography.
    </span>
  `
);

// CJK content differs per language (not just an attribute swap), and each
// size crosses with its own CJK title-font-size token (small/medium/large all
// branch separately in illustrated-message.css), so render every size for
// every language rather than a single representative case.
const CJK_CONTENT: Record<
  'ja' | 'ko' | 'zh',
  { heading: string; description: string }
> = {
  ja: {
    heading: '承認ワークフローを開始',
    description: 'アップロードまたはインポートしてください。',
  },
  ko: {
    heading: '승인 워크플로 시작',
    description: '업로드하거나 가져와서 시작하세요.',
  },
  zh: {
    heading: '启动审批工作流',
    description: '上传或导入以开始使用。',
  },
};

const renderCjkCase = (
  lang: keyof typeof CJK_CONTENT,
  size: IllustratedMessageSize
) => {
  const { heading, description } = CJK_CONTENT[lang];
  return renderIllustratedMessage(
    { size, lang },
    html`
      ${illustration()}
      <h2 slot="heading">${heading}</h2>
      <span slot="description">${description}</span>
    `
  );
};

const WRAPPING_HEADING =
  'A heading long enough to wrap onto multiple lines within the illustrated message';
const WRAPPING_DESCRIPTION =
  'A description long enough to wrap across more than one line so the wrapping behavior is visible in the snapshot.';

const wrappingCases = [
  html`
    <div style="inline-size: 200px;">
      ${renderIllustratedMessage(
        {},
        html`
          ${illustration()}
          <h2 slot="heading">${WRAPPING_HEADING}</h2>
          <span slot="description">${WRAPPING_DESCRIPTION}</span>
        `
      )}
    </div>
  `,
  html`
    <div style="inline-size: 280px;">
      ${renderIllustratedMessage(
        { orientation: 'horizontal' },
        html`
          ${illustration()}
          <h2 slot="heading">${WRAPPING_HEADING}</h2>
          <span slot="description">${WRAPPING_DESCRIPTION}</span>
        `
      )}
    </div>
  `,
];

const permutationContent = () => html`
  ${groupPermutationsBy(BASE_PERMUTATIONS, 'orientation').map(
    ([orientation, perms]) => row(perms.map(renderBasePermutation), orientation)
  )}
  ${row(anatomyCases, 'Anatomy')}
  ${row(actionsSizePropagationCases, 'Actions · size propagation')}
  ${row(headingLevelCases, 'Heading levels')}
  ${row([classedHeadingCase], 'Classed heading override')}
  ${(['ja', 'ko', 'zh'] as const).map((lang) =>
    row(
      ILLUSTRATED_MESSAGE_VALID_SIZES.map((size) => renderCjkCase(lang, size)),
      lang
    )
  )}
  ${row(wrappingCases, 'Wrapping')}
`;

// VRT stories

// Every size x orientation combination, anatomy variations (including the
// no-illustration collapsed state), actions size propagation, the full h2-h6
// heading range, the classed-heading inheritance guard, CJK language x size
// (each language's own content, since the CSS branches per size), and text
// wrapping in both orientations. Rendered once in light/ltr and once in
// dark/rtl below (that combination covers both axes), all still in a single
// story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

// `forced-colors` is a real browser media feature Chromatic can emulate
// directly, unlike the (nonexistent, for this component) hover/focus/active
// states. Forced-colors mode replaces the whole page's palette, so it needs
// its own story/snapshot rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
};
