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

    // Handle story-specific axe configuration
    const a11yConfig = context.parameters?.a11y;

    if (a11yConfig) {
      // Support disabling entire rules via parameters.a11y.disabledRules
      if (a11yConfig.disabledRules && Array.isArray(a11yConfig.disabledRules)) {
        axeBuilder.disableRules(a11yConfig.disabledRules);
      }

      // Support excluding specific elements from specific rules
      // via parameters.a11y.exclude: { 'rule-name': ['selector1', 'selector2'] }
      // @todo Current implementation excludes elements from ALL rules, not just the specified rule.
      // Need to investigate axe-core options API for true rule-specific exclusions.
      if (a11yConfig.exclude && typeof a11yConfig.exclude === 'object') {
        Object.entries(a11yConfig.exclude).forEach(([_rule, selectors]) => {
          if (Array.isArray(selectors)) {
            selectors.forEach((selector) => {
              axeBuilder.exclude(selector);
            });
          }
        });
      }
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
