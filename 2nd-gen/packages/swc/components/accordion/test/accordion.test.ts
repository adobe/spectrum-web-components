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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Accordion, AccordionItem } from '@adobe/spectrum-wc/accordion';

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';

import { SWC_ACCORDION_ITEM_TOGGLE_EVENT } from '../../../../core/components/accordion/Accordion.types.js';
import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/accordion.stories.js';

export default {
  ...meta,
  title: 'Accordion/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('renders three items', async () => {
      expect(items.length, 'three accordion items are rendered').toBe(3);
    });

    await step('third item is open by default', async () => {
      expect(items[2]?.open, 'third item open property is true').toBe(true);
    });

    await step('first two items are closed by default', async () => {
      expect(items[0]?.open, 'first item open property is false').toBe(false);
      expect(items[1]?.open, 'second item open property is false').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA contract
// ──────────────────────────────────────────────────────────────

export const AriaContractTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const closedItem = items[0] as AccordionItem;
    const openItem = items[2] as AccordionItem;

    const closedButton = closedItem.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;
    const closedPanel = closedItem.shadowRoot?.getElementById(
      'content'
    ) as HTMLElement;
    const openButton = openItem.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;
    const openPanel = openItem.shadowRoot?.getElementById(
      'content'
    ) as HTMLElement;

    await step('aria-expanded reflects open state', async () => {
      expect(
        closedButton.getAttribute('aria-expanded'),
        'closed item button has aria-expanded="false"'
      ).toBe('false');
      expect(
        openButton.getAttribute('aria-expanded'),
        'open item button has aria-expanded="true"'
      ).toBe('true');
    });

    await step('aria-controls value matches the panel id', async () => {
      expect(
        closedButton.getAttribute('aria-controls'),
        'aria-controls is "content"'
      ).toBe('content');
      expect(closedPanel.id, 'panel id is "content"').toBe('content');
    });

    await step(
      'panel has role="region" and aria-labelledby="header"',
      async () => {
        expect(closedPanel.getAttribute('role'), 'panel role is "region"').toBe(
          'region'
        );
        expect(
          closedPanel.getAttribute('aria-labelledby'),
          'panel aria-labelledby is "header"'
        ).toBe('header');
      }
    );

    await step(
      'closed panel has hidden attribute; open panel does not',
      async () => {
        expect(
          closedPanel.hasAttribute('hidden'),
          'closed panel has hidden attribute'
        ).toBe(true);
        expect(
          openPanel.hasAttribute('hidden'),
          'open panel does not have hidden attribute'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Open / close
// ──────────────────────────────────────────────────────────────

export const ToggleTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const item = items[0] as AccordionItem;
    const button = item.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;
    const panel = item.shadowRoot?.getElementById('content') as HTMLElement;

    await step('clicking the header button opens a closed item', async () => {
      expect(item.open, 'item starts closed').toBe(false);

      button.click();
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      await item.updateComplete;

      expect(item.open, 'item is now open').toBe(true);
      expect(
        button.getAttribute('aria-expanded'),
        'aria-expanded is "true" after open'
      ).toBe('true');
      expect(
        panel.hasAttribute('hidden'),
        'hidden attribute is removed when panel is open'
      ).toBe(false);
    });

    await step('clicking the header button again closes the item', async () => {
      button.click();
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      await item.updateComplete;

      expect(item.open, 'item is closed again').toBe(false);
      expect(
        button.getAttribute('aria-expanded'),
        'aria-expanded is "false" after close'
      ).toBe('false');
      expect(
        panel.hasAttribute('hidden'),
        'hidden attribute is restored when panel is closed'
      ).toBe(true);
    });
  },
};

export const ToggleEventTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const item = (
      await getComponents<AccordionItem>(canvasElement, 'swc-accordion-item')
    )[0] as AccordionItem;
    const button = item.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;

    await step(
      'clicking the header button dispatches the toggle event',
      async () => {
        let toggleFired = false;
        item.addEventListener(
          SWC_ACCORDION_ITEM_TOGGLE_EVENT,
          () => {
            toggleFired = true;
          },
          { once: true }
        );

        button.click();
        await item.updateComplete;

        expect(toggleFired, 'toggle event was dispatched').toBe(true);
      }
    );

    await step(
      'toggle event is cancelable; canceling reverts open state',
      async () => {
        const wasOpen = item.open;
        item.addEventListener(
          SWC_ACCORDION_ITEM_TOGGLE_EVENT,
          (event) => {
            event.preventDefault();
          },
          { once: true }
        );

        button.click();
        await item.updateComplete;

        expect(item.open, 'open state is reverted when event is canceled').toBe(
          wasOpen
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Disabled item
// ──────────────────────────────────────────────────────────────

export const DisabledItemTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item disabled>
        <span slot="label">Disabled item</span>
        Panel content
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const button = item.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;
    const panel = item.shadowRoot?.getElementById('content') as HTMLElement;

    await step('disabled item button has aria-disabled="true"', async () => {
      expect(
        button.getAttribute('aria-disabled'),
        'aria-disabled is "true"'
      ).toBe('true');
    });

    await step(
      'disabled item button does not have native disabled attribute',
      async () => {
        expect(
          button.hasAttribute('disabled'),
          'native disabled attribute is absent'
        ).toBe(false);
      }
    );

    await step('disabled item button remains in the tab order', async () => {
      expect(button.tabIndex, 'tabIndex is not -1').not.toBe(-1);
    });

    await step('disabled item panel is inert', async () => {
      expect(panel.inert, 'panel inert property is true').toBe(true);
    });

    await step('clicking a disabled item does not open it', async () => {
      button.click();
      await item.updateComplete;

      expect(item.open, 'item remains closed after click').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Host disabled
// ──────────────────────────────────────────────────────────────

export const HostDisabledTest: Story = {
  render: () => html`
    <swc-accordion disabled density="regular">
      <swc-accordion-item>
        <span slot="label">Item</span>
        Panel content
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const button = item.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;
    const panel = item.shadowRoot?.getElementById('content') as HTMLElement;

    await step(
      'item button has aria-disabled when the host accordion is disabled',
      async () => {
        expect(
          button.getAttribute('aria-disabled'),
          'aria-disabled is "true" via host disabled'
        ).toBe('true');
      }
    );

    await step(
      'item button does not have native disabled when host is disabled',
      async () => {
        expect(
          button.hasAttribute('disabled'),
          'native disabled attribute is absent'
        ).toBe(false);
      }
    );

    await step('item panel is inert when host is disabled', async () => {
      expect(panel.inert, 'panel inert is true').toBe(true);
    });

    await step(
      'clicking an item does not open it when the host is disabled',
      async () => {
        button.click();
        await item.updateComplete;

        expect(
          item.open,
          'item remains closed after click on host-disabled accordion'
        ).toBe(false);
      }
    );

    await step('clearing host disabled allows the item to open', async () => {
      accordion.disabled = false;
      await accordion.updateComplete;
      await item.updateComplete;

      expect(
        button.getAttribute('aria-disabled'),
        'aria-disabled is removed after host re-enabled'
      ).toBeNull();
      expect(panel.inert, 'panel is no longer inert').toBe(false);

      button.click();
      await item.updateComplete;

      expect(item.open, 'item opens after host is re-enabled').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard
// ──────────────────────────────────────────────────────────────

export const SpaceKeyTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item</span>
        Panel content
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const button = item.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;

    await step(
      'Space on the header button calls preventDefault and opens the item',
      async () => {
        const event = new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          cancelable: true,
        });
        button.dispatchEvent(event);
        await item.updateComplete;

        expect(
          event.defaultPrevented,
          'Space keydown default is prevented'
        ).toBe(true);
        expect(item.open, 'item is open after Space').toBe(true);
      }
    );

    await step(
      'Space on a disabled header button prevents default but does not toggle',
      async () => {
        item.disabled = true;
        await item.updateComplete;

        const event = new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          cancelable: true,
        });
        button.dispatchEvent(event);
        await item.updateComplete;

        expect(
          event.defaultPrevented,
          'Space keydown default is still prevented on disabled item'
        ).toBe(true);
        expect(
          item.open,
          'open state does not change when item is disabled'
        ).toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Exclusive open (allow-multiple: false)
// ──────────────────────────────────────────────────────────────

export const ExclusiveOpenTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const item1 = items[0] as AccordionItem;
    const item3 = items[2] as AccordionItem;
    const button1 = item1.shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;

    await step('opening one item closes the previously open item', async () => {
      expect(item3.open, 'third item starts open').toBe(true);

      button1.click();
      // closeSiblingsOnOpen defers via queueMicrotask; wait for it to run.
      await new Promise<void>((resolve) => queueMicrotask(resolve));
      await item1.updateComplete;
      await item3.updateComplete;

      expect(item1.open, 'first item is now open').toBe(true);
      expect(item3.open, 'third item is now closed').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Allow-multiple
// ──────────────────────────────────────────────────────────────

export const AllowMultipleTest: Story = {
  render: () => html`
    <swc-accordion allow-multiple density="regular">
      <swc-accordion-item>
        <span slot="label">Alchemy</span>
        Alchemy content
      </swc-accordion-item>
      <swc-accordion-item open>
        <span slot="label">Astrology</span>
        Astrology content
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const [item1, item2] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const button1 = (item1 as AccordionItem).shadowRoot?.getElementById(
      'header'
    ) as HTMLButtonElement;

    await step(
      'opening one item does not close others when allow-multiple is set',
      async () => {
        expect((item2 as AccordionItem).open, 'second item starts open').toBe(
          true
        );

        button1.click();
        await new Promise<void>((resolve) => queueMicrotask(resolve));
        await (item1 as AccordionItem).updateComplete;
        await (item2 as AccordionItem).updateComplete;

        expect((item1 as AccordionItem).open, 'first item is now open').toBe(
          true
        );
        expect((item2 as AccordionItem).open, 'second item is still open').toBe(
          true
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Heading level
// ──────────────────────────────────────────────────────────────

export const HeadingLevelTest: Story = {
  render: () => html`
    <swc-accordion level="4" density="regular">
      <swc-accordion-item>
        <span slot="label">Item</span>
        Content
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    await item.updateComplete;

    await step(
      'item renders the heading tag matching the accordion level',
      async () => {
        expect(
          item.shadowRoot?.querySelector('h4'),
          'h4 element is in the item shadow DOM'
        ).toBeTruthy();
      }
    );

    await step(
      'heading tag updates when the accordion level changes',
      async () => {
        accordion.level = 2;
        await accordion.updateComplete;
        await item.updateComplete;

        expect(
          item.shadowRoot?.querySelector('h4'),
          'h4 is no longer present after level change'
        ).toBeNull();
        expect(
          item.shadowRoot?.querySelector('h2'),
          'h2 element is in the item shadow DOM'
        ).toBeTruthy();
      }
    );
  },
};
