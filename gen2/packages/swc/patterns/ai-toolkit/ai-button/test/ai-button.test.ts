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

import { BUTTON_VALID_SIZES } from '@adobe/spectrum-wc-core/components/button';

import '../swc-ai-button.js';

import {
  forcePseudoState,
  theme,
} from '../../../../.storybook/helpers/index.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../../utils/test-utils.js';
import type { PixelLoader } from '../../pixel-loader/PixelLoader.js';
import type { AiButton } from '../AiButton.js';
import meta, {
  Accessibility,
  IconOnly,
  Overview,
} from '../stories/ai-button.stories.js';

export default {
  ...meta,
  title: 'AI Toolkit/AI button/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ────────────────────
//    HELPERS
// ────────────────────

const innerButton = (el: AiButton): HTMLButtonElement =>
  el.shadowRoot!.querySelector<HTMLButtonElement>('.swc-AiButton')!;

/** Design dimensions per size, in pixels. */
const DESIGN_SIZES = {
  s: { blockSize: 32, iconSize: 16, fontSize: 12 },
  m: { blockSize: 36, iconSize: 18, fontSize: 14 },
  l: { blockSize: 40, iconSize: 20, fontSize: 16 },
  xl: { blockSize: 48, iconSize: 22, fontSize: 18 },
} as const;

// ────────────────────
//    TESTS
// ────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);

    await step('renders a native button with the label', async () => {
      expect(button.tagName).toBe('BUTTON');
      expect(button.getAttribute('type')).toBe('button');
      expect(button.hasAttribute('aria-label')).toBe(false);
      expect(button.classList.contains('swc-AiButton--iconOnly')).toBe(false);
      expect(el.textContent?.trim()).toBe('Ask AI');
      expect(el.getAttribute('size')).toBe('m');
    });

    await step(
      'draws the AI mark with a static, hidden pixel loader',
      async () => {
        const icon = button.querySelector('.swc-AiButton-icon');
        const loader = icon?.querySelector('swc-pixel-loader');

        expect(icon?.getAttribute('aria-hidden')).toBe('true');
        expect(loader?.getAttribute('icon')).toBe('aiLogo');
        expect(loader?.hasAttribute('paused')).toBe(true);
      }
    );
  },
};

export const IconTest: Story = {
  render: () => html`
    <swc-ai-button>Ask AI</swc-ai-button>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const loader = (): PixelLoader =>
      innerButton(el).querySelector<PixelLoader>('swc-pixel-loader')!;

    await step('defaults to the AI mark', async () => {
      expect(el.icon).toBe('aiLogo');
      expect(el.getAttribute('icon')).toBe('aiLogo');
      expect(loader().icon).toBe('aiLogo');
    });

    await step('forwards a new icon to the paused pixel loader', async () => {
      el.icon = 'wand';
      await el.updateComplete;
      expect(el.getAttribute('icon')).toBe('wand');
      expect(loader().icon).toBe('wand');
      expect(loader().paused).toBe(true);
    });

    await step(
      'warns once and shows the AI mark for an unknown icon',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          el.icon = 'not-an-icon' as AiButton['icon'];
          await el.updateComplete;
          await loader().updateComplete;
          expect(warnCalls).toHaveLength(1);
          expect(warnCalls[0]?.[0]).toBe(el);
          expect(String(warnCalls[0]?.[1] ?? '')).toContain('"icon"');
          expect(loader().icon).toBe('aiLogo');
        });
      }
    );

    await step(
      'shows the AI mark without a warning when the attribute is removed',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          el.removeAttribute('icon');
          await el.updateComplete;
          expect(warnCalls).toHaveLength(0);
          expect(loader().icon).toBe('aiLogo');
        });
      }
    );
  },
};

export const IconOnlyTest: Story = {
  ...IconOnly,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<AiButton>(
      canvasElement,
      'swc-ai-button'
    );

    await step(
      'renders a circle named by accessible-label at every size',
      async () => {
        for (const el of buttons) {
          const button = innerButton(el);
          const { blockSize } = DESIGN_SIZES[el.size];

          expect(button.classList.contains('swc-AiButton--iconOnly')).toBe(
            true
          );
          expect(button.getAttribute('aria-label')).toBe('Ask AI');
          expect(button.offsetWidth).toBe(blockSize);
          expect(button.offsetHeight).toBe(blockSize);
        }
      }
    );
  },
};

export const SizesTest: Story = {
  render: () => html`
    ${BUTTON_VALID_SIZES.map(
      (size) => html`
        <swc-ai-button size=${size}>Ask AI</swc-ai-button>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<AiButton>(
      canvasElement,
      'swc-ai-button'
    );

    await step('matches the design dimensions for each size', async () => {
      for (const el of buttons) {
        const button = innerButton(el);
        const icon = button.querySelector<HTMLElement>('.swc-AiButton-icon')!;
        const loader = icon.querySelector<HTMLElement>('swc-pixel-loader')!;
        const { blockSize, iconSize, fontSize } = DESIGN_SIZES[el.size];

        expect(button.offsetHeight, `${el.size} block size`).toBe(blockSize);
        expect(icon.offsetWidth, `${el.size} icon size`).toBe(iconSize);
        expect(getComputedStyle(button).fontSize).toBe(`${fontSize}px`);
        expect(loader.getBoundingClientRect().width).toBeCloseTo(
          iconSize * 0.9,
          1
        );
      }
    });
  },
};

export const LabelChangeTest: Story = {
  render: () => html`
    <swc-ai-button accessible-label="Ask AI">Ask AI</swc-ai-button>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);
    const waitForSlotChange = async (): Promise<void> => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await el.updateComplete;
    };

    await step('switches to icon-only when the label is removed', async () => {
      el.textContent = '';
      await waitForSlotChange();
      expect(button.classList.contains('swc-AiButton--iconOnly')).toBe(true);
    });

    await step('switches back when a label is added', async () => {
      el.textContent = 'Ask AI';
      await waitForSlotChange();
      expect(button.classList.contains('swc-AiButton--iconOnly')).toBe(false);
    });
  },
};

