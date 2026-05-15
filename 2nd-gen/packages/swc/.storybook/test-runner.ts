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
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

type StorybookA11yConfig = {
  disabledRules?: string[];
  exclude?: Record<string, string[]>;
};

type StorybookTestContext = {
  tags?: string[];
  parameters?: {
    a11y?: StorybookA11yConfig;
  };
};

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    const storyContext = (await getStoryContext(
      page,
      context
    )) as StorybookTestContext;

    if (storyContext.tags?.includes('!test')) {
      return;
    }

    const a11yConfig = storyContext.parameters?.a11y;
    const analyzeView = async (
      targetPage: typeof page,
      viewLabel: 'story' | 'docs'
    ): Promise<string | null> => {
      await targetPage.waitForFunction(() => !(window as any).axe?.running);

      const axeBuilder = new AxeBuilder({ page: targetPage })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

      if (
        a11yConfig?.disabledRules &&
        Array.isArray(a11yConfig.disabledRules)
      ) {
        axeBuilder.disableRules(a11yConfig.disabledRules);
      }

      // Both addon-a11y and the test-runner run axe in the same preview iframe.
      // The waitForFunction above can resolve just before the addon starts a new run,
      // so analyze() may find axe already running. Retry once after waiting.
      let results;
      try {
        results = await axeBuilder.analyze();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes('Axe is already running')
        ) {
          await targetPage.waitForFunction(() => !(window as any).axe?.running);
          results = await axeBuilder.analyze();
        } else {
          throw error;
        }
      }

      // Filter violations using rule-specific exclusions from story parameters.
      // parameters.a11y.exclude: { 'rule-id': ['selector1', 'selector2'] }
      // Only the specified rule is affected; all other rules still validate the element.
      const excludeMap = a11yConfig?.exclude;

      const violations = excludeMap
        ? results.violations
            .map((violation) => {
              const excludedSelectors = excludeMap[violation.id];
              if (!excludedSelectors) {
                return violation;
              }

              const remainingNodes = violation.nodes.filter(
                (node) =>
                  !node.target.some((target) =>
                    excludedSelectors.some((selector) =>
                      String(target).includes(selector)
                    )
                  )
              );

              return { ...violation, nodes: remainingNodes };
            })
            .filter((violation) => violation.nodes.length > 0)
        : results.violations;

      if (violations.length > 0) {
        const details = violations
          .map((violation) => {
            const nodeDetails = violation.nodes
              .map((node) => {
                const target = node.target.join(', ');
                const failureSummary =
                  node.failureSummary?.trim() ?? 'No summary';
                return `  - Target: ${target}\n    Summary: ${failureSummary}`;
              })
              .join('\n');

            return [
              `${violation.id} (${violation.impact ?? 'unknown impact'})`,
              `Description: ${violation.description}`,
              `Help: ${violation.help}`,
              `More info: ${violation.helpUrl}`,
              'Nodes:',
              nodeDetails,
            ].join('\n');
          })
          .join('\n\n');

        return `A11y violations in ${context.id} (${viewLabel} view):\n${details}`;
      }

      return null;
    };

    // Storybook test-runner smoke tests default to story view.
    const failures: string[] = [];
    const storyFailure = await analyzeView(page, 'story');
    if (storyFailure) {
      failures.push(storyFailure);
    }

    // Check docs on a separate page so Storybook test-runner state remains intact.
    const docsPage = await page.context().newPage();
    try {
      const docsUrl = new URL(page.url());
      docsUrl.searchParams.set('id', context.id);
      docsUrl.searchParams.set('viewMode', 'docs');
      await docsPage.goto(docsUrl.toString(), { waitUntil: 'networkidle' });
      const docsFailure = await analyzeView(docsPage, 'docs');
      if (docsFailure) {
        failures.push(docsFailure);
      }
    } finally {
      await docsPage.close();
    }

    if (failures.length > 0) {
      throw new Error(failures.join('\n\n'));
    }
  },
};

export default config;
