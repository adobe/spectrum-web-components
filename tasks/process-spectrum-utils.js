// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export const converterFor = (component) => {
    return {
        classToAttribute: (name, value) =>
            convertToAttribute(name, value, component),
        classToClass: (name, value) => convertToClass(name, value, component),
        classToId: (name, value) => convertToId(name, value, component),
        classToHost: (name) => covertToHost(name || component),
        classToSlotted: (name, value) => slottedSlot(name, value),
        enumerateAttributes: (attributes, name, operator = 'equal') =>
            enumAttributes(attributes, name, operator, component),
        notToAttribute: (name, value) =>
            convertNotToAttribute(name, value, component),
        notToPseudoClass: (kind) =>
            convertNotToAny(
                { type: 'pseudo-class', kind },
                { type: 'pseudo-class', kind },
                true
            ),
        pseudoToAttribute: (name, value) =>
            convertPseudoToAttribute(name, value),
    };
};

export const builder = {
    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} operator
     * @returns {import('lightningcss').SelectorComponent}
     */
    attribute: (name, value = '', operator = 'equal') => {
        const component =
            /** @type {import('lightningcss').SelectorComponent} */ ({
                type: 'attribute',
                namespace: null,
                name,
            });
        if (value) {
            component.operation = {
                operator,
                value,
                caseSensitivity:
                    'ascii-case-insensitive-if-in-html-element-in-html-document',
            };
        }
        return component;
    },
    /**
     *
     * @param {string} name
     * @returns {import('lightningcss').SelectorComponent}
     */
    class: (name) => ({
        type: 'class',
        name,
    }),
    /**
     *
     * @param {string} combinator
     * @returns {import('lightningcss').SelectorComponent}
     */
    combinator: (combinator) => {
        let value = combinator;
        if (combinator === '>') {
            value = 'child';
        } else if (combinator === ' ') {
            value = 'descendant';
        } else if (combinator === '+') {
            value = 'next-sibling';
        } else if (combinator === '~') {
            value = 'later-sibling';
        }
        return {
            type: 'combinator',
            value,
        };
    },
    /**
     *
     * @param {string} name
     * @returns {import('lightningcss').SelectorComponent}
     */
    element: (name) => ({
        type: 'type',
        name,
    }),
    /**
     *
     * @param {string} name
     * @returns {import('lightningcss').SelectorComponent}
     */
    id: (name) => ({
        type: 'id',
        name,
    }),
    /**
     *
     * @param {string} kind
     * @returns {import('lightningcss').SelectorComponent}
     */
    pseudoClass: (kind) => ({
        type: 'pseudo-class',
        kind,
    }),
    /**
     *
     * @param {string} kind
     * @returns {import('lightningcss').SelectorComponent}
     */
    pseudoElement: (kind) => ({
        type: 'pseudo-element',
        kind,
    }),
    /**
     *
     * @param {string} value
     * @returns {import('lightningcss').SelectorComponent}
     */
    slotted: (value) => {
        const slotted =
            /** @type {import('lightningcss').SelectorComponent} */ ({
                type: 'pseudo-element',
                kind: 'slotted',
                selector: [{ type: 'universal' }],
            });
        if (value) {
            slotted.selector = [builder.attribute('slot', value)];
        }
        return slotted;
    },
};

/**
 * @param {string} name
 * @param {string} value
 * @param {string} component
 * @returns {string}
 */
const getValue = (name, value, component) => {
    if (value) {
        return value;
    }
    let calculatedValue = name.replace(`${component}--`, '');
    calculatedValue = calculatedValue.replace(`${component}-`, '');
    return calculatedValue;
};

/**
 * @param {string} name
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const covertToHost = (name) => ({
    find: {
        type: 'class',
        name,
    },
    replace: {
        type: 'pseudo-class',
        kind: 'host',
    },
});

/**
 * @param {string} name
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertToAttribute = (name, value, component) => ({
    find: {
        type: 'class',
        name,
    },
    replace: {
        name: getValue(name, value, component),
        type: 'attribute',
    },
});

/**
 * @param {string} name
 * @param {string} value
 * @param {string} component
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertNotToAttribute = (name, value, component) => ({
    find: {
        type: 'pseudo-class',
        kind: 'not',
        selectors: [
            [
                {
                    type: 'class',
                    name,
                },
            ],
        ],
    },
    replace: {
        kind: 'not',
        type: 'pseudo-class',
        selectors: [
            [
                {
                    name: getValue(name, value, component),
                    type: 'attribute',
                },
            ],
        ],
    },
    hoist: true,
});

/**
 * A more abstract version of convertNotToAttribute that can be used for any type of selector
 * @param {import('./spectrum-css-converter').HostSelectorComponent} from
 * @param {import('./spectrum-css-converter').HostSelectorComponent} to - The name of the attribute to convert to
 * @param {boolean} [hoist=true] - Whether to hoist the conversion to the top level
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertNotToAny = (from, to, hoist = true) => ({
    find: {
        type: 'pseudo-class',
        kind: 'not',
        selectors: [[from]],
    },
    replace: {
        kind: 'not',
        type: 'pseudo-class',
        selectors: [[to]],
    },
    hoist,
});

/**
 * @param {import('lightningcss').PseudoClass['kind']} kind
 * @param {string} value
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertPseudoToAttribute = (kind, value) => ({
    find: {
        type: 'pseudo-class',
        kind,
    },
    replace: {
        name: value,
        type: 'attribute',
    },
});

/**
 * @param {string} name
 * @param {string} value
 * @param {string} component
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertToId = (name, value, component) => ({
    find: {
        type: 'class',
        name,
    },
    replace: {
        name: getValue(name, value, component),
        type: 'id',
    },
});

/**
 * @param {string} name
 * @param {string} value
 * @param {string} component
 * @returns {import('./spectrum-css-converter').SelectorConversion}
 */
export const convertToClass = (name, value, component) => ({
    find: {
        type: 'class',
        name,
    },
    replace: {
        name: getValue(name, value, component),
        type: 'class',
    },
});

export const enumAttributes = (
    attributes,
    attributeName,
    operator,
    componentName,
    hoist
) => {
    return attributes.map(([name, value]) => {
        const component = {
            find: {
                type: 'class',
                name,
            },
            replace: {
                name: attributeName,
                type: 'attribute',
                operation: {
                    operator,
                    value: getValue(name, value, componentName),
                },
            },
        };
        if (typeof hoist !== 'undefined') {
            component.hoist = hoist;
        }
        return component;
    });
};

/**
 * @param {string} name
 * @param {string} value
 * @returns {(import('./spectrum-css-converter').SelectorConversion)}
 */
export const slottedSlot = (name, value) => {
    return {
        find: builder.class(name),
        replace: builder.slotted(value),
    };
};
