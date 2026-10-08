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
  'baseline',
  ...Array.from({ length: 8 }, (_, index) => `option-${index + 1}`),
];

async function openPrototype(
  page: Page,
  prototype: string,
  layout: string
): Promise<Locator> {
  const suffix = prototype === 'baseline' ? '' : `-${prototype}`;
  const tag = `swc-card-view${suffix}`;
  const root = await gotoStory(
    page,
    `components-card-view${suffix}--${layout}`,
    tag
  );
  const view = root.locator(tag);
  await expect(view.locator('.item')).toHaveCount(12);
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
  return view;
}

async function selectFirst(view: Locator, prototype: string): Promise<void> {
  if (prototype === 'option-6') {
    await view.getByRole('menuitemcheckbox').first().press('Space');
  } else {
    await view.getByRole('checkbox').first().check();
  }
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
      test('accessibility snapshots preserve initial, selected, and disabled states', async ({
        page,
      }) => {
        const view = await openPrototype(page, prototype, layout);
        await expect(view).toMatchAriaSnapshot({
          name: `${prototype}-initial.aria.yml`,
        });
        await selectFirst(view, prototype);
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
            await selectFirst(view, prototype);
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
        expect(reports.flatMap((report) => report.violations)).toEqual([]);
      });
    });
  }
}
