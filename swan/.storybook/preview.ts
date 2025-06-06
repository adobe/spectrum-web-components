import type { Preview } from '@storybook/web-components-vite';

// Import global design tokens
import '../src/tokens/index.css';
import '../src/tokens/light-vars.css';
import '../src/tokens/medium-vars.css';
import '../src/tokens/global-vars.css';
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },
    },
};

export default preview;
