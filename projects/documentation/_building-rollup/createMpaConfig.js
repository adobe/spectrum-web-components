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
import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import fs from 'fs';
import { listFiles } from './utils.js';

/**
 * @param {MpaOptions} options
 */
export async function createMpaConfig(options) {
    const htmlFiles = await listFiles(options.inputGlob);
    const html = await Promise.all(
        htmlFiles.map(async (inputPath) => {
            const name = inputPath.substring(options.rootPath.length + 1);
            let rootDir = inputPath.split('/');
            rootDir.pop();
            rootDir = rootDir.join('/');
            return {
                name,
                inputPath,
                rootDir,
                html: fs.readFileSync(inputPath, 'utf8'),
            };
        })
    );
    const userOptions = merge(
        {
            html: {
                flatten: false,
                html,
            },
            workbox: {
                navigateFallback: '/404.html',
            },
            injectServiceWorker: false,
        },
        options
    );
    return createSpaConfig(userOptions);
}
