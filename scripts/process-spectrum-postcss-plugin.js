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

const postcss = require('postcss');
const { re } = require('re-template-tag');
const path = require('path');
const fs = require('fs');
const parser = require('postcss-selector-parser');

const astProcessor = parser();

class SpectrumProcessor {
    constructor(component) {
        this.component = new ComponentConfig(component);
        this.mappings = [];
    }

    warn(...args) {
        this.result.warn(...args);
    }

    /**
     * Returns a function that will transform a selector based on the
     * component config that we were passed at construction.
     *
     * @return {function} A function of the form (selector, rule) -> {...}
     */
    get selectorTransform() {
        // Compose a series of transformations for selectors.
        const astTransforms = [];
        const transformations = [];

        astTransforms.push((selector, rule) => {
            let exclude = false;
            selector.walkCombinators((combinator, index) => {
                if (/[+~]|\|\|/.test(combinator.value)) {
                    const previous = combinator.prev();
                    if (this.component.isRootSpectrumClass(previous)) {
                        this.warn(
                            `:host rules cannot use complex combinator (${
                                combinator.value
                            }): ${selector.toString()}`,
                            {
                                node: rule,
                                word: combinator.value,
                            }
                        );
                        exclude = true;
                    }
                }
            });
            return exclude ? undefined : selector;
        });

        // For rules that are just the host selector, do a simple replacement
        // e.g. ".spectrum-Button" -> ":host"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            if (
                result.length === 1 &&
                this.component.isRootSpectrumClass(result.first)
            ) {
                const processor = parser();
                const node = nodeFromSelector(
                    this.component.hostShadowSelector
                );
                replaceNode(result.first, node);
            }
            return result;
        });

        // Add a mapping that strips references to the host component from
        // selectors, as the shadow DOM scoping handles that for us
        // e.g. ".spectrum-Button .spectrum-Button-label" -> ".spectrum-Button-label"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            if (
                result.length > 1 &&
                this.component.isRootSpectrumClass(result.first) &&
                result.nodes[1].type === 'combinator' &&
                result.nodes[1].value === ' '
            ) {
                if (
                    result.length === 3 &&
                    result.nodes[0].value === result.nodes[2].value &&
                    this.component.tagName
                ) {
                    // When self referential, use `tagName` to point a child instance
                    // of that `tagName` instead of collpasing the selector to `:host`
                    const node = nodeFromSelector(this.component.tagName);
                    replaceNode(result.nodes[2], node);
                }
                // Remove first node and combinator
                result.first.remove();
                result.first.remove();
            }
            return result;
        });

        // If the first part of a selector references the host, then
        // add a :host wrapper
        // e.g. ".spectrum-Button:hover" -> ":host(hover)"
        astTransforms.push((selector, rule) => {
            if (this.component.isRootSpectrumClass(selector.first)) {
                const result = selector.clone();
                if (this.component.spectrumClassIsHost) {
                    // Make new copy of the selector that starts with an empty
                    // :host declaration
                    const hostSelector = parser.selector();
                    const host = parser.pseudo({ value: ':host' });
                    result.first.replaceWith(host);

                    let remainder = host.next();
                    while (remainder && remainder.type !== 'combinator') {
                        const node = remainder;
                        remainder = remainder.next();
                        node.remove();
                        // Pseudo-elements go after the host selector `:host::before` or `:host([attr])::after`.
                        if (
                            node.value.match(/before$/) !== null ||
                            node.value.match(/after$/) !== null
                        ) {
                            result.insertAfter(host, node);
                        } else {
                            hostSelector.append(node);
                        }
                    }
                    // Appending the `hostSelector` updates `:host` to `:host(...)` so only do it when there is content to apply.
                    if (hostSelector.nodes.length) {
                        host.append(hostSelector);
                    }
                } else {
                    replaceNode(
                        result.first,
                        this.component.hostShadowSelectorNode
                    );
                }
                return result;
            } else {
                return selector;
            }
        });

        // Map shadow DOM classes to ids
        // e.g. ".spectrum-Button-label" -> "#label"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            result.each((node) => {
                const shadowNode = this.component.shadowNodeForId(node);
                if (shadowNode) {
                    node.replaceWith(shadowNode.clone());
                }
            });
            return result;
        });

        // Map shadow DOM classes to classes
        // e.g. ".spectrum-Slider-track" -> ".track"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            result.walkClasses((selector) => {
                if (selector.value) {
                    const matchingClass = this.component.classes.get(
                        selector.value
                    );
                    if (matchingClass) {
                        selector.value = matchingClass;
                    }
                }
            });
            return result;
        });

        // Map classes to slotted content
        // e.g. ".spectrum-Icon" -> "::slotted([slot='icon'])"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            let isInvalidSelector = false;
            result.each((node, index) => {
                const slot = this.component.slotForNode(node);
                if (!slot) return;
                const isSiblingSelector = getCombinator(selector) === '+';
                const isLastNode = index === result.length - 1;

                if (isSiblingSelector && !isLastNode) {
                    // If a sibling selector is used, and the slot is not the last
                    // element in the combinator, we will need to refer to the slot itself
                    replaceNode(node, slot.shadowSlotNode);
                } else if (!isLastNode) {
                    // If there are selectors after ::slotted() the rule is invalid CSS, let's remove it.
                    // The browser would do this anyways, and then merged selectors in CSS minification output
                    // e.g. `.valid .selector, ::slotted(.invalid) .selector {}` would be lost.
                    isInvalidSelector = true;
                    this.warn(
                        `:slotted() rules must be the last in the selector`,
                        {
                            node: rule,
                        }
                    );
                } else {
                    replaceNode(node, slot.shadowSlottedNode);
                }
            });
            return isInvalidSelector ? null : result;
        });

        // Convert instances of the .focus-ring selector to a :focus
        // pseudo selector.
        // e.g. ".spectrum-Button.focus-ring" => ".spectrum-Button:focus"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            result.walkClasses((selector) => {
                if (selector.value === 'focus-ring') {
                    selector.replaceWith(
                        parser.pseudo({ value: ':focus-visible' })
                    );
                }
            });
            return result;
        });

        // Map classes to attributes
        // e.g. ".spectrum-Button--cta" -> ":host([variant='cta'])"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            let attributeFound = false;
            result.walk((node) => {
                const attribute = this.component.attributeForNode(node);
                if (!attribute) return;

                const prev = node.prev();
                const next = node.next();
                node.remove();
                addNodeToHost(result, attribute.shadowNode);

                if (
                    !next &&
                    prev &&
                    prev.type === 'combinator' &&
                    !this.component.spectrumClassIsHost
                ) {
                    // We have removed all of the attributes from this part of the
                    // selector. We still need to put in a reference to the id
                    // that represents the root spectrum class
                    result.insertAfter(
                        prev,
                        this.component.hostShadowSelectorNode.clone()
                    );
                } else if (
                    !prev &&
                    next &&
                    (next.type === 'pseudo' || next.type === 'class') &&
                    !this.component.spectrumClassIsHost
                ) {
                    // Don't leave a pseudo selector or class hanging.
                    result.insertBefore(
                        next,
                        this.component.hostShadowSelectorNode.clone()
                    );
                }

                attributeFound = true;
            });
            if (attributeFound) {
                if (this.component.spectrumClassIsHost) {
                    if (
                        result.length >= 3 &&
                        result.at(1).type === 'combinator'
                    ) {
                        // If there is only a pseudo selector following the :host,
                        // then we need to append the pseudo to the root
                        // node (e.g ":host([quiet]) :hover" -> ":host([quiet]:hover)")
                        const lastNode = result.at(2);
                        if (
                            lastNode.type === 'pseudo' &&
                            lastNode.value !== '::slotted'
                        ) {
                            lastNode.remove();
                            addNodeToHost(result, lastNode);
                        }
                    }
                } else {
                    // The CSS for the spectrum root class is not on the :host
                    // element. Apply these CSS rules to the element that correlates
                    // with the spectrum root class. Add that selector (e.g. #button)
                    // if it isn't already there
                    if (result.length === 1) {
                        result.append(parser.combinator({ value: ' ' }));
                        result.append(
                            this.component.hostShadowSelectorNode.clone()
                        );
                    } else if (
                        result.length === 3 &&
                        result.at(1).type === 'combinator'
                    ) {
                        // If there is only a pseudo selector following the :host,
                        // then we need to prepend the root selector to the pseudo
                        // node (e.g ":host([quiet]) :hover" -> ":host([quiet]) #button:hover")
                        const lastNode = result.at(2);
                        if (lastNode.type === 'pseudo') {
                            result.insertBefore(
                                lastNode,
                                this.component.hostShadowSelectorNode.clone()
                            );
                        }
                    }
                }
            }
            return result;
        });

        // Map classes to descendent attributes
        // e.g. ".spectrum-Dialog .spectrum-Button--cta" -> "[variant='cta']"
        astTransforms.push((selector, rule) => {
            const result = selector.clone();
            let attributeFound = false;
            result.walk((node) => {
                const attribute = this.component.descendantAttributeForNode(
                    node
                );
                if (!attribute) return;

                node.replaceWith(attribute.shadowNode.clone());
            });
            return result;
        });

        // Custom transformations provided in the component's config
        if (this.component.selectorTransforms) {
            for (const transform of this.component.selectorTransforms) {
                astTransforms.push((selector, rule) =>
                    transform(selector, rule, this.component)
                );
            }
        }

        return (selector, rule) => {
            let result = selector;

            // Do the AST transforms
            const processor = parser((selectors) => {
                for (const selector of selectors.nodes) {
                    let transformed = selector;
                    for (const transform of astTransforms) {
                        transformed = transform(transformed, rule);
                        if (!transformed) break;
                    }
                    if (transformed) {
                        selector.replaceWith(transformed);
                    } else {
                        selector.remove();
                    }
                }
            });

            result = processor.processSync(selector);

            return result;
        };
    }

    /**
     * Convert the selectors for the given rule based on the component
     * config that we were passed at construction time
     *
     * @param {object} rule - The rule who's selects we will transform
     */
    convertSelectors(rule) {
        const result = [];

        const startsWithHost = re`^${this.component.hostSelector}`;
        const selectorTransform = this.selectorTransform;
        let skipAll = false;
        if (this.component.excludeSourceSelector) {
            for (const regex of this.component.excludeSourceSelector) {
                if (regex.test(rule.selector)) {
                    skipAll = true;
                    break;
                }
            }
        }
        if (!skipAll) {
            for (let selector of rule.selectors) {
                if (!startsWithHost.test(selector)) {
                    // This selector does not match the component we are
                    // working on. Check to see if it matches an id
                    let skip = true;
                    if (this.component.ids) {
                        for (const id of this.component.ids) {
                            const idSelector = id.selector || id;
                            if (re`^${idSelector}(?![-\w])`.test(selector)) {
                                skip = false;
                                break;
                            }
                        }
                    }
                    if (skip) continue;
                }
                this.component.complexSelectors.map((complexSelector) => {
                    selector = selector.replace(
                        complexSelector.selector,
                        complexSelector.replacement
                    );
                });

                // Check exclusions
                if (this.component.exclude) {
                    let skip = false;
                    for (const regex of this.component.exclude) {
                        if (regex.test(selector)) {
                            skip = true;
                            break;
                        }
                    }
                    if (skip) continue;
                }

                const transformed = selectorTransform(selector, rule);
                if (transformed) {
                    result.push(transformed);
                }
            }
        }

        return result;
    }

    /**
     * Run the transformation on a parsed CSS file
     *
     * @param {object} root - The root of the CSS file to transform
     * @param {object} result - The result object that we are writing to
     */
    run(root, result) {
        this.root = root;
        this.result = result;

        const comment = postcss.comment({ text: this.headerText });
        this.result.root = postcss.root({
            nodes: [
                postcss.comment({ text: 'stylelint-disable' }),
                postcss.comment({ text: this.headerText }),
            ],
        });

        root.walkAtRules((atRule) => {
            if (atRule.name === 'keyframes') {
                this.result.root.append(atRule);
            }
        });
        root.walkRules((rule) => this.processRule(rule, result));
    }

    /**
     * Process one rule and then append the transformed rule to the output
     *
     * @param {object} rule - The rule to process
     * @param {object} result - The result object that we are writing to
     */
    processRule(rule, result) {
        this.result = result;

        if (rule.selector === ':root') {
            // Make sure that there are no :root rules
            rule.walkDecls((decl) => {
                decl.warn(
                    result,
                    ':root node unsupported in extraction for web components'
                );
                return false;
            });
            return;
        }

        const convertedSelectors = this.convertSelectors(rule);
        this.appendRule(
            convertedSelectors,
            rule.nodes,
            `${rule.selectors.join(',\n   * ')}`
        );
    }

    /**
     * Append a CSS rule to the output
     *
     * @param {string[]} selectors - The selectors for the rule
     * @param {object[]} nodes - The nodes to place under the rule
     * @param {string} comment - The comment to begin the rule with
     */
    appendRule(selectors, nodes, comment) {
        if (selectors.length === 0) return;

        const selector = selectors.join(',');
        let parentRule;
        this.result.root.walkRules(selector, (rule) => {
            parentRule = rule;
            return false;
        });

        if (!parentRule) {
            parentRule = postcss.rule({ selectors });
            this.result.root.append(parentRule);
        }

        if (comment) {
            comment = postcss.comment({ text: comment });
            parentRule.append(comment);
        }

        parentRule.append(nodes);
    }

    /**
     * Return true if the selector has a combinator operator in it
     *
     * @param {string} selector - Selector to check
     * @return {string} True if there is a combinator
     */
    selectorHasCombinator(selector) {
        // Postcss splits the selectors on ',' we know we won't hit one.
        // therefore we can just look for a space or an operator
        return /[\s\>~+]/.test(selector);
    }

    /**
     * Make sure that the first component of the selector is wrapped in
     * a ":host()" declaration
     *
     * @param {string} selector - Selector to modify (e.g. "[variant='cta'] #button:focus")
     * @return {string} The modified selector (e.g. ":host([variant='cta']) #button:focus")
     */
    addHostToSelector(selector) {
        // We made a replacement, which means that this expression
        // is related to an attribute on the host node. We need to
        // make sure that the first component of the select is
        // wrapped in :host()
        if (!/^:host/.test(selector)) {
            // Ensure that pseudo elements are listed _after_, not as a part of, the `:host` or `:host(...)` selector.
            return selector.replace(/^([^\s>+~\|\:{2}]+)(.*)/, ':host($1)$2');
        } else {
            return selector;
        }
    }

    /**
     * Get the copyright header text
     *
     * @return {string} copyright header text
     */
    get headerText() {
        if (!this._headerText) {
            const licencePath = path.resolve(__dirname, '../config/license.js');
            let licenseText = fs.readFileSync(licencePath, {
                encoding: 'utf8',
            });
            licenseText = licenseText.split('\n').slice(1, -2).join('\n');
            this._headerText = `\n${licenseText}\n\nTHIS FILE IS MACHINE GENERATED. DO NOT EDIT`;
        }
        return this._headerText;
    }
}

