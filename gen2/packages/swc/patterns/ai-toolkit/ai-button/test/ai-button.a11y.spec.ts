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

import { expect, test } from '@playwright/test';
import { gotoStory } from '@swc-test-helpers/playwright';

import type { AiButton } from '../AiButton.js';

test('disabled custom icons do not dispatch ancestor capture clicks', async ({
  page,
}) => {
  const root = await gotoStory(
    page,
    'patterns-ai-toolkit-ai-button--overview',
    'swc-ai-button'
  );
  const host = root.locator('swc-ai-button').first();
  await host.evaluate((element: AiButton) => {
    const icon = element.shadowRoot!.querySelector('svg')!.cloneNode(true);
    (icon as SVGSVGElement).setAttribute('slot', 'icon');
    element.append(icon);
    element.disabled = true;
  });
  await root.evaluate((element) => {
    element.setAttribute('data-capture-clicks', '0');
    element.addEventListener(
      'click',
      () => {
        const count = Number(element.getAttribute('data-capture-clicks'));
        element.setAttribute('data-capture-clicks', String(count + 1));
      },
      true
    );
  });

  const icon = host.locator('svg[slot="icon"]');
  await expect(icon).toHaveCSS('pointer-events', 'none');
  await icon.click({ force: true });
  await expect(root).toHaveAttribute('data-capture-clicks', '0');
  await host.evaluate((element: AiButton) => {
    element.disabled = false;
  });
  await icon.click();
  await expect(root).toHaveAttribute('data-capture-clicks', '1');
});

for (const mode of ['light', 'dark'] as const) {
  for (const background of ['black', 'white'] as const) {
    test(`content contrast in ${mode} over ${background}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await gotoStory(
        page,
        'patterns-ai-toolkit-ai-button--overview',
        'swc-ai-button'
      );
      await page.evaluate(
        ({ mode, background }) => {
          const fixture = document.createElement('div');
          fixture.id = 'contrast-fixture';
          fixture.style.background = background;
          fixture.style.padding = '32px';
          fixture.style.colorScheme = mode;
          fixture.append(document.createElement('swc-ai-button'));
          document.body.prepend(fixture);
        },
        { mode, background }
      );
      const host = page.locator('#contrast-fixture swc-ai-button');

      for (const size of ['m', 'l', 'xl'] as const) {
        for (const iconOnly of [false, true]) {
          await host.evaluate(
            async (element: AiButton, { size, iconOnly }) => {
              element.size = size;
              element.textContent = iconOnly ? '' : 'Ask AI';
              element.accessibleLabel = iconOnly ? 'Ask AI' : undefined;
              await element.updateComplete;
            },
            { size, iconOnly }
          );
          const button = host.locator('button');

          for (const state of ['default', 'hover', 'pressed'] as const) {
            await page.mouse.move(0, 0);
            if (state !== 'default') {
              await button.hover();
            }
            if (state === 'pressed') {
              await page.mouse.down();
            }
            try {
              const box = (await button.boundingBox())!;
              const clip = {
                x: Math.floor(box.x),
                y: Math.floor(box.y),
                width: Math.ceil(box.width + box.x - Math.floor(box.x)),
                height: Math.ceil(box.height + box.y - Math.floor(box.y)),
              };
              const regions = await button.evaluate(
                (element, clip) =>
                  ['.swc-AiButton-label', '.swc-AiButton-icon'].map(
                    (selector) => {
                      const content =
                        element.querySelector<HTMLElement>(selector)!;
                      const rect = content.getBoundingClientRect();
                      const region = {
                        color: getComputedStyle(content).color,
                        x: rect.x - clip.x,
                        y: rect.y - clip.y,
                        width: rect.width,
                        height: rect.height,
                      };
                      content.style.visibility = 'hidden';
                      return region;
                    }
                  ),
                clip
              );
              // Sample the fully composited glass behind the content; gradient
              // and backdrop-filter contrast cannot be inferred from one token.
              const screenshot = await page.screenshot({ clip, scale: 'css' });
              const ratios = await page.evaluate(
                async ({ png, regions }) => {
                  const image = new Image();
                  image.src = `data:image/png;base64,${png}`;
                  await image.decode();
                  const canvas = document.createElement('canvas');
                  canvas.width = image.width;
                  canvas.height = image.height;
                  const context = canvas.getContext('2d', {
                    willReadFrequently: true,
                  })!;
                  context.drawImage(image, 0, 0);
                  const luminance = (channels: number[]): number =>
                    channels.reduce((sum, channel, index) => {
                      const value = channel / 255;
                      const linear =
                        value <= 0.04045
                          ? value / 12.92
                          : ((value + 0.055) / 1.055) ** 2.4;
                      return sum + linear * [0.2126, 0.7152, 0.0722][index];
                    }, 0);
                  return regions.map((region) => {
                    if (region.width === 0) {
                      return null;
                    }
                    const [red, green, blue, alpha = 1] = region.color
                      .match(/[\d.]+/g)!
                      .map(Number);
                    let minimum = Infinity;
                    for (
                      let y = Math.ceil(region.y);
                      y < Math.floor(region.y + region.height);
                      y++
                    ) {
                      for (
                        let x = Math.ceil(region.x);
                        x < Math.floor(region.x + region.width);
                        x++
                      ) {
                        const pixel = [
                          ...context.getImageData(x, y, 1, 1).data,
                        ].slice(0, 3);
                        const foreground = [red, green, blue].map(
                          (channel, index) =>
                            channel * alpha + pixel[index] * (1 - alpha)
                        );
                        const foregroundLuminance = luminance(foreground);
                        const backgroundLuminance = luminance(pixel);
                        const contrast =
                          (Math.max(foregroundLuminance, backgroundLuminance) +
                            0.05) /
                          (Math.min(foregroundLuminance, backgroundLuminance) +
                            0.05);
                        minimum = Math.min(minimum, contrast);
                      }
                    }
                    return minimum;
                  });
                },
                { png: screenshot.toString('base64'), regions }
              );
              if (!iconOnly) {
                expect(
                  ratios[0],
                  `${size} ${state} label`
                ).toBeGreaterThanOrEqual(4.5);
              }
              expect(ratios[1], `${size} ${state} icon`).toBeGreaterThanOrEqual(
                3
              );
            } finally {
              await button
                .locator('.swc-AiButton-label, .swc-AiButton-icon')
                .evaluateAll((elements) =>
                  elements.forEach((element) => {
                    (element as HTMLElement).style.removeProperty('visibility');
                  })
                );
              await page.mouse.up();
            }
          }
        }
      }
    });
  }
}
