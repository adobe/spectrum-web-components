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

import path from 'path';
import fs from 'fs';

import fg from 'fast-glob';
import { transform } from 'lightningcss';
import 'colors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import stylelint from 'stylelint';
import prettier from 'prettier';

const argv = yargs(hideBin(process.argv)).parse();

import {
    dirs,
    getBaseCSS,
    getPackagePath,
    log,
    printRelativePath,
} from '../tasks/css-tools.js';

const fsp = fs.promises;

/**
 * @todo: normalize deep comparison old vs new usage when recursing
 * @param {any} oldSelector
 * @param {any} newSelector
 * @returns {boolean}
 */
const compareSelectors = (oldSelector, newSelector) => {
    let matches = true;
    if (oldSelector && Array.isArray(oldSelector)) {
        oldSelector.forEach((value, index) => {
            matches = compareSelectors(newSelector[index], value) && matches;
        });
    } else if (typeof oldSelector === 'object' && oldSelector !== null) {
        Object.entries(oldSelector).forEach(([key, value]) => {
            matches = compareSelectors(newSelector[key], value) && matches;
        });
    } else {
        return oldSelector === newSelector;
    }
    return matches;
};

const isHost = (component) =>
    component?.type === 'pseudo-class' && component?.kind === 'host';
const isCombinator = (component) => component?.type === 'combinator';
const isDirAttr = (component) =>
    component.type === 'attribute' && component.name === 'dir';
const isFocusRing = (component) =>
    component.type === 'class' && component.name === 'focus-ring';
const isPseudo = (component) => component?.type?.startsWith('pseudo');

const isHoistedPseudoClass = (component) => {
    return (
        component.type === 'pseudo-class' &&
        (component.kind === 'focus' ||
            component.kind === 'focus-visible' ||
            component.kind === 'hover')
    );
};

