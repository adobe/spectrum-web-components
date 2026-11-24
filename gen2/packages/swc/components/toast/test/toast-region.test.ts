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
import { expect, fn, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getComponent, withWarningSpy } from '@swc-test-helpers/dom';
import { vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import {
  ToastQueue,
  type ToastQueueItem,
} from '@adobe/spectrum-wc-core/components/toast/index.js';
import {
  deepContains,
  getActiveElement,
  registerDismissible,
  unregisterDismissible,
} from '@adobe/spectrum-wc-core/utils/index.js';

import '../swc-toast-region.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/popover/swc-popover.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

import { ToastQueue as RenderingToastQueue } from '../index.js';
import type { Toast } from '../Toast.js';
import type { ToastRegion } from '../ToastRegion.js';

export default {
  title: 'Toast region/Tests/Region',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <button id="trigger">Add notification</button>
    <swc-toast-region></swc-toast-region>
    <button id="outside">Outside region</button>
  `,
} as Meta;

// A closing toast stays rendered until its exit ends, so the front toast is the open one.
const getFront = async (container: ToastRegion): Promise<Toast> => {
  await container.updateComplete;
  return waitFor(() => {
    // An inert toast is an old front toast shrinking into the stack.
    const toast = [
      ...container.shadowRoot!.querySelectorAll<Toast>('swc-toast'),
    ].find((candidate) => candidate.open && !candidate.inert);
    expect(toast, 'open front toast').toBeDefined();
    return toast!;
  });
};

export const QueueOperationsTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ step }) => {
    ToastQueue.clear();
    const onClose = fn();
    const changed = fn();
    const unsubscribe = ToastQueue.subscribe(changed);

    try {
      await step('new entries join the front without a queue cap', () => {
        for (let index = 0; index < 12; index += 1) {
          ToastQueue.add(`Notification ${index}`);
        }
        expect(ToastQueue.entries, 'queue entries').toHaveLength(12);
        expect(ToastQueue.entries[0].message, 'front entry message').toBe(
          'Notification 11'
        );
        expect(changed, 'change notifications').toHaveBeenCalledTimes(12);
      });

      await step('waiting entries close directly and notify once', () => {
        const key = ToastQueue.add('Waiting notification', { onClose });
        ToastQueue.add('Front notification');
        ToastQueue.close(key);
        ToastQueue.close(key);
        expect(
          ToastQueue.entries.some((entry) => entry.key === key),
          'closed entry still queued'
        ).toBe(false);
        expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
      });

      await step('clear empties the queue without calling onClose', () => {
        ToastQueue.add('Cleared notification', { onClose });
        onClose.mockClear();
        ToastQueue.clear();
        expect(ToastQueue.entries, 'queue entries after clear').toHaveLength(0);
        expect(onClose, 'onClose calls after clear').not.toHaveBeenCalled();
      });

      await step(
        'addAll adds a batch in front, in the given order, and notifies once',
        () => {
          ToastQueue.add('Existing notification');
          changed.mockClear();
          const keys = ToastQueue.addAll([
            { message: 'First', variant: 'info' },
            { message: 'Second' },
          ]);
          expect(
            ToastQueue.entries.map((entry) => entry.message),
            'queue order'
          ).toEqual(['First', 'Second', 'Existing notification']);
          expect(
            ToastQueue.entries.slice(0, 2).map((entry) => entry.key),
            'returned keys'
          ).toEqual(keys);
          expect(ToastQueue.entries[0].variant, 'batch options').toBe('info');
          expect(changed, 'change notifications').toHaveBeenCalledTimes(1);

          expect(ToastQueue.addAll([]), 'keys for an empty batch').toEqual([]);
          expect(
            changed,
            'change notifications for an empty batch'
          ).toHaveBeenCalledTimes(1);
          ToastQueue.clear();
        }
      );

      await step('unsubscribing stops change notifications', () => {
        unsubscribe();
        changed.mockClear();
        ToastQueue.add('No subscriber');
        expect(
          changed,
          'change notifications after unsubscribe'
        ).not.toHaveBeenCalled();
      });
    } finally {
      unsubscribe();
      ToastQueue.clear();
    }
  },
};

export const RenderingAndClosureTest: Story = {
  play: async ({ canvasElement, step }) => {
    await step('core and SWC expose the same queue instance', () => {
      expect(RenderingToastQueue, 'SWC queue export').toBe(ToastQueue);
    });
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const onClose = fn();

    try {
      const olderKey = ToastQueue.add('Older notification');
      const newestKey = ToastQueue.add('Newest notification', { onClose });
      const toast = await getFront(container);

      await step(
        'only the newest toast renders and the region counts all entries',
        () => {
          expect(
            container.shadowRoot?.querySelectorAll('swc-toast'),
            'rendered toasts'
          ).toHaveLength(1);
          expect(toast.textContent, 'front toast message').toBe(
            'Newest notification'
          );
          const region = container.shadowRoot?.querySelector('[role="region"]');
          expect(region?.getAttribute('aria-label'), 'region aria-label').toBe(
            '2 notifications.'
          );
          expect(region?.getAttribute('tabindex'), 'region tabindex').toBe(
            '-1'
          );
          expect(toast.hasUpdated, 'toast has updated').toBe(true);
        }
      );

      await step('the container creates the default-slot naming target', () => {
        const message = toast.firstElementChild;
        expect(message?.id, 'message id').toBeTruthy();
        expect(
          toast.getAttribute('aria-labelledby'),
          'host aria-labelledby'
        ).toBe(message?.id);
        expect(
          toast.hasAttribute('aria-label'),
          'host aria-label presence'
        ).toBe(false);
        expect(
          message?.hasAttribute('slot'),
          'message slot attribute presence'
        ).toBe(false);
      });

      await step(
        'a canceled close retains the toast and does not notify',
        async () => {
          const cancel = (event: Event): void => event.preventDefault();
          toast.addEventListener('swc-close', cancel);
          ToastQueue.close(newestKey);
          await toast.updateComplete;
          expect(toast.open, 'open after canceled close').toBe(true);
          expect(
            ToastQueue.entries[0].key,
            'front entry key after canceled close'
          ).toBe(newestKey);
          expect(
            onClose,
            'onClose after canceled close'
          ).not.toHaveBeenCalled();
          toast.removeEventListener('swc-close', cancel);
        }
      );

      await step(
        'removal waits for after-close and promotes the waiting toast',
        async () => {
          const afterClose = fn();
          toast.addEventListener('swc-after-close', afterClose);
          ToastQueue.close(newestKey);
          expect(
            ToastQueue.entries[0].key,
            'front entry key before after-close'
          ).toBe(newestKey);
          expect(onClose, 'onClose before after-close').not.toHaveBeenCalled();
          await waitFor(() =>
            expect(afterClose, 'swc-after-close events').toHaveBeenCalledTimes(
              1
            )
          );
          await waitFor(() =>
            expect(ToastQueue.entries[0]?.key, 'promoted entry key').toBe(
              olderKey
            )
          );
          const promoted = await getFront(container);
          expect(promoted.textContent, 'promoted toast message').toBe(
            'Older notification'
          );
          expect(
            promoted.firstElementChild?.id,
            'promoted message id'
          ).not.toBe(toast.firstElementChild?.id);
          expect(onClose, 'onClose after removal').toHaveBeenCalledTimes(1);
          const region = container.shadowRoot?.querySelector('[role="region"]');
          expect(region?.getAttribute('aria-label'), 'region aria-label').toBe(
            '1 notification.'
          );
        }
      );

      await step(
        'clear empties the queue without firing close callbacks',
        async () => {
          ToastQueue.add('Cleared toast', { onClose });
          await getFront(container);
          onClose.mockClear();
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after clear'
            ).toHaveLength(0)
          );
          await container.updateComplete;
          expect(
            container.shadowRoot?.querySelector('swc-toast'),
            'rendered toast after clear'
          ).toBeNull();
          expect(onClose, 'onClose after clear').not.toHaveBeenCalled();
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const RegionLabelTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const regionLabel = (): string | null | undefined =>
      container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getAttribute('aria-label');

    try {
      ToastQueue.add('First notification');
      await getFront(container);

      await step('names the region in English by default', () => {
        expect(regionLabel(), 'default region label').toBe('1 notification.');
      });

      await step('getRegionLabel receives the queue count', async () => {
        const counts: number[] = [];
        container.getRegionLabel = (count) => {
          counts.push(count);
          return `${count} notificaciones`;
        };
        ToastQueue.add('Second notification');
        await container.updateComplete;

        expect(regionLabel(), 'custom region label').toBe('2 notificaciones');
        expect(counts[counts.length - 1], 'last count').toBe(2);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseLabelTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );

    try {
      ToastQueue.add('Fermeture', { closeLabel: 'Fermer' });
      const toast = await getFront(container);

      await step('forwards the queue closeLabel to the close button', () => {
        expect(
          toast.shadowRoot
            ?.querySelector('swc-close-button')
            ?.getAttribute('accessible-label'),
          'close button label'
        ).toBe('Fermer');
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseBeforeOpenTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const root = container.shadowRoot!;
    const onClose = fn();
    const openedKeys: boolean[] = [];
    const recordOpen = (): void => {
      openedKeys.push(true);
    };
    root.addEventListener('swc-open', recordOpen);

    try {
      await step(
        'closing right after the toast renders but before it opens removes it without opening',
        async () => {
          const key = ToastQueue.add('Closed before open', { onClose });
          let toastWasOpenAtClose: boolean | undefined;
          // The observer callback runs as soon as the toast is committed, before openToast() resolves.
          await new Promise<void>((resolve) => {
            const observer = new MutationObserver(() => {
              const toast = root.querySelector<Toast>('swc-toast');
              if (!toast) {
                return;
              }
              observer.disconnect();
              toastWasOpenAtClose = toast.open;
              ToastQueue.close(key);
              resolve();
            });
            observer.observe(root, { childList: true, subtree: true });
          });

          expect(toastWasOpenAtClose, 'open when close was requested').toBe(
            false
          );
          await waitFor(() =>
            expect(
              ToastQueue.entries.some((entry) => entry.key === key),
              'entry still queued'
            ).toBe(false)
          );
          await container.updateComplete;
          expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
          expect(openedKeys, 'swc-open events').toHaveLength(0);
          expect(
            root.querySelector('swc-toast'),
            'rendered toast after close'
          ).toBeNull();
        }
      );
    } finally {
      root.removeEventListener('swc-open', recordOpen);
      ToastQueue.clear();
    }
  },
};

export const QueueOrderTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const messages = (): string[] =>
      ToastQueue.entries.map((entry) => entry.message);
    const frontMessage = (): string | null | undefined =>
      container.shadowRoot?.querySelector('swc-toast')?.textContent;
    const regionLabel = (): string | null | undefined =>
      container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getAttribute('aria-label');
    const closeFront = (): void => {
      container.shadowRoot
        ?.querySelector('swc-toast')
        ?.shadowRoot?.querySelector<HTMLElement>('swc-close-button')
        ?.click();
    };

    try {
      const keys: Record<string, string> = {};
      for (const name of ['A', 'B', 'C', 'D']) {
        keys[name] = ToastQueue.add(name);
      }
      await getFront(container);

      await step('lists the newest toast first and shows it', () => {
        expect(messages(), 'queue order').toEqual(['D', 'C', 'B', 'A']);
        expect(frontMessage(), 'front toast').toBe('D');
        expect(regionLabel(), 'region label').toBe('4 notifications.');
      });

      await step(
        'closing a waiting toast keeps the others in order',
        async () => {
          ToastQueue.close(keys.B);
          await container.updateComplete;

          expect(messages(), 'queue order after removing B').toEqual([
            'D',
            'C',
            'A',
          ]);
          expect(frontMessage(), 'front toast after removing B').toBe('D');
          expect(regionLabel(), 'region label after removing B').toBe(
            '3 notifications.'
          );
        }
      );

      await step(
        'closing the front toast promotes the next in order',
        async () => {
          closeFront();
          await waitFor(() =>
            expect(frontMessage(), 'promoted toast').toBe('C')
          );
          await getFront(container);

          expect(messages(), 'queue order after closing D').toEqual(['C', 'A']);
          expect(regionLabel(), 'region label after closing D').toBe(
            '2 notifications.'
          );
        }
      );

      await step(
        'a toast added later jumps ahead of waiting ones',
        async () => {
          ToastQueue.add('E');
          await waitFor(() => expect(frontMessage(), 'newest toast').toBe('E'));

          expect(messages(), 'queue order after adding E').toEqual([
            'E',
            'C',
            'A',
          ]);
        }
      );

      await step('closing every toast empties the region', async () => {
        for (const expected of ['E', 'C', 'A']) {
          await waitFor(() =>
            expect(frontMessage(), `front toast ${expected}`).toBe(expected)
          );
          await getFront(container);
          closeFront();
        }
        await waitFor(() =>
          expect(container.shadowRoot?.querySelector('swc-toast')).toBeNull()
        );

        expect(messages(), 'queue after closing all').toEqual([]);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ConnectsClosedThenOpensTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const root = container.shadowRoot!;
    const openAtInsertion: boolean[] = [];
    const updatedAtOpen: boolean[] = [];
    const observer = new MutationObserver(() => {
      const toast = root.querySelector<Toast>('swc-toast');
      if (toast && openAtInsertion.length === 0) {
        openAtInsertion.push(toast.open);
      }
    });
    const recordOpen = (event: Event): void => {
      updatedAtOpen.push((event.target as Toast).hasUpdated);
    };
    observer.observe(root, { childList: true, subtree: true });
    root.addEventListener('swc-open', recordOpen);

    try {
      ToastQueue.add('Connected closed notification');
      const toast = await getFront(container);

      await step('the toast connects closed', () => {
        expect(openAtInsertion, 'open when connected').toEqual([false]);
      });

      await step('the toast opens only after its first update', () => {
        expect(updatedAtOpen, 'hasUpdated when swc-open fired').toEqual([true]);
        expect(toast.open, 'open after first update').toBe(true);
      });
    } finally {
      observer.disconnect();
      root.removeEventListener('swc-open', recordOpen);
      ToastQueue.clear();
    }
  },
};

export const TimeoutConfigurationTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      ToastQueue.add('Timed notification', { timeout: 3000 });
      const toast = await getFront(container);
      await step(
        'positive timeouts floor to 6000ms and longer values remain valid',
        () => {
          expect(toast.timeout, 'floored timeout').toBe(6000);
          toast.timeout = 8000;
          expect(toast.timeout, 'longer timeout').toBe(8000);
        }
      );
      await step(
        'null, zero and negative timeouts disable auto-dismiss',
        () => {
          for (const timeout of [null, 0, -1]) {
            toast.timeout = timeout;
            expect(
              toast.timeout,
              `timeout after setting ${timeout}`
            ).toBeNull();
          }
        }
      );
      await step(
        'the normalized timeout reflects to the attribute',
        async () => {
          toast.timeout = 8000;
          await toast.updateComplete;
          expect(toast.getAttribute('timeout'), 'timeout attribute').toBe(
            '8000'
          );
          toast.timeout = 0;
          await toast.updateComplete;
          expect(
            toast.hasAttribute('timeout'),
            'timeout attribute after disabling'
          ).toBe(false);
        }
      );
      await step(
        'the timeout attribute supplies the same normalized configuration',
        async () => {
          toast.setAttribute('timeout', '3000');
          await toast.updateComplete;
          expect(toast.timeout, 'timeout from attribute').toBe(6000);
          toast.removeAttribute('timeout');
          await toast.updateComplete;
          expect(toast.timeout, 'timeout after removing attribute').toBeNull();
        }
      );
      await step(
        'bare text no longer creates an aria-label fallback',
        async () => {
          toast.textContent = 'Unsupported bare text';
          await waitFor(() =>
            expect(
              toast.hasAttribute('aria-labelledby'),
              'host aria-labelledby presence'
            ).toBe(false)
          );
          expect(
            toast.hasAttribute('aria-label'),
            'host aria-label presence'
          ).toBe(false);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ActionsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const onAction = fn();
    const onClose = fn();
    try {
      await step(
        'an action with timeout warns and does not close by default',
        async () => {
          await withWarningSpy(async (warnings) => {
            ToastQueue.add('File archived', {
              actionLabel: 'Undo',
              onAction,
              timeout: 6000,
            });
            const toast = await getFront(container);
            expect(
              warnings.some((warning) =>
                String(warning[1]).includes('auto-dismiss')
              ),
              'auto-dismiss warning'
            ).toBe(true);
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1);
            toast.shadowRoot!.querySelector<HTMLElement>('swc-button')!.click();
            expect(onAction, 'onAction calls').toHaveBeenCalledTimes(1);
            expect(toast.open, 'open after action').toBe(true);
            expect(
              ToastQueue.entries,
              'queue entries after action'
            ).toHaveLength(1);
          });
        }
      );

      await step('an action missing its label or callback warns', async () => {
        await withWarningSpy(async (warnings) => {
          ToastQueue.add('Label only', { actionLabel: 'Undo' });
          await getFront(container);
          expect(
            warnings.some((warning) =>
              String(warning[1]).includes('actionLabel and onAction')
            ),
            'incomplete action warning'
          ).toBe(true);
        });
      });

      await step(
        'shouldCloseOnAction opts into closure and its callback',
        async () => {
          const key = ToastQueue.add('Another file archived', {
            actionLabel: 'Undo',
            onAction,
            shouldCloseOnAction: true,
            onClose,
          });
          const toast = await getFront(container);
          toast.shadowRoot!.querySelector<HTMLElement>('swc-button')!.click();
          expect(onAction, 'onAction calls').toHaveBeenCalledTimes(2);
          await waitFor(() =>
            expect(
              ToastQueue.entries.some((entry) => entry.key === key),
              'closed entry still queued'
            ).toBe(false)
          );
          expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const FocusAndWarningsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const trigger = canvasElement.querySelector<HTMLButtonElement>('#trigger')!;
    const outside = canvasElement.querySelector<HTMLButtonElement>('#outside')!;
    try {
      await step(
        'opening does not steal focus and closing the last toast restores it',
        async () => {
          trigger.focus();
          const key = ToastQueue.add('Focused notification');
          const toast = await getFront(container);
          expect(getActiveElement(), 'focus after opening').toBe(trigger);
          const closeButton =
            toast.shadowRoot!.querySelector<HTMLElement>('swc-close-button')!;
          closeButton.focus();
          ToastQueue.close(key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after closing').toBe(trigger);
        }
      );

      await step(
        'focus is not pulled back after the user leaves the region',
        async () => {
          trigger.focus();
          const key = ToastQueue.add('Unfocused notification');
          const toast = await getFront(container);
          toast.focus();
          outside.focus();
          ToastQueue.close(key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after leaving region').toBe(
            outside
          );
        }
      );

      await step(
        'clearing the focused region also restores focus',
        async () => {
          trigger.focus();
          ToastQueue.add('Cleared focused notification');
          const toast = await getFront(container);
          toast.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after clear').toBe(trigger);
        }
      );

      await step(
        'a later session entered without a previous target does not reuse a stale one',
        async () => {
          trigger.focus();
          ToastQueue.add('First session notification');
          const first = await getFront(container);
          first.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after first session'
            ).toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after first session').toBe(trigger);

          trigger.blur();
          ToastQueue.add('Second session notification');
          const second = await getFront(container);
          second.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after second session'
            ).toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after second session').not.toBe(
            trigger
          );
        }
      );

      await step(
        'connecting a second container produces a dev warning',
        async () => {
          await withWarningSpy(async (warnings) => {
            const second = document.createElement('swc-toast-region');
            try {
              canvasElement.append(second);
              await second.updateComplete;
              expect(
                warnings.some((warning) =>
                  String(warning[1]).includes('Only one')
                ),
                'second container warning'
              ).toBe(true);
            } finally {
              second.remove();
            }
          });
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const InterruptedClosureTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const onClose = fn();
    try {
      await step(
        'a closing entry does not survive demotion by a newer toast',
        async () => {
          const key = ToastQueue.add('Closing notification', { onClose });
          await getFront(container);
          ToastQueue.close(key);
          const newerKey = ToastQueue.add('Newer notification');
          await getFront(container);
          // The closing toast slides out first (400ms), even if it closed before it finished entering.
          await waitFor(() =>
            expect(
              ToastQueue.entries.map((entry) => entry.key),
              'queue keys after demotion'
            ).toEqual([newerKey])
          );
          expect(onClose, 'onClose after demotion').toHaveBeenCalledTimes(1);
        }
      );

      await step(
        'clear interrupted by disconnection leaves no stale entries',
        async () => {
          ToastQueue.clear();
          container.remove();
          expect(
            ToastQueue.entries,
            'queue entries after disconnect'
          ).toHaveLength(0);
          expect(onClose, 'onClose after disconnect').toHaveBeenCalledTimes(1);
          canvasElement.append(container);
          await container.updateComplete;
        }
      );
      await step(
        'direct close-button dismissal also survives interruption',
        async () => {
          const key = ToastQueue.add('User-dismissed notification', {
            onClose,
          });
          const toast = await getFront(container);
          toast
            .shadowRoot!.querySelector<HTMLElement>('swc-close-button')!
            .click();
          const newerKey = ToastQueue.add('Notification after dismissal');
          await getFront(container);
          // The dismissed toast slides out first (400ms).
          await waitFor(() =>
            expect(
              ToastQueue.entries.some((entry) => entry.key === key),
              'dismissed entry still queued'
            ).toBe(false)
          );
          expect(
            ToastQueue.entries[0]?.key,
            'front entry key after dismissal'
          ).toBe(newerKey);
          expect(onClose, 'onClose after dismissal').toHaveBeenCalledTimes(2);
        }
      );
    } finally {
      if (!container.isConnected) {
        canvasElement.append(container);
      }
      ToastQueue.clear();
    }
  },
};

const getLayers = (container: ToastRegion): HTMLElement[] => [
  ...container.shadowRoot!.querySelectorAll<HTMLElement>(
    '.swc-ToastRegion-layer'
  ),
];

const getRegion = (container: ToastRegion): HTMLElement =>
  container.shadowRoot!.querySelector<HTMLElement>('[role="region"]')!;

// Some engines never apply `perspective` to layout geometry, for example headed Linux
// WebKit under Xvfb in CI, so bounding boxes cannot show the peek there. A probe with
// the same perspective setup tells the test whether they can.
const projectsPerspective = (): boolean => {
  const host = document.createElement('div');
  host.style.cssText =
    'position: fixed; inset: 0 auto auto 0; inline-size: 40px; block-size: 40px; perspective: 80px; perspective-origin: center -55px;';
  const child = document.createElement('div');
  child.style.cssText = 'position: absolute; inset: 0; translate: 0 0 -12px;';
  host.append(child);
  document.body.append(host);
  const projected =
    child.getBoundingClientRect().top !== host.getBoundingClientRect().top;
  host.remove();
  return projected;
};

export const StackLayersTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );

    try {
      await step('a single toast has no layers and no shadow', async () => {
        ToastQueue.add('First notification');
        const front = await getFront(container);
        expect(getLayers(container), 'layers').toHaveLength(0);
        // The shadow is kept fully transparent, so it can fade in when the stack forms.
        const colors =
          getComputedStyle(front).filter.match(/rgba?\([^)]*\)/g) ?? [];
        expect(
          colors.every((color) => color === 'rgba(0, 0, 0, 0)'),
          'single toast shadow is transparent'
        ).toBe(true);
      });

      await step(
        'two more toasts add two empty, non-interactive layers',
        async () => {
          ToastQueue.add('Second notification', { variant: 'info' });
          ToastQueue.add('Third notification', { variant: 'negative' });
          await getFront(container);
          // The stack keeps its old layers until the new toast's message renders and it starts to move.
          const layers = await waitFor(() => {
            const current = getLayers(container);
            expect(current, 'layers').toHaveLength(2);
            return current;
          });
          for (const layer of layers) {
            expect(layer.getAttribute('role'), 'layer role').toBe(
              'presentation'
            );
            expect(layer.childNodes, 'layer children').toHaveLength(0);
            expect(layer.hasAttribute('tabindex'), 'layer tabindex').toBe(
              false
            );
          }
          // An inert toast is the old front toast, still shrinking into its layer.
          await waitFor(() =>
            expect(
              container.shadowRoot!.querySelectorAll('swc-toast'),
              'rendered toasts'
            ).toHaveLength(1)
          );
        }
      );

      await step('the region count label reflects the full queue', () => {
        expect(getRegion(container).getAttribute('aria-label')).toBe(
          '3 notifications.'
        );
      });

      await step(
        'a stack gives the layers and the front toast a shadow',
        async () => {
          const front = await getFront(container);
          expect(
            getComputedStyle(front).filter,
            'stacked front toast filter'
          ).toContain('drop-shadow');
          for (const layer of getLayers(container)) {
            expect(
              getComputedStyle(layer).boxShadow,
              'layer box shadow'
            ).not.toBe('none');
          }
        }
      );

      await step('each layer takes the variant of its toast', () => {
        const [first, second] = getLayers(container);
        expect(
          first.classList.contains('swc-ToastRegion-layer--info'),
          'nearest layer is the info toast'
        ).toBe(true);
        expect(
          [...second.classList],
          'neutral layer has no variant modifier'
        ).toEqual(['swc-ToastRegion-layer']);
        expect(
          getComputedStyle(second).backgroundColor,
          'neutral layer differs from the info layer'
        ).not.toBe(getComputedStyle(first).backgroundColor);
      });

      await step('layers stay in the queue order, newest nearest', () => {
        const indexes = getLayers(container).map((layer) =>
          layer.style.getPropertyValue('--_swc-toast-region-layer-index')
        );
        expect(indexes, 'layer depth indexes').toEqual(['1', '2']);
      });

      await step('nearer layers paint above farther ones', () => {
        const [near, far] = getLayers(container).map((layer) =>
          Number(getComputedStyle(layer).zIndex)
        );
        expect(near, 'nearest layer z-index').toBeGreaterThan(far);
      });

      await step(
        'only the two nearest layers show, and one more renders transparent, however many toasts are queued',
        async () => {
          ToastQueue.add('Fourth notification');
          ToastQueue.add('Fifth notification');
          await getFront(container);
          const layers = getLayers(container);
          expect(layers, 'layers').toHaveLength(3);
          expect(
            layers.map((layer) =>
              layer.style.getPropertyValue('--_swc-toast-region-layer-index')
            ),
            'layer depth indexes'
          ).toEqual(['1', '2', '3']);
          await Promise.all(
            layers
              .flatMap((layer) => layer.getAnimations())
              .map((animation) => animation.finished)
          );
          expect(
            layers.map((layer) => getComputedStyle(layer).opacity),
            'layer opacities'
          ).toEqual(['1', '1', '0']);
          expect(getRegion(container).getAttribute('aria-label')).toBe(
            '5 notifications.'
          );
        }
      );

      await step(
        'layers follow the queue as toasts behind the front one close',
        async () => {
          ToastQueue.close(ToastQueue.entries[2].key);
          await container.updateComplete;
          expect(getLayers(container), 'layers with 4 queued').toHaveLength(3);
          expect(getRegion(container).getAttribute('aria-label')).toBe(
            '4 notifications.'
          );
          ToastQueue.close(ToastQueue.entries[2].key);
          ToastQueue.close(ToastQueue.entries[1].key);
          await container.updateComplete;
          expect(getLayers(container), 'layers with 2 queued').toHaveLength(1);
        }
      );

      await step('layers include their border in their size', () => {
        for (const layer of getLayers(container)) {
          expect(getComputedStyle(layer).boxSizing, 'layer box-sizing').toBe(
            'border-box'
          );
        }
      });

      await step('layers hold no focusable content', () => {
        for (const layer of getLayers(container)) {
          expect(layer.querySelectorAll('*'), 'layer descendants').toHaveLength(
            0
          );
          expect(layer.hasAttribute('tabindex'), 'layer tabindex').toBe(false);
        }
        // The queue still holds older toasts, and none render real controls.
        expect(ToastQueue.entries.length, 'queued toasts').toBeGreaterThan(1);
        expect(
          container.shadowRoot!.querySelectorAll('swc-toast'),
          'rendered toasts'
        ).toHaveLength(1);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

// Apps that reload or navigate rebuild their toasts from saved data, so this is the documented restore recipe.
export const RestoreToastsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    let renderedToasts = 0;
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        // The first render adds the region with its toast already inside, so count nested toasts too.
        // Inert toasts are presentation only: a hidden copy that measures a new toast, or an old front toast.
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement) {
            renderedToasts +=
              (node.localName === 'swc-toast' && !node.inert ? 1 : 0) +
              node.querySelectorAll('swc-toast:not([inert])').length;
          }
        }
      }
    });
    observer.observe(container.shadowRoot!, { childList: true, subtree: true });
    const messages = (): string[] =>
      ToastQueue.entries.map((entry) => entry.message);
    const expectStack = (label: string): void => {
      expect(messages(), `${label} queue order`).toEqual(['C', 'B', 'A']);
      expect(
        container.shadowRoot?.querySelector('swc-toast:not([inert])')
          ?.textContent,
        `${label} front toast`
      ).toBe('C');
      expect(getRegion(container).getAttribute('aria-label'), label).toBe(
        '3 notifications.'
      );
      expect(getLayers(container), `${label} layers`).toHaveLength(2);
    };
    const onClose = fn();
    let saved: ToastQueueItem[] = [];

    try {
      await step(
        'several adds in the same tick render a single toast',
        async () => {
          for (const message of ['A', 'B', 'C']) {
            ToastQueue.add(message, { variant: 'info', onClose });
          }
          await getFront(container);

          expect(renderedToasts, 'toasts rendered for the batch').toBe(1);
          expectStack('batch');
        }
      );

      await step(
        'entries list the front toast first and save without callbacks',
        () => {
          // entries and addAll() both list the front toast first, so no reordering is needed.
          saved = ToastQueue.entries.map(
            ({ key: _key, onAction: _onAction, onClose: _onClose, ...toast }) =>
              toast
          );

          expect(
            saved.map((toast) => toast.message),
            'saved order, front toast first'
          ).toEqual(['C', 'B', 'A']);
          for (const toast of saved) {
            expect(Object.keys(toast), 'saved properties').toEqual([
              'variant',
              'message',
            ]);
          }
        }
      );

      await step(
        'addAll with the saved list, before the container connects, restores the same stack',
        async () => {
          // A reload: the old page's queue is gone, and the container connects after the app restores.
          container.remove();
          ToastQueue.clear();
          expect(ToastQueue.entries, 'queue after the reload').toHaveLength(0);

          ToastQueue.addAll(saved);
          expect(messages(), 'restored queue order').toEqual(['C', 'B', 'A']);
          expect(
            ToastQueue.entries.some((entry) => entry.onClose !== undefined),
            'restored callbacks'
          ).toBe(false);

          renderedToasts = 0;
          canvasElement.append(container);
          await getFront(container);

          expect(renderedToasts, 'toasts rendered for the restore').toBe(1);
          expectStack('restored');
        }
      );
    } finally {
      observer.disconnect();
      if (!container.isConnected) {
        canvasElement.append(container);
      }
      ToastQueue.clear();
    }
  },
};

// Restoring while the container is live, for example after a sign-in that happens without a reload.
export const AddAllWhileConnectedTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );

    try {
      await step('a toast is already showing', async () => {
        ToastQueue.add('Existing notification', { variant: 'negative' });
        const front = await getFront(container);
        expect(front.textContent, 'front message').toBe(
          'Existing notification'
        );
        expect(getLayers(container), 'layers').toHaveLength(0);
      });

      await step(
        'addAll puts the batch in front of it and renders one toast',
        async () => {
          ToastQueue.addAll([
            { message: 'First', variant: 'info' },
            { message: 'Second', variant: 'positive' },
          ]);
          const front = await getFront(container);

          expect(front.textContent, 'new front message').toBe('First');
          // An inert toast is the old front toast, still shrinking into its layer.
          await waitFor(() => {
            expect(
              container.shadowRoot!.querySelectorAll('swc-toast'),
              'toasts in the DOM'
            ).toHaveLength(1);
            expect(getLayers(container), 'layers').toHaveLength(2);
          });
          expect(getRegion(container).getAttribute('aria-label')).toBe(
            '3 notifications.'
          );
          expect(
            getLayers(container).map((layer) =>
              [...layer.classList].find((name) => name.includes('--'))
            ),
            'layers follow the queue order behind the front toast'
          ).toEqual([
            'swc-ToastRegion-layer--positive',
            'swc-ToastRegion-layer--negative',
          ]);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

// The docs sample saves toasts as JSON, so this covers what serialization drops or keeps.
export const RestoreFromJsonTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const staleOnAction = fn();
    const staleOnClose = fn();
    const onAction = fn();
    const onClose = fn();
    let json = '';

    try {
      await step('toasts save as JSON without their callbacks', () => {
        // Seeded with add(), oldest first, so the saved order does not depend on addAll().
        ToastQueue.add('A', { timeout: null });
        ToastQueue.add('B', {
          variant: 'info',
          timeout: 6000,
          onClose: staleOnClose,
        });
        ToastQueue.add('C', {
          variant: 'positive',
          actionLabel: 'Undo',
          closeLabel: 'Dismiss',
          shouldCloseOnAction: true,
          onAction: staleOnAction,
          onClose: staleOnClose,
        });
        const saved = ToastQueue.entries.map(
          ({ key: _key, onAction: _onAction, onClose: _onClose, ...toast }) =>
            toast
        );
        expect(
          saved.map((toast) => toast.message),
          'saved order, front toast first'
        ).toEqual(['C', 'B', 'A']);
        json = JSON.stringify(saved);

        expect(json, 'serialized callbacks').not.toContain('onAction');
        expect(json, 'serialized callbacks').not.toContain('onClose');
        expect(JSON.parse(json), 'round trip').toEqual(saved);
      });

      await step(
        'restoring with fresh callbacks keeps the data and uses the new handlers',
        async () => {
          container.remove();
          ToastQueue.clear();
          ToastQueue.addAll(
            (JSON.parse(json) as ToastQueueItem[]).map((toast) => ({
              ...toast,
              onAction: toast.actionLabel ? onAction : undefined,
              onClose,
            }))
          );
          canvasElement.append(container);
          const front = await getFront(container);

          expect(front.textContent, 'restored front message').toBe('C');
          expect(front.variant, 'restored variant').toBe('positive');
          expect(
            ToastQueue.entries.map((entry) => entry.message),
            'restored order'
          ).toEqual(['C', 'B', 'A']);

          front.shadowRoot!.querySelector<HTMLElement>('swc-button')!.click();
          expect(onAction, 'restored onAction calls').toHaveBeenCalledTimes(1);
          expect(staleOnAction, 'old onAction calls').not.toHaveBeenCalled();
          await waitFor(() =>
            expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1)
          );
          expect(staleOnClose, 'old onClose calls').not.toHaveBeenCalled();
        }
      );

      await step(
        'the saved timeout survives for the promoted toast',
        async () => {
          await waitFor(() =>
            expect(
              container.shadowRoot?.querySelector('swc-toast')?.textContent,
              'promoted message'
            ).toBe('B')
          );
          const promoted = await getFront(container);
          expect(promoted.timeout, 'restored timeout').toBe(6000);
        }
      );
    } finally {
      if (!container.isConnected) {
        canvasElement.append(container);
      }
      ToastQueue.clear();
    }
  },
};

export const StackPlacementTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );

    try {
      ToastQueue.add('Older notification');
      ToastQueue.add('Newer notification');
      await getFront(container);

      for (const placement of [
        'bottom',
        'bottom-end',
        'top',
        'top-end',
      ] as const) {
        await step(
          `${placement}: layers peek away from the anchored edge`,
          async () => {
            container.placement = placement;
            await container.updateComplete;
            const regionElement = getRegion(container);
            const layerElement = getLayers(container)[0];
            // The perspective origin moves with a transition, so read it once it settles.
            await Promise.all(
              [regionElement, layerElement]
                .flatMap((element) => element.getAnimations())
                .map((animation) => animation.finished)
            );
            const region = regionElement.getBoundingClientRect();

            // The CSS that decides the direction: the vanishing point sits beyond
            // the edge away from the anchor, and the layer is pushed back in depth.
            const originY = parseFloat(
              getComputedStyle(regionElement).perspectiveOrigin.split(' ')[1]
            );
            const depth = parseFloat(
              getComputedStyle(layerElement).translate.split(' ')[2]
            );
            expect(depth, 'layer depth').toBeLessThan(0);
            if (placement.startsWith('bottom')) {
              expect(
                originY,
                'perspective origin above the region'
              ).toBeLessThan(0);
            } else {
              expect(
                originY,
                'perspective origin below the region'
              ).toBeGreaterThan(region.height);
            }

            if (!projectsPerspective()) {
              return;
            }
            const rect = layerElement.getBoundingClientRect();
            if (placement.startsWith('bottom')) {
              expect(rect.top, 'layer top edge').toBeLessThan(region.top);
              expect(rect.bottom, 'layer bottom edge').toBeLessThanOrEqual(
                region.bottom
              );
            } else {
              expect(rect.bottom, 'layer bottom edge').toBeGreaterThan(
                region.bottom
              );
              expect(rect.top, 'layer top edge').toBeGreaterThanOrEqual(
                region.top
              );
            }
          }
        );
      }
    } finally {
      ToastQueue.clear();
    }
  },
};

const closeButtonOf = (toast: Toast): HTMLElement =>
  toast.shadowRoot!.querySelector<HTMLElement>('swc-close-button')!;

const emulateInput = (target: HTMLElement, type: 'pointer' | 'keyboard') => {
  target.dispatchEvent(
    type === 'pointer'
      ? new PointerEvent('pointerdown', { bubbles: true, composed: true })
      : new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          composed: true,
        })
  );
};

export const StackFocusTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const trigger = canvasElement.querySelector<HTMLButtonElement>('#trigger')!;

    try {
      await step(
        'closing the focused toast from the keyboard focuses the promoted toast',
        async () => {
          trigger.focus();
          ToastQueue.add('Older notification');
          const frontKey = ToastQueue.add('Newer notification');
          const front = await getFront(container);
          closeButtonOf(front).focus();
          emulateInput(closeButtonOf(front), 'keyboard');
          ToastQueue.close(frontKey);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          const promoted = await getFront(container);
          expect(promoted.textContent, 'promoted message').toContain(
            'Older notification'
          );
          await waitFor(() =>
            expect(getActiveElement(), 'focus after keyboard close').toBe(
              promoted
            )
          );
        }
      );

      ToastQueue.clear();
      await waitFor(() => expect(ToastQueue.entries).toHaveLength(0));

      await step(
        'closing the focused toast with a pointer returns focus to where it was before the region',
        async () => {
          trigger.focus();
          ToastQueue.add('Older notification');
          const frontKey = ToastQueue.add('Newer notification');
          const front = await getFront(container);
          emulateInput(closeButtonOf(front), 'pointer');
          closeButtonOf(front).focus();
          ToastQueue.close(frontKey);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          const promoted = await getFront(container);
          await waitFor(() =>
            expect(getActiveElement(), 'focus after pointer close').toBe(
              trigger
            )
          );
          expect(
            deepContains(container, getActiveElement()),
            'focus is outside the region'
          ).toBe(false);
          expect(promoted.open, 'promoted toast is open').toBe(true);
        }
      );

      ToastQueue.clear();
      await waitFor(() => expect(ToastQueue.entries).toHaveLength(0));

      await step(
        'adding a toast in front of the focused one moves keyboard focus to it, and emptying the queue restores focus to where it was before the region',
        async () => {
          trigger.focus();
          ToastQueue.add('Older notification', { timeout: 6000 });
          const olderFront = await getFront(container);
          closeButtonOf(olderFront).focus();
          emulateInput(closeButtonOf(olderFront), 'keyboard');
          ToastQueue.add('Newer notification', { timeout: 6000 });
          await waitFor(async () =>
            expect(
              (await getFront(container)).textContent,
              'front message'
            ).toContain('Newer notification')
          );
          const newer = await getFront(container);
          await waitFor(() =>
            expect(getActiveElement(), 'focus after add').toBe(newer)
          );
          ToastQueue.clear();
          await waitFor(() =>
            expect(getActiveElement(), 'focus after the queue empties').toBe(
              trigger
            )
          );
        }
      );

      ToastQueue.clear();
      await waitFor(() => expect(ToastQueue.entries).toHaveLength(0));

      await step(
        'a toast without focus leaves focus alone when the front changes',
        async () => {
          trigger.focus();
          const frontKey = ToastQueue.add('Older notification');
          ToastQueue.add('Newer notification');
          await getFront(container);
          ToastQueue.close(ToastQueue.entries[0].key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          await getFront(container);
          expect(frontKey, 'remaining key').toBe(ToastQueue.entries[0].key);
          expect(getActiveElement(), 'focus').toBe(trigger);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const TopLayerStackingTest: Story = {
  render: () => html`
    <div
      id="overlap"
      popover="manual"
      style="inset: auto 0 0 0; inline-size: auto; block-size: 200px; margin: 0;"
    ></div>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const overlap = canvasElement.querySelector<HTMLElement>('#overlap')!;
    const topElementOverToast = (): Element | null => {
      const rect = container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getBoundingClientRect();
      return rect
        ? document.elementFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          )
        : null;
    };

    try {
      ToastQueue.add('First notification');
      await getFront(container);
      overlap.showPopover();

      await step('a popover opened after the first toast covers it', () => {
        expect(topElementOverToast(), 'top element').toBe(overlap);
      });

      await step('a newly added toast stacks above that popover', async () => {
        ToastQueue.add('Second notification');
        await getFront(container);
        expect(topElementOverToast(), 'top element').toBe(container);
      });
    } finally {
      if (overlap.matches(':popover-open')) {
        overlap.hidePopover();
      }
      ToastQueue.clear();
    }
  },
};

