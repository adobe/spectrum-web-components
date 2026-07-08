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
import { expect, waitFor } from '@storybook/test';
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

    <swc-response-status-step status="complete">
      <span slot="label">Compose response</span>
      <span slot="description">Synthesizing findings into a response.</span>
    </swc-response-status-step>
  </swc-response-status>
`;

const activeStepFallbackMarkup = html`
  <swc-response-status status="active" open accessible-label="Execution steps">
    <swc-response-status-step status="complete">
      <span slot="label">Looked through documentation</span>
      <span slot="description">Read the uploaded source material.</span>
    </swc-response-status-step>
    <swc-response-status-step status="active">
      <span slot="label">Gathering information from the web</span>
      <span slot="description">Searching recent public references.</span>
    </swc-response-status-step>
  </swc-response-status>
`;

export const StatusApiTest: Story = {
  render: () => html`
    <swc-response-status></swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('status reflects to the host attribute', async () => {
      expect(el.status).toBe('active');
      expect(el.shadowRoot?.querySelector('[role="status"]')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('[aria-expanded]')).toBeNull();
      expect(el.shadowRoot?.querySelector('[aria-controls]')).toBeNull();

      el.status = 'complete';
      await el.updateComplete;

      expect(el.getAttribute('status')).toBe('complete');

      // Wait for the host update to render the default label.
      await waitFor(
        () => {
          expect(
            el.shadowRoot
              ?.querySelector('.swc-ResponseStatus-label')
              ?.textContent?.trim()
          ).toBe('Response generated');
        },
        { timeout: 2000 }
      );
    });
  },
};

export const DynamicLabelTest: Story = {
  render: () => agenticMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'updates the header label when the slotted label text changes',
      async () => {
        const slottedLabel = el.querySelector('[slot="label"]');
        expect(slottedLabel).toBeTruthy();

        // Mutating text content does not fire slotchange, so this exercises
        // the MutationObserver that keeps slotted label text in sync.
        (slottedLabel as HTMLElement).textContent =
          'Comparing cruise package pricing';

        await waitFor(
          () => {
            const rollingLines = el.shadowRoot?.querySelectorAll(
              '.swc-ResponseStatus-headerTrailLine'
            );
            expect(rollingLines?.length).toBe(2);
            expect(rollingLines?.[0]?.getAttribute('aria-hidden')).toBe('true');
            expect(rollingLines?.[1]?.hasAttribute('aria-hidden')).toBe(false);
            expect(rollingLines?.[1]?.textContent?.trim()).toBe(
              'Comparing cruise package pricing'
            );
          },
          { timeout: 2000 }
        );

        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).toBe('Comparing cruise package pricing');
          },
          { timeout: 2000 }
        );
      }
    );
  },
};

export const StepApiTest: Story = {
  render: () => activeStepFallbackMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'uses the active step label when no header label is provided',
      async () => {
        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).toBe('Gathering information from the web');
          },
          { timeout: 2000 }
        );
      }
    );

    await step('coerces unsupported step statuses to active', async () => {
      const invalidStep = document.createElement('swc-response-status-step');
      invalidStep.setAttribute('status', 'pending');
      invalidStep.innerHTML = `
        <span slot="label">Unsupported pending step</span>
        <span slot="description">This should still render as active.</span>
      `;

      el.append(invalidStep);
      await el.updateComplete;

      await waitFor(
        () => {
          const renderedStatuses = Array.from(
            el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
          ).map((renderedStep) => renderedStep.getAttribute('data-status'));

          expect(renderedStatuses).toContain('active');
          expect(renderedStatuses).not.toContain('pending');
        },
        { timeout: 2000 }
      );
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
        const renderedSteps = Array.from(
          el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
        );
        const labels = renderedSteps.map((renderedStep) =>
          renderedStep
            .querySelector('.swc-ResponseStatus-step-title')
            ?.textContent?.trim()
        );
        const statuses = renderedSteps.map((renderedStep) =>
          renderedStep.getAttribute('data-status')
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
        expect(details).toContain('Synthesizing findings into a response.');
        expect(labels).toEqual([
          'Looked through documentation',
          'Searching repositories for Europe trips',
          'Compose response',
        ]);
        expect(statuses).toEqual(['complete', 'active', 'complete']);
      }
    );

    await step(
      'uses accessible-label as the timeline accessible name',
      async () => {
        expect(el.shadowRoot?.querySelector('[role="group"]')).toHaveAttribute(
          'aria-label',
          'Execution steps'
        );
      }
    );

    await step('updates rendered steps when step status changes', async () => {
      const stepEl = el.querySelector('swc-response-status-step') as
        | (HTMLElement & { updateComplete?: Promise<boolean> })
        | null;
      stepEl?.setAttribute('status', 'stopped');
      await stepEl?.updateComplete;

      await waitFor(
        () => {
          const renderedStatuses = Array.from(
            el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
          ).map((renderedStep) => renderedStep.getAttribute('data-status'));

          expect(renderedStatuses).toEqual(['stopped', 'active', 'complete']);
        },
        { timeout: 2000 }
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
      expect(captured?.bubbles).toBe(true);
      expect(captured?.composed).toBe(true);
    });
  },
};
