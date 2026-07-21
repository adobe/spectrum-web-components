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

import { ColorHandle } from '@adobe/spectrum-wc/color-handle';
import {
  COLOR_HANDLE_ALPHA_FLOOR,
  computeBorderAlpha,
  contrastRatio,
  findMinAlpha,
} from '@adobe/spectrum-wc-core/components/color-handle';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/color-handle.stories.js';
import { anchoredHandle, Overview } from '../stories/color-handle.stories.js';

export default {
  ...meta,
  title: 'Color handle/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults, role-less host, adaptive border variable
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const handle = await getComponent<ColorHandle>(
      canvasElement,
      'swc-color-handle'
    );

    await step('exposes no host role or accessible name', async () => {
      expect(handle.hasAttribute('role')).toBe(false);
      expect(handle.hasAttribute('aria-label')).toBe(false);
      expect(handle.hasAttribute('aria-labelledby')).toBe(false);
      expect(handle.getAttribute('tabindex')).toBe(null);
    });

    await step('applies the color property to the fill layer', async () => {
      expect(handle.color).toBe('rgba(0, 128, 255, 0.7)');
      const fill = handle.shadowRoot?.querySelector(
        '.swc-ColorHandle-colorFill'
      ) as HTMLElement;
      expect(fill).toBeTruthy();
      expect(
        fill.style.getPropertyValue('--swc-color-handle-picked-color')
      ).toContain('0, 128, 255');
    });

    await step('sets the adaptive dark-border opacity variable', async () => {
      const alpha = handle.style.getPropertyValue(
        '--_swc-color-handle-border-alpha'
      );
      expect(alpha).not.toBe('');
      expect(Number.isNaN(Number(alpha))).toBe(false);
      expect(Number(alpha)).toBeGreaterThanOrEqual(COLOR_HANDLE_ALPHA_FLOOR);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Touch opens/closes the loupe; mouse does not
// ──────────────────────────────────────────────────────────────

export const TouchOpenCloseTest: Story = {
  render: () => anchoredHandle('Touch open/close', {}),
  play: async ({ canvasElement, step }) => {
    const handle = await getComponent<ColorHandle>(
      canvasElement,
      'swc-color-handle'
    );
    // Pointer capture requires an active pointer the synthetic events lack.
    handle.setPointerCapture = (): void => undefined;
    handle.releasePointerCapture = (): void => undefined;

    const dispatch = (type: string, pointerType: string): void =>
      handle.dispatchEvent(
        new PointerEvent(type, { pointerId: 1, pointerType })
      );

    await step('defaults to closed', async () => {
      expect(handle.open).toBe(false);
    });

    await step('touch pointerdown opens', async () => {
      dispatch('pointerdown', 'touch');
      await handle.updateComplete;
      expect(handle.open).toBe(true);
    });

    await step('pointerup closes', async () => {
      dispatch('pointerup', 'touch');
      await handle.updateComplete;
      expect(handle.open).toBe(false);
    });

    await step('touch pointerdown then pointercancel closes', async () => {
      dispatch('pointerdown', 'touch');
      await handle.updateComplete;
      expect(handle.open).toBe(true);
      dispatch('pointercancel', 'touch');
      await handle.updateComplete;
      expect(handle.open).toBe(false);
    });

    await step('mouse pointerdown does not open', async () => {
      dispatch('pointerdown', 'mouse');
      await handle.updateComplete;
      expect(handle.open).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: disabled suppresses the loupe even when open
// ──────────────────────────────────────────────────────────────

export const DisabledSuppressesLoupeTest: Story = {
  render: () => anchoredHandle('Disabled', { open: true, disabled: true }),
  play: async ({ canvasElement, step }) => {
    const handle = await getComponent<ColorHandle>(
      canvasElement,
      'swc-color-handle'
    );
    const loupe = (): HTMLElement & { open: boolean } =>
      handle.shadowRoot?.querySelector('swc-color-loupe') as HTMLElement & {
        open: boolean;
      };

    await step('loupe is closed while disabled despite open', async () => {
      expect(handle.open).toBe(true);
      expect(handle.disabled).toBe(true);
      expect(loupe().open).toBe(false);
    });

    await step('enabling the handle reveals the loupe', async () => {
      handle.disabled = false;
      await handle.updateComplete;
      expect(loupe().open).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: fill=false renders an outline-only handle
// ──────────────────────────────────────────────────────────────

export const OutlineOnlyTest: Story = {
  render: () => anchoredHandle('Outline only', { color: 'rgb(20, 115, 230)' }),
  play: async ({ canvasElement, step }) => {
    const handle = await getComponent<ColorHandle>(
      canvasElement,
      'swc-color-handle'
    );
    const inner = handle.shadowRoot?.querySelector(
      '.swc-ColorHandle-inner'
    ) as HTMLElement;

    await step('fill is shown by default', async () => {
      expect(handle.fill).toBe(true);
      expect(handle.hasAttribute('fill')).toBe(true);
      expect(getComputedStyle(inner).display).not.toBe('none');
    });

    await step('setting fill=false hides the inner swatch', async () => {
      // `fill` is a reflected boolean defaulting true, so outline-only is set
      // via the property (or by removing the attribute), not `fill="false"`.
      handle.fill = false;
      await handle.updateComplete;
      expect(handle.hasAttribute('fill')).toBe(false);
      expect(getComputedStyle(inner).display).toBe('none');
    });

    await step('restoring fill shows the swatch again', async () => {
      handle.fill = true;
      await handle.updateComplete;
      expect(getComputedStyle(inner).display).not.toBe('none');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: adaptive contrast helper (pure logic, no DOM)
// ──────────────────────────────────────────────────────────────

export const ContrastHelperTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ step }) => {
    await step(
      'parses colors to a valid, in-range alpha (no NaN)',
      async () => {
        for (const color of [
          'white',
          '#ffffff',
          'yellow',
          'rgb(255, 235, 0)',
          'rgba(0, 128, 255, 0.7)',
          'hsl(111, 82%, 56%)',
          'tomato',
          'black',
        ]) {
          const alpha = computeBorderAlpha(color);
          expect(Number.isNaN(alpha)).toBe(false);
          expect(alpha).toBeGreaterThanOrEqual(COLOR_HANDLE_ALPHA_FLOOR);
          expect(alpha).toBeLessThanOrEqual(1);
        }
      }
    );

    await step('falls back to the floor for unparseable input', async () => {
      expect(computeBorderAlpha('not-a-color')).toBe(COLOR_HANDLE_ALPHA_FLOOR);
    });

    await step(
      'white-first keeps the floor when white already carries 3:1',
      async () => {
        // Black background: white separator has maximal contrast, so the dark
        // borders stay at the floor rather than escalating.
        expect(computeBorderAlpha('black')).toBe(COLOR_HANDLE_ALPHA_FLOOR);
      }
    );

    await step(
      'escalates alpha above the floor for light colors white cannot carry',
      async () => {
        // Against a light color, white gives little contrast, so the dark
        // border opacity must climb past the floor.
        expect(computeBorderAlpha('tomato')).toBeGreaterThan(
          COLOR_HANDLE_ALPHA_FLOOR
        );
      }
    );

    await step('contrastRatio is symmetric and bounded', async () => {
      const black: [number, number, number] = [0, 0, 0];
      const white: [number, number, number] = [255, 255, 255];
      expect(contrastRatio(black, white)).toBeCloseTo(21, 0);
      expect(contrastRatio(white, black)).toBeCloseTo(21, 0);
      expect(contrastRatio(white, white)).toBeCloseTo(1, 5);
    });

    await step('findMinAlpha never returns below the floor', async () => {
      const alpha = findMinAlpha([10, 10, 10]);
      expect(alpha).toBeGreaterThanOrEqual(COLOR_HANDLE_ALPHA_FLOOR);
      expect(alpha).toBeLessThanOrEqual(1);
    });
  },
};
