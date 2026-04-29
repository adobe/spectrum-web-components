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
import { ResponseStatus } from '../ResponseStatus.js';
import { meta, Overview } from '../stories/response-status.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Response status/Tests',
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
    const el = await getComponent<ResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('renders with overview args', async () => {
      expect(el.loading).toBe(true);
      expect(el.open).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: State mutation
// ──────────────────────────────────────────────────────────────

export const BooleanMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('loading reflects to attribute after mutation', async () => {
      el.loading = false;
      await el.updateComplete;
      expect(el.hasAttribute('loading')).toBe(false);

      el.loading = true;
      await el.updateComplete;
      expect(el.hasAttribute('loading')).toBe(true);
    });

    await step('open reflects to attribute after mutation', async () => {
      el.open = true;
      await el.updateComplete;
      expect(el.hasAttribute('open')).toBe(true);

      el.open = false;
      await el.updateComplete;
      expect(el.hasAttribute('open')).toBe(false);
    });

    await step(
      'loadingLabel and completeLabel support custom status text',
      async () => {
        el.loading = true;
        el.loadingLabel = 'Generating';
        await el.updateComplete;
        let statusLabel = el.shadowRoot?.querySelector(
          '.swc-ResponseStatus-label'
        );
        expect(statusLabel?.textContent?.trim()).toBe('Generating');

        el.loading = false;
        el.completeLabel = 'Ready';
        await el.updateComplete;
        statusLabel = el.shadowRoot?.querySelector('.swc-ResponseStatus-label');
        expect(statusLabel?.textContent?.trim()).toBe('Ready');
      }
    );

    await step('label swaps when loading transitions to complete', async () => {
      el.loadingLabel = 'Thinking...';
      el.completeLabel = 'Done';
      el.loading = true;
      await el.updateComplete;

      let statusLabel = el.shadowRoot?.querySelector(
        '.swc-ResponseStatus-label'
      );
      expect(statusLabel?.textContent?.trim()).toBe('Thinking...');

      el.loading = false;
      await el.updateComplete;

      statusLabel = el.shadowRoot?.querySelector('.swc-ResponseStatus-label');
      expect(statusLabel?.textContent?.trim()).toBe('Done');
    });
  },
};

export const InteractionTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    loading: false,
    open: false,
    'default-slot': 'Reasoning details here.',
  },
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'toggle dispatches swc-response-status-toggle with open detail',
      async () => {
        let captured: CustomEvent<{ open: boolean }> | undefined;
        el.addEventListener('swc-response-status-toggle', (event) => {
          captured = event as CustomEvent<{ open: boolean }>;
        });

        const button = el.shadowRoot?.querySelector(
          '.swc-ResponseStatus-row--button'
        ) as HTMLButtonElement | null;
        button?.click();
        await el.updateComplete;

        expect(el.open).toBe(true);
        expect(captured?.detail.open).toBe(true);
      }
    );

    await step(
      'collapsed complete state keeps the reasoning panel in the DOM but hidden',
      async () => {
        el.open = false;
        await el.updateComplete;

        const button = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-ResponseStatus-row--button'
        );
        const panel = el.shadowRoot?.querySelector<HTMLElement>(
          '[id^="swc-reasoning-panel-"]'
        );

        expect(panel?.id).toMatch(/^swc-reasoning-panel-[a-f0-9]+$/);
        expect(button?.getAttribute('aria-controls')).toBe(panel?.id);
        expect(button?.getAttribute('aria-expanded')).toBe('false');
        expect(panel).toBeTruthy();
        expect(panel?.hidden).toBe(true);
      }
    );

    await step(
      'complete state without reasoning content hides disclosure controls',
      async () => {
        el.textContent = '';
        el.requestUpdate();
        await el.updateComplete;

        const button = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-ResponseStatus-row--button'
        );
        const panel = el.shadowRoot?.querySelector<HTMLElement>(
          '[id^="swc-reasoning-panel-"]'
        );
        const row = el.shadowRoot?.querySelector('.swc-ResponseStatus-row');

        expect(button).toBeNull();
        expect(panel).toBeTruthy();
        expect(panel?.hidden).toBe(true);
        expect(panel?.hasAttribute('role')).toBe(false);
        expect(row).toBeTruthy();
        expect(
          row?.querySelector('.swc-ResponseStatus-label')?.textContent?.trim()
        ).toBe(el.completeLabel);
      }
    );

    await step('default slot content renders in reasoning panel', async () => {
      el.textContent = 'Reasoning details here.';
      el.requestUpdate();
      el.open = true;
      await el.updateComplete;
      const panel = el.shadowRoot?.querySelector(
        '[id^="swc-reasoning-panel-"]'
      ) as HTMLElement | null;
      const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
        '[id^="swc-reasoning-panel-"] slot'
      );
      const assigned = slot?.assignedNodes({ flatten: true });

      expect(panel).toBeTruthy();
      expect(
        assigned?.some((node) => node.textContent?.includes('Reasoning'))
      ).toBe(true);
    });

    await step('complete-state check icon is decorative only', async () => {
      const checkIcon = el.shadowRoot?.querySelectorAll('swc-icon')[1];
      expect(checkIcon?.getAttribute('aria-hidden')).toBe('true');
    });

    await step(
      'clearing reasoning content auto-collapses open state without firing swc-response-status-toggle',
      async () => {
        let toggleCount = 0;
        el.addEventListener('swc-response-status-toggle', () => {
          toggleCount += 1;
        });

        el.textContent = 'Reasoning details here.';
        el.open = true;
        await el.updateComplete;
        expect(el.open).toBe(true);

        el.textContent = '';
        el.requestUpdate();
        await el.updateComplete;

        expect(el.open).toBe(false);
        expect(toggleCount).toBe(0);
      }
    );
  },
};
