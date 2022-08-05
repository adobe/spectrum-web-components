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

import fg from 'fast-glob';
import { build } from 'esbuild';
import fs from 'fs';
import { execSync } from 'child_process';

const relativeImportRegex = RegExp(
    'import([^;]+)["|\'](?![a-zA-Z@])(..+)(?<!.css).js["|\'];',
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
            let js = await fs.promises.readFile(args.path, 'utf8');
            js = js.replace(relativeImportRegex, "import$1'$2.dev.js'");
            const contents = js.replace(
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

const makeExports = {
    name: 'make-exports',
    setup(build) {
        build.onEnd((data) => {
            execSync('node ./tasks/hydrate-export-maps.js');
        });
    },
};

export const buildPackage = async (paths) => {
    const devPaths = paths.filter(
        (path) =>
            path.search('/test/') === -1 &&
            path.search('/stories/') === -1 &&
            path.search('packages/icons-') === -1
    );
    const devPlugins = [makeDev];
    const prodPlugins = [makeExports];
    const builds = [];
    if (devPaths.length) {
        builds.push(
            build({
                entryPoints: devPaths,
                bundle: false,
                outdir: '.',
                outbase: '.',
                sourcemap: true,
                define: { 'window.__swc.DEBUG': true },
                outExtension: { '.js': '.dev.js' },
                plugins: devPlugins,
            }).catch(() => process.exit(1))
        );
    }
    if (paths.length) {
        builds.push(
            build({
                entryPoints: paths,
                bundle: false,
                outdir: '.',
                outbase: '.',
                sourcemap: true,
                minify: true,
                target: ['es2018'],
                define: { 'window.__swc.DEBUG': false },
                plugins: paths.length === 1 ? [] : prodPlugins,
            }).catch(() => process.exit(1))
        );
    }
};

export const watchFiles = async () => {
    const files = await fg([
        './packages/**/!(*.d).ts',
        './tools/**/!(*.d).ts',
        './test/plugins/**/!(*.d).ts',
        './projects/story-decorator/**/!(*.d).ts',
        './projects/vrt-compare/**/!(*.d).ts',
        './test/lit-helpers.ts',
        './test/testing-helpers.ts',
        './test/testing-helpers-a11y.ts',
        './test/testing-helpers.ts',
        './test/visual/test.ts',
    ]);
    return files;
};

export const buildTSFiles = async () => {
    const files = await watchFiles();
    buildPackage(files);
};