module.exports = postcss.plugin('postcss-process-spectrum', (opts) => {
    const { component } = opts;
    return (root, result) => {
        const processor = new SpectrumProcessor(component);
        processor.run(root, result);
    };
});

class ComponentConfig {
    constructor(config) {
        Object.assign(this, config);
        this.processor = parser();
        this._normalize();
    }

    /**
     * Check if this node is for our spectrum root class (e.g. .spectrum-Button)
     * @param {Node} node AST node to check
     */
    isRootSpectrumClass(node) {
        return compareNodes(node, this.spectrumClass);
    }

    /**
     * Return the shadow DOM AST node for the given node, if there is one
     * @param {Node} node The AST node that may represent an id
     * @return {Node|undefined} The shadow version of the given node if it is for an id
     */
    shadowNodeForId(node) {
        for (const id of this.ids) {
            if (compareNodes(id.node, node)) {
                return id.shadowNode;
            }
        }
    }

    /**
     * Return the slot config for the given node, if there is one
     * @param {Node} node The AST node that may represent an id
     * @return {Object|undefined} The slot config record for the node if there is one
     */
    slotForNode(node) {
        for (const slot of this.slots) {
            if (compareNodes(slot.node, node)) {
                return slot;
            }
        }
    }

    /**
     * Return the attribute config or attribute values config for the given
     * node, if there is one
     * @param {Node} node The AST node that may represent an attribute
     */
    attributeForNode(node) {
        for (const attribute of this.attributes) {
            if (attribute.node && compareNodes(attribute.node, node)) {
                return attribute;
            }
            if (attribute.type === 'enum') {
                for (const value of attribute.values) {
                    if (compareNodes(value.node, node)) {
                        return value;
                    }
                }
            }
        }
    }

