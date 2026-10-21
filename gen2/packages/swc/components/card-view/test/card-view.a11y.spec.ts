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
import { expect, type Locator, type Page, test } from '@playwright/test';

import { gotoStory } from '../../../utils/a11y-helpers.js';

const prototypes = [
  'option-1e',
  'option-1c',
  'option-1f',
  'option-2a',
  'option-2e',
  'option-3a',
  'option-4a',
  'option-5a',
  'option-6a',
];

async function openPrototype(
  page: Page,
  prototype: string,
  layout: string
): Promise<Locator> {
  const tag = `swc-card-view-${prototype}`;
  const root = await gotoStory(
    page,
    `components-card-view-${prototype}--${layout}`,
    tag
  );
  const view = root.locator(tag);
  await expect(view.locator('.item')).toHaveCount(100);
  await expect(view).toHaveCSS('overflow', 'auto');
  await expect
    .poll(() =>
      view
        .locator('.item')
        .first()
        .evaluate((element) => (element as HTMLElement).style.position)
    )
    .toBe('absolute');
  await expect
    .poll(() =>
      view
        .locator('img')
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0
          )
        )
    )
    .toBe(true);
  const dimensions = await view.evaluate((element) => ({
    height: element.getBoundingClientRect().height,
    maxHeight: window.innerHeight * 0.6,
    scrollHeight: element.scrollHeight,
    clientHeight: element.clientHeight,
  }));
  expect(dimensions.height).toBeLessThanOrEqual(dimensions.maxHeight + 1);
  expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);
  return view;
}

async function selectFirst(view: Locator): Promise<void> {
  await view.getByRole('checkbox').first().check();
  await expect(view.getByRole('status')).toHaveText('1 selected');
}

async function disableThird(view: Locator): Promise<void> {
  await view.evaluate(async (element) => {
    const collection = element as HTMLElement & {
      items: Array<{ id: string; disabled?: boolean }>;
      updateComplete: Promise<boolean>;
    };
    collection.items = collection.items.map((item, index) => ({
      ...item,
      disabled: index === 2,
    }));
    await collection.updateComplete;
  });
}

