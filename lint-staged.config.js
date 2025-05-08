/* eslint-disable no-console */
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
import { execSync } from 'child_process';

export default {
    // Runs ESLint with fix on all staged JS/TS files
    '*.{js,ts}': (files) => {
        console.log('Running ESLint on:', files.join(' '));
        return [`eslint --fix ${files.join(' ')}`];
    },

    // Runs lit-analyzer only on relevant .ts files inside src (excluding .css)
    '{packages,tools}/*/src/**/!(*.css).ts': (files) => {
        console.log('Running lit-analyzer on:', files.join(' '));
        return [`lit-analyzer ${files.join(' ')}`];
    },

    // Runs stylelint with fix on all staged CSS files
    '{packages,tools}/**/*.css': (files) => {
        console.log('Running stylelint on:', files.join(' '));
        return [`stylelint --fix ${files.join(' ')}`];
    },

    // Formats selected staged files with Prettier
    '!(*.css|*.ts)': [
        'prettier --cache --no-error-on-unmatched-pattern --ignore-unknown --log-level silent --write',
    ],

    // Generates and add version file
    // This will always re-run and stage version.js
    'tools/base/src/version.js': () => {
        console.log('Generating version file...');
        execSync('yarn genversion --es6 --semi tools/base/src/version.js');
        return 'git add tools/base/src/version.js';
    },
};
