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

import type { CardViewItem } from '@adobe/spectrum-wc-core/components/card-view/index.js';

import '../swc-card-view-single-column-grid.js';
import '../swc-card-view-list.js';
import '../swc-card-view-feed.js';
import '../swc-card-view-single-row-grid.js';
import '../swc-card-view-toolbar.js';
import '../swc-card-view-fieldset.js';
import '../swc-card-view-grid-nowrap.js';
import '../swc-card-view-grid-loop.js';
import '../swc-card-view-grid-advance.js';
import '../swc-card-view-grid-semantic.js';
import '../swc-card-view-masonry-nowrap.js';
import '../swc-card-view-masonry-loop.js';
import '../swc-card-view-masonry-advance.js';
import '../swc-card-view-masonry-semantic.js';
import '../swc-card-view-waterfall-advance.js';

import { photos } from '../stories/story-helpers.js';

const tags = [
  'swc-card-view-single-column-grid',
  'swc-card-view-single-row-grid',
  'swc-card-view-list',
  'swc-card-view-feed',
];

const items = Array.from({ length: 8 }, (_, index) => ({
  id: `photo-${index}`,
  title: `Photo ${index + 1}`,
  description: 'A landscape photograph',
  image: '/images/card-preview.jpg',
  aspectRatio: index % 2 ? 0.8 : 1.5,
}));

type Prototype = HTMLElement & {
  items: CardViewItem[];
  layout: string;
  selected: string[];
  selectionMode: string;
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

export const MasonryRegistration: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async () => {
    for (const mode of [
      'nowrap',
      'loop',
      'advance',
      'semantic',
      'top-to-bottom',
    ]) {
      const tag = `swc-card-view-masonry-${mode}`;
      expect(customElements.get(tag), `${tag} is registered`).toBeDefined();
      expect((document.createElement(tag) as Prototype).layout).toBe('masonry');
    }
  },
};

export const WaterfallAdvance: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const tag = 'swc-card-view-waterfall-advance';
    expect(customElements.get(tag), `${tag} is registered`).toBeDefined();
    expect((document.createElement(tag) as Prototype).layout).toBe('waterfall');
    const view = await mount(canvasElement, tag, 'waterfall');
    const root = view.shadowRoot!;
    const cells = [...root.querySelectorAll<HTMLElement>('[role="gridcell"]')];
    const cards = [...root.querySelectorAll<HTMLElement>('swc-card')];
    expect(root.querySelectorAll('[role="row"]')).toHaveLength(1);
    expect(cells.map((cell) => cell.getAttribute('aria-label'))).toEqual(
      items.map(
        (item, index) => `${index + 1} of ${items.length}, ${item.title}`
      )
    );
    await waitFor(() => {
      const bounds = cards.map((card) => card.getBoundingClientRect());
      const columnBottoms = [bounds[0].top, bounds[0].top, bounds[0].top];
      for (const [index, card] of bounds.entries()) {
        const column = index % columnBottoms.length;
        expect(card.width).toBeCloseTo(bounds[0].width);
        expect(card.left).toBeCloseTo(bounds[column].left);
        expect(card.top).toBeCloseTo(columnBottoms[column]);
        columnBottoms[column] = card.bottom + 16;
      }
      expect(bounds[0].height).not.toBeCloseTo(bounds[1].height);
      expect(
        root.querySelector('.collection')!.getBoundingClientRect().height
      ).toBeCloseTo(
        Math.max(...bounds.map((card) => card.bottom)) - bounds[0].top
      );
    });
    const move = async (index: number, key: string) => {
      cells[index].focus();
      cells[index].dispatchEvent(
        new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
      );
      await view.updateComplete;
      return root.activeElement;
    };
    expect(await move(0, 'ArrowRight')).toBe(cells[1]);
    expect(await move(0, 'ArrowDown')).toBe(cells[3]);
    expect(await move(2, 'ArrowRight')).toBe(cells[3]);
    expect(await move(0, 'End')).toBe(cells[7]);
    expect(await move(7, 'Home')).toBe(cells[0]);
    cells[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    await view.updateComplete;
    expect(root.activeElement).toBe(cards[0].querySelector('input'));
    expect(cards[0].hasAttribute('aria-hidden')).toBe(false);
    cells[1].focus();
    await view.updateComplete;
    expect(cards[0].getAttribute('aria-hidden')).toBe('true');
    view.dir = 'rtl';
    await waitFor(() => {
      expect(cells[0].getBoundingClientRect().left).toBeGreaterThan(
        cells[2].getBoundingClientRect().left
      );
      const bounds = cards.map((card) => card.getBoundingClientRect());
      for (const [index, card] of bounds.entries()) {
        expect(card.left).toBeCloseTo(bounds[index % 3].left);
        if (index >= 3) {
          expect(card.top).toBeCloseTo(bounds[index - 3].bottom + 16);
        }
      }
    });
    view.style.width = '400px';
    await waitFor(() => {
      const bounds = cards.map((card) => card.getBoundingClientRect());
      for (let index = 1; index < bounds.length; index++) {
        expect(bounds[index].left).toBeCloseTo(bounds[0].left);
        expect(bounds[index].top).toBeCloseTo(bounds[index - 1].bottom + 16);
      }
    });
    expect(root.activeElement).toBe(cells[1]);
  },
};

