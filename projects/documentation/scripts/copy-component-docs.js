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
const componentDestinationPath = path.resolve(
    __dirname,
    '../content/components'
);
const toolDestinationPath = path.resolve(__dirname, '../content/tools');
const partialPath = path.resolve(
    __dirname,
    '../content/_includes/partials/components'
);

const extractFileNameRegExp = /([a-zA-Z-]+)\.md$/;
const extractPackageNameRegExp = /([^/]+)\/([a-zA-Z-]+)\.md$/;

const customElementJSONPath = path.resolve(
    projectDir,
    'projects/documentation/custom-elements.json'
);
let rawCustomElementsJSON = fs.readFileSync(customElementJSONPath);
let customElements = JSON.parse(rawCustomElementsJSON);

const findDeclaration = (customElements, test) => {
    let declaration;
    // Capture a specific declaration, inside of a module, not a specific module
    // with a specific declaration in it.
    customElements.modules.find((jsModule) => {
        declaration = jsModule.declarations.find(test);
        return declaration;
    });

    return declaration;
};

export async function processREADME(mdPath) {
    const fileName = extractFileNameRegExp.exec(mdPath)[0];
    if (fileName === 'CHANGELOG.md' || /node_modules/.test(mdPath)) {
        return;
    }
    const packageName = extractPackageNameRegExp.exec(mdPath)[1];
    let componentName =
        fileName !== 'README.md'
            ? fileName.replace('.md', '')
            : extractPackageNameRegExp.exec(mdPath)[1];
    const parent =
        fileName === 'README.md' ? 'root' : packageName + '-children';
    let componentHeading = componentName;
    let tag = findDeclaration(
        customElements,
        (declaration) => declaration.tagName === 'sp-' + componentName
    );
    if (componentName === 'sp-overlay') {
        tag = findDeclaration(
            customElements,
            (declaration) => declaration.name === 'OverlayBase'
        );
    }
    if (!tag) {
        tag = findDeclaration(
            customElements,
            (declaration) => declaration.tagName === componentName
        );
    } else {
        componentHeading = 'sp-' + componentHeading;
    }
    if (!tag && componentName.startsWith('icons-')) {
        tag = findDeclaration(
            customElements,
            (declaration) => declaration.name === 'IconBase'
        );
    }
    if (!tag && componentName.startsWith('textarea')) {
        tag = findDeclaration(
            customElements,
            (declaration) => declaration.tagName === 'sp-textfield'
        );
    }
    if (!tag && componentName.startsWith('help-text-mixin')) {
        componentHeading = 'Help Text Mixin';
        tag = findDeclaration(
            customElements,
            (declaration) => declaration.name === 'HelpTextManagedElement'
        );
    }
    const isComponent = mdPath.includes('/packages/');
    const destinationPath = isComponent
        ? componentDestinationPath
        : toolDestinationPath;
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
    const tagType = isComponent ? 'component-examples' : 'tool-examples';
    const body = fs.readFileSync(mdPath);
    fs.writeFileSync(
        exampleDestinationFile,
        exampleDestinationTemplate(
            componentName,
            componentHeading,
            tagType,
            parent,
            packageName
        )
    );
    fs.writeFileSync(
        examplePartialFile,
        examplePartialTemplate(componentName, componentHeading, body)
    );
}

async function main() {
    fs.mkdirSync(componentDestinationPath, { recursive: true });
    fs.mkdirSync(toolDestinationPath, { recursive: true });
    fs.mkdirSync(partialPath, { recursive: true });

    for await (const mdPath of globby.stream(
        `${projectDir}/(packages|tools)/**/*.md`
    )) {
        await processREADME(mdPath);
    }
}

main();
