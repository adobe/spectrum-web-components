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

import { resolveModuleOrPackageSpecifier } from '@custom-elements-manifest/analyzer/src/utils/index.js';

/**
 * Resolve the use of `defineElement()` as if it were `customElements.define()`
 */
export default function defineElementPlugin() {
    return {
        name: 'define-element-plugin',
        analyzePhase({ node, moduleDoc, context }) {
            if (node.expression?.text === 'defineElement') {
                const className = node.arguments[1].text;
                const tagName = node.arguments[0].text;

                const definitionDoc = {
                    kind: 'custom-element-definition',
                    name: tagName,
                    declaration: {
                        name: className,
                        ...resolveModuleOrPackageSpecifier(
                            moduleDoc,
                            context,
                            className
                        ),
                    },
                };

                moduleDoc.exports = [
                    ...(moduleDoc.exports || []),
                    definitionDoc,
                ];
            }
        },
    };
}
