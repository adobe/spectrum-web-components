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
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const versionFile = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../tools/base/src/version.js'
);

if (!existsSync(versionFile)) {
    console.warn(`Warning: Version file not found at ${versionFile}`);
    process.exit(0);
}

try {
    execSync(`yarn genversion --es6 --semi ${versionFile}`, {
        stdio: 'inherit',
    });
    console.log('Successfully updated version.js');
} catch (error) {
    console.warn('Warning: Error updating version.js:', error.message);
    process.exit(0);
}
