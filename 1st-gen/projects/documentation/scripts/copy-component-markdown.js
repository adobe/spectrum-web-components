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
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '../content/components');
const outDir = path.resolve(__dirname, '../_site/components');

function main() {
    if (!fs.existsSync(contentDir)) {return;}
    fs.mkdirSync(outDir, { recursive: true });

    const dirs = fs.readdirSync(contentDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    for (const { name } of dirs) {
        const src = path.join(contentDir, name, 'content.md');
        if (!fs.existsSync(src)) {continue;}
        const dest = path.join(outDir, `${name}.md`);
        fs.copyFileSync(src, dest);
    }
}

main();
