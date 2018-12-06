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
const fs = require('fs');
const stylelint = require('stylelint');
const ruleName = 'header/header';

const messages = stylelint.utils.ruleMessages(ruleName, {
    rejected: 'header not found',
});

module.exports = stylelint.createPlugin(ruleName, function(primaryOption) {
    const header = fs.readFileSync(primaryOption, 'utf8');
    return function(root, result) {
        const content = root.source.input.css;
        if (!content.startsWith(header)) {
            // TODO: add fixing support
            stylelint.utils.report({
                ruleName: ruleName,
                result: result,
                message: 'Header not found',
                node: root,
                line: 0,
                column: 0,
            });
        }
    };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
