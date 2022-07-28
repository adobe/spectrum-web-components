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

import { buildPackage, watchFiles } from './ts-tools.js';
import chokidar from 'chokidar';
import debounce from 'debounce';

const debounceBuildTSFiles = debounce.debounce(buildPackage, 200);

const watchTS = async () => {
    const files = await watchFiles();
    // One-liner for current directory
    chokidar
        .watch(files, {
            ignoreInitial: true,
        })
        .on('change', (path) => {
            console.log(`Process TS change in: ${path}`);
            debounceBuildTSFiles([`./${path}`]);
        })
        .on('add', (path) => {
            console.log(`Process TS added at: ${path}`);
            debounceBuildTSFiles([`./${path}`]);
        });

    console.log('Listening to TS...');
};

watchTS();
