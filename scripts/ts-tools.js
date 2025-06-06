/*!
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

import fg from 'fast-glob';
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { dirs, log } from './utilities.js';

const relativeImportRegex = RegExp(
    'import([^;]+)["|\'](?![a-zA-Z@])(..+)(?<!.css).js["|\'];',
    'g'
);
const relativeDynamicImportRegex = RegExp(
    // eslint-disable-next-line prettier/prettier
    'import[(]["|\'](?![a-zA-Z@])(..+)(?!.css).js["|\'][)]',
    'g'
);
const relativeExportRegex = RegExp(
    'export([^;]+)["|\'](?![a-zA-Z@])(..+)(?<!.css).js["|\'];',
    'g'
);

const makeDev = {
    name: 'make-dev',
    setup(build) {
        // Am I fragile or what? Should we just force prevent the use of relative imports?
        build.onLoad({ filter: /\.ts$/ }, async (args) => {
            const js = await fs.promises.readFile(args.path, 'utf8');
            const relativeImportsProcessed = js.replace(
                relativeImportRegex,
                "import$1'$2.dev.js'"
            );
            const relativeDynamicImportsProcessed =
                relativeImportsProcessed.replace(
                    relativeDynamicImportRegex,
                    "import('$1.dev.js')"
                );
            const contents = relativeDynamicImportsProcessed.replace(
                relativeExportRegex,
                "export$1'$2.dev.js'"
            );
            return {
                contents,
                loader: 'ts',
            };
        });
    },
};

/**
 * Build TypeScript files for a package
 * @param {string[]} paths - Array of file paths to build
 * @returns {Promise<void>}
 */
export const buildPackage = async (paths) => {
    const devPaths = paths.filter(
        (path) =>
            path.search('/test/') === -1 &&
            path.search('/stories/') === -1 &&
            path.search('packages/icons-') === -1
    );
    const prodPath = paths.filter(
        (path) =>
            path.search('/test/') === -1 && path.search('/stories/') === -1
    );
    const toolPaths = paths.filter(
        (path) => path.search('/test/') > -1 || path.search('/stories/') > -1
    );
    const devPlugins = [makeDev];
    const prodPlugins = [];
    const builds = [];
    const config = {
        bundle: false,
        outdir: '.',
        outbase: '.',
        sourcemap: true,
        target: ['es2018'],
    };

    if (devPaths.length) {
        log.write(`Building ${devPaths.length} development files...\n`);
        builds.push(
            build({
                ...config,
                entryPoints: devPaths,
                define: { 'window.__swc.DEBUG': 'true' },
                outExtension: { '.js': '.dev.js' },
                plugins: devPlugins,
            })
                .then(() => log.success('Development build complete'))
                .catch((error) => {
                    log.fail(error, { throwError: true });
                })
        );
    }

    const prodConfig = {
        ...config,
        define: { 'window.__swc.DEBUG': 'false' },
        plugins: paths.length === 1 ? [] : prodPlugins,
    };

    if (prodPath.length) {
        log.write(`Building ${prodPath.length} production files...\n`);
        builds.push(
            build({
                ...prodConfig,
                entryPoints: prodPath,
                minify: true,
            })
                .then(() => log.success('Production build complete'))
                .catch((error) => {
                    log.fail(error, { throwError: true });
                })
        );
    }

    // Do not minify tools files, especially stories as it messes up the exports
    // when processed with es-module-lexer.
    if (toolPaths.length) {
        log.write(`Building ${toolPaths.length} tool files...\n`);
        builds.push(
            build({
                ...prodConfig,
                entryPoints: toolPaths,
            })
                .then(() => log.success('Tools build complete'))
                .catch((error) => {
                    log.fail(error, { throwError: true });
                })
        );
    }

    return Promise.all(builds);
};

/**
 * Build all TypeScript files in the project
 * @param {string[]} [specificFiles] - Optional array of specific files to build
 * @returns {Promise<void>}
 */
export const buildTSFiles = async (specificFiles) => {
    if (specificFiles && specificFiles.length > 0) {
        return buildPackage(specificFiles);
    }

    return fg([
        path.join(dirs.packages, '**/!(*.d).ts'),
        path.join(dirs.tools, '**/!(*.d).ts'),
        path.join(dirs.root, 'test/plugins/**/!(*.d).ts'),
        path.join(dirs.root, 'projects/story-decorator/**/!(*.d).ts'),
        path.join(dirs.root, 'projects/vrt-compare/**/!(*.d).ts'),
        path.join(dirs.root, 'test/lit-helpers.ts'),
        path.join(dirs.root, 'test/testing-helpers.ts'),
        path.join(dirs.root, 'test/testing-helpers-a11y.ts'),
        path.join(dirs.root, 'test/visual/test.ts'),
    ]).then((files) => buildPackage(files));
};
