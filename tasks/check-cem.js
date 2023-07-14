#!/usr/bin/env node

/*
Copyright 2023 Adobe. All rights reserved.
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

async function checkCEM() {
    const cem = fs.readFileSync(
        path.join(process.cwd(), 'custom-elements.json'),
        'utf8'
    );
    const character = cem.search('"tagName"');
    const found = character > -1;
    if (!found) {
        console.log(cem);
    }
    process.exit(found ? 0 : 1);
}

checkCEM();
