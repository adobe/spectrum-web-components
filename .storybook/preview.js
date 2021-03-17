import { addDecorator } from '@web/storybook-prebuilt/web-components.js';
import { swcThemeDecoratorWithConfig } from '@spectrum-web-components/story-decorator/decorator.js';

export const parameters = {
    controls: { expanded: true },
    layout: 'fullscreen',
};

addDecorator(swcThemeDecoratorWithConfig({ bundled: false }));
