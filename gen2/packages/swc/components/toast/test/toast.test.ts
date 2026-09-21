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

import { Toast } from '@adobe/spectrum-wc/toast';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/toast/swc-toast.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/toast.stories.js';

export default {
  ...meta,
  title: 'Toast/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('the custom element is registered', () => {
      expect(customElements.get('swc-toast')).toBe(Toast);
    });

    await step('the element is an instance of Toast', () => {
      expect(toast).toBeInstanceOf(Toast);
    });

    await step('it exposes reflected open and variant properties', async () => {
      expect(toast.open).toBe(false);
      expect(toast.hasAttribute('open')).toBe(false);
      expect(toast.variant).toBe('neutral');
      expect(toast.getAttribute('variant')).toBe('neutral');

      toast.open = true;
      toast.variant = 'positive';
      await toast.updateComplete;

      expect(toast.hasAttribute('open')).toBe(true);
      expect(toast.getAttribute('variant')).toBe('positive');
    });

    await step('it warns when variant is invalid', async () => {
      await withWarningSpy(async (warnCalls) => {
        toast.variant = 'invalid' as Toast['variant'];
        await toast.updateComplete;

        expect(warnCalls).toHaveLength(1);
        expect(warnCalls[0][1]).toContain(
          'expects "variant" to be one of: neutral, info, positive, negative'
        );
      });
    });
  },
};

const dynamicMessage = 'File saved';

export const AccessibilitySemanticsTest: Story = {
  render: () => html`
    <swc-toast>${dynamicMessage}</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('the host exposes alert dialog semantics', () => {
      expect(toast.getAttribute('role')).toBe('alertdialog');
      expect(toast.getAttribute('aria-modal')).toBe('false');
      expect(toast.getAttribute('tabindex')).toBe('0');
      expect(toast.getAttribute('aria-label')).toBe('File saved');
      expect(toast.getAttribute('aria-hidden')).toBe('true');
    });

    await step('the inner wrapper exposes an atomic alert', () => {
      const alert = toast.shadowRoot?.querySelector('[role="alert"]');
      expect(alert).toBeTruthy();
      expect(alert?.getAttribute('aria-atomic')).toBe('true');
    });

    await step('the accessible name follows message changes', async () => {
      toast.textContent = 'Upload complete';
      await Promise.resolve();
      await toast.updateComplete;

      expect(toast.getAttribute('aria-label')).toBe('Upload complete');
    });

    await step('opening removes aria-hidden without moving focus', async () => {
      const activeElement = document.activeElement;
      const events: string[] = [];
      toast.addEventListener('swc-open', () => events.push('swc-open'));
      toast.addEventListener('swc-after-open', () =>
        events.push('swc-after-open')
      );
      toast.open = true;
      await toast.updateComplete;

      expect(toast.hasAttribute('aria-hidden')).toBe(false);
      expect(document.activeElement).toBe(activeElement);
      expect(events).toEqual(['swc-open', 'swc-after-open']);
    });
  },
};

export const LabelledMessageTest: Story = {
  render: () => html`
    <swc-toast>
      <span id="toast-message">File saved</span>
    </swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('an ID-bearing message labels the host by reference', () => {
      expect(toast.getAttribute('aria-labelledby')).toBe('toast-message');
      expect(toast.hasAttribute('aria-label')).toBe(false);
    });
  },
};

export const VariantIconTest: Story = {
  render: () => html`
    <swc-toast open variant="info">Update available</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('the variant icon exposes its default accessible label', () => {
      const icon = toast.shadowRoot?.querySelector('swc-icon-info-circle');
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('accessible-label')).toBe('Information');
    });

    await step('icon-label overrides the default label', async () => {
      toast.iconLabel = 'Informational message';
      await toast.updateComplete;

      const icon = toast.shadowRoot?.querySelector('swc-icon-info-circle');
      expect(icon?.getAttribute('accessible-label')).toBe(
        'Informational message'
      );
    });

    await step('an empty icon-label makes the icon decorative', async () => {
      toast.iconLabel = '';
      await toast.updateComplete;

      const icon = toast.shadowRoot?.querySelector('swc-icon-info-circle');
      expect(icon?.hasAttribute('accessible-label')).toBe(false);
    });
  },
};

export const ActionButtonTest: Story = {
  render: () => html`
    <swc-toast open>
      File archived
      <swc-button slot="action">Undo</swc-button>
    </swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const action = toast.querySelector('swc-button');

    await step('the action receives the fixed Spectrum 2 treatment', () => {
      expect(action?.getAttribute('size')).toBe('m');
      expect(action?.getAttribute('variant')).toBe('secondary');
      expect(action?.getAttribute('fill-style')).toBe('outline');
      expect(action?.getAttribute('static-color')).toBe('white');
    });
  },
};

export const CloseInteractionTest: Story = {
  render: () => html`
    <swc-toast open>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const closeButton = toast.shadowRoot?.querySelector('swc-close-button');

    await step('the close button has an accessible name', () => {
      expect(closeButton).toBeTruthy();
      expect(closeButton?.getAttribute('accessible-label')).toBe('Close');
    });

    await step('swc-close can cancel dismissal', async () => {
      const preventClose = (event: Event): void => event.preventDefault();
      toast.addEventListener('swc-close', preventClose);
      (closeButton as HTMLElement).click();
      await toast.updateComplete;

      expect(toast.open).toBe(true);
      toast.removeEventListener('swc-close', preventClose);
    });

    await step('accepted dismissal emits lifecycle events', async () => {
      const events: string[] = [];
      toast.addEventListener('swc-close', () => events.push('swc-close'));
      toast.addEventListener('swc-after-close', () =>
        events.push('swc-after-close')
      );

      (closeButton as HTMLElement).click();
      await toast.updateComplete;

      expect(toast.open).toBe(false);
      expect(events).toEqual(['swc-close', 'swc-after-close']);
    });
  },
};
