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

import { readFile } from 'fs/promises';
import fsExtra from 'fs-extra';
import { resolve } from 'path';
import prettier from 'prettier';

const { outputFile } = fsExtra;

const uniqueBy = (arr, prop) => {
    return [...new Map(arr.map((m) => [m[prop], m])).values()];
};

const getEvents = (decl, declMap, events) => {
    if (declMap.has(decl?.superclass?.name)) {
        getEvents(declMap.get(decl?.superclass?.name), declMap, events);
    }
    decl?.members ?? [];
    events.push(
        (decl?.members ?? [])
            .filter((member) => member.privacy === 'public') // public
            .filter(
                (member) =>
                    member.type?.text?.includes('EventEmitter') ||
                    member?.kind === 'method'
            )
            .map((event) => ({
                name: event.name,
            }))
    );
};

export default function genReactWrapper({
    exclude = [],
    attributeMapping = {},
    outDir = 'legacy',
} = {}) {
    return {
        name: 'react-wrapper',
        async packageLinkPhase({ customElementsManifest }) {
            const { name: pkgName, version: pkgVersion } = JSON.parse(
                await readFile(`${process.cwd()}/package.json`)
            );
            const { modules } = customElementsManifest;
            const declMap = new Map(
                modules.flatMap((m) =>
                    m.declarations.map((decl) => [decl.name, decl])
                )
            );
            const components = modules.flatMap((m) =>
                m.declarations.filter(
                    (decl) =>
                        !exclude.includes(decl.name) &&
                        (decl.customElement || decl.tagName)
                )
            );

            if (components.length === 0) {
                return;
            }

            // Component imports
            // import { Button } from '@spectrum-web-components/button';
            // import { ClearButton } from '@spectrum-web-components/button';
            // import { CloseButton } from '@spectrum-web-components/button';
            const componentImports = [];

            // Js file imports
            // import '@spectrum-web-components/button/sp-button.js';
            // import '@spectrum-web-components/button/sp-clear-button.js';
            // import '@spectrum-web-components/button/sp-close-button.js';
            const fileImports = modules
                .filter(
                    (m) =>
                        m.declarations.length === 0 &&
                        m.path.indexOf('sync/') === -1
                )
                .map(
                    (m) =>
                        `import '${pkgName}/${m.path?.replace('.ts', '.js')}';`
                );

            const reactComponents = [];

            for (let component of components) {
                componentImports.push(
                    `import { ${component.name} } from '${pkgName}';`
                );

                const reactComponent = {};
                reactComponent.name = `Sp${component.name}`;
                reactComponent.swcComponentName = component.name;
                reactComponent.elementName = component.tagName;
                const events = [];
                getEvents(component, declMap, events);
                reactComponent.events = uniqueBy(events.flat(), 'name');

                reactComponents.push(reactComponent);
            }

            const componentSrc = `
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import * as React from 'react';
import { createComponent } from '@lit-labs/react';
${componentImports.reduce((pre, cur) => pre + cur + '\n', '')}
${fileImports.reduce((pre, cur) => pre + cur + '\n', '')}

${reactComponents.reduce(
    (pre, component) =>
        pre +
        `export const ${component.name} = createComponent({
        elementClass: ${component.swcComponentName},
        react: React,
        tagName: '${component.elementName}',
        events: {
            ${component.events.reduce(
                (pre, event) =>
                    pre +
                    `${event.name.replace(/-./g, (m) =>
                        m[1].toUpperCase()
                    )}: '${event.name}', `,
                ''
            )}
        }
    });`,
    ''
)}
`;

            const componentShortName = pkgName.replace(
                '@spectrum-web-components/',
                ''
            );

            const packageJson = `{
    "name": "@spectrum-web-components/sp-${componentShortName}",
    "version": "${pkgVersion}",
    "description": "React wrapper of the ${pkgName} component",
    "main": "index.js",
    "keywords": [
        "React",
        "Spectrum Web Components"
    ],
    "author": "jian.liao@gmail.com",
    "license": "Apache-2.0",
    "dependencies": {
        "@lit-labs/react": "1.1.0",
        "@spectrum-web-components/accordion": "${pkgVersion}"
    }
}          
`;

            const componentPath = resolve(`${outDir}/sp-${componentShortName}`);
            await outputFile(
                resolve(`${componentPath}/index.ts`),
                prettier.format(componentSrc, {
                    parser: 'babel',
                    printWidth: 80,
                    tabWidth: 4,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'es5',
                    bracketSpacing: true,
                    arrowParens: 'always',
                    htmlWhitespaceSensitivity: 'ignore',
                })
            );
            await outputFile(
                resolve(`${componentPath}/package.json`),
                packageJson
            );
        },
    };
}
