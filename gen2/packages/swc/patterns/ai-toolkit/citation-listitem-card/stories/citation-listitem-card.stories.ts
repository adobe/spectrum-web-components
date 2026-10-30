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

import { html, TemplateResult } from 'lit';
import type {
  Decorator,
  Meta,
  StoryObj as Story,
} from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';
import '../swc-citation-card.js';
import '../swc-citation-listitem-card.js';

import globalStyles from '../citation-listitem-card.global.css';

// ────────────────
//    HELPERS
// ────────────────

const THUMBNAIL_SRC = './images/citation-thumbnail.png';

interface Citation {
  source: string;
  href: string;
  title: string;
  description: string;
}

const CITATIONS: Citation[] = [
  {
    source: 'Adobe.com',
    href: 'https://www.adobe.com',
    title: 'How do we do in-line sources?',
    description:
      '“In-line sources place citations directly next to statements, creating a clear connection between output and source.”',
  },
  {
    source: 'spectrum.adobe.com',
    href: 'https://spectrum.adobe.com',
    title: 'Designing for generative AI experiences',
    description:
      '“Show people where generated content comes from so they can judge its reliability for themselves.”',
  },
  {
    source: 'opensource.adobe.com',
    href: 'https://opensource.adobe.com/spectrum-web-components',
    title: 'Spectrum Web Components',
    description:
      '“Web components implementation of the Spectrum design language, built for accessibility and consistency.”',
  },
];

// Form A's stylesheet is a document-level prototype stylesheet, so it's
// adopted by the document rather than a shadow root.
const withCitationGlobalStyles: Decorator = (story) => {
  const sheet = globalStyles.styleSheet;
  if (sheet && !document.adoptedStyleSheets.includes(sheet)) {
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }
  return story();
};

const LIST_STYLE = 'inline-size: 310px; margin: 0; padding: 0;';
const UNSTYLED_LIST_STYLE = `${LIST_STYLE} list-style: none;`;
const NUMBERED_LIST_STYLE = `${LIST_STYLE} padding-inline-start: 24px;`;

/** Slotted content shared by forms B and C. */
const citationSlots = ({
  source,
  href,
  title,
  description,
}: Citation): TemplateResult => html`
  <swc-thumbnail slot="thumbnail">
    <img src=${THUMBNAIL_SRC} alt="" />
  </swc-thumbnail>
  <span slot="source">${source}</span>
  <a slot="citation-link" href=${href}>
    <h3 class="swc-Title swc-Title--sizeM">${title}</h3>
  </a>
  <blockquote slot="citation-description" cite=${href}>
    ${description}
  </blockquote>
`;

/** Form A: CSS-only pattern on a native `<li>`. */
const formA = ({
  source,
  href,
  title,
  description,
}: Citation): TemplateResult => html`
  <li class="swc-CitationListitemCard">
    <div class="swc-CitationListitemCard-lockup">
      <swc-thumbnail size="75" decorative>
        <img src=${THUMBNAIL_SRC} alt="" />
      </swc-thumbnail>
      <span class="swc-Body swc-CitationListitemCard-source">${source}</span>
    </div>
    <div class="swc-CitationListitemCard-content">
      <a
        class="swc-Link swc-Link--secondary swc-CitationListitemCard-link"
        href=${href}
      >
        <h3 class="swc-Title swc-Title--sizeM">${title}</h3>
      </a>
      <blockquote
        class="swc-Body swc-Body--sizeS swc-CitationListitemCard-description"
        cite=${href}
      >
        ${description}
      </blockquote>
    </div>
  </li>
`;

/** Form B: `<swc-citation-card>` inside a native `<li>`. */
const formB = (citation: Citation): TemplateResult => html`
  <li>
    <swc-citation-card>${citationSlots(citation)}</swc-citation-card>
  </li>
`;

/** Form C: `<swc-citation-listitem-card>` directly in the list. */
const formC = (citation: Citation): TemplateResult => html`
  <swc-citation-listitem-card>
    ${citationSlots(citation)}
  </swc-citation-listitem-card>
`;

const FORMS = [
  { label: 'A. CSS-only native <li>', render: formA },
  { label: 'B. <swc-citation-card> in <li>', render: formB },
  { label: 'C. <swc-citation-listitem-card>', render: formC },
];

const comparison = (ordered: boolean): TemplateResult => html`
  ${FORMS.map(
    ({ label, render }) => html`
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <span class="swc-Detail swc-Detail--sizeS">${label}</span>
        ${ordered
          ? html`
              <ol style=${NUMBERED_LIST_STYLE}>
                ${CITATIONS.map(render)}
              </ol>
            `
          : html`
              <ul style=${UNSTYLED_LIST_STYLE}>
                ${CITATIONS.map(render)}
              </ul>
            `}
      </div>
    `
  )}
`;

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers(
  'swc-citation-listitem-card'
);

/**
 * Prototype of a card describing one source cited by an AI response, built in
 * three candidate forms for comparison: a CSS-only pattern on a native `<li>`,
 * `<swc-citation-card>` inside an `<li>`, and `<swc-citation-listitem-card>`,
 * which is itself a list item.
 */
const meta: Meta = {
  title: 'AI Toolkit/Citation listitem card',
  component: 'swc-citation-listitem-card',
  args: {
    ...args,
    'thumbnail-slot': `<swc-thumbnail><img src="${THUMBNAIL_SRC}" alt="" /></swc-thumbnail>`,
    'source-slot': CITATIONS[0].source,
    'citation-link-slot': `<a href="${CITATIONS[0].href}"><h3 class="swc-Title swc-Title--sizeM">${CITATIONS[0].title}</h3></a>`,
    'citation-description-slot': `<blockquote cite="${CITATIONS[0].href}">${CITATIONS[0].description}</blockquote>`,
  },
  argTypes: {
    ...argTypes,
    role: { table: { disable: true }, control: false },
  },
  render: (args) => html`
    <ul style=${UNSTYLED_LIST_STYLE}>
      ${template(args)}
    </ul>
  `,
  decorators: [withCitationGlobalStyles],
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/citation-listitem-card',
      subtitle:
        'Clickable list item describing a source cited by an AI response.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <ul style=${UNSTYLED_LIST_STYLE}>
      ${CITATIONS.map(formC)}
    </ul>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const FormComparison: Story = {
  render: () => comparison(false),
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

FormComparison.storyName = 'Form comparison';

export const OrderedLists: Story = {
  render: () => comparison(true),
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

OrderedLists.storyName = 'Ordered lists';

export const DescriptionLength: Story = {
  render: () => html`
    <ul style=${UNSTYLED_LIST_STYLE}>
      ${formC({
        ...CITATIONS[0],
        title: 'Recommended length',
        description:
          '“In-line sources place citations directly next to statements, creating a clear connection between output and source that readers can check.”',
      })}
      ${formC({
        ...CITATIONS[0],
        title: 'Longer than recommended',
        description:
          '“In-line sources allow for integrated citations to be placed directly next to statements. It creates a clear connection between output and source that can expect readers to scrutinize individual statements, and longer quotes push the next source further down the list.”',
      })}
    </ul>
  `,
  tags: ['options'],
};

DescriptionLength.storyName = 'Description length';

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <ol style=${NUMBERED_LIST_STYLE} aria-label="Sources">
      ${CITATIONS.map(formC)}
    </ol>
  `,
  tags: ['a11y'],
};