// Manual check for layering (see Q16, Q18): the region is in the top layer, so a
// high z-index header must not cover it; a modal dialog and open popovers are the cases to inspect.
export const LayeringFixture: Story = {
  name: 'Layering (manual check)',
  args: { placement: 'top' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-end', 'bottom', 'bottom-end'],
    },
  },
  tags: ['!test'],
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
  render: (args) => {
    const add = (): void => {
      ToastQueue.add(`Layering check (${ToastQueue.entries.length + 1})`, {
        variant: 'info',
      });
    };
    const openDialog = (): void => {
      document
        .querySelector<HTMLDialogElement>('#layering-dialog')
        ?.showModal();
    };
    const closeDialog = (): void => {
      document.querySelector<HTMLDialogElement>('#layering-dialog')?.close();
    };
    const openPopover = (): void => {
      document.querySelector<HTMLElement>('#layering-popover')?.showPopover();
    };
    return html`
      <div
        style="position: fixed; inset: 0 0 auto 0; z-index: 100; padding: 16px; background: #333; color: #fff;"
      >
        App header (z-index: 100). A toast at the top placement should stay
        visible above it.
      </div>
      <div style="padding-block-start: 96px; display: flex; gap: 8px;">
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
        <swc-button variant="secondary" @click=${openDialog}>
          Open modal dialog
        </swc-button>
        <swc-button variant="secondary" @click=${openPopover}>
          Open popover
        </swc-button>
      </div>
      <div id="layering-popover" popover="auto" style="padding: 24px;">
        <p>Auto popover. Adding a toast from here should not close it.</p>
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
      </div>
      <dialog id="layering-dialog" style="padding: 24px;">
        <p>Modal dialog. A toast added from here should stay visible.</p>
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
        <swc-button variant="secondary" @click=${closeDialog}>
          Close dialog
        </swc-button>
      </dialog>
      <swc-toast-region .placement=${args.placement}></swc-toast-region>
    `;
  },
};

