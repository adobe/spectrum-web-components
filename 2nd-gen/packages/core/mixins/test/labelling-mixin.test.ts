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

import type { DemoLabellingHost } from '../stories/demo-hosts.js';
import labellingMeta, {
  NameSourcePrecedence,
} from '../stories/labelling-mixin.stories.js';

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
  ...labellingMeta,
  title: 'Mixins/Labelling mixin/Tests',
  parameters: {
    ...labellingMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Name source precedence
// ──────────────────────────────────────────────────────────────

export const NameSourcePrecedenceTest: Story = {
  ...NameSourcePrecedence,
  play: async ({ canvasElement, step }) => {
    const hosts = canvasElement.querySelectorAll<DemoLabellingHost>(
      'demo-labelling-host'
    );
    const [slotOnly, labelOnly, labelledbyWins] = Array.from(hosts);

    await step('slotted label renders as a real <label for>', () => {
      const label = slotOnly.shadowRoot?.querySelector('label');
      expect(label).toBeTruthy();
      expect(label?.getAttribute('for')).toBe(slotOnly.roleElement?.id);
      expect(slotOnly.roleElement?.hasAttribute('aria-label')).toBe(false);
      expect(slotOnly.roleElement?.ariaLabelledByElements).toBeNull();
    });

    await step('accessible-label sets aria-label, not a <label for>', () => {
      expect(labelOnly.shadowRoot?.querySelector('label')).toBeNull();
      expect(labelOnly.roleElement?.getAttribute('aria-label')).toBe(
        'accessible-label only'
      );
    });

    await step(
      'accessible-labelledby wins over a slotted label: no aria-label, no <label for>, ariaLabelledByElements resolved',
      () => {
        expect(labelledbyWins.roleElement?.hasAttribute('aria-label')).toBe(
          false
        );
        expect(labelledbyWins.shadowRoot?.querySelector('label')).toBeNull();
        // The slotted label still renders visually as a plain span.
        expect(labelledbyWins.shadowRoot?.querySelector('span')).toBeTruthy();
        const resolved = labelledbyWins.roleElement?.ariaLabelledByElements;
        expect(resolved).toHaveLength(2);
        expect(resolved?.map((el) => el.id)).toEqual([
          'labelling-mixin-row-header',
          'labelling-mixin-col-header',
        ]);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Missing accessible-name DEBUG warning
// ──────────────────────────────────────────────────────────────

export const MissingAccessibleNameTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when no source resolves to a name', () =>
      withWarningSpy(async (warnCalls) => {
        const host = document.createElement('demo-labelling-host');
        document.body.append(host);
        await (host as DemoLabellingHost).updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(true);
        host.remove();
      })
    );

    await step('does not warn when accessible-label is set', () =>
      withWarningSpy(async (warnCalls) => {
        const host = document.createElement('demo-labelling-host');
        host.setAttribute('accessible-label', 'Named');
        document.body.append(host);
        await (host as DemoLabellingHost).updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(false);
        host.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Conflicting label sources DEBUG warning (WCAG 2.5.3)
// ──────────────────────────────────────────────────────────────

/** Appends a slotted `label` with the given text to `host`. */
function appendSlottedLabel(
  host: DemoLabellingHost,
  text = 'Visible label'
): void {
  const slotted = document.createElement('span');
  slotted.slot = 'label';
  slotted.textContent = text;
  host.append(slotted);
}

/**
 * Appends an external element with `id="label-conflict-external"` to
 * `document.body` and returns it. Callers should `remove()` it afterward.
 */
function appendExternalLabelledbyTarget(): HTMLElement {
  const external = document.createElement('div');
  external.id = 'label-conflict-external';
  external.textContent = 'External label';
  document.body.append(external);
  return external;
}

const CONFLICT_PHRASE = 'more than one accessible-name source';
const IGNORED_PHRASE = 'will not be read';

export const LabelConflictTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step(
      'warns when accessible-label is set alongside a slotted label, naming the slotted label as ignored',
      () =>
        withWarningSpy(async (warnCalls) => {
          const host = document.createElement('demo-labelling-host');
          host.setAttribute('accessible-label', 'Different text');
          appendSlottedLabel(host);
          document.body.append(host);
          await (host as DemoLabellingHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) =>
                m.includes(CONFLICT_PHRASE) &&
                m.includes(IGNORED_PHRASE) &&
                m.includes('the slotted "label"')
            )
          ).toBe(true);
          host.remove();
        })
    );

    await step(
      'warns when accessible-label is set alongside a resolved accessible-labelledby, naming accessible-label as ignored',
      () =>
        withWarningSpy(async (warnCalls) => {
          const external = appendExternalLabelledbyTarget();
          const host = document.createElement('demo-labelling-host');
          host.setAttribute('accessible-label', 'Different text');
          host.setAttribute('accessible-labelledby', 'label-conflict-external');
          document.body.append(host);
          await (host as DemoLabellingHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) =>
                m.includes(CONFLICT_PHRASE) &&
                m.includes(IGNORED_PHRASE) &&
                m.includes('"accessible-label"')
            )
          ).toBe(true);
          external.remove();
          host.remove();
        })
    );

    await step(
      'warns when accessible-labelledby is set alongside a slotted label, naming the slotted label as ignored',
      () =>
        withWarningSpy(async (warnCalls) => {
          const external = appendExternalLabelledbyTarget();
          const host = document.createElement('demo-labelling-host');
          host.setAttribute('accessible-labelledby', 'label-conflict-external');
          appendSlottedLabel(host);
          document.body.append(host);
          await (host as DemoLabellingHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) =>
                m.includes(CONFLICT_PHRASE) &&
                m.includes(IGNORED_PHRASE) &&
                m.includes('the slotted "label"')
            )
          ).toBe(true);
          external.remove();
          host.remove();
        })
    );

    await step(
      'warns when all three sources are set, naming both accessible-label and the slotted label as ignored',
      () =>
        withWarningSpy(async (warnCalls) => {
          const external = appendExternalLabelledbyTarget();
          const host = document.createElement('demo-labelling-host');
          host.setAttribute('accessible-label', 'Different text');
          host.setAttribute('accessible-labelledby', 'label-conflict-external');
          appendSlottedLabel(host);
          document.body.append(host);
          await (host as DemoLabellingHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(
            messages.some(
              (m) =>
                m.includes(CONFLICT_PHRASE) &&
                m.includes(IGNORED_PHRASE) &&
                m.includes('"accessible-label"') &&
                m.includes('the slotted "label"')
            )
          ).toBe(true);
          external.remove();
          host.remove();
        })
    );

    await step('does not warn when accessible-label is the only source', () =>
      withWarningSpy(async (warnCalls) => {
        const host = document.createElement('demo-labelling-host');
        host.setAttribute('accessible-label', 'Named');
        document.body.append(host);
        await (host as DemoLabellingHost).updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
        host.remove();
      })
    );

    await step('does not warn when a slotted label is the only source', () =>
      withWarningSpy(async (warnCalls) => {
        const host = document.createElement('demo-labelling-host');
        appendSlottedLabel(host);
        document.body.append(host);
        await (host as DemoLabellingHost).updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
        host.remove();
      })
    );

    await step(
      'does not warn when accessible-labelledby is the only source',
      () =>
        withWarningSpy(async (warnCalls) => {
          const external = appendExternalLabelledbyTarget();
          const host = document.createElement('demo-labelling-host');
          host.setAttribute('accessible-labelledby', 'label-conflict-external');
          document.body.append(host);
          await (host as DemoLabellingHost).updateComplete;
          const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
          expect(messages.some((m) => m.includes(CONFLICT_PHRASE))).toBe(false);
          external.remove();
          host.remove();
        })
    );
  },
};
