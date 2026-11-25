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

import { html, render, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';
import '@adobe/spectrum-wc-icons/swc-icon-link.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';
import '../../conversation-thread/swc-conversation-thread.js';
import '../../conversation-turn/swc-conversation-turn.js';
import '../../message-feedback/swc-message-feedback.js';
import '../../prompt-field/swc-prompt-field.js';
import '../../system-message/swc-system-message.js';
import '../../user-message/swc-user-message.js';
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

const CITED = SOURCES.slice(0, 2);

export const CitationInPopover: Story = {
  render: () => html`
    <p class="swc-Body" style="max-inline-size: 480px;">
      In-line sources place citations directly next to the statements they
      support.
      <swc-action-button
        id="citation-trigger"
        size="xs"
        accessible-label="${CITED[0].source} +${CITED.length - 1} more source"
      >
        ${CITED[0].source} +${CITED.length - 1}
      </swc-action-button>
    </p>
    <swc-popover
      for="citation-trigger"
      accessible-label="Sources"
      placement="bottom-start"
    >
      ${list({ label: '', sources: CITED })}
    </swc-popover>
  `,
  tags: ['full-pattern'],
};

CitationInPopover.storyName = 'Citation in a popover';

const PAGE_SECTIONS = [
  {
    heading: 'Setting goals',
    paragraphs: [
      'Quarterly planning brings every team together around a shared set of goals. Each team reviews last quarter, then drafts the outcomes it wants to reach next.',
      'Drafts move through a short review. Leads check that goals are measurable, that dependencies are named, and that the plan fits the people available.',
      'Goals that depend on another team are flagged early, so both teams can agree on timing before either commits to a date.',
    ],
  },
  {
    heading: 'Tracking progress',
    paragraphs: [
      'Once goals are agreed, teams break them into milestones. Milestones keep work visible and give everyone a regular point to adjust the plan.',
      'Halfway through the quarter, teams check progress against each milestone. Goals that no longer fit are revised rather than quietly dropped.',
      'Progress updates stay short: what moved, what is blocked, and what help is needed. Longer discussions move to a separate meeting.',
    ],
  },
  {
    heading: 'Looking back',
    paragraphs: [
      "At the end of the quarter, each team writes a short retrospective. It records what worked, what didn't, and what to carry into the next plan.",
      'Retrospectives are shared across teams, so lessons from one group can shape the plans of another before the next cycle begins.',
      'Over several quarters, these notes become a record of how the organization plans, and a starting point for improving the process itself.',
    ],
  },
];

const SIDE_PANEL_STYLES = html`
  <style>
    .source-list-demo {
      display: flex;
      block-size: 100dvh;
      overflow: hidden;
      background: var(--swc-background-base-color);
    }

    .source-list-demo-main {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 16px;
      min-inline-size: 0;
      overflow: auto;
      padding: 32px;
    }

    .source-list-demo-main > * {
      max-inline-size: 640px;
    }

    .source-list-demo-panel {
      position: relative;
      display: flex;
      flex: none;
      flex-direction: column;
      inline-size: 360px;
      max-inline-size: 100%;
      overflow: clip;
      background: var(--swc-background-base-color);
      border-inline-start: 1px solid var(--swc-gray-200);
    }

    .source-list-demo-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-block-size: 48px;
      padding-inline: 16px;
      border-block-end: 1px solid var(--swc-gray-200);
    }

    .source-list-demo-header > h2 {
      margin: 0;
    }

    .source-list-demo-thread {
      flex: 1;
      overflow: auto;
      padding: 16px;
    }

    .source-list-demo-composer {
      flex: none;
      padding: 8px 16px 16px;
    }

    .source-list-demo-feedback {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .source-list-demo-drawer {
      position: absolute;
      inset: 0;
      display: none;
      flex-direction: column;
      inline-size: auto;
      block-size: auto;
      max-inline-size: none;
      max-block-size: none;
      margin: 0;
      padding: 0;
      color: inherit;
      background: var(--swc-background-base-color);
      border: 0;
      translate: 100% 0;
      transition:
        translate 200ms ease-out,
        display 200ms allow-discrete;
    }

    .source-list-demo-drawer[open] {
      display: flex;
      translate: 0 0;
    }

    @starting-style {
      .source-list-demo-drawer[open] {
        translate: 100% 0;
      }
    }

    .source-list-demo-drawer:focus {
      outline: none;
    }

    .source-list-demo-drawer-body {
      flex: 1;
      overflow: auto;
      padding: 8px;
    }

    @media (prefers-reduced-motion: reduce) {
      .source-list-demo-drawer {
        transition: none;
      }
    }
  </style>
`;

/**
 * A page with scrollable main content and the full conversational AI pattern
 * docked in a full-height side panel on the right edge.
 */
const sidePanelPage = (
  id: string,
  response: TemplateResult,
  drawer?: TemplateResult
): TemplateResult => html`
  ${SIDE_PANEL_STYLES}
  <div class="source-list-demo">
    <main class="source-list-demo-main" tabindex="0">
      <h1 class="swc-Heading swc-Heading--sizeL">Quarterly planning</h1>
      ${PAGE_SECTIONS.map(
        ({ heading, paragraphs }) => html`
          <h2 class="swc-Heading swc-Heading--sizeS">${heading}</h2>
          ${paragraphs.map(
            (paragraph) => html`
              <p class="swc-Body swc-Body--sizeM">${paragraph}</p>
            `
          )}
        `
      )}
    </main>
    <aside class="source-list-demo-panel" aria-labelledby="${id}-title">
      <div class="source-list-demo-header">
        <h2 id="${id}-title" class="swc-Title swc-Title--sizeS">
          AI assistant
        </h2>
      </div>
      <div class="source-list-demo-thread">
        <swc-conversation-thread>
          <swc-conversation-turn type="user">
            <swc-user-message>
              How should an AI response show its sources?
            </swc-user-message>
          </swc-conversation-turn>
          <swc-conversation-turn type="system">
            ${response}
          </swc-conversation-turn>
        </swc-conversation-thread>
      </div>
      <div class="source-list-demo-composer">
        <swc-prompt-field
          size="s"
          placeholder="Ask a follow-up"
        ></swc-prompt-field>
      </div>
      ${drawer}
    </aside>
  </div>
`;

const SIDE_PANEL_PARAMETERS = {
  layout: 'fullscreen',
  docs: { story: { inline: false, height: '640px' } },
};

const toggleSourcesList = (event: Event): void => {
  const trigger = event.currentTarget as HTMLElement;
  const sources = trigger
    .closest('swc-system-message')
    ?.querySelector<HTMLElement>('[slot="sources"]');
  if (!sources) {
    return;
  }
  sources.hidden = !sources.hidden;
  trigger.setAttribute('aria-expanded', String(!sources.hidden));
};

export const InSidePanel: Story = {
  render: () =>
    sidePanelPage(
      'inline-panel',
      html`
        <swc-system-message>
          <div class="swc-Typography--prose">
            <p>
              Show sources next to the claims they support, so people can check
              them without leaving the response.
            </p>
          </div>
          <div slot="feedback" class="source-list-demo-feedback">
            <swc-message-feedback></swc-message-feedback>
            <swc-action-button
              quiet
              size="s"
              aria-expanded="true"
              @click=${toggleSourcesList}
            >
              <swc-icon-link slot="icon"></swc-icon-link>
              Sources
            </swc-action-button>
          </div>
          <div slot="sources">${list({ size: 's', verbosity: 'regular' })}</div>
        </swc-system-message>
      `
    ),
  parameters: SIDE_PANEL_PARAMETERS,
  tags: ['full-pattern'],
};

InSidePanel.storyName = 'In a side panel';

const drawerTriggers = new WeakMap<HTMLDialogElement, HTMLElement>();

/** Takes everything the drawer covers out of the tab order, or restores it. */
const setPanelInert = (drawer: HTMLDialogElement, inert: boolean): void => {
  for (const child of drawer.parentElement?.children ?? []) {
    if (child !== drawer) {
      child.toggleAttribute('inert', inert);
    }
  }
};

const closeDrawer = (drawer: HTMLDialogElement): void => {
  const trigger = drawerTriggers.get(drawer);
  const hadFocus = drawer.contains(document.activeElement);
  drawer.close();
  setPanelInert(drawer, false);
  trigger?.setAttribute('aria-expanded', 'false');
  if (hadFocus) {
    trigger?.focus();
  }
};

/** Sources at the given indexes, numbered as they are in the full list. */
const sourcesAt = (indexes: number[]): Source[] =>
  indexes.map((index) => ({ ...SOURCES[index], value: index + 1 }));

const openDrawer = (event: Event): void => {
  const trigger = event.currentTarget as HTMLElement;
  const drawer = trigger
    .closest('aside')
    ?.querySelector<HTMLDialogElement>('.source-list-demo-drawer');
  const body = drawer?.querySelector<HTMLElement>(
    '.source-list-demo-drawer-body'
  );
  if (!drawer || !body) {
    return;
  }
  const indexes = (trigger.dataset.sources ?? '')
    .split(',')
    .filter(Boolean)
    .map(Number);
  render(
    list({
      size: 's',
      label: '',
      sources: indexes.length ? sourcesAt(indexes) : SOURCES,
    }),
    body
  );
  drawerTriggers.set(drawer, trigger);
  trigger.setAttribute('aria-expanded', 'true');
  setPanelInert(drawer, true);
  drawer.show();
  // The drawer starts off-panel while it slides in; focusing it must not
  // scroll the panel sideways.
  drawer.focus({ preventScroll: true });
};

const handleDrawerKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDrawer(event.currentTarget as HTMLDialogElement);
  }
};

