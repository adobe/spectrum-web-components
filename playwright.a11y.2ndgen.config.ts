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

import type { PlaywrightTestConfig } from '@playwright/test';
import {
  a11yReporter,
  a11yUse,
  secondGenA11yProject,
  secondGenComponentsOnlyStorybookServer,
} from './playwright.a11y.shared.config';

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: a11yReporter(!!process.env.CI),

  use: a11yUse,

  projects: [secondGenA11yProject],

  webServer: secondGenComponentsOnlyStorybookServer,
};

export default config;
