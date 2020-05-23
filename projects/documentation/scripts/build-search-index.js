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
const lunr = require('lunr');
const globby = require('globby');
const path = require('path');
const fs = require('fs-extra');

const projectDir = path.resolve(__dirname, '..', '..', '..');
const indexPath = path.resolve(
    projectDir,
    'projects/documentation/_site/src/searchIndex.json'
);

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
    for await (const path of globby.stream(`${projectDir}/packages/**/*.md`)) {
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
        documents.push({
            title: nameToTitle(componentName),
            body,
            url: `/components/${componentName}`,
        });
    }

    // Guides
    for await (const path of globby.stream(
        `${projectDir}/documentation/guides/*.md`
    )) {
        const guideName = /\/([^/]+).md$/.exec(path)[1];
        const body = await fs.readFile(path, { encoding: 'utf8' });
        documents.push({
            title: nameToTitle(guideName),
            body,
            url: `/guides/${guideName}`,
        });
    }

    const index = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('body');

        for (const document of documents) {
            this.add(document);
        }
    });

    await fs.writeFile(indexPath, JSON.stringify(index));
}

main();
