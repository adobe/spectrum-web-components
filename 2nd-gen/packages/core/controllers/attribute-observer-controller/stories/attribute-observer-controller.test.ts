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

/**
 * Storybook play tests for `AttributeObserverController`.
 *
 * These verify observable behavior on a real element:
 *
 * - Changing a watched attribute re-renders the host (the core feature: state
 *   in a plain attribute stays in sync with `updated()` logic).
 * - Changing an unwatched attribute does not re-render (the `attributeFilter`
 *   is respected).
 * - With `debugOnly: true`, the observer is not attached when `isDebug()` is
 *   `false`, so attribute changes do not re-render, costing nothing in production.
 */

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import observerMeta from './attribute-observer-controller.stories.js';
import type {
  DemoAttributeObserverDebugHost,
  DemoAttributeObserverHost,
  DemoAttributeObserverStaleHost,
} from './demo-hosts.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

/** Resolves after a task so the MutationObserver callback + a batched update settle. */
function flush(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...observerMeta,
  title: 'Controllers/Attribute observer controller/Tests',
  parameters: {
    ...observerMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     Watched attribute changes re-render; unwatched ones do not
// ──────────────────────────────────────────────────────────────────────────

export const WatchedAttributeTest: Story = {
  render: () => html`
    <demo-attribute-observer-host
      aria-label="Upload files"
    ></demo-attribute-observer-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoAttributeObserverHost>(
      'demo-attribute-observer-host'
    );
    if (!host) {
      throw new Error('demo-attribute-observer-host not found');
    }
    await host.updateComplete;
    const status = (): string =>
      host.shadowRoot?.querySelector('.status')?.textContent?.trim() ?? '';

    await step('reflects the initial attribute on first render', () => {
      expect(status()).toBe('aria-label="Upload files"');
    });

    await step('changing a watched attribute re-renders the host', async () => {
      const before = host.renderCount;
      host.setAttribute('aria-label', 'Drop files here');
      await flush();
      await host.updateComplete;

      expect(host.renderCount, 'host re-rendered').toBeGreaterThan(before);
      expect(status()).toBe('aria-label="Drop files here"');
    });

    await step(
      'changing an unwatched attribute does not re-render',
      async () => {
        const before = host.renderCount;
        host.setAttribute('title', 'a tooltip');
        await flush();

        expect(
          host.renderCount,
          'no re-render for an attribute outside the filter'
        ).toBe(before);
      }
    );
  },
};
WatchedAttributeTest.storyName = 'Watched vs unwatched attributes';

// ──────────────────────────────────────────────────────────────────────────
//     Negative control: no controller means the render goes stale
// ──────────────────────────────────────────────────────────────────────────

export const StaleWithoutObserverTest: Story = {
  render: () => html`
    <demo-attribute-observer-stale-host
      aria-label="Upload files"
    ></demo-attribute-observer-stale-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoAttributeObserverStaleHost>(
      'demo-attribute-observer-stale-host'
    );
    if (!host) {
      throw new Error('demo-attribute-observer-stale-host not found');
    }
    await host.updateComplete;
    const status = (): string =>
      host.shadowRoot?.querySelector('.status')?.textContent?.trim() ?? '';

    await step(
      'without the controller, an attribute change does not re-render',
      async () => {
        expect(status()).toBe('aria-label="Upload files"');
        const before = host.renderCount;
        host.setAttribute('aria-label', 'Drop files here');
        await flush();

        expect(host.renderCount, 'no re-render without the controller').toBe(
          before
        );
        expect(status(), 'displayed name stays stale').toBe(
          'aria-label="Upload files"'
        );
      }
    );
  },
};
StaleWithoutObserverTest.storyName = 'Stale without the observer';

// ──────────────────────────────────────────────────────────────────────────
//     debugOnly keeps the observer detached in production
// ──────────────────────────────────────────────────────────────────────────

export const DebugOnlyGatingTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement, step }) => {
    const swc = window.__swc;
    const originalDebug = swc?.DEBUG;

    try {
      await step(
        'debugOnly observer stays detached and does not re-render when DEBUG is false',
        async () => {
          if (swc) {
            swc.DEBUG = false;
          }
          const host = document.createElement(
            'demo-attribute-observer-debug-host'
          ) as DemoAttributeObserverDebugHost;
          canvasElement.appendChild(host);
          await host.updateComplete;

          const before = host.renderCount;
          host.setAttribute('aria-label', 'Changed while not in debug');
          await flush();

          expect(
            host.renderCount,
            'no re-render because the observer is not attached outside debug'
          ).toBe(before);

          host.remove();
        }
      );
    } finally {
      if (swc) {
        swc.DEBUG = originalDebug ?? true;
      }
    }
  },
};
DebugOnlyGatingTest.storyName = 'debugOnly gating';
