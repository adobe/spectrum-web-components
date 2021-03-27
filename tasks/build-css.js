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

import path from 'path';
import fs from 'fs';

import gulp from 'gulp';
import cached from 'gulp-cached';
import debug from 'gulp-debug';
import header from 'gulp-header';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import wrap from 'gulp-wrap';
import merge from 'merge2';
import tap from 'gulp-tap';
import { postCSSPlugins, wrapCSSResult } from '../scripts/css-processing.cjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.resolve(path.join(__dirname, '..'));

function whichDst(file, t) {
    const dirname = path.dirname(file.path);
    const component = dirname.split('packages/')[1].split('/')[0];
    const name = file.relative.split('/')[2];
    const base = file.base;
    file.path = path.join(base, name);
    t.through(gulp.dest, ['packages/' + component + '/src/']);
}
const configPath = path.resolve(path.join(__dirname, '..', 'config'));

const buildCSS = () => {
    const tsResult = merge([
        gulp.src([
            './packages/**/src/*.css',
            '!./packages/**/node_modules/**/*.css',
        ]),
    ])
        // create in-memory cache of css files so we don't reprocess everything all the time
        .pipe(cached('css'))
        .pipe(debug({ title: 'css' }))
        // process with postcss
        .pipe(postcss(postCSSPlugins()))
        // now wrap the css files in ES-modules for easy import in typescript
        .pipe(
            wrap((data) => wrapCSSResult(data.contents), {}, { parse: false })
        )
        // add license header to top of typescript file
        .pipe(
            header(
                fs.readFileSync(path.join(configPath, 'license.js'), 'utf8'),
                false
            )
        )
        // rename the wrapped css to typescript files
        .pipe(
            rename((path) => {
                path.extname = '.css.ts';
            })
        );

    // compile the ts to js
    return tsResult.pipe(tap(whichDst));
};
const watchBuildCSS = () => {
    return gulp.watch(path.join(srcPath, '**/*.css'), buildCSS);
};

export { buildCSS, watchBuildCSS };
