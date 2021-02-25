import {
    addDecorator,
    setCustomElements,
} from '@web/storybook-prebuilt/web-components.js';
// import customElemenents from '../custom-elements.json';
import { swcThemeDecoratorWithConfig } from '@spectrum-web-components/story-decorator/decorator.js';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    layout: 'fullscreen',
};

addDecorator(swcThemeDecoratorWithConfig({ bundled: false }));

// setCustomElements(customElemenents);
