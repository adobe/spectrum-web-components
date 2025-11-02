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

import chokidar from 'chokidar';
import debounce from 'debounce';
import { processREADME } from './copy-component-docs.js';

const debounceProcessREADME = debounce(processREADME, 200);

// One-liner for current directory
chokidar
    .watch(['../../packages/*/*.md', '../../tools/*/*.md'])
    .on('change', debounceProcessREADME)
    .on('add', debounceProcessREADME);

// eslint-disable-next-line no-console
console.log('Listening to MD Files...');
