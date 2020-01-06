import {
    addParameters,
    addDecorator,
    setCustomElements,
    withA11y,
    withKnobs,
    withWebComponentsKnobs,
    html,
} from '@open-wc/demoing-storybook';
import '@spectrum-web-components/theme';

async function run() {
    const customElements = await (await fetch(
        new URL('../custom-elements.json', import.meta.url)
    )).json();
    setCustomElements(customElements);

    addDecorator(withA11y);
    addDecorator(withKnobs);
    addDecorator(withWebComponentsKnobs);
    addDecorator(
        (story) => html`
            <sp-theme id="root-theme" color="light" scale="medium">
                ${story()}
            </sp-theme>
        `
    );

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
}

run();
