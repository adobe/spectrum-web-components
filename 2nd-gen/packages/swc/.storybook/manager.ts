import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import '../tokens/global-vars.css';
import '../tokens/index.css';
import '../tokens/light-vars.css';
import '../tokens/medium-vars.css';
import './assets/manager.css';

import logo from './assets/logo.svg';

const root = document.body ?? document.documentElement;
if (root) root.classList.add('spectrum', 'spectrum--light', 'spectrum--medium');

addons.setConfig({
    theme: create({
        base: 'light',

        brandTitle: 'Adobe | Spectrum Web Components',
        brandUrl: '?path=/docs/about-swc-overview--readme', // TODO: Add the correct URL once we are publishing 2nd-gen
        brandImage: logo,
        brandTarget: '_self',

        typography: {
            fonts: {
                base: 'adobe-clean, "Adobe Clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif',
                code: '"Source Code Pro", Monaco, monospace',
            },
        },

        // colorPrimary: "#7326d3",
        colorSecondary: 'rgb(2, 101, 220)',

        /* Being applied to the active state of radio buttons */
        appBg: 'rgb(248, 248, 248)',
        /* Being applied to the arg table */
        appContentBg: 'rgb(255, 255, 255)',
        appBorderColor: 'rgb(213, 213, 213)',
        appBorderRadius: 8,

        /* Text colors */
        fontBase:
            'adobe-clean, "Adobe Clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif',
        fontCode: '"Source Code Pro", Monaco, monospace',
        textColor: 'rgb(34, 34, 34)',
        textInverseColor: 'rgb(219, 219, 219)',
        textMutedColor: 'rgb(175, 175, 175)',

        /* Toolbar default and active colors */
        barTextColor: 'rgb(34, 34, 34)',
        barHoverColor: 'rgb(2, 101, 220)',
        barSelectedColor: 'rgb(2, 101, 220)',
        barBg: 'rgb(255, 255, 255)',

        // buttonBg: "rgb(255, 255, 255)",
        // buttonBorder: "transparent",
        // booleanBg: "rgb(255, 255, 255)",
        // booleanSelectedBg: "rgb(213, 213, 213)",

        /* Form colors */
        inputBg: 'rgb(255, 255, 255)',
        inputBorder: 'rgb(177, 177, 177)',
        inputTextColor: 'rgb(34, 34, 34)',
        inputBorderRadius: 4,

        // gridCellSize?: number;
    }),
});