const handleDrawerClose = (event: Event): void => {
  closeDrawer(
    (event.currentTarget as HTMLElement).closest('dialog') as HTMLDialogElement
  );
};

const sourcesDrawer = html`
  <dialog
    class="source-list-demo-drawer"
    aria-labelledby="sources-drawer-title"
    tabindex="-1"
    @keydown=${handleDrawerKeydown}
  >
    <div class="source-list-demo-header">
      <h2 id="sources-drawer-title" class="swc-Title swc-Title--sizeS">
        Sources
      </h2>
      <swc-close-button
        accessible-label="Close"
        @click=${handleDrawerClose}
      ></swc-close-button>
    </div>
    <div class="source-list-demo-drawer-body"></div>
  </dialog>
`;

/** An inline citation for the sources at the given indexes. */
const citation = (indexes: number[]): TemplateResult => {
  const [first] = sourcesAt(indexes);
  const more = indexes.length - 1;
  const label = more ? `${first.source} +${more}` : `${first.source}`;
  return html`
    <swc-action-button
      size="xs"
      accessible-label=${more ? `Sources: ${label} more` : `Source: ${label}`}
      aria-haspopup="dialog"
      aria-expanded="false"
      data-sources=${indexes.join(',')}
      @click=${openDrawer}
    >
      ${label}
    </swc-action-button>
  `;
};

export const InSidePanelDrawer: Story = {
  render: () =>
    sidePanelPage(
      'drawer-panel',
      html`
        <swc-system-message>
          <div class="swc-Typography--prose">
            <p>
              Show sources next to the claims they support, so people can check
              them without leaving the response. ${citation([0, 1])}
            </p>
            <p>
              Use accessible, consistent components for every source, and show
              only one source type in an experience. ${citation([2])}
            </p>
          </div>
          <div slot="feedback" class="source-list-demo-feedback">
            <swc-message-feedback></swc-message-feedback>
            <swc-action-button
              quiet
              size="s"
              aria-haspopup="dialog"
              aria-expanded="false"
              @click=${openDrawer}
            >
              <swc-icon-link slot="icon"></swc-icon-link>
              Sources
            </swc-action-button>
          </div>
        </swc-system-message>
      `,
      sourcesDrawer
    ),
  parameters: SIDE_PANEL_PARAMETERS,
  tags: ['full-pattern'],
};

InSidePanelDrawer.storyName = 'In a side panel drawer';
