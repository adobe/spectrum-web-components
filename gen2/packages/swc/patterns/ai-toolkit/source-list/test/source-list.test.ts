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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../swc-source-list.js';

import {
  fixture,
  getComponent,
  withWarningSpy,
} from '../../../../utils/test-utils.js';
import { SourceListItem } from '../source-list-item/SourceListItem.js';
import { SourceList } from '../SourceList.js';
import meta, { Overview } from '../stories/source-list.stories.js';

export default {
  ...meta,
  title: 'AI Toolkit/Source list/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────

const nextFrame = (): Promise<void> =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

/** Waits for slot assignment, propagation, and every item's update. */
async function settle(list: SourceList): Promise<SourceListItem[]> {
  await list.updateComplete;
  await nextFrame();
  const items = [
    ...list.querySelectorAll<SourceListItem>('swc-source-list-item'),
  ];
  await Promise.all(items.map((item) => item.updateComplete));
  await nextFrame();
  return items;
}

const listElement = (list: SourceList): HTMLElement =>
  list.shadowRoot!.querySelector<HTMLElement>('.swc-SourceList-list')!;

const part = (item: SourceListItem, selector: string): HTMLElement | null =>
  item.shadowRoot!.querySelector<HTMLElement>(selector);

const sourceList = (
  items = html`
    <swc-source-list-item
      source="Adobe.com"
      thumbnail-src="./images/source-thumbnail.png"
    >
      <a slot="link" href="https://www.adobe.com">
        How do we do in-line sources?
      </a>
      <p slot="description">
        In-line sources place citations next to statements.
      </p>
    </swc-source-list-item>
  `
) => html`
  <swc-source-list accessible-label="Sources">${items}</swc-source-list>
`;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const list = await getComponent<SourceList>(
      canvasElement,
      'swc-source-list'
    );
    const items = await settle(list);
    const [first] = items;

    await step(
      'renders a native ordered list without an added role',
      async () => {
        const ol = listElement(list);
        expect(ol.localName).toBe('ol');
        expect(ol.hasAttribute('role'), 'no duplicated native role').toBe(
          false
        );
        expect(ol.getAttribute('aria-label')).toBe('Sources');
      }
    );

    await step(
      'gives every item listitem semantics and the list settings',
      async () => {
        for (const item of items) {
          expect(item.getAttribute('role')).toBe('listitem');
          expect(item.getAttribute('size')).toBe('m');
          expect(item.getAttribute('verbosity')).toBe('verbose');
          expect(item.hasAttribute('ordered')).toBe(true);
        }
      }
    );

    await step(
      'renders a hidden number box and every verbose part',
      async () => {
        expect(
          part(first, '.swc-SourceListItem-marker')?.getAttribute('aria-hidden')
        ).toBe('true');
        expect(
          part(first, '.swc-SourceListItem-source')?.textContent?.trim()
        ).toBe('Adobe.com');
        const thumbnail = part(first, 'swc-thumbnail');
        expect(thumbnail?.getAttribute('size')).toBe('75');
        expect(thumbnail?.hasAttribute('decorative')).toBe(true);
        const quote = part(first, 'blockquote');
        expect(quote?.getAttribute('cite')).toBe('https://www.adobe.com/');
        expect(
          part(first, '.swc-SourceListItem-title')?.classList.contains(
            'swc-Title--sizeM'
          )
        ).toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: List types
// ──────────────────────────────────────────────────────────────

export const UnorderedTest: Story = {
  render: () => sourceList(),
  play: async ({ canvasElement, step }) => {
    const list = await getComponent<SourceList>(
      canvasElement,
      'swc-source-list'
    );
    list.type = 'unordered';
    const [item] = await settle(list);

    await step(
      'renders a native unordered list without number boxes',
      async () => {
        expect(listElement(list).localName).toBe('ul');
        expect(item.hasAttribute('ordered')).toBe(false);
        expect(part(item, '.swc-SourceListItem-marker')).toBeNull();
      }
    );

    await step('forwards start to the ordered list', async () => {
      list.type = 'ordered';
      list.start = 4;
      await settle(list);
      expect(listElement(list).getAttribute('start')).toBe('4');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Verbosity and size
// ──────────────────────────────────────────────────────────────

export const VerbosityTest: Story = {
  render: () => sourceList(),
  play: async ({ canvasElement, step }) => {
    const list = await getComponent<SourceList>(
      canvasElement,
      'swc-source-list'
    );
    const [item] = await settle(list);

    await step('regular drops the description', async () => {
      list.verbosity = 'regular';
      await settle(list);
      expect(item.verbosity).toBe('regular');
      expect(part(item, 'blockquote')).toBeNull();
      expect(part(item, '.swc-SourceListItem-lockup')).not.toBeNull();
    });

    await step('concise also drops the thumbnail and source', async () => {
      list.verbosity = 'concise';
      await settle(list);
      expect(part(item, '.swc-SourceListItem-lockup')).toBeNull();
      expect(part(item, 'slot[name="link"]')).not.toBeNull();
    });

    await step('small size steps the title and thumbnail down', async () => {
      list.verbosity = 'verbose';
      list.size = 's';
      await settle(list);
      expect(item.size).toBe('s');
      expect(
        part(item, '.swc-SourceListItem-title')?.classList.contains(
          'swc-Title--sizeS'
        )
      ).toBe(true);
      expect(part(item, 'swc-thumbnail')?.getAttribute('size')).toBe('50');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Source fallback
// ──────────────────────────────────────────────────────────────

export const SourceFallbackTest: Story = {
  ...Overview,
  play: async ({ step }) => {
    await step('falls back to the link hostname without www', async () => {
      const list = await fixture<SourceList>(
        sourceList(html`
          <swc-source-list-item>
            <a slot="link" href="https://www.adobe.com/products">
              Adobe products
            </a>
          </swc-source-list-item>
        `)
      );
      const [item] = await settle(list);
      expect(
        part(item, '.swc-SourceListItem-source')?.textContent?.trim()
      ).toBe('adobe.com');
      list.parentElement!.remove();
    });

    await step('shows no source and notices non-http links', async () =>
      withWarningSpy(async (warnCalls) => {
        const list = await fixture<SourceList>(
          sourceList(html`
            <swc-source-list-item>
              <a slot="link" href="mailto:team@adobe.com">Email the team</a>
            </swc-source-list-item>
          `)
        );
        const [item] = await settle(list);
        expect(part(item, '.swc-SourceListItem-source')).toBeNull();
        expect(
          warnCalls.some((call) => String(call[1]).includes('"source"'))
        ).toBe(true);
        list.parentElement!.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Labelling
// ──────────────────────────────────────────────────────────────

export const LabellingTest: Story = {
  ...Overview,
  play: async ({ step }) => {
    await step(
      'a slotted heading labels the list instead of accessible-label',
      async () => {
        const list = await fixture<SourceList>(html`
          <swc-source-list accessible-label="Ignored">
            <h3 slot="heading">Sources</h3>
            <swc-source-list-item>
              <a slot="link" href="https://www.adobe.com">Adobe</a>
            </swc-source-list-item>
          </swc-source-list>
        `);
        await settle(list);
        const ol = listElement(list);
        expect(ol.hasAttribute('aria-label')).toBe(false);
        if ('ariaLabelledByElements' in ol) {
          expect(ol.ariaLabelledByElements?.[0]).toBe(list.querySelector('h3'));
        }
        list.parentElement!.remove();
      }
    );

    await step(
      'labelElement names the list from an existing element',
      async () => {
        const heading = document.createElement('h2');
        heading.textContent = 'Response sources';
        document.body.append(heading);
        const list = await fixture<SourceList>(sourceList());
        list.labelElement = heading;
        await settle(list);
        const ol = listElement(list);
        expect(ol.hasAttribute('aria-label')).toBe(false);
        if ('ariaLabelledByElements' in ol) {
          expect(ol.ariaLabelledByElements?.[0]).toBe(heading);
        }
        heading.remove();
        list.parentElement!.remove();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Item behavior
// ──────────────────────────────────────────────────────────────

export const ItemBehaviorTest: Story = {
  render: () => sourceList(),
  play: async ({ canvasElement, step }) => {
    const list = await getComponent<SourceList>(
      canvasElement,
      'swc-source-list'
    );
    const [item] = await settle(list);

    await step('value is applied to the list-item counter', async () => {
      item.value = 7;
      await item.updateComplete;
      expect(item.style.getPropertyValue('--_swc-source-list-item-value')).toBe(
        '7'
      );
      item.value = undefined;
      await item.updateComplete;
      expect(item.style.getPropertyValue('--_swc-source-list-item-value')).toBe(
        ''
      );
    });

    await step('heading-level exposes the title as a heading', async () => {
      item.headingLevel = 3;
      await item.updateComplete;
      const title = part(item, '.swc-SourceListItem-title');
      expect(title?.getAttribute('role')).toBe('heading');
      expect(title?.getAttribute('aria-level')).toBe('3');
      item.headingLevel = undefined;
      await item.updateComplete;
      expect(title?.hasAttribute('role')).toBe(false);
    });

    await step('clicking anywhere on the card lands on the link', async () => {
      const description = item.querySelector('[slot="description"]')!;
      description.scrollIntoView({ block: 'center' });
      const rect = description.getBoundingClientRect();
      const target = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );
      expect(target).toBe(item.querySelector('a'));
    });

    await step('keeps a role the consumer set', async () => {
      const custom = await fixture<SourceListItem>(html`
        <swc-source-list-item role="presentation">
          <a slot="link" href="https://www.adobe.com">Adobe</a>
        </swc-source-list-item>
      `);
      expect(custom.getAttribute('role')).toBe('presentation');
      custom.parentElement!.remove();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev-mode validation
// ──────────────────────────────────────────────────────────────

const linkWarnings = async (link: unknown): Promise<string[]> => {
  let messages: string[] = [];
  await withWarningSpy(async (warnCalls) => {
    const list = await fixture<SourceList>(
      sourceList(html`
        <swc-source-list-item>${link}</swc-source-list-item>
      `)
    );
    await settle(list);
    messages = warnCalls.map((call) => String(call[1]));
    list.parentElement!.remove();
  });
  return messages;
};

export const ValidationTest: Story = {
  ...Overview,
  play: async ({ step }) => {
    await step('warns when the link slot is empty', async () => {
      const messages = await linkWarnings(nothing);
      expect(messages.some((message) => message.includes('has no link'))).toBe(
        true
      );
    });

    await step(
      'warns when the link slot holds a non-link element',
      async () => {
        const messages = await linkWarnings(html`
          <span slot="link">Adobe</span>
        `);
        expect(
          messages.some((message) => message.includes('expects an <a href>'))
        ).toBe(true);
      }
    );

    await step('warns when the link has no href', async () => {
      const messages = await linkWarnings(html`
        <a slot="link">Adobe</a>
      `);
      expect(
        messages.some((message) => message.includes('without "href"'))
      ).toBe(true);
    });

    await step('warns when the link has no text', async () => {
      const messages = await linkWarnings(html`
        <a slot="link" href="https://www.adobe.com"></a>
      `);
      expect(
        messages.some((message) => message.includes('no accessible name'))
      ).toBe(true);
    });

    await step(
      'warns when the link slot holds more than one element',
      async () => {
        const messages = await linkWarnings(html`
          <a slot="link" href="https://www.adobe.com">Adobe</a>
          <a slot="link" href="https://spectrum.adobe.com">Spectrum</a>
        `);
        expect(
          messages.some((message) => message.includes('Only the first'))
        ).toBe(true);
      }
    );

    await step('does not warn for a valid link', async () => {
      const messages = await linkWarnings(html`
        <a slot="link" href="https://www.adobe.com">Adobe</a>
      `);
      expect(messages).toEqual([]);
    });

    await step('warns when the list holds other elements', async () =>
      withWarningSpy(async (warnCalls) => {
        const list = await fixture<SourceList>(
          sourceList(html`
            <li>Not an item</li>
          `)
        );
        await settle(list);
        expect(
          warnCalls.some((call) => String(call[1]).includes('only supports'))
        ).toBe(true);
        list.parentElement!.remove();
      })
    );
  },
};
