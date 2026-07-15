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
import '@adobe/spectrum-wc/components/button/swc-button.js';

import {
  SWC_ACCORDION_ITEM_AFTER_CLOSE_EVENT,
  SWC_ACCORDION_ITEM_AFTER_OPEN_EVENT,
  SWC_ACCORDION_ITEM_CLOSE_EVENT,
  SWC_ACCORDION_ITEM_OPEN_EVENT,
  SWC_ACCORDION_ITEM_TOGGLE_EVENT,
} from '../../../../core/components/accordion/Accordion.types.js';
import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta, {
  AllowMultiple,
  Anatomy,
  DirectActions,
  DisabledAccordion,
  ItemStates,
  MixedDisabledStates,
  Overview,
} from '../stories/accordion.stories.js';

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
// HELPERS
// ──────────────────────────────────────────────────────────────

function getHeader(item: AccordionItem): HTMLButtonElement {
  return item.shadowRoot!.getElementById('header') as HTMLButtonElement;
}

function getContentPanel(item: AccordionItem): HTMLElement {
  return item.shadowRoot!.getElementById('content') as HTMLElement;
}

function getHeadingElement(item: AccordionItem): HTMLElement {
  return item.shadowRoot!.querySelector(
    '.swc-AccordionItem-heading'
  ) as HTMLElement;
}

/** Flush the microtask queue so queueMicrotask callbacks run. */
async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
}

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('accordion has expected default property values', async () => {
      expect(accordion.level, 'default heading level is 3').toBe(3);
      expect(accordion.density, 'default density is regular').toBe('regular');
      expect(accordion.allowMultiple, 'default allow-multiple is false').toBe(
        false
      );
      expect(accordion.quiet, 'default quiet is false').toBe(false);
      expect(accordion.disabled, 'default disabled is false').toBe(false);
    });

    await step('items receive size from accordion default', async () => {
      for (const item of items) {
        expect(
          item.size,
          `item size matches accordion default size "${accordion.size}"`
        ).toBe(accordion.size);
      }
    });

    await step('item heading defaults to h3', async () => {
      const firstItem = items[0];
      const heading = getHeadingElement(firstItem);
      expect(
        heading.tagName.toLowerCase(),
        'heading tag is h3 by default'
      ).toBe('h3');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyReflectionTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );

    await step('allow-multiple reflects to attribute', async () => {
      accordion.allowMultiple = true;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('allow-multiple'),
        'allow-multiple attribute is present'
      ).toBe(true);

      accordion.allowMultiple = false;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('allow-multiple'),
        'allow-multiple attribute is removed'
      ).toBe(false);
    });

    await step('quiet reflects to attribute', async () => {
      accordion.quiet = true;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('quiet'),
        'quiet attribute is present'
      ).toBe(true);

      accordion.quiet = false;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('quiet'),
        'quiet attribute is removed'
      ).toBe(false);
    });

    await step('disabled reflects to attribute', async () => {
      accordion.disabled = true;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('disabled'),
        'disabled attribute is present'
      ).toBe(true);

      accordion.disabled = false;
      await accordion.updateComplete;
      expect(
        accordion.hasAttribute('disabled'),
        'disabled attribute is removed'
      ).toBe(false);
    });

    await step('level reflects to attribute', async () => {
      accordion.level = 4;
      await accordion.updateComplete;
      expect(accordion.getAttribute('level'), 'level attribute is 4').toBe('4');
    });

    await step('density reflects to attribute', async () => {
      accordion.density = 'compact';
      await accordion.updateComplete;
      expect(
        accordion.getAttribute('density'),
        'density attribute is compact'
      ).toBe('compact');
    });
  },
};

