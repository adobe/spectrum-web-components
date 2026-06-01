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

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for Accordion component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure for
 * disclosure buttons, heading levels, region panels, aria-expanded,
 * aria-hidden, and slotted header actions.
 *
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Accordion - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default accordion', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--overview',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information"
      - heading "Billing address" [level=3]:
        - button "Billing address" [expanded]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Shipping address" [level=3]:
        - button "Shipping address"
    `);
  });

  test('should handle item states with open and disabled items', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--item-states',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information"
      - heading "Billing address" [level=3]:
        - button "Billing address" [expanded]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Payment method" [level=3]:
        - button "Payment method" [disabled]
    `);
  });

  test('should handle host disabled accordion', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-accordion--disabled-accordion',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information" [disabled]
      - heading "Billing address" [level=3]:
        - button "Billing address" [expanded] [disabled]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Shipping address" [level=3]:
        - button "Shipping address" [disabled]
    `);
  });

  test('should handle allow-multiple with two open panels', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--allow-multiple',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information" [expanded]
      - region "Personal information":
        - paragraph: Manage your name, email address, and contact details.
      - heading "Billing address" [level=3]:
        - button "Billing address" [expanded]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Shipping address" [level=3]:
        - button "Shipping address"
    `);
  });

  test('should handle quiet variant', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-accordion--quiet',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information"
      - heading "Billing address" [level=3]:
        - button "Billing address" [expanded]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Shipping address" [level=3]:
        - button "Shipping address"
    `);
  });

  test('should use heading level from accordion level attribute', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--heading-level',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=2]:
        - button "Personal information"
      - heading "Billing address" [level=2]:
        - button "Billing address" [expanded]
      - region "Billing address":
        - paragraph: Your billing address is used to verify your payment method and calculate taxes.
      - heading "Shipping address" [level=2]:
        - button "Shipping address"
    `);
  });

  test('should keep disclosure and slotted actions as separate controls', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--direct-actions',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information" [expanded]
      - button "Edit"
      - region "Personal information":
        - paragraph: Manage your name, email address, and contact details.
      - heading "Billing address" [level=3]:
        - button "Billing address"
      - button "Edit"
      - heading "Shipping address" [level=3]:
        - button "Shipping address"
      - button "Edit"
    `);
  });

  test('should handle accessibility story with actions and disabled item', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-accordion--accessibility',
      'swc-accordion'
    );
    await expect(root).toMatchAriaSnapshot(`
      - heading "Personal information" [level=3]:
        - button "Personal information" [expanded]
      - button "Edit"
      - region "Personal information":
        - paragraph: Manage your name, email address, and contact details.
      - heading "Billing address" [level=3]:
        - button "Billing address"
      - heading "Payment method" [level=3]:
        - button "Payment method" [disabled]
    `);
  });
});
