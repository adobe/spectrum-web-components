// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * @property {string} fileName
 * @property {RegExp} regex
 * @returns {import('../../../tasks/spectrum-css-converter').Conversion}
 */
const styleType = (fileName, regex) => ({
    inPackage: '@spectrum-css/typography',
    outPackage: ['tools', 'styles'],
    fileName,
    requireComponentPresence: [
        {
            type: 'class',
            name: regex,
            regex,
        },
    ],
    components: [],
});

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        styleType('typography', /^spectrum-Typography/),
        styleType('heading', /^spectrum-Heading/),
        styleType('body', /^spectrum-Body/),
        styleType('detail', /^spectrum-Detail/),
        styleType('code', /^spectrum-Code/),
        {
            inPackage: '@spectrum-css/typography',
            outPackage: ['tools', 'styles'],
            fileName: 'lang',
            allowThemeRules: true,
            requireComponentPresence: [
                /** @type {import('lightningcss').SelectorComponent} */ ({
                    type: 'pseudo-class',
                    kind: 'lang',
                }),
            ],
            components: [],
        },
    ],
};

export default config;