export const ItemPropertyReflectionTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('open reflects to attribute', async () => {
      item.open = true;
      await item.updateComplete;
      expect(item.hasAttribute('open'), 'open attribute is present').toBe(true);

      item.open = false;
      await item.updateComplete;
      expect(item.hasAttribute('open'), 'open attribute is removed').toBe(
        false
      );
    });

    await step('disabled reflects to attribute', async () => {
      item.disabled = true;
      await item.updateComplete;
      expect(
        item.hasAttribute('disabled'),
        'disabled attribute is present'
      ).toBe(true);

      item.disabled = false;
      await item.updateComplete;
      expect(
        item.hasAttribute('disabled'),
        'disabled attribute is removed'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Anatomy / Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('label slot projects into the header button', async () => {
      for (const item of items) {
        const header = getHeader(item);
        const labelSlot = header.querySelector('slot[name="label"]');
        expect(
          labelSlot,
          'label slot is inside the header button'
        ).toBeTruthy();
      }
    });

    await step('default slot is the panel content area', async () => {
      for (const item of items) {
        const panel = getContentPanel(item);
        const defaultSlot = panel.querySelector('slot:not([name])');
        expect(
          defaultSlot,
          'unnamed slot is inside the content panel'
        ).toBeTruthy();
      }
    });

    await step(
      'actions slot container is rendered when actions are slotted',
      async () => {
        const itemWithActions = items.find((item) =>
          item.querySelector('[slot="actions"]')
        );
        expect(
          itemWithActions,
          'at least one item has slotted actions content'
        ).toBeTruthy();

        const actionsContainer = itemWithActions!.shadowRoot!.querySelector(
          '.swc-AccordionItem-actions'
        );
        expect(
          actionsContainer,
          'actions container renders when actions slot is used'
        ).toBeTruthy();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Toggle behavior
// ──────────────────────────────────────────────────────────────

export const ToggleOpenTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    await step('clicking closed item opens it', async () => {
      expect(item.open, 'item starts closed').toBe(false);
      header.click();
      await item.updateComplete;
      expect(item.open, 'item is open after click').toBe(true);
    });

    await step('clicking open item closes it', async () => {
      header.click();
      await item.updateComplete;
      expect(item.open, 'item is closed after second click').toBe(false);
    });
  },
};

export const ExclusiveOpenTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
      <swc-accordion-item>
        <span slot="label">Item 3</span>
        <p>Panel 3</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const [item1, item2, item3] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header1 = getHeader(item1);
    const header2 = getHeader(item2);
    const header3 = getHeader(item3);

    await step('only one item can be open at a time by default', async () => {
      header1.click();
      await flushMicrotasks();
      await accordion.updateComplete;
      await Promise.all([
        item1.updateComplete,
        item2.updateComplete,
        item3.updateComplete,
      ]);

      expect(item1.open, 'item 1 is open').toBe(true);
      expect(item2.open, 'item 2 is closed').toBe(false);
      expect(item3.open, 'item 3 is closed').toBe(false);
    });

    await step('opening item 2 closes item 1', async () => {
      header2.click();
      await flushMicrotasks();
      await accordion.updateComplete;
      await Promise.all([item1.updateComplete, item2.updateComplete]);

      expect(item1.open, 'item 1 is now closed').toBe(false);
      expect(item2.open, 'item 2 is now open').toBe(true);
    });

    await step('opening item 3 closes item 2', async () => {
      header3.click();
      await flushMicrotasks();
      await accordion.updateComplete;
      await Promise.all([item2.updateComplete, item3.updateComplete]);

      expect(item2.open, 'item 2 is now closed').toBe(false);
      expect(item3.open, 'item 3 is now open').toBe(true);
    });

    await step(
      'clicking open item closes it without opening another',
      async () => {
        header3.click();
        await flushMicrotasks();
        await accordion.updateComplete;
        await item3.updateComplete;

        expect(item3.open, 'item 3 is now closed').toBe(false);
        const anyOpen = [item1, item2, item3].some((i) => i.open);
        expect(anyOpen, 'no items are open').toBe(false);
      }
    );
  },
};

export const AllowMultipleTest: Story = {
  ...AllowMultiple,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('allow-multiple permits more than one open item', async () => {
      expect(accordion.allowMultiple, 'allow-multiple is set').toBe(true);

      const openItems = items.filter((i) => i.open);
      expect(
        openItems.length,
        'multiple items can be open simultaneously'
      ).toBeGreaterThan(1);
    });

    await step(
      'opening a third item does not close the other open ones',
      async () => {
        const closedItem = items.find((i) => !i.open);
        if (!closedItem) {
          return;
        }

        const openCountBefore = items.filter((i) => i.open).length;
        getHeader(closedItem).click();
        await flushMicrotasks();
        await accordion.updateComplete;
        await closedItem.updateComplete;

        const openCountAfter = items.filter((i) => i.open).length;
        expect(openCountAfter, 'open count increased by one').toBe(
          openCountBefore + 1
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Controlled (cancelable toggle)
// ──────────────────────────────────────────────────────────────

export const CanceledToggleTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item open>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const [item1, item2] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header1 = getHeader(item1);

    await step(
      'preventDefault() on the toggle event reverts the open state',
      async () => {
        expect(item1.open, 'item 1 starts closed').toBe(false);
        expect(item2.open, 'item 2 starts open').toBe(true);

        const controller = new AbortController();
        accordion.addEventListener(
          SWC_ACCORDION_ITEM_TOGGLE_EVENT,
          (event: Event) => event.preventDefault(),
          { signal: controller.signal }
        );

        header1.click();
        await item1.updateComplete;

        expect(item1.open, 'item 1 state reverted to closed').toBe(false);

        controller.abort();
      }
    );

    await step(
      'item state remains unchanged after prevented toggle',
      async () => {
        expect(item2.open, 'item 2 is still open').toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard interaction
// ──────────────────────────────────────────────────────────────

export const KeyboardSpaceTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    await step('Space key toggles the item open', async () => {
      expect(item.open, 'item starts closed').toBe(false);

      header.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          cancelable: true,
        })
      );
      await item.updateComplete;

      expect(item.open, 'item is open after Space').toBe(true);
    });

    await step('Space key toggles the item closed again', async () => {
      header.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          cancelable: true,
        })
      );
      await item.updateComplete;

      expect(item.open, 'item is closed after second Space').toBe(false);
    });
  },
};

export const KeyboardSpacePreventDefaultTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    await step(
      'Space on the header button calls preventDefault to suppress scroll',
      async () => {
        let defaultPrevented = false;
        const spaceEvent = new KeyboardEvent('keydown', {
          key: ' ',
          bubbles: true,
          cancelable: true,
        });
        // Intercept the event before the handler runs to capture defaultPrevented
        header.addEventListener(
          'keydown',
          (event) => {
            // Schedule after the sync handler
            queueMicrotask(() => {
              defaultPrevented = event.defaultPrevented;
            });
          },
          { capture: true }
        );
        header.dispatchEvent(spaceEvent);
        await flushMicrotasks();
        await item.updateComplete;

        expect(
          defaultPrevented,
          'Space keydown default is prevented on the header button'
        ).toBe(true);
      }
    );
  },
};

/**
 * Guards the B3 breaking change: 2nd-gen drops the 1st-gen `FocusGroupController`
 * arrow/Home/End navigation between headers. This test fails if that behavior is
 * accidentally reintroduced.
 */
export const NoArrowKeyNavTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const [item1, item2] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header1 = getHeader(item1);
    const doc = item1.ownerDocument;

    await step(
      'ArrowDown on a header does not move focus to the next header',
      async () => {
        // The header button lives in the item's shadow root, so focus
        // retargets to the host: document.activeElement is the item, and the
        // shadow root's activeElement is the button itself.
        header1.focus();
        expect(doc.activeElement, 'item 1 host holds focus').toBe(item1);
        expect(
          item1.shadowRoot?.activeElement,
          'header 1 button is focused within item 1'
        ).toBe(header1);

        header1.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
            cancelable: true,
          })
        );
        await item1.updateComplete;

        expect(
          doc.activeElement,
          'focus stays on item 1 (no roving navigation to item 2)'
        ).toBe(item1);
        expect(doc.activeElement, 'focus did not jump to item 2').not.toBe(
          item2
        );
        expect(
          item1.shadowRoot?.activeElement,
          'header 1 button is still focused'
        ).toBe(header1);
      }
    );
  },
};

export const KeyboardInPanelNoToggleTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item open>
        <span slot="label">Item 1</span>
        <div>
          <button id="inner-button">Inner button</button>
        </div>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const innerButton = canvasElement.querySelector(
      '#inner-button'
    ) as HTMLButtonElement;

    await step(
      'Space on inner panel button does not toggle the accordion item',
      async () => {
        expect(item.open, 'item starts open').toBe(true);

        innerButton.focus();
        innerButton.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: ' ',
            bubbles: true,
            cancelable: true,
          })
        );
        await item.updateComplete;

        expect(item.open, 'item remains open after Space in panel').toBe(true);
      }
    );

    await step(
      'Enter on inner panel button does not toggle the accordion item',
      async () => {
        innerButton.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        );
        await item.updateComplete;

        expect(item.open, 'item remains open after Enter in panel').toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Disabled item
// ──────────────────────────────────────────────────────────────

export const DisabledItemAriaTest: Story = {
  ...ItemStates,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const disabledItem = items.find((i) => i.disabled);

    expect(disabledItem, 'a disabled item exists in the story').toBeTruthy();
    const header = getHeader(disabledItem!);

    await step(
      'disabled item header has aria-disabled="true" instead of native disabled',
      async () => {
        expect(
          header.getAttribute('aria-disabled'),
          'aria-disabled is "true"'
        ).toBe('true');
        expect(
          header.hasAttribute('disabled'),
          'native disabled attribute is NOT present'
        ).toBe(false);
      }
    );

    await step('disabled item panel is inert', async () => {
      const panel = getContentPanel(disabledItem!);
      expect(panel.inert, 'content panel has inert=true').toBe(true);
    });
  },
};