export const HorizontalSemanticNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const variants = [
      ...['nowrap', 'loop', 'advance', 'semantic'].map(
        (mode) => ['grid', mode] as const
      ),
      ...['nowrap', 'loop', 'advance', 'semantic', 'top-to-bottom'].map(
        (mode) => ['masonry', mode] as const
      ),
      ['waterfall', 'advance'],
    ];
    for (const [layout, mode] of variants) {
      const view = await mount(
        canvasElement,
        `swc-card-view-${layout}-${mode}`,
        layout
      );
      const cells = [
        ...view.shadowRoot!.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      ];
      const move = async (index: number, key: string) => {
        cells[index].focus();
        cells[index].dispatchEvent(
          new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
        );
        await view.updateComplete;
        return view.shadowRoot!.activeElement;
      };
      for (const direction of ['ltr', 'rtl']) {
        view.dir = direction;
        view.items = items;
        await view.updateComplete;
        for (let index = 0; index < items.length; index++) {
          expect(await move(index, 'ArrowRight')).toBe(
            cells[(index + 1) % items.length]
          );
          expect(await move(index, 'ArrowLeft')).toBe(
            cells[(index + items.length - 1) % items.length]
          );
        }
        view.items = items.map((item, index) => ({
          ...item,
          disabled: index === 1,
        }));
        await view.updateComplete;
        expect(await move(0, 'ArrowRight')).toBe(cells[2]);
        expect(await move(2, 'ArrowLeft')).toBe(cells[0]);
        view.items = items.map((item, index) => ({
          ...item,
          disabled: index === 0 || index === items.length - 1,
        }));
        await view.updateComplete;
        expect(await move(6, 'ArrowRight')).toBe(cells[1]);
        expect(await move(1, 'ArrowLeft')).toBe(cells[6]);
        view.items = items.map((item, index) => ({
          ...item,
          disabled: index !== 4,
        }));
        await view.updateComplete;
        expect(await move(4, 'ArrowRight')).toBe(cells[4]);
        expect(await move(4, 'ArrowLeft')).toBe(cells[4]);
        expect(view.selected).toEqual([]);
      }
    }
  },
};

export const NamedLayoutNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      for (const mode of ['nowrap', 'loop', 'advance', 'semantic']) {
        const view = await mount(
          canvasElement,
          `swc-card-view-${layout}-${mode}`,
          layout
        );
        expect(
          [...view.shadowRoot!.querySelectorAll('[role="gridcell"]')].map(
            (cell) => cell.getAttribute('aria-label')
          )
        ).toEqual(
          items.map(
            (item, index) => `${index + 1} of ${items.length}, ${item.title}`
          )
        );
        await waitFor(() => {
          const bounds = [
            ...view.shadowRoot!.querySelectorAll<HTMLElement>('swc-card'),
          ].map((card) => card.getBoundingClientRect());
          for (let index = 1; index < bounds.length; index++) {
            if (layout === 'masonry') {
              if (index % 3 !== 0) {
                expect(bounds[index].left).toBeGreaterThan(
                  bounds[index - 1].left
                );
                expect(bounds[index].top).toBeCloseTo(bounds[index - 1].top);
                expect(bounds[index].height).toBeCloseTo(
                  bounds[index - 1].height
                );
                expect(bounds[index].width).not.toBeCloseTo(
                  bounds[index - 1].width
                );
              } else {
                expect(bounds[index].left).toBeCloseTo(bounds[0].left);
                expect(bounds[index].top).toBeCloseTo(
                  bounds[index - 1].bottom + 16
                );
              }
            } else if (index % 3 === 0) {
              expect(bounds[index].left).toBeCloseTo(bounds[0].left);
              expect(bounds[index].top).toBeGreaterThan(
                bounds[index - 1].bottom
              );
            } else {
              expect(bounds[index].left).toBeGreaterThan(
                bounds[index - 1].left
              );
              expect(bounds[index].top).toBeCloseTo(bounds[index - 1].top);
            }
          }
        });
        Object.defineProperty(view, 'positions', {
          get: () =>
            items.map((_, index) => ({
              left: (index % 3) * 120,
              top: Math.floor(index / 3) * 120,
              width: 100,
              height: 100,
              column: index % 3,
            })),
        });
        const targets = [
          ...view.shadowRoot!.querySelectorAll<HTMLElement>('[data-focus]'),
        ];
        const move = async (index: number, key: string) => {
          targets[index].focus();
          targets[index].dispatchEvent(
            new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
          );
          await view.updateComplete;
          return Number(
            view.shadowRoot!.activeElement?.getAttribute('data-index')
          );
        };
        const rows = view.shadowRoot!.querySelectorAll('[role="row"]');
        expect(rows).toHaveLength(1);
        for (const row of rows) {
          expect(row.querySelectorAll('[role="gridcell"]')).toHaveLength(
            items.length
          );
          expect(row.querySelectorAll('[role="rowheader"]')).toHaveLength(0);
        }
        expect(
          view.shadowRoot!.querySelectorAll(
            '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
          )
        ).toHaveLength(0);
        expect(await move(2, 'ArrowRight')).toBe(
          mode === 'nowrap' ? 2 : mode === 'loop' ? 0 : 3
        );
        expect(await move(0, 'ArrowLeft')).toBe(
          mode === 'nowrap' ? 0 : mode === 'loop' ? 2 : 7
        );
        expect(await move(6, 'ArrowDown')).toBe(
          mode === 'nowrap'
            ? 6
            : mode === 'loop'
              ? 0
              : mode === 'advance'
                ? 1
                : 7
        );
        expect(await move(0, 'ArrowUp')).toBe(
          mode === 'nowrap'
            ? 0
            : mode === 'loop'
              ? 6
              : mode === 'advance'
                ? 5
                : 7
        );
        expect(await move(7, 'ArrowDown')).toBe(
          mode === 'nowrap'
            ? 7
            : mode === 'loop'
              ? 1
              : mode === 'advance'
                ? 2
                : 0
        );
        expect(await move(5, 'ArrowDown')).toBe(
          mode === 'nowrap'
            ? 5
            : mode === 'loop'
              ? 2
              : mode === 'advance'
                ? 0
                : 6
        );
        expect(await move(7, 'ArrowRight')).toBe(
          mode === 'nowrap' ? 7 : mode === 'loop' ? 6 : 0
        );
        expect(await move(4, 'ArrowRight')).toBe(5);
        expect(await move(4, 'ArrowDown')).toBe(mode === 'semantic' ? 5 : 7);
        view.items = items.map((item, index) => ({
          ...item,
          disabled: index === 1,
        }));
        await view.updateComplete;
        expect(await move(0, 'ArrowRight')).not.toBe(1);
        view.dir = 'rtl';
        expect(await move(4, 'ArrowRight')).toBe(5);
      }
    }
  },
};