for (const prototype of prototypes) {
  for (const layout of ['grid', 'waterfall']) {
    test.describe(`CardView ${prototype} ${layout}`, () => {
      test('collection leaves room for outer focus outlines', async ({
        page,
      }) => {
        const view = await openPrototype(page, prototype, layout);
        const clearance = await view
          .locator('.item')
          .first()
          .evaluate((item) => {
            const host = item.getRootNode() as ShadowRoot;
            const bounds = item.getBoundingClientRect();
            const container = host.host.getBoundingClientRect();
            return {
              left: bounds.left - container.left,
              right: container.left + host.host.clientWidth - bounds.right,
              top: bounds.top - container.top,
            };
          });
        expect(clearance.left).toBeGreaterThanOrEqual(8);
        expect(clearance.right).toBeGreaterThanOrEqual(8);
        expect(clearance.top).toBeGreaterThanOrEqual(8);
      });

      test('accessibility snapshots preserve initial, selected, and disabled states', async ({
        page,
      }) => {
        const view = await openPrototype(page, prototype, layout);
        await expect(view).toMatchAriaSnapshot({
          name: `${prototype}-initial.aria.yml`,
        });
        await selectFirst(view);
        await expect(view).toMatchAriaSnapshot({
          name: `${prototype}-selected.aria.yml`,
        });
        await disableThird(view);
        await expect(view).toMatchAriaSnapshot({
          name: `${prototype}-disabled.aria.yml`,
        });
      });

      test('axe-core checks initial, selected, and disabled states', async ({
        page,
      }, testInfo) => {
        const view = await openPrototype(page, prototype, layout);
        const reports = [];
        for (const state of ['initial', 'selected', 'disabled']) {
          if (state === 'selected') {
            await selectFirst(view);
          } else if (state === 'disabled') {
            await disableThird(view);
          }
          const results = await new AxeBuilder({ page })
            .include('#storybook-root')
            .analyze();
          reports.push({ state, violations: results.violations });
        }
        await testInfo.attach('axe-results', {
          body: JSON.stringify(reports, null, 2),
          contentType: 'application/json',
        });
        for (const report of reports) {
          expect(report.violations, report.state).toEqual([]);
        }
      });

      if (prototype === 'option-2a' || prototype === 'option-2e') {
        test('single semantic row preserves visual arrow navigation', async ({
          page,
        }) => {
          const view = await openPrototype(page, prototype, layout);
          const grid = view.getByRole('grid');
          await expect(grid).toHaveAttribute('aria-rowcount', '1');
          await expect(grid).toHaveAttribute('aria-colcount', '100');
          await expect(grid.getByRole('row')).toHaveCount(1);
          const entries = grid.getByRole('gridcell');
          await expect(entries).toHaveCount(100);
          await expect(entries.last()).toHaveAttribute('aria-colindex', '100');
          const positions = await entries.evaluateAll((elements) =>
            elements.map((element) => {
              const bounds = element.getBoundingClientRect();
              return {
                left: bounds.left,
                top: bounds.top,
                width: bounds.width,
                height: bounds.height,
                disabled: element.getAttribute('aria-disabled') === 'true',
              };
            })
          );
          expect(
            new Set(positions.map((position) => position.left)).size
          ).toBeGreaterThan(1);
          if (layout === 'waterfall') {
            for (let index = 1; index < positions.length; index++) {
              const previous = positions[index - 1];
              const current = positions[index];
              if (current.left === previous.left) {
                expect(current.top).toBeGreaterThanOrEqual(
                  previous.top + previous.height
                );
              } else {
                expect(current.left).toBeGreaterThan(previous.left);
                expect(current.top).toBe(positions[0].top);
              }
            }
          }
          for (const key of [
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown',
            'ArrowUp',
          ]) {
            const horizontal = key === 'ArrowRight' || key === 'ArrowLeft';
            const forward = key === 'ArrowRight' || key === 'ArrowDown';
            const start = positions
              .map((position, index) => ({ ...position, index }))
              .filter(
                (position) =>
                  !position.disabled && position.top === positions[0].top
              )
              .sort((first, second) => second.left - first.left)[0].index;
            let next = start;
            if (
              prototype === 'option-2e' &&
              (horizontal || layout === 'waterfall')
            ) {
              if (!(horizontal && layout === 'waterfall')) {
                next = forward ? start + 1 : start - 1;
                while (positions[next]?.disabled) {
                  next += forward ? 1 : -1;
                }
              }
            } else {
              const current = positions[start];
              const candidates = positions
                .map((position, index) => {
                  const primary = horizontal
                    ? position.left - current.left
                    : position.top - current.top;
                  const overlap = horizontal
                    ? Math.min(
                        current.top + current.height,
                        position.top + position.height
                      ) - Math.max(current.top, position.top)
                    : Math.min(
                        current.left + current.width,
                        position.left + position.width
                      ) - Math.max(current.left, position.left);
                  const secondary = horizontal
                    ? position.top +
                      position.height / 2 -
                      current.top -
                      current.height / 2
                    : position.left - current.left;
                  return {
                    index,
                    position,
                    primary,
                    overlap,
                    score: Math.abs(primary) * 1000 + Math.abs(secondary),
                  };
                })
                .filter(
                  (candidate) =>
                    !candidate.position.disabled &&
                    (forward ? candidate.primary : -candidate.primary) >= 1 &&
                    candidate.overlap > 0
                )
                .sort((first, second) => first.score - second.score);
              next = candidates[0]?.index ?? start;
            }
            await entries.nth(start).focus();
            await page.keyboard.press(key);
            await expect(entries.nth(next)).toBeFocused();
          }
        });
      }

      if (prototype === 'option-2e') {
        test('Tab enters grid child controls and exits without a trap', async ({
          page,
        }) => {
          const view = await openPrototype(page, prototype, layout);
          await page
            .getByRole('button', { name: 'Photo library', exact: true })
            .focus();
          await page.keyboard.press('Tab');
          const entries = view.getByRole('gridcell');
          await expect(entries.first()).toBeFocused();
          await page.keyboard.press(
            layout === 'waterfall' ? 'ArrowDown' : 'ArrowRight'
          );
          await expect(entries.nth(1)).toBeFocused();
          await page.keyboard.press('Tab');
          const checkbox = entries.nth(1).getByRole('checkbox');
          const open = entries.nth(1).locator('[data-action="open"]');
          const share = entries.nth(1).locator('[data-action="share"]');
          await expect(checkbox).toBeFocused();
          await page.keyboard.press('Tab');
          await expect(open).toBeFocused();
          await page.keyboard.press('Tab');
          await expect(share).toBeFocused();
          await page.keyboard.press('Tab');
          await expect(
            page.getByRole('button', { name: 'Upload photos', exact: true })
          ).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(share).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(open).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(checkbox).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(entries.nth(1)).toBeFocused();
        });
      }

      if (['option-5a', 'option-6a'].includes(prototype)) {
        test('Tab enters the active card actions and exits without a trap', async ({
          page,
        }) => {
          const view = await openPrototype(page, prototype, layout);
          await page
            .getByRole('button', { name: 'Photo library', exact: true })
            .focus();
          await page.keyboard.press('Tab');
          const entries = view.getByRole('checkbox');
          await expect(entries.first()).toBeFocused();
          await page.keyboard.press('ArrowRight');
          await expect(entries.nth(1)).toBeFocused();
          await page.keyboard.press('Tab');
          const open = view.locator('[data-index="1"][data-action="open"]');
          const share = view.locator('[data-index="1"][data-action="share"]');
          await expect(open).toBeFocused();
          await page.keyboard.press('Tab');
          await expect(share).toBeFocused();
          await page.keyboard.press('Tab');
          await expect(
            page.getByRole('button', { name: 'Upload photos', exact: true })
          ).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(share).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(open).toBeFocused();
          await page.keyboard.press('Shift+Tab');
          await expect(entries.nth(1)).toBeFocused();
        });
      }
    });
  }
}
