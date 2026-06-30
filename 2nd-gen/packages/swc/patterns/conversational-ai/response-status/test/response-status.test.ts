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

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import type { ResponseStatus } from '../ResponseStatus.js';
import { meta } from '../stories/response-status.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Response status/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

type TestResponseStatus = ResponseStatus;

const agenticMarkup = html`
  <swc-response-status status="active" open accessible-label="Execution steps">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="summary">Processing request</span>

    <swc-response-status-step status="complete">
      <span slot="label">Looked through documentation</span>
      <span slot="description">
        Prioritizing data from documents and press releases.
      </span>
    </swc-response-status-step>

    <swc-response-status-step status="active">
      <span slot="label">Searching repositories for Europe trips</span>
      <span slot="description">
        Checked 3 internal repositories for compiled trip package data.
      </span>
    </swc-response-status-step>

    <swc-response-status-step status="pending">
      <span slot="label">Compose response</span>
      <span slot="description">Synthesizing findings into a response.</span>
    </swc-response-status-step>
  </swc-response-status>
`;

export const StatusApiTest: Story = {
  render: () => html`
    <swc-response-status status="pending"></swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('status reflects to the host attribute', async () => {
      expect(el.status).toBe('pending');

      el.status = 'complete';
      await el.updateComplete;

      expect(el.getAttribute('status')).toBe('complete');
      expect(
        el.shadowRoot
          ?.querySelector('.swc-ResponseStatus-label')
          ?.textContent?.trim()
      ).toBe('Response generated');
    });
  },
};

export const AgenticApiTest: Story = {
  render: () => agenticMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('uses status and open as the public state API', async () => {
      expect(el.status).toBe('active');
      expect(el.open).toBe(true);
      expect(el.hasAttribute('open')).toBe(true);
    });

    await step(
      'renders the slotted header label and step content',
      async () => {
        const headerLabel = el.shadowRoot?.querySelector(
          '.swc-ResponseStatus-label'
        );
        const details = Array.from(
          el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step-detail') ??
            []
        ).map((detail) => detail.textContent?.trim());

        expect(headerLabel?.textContent?.trim()).toBe(
          'Searching repositories for Europe trips'
        );
        expect(details).toContain(
          'Prioritizing data from documents and press releases.'
        );
        expect(details).toContain(
          'Checked 3 internal repositories for compiled trip package data.'
        );
        expect(details).not.toContain('Synthesizing findings into a response.');
      }
    );

    await step('uses accessible-label as the timeline accessible name', async () => {
      expect(el.shadowRoot?.querySelector('[role="group"]')).toHaveAttribute(
        'aria-label',
        'Execution steps'
      );
    });

    await step('dispatches toggle event when disclosure toggles', async () => {
      let captured: CustomEvent<{ open: boolean }> | undefined;
      el.addEventListener('swc-response-status-toggle', (event) => {
        captured = event as CustomEvent<{ open: boolean }>;
      });

      const button = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-ResponseStatus-row--button'
      );
      button?.click();
      await el.updateComplete;

      expect(el.open).toBe(false);
      expect(captured?.detail.open).toBe(false);
    });
  },
};
