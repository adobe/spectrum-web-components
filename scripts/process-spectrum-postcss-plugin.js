/*
Copyright 2018 Adobe. All rights reserved.
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

class SpectrumProcessor {
    constructor(component) {
        this.component = component;
        this.mappings = [];
    }

    warn(...args) {
        this.result.warn(...args);
    }

    get selectorTransform() {
        // Compose a series of transformations for selectors.
        const transformations = [];

        // Check if this selector uses a complex combinator with the host
        const complexSelectorRegex = re`${this.hostSelector}\s*([>+~]|\|\|)\s*`;
        transformations.push((selector, rule) => {
            const match = complexSelectorRegex.exec(selector);
            if (match) {
                this.warn(
                    `:host rules cannot use complex combinator (${match[1]})`,
                    {
                        node: rule,
                        word: match[1],
                    }
                );
                return;
            }
            return selector;
        });

        // For rules that are just the host selector, do a simple replacement
        // e.g. ".spectrum-Button" -> ":host"
        transformations.push((selector) =>
            selector === this.hostSelector ? ':host' : selector
        );

        // Add a mapping that strips references to the host component from
        // selectors, as the shadow DOM scoping handles that for us
        // e.g. ".spectrum-Button .spectrum-Button-label" -> ".spectrum-Button-label"
        const hostRegex = re`/^${this.hostSelector}\s+(.*)$/`;
        transformations.push((selector) => selector.replace(hostRegex, '$1'));

        // If the first part of a selector references the host, then
        // add a :host wrapper
        const hostReferenceRegex = re`${this.hostSelector}([:.#\[][^\s]+)(.*)`;
        transformations.push((selector) =>
            selector.replace(hostReferenceRegex, ':host($1)$2')
        );

        // Map shadow DOM classes to ids
        // e.g. ".spectrum-Button-label" -> "#label"
        if (this.component.ids) {
            for (const id of this.component.ids) {
                const idName = id.name || this.stripHostFromSelector(id);
                if (idName) {
                    const idSelector = `#${idName}`;
                    transformations.push((selector) =>
                        selector.replace(
                            this.regexForClassSelector(id),
                            idSelector
                        )
                    );
                }
            }
        }

        // Map classes to slotted content
        // e.g. ".spectrum-Icon" -> "::slotted([slot='icon'])"
        if (this.component.slots) {
            for (const slot of this.component.slots) {
                const slotName = slot.name || this.stripHostFromSelector(slot);
                if (slotName) {
                    const selectorRegex = this.regexForClassSelector(slot);
                    const slotSelector = `slot[name="${slotName}"]`;
                    const slottedSelector = `::slotted([slot="${slotName}"])`;
                    transformations.push((selector) => {
                        if (this.selectorHasCombinator(selector)) {
                            // Compound selectors will need to refer to the
                            // slot itself
                            return selector.replace(
                                selectorRegex,
                                slotSelector
                            );
                        } else {
                            return selector.replace(
                                selectorRegex,
                                slottedSelector
                            );
                        }
                    });
                }
            }
        }

        // Map classes to attributes
        if (this.component.attributes) {
            for (const attribute of this.component.attributes) {
                if (attribute.type === 'boolean') {
                    const attrName =
                        attribute.name ||
                        this.stripHostFromSelector(attribute.selector);
                    const selectorExpr = this.regexForHostSelector(
                        attribute.selector
                    );
                    transformations.push((selector) => {
                        let result = selector.replace(
                            selectorExpr,
                            `[${attrName}]$1`
                        );
                        if (selector !== result) {
                            result = this.addHostToSelector(result);
                        }
                        return result;
                    });
                } else if (attribute.type === 'enum') {
                    for (const selector of attribute.selectors) {
                        const attrName = this.stripHostFromSelector(selector);
                        const selectorExpr = this.regexForHostSelector(
                            selector
                        );
                        transformations.push((selector) => {
                            let result = selector.replace(
                                selectorExpr,
                                `[${attribute.name}="${attrName}"]$1`
                            );
                            if (selector !== result) {
                                result = this.addHostToSelector(result);
                            }
                            return result;
                        });
                    }
                }
            }
        }

        if (this.component.selectorTransforms) {
            this.component.selectorTransforms.forEach((transform) =>
                transformations.push(transform)
            );
        }

        return (selector, rule) => {
            let result = selector;
            for (const transformation of transformations) {
                result = transformation(result, rule);
                if (result == null) break;
            }
            return result;
        };
    }

    convertSelectors(rule) {
        const result = [];

        const startsWithHost = re`^${this.hostSelector}`;
        const selectorTransform = this.selectorTransform;

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
            const transformed = selectorTransform(selector, rule);
            if (transformed) {
                result.push(transformed);
            }
        }

        return result;
    }

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

        root.walkRules((rule) => this.processRule(rule, result));
    }

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

        if (this.component.exclude) {
            for (const regex of this.component.exclude) {
                if (regex.test(rule.selector)) {
                    return;
                }
            }
        }

        const convertedSelectors = this.convertSelectors(rule);
        this.appendRule(
            convertedSelectors,
            rule.nodes,
            `${rule.selectors.join(',\n   * ')}`
        );
    }

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

    stripHostFromSelector(selector) {
        let match = /:(.*)/.exec(selector);
        if (match) {
            // We are converting a pseudo class (e.g. :disabled) into a boolean attribute
            return match[1];
        }
        const hostPortion = re`/${this.hostSelector}--?(.*)$/`;
        match = hostPortion.exec(selector);
        if (!match) {
            // Is this in our id list?
            if (this.component.ids) {
                for (const id of this.component.ids) {
                    const idSelector = id.selector || id;
                    const idPortion = re`/^${idSelector}(?![-\w])/`;

                    if (idPortion.test(selector)) {
                        // This matches an id, so skip it
                        return selector;
                    }
                }
            }

            // Does it match an attribute selector?
            if (this.component.attributes) {
                for (const attribute of this.component.attributes) {
                    const selectors = attribute.selectors || [
                        attribute.selector,
                    ];
                    for (const selector of selectors) {
                        const regex = re`/^${selector}(?![-\w])/`;

                        if (regex.test(selector)) {
                            // This matches an id, so skip it
                            return selector;
                        }
                    }
                }
            }

            this.warn(
                `Do not know how to handle classname (${selector}) that does not start with host selector (${
                    this.hostSelector
                })`
            );
            return;
        }
        return match[1];
    }

    selectorHasCombinator(selector) {
        // Check if this selector has a combinator (e.g. a > b). Because
        // postcss splits the selectors on ',' we know we won't hit one.
        // therefore we can just look for a space or an operator
        return /[\s\>~+]/.test(selector);
    }

    addHostToSelector(selector) {
        // We made a replacement, which means that this expression
        // is related to an attribute on the host node. We need to
        // make sure that the first component of the select is
        // wrapped in :host()
        if (!/^:host/.test(selector)) {
            return selector.replace(/^([^\s>+~\|]+)(.*)/, ':host($1)$2');
        } else {
            return selector;
        }
    }

    regexForClassSelector(id) {
        const selector = id.selector || id;
        return re`/${selector}(?=$|[\s|:,.>+~\[\)])/`;
    }

    regexForHostSelector(selector) {
        return re`${this.regexForClassSelector(selector)}([^\s>+~,]*)`;
    }

    get hostSelector() {
        return this.component.host;
    }

    get headerText() {
        if (!this._headerText) {
            const licencePath = path.resolve(__dirname, '../config/license.js');
            let licenseText = fs.readFileSync(licencePath, {
                encoding: 'utf8',
            });
            licenseText = licenseText
                .split('\n')
                .slice(1, -2)
                .join('\n');
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
