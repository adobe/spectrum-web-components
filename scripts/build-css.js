#!/usr/bin/env node

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

import path from 'path';
import fg from 'fast-glob';
import 'colors';

import { log, processCSS } from './css-tools.js';

async function main({ cwd = process.env.INIT_CWD ?? process.cwd() } = {}) {
    return fg(['src/**/*.css', 'src/*.css'], { cwd }).then((cssPaths) =>
        Promise.all(
            cssPaths.map((cssPath) =>
                processCSS(path.join(cwd, cssPath))
                    .then(() => console.log(cssPath.yellow + ' bundled'))
                    .catch((error) => {
                        log.fail(`Failed to process ${cssPath.yellow}`);
                        console.error(error);
                    })
            )
        ).catch((error) => {
            log.fail('Failed to process CSS files');
            console.error(error);
        })
    );
}

main();
