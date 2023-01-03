/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import lunr from 'lunr';
import globby from 'globby';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectDir = path.resolve(__dirname, '..', '..', '..');
const localDir = path.resolve(projectDir, 'projects/documentation/_site/src/');
const buildDir = path.resolve(projectDir, 'projects/documentation/dist');
const localIndexPath = path.resolve(localDir, 'searchIndex.json');
const buildIndexPath = path.resolve(buildDir, 'searchIndex.json');
fs.mkdirSync(localDir, { recursive: true });
fs.mkdirSync(buildDir, { recursive: true });

function nameToTitle(name) {
    return name.replace(/((^|\-)(\w))/gm, (match, p1, p2, p3) => {
        let result = p3.toUpperCase();
        if (p2 === '-') {
            result = ` ${result}`;
        }
        return result;
    });
}

async function main() {
    const documents = [];

    // Components
    for await (const path of globby.stream(`${projectDir}/packages/**/*.md`, {
        ignore: ['**/node_modules/**'],
    })) {
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(path)[1];
        const fileName = /([a-zA-Z-]+)\.md$/.exec(path)[0];
        if (fileName === 'CHANGELOG.md') {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        const content = await fs.readFile(path, { encoding: 'utf8' });
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(componentName);
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Components',
                name: title,
                url: `/${
                    process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''
                }components/${componentName}`,
            }),
        });
    }

    // Tools
    for await (const path of globby.stream(`${projectDir}/tools/**/*.md`, {
        ignore: ['**/node_modules/**'],
    })) {
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(path)[1];
        const fileName = /([a-zA-Z-]+)\.md$/.exec(path)[0];
        if (fileName === 'CHANGELOG.md') {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        const content = await fs.readFile(path, { encoding: 'utf8' });
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(componentName);
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Tools',
                name: title,
                url: `/${
                    process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''
                }tools/${componentName}`,
            }),
        });
    }

    // Guides
    for await (const path of globby.stream(
        [
            `${projectDir}/projects/documentation/content/guides/*.md`,
            `${projectDir}/projects/documentation/content/migrations/*.md`,
            `${projectDir}/projects/documentation/content/getting-started.md`,
            `${projectDir}/projects/documentation/content/dev-mode.md`,
        ],
        {
            ignore: ['**/node_modules/**'],
        }
    )) {
        const guideName = /\/([^/]+).md$/.exec(path)[1];
        const guideDir = path.split('/').at(-2);
        const content = await fs.readFile(path, { encoding: 'utf8' });
        const body = content.replace(/```((.|\s)*?)```/g, '');
        const title = nameToTitle(guideName);
        documents.push({
            title,
            body,
            metadata: JSON.stringify({
                category: 'Guides',
                name: title,
                url: `/${process.env.SWC_DIR ? `${process.env.SWC_DIR}/` : ''}${
                    guideDir !== 'content' ? `${guideDir}/` : ''
                }${guideName}`,
            }),
        });
    }

    const index = lunr(function () {
        this.ref('metadata');
        this.field('title', { boost: 10 });
        this.field('body');
        this.field('category');

        for (const document of documents) {
            this.add(document);
        }
    });

    await fs.writeFile(localIndexPath, JSON.stringify(index));
    await fs.writeFile(buildIndexPath, JSON.stringify(index));
}

main();