// ──────────────────────────
//     EXPANDED VIEW
// ──────────────────────────

const getDialog = (container: ToastRegion): HTMLDialogElement | null =>
  container.shadowRoot!.querySelector<HTMLDialogElement>('dialog');

// Leaves out old front toasts that are still shrinking into the stack, which are inert.
const renderedToasts = (container: ToastRegion): Toast[] =>
  [...container.shadowRoot!.querySelectorAll<Toast>('swc-toast')].filter(
    (toast) => !toast.inert
  );

const showAllOf = (toast: Toast): HTMLElement | null =>
  toast.shadowRoot!.querySelector<HTMLElement>('.swc-Toast-showAll');

const controlOf = (container: ToastRegion, label: string): HTMLElement =>
  [
    ...container.shadowRoot!.querySelectorAll<HTMLElement>(
      '.swc-ToastRegion-controls swc-action-button'
    ),
  ].find((button) => button.textContent?.trim() === label)!;

const waitForExpanded = async (
  container: ToastRegion,
  expanded: boolean
): Promise<void> => {
  await waitFor(() =>
    expect(Boolean(getDialog(container)?.open), 'expanded').toBe(expanded)
  );
  await container.updateComplete;
};

const addQueue = async (
  container: ToastRegion,
  messages: string[]
): Promise<Toast> => {
  for (const message of [...messages].reverse()) {
    ToastQueue.add(message);
  }
  return getFront(container);
};

const peekPosition = async (
  layer: HTMLElement
): Promise<{ x: number; y: number }> => {
  // Anchor real input to the flat region, not the perspective-transformed layer.
  const region = layer.parentElement!;
  const front = region.querySelector<Toast>('swc-toast')!;
  // Opening precedes the message reveal, which changes the stack's geometry.
  await waitFor(() =>
    expect(
      front.shadowRoot!.querySelector('.swc-Toast-text slot'),
      'message is rendered'
    ).not.toBeNull()
  );
  await document.fonts.ready;
  const root = layer.getRootNode();
  if (!(root instanceof ShadowRoot)) {
    throw new Error('The peek layer must be in the region shadow root');
  }
  // The layer animates into place as the toast arrives; measure where it lands.
  await Promise.all(
    root.getAnimations().map((animation) => animation.finished.catch(() => {}))
  );
  const rect = layer.getBoundingClientRect();
  const regionRect = region.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = (rect.top + regionRect.top) / 2;
  expect(
    root.elementFromPoint(x, y),
    'the visible peek point hits the layer'
  ).toBe(layer);
  return {
    x: x - regionRect.left,
    y: y - regionRect.top,
  };
};

