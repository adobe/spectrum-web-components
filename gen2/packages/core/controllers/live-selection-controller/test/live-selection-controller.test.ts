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

import '../stories/demo-hosts.js';

import type {
  DemoLiveSelectionGroup,
  DemoLiveSelectionItem,
} from '../stories/demo-hosts.js';
import liveSelectionMeta, {
  MultipleMode,
  SingleMode,
} from '../stories/live-selection-controller.stories.js';

// ──────────────────────────────────────────────────────────────
//     HELPERS
// ──────────────────────────────────────────────────────────────

/** Flush the microtask queue so queueMicrotask callbacks run. */
async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
}

/**
 * Queries a `demo-live-selection-group` from the canvas and awaits its
 * update.
 */
async function getGroup(
  canvasElement: HTMLElement
): Promise<DemoLiveSelectionGroup> {
  const group = canvasElement.querySelector(
    'demo-live-selection-group'
  ) as DemoLiveSelectionGroup;
  await group.updateComplete;
  return group;
}

/**
 * Queries all `demo-live-selection-item` elements from the canvas and awaits
 * all their updates.
 */
async function getItems(
  canvasElement: HTMLElement
): Promise<DemoLiveSelectionItem[]> {
  const items = Array.from(
    canvasElement.querySelectorAll('demo-live-selection-item')
  ) as DemoLiveSelectionItem[];
  await Promise.all(items.map((item) => item.updateComplete));
  return items;
}

/** Clicks the toggle button inside a demo item. */
function clickToggle(item: DemoLiveSelectionItem): void {
  const btn = item.shadowRoot?.querySelector('button') as HTMLButtonElement;
  btn.click();
}

// ──────────────────────────────────────────────────────────────
//     STORY EXPORT
// ──────────────────────────────────────────────────────────────

