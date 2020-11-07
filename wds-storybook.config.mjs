import { storybookPlugin } from '@web/dev-server-storybook';

export default {
    nodeResolve: true,
    watch: true,
    open: true,
    plugins: [storybookPlugin({ type: 'web-components' })],
};