export const ExpandTriggersTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      await step('Show all appears only with two or more toasts', async () => {
        ToastQueue.add('Only');
        const single = await getFront(container);
        expect(showAllOf(single), 'Show all with one toast').toBeNull();
        ToastQueue.add('Newer');
        const front = await getFront(container);
        await front.updateComplete;
        expect(showAllOf(front)?.textContent?.trim(), 'Show all label').toBe(
          'Show all'
        );
      });

      await step(
        'Show all opens a modal list of real toasts and focuses the front toast',
        async () => {
          const front = await getFront(container);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          expect(getDialog(container)!.matches(':modal'), 'modal').toBe(true);
          const toasts = renderedToasts(container);
          expect(
            toasts.map((toast) => toast.textContent),
            'listed toasts'
          ).toEqual(['Newer', 'Only']);
          expect(
            toasts.every(
              (toast) => toast.getAttribute('role') === 'alertdialog'
            ),
            'every toast is an alertdialog'
          ).toBe(true);
          expect(toasts[0], 'front toast element is kept').toBe(front);
          expect(getActiveElement(document), 'focus').toBe(front);
          // Show all fades out in place (300ms), then goes.
          await waitFor(() =>
            expect(showAllOf(front), 'Show all while expanded').toBeNull()
          );
        }
      );

      await step('Collapse returns to the stack', async () => {
        controlOf(container, 'Collapse').click();
        await waitForExpanded(container, false);
        expect(renderedToasts(container).length, 'rendered toasts').toBe(1);
      });

      await step('clicking the stack expands it', async () => {
        const front = await getFront(container);
        front.click();
        await waitForExpanded(container, true);
        controlOf(container, 'Collapse').click();
        await waitForExpanded(container, false);
      });

      await step(
        'clicking a layer behind the front toast expands it',
        async () => {
          await getFront(container);
          const layer = container.shadowRoot!.querySelector<HTMLElement>(
            '.swc-ToastRegion-layer'
          )!;
          // A real press on the strip that peeks above the front toast, so the
          // layer must receive pointer events (a scripted click would not check).
          const clicked = fn();
          layer.addEventListener('click', clicked, { once: true });
          await userEvent.click(layer.parentElement!, {
            position: await peekPosition(layer),
          });
          await waitFor(() =>
            expect(
              clicked,
              'the real click reaches the layer'
            ).toHaveBeenCalledOnce()
          );
          await waitForExpanded(container, true);
          controlOf(container, 'Collapse').click();
          await waitForExpanded(container, false);
        }
      );

      await step(
        'clicking the close button or the action does not expand',
        async () => {
          ToastQueue.add('With action', {
            actionLabel: 'Undo',
            onAction: fn(),
          });
          const front = await getFront(container);
          front
            .shadowRoot!.querySelector<HTMLElement>('.swc-Toast-action')!
            .click();
          await container.updateComplete;
          expect(getDialog(container), 'dialog after action').toBeNull();
          closeButtonOf(front).click();
          await container.updateComplete;
          expect(getDialog(container), 'dialog after close').toBeNull();
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CollapseTriggersTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const region = (): HTMLElement =>
      container.shadowRoot!.querySelector<HTMLElement>('[role="region"]')!;
    const expand = async (): Promise<void> => {
      const front = await getFront(container);
      showAllOf(front)!.click();
      await waitForExpanded(container, true);
    };
    try {
      await addQueue(container, ['A', 'B', 'C']);

      await step('Escape collapses and focuses the region', async () => {
        await expand();
        await userEvent.keyboard('{Escape}');
        await waitForExpanded(container, false);
        await waitFor(() =>
          expect(getActiveElement(document), 'focus').toBe(region())
        );
      });

      await step(
        'Escape waits for a surface opened above the view',
        async () => {
          await expand();
          const above = {};
          registerDismissible(above);
          try {
            await userEvent.keyboard('{Escape}');
            await container.updateComplete;
            expect(getDialog(container)?.open, 'still expanded').toBe(true);
          } finally {
            unregisterDismissible(above);
          }
          await userEvent.keyboard('{Escape}');
          await waitForExpanded(container, false);
        }
      );

      await step('a scrim press collapses and focuses the region', async () => {
        await expand();
        getDialog(container)!.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: 1,
            clientY: 1,
          })
        );
        await waitForExpanded(container, false);
        expect(getActiveElement(document), 'focus').toBe(region());
      });

      await step('Collapse collapses and focuses the region', async () => {
        await expand();
        controlOf(container, 'Collapse').click();
        await waitForExpanded(container, false);
        expect(getActiveElement(document), 'focus').toBe(region());
      });

      await step('Clear all empties the queue and collapses', async () => {
        await expand();
        controlOf(container, 'Clear all').click();
        await waitFor(() =>
          expect(ToastQueue.entries.length, 'queue size').toBe(0)
        );
        await waitForExpanded(container, false);
      });

      await step('the view collapses when the queue empties', async () => {
        await addQueue(container, ['D', 'E']);
        await expand();
        for (const toast of renderedToasts(container)) {
          toast.close();
        }
        await waitFor(() =>
          expect(ToastQueue.entries.length, 'queue size').toBe(0)
        );
        await waitForExpanded(container, false);
        expect(
          getActiveElement(document),
          'focus does not move to a region'
        ).not.toBe(region());
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ExpandedFocusTest: Story = {
  render: () => html`
    <button id="trigger">Add notification</button>
    <swc-toast-region></swc-toast-region>
    <button id="outside">Outside region</button>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const outside = canvasElement.querySelector<HTMLElement>('#outside')!;
    const describe = (element: Element | null): string => {
      const toasts = renderedToasts(container);
      const index = toasts.findIndex(
        (toast) => toast === element || deepContains(toast, element)
      );
      if (index !== -1) {
        return toasts[index] === element ? `toast ${index}` : `close ${index}`;
      }
      const control = [
        ...container.shadowRoot!.querySelectorAll<HTMLElement>(
          'swc-action-button'
        ),
      ].find((button) => button === element || deepContains(button, element));
      return control?.textContent?.trim() ?? element?.localName ?? 'none';
    };
    try {
      const front = await addQueue(container, ['A', 'B']);
      showAllOf(front)!.click();
      await waitForExpanded(container, true);

      await step('the page behind the view is inert', () => {
        outside.focus();
        expect(getActiveElement(document), 'focus').not.toBe(outside);
      });

      await step('page scroll is locked', () => {
        expect(document.documentElement.style.overflow, 'overflow').toBe(
          'hidden'
        );
      });

      await step(
        'Tab moves through each toast, then the controls',
        async () => {
          front.focus();
          const order = [describe(getActiveElement(document))];
          for (let press = 0; press < 5; press++) {
            await userEvent.keyboard('{Tab}');
            order.push(describe(getActiveElement(document)));
          }
          expect(order, 'Tab order').toEqual([
            'toast 0',
            'close 0',
            'toast 1',
            'close 1',
            'Clear all',
            'Collapse',
          ]);
        }
      );

      await step('adding a toast keeps focus where it is', async () => {
        const second = renderedToasts(container)[1];
        second.focus();
        ToastQueue.add('Newest');
        await waitFor(() =>
          expect(renderedToasts(container).length, 'rendered toasts').toBe(3)
        );
        await container.updateComplete;
        expect(getActiveElement(document), 'focus').toBe(second);
      });

      await step(
        'closing a focused toast focuses the nearest toast',
        async () => {
          const [newest, middle] = renderedToasts(container);
          closeButtonOf(middle).focus();
          closeButtonOf(middle).click();
          await waitFor(() =>
            expect(getActiveElement(document), 'focus').toBe(newest)
          );
        }
      );

      await step('scroll unlocks after collapsing', async () => {
        controlOf(container, 'Collapse').click();
        await waitForExpanded(container, false);
        expect(document.documentElement.style.overflow, 'overflow').toBe('');
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ExpandedAnnouncementTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const liveRegionOf = (toast: Toast): Element =>
      toast.shadowRoot!.querySelector('.swc-Toast-body')!;
    try {
      const front = await addQueue(container, ['A', 'B', 'C']);
      showAllOf(front)!.click();
      await waitForExpanded(container, true);

      await step(
        'toasts shown only in the list are not announced again',
        async () => {
          const [, ...behind] = renderedToasts(container);
          await Promise.all(behind.map((toast) => toast.updateComplete));
          expect(liveRegionOf(front).getAttribute('role'), 'front').toBe(
            'alert'
          );
          for (const toast of behind) {
            expect(
              liveRegionOf(toast).hasAttribute('role'),
              `${toast.textContent} live region`
            ).toBe(false);
            expect(
              liveRegionOf(toast).querySelector('slot'),
              `${toast.textContent} content shown at once`
            ).not.toBeNull();
          }
        }
      );

      await step(
        'a toast added while expanded is the only live region',
        async () => {
          ToastQueue.add('Newest');
          await waitFor(() =>
            expect(renderedToasts(container).length, 'rendered toasts').toBe(4)
          );
          const toasts = renderedToasts(container);
          await Promise.all(toasts.map((toast) => toast.updateComplete));
          expect(
            toasts.map((toast) => liveRegionOf(toast).getAttribute('role')),
            'live regions'
          ).toEqual(['alert', null, null, null]);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ExpandedTimeoutTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      ToastQueue.add('Older', { timeout: 6000 });
      ToastQueue.add('Newer', { timeout: 6000 });
      const front = await getFront(container);
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      showAllOf(front)!.click();
      await waitForExpanded(container, true);

      await step('no toast auto-dismisses while expanded', async () => {
        vi.advanceTimersByTime(20000);
        await container.updateComplete;
        expect(ToastQueue.entries.length, 'queue size').toBe(2);
      });

      await step(
        'the front toast gets a fresh timeout after collapsing',
        async () => {
          controlOf(container, 'Collapse').click();
          await waitForExpanded(container, false);
          // Focus on the region pauses the countdown, as it does for any focus in the region.
          container.blur();
          (getActiveElement(document) as HTMLElement | null)?.blur();
          await container.updateComplete;
          vi.advanceTimersByTime(5000);
          expect(ToastQueue.entries.length, 'before the timeout').toBe(2);
          vi.advanceTimersByTime(1500);
          vi.useRealTimers();
          await waitFor(() =>
            expect(ToastQueue.entries.length, 'after the timeout').toBe(1)
          );
        }
      );
    } finally {
      vi.useRealTimers();
      ToastQueue.clear();
    }
  },
};

export const PeekHoverPauseTest: Story = {
  render: () => html`
    <button id="away">Away from the toasts</button>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const away = canvasElement.querySelector<HTMLElement>('#away')!;
    try {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
      ToastQueue.add('Older', { timeout: 6000 });
      ToastQueue.add('Newer', { timeout: 6000 });
      await getFront(container);

      await step(
        'a pointer on the peek behind the front toast pauses its countdown',
        async () => {
          const layer = container.shadowRoot!.querySelector<HTMLElement>(
            '.swc-ToastRegion-layer'
          )!;
          await userEvent.hover(layer.parentElement!, {
            position: await peekPosition(layer),
          });
          await waitFor(() =>
            expect(
              layer.matches(':hover'),
              'the real pointer reaches the layer'
            ).toBe(true)
          );
          vi.advanceTimersByTime(20000);
          expect(ToastQueue.entries.length, 'queue size').toBe(2);
        }
      );

      await step('leaving the peek resumes the countdown', async () => {
        await userEvent.hover(away);
        vi.advanceTimersByTime(6500);
        vi.useRealTimers();
        await waitFor(() =>
          expect(ToastQueue.entries.length, 'queue size').toBe(1)
        );
      });
    } finally {
      vi.useRealTimers();
      ToastQueue.clear();
    }
  },
};

export const ExpandedActionTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const onAction = fn();
    try {
      ToastQueue.add('Oldest');
      ToastQueue.add('With action', {
        actionLabel: 'Undo',
        onAction,
        shouldCloseOnAction: true,
      });
      const front = await addQueue(container, ['Newest']);
      showAllOf(front)!.click();
      await waitForExpanded(container, true);

      await step(
        'an action in the list calls onAction, closes that toast, and focuses the nearest toast',
        async () => {
          const [newest, withAction] = renderedToasts(container);
          const action =
            withAction.shadowRoot!.querySelector<HTMLElement>(
              '.swc-Toast-action'
            )!;
          action.focus();
          action.click();
          expect(onAction, 'onAction').toHaveBeenCalledTimes(1);
          await waitFor(() =>
            expect(
              ToastQueue.entries.map((entry) => entry.message),
              'queue'
            ).toEqual(['Newest', 'Oldest'])
          );
          expect(getActiveElement(document), 'focus').toBe(newest);
          expect(getDialog(container)?.open, 'still expanded').toBe(true);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

// Q16: how the expanded view behaves next to other open surfaces.
export const ExpandedOverPopoverTest: Story = {
  render: () => html`
    <button id="popover-trigger">Open popover</button>
    <swc-popover for="popover-trigger" accessible-label="Background popover">
      <button id="in-popover">In popover</button>
    </swc-popover>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const popover = canvasElement.querySelector(
      'swc-popover'
    ) as HTMLElement & {
      open: boolean;
    };
    try {
      const front = await addQueue(container, ['A', 'B']);
      await userEvent.click(
        canvasElement.querySelector<HTMLElement>('#popover-trigger')!
      );
      await waitFor(() => expect(popover.open, 'popover open').toBe(true));
      showAllOf(front)!.click();
      await waitForExpanded(container, true);
      // Chromium closes an open `popover="auto"` on `showModal()`; WebKit leaves it open under the scrim.
      const openAfterExpand = popover.open;

      await step('the popover cannot take focus behind the view', () => {
        const inPopover =
          canvasElement.querySelector<HTMLElement>('#in-popover')!;
        inPopover.focus();
        expect(getActiveElement(document), 'focus').not.toBe(inPopover);
      });

      await step(
        'Escape collapses the view and leaves the popover as it was',
        async () => {
          await userEvent.keyboard('{Escape}');
          await waitForExpanded(container, false);
          expect(popover.open, 'popover open').toBe(openAfterExpand);
        }
      );
    } finally {
      popover.open = false;
      ToastQueue.clear();
    }
  },
};

export const ExpandedOverTooltipTest: Story = {
  render: () => html`
    <swc-button id="tooltip-trigger">Tooltip trigger</swc-button>
    <swc-tooltip for="tooltip-trigger" manual>Background tooltip</swc-tooltip>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    try {
      const front = await addQueue(container, ['A', 'B']);
      tooltip.open = true;
      await waitFor(() => expect(tooltip.open, 'tooltip open').toBe(true));
      showAllOf(front)!.click();
      await waitForExpanded(container, true);

      await step(
        'Escape collapses the view first, because it registered on the dismissible stack last',
        async () => {
          await userEvent.keyboard('{Escape}');
          await waitForExpanded(container, false);
          expect(tooltip.open, 'tooltip open').toBe(true);
        }
      );
    } finally {
      tooltip.open = false;
      ToastQueue.clear();
    }
  },
};

export const ToastInsideModalTest: Story = {
  render: () => html`
    <dialog id="consumer-modal">
      <button id="in-modal">Inside the modal</button>
    </dialog>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const modal =
      canvasElement.querySelector<HTMLDialogElement>('#consumer-modal')!;
    try {
      modal.showModal();
      const front = await addQueue(container, ['A', 'B']);

      await step(
        'a consumer modal makes the collapsed toast inert, so it cannot be expanded by keyboard',
        () => {
          front.focus();
          expect(getActiveElement(document), 'toast focus').not.toBe(front);
          showAllOf(front)!.focus();
          expect(
            deepContains(front, getActiveElement(document)),
            'Show all focus'
          ).toBe(false);
        }
      );

      await step(
        'a view opened from script, not by the user, stacks above the modal and Escape returns to it',
        async () => {
          // Chromium groups a modal opened without user activation with the one below it,
          // so one Escape would close both. A real press inside the consumer modal first
          // matches an app that expands the view in response to the user.
          await userEvent.click(
            canvasElement.querySelector<HTMLElement>('#in-modal')!
          );
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          expect(getDialog(container)!.matches(':modal'), 'modal').toBe(true);
          await userEvent.keyboard('{Escape}');
          await waitForExpanded(container, false);
          expect(modal.open, 'consumer modal open').toBe(true);
        }
      );
    } finally {
      modal.close();
      ToastQueue.clear();
    }
  },
};

// ──────────────────────────
//     MOTION
// ──────────────────────────

const settle = async (...elements: Element[]): Promise<void> => {
  await Promise.all(
    elements
      .flatMap((element) => element.getAnimations({ subtree: true }))
      .map((animation) => animation.finished.catch(() => undefined))
  );
};

// A script animation, which only the expand and collapse move runs. CSS transitions
// are subclasses of Animation, so they are left out by constructor.
const isMoving = (element: Element): boolean =>
  element
    .getAnimations()
    .some((animation) => animation.constructor === Animation);

// The front toast's background changes size between the stack and the list, while its parts only move.
const resizesBackground = (toast: Toast): boolean =>
  toast
    .shadowRoot!.querySelector('.swc-Toast')!
    .getAnimations({ subtree: true })
    .some(
      (animation) =>
        (animation.effect as KeyframeEffect | null)?.pseudoElement ===
        '::before'
    );

// A part of the front toast that moves on its own.
const movesPart = (toast: Toast, selector: string): boolean =>
  (toast.shadowRoot!.querySelector(selector)?.getAnimations() ?? []).some(
    (animation) =>
      (animation.effect as KeyframeEffect | null)
        ?.getKeyframes()
        .some((keyframe) => String(keyframe.transform).includes('translate'))
  );

// A listed toast behind the front one scales instead of changing size.
const zooms = (element: Element): boolean =>
  element
    .getAnimations()
    .some((animation) =>
      (animation.effect as KeyframeEffect | null)
        ?.getKeyframes()
        .some((keyframe) => String(keyframe.transform).includes('scale'))
    );

const slidesIn = (element: Element): boolean =>
  element
    .getAnimations()
    .some((animation) =>
      (animation.effect as KeyframeEffect | null)
        ?.getKeyframes()
        .some((keyframe) => 'translate' in keyframe)
    );

// `auto` stacks at level 0.
const zLevel = (element: Element): number =>
  Number.parseInt(getComputedStyle(element).zIndex, 10) || 0;

const paintsBelow = (toast: Element, front: Element): boolean =>
  zLevel(toast) < zLevel(front);

export const PromotionMotionTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      ToastQueue.add(
        'Older notification with a longer message that wraps onto a second line'
      );
      ToastQueue.add(
        'Newer notification with a longer message that wraps onto a second line'
      );
      const leaving = await getFront(container);
      await settle(getRegion(container));
      const heldWidth = getRegion(container).getBoundingClientRect().width;

      await step(
        'the next toast takes the front as soon as the close starts',
        async () => {
          const widths: number[] = [];
          let sampling = true;
          const sample = (): void => {
            if (!sampling) {
              return;
            }
            widths.push(getRegion(container).getBoundingClientRect().width);
            requestAnimationFrame(sample);
          };
          requestAnimationFrame(sample);
          closeButtonOf(leaving).click();
          await waitFor(() =>
            expect(renderedToasts(container), 'rendered toasts').toHaveLength(2)
          );
          const toasts = renderedToasts(container);
          expect(toasts, 'leaving toast keeps its place').toContain(leaving);
          const front = toasts.find((toast) => toast !== leaving)!;
          expect(front.textContent, 'new front toast').toContain('Older');
          expect(
            ToastQueue.entries.length,
            'the leaving entry stays queued until its exit ends'
          ).toBe(2);
          await waitFor(() =>
            expect(ToastQueue.entries.length, 'queue after exit').toBe(1)
          );
          await waitFor(() => expect(front.open, 'front open').toBe(true));
          await settle(front, getRegion(container));
          sampling = false;

          // While the new front toast's message is still hidden, the toast is only as wide
          // as its close button. The stack keeps its width until the message shows.
          expect(
            Math.min(...widths),
            'narrowest stack width during the promotion'
          ).toBeGreaterThan(heldWidth * 0.75);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const PopoverReshowTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      ToastQueue.add('First notification');
      await getFront(container);
      const region = getRegion(container);
      const hidePopover = vi.spyOn(region, 'hidePopover');

      await step(
        'adding a toast does not re-show an uncovered region',
        async () => {
          ToastQueue.add('Second notification');
          await getFront(container);
          expect(hidePopover, 'hidePopover').not.toHaveBeenCalled();
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ExpandMotionTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const surfaceOf = (toast: Toast): HTMLElement =>
      toast.shadowRoot!.querySelector<HTMLElement>('.swc-Toast')!;
    try {
      const front = await addQueue(container, ['A', 'B', 'C']);
      // The move only skips the enter fade once the toast has finished entering.
      await waitFor(() =>
        expect(front.matches(':state(shown)'), 'front toast shown').toBe(true)
      );
      // Lets the slide-in finish, so only the expand moves the toast.
      await settle(front);

      await step(
        'expanding moves the front toast from the stack without fading it in again',
        async () => {
          const showAll = showAllOf(front)!;
          showAll.click();
          await waitForExpanded(container, true);
          await waitFor(() => {
            expect(
              resizesBackground(front),
              'front background changes size'
            ).toBe(true);
            expect(
              movesPart(front, '.swc-Toast-close'),
              'close button moves on its own'
            ).toBe(true);
          });
          // The toast takes its list size at once, so its text never rewraps mid-motion.
          expect(
            front
              .getAnimations()
              .some((animation) =>
                (animation.effect as KeyframeEffect | null)
                  ?.getKeyframes()
                  .some((keyframe) => 'inlineSize' in keyframe)
              ),
            'host size animated'
          ).toBe(false);
          // Show all stays while it fades out, out of the layout. It is the same element, so its
          // hover look fades with it instead of disappearing.
          expect(
            front.shadowRoot!.querySelector(
              '.swc-Toast-footer--leaving .swc-Toast-showAll'
            ),
            'Show all fading out'
          ).toBe(showAll);
          // The controls move from just beyond the stack, as in RSP S2 (D9 checks their zoom).
          const controls = getDialog(container)!.querySelector(
            '.swc-ToastRegion-controls'
          )!;
          expect(isMoving(controls), 'controls move').toBe(true);
          // The stack's shadow fades out instead of switching off.
          expect(
            front
              .getAnimations()
              .some((animation) =>
                (animation.effect as KeyframeEffect | null)
                  ?.getKeyframes()
                  .some((keyframe) => 'filter' in keyframe)
              ),
            'shadow fades'
          ).toBe(true);
          expect(getComputedStyle(surfaceOf(front)).opacity, 'opacity').toBe(
            '1'
          );
        }
      );

      await step(
        'the toasts behind it move from the stack too, without fading in',
        async () => {
          await waitFor(() => {
            const [, ...behind] = renderedToasts(container);
            for (const toast of behind) {
              expect(isMoving(toast), 'toast moves').toBe(true);
              // Each zooms from its layer to its list size, so its text never rewraps.
              expect(zooms(toast), 'toast zooms').toBe(true);
              // The list is in queue order, so without this the oldest toast paints over the front.
              expect(
                paintsBelow(toast, front),
                'listed toast paints below the front'
              ).toBe(true);
              expect(
                getComputedStyle(surfaceOf(toast)).opacity,
                'listed toast opacity'
              ).toBe('1');
            }
          });
        }
      );

      await step('Show all is gone once it has faded out', async () => {
        await waitFor(() =>
          expect(showAllOf(front), 'Show all after the fade').toBeNull()
        );
        await settle(...renderedToasts(container));
      });

      await step(
        'collapsing moves the front toast back without fading it in again',
        async () => {
          const controls = getDialog(container)!.querySelector(
            '.swc-ToastRegion-controls'
          )!;
          const controlsBefore = controls.getBoundingClientRect().top;
          controlOf(container, 'Collapse').click();
          // At the first frame, the controls have not moved away from the toasts.
          await waitFor(() =>
            expect(isMoving(controls), 'controls move').toBe(true)
          );
          // Every move rewound to its first frame; they run on from there.
          for (const animation of container.shadowRoot!.getAnimations()) {
            animation.currentTime = 0;
          }
          expect(
            Math.abs(controls.getBoundingClientRect().top - controlsBefore),
            'controls start in place'
          ).toBeLessThan(2);
          await container.updateComplete;
          // The view animates out (scrim, controls, toasts) before the dialog closes.
          expect(
            getDialog(container)?.open,
            'still open while collapsing'
          ).toBe(true);
          expect(
            getDialog(container)!.classList.contains(
              'swc-ToastRegion--collapsing'
            ),
            'collapsing state'
          ).toBe(true);
          // As in RSP, the front toast takes its stack shape in the same motion.
          await waitFor(() => {
            expect(showAllOf(front), 'Show all while collapsing').toBeTruthy();
            expect(
              resizesBackground(front),
              'front background changes size'
            ).toBe(true);
          });
          const [, ...behind] = renderedToasts(container);
          for (const toast of behind) {
            expect(
              paintsBelow(toast, front),
              'listed toast paints below the front'
            ).toBe(true);
          }
          const pinned = front.getBoundingClientRect();
          await waitForExpanded(container, false);
          // One motion: the stack that replaces the view puts the front toast where the collapse left it.
          expect(isMoving(front), 'front toast moves again').toBe(false);
          expect(
            resizesBackground(front),
            'front background still changing size'
          ).toBe(false);
          const rest = front.getBoundingClientRect();
          expect(Math.abs(rest.top - pinned.top), 'top').toBeLessThan(2);
          expect(Math.abs(rest.left - pinned.left), 'left').toBeLessThan(2);
          expect(getComputedStyle(surfaceOf(front)).opacity, 'opacity').toBe(
            '1'
          );
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const SlideInTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const toastWith = (text: string): Promise<Toast> =>
      waitFor(() => {
        const toast = renderedToasts(container).find((candidate) =>
          candidate.textContent?.includes(text)
        );
        expect(toast, text).toBeDefined();
        return toast!;
      });
    try {
      await step('a new toast slides in', async () => {
        ToastQueue.add('First notification');
        const first = await toastWith('First');
        await waitFor(() => expect(slidesIn(first), 'slides in').toBe(true));
        await settle(first);
        ToastQueue.add('Second notification');
        const second = await toastWith('Second');
        await waitFor(() => expect(slidesIn(second), 'slides in').toBe(true));
        // The toast it replaced shrinks into its layer from where it was, at the same time, as its content fades.
        const ghost =
          container.shadowRoot!.querySelector<Toast>('swc-toast[inert]');
        expect(ghost?.textContent, 'old front toast').toContain('First');
        expect(zooms(ghost!), 'shrinks into its layer').toBe(true);
        await waitFor(() =>
          expect(
            container.shadowRoot!.querySelector('swc-toast[inert]'),
            'gone once it reaches the layer'
          ).toBeNull()
        );
      });

      await step(
        'the toast pushed back keeps one toast height, not the taller front toast with Show all',
        async () => {
          const front = await toastWith('Second');
          await settle(front, getRegion(container));
          const layer = getRegion(container).querySelector<HTMLElement>(
            '.swc-ToastRegion-layer'
          )!;
          const surface = front.shadowRoot!.querySelector('.swc-Toast')!;
          expect(layer.offsetHeight, 'layer height').toBe(
            Math.round(parseFloat(getComputedStyle(surface).minBlockSize))
          );
          expect(layer.offsetHeight, 'layer height').toBeLessThan(
            front.offsetHeight
          );
        }
      );

      await step(
        'a toast promoted from the stack does not slide in',
        async () => {
          const second = await toastWith('Second');
          await settle(second);
          closeButtonOf(second).click();
          expect(slidesIn(await toastWith('First')), 'slides in').toBe(false);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseSlideTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      ToastQueue.add('Only notification');
      const toast = await getFront(container);
      await settle(toast);

      await step(
        'a closing toast slides out past the anchored edge, as in RSP S2, instead of only fading',
        async () => {
          closeButtonOf(toast).click();
          // Past the toast's own short exit (130ms), the slide is still running.
          await new Promise((resolve) => setTimeout(resolve, 200));
          expect(getComputedStyle(toast).display, 'still rendered').not.toBe(
            'none'
          );
          const surface = toast.shadowRoot!.querySelector('.swc-Toast')!;
          expect(
            new DOMMatrix(getComputedStyle(surface).transform).m42,
            'moved down'
          ).toBeGreaterThan(8);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue after exit').toHaveLength(0)
          );
        }
      );

      await step(
        'the toast promoted from the stack grows out of its layer, without fading in',
        async () => {
          await addQueue(container, ['Newer', 'Older']);
          const newer = await getFront(container);
          await settle(newer, getRegion(container));
          closeButtonOf(newer).click();
          const older = await waitFor(() => {
            const toast = renderedToasts(container).find((candidate) =>
              candidate.textContent?.includes('Older')
            );
            expect(toast?.open, 'promoted toast open').toBe(true);
            return toast!;
          });
          await waitFor(() =>
            expect(resizesBackground(older), 'grows from its layer').toBe(true)
          );
          expect(
            getComputedStyle(older.shadowRoot!.querySelector('.swc-Toast')!)
              .opacity,
            'promoted toast opacity'
          ).toBe('1');
          // The closed toast keeps its width while it slides out.
          expect(newer.style.inlineSize, 'leaving width').toMatch(/px$/);
        }
      );

      await step(
        'closing a toast in the expanded list moves the others into its place',
        async () => {
          ToastQueue.clear();
          const front = await addQueue(container, ['A', 'B', 'C']);
          await settle(front);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          await settle(...renderedToasts(container));
          const [first, middle, last] = renderedToasts(container);
          const before = middle.getBoundingClientRect();
          closeButtonOf(middle).click();
          await waitFor(() =>
            expect(middle.style.position, 'closed toast out of the list').toBe(
              'absolute'
            )
          );
          // It starts sliding from where it was, even though the view shrinks around the list.
          expect(
            Math.abs(middle.getBoundingClientRect().top - before.top),
            'closed toast stays in place'
          ).toBeLessThan(2);
          // The farther toast's background and parts move into the gap; the nearer one stays.
          expect(
            resizesBackground(last) || movesPart(last, '.swc-Toast-close'),
            'farther toast moves into place'
          ).toBe(true);
          expect(
            resizesBackground(first) || movesPart(first, '.swc-Toast-close'),
            'nearer toast stays'
          ).toBe(false);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ListChangeTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      const front = await addQueue(container, ['A', 'B']);
      await settle(front);
      showAllOf(front)!.click();
      await waitForExpanded(container, true);
      await settle(...renderedToasts(container));

      await step(
        'a toast added while expanded slides in, and the others move as one',
        async () => {
          ToastQueue.add('A newer, wider notification than the others');
          const added = await waitFor(() => {
            const toast = renderedToasts(container).find((candidate) =>
              candidate.textContent?.includes('newer')
            );
            expect(toast, 'added toast').toBeDefined();
            return toast!;
          });
          await waitFor(() => expect(slidesIn(added), 'slides in').toBe(true));
          // The list stretches to the widest toast, so the others change width as they move.
          expect(resizesBackground(front), 'the old front toast resizes').toBe(
            true
          );
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ClearMotionTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const slideOf = (toast: Toast): number =>
      new DOMMatrix(
        getComputedStyle(toast.shadowRoot!.querySelector('.swc-Toast')!)
          .transform
      ).m42;
    try {
      await step(
        'Clear all fades the stack and its layers out, without a slide',
        async () => {
          const front = await addQueue(container, ['A', 'B', 'C']);
          await settle(front, getRegion(container));
          const region = getRegion(container);
          ToastQueue.clear();
          await container.updateComplete;
          expect(
            region.classList.contains('swc-ToastRegion--clearing'),
            'clearing'
          ).toBe(true);
          expect(
            region.querySelectorAll('.swc-ToastRegion-layer').length,
            'layers stay while they fade'
          ).toBeGreaterThan(0);
          await new Promise((resolve) => setTimeout(resolve, 150));
          expect(Math.abs(slideOf(front)), 'no slide').toBeLessThan(1);
          await waitFor(() =>
            expect(container.shadowRoot!.querySelector('swc-toast')).toBeNull()
          );
        }
      );

      await step(
        'while expanded, the view fades out with its toasts before it closes',
        async () => {
          const front = await addQueue(container, ['A', 'B']);
          await settle(front);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          const [first] = renderedToasts(container);
          controlOf(container, 'Clear all').click();
          // The view starts fading once the closes it requested have landed.
          await waitFor(() => {
            const dialog = getDialog(container)!;
            expect(dialog.open, 'still open while fading').toBe(true);
            expect(
              dialog.classList.contains('swc-ToastRegion--collapsing'),
              'fading the scrim and the controls'
            ).toBe(true);
          });
          await new Promise((resolve) => setTimeout(resolve, 150));
          expect(Math.abs(slideOf(first)), 'no slide').toBeLessThan(1);
          await waitForExpanded(container, false);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseFrontMotionTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      await step(
        'closing the front toast starts the promotion and the layer moves on the close frame',
        async () => {
          const front = await addQueue(container, ['A', 'B', 'C', 'D']);
          await settle(front, getRegion(container));
          const heights: number[] = [];
          // Whether the promoted toast was growing on a frame where its message had not rendered.
          let grewBeforeMessage = false;
          let sampling = true;
          const sample = (): void => {
            if (!sampling) {
              return;
            }
            heights.push(getRegion(container).getBoundingClientRect().height);
            const promoted = renderedToasts(container).find(
              (candidate) => candidate.textContent === 'B'
            );
            if (
              promoted &&
              resizesBackground(promoted) &&
              !promoted.shadowRoot!.querySelector('.swc-Toast-text')
            ) {
              grewBeforeMessage = true;
            }
            requestAnimationFrame(sample);
          };
          const before = getRegion(container).getBoundingClientRect().height;
          requestAnimationFrame(sample);
          closeButtonOf(front).click();
          const promoted = await waitFor(() => {
            const toast = renderedToasts(container).find(
              (candidate) => candidate.textContent === 'B'
            );
            expect(toast, 'promoted toast').toBeDefined();
            return toast!;
          });
          await waitFor(() =>
            expect(resizesBackground(promoted), 'grows').toBe(true)
          );
          // The layers that stay move from where they were.
          expect(
            getLayers(container).some((layer) =>
              layer
                .getAnimations()
                .some((animation) =>
                  (animation.effect as KeyframeEffect | null)
                    ?.getKeyframes()
                    .some((keyframe) => 'insetBlockStart' in keyframe)
                )
            ),
            'layers move'
          ).toBe(true);
          await settle(promoted, getRegion(container));
          sampling = false;
          // It grows out of its layer before its message reaches the live region.
          expect(grewBeforeMessage, 'grows before its message renders').toBe(
            true
          );
          // The stack never drops to the empty toast's height.
          expect(
            Math.min(...heights),
            'shortest stack during the close'
          ).toBeGreaterThan(before * 0.75);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const HoverRevealTest: Story = {
  render: () => html`
    <button id="away">Away from the toasts</button>
    <swc-toast-region></swc-toast-region>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const originY = (): number =>
      parseFloat(
        getComputedStyle(getRegion(container)).perspectiveOrigin.split(' ')[1]
      );
    try {
      const front = await addQueue(container, ['A', 'B']);
      await settle(getRegion(container));
      const resting = originY();

      await step(
        'hovering the stack lets the layers peek out further',
        async () => {
          await userEvent.hover(front);
          await settle(getRegion(container));
          expect(originY(), 'hovered origin').toBeLessThan(resting);
          await userEvent.hover(canvasElement.querySelector('#away')!);
          await settle(getRegion(container));
          expect(originY(), 'origin after leaving').toBe(resting);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ShowAllWidthTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    // Widths of the front toast with and without Show all, and of Show all itself.
    const measure = async (
      messages: string[]
    ): Promise<{
      withShowAll: number;
      withoutShowAll: number;
      showAll: number;
    }> => {
      ToastQueue.clear();
      const front = await addQueue(container, messages);
      // Until its message renders, a new toast holds its final size from before Show all changes.
      await settle(front);
      await front.updateComplete;
      const withShowAll = front.getBoundingClientRect().width;
      const showAll = showAllOf(front)!.getBoundingClientRect().width;
      front.showAllLabel = undefined;
      await front.updateComplete;
      return {
        withShowAll,
        withoutShowAll: front.getBoundingClientRect().width,
        showAll,
      };
    };
    try {
      await step(
        'with a short message, the Show all row widens the toast, as in RSP S2',
        async () => {
          const { withShowAll, withoutShowAll } = await measure([
            'Saved',
            'Older',
          ]);
          expect(withShowAll, 'toast width with Show all').toBeGreaterThan(
            withoutShowAll
          );
        }
      );

      await step(
        'with a long message, the rows stack instead of sitting side by side',
        async () => {
          const { withShowAll, withoutShowAll, showAll } = await measure([
            'Your changes were saved and shared with the whole team',
            'Older',
          ]);
          expect(withShowAll, 'toast width with Show all').toBeLessThan(
            withoutShowAll + showAll
          );
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

// ────────────────────────────────────────────────────────────
//     MOTION CHECKS: measured per frame, at 1× and slowed down
// ────────────────────────────────────────────────────────────

type MotionCase = {
  placement: 'bottom' | 'top' | 'bottom-end' | 'top-end';
  rtl?: boolean;
  rate: number;
};

// Bottom and top at 1× and slowed to 0.25×, and an end placement in RTL.
const MOTION_CASES: MotionCase[] = [
  { placement: 'bottom', rate: 1 },
  { placement: 'bottom', rate: 0.25 },
  { placement: 'top', rate: 1 },
  { placement: 'top', rate: 0.25 },
  { placement: 'bottom-end', rtl: true, rate: 0.25 },
];

const caseName = ({ placement, rtl, rate }: MotionCase): string =>
  `${placement}${rtl ? ' rtl' : ''} ×${rate}`;

// Every animation in the container and in its toasts, the background `::before` included.
const allAnimations = (container: ToastRegion): Animation[] => [
  ...container.shadowRoot!.getAnimations(),
  ...[...container.shadowRoot!.querySelectorAll<Toast>('swc-toast')].flatMap(
    (toast) => toast.shadowRoot?.getAnimations() ?? []
  ),
];

// Slows every animation to `rate`, as a slow device or a slowed-down inspection would.
const setRate = (container: ToastRegion, rate: number): void => {
  for (const animation of allAnimations(container)) {
    if (animation.playbackRate !== rate) {
      animation.playbackRate = rate;
    }
  }
};

/**
 * Calls `sample` on every frame, with every animation slowed to `rate`, from
 * the first frame after `start` until `done` returns true (checked each frame)
 * or `limit` frames pass. Returns the samples in order.
 */
const sampleFrames = async <T>(
  container: ToastRegion,
  rate: number,
  start: () => void,
  sample: () => T,
  done: () => boolean,
  limit = 400
): Promise<T[]> => {
  const samples: T[] = [];
  start();
  await new Promise<void>((resolve) => {
    let frames = 0;
    const frame = (): void => {
      setRate(container, rate);
      samples.push(sample());
      frames += 1;
      if (done() || frames >= limit) {
        resolve();
        return;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
  return samples;
};

const boxOf = (element: Element | null | undefined): DOMRect | undefined =>
  element?.getBoundingClientRect();

const near = (
  a: DOMRect | undefined,
  b: DOMRect | undefined,
  tolerance: number
): boolean =>
  Boolean(a && b) &&
  Math.abs(a!.left - b!.left) <= tolerance &&
  Math.abs(a!.top - b!.top) <= tolerance &&
  Math.abs(a!.width - b!.width) <= tolerance &&
  Math.abs(a!.height - b!.height) <= tolerance;

// A part's position: its inline-start edge and its top. Its box can be wider in one layout than
// another (the message stretches), without its content moving.
const samePlace = (
  a: DOMRect | undefined,
  b: DOMRect | undefined,
  tolerance: number,
  rtl = false
): boolean =>
  Boolean(a && b) &&
  Math.abs(rtl ? a!.right - b!.right : a!.left - b!.left) <= tolerance &&
  Math.abs(a!.top - b!.top) <= tolerance;

const fmt = (rect: DOMRect | undefined): string =>
  rect
    ? [rect.left, rect.top, rect.width, rect.height]
        .map((value) => value.toFixed(1))
        .join(',')
    : 'none';

const FRONT_PART_SELECTORS = [
  '.swc-Toast-body',
  '.swc-Toast-close',
  '.swc-Toast-action',
  '.swc-Toast-showAll',
];

const partBoxes = (toast: Toast): Record<string, DOMRect | undefined> =>
  Object.fromEntries(
    FRONT_PART_SELECTORS.map((selector) => [
      selector,
      boxOf(toast.shadowRoot!.querySelector(selector)),
    ])
  );

const setUpCase = async (
  container: ToastRegion,
  { placement, rtl }: MotionCase
): Promise<void> => {
  ToastQueue.clear();
  await waitFor(() =>
    expect(container.shadowRoot!.querySelector('swc-toast')).toBeNull()
  );
  container.placement = placement;
  if (rtl) {
    container.setAttribute('dir', 'rtl');
  } else {
    container.removeAttribute('dir');
  }
  await container.updateComplete;
};

// A stack of three, the front one with an action, settled with its message shown.
const addStackWithAction = async (container: ToastRegion): Promise<Toast> => {
  ToastQueue.add('Oldest notification');
  ToastQueue.add('Older notification');
  ToastQueue.add('Front notification', {
    actionLabel: 'Undo',
    onAction: () => undefined,
  });
  const front = await getFront(container);
  await waitFor(() =>
    expect(front.shadowRoot!.querySelector('.swc-Toast-text')).not.toBeNull()
  );
  await settle(front, getRegion(container));
  await new Promise((resolve) => setTimeout(resolve, 100));
  return front;
};

export const MotionExpandStartsInPlaceTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const motionCase of MOTION_CASES.filter(({ rate }) => rate === 1)) {
        await step(`D1 ${caseName(motionCase)}`, async () => {
          await setUpCase(container, motionCase);
          const front = await addStackWithAction(container);
          const atRest = partBoxes(front);
          const showAll = showAllOf(front)!;
          const frames = await sampleFrames(
            container,
            motionCase.rate,
            () => showAll.click(),
            () => ({
              parts: partBoxes(front),
              moving: allAnimations(container).some(
                (animation) => animation.playState === 'running'
              ),
            }),
            () =>
              getDialog(container)?.open === true &&
              !allAnimations(container).some(
                (animation) => animation.playState === 'running'
              )
          );
          const final = partBoxes(front);
          const [first] = frames;
          for (const selector of FRONT_PART_SELECTORS) {
            expect(
              samePlace(
                first.parts[selector],
                atRest[selector],
                0.5,
                motionCase.rtl
              ),
              `${selector} first frame ${fmt(first.parts[selector])} vs at rest ${fmt(atRest[selector])}`
            ).toBe(true);
          }
          // Show all fades out in place.
          for (const [index, sample] of frames.entries()) {
            const box = sample.parts['.swc-Toast-showAll'];
            if (box) {
              expect(
                near(box, atRest['.swc-Toast-showAll'], 0.5),
                `Show all frame ${index} ${fmt(box)} vs at rest ${fmt(atRest['.swc-Toast-showAll'])}`
              ).toBe(true);
            }
          }
          const last = frames[frames.length - 1];
          for (const selector of FRONT_PART_SELECTORS.slice(0, 3)) {
            expect(
              samePlace(
                last.parts[selector],
                final[selector],
                0.5,
                motionCase.rtl
              ),
              `${selector} last frame ${fmt(last.parts[selector])} vs final ${fmt(final[selector])}`
            ).toBe(true);
          }
          controlOf(container, 'Collapse').click();
          await waitForExpanded(container, false);
        });
      }
    } finally {
      container.removeAttribute('dir');
      ToastQueue.clear();
    }
  },
};

export const MotionExpandStartsInPlaceSlowTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const motionCase of MOTION_CASES.filter(({ rate }) => rate !== 1)) {
        await step(`D1 ${caseName(motionCase)}`, async () => {
          await setUpCase(container, motionCase);
          const front = await addStackWithAction(container);
          const atRest = partBoxes(front);
          const showAll = showAllOf(front)!;
          const frames = await sampleFrames(
            container,
            motionCase.rate,
            () => showAll.click(),
            () => ({
              parts: partBoxes(front),
              moving: allAnimations(container).some(
                (animation) => animation.playState === 'running'
              ),
            }),
            () =>
              getDialog(container)?.open === true &&
              !allAnimations(container).some(
                (animation) => animation.playState === 'running'
              )
          );
          const final = partBoxes(front);
          const [first] = frames;
          for (const selector of FRONT_PART_SELECTORS) {
            expect(
              samePlace(
                first.parts[selector],
                atRest[selector],
                0.5,
                motionCase.rtl
              ),
              `${selector} first frame ${fmt(first.parts[selector])} vs at rest ${fmt(atRest[selector])}`
            ).toBe(true);
          }
          // Show all fades out in place.
          for (const [index, sample] of frames.entries()) {
            const box = sample.parts['.swc-Toast-showAll'];
            if (box) {
              expect(
                near(box, atRest['.swc-Toast-showAll'], 0.5),
                `Show all frame ${index} ${fmt(box)} vs at rest ${fmt(atRest['.swc-Toast-showAll'])}`
              ).toBe(true);
            }
          }
          const last = frames[frames.length - 1];
          for (const selector of FRONT_PART_SELECTORS.slice(0, 3)) {
            expect(
              samePlace(
                last.parts[selector],
                final[selector],
                0.5,
                motionCase.rtl
              ),
              `${selector} last frame ${fmt(last.parts[selector])} vs final ${fmt(final[selector])}`
            ).toBe(true);
          }
          controlOf(container, 'Collapse').click();
          await waitForExpanded(container, false);
        });
      }
    } finally {
      container.removeAttribute('dir');
      ToastQueue.clear();
    }
  },
};

export const MotionCollapseFinishesTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const motionCase of MOTION_CASES.filter(({ rate }) => rate === 1)) {
        await step(`D2 ${caseName(motionCase)}`, async () => {
          await setUpCase(container, motionCase);
          const front = await addStackWithAction(container);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          await settle(...renderedToasts(container));
          await new Promise((resolve) => setTimeout(resolve, 100));
          const dialog = getDialog(container)!;
          // Every collapse animation, and whether it finished, recorded before the swap.
          const tracked = new Set<Animation>();
          const finished = new Set<Animation>();
          let unfinishedAtSwap: string[] | undefined;
          const observer = new MutationObserver(() => {
            if (!dialog.open && !unfinishedAtSwap) {
              unfinishedAtSwap = [...tracked]
                .filter((animation) => !finished.has(animation))
                .map(
                  (animation) =>
                    `${(animation.effect as KeyframeEffect | null)?.target?.className} ${animation.constructor.name}`
                );
            }
          });
          observer.observe(dialog, { attributeFilter: ['open'] });
          let lastOpen:
            | { layers: DOMRect[]; front: DOMRect | undefined }
            | undefined;
          const frames = await sampleFrames(
            container,
            motionCase.rate,
            () => controlOf(container, 'Collapse').click(),
            () => {
              for (const animation of allAnimations(container)) {
                const target = (animation.effect as KeyframeEffect | null)
                  ?.target as Element | null;
                // Show all's fade-in outlasts the collapse by design (600ms).
                if (
                  !tracked.has(animation) &&
                  !target?.classList.contains('swc-Toast-showAll')
                ) {
                  tracked.add(animation);
                  void animation.finished.then(
                    () => finished.add(animation),
                    () => undefined
                  );
                }
              }
              const open = Boolean(getDialog(container)?.open);
              if (open) {
                const [listFront, ...rest] = renderedToasts(container);
                lastOpen = {
                  layers: rest.map((toast) => toast.getBoundingClientRect()),
                  front: boxOf(listFront),
                };
              }
              return {
                open,
                layers: getLayers(container).map((layer) =>
                  layer.getBoundingClientRect()
                ),
                front: boxOf(renderedToasts(container)[0]),
              };
            },
            () => !getDialog(container)?.open
          );
          observer.disconnect();
          expect(
            unfinishedAtSwap,
            'collapse animations unfinished at the swap'
          ).toEqual([]);
          const after = frames[frames.length - 1];
          const keepBottom = motionCase.placement.startsWith('top');
          // The layers peek out at the far edge, so that edge is the one that must not move.
          for (const [index, layer] of after.layers
            .slice(0, VISIBLE_LAYERS)
            .entries()) {
            const zoomed = lastOpen?.layers[index];
            expect(zoomed, `zoomed toast ${index}`).toBeDefined();
            const edge = keepBottom
              ? Math.abs(layer.bottom - zoomed!.bottom)
              : Math.abs(layer.top - zoomed!.top);
            expect(
              Math.max(
                Math.abs(layer.left - zoomed!.left),
                Math.abs(layer.right - zoomed!.right),
                edge
              ),
              `layer ${index} ${fmt(layer)} vs shrinking toast ${fmt(zoomed)}`
            ).toBeLessThanOrEqual(1);
          }
          expect(
            near(after.front, lastOpen?.front, 0.5),
            `front ${fmt(after.front)} vs pinned ${fmt(lastOpen?.front)}`
          ).toBe(true);
        });
      }
    } finally {
      container.removeAttribute('dir');
      ToastQueue.clear();
    }
  },
};

export const MotionCollapseFinishesSlowTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const motionCase of MOTION_CASES.filter(({ rate }) => rate !== 1)) {
        await step(`D2 ${caseName(motionCase)}`, async () => {
          await setUpCase(container, motionCase);
          const front = await addStackWithAction(container);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          await settle(...renderedToasts(container));
          await new Promise((resolve) => setTimeout(resolve, 100));
          const dialog = getDialog(container)!;
          // Every collapse animation, and whether it finished, recorded before the swap.
          const tracked = new Set<Animation>();
          const finished = new Set<Animation>();
          let unfinishedAtSwap: string[] | undefined;
          const observer = new MutationObserver(() => {
            if (!dialog.open && !unfinishedAtSwap) {
              unfinishedAtSwap = [...tracked]
                .filter((animation) => !finished.has(animation))
                .map(
                  (animation) =>
                    `${(animation.effect as KeyframeEffect | null)?.target?.className} ${animation.constructor.name}`
                );
            }
          });
          observer.observe(dialog, { attributeFilter: ['open'] });
          let lastOpen:
            | { layers: DOMRect[]; front: DOMRect | undefined }
            | undefined;
          const frames = await sampleFrames(
            container,
            motionCase.rate,
            () => controlOf(container, 'Collapse').click(),
            () => {
              for (const animation of allAnimations(container)) {
                const target = (animation.effect as KeyframeEffect | null)
                  ?.target as Element | null;
                // Show all's fade-in outlasts the collapse by design (600ms).
                if (
                  !tracked.has(animation) &&
                  !target?.classList.contains('swc-Toast-showAll')
                ) {
                  tracked.add(animation);
                  void animation.finished.then(
                    () => finished.add(animation),
                    () => undefined
                  );
                }
              }
              const open = Boolean(getDialog(container)?.open);
              if (open) {
                const [listFront, ...rest] = renderedToasts(container);
                lastOpen = {
                  layers: rest.map((toast) => toast.getBoundingClientRect()),
                  front: boxOf(listFront),
                };
              }
              return {
                open,
                layers: getLayers(container).map((layer) =>
                  layer.getBoundingClientRect()
                ),
                front: boxOf(renderedToasts(container)[0]),
              };
            },
            () => !getDialog(container)?.open
          );
          observer.disconnect();
          expect(
            unfinishedAtSwap,
            'collapse animations unfinished at the swap'
          ).toEqual([]);
          const after = frames[frames.length - 1];
          const keepBottom = motionCase.placement.startsWith('top');
          // The layers peek out at the far edge, so that edge is the one that must not move.
          for (const [index, layer] of after.layers
            .slice(0, VISIBLE_LAYERS)
            .entries()) {
            const zoomed = lastOpen?.layers[index];
            expect(zoomed, `zoomed toast ${index}`).toBeDefined();
            const edge = keepBottom
              ? Math.abs(layer.bottom - zoomed!.bottom)
              : Math.abs(layer.top - zoomed!.top);
            expect(
              Math.max(
                Math.abs(layer.left - zoomed!.left),
                Math.abs(layer.right - zoomed!.right),
                edge
              ),
              `layer ${index} ${fmt(layer)} vs shrinking toast ${fmt(zoomed)}`
            ).toBeLessThanOrEqual(1);
          }
          expect(
            near(after.front, lastOpen?.front, 0.5),
            `front ${fmt(after.front)} vs pinned ${fmt(lastOpen?.front)}`
          ).toBe(true);
        });
      }
    } finally {
      container.removeAttribute('dir');
      ToastQueue.clear();
    }
  },
};