export const DisabledItemNoToggleTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item disabled>
        <span slot="label">Disabled item</span>
        <p>Panel content</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    await step(
      'clicking a disabled header does not open the item',
      async () => {
        expect(item.open, 'item starts closed').toBe(false);

        header.click();
        await item.updateComplete;

        expect(item.open, 'item remains closed after click').toBe(false);
      }
    );

    await step(
      'Space key on a disabled header does not open the item',
      async () => {
        header.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: ' ',
            bubbles: true,
            cancelable: true,
          })
        );
        await item.updateComplete;

        expect(item.open, 'item remains closed after Space').toBe(false);
      }
    );

    await step('disabled item does not dispatch toggle event', async () => {
      let fired = false;
      item.addEventListener(SWC_ACCORDION_ITEM_TOGGLE_EVENT, () => {
        fired = true;
      });

      header.click();
      await item.updateComplete;

      expect(fired, 'toggle event was not dispatched for disabled item').toBe(
        false
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Host disabled
// ──────────────────────────────────────────────────────────────

export const HostDisabledTest: Story = {
  ...DisabledAccordion,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step(
      'all item headers show aria-disabled when accordion host is disabled',
      async () => {
        expect(accordion.disabled, 'accordion host is disabled').toBe(true);

        for (const item of items) {
          const header = getHeader(item);
          expect(
            header.getAttribute('aria-disabled'),
            `item "${item.textContent?.trim()}" header has aria-disabled`
          ).toBe('true');
        }
      }
    );

    await step('all item panels are inert when host is disabled', async () => {
      for (const item of items) {
        const panel = getContentPanel(item);
        expect(
          panel.inert,
          `item "${item.textContent?.trim()}" panel is inert`
        ).toBe(true);
      }
    });

    await step(
      'clicking any header does not toggle when host is disabled',
      async () => {
        const openStateBefore = items.map((i) => i.open);

        for (const item of items) {
          getHeader(item).click();
          await flushMicrotasks();
          await item.updateComplete;
        }

        for (let i = 0; i < items.length; i++) {
          expect(items[i].open, `item ${i + 1} open state unchanged`).toBe(
            openStateBefore[i]
          );
        }
      }
    );
  },
};

export const HostReenablePreservesItemStateTest: Story = {
  ...MixedDisabledStates,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    // Story renders with host disabled=true and one item with disabled=true
    const perItemDisabledBefore = items.map((i) => i.disabled);

    await step(
      're-enabling the host does not clear per-item disabled state',
      async () => {
        accordion.disabled = false;
        await accordion.updateComplete;
        await Promise.all(items.map((i) => i.updateComplete));

        for (let i = 0; i < items.length; i++) {
          expect(
            items[i].disabled,
            `item ${i + 1} per-item disabled unchanged after host re-enable`
          ).toBe(perItemDisabledBefore[i]);
        }
      }
    );

    await step(
      'previously disabled item remains non-interactive after host re-enable',
      async () => {
        const stillDisabledItem = items.find((i) => i.disabled);
        if (!stillDisabledItem) {
          return;
        }

        const header = getHeader(stillDisabledItem);
        expect(
          header.getAttribute('aria-disabled'),
          'per-item disabled: header still has aria-disabled'
        ).toBe('true');
      }
    );

    await step(
      'non-disabled items become interactive again after host re-enable',
      async () => {
        const reenabledItem = items.find((i) => !i.disabled);
        if (!reenabledItem) {
          return;
        }

        const header = getHeader(reenabledItem);
        expect(
          header.getAttribute('aria-disabled'),
          're-enabled item header: aria-disabled is absent'
        ).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Direct actions
// ──────────────────────────────────────────────────────────────

export const DirectActionsNoToggleTest: Story = {
  ...DirectActions,
  play: async ({ canvasElement, step }) => {
    const items = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step(
      'clicking an action button does not toggle the accordion item',
      async () => {
        const itemWithActions = items[0];
        const actionButton = itemWithActions.querySelector(
          '[slot="actions"]'
        ) as HTMLElement;

        expect(actionButton, 'action button exists in the story').toBeTruthy();

        const openBefore = itemWithActions.open;
        actionButton.click();
        await itemWithActions.updateComplete;

        expect(
          itemWithActions.open,
          'item open state unchanged after action button click'
        ).toBe(openBefore);
      }
    );

    await step(
      'actions container is a sibling of the heading, not inside it',
      async () => {
        const itemWithActions = items.find((i) =>
          i.querySelector('[slot="actions"]')
        );
        expect(itemWithActions, 'item with actions exists').toBeTruthy();

        const actionsContainer = itemWithActions!.shadowRoot!.querySelector(
          '.swc-AccordionItem-actions'
        );
        const heading = itemWithActions!.shadowRoot!.querySelector(
          '.swc-AccordionItem-heading'
        );

        expect(actionsContainer, 'actions container exists').toBeTruthy();
        expect(
          heading?.contains(actionsContainer),
          'actions container is NOT inside the heading element'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Events
// ──────────────────────────────────────────────────────────────

export const ToggleEventTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
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
    const header = getHeader(item);

    await step(
      'swc-accordion-item-toggle fires on open, targets the item, and bubbles/composes to the accordion',
      async () => {
        let fired = false;
        let eventTarget: EventTarget | null = null;
        let bubblesAndComposes = false;
        // Listening on the accordion (not the item) confirms the event bubbles
        // and crosses the item's shadow boundary (composed).
        accordion.addEventListener(
          SWC_ACCORDION_ITEM_TOGGLE_EVENT,
          (event: Event) => {
            fired = true;
            eventTarget = event.target;
            bubblesAndComposes = event.bubbles && event.composed;
          },
          { once: true }
        );

        header.click();
        await item.updateComplete;

        expect(fired, 'swc-accordion-item-toggle was dispatched').toBe(true);
        expect(eventTarget, 'event target is the accordion item').toBe(item);
        expect(bubblesAndComposes, 'event bubbles and is composed').toBe(true);
      }
    );

    await step('swc-accordion-item-toggle fires on close', async () => {
      let fired = false;
      accordion.addEventListener(
        SWC_ACCORDION_ITEM_TOGGLE_EVENT,
        () => {
          fired = true;
        },
        { once: true }
      );

      header.click();
      await item.updateComplete;

      expect(fired, 'swc-accordion-item-toggle was dispatched on close').toBe(
        true
      );
    });
  },
};

export const OpenCloseEventsTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    await step('swc-open fires when item opens', async () => {
      let openFired = false;
      item.addEventListener(SWC_ACCORDION_ITEM_OPEN_EVENT, () => {
        openFired = true;
      });

      header.click();
      await item.updateComplete;

      expect(openFired, 'swc-open was dispatched').toBe(true);
    });

    await step('swc-close fires when item closes', async () => {
      let closeFired = false;
      item.addEventListener(SWC_ACCORDION_ITEM_CLOSE_EVENT, () => {
        closeFired = true;
      });

      header.click();
      await item.updateComplete;

      expect(closeFired, 'swc-close was dispatched').toBe(true);
    });
  },
};

export const AfterEventsTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);

    const waitForEvent = (eventName: string, timeout = 2000): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        const t = setTimeout(
          () =>
            reject(new Error(`${eventName} never fired within ${timeout}ms`)),
          timeout
        );
        item.addEventListener(
          eventName,
          () => {
            clearTimeout(t);
            resolve();
          },
          { once: true }
        );
      });

    await step('swc-after-open fires after the item opens', async () => {
      // Register the listener before clicking so synchronous dispatch is captured
      const afterOpenPromise = waitForEvent(
        SWC_ACCORDION_ITEM_AFTER_OPEN_EVENT
      );
      header.click();
      await item.updateComplete;
      await afterOpenPromise;
    });

    await step('swc-after-close fires after the item closes', async () => {
      const afterClosePromise = waitForEvent(
        SWC_ACCORDION_ITEM_AFTER_CLOSE_EVENT
      );
      header.click();
      await item.updateComplete;
      await afterClosePromise;
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA
// ──────────────────────────────────────────────────────────────

export const AriaHiddenClosedPanelTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);
    const panel = getContentPanel(item);

    await step(
      'closed item: aria-hidden panel and aria-expanded="false"',
      async () => {
        expect(item.open, 'item is closed').toBe(false);
        expect(
          panel.getAttribute('aria-hidden'),
          'closed panel has aria-hidden="true"'
        ).toBe('true');
        expect(
          panel.hasAttribute('hidden'),
          'HTML hidden attribute is not used'
        ).toBe(false);
        // ARIA snapshots cannot distinguish aria-expanded="false" from a missing
        // attribute, so assert the literal value here to guard the closed state.
        expect(
          header.getAttribute('aria-expanded'),
          'closed header has aria-expanded="false"'
        ).toBe('false');
      }
    );

    await step(
      'open item: panel exposed and aria-expanded="true"',
      async () => {
        header.click();
        await item.updateComplete;

        expect(item.open, 'item is open').toBe(true);
        expect(
          panel.getAttribute('aria-hidden'),
          'open panel has no aria-hidden'
        ).toBeNull();
        expect(
          header.getAttribute('aria-expanded'),
          'open header has aria-expanded="true"'
        ).toBe('true');
      }
    );
  },
};

export const AriaControlsRegionTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item open>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );
    const header = getHeader(item);
    const panel = getContentPanel(item);

    await step(
      'header button has aria-controls pointing to the panel',
      async () => {
        expect(
          header.getAttribute('aria-controls'),
          'aria-controls is "content"'
        ).toBe('content');
      }
    );

    await step('panel has role="region"', async () => {
      expect(panel.getAttribute('role'), 'panel role is "region"').toBe(
        'region'
      );
    });

    await step(
      'panel has aria-labelledby pointing to the header button',
      async () => {
        expect(
          panel.getAttribute('aria-labelledby'),
          'panel aria-labelledby is "header"'
        ).toBe('header');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Heading level
// ──────────────────────────────────────────────────────────────

export const HeadingLevelPropagationTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
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

    for (const level of [2, 3, 4, 5, 6] as const) {
      await step(`level=${level} propagates as h${level}`, async () => {
        accordion.level = level;
        await accordion.updateComplete;
        await item.updateComplete;

        const heading = getHeadingElement(item);
        expect(heading.tagName.toLowerCase(), `heading tag is h${level}`).toBe(
          `h${level}`
        );
      });
    }
  },
};

export const HeadingLevelClampingTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
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

    await step('level below 2 is clamped to 2', async () => {
      accordion.level = 1 as Accordion['level'];
      await accordion.updateComplete;
      await item.updateComplete;

      const heading = getHeadingElement(item);
      expect(heading.tagName.toLowerCase(), 'heading clamped to h2').toBe('h2');
      expect(accordion.level, 'accordion.level property clamped to 2').toBe(2);
    });

    await step('level above 6 is clamped to 6', async () => {
      accordion.level = 7 as Accordion['level'];
      await accordion.updateComplete;
      await item.updateComplete;

      const heading = getHeadingElement(item);
      expect(heading.tagName.toLowerCase(), 'heading clamped to h6').toBe('h6');
      expect(accordion.level, 'accordion.level property clamped to 6').toBe(6);
    });
  },
};

