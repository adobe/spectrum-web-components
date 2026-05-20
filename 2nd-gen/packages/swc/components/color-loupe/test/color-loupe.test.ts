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

import { ColorLoupe } from '@adobe/spectrum-wc/color-loupe';

import '@adobe/spectrum-wc/color-loupe';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/color-loupe.stories.js';
import {
  Overview,
  ParentDrivenVisibility,
} from '../stories/color-loupe.stories.js';

export default {
  ...meta,
  title: 'Color Components/Color Loupe/Tests',
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
    const loupe = await getComponent<ColorLoupe>(
      canvasElement,
      'swc-color-loupe'
    );

    await step('renders with open attribute reflected', async () => {
      expect(loupe.open).toBe(true);
      expect(loupe.hasAttribute('open')).toBe(true);
    });

    await step('has an aria-hidden SVG', async () => {
      const svg = loupe.shadowRoot?.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });

    await step('applies the color property', async () => {
      expect(loupe.color).toBe('rgba(0, 128, 255, 0.7)');
      const fill = loupe.shadowRoot?.querySelector(
        '.swc-ColorLoupe-colorFill'
      ) as HTMLElement;
      expect(fill).toBeTruthy();
      expect(
        fill.style.getPropertyValue('--swc-color-loupe-picked-color')
      ).toContain('0, 128, 255');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Open attribute
// ──────────────────────────────────────────────────────────────

export const OpenAttributeTest: Story = {
  render: () => html`
    <div style="position: relative; min-block-size: 120px;">
      <swc-color-loupe color="rgb(255, 0, 0)"></swc-color-loupe>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const loupe = await getComponent<ColorLoupe>(
      canvasElement,
      'swc-color-loupe'
    );

    const getInnerLoupe = (): HTMLElement =>
      loupe.shadowRoot?.querySelector('.swc-ColorLoupe') as HTMLElement;

    await step('defaults to closed (open = false)', async () => {
      expect(loupe.open).toBe(false);
      expect(loupe.hasAttribute('open')).toBe(false);
    });

    await step('inner .swc-ColorLoupe has opacity 0 when closed', async () => {
      const innerLoupe = getInnerLoupe();
      expect(innerLoupe).toBeTruthy();
      // Initial state: no transition in flight, value should already be 0.
      expect(getComputedStyle(innerLoupe).opacity).toBe('0');
    });

    await step(
      'reflects open attribute when set programmatically',
      async () => {
        loupe.open = true;
        await loupe.updateComplete;
        expect(loupe.hasAttribute('open')).toBe(true);
      }
    );

    await step('inner .swc-ColorLoupe has opacity 1 when open', async () => {
      const innerLoupe = getInnerLoupe();
      innerLoupe.getAnimations().forEach((a) => a.finish());
      expect(getComputedStyle(innerLoupe).opacity).toBe('1');
    });

    await step('removes open attribute when set to false', async () => {
      loupe.open = false;
      await loupe.updateComplete;
      expect(loupe.hasAttribute('open')).toBe(false);
    });

    await step(
      'inner .swc-ColorLoupe returns to opacity 0 when closed again',
      async () => {
        const innerLoupe = getInnerLoupe();
        innerLoupe.getAnimations().forEach((a) => a.finish());
        expect(getComputedStyle(innerLoupe).opacity).toBe('0');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Color property
// ──────────────────────────────────────────────────────────────

export const ColorPropertyTest: Story = {
  render: () => html`
    <div style="position: relative; min-block-size: 120px;">
      <swc-color-loupe open></swc-color-loupe>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const loupe = await getComponent<ColorLoupe>(
      canvasElement,
      'swc-color-loupe'
    );

    await step('defaults to semi-transparent red', async () => {
      expect(loupe.color).toBe('rgba(255, 0, 0, 0.5)');
    });

    await step('updates color fill when color property changes', async () => {
      loupe.color = 'rgb(0, 255, 0)';
      await loupe.updateComplete;
      const fill = loupe.shadowRoot?.querySelector(
        '.swc-ColorLoupe-colorFill'
      ) as HTMLElement;
      expect(
        fill.style.getPropertyValue('--swc-color-loupe-picked-color')
      ).toContain('0, 255, 0');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Parent-driven visibility (button trigger)
// ──────────────────────────────────────────────────────────────

export const ParentDrivenVisibilityTest: Story = {
  ...ParentDrivenVisibility,
  play: async ({ canvasElement, step }) => {
    const loupe = await getComponent<ColorLoupe>(
      canvasElement,
      'swc-color-loupe'
    );
    const btn = canvasElement.querySelector('swc-button') as HTMLElement;

    await step('loupe starts closed', async () => {
      expect(loupe.open).toBe(false);
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      expect(btn.textContent?.trim()).toBe('Show loupe');
    });

    await step('clicking the button opens the loupe', async () => {
      btn.click();
      await loupe.updateComplete;
      expect(loupe.open).toBe(true);
      expect(btn.getAttribute('aria-expanded')).toBe('true');
      expect(btn.textContent?.trim()).toBe('Hide loupe');
    });

    await step('clicking the button again closes the loupe', async () => {
      btn.click();
      await loupe.updateComplete;
      expect(loupe.open).toBe(false);
      expect(btn.getAttribute('aria-expanded')).toBe('false');
      expect(btn.textContent?.trim()).toBe('Show loupe');
    });
  },
};
