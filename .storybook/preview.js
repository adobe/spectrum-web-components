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

window.__swc_hack_knobs__ = window.__swc_hack_knobs__ || {};

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withWebComponentsKnobs);
const colorOptions = {
    Lightest: 'lightest',
    Light: 'light',
    Dark: 'dark',
    Darkest: 'darkest',
};
window.__swc_hack_knobs__.defaultColor = colorOptions.Light;
const scaleOptions = {
    Medium: 'medium',
    Large: 'large',
};
window.__swc_hack_knobs__.defaultScale = scaleOptions.Medium;
const directionOptions = {
    LTR: 'ltr',
    RTL: 'rtl',
};
window.__swc_hack_knobs__.defaultDirection = 'ltr';
window.__swc_hack_knobs__.defaultReduceMotion = false;
addDecorator((story) => {
    const color = select(
        'Color',
        colorOptions,
        window.__swc_hack_knobs__.defaultColor,
        'Theme'
    );
    window.__swc_hack_knobs__.defaultColor = color;
    const scale = select(
        'Scale',
        scaleOptions,
        window.__swc_hack_knobs__.defaultScale,
        'Theme'
    );
    window.__swc_hack_knobs__.defaultScale = scale;
    const dir = select(
        'Text direction',
        directionOptions,
        window.__swc_hack_knobs__.defaultDirection,
        'Theme'
    );
    window.__swc_hack_knobs__.defaultDirection = dir;
    const reduceMotion = boolean(
        'Reduce Motion',
        window.__swc_hack_knobs__.defaultReduceMotion,
        'Theme'
    );
    window.__swc_hack_knobs__.defaultReduceMotion = reduceMotion;
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