const VISIBLE_LAYERS = 2;

// The scrim, the controls, and every toast's opacity, as painted.
const viewOpacities = (
  container: ToastRegion
): { scrim: number; controls: number; toasts: Map<Toast, number> } => {
  const dialog = getDialog(container);
  const controls = dialog?.querySelector('.swc-ToastRegion-controls');
  const toasts = new Map<Toast, number>();
  for (const toast of renderedToasts(container)) {
    const surface = toast.shadowRoot!.querySelector('.swc-Toast')!;
    toasts.set(
      toast,
      Number(getComputedStyle(toast).opacity) *
        Number(getComputedStyle(surface).opacity)
    );
  }
  return {
    scrim: dialog ? Number(getComputedStyle(dialog, '::backdrop').opacity) : 0,
    controls: controls ? Number(getComputedStyle(controls).opacity) : 0,
    toasts,
  };
};

// A toast's paint offset from its exit: the inner surface's translate.
const slideOffset = (toast: Toast): number => {
  const matrix = new DOMMatrix(
    getComputedStyle(toast.shadowRoot!.querySelector('.swc-Toast')!).transform
  );
  return Math.max(Math.abs(matrix.m41), Math.abs(matrix.m42));
};

/**
 * A toast pushed back by a new one moves into its layer as one toast: the
 * layer follows the old front toast from its box, and the two cross-fade.
 * The layer is one toast high, so its near edge can differ.
 */
