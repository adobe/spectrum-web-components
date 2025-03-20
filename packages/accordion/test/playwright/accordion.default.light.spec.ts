/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { expect, test } from '@playwright/test';
import { axeTest } from '../../../../playwright/fixtures/axe-test';
import { componentTestSetup } from '../../../../playwright/utilities/playwright-helpers';

// Test suite for the Accordion component in Storybook
test.describe('Accordion', () => {
    test.describe('light', () => {
        test.describe('default', () => {
            test.beforeEach(async ({ page }) => {
                await componentTestSetup(page, 'accordion', 'default');
            });

            axeTest('should pass axe scan', async ({ makeAxeBuilder }) => {
                const accessibilityScanResults =
                    await makeAxeBuilder().analyze();

                expect(accessibilityScanResults.violations).toEqual([]);
            });
            test('should take snapshot', async ({ page }) => {
                await expect(page.locator('sp-theme')).toMatchAriaSnapshot(`
                  - heading "Heading 1" [level=3]:
                    - button "Heading 1"
                  - heading "Heading 2" [level=3]:
                    - button "Heading 2"
                  - heading "Heading 3" [level=3]:
                    - button "Heading 3"
                `);
            });
        });
        test.describe('open', () => {
            test.beforeEach(async ({ page }) => {
                await componentTestSetup(page, 'accordion', 'open');
            });

            axeTest('should pass axe scan', async ({ makeAxeBuilder }) => {
                const accessibilityScanResults =
                    await makeAxeBuilder().analyze();

                expect(accessibilityScanResults.violations).toEqual([]);
            });
            test('should take snapshot', async ({ page }) => {
                await expect(page.locator('sp-theme')).toMatchAriaSnapshot(`
                  - heading "Heading 1" [level=3]:
                    - button "Heading 1"
                  - heading "Heading 2" [level=3]:
                    - button "Heading 2" [expanded]
                  - region "Heading 2"
                  - heading "Heading 3" [level=3]:
                    - button "Heading 3"
                `);
            });
        });
        test.describe('allow multiple', () => {
            test.beforeEach(async ({ page }) => {
                await componentTestSetup(page, 'accordion', 'allow-multiple');
            });

            axeTest('should pass axe scan', async ({ makeAxeBuilder }) => {
                const accessibilityScanResults =
                    await makeAxeBuilder().analyze();

                expect(accessibilityScanResults.violations).toEqual([]);
            });
            test('should take snapshot', async ({ page }) => {
                await expect(page.locator('sp-theme')).toMatchAriaSnapshot(`
                  - heading "Heading 1" [level=3]:
                    - button "Heading 1"
                  - heading "Heading 2" [level=3]:
                    - button "Heading 2"
                  - heading "Heading 3" [level=3]:
                    - button "Heading 3"
                `);
            });
        });
    });
});
