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

import '../swc-card-view-option-1e.js';
import '../swc-card-view-option-1c.js';
import '../swc-card-view-option-1f.js';
import '../swc-card-view-option-3a.js';
import '../swc-card-view-option-4a.js';
import '../swc-card-view-option-2a.js';
import '../swc-card-view-option-2e.js';
import '../swc-card-view-option-5a.js';
import '../swc-card-view-option-6a.js';

const tags = [
  'swc-card-view-option-1e',
  'swc-card-view-option-1c',
  'swc-card-view-option-1f',
  'swc-card-view-option-3a',
  'swc-card-view-option-4a',
  'swc-card-view-option-2a',
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

export const GridNavigationMatrix: StoryObj = {
  render: () => html`<div></div>`,
  play: async ({ canvasElement }) => {
    for (const family of [1, 2]) {
      for (const variation of ['a', 'b', 'c', 'd']) {
        for (const layout of ['grid', 'waterfall']) {
          const tag = `swc-card-view-option-${family}${variation}`;
          const view = await mount(canvasElement, tag, layout);
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
              new KeyboardEvent('keydown', {
                key,
                bubbles: true,
                composed: true,
              })
            );
            await view.updateComplete;
            return Number(
              view.shadowRoot!.activeElement?.getAttribute('data-index')
            );
          };
          expect(await move(2, 'ArrowRight')).toBe(
            variation === 'a' ? 2 : variation === 'b' ? 0 : 3
          );
          expect(await move(0, 'ArrowLeft')).toBe(
            variation === 'b' ? 2 : variation === 'd' ? 7 : 0
          );
          expect(await move(7, 'ArrowDown')).toBe(
            variation === 'b' ? 1 : variation === 'd' ? 0 : 7
          );
          expect(await move(0, 'ArrowUp')).toBe(
            variation === 'b' ? 6 : variation === 'd' ? 7 : 0
          );
          expect(view.shadowRoot!.querySelectorAll('[role="row"]')).toHaveLength(
            family === 1 ? 8 : 1
          );
          if (variation === 'd') {
            for (const key of [
              'ArrowLeft',
              'ArrowRight',
              'ArrowUp',
              'ArrowDown',
            ]) {
              let current = 3;
              const visited = new Set([current]);
              for (let step = 0; step < items.length; step++) {
                current = await move(current, key);
                visited.add(current);
              }
              expect(visited.size).toBe(items.length);
              expect(current).toBe(3);
            }
          }
        }
      }
    }
  },
};

export const SemanticWaterfallNavigation: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
      const view = await mount(
        canvasElement,
        'swc-card-view-option-2e',
        layout
      );
      view.items = items.map((item, index) => ({
        ...item,
        disabled: index === 1,
      }));
      await view.updateComplete;
      const root = view.shadowRoot!;
      const entries = [
        ...root.querySelectorAll<HTMLElement>('[role="gridcell"]'),
      ];
      expect(entries).toHaveLength(8);
      expect(
        root.querySelector('[role="grid"]')?.getAttribute('aria-colcount')
      ).toBe('8');
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
      entries[0].focus();
      if (layout === 'waterfall') {
        await press('ArrowRight');
        expect(root.activeElement).toBe(entries[0]);
        await press('ArrowDown');
        expect(root.activeElement).toBe(entries[2]);
        await press('ArrowDown');
        expect(root.activeElement).toBe(entries[3]);
        await press('ArrowLeft');
        expect(root.activeElement).toBe(entries[3]);
        await press('ArrowUp');
        expect(root.activeElement).toBe(entries[2]);
        await press('Home');
        await press('ArrowUp');
        expect(root.activeElement).toBe(entries[0]);
        for (const index of [2, 3, 4, 5, 6, 7]) {
          await press('ArrowDown');
          expect(root.activeElement).toBe(entries[index]);
        }
        await press('ArrowDown');
        expect(root.activeElement).toBe(entries[7]);
        view.dir = 'rtl';
        await press('Home');
        await press('ArrowDown', true);
        expect(root.activeElement).toBe(entries[2]);
        expect(view.selected).toEqual(['photo-0', 'photo-2']);
        view.style.width = '340px';
        await view.updateComplete;
        await waitFor(() => {
          expect(entries[2].getBoundingClientRect().width).toBe(316);
        });
        expect(root.activeElement).toBe(entries[2]);
        await press('ArrowDown');
        expect(root.activeElement).toBe(entries[3]);
      } else {
        await press('ArrowRight');
        expect(root.activeElement).toBe(entries[2]);
        await press('Home');
        await press('ArrowDown');
        expect(root.activeElement).toBe(entries[3]);
      }
      await press('End');
      expect(root.activeElement).toBe(entries[7]);
      await press(' ');
      expect(view.selected).toContain('photo-7');
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
        'swc-card-view-option-5a',
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
      'swc-card-view-option-5a',
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
      const view = await mount(
        canvasElement,
        'swc-card-view-option-3a',
        layout
      );
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
      const view = await mount(
        canvasElement,
        'swc-card-view-option-6a',
        layout
      );
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
      if (tag === 'swc-card-view-option-3a') {
        expect(root.querySelector('ul')).not.toBeNull();
        expect(root.querySelectorAll('li')).toHaveLength(8);
        expect(root.querySelector('[aria-selected]')).toBeNull();
        expect(
          [...root.querySelectorAll<HTMLInputElement>('input')].every(
            (control) => control.tabIndex === 0
          )
        ).toBe(true);
      } else if (tag === 'swc-card-view-option-4a') {
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
        ).toBe(tag === 'swc-card-view-option-2a' ? '8' : '1');
        expect(root.querySelectorAll('[role="row"]')).toHaveLength(
          tag === 'swc-card-view-option-2a' ? 1 : 8
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
        'swc-card-view-option-2a',
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

export const WrappingReachesEveryCard: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
      const view = await mount(
        canvasElement,
        'swc-card-view-option-1f',
        layout
      );
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
    const view = await mount(canvasElement, 'swc-card-view-option-4a');
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