export const MotionPushBackTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const motionCase of [
        MOTION_CASES[0],
        MOTION_CASES[3],
        MOTION_CASES[4],
      ]) {
        await step(`push-back ${caseName(motionCase)}`, async () => {
          await setUpCase(container, motionCase);
          const key = ToastQueue.add('Draft moved to archive');
          await settle(await getFront(container), getRegion(container));
          const ghostOf = (): Toast | undefined =>
            [
              ...container.shadowRoot!.querySelectorAll<Toast>('swc-toast'),
            ].find(
              (toast) =>
                toast.inert &&
                toast.style.position &&
                toast.style.visibility !== 'hidden'
            );
          const layerOf = (): HTMLElement | null =>
            container.shadowRoot!.querySelector<HTMLElement>(
              `.swc-ToastRegion-layer[data-key="${key}"]`
            );
          let seenGhost = false;
          const frames = await sampleFrames(
            container,
            motionCase.rate,
            () =>
              ToastQueue.add('File saved', {
                variant: 'positive',
                actionLabel: 'Undo',
                onAction: () => undefined,
              }),
            () => {
              const ghost = ghostOf();
              seenGhost ||= Boolean(ghost);
              return { ghost: boxOf(ghost), layer: boxOf(layerOf()) };
            },
            () => seenGhost && !ghostOf()
          );
          const anchoredTop = motionCase.placement.startsWith('top');
          const compared = frames.filter(({ ghost, layer }) => ghost && layer);
          expect(compared.length, 'frames with both').toBeGreaterThan(3);
          for (const [index, { ghost, layer }] of compared.entries()) {
            const farEdge = anchoredTop
              ? Math.abs(ghost!.bottom - layer!.bottom)
              : Math.abs(ghost!.top - layer!.top);
            expect(
              Math.max(
                Math.abs(ghost!.left - layer!.left),
                Math.abs(ghost!.width - layer!.width),
                farEdge
              ),
              `frame ${index} ghost ${fmt(ghost)} layer ${fmt(layer)}`
            ).toBeLessThanOrEqual(1);
          }
        });
      }
    } finally {
      ToastQueue.clear();
    }
  },
};

// The controls' fixed zoom at the front toast's edge (`CONTROLS_ZOOM` in the container).
const CONTROLS_ZOOM = 1.15;

type ControlsFrame = {
  box?: DOMRect;
  buttons: number[];
  opacity: number;
  time: number;
};

const controlsOf = (container: ToastRegion): HTMLElement | null =>
  getDialog(container)?.open
    ? getDialog(container)!.querySelector<HTMLElement>(
        '.swc-ToastRegion-controls'
      )
    : null;

const sampleControls = (container: ToastRegion): ControlsFrame => {
  const controls = controlsOf(container);
  return {
    box: boxOf(controls),
    buttons: controls
      ? [...controls.children].map(
          (button) => button.getBoundingClientRect().width
        )
      : [],
    opacity: controls ? Number(getComputedStyle(controls).opacity) : 0,
    time: performance.now(),
  };
};

// B0: the controls' resting box zoomed by `CONTROLS_ZOOM`, flush against the front toast's far edge,
// aligned to its end edge.
const controlsBeyond = (
  stack: DOMRect,
  rest: DOMRect,
  { placement, rtl }: Pick<MotionCase, 'placement' | 'rtl'>
): DOMRect => {
  const width = rest.width * CONTROLS_ZOOM;
  const height = rest.height * CONTROLS_ZOOM;
  return new DOMRect(
    rtl ? stack.left : stack.right - width,
    placement.startsWith('top') ? stack.bottom : stack.top - height,
    width,
    height
  );
};

const endOf = (rect: DOMRect, rtl = false): number =>
  rtl ? rect.left : rect.right;

// The end edge moves one way, allowing 0.1px of rounding.
const expectMonotonicEnd = (
  frames: ControlsFrame[],
  rtl: boolean | undefined,
  label: string
): void => {
  const ends = frames.map(({ box }) => endOf(box!, rtl));
  let direction = 0;
  for (let index = 1; index < ends.length; index++) {
    const delta = ends[index] - ends[index - 1];
    if (Math.abs(delta) <= 0.1) {
      continue;
    }
    if (direction !== 0) {
      expect(
        Math.sign(delta),
        `${label} end edge reverses at frame ${index}: ${ends.map((end) => end.toFixed(1)).join(' ')}`
      ).toBe(direction);
    }
    direction = Math.sign(delta);
  }
};

const expectZoomedButtons = (
  frame: ControlsFrame,
  natural: number[],
  label: string
): void => {
  expect(frame.buttons.length, `${label} buttons`).toBe(natural.length);
  for (const [index, width] of frame.buttons.entries()) {
    expect(
      Math.abs(width - natural[index] * CONTROLS_ZOOM),
      `${label} button ${index} width ${width} vs ${natural[index]} × ${CONTROLS_ZOOM}`
    ).toBeLessThanOrEqual(0.5);
  }
};

/**
 * No jump at either end: the first and last steps are at most 4px, per 60fps
 * frame (a headless browser's frames can be longer). An `ease` move of about
 * 100px peaks near 8px a frame, so only the ends are held to it. The first step
 * is from the start box, since sampling can start one frame into the motion.
 */
const expectNoJump = (
  frames: ControlsFrame[],
  start: DOMRect,
  label: string
): void => {
  const stepOf = (a: ControlsFrame, b: ControlsFrame): number =>
    (Math.max(
      Math.abs(a.box!.left - b.box!.left),
      Math.abs(a.box!.top - b.box!.top),
      Math.abs(a.box!.width - b.box!.width)
    ) *
      1000) /
    60 /
    Math.max(1000 / 60, b.time - a.time);
  const first = near(frames[0].box, start, 0.5)
    ? stepOf(frames[0], frames[1])
    : stepOf(
        { ...frames[0], box: start, time: frames[0].time - 1000 / 60 },
        frames[0]
      );
  expect(first, `${label} first step from ${fmt(start)}`).toBeLessThanOrEqual(
    4
  );
  const last = frames.length - 1;
  expect(
    stepOf(frames[last - 1], frames[last]),
    `${label} last step ${fmt(frames[last - 1].box)} → ${fmt(frames[last].box)}`
  ).toBeLessThanOrEqual(4);
};

// Expands a stack of `count` toasts, then closes all but the front one when `count` is 1.
const expandWith = async (
  container: ToastRegion,
  count: 1 | 2 | 3,
  message: string
): Promise<Toast> => {
  for (let index = 1; index < Math.max(count, 2); index++) {
    ToastQueue.add(`Older notification ${index}`);
  }
  ToastQueue.add(message);
  const front = await getFront(container);
  await settle(front, getRegion(container));
  return front;
};

const CONTROLS_PLACEMENTS: Pick<MotionCase, 'placement' | 'rtl'>[] = [
  { placement: 'bottom' },
  { placement: 'top' },
  { placement: 'bottom-end', rtl: true },
];

type ControlsCase = { count: 1 | 2 | 3; message: string };

const CONTROLS_CASES: Record<string, ControlsCase> = {
  one: { count: 1, message: 'Front notification saved' },
  narrow: { count: 1, message: 'Hi' },
  two: { count: 2, message: 'Front notification saved' },
  three: { count: 3, message: 'Front notification saved' },
};

/**
 * D9. The controls grow out of the box flush against the front toast's far
 * edge, zoomed by a fixed `CONTROLS_ZOOM` whatever the toasts' widths, and
 * shrink back into it on collapse. A single toast cannot expand, so its case
 * expands two and closes one, and checks the collapse.
 */
const controlsZoomStory = (
  placement: Pick<MotionCase, 'placement' | 'rtl'>,
  rate: number,
  cases: (keyof typeof CONTROLS_CASES)[]
): Story => ({
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const name of cases) {
        const { count, message } = CONTROLS_CASES[name];
        await step(
          `D9 ${name} ${caseName({ ...placement, rate })}`,
          async () => {
            await setUpCase(container, { ...placement, rate });
            let front = await expandWith(container, count, message);
            const stack = front.getBoundingClientRect();
            const expandFrames = await sampleFrames(
              container,
              count === 1 ? 1 : rate,
              () => showAllOf(front)!.click(),
              () => sampleControls(container),
              () => {
                const controls = controlsOf(container);
                return (
                  Boolean(controls) &&
                  controls!.getAnimations().length === 0 &&
                  Number(getComputedStyle(controls!).opacity) >= 0.999
                );
              }
            );
            if (count === 1) {
              for (const toast of renderedToasts(container)) {
                if (toast.textContent !== message) {
                  closeButtonOf(toast).click();
                }
              }
              await waitFor(() =>
                expect(renderedToasts(container)).toHaveLength(1)
              );
              front = renderedToasts(container)[0];
            }
            await settle(...renderedToasts(container));
            await new Promise((resolve) => setTimeout(resolve, 100));
            const rest = sampleControls(container);
            const restBox = rest.box!;
            if (count > 1) {
              const beyond = controlsBeyond(stack, restBox, placement);
              const shown = expandFrames.filter(({ box }) => box);
              expect(
                near(shown[0].box, beyond, 1),
                `expand first frame ${fmt(shown[0].box)} vs B0 ${fmt(beyond)}`
              ).toBe(true);
              expect(
                shown[0].opacity,
                'expand first opacity'
              ).toBeLessThanOrEqual(0.05);
              expectZoomedButtons(shown[0], rest.buttons, 'expand first frame');
              expect(
                Math.abs(
                  endOf(shown[0].box!, placement.rtl) -
                    endOf(stack, placement.rtl)
                ),
                'expand first frame end edge vs the front toast'
              ).toBeLessThanOrEqual(0.5);
              expectMonotonicEnd(shown, placement.rtl, 'expand');
              const last = shown[shown.length - 1];
              expect(
                near(last.box, restBox, 0.5),
                `expand last frame ${fmt(last.box)} vs B1 ${fmt(restBox)}`
              ).toBe(true);
              if (rate === 1) {
                expectNoJump(shown, beyond, 'expand');
              }
            }

            const collapseFrames = await sampleFrames(
              container,
              rate,
              () => controlOf(container, 'Collapse').click(),
              () => sampleControls(container),
              () => !getDialog(container)?.open
            );
            await settle(front, getRegion(container));
            const stacked = front.getBoundingClientRect();
            const beyond = controlsBeyond(stacked, restBox, placement);
            const collapsing = collapseFrames.filter(({ box }) => box);
            // Sampling starts a frame after the click, so its first frame can be one frame in.
            expect(
              near(collapsing[0].box, restBox, 3),
              `collapse first frame ${fmt(collapsing[0].box)} vs B1 ${fmt(restBox)}`
            ).toBe(true);
            const last = collapsing[collapsing.length - 1];
            expect(
              near(last.box, beyond, 1),
              `collapse last frame ${fmt(last.box)} vs B0 ${fmt(beyond)}`
            ).toBe(true);
            expectZoomedButtons(last, rest.buttons, 'collapse last frame');
            expect(
              Math.abs(
                endOf(last.box!, placement.rtl) - endOf(stacked, placement.rtl)
              ),
              'collapse last frame end edge vs the front toast'
            ).toBeLessThanOrEqual(0.5);
            expectMonotonicEnd(collapsing, placement.rtl, 'collapse');
            if (rate === 1) {
              expectNoJump(collapsing, restBox, 'collapse');
            }
          }
        );
      }
    } finally {
      ToastQueue.clear();
    }
  },
});

const ALL_CONTROLS_CASES = Object.keys(CONTROLS_CASES);
export const MotionControlsZoomTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[0],
  1,
  ALL_CONTROLS_CASES
);
export const MotionControlsZoomTopTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[1],
  1,
  ALL_CONTROLS_CASES
);
export const MotionControlsZoomEndRtlTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[2],
  1,
  ALL_CONTROLS_CASES
);
export const MotionControlsZoomSlowOneTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[0],
  0.25,
  ['one', 'narrow']
);
export const MotionControlsZoomSlowTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[0],
  0.25,
  ['two', 'three']
);
export const MotionControlsZoomSlowTopOneTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[1],
  0.25,
  ['one', 'narrow']
);
export const MotionControlsZoomSlowTopTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[1],
  0.25,
  ['two', 'three']
);
export const MotionControlsZoomSlowEndRtlOneTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[2],
  0.25,
  ['one', 'narrow']
);
export const MotionControlsZoomSlowEndRtlTest = controlsZoomStory(
  CONTROLS_PLACEMENTS[2],
  0.25,
  ['two', 'three']
);

const clearFadesStory = (rate: number): Story => ({
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    try {
      for (const placement of ['bottom', 'top'] as const) {
        await step(`D3, D4, D5 expanded ${placement} ×${rate}`, async () => {
          await setUpCase(container, { placement, rate });
          const front = await addStackWithAction(container);
          showAllOf(front)!.click();
          await waitForExpanded(container, true);
          await settle(...renderedToasts(container));
          await new Promise((resolve) => setTimeout(resolve, 100));
          const starts = new Map(
            renderedToasts(container).map((toast) => [
              toast,
              toast.getBoundingClientRect(),
            ])
          );
          const frames = await sampleFrames(
            container,
            rate,
            () => controlOf(container, 'Clear all').click(),
            () => ({
              opacities: viewOpacities(container),
              boxes: new Map(
                [...starts.keys()]
                  .filter((toast) => toast.isConnected)
                  .map((toast) => [
                    toast,
                    {
                      box: toast.getBoundingClientRect(),
                      slide: slideOffset(toast),
                    },
                  ])
              ),
              open: Boolean(getDialog(container)?.open),
            }),
            () => !getDialog(container)?.open
          );
          const open = frames.filter((frame) => frame.open);
          // D3: every opacity only goes down, and reaches 0 before the view closes.
          const series = (
            pick: (frame: (typeof open)[number]) => number | undefined
          ): number[] =>
            open
              .map(pick)
              .filter((value): value is number => value !== undefined);
          const check = (label: string, values: number[]): void => {
            for (let index = 1; index < values.length; index++) {
              expect(
                values[index],
                `${label} frame ${index}: ${values[index - 1]} → ${values[index]}`
              ).toBeLessThanOrEqual(values[index - 1] + 0.001);
            }
            expect(
              values[values.length - 1],
              `${label} last value before the view closes`
            ).toBeLessThanOrEqual(0.05);
          };
          check(
            'scrim',
            series((frame) => frame.opacities.scrim)
          );
          check(
            'controls',
            series((frame) => frame.opacities.controls)
          );
          for (const toast of starts.keys()) {
            const values = series((frame) => frame.opacities.toasts.get(toast));
            check(`toast ${toast.textContent}`, values);
          }
          // D4: no toast moves while it fades.
          for (const frame of frames) {
            for (const [toast, { box, slide }] of frame.boxes) {
              expect(
                near(box, starts.get(toast), 0.5) && slide <= 0.5,
                `toast ${toast.textContent} ${fmt(box)} slide ${slide} vs ${fmt(starts.get(toast))}`
              ).toBe(true);
            }
          }
          // D5: on the first frame, the scrim, the controls, and the toasts are all fading or none are.
          const [first] = frames;
          const fading = [
            first.opacities.scrim < 1,
            first.opacities.controls < 1,
            ...[...first.opacities.toasts.values()].map((value) => value < 1),
          ];
          expect(
            fading.every(Boolean) || !fading.some(Boolean),
            `first frame fading: ${fading.join(', ')}`
          ).toBe(true);
          if (frames.length > 1) {
            const second = frames[1];
            expect(
              second.opacities.scrim < 1 &&
                second.opacities.controls < 1 &&
                [...second.opacities.toasts.values()].every(
                  (value) => value < 1
                ),
              'all fading by the second frame'
            ).toBe(true);
          }
        });
      }

      for (const placement of ['bottom', 'top'] as const) {
        await step(`D4 stacked ${placement} ×${rate}`, async () => {
          await setUpCase(container, { placement, rate });
          const front = await addStackWithAction(container);
          const start = front.getBoundingClientRect();
          const frames = await sampleFrames(
            container,
            rate,
            () => ToastQueue.clear(),
            () =>
              front.isConnected
                ? {
                    box: front.getBoundingClientRect(),
                    slide: slideOffset(front),
                  }
                : undefined,
            () => !front.isConnected
          );
          for (const [index, frame] of frames.entries()) {
            if (frame) {
              expect(
                near(frame.box, start, 0.5) && frame.slide <= 0.5,
                `frame ${index} ${fmt(frame.box)} slide ${frame.slide} vs ${fmt(start)}`
              ).toBe(true);
            }
          }
        });
      }
    } finally {
      ToastQueue.clear();
    }
  },
});

