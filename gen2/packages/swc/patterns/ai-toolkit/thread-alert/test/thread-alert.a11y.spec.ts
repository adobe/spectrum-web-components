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

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../../utils/a11y-helpers.js';

const contrastRatio = (foreground: string, background: string): number => {
  const read = (color: string): [number, number, number, number] => {
    const channels = color.match(/[\d.]+/g)?.map(Number);
    if (!channels || (channels.length !== 3 && channels.length !== 4)) {
      throw new Error(
        `Expected a computed RGB or RGBA color, received ${color}`
      );
    }
    const [red, green, blue, alpha = 1] = channels;
    if (alpha < 0 || alpha > 1) {
      throw new Error(
        `Expected a computed RGB or RGBA color, received ${color}`
      );
    }
    return [red, green, blue, alpha];
  };
  // getComputedStyle() serializes translucent colors as rgba(). Blend those
  // over the opaque background so the ratio matches the painted result.
  const flatten = (
    [red, green, blue, alpha]: [number, number, number, number],
    under?: [number, number, number]
  ): [number, number, number] => {
    if (alpha === 1) {
      return [red, green, blue];
    }
    if (!under) {
      throw new Error('Expected an opaque background color');
    }
    return [
      red * alpha + under[0] * (1 - alpha),
      green * alpha + under[1] * (1 - alpha),
      blue * alpha + under[2] * (1 - alpha),
    ];
  };
  const luminance = (red: number, green: number, blue: number): number => {
    const [r, g, b] = [red, green, blue].map((channel) => {
      const value = channel / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const backgroundRgb = flatten(read(background));
  const foregroundRgb = flatten(read(foreground), backgroundRgb);
  const values = [luminance(...foregroundRgb), luminance(...backgroundRgb)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};

test.describe('Thread alert', () => {
  test('calculates contrast for rgba colors returned by getComputedStyle', () => {
    const blackOnWhite = contrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)');
    expect(contrastRatio('rgba(0, 0, 0, 1)', 'rgb(255, 255, 255)')).toBeCloseTo(
      blackOnWhite,
      5
    );
    const blended = contrastRatio('rgba(0, 0, 0, 0.5)', 'rgb(255, 255, 255)');
    expect(blended).toBeGreaterThan(1);
    expect(blended).toBeLessThan(blackOnWhite);
  });

  test('preserves the consumer heading and named inline controls without a live role', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-thread-alert--accessibility',
      'swc-thread-alert'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Request interrupted" [level=3]
      - text: Your response could not be completed.
      - button "Try again"
      - button "Dismiss message"
    `);
    await expect(
      root.locator('[role="alert"], [role="status"], [aria-live]')
    ).toHaveCount(0);
    await expect(root.locator('swc-thread-alert')).not.toHaveAttribute('role');
  });

  for (const [theme, backdrop] of [
    ['light', 'page'],
    ['light', 'layer'],
    ['dark', 'page'],
    ['dark', 'layer'],
  ]) {
    test(`has accessible names, contrast, and unclipped focus in the ${theme} theme over the ${backdrop} background`, async ({
      page,
    }) => {
      await gotoStory(
        page,
        `patterns-ai-toolkit-thread-alert--${theme === 'dark' ? 'dark-theme' : 'semantic-variants'}`,
        'swc-thread-alert'
      );
      await expect(page.locator('swc-thread-alert')).toHaveCount(5);
      if (backdrop === 'layer') {
        await page.locator('#storybook-root').evaluate((el) => {
          el.style.backgroundColor = 'var(--swc-background-layer-1-color)';
        });
      }
      const result = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations).toEqual([]);

      for (const alert of await page.locator('swc-thread-alert').all()) {
        const colors = await alert.evaluate((el) => {
          const surface = el.shadowRoot?.querySelector('.swc-ThreadAlert');
          const icon = Array.from(
            el.shadowRoot?.querySelectorAll('.swc-ThreadAlert-icon') ?? []
          ).find((element) => getComputedStyle(element).display !== 'none');
          if (!surface) {
            throw new Error('Expected the rendered message surface');
          }
          const backgrounds: string[] = [];
          let ancestor: Element | null = surface;
          while (ancestor) {
            const style = getComputedStyle(ancestor);
            if (style.backgroundImage !== 'none') {
              throw new Error(
                'Expected flat backgrounds in the contrast fixture'
              );
            }
            backgrounds.push(style.backgroundColor);
            const tree = ancestor.getRootNode();
            ancestor =
              ancestor.parentElement ??
              (tree instanceof ShadowRoot ? tree.host : null);
          }
          const canvas = document.createElement('canvas');
          canvas.width = canvas.height = 1;
          const context = canvas.getContext('2d');
          if (!context) {
            throw new Error('Expected a canvas context for alpha compositing');
          }
          for (const background of backgrounds.reverse()) {
            context.fillStyle = background;
            context.fillRect(0, 0, 1, 1);
          }
          const [red, green, blue, alpha] = context.getImageData(
            0,
            0,
            1,
            1
          ).data;
          if (alpha !== 255) {
            throw new Error(
              'Expected an opaque page beneath the translucent surface'
            );
          }
          return {
            background: `rgb(${red}, ${green}, ${blue})`,
            icon: icon?.firstElementChild
              ? getComputedStyle(icon.firstElementChild).color
              : undefined,
          };
        });
        if (colors.icon) {
          expect(
            contrastRatio(colors.icon, colors.background)
          ).toBeGreaterThanOrEqual(3);
        }
        const closeIcon = alert.locator('swc-close-button swc-ui-icon');
        expect(
          contrastRatio(
            await closeIcon.evaluate((el) => getComputedStyle(el).color),
            colors.background
          )
        ).toBeGreaterThanOrEqual(3);

        const surface = await alert.boundingBox();
        if (!surface) {
          throw new Error('Expected a visible message surface');
        }
        for (const control of await alert.getByRole('button').all()) {
          await page.keyboard.press('Tab');
          await expect(control).toBeFocused();
          await expect(control).not.toHaveCSS('outline-style', 'none');
          await control.evaluate(async (el) => {
            await Promise.all(
              el.getAnimations().map((animation) => animation.finished)
            );
          });
          const outline = await control.evaluate((el) => {
            const style = getComputedStyle(el);
            return {
              color: style.outlineColor,
              width: parseFloat(style.outlineWidth),
              offset: parseFloat(style.outlineOffset),
            };
          });
          expect(outline.width).toBeGreaterThanOrEqual(2);
          expect(
            contrastRatio(outline.color, colors.background)
          ).toBeGreaterThanOrEqual(3);
          const bounds = await control.boundingBox();
          if (!bounds) {
            throw new Error('Expected a visible focused control');
          }
          const outset = outline.width + outline.offset;
          expect(bounds.x - outset).toBeGreaterThanOrEqual(surface.x);
          expect(bounds.y - outset).toBeGreaterThanOrEqual(surface.y);
          expect(bounds.x + bounds.width + outset).toBeLessThanOrEqual(
            surface.x + surface.width
          );
          expect(bounds.y + bounds.height + outset).toBeLessThanOrEqual(
            surface.y + surface.height
          );
        }
      }
    });
  }

  test('uses normal keyboard order, activation, visible focus, and minimum targets', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-thread-alert--accessibility',
      'swc-thread-alert'
    );
    const retry = root.getByRole('button', { name: 'Try again', exact: true });
    const dismiss = root.getByRole('button', { name: 'Dismiss message' });
    await root.evaluate((el) => {
      el.addEventListener('click', () => {
        el.setAttribute(
          'data-clicks',
          String(Number(el.getAttribute('data-clicks') ?? 0) + 1)
        );
      });
    });

    await page.keyboard.press('Tab');
    await expect(retry).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(root).toHaveAttribute('data-clicks', '1');
    await page.keyboard.press('Tab');
    await expect(dismiss).toBeFocused();
    await page.keyboard.press('Space');
    await expect(root).toHaveAttribute('data-clicks', '2');
    await expect(root.locator('swc-thread-alert')).toBeVisible();
    await page.keyboard.press('Shift+Tab');
    await expect(retry).toBeFocused();

    for (const control of [retry, dismiss]) {
      const bounds = await control.boundingBox();
      expect(bounds?.width).toBeGreaterThanOrEqual(24);
      expect(bounds?.height).toBeGreaterThanOrEqual(24);
    }
    const focusStyle = await retry.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
      };
    });
    expect(focusStyle.outlineStyle).not.toBe('none');
    expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
  });

  test('reflows long content without clipping or changing RTL focus order', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-thread-alert--text-wrapping',
      'swc-thread-alert'
    );
    const alert = root.locator('swc-thread-alert');
    await alert.evaluate((el) => el.setAttribute('dir', 'rtl'));
    const dimensions = await alert.evaluate((el) => ({
      width: el.clientWidth,
      scrollWidth: el.scrollWidth,
      height: el.getBoundingClientRect().height,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
    expect(dimensions.height).toBeGreaterThan(34);
    await page.keyboard.press('Tab');
    await expect(root.getByRole('button', { name: 'Try again' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      root.getByRole('button', { name: 'Dismiss message' })
    ).toBeFocused();
  });

  test('leaves dynamic announcements and deliberate focus with the application', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-thread-alert--dynamic-insertion',
      '[data-announcements]'
    );
    await expect(root.locator('swc-thread-alert')).toHaveCount(0);
    await expect(root.getByRole('status')).toBeEmpty();
    await root.getByRole('button', { name: 'Announce message' }).click();
    await expect(root.getByRole('status')).toHaveText('Your request is ready.');
    await expect(root.locator('swc-thread-alert')).not.toHaveAttribute(
      'aria-live'
    );
    await root.getByRole('button', { name: 'Focus message' }).click();
    await expect(root.locator('swc-thread-alert')).toBeFocused();
    const outline = await root
      .locator('swc-thread-alert')
      .evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });

  test('keeps content and focus indicators visible in forced colors', async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-thread-alert--accessibility',
      'swc-thread-alert'
    );
    await expect(
      root.getByRole('heading', { name: 'Request interrupted' })
    ).toBeVisible();
    await page.keyboard.press('Tab');
    const retry = root.getByRole('button', { name: 'Try again' });
    await expect(retry).toBeFocused();
    expect(
      await retry.evaluate((el) => getComputedStyle(el).outlineStyle)
    ).not.toBe('none');
  });
});
