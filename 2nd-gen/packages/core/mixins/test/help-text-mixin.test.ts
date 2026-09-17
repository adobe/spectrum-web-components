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

import type { DemoHelpTextHost } from '../stories/demo-hosts.js';
import helpTextMeta, {
  CombinedDescription,
  ErrorTextGating,
} from '../stories/help-text-mixin.stories.js';

// Enables DEBUG mode and captures window.__swc.warn calls for the duration of `fn`.
async function withWarningSpy(
  fn: (warnCalls: unknown[][]) => void | Promise<void>
): Promise<void> {
  const originalDebug = window.__swc?.DEBUG;
  const originalWarn = window.__swc?.warn;
  const warnCalls: unknown[][] = [];
  window.__swc = {
    ...window.__swc,
    DEBUG: true,
    warn: (...args: unknown[]) => {
      warnCalls.push(args);
    },
  } as Window['__swc'];
  try {
    await fn(warnCalls);
  } finally {
    window.__swc = {
      ...window.__swc,
      DEBUG: originalDebug,
      warn: originalWarn,
    } as Window['__swc'];
  }
}

export default {
  ...helpTextMeta,
  title: 'Mixins/Help text mixin/Tests',
  parameters: {
    ...helpTextMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Combined description sources
// ──────────────────────────────────────────────────────────────

export const CombinedDescriptionTest: Story = {
  ...CombinedDescription,
  play: async ({ canvasElement, step }) => {
    const hosts = Array.from(
      canvasElement.querySelectorAll<DemoHelpTextHost>('demo-help-text-host')
    );
    const [slottedOnly, combined] = hosts;

    await step('slotted description alone resolves to one element', () => {
      expect(slottedOnly.roleElement?.ariaDescribedByElements).toHaveLength(1);
    });

    await step(
      'shadow description is listed before the resolved external element',
      () => {
        const resolved = combined.roleElement?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(2);
        // The shadow description is an in-shadow element reference, so it is
        // identified by class rather than `closest()` (which cannot cross the
        // shadow boundary).
        expect(resolved[0]?.className).toContain('swc-FormFieldDescription');
        expect(resolved[1]?.id).toBe('help-text-mixin-external-description');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Error text gated by invalid
// ──────────────────────────────────────────────────────────────

export const ErrorTextGatingTest: Story = {
  ...ErrorTextGating,
  play: async ({ canvasElement, step }) => {
    const hosts = Array.from(
      canvasElement.querySelectorAll<DemoHelpTextHost>('demo-help-text-host')
    );
    const [valid, invalid] = hosts;

    await step('valid host describedby excludes the error text', () => {
      expect(valid.roleElement?.ariaDescribedByElements).toHaveLength(1);
      expect(valid.shadowRoot?.querySelector('.swc-FormFieldErrorText')).toBeNull();
    });

    await step(
      'invalid host replaces the description with the error text in describedby',
      () => {
        const resolved = invalid.roleElement?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(1);
        expect(resolved[0]?.className).toContain('swc-FormFieldErrorText');
        // The description is hidden while invalid: it leaves both the shadow
        // DOM and the describedby set, so no hidden text is announced.
        expect(
          invalid.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).toBeTruthy();
        expect(
          invalid.shadowRoot?.querySelector('.swc-FormFieldDescription')
        ).toBeNull();
      }
    );

    await step(
      'clearing invalid restores the description in describedby',
      async () => {
        invalid.invalid = false;
        await invalid.updateComplete;
        const resolved = invalid.roleElement?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(1);
        expect(resolved[0]?.className).toContain('swc-FormFieldDescription');
        expect(
          invalid.shadowRoot?.querySelector('.swc-FormFieldErrorText')
        ).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: External accessible-describedby survives the invalid swap
// ──────────────────────────────────────────────────────────────

export const ErrorWithExternalDescribedbyTest: Story = {
  render: () => html`
    <p id="help-text-mixin-invalid-external">External rules</p>
    <demo-help-text-host
      invalid
      accessible-describedby="help-text-mixin-invalid-external"
    >
      <span slot="description">Hidden while invalid</span>
      <span slot="error-text">Enter a valid value</span>
    </demo-help-text-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoHelpTextHost>(
      'demo-help-text-host'
    );

    await step(
      'invalid host references the error and the external element, not the description',
      () => {
        const resolved = host?.roleElement?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(2);
        expect(resolved[0]?.className).toContain('swc-FormFieldErrorText');
        expect(resolved[1]?.id).toBe('help-text-mixin-invalid-external');
        expect(
          host?.shadowRoot?.querySelector('.swc-FormFieldDescription')
        ).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Unresolved accessible-describedby DEBUG warning
// ──────────────────────────────────────────────────────────────

const UNRESOLVED_PHRASE = '"accessible-describedby" references';

function appendExternalDescribedbyTarget(): HTMLElement {
  const el = document.createElement('p');
  el.id = 'help-text-unresolved-external';
  el.textContent = 'External description';
  document.body.append(el);
  return el;
}

export const UnresolvedDescribedbyTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step(
      'warns and names the id when accessible-describedby resolves to nothing',
      () =>
        withWarningSpy(async (warnCalls) => {
          const host = document.createElement('demo-help-text-host');
          host.setAttribute('accessible-describedby', 'does-not-exist');
          document.body.append(host);
          await (host as DemoHelpTextHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) =>
                m.includes(UNRESOLVED_PHRASE) && m.includes('"does-not-exist"')
            )
          ).toBe(true);
          host.remove();
        })
    );

    await step('does not warn when the referenced id resolves', () =>
      withWarningSpy(async (warnCalls) => {
        const external = appendExternalDescribedbyTarget();
        const host = document.createElement('demo-help-text-host');
        host.setAttribute(
          'accessible-describedby',
          'help-text-unresolved-external'
        );
        document.body.append(host);
        await (host as DemoHelpTextHost).updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes(UNRESOLVED_PHRASE))).toBe(false);
        external.remove();
        host.remove();
      })
    );

    await step(
      'names only the unresolved id when some resolve and some do not',
      () =>
        withWarningSpy(async (warnCalls) => {
          const external = appendExternalDescribedbyTarget();
          const host = document.createElement('demo-help-text-host');
          host.setAttribute(
            'accessible-describedby',
            'help-text-unresolved-external missing-one'
          );
          document.body.append(host);
          await (host as DemoHelpTextHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          const unresolvedMsg = messages.find((m) =>
            m.includes(UNRESOLVED_PHRASE)
          );
          expect(unresolvedMsg).toBeTruthy();
          expect(unresolvedMsg).toContain('"missing-one"');
          expect(unresolvedMsg).not.toContain(
            '"help-text-unresolved-external"'
          );
          external.remove();
          host.remove();
        })
    );
  },
};