export const MotionClearFadesTest = clearFadesStory(1);
export const MotionClearFadesSlowTest = clearFadesStory(0.25);

const oneToastControlsStory = (
  message: string,
  trigger: 'button' | 'Escape' | 'scrim'
): Story => ({
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const triggers: Record<typeof trigger, () => void> = {
      button: () => controlOf(container, 'Collapse').click(),
      Escape: () =>
        getDialog(container)!.dispatchEvent(
          new Event('cancel', { cancelable: true })
        ),
      scrim: () =>
        getDialog(container)!.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            composed: true,
            clientX: 2,
            clientY: 2,
          })
        ),
    };
    try {
      const collapse = triggers[trigger];
      {
        for (const rate of [1, 0.25]) {
          await step(`D6 ${trigger}, "${message}" ×${rate}`, async () => {
            await setUpCase(container, { placement: 'bottom', rate });
            // Two toasts to expand, then the other one closes, leaving one in the view.
            ToastQueue.add('Other notification');
            ToastQueue.add(message);
            const front = await getFront(container);
            await settle(front, getRegion(container));
            showAllOf(front)!.click();
            await waitForExpanded(container, true);
            const other = renderedToasts(container).find(
              (toast) => toast.textContent === 'Other notification'
            )!;
            closeButtonOf(other).click();
            await waitFor(() =>
              expect(renderedToasts(container)).toHaveLength(1)
            );
            await settle(...renderedToasts(container));
            await new Promise((resolve) => setTimeout(resolve, 100));
            const rest = sampleControls(container);
            const before = rest.box!;
            const listed = renderedToasts(container)[0].getBoundingClientRect();
            const frames = (
              await sampleFrames(
                container,
                rate,
                collapse,
                () => sampleControls(container),
                () => !getDialog(container)?.open
              )
            ).filter(({ box }) => box);
            const remaining = renderedToasts(container)[0];
            await settle(remaining, getRegion(container));
            const beyond = controlsBeyond(
              remaining.getBoundingClientRect(),
              before,
              { placement: 'bottom' }
            );
            // No jump on the first frame; sampling can start one frame in.
            expect(
              near(frames[0].box, before, 3),
              `first frame ${fmt(frames[0].box)} vs ${fmt(before)}`
            ).toBe(true);
            const last = frames[frames.length - 1];
            // Toward the front toast, below them in a bottom stack.
            expect(
              last.box!.top,
              'moves toward the front toast'
            ).toBeGreaterThan(before.top);
            expect(
              near(last.box, beyond, 1),
              `last frame ${fmt(last.box)} vs B0 ${fmt(beyond)}`
            ).toBe(true);
            expectZoomedButtons(last, rest.buttons, 'last frame');
            const stacked = remaining.getBoundingClientRect();
            if (Math.abs(listed.right - stacked.right) <= 0.5) {
              // Straight down: the stacked and listed toast share an end edge.
              for (const [index, frame] of frames.entries()) {
                expect(
                  Math.abs(frame.box!.right - before.right),
                  `frame ${index} end edge ${frame.box!.right} vs ${before.right}`
                ).toBeLessThanOrEqual(0.5);
              }
            } else {
              // A toast narrower than the controls spans the view in the list, but not in the
              // stack, so its end edge moves, and the controls' end edge follows it one way.
              expectMonotonicEnd(frames, false, 'collapse');
            }
            if (rate === 1) {
              expectNoJump(frames, before, 'collapse');
            }
          });
        }
      }
    } finally {
      ToastQueue.clear();
    }
  },
});

export const MotionOneToastControlsButtonTest = oneToastControlsStory(
  'A notification wider than the controls',
  'button'
);
export const MotionOneToastControlsEscapeTest = oneToastControlsStory(
  'A notification wider than the controls',
  'Escape'
);
export const MotionOneToastControlsScrimTest = oneToastControlsStory(
  'A notification wider than the controls',
  'scrim'
);
export const MotionNarrowToastControlsButtonTest = oneToastControlsStory(
  'Hi',
  'button'
);
export const MotionNarrowToastControlsEscapeTest = oneToastControlsStory(
  'Hi',
  'Escape'
);
export const MotionNarrowToastControlsScrimTest = oneToastControlsStory(
  'Hi',
  'scrim'
);

// ────────────────────────────────
//    MOTION RULES (M1–M5)
// ────────────────────────────────

type TrackKind = 'background' | 'part' | 'copy' | 'layer' | 'controls';

type Track = {
  kind: TrackKind;
  key: string;
  box: DOMRect;
  opacity: number;
};

type MotionFrame = {
  time: number;
  open: boolean;
  tracks: Map<string, Track>;
};

// The opacity an element shows: its own and every ancestor's, across shadow roots.
const effectiveOpacity = (element: Element): number => {
  let opacity = 1;
  let node: Element | null = element;
  while (node) {
    opacity *= Number(getComputedStyle(node).opacity);
    node =
      node.parentElement ??
      ((node.getRootNode() as ShadowRoot).host as Element | undefined) ??
      null;
  }
  return opacity;
};

// `inset(t r b l round …)` from a computed `clip-path`, in the element's own pixels.
const clipInsets = (clipPath: string): number[] | undefined => {
  const match = /^inset\(([^)]*?)(?:\s+round[^)]*)?\)$/.exec(clipPath);
  if (!match) {
    return undefined;
  }
  const values = match[1].trim().split(/\s+/).map(parseFloat);
  const [top, right = top, bottom = top, left = right] = values;
  return [top, right, bottom, left];
};

const insetBox = (
  rect: DOMRect,
  [top, right, bottom, left]: number[],
  scale: number
): DOMRect =>
  new DOMRect(
    rect.left + left * scale,
    rect.top + top * scale,
    rect.width - (left + right) * scale,
    rect.height - (top + bottom) * scale
  );

const intersect = (a: DOMRect, b: DOMRect): DOMRect => {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  return new DOMRect(
    left,
    top,
    Math.max(0, Math.min(a.right, b.right) - left),
    Math.max(0, Math.min(a.bottom, b.bottom) - top)
  );
};

// The box a toast's background shows: its `::before`, inside any crop on the surface or the host.
const backgroundBox = (toast: Toast): DOMRect | undefined => {
  const surface = toast.shadowRoot?.querySelector<HTMLElement>('.swc-Toast');
  if (!surface || surface.offsetWidth === 0) {
    return undefined;
  }
  const surfaceRect = surface.getBoundingClientRect();
  const scale = surfaceRect.width / surface.offsetWidth;
  const before = getComputedStyle(surface, '::before');
  let box = insetBox(
    surfaceRect,
    [before.top, before.right, before.bottom, before.left].map(
      (value) => parseFloat(value) || 0
    ),
    scale
  );
  for (const [element, rect] of [
    [surface, surfaceRect],
    [toast, toast.getBoundingClientRect()],
  ] as const) {
    const clip = clipInsets(getComputedStyle(element).clipPath);
    if (clip) {
      box = intersect(
        box,
        // A negative inset reaches past the element, as the clip around a growing background does.
        insetBox(rect, clip, scale)
      );
    }
  }
  return box.width > 0 && box.height > 0 ? box : undefined;
};

const MOTION_PARTS = [
  '.swc-Toast-body',
  '.swc-Toast-close',
  '.swc-Toast-action',
  '.swc-Toast-showAll',
];

// Every moving thing in the container on this frame, by a stable id.
const recordFrame = (
  container: ToastRegion,
  keyOf: Map<string, string>
): MotionFrame => {
  const root = container.shadowRoot!;
  const rtl = getComputedStyle(container).direction === 'rtl';
  const tracks = new Map<string, Track>();
  const add = (id: string, track: Track): void => {
    if (track.box.width > 0 && track.box.height > 0) {
      tracks.set(id, track);
    }
  };
  for (const toast of root.querySelectorAll<Toast>('swc-toast')) {
    // The hidden copy the container measures a new toast's size with never shows. A closing toast
    // still shows while it leaves.
    if (toast.style.visibility === 'hidden') {
      continue;
    }
    const message = toast.textContent?.trim() ?? '';
    const key = keyOf.get(message) ?? message;
    const surface = toast.shadowRoot?.querySelector('.swc-Toast');
    const box = backgroundBox(toast);
    if (!surface || !box) {
      continue;
    }
    const kind: TrackKind = toast.inert ? 'copy' : 'background';
    add(`${kind}:${key}`, {
      kind,
      key,
      box,
      opacity: effectiveOpacity(surface),
    });
    if (kind === 'background') {
      for (const selector of MOTION_PARTS) {
        const part = toast.shadowRoot!.querySelector(selector);
        const rect = part?.getBoundingClientRect();
        // An empty message shows nothing until its text renders into the live region.
        if (
          part &&
          rect &&
          (selector !== '.swc-Toast-body' || part.childElementCount > 0)
        ) {
          // The message's box stretches with the toast, without its text moving, and it has no
          // background, so only its start corner shows where it is.
          const box =
            selector === '.swc-Toast-body'
              ? new DOMRect(rtl ? rect.right - 1 : rect.left, rect.top, 1, 1)
              : rect;
          add(`part:${key}:${selector}`, {
            kind: 'part',
            key,
            box,
            opacity: effectiveOpacity(part),
          });
        }
      }
    }
  }
  for (const layer of root.querySelectorAll<HTMLElement>(
    '.swc-ToastRegion-layer'
  )) {
    const key = layer.dataset.key ?? '';
    add(`layer:${key}`, {
      kind: 'layer',
      key,
      box: layer.getBoundingClientRect(),
      opacity: effectiveOpacity(layer),
    });
  }
  const controls = controlsOf(container);
  if (controls) {
    add('controls', {
      kind: 'controls',
      key: 'controls',
      box: controls.getBoundingClientRect(),
      opacity: effectiveOpacity(controls),
    });
  }
  return {
    time: performance.now(),
    open: Boolean(getDialog(container)?.open),
    tracks,
  };
};

type Recording = {
  frames: MotionFrame[];
  durations: number[];
  start: number;
};

/**
 * Runs `action` and records every frame until the motion ends. Each new
 * animation plays at `rate` from its first frame, and CSS transitions are
 * set to it on every frame, so the motion plays as a slower device would.
 */
const recordMotion = async (
  container: ToastRegion,
  rate: number,
  action: () => unknown
): Promise<Recording> => {
  const keyOf = new Map<string, string>();
  const learnKeys = (): void => {
    for (const entry of ToastQueue.entries) {
      keyOf.set(entry.message, entry.key);
    }
  };
  learnKeys();
  const durations: number[] = [];
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (
    this: Element,
    ...args: Parameters<Element['animate']>
  ): Animation {
    const animation = animate.apply(this, args);
    animation.playbackRate = rate;
    const duration = animation.effect?.getTiming().duration;
    if (typeof duration === 'number') {
      durations.push(duration);
    }
    return animation;
  };
  const frames: MotionFrame[] = [];
  try {
    frames.push(recordFrame(container, keyOf));
    const start = performance.now();
    await action();
    learnKeys();
    // Show all's 600ms fade is the longest motion; the extra time lets a late one start.
    const minimum = (SHOW_ALL_FADE_IN / rate) * 0.5 + 100;
    for (let frame = 0; frame < MAX_FRAMES; frame++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      setRate(container, rate);
      for (const animation of getDialog(container)?.getAnimations({
        subtree: true,
      }) ?? []) {
        animation.playbackRate = rate;
      }
      learnKeys();
      frames.push(recordFrame(container, keyOf));
      const running = [
        ...allAnimations(container),
        ...(getDialog(container)?.getAnimations({ subtree: true }) ?? []),
      ].some(
        (animation) => animation.playState === 'running' || animation.pending
      );
      if (performance.now() - start >= minimum && !running) {
        break;
      }
    }
    return { frames, durations, start };
  } finally {
    Element.prototype.animate = animate;
  }
};

const SHOW_ALL_FADE_IN = 600;
// Well past the slowest motion: Show all's 600ms fade at 0.25×.
const MAX_FRAMES = 300;

// Progress of CSS `ease` (cubic-bezier(0.25, 0.1, 0.25, 1)) at `time`, a fraction of the duration.
const easeProgress = (time: number): number => {
  const bezier = (t: number, a: number, b: number): number =>
    3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3;
  let low = 0;
  let high = 1;
  for (let step = 0; step < 30; step++) {
    const middle = (low + high) / 2;
    if (bezier(middle, 0.25, 0.25) < time) {
      low = middle;
    } else {
      high = middle;
    }
  }
  return bezier((low + high) / 2, 0.1, 1);
};

const endEdge = (box: DOMRect, rtl?: boolean): number =>
  rtl ? box.left : box.right;

// Per-60fps-frame size of a step between two frames.
const stepSize = (
  a: MotionFrame,
  b: MotionFrame,
  before: DOMRect,
  after: DOMRect
): number =>
  (Math.max(
    Math.abs(before.left - after.left),
    Math.abs(before.top - after.top),
    Math.abs(before.right - after.right),
    Math.abs(before.bottom - after.bottom)
  ) *
    1000) /
  60 /
  Math.max(1000 / 60, b.time - a.time);

/**
 * Checks M1–M4 on a recording and returns every violation:
 * M1, each edge moves one way; M2, nothing moves sideways against its anchor;
 * M3, no jumps at the ends of a motion or at a handoff; M4, opacity goes one
 * way and reaches its end before the element goes.
 */