export const StandaloneItemHeadingTest: Story = {
  render: () => html`
    <swc-accordion-item>
      <span slot="label">Standalone item</span>
      <p>Panel content</p>
    </swc-accordion-item>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('standalone item defaults to h3 heading', async () => {
      const heading = getHeadingElement(item);
      expect(
        heading.tagName.toLowerCase(),
        'standalone item uses h3 by default'
      ).toBe('h3');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Size propagation
// ──────────────────────────────────────────────────────────────

export const SizePropagationDynamicTest: Story = {
  render: () => html`
    <swc-accordion density="regular" size="l">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
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

    await step('size is propagated from accordion to item', async () => {
      expect(item.size, 'item inherits initial size "l"').toBe('l');
    });

    await step('changing size on accordion updates items', async () => {
      accordion.size = 's';
      await accordion.updateComplete;
      await item.updateComplete;

      expect(item.size, 'item size updated to "s"').toBe('s');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Enforced exclusive open on host re-enable
// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────
// TEST: Host-element focus/click delegation
// ──────────────────────────────────────────────────────────────

export const FocusDelegationTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step(
      'item.focus() moves focus to the inner header button',
      async () => {
        item.focus();
        expect(
          item.shadowRoot?.activeElement,
          'inner header button holds focus after item.focus()'
        ).toBe(item.shadowRoot?.getElementById('header'));
      }
    );
  },
};

export const ClickDelegationTest: Story = {
  render: () => html`
    <swc-accordion density="regular">
      <swc-accordion-item>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const item = await getComponent<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step('item.click() toggles the item open', async () => {
      expect(item.open, 'item starts closed').toBe(false);
      item.click();
      await item.updateComplete;
      expect(item.open, 'item is open after item.click()').toBe(true);
    });

    await step('item.click() toggles the item closed again', async () => {
      item.click();
      await item.updateComplete;
      expect(item.open, 'item is closed after second item.click()').toBe(false);
    });
  },
};

export const EnforceExclusiveOpenOnReenableTest: Story = {
  render: () => html`
    <swc-accordion density="regular" disabled>
      <swc-accordion-item open>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item open>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const [item1, item2] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step(
      're-enabling accordion with allow-multiple=false enforces exclusive open',
      async () => {
        expect(accordion.allowMultiple, 'allow-multiple is false').toBe(false);

        accordion.disabled = false;
        await accordion.updateComplete;
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        const openCount = [item1, item2].filter((i) => i.open).length;
        expect(
          openCount,
          'at most one item is open after re-enable without allow-multiple'
        ).toBeLessThanOrEqual(1);
      }
    );
  },
};