    /**
     * Return the descendant attribute config or attribute values config for the given
     * node, if there is one
     * @param {Node} node The AST node that may represent an attribute
     */
    descendantAttributeForNode(node) {
        for (const attribute of this.descendantAttributes) {
            if (attribute.node && compareNodes(attribute.node, node)) {
                return attribute;
            }
            if (attribute.type === 'enum') {
                for (const value of attribute.values) {
                    if (compareNodes(value.node, node)) {
                        return value;
                    }
                }
            }
        }
    }

    /**
     * Convert the configuration into a predicable format and flush it
     * out with some extra computed data that we will need
     */
    _normalize() {
        // Main selector for this component in the original spectrum-css
        this.hostSelector = this.host.selector || this.host;
        // The selector for the main (host) component in the shadow DOM
        this.hostShadowSelector = this.host.shadowSelector || ':host';

        this.spectrumClassIsHost = this.hostShadowSelector === ':host';
        this.spectrumClass = nodeFromSelector(this.hostSelector);
        this.hostShadowSelectorNode = nodeFromSelector(this.hostShadowSelector);

        const hostPortion = re`/${this.hostSelector}--?(.*)$/`;

        // Normalize the items that will map to ids in the shadow DOM
        this.ids = this.ids || [];
        this.ids = this.ids.map((id) => {
            let selector = id.selector || id;
            let name = id.name;
            if (!name) {
                const match = hostPortion.exec(selector);
                if (match) {
                    name = match[1];
                } else {
                    const message = `Unable to determine name for id ${selector}`;
                    throw new Error(message);
                }
            }
            const shadowSelector = `#${name}`;
            return {
                name,
                selector,
                shadowSelector,
                node: nodeFromSelector(selector),
                shadowNode: nodeFromSelector(shadowSelector),
            };
        });

        // Normalize the items that will map to attributes on our web component
        this.attributes = this.attributes || [];
        this.attributes.forEach((attribute) => {
            if (!attribute.name) {
                const expr = re`/(?:${this.hostSelector}--?|:)(.*)$/`;
                const match = expr.exec(attribute.selector);
                if (match) {
                    attribute.name = match[1];
                } else {
                    const message = `Unable to determine name for attribute ${attribute.selector}`;
                    throw new Error(message);
                }
            }
            let regex;
            if (attribute.type === 'boolean') {
                attribute.shadowSelector = `[${attribute.name}]`;
                attribute.regex = re`(?:${attribute.selector}|${attribute.shadowSelector})`;
                attribute.node = nodeFromSelector(attribute.selector);
                attribute.shadowNode = nodeFromSelector(
                    attribute.shadowSelector
                );
            } else if (attribute.type === 'enum') {
                attribute.values = attribute.values.map((value) => {
                    const selector = value.selector || value;
                    let name = value.name;
                    const basePortion = attribute.root
                        ? re`/${attribute.root}?(.*)$/`
                        : hostPortion;
                    if (!name) {
                        const match = basePortion.exec(selector);
                        if (match) {
                            name = match[1];
                        } else {
                            const message = `Unable to determine name for value ${value}`;
                            throw new Error(message);
                        }
                    }
                    const operator = attribute.wildcard ? '*=' : '=';
                    return {
                        name,
                        selector,
                        node: nodeFromSelector(selector),
                        shadowNode: nodeFromSelector(
                            `[${attribute.name}${operator}"${name}"]`
                        ),
                    };
                });
            }
        });

        this.descendantAttributes = this.descendantAttributes || [];
        this.descendantAttributes.forEach((attribute) => {
            if (!attribute.name) {
                const expr = re`/(?:${this.hostSelector}--?|:)(.*)$/`;
                const match = expr.exec(attribute.selector);
                if (match) {
                    attribute.name = match[1];
                } else {
                    const message = `Unable to determine name for attribute ${attribute.selector}`;
                    throw new Error(message);
                }
            }
            let regex;
            if (attribute.type === 'boolean') {
                attribute.shadowSelector = `[${attribute.name}]`;
                attribute.regex = re`(?:${attribute.selector}|${attribute.shadowSelector})`;
                attribute.node = nodeFromSelector(attribute.selector);
                attribute.shadowNode = nodeFromSelector(
                    attribute.shadowSelector
                );
            } else if (attribute.type === 'enum') {
                attribute.values = attribute.values.map((value) => {
                    const selector = value.selector || value;
                    let name = value.name;
                    const basePortion = attribute.root
                        ? re`/${attribute.root}?(.*)$/`
                        : hostPortion;
                    if (!name) {
                        const match = basePortion.exec(selector);
                        if (match) {
                            name = match[1];
                        } else {
                            const message = `Unable to determine name for value ${value}`;
                            throw new Error(message);
                        }
                    }
                    const operator = attribute.wildcard ? '*=' : '=';
                    return {
                        name,
                        selector,
                        node: nodeFromSelector(selector),
                        shadowNode: nodeFromSelector(
                            `[${attribute.name}${operator}"${name}"]`
                        ),
                    };
                });
            }
        });

        // Normalize the items that will map to slots in our web component
        this.slots = this.slots || [];
        this.slots = this.slots.map((slot) => {
            let selector = slot.selector || slot;
            let name = slot.name;
            let contents = slot.contents;
            let shadowSlotSelector;
            let shadowSlottedSelector;
            if (!name) {
                // If no name is specified, fallback to default slot
                shadowSlotSelector = 'slot';
                if (contents) {
                    shadowSlottedSelector = `::slotted(${contents})`;
                } else {
                    shadowSlottedSelector = `::slotted(*)`;
                }
            } else {
                shadowSlotSelector = `slot[name="${name}"]`;
                if (contents) {
                    shadowSlottedSelector = `::slotted(${contents}[slot='${name}'])`;
                } else {
                    shadowSlottedSelector = `::slotted([slot='${name}'])`;
                }
            }
            return {
                name,
                selector,
                shadowSlotSelector,
                shadowSlottedSelector,
                node: nodeFromSelector(selector),
                shadowSlotNode: nodeFromSelector(shadowSlotSelector),
                shadowSlottedNode: nodeFromSelector(shadowSlottedSelector),
            };
        });

        this.classes = this.classes || [];
        this.classes = new Map(
            this.classes.map((obj) => {
                const name = obj.name;
                const selector = obj.selector;
                if (!selector || !name) {
                    const componentName = this.spectrumClass;
                    const message = `Class mapping for ${componentName} is invalid. Usage: { selector: string, name: string }`;
                    throw new Error(message);
                }
                return [selector.slice(1), name];
            })
        );

        this.complexSelectors = this.complexSelectors || [];
    }
}

