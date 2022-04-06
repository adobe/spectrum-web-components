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
import html from '@web/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { copy } from '@web/rollup-plugin-copy';
import visualizer from 'rollup-plugin-visualizer';

export default {
    input: 'test/visual/src/index.html',
    preserveEntrySignatures: false,
    output: { dir: 'test/visual/review' },
    plugins: [
        nodeResolve(),
        html(),
        copy({ patterns: '**/*.json', rootDir: 'test/visual/src' }),
        visualizer(),
    ],
};
