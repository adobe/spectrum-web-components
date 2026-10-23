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

import { CloseButton } from '@adobe/spectrum-wc/components/close-button';
import { UiIcon } from '@adobe/spectrum-wc/components/ui-icons';
import { supportsScopedRegistries } from '@adobe/spectrum-wc-core/element/index.js';

export default {
  title: 'Close button/Scoped registry tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// Playwright 1.53's bundled Chromium (138) predates native scoped registries
// (Chrome 146). Scoped stories return early there; run them natively with
// `VITEST_BROWSER_CHANNEL=chrome`.
const scoped = supportsScopedRegistries();

// This file imports class modules only. Nothing here may define globally.
export const ClassImportTest: Story = {
  play: async ({ step }) => {
    await step('importing the class does not define elements', () => {
      expect(customElements.get('swc-close-button')).toBeUndefined();
      expect(customElements.get('swc-ui-icon')).toBeUndefined();
    });

    await step('the class declares its tag and internal elements', () => {
      expect(CloseButton.tagName).toBe('swc-close-button');
      expect(CloseButton.dependencies).toContain(UiIcon);
    });
  },
};

export const ScopedRegistryTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    const registry = new CustomElementRegistry();

    await step('define(registry) adds Close Button and its UI icon', () => {
      CloseButton.define(registry);
      expect(registry.get('swc-close-button')).toBe(CloseButton);
      expect(registry.get('swc-ui-icon')).toBe(UiIcon);
      expect(customElements.get('swc-close-button')).toBeUndefined();
      expect(customElements.get('swc-ui-icon')).toBeUndefined();
    });

    await step(
      'the internal UI icon comes from the host registry',
      async () => {
        const host = document.createElement('div');
        document.body.append(host);
        const root = host.attachShadow({
          mode: 'open',
          customElementRegistry: registry,
        });
        root.innerHTML =
          '<swc-close-button accessible-label="Close"></swc-close-button>';
        const closeButton = root.querySelector(
          'swc-close-button'
        ) as CloseButton;
        await closeButton.updateComplete;
        const icon = closeButton.shadowRoot?.querySelector('swc-ui-icon');

        expect(closeButton).toBeInstanceOf(CloseButton);
        expect(icon).toBeInstanceOf(UiIcon);
        expect(icon?.customElementRegistry).toBe(registry);
        host.remove();
      }
    );
  },
};

export const PackageRegistryTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    const { registry, version } = await import('@adobe/spectrum-wc/registry');

    await step('the package registry is published by version', () => {
      expect(registry).toBeInstanceOf(CustomElementRegistry);
      expect(window.__swc.scopedRegistries?.get(version)).toBe(registry);
    });

    await step('components can be defined in the package registry', () => {
      CloseButton.define(registry);
      expect(registry.get('swc-close-button')).toBe(CloseButton);
    });
  },
};