// AST helper functions

/**
 * Get an AST node for a selector fragment string. The selector
 * passed in must be simple enough to be expressed in a single node
 * (e.g a classname)
 * @param {string} selector a selector (e.g. .spectrum-Button)
 * @return {Node} An AST node for the given selector
 */
function nodeFromSelector(selector) {
    const ast = astProcessor.astSync(selector);
    return ast.first.first;
}

/**
 * Compare two AST nodes to see if they are the same
 * @param {Node} nodeA An AST node
 * @param {Node} nodeB Another AST node
 * @return {Boolean} True if the nodes are equal
 */
function compareNodes(nodeA, nodeB) {
    if (!nodeA || !nodeB) return false;
    return nodeA.type === nodeB.type && nodeA.value === nodeB.value;
}

/**
 * Look for a combinator node in the given AST
 * @param {Container} selectorAST A selector AST or other Container
 * @return {Boolean} True if there is a combinator node
 */
function hasCombinator(selectorAST) {
    for (const node of selectorAST.nodes) {
        if (node.type === 'combinator') {
            return true;
        }
    }
    return false;
}

/**
 * Return the combinator node in the given AST
 * @param {Container} selectorAST A selector AST or other Container
 * @return {Node} The combinator node if one exists, or null
 */
function getCombinator(selectorAST) {
    for (const node of selectorAST.nodes) {
        if (node.type === 'combinator') {
            return node.value;
        }
    }
    return null;
}

