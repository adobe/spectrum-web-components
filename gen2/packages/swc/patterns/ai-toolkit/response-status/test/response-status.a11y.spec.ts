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
import { gotoStory, waitForCustomElement } from '@swc-test-helpers/playwright';

import type { ResponseStatusStep } from '../response-status-step/ResponseStatusStep.js';

for (const hasDescription of [false, true]) {
  test(`active step shimmer stays inside glyphs ${hasDescription ? 'with' : 'without'} a description`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--steps',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    await page.evaluate(async (hasDescription) => {
      const fixture = document.createElement('div');
      fixture.id = 'shimmer-fixture';
      fixture.style.cssText =
        'position:fixed;inset:20px auto auto 20px;background:white;color-scheme:light;padding:20px;z-index:1000';
      const step = document.createElement('swc-response-status-step');
      step.style.animation = 'none';
      step.innerHTML = `<span slot="label">HHHH HHHH</span>${
        hasDescription
          ? '<span slot="description">Execution details</span>'
          : ''
      }`;
      fixture.append(step);
      document.body.append(fixture);
      await step.updateComplete;
      await document.fonts.ready;
    }, hasDescription);

    const host = page.locator('#shimmer-fixture swc-response-status-step');
    const title = host.locator('.swc-ResponseStatusStep-title');
    const shimmer = host.locator('.swc-ResponseStatusStep-titleShimmer');
    if (hasDescription) {
      await host.locator('[slot="label"]').evaluate((element) => {
        element.textContent = 'HHHH HHHH HHHH';
      });
      await expect(shimmer).toHaveText('HHHH HHHH HHHH');
      await title.evaluate((element: HTMLElement) => {
        element.style.maxInlineSize = '60px';
      });
    }
    await shimmer.evaluate((element: HTMLElement) => {
      element.style.visibility = 'hidden';
    });
    const baseline = await title.screenshot({ scale: 'css' });
    await shimmer.evaluate((element: HTMLElement) => {
      element.style.removeProperty('visibility');
    });

    let changedGlyphPixels = 0;
    for (const time of [0, 360, 720, 1080, 1440, 1799]) {
      await host.evaluate((element: ResponseStatusStep, time) => {
        for (const animation of element.shadowRoot!.getAnimations()) {
          animation.pause();
          animation.currentTime = time;
        }
      }, time);
      const frame = await title.screenshot({ scale: 'css' });
      const pixels = await page.evaluate(
        async ({ baseline, frame }) => {
          const readPixels = async (png: string): Promise<ImageData> => {
            const image = new Image();
            image.src = `data:image/png;base64,${png}`;
            await image.decode();
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d')!;
            context.drawImage(image, 0, 0);
            return context.getImageData(0, 0, image.width, image.height);
          };
          const plain = await readPixels(baseline);
          const animated = await readPixels(frame);
          let outsideGlyphs = 0;
          let changedGlyphs = 0;
          for (let index = 0; index < plain.data.length; index += 4) {
            const x = (index / 4) % plain.width;
            const y = Math.floor(index / 4 / plain.width);
            // Ignore the one-pixel glyph fringe, which masks and text can
            // antialias differently, without tolerating a painted rectangle.
            const background = [-1, 0, 1].every((dy) =>
              [-1, 0, 1].every((dx) => {
                const offset = ((y + dy) * plain.width + x + dx) * 4;
                return (
                  x + dx >= 0 &&
                  x + dx < plain.width &&
                  y + dy >= 0 &&
                  y + dy < plain.height &&
                  [0, 1, 2].every(
                    (channel) => plain.data[offset + channel] === 255
                  )
                );
              })
            );
            const changed = [0, 1, 2].some(
              (channel) =>
                Math.abs(
                  plain.data[index + channel] - animated.data[index + channel]
                ) > 2
            );
            if (changed) {
              if (background) {
                outsideGlyphs++;
              } else {
                changedGlyphs++;
              }
            }
          }
          return { outsideGlyphs, changedGlyphs };
        },
        {
          baseline: baseline.toString('base64'),
          frame: frame.toString('base64'),
        }
      );
      expect(pixels.outsideGlyphs, `Shimmer at ${time}ms`).toBe(0);
      changedGlyphPixels += pixels.changedGlyphs;
    }
    expect(changedGlyphPixels, 'The shimmer remains visible').toBeGreaterThan(
      0
    );
    await host.evaluate(async (element: ResponseStatusStep) => {
      element.status = 'complete';
      await element.updateComplete;
    });
    expect(
      await shimmer.evaluate(
        (element) => element.getAnimations({ subtree: true }).length
      )
    ).toBe(0);
    await expect(title).toBeVisible();
    await host.evaluate(async (element: ResponseStatusStep) => {
      element.status = 'active';
      await element.updateComplete;
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(shimmer).toBeHidden();
    await expect(title).toBeVisible();
  });
}