export const MoreInfoTabFocus: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const view = await mount(canvasElement, 'swc-card-view-grid-advance');
    const root = view.shadowRoot!;
    const cell = root.querySelector<HTMLElement>('[role="gridcell"]')!;
    const card = cell.querySelector('swc-card')!;
    const hint = cell.querySelector('.more-info-hint')!;
    expect(hint.textContent?.trim()).toBe('tab for more info');
    expect(hint.getAttribute('aria-hidden')).toBe('true');
    expect(cell.hasAttribute('aria-keyshortcuts')).toBe(false);
    expect(cell.hasAttribute('aria-describedby')).toBe(false);
    cell.focus();
    await view.updateComplete;
    expect(hint.getAttribute('aria-hidden')).toBe('false');
    const tab = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    cell.dispatchEvent(tab);
    await view.updateComplete;
    expect(tab.defaultPrevented).toBe(true);
    expect(card.hasAttribute('aria-hidden')).toBe(false);
    expect(root.activeElement).toBe(card.querySelector('input'));
    await view.updateComplete;
    expect(hint.getAttribute('aria-hidden')).toBe('true');
    card.querySelector<HTMLElement>('.title')!.focus();
    await view.updateComplete;
    expect(card.hasAttribute('aria-hidden')).toBe(false);
    cell.focus();
    await waitFor(() => expect(card.getAttribute('aria-hidden')).toBe('true'));
    expect(hint.getAttribute('aria-hidden')).toBe('false');
    expect(view.selected).toEqual([]);
    view.selectionMode = 'none';
    await view.updateComplete;
    cell.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    await view.updateComplete;
    expect(root.activeElement).toBe(card.querySelector('.title'));
    const outside = document.createElement('button');
    canvasElement.append(outside);
    outside.focus();
    await waitFor(() => expect(card.getAttribute('aria-hidden')).toBe('true'));
    expect(hint.getAttribute('aria-hidden')).toBe('true');
    cell.focus();
    await view.updateComplete;
    const nextCell = root.querySelectorAll<HTMLElement>('[role="gridcell"]')[1];
    nextCell.focus();
    await view.updateComplete;
    expect(hint.getAttribute('aria-hidden')).toBe('true');
    expect(
      nextCell.querySelector('.more-info-hint')!.getAttribute('aria-hidden')
    ).toBe('false');
    outside.focus();
    await view.updateComplete;
    expect(
      nextCell.querySelector('.more-info-hint')!.getAttribute('aria-hidden')
    ).toBe('true');
    outside.remove();
  },
};

export const FocusStyling: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const view = await mount(canvasElement, 'swc-card-view-grid-advance');
    view.selected = [items[0].id];
    await view.updateComplete;
    const cells = [
      ...view.shadowRoot!.querySelectorAll<HTMLElement>('[role="gridcell"]'),
    ];
    const cell = cells[0];
    const card = cell.querySelector<HTMLElement>('swc-card')!;
    const outside = document.createElement('button');
    canvasElement.append(outside);
    outside.focus();
    expect(getComputedStyle(cell).outlineStyle).toBe('none');
    expect(getComputedStyle(card).outlineStyle).toBe('none');

    cell.focus();
    expect(getComputedStyle(cell).outlineStyle).toBe('solid');
    cell.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    await view.updateComplete;
    expect(view.shadowRoot!.activeElement).toBe(card.querySelector('input'));
    expect(getComputedStyle(cell).outlineStyle).toBe('solid');
    card.querySelector<HTMLElement>('.title')!.focus();
    expect(getComputedStyle(cell).outlineStyle).toBe('solid');

    cells[1].focus();
    expect(getComputedStyle(cell).outlineStyle).toBe('none');
    expect(getComputedStyle(card).outlineStyle).toBe('none');
    expect(getComputedStyle(cells[1]).outlineStyle).toBe('solid');
    outside.focus();
    expect(getComputedStyle(cells[1]).outlineStyle).toBe('none');
    expect(view.selected).toEqual([items[0].id]);
    outside.remove();
  },
};

