import {
    addParameters,
    addDecorator,
    setCustomElements,
    withA11y,
    withKnobs,
    withWebComponentsKnobs,
} from '@open-wc/demoing-storybook';
import { swcThemeDecoratorWithConfig } from '@spectrum-web-components/story-decorator/decorator.js';

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withWebComponentsKnobs);
addDecorator(swcThemeDecoratorWithConfig({ bundled: false }));

addParameters({
    a11y: {
        config: {},
        options: {
            checks: { 'color-contrast': { options: { noScroll: true } } },
            restoreScroll: true,
        },
    },
    docs: {
        iframeHeight: '200px',
    },
});

async function run() {
    const customElements = await (
        await fetch(new URL('../custom-elements.json', import.meta.url))
    ).json();
    setCustomElements(customElements);
}

run();
