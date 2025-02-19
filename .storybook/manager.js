/*!
 * Copyright 2025 Adobe. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at <http://www.apache.org/licenses/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'Adobe | Spectrum Web Components',
        brandUrl: 'https://opensource.adobe.com/spectrum-web-components',
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
        appBg: 'rgb(255, 255, 255)',
        /* Being applied to the arg table */
        appContentBg: 'rgb(255, 255, 255)',
        // appPreviewBg: "rgb(248, 248, 248)",
        appBorderColor: 'rgb(213, 213, 213)',
        appBorderRadius: 4,

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
    sidebar: {
        showRoots: true,
        collapsedRoots: ['tools'],
    },
});