export const MoreInfo: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      for (const mode of [
        'nowrap',
        'loop',
        'advance',
        'semantic',
        ...(layout === 'masonry' ? ['top-to-bottom'] : []),
      ]) {
        const view = await mount(
          canvasElement,
          `swc-card-view-${layout}-${mode}`,
          layout
        );
        const root = view.shadowRoot!;
        const cells = [
          ...root.querySelectorAll<HTMLElement>('[role="gridcell"]'),
        ];
        const cards = [...root.querySelectorAll<HTMLElement>('swc-card')];
        for (const [index, cell] of cells.entries()) {
          expect(cards[index].getAttribute('aria-hidden')).toBe('true');
          expect(cards[index].getAttribute('aria-live')).toBe('polite');
          expect(cell.hasAttribute('aria-describedby')).toBe(false);
          const hint = cell.querySelector<HTMLElement>('.more-info-hint')!;
          expect(hint.parentElement).toBe(cell);
          expect(hint.textContent?.trim()).toBe('tab for more info');
          expect(hint.getAttribute('aria-hidden')).toBe('true');
          expect(cell.hasAttribute('aria-keyshortcuts')).toBe(false);
          expect(getComputedStyle(hint).clipPath).toBe('inset(50%)');
          expect(
            [
              ...cards[index].querySelectorAll<HTMLElement>('input, button'),
            ].every((control) => control.tabIndex === -1)
          ).toBe(true);
        }
        const press = async (
          target: HTMLElement,
          modifiers: KeyboardEventInit = {}
        ) => {
          const event = new KeyboardEvent('keydown', {
            key: 'Tab',
            bubbles: true,
            composed: true,
            cancelable: true,
            ...modifiers,
          });
          target.dispatchEvent(event);
          await view.updateComplete;
          return event.defaultPrevented;
        };
        cells[0].focus();
        expect(await press(cells[0], { shiftKey: true })).toBe(false);
        expect(await press(cells[0], { ctrlKey: true })).toBe(false);
        expect(await press(cells[0], { metaKey: true })).toBe(false);
        expect(await press(cells[0], { altKey: true })).toBe(false);
        expect(cards[0].getAttribute('aria-hidden')).toBe('true');
        expect(await press(cells[0])).toBe(true);
        expect(cards[0].hasAttribute('aria-hidden')).toBe(false);
        expect(root.activeElement).toBe(cards[0].querySelector('input'));
        expect(cards[1].getAttribute('aria-hidden')).toBe('true');
        expect(
          [...cards[0].querySelectorAll<HTMLElement>('input, button')].every(
            (control) => control.tabIndex === 0
          )
        ).toBe(true);
        expect(await press(root.activeElement as HTMLElement)).toBe(false);
        expect(
          await press(root.activeElement as HTMLElement, { shiftKey: true })
        ).toBe(false);
        const title = cards[0].querySelector<HTMLElement>('.title')!;
        title.focus();
        expect(await press(title)).toBe(false);
        expect(root.activeElement).toBe(title);
        expect(cards[0].hasAttribute('aria-hidden')).toBe(false);
        expect(view.selected).toEqual([]);
        cells[1].focus();
        await view.updateComplete;
        expect(cards[0].getAttribute('aria-hidden')).toBe('true');
        await press(cells[1]);
        expect(cards[1].hasAttribute('aria-hidden')).toBe(false);
        expect(root.activeElement).toBe(cards[1].querySelector('input'));
        const hiddenControl = cards[0].querySelector<HTMLElement>('.title')!;
        hiddenControl.focus();
        await view.updateComplete;
        expect(cards[0].hasAttribute('aria-hidden')).toBe(false);
        expect(cards[1].getAttribute('aria-hidden')).toBe('true');
        expect(root.activeElement).toBe(hiddenControl);
        cells[0].focus();
        await view.updateComplete;
        expect(cards[0].getAttribute('aria-hidden')).toBe('true');
      }
    }
    for (const tag of tags) {
      const view = await mount(canvasElement, tag);
      expect(
        view.shadowRoot!.querySelector('swc-card')!.hasAttribute('aria-hidden')
      ).toBe(false);
      expect(view.shadowRoot!.querySelector('.more-info-hint')).toBeNull();
    }
  },
};

export const PicsumImageSources: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    expect(photos).toHaveLength(100);
    for (const [index, photo] of photos.entries()) {
      expect(photo.image).toMatch(
        new RegExp(`^https://picsum\\.photos/id/${index + 1}/[0-9]+/[0-9]+$`)
      );
    }
    const view = await mount(canvasElement, 'swc-card-view-grid-nowrap');
    view.items = photos.slice(0, 50);
    await view.updateComplete;
    expect(view.shadowRoot!.querySelectorAll('[role="row"]')).toHaveLength(1);
    expect(
      view.shadowRoot!.querySelectorAll(
        '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
      )
    ).toHaveLength(0);
    expect(
      view.shadowRoot!.querySelector('input')!.getBoundingClientRect().width
    ).toBeGreaterThanOrEqual(24);
    expect(
      view.shadowRoot!.querySelector('.title')!.getBoundingClientRect().height
    ).toBeGreaterThanOrEqual(24);
    await waitFor(() => {
      const previews = [
        ...view.shadowRoot!.querySelectorAll<HTMLImageElement>('img'),
      ];
      expect(previews).toHaveLength(50);
      for (const [index, preview] of previews.entries()) {
        const dimensions = new URL(preview.src).pathname.split('/');
        expect(dimensions[2]).toBe(String(index + 1));
        expect(Number(dimensions[3])).toBe(
          Math.round(preview.getBoundingClientRect().height)
        );
        expect(
          Math.abs(
            Number(dimensions[4]) - preview.getBoundingClientRect().width
          )
        ).toBeLessThan(3);
      }
    });
  },
};

