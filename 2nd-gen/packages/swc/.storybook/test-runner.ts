import AxeBuilder from '@axe-core/playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
    async postVisit(page, context) {
        const results = await new AxeBuilder({ page })
            .include('#storybook-root')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

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
