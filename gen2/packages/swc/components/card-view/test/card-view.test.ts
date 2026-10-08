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
import '../swc-card-view-option-5.js';
import '../swc-card-view-option-6.js';
import '../swc-card-view-option-7.js';
import '../swc-card-view-option-8.js';

const tags = [
  'swc-card-view',
  'swc-card-view-option-1',
  'swc-card-view-option-2',
  'swc-card-view-option-3',
  'swc-card-view-option-4',
  'swc-card-view-option-5',
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

export const MenuAndToolbar: StoryObj = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement }) => {
    for (const layout of ['grid', 'waterfall']) {
      const menu = await mount(canvasElement, 'swc-card-view-option-6', layout);
      const root = menu.shadowRoot!;
      expect(root.querySelector('[role="menu"]')).not.toBeNull();
      const entries = [
        ...root.querySelectorAll<HTMLElement>('[role="menuitemcheckbox"]'),
      ];
      expect(entries).toHaveLength(8);
      expect(root.querySelector('input')).toBeNull();
      expect(entries[0].querySelectorAll('button')).toHaveLength(2);
      expect(entries[0].getAttribute('aria-checked')).toBe('false');
      entries[0].focus();
      entries[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      );
      await menu.updateComplete;
      expect(menu.selected).toEqual(['photo-0']);
      expect(entries[0].getAttribute('aria-checked')).toBe('true');
      entries[0].dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      await menu.updateComplete;
      expect(root.activeElement).toBe(entries[1]);
      entries[1].click();
      await menu.updateComplete;
      expect(menu.selected).toEqual(['photo-0', 'photo-1']);

      const open = entries[1].querySelector<HTMLButtonElement>(
        '[data-action="open"]'
      )!;
      const share = entries[1].querySelector<HTMLButtonElement>(
        '[data-action="share"]'
      )!;
      expect(open.tabIndex).toBe(0);
      expect(share.tabIndex).toBe(0);
      const menuActions: unknown[] = [];
      menu.addEventListener('swc-card-view-action', (event) =>
        menuActions.push((event as CustomEvent).detail)
      );
      open.focus();
      open.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          composed: true,
        })
      );
      expect(root.activeElement).toBe(open);
      share.click();
      expect(menuActions).toEqual([{ id: 'photo-1', action: 'share' }]);
      expect(menu.selected).toEqual(['photo-0', 'photo-1']);
      open.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          composed: true,
        })
      );
      await menu.updateComplete;
      expect(root.activeElement).toBe(entries[1]);

      const toolbar = await mount(
        canvasElement,
        'swc-card-view-option-7',
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
    const menu = await mount(canvasElement, 'swc-card-view-option-6');
    menu.items = items.map((item, index) => ({
      ...item,
      title: index === 3 ? 'Beta' : `Alpha ${index}`,
      disabled: index === 1,
    }));
    await menu.updateComplete;
    const root = menu.shadowRoot!;
    const entries = [...root.querySelectorAll<HTMLElement>('[data-focus]')];
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
    entries[0].focus();
    await press(menu, 'ArrowDown');
    expect(root.activeElement).toBe(entries[3]);
    await press(menu, 'b');
    expect(root.activeElement).toBe(entries[3]);
    await press(menu, 'End');
    await press(menu, 'ArrowDown');
    expect(root.activeElement).toBe(entries[7]);
    await press(menu, 'ArrowUp');
    expect(root.activeElement).toBe(entries[4]);
    await press(menu, 'Home');
    expect(root.activeElement).toBe(entries[0]);
    let exits = 0;
    menu.addEventListener('swc-card-view-exit', () => exits++);
    await press(menu, 'Escape');
    expect(exits).toBe(1);
    menu.selectionMode = 'single';
    await menu.updateComplete;
    expect(entries[0].getAttribute('role')).toBe('menuitemradio');
    await press(menu, 'Enter');
    await press(menu, 'Enter');
    expect(menu.selected).toEqual(['photo-0']);
    await press(menu, 'ArrowDown');
    await press(menu, 'Enter');
    expect(menu.selected).toEqual(['photo-3']);
    expect(entries[0].getAttribute('aria-checked')).toBe('false');
    menu.selectionMode = 'none';
    await menu.updateComplete;
    expect(entries[3].getAttribute('role')).toBe('menuitem');
    expect(entries[3].hasAttribute('aria-checked')).toBe(false);
    const actions: unknown[] = [];
    menu.addEventListener('swc-card-view-action', (event) =>
      actions.push((event as CustomEvent).detail)
    );
    await press(menu, 'Enter');
    expect(actions).toEqual([{ id: 'photo-3', action: 'open' }]);

    const toolbar = await mount(
      canvasElement,
      'swc-card-view-option-7',
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
      const view = await mount(canvasElement, 'swc-card-view-option-3', layout);
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
      const view = await mount(canvasElement, 'swc-card-view-option-8', layout);
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
        ).toBe(tag.endsWith('5') ? '8' : '1');
        expect(root.querySelectorAll('[role="row"]')).toHaveLength(
          tag.endsWith('5') ? 1 : 8
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
      const view = await mount(canvasElement, 'swc-card-view-option-5', layout);
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
      const visited = new Set<string>();
      for (let move = 0; move < 8; move++) {
        visited.add((root.activeElement as HTMLElement).dataset.index!);
        await press('ArrowRight');
      }
      expect([...visited]).toEqual(['0', '1', '3', '4', '5', '6', '7']);
      expect(root.activeElement).toBe(cells[7]);
      const reverse = new Set<string>();
      for (let move = 0; move < 8; move++) {
        reverse.add((root.activeElement as HTMLElement).dataset.index!);
        await press('ArrowLeft');
      }
      expect([...reverse]).toEqual(['7', '6', '5', '4', '3', '1', '0']);

      await waitFor(() => {
        const first = cells[0].getBoundingClientRect();
        const below = cells[3].getBoundingClientRect();
        expect(Math.abs(below.left - first.left)).toBeLessThan(1);
        expect(below.top).toBeGreaterThan(first.top);
      });
      await press('ArrowDown');
      expect(root.activeElement).toBe(cells[3]);
      await press('ArrowUp');
      expect(root.activeElement).toBe(cells[0]);
      await press('End');
      expect(root.activeElement).toBe(cells[7]);
      await press('Home');
      expect(root.activeElement).toBe(cells[0]);
      await press('ArrowRight', true);
      await press('ArrowRight', true);
      expect(view.selected).toEqual(['photo-0', 'photo-1', 'photo-3']);
      expect(cells[3].getAttribute('aria-selected')).toBe('true');
      await press(' ');
      expect(view.selected).toEqual(['photo-0', 'photo-1']);
      expect(cells[3].getAttribute('aria-selected')).toBe('false');

      const activeControls = [
        ...cells[3].querySelectorAll<HTMLElement>('input, button'),
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
      expect(view.selected).toEqual(['photo-0', 'photo-1', 'photo-3']);

      const actions: unknown[] = [];
      view.addEventListener('swc-card-view-action', (event) => {
        actions.push((event as CustomEvent).detail);
      });
      (activeControls[2] as HTMLButtonElement).click();
      await view.updateComplete;
      expect(actions).toEqual([{ id: 'photo-3', action: 'share' }]);
      expect(view.selected).toEqual(['photo-0', 'photo-1', 'photo-3']);

      cells[3].focus();
      await press('Enter');
      expect(actions).toEqual([
        { id: 'photo-3', action: 'share' },
        { id: 'photo-3', action: 'open' },
      ]);
      view.layout = layout === 'grid' ? 'waterfall' : 'grid';
      view.style.width = '360px';
      await view.updateComplete;
      await waitFor(() => {
        expect(cells[0].getBoundingClientRect().width).toBeGreaterThan(300);
      });
      expect(root.activeElement).toBe(cells[3]);
      expect(grid.querySelectorAll('[role="row"]')).toHaveLength(1);
      expect(grid.getAttribute('aria-colcount')).toBe('8');
      expect(cells[3].getAttribute('aria-colindex')).toBe('4');

      view.style.direction = 'rtl';
      await press('Home');
      await press('ArrowLeft');
      expect(root.activeElement).toBe(cells[1]);
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
      ).toBe(340);
    });
    expect(root.activeElement).toBe(article);
    expectArticleMetadata();
  },
};
