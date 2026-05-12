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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { ConversationThread } from '../ConversationThread.js';
import { meta, Overview } from '../stories/conversation-thread.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Conversation thread/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ConversationThread>(
      canvasElement,
      'swc-conversation-thread'
    );
    const turns = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('swc-conversation-turn')
    );

    await step('first turn is tabbable by default', async () => {
      expect(el.activeIndex).toBe(0);
      expect(turns[0]?.getAttribute('tabindex')).toBe('0');
      expect(turns[1]?.getAttribute('tabindex')).toBe('-1');
      expect(turns[2]?.getAttribute('tabindex')).toBe('-1');
    });

    await step('focusin syncs roving focus to the focused turn', async () => {
      turns[1]?.focus();
      await el.updateComplete;

      expect(el.activeIndex).toBe(1);
      expect(turns[0]?.getAttribute('tabindex')).toBe('-1');
      expect(turns[1]?.getAttribute('tabindex')).toBe('0');
      expect(turns[2]?.getAttribute('tabindex')).toBe('-1');
    });

    await step('ArrowDown moves focus to the next turn', async () => {
      el.focus();
      await el.updateComplete;
      turns[0]?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          composed: true,
        })
      );
      await el.updateComplete;

      expect(el.activeIndex).toBe(1);
      expect(canvasElement.ownerDocument.activeElement).toBe(turns[1]);
      expect(turns[1]?.getAttribute('tabindex')).toBe('0');
    });

    await step('ArrowUp moves focus to the previous turn', async () => {
      turns[1]?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
          composed: true,
        })
      );
      await el.updateComplete;

      expect(el.activeIndex).toBe(0);
      expect(canvasElement.ownerDocument.activeElement).toBe(turns[0]);
    });

    await step('Home and End jump to first and last turns', async () => {
      el.focus();
      await el.updateComplete;

      turns[0]?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'End',
          bubbles: true,
          composed: true,
        })
      );
      await el.updateComplete;
      expect(el.activeIndex).toBe(2);
      expect(canvasElement.ownerDocument.activeElement).toBe(turns[2]);

      turns[2]?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Home',
          bubbles: true,
          composed: true,
        })
      );
      await el.updateComplete;
      expect(el.activeIndex).toBe(0);
      expect(canvasElement.ownerDocument.activeElement).toBe(turns[0]);
    });

    await step(
      'slot changes preserve the current roving target while focus is inside the thread',
      async () => {
        const addedTurn = document.createElement('swc-conversation-turn');
        addedTurn.setAttribute('type', 'user');
        addedTurn.textContent = 'Dynamically added turn';
        el.append(addedTurn);
        await el.updateComplete;

        let currentTurns = Array.from(
          canvasElement.querySelectorAll<HTMLElement>('swc-conversation-turn')
        );
        expect(currentTurns.length).toBe(4);
        expect(el.activeIndex).toBe(0);
        expect(currentTurns[0]?.getAttribute('tabindex')).toBe('0');
        expect(currentTurns[3]?.getAttribute('tabindex')).toBe('-1');

        const removedTurn = currentTurns[1];
        removedTurn?.remove();
        await el.updateComplete;

        currentTurns = Array.from(
          canvasElement.querySelectorAll<HTMLElement>('swc-conversation-turn')
        );
        expect(currentTurns.length).toBe(3);
        expect(el.activeIndex).toBe(0);
        expect(currentTurns[0]?.getAttribute('tabindex')).toBe('0');
      }
    );

    await step(
      're-entry targets newest turn without stealing focus from the prompt',
      async () => {
        const promptField = document.createElement('input');
        promptField.type = 'text';
        canvasElement.append(promptField);

        let currentTurns = Array.from(
          canvasElement.querySelectorAll<HTMLElement>('swc-conversation-turn')
        );
        currentTurns[0]?.focus();
        await el.updateComplete;
        expect(el.activeIndex).toBe(0);

        promptField.focus();
        await el.updateComplete;
        el.focus();
        await el.updateComplete;
        expect(el.activeIndex).toBe(currentTurns.length - 1);
        expect(canvasElement.ownerDocument.activeElement).toBe(
          currentTurns[currentTurns.length - 1]
        );

        promptField.focus();
        expect(canvasElement.ownerDocument.activeElement).toBe(promptField);

        const appendedTurn = document.createElement('swc-conversation-turn');
        appendedTurn.setAttribute('type', 'system');
        appendedTurn.textContent = 'Newest system turn';
        el.append(appendedTurn);
        await el.updateComplete;

        currentTurns = Array.from(
          canvasElement.querySelectorAll<HTMLElement>('swc-conversation-turn')
        );
        expect(canvasElement.ownerDocument.activeElement).toBe(promptField);
        expect(el.activeIndex).toBe(currentTurns.length - 1);
        expect(
          currentTurns[currentTurns.length - 1]?.getAttribute('tabindex')
        ).toBe('0');

        el.focus();
        await el.updateComplete;
        expect(canvasElement.ownerDocument.activeElement).toBe(
          currentTurns[currentTurns.length - 1]
        );
      }
    );
  },
};
