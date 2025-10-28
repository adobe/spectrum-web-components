/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

export default {
    '*.css': [
        'stylelint --fix --cache --allow-empty-input',
        'prettier --cache --no-error-on-unmatched-pattern --ignore-unknown --log-level silent --write',
    ],
    '*.ts': [
        'eslint --fix --format pretty --cache --no-error-on-unmatched-pattern --quiet',
        'prettier --cache --no-error-on-unmatched-pattern --ignore-unknown --log-level silent --write',
    ],
    'first-gen/{packages,tools}/*/src/**/!(*.css).ts': [
        'yarn workspace @spectrum-web-components/1st-gen lit-analyzer',
    ],
    'package.json': () => [
        'cd first-gen && genversion --es6 --semi tools/base/src/version.js',
        'yarn constraints --fix',
        'yarn install --refresh-lockfile',
        'git add first-gen/tools/base/src/version.js yarn.lock',
    ],
    '.changeset/*.md': ['node first-gen/scripts/escape-changelog-tags.js'],
    '!(*.css|*.ts)': [
        'prettier --cache --no-error-on-unmatched-pattern --ignore-unknown --log-level silent --write',
    ],
};