export const MasonryLayoutNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const geometry = [
      { left: 0, top: 0, height: 220, column: 0 },
      { left: 120, top: 0, height: 100, column: 1 },
      { left: 240, top: 0, height: 160, column: 2 },
      { left: 120, top: 120, height: 160, column: 1 },
      { left: 240, top: 180, height: 220, column: 2 },
      { left: 0, top: 240, height: 100, column: 0 },
      { left: 120, top: 300, height: 100, column: 1 },
      { left: 0, top: 360, height: 100, column: 0 },
    ];
    for (const mode of [
      'nowrap',
      'loop',
      'advance',
      'semantic',
      'top-to-bottom',
    ]) {
      const tag = `swc-card-view-masonry-${mode}`;
      expect((document.createElement(tag) as Prototype).layout).toBe('masonry');
      const view = await mount(canvasElement, tag, 'masonry');
      const cells = [
        ...view.shadowRoot!.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      ];
      expect(view.shadowRoot!.querySelectorAll('[role="row"]')).toHaveLength(1);
      expect(
        cells.every(
          (cell) => cell.parentElement?.getAttribute('role') === 'row'
        )
      ).toBe(true);
      expect(
        view.shadowRoot!.querySelectorAll(
          '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
        )
      ).toHaveLength(0);
      expect(
        new Set(
          cells.slice(0, 3).map((cell) => cell.getBoundingClientRect().left)
        ).size
      ).toBe(3);
      Object.defineProperty(view, 'positions', {
        get: () =>
          geometry.map((position) => ({
            ...position,
            width: 100,
            left: view.dir === 'rtl' ? 240 - position.left : position.left,
          })),
      });
      const move = async (index: number, key: string) => {
        cells[index].focus();
        cells[index].dispatchEvent(
          new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
        );
        await view.updateComplete;
        return Number(
          view.shadowRoot!.activeElement?.getAttribute('data-index')
        );
      };
      if (mode === 'top-to-bottom') {
        const order = [0, 5, 7, 1, 3, 6, 2, 4];
        for (const [position, index] of order.entries()) {
          const next = order[(position + 1) % order.length];
          const previous = order[(position + order.length - 1) % order.length];
          expect(await move(index, 'ArrowDown')).toBe(next);
          expect(await move(index, 'ArrowRight')).toBe(next);
          expect(await move(index, 'ArrowUp')).toBe(previous);
          expect(await move(index, 'ArrowLeft')).toBe(previous);
        }
        expect(await move(4, 'Home')).toBe(0);
        expect(await move(0, 'End')).toBe(4);
        view.items = items.map((item, index) => ({
          ...item,
          disabled: index === 5,
        }));
        await view.updateComplete;
        expect(await move(0, 'ArrowDown')).toBe(7);
        view.items = items;
        view.dir = 'rtl';
        await view.updateComplete;
        expect(await move(4, 'ArrowRight')).toBe(1);
        expect(await move(7, 'ArrowDown')).toBe(2);
        expect(await move(0, 'Home')).toBe(2);
        expect(await move(2, 'End')).toBe(7);
        continue;
      }
      expect(await move(2, 'ArrowRight')).toBe(
        mode === 'nowrap' ? 2 : mode === 'loop' ? 0 : 3
      );
      expect(await move(7, 'ArrowDown')).toBe(
        mode === 'nowrap' ? 7 : mode === 'advance' ? 1 : 0
      );
      expect(await move(0, 'ArrowUp')).toBe(
        mode === 'nowrap' ? 0 : mode === 'advance' ? 4 : 7
      );
      view.dir = 'rtl';
      expect(await move(0, 'ArrowRight')).toBe(
        mode === 'nowrap'
          ? 0
          : mode === 'loop'
            ? 2
            : mode === 'semantic'
              ? 1
              : 7
      );
    }
  },
};

export const ToolbarControls: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      const toolbar = await mount(
        canvasElement,
        'swc-card-view-toolbar',
        layout
      );
      const toolbarRoot = toolbar.shadowRoot!;
      expect(toolbarRoot.querySelector('[role="toolbar"]')).not.toBeNull();
      expect(
        toolbarRoot.querySelector('[role="grid"], [role="menu"]')
      ).toBeNull();
      const controls = [
        ...toolbarRoot.querySelectorAll<HTMLElement>('input, button'),
      ];
      expect(controls).toHaveLength(24);
      expect(controls.filter((control) => control.tabIndex === 0)).toHaveLength(
        3
      );
      controls[0].focus();
      controls[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      await toolbar.updateComplete;
      expect(toolbarRoot.activeElement).toBe(controls[3]);
      expect(controls[0].tabIndex).toBe(-1);
      expect(controls[3].tabIndex).toBe(0);
      expect(controls[4].tabIndex).toBe(0);
      expect(controls[5].tabIndex).toBe(0);
      controls[3].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'End',
          bubbles: true,
          composed: true,
        })
      );
      await toolbar.updateComplete;
      expect(toolbarRoot.activeElement).toBe(controls[21]);
      (controls[0] as HTMLInputElement).click();
      await toolbar.updateComplete;
      expect(toolbar.selected).toEqual(['photo-0']);
      const actions: unknown[] = [];
      toolbar.addEventListener('swc-card-view-action', (event) => {
        actions.push((event as CustomEvent).detail);
      });
      controls[1].click();
      expect(actions).toEqual([{ id: 'photo-0', action: 'open' }]);
      expect(toolbar.selected).toEqual(['photo-0']);
    }
  },
};

