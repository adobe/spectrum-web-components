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
import { basename, dirname, resolve } from 'path';
import prettier from 'prettier';
import Case from 'case';
import glob from 'glob';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const { existsSync, outputFile, readFileSync, readJSON } = fsExtra;

const __dirname = dirname(fileURLToPath(import.meta.url));
const prettierConfig = yaml.load(
    readFileSync(resolve(__dirname, '..', '.prettierrc.yaml'))
);

/* Share =============================================================== */

/**
 * Generate tsconfig.json file for each of the wrapper component.
 */
function genTsconfigJson() {
    return `{
        "extends": "../../tsconfig.json",
        "compilerOptions": {
            "composite": true,
            "rootDir": "./"
        },
        "include": ["*.ts"]
    }`;
}

/**
 * Generate package.json file for each of the wrapper component.
 */
function genPackageJson(
    componentName,
    dependencyPkgName,
    dependencyPkgVersion
) {
    return `{
        "name": "@swc-react/${componentName}",
        "version": "${dependencyPkgVersion}",
        "publishConfig": {
            "access": "public"
        },
        "description": "React wrapper of the ${dependencyPkgName} component",
        "license": "Apache-2.0",
        "author": "",
        "main": "index.js",
        "files": [
            "**/*.d.ts",
            "**/*.js",
            "**/*.js.map"
        ],
        "keywords": [
            "React",
            "Spectrum Web Components",
            "${dependencyPkgName}"
        ],
        "dependencies": {
            "@lit-labs/react": "^1.1.1",
            "${dependencyPkgName}": "${dependencyPkgVersion}"
        }
    }`;
}

/**
 * Remove the duplicate array elements that has same value of a property
 */
function uniqueBy(arr, prop) {
    return [...new Map(arr.map((m) => [m[prop], m])).values()];
}

/* React wrapper generation ============================================ */

/**
 * Recusively get all the public events/methods from component itself and its super class
 * It even supports extracting from external component package.
 */
async function getEvents(decl, declMap, events) {
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
        // Extract events/method from external package
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

    if (decl?.events) {
        events.push(
            decl?.events
                .filter((event) => !!event.name)
                .map((event) => {
                    return {
                        name: event.name,
                        type: event.type?.text || 'Event',
                        description: event.description,
                    };
                })
        );
    }
}

/**
 * CEM package will invoke this callback function.
 *
 * @param {*} exclude array of excluded component class name
 * @param {*} outDir root output directory for generated code
 * @param {*} prettierConfig prettier library configuration
 */
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
import { createComponent } from '@lit-labs/react';${
                reactComponents.flatMap((component) => component.events)
                    .length > 0
                    ? "\nimport type { EventName } from '@lit-labs/react';"
                    : ''
            }
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
                    )}: '${event.name}' as EventName<${event.type}>, ${
                        event.description ? `// ${event.description}` : ''
                    }\n`,
                ''
            )}
        }
    });`,
    ''
)}

${reactComponents.reduce(
    (pre, component) =>
        pre +
        `export type ${component.name}Type = EventTarget & ${component.swcComponentName};\n`,
    ''
)}
`;

            const componentShortName = pkgName.replace(
                '@spectrum-web-components/',
                ''
            );

            const componentPath = resolve(`${outDir}/${componentShortName}`);
            await outputFile(
                resolve(`${componentPath}/index.ts`),
                prettier.format(componentSrc, {
                    parser: 'typescript',
                    ...prettierConfig,
                })
            );
            await outputFile(
                resolve(`${componentPath}/package.json`),
                prettier.format(
                    genPackageJson(componentShortName, pkgName, pkgVersion),
                    {
                        parser: 'json',
                        ...prettierConfig,
                    }
                )
            );
            await outputFile(
                resolve(`${componentPath}/tsconfig.json`),
                prettier.format(genTsconfigJson(), {
                    parser: 'json',
                    ...prettierConfig,
                })
            );
        },
    };
}

/* Icon wrapper generation ============================================= */

/**
 * Generate Icon component
 */
function genIconComponent(component, id, iconElementName, iconPkg) {
    const componentAliasName = `Sp${component}`;
    return `/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { createComponent } from '@lit-labs/react';
import * as React from 'react';
  
import { ${component} as ${componentAliasName} } from '@spectrum-web-components/${iconPkg}/src/elements/${id}.js';
import '@spectrum-web-components/${iconPkg}/icons/${iconElementName}.js';
  
export const ${component} = createComponent({ react: React, tagName: '${iconElementName}', elementClass: ${componentAliasName}, events: {}, displayName: '${component}' });

export type ${component}Type = ${componentAliasName};
`;
}

/**
 * Core entry function
 */
export async function generateIconWrapper(iconType) {
    glob(
        resolve(__dirname, '..', `packages/${iconType}/src/elements/**.d.ts`),
        async (_, icons) => {
            for (let icon of icons) {
                const id = basename(icon)
                    .split('.')[0]
                    .substring('Icon'.length);
                const componentName =
                    id === 'github' ? 'GitHub' : Case.pascal(id);
                const iconElementName = `sp-icon-${Case.kebab(componentName)}`;
                await outputFile(
                    resolve(
                        __dirname,
                        '..',
                        `react/${iconType}/${componentName}.ts`
                    ),
                    prettier.format(
                        genIconComponent(
                            `Icon${componentName}`,
                            `Icon${id}`,
                            iconElementName,
                            `${iconType}`
                        ),
                        {
                            parser: 'babel',
                            ...prettierConfig,
                        }
                    )
                );
            }

            const { name: pkgName, version: pkgVersion } = await readJSON(
                resolve(__dirname, '..', `packages/${iconType}/package.json`)
            );

            await outputFile(
                resolve(__dirname, '..', `react/${iconType}/package.json`),
                prettier.format(genPackageJson(iconType, pkgName, pkgVersion), {
                    parser: 'json',
                    ...prettierConfig,
                })
            );

            await outputFile(
                resolve(__dirname, '..', `react/${iconType}/tsconfig.json`),
                prettier.format(genTsconfigJson(), {
                    parser: 'json',
                    ...prettierConfig,
                })
            );
        }
    );
}
