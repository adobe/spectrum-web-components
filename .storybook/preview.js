import {
    addParameters,
    addDecorator,
    setCustomElements,
    withA11y,
    withKnobs,
    withWebComponentsKnobs,
    html,
    select,
} from '@open-wc/demoing-storybook';
import '@spectrum-web-components/theme';

// While https://github.com/open-wc/open-wc/issues/1210 and
// go https://github.com/popperjs/popper-core/issues/933 persist
// without an acceptable outcome, this allows the built storybook
// to function with `process.env.NODE_ENV`... :/
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

async function run() {
    const customElements = await (await fetch(
        new URL('../custom-elements.json', import.meta.url)
    )).json();
    setCustomElements(customElements);

    addDecorator(withA11y);
    addDecorator(withKnobs);
    addDecorator(withWebComponentsKnobs);
    const colorOptions = {
        Lightest: 'lightest',
        Light: 'light',
        Dark: 'dark',
    };
    let defaultColor = colorOptions.Light;
    const scaleOptions = {
        Medium: 'medium',
        Large: 'large',
    };
    let defaultScale = scaleOptions.Medium;
    addDecorator((story) => {
        const color = select('Color', colorOptions, defaultColor, 'Theme');
        defaultColor = color;
        const scale = select('Scale', scaleOptions, defaultScale, 'Theme');
        defaultScale = scale;
        return html`
            <sp-theme id="root-theme" color=${color} scale=${scale}>
                ${story()}
            </sp-theme>
        `;
    });

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
