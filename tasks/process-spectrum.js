#!/usr/bin/env node
// @ts-check
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import fg from 'fast-glob';
import chalk from 'chalk';
import { transform } from 'lightningcss';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import reporter from 'postcss-reporter';
import { postCSSPlugins } from '../scripts/css-processing.cjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = path.resolve(__dirname, '../');

const require = createRequire(import.meta.url);

const compareSelectors = (oldSelector, newSelector) => {
    let matches = true;
    if (Array.isArray(oldSelector)) {
        oldSelector.forEach((value, index) => {
            matches = compareSelectors(newSelector[index], value) && matches;
        });
    } else if (typeof oldSelector === 'object') {
        Object.entries(oldSelector).forEach(([key, value]) => {
            matches = compareSelectors(newSelector[key], value) && matches;
        });
    } else {
        return oldSelector === newSelector;
    }
    return matches;
};

const isThemeOnlyRule = (rule) => {
    return (
        rule.value.selectors?.[0][0].name === 'spectrum--express' ||
        rule.value.selectors?.[0][0].name === 'spectrum' ||
        rule.value.selectors?.[0][0].name === 'spectrum--light' ||
        rule.value.selectors?.[0][0].name === 'spectrum--dark' ||
        rule.value.selectors?.[0][0].name === 'spectrum--darkest'
    );
};

const isHost = (component) => {
    return component?.type === 'pseudo-class' && component?.kind === 'host';
};

const isCombinator = (component) => {
    return component?.type === 'combinator';
};

const isDirAttr = (component) => {
    return component.type === 'attribute' && component.name === 'dir';
};

const isFocusRing = (component) => {
    return component.type === 'class' && component.name === 'focus-ring';
};

const isPseudo = (component) => {
    return component?.type?.startsWith('pseudo');
};

const isHoistedPseudoClass = (component) => {
    return (
        component.type === 'pseudo-class' &&
        (component.kind === 'focus' || component.kind === 'hover')
    );
};

const nullRuleFromRule = (rule) => ({
    type: 'style',
    value: {
        selectors: [],
        rules: [],
        loc: {
            ...rule.value.loc,
        },
    },
});

function conditionSelector(newSelector) {
    /**
     * Remove errant combinators, e.g.
     * :host(...) :before
     *
     * but NOT
     *
     * :host ::slotted()
     */
    let selector = newSelector.reduce((acc, component, index) => {
        if (
            !isCombinator(component) ||
            (isCombinator(component) &&
                (!isPseudo(newSelector[index + 1]) ||
                    newSelector[index + 1]?.kind === 'slotted'))
        ) {
            acc.push(component);
        }
        return acc;
    }, []);

    /**
     * Collapse attached ::slotted() components, e.g.
     * ::slotted(x)::slotted(y)
     */
    selector = selector.reduce((acc, component, index) => {
        const previous = acc[index - 1];
        if (!previous) {
            acc.push(component);
            return acc;
        }
        if (component.kind === 'slotted' && previous.kind === 'slotted') {
            const selectors = [
                ...component.selector,
                ...previous.selector,
            ].reduce((slottedAcc, component) => {
                if (
                    !slottedAcc.some((item) =>
                        compareSelectors(component, item)
                    )
                ) {
                    slottedAcc.push(component);
                }
                return slottedAcc;
            }, []);
            previous.selector = [...selectors];
        } else {
            acc.push(component);
        }
        return acc;
    }, []);
    return selector;
}