const nullRuleFromRule = (rule) => ({
    type: 'style',
    value: {
        selectors: [],
        rules: [],
        loc: rule.value.loc,
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
    return selector.reduce((acc, component, index) => {
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
}

/**
 * Process the selectors array and return the processed selectors
 * @param {import('lightningcss').Selector} selector
 * @param {(import('./spectrum-css-converter').SelectorConversion | import('./spectrum-css-converter').ComplexSelectorConversion)[]} components
 * @returns {import('lightningcss').Selector} processed selectors
 */
function processSelector(selector, components) {
    const matches = Array(selector.length);
    let injected = 0;
    selector.forEach((component, selectorIndex) => {
        let index = selectorIndex + injected;
        const match = [...(matches[index] || [])];
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
        }

        components.forEach((componentConversion) => {
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
                        complexConversion.find.length === selector.length &&
                        complexConversion.find.every((component, exactIndex) =>
                            compareSelectors(component, selector[exactIndex])
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
                    complexConversion.replace.forEach((replace, findIndex) => {
                        if (findIndex === 0) {
                            match.unshift({
                                ...(replace === 'take'
                                    ? {
                                          replace: selector[index],
                                      }
                                    : replace),
                            });
                        } else {
                            injected += complexConversion.expandSelector
                                ? 1
                                : 0;
                            matches[index + findIndex] = [
                                ...(matches[index + findIndex] || []),
                            ];
                            matches[index + findIndex].unshift({
                                ...(replace === 'take'
                                    ? {
                                          replace: selector[index + findIndex],
                                      }
                                    : replace),
                            });
                        }
                    });
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
}

/**
 * Process the selectors array and return the processed selectors
 * @param {import('lightningcss').Selector[]} metadata
 * @returns {(import('./spectrum-css-converter').SelectorConversion | import('./spectrum-css-converter').ComplexSelectorConversion)[]}
 */
function buildSelectors(metadata) {
    const selectors = [];
    metadata.forEach((selector) => {
        const newSelector = [];
        /**
         * @type {import('./spectrum-css-converter').HostSelectorComponent|undefined}
         */
        let host;

        for (const componentProcesses of selector) {
            const component = componentProcesses[0];
            if (!component.replace) {
                continue;
            }

            const replacementIsHost = isHost(component.replace);

            if (
                component.hoist ||
                (typeof component.hoist === 'undefined' &&
                    component.replace.type === 'attribute') ||
                replacementIsHost
            ) {
                if (!host) {
                    host = {
                        type: 'pseudo-class',
                        kind: 'host',
                    };
                }
                if (replacementIsHost) {
                    if (component.replace.selectors?.length) {
                        host.selectors = host.selectors || [];
                        host.selectors.push(...component.replace.selectors);
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

        if (host) {
            if (newSelector.length && isHoistedPseudoClass(newSelector[0])) {
                host.selectors = host.selectors || [];
                host.selectors?.push(newSelector.shift());
            }
            const firstIsPseudo = isPseudo(newSelector[0]);
            const firstIsNotSlotted = newSelector[0]?.value !== 'slotted';
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

        const cleanSelector = conditionSelector(newSelector);
        selectors.push(cleanSelector);
    });

    return selectors;
}

async function transformAsset(filename, sourcePath, conversion) {
    // Pull out the properties in the conversion object
    const {
        components = [],
        // optional:
        hoistCustomPropertiesFrom,
        // An array of the selectors to ignore during the transformation
        excludeByComponents = [],
        includeByWholeSelector = [],
        excludeByWholeSelector = [],
        requireComponentPresence = [],
    } = conversion;

    // Add some default components to the list
    components.push(
        {
            hoist: true,
            find: {
                type: 'attribute',
                name: 'dir',
            },
        },
        {
            hoist: true,
            find: {
                type: 'class',
                name: 'focus-ring',
            },
            replace: {
                type: 'pseudo-class',
                kind: 'focus-visible',
            },
        }
    );

    const { code } = transform({
        filename,
        code: await fsp
            .readFile(sourcePath, 'utf8')
            .then((content) => Buffer.from(content)),
        visitor: {
            // @ts-expect-error - this is a valid visitor
            Rule(rule) {
                if (rule.type === 'style' && rule.value.selectors?.length) {
                    if (
                        hoistCustomPropertiesFrom &&
                        rule.value.selectors.length === 1 &&
                        rule.value.selectors[0].length === 1 &&
                        rule.value.selectors[0][0].type === 'class' &&
                        rule.value.selectors[0][0].name ===
                            hoistCustomPropertiesFrom &&
                        rule.value.declarations.declarations.every(
                            (declaration) => declaration.property === 'custom'
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

                    /** @type {import('lightningcss').Selector[]} */
                    const nextSelectors = [];
                    [...rule.value.selectors].forEach((selector) => {
                        let include = true;

                        excludeByWholeSelector.forEach((exclusion) => {
                            include =
                                include &&
                                !(
                                    exclusion.length === selector.length &&
                                    exclusion.every(
                                        (component, exclusionIndex) =>
                                            compareSelectors(
                                                component,
                                                selector[exclusionIndex]
                                            )
                                    )
                                );
                        });

                        excludeByComponents.forEach((exclusion) => {
                            if (exclusion.regex) {
                                include =
                                    include &&
                                    !selector.find((component) => {
                                        return (
                                            component.type === 'class' &&
                                            component.type === exclusion.type &&
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
                                        compareSelectors(exclusion, component)
                                    );
                            }
                        });

                        requireComponentPresence.forEach((required) => {
                            if (required.regex) {
                                include =
                                    include &&
                                    !!selector.find((component) => {
                                        return (
                                            component.type === 'class' &&
                                            component.type === required.type &&
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
                                        compareSelectors(required, component)
                                    );
                            }
                        });

                        if (!include) {
                            includeByWholeSelector.forEach((inclusion) => {
                                const sameLength =
                                    inclusion.length === selector.length;
                                if (!sameLength) {
                                    return;
                                }
                                const selectorSameAsComponent = inclusion.every(
                                    (component, inclusionIndex) =>
                                        compareSelectors(
                                            selector[inclusionIndex],
                                            component
                                        )
                                );
                                include =
                                    include ||
                                    (sameLength && selectorSameAsComponent);
                            });
                        }

                        if (include) {
                            nextSelectors.push(selector);
                        }
                    });

                    if (!nextSelectors.length) {
                        return nullRuleFromRule(rule);
                    }

                    const selectors = buildSelectors(
                        nextSelectors.map((s) => processSelector(s, components))
                    );

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

    return Promise.resolve(code?.toString() ?? '');
}

/**
 *
 * @param {import('./spectrum-css-converter').Conversion} conversion
 * @returns
 */
async function convertStyles(conversion) {
    // Pull out the properties in the conversion object
    const {
        // This is the Spectrum CSS package to fetch the source CSS from
        inPackage,
        // The Spectrum Web Components package name(s) to write the converted CSS to
        outPackage,
        // The Spectrum Web Components component name to use in the file name
        fileName,
    } = conversion;

    // The default package file is index.css but index-base.css contains the base styles compatible with theme switching.
    const sourceDirectory = path.dirname(getPackagePath(inPackage));
    const sourcePath = getBaseCSS(sourceDirectory);
    const outputPath = path.join(
        ...(Array.isArray(outPackage) ? outPackage : ['packages', outPackage]),
        'src',
        `spectrum-${fileName}.css`
    );
    const overridesPath = path.join(
        ...(Array.isArray(outPackage) ? outPackage : ['packages', outPackage]),
        'src',
        `${fileName}-overrides.css`
    );

    // Note: We write the overrides file even if it's empty.
    // This is to ensure that we don't end up with stale overrides
    // files in the case where the bridge file previously contained
    // overrides but no longer does.
    let transformedBridge = '';
    const promises = [];
    if (fs.existsSync(path.join(sourceDirectory, 'index-theme.css'))) {
        // The default package file is index.css but index-theme.css contains the --system custom properties mappings that facilitate theme switching.
        const bridgepath = path.join(sourceDirectory, 'index-theme.css');

        if (fs.existsSync(bridgepath)) {
            transformedBridge = await transformAsset(
                overridesPath,
                bridgepath,
                conversion
            );
        }
    }

    promises.push(
        writeMachineGeneratedSourceFile(overridesPath, transformedBridge ?? ''),
        transformAsset(outputPath, sourcePath, conversion).then((result) =>
            writeMachineGeneratedSourceFile(outputPath, result)
        )
    );

    return Promise.all(promises);
}

/**
 *
 * @param {string} componentPath
 * @returns
 */
async function processComponent(componentPath) {
    /**
     * Read in the spectrum-config.js file; this file contains the configuration for the component
     * @note This file will exist because the original search pattern in the main function is for this file
     */
    const { default: config } = await import(
        path.join(componentPath, 'spectrum-config.js')
    );

    /**
     * @type { import('./spectrum-css-converter').SpectrumCSSConverter}
     */
    const { conversions = [] } = config;

    const componentFolder = printRelativePath(path.resolve(componentPath, '..'))
        ?.split(path.sep)
        ?.pop();

    log.notice(
        `- ${(componentFolder ?? '').cyan} ${'with'.gray} ${conversions.length} ${'custom conversion(s)'.gray}`
    );

    // Iterate over each conversion and process the provided settings
    return Promise.all(conversions.map(convertStyles));
}

/**
 * Write the machine generated source file with the license header
 * @param {any} outputPath
 * @param {any} code
 * @returns {Promise<void>}
 */
async function writeMachineGeneratedSourceFile(outputPath, code) {
    const prettierConfig = await prettier.resolveConfig(outputPath);
    // Before writing, lint and prettier the code
    const formatted = await stylelint
        .lint({
            code: `/* THIS FILE IS MACHINE GENERATED. DO NOT EDIT */\n${code}`,
            fix: true,
        })
        .then(({ code: result }) => {
            return prettier.format(result ?? '', {
                parser: 'css',
                ...prettierConfig,
            });
        });

    return fsp.writeFile(outputPath, formatted, {
        encoding: 'utf8',
    });
}

/**
 * The entry point for the script that processes Spectrum CSS variables
 */
async function main(components = []) {
    log.notice('\nStarting component style conversions\n');

    const configurations = await fg(
        `${dirs.root}/{packages,tools}/*/src/spectrum-config.js`
    );

    if (!configurations.length) {
        log.notice('No Spectrum Components to process'.yellow);
        process.exit(0);
    }

    let directories = configurations.map((configPath) =>
        path.join(configPath, '..')
    );

    if (components.length > 0) {
        let fullSet = directories;
        directories = directories.filter((dir) => {
            // Capture the 2nd-to-last directory in the path
            const componentName = dir.split(path.sep).slice(-2, -1)[0];
            // Check if the component name is in the list of components to process
            // so we can filter the list of directories to process
            return components.includes(componentName);
        });

        if (directories.length === 0) {
            directories = fullSet;
        }
    }

    return Promise.all(directories.map(processComponent))
        .then(() => {
            log.notice('');
            log.success(
                `Successfully processed ${directories.length} components\n`
            );
            process.exit(0);
        })
        .catch((error) => {
            log.fail(error);
            process.exit(1);
        });
}

const inputs = argv._?.map((input) => {
    // Remove the @spectrum-web-components/ prefix from the input if it exists
    input = input
        ?.toString()
        ?.trim()
        ?.replaceAll('@spectrum-web-components/', '');

    // Check if any of the inputs include comma-separated values and split them into separate inputs
    if (input.includes(',')) {
        const splitInputs = input.split(',');
        return splitInputs;
    }
    return input;
})?.flat();
main(inputs);
