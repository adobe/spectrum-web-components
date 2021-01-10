import { addons } from '@web/storybook-prebuilt/addons.js';
import yourTheme from './theme.js';

addons.setConfig({
    theme: yourTheme,
    showRoots: false,
});
