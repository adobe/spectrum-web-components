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

import { execSync } from 'child_process';
import pkg from '@spectrum-web-components/button/package.json' with { type: 'json' };

const version = pkg.version;

try {
    // Check if the tag already exists
    execSync(`git rev-parse v${version}`, { stdio: 'ignore' });
    console.log(`Tag v${version} already exists.`);
} catch (error) {
    console.log(`Creating tag v${version}...`);
    execSync(`git tag -a v${version} -m "Release v${version}"`, {
        stdio: 'inherit',
    });
    console.log(`Tag v${version} created successfully.`);
    console.log(`Pushing tag v${version} to remote...`);
    execSync(`git push origin v${version}`, { stdio: 'inherit' });
    console.log(`Tag v${version} pushed successfully.`);
}
