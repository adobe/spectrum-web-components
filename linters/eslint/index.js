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

module.exports = {
    rules: {
        'prevent-argument-names': {
            create: function (context) {
                const argumentNames = context.options[0];
                function preventArgumentNames(node) {
                    if (!argumentNames) {
                        return;
                    }
                    argumentNames.forEach((name) => {
                        if (node.name === name) {
                            context.report({
                                node,
                                message: `"${name}" shouldn't be used as an argument name`,
                                data: {
                                    identifier: node.name,
                                },
                            });
                        }
                    });
                }

                return {
                    Identifier: preventArgumentNames,
                };
            },
        },
        'document-active-element': {
            create: function (context) {
                function preventDocumentActiveElement(node) {
                    if (
                        node.object.name === 'document' &&
                        node.property.name === 'activeElement'
                    ) {
                        context.report({
                            node,
                            message: `"document.activeElement" can be incorrect across shadow boundaries`,
                            data: {
                                identifier: node.name,
                            },
                        });
                    }
                }
                return {
                    MemberExpression: preventDocumentActiveElement,
                };
            },
        },
    },
};