export const CommandNavigationEdges: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const press = async (view: Prototype, key: string) => {
      view.shadowRoot!.activeElement!.dispatchEvent(
        new KeyboardEvent('keydown', {
          key,
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
      await view.updateComplete;
    };
    const toolbar = await mount(
      canvasElement,
      'swc-card-view-toolbar',
      'masonry'
    );
    toolbar.items = items.map((item, index) => ({
      ...item,
      disabled: index === 1,
    }));
    await toolbar.updateComplete;
    const toolbarRoot = toolbar.shadowRoot!;
    const controls = [
      ...toolbarRoot.querySelectorAll<HTMLElement>('input, button'),
    ];
    controls[2].focus();
    await press(toolbar, 'ArrowRight');
    expect(toolbarRoot.activeElement).toBe(controls[2]);
    controls[0].focus();
    await press(toolbar, 'ArrowRight');
    expect(toolbarRoot.activeElement).toBe(controls[6]);
    expect(toolbar.selected).toEqual([]);
    await press(toolbar, 'Home');
    await press(toolbar, 'ArrowDown');
    expect(toolbarRoot.activeElement).toBe(controls[6]);
    await press(toolbar, 'ArrowUp');
    expect(toolbarRoot.activeElement).toBe(controls[0]);
    await press(toolbar, 'Home');
    toolbar.style.direction = 'rtl';
    await press(toolbar, 'ArrowLeft');
    expect(toolbarRoot.activeElement).toBe(controls[6]);
    await press(toolbar, 'ArrowRight');
    expect(toolbarRoot.activeElement).toBe(controls[0]);
    toolbar.selectionMode = 'none';
    await toolbar.updateComplete;
    expect(toolbarRoot.querySelector('input')).toBeNull();
    expect(
      [...toolbarRoot.querySelectorAll<HTMLElement>('button')].filter(
        (control) => control.tabIndex === 0
      )
    ).toHaveLength(2);
  },
};

export const ListArrowNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      const view = await mount(canvasElement, 'swc-card-view-list', layout);
      view.items = items.map((item, index) => ({
        ...item,
        disabled: index === 2,
      }));
      await view.updateComplete;
      const root = view.shadowRoot!;
      const entries = [...root.querySelectorAll<HTMLElement>('li')];
      expect(entries).toHaveLength(view.items.length);
      entries.forEach((entry, index) => {
        expect(entry.getAttribute('aria-setsize')).toBe(
          String(view.items.length)
        );
        expect(entry.getAttribute('aria-posinset')).toBe(String(index + 1));
      });
      const press = async (key: string, shiftKey = false) => {
        root.activeElement!.dispatchEvent(
          new KeyboardEvent('keydown', {
            key,
            shiftKey,
            bubbles: true,
            composed: true,
          })
        );
        await view.updateComplete;
      };
      entries[0].focus();
      expect(root.activeElement).toBe(entries[0]);
      await press('ArrowRight');
      expect(root.activeElement).toBe(entries[1]);
      await press('ArrowRight');
      expect(root.activeElement).toBe(entries[3]);
      await press('Home');
      await press('ArrowDown');
      expect(root.activeElement).toBe(entries[layout === 'masonry' ? 1 : 3]);
      await press('ArrowUp');
      expect(root.activeElement).toBe(entries[0]);
      await press('ArrowRight', true);
      expect(root.activeElement).toBe(entries[1]);
      expect(view.selected).toEqual([]);
      const checkbox = entries[0].querySelector<HTMLInputElement>('input')!;
      checkbox.focus();
      await press('ArrowRight');
      expect(root.activeElement).toBe(checkbox);
      expect(
        [
          ...root.querySelectorAll<HTMLElement>(
            'input:not(:disabled), button:not(:disabled)'
          ),
        ].every((control) => control.tabIndex === 0)
      ).toBe(true);
    }
  },
};

export const FieldsetNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      const view = await mount(canvasElement, 'swc-card-view-fieldset', layout);
      const root = view.shadowRoot!;
      expect(root.querySelector('fieldset legend')?.textContent).toBe('Photos');
      expect(root.querySelector('[role="toolbar"], [role="grid"]')).toBeNull();
      const controls = [...root.querySelectorAll<HTMLElement>('input, button')];
      const rightIndex = 3;
      const belowIndex = layout === 'masonry' ? 3 : 9;
      controls[0].focus();
      controls[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      await view.updateComplete;
      expect(root.activeElement).toBe(controls[rightIndex]);
      expect(
        controls
          .slice(rightIndex, rightIndex + 3)
          .every((control) => control.tabIndex === 0)
      ).toBe(true);
      expect(controls[0].tabIndex).toBe(-1);
      controls[rightIndex].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
          bubbles: true,
          composed: true,
        })
      );
      await view.updateComplete;
      expect(root.activeElement).toBe(controls[0]);
      controls[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          composed: true,
        })
      );
      await view.updateComplete;
      expect(root.activeElement).toBe(controls[belowIndex]);
      (controls[belowIndex] as HTMLInputElement).click();
      await view.updateComplete;
      expect(view.selected).toEqual([
        layout === 'masonry' ? 'photo-1' : 'photo-3',
      ]);
      controls[belowIndex + 1].focus();
      controls[belowIndex + 1].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      expect(root.activeElement).toBe(controls[belowIndex + 1]);
    }
  },
};