export const InitialSingleSelectEnforcedTest: Story = {
  render: () => html`
    <swc-accordion accessible-label="Initial single-select test">
      <swc-accordion-item open>
        <span slot="label">Item 1</span>
        <p>Panel 1</p>
      </swc-accordion-item>
      <swc-accordion-item open>
        <span slot="label">Item 2</span>
        <p>Panel 2</p>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const accordion = await getComponent<Accordion>(
      canvasElement,
      'swc-accordion'
    );
    const [item1, item2] = await getComponents<AccordionItem>(
      canvasElement,
      'swc-accordion-item'
    );

    await step(
      'two items starting open — only one survives the initial single-select enforcement',
      async () => {
        await accordion.updateComplete;
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        const openCount = [item1, item2].filter((i) => i.open).length;
        expect(openCount, 'exactly one item is open after initial render').toBe(
          1
        );
      }
    );
  },
};

export const NestedAccordionIsolationTest: Story = {
  render: () => html`
    <swc-accordion accessible-label="Outer accordion">
      <swc-accordion-item open>
        <span slot="label">Outer item</span>
        <swc-accordion accessible-label="Inner accordion">
          <swc-accordion-item>
            <span slot="label">Inner item</span>
            <p>Inner panel</p>
          </swc-accordion-item>
        </swc-accordion>
      </swc-accordion-item>
    </swc-accordion>
  `,
  play: async ({ canvasElement, step }) => {
    const [outerItem, innerItem] =
      canvasElement.querySelectorAll<AccordionItem>('swc-accordion-item');

    await outerItem.updateComplete;
    await innerItem.updateComplete;

    await step(
      'toggling an inner accordion item does not affect outer accordion items',
      async () => {
        expect(outerItem.open, 'outer item starts open').toBe(true);

        getHeader(innerItem).click();
        await flushMicrotasks();
        await innerItem.updateComplete;
        await outerItem.updateComplete;

        expect(
          outerItem.open,
          'outer item stays open after inner item toggle'
        ).toBe(true);
      }
    );
  },
};
