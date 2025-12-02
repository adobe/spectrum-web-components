/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { lookupToken } from '@adobe/swc-tokens/utils.js';

/**
 * @type {import('postcss').PluginCreator}
 */
export default (opts = { prefix: '' }) => {
    return {
        postcssPlugin: 'postcss-token',

        async Declaration(decl) {
            if (decl.value?.includes('token(')) {
                const tokenMatch = decl.value.match(
                    /token\(\s*(['"])([\s\S]*?)\1\s*\)/
                );

                if (tokenMatch) {
                    decl.value = await lookupToken(tokenMatch[2], opts.prefix);
                }
            }
        },
    };
};

// Required for PostCSS plugin detection in ESM
export const postcss = true;