export const Registration: StoryObj = {
  render: () => html`
    <div>Card view registration</div>
  `,
  play: async () => {
    for (const option of [
      '1a',
      '1b',
      '1c',
      '1d',
      '1e',
      '1f',
      '2a',
      '2b',
      '2c',
      '2d',
      '2e',
      '3a',
      '4a',
      '5a',
      '6a',
    ]) {
      expect(
        customElements.get(`swc-card-view-option-${option}`)
      ).toBeUndefined();
    }
    for (const name of [
      'single-column-grid',
      'single-row-grid',
      'list',
      'feed',
      'toolbar',
      'fieldset',
    ]) {
      expect(customElements.get(`swc-card-view-${name}`)).toBeDefined();
    }
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
      for (const layout of ['grid', 'masonry']) {
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
      if (tag === 'swc-card-view-list') {
        expect(root.querySelector('ul')).not.toBeNull();
        expect(root.querySelectorAll('li')).toHaveLength(8);
        expect(root.querySelector('[aria-selected]')).toBeNull();
        expect(
          [...root.querySelectorAll<HTMLInputElement>('input')].every(
            (control) => control.tabIndex === 0
          )
        ).toBe(true);
      } else if (tag === 'swc-card-view-feed') {
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
          root.querySelectorAll(
            '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
          )
        ).toHaveLength(0);
        expect(root.querySelectorAll('[role="row"]')).toHaveLength(
          tag === 'swc-card-view-single-row-grid' ? 1 : items.length
        );
        expect(
          [...root.querySelectorAll('[role="gridcell"]')].map((cell) =>
            cell.getAttribute('aria-label')
          )
        ).toEqual(
          items.map(
            (item, index) => `${index + 1} of ${items.length}, ${item.title}`
          )
        );
        expect(root.querySelectorAll('[role="rowheader"]')).toHaveLength(0);
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

export const SelectionAnnouncements: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      for (const tag of [
        'swc-card-view-single-column-grid',
        'swc-card-view-single-row-grid',
        'swc-card-view-grid-advance',
        'swc-card-view-masonry-advance',
      ]) {
        const view = await mount(canvasElement, tag, layout);
        const root = view.shadowRoot!;
        const grid = root.querySelector('[role="grid"]')!;
        expect(view.getAttribute('role')).not.toBe('grid');
        expect(grid).not.toBeNull();
        expect(grid.getAttribute('aria-describedby')).toBe('selection-status');
        const status = root.querySelector<HTMLElement>('#selection-status')!;
        expect(status).not.toBeNull();
        expect(status.previousElementSibling).toBe(grid);
        expect(status.getAttribute('aria-live')).toBe('polite');
        expect(getComputedStyle(status).clipPath).toBe('inset(50%)');
        expect(status.childElementCount).toBe(0);
        expect(status.textContent?.trim()).toBe('');
        root.querySelector<HTMLElement>('[data-focus]')!.focus();

        for (const [selected, message] of [
          [['photo-0'], 'Photo 1 selected.'],
          [['photo-0', 'photo-1'], 'Photo 2 selected. 2 items selected.'],
          [['photo-1'], 'Photo 1 not selected. 1 item selected.'],
          [[], 'Photo 2 not selected.'],
          [['photo-5', 'photo-1'], '2 items selected.'],
          [['photo-2', 'photo-0'], '2 items selected.'],
          [[], 'No items selected.'],
          [items.map((item) => item.id), '8 items selected.'],
          [[], 'No items selected.'],
        ] satisfies [string[], string][]) {
          view.selected = selected;
          await waitFor(() => {
            expect(status.textContent?.trim()).toBe(message);
          });
          expect(status.childElementCount).toBe(0);
        }

        view.selectionMode = 'single';
        for (const [selected, message] of [
          [['photo-0'], 'Photo 1 selected.'],
          [['photo-1'], 'Photo 2 selected.'],
          [[], 'Photo 2 not selected.'],
        ] satisfies [string[], string][]) {
          view.selected = selected;
          await waitFor(() => {
            expect(status.textContent?.trim()).toBe(message);
          });
        }

        (root.activeElement as HTMLElement).blur();
        view.selected = ['photo-3'];
        await view.updateComplete;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        await view.updateComplete;
        expect(status.textContent?.trim()).toBe('Photo 2 not selected.');
        root.querySelector<HTMLElement>('[data-focus]')!.focus();
        view.selected = ['photo-4'];
        await waitFor(() => {
          expect(status.textContent?.trim()).toBe('Photo 5 selected.');
        });
      }
    }
  },
};

export const SingleRowSemanticsAndNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'masonry']) {
      const view = await mount(
        canvasElement,
        'swc-card-view-single-row-grid',
        layout
      );
      view.items = items.map((item, index) => ({
        ...item,
        disabled: index === 2,
      }));
      await view.updateComplete;
      const root = view.shadowRoot!;
      const grid = root.querySelector('[role="grid"]')!;
      const rows = [...grid.querySelectorAll('[role="row"]')];
      const cells = [
        ...grid.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      ];
      expect(rows).toHaveLength(1);
      expect(
        root.querySelectorAll(
          '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
        )
      ).toHaveLength(0);
      expect(cells).toHaveLength(8);
      expect(cells.every((cell) => cell.parentElement === rows[0])).toBe(true);
      expect(cells[2].getAttribute('aria-disabled')).toBe('true');
      expect(cells.filter((cell) => cell.tabIndex === 0)).toHaveLength(1);

      const press = async (key: string, shiftKey = false) => {
        root.activeElement!.dispatchEvent(
          new KeyboardEvent('keydown', {
            key,
            shiftKey,
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
        await view.updateComplete;
      };

      cells[0].focus();
      const belowIndex = layout === 'masonry' ? 1 : 3;
      const activeCell = cells[belowIndex];
      const rangeSelection =
        layout === 'masonry'
          ? ['photo-0', 'photo-1']
          : ['photo-0', 'photo-1', 'photo-3'];
      await waitFor(() => {
        const first = cells[0].getBoundingClientRect();
        const below = activeCell.getBoundingClientRect();
        expect(Math.abs(below.left - first.left)).toBeLessThan(1);
        expect(below.top).toBeGreaterThan(first.top);
      });
      await press('ArrowRight');
      expect(root.activeElement).toBe(cells[layout === 'masonry' ? 3 : 1]);
      await press('ArrowRight');
      expect(root.activeElement).toBe(cells[layout === 'masonry' ? 6 : 1]);
      await press('Home');
      await press('ArrowLeft');
      expect(root.activeElement).toBe(cells[0]);
      await press('ArrowDown');
      expect(root.activeElement).toBe(activeCell);
      await press('ArrowUp');
      expect(root.activeElement).toBe(cells[0]);
      await press('End');
      expect(root.activeElement).toBe(cells[7]);
      await press('Home');
      expect(root.activeElement).toBe(cells[0]);
      await press('ArrowDown', true);
      expect(view.selected).toEqual(rangeSelection);
      expect(activeCell.getAttribute('aria-selected')).toBe('true');
      await press(' ');
      expect(view.selected).toEqual(rangeSelection.slice(0, -1));
      expect(activeCell.getAttribute('aria-selected')).toBe('false');

      const activeControls = [
        ...activeCell.querySelectorAll<HTMLElement>('input, button'),
      ];
      expect(activeControls.every((control) => control.tabIndex === 0)).toBe(
        true
      );
      expect(
        [...cells[0].querySelectorAll<HTMLElement>('input, button')].every(
          (control) => control.tabIndex === -1
        )
      ).toBe(true);
      const checkbox = activeControls[0] as HTMLInputElement;
      for (const control of activeControls) {
        for (const [key, expectedCell] of [
          ['ArrowLeft', activeCell],
          ['ArrowRight', cells[4]],
          ['ArrowUp', cells[0]],
          ['ArrowDown', layout === 'masonry' ? activeCell : cells[6]],
        ] as const) {
          control.focus();
          await press(key);
          expect(root.activeElement).toBe(expectedCell);
          expect(view.selected).toEqual(rangeSelection.slice(0, -1));
        }
      }
      checkbox.focus();
      checkbox.click();
      await view.updateComplete;
      expect(view.selected).toEqual(rangeSelection);

      const actions: unknown[] = [];
      view.addEventListener('swc-card-view-action', (event) => {
        actions.push((event as CustomEvent).detail);
      });
      (activeControls[2] as HTMLButtonElement).click();
      await view.updateComplete;
      expect(actions).toEqual([{ id: `photo-${belowIndex}`, action: 'share' }]);
      expect(view.selected).toEqual(rangeSelection);

      activeCell.focus();
      await press('Enter');
      expect(actions).toEqual([
        { id: `photo-${belowIndex}`, action: 'share' },
        { id: `photo-${belowIndex}`, action: 'open' },
      ]);
      view.layout = layout === 'grid' ? 'masonry' : 'grid';
      view.style.width = '360px';
      await view.updateComplete;
      await waitFor(() => {
        expect(cells[0].getBoundingClientRect().width).toBeGreaterThan(300);
      });
      expect(root.activeElement).toBe(activeCell);
      expect(grid.querySelectorAll('[role="row"]')).toHaveLength(1);
      expect(
        root.querySelectorAll(
          '[aria-rowindex], [aria-colindex], [aria-rowcount], [aria-colcount]'
        )
      ).toHaveLength(0);

      view.style.direction = 'rtl';
      await press('Home');
      await press('ArrowLeft');
      expect(root.activeElement).toBe(cells[0]);
      await press('ArrowRight');
      expect(root.activeElement).toBe(cells[0]);
    }
  },
};

export const FeedExitAndReflow: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    const view = await mount(canvasElement, 'swc-card-view-feed');
    const root = view.shadowRoot!;
    const expectArticleMetadata = () => {
      const articles = [...root.querySelectorAll<HTMLElement>('article')];
      expect(articles).toHaveLength(view.items.length);
      articles.forEach((article, index) => {
        expect(article.getAttribute('aria-setsize')).toBe(
          String(view.items.length)
        );
        expect(article.getAttribute('aria-posinset')).toBe(String(index + 1));
      });
    };
    expectArticleMetadata();
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
    view.layout = 'masonry';
    view.style.width = '340px';
    await view.updateComplete;
    await waitFor(() => {
      expect(
        root.querySelector<HTMLElement>('.item')!.getBoundingClientRect().width
      ).toBe(316);
    });
    expect(root.activeElement).toBe(article);
    expectArticleMetadata();
  },
};
