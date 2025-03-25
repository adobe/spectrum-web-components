/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 *
 */
export const replaceGlobalSelectors = (identifier) => ({
    Rule(rule) {
        if (rule?.type !== 'style') {
            return rule;
        }

        rule?.value?.selectors?.forEach((selector) => {
            if (!Array.isArray(selector)) {
                selector = [selector];
            }

            selector.forEach((facet, idx) => {
                // We're only validating classes
                if (facet?.type !== 'class') {
                    return;
                }

                // Replace all global scope classes with a :root/:host selector
                if (
                    /^spectrum(--(express|light(est)?|dark(est)?|medium|large|legacy))?$/.test(
                        facet?.name
                    ) ||
                    (identifier && facet?.name === `spectrum--${identifier}`)
                ) {
                    // Remove this selector
                    selector.splice(idx, 1);

                    ['root', 'host'].forEach((kind) => {
                        // Check if selector is already present
                        if (
                            !rule.value.selectors.some((s) => {
                                // Check each array for an exact object match
                                return s.some(
                                    (i) =>
                                        i?.type === 'pseudo-class' &&
                                        i?.kind === kind &&
                                        // Check that i does not have any other properties
                                        Object.keys(i).length === 2
                                );
                            })
                        ) {
                            rule?.value?.selectors.push([
                                {
                                    type: 'pseudo-class',
                                    kind,
                                },
                            ]);
                        }
                    });
                }
            });

            // Remove empty arrays
            rule.value.selectors = rule.value.selectors.filter((s) => s.length);
        });

        return rule;
    },
});

/**
 *
 */
export const removeUnusedVariables = (
    excludedPatterns,
    usedVariables = new Set()
) => ({
    Variable(variable) {
        const checkForFallback = (fallback) => {
            fallback.forEach(({ type, value }) => {
                if (type && type === 'var') {
                    if (value?.name?.ident) {
                        usedVariables.add(value.name.ident);
                    }

                    if (value?.fallback) {
                        checkForFallback(value.fallback);
                    }
                }
            });
        };

        if (Array.isArray(variable?.fallback) && variable?.fallback.length) {
            checkForFallback(variable.fallback);
        }

        return {
            type: 'var',
            value: variable,
        };
    },
    // Remove unused custom properties
    VariableExit(variable) {
        const { name } = variable;
        // Check if this is a preserved custom property
        if (
            excludedPatterns.some((p) => {
                if (typeof p === 'string') {
                    p = new RegExp(p);
                }
                return p.test(name.ident);
            })
        ) {
            return {
                type: 'var',
                value: variable,
            };
        }

        // Check if the declaration is not used in the project
        if (usedVariables.has(name.ident)) {
            return {
                type: 'var',
                value: variable,
            };
        }

        // Track removed custom properties
        // removedVariableDeclarations.add(name.ident);
        return;
    },
});
