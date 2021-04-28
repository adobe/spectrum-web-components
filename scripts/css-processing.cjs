/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const stripIndent = require('common-tags').stripIndents;

const postCSSPlugins = (resourcePath) => {
    const postCSSImportConfig = {};
    if (resourcePath) {
        postCSSImportConfig['root'] = resourcePath;
    }
    return [
        require('postcss-import')(postCSSImportConfig),
        require('postcss-inherit')(),
        require('postcss-preset-env')({
            browsers: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 4 Safari versions',
                'last 4 iOS versions',
            ],
            stage: 2,
            features: {
                'nesting-rules': true,
            },
        }),
        // minify the css with cssnano presets
        require('cssnano')({
            preset: [
                'default',
                {
                    svgo: false,
                },
            ],
        }),
        require('postcss-focus-visible')(),
    ];
};

const wrapCSSResult = (content) => {
    return stripIndent`
        import { css } from '@spectrum-web-components/base';
        const styles = css\`
            ${content}
        \`;
        export default styles;
    `;
};

module.exports = { postCSSPlugins, wrapCSSResult };
