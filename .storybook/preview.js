import { setCustomElementsManifest } from '@web/storybook-prebuilt/web-components.js';
import { swcThemeDecorator } from '@future-ui/story-decorator/decorator.js';
import cem from './custom-elements.json';

setCustomElementsManifest(cem);

export const parameters = {
    docs: {
        inlineStories: true,
        source: {
            type: 'dynamic',
            language: 'html',
        },
        iframeHeight: '200px',
    },
    controls: { expanded: true },
    layout: 'fullscreen',
};

export const decorators = [swcThemeDecorator];
