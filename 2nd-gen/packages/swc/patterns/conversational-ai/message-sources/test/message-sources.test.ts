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
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { MessageSources } from '../MessageSources.js';
import { meta, Overview } from '../stories/message-sources.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Message sources/Tests',
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
    const el = await getComponent<MessageSources>(
      canvasElement,
      'swc-message-sources'
    );

    await step('renders with open state in overview', async () => {
      expect(el.open).toBe(true);
      expect(el.label).toBe('Sources');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: State mutation
// ──────────────────────────────────────────────────────────────

export const OpenMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageSources>(
      canvasElement,
      'swc-message-sources'
    );

    await step('open reflects to attribute after mutation', async () => {
      el.open = false;
      await el.updateComplete;
      expect(el.hasAttribute('open')).toBe(false);

      el.open = true;
      await el.updateComplete;
      expect(el.hasAttribute('open')).toBe(true);
    });

    await step('label updates visible and ARIA labels', async () => {
      el.label = 'References';
      await el.updateComplete;

      const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-MessageSources-toggle'
      );
      const panel = el.shadowRoot?.querySelector<HTMLOListElement>(
        '.swc-MessageSources-list'
      );
      const icon = el.shadowRoot?.querySelector('swc-icon');

      expect(toggle?.textContent?.trim()).toBe('References');
      expect(panel?.getAttribute('aria-labelledby')).toBe(toggle?.id);
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    await step(
      'collapsed state keeps the controlled panel in the DOM but hidden',
      async () => {
        el.open = false;
        await el.updateComplete;

        const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-MessageSources-toggle'
        );
        const panel = el.shadowRoot?.querySelector<HTMLOListElement>(
          '.swc-MessageSources-list'
        );

        expect(toggle?.getAttribute('aria-controls')).toBe(panel?.id);
        expect(toggle?.getAttribute('aria-expanded')).toBe('false');
        expect(panel).toBeTruthy();
        expect(panel?.hidden).toBe(true);
      }
    );

    await step(
      'clicking the toggle emits swc-message-sources-toggle',
      async () => {
        let detail: { open: boolean } | undefined;
        el.addEventListener(
          'swc-message-sources-toggle',
          (event) => {
            detail = (event as CustomEvent<{ open: boolean }>).detail;
          },
          { once: true }
        );

        const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-MessageSources-toggle'
        );
        toggle?.click();
        await el.updateComplete;

        const panel = el.shadowRoot?.querySelector<HTMLOListElement>(
          '.swc-MessageSources-list'
        );
        expect(detail?.open).toBe(true);
        expect(el.open).toBe(true);
        expect(panel?.hidden).toBe(false);
      }
    );

    await step('keyboard Enter and Space toggle the list', async () => {
      const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-MessageSources-toggle'
      );

      expect(toggle).toBeTruthy();
      if (!toggle) {
        return;
      }

      el.open = false;
      await el.updateComplete;
      toggle.focus();

      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      expect(el.open).toBe(true);

      await userEvent.keyboard(' ');
      await el.updateComplete;
      expect(el.open).toBe(false);
    });
  },
};

export const EmptySlotTest: Story = {
  render: () => html`
    <swc-message-sources></swc-message-sources>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<MessageSources>(
      canvasElement,
      'swc-message-sources'
    );

    await step('handles an empty default slot without errors', async () => {
      const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-MessageSources-toggle'
      );
      const panel = el.shadowRoot?.querySelector<HTMLOListElement>(
        '.swc-MessageSources-list'
      );

      expect(panel).toBeTruthy();
      expect(panel?.querySelectorAll('li').length).toBe(0);
      expect(toggle?.getAttribute('aria-controls')).toBe(panel?.id);
      expect(panel?.getAttribute('aria-labelledby')).toBe(toggle?.id);
      expect(panel?.hidden).toBe(true);
    });

    await step('toggle still opens the panel with an empty slot', async () => {
      const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-MessageSources-toggle'
      );
      const panel = el.shadowRoot?.querySelector<HTMLOListElement>(
        '.swc-MessageSources-list'
      );

      toggle?.click();
      await el.updateComplete;
      expect(el.open).toBe(true);
      expect(panel?.hidden).toBe(false);
    });
  },
};
