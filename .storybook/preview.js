import {
    addParameters,
    addDecorator,
    setCustomElements,
    withA11y,
    withKnobs,
    withWebComponentsKnobs,
    html,
    select,
    boolean,
} from '@open-wc/demoing-storybook';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

// While https://github.com/open-wc/open-wc/issues/1210 and
// go https://github.com/popperjs/popper-core/issues/933 persist
// without an acceptable outcome, this allows the built storybook
// to function with `process.env.NODE_ENV`... :/
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withWebComponentsKnobs);
const colorOptions = {
    Lightest: 'lightest',
    Light: 'light',
    Dark: 'dark',
    Darkest: 'darkest',
};
let defaultColor = colorOptions.Light;
const scaleOptions = {
    Medium: 'medium',
    Large: 'large',
};
let defaultScale = scaleOptions.Medium;
const directionOptions = {
    LTR: 'ltr',
    RTL: 'rtl',
};
let defaultDirection = 'ltr';
let defaultReduceMotion = false;
addDecorator((story) => {
    const color = select('Color', colorOptions, defaultColor, 'Theme');
    defaultColor = color;
    const scale = select('Scale', scaleOptions, defaultScale, 'Theme');
    defaultScale = scale;
    const dir = select(
        'Text direction',
        directionOptions,
        defaultDirection,
        'Theme'
    );
    defaultDirection = dir;
    const reduceMotion = boolean('Reduce Motion', defaultReduceMotion, 'Theme');
    defaultReduceMotion = reduceMotion;
    return html`
        <sp-theme id="root-theme" color=${color} scale=${scale} dir=${dir}>
            ${reduceMotion
                ? html`
                      <style>
                          sp-theme {
                              --spectrum-global-animation-duration-0: 0ms;
                              --spectrum-global-animation-duration-100: 0ms;
                              --spectrum-global-animation-duration-200: 0ms;
                              --spectrum-global-animation-duration-300: 0ms;
                              --spectrum-global-animation-duration-400: 0ms;
                              --spectrum-global-animation-duration-500: 0ms;
                              --spectrum-global-animation-duration-600: 0ms;
                              --spectrum-global-animation-duration-700: 0ms;
                              --spectrum-global-animation-duration-800: 0ms;
                              --spectrum-global-animation-duration-900: 0ms;
                              --spectrum-global-animation-duration-1000: 0ms;
                              --spectrum-global-animation-duration-2000: 0ms;
                              --spectrum-global-animation-duration-4000: 0ms;
                          }
                      </style>
                  `
                : html``}
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

async function run() {
    const customElements = await (
        await fetch(new URL('../custom-elements.json', import.meta.url))
    ).json();
    setCustomElements(customElements);
}

run();
