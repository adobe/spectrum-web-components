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

import '../../swc-prompt-field.js';

import {
  createPermutations,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Conversational AI/Prompt field/Prompt field VRT',
  component: 'swc-prompt-field',
  tags: ['dev'],
};

export default meta;

// Helpers

const AI_BRAND_VARIANTS = ['subtle', 'balanced', 'prominent'] as const;

// variant x generating only: this story exists to baseline the AI brand
// treatment's ring/hue-sweep/gloss/inset-shadow layering ahead of DOM/CSS
// simplification work, not to cover the pattern's full anatomy/behaviors.
const AI_BRAND_PERMUTATIONS = createPermutations([
  { variant: AI_BRAND_VARIANTS, generating: [false, true] },
]);

const legalDisclaimerSlot = html`
  <p slot="legal" class="swc-Typography--links">
    Responses are generated using AI, and may be inaccurate. Check before using.
    <a
      href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
    >
      AI User Guidelines
    </a>
  </p>
`;

const renderAiBrandPermutation = ({
  variant,
  generating,
}: {
  variant: (typeof AI_BRAND_VARIANTS)[number];
  generating: boolean;
}) => html`
  <swc-prompt-field
    label="Prompt"
    variant=${variant}
    ?generating=${generating}
    value="Summarize the API changes in this branch."
  >
    ${legalDisclaimerSlot}
  </swc-prompt-field>
`;

const permutationContent = () =>
  groupPermutationsBy(AI_BRAND_PERMUTATIONS, 'variant').map(
    ([variant, permutations]) =>
      row(permutations.map(renderAiBrandPermutation), variant)
  );

// VRT stories

// Every AI brand treatment variant (subtle, balanced, prominent) x
// generating state (idle, generating): 6 permutations. Rendered once in
// light/ltr and once in dark/rtl (that combination covers both axes) in a
// single story so it costs one snapshot.
export const Variants: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};
