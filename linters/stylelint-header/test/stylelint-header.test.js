/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { readFileSync } = require('fs');
const { getTestRule } = require('jest-preset-stylelint');

const plugin = require('..');
const { messages, ruleName } = plugin;

const testRule = getTestRule({ plugins: ['.'] });

testRule({
    ruleName,
    config: [
        './input.txt',
        {
            nonMatchingTolerance: 1,
            templateVariables: {
                company: 'Adobe',
            },
        },
    ],
    fix: true,

    accept: [
        {
            code: readFileSync('test/pass.css', { encoding: 'utf-8' }),
            description: 'Simple CSS with header included',
        },
    ],

    reject: [
        {
            code: readFileSync('test/fail.css', { encoding: 'utf-8' }),
            fixed: readFileSync('test/fixed.css', { encoding: 'utf-8' }),
            description: 'Auto-fix file missing header',
            message: messages.rejected,
        },
    ],
});

testRule({
    ruleName,
    config: [
        'Copyright <%= YEAR %> <%= company %>.',
        {
            nonMatchingTolerance: 1,
            templateVariables: {
                company: 'Adobe',
            },
        },
    ],

    accept: [
        {
            code: readFileSync('test/pass.css', { encoding: 'utf-8' }),
            description: 'Simple CSS with header included',
        },
    ],

    reject: [
        {
            code: readFileSync('test/fail.css', { encoding: 'utf-8' }),
            description: 'Error if missing header',
            message: messages.rejected,
        },
    ],
});
