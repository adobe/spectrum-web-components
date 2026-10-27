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
import '../swc-card-view-waterfall-nowrap.js';
import '../swc-card-view-waterfall-loop.js';
import '../swc-card-view-waterfall-advance.js';
import '../swc-card-view-waterfall-semantic.js';

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

export const NamedLayoutNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
      for (const mode of ['nowrap', 'loop', 'advance', 'semantic']) {
        const view = await mount(
          canvasElement,
          `swc-card-view-${layout}-${mode}`,
          layout
        );
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
        expect(view.shadowRoot!.querySelectorAll('[role="row"]')).toHaveLength(
          1
        );
        expect(
          view
            .shadowRoot!.querySelector('[role="grid"]')
            ?.getAttribute('aria-colcount')
        ).toBe('8');
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
      view
        .shadowRoot!.querySelector('[role="grid"]')!
        .getAttribute('aria-colcount')
    ).toBe('50');
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

export const WaterfallLayoutNavigation: StoryObj = {
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
    for (const mode of ['nowrap', 'loop', 'advance', 'semantic']) {
      const tag = `swc-card-view-waterfall-${mode}`;
      expect((document.createElement(tag) as Prototype).layout).toBe(
        'waterfall'
      );
      const view = await mount(canvasElement, tag, 'waterfall');
      const cells = [
        ...view.shadowRoot!.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      ];
      expect(
        new Set(
          cells.slice(0, 3).map((cell) => cell.getBoundingClientRect().left)
        ).size
      ).toBe(mode === 'semantic' ? 1 : 3);
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
    for (const layout of ['grid', 'waterfall']) {
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
      'waterfall'
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
    expect(toolbarRoot.activeElement).toBe(controls[9]);
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
    for (const layout of ['grid', 'waterfall']) {
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
      expect(root.activeElement).toBe(entries[3]);
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
    for (const layout of ['grid', 'waterfall']) {
      const view = await mount(canvasElement, 'swc-card-view-fieldset', layout);
      const root = view.shadowRoot!;
      expect(root.querySelector('fieldset legend')?.textContent).toBe('Photos');
      expect(root.querySelector('[role="toolbar"], [role="grid"]')).toBeNull();
      const controls = [...root.querySelectorAll<HTMLElement>('input, button')];
      controls[0].focus();
      controls[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      await view.updateComplete;
      expect(root.activeElement).toBe(controls[3]);
      expect(
        controls.slice(3, 6).every((control) => control.tabIndex === 0)
      ).toBe(true);
      expect(controls[0].tabIndex).toBe(-1);
      controls[3].dispatchEvent(
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
      expect(root.activeElement).toBe(controls[9]);
      (controls[9] as HTMLInputElement).click();
      await view.updateComplete;
      expect(view.selected).toEqual(['photo-3']);
      controls[10].focus();
      controls[10].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      expect(root.activeElement).toBe(controls[10]);
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
          root.querySelector('[role="grid"]')?.getAttribute('aria-colcount')
        ).toBe(tag === 'swc-card-view-single-row-grid' ? '8' : '1');
        expect(root.querySelectorAll('[role="row"]')).toHaveLength(
          tag === 'swc-card-view-single-row-grid' ? 1 : 8
        );
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

export const SingleRowSemanticsAndNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
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
      const row = grid.querySelector('[role="row"]')!;
      const cells = [...row.querySelectorAll<HTMLElement>('[role="gridcell"]')];
      expect(grid.getAttribute('aria-rowcount')).toBe('1');
      expect(grid.getAttribute('aria-colcount')).toBe('8');
      expect(grid.querySelectorAll('[role="row"]')).toHaveLength(1);
      expect(row.getAttribute('aria-rowindex')).toBe('1');
      expect(cells).toHaveLength(8);
      expect(cells.map((cell) => cell.getAttribute('aria-colindex'))).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
      ]);
      expect(cells.every((cell) => cell.parentElement === row)).toBe(true);
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
      const belowIndex = layout === 'waterfall' ? 1 : 3;
      const activeCell = cells[belowIndex];
      const rangeSelection =
        layout === 'waterfall'
          ? ['photo-0', 'photo-1']
          : ['photo-0', 'photo-1', 'photo-3'];
      await waitFor(() => {
        const first = cells[0].getBoundingClientRect();
        const below = activeCell.getBoundingClientRect();
        expect(Math.abs(below.left - first.left)).toBeLessThan(1);
        expect(below.top).toBeGreaterThan(first.top);
      });
      await press('ArrowRight');
      expect(root.activeElement).toBe(cells[layout === 'waterfall' ? 3 : 1]);
      await press('ArrowRight');
      expect(root.activeElement).toBe(cells[layout === 'waterfall' ? 6 : 1]);
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
      checkbox.focus();
      await press('ArrowRight');
      expect(root.activeElement).toBe(checkbox);
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
      view.layout = layout === 'grid' ? 'waterfall' : 'grid';
      view.style.width = '360px';
      await view.updateComplete;
      await waitFor(() => {
        expect(cells[0].getBoundingClientRect().width).toBeGreaterThan(300);
      });
      expect(root.activeElement).toBe(activeCell);
      expect(grid.querySelectorAll('[role="row"]')).toHaveLength(1);
      expect(grid.getAttribute('aria-colcount')).toBe('8');
      expect(activeCell.getAttribute('aria-colindex')).toBe(
        String(belowIndex + 1)
      );

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
    view.layout = 'waterfall';
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
