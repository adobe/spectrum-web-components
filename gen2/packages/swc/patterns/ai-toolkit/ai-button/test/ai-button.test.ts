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

import { Icon_AIChatConversation } from '@adobe/spectrum-wc-icons/AIChatConversation.js';
import { Icon_AIExpand } from '@adobe/spectrum-wc-icons/AIExpand.js';
import { Icon_AIFill } from '@adobe/spectrum-wc-icons/AIFill.js';
import { Icon_AIImage } from '@adobe/spectrum-wc-icons/AIImage.js';
import { Icon_AIImageGenerate } from '@adobe/spectrum-wc-icons/AIImageGenerate.js';
import { Icon_AILayer } from '@adobe/spectrum-wc-icons/AILayer.js';
import { Icon_AIMark } from '@adobe/spectrum-wc-icons/AIMark.js';
import { Icon_AISearch } from '@adobe/spectrum-wc-icons/AISearch.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '../swc-ai-button.js';

import {
  captioned,
  forcePseudoState,
  theme,
} from '../../../../.storybook/helpers/index.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../../utils/test-utils.js';
import {
  AI_BUTTON_ICONS,
  AI_BUTTON_VALID_SIZES,
  type AiButton,
  type AiButtonIcon,
  type AiButtonSize,
} from '../AiButton.js';
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

/** The S2 workflow icon each `icon` name should draw. */
const ICON_SVGS: Record<AiButtonIcon, () => string> = {
  'ai-mark': Icon_AIMark,
  'ai-chat-conversation': Icon_AIChatConversation,
  'ai-expand': Icon_AIExpand,
  'ai-fill': Icon_AIFill,
  'ai-image': Icon_AIImage,
  'ai-image-generate': Icon_AIImageGenerate,
  'ai-layer': Icon_AILayer,
  'ai-search': Icon_AISearch,
};

/** The path data of an SVG element or string, which tells icons apart. */
const pathData = (svg: Element | string): string[] => {
  const root =
    typeof svg === 'string'
      ? new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement
      : svg;
  return [...root.querySelectorAll('path')].map(
    (path) => path.getAttribute('d') ?? ''
  );
};

/** The built-in icon, which the `icon` slot holds as its fallback content. */
const builtInIcon = (el: AiButton): SVGSVGElement =>
  innerButton(el).querySelector<SVGSVGElement>(
    '.swc-AiButton-icon slot[name="icon"] > svg'
  )!;

/** A custom icon that no `icon` value draws: a five-point star. */
const STAR_POINTS =
  '10,1.41 12.13,7.97 19.04,7.97 13.45,12.03 15.58,18.59 10,14.54 4.42,18.59 6.55,12.03 0.96,7.97 7.87,7.97';

/**
 * Dimensions per size, in pixels. They match the standard button's sizes, so
 * medium is shorter than the design's 36px.
 */
const DESIGN_SIZES = {
  m: { blockSize: 32, edgeToText: 12, iconSize: 18, fontSize: 14 },
  l: { blockSize: 40, edgeToText: 16, iconSize: 20, fontSize: 16 },
  xl: { blockSize: 48, edgeToText: 18, iconSize: 22, fontSize: 18 },
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
      'draws the AI mark, hidden from assistive technology',
      async () => {
        const icon = button.querySelector('.swc-AiButton-icon');

        expect(icon?.getAttribute('aria-hidden')).toBe('true');
        expect(pathData(builtInIcon(el))).toEqual(pathData(Icon_AIMark()));
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
    const drawnIcon = (): string[] => pathData(builtInIcon(el));

    await step('defaults to the AI mark', async () => {
      expect(el.icon).toBe('ai-mark');
      expect(el.getAttribute('icon')).toBe('ai-mark');
      expect(drawnIcon()).toEqual(pathData(Icon_AIMark()));
    });

    await step(
      'draws the S2 workflow icon that each name selects',
      async () => {
        expect(Object.keys(ICON_SVGS).sort()).toEqual(
          [...AI_BUTTON_ICONS].sort()
        );
        for (const icon of AI_BUTTON_ICONS) {
          el.icon = icon;
          await el.updateComplete;
          expect(el.getAttribute('icon')).toBe(icon);
          expect(drawnIcon(), icon).toEqual(pathData(ICON_SVGS[icon]()));
        }
      }
    );

    await step(
      'warns once and shows the AI mark for an unknown icon',
      async () => {
        await withWarningSpy(async (warnCalls) => {
          el.icon = 'wand' as AiButtonIcon;
          await el.updateComplete;
          expect(warnCalls).toHaveLength(1);
          expect(warnCalls[0]?.[0]).toBe(el);
          expect(String(warnCalls[0]?.[1] ?? '')).toContain('"icon"');
          expect(drawnIcon()).toEqual(pathData(Icon_AIMark()));
        });
      }
    );

    await step(
      'shows the AI mark without a warning when the attribute is removed',
      async () => {
        el.icon = 'ai-search';
        await el.updateComplete;
        await withWarningSpy(async (warnCalls) => {
          el.removeAttribute('icon');
          await el.updateComplete;
          expect(warnCalls).toHaveLength(0);
          expect(drawnIcon()).toEqual(pathData(Icon_AIMark()));
        });
      }
    );
  },
};