export default {
  ...liveSelectionMeta,
  title: 'Controllers/Live selection controller/Tests',
  parameters: {
    ...liveSelectionMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
//     Single mode: basic exclusive-open behavior
// ──────────────────────────────────────────────────────────────

export const SingleModeExclusiveOpenTest: Story = {
  ...SingleMode,
  play: async ({ canvasElement, step }) => {
    const items = await getItems(canvasElement);
    const [itemA, itemB, itemC] = items;

    await step('initial: only item B is open', async () => {
      expect(itemA.open, 'item A starts closed').toBe(false);
      expect(itemB.open, 'item B starts open').toBe(true);
      expect(itemC.open, 'item C starts closed').toBe(false);
    });

    await step('opening item A closes item B', async () => {
      clickToggle(itemA);
      await flushMicrotasks();
      await Promise.all(items.map((i) => i.updateComplete));

      expect(itemA.open, 'item A is now open').toBe(true);
      expect(itemB.open, 'item B was closed by the controller').toBe(false);
      expect(itemC.open, 'item C remains closed').toBe(false);
    });

    await step('opening item C closes item A', async () => {
      clickToggle(itemC);
      await flushMicrotasks();
      await Promise.all(items.map((i) => i.updateComplete));

      expect(itemA.open, 'item A was closed by the controller').toBe(false);
      expect(itemB.open, 'item B remains closed').toBe(false);
      expect(itemC.open, 'item C is now open').toBe(true);
    });

    await step('closing the open item leaves all items closed', async () => {
      clickToggle(itemC);
      await flushMicrotasks();
      await Promise.all(items.map((i) => i.updateComplete));

      expect(itemA.open, 'item A remains closed').toBe(false);
      expect(itemB.open, 'item B remains closed').toBe(false);
      expect(itemC.open, 'item C is now closed').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
//     Multiple mode: no constraint
// ──────────────────────────────────────────────────────────────

export const MultipleModeNoConstraintTest: Story = {
  ...MultipleMode,
  play: async ({ canvasElement, step }) => {
    const items = await getItems(canvasElement);
    const [itemA, itemB, itemC] = items;

    await step('initial: items A and B are open', async () => {
      expect(itemA.open, 'item A starts open').toBe(true);
      expect(itemB.open, 'item B starts open').toBe(true);
      expect(itemC.open, 'item C starts closed').toBe(false);
    });

    await step('opening item C does not close A or B', async () => {
      clickToggle(itemC);
      await flushMicrotasks();
      await Promise.all(items.map((i) => i.updateComplete));

      expect(itemA.open, 'item A remains open').toBe(true);
      expect(itemB.open, 'item B remains open').toBe(true);
      expect(itemC.open, 'item C is now open').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
//     PR bug 1: Read-your-write ordering
//
//     A change listener on the host reads the CURRENT (new) item state when
//     the toggle event fires, not the previous state. The controller defers
//     sibling closure by a microtask; the listener that fires synchronously
//     should see the final committed state.
// ──────────────────────────────────────────────────────────────

export const ReadYourWriteOrderingTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="single">
      <demo-live-selection-item label="Item 1"></demo-live-selection-item>
      <demo-live-selection-item label="Item 2"></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);
    const [item1, item2] = await getItems(canvasElement);

    await step(
      'toggle event listener sees the new open state on the source item',
      async () => {
        let capturedOpenState: boolean | undefined;

        const controller = new AbortController();
        group.addEventListener(
          'demo-toggle',
          (event) => {
            capturedOpenState = (event.target as DemoLiveSelectionItem).open;
          },
          { signal: controller.signal }
        );

        expect(item1.open, 'item 1 starts closed').toBe(false);
        clickToggle(item1);
        await flushMicrotasks();
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        // The listener must see the new value (true), not the old value (false).
        expect(
          capturedOpenState,
          'listener sees open=true immediately after the item opens'
        ).toBe(true);

        controller.abort();
      }
    );

    await step(
      'toggle event listener sees the new closed state when an item closes',
      async () => {
        let capturedOpenState: boolean | undefined;

        const controller = new AbortController();
        group.addEventListener(
          'demo-toggle',
          (event) => {
            capturedOpenState = (event.target as DemoLiveSelectionItem).open;
          },
          { signal: controller.signal }
        );

        expect(item1.open, 'item 1 is currently open').toBe(true);
        clickToggle(item1);
        await flushMicrotasks();
        await item1.updateComplete;

        expect(
          capturedOpenState,
          'listener sees open=false after the item closes'
        ).toBe(false);

        controller.abort();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
//     PR bug 2: Canceled toggle does not close siblings
//
//     When the host calls event.preventDefault() on the toggle event, the item
//     reverts its open state synchronously. The controller must not close
//     other open items in response to a toggle that was ultimately prevented.
// ──────────────────────────────────────────────────────────────

export const CanceledToggleNoSiblingCloseTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="single">
      <demo-live-selection-item label="Item 1" open></demo-live-selection-item>
      <demo-live-selection-item label="Item 2"></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);
    const [item1, item2] = await getItems(canvasElement);

    await step('initial: item 1 is open, item 2 is closed', async () => {
      expect(item1.open, 'item 1 starts open').toBe(true);
      expect(item2.open, 'item 2 starts closed').toBe(false);
    });

    await step(
      'clicking item 2 is prevented: item 2 stays closed, item 1 stays open',
      async () => {
        const controller = new AbortController();
        group.addEventListener(
          'demo-toggle',
          (event) => {
            event.preventDefault();
          },
          { signal: controller.signal }
        );

        clickToggle(item2);
        await flushMicrotasks();
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        // The toggle was canceled: item 2 must have reverted to closed,
        // and the controller must NOT have closed item 1 in response.
        expect(
          item2.open,
          'item 2 reverted to closed after prevented toggle'
        ).toBe(false);
        expect(
          item1.open,
          'item 1 remains open; controller did not close it for a canceled toggle'
        ).toBe(true);

        controller.abort();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
//     PR bug 3: Mode switch + refresh clears extra open items
//
//     Switching from 'multiple' to 'single' while items are open, then
//     calling refresh(), must close all but the first open item.
// ──────────────────────────────────────────────────────────────

export const ModeSwitchRefreshTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="multiple">
      <demo-live-selection-item label="Item 1" open></demo-live-selection-item>
      <demo-live-selection-item label="Item 2" open></demo-live-selection-item>
      <demo-live-selection-item label="Item 3" open></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);
    const [item1, item2, item3] = await getItems(canvasElement);

    await step(
      'initial: all three items are open in multiple mode',
      async () => {
        expect(item1.open, 'item 1 is open').toBe(true);
        expect(item2.open, 'item 2 is open').toBe(true);
        expect(item3.open, 'item 3 is open').toBe(true);
      }
    );

    await step(
      'switching to single mode then calling refresh() closes all but the first',
      async () => {
        group.mode = 'single';
        group.refresh();
        await Promise.all([
          item1.updateComplete,
          item2.updateComplete,
          item3.updateComplete,
        ]);

        expect(item1.open, 'item 1 (first) remains open').toBe(true);
        expect(item2.open, 'item 2 was closed by refresh()').toBe(false);
        expect(item3.open, 'item 3 was closed by refresh()').toBe(false);
      }
    );

    await step(
      'switching back to multiple mode and back to single does not re-close',
      async () => {
        group.mode = 'multiple';
        // Open item 2 again
        item2.open = true;
        await item2.updateComplete;

        group.mode = 'single';
        group.refresh();
        await Promise.all([
          item1.updateComplete,
          item2.updateComplete,
          item3.updateComplete,
        ]);

        const openCount = [item1, item2, item3].filter((i) => i.open).length;
        expect(openCount, 'exactly one item is open after refresh').toBe(1);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
//     Refresh on empty group is a no-op
// ──────────────────────────────────────────────────────────────

export const RefreshEmptyGroupTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="single"></demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);

    await step('refresh() on an empty group does not throw', async () => {
      expect(() => group.refresh()).not.toThrow();
    });
  },
};

// ──────────────────────────────────────────────────────────────
//     Refresh in multiple mode is a no-op
// ──────────────────────────────────────────────────────────────

export const RefreshMultipleModeNoopTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="multiple">
      <demo-live-selection-item label="Item 1" open></demo-live-selection-item>
      <demo-live-selection-item label="Item 2" open></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);
    const [item1, item2] = await getItems(canvasElement);

    await step(
      'refresh() in multiple mode does not close any items',
      async () => {
        group.refresh();
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        expect(item1.open, 'item 1 remains open').toBe(true);
        expect(item2.open, 'item 2 remains open').toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
//     Disabled item is skipped
// ──────────────────────────────────────────────────────────────

export const DisabledItemSkippedTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="single">
      <demo-live-selection-item label="Item 1" open></demo-live-selection-item>
      <demo-live-selection-item
        label="Item 2 (disabled)"
        disabled
      ></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const [item1, item2] = await getItems(canvasElement);

    await step('clicking a disabled item does not open it', async () => {
      expect(item2.disabled, 'item 2 is disabled').toBe(true);
      expect(item2.open, 'item 2 starts closed').toBe(false);

      clickToggle(item2);
      await flushMicrotasks();
      await Promise.all([item1.updateComplete, item2.updateComplete]);

      expect(item2.open, 'item 2 remains closed').toBe(false);
      expect(item1.open, 'item 1 is unaffected').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
//     Reconnect after disconnect restores controller
//
//     When the host is removed from the DOM and then re-inserted, Lit calls
//     hostConnected() again and the controller re-attaches its listener.
//     Sibling-close enforcement must resume as if nothing happened.
// ──────────────────────────────────────────────────────────────

export const ReconnectRestoresControllerTest: Story = {
  render: () => html`
    <div id="mount-point">
      <demo-live-selection-group mode="single">
        <demo-live-selection-item
          label="Item 1"
          open
        ></demo-live-selection-item>
        <demo-live-selection-item label="Item 2"></demo-live-selection-item>
      </demo-live-selection-group>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const mountPoint = canvasElement.querySelector(
      '#mount-point'
    ) as HTMLElement;
    const group = await getGroup(canvasElement);
    const [item1, item2] = await getItems(canvasElement);

    await step('disconnect then reconnect the group', async () => {
      mountPoint.removeChild(group);
      await group.updateComplete;
      mountPoint.appendChild(group);
      await group.updateComplete;
    });

    await step('after reconnect, opening item 2 closes item 1', async () => {
      expect(item1.open, 'item 1 is open before toggle').toBe(true);
      clickToggle(item2);
      await flushMicrotasks();
      await Promise.all([item1.updateComplete, item2.updateComplete]);

      expect(item2.open, 'item 2 is now open').toBe(true);
      expect(item1.open, 'item 1 was closed by the controller').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
//     Dynamically added items are picked up on the next event
//
//     getItems() is called live on every toggle event. A child appended
//     after construction is included in the next scan and subject to the
//     single-select constraint.
// ──────────────────────────────────────────────────────────────

export const DynamicItemAddedTest: Story = {
  render: () => html`
    <demo-live-selection-group mode="single">
      <demo-live-selection-item label="Item 1" open></demo-live-selection-item>
    </demo-live-selection-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getGroup(canvasElement);
    const [item1] = await getItems(canvasElement);

    await step(
      'a dynamically added item is picked up by getItems and enforces the constraint',
      async () => {
        const item2 = document.createElement(
          'demo-live-selection-item'
        ) as DemoLiveSelectionItem;
        item2.label = 'Item 2';
        group.appendChild(item2);
        await item2.updateComplete;

        expect(item1.open, 'item 1 starts open').toBe(true);
        clickToggle(item2);
        await flushMicrotasks();
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        expect(item2.open, 'item 2 is now open').toBe(true);
        expect(
          item1.open,
          'item 1 was closed: controller read the new item from live DOM'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
//     Controller cleans up on disconnect
// ──────────────────────────────────────────────────────────────

export const DisconnectCleanupTest: Story = {
  render: () => html`
    <div id="mount-point">
      <demo-live-selection-group mode="single">
        <demo-live-selection-item
          label="Item 1"
          open
        ></demo-live-selection-item>
        <demo-live-selection-item label="Item 2"></demo-live-selection-item>
      </demo-live-selection-group>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const mountPoint = canvasElement.querySelector(
      '#mount-point'
    ) as HTMLElement;
    const [item1, item2] = await getItems(canvasElement);

    await step(
      'after removing the group from the DOM, toggle events no longer close siblings',
      async () => {
        const group = mountPoint.querySelector(
          'demo-live-selection-group'
        ) as DemoLiveSelectionGroup;

        // Detach the group from the document.
        mountPoint.removeChild(group);
        await group.updateComplete;

        // Now open item 2 directly; since the controller is disconnected,
        // item 1 should not be closed.
        item2.open = true;
        await item2.updateComplete;

        // Dispatch a toggle event manually (simulating what a click would do).
        item2.dispatchEvent(
          new Event('demo-toggle', {
            bubbles: true,
            composed: true,
            cancelable: true,
          })
        );
        await flushMicrotasks();
        await Promise.all([item1.updateComplete, item2.updateComplete]);

        // The controller is no longer listening; item 1 should remain open.
        expect(
          item1.open,
          'item 1 remains open: controller is disconnected'
        ).toBe(true);
        expect(item2.open, 'item 2 is also open').toBe(true);
      }
    );
  },
};