const motionViolations = (
  { frames }: Recording,
  { rtl, front, rate = 1 }: { rtl?: boolean; front?: string; rate?: number }
): string[] => {
  const violations: string[] = [];
  const ids = new Set(frames.flatMap((frame) => [...frame.tracks.keys()]));
  const series = (id: string): { frame: MotionFrame; track: Track }[] =>
    frames.flatMap((frame) => {
      const track = frame.tracks.get(id);
      return track ? [{ frame, track }] : [];
    });
  // Motion only shows where the element does.
  const VISIBLE = 0.05;
  for (const id of ids) {
    const all = series(id);
    const points = all.filter(({ track }) => track.opacity > VISIBLE);
    if (all.length < 2) {
      continue;
    }
    // M1. Each edge moves one way, within 0.5px.
    for (const edge of points.length > 1
      ? (['left', 'top', 'right', 'bottom'] as const)
      : []) {
      let direction = 0;
      let extreme = points[0].track.box[edge];
      for (const { track } of points) {
        const value = track.box[edge];
        const delta = value - extreme;
        if (direction === 0) {
          if (Math.abs(delta) > 0.5) {
            direction = Math.sign(delta);
            extreme = value;
          }
          continue;
        }
        if (delta * direction > 0) {
          extreme = value;
        } else if (Math.abs(delta) > 0.5) {
          violations.push(
            `M1 ${id} ${edge} reverses by ${Math.abs(delta).toFixed(1)}px`
          );
          break;
        }
      }
    }
    // M3. The first and last steps of its motion are at most 4px per 60fps frame. A step counts
    // where it lands on a frame the element shows on.
    // A part moves with its toast, so its own step is what its background's step does not explain.
    const anchorId = id.startsWith('part:')
      ? `background:${id.split(':')[1]}`
      : undefined;
    const relative = (frame: MotionFrame, box: DOMRect): DOMRect => {
      const anchor = anchorId ? frame.tracks.get(anchorId) : undefined;
      return anchor
        ? new DOMRect(
            box.left - anchor.box.left,
            box.top - anchor.box.top,
            box.width,
            box.height
          )
        : box;
    };
    const steps = all
      .slice(1)
      .map((point, index) =>
        stepSize(
          all[index].frame,
          point.frame,
          relative(all[index].frame, all[index].track.box),
          relative(point.frame, point.track.box)
        )
      );
    const moving = steps.flatMap((step, index) => (step > 0.1 ? [index] : []));
    // An `ease` move starts at its own pace: one 60fps frame in, a 200px move has gone 5px. A first
    // step up to that pace, plus 1px, is the curve and not a jump.
    const travel = Math.max(
      ...(['left', 'top', 'right', 'bottom'] as const).map((side) =>
        Math.abs(all[all.length - 1].track.box[side] - all[0].track.box[side])
      )
    );
    const easeStep =
      travel * easeProgress(1000 / 60 / (MOVE_DURATION_MS / rate)) + 1;
    if (moving.length > 0) {
      for (const [which, index] of [
        ['first', moving[0]],
        ['last', moving[moving.length - 1]],
      ] as const) {
        if (steps[index] > Math.max(4, which === 'first' ? easeStep : 0)) {
          const a = all[index];
          const b = all[index + 1];
          violations.push(
            `M3 ${id} ${which} step ${steps[index].toFixed(1)}px at frame ${frames.indexOf(b.frame)}: ${fmt(a.track.box)} → ${fmt(b.track.box)}, opacity ${a.track.opacity.toFixed(2)} → ${b.track.opacity.toFixed(2)}`
          );
        }
      }
    }
    // M4. Opacity goes one way, within 0.02.
    let direction = 0;
    let extreme = all[0].track.opacity;
    for (const { track } of all) {
      const delta = track.opacity - extreme;
      if (direction === 0) {
        if (Math.abs(delta) > 0.02) {
          direction = Math.sign(delta);
          extreme = track.opacity;
        }
        continue;
      }
      if (delta * direction > 0) {
        extreme = track.opacity;
      } else if (Math.abs(delta) > 0.02) {
        violations.push(
          `M4 ${id} opacity reverses by ${Math.abs(delta).toFixed(2)}`
        );
        break;
      }
    }
  }

  // M2. The controls follow the front toast's end edge, parts their toast's background, and a
  // fading copy its layer.
  const anchorOf = (id: string): string | undefined => {
    if (id === 'controls') {
      return front ? `background:${front}` : undefined;
    }
    const [kind, key] = id.split(':');
    if (kind === 'part') {
      return `background:${key}`;
    }
    if (kind === 'copy') {
      return `layer:${key}`;
    }
    return undefined;
  };
  for (const id of ids) {
    const anchor = anchorOf(id);
    if (!anchor) {
      continue;
    }
    const pairs = frames.flatMap((frame) => {
      const element = frame.tracks.get(id);
      const target = frame.tracks.get(anchor);
      return element && target ? [{ element, target }] : [];
    });
    if (pairs.length < 2) {
      continue;
    }
    // The message's box stretches with its toast, so its start edge is the one that shows.
    const edge = id.endsWith('.swc-Toast-body')
      ? (box: DOMRect): number => endEdge(box, !rtl)
      : (box: DOMRect): number => endEdge(box, rtl);
    const elementStart = edge(pairs[0].element.box);
    const anchorStart = edge(pairs[0].target.box);
    const anchorMoves = pairs.map(
      ({ target }) => edge(target.box) - anchorStart
    );
    const anchorTravel = anchorMoves[anchorMoves.length - 1];
    const anchorStill = anchorMoves.every((move) => Math.abs(move) <= 0.5);
    for (const { element } of pairs) {
      const move = edge(element.box) - elementStart;
      if (
        anchorStill ? Math.abs(move) > 1 : move * Math.sign(anchorTravel) < -1
      ) {
        violations.push(
          `M2 ${id} end edge moves ${move.toFixed(1)}px against ${anchor} (${anchorTravel.toFixed(1)}px)`
        );
        break;
      }
    }
  }

  // M3 at handoffs: whatever shows a toast (its background, its fading copy, or its layer) keeps
  // its place when one takes over from another, and nothing moves when the view gives way to the
  // stack.
  const keys = new Set(
    [...ids].flatMap((id) => {
      const [kind, key] = id.split(':');
      return ['background', 'copy', 'layer'].includes(kind) ? [key] : [];
    })
  );
  for (const key of keys) {
    const shown = (frame: MotionFrame): Track | undefined =>
      [`background:${key}`, `copy:${key}`, `layer:${key}`]
        .map((id) => frame.tracks.get(id))
        .find((track) => track && track.opacity > 0.02);
    for (let index = 1; index < frames.length; index++) {
      const before = shown(frames[index - 1]);
      const after = shown(frames[index]);
      if (!before || !after || before.kind === after.kind) {
        continue;
      }
      // Layers are one toast high, so the edge away from the anchor, the start edge, and the width.
      const far = (box: DOMRect): number =>
        Math.abs(before.box.top - after.box.top) <=
        Math.abs(before.box.bottom - after.box.bottom)
          ? box.top
          : box.bottom;
      const change = Math.max(
        Math.abs(before.box.left - after.box.left),
        Math.abs(before.box.width - after.box.width),
        Math.abs(far(before.box) - far(after.box))
      );
      if (change > 1) {
        violations.push(
          `M3 ${key} handoff ${before.kind} → ${after.kind} moves ${change.toFixed(1)}px: ${fmt(before.box)} → ${fmt(after.box)}`
        );
      }
    }
  }
  for (let index = 1; index < frames.length; index++) {
    if (frames[index - 1].open === frames[index].open) {
      continue;
    }
    for (const [id, after] of frames[index].tracks) {
      const before = frames[index - 1].tracks.get(id);
      if (before && after.opacity > 0.02 && !near(before.box, after.box, 1)) {
        violations.push(
          `M3 ${id} moves at the swap: ${fmt(before.box)} → ${fmt(after.box)}`
        );
      }
    }
  }

  // M4. Anything that goes without a handoff has faded out first.
  for (const id of ids) {
    const points = series(id);
    const last = points[points.length - 1];
    if (last.frame === frames[frames.length - 1]) {
      continue;
    }
    const [kind, key] = id.split(':');
    const next = frames[frames.indexOf(last.frame) + 1];
    const handedOff =
      kind === 'part'
        ? !next.tracks.has(`background:${key}`)
        : ['background', 'copy', 'layer'].some(
            (other) => other !== kind && next.tracks.has(`${other}:${key}`)
          );
    if (!handedOff && last.track.opacity > 0.05) {
      violations.push(
        `M4 ${id} goes at opacity ${last.track.opacity.toFixed(2)} after frame ${frames.indexOf(last.frame)}; next frame shows ${[...next.tracks.keys()].filter((other) => other.includes(key)).join(', ') || 'nothing of it'}`
      );
    }
  }
  return violations;
};

type MotionAction =
  | 'add'
  | 'close front'
  | 'close in list'
  | 'expand'
  | 'collapse'
  | 'collapse Escape'
  | 'clear stacked'
  | 'clear expanded'
  | 'hover'
  | 'leave';

const MESSAGES = [
  'First notification',
  'Second notification',
  'Third notification',
];

// Sets up `count` toasts, expanded when the action starts from the expanded view.
const setUpMotion = async (
  container: ToastRegion,
  placement: Pick<MotionCase, 'placement' | 'rtl'>,
  count: number,
  expanded: boolean
): Promise<void> => {
  await setUpCase(container, { ...placement, rate: 1 });
  for (const message of MESSAGES.slice(0, Math.max(count, expanded ? 2 : 0))) {
    ToastQueue.add(message);
  }
  if (count === 0) {
    return;
  }
  let front = await getFront(container);
  await settle(front, getRegion(container));
  if (!expanded) {
    return;
  }
  showAllOf(front)!.click();
  await waitForExpanded(container, true);
  await settle(...renderedToasts(container));
  if (count === 1) {
    front = renderedToasts(container).find(
      (toast) => toast.textContent?.trim() === MESSAGES[1]
    )!;
    const other = renderedToasts(container).find((toast) => toast !== front)!;
    closeButtonOf(other).click();
    await waitFor(() => expect(renderedToasts(container)).toHaveLength(1));
  }
  await settle(...renderedToasts(container));
  await new Promise((resolve) => setTimeout(resolve, 100));
};

const EXPANDED_ACTIONS: MotionAction[] = [
  'close in list',
  'collapse',
  'collapse Escape',
  'clear expanded',
];

const runAction = async (
  container: ToastRegion,
  action: MotionAction
): Promise<void> => {
  const listed = renderedToasts(container);
  const front = ToastQueue.entries[0]?.message;
  const toastOf = (message: string | undefined): Toast | undefined =>
    listed.find((toast) => toast.textContent?.trim() === message);
  switch (action) {
    case 'add':
      ToastQueue.add('New notification');
      return;
    case 'close front':
      closeButtonOf(toastOf(front)!).click();
      return;
    case 'close in list':
      closeButtonOf(toastOf(ToastQueue.entries[1]?.message)!).click();
      return;
    case 'expand':
      showAllOf(toastOf(front)!)!.click();
      return;
    case 'collapse':
      controlOf(container, 'Collapse').click();
      return;
    case 'collapse Escape':
      await userEvent.keyboard('{Escape}');
      return;
    case 'clear stacked':
      ToastQueue.clear();
      return;
    case 'clear expanded':
      controlOf(container, 'Clear all').click();
      return;
    case 'hover':
      await userEvent.hover(toastOf(front)!);
      return;
    case 'leave':
      await userEvent.hover(container.ownerDocument.querySelector('#outside')!);
      return;
  }
};

type MotionRun = { action: MotionAction; counts: number[]; rate: number };

const motionRulesStory = (
  placement: Pick<MotionCase, 'placement' | 'rtl'>,
  runs: MotionRun[]
): Story => ({
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const found: string[] = [];
    try {
      // The first toast on the page can load its font mid-motion, which reflows it; that is not motion.
      ToastQueue.add('Font warm-up');
      await settle(await getFront(container));
      await container.ownerDocument.fonts.ready;
      for (const { action, counts, rate } of runs) {
        for (const count of counts) {
          await step(
            `${action}, ${count} toast${count === 1 ? '' : 's'}, ${caseName({ ...placement, rate })}`,
            async () => {
              const expanded = EXPANDED_ACTIONS.includes(action);
              await setUpMotion(container, placement, count, expanded);
              if (action === 'leave') {
                await runAction(container, 'hover');
                // The peek's 400ms transition ends.
                await new Promise((resolve) => setTimeout(resolve, 600));
              }
              if (action === 'collapse Escape') {
                controlOf(container, 'Collapse').focus();
              }
              const front = ToastQueue.entries[0]?.key;
              const recording = await recordMotion(container, rate, () =>
                runAction(container, action)
              );
              const after = ToastQueue.entries[0]?.key;
              const violations = motionViolations(recording, {
                rtl: placement.rtl,
                front: after ?? front,
                rate,
              });
              found.push(
                ...violations.map(
                  (violation) =>
                    `${action}, ${count}, ${caseName({ ...placement, rate })}: ${violation}`
                )
              );
              // The open view covers the page, so the pointer can leave only a stack.
              if (!getDialog(container)?.open) {
                await userEvent.hover(
                  container.ownerDocument.querySelector('#outside')!
                );
              }
            }
          );
        }
      }
      expect(found, 'motion rules').toEqual([]);
    } finally {
      ToastQueue.clear();
    }
  },
});

const MOTION_RUNS = {
  Add: [{ action: 'add', counts: [0, 1, 2], rate: 1 }] as MotionRun[],
  CloseFront: [
    { action: 'close front', counts: [1, 2, 3], rate: 1 },
  ] as MotionRun[],
  ClearStacked: [
    { action: 'clear stacked', counts: [1, 2, 3], rate: 1 },
  ] as MotionRun[],
  Hover: [
    { action: 'hover', counts: [2, 3], rate: 1 },
    { action: 'leave', counts: [2, 3], rate: 1 },
  ] as MotionRun[],
  Expand: [{ action: 'expand', counts: [2, 3], rate: 1 }] as MotionRun[],
  CloseInList: [
    { action: 'close in list', counts: [2, 3], rate: 1 },
  ] as MotionRun[],
  ClearExpanded: [
    { action: 'clear expanded', counts: [1, 2, 3], rate: 1 },
  ] as MotionRun[],
  Collapse: [{ action: 'collapse', counts: [1, 2, 3], rate: 1 }] as MotionRun[],
  CollapseEscape: [
    { action: 'collapse Escape', counts: [1, 2, 3], rate: 1 },
  ] as MotionRun[],
  SlowExpand: [{ action: 'expand', counts: [2], rate: 0.25 }] as MotionRun[],
  SlowExpandThree: [
    { action: 'expand', counts: [3], rate: 0.25 },
  ] as MotionRun[],
  SlowCollapse: [
    { action: 'collapse', counts: [1, 2], rate: 0.25 },
  ] as MotionRun[],
  SlowCollapseThree: [
    { action: 'collapse', counts: [3], rate: 0.25 },
  ] as MotionRun[],
  SlowClearExpanded: [
    { action: 'clear expanded', counts: [2, 3], rate: 0.25 },
  ] as MotionRun[],
  SlowClearStacked: [
    { action: 'clear stacked', counts: [1, 2, 3], rate: 0.25 },
  ] as MotionRun[],
};

const [BOTTOM, TOP, END_RTL] = CONTROLS_PLACEMENTS;

export const MotionRulesAddTest = motionRulesStory(BOTTOM, MOTION_RUNS.Add);
export const MotionRulesAddTopTest = motionRulesStory(TOP, MOTION_RUNS.Add);
export const MotionRulesAddEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.Add
);
export const MotionRulesCloseFrontTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.CloseFront
);
export const MotionRulesCloseFrontTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.CloseFront
);
export const MotionRulesCloseFrontEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.CloseFront
);
export const MotionRulesClearStackedTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.ClearStacked
);
export const MotionRulesClearStackedTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.ClearStacked
);
export const MotionRulesClearStackedEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.ClearStacked
);
export const MotionRulesHoverTest = motionRulesStory(BOTTOM, MOTION_RUNS.Hover);
export const MotionRulesHoverTopTest = motionRulesStory(TOP, MOTION_RUNS.Hover);
export const MotionRulesHoverEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.Hover
);
export const MotionRulesExpandTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.Expand
);
export const MotionRulesExpandTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.Expand
);
export const MotionRulesExpandEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.Expand
);
export const MotionRulesCloseInListTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.CloseInList
);
export const MotionRulesCloseInListTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.CloseInList
);
export const MotionRulesCloseInListEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.CloseInList
);
export const MotionRulesClearExpandedTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.ClearExpanded
);
export const MotionRulesClearExpandedTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.ClearExpanded
);
export const MotionRulesClearExpandedEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.ClearExpanded
);
export const MotionRulesCollapseTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.Collapse
);
export const MotionRulesCollapseTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.Collapse
);
export const MotionRulesCollapseEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.Collapse
);
export const MotionRulesCollapseEscapeTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.CollapseEscape
);
export const MotionRulesCollapseEscapeTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.CollapseEscape
);
export const MotionRulesCollapseEscapeEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.CollapseEscape
);
export const MotionRulesSlowExpandTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowExpand
);
export const MotionRulesSlowExpandTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowExpand
);
export const MotionRulesSlowExpandEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowExpand
);
export const MotionRulesSlowExpandThreeTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowExpandThree
);
export const MotionRulesSlowExpandThreeTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowExpandThree
);
export const MotionRulesSlowExpandThreeEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowExpandThree
);
export const MotionRulesSlowCollapseTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowCollapse
);
export const MotionRulesSlowCollapseTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowCollapse
);
export const MotionRulesSlowCollapseEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowCollapse
);
export const MotionRulesSlowCollapseThreeTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowCollapseThree
);
export const MotionRulesSlowCollapseThreeTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowCollapseThree
);
export const MotionRulesSlowCollapseThreeEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowCollapseThree
);
export const MotionRulesSlowClearExpandedTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowClearExpanded
);
export const MotionRulesSlowClearExpandedTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowClearExpanded
);
export const MotionRulesSlowClearExpandedEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowClearExpanded
);
export const MotionRulesSlowClearStackedTest = motionRulesStory(
  BOTTOM,
  MOTION_RUNS.SlowClearStacked
);
export const MotionRulesSlowClearStackedTopTest = motionRulesStory(
  TOP,
  MOTION_RUNS.SlowClearStacked
);
export const MotionRulesSlowClearStackedEndRtlTest = motionRulesStory(
  END_RTL,
  MOTION_RUNS.SlowClearStacked
);

// Where each moving edge of `id` is, as a fraction of its travel, at 25%, 50%, and 75% of the
// motion's time, counted from when that edge starts to move.
const pathFractions = (
  { frames }: Recording,
  id: string,
  rate: number
): Record<string, number[]> => {
  const duration = MOVE_DURATION_MS / rate;
  const points = frames.flatMap((frame) => {
    const track = frame.tracks.get(id);
    return track ? [{ time: frame.time, box: track.box }] : [];
  });
  const result: Record<string, number[]> = {};
  if (points.length < 2) {
    return result;
  }
  for (const edge of ['left', 'top', 'right', 'bottom'] as const) {
    const first = points[0].box[edge];
    const last = points[points.length - 1].box[edge];
    // With less travel, a frame's timing is a large share of it.
    if (Math.abs(last - first) <= 10) {
      continue;
    }
    const startIndex = points.findIndex(
      ({ box }) => Math.abs(box[edge] - first) > 0.1
    );
    // It started between the last frame it was still and the first it moved on.
    const start =
      (points[Math.max(0, startIndex - 1)].time + points[startIndex].time) / 2;
    result[edge] = [0.25, 0.5, 0.75].map((fraction) => {
      const time = start + fraction * duration;
      const after = points.findIndex((point) => point.time >= time);
      if (after <= 0) {
        return Number.NaN;
      }
      const a = points[after - 1];
      const b = points[after];
      const value =
        a.box[edge] +
        ((b.box[edge] - a.box[edge]) * (time - a.time)) /
          Math.max(1, b.time - a.time);
      return (value - first) / (last - first);
    });
  }
  return result;
};

const MOVE_DURATION_MS = 400;

const M5_MESSAGES = [
  'Hi',
  'Your changes to the shared quarterly planning document were saved, and everyone with access can now see them',
];

/**
 * M5. The same motion for any message length: the controls' zoom, every
 * duration, and the shape of each path match within 2% for a short message
 * and a two-line one.
 */
const sameMotionStory = (action: 'expand' | 'collapse'): Story => ({
  play: async ({ canvasElement, step }) => {
    const container = await getComponent<ToastRegion>(
      canvasElement,
      'swc-toast-region'
    );
    const rate = 0.25;
    try {
      ToastQueue.add('Font warm-up');
      await settle(await getFront(container));
      await container.ownerDocument.fonts.ready;
      const results: {
        zoom: number;
        durations: number[];
        paths: Record<string, Record<string, number[]>>;
      }[] = [];
      for (const message of M5_MESSAGES) {
        await step(`M5 ${action}, "${message.slice(0, 20)}"`, async () => {
          await setUpCase(container, { placement: 'bottom', rate: 1 });
          ToastQueue.add('Other notification');
          const key = ToastQueue.add(message);
          const front = await getFront(container);
          await settle(front, getRegion(container));
          if (action === 'collapse') {
            showAllOf(front)!.click();
            await waitForExpanded(container, true);
            await settle(...renderedToasts(container));
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          const recording = await recordMotion(container, rate, () =>
            action === 'expand'
              ? showAllOf(front)!.click()
              : controlOf(container, 'Collapse').click()
          );
          const controls = recording.frames
            .map((frame) => frame.tracks.get('controls'))
            .filter((track): track is Track => Boolean(track));
          const zoomed =
            action === 'expand' ? controls[0] : controls[controls.length - 1];
          const rest =
            action === 'expand' ? controls[controls.length - 1] : controls[0];
          results.push({
            zoom: zoomed && rest ? zoomed.box.width / rest.box.width : 0,
            durations: [...new Set(recording.durations)].sort((a, b) => a - b),
            paths: {
              background: pathFractions(recording, `background:${key}`, rate),
              controls: pathFractions(recording, 'controls', rate),
            },
          });
        });
      }
      const [short, long] = results;
      expect(
        Math.abs(short.zoom - long.zoom),
        `controls zoom ${short.zoom.toFixed(3)} vs ${long.zoom.toFixed(3)}`
      ).toBeLessThanOrEqual(0.02);
      expect(long.durations, 'durations').toEqual(short.durations);
      for (const element of ['background', 'controls']) {
        for (const [edge, fractions] of Object.entries(short.paths[element])) {
          const other = long.paths[element][edge];
          if (!other) {
            continue;
          }
          for (const [index, fraction] of fractions.entries()) {
            expect(
              Math.abs(fraction - other[index]),
              `${element} ${edge} at ${(index + 1) * 25}%: ${fraction.toFixed(3)} vs ${other[index].toFixed(3)}`
            ).toBeLessThanOrEqual(0.02);
          }
        }
      }
    } finally {
      ToastQueue.clear();
    }
  },
});

export const MotionSameForAnyMessageExpandTest = sameMotionStory('expand');
export const MotionSameForAnyMessageCollapseTest = sameMotionStory('collapse');
