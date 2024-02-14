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

const { existsSync, readFileSync } = require('fs');
const { createPlugin, utils } = require('stylelint');
const { compareTwoStrings } = require('string-similarity');
const { template } = require('lodash');

const ruleName = 'header/header';

const messages = utils.ruleMessages(ruleName, {
    rejected: 'Header not found',
});

const rule = createPlugin(
    ruleName,
    (pathOrString, options = {}, context = {}) =>
        (root, result) => {
            if (typeof pathOrString === 'boolean' && !pathOrString) return;

            let headerTemplate = existsSync(pathOrString)
                ? readFileSync(pathOrString, 'utf8')
                : pathOrString;

            if (!headerTemplate) return;

            // Trim any comment tags from the string and remove whitespace
            headerTemplate = headerTemplate.replace(/(\/\*|\*\/)/g, '').trim();

            const validOptions = utils.validateOptions(
                result,
                ruleName,
                {
                    actual: pathOrString,
                    possible: [
                        false,
                        (x) => typeof x === 'string' && existsSync(x),
                    ],
                },
                {
                    optional: true,
                    actual: options,
                    possible: {
                        nonMatchingTolerance: [
                            (x) => typeof x === 'number' && (x >= 0 || x <= 1),
                        ],
                        templateInputs: [(x) => typeof x === 'object'],
                    },
                }
            );

            if (!validOptions) return;

            const getHeader = template(headerTemplate);
            const header = getHeader({
                YEAR: new Date().getFullYear(),
                ...options.templateInputs,
            });

            const nonMatchingTolerance = options?.nonMatchingTolerance || 0.98;

            // Walk comments on root to find if header exists
            let found = false;
            root.walkComments((comment, _idx) => {
                // Remove any asterisks and whitespace from the texts before comparing
                const clean = (text) => text.replace(/(\*|\n|\s)/g, '').trim();
                // If the two strings are at least 98% alike, it's a match
                if (
                    compareTwoStrings(clean(comment.text), clean(header)) >=
                    nonMatchingTolerance
                ) {
                    found = true;
                }

                // This escapes the loop if found, continues if not found
                return !found;
            });

            if (found) return;

            if (context.fix) {
                const lineLength = header.split('\n').length;
                let raws = {};
                if (lineLength > 1) {
                    raws = {
                        left: context.newline,
                        right: context.newline,
                    };
                }
                // Add the provided header to the top of the file
                root.prepend({
                    text: header,
                    raws,
                });
                // Put a few newlines between the comment and the first property
                root.nodes[1].raws.before = context.newline + context.newline;
            } else {
                // Just report the issue
                utils.report({
                    ruleName: ruleName,
                    result: result,
                    message: messages.rejected,
                    node: root,
                });
            }
        }
);

rule.ruleName = ruleName;
rule.messages = messages;

module.exports = rule;
