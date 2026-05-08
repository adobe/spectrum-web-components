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
import { expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import {
  deepestRadioItemContaining,
  radioControllerSelectionChange,
  type RadioControllerSelectionChangeDetail,
} from '../index.js';
import type { DemoRadioAccordionExclusive } from './demo-hosts.js';
import meta, {
  AccordionExpandedExclusive,
  MenuMenubarAriaCheckedVertical,
  ProgrammaticSetSelectedFocus,
  RadioGroupAriaCheckedRating,
} from './radio-controller.stories.js';

function keydown(target: HTMLElement, key: string): void {
  target.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      composed: true,
      cancelable: true,
    })
  );
}

export default {
  ...meta,
  title: 'Radio controller/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

type Story = StoryObj;

/** Radiogroup pointer interaction keeps exactly one asserted `aria-checked`. */

export const RadioGroupPointerExclusive: Story = {
  ...RadioGroupAriaCheckedRating,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent(canvasElement, 'demo-radio-group-rating');

    await step('First selectable star initializes selected', async () => {
      const buttons = Array.from(
        host.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          '[data-rating-star]'
        )
      );
      expect(
        buttons.some((star) => star.getAttribute('aria-checked') === 'true')
      ).toBe(true);
    });

    await step('Click chooses a new asserted star exclusively', async () => {
      const buttons = Array.from(
        host.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          '[data-rating-star]'
        )
      );

      buttons[4]!.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true })
      );

      await host.updateComplete;
      expect(buttons[4]?.getAttribute('aria-checked')).toBe('true');
      expect(
        buttons.filter((star) => star.getAttribute('aria-checked') === 'true')
          .length
      ).toBe(1);
    });
  },
};

/** Arrow traversal co-selects the focused entry when navigation embeds Focusgroup semantics. */

export const RadioGroupArrowCoSelects: Story = {
  ...RadioGroupAriaCheckedRating,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent(canvasElement, 'demo-radio-group-rating');

    await step(
      'Arrow keys move asserted state with roving tabindex',
      async () => {
        const buttons = Array.from(
          host.shadowRoot!.querySelectorAll<HTMLButtonElement>(
            '[data-rating-star]'
          )
        );

        buttons[0]!.focus();
        expect(document.activeElement).toBe(buttons[0]);

        keydown(buttons[0]!, 'ArrowRight');
        await host.updateComplete;
        expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
        expect(
          buttons.filter((star) => star.getAttribute('aria-checked') === 'true')
            .length
        ).toBe(1);
        expect(buttons[1]?.tabIndex).toBe(0);

        /** Space reinforces focus without collapsing selection (APG radios). */

        keydown(buttons[1]!, ' ');
        await host.updateComplete;
        expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
      }
    );
  },
};

/** Vertical menu radios honor arrow traversal along Focusgroup orientation. */

export const MenuRadiosVerticalArrows: Story = {
  ...MenuMenubarAriaCheckedVertical,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent(
      canvasElement,
      'demo-radio-menu-item-radio'
    );

    await step('ArrowDown moves checked menu radios', async () => {
      const items = Array.from(
        host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-alignment]')
      );

      items[0]?.focus();

      keydown(items[0]!, 'ArrowDown');
      await host.updateComplete;
      expect(items[1]?.getAttribute('aria-checked')).toBe('true');
      expect(
        items.filter((item) => item.getAttribute('aria-checked') === 'true')
          .length
      ).toBe(1);
    });
  },
};

/** Programmatic setter bypasses synthesized clicks yet keeps aria bookkeeping aligned. */

export const ProgrammaticSelectionAPI: Story = {
  ...ProgrammaticSetSelectedFocus,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent(
      canvasElement,
      'demo-radio-programmatic-selection'
    );

    await step(
      'Footer buttons call `RadioController#setSelectedItem`',
      async () => {
        host.shadowRoot
          ?.querySelector<HTMLButtonElement>('[data-program-select="1"]')
          ?.click();

        await host.updateComplete;
        const items = Array.from(
          host.shadowRoot!.querySelectorAll<HTMLElement>('[data-program-item]')
        );
        expect(items[1]?.getAttribute('aria-checked')).toBe('true');
        expect(
          items.filter((item) => item.getAttribute('aria-checked') === 'true')
            .length
        ).toBe(1);
      }
    );
  },
};

/** Exclusive accordion headers flip `aria-expanded` + panel `[hidden]` through callbacks. */

export const AccordionExpandedCallbacks: Story = {
  ...AccordionExpandedExclusive,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoRadioAccordionExclusive>(
      canvasElement,
      'demo-radio-accordion-exclusive'
    );

    await step(
      'Opening a section collapses the previously expanded region',
      async () => {
        const headers = Array.from(
          host.shadowRoot!.querySelectorAll<HTMLButtonElement>(
            '[data-accordion]'
          )
        );

        const filters = headers.find(
          (header) => header.dataset.accordion === 'b'
        );
        filters?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, composed: true })
        );

        await host.updateComplete;

        expect(headers[0]?.getAttribute('aria-expanded')).toBe('false');

        /** Region visibility tracks header bookkeeping. */

        const filtersPanel =
          host.shadowRoot!.querySelector<HTMLElement>(`[data-panel="b"]`);
        expect(filtersPanel?.hidden).toBe(false);

        const brushesPanel =
          host.shadowRoot!.querySelector<HTMLElement>(`[data-panel="a"]`);
        expect(brushesPanel?.hidden).toBe(true);
      }
    );
  },
};

/** Dispatches bubbling composed selection change payloads on the reactive host. */

export const SelectionChangeEventDetail: Story = {
  ...RadioGroupAriaCheckedRating,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent(canvasElement, 'demo-radio-group-rating');

    await step(
      'Pointer selection emits selection change payloads',
      async () => {
        const buttons = Array.from(
          host.shadowRoot!.querySelectorAll<HTMLButtonElement>(
            '[data-rating-star]'
          )
        );

        let detail: RadioControllerSelectionChangeDetail | undefined;

        host.addEventListener(radioControllerSelectionChange, ((
          event: Event
        ) => {
          detail = (event as CustomEvent<RadioControllerSelectionChangeDetail>)
            .detail;
        }) as EventListener);

        buttons[4]!.dispatchEvent(
          new MouseEvent('click', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        expect(detail?.selectedItem).toBe(buttons[4]);

        detail = undefined;
        buttons[4]!.dispatchEvent(
          new MouseEvent('click', { bubbles: true, composed: true })
        );
        await host.updateComplete;

        expect(detail).toBeUndefined();
      }
    );
  },
};

/** `deepestRadioItemContaining` resolves composed paths deepest-first. */

export const DeepestRadioItemContainingStory: Story = {
  render: () => html`
    <span data-radio-deepest-probe-root></span>
  `,
  play: async ({ step }) => {
    await step(
      'Prefers deepest eligible element on composed path sequence',
      async () => {
        const ancestor = document.createElement('article');
        const middle = document.createElement('button');
        const leaf = document.createElement('button');
        middle.type = 'button';
        leaf.type = 'button';
        middle.append(leaf);
        ancestor.append(middle);

        const event = new PointerEvent('pointerdown', {
          bubbles: true,
          composed: true,
        });
        Object.defineProperty(event, 'composedPath', {
          value: () => [leaf, middle, ancestor],
        });

        expect(deepestRadioItemContaining(event, [ancestor, leaf])).toBe(leaf);
        expect(deepestRadioItemContaining(event, [ancestor])).toBe(ancestor);
      }
    );
  },
};
