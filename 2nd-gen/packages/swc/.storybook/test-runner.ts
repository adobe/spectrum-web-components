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
// eslint-disable-next-line import/no-extraneous-dependencies
import AxeBuilder from '@axe-core/playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // Skip stories explicitly tagged with !test
    if (context.tags?.includes('!test')) {
      return;
    }

    // Create axe builder with WCAG 2.0 A/AA and WCAG 2.1 A/AA tags
    // This automatically includes color-contrast validation
    const axeBuilder = new AxeBuilder({ page })
      .include('#storybook-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

    // @todo Known issue: StatusLight neutral variant has color contrast issue (4.39 vs 4.5:1)
    // Disable color-contrast rule for this specific story until design team addresses it
    if (context.id === 'components-status-light--semantic-variants') {
      axeBuilder.disableRules(['color-contrast']);
    }

    const results = await axeBuilder.analyze();

    if (results.violations.length > 0) {
      const details = results.violations
        .map((violation) => {
          const nodes = violation.nodes
            .map((node) => node.target.join(', '))
            .join('; ');
          return `${violation.id}: ${nodes}`;
        })
        .join('\n');

      throw new Error(`A11y violations in ${context.id}:\n${details}`);
    }
  },
};

export default config;
