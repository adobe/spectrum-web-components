import { addDecorator } from '@web/storybook-prebuilt/web-components.js';
import { html } from 'lit-html';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

export const parameters = {
    argTypes: {
        color: {
            control: {
                type: 'inline-radio',
                options: ['lightest', 'light', 'dark', 'darkest'],
            },
        },
        scale: {
            control: {
                type: 'inline-radio',
                options: ['medium', 'large'],
            },
        },
        direction: {
            control: {
                type: 'inline-radio',
                options: ['ltr', 'rtl'],
            },
        },
        reduceMotion: {
            control: 'boolean',
        },
    },
    args: {
        color: 'light',
        scale: 'medium',
        direction: 'ltr',
        reduceMotion: false,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
};

// While https://github.com/open-wc/open-wc/issues/1210 and
// go https://github.com/popperjs/popper-core/issues/933 persist
// without an acceptable outcome, this allows the built storybook
// to function with `process.env.NODE_ENV`... :/
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

addDecorator((story, { args }) => {
    return html`
        <sp-theme
            id="root-theme"
            color=${args.color}
            scale=${args.scale}
            dir=${args.direction}
        >
            ${args.reduceMotion
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
