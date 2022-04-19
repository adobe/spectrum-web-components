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

const { readFileSync, existsSync } = require('fs');
const {
    createPlugin,
    utils: { report, ruleMessages, validateOptions },
} = require('stylelint');
const { compareTwoStrings } = require('string-similarity');

const ruleName = 'header/header';

const messages = ruleMessages(ruleName, {
    rejected: 'Header not found',
});

module.exports = createPlugin(
    ruleName,
    (primaryOption, secondaryOptions, context) => {
        let header;
        // Read-in the header file
        try {
            header = readFileSync(primaryOption, 'utf8');
            header = header.replace(/(\/\*|\*\/)/g, '').trim();
        } catch (error) {
            throw new Error(error.message);
        }

        header = header.replace('<%= YEAR %>', new Date().getFullYear());

        // Parse incoming CSS for header
        return (root, result) => {
            const validOptions = validateOptions(
                result,
                ruleName,
                {
                    actual: primaryOption,
                    possible: [
                        false,
                        (x) => typeof x === 'string' && existsSync(x),
                    ],
                },
                {
                    optional: true,
                    actual: secondaryOptions,
                    possible: {
                        nonMatchingTolerance: [
                            (x) => typeof x === 'number' && (x >= 0 || x <= 1),
                        ],
                    },
                }
            );

            if (!validOptions) return;

            const nonMatchingTolerance =
                secondaryOptions?.nonMatchingTolerance || 0.98;

            // Walk comments on root to find if header exists
            let found = false;
            root.walkComments((comment, _idx) => {
                // If the two strings are at least 98% alike, it's a match
                if (
                    compareTwoStrings(comment.text, header) >=
                    nonMatchingTolerance
                ) {
                    found = true;
                }

                // This escapes the loop if found, continues if not found
                return !found;
            });

            if (found) return;

            if (!context.fix) {
                // Just report the issue
                report({
                    ruleName: ruleName,
                    result: result,
                    message: messages.rejected,
                    node: root,
                });
            } else {
                // Add the provided header to the top of the file
                root.prepend({
                    text: header,
                    raws: {
                        left: context.newline,
                        right: context.newline,
                    },
                });
                // Put a few newlines between the comment and the first property
                root.nodes[1].raws.before = context.newline + context.newline;
            }
        };
    }
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
