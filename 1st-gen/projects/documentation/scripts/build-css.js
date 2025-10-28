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

import { bundleAsync } from 'lightningcss';
import fg from 'fast-glob';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(__dirname, '..');
const nodeModulesDir = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'node_modules'
);
const outDir = path.resolve(projectDir, '_site');

const { files } = yargs(hideBin(process.argv)).argv;

async function bundle(fileName) {
    let { code, map } = await bundleAsync({
        filename: fileName,
        minify: true,
        errorRecovery: true,
        resolver: {
            read(filePath) {
                const file = fs.readFileSync(filePath, 'utf8');
                return file;
            },
            resolve(specifier, from) {
                if (specifier.startsWith('./')) {
                    const resolution = path.resolve(from, '..', specifier);
                    return resolution;
                } else {
                    const resolution = path.resolve(nodeModulesDir, specifier);
                    return resolution;
                }
            },
        },
    });
    return { code, map };
}

async function main() {
    for await (const cssSource of await fg(`${projectDir}/${files}`)) {
        const fileName = cssSource.split(path.sep).at(-1);
        const { code, map } = await bundle(cssSource);
        await fs.writeFile(path.resolve(outDir, fileName), code);
    }
    process.exit(0);
}

main();