/**
 * ARIA snapshot tests for response status.
 * WCAG axe scans run via test-storybook on stories tagged `a11y`.
 */

test.describe('ResponseStatus - ARIA Snapshots', () => {
  test('should expose complete disclosure with slotted label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--accessibility',
      'swc-response-status'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Thought for 12 seconds"
    `);
  });

  test('should expose active status label without step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--status-only',
      'swc-response-status'
    );
    const status = root.locator('[role="status"]').first();
    await expect(status).toHaveText('Searching repositories for Europe trips');
    const activeStatus = root.locator('swc-response-status').first();
    await expect(activeStatus).toMatchAriaSnapshot(`
      - status: Searching repositories for Europe trips
    `);
    await expect(activeStatus.locator('[aria-expanded]')).toHaveCount(0);
    await expect(activeStatus.locator('[aria-controls]')).toHaveCount(0);
    await expect(activeStatus.getByRole('button')).toHaveCount(0);
  });

  test('should expose active disclosure with expanded step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--steps',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    // The header's button is inside the stable row; per-step disclosures
    // are nested step toggles. Both take their name from content.
    const toggle = root.locator(
      'button.swc-ResponseStatus-headerTrail--button'
    );
    await expect(toggle).toHaveCount(1, { timeout: 10000 });
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toContainText(
      'Searching repositories for Europe trips'
    );
    await expect(toggle).toHaveAccessibleName(
      'Searching repositories for Europe trips'
    );
    const icon = root.locator('.swc-ResponseStatus-leadingIcon');
    const bounds = await icon.boundingBox();
    expect(bounds).not.toBeNull();
    await page.mouse.click(
      bounds!.x + bounds!.width / 2,
      bounds!.y + bounds!.height / 2
    );
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    // Scoped to the timeline panel: each step's description scroll region is
    // also `role="group"`, so an unscoped selector would match more than one.
    await expect(
      root.locator('.swc-ResponseStatus-panel[role="group"]')
    ).toHaveAttribute('aria-label', 'Execution steps');
  });

  test('should expose per-step disclosures collapsed by default', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--steps',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    // Steps story order: complete, active, complete, stopped. Steps start
    // collapsed by default; the header disclosure is excluded by class.
    const stepToggles = root.locator(
      'button[aria-expanded]:not(.swc-ResponseStatus-headerTrail--button)'
    );
    await expect(stepToggles).toHaveCount(4, { timeout: 10000 });
    await expect(
      root.locator(
        'button[aria-expanded="true"]:not(.swc-ResponseStatus-headerTrail--button)'
      )
    ).toHaveCount(0);
  });

  test('should expose collapsed disclosure with slotted label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--overview',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    const toggle = root.locator(
      'button.swc-ResponseStatus-headerTrail--button[aria-expanded="false"]'
    );
    await expect(toggle).toHaveCount(1);
    await expect(toggle).toContainText(
      'Searching repositories for Europe trips'
    );
  });
});
