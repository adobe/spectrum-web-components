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
 * Accessibility tests for Tabs component (2nd Generation)
 *
 * ARIA snapshot tests validate the accessibility tree structure
 * for tablist, tab, and tabpanel roles, their relationships
 * (aria-controls, aria-labelledby), and states (aria-selected,
 * aria-disabled, aria-hidden).
 *
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('Tabs - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default tabs', async ({
    page,
  }) => {
    const root = await gotoStory(page, 'components-tabs--overview', 'swc-tabs');
    await expect(root).toMatchAriaSnapshot(`
      - tablist "Product details":
        - tab "Overview" [selected]
        - tab "Specifications"
        - tab "Guidelines"
      - tabpanel "Overview":
        - paragraph: Overview content for the selected tab.
    `);
  });

  test('should handle anatomy with multiple tab variations', async ({
    page,
  }) => {
    const root = await gotoStory(page, 'components-tabs--anatomy', 'swc-tabs');
    const firstTabGroup = root.locator(
      'swc-tabs[accessible-label="Text-only example"]'
    );
    await expect(firstTabGroup).toMatchAriaSnapshot(`
      - tablist "Text-only example":
        - tab "Overview" [selected]
        - tab "Specifications"
        - tab "Guidelines"
      - tabpanel "Overview":
        - paragraph: Overview content for the selected tab.
    `);
    const iconTabGroup = root.locator(
      'swc-tabs[accessible-label="Icon and text example"]'
    );
    await expect(iconTabGroup).toMatchAriaSnapshot(`
      - tablist "Icon and text example":
        - tab "Dashboard" [selected]
        - tab "Reports"
        - tab "Settings"
      - tabpanel "Dashboard":
        - paragraph: Dashboard content.
    `);
  });

  test('should handle vertical direction', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-tabs--directions',
      'swc-tabs'
    );
    await expect(root.locator('swc-tabs[direction="vertical"]'))
      .toMatchAriaSnapshot(`
      - tablist "Vertical example":
        - tab "Overview" [selected]
        - tab "Specifications"
        - tab "Guidelines"
      - tabpanel "Overview":
        - paragraph: Overview content for the selected tab.
    `);
  });

  test('should handle disabled container', async ({ page }) => {
    const root = await gotoStory(page, 'components-tabs--states', 'swc-tabs');
    await expect(root.locator('swc-tabs[disabled]')).toMatchAriaSnapshot(`
      - tablist "Disabled container" [disabled]:
        - tab "Overview" [selected]
        - tab "Specifications"
        - tab "Guidelines"
      - tabpanel "Overview":
        - paragraph: Overview content for the selected tab.
    `);
  });

  test('should handle individual disabled tab', async ({ page }) => {
    const root = await gotoStory(page, 'components-tabs--states', 'swc-tabs');
    await expect(root.locator('swc-tabs[accessible-label="Individual states"]'))
      .toMatchAriaSnapshot(`
      - tablist "Individual states":
        - tab "Default"
        - tab "Selected" [selected]
        - tab "Disabled" [disabled]
      - tabpanel "Selected":
        - paragraph: Selected tab content.
    `);
  });

  test('should render density variants story', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-tabs--density-variants',
      'swc-tabs'
    );
    const tabGroups = root.locator('swc-tabs');
    const count = await tabGroups.count();
    expect(
      count,
      'renders regular and compact examples'
    ).toBeGreaterThanOrEqual(2);
  });
});
