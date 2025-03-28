#!/usr/bin/env node

/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import gv from 'genversion';

const __dirname = dirname(fileURLToPath(import.meta.url));
const versionFile = resolve(__dirname, '../tools/base/src/version.js');

if (!existsSync(versionFile)) {
    console.warn(`Warning: Version file not found at ${versionFile}`);
    process.exit(0);
}

gv.check(versionFile, function (error, isByGv) {
    if (error) {
        throw error;
    }
    if (isByGv) {
        gv.generate(
            versionFile,
            { useSemicolon: true, useEs6Syntax: true },
            (error) => {
                if (error) {
                    throw error;
                }
                console.log('Generated version file with ES6 export.');
            }
        );
    }
});
