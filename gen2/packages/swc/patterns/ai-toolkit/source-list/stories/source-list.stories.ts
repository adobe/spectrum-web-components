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

import { html, nothing, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';
import '../swc-source-list.js';

import {
  SOURCE_LIST_TYPES,
  SOURCE_LIST_VALID_SIZES,
  SOURCE_LIST_VERBOSITIES,
  type SourceListSize,
  type SourceListType,
  type SourceListVerbosity,
} from '../SourceList.types.js';

// ────────────────
//    HELPERS
// ────────────────

const THUMBNAIL_SRC = './images/source-thumbnail.png';

interface Source {
  source?: string;
  href: string;
  title: string;
  description: string;
  value?: number;
}

const SOURCES: Source[] = [
  {
    source: 'Adobe.com',
    href: 'https://www.adobe.com',
    title: 'How do we do in-line sources?',
    description:
      'In-line sources place citations directly next to statements, creating a clear connection between output and source.',
  },
  {
    source: 'Spectrum',
    href: 'https://spectrum.adobe.com',
    title: 'Designing for generative AI experiences',
    description:
      'Show people where generated content comes from so they can judge its reliability for themselves.',
  },
  {
    source: 'Spectrum Web Components',
    href: 'https://opensource.adobe.com/spectrum-web-components',
    title: 'Accessible web components for Spectrum',
    description:
      'Web components that implement the Spectrum design language, built for accessibility and consistency.',
  },
];

const FRAME_STYLE = 'inline-size: 340px; max-inline-size: 100%;';

const item = ({
  source,
  href,
  title,
  description,
  value,
}: Source): TemplateResult => html`
  <swc-source-list-item
    source=${ifDefined(source)}
    thumbnail-src=${THUMBNAIL_SRC}
    value=${ifDefined(value)}
  >
    <a slot="link" href=${href}>${title}</a>
    <p slot="description">${description}</p>
  </swc-source-list-item>
`;

interface ListOptions {
  type?: SourceListType;
  size?: SourceListSize;
  verbosity?: SourceListVerbosity;
  start?: number;
  label?: string;
  sources?: Source[];
}

const list = ({
  type = 'ordered',
  size = 'm',
  verbosity = 'verbose',
  start,
  label = 'Sources',
  sources = SOURCES,
}: ListOptions = {}): TemplateResult => html`
  <swc-source-list
    style=${FRAME_STYLE}
    type=${type}
    size=${size}
    verbosity=${verbosity}
    start=${ifDefined(start)}
    accessible-label=${label}
  >
    ${sources.map(item)}
  </swc-source-list>
`;

const captioned = (
  caption: string,
  content: TemplateResult
): TemplateResult => html`
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <span class="swc-Detail swc-Detail--sizeS">${caption}</span>
    ${content}
  </div>
`;

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-source-list');

delete (args as Record<string, unknown>)['default-slot'];
delete (argTypes as Record<string, unknown>)['default-slot'];
delete (args as Record<string, unknown>)['heading-slot'];
delete (argTypes as Record<string, unknown>)['heading-slot'];

argTypes.type = {
  ...argTypes.type,
  control: { type: 'select' },
  options: SOURCE_LIST_TYPES,
};
argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: SOURCE_LIST_VALID_SIZES,
};
argTypes.verbosity = {
  ...argTypes.verbosity,
  control: { type: 'select' },
  options: SOURCE_LIST_VERBOSITIES,
};

/**
 * A list of the sources behind an AI response. `<swc-source-list>` renders a
 * native ordered or unordered list and sets the size and verbosity of every
 * `<swc-source-list-item>`, a clickable card that follows its source link.
 * Place the list in an inline region, a popover, or a drawer opened from the
 * response.
 */
const meta: Meta = {
  title: 'AI Toolkit/Source list',
  component: 'swc-source-list',
  args: {
    ...args,
    type: 'ordered',
    size: 'm',
    verbosity: 'verbose',
    'accessible-label': 'Sources',
  },
  argTypes,
  render: (args) => html`
    <div style=${FRAME_STYLE}>
      ${template(
        args,
        html`
          ${SOURCES.map(item)}
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      packagePath: 'patterns/ai-toolkit/source-list',
      subtitle: 'Clickable list of the sources behind an AI response.',
    },
    layout: 'padded',
    additionalApiTables: ['swc-source-list-item'],
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
  render: () => list(),
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-source-list style=${FRAME_STYLE}>
      <h3 slot="heading" class="swc-Title swc-Title--sizeS">Sources</h3>
      ${item(SOURCES[0])}
    </swc-source-list>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Verbosity: Story = {
  render: () => html`
    ${SOURCE_LIST_VERBOSITIES.map((verbosity) =>
      captioned(verbosity, list({ verbosity }))
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Sizes: Story = {
  render: () => html`
    ${SOURCE_LIST_VALID_SIZES.map((size) =>
      captioned(size === 's' ? 'Small' : 'Medium', list({ size }))
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const ListTypes: Story = {
  render: () => html`
    ${captioned('Ordered', list({ type: 'ordered', verbosity: 'regular' }))}
    ${captioned('Unordered', list({ type: 'unordered', verbosity: 'regular' }))}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

ListTypes.storyName = 'List types';

// ──────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────

export const Numbering: Story = {
  render: () => html`
    ${captioned('start="3"', list({ start: 3, verbosity: 'concise' }))}
    ${captioned(
      'Second item value="7"',
      list({
        verbosity: 'concise',
        sources: SOURCES.map((source, index) =>
          index === 1 ? { ...source, value: 7 } : source
        ),
      })
    )}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap' },
};

export const SourceFallback: Story = {
  render: () =>
    list({
      verbosity: 'regular',
      sources: SOURCES.map(({ source: _source, ...rest }) => rest),
    }),
  tags: ['behaviors'],
};

SourceFallback.storyName = 'Source fallback';

export const DescriptionLength: Story = {
  render: () =>
    list({
      sources: [
        { ...SOURCES[0], title: 'Recommended length' },
        {
          ...SOURCES[0],
          title: 'Longer than recommended',
          description:
            'In-line sources allow for integrated citations to be placed directly next to statements. They create a clear connection between output and source that lets readers scrutinize individual statements, and longer quotes push the next source further down the list.',
        },
      ],
    }),
  tags: ['behaviors'],
};

DescriptionLength.storyName = 'Description length';

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => list(),
  tags: ['a11y'],
};

// ────────────────────────────────
//    FULL PATTERN STORIES
// ────────────────────────────────

const popoverPattern = (modal: boolean): TemplateResult => {
  const id = modal ? 'sources-modal' : 'sources-popover';
  return html`
    <swc-action-button id="${id}-trigger">
      Sources, ${SOURCES.length}
    </swc-action-button>
    <swc-popover
      for="${id}-trigger"
      accessible-label="Sources"
      placement="bottom-start"
      ?modal=${modal}
    >
      ${list({ verbosity: modal ? 'verbose' : 'concise', label: '' })}
      ${modal
        ? html`
            <swc-action-button
              style="align-self: end; margin-block-start: 8px;"
              onclick="this.closest('swc-popover').open = false"
            >
              Close
            </swc-action-button>
          `
        : nothing}
    </swc-popover>
  `;
};

export const InPopover: Story = {
  render: () => popoverPattern(false),
  tags: ['full-pattern'],
};

InPopover.storyName = 'In a popover';

export const InModalDialog: Story = {
  render: () => popoverPattern(true),
  tags: ['full-pattern'],
};

InModalDialog.storyName = 'In a modal dialog';
