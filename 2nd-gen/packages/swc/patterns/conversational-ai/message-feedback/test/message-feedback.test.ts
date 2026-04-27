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

import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { MessageFeedback } from '../MessageFeedback.js';
import { meta, Overview } from '../stories/message-feedback.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Message feedback/Tests',
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
    const el = await getComponent<MessageFeedback>(
      canvasElement,
      'swc-message-feedback'
    );

    await step('renders with no status by default', async () => {
      expect(el.status).toBeUndefined();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Interaction
// ──────────────────────────────────────────────────────────────

export const InteractionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageFeedback>(
      canvasElement,
      'swc-message-feedback'
    );
    const shadow = el.shadowRoot;
    if (!shadow) {
      throw new Error('swc-message-feedback: expected shadow root');
    }
    const canvas = within(shadow as unknown as HTMLElement);

    await step(
      'clicking positive emits swc-message-feedback-change with positive status',
      async () => {
        const events: Array<'positive' | 'negative' | undefined> = [];
        el.addEventListener('swc-message-feedback-change', ((event: Event) => {
          const customEvent = event as CustomEvent<{
            status: 'positive' | 'negative' | undefined;
          }>;
          events.push(customEvent.detail.status);
        }) as EventListener);

        const positiveButton = canvas.getByRole('button', {
          name: 'Positive response',
        });
        await userEvent.click(positiveButton);
        await el.updateComplete;
        expect(events[events.length - 1]).toBe('positive');
        expect(el.status).toBeUndefined();
      }
    );

    await step(
      'consumer-controlled status updates selected option',
      async () => {
        el.status = 'positive';
        await el.updateComplete;
        const positiveButton = canvas.getByRole('button', {
          name: 'Positive response',
        });
        expect(positiveButton).toHaveAttribute('aria-pressed', 'true');
      }
    );

    await step(
      'clicking negative emits swc-message-feedback-change with negative status',
      async () => {
        const events: Array<'positive' | 'negative' | undefined> = [];
        el.addEventListener('swc-message-feedback-change', ((event: Event) => {
          const customEvent = event as CustomEvent<{
            status: 'positive' | 'negative' | undefined;
          }>;
          events.push(customEvent.detail.status);
        }) as EventListener);

        const negativeButton = canvas.getByRole('button', {
          name: 'Negative response',
        });
        await userEvent.click(negativeButton);
        await el.updateComplete;
        expect(events[events.length - 1]).toBe('negative');
      }
    );

    await step(
      'clicking selected positive emits swc-message-feedback-change with undefined status',
      async () => {
        const events: Array<'positive' | 'negative' | undefined> = [];
        el.addEventListener('swc-message-feedback-change', ((event: Event) => {
          const customEvent = event as CustomEvent<{
            status: 'positive' | 'negative' | undefined;
          }>;
          events.push(customEvent.detail.status);
        }) as EventListener);

        el.status = 'positive';
        await el.updateComplete;
        const positiveButton = canvas.getByRole('button', {
          name: 'Positive response',
        });
        await userEvent.click(positiveButton);
        await el.updateComplete;

        expect(events[events.length - 1]).toBeUndefined();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard (FocusgroupNavigationController)
// ──────────────────────────────────────────────────────────────

export const KeyboardNavigationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageFeedback>(
      canvasElement,
      'swc-message-feedback'
    );
    const shadow = el.shadowRoot;
    if (!shadow) {
      throw new Error('swc-message-feedback: expected shadow root');
    }
    const buttons = Array.from(
      shadow.querySelectorAll<HTMLButtonElement>('.swc-MessageFeedback-button')
    );

    await step(
      'ArrowRight from first option moves focus without emitting swc-message-feedback-change',
      async () => {
        const events: Array<'positive' | 'negative' | undefined> = [];
        el.addEventListener('swc-message-feedback-change', ((event: Event) => {
          const customEvent = event as CustomEvent<{
            status: 'positive' | 'negative' | undefined;
          }>;
          events.push(customEvent.detail.status);
        }) as EventListener);

        buttons[0]?.focus();
        await el.updateComplete;

        await userEvent.keyboard('{ArrowRight}');
        await el.updateComplete;

        expect(events.length).toBe(0);
        expect(shadow.activeElement).toBe(buttons[1]);
        expect(el.status).toBeUndefined();
      }
    );

    await step(
      'ArrowLeft wraps focus to positive without emitting swc-message-feedback-change',
      async () => {
        const events: Array<'positive' | 'negative' | undefined> = [];
        el.addEventListener('swc-message-feedback-change', ((event: Event) => {
          const customEvent = event as CustomEvent<{
            status: 'positive' | 'negative' | undefined;
          }>;
          events.push(customEvent.detail.status);
        }) as EventListener);

        el.status = 'negative';
        await el.updateComplete;
        buttons[1]?.focus();
        await el.updateComplete;
        await userEvent.keyboard('{ArrowLeft}');
        await el.updateComplete;

        expect(events.length).toBe(0);
        expect(shadow.activeElement).toBe(buttons[0]);
        expect(el.status).toBe('negative');
      }
    );
  },
};
