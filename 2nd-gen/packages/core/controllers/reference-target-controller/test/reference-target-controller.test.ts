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

import { getComponent } from '../../../../swc/utils/test-utils.js';
import type { DemoLabeledInput } from '../stories/demo-hosts.js';
import storiesMeta, {
  AriaDescribedbyForwarding,
  AriaLabelledbyForwarding,
  DynamicLabelUpdate,
  LabelClickFocus,
  LabelForForwarding,
} from '../stories/reference-target-controller.stories.js';

export default {
  ...storiesMeta,
  title: 'Controllers/Reference target (POC)/Tests',
  parameters: {
    ...storiesMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────────
// Test: <label for> materializes aria-label on shadow input
// ──────────────────────────────────────────────────────────────────────────────

export const LabelForMaterializesAriaLabel: Story = {
  ...LabelForForwarding,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoLabeledInput>(
      canvasElement,
      'demo-labeled-input'
    );
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;

    await step(
      'Shadow input has aria-label matching the label text',
      async () => {
        expect(shadowInput).toBeTruthy();
        const ariaLabel = shadowInput.getAttribute('aria-label');
        expect(ariaLabel).toBe('Full name');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: aria-labelledby referencing host materializes on shadow input
// ──────────────────────────────────────────────────────────────────────────────

export const AriaLabelledbyMaterializes: Story = {
  ...AriaLabelledbyForwarding,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoLabeledInput>(
      canvasElement,
      'demo-labeled-input'
    );
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;

    await step(
      'Shadow input has aria-label from labelledby reference',
      async () => {
        expect(shadowInput).toBeTruthy();
        const ariaLabel = shadowInput.getAttribute('aria-label');
        expect(ariaLabel).toBe('Email address');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: aria-describedby referencing host materializes on shadow input
// ──────────────────────────────────────────────────────────────────────────────

export const AriaDescribedbyMaterializes: Story = {
  ...AriaDescribedbyForwarding,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector(
      'demo-described-input'
    ) as HTMLElement;
    if ('updateComplete' in host) {
      await (host as { updateComplete: Promise<boolean> }).updateComplete;
    }
    const shadowInput = host.shadowRoot!.querySelector(
      '#described-input'
    ) as HTMLInputElement;

    await step(
      'Shadow input has aria-description from describedby reference',
      async () => {
        expect(shadowInput).toBeTruthy();
        const ariaDesc = shadowInput.getAttribute('aria-description');
        expect(ariaDesc).toBe('Must be at least 8 characters');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: clicking label focuses shadow-internal input
// ──────────────────────────────────────────────────────────────────────────────

export const LabelClickFocusesShadowInput: Story = {
  ...LabelClickFocus,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoLabeledInput>(
      canvasElement,
      'demo-labeled-input'
    );
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;
    const label = canvasElement.querySelector(
      'label[for="focus-input"]'
    ) as HTMLLabelElement;

    await step(
      'Clicking the label focuses the shadow-internal input',
      async () => {
        expect(label).toBeTruthy();
        expect(shadowInput).toBeTruthy();

        label.click();

        await new Promise((r) => requestAnimationFrame(r));

        const activeEl = host.shadowRoot!.activeElement;
        expect(activeEl).toBe(shadowInput);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: disconnect clears materialized attributes
// ──────────────────────────────────────────────────────────────────────────────

export const DisconnectClearsMaterialized: Story = {
  ...LabelForForwarding,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoLabeledInput>(
      canvasElement,
      'demo-labeled-input'
    );
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;

    await step(
      'After disconnect, materialized aria-label is removed',
      async () => {
        expect(shadowInput.getAttribute('aria-label')).toBe('Full name');

        host.remove();
        await new Promise((r) => requestAnimationFrame(r));

        expect(shadowInput.getAttribute('aria-label')).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: dynamic label text re-syncs
// ──────────────────────────────────────────────────────────────────────────────

export const DynamicLabelResyncs: Story = {
  ...DynamicLabelUpdate,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoLabeledInput>(
      canvasElement,
      'demo-labeled-input'
    );
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;
    const toggleButton = canvasElement.querySelector(
      'button'
    ) as HTMLButtonElement;

    await step(
      'Label text change is reflected on the shadow input',
      async () => {
        expect(shadowInput.getAttribute('aria-label')).toBe('Original label');

        toggleButton.click();
        await new Promise((r) => setTimeout(r, 100));

        expect(shadowInput.getAttribute('aria-label')).toBe('Updated label');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────────────────────
// Test: host without id does not crash
// ──────────────────────────────────────────────────────────────────────────────

export const HostWithoutId: Story = {
  render: () => html`
    <div>
      <label>No-id host</label>
      <demo-labeled-input></demo-labeled-input>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector(
      'demo-labeled-input'
    ) as DemoLabeledInput;
    if ('updateComplete' in host) {
      await (host as { updateComplete: Promise<boolean> }).updateComplete;
    }
    const shadowInput = host.shadowRoot!.querySelector(
      '#internal-input'
    ) as HTMLInputElement;

    await step('Host without id does not set spurious attributes', async () => {
      expect(shadowInput).toBeTruthy();
      expect(shadowInput.getAttribute('aria-label')).toBeNull();
    });
  },
};
