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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../swc-card-view.js';
import '../swc-card-view-option-1.js';
import '../swc-card-view-option-2.js';
import '../swc-card-view-option-3.js';
import '../swc-card-view-option-4.js';

const tags = [
  'swc-card-view',
  'swc-card-view-option-1',
  'swc-card-view-option-2',
  'swc-card-view-option-3',
  'swc-card-view-option-4',
];

const items = Array.from({ length: 8 }, (_, index) => ({
  id: `photo-${index}`,
  title: `Photo ${index + 1}`,
  description: 'A landscape photograph',
  image: '/images/card-preview.jpg',
  aspectRatio: index % 2 ? 0.8 : 1.5,
}));

type Prototype = HTMLElement & {
  items: typeof items;
  layout: string;
  selected: string[];
  updateComplete: Promise<boolean>;
};

const mount = async (canvas: HTMLElement, tag: string, layout = 'grid') => {
  expect(customElements.get(tag), `${tag} is registered`).toBeDefined();
  const view = document.createElement(tag) as Prototype;
  view.items = items;
  view.layout = layout;
  view.style.width = '760px';
  canvas.replaceChildren(view);
  await view.updateComplete;
  await waitFor(() => {
    expect(
      view.shadowRoot!.querySelector<HTMLElement>('.item')?.style.position
    ).toBe('absolute');
    expect(
      view
        .shadowRoot!.querySelector<HTMLElement>('swc-card')!
        .getBoundingClientRect().height
    ).toBeGreaterThan(0);
  });
  return view;
};

export default {
  title: 'Card view/Tests',
  tags: ['!autodocs', 'dev'],
  parameters: { docs: { disable: true, page: null } },
} satisfies Meta;

export const Registration: StoryObj = {
  render: () => html`
    <div>Card view registration</div>
  `,
  play: async () => {
    for (const tag of tags) {
      expect(customElements.get(tag), `${tag} is registered`).toBeDefined();
    }
  },
};

export const SelectionAndActions: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const tag of tags) {
      for (const layout of ['grid', 'waterfall']) {
        const view = await mount(canvasElement, tag, layout);
        const checkbox = view.shadowRoot!.querySelector<HTMLInputElement>(
          'input[type="checkbox"]'
        )!;
        checkbox.click();
        await view.updateComplete;
        expect(view.selected).toEqual(['photo-0']);
        const action = view.shadowRoot!.querySelector<HTMLButtonElement>(
          '[data-action="open"]'
        )!;
        let actions = 0;
        view.addEventListener('swc-card-view-action', () => actions++);
        action.click();
        await view.updateComplete;
        expect(actions).toBe(1);
        expect(view.selected).toEqual(['photo-0']);
      }
    }
  },
};

export const SemanticsAndNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const tag of tags) {
      const view = await mount(canvasElement, tag);
      const root = view.shadowRoot!;
      if (tag.endsWith('3')) {
        expect(root.querySelector('ul')).not.toBeNull();
        expect(root.querySelectorAll('li')).toHaveLength(8);
        expect(root.querySelector('[aria-selected]')).toBeNull();
        expect(
          [...root.querySelectorAll<HTMLInputElement>('input')].every(
            (control) => control.tabIndex === 0
          )
        ).toBe(true);
      } else if (tag.endsWith('4')) {
        expect(root.querySelector('[role="feed"]')).not.toBeNull();
        expect(root.querySelectorAll('article')).toHaveLength(8);
        const first = root.querySelector<HTMLElement>('article')!;
        first.focus();
        first.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'PageDown',
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
        expect(root.activeElement?.getAttribute('data-index')).toBe('1');
      } else {
        expect(
          root.querySelector('[role="grid"]')?.getAttribute('aria-colcount')
        ).toBe('1');
        expect(root.querySelectorAll('[role="row"]')).toHaveLength(8);
        const first = root.querySelector<HTMLElement>('[data-focus]')!;
        first.focus();
        first.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowRight',
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
        expect(root.activeElement?.getAttribute('data-index')).toBe('1');
        const second = root.activeElement as HTMLElement;
        second.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: ' ',
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
        expect(view.selected).toEqual(['photo-1']);
      }
    }
  },
};

export const WrappingReachesEveryCard: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
      const view = await mount(canvasElement, 'swc-card-view-option-2', layout);
      const root = view.shadowRoot!;
      root.querySelector<HTMLElement>('[data-focus]')!.focus();
      const visited = new Set<string>();
      for (let move = 0; move < 8; move++) {
        const target = root.activeElement as HTMLElement;
        visited.add(target.dataset.index!);
        target.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
      }
      expect(visited.size).toBe(8);
      const reverse = new Set<string>();
      for (let move = 0; move < 8; move++) {
        const target = root.activeElement as HTMLElement;
        reverse.add(target.dataset.index!);
        target.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
      }
      expect(reverse.size).toBe(8);
    }
  },
};

export const FeedExitAndReflow: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const view = await mount(canvasElement, 'swc-card-view-option-4');
    const root = view.shadowRoot!;
    const checkbox = root.querySelector<HTMLInputElement>('input')!;
    checkbox.focus();
    checkbox.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'PageDown',
        bubbles: true,
        composed: true,
      })
    );
    await view.updateComplete;
    const article = root.activeElement as HTMLElement;
    expect(article.dataset.index).toBe('1');
    const exits: string[] = [];
    view.addEventListener('swc-card-view-exit', (event) => {
      exits.push(
        (event as CustomEvent<{ direction: string }>).detail.direction
      );
    });
    for (const key of ['Home', 'End']) {
      article.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          ctrlKey: true,
          bubbles: true,
          composed: true,
        })
      );
    }
    expect(exits).toEqual(['before', 'after']);
    view.layout = 'waterfall';
    view.style.width = '340px';
    await view.updateComplete;
    await waitFor(() => {
      expect(
        root.querySelector<HTMLElement>('.item')!.getBoundingClientRect().width
      ).toBe(340);
    });
    expect(root.activeElement).toBe(article);
  },
};
