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

import { devices, type PlaywrightTestConfig } from '@playwright/test';

const reportOutputFolder = '2nd-gen/test/playwright-a11y/report';
const junitOutputFile = '2nd-gen/test/playwright-a11y/results/junit.xml';

export const a11yReporter = (
  isCI: boolean
): PlaywrightTestConfig['reporter'] =>
  isCI
    ? [
        ['html', { outputFolder: reportOutputFolder }],
        ['junit', { outputFile: junitOutputFile }],
        ['list'],
      ]
    : [['html', { outputFolder: reportOutputFolder }], ['list']];

export const a11yUse: PlaywrightTestConfig['use'] = {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
};

export const firstGenA11yProject: PlaywrightTestConfig['projects'][number] = {
  name: '1st-gen',
  testDir: './1st-gen/',
  testMatch: '**/packages/*/test/**/*.a11y.spec.ts',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:8080',
  },
};

export const secondGenA11yProject: PlaywrightTestConfig['projects'][number] = {
  name: '2nd-gen',
  testDir: './2nd-gen/',
  testMatch: [
    '**/packages/swc/components/*/test/**/*.a11y.spec.ts',
    '**/packages/swc/patterns/conversational-ai/*/test/**/*.a11y.spec.ts',
  ],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:6006',
  },
};

export const firstGenStorybookServer: PlaywrightTestConfig['webServer'][number] =
  {
    command: 'cd 1st-gen && yarn storybook',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  };

export const secondGenComponentsOnlyStorybookServer: PlaywrightTestConfig['webServer'][number] =
  {
    command:
      'cd 2nd-gen/packages/swc && SWC_STORYBOOK_MODE=ci-a11y yarn storybook',
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  };
