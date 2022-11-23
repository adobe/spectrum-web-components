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

import { readFile } from 'fs/promises';
import fsExtra from 'fs-extra';
import { resolve } from 'path';
import prettier from 'prettier';

const { outputFile, existsSync } = fsExtra;

const uniqueBy = (arr, prop) => {
    return [...new Map(arr.map((m) => [m[prop], m])).values()];
};

const getEvents = async (decl, declMap, events) => {
    if (declMap.has(decl?.superclass?.name)) {
        getEvents(declMap.get(decl?.superclass?.name), declMap, events);
    } else if (
        decl?.superclass?.package &&
        existsSync(
            `../../packages/${decl?.superclass?.package.replace(
                '@spectrum-web-components/',
                ''
            )}/custom-elements.json`
        )
    ) {
        const { modules } = JSON.parse(
            await readFile(
                `../../packages/${decl?.superclass?.package.replace(
                    '@spectrum-web-components/',
                    ''
                )}/custom-elements.json`
            )
        );
        const [superDecl, ...rest] = modules.flatMap((m) =>
            m.declarations.filter((d) => d.name === decl?.superclass?.name)
        );
        if (superDecl) {
            getEvents(superDecl, declMap, events);
        }
    }

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

    if (decl?.events) {
        events.push(
            decl?.events
                .filter((event) => !!event.name)
                .map((event) => ({ name: event.name }))
        );
    }
};

export default function genReactWrapper({
    exclude = [],
    outDir = 'legacy',
    prettierConfig = {},
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

            const componentImports = [];

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
            if (pkgName === '@spectrum-web-components/theme') {
                fileImports.push(
                    "import '@spectrum-web-components/theme/theme-darkest.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/theme-dark.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/theme-light.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/theme-lightest.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/scale-medium.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/scale-large.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/theme-darkest.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/theme-dark.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/theme-light.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/theme-lightest.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/scale-medium.js';"
                );
                fileImports.push(
                    "import '@spectrum-web-components/theme/express/scale-large.js';"
                );
            }

            const reactComponents = [];

            for (let component of components) {
                componentImports.push(
                    `import { ${component.name} as Sp${component.name} } from '${pkgName}';`
                );

                const reactComponent = {};
                reactComponent.name = `${component.name}`;
                reactComponent.swcComponentName = `Sp${component.name}`;
                reactComponent.elementName = component.tagName;
                const events = [];
                await getEvents(component, declMap, events);
                reactComponent.events = uniqueBy(events.flat(), 'name');

                reactComponents.push(reactComponent);
            }

            const componentSrc = `/*
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
        displayName: '${component.name}',
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
    "name": "@swc-react/${componentShortName}",
    "version": "${pkgVersion}",
    "publishConfig": {
        "access": "public"
    },
    "description": "React wrapper of the ${pkgName} component",
    "license": "Apache-2.0",
    "author": "",
    "main": "index.js",
    "module": "index.js",
    "type": "module",
    "keywords": [
        "React",
        "Spectrum Web Components"
    ],
    "peerDependencies": {
        "react": "^17.0.0 || ^18.0.0"
    },
    "dependencies": {
        "@lit-labs/react": "^1.1.0",
        "${pkgName}": "^${pkgVersion}"
    }
}
`;

            const tsconfigJson = `{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "composite": true,
        "rootDir": "./"
    },
    "include": ["*.ts"]
}
`;

            const componentPath = resolve(`${outDir}/${componentShortName}`);
            await outputFile(
                resolve(`${componentPath}/index.ts`),
                prettier.format(componentSrc, {
                    parser: 'babel',
                    ...prettierConfig,
                })
            );
            await outputFile(
                resolve(`${componentPath}/package.json`),
                prettier.format(packageJson, {
                    parser: 'json',
                    ...prettierConfig,
                })
            );
            await outputFile(
                resolve(`${componentPath}/tsconfig.json`),
                prettier.format(tsconfigJson, {
                    parser: 'json',
                    ...prettierConfig,
                })
            );
        },
    };
}
