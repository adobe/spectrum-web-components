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
import type { Page } from 'playwright';

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

// Wait for web fonts to settle so axe measures color-contrast against the final
// glyphs, not the fallback face. `document.fonts.ready` resolves even when the
// font CDN fails (unlike the custom `typekit-loaded` event), and the timeout
// race guarantees the scan never hangs on a slow or blocked CDN.
const FONT_SETTLE_TIMEOUT_MS = 3000;
const waitForFonts = (page: Page) =>
  page.evaluate(
    (timeout: number) =>
      new Promise<void>((resolve) => {
        Promise.resolve(document.fonts.ready).then(() => resolve());
        setTimeout(resolve, timeout);
      }),
    FONT_SETTLE_TIMEOUT_MS
  );

const config: TestRunnerConfig = {
  // Render every story with reduced motion so axe never scans a mid-animation
  // frame (e.g. pixel-loader, response-status agentic steps), which produces
  // flaky color-contrast violations and shifting target elements.
  async preVisit(page) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  },
  async postVisit(page, context) {
    const storyContext = (await getStoryContext(
      page,
      context
    )) as StorybookTestContext;

    if (storyContext.tags?.includes('!test')) {
      return;
    }

    const a11yConfig = storyContext.parameters?.a11y;

    // Only the story view is scanned. In docs mode Storybook renders into
    // `#storybook-docs`, with each embedded example in its own nested
    // docs-story canvas, so an axe run scoped to `#storybook-root` never
    // reached the docs content: the earlier docs pass was a silent no-op.
    // Docs-view a11y coverage is tracked separately with the vitest-addon
    // migration.
    await waitForFonts(page);

    const axeBuilder = new AxeBuilder({ page })
      .include('#storybook-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

    if (a11yConfig?.disabledRules && Array.isArray(a11yConfig.disabledRules)) {
      axeBuilder.disableRules(a11yConfig.disabledRules);
    }

    const results = await axeBuilder.analyze();

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

      throw new Error(`A11y violations in ${context.id}:\n${details}`);
    }
  },
};

export default config;
