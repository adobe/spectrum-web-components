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

import { ToastQueue } from '@adobe/spectrum-wc-core/components/toast-container/index.js';
import { getActiveElement } from '@adobe/spectrum-wc-core/utils/index.js';

import '../swc-toast-container.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import type { Toast } from '../../toast/Toast.js';
import { ToastQueue as RenderingToastQueue } from '../index.js';
import type { ToastContainer } from '../ToastContainer.js';

export default {
  title: 'Toast container/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <button id="trigger">Add notification</button>
    <swc-toast-container></swc-toast-container>
    <button id="outside">Outside region</button>
  `,
} as Meta;

const getFront = async (container: ToastContainer): Promise<Toast> => {
  await container.updateComplete;
  const toast = container.shadowRoot?.querySelector<Toast>('swc-toast');
  expect(toast, 'front toast').not.toBeNull();
  await waitFor(() => expect(toast?.open, 'front toast open').toBe(true));
  return toast!;
};

export const QueueOperations: Story = {
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
        ToastQueue.clear();
        expect(ToastQueue.entries, 'queue entries after clear').toHaveLength(0);
        expect(onClose, 'onClose calls after clear').toHaveBeenCalledTimes(1);
      });

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

export const RenderingAndClosure: Story = {
  play: async ({ canvasElement, step }) => {
    await step('core and SWC expose the same queue instance', () => {
      expect(RenderingToastQueue, 'SWC queue export').toBe(ToastQueue);
    });
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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
          expect(onClose, 'onClose after clear').toHaveBeenCalledTimes(1);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ConnectsClosedThenOpens: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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

export const TimeoutConfiguration: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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

export const Actions: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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

export const FocusAndWarnings: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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
            const second = document.createElement('swc-toast-container');
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

export const InterruptedClosure: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
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
          expect(
            ToastQueue.entries.map((entry) => entry.key),
            'queue keys after demotion'
          ).toEqual([newerKey]);
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
          expect(
            ToastQueue.entries.some((entry) => entry.key === key),
            'dismissed entry still queued'
          ).toBe(false);
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
