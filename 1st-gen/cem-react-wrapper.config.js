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

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import yaml from 'js-yaml';

import defineElementPlugin from './scripts/define-element-plugin.js';
import reactWrapperPlugin from './scripts/cem-plugin-react-wrapper.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    globs: ['**/sp-*.ts', '**/overlay-trigger.ts', '**/src/[A-Z]*.ts'],
    exclude: [
        '**/sp-icon-*.ts',
        '**/*.d.ts',
        '**/stories/**',
        '**/test/**',
        'node_modules/*',
        '**/*.dev.*',
    ],
    litelement: true,
    packagejson: false,
    plugins: [
        defineElementPlugin(),
        reactWrapperPlugin({
            exclude: ['StoryDecorator', 'TooltipOpenable'],
            outDir: join(__dirname, 'react'),
            prettierConfig: yaml.load(
                readFileSync(join(__dirname, '.prettierrc.yaml'))
            ),
        }),
    ],
};
