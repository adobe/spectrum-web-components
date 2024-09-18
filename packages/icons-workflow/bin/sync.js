/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '../../../');

const iconsDir = path.join(
    rootDir,
    'packages',
    'icons-workflow',
    'src',
    'icons'
);
const iconsS2Dir = path.join(
    rootDir,
    'packages',
    'icons-workflow',
    'src',
    'icons-s2'
);

const disclaimer = `
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/`;

function ensureFileExists(filePath, iconName) {
    if (!fs.existsSync(filePath)) {
        const content = `
            ${disclaimer}

            import { tag as html, TemplateResult } from '../custom-tag.js';

            export { setCustomTemplateLiteralTag } from '../custom-tag.js';
            export const ${iconName}Icon = ({ width = 24, height = 24, hidden = false, title = 'Abc' } = {}):
            | string
            | TemplateResult => {
            return html\`<svg
                xmlns="http://www.w3.org/2000/svg"
                height=24
                viewBox="0 0 36 36"
                width=24
                role="img"
                aria-hidden="false"
                aria-label="Dummy"
                fill="currentColor"
            >
                <path
                d="m4.936 20.484-1.1 3.322a.235.235 0 0 1-.259.194H.988c-.172 0-.216-.086-.172-.237 1.143-3.236 2.976-8.543 4.335-12.275a3.813 3.813 0 0 0 .216-1.337.136.136 0 0 1 .151-.151h3.473a.162.162 0 0 1 .173.108c1.575 4.336 3.3 9.276 4.9 13.676.064.151.021.216-.13.216h-2.85a.193.193 0 0 1-.216-.151L9.66 20.484Zm4.055-2.459C8.56 16.558 7.7 14.1 7.265 12.545h-.021c-.324 1.467-1.1 3.732-1.661 5.48Z"
                />
                <path
                d="M14.045 10.257c0-.15.022-.193.129-.214.943-.022 2.743-.043 4.565-.043 4.436 0 5.379 1.95 5.379 3.686a3.1 3.1 0 0 1-2.036 3v.043a3.309 3.309 0 0 1 2.572 3.236c0 2.658-2.294 4.029-6.194 4.029-1.65.022-3.386-.021-4.265-.043a.17.17 0 0 1-.15-.193Zm2.979 5.379h1.865c1.714 0 2.25-.707 2.25-1.628 0-1.158-.772-1.629-2.422-1.629-.836 0-1.5.021-1.693.043Zm0 5.937c.236 0 .729.042 1.608.042 1.8 0 2.871-.471 2.871-1.8 0-1.114-.686-1.757-2.593-1.757h-1.886ZM32.752 10a7.959 7.959 0 0 1 2.946.439c.1.063.126.1.126.251v2.21c0 .189-.1.189-.188.147a7.061 7.061 0 0 0-2.779-.523 4.175 4.175 0 0 0-4.535 4.43c0 3.427 2.466 4.388 4.514 4.388a8.49 8.49 0 0 0 2.925-.5c.1-.042.167 0 .167.125v2.152c0 .147-.021.23-.167.293a8.621 8.621 0 0 1-3.448.588c-3.74 0-7.041-2.069-7.041-6.958 0-3.991 2.928-7.042 7.48-7.042Z"
                />
            </svg>\`;
            }
        `;

        prettier
            .format(content, {
                printWidth: 100,
                tabWidth: 2,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                arrowParens: 'avoid',
                parser: 'typescript',
            })
            .then((icon) => {
                fs.writeFileSync(filePath, icon, 'utf-8');
            });
    }
}

function syncDirectories(dir1, dir2) {
    const filesDir1 = fs.readdirSync(dir1);
    const filesDir2 = fs.readdirSync(dir2);

    const filesSetDir1 = new Set(filesDir1);
    const filesSetDir2 = new Set(filesDir2);

    const iconsDir1 = [];
    // Files in dir1 but not in dir2
    filesSetDir1.forEach((file) => {
        if (!filesSetDir2.has(file)) {
            const filePath = path.join(dir2, file);

            // if the file extension is not .ts, skip
            if (!file.endsWith('.ts')) {
                return;
            }

            // remove .ts from file
            const iconName = file.replace('.ts', '');

            iconsDir1.push(iconName);
        }
    });

    const iconsDir2 = [];

    // Files in dir2 but not in dir1
    filesSetDir2.forEach((file) => {
        if (!filesSetDir1.has(file)) {
            const filePath = path.join(dir1, file);

            // if the file extension is not .ts, skip
            if (!file.endsWith('.ts')) {
                return;
            }

            // remove .ts from file
            const iconName = file.replace('.ts', '');

            iconsDir2.push(iconName);
        }
    });

    // make a new json file and export iconsDir1 and iconsDir2
    const iconsDir1Json = JSON.stringify(iconsDir1, null, 4);
    const iconsDir2Json = JSON.stringify(iconsDir2, null, 4);

    fs.writeFileSync(
        path.join(
            rootDir,
            'packages',
            'icons-workflow',
            'bin',
            'iconsDir1.json'
        ),
        iconsDir1Json,
        'utf-8'
    );

    fs.writeFileSync(
        path.join(
            rootDir,
            'packages',
            'icons-workflow',
            'bin',
            'iconsDir2.json'
        ),
        iconsDir2Json,
        'utf-8'
    );
}

syncDirectories(iconsDir, iconsS2Dir);
syncDirectories(iconsS2Dir, iconsDir);

console.log('Directories synchronized.');
