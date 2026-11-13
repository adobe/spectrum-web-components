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

test.describe('Forms - Trusted keyboard interactions', () => {
  test('other text fields control buttonless submission', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-text-field--overview',
      'swc-text-field'
    );
    await root.locator('swc-text-field').evaluate(async (example) => {
      const form = document.createElement('form');
      form.setAttribute('aria-label', 'Buttonless form');
      const first = document.createElement('swc-text-field');
      first.name = 'first';
      first.accessibleLabel = 'First';
      first.value = 'River';
      first.required = true;
      form.append(first);
      example.replaceWith(form);
      const submitters: (string | null)[] = [];
      form.dataset.submitters = JSON.stringify(submitters);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitters.push(event.submitter?.id ?? null);
        form.dataset.submitters = JSON.stringify(submitters);
      });
      first.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          first.dataset.trustedEnter = String(event.isTrusted);
        }
      });
      await first.updateComplete;
    });
    const form = root.locator('form');
    const first = form.locator('swc-text-field[name="first"]');
    await first.locator('input').focus();

    await test.step('one field submits without a button', async () => {
      await page.keyboard.press('Enter');
      await expect(first).toHaveAttribute('data-trusted-enter', 'true');
      await expect(form).toHaveAttribute(
        'data-submitters',
        JSON.stringify([null])
      );
    });

    await test.step('a second field prevents buttonless submission', async () => {
      await form.evaluate(async (form) => {
        const second = document.createElement('swc-text-field');
        second.name = 'second';
        second.accessibleLabel = 'Second';
        form.append(second);
        await second.updateComplete;
      });
      await page.keyboard.press('Enter');
      // Queue behind deferred Enter handling before asserting no submission.
      await form.evaluate(
        () => new Promise<void>((resolve) => setTimeout(resolve, 0))
      );
      await expect(form).toHaveAttribute(
        'data-submitters',
        JSON.stringify([null])
      );
    });

    await test.step('removing the second field permits submission', async () => {
      await form
        .locator('swc-text-field[name="second"]')
        .evaluate((second) => second.remove());
      await page.keyboard.press('Enter');
      await expect(form).toHaveAttribute(
        'data-submitters',
        JSON.stringify([null, null])
      );
    });
  });
});