// The docs show no `icon` slot example, to steer consumers to the `icon`
// attribute, so this test story is the only story that shows the slot. The
// production Storybook leaves out test stories.
export const IconSlotTest: Story = {
  render: () => html`
    ${captioned(
      html`
        <swc-ai-button icon="ai-search">Search</swc-ai-button>
      `,
      'icon="ai-search"'
    )}
    ${captioned(
      html`
        <swc-ai-button icon="ai-search">
          <svg slot="icon" viewBox="0 0 20 20" data-custom-icon>
            <polygon points=${STAR_POINTS}></polygon>
          </svg>
          Search
        </swc-ai-button>
      `,
      'icon="ai-search" and a slotted <svg>'
    )}
    ${captioned(
      html`
        <swc-ai-button icon="ai-search">
          <swc-icon slot="icon" data-custom-icon>
            <svg viewBox="0 0 20 20">
              <polygon points=${STAR_POINTS}></polygon>
            </svg>
          </swc-icon>
          Search
        </swc-ai-button>
      `,
      'icon="ai-search" and a slotted <swc-icon>'
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  play: async ({ canvasElement, step }) => {
    const [plain, ...withCustomIcon] = await getComponents<AiButton>(
      canvasElement,
      'swc-ai-button'
    );
    await getComponents(canvasElement, 'swc-icon');
    const parts = (el: AiButton) => {
      const wrapper = innerButton(el).querySelector('.swc-AiButton-icon')!;

      return {
        wrapper,
        slot: wrapper.querySelector<HTMLSlotElement>('slot[name="icon"]')!,
        custom: el.querySelector('[data-custom-icon]')!,
      };
    };
    const { iconSize } = DESIGN_SIZES.m;

    await step('draws the icon attribute when no icon is slotted', async () => {
      expect(parts(plain).slot.assignedElements()).toHaveLength(0);
      expect(builtInIcon(plain).getBoundingClientRect().width).toBe(iconSize);
      expect(pathData(builtInIcon(plain))).toEqual(pathData(Icon_AISearch()));
    });

    await step(
      'shows a slotted svg or swc-icon instead of the icon attribute',
      async () => {
        for (const el of withCustomIcon) {
          const { wrapper, slot, custom } = parts(el);
          const box = custom.getBoundingClientRect();
          const name = custom.localName;

          expect(slot.assignedElements(), name).toEqual([custom]);
          expect(builtInIcon(el).getBoundingClientRect().width, name).toBe(0);
          expect(box.width, `${name} width`).toBe(iconSize);
          expect(box.height, `${name} height`).toBe(iconSize);
          expect(
            getComputedStyle(custom.querySelector('polygon')!).fill,
            `${name} fill`
          ).toBe(getComputedStyle(wrapper).color);
        }
      }
    );

    await step(
      'sizes and places a slotted icon like the built-in icon',
      async () => {
        const buttons = [plain, ...withCustomIcon];
        // Boxes relative to the inner button, so buttons in different places
        // on the page compare.
        const layout = (el: AiButton, icon: Element) => {
          const button = innerButton(el).getBoundingClientRect();
          const box = icon.getBoundingClientRect();
          const label = innerButton(el)
            .querySelector('.swc-AiButton-label')!
            .getBoundingClientRect();

          return {
            x: box.left - button.left,
            y: box.top - button.top,
            width: box.width,
            height: box.height,
            labelX: label.left - button.left,
          };
        };

        for (const size of AI_BUTTON_VALID_SIZES) {
          buttons.forEach((el) => (el.size = size));
          await Promise.all(buttons.map((el) => el.updateComplete));
          const expected = layout(plain, builtInIcon(plain));

          expect(expected.width, `built-in ${size} width`).toBe(
            DESIGN_SIZES[size].iconSize
          );
          for (const el of withCustomIcon) {
            const { custom } = parts(el);
            const actual = layout(el, custom);
            const name = `${custom.localName} ${size}`;

            expect(actual.width, `${name} width`).toBe(expected.width);
            expect(actual.height, `${name} height`).toBe(expected.height);
            expect(actual.x, `${name} x`).toBeCloseTo(expected.x, 2);
            expect(actual.y, `${name} y`).toBeCloseTo(expected.y, 2);
            expect(actual.labelX, `${name} label x`).toBeCloseTo(
              expected.labelX,
              2
            );
          }
        }
        buttons.forEach((el) => (el.size = 'm'));
        await Promise.all(buttons.map((el) => el.updateComplete));
      }
    );

    await step(
      'updates when the slotted icon is removed and added back',
      async () => {
        const [el] = withCustomIcon;
        const { slot, custom } = parts(el);
        const nextFrame = () =>
          new Promise((resolve) => requestAnimationFrame(resolve));
        custom.remove();
        await nextFrame();

        expect(slot.assignedElements()).toHaveLength(0);
        expect(builtInIcon(el).getBoundingClientRect().width).toBe(iconSize);
        expect(pathData(builtInIcon(el))).toEqual(pathData(Icon_AISearch()));

        // Put the icon back so the story looks the same after a play run.
        el.prepend(custom);
        await nextFrame();

        expect(slot.assignedElements()).toEqual([custom]);
        expect(builtInIcon(el).getBoundingClientRect().width).toBe(0);
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
          expect(el.offsetHeight, `${el.size} host block size`).toBe(blockSize);
        }
      }
    );
  },
};

export const SizesTest: Story = {
  render: () => html`
    ${AI_BUTTON_VALID_SIZES.map(
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

    await step('matches the expected dimensions for each size', async () => {
      for (const el of buttons) {
        const button = innerButton(el);
        const icon = button.querySelector<HTMLElement>('.swc-AiButton-icon')!;
        const { blockSize, edgeToText, iconSize, fontSize } =
          DESIGN_SIZES[el.size];

        expect(button.offsetHeight, `${el.size} block size`).toBe(blockSize);
        expect(el.offsetHeight, `${el.size} host block size`).toBe(blockSize);
        expect(getComputedStyle(button).paddingInlineStart).toBe(
          `${edgeToText}px`
        );
        expect(icon.offsetWidth, `${el.size} icon size`).toBe(iconSize);
        expect(getComputedStyle(button).fontSize).toBe(`${fontSize}px`);
        expect(
          builtInIcon(el).getBoundingClientRect().width,
          `${el.size} drawn icon size`
        ).toBeCloseTo(iconSize, 1);
      }
    });
  },
};

export const NoSmallSizeTest: Story = {
  render: () => html`
    <swc-ai-button size="s">Ask AI</swc-ai-button>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');

    await step('renders the small size attribute as medium', async () => {
      expect(el.size).toBe('m');
      expect(el.getAttribute('size')).toBe('m');
      expect(innerButton(el).offsetHeight).toBe(DESIGN_SIZES.m.blockSize);
    });

    await step('renders the small size property as medium', async () => {
      el.size = 'l';
      await el.updateComplete;
      el.size = 's' as AiButtonSize;
      await el.updateComplete;
      expect(el.size).toBe('m');
      expect(el.getAttribute('size')).toBe('m');
      expect(innerButton(el).offsetHeight).toBe(DESIGN_SIZES.m.blockSize);
    });
  },
};

export const StandardButtonParityTest: Story = {
  render: () => html`
    ${(['sizeM', 'sizeL'] as const).map(
      (scale) => html`
        <div class="swc-theme swc-theme--${scale}" data-scale=${scale}>
          ${AI_BUTTON_VALID_SIZES.map(
            (size) => html`
              <swc-button size=${size}>
                <svg slot="icon" viewBox="0 0 20 20" aria-hidden="true"></svg>
                Ask AI
              </swc-button>
              <swc-ai-button size=${size}>Ask AI</swc-ai-button>
              <swc-button size=${size} accessible-label="Ask AI">
                <svg slot="icon" viewBox="0 0 20 20" aria-hidden="true"></svg>
              </swc-button>
              <swc-ai-button
                size=${size}
                accessible-label="Ask AI"
              ></swc-ai-button>
            `
          )}
        </div>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const standardButtons = await getComponents<HTMLElement>(
      canvasElement,
      'swc-button'
    );
    const aiButtons = await getComponents<AiButton>(
      canvasElement,
      'swc-ai-button'
    );
    const pairs = aiButtons.map((el, index) => {
      const standardHost = standardButtons[index];
      const button = innerButton(el);

      return {
        name: `${el.closest('[data-scale]')!.getAttribute('data-scale')} ${el.size}`,
        iconOnly: el.hasAttribute('accessible-label'),
        button,
        icon: button.querySelector('.swc-AiButton-icon')!,
        standard:
          standardHost.shadowRoot!.querySelector<HTMLElement>('button')!,
        standardIcon: standardHost.querySelector('svg')!,
      };
    });
    // Rectangles of boxes at fractional positions differ by float noise, for
    // example 13.00006 instead of 13 in Firefox, so these allow 0.05px.
    const iconInset = (button: Element, icon: Element) =>
      icon.getBoundingClientRect().left - button.getBoundingClientRect().left;

    await step(
      'uses the standard button height, padding, gap, font size, and icon size',
      async () => {
        for (const {
          name,
          button,
          icon,
          standard,
          standardIcon,
        } of pairs.filter((pair) => !pair.iconOnly)) {
          const styles = getComputedStyle(button);
          const standardStyles = getComputedStyle(standard);
          // The standard button draws a border inside its padding.
          const standardEdgeToText =
            parseFloat(standardStyles.paddingInlineStart) +
            parseFloat(standardStyles.borderInlineStartWidth);

          expect(styles.minBlockSize, `${name} block size`).toBe(
            standardStyles.minBlockSize
          );
          expect(parseFloat(styles.paddingInlineStart), `${name} edge`).toBe(
            standardEdgeToText
          );
          expect(styles.columnGap, `${name} gap`).toBe(
            standardStyles.columnGap
          );
          expect(styles.fontSize, `${name} font size`).toBe(
            standardStyles.fontSize
          );
          expect(
            icon.getBoundingClientRect().width,
            `${name} icon size`
          ).toBeCloseTo(standardIcon.getBoundingClientRect().width, 1);
        }
      }
    );

    await step(
      'matches the standard icon-only button size and icon position',
      async () => {
        for (const {
          name,
          button,
          icon,
          standard,
          standardIcon,
        } of pairs.filter((pair) => pair.iconOnly)) {
          expect(button.offsetWidth, `${name} icon-only inline size`).toBe(
            standard.offsetWidth
          );
          // Not offsetHeight: the 23px line height of the extra-large standard
          // button makes it 1px taller than its min-block-size.
          expect(button.offsetHeight, `${name} icon-only block size`).toBe(
            parseFloat(getComputedStyle(standard).minBlockSize)
          );
          expect(
            iconInset(button, icon),
            `${name} icon-only icon inset`
          ).toBeCloseTo(iconInset(standard, standardIcon), 1);
        }
      }
    );
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

    await step(
      'tints the glass evenly, with no light rim at the edges',
      async () => {
        const shadow = getComputedStyle(button, '::before');

        expect(shadow.backgroundColor).toBe('rgba(0, 0, 0, 0.04)');
        expect(shadow.filter).toBe('none');
        expect(shadow.translate).toBe('none');
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
          style="--swc-ai-button-min-block-size: 80px; --_swc-ai-button-min-block-size: 80px; --swc-ai-button-content-color: red; --_swc-ai-button-content-color: red; --_swc-ai-button-glow-hover-opacity: 1; --swc-icon-color: red;"
        >
          Ask AI
        </swc-ai-button>
      `,
      'light'
    ),
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<AiButton>(canvasElement, 'swc-ai-button');
    const button = innerButton(el);

    await step('ignores custom properties set on the host', async () => {
      expect(button.offsetHeight).toBe(DESIGN_SIZES.m.blockSize);
      expect(getComputedStyle(button).color).toBe('rgb(83, 0, 53)');
      expect(
        getComputedStyle(button.querySelector('.swc-AiButton-glow')!, '::after')
          .opacity
      ).toBe('0');
      expect(
        getComputedStyle(builtInIcon(el).querySelector('path')!).fill
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
