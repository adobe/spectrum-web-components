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

import type { TextField } from '@adobe/spectrum-wc/text-field';

test.describe('Forms - Trusted keyboard interactions', () => {
  test('the demo validates and focuses fields associated from outside the form', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-forms--form-behavior',
      'swc-text-field'
    );
    const form = root.locator('form');
    const email = root.locator('swc-text-field');
    await email.evaluate(async (email: TextField) => {
      const form = email.closest('form');
      if (!form) {
        throw new Error('Forms demo is missing its form');
      }
      form.id = 'external-field-demo';
      email.setAttribute('form', form.id);
      form.before(email);
      await email.updateComplete;
    });
    await form.getByRole('radio', { name: 'Personal', exact: true }).click();
    const submit = form.getByRole('button', { name: 'Submit', exact: true });
    await submit.click();

    await expect(email).toHaveAttribute('field-status', 'invalid');
    await expect(email.locator('input')).toBeFocused();
    await expect(form.locator('output')).toContainText('"valid": false');

    const terms = form.locator('swc-checkbox');
    await expect(terms).toHaveAttribute('field-status', 'invalid');
    await form
      .getByRole('checkbox', { name: 'I agree to the terms of service' })
      .check();
    await expect(terms).not.toHaveAttribute('field-status');

    await email.evaluate(async (email: TextField) => {
      email.value = 'river@example.com';
      await email.updateComplete;
    });
    await submit.click();
    await expect(email).not.toHaveAttribute('field-status');
    await expect(form.locator('output')).toContainText('"valid": true');
    await expect(form.locator('output')).toContainText('river@example.com');
    await expect(form.locator('output')).toContainText('"accepted"');
  });

  test('other text fields control buttonless submission', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
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
    // Freeze after setup, then explicitly run each deferred Enter handler.
    await page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'));

    await test.step('one field submits without a button', async () => {
      await page.keyboard.press('Enter');
      await page.clock.runFor(0);
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
      await page.clock.runFor(0);
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
      await page.clock.runFor(0);
      await expect(form).toHaveAttribute(
        'data-submitters',
        JSON.stringify([null, null])
      );
    });
  });

  test('checkboxes do not control buttonless submission', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
    const root = await gotoStory(
      page,
      'patterns-forms--form-behavior',
      'swc-checkbox'
    );
    await root.locator('form').evaluate(async (example) => {
      if (!customElements.get('swc-checkbox')) {
        throw new Error('swc-checkbox is not defined');
      }
      const form = document.createElement('form');
      form.setAttribute('aria-label', 'Buttonless form with a checkbox');
      const email = document.createElement('swc-text-field');
      email.name = 'email';
      email.accessibleLabel = 'Email';
      email.value = 'river@example.com';
      const updates = document.createElement('swc-checkbox');
      updates.name = 'updates';
      updates.value = 'weekly';
      updates.accessibleLabel = 'Send me weekly updates';
      updates.checked = true;
      form.append(email, updates);
      example.replaceWith(form);
      const submissions: string[][][] = [];
      form.dataset.submissions = JSON.stringify(submissions);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        submissions.push(
          Array.from(new FormData(form, event.submitter), ([name, value]) => [
            name,
            String(value),
          ])
        );
        form.dataset.submissions = JSON.stringify(submissions);
      });
      await Promise.all([email.updateComplete, updates.updateComplete]);
    });
    const form = root.locator('form');
    const updates = form.locator('swc-checkbox');
    const entries = [
      ['email', 'river@example.com'],
      ['updates', 'weekly'],
    ];
    await form.locator('swc-text-field input').focus();
    // Freeze after setup, then explicitly run each deferred Enter handler.
    await page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'));

    await test.step('a text field submits alongside a checkbox', async () => {
      await page.keyboard.press('Enter');
      await page.clock.runFor(0);
      await expect(form).toHaveAttribute(
        'data-submissions',
        JSON.stringify([entries])
      );
    });

    await test.step('Enter in a checkbox needs a submit button', async () => {
      await updates.locator('input').focus();
      await page.keyboard.press('Enter');
      await page.clock.runFor(0);
      await expect(updates.locator('input')).toBeChecked();
      await expect(form).toHaveAttribute(
        'data-submissions',
        JSON.stringify([entries])
      );
    });
  });
});