async function processComponent(componentPath) {
    const { default: config } = await import(
        path.join(componentPath, 'spectrum-config.js')
    );
    /**
     * @type { import('./spectrum-css-converter').SpectrumCSSConverter}
     */
    const { conversions } = config;

    /**
     * @type { import('./spectrum-css-converter').SpectrumCSSConverter}
     */
    for await (const conversion of conversions) {
        const sourcePath = require.resolve(conversion.inPackage);
        const sourceCSS = fs.readFileSync(sourcePath, 'utf-8');
        const outputPath = path.join(
            ...(Array.isArray(conversion.outPackage)
                ? conversion.outPackage
                : ['packages', conversion.outPackage]),
            'src',
            `spectrum-${conversion.fileName}.css`
        );
        const processSelectorV2 = (selector) => {
            let log = false;
            const matches = Array(selector.length);
            let injected = 0;
            selector.forEach((component, selectorIndex) => {
                let index = selectorIndex + injected;
                const match = [...(matches[index] || [])];
                let matched = false;
                if (isDirAttr(component)) {
                    match.push({
                        hoist: true,
                        find: {
                            type: 'attribute',
                            name: 'dir',
                        },
                        replace: {
                            ...component,
                        },
                    });
                    matched = true;
                } else if (isFocusRing(component)) {
                    match.push({
                        hoist: true,
                        find: {
                            type: 'class',
                            name: 'focus-ring',
                        },
                        replace: {
                            type: 'pseudo-class',
                            kind: 'focus-visible',
                        },
                    });
                    matched = true;
                }
                conversion.components.forEach((componentConversion) => {
                    if (Array.isArray(componentConversion.find)) {
                        const complexConversion =
                            /** @type {import('./spectrum-css-converter').ComplexSelectorConversion} */ (
                                componentConversion
                            );
                        let found = true;
                        complexConversion.find.forEach((find, findIndex) => {
                            found =
                                found &&
                                selector[index + findIndex - injected] &&
                                compareSelectors(
                                    find,
                                    selector[index + findIndex - injected]
                                );
                        });
                        if (found && complexConversion.exactSelector) {
                            found =
                                found &&
                                complexConversion.find.length ===
                                    selector.length &&
                                complexConversion.find.every(
                                    (component, exactIndex) =>
                                        compareSelectors(
                                            component,
                                            selector[exactIndex]
                                        )
                                );
                        }
                        if (found) {
                            if (complexConversion.expandSelector) {
                                let lengthDelta = Array.isArray(
                                    complexConversion.replace
                                )
                                    ? complexConversion.replace.length -
                                      complexConversion.find.length
                                    : 0;
                                while (lengthDelta > 0) {
                                    matches.splice(index, 0, []);
                                    lengthDelta -= 1;
                                }
                            }
                            if (complexConversion.collapseSelector) {
                                let lengthDelta = Array.isArray(
                                    complexConversion.replace
                                )
                                    ? complexConversion.find.length -
                                      complexConversion.replace.length
                                    : 0;
                                matches.splice(index - injected, lengthDelta);
                                injected -= lengthDelta;
                            }
                            complexConversion.replace.forEach(
                                (replace, findIndex) => {
                                    if (findIndex === 0) {
                                        match.unshift({
                                            ...(replace === 'take'
                                                ? {
                                                      replace: selector[index],
                                                  }
                                                : replace),
                                        });
                                    } else {
                                        injected +=
                                            complexConversion.expandSelector
                                                ? 1
                                                : 0;
                                        matches[index + findIndex] = [
                                            ...(matches[index + findIndex] ||
                                                []),
                                        ];
                                        matches[index + findIndex].unshift({
                                            ...(replace === 'take'
                                                ? {
                                                      replace:
                                                          selector[
                                                              index + findIndex
                                                          ],
                                                  }
                                                : replace),
                                        });
                                    }
                                }
                            );
                        }
                    } else if (
                        componentConversion.find &&
                        compareSelectors(componentConversion.find, component)
                    ) {
                        const newMatch = {
                            ...componentConversion,
                        };
                        if (!newMatch.replace) {
                            newMatch.replace = component;
                        }
                        match.push(newMatch);
                        matched = true;
                    }
                });
                if (!match.length) {
                    match.push({
                        replace: { ...component },
                    });
                }
                matches[index] = match;
            });
            return matches;
        };

        const buildSelectorsV2 = (metadata) => {
            const selectors = [];
            metadata.forEach((selector) => {
                const newSelector = [];
                /**
                 * @type {import('./spectrum-css-converter').HostSelectorComponent}
                 */
                let host;
                selector.forEach((componentProcesses, index) => {
                    const component = componentProcesses[0];
                    if (component.replace) {
                        const replacenentIsHost = isHost(component.replace);
                        if (
                            component.hoist ||
                            (typeof component.hoist === 'undefined' &&
                                component.replace.type === 'attribute') ||
                            replacenentIsHost
                        ) {
                            if (!host) {
                                host = {
                                    type: 'pseudo-class',
                                    kind: 'host',
                                };
                            }
                            if (replacenentIsHost) {
                                if (component.replace.selectors?.length) {
                                    host.selectors = host.selectors || [];
                                    host.selectors.push(
                                        ...component.replace.selectors
                                    );
                                }
                            } else {
                                host.selectors = host.selectors || [];
                                host.selectors.push({
                                    ...component.replace,
                                });
                                if (component.emphasize) {
                                    host.selectors.push({
                                        ...component.replace,
                                    });
                                }
                            }
                        } else {
                            if (component.replace.type !== 'combinator') {
                                newSelector.push({
                                    ...component.replace,
                                });
                            } else {
                                // Assume that the last combinator in is the "correct" combinator.
                                // This is due to "left over" combinators when hoisting components.
                                const hasCombinatorLast =
                                    newSelector.at(-1)?.type === 'combinator';
                                if (hasCombinatorLast) {
                                    newSelector.pop();
                                }
                                newSelector.push({
                                    ...component.replace,
                                });
                            }
                        }
                    }
                });
                // @ts-ignore
                if (host) {
                    if (
                        newSelector.length &&
                        isHoistedPseudoClass(newSelector[0])
                    ) {
                        host.selectors = host.selectors || [];
                        host.selectors?.push(newSelector.shift());
                    }
                    const firstIsPseudo = isPseudo(newSelector[0]);
                    const firstIsNotSlotted =
                        newSelector[0]?.value !== 'slotted';
                    const firstIsCombinator = isCombinator(newSelector[0]);
                    if (!newSelector.length) {
                        newSelector.push(host);
                    } else if (
                        !firstIsPseudo &&
                        firstIsNotSlotted &&
                        !firstIsCombinator
                    ) {
                        newSelector.unshift({
                            type: 'combinator',
                            value: 'descendant',
                        });
                        newSelector.unshift(host);
                    } else if (host.selectors?.length || firstIsPseudo) {
                        newSelector.unshift(host);
                    }
                }
                if (isCombinator(newSelector[0])) {
                    newSelector.shift();
                }
                selectors.push(conditionSelector(newSelector));
            });
            return selectors;
        };

        const processSelectors = (selectors) => {
            const selectorMetadata = selectors.map(processSelectorV2);
            return buildSelectorsV2(selectorMetadata);
        };

        const { code } = transform({
            code: Buffer.from(sourceCSS),
            visitor: {
                // @ts-ignore
                Rule(rule) {
                    if (!conversion.allowThemeRules && isThemeOnlyRule(rule)) {
                        return nullRuleFromRule(rule);
                    }
                    if (
                        rule.type === 'keyframes' &&
                        conversion.excludeByKeyFrames &&
                        conversion.excludeByKeyFrames.some(
                            ({ value }) => rule.value.name.value === value
                        )
                    ) {
                        return nullRuleFromRule(rule);
                    }
                    if (rule.type === 'style' && rule.value.selectors?.length) {
                        if (
                            conversion.hoistCustomPropertiesFrom &&
                            rule.value.selectors.length === 1 &&
                            rule.value.selectors[0].length === 1 &&
                            rule.value.selectors[0][0].type === 'class' &&
                            rule.value.selectors[0][0].name ===
                                conversion.hoistCustomPropertiesFrom &&
                            rule.value.declarations.declarations.every(
                                (declaration) =>
                                    declaration.property === 'custom'
                            )
                        ) {
                            return {
                                ...rule,
                                value: {
                                    ...rule.value,
                                    selectors: [
                                        [
                                            {
                                                type: 'pseudo-class',
                                                kind: 'host',
                                            },
                                        ],
                                    ],
                                },
                            };
                        }
                        const currentSelectors = [...rule.value.selectors];
                        const nextSelectors = [];
                        currentSelectors.forEach((selector) => {
                            let include = true;
                            conversion.excludeByWholeSelector?.forEach(
                                (exclusion) => {
                                    include =
                                        include &&
                                        !(
                                            exclusion.length ===
                                                selector.length &&
                                            exclusion.every(
                                                (component, exclusionIndex) =>
                                                    compareSelectors(
                                                        component,
                                                        selector[exclusionIndex]
                                                    )
                                            )
                                        );
                                }
                            );
                            conversion.excludeByComponents?.forEach(
                                (exclusion) => {
                                    if (exclusion.regex) {
                                        include =
                                            include &&
                                            !selector.find((component) => {
                                                return (
                                                    component.type ===
                                                        'class' &&
                                                    component.type ===
                                                        exclusion.type &&
                                                    component.name.search(
                                                        /** @type {RegExp} */ (
                                                            exclusion.regex
                                                        )
                                                    ) > -1
                                                );
                                            });
                                    } else {
                                        include =
                                            include &&
                                            !selector.find((component) =>
                                                compareSelectors(
                                                    exclusion,
                                                    component
                                                )
                                            );
                                    }
                                }
                            );
                            conversion.requireComponentPresence?.forEach(
                                (required) => {
                                    if (required.regex) {
                                        include =
                                            include &&
                                            !!selector.find((component) => {
                                                return (
                                                    component.type ===
                                                        'class' &&
                                                    component.type ===
                                                        required.type &&
                                                    component.name.search(
                                                        /** @type {RegExp} */ (
                                                            required.regex
                                                        )
                                                    ) > -1
                                                );
                                            });
                                    } else {
                                        include =
                                            include &&
                                            !!selector.find((component) =>
                                                compareSelectors(
                                                    required,
                                                    component
                                                )
                                            );
                                    }
                                }
                            );
                            if (include) {
                                nextSelectors.push(selector);
                            }
                        });
                        if (!nextSelectors.length) {
                            return nullRuleFromRule(rule);
                        }
                        const selectors = processSelectors(nextSelectors);
                        return {
                            ...rule,
                            value: {
                                ...rule.value,
                                selectors,
                            },
                        };
                    }
                },
            },
        });

        const outputCss = await postcss([
            ...postCSSPlugins(),
            reporter(),
        ]).process(code.toString());

        fs.writeFileSync(
            outputPath,
            `/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* THIS FILE IS MACHINE GENERATED. DO NOT EDIT */
${outputCss}
`
        );
    }
}

async function processComponents() {
    const promises = [];
    // eslint-disable-next-line no-console
    console.log(chalk.bold.green('Processing Spectrum Components'));
    for (const configPath of await fg(
        `${root}/{packages,tools}/*/src/spectrum-config.js`
    )) {
        promises.push(processComponent(path.join(configPath, '..')));
    }
    await Promise.all(promises);
    // eslint-disable-next-line no-console
    console.log(chalk.bold.green('Done'));
}

async function main() {
    await processComponents();
    process.exit(0);
}

main();
