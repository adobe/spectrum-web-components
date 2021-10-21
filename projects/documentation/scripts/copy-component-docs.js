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
import fs from 'fs';
import globby from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';

import {
    apiDestinationTemplate,
    apiPartialTemplate,
    exampleDestinationTemplate,
    examplePartialTemplate,
} from './component-template-parts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectDir = path.resolve(__dirname, '../../../');
const destinationPath = path.resolve(__dirname, '../content/components');
const partialPath = path.resolve(
    __dirname,
    '../content/_includes/partials/components'
);

async function main() {
    fs.mkdirSync(destinationPath, { recursive: true });
    fs.mkdirSync(partialPath, { recursive: true });

    const customElementJSONPath = path.resolve(
        projectDir,
        'projects/documentation/custom-elements.json'
    );
    let rawCustomElementsJSON = fs.readFileSync(customElementJSONPath);
    let customElements = JSON.parse(rawCustomElementsJSON);

    for await (const mdPath of globby.stream(
        `${projectDir}/packages/**/*.md`
    )) {
        let componentName = /([^/]+)\/([a-zA-Z-]+)\.md$/.exec(mdPath)[1];
        let elementByDirectory;
        // Capture a specific declaration, inside of a module, not a specific module
        // with a specific declaration in it.
        customElements.modules.find((jsModule) => {
            elementByDirectory = jsModule.declarations.find(
                (jsDeclarations) => {
                    return jsDeclarations.tagName === componentName;
                }
            );
            return elementByDirectory;
        });
        const fileName = /([a-zA-Z-]+)\.md$/.exec(mdPath)[0];
        if (fileName === 'CHANGELOG.md' || /node_modules/.test(mdPath)) {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        let componentHeading = componentName;
        const componentPath = path.resolve(destinationPath, componentName);
        fs.mkdirSync(componentPath, { recursive: true });
        // Support the full page delivery of "Examples" and "API"
        const exampleDestinationFile = path.resolve(
            destinationPath,
            componentName,
            'index.md'
        );
        const apiDestinationFile = path.resolve(
            destinationPath,
            componentName,
            'api.md'
        );
        // Create content only pages for each section of an individual elements docs
        // The next two are not fully leveraged just yet.
        const examplePartialFile = path.resolve(
            destinationPath,
            componentName,
            'content.md'
        );
        const apiPartialFile = path.resolve(
            destinationPath,
            componentName,
            'api-content.md'
        );
        let elementByComponentName;
        // Capture a specific declaration, inside of a module, not a specific module
        // with a specific declaration in it.
        customElements.modules.find((jsModule) => {
            elementByComponentName = jsModule.declarations.find(
                (jsDeclarations) => {
                    return jsDeclarations.tagName === 'sp-' + componentName;
                }
            );
            return elementByComponentName;
        });
        if (elementByComponentName) {
            componentHeading = 'sp-' + componentHeading;
        }
        const tag = elementByComponentName || elementByDirectory;
        if (tag) {
            // Read the source markdown file.
            fs.writeFileSync(
                apiDestinationFile,
                apiDestinationTemplate(componentName, componentHeading)
            );
            fs.writeFileSync(
                apiPartialFile,
                apiPartialTemplate(componentName, componentHeading, tag)
            );
        }
        const body = fs.readFileSync(mdPath);
        fs.writeFileSync(
            exampleDestinationFile,
            exampleDestinationTemplate(componentName, componentHeading)
        );
        fs.writeFileSync(
            examplePartialFile,
            examplePartialTemplate(componentName, componentHeading, body)
        );
    }
}

main();