/**
 * Replace a node in an expression with the given node or nodes.
 * The "ast" node and its siblings to the right will be cloned and
 * used to replace the "node"
 * @param {Node} node The node to replace
 * @param {Node} ast The node or nodes to replace it with
 */
function replaceNode(node, ast) {
    let current = ast.clone();
    let next = ast.next();
    node.replaceWith(current);

    while (next) {
        const cloned = next.clone();
        current.parent.insertAfter(current, cloned);
        current = cloned;
        next = next.next();
    }
}

function hasNode(selector, node) {
    let found = false;
    selector.each((selector) => {
        if (compareNodes(selector, node)) {
            found = true;
            return false;
        }
    });
    return found;
}

/**
 * Insert the given node into a :host declaration at the start of the selector.
 * If there is already a :host declaration, then use that. Otherwise make a new
 * :host declaration and prepend it
 * @param {Container} selector The selector expression to modify
 * @param {Node} node The AST node to clone and insert into the :host declaration
 */
function addNodeToHost(selector, node) {
    let hostSelector;
    if (
        selector.first &&
        selector.first.type === 'pseudo' &&
        selector.first.value === ':host'
    ) {
        hostSelector = selector.first.first;
    } else {
        // Make a new :host declaration and prepend it
        hostSelector = parser.selector();
        const host = parser.pseudo({ value: ':host' });
        host.append(hostSelector);
        if (selector.length > 0) {
            selector.prepend(parser.combinator({ value: ' ' }));
        }
        selector.prepend(host);
    }
    hostSelector.append(node.clone());
}
