#!/usr/bin/env node

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

import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import debounce from 'debounce';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copy(source) {
    const indexJSDir = path.resolve(__dirname, '../_site/src/index.js');
    const sourceFile = fs.readFileSync(source);
    const sourceParts = source.split(path.sep);
    const srcIndex = sourceParts.indexOf('src');
    sourceParts.splice(srcIndex, 0, '_site');
    const destinationPath = path.resolve(...sourceParts);
    const indexJSSource = fs.readFileSync(indexJSDir);
    fs.writeFileSync(destinationPath, sourceFile);
    fs.writeFileSync(indexJSDir, indexJSSource);
}

const debounceCopyCSS = debounce.debounce(copy, 200);

// One-liner for current directory
chokidar
    .watch('src/**/*.css')
    .on('change', debounceCopyCSS)
    .on('add', debounceCopyCSS);

// eslint-disable-next-line no-console
console.log('Listening to CSS...');