export const DisabledTest: Story = {
  render: () => html`
    <swc-ai-button disabled>Ask AI</swc-ai-button>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);

    await step('disables the native button and suppresses clicks', async () => {
      let clicks = 0;
      const listener = (): void => {
        clicks++;
      };
      el.addEventListener('click', listener);
      el.click();
      el.removeEventListener('click', listener);

      expect(button.disabled).toBe(true);
      expect(clicks).toBe(0);
    });

    await step(
      'drops the glow and overlay, and dims the highlight',
      async () => {
        const glow = button.querySelector('.swc-AiButton-glow')!;
        const surface = button.querySelector('.swc-AiButton-surface')!;

        expect(getComputedStyle(glow).opacity).toBe('0');
        expect(
          getComputedStyle(surface)
            .getPropertyValue('--_swc-ai-button-overlay')
            .trim()
        ).toBe('none');
        expect(getComputedStyle(surface, '::after').opacity).toBe('0.32');
      }
    );
  },
};

export const HoverTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);
    const hoverOpacity = (): string =>
      getComputedStyle(button)
        .getPropertyValue('--_swc-ai-button-glow-hover-opacity')
        .trim();

    await step('reveals the stronger glow on hover', async () => {
      expect(hoverOpacity()).toBe('0');
      forcePseudoState(el, 'hover', '.swc-AiButton');
      expect(hoverOpacity()).toBe('0.8');
    });
  },
};

export const ColorSchemeTest: Story = {
  render: () => html`
    ${(['light', 'dark'] as const).map((mode) =>
      theme(
        html`
          <swc-ai-button>Ask AI</swc-ai-button>
          <swc-ai-button disabled>Ask AI</swc-ai-button>
        `,
        mode
      )
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const [light, lightDisabled, dark, darkDisabled] = (
      await getComponents<AiButton>(canvasElement, 'swc-ai-button')
    ).map(innerButton);
    const surface = (button: HTMLButtonElement): Element =>
      button.querySelector('.swc-AiButton-surface')!;
    const dodge = (button: HTMLButtonElement): string =>
      getComputedStyle(surface(button), '::before').backgroundColor;

    await step('uses the light design colors', async () => {
      expect(getComputedStyle(light).color).toBe('rgb(83, 0, 53)');
      expect(getComputedStyle(lightDisabled).color).toBe('rgba(0, 0, 0, 0.24)');
      expect(dodge(light)).toBe('rgba(0, 0, 0, 0)');
    });

    await step('uses the dark design colors on dark glass', async () => {
      expect(getComputedStyle(dark).color).toBe('rgba(255, 255, 255, 0.8)');
      expect(getComputedStyle(surface(dark)).backgroundImage).toContain(
        'rgba(0, 0, 0, 0.64)'
      );
      expect(dodge(dark)).toBe('rgba(134, 112, 112, 0.1)');
      expect(getComputedStyle(darkDisabled).color).toBe('rgb(68, 68, 68)');
      expect(dodge(darkDisabled)).toBe('rgba(0, 0, 0, 0)');
    });
  },
};

export const LockedStylesTest: Story = {
  render: () =>
    theme(
      html`
        <swc-ai-button
          style="--swc-ai-button-min-block-size: 80px; --_swc-ai-button-min-block-size: 80px; --swc-ai-button-content-color: red; --_swc-ai-button-content-color: red; --_swc-ai-button-glow-hover-opacity: 1; --swc-pixel-loader-color: red;"
        >
          Ask AI
        </swc-ai-button>
      `,
      'light'
    ),
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);
    const loader = button.querySelector<PixelLoader>('swc-pixel-loader')!;
    await loader.updateComplete;

    await step('ignores custom properties set on the host', async () => {
      expect(button.offsetHeight).toBe(36);
      expect(getComputedStyle(button).color).toBe('rgb(83, 0, 53)');
      expect(
        getComputedStyle(button.querySelector('.swc-AiButton-glow')!, '::after')
          .opacity
      ).toBe('0');
      expect(
        getComputedStyle(loader.shadowRoot!.querySelector('.swc-PixelLoader')!)
          .color
      ).toBe('rgb(105, 3, 68)');
    });
  },
};

export const AccessibleNameTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const [labelled, iconOnly] = await getComponents<AiButton>(
      canvasElement,
      'swc-ai-button'
    );

    await step('uses the slotted label as the name', async () => {
      expect(innerButton(labelled).hasAttribute('aria-label')).toBe(false);
    });

    await step('forwards accessible-label to the native button', async () => {
      expect(innerButton(iconOnly).getAttribute('aria-label')).toBe(
        'Ask AI about this document'
      );
    });

    await step(
      'warns when an icon-only button has no accessible-label',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          iconOnly.accessibleLabel = undefined;
          await iconOnly.updateComplete;
          expect(warnCalls.length).toBeGreaterThan(0);
        });
      }
    );
  },
};
