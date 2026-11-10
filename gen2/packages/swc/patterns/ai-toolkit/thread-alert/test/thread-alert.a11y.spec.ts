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
  const luminance = (color: string): number => {
    const channels = color.match(/[\d.]+/g)?.map(Number);
    if (!channels || channels.length !== 3) {
      throw new Error(
        `Expected an opaque computed RGB color, received ${color}`
      );
    }
    const [red, green, blue] = channels.map((channel) => {
      const value = channel / 255;
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};

test.describe('Thread alert', () => {
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

  for (const theme of ['light', 'dark']) {
    test(`has accessible names, contrast, and unclipped focus in the ${theme} theme`, async ({
      page,
    }) => {
      await gotoStory(
        page,
        `patterns-ai-toolkit-thread-alert--${theme === 'dark' ? 'dark-theme' : 'semantic-variants'}`,
        'swc-thread-alert'
      );
      await expect(page.locator('swc-thread-alert')).toHaveCount(5);
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
          return {
            background: getComputedStyle(surface).backgroundColor,
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
