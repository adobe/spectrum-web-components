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

import { readFile } from 'fs/promises';
import fsExtra from 'fs-extra';
import { basename, dirname, resolve } from 'path';
import prettier from 'prettier';
import Case from 'case';
import fg from 'fast-glob';
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
        "include": ["**/*.ts"]
    }`;
}

/**
 * Generate package.json file for each of the wrapper component.
 */
function genPackageJson(
    componentName,
    dependencyPkgName,
    dependencyPkgVersion,
    isIconPkg = false
) {
    return `{
        "name": "@swc-react/${componentName}",
        "version": "${dependencyPkgVersion}",
        "publishConfig": {
            "access": "public"
        },
        "description": "React and Next.js wrapper of the ${dependencyPkgName} component",
        "license": "Apache-2.0",
        "author": "Adobe",
        "repository": {
            "type": "git",
            "url": "https://github.com/adobe/spectrum-web-components.git",
            "directory": "1st-gen/react/${componentName}"
        },
        "type": "module",${
            isIconPkg
                ? ''
                : `\n"exports": {
            ".": {
                "development": "./index.dev.js",
                "default": "./index.js"
            },
            "./next.js": {
                "development": "./next.dev.js",
                "default": "./next.js"
            }
        },`
        }
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
            "@lit/react": "^1.0.2",
            "${dependencyPkgName}": "^${dependencyPkgVersion}"
        },
        "peerDependencies": {
            "next": "~13.4 || ~14",
        },
        "peerDependenciesMeta": {
            "next": {
                "optional": true
            }
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
        const [superDecl] = modules.flatMap((m) =>
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
 * Generate React wrapper component source code in typescript.
 */
async function genReactComponentSourceCode(modules, exclude, pkgName) {
    const declMap = new Map(
        modules.flatMap((m) => m.declarations.map((decl) => [decl.name, decl]))
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
                m.exports.length === 1 &&
                m.exports.some(
                    (exp) => exp.kind === 'custom-element-definition'
                )
        )
        .map((m) => `import '${pkgName}/${m.path?.replace('.ts', '.js')}';`);

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

    const componentSrc = `import * as React from 'react';
import { createComponent } from '@lit/react';${
        reactComponents.flatMap((component) => component.events).length > 0
            ? "\nimport type { EventName } from '@lit/react';"
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
    return componentSrc;
}

/**
 * Generate Next.js wrapper component source code in typescript.
 */
async function genNextComponentSourceCode(modules, exclude) {
    const elements = modules.flatMap((m) => {
        return m.declarations
            .filter(
                (d) => d.customElement && d.tagName && !exclude.includes(d.name)
            )
            .map((d) => {
                return {
                    name: d.name,
                    tagName: d.tagName,
                    import: `import { ${d.name} as Sp${d.name} } from './index.js';`,
                };
            });
    });

    const nextWrapperSource = `import { ComponentProps } from 'react';
import dynamic from 'next/dynamic';

${elements.reduce((pre, element) => pre + element.import + '\n', '')}

${elements.reduce(
    (pre, element) =>
        pre +
        `export const ${element.name} = dynamic<JSX.LibraryManagedAttributes<typeof Sp${element.name}, ComponentProps<typeof Sp${element.name}>>>(() => import('./index.js').then(({${element.name}}) => ${element.name}), { ssr: false });` +
        '\n',
    ''
)}`;

    return nextWrapperSource;
}

/**
 * CEM package will invoke this callback function.
 *
 * @param {*} exclude array of excluded component class name
 * @param {*} outDir root output directory for generated code
 * @param {*} prettierConfig prettier library configuration
 */
export default function genWrappers({
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
            const reactComponentSrc = await genReactComponentSourceCode(
                modules,
                exclude,
                pkgName
            );

            if (!reactComponentSrc) {
                return;
            }

            const nextComponentSrc = await genNextComponentSourceCode(
                modules,
                exclude
            );

            const componentShortName = pkgName.replace(
                '@spectrum-web-components/',
                ''
            );

            const componentPath = resolve(`${outDir}/${componentShortName}`);
            await outputFile(
                resolve(`${componentPath}/index.ts`),
                await prettier.format(reactComponentSrc, {
                    parser: 'typescript',
                    ...prettierConfig,
                })
            );
            await outputFile(
                resolve(`${componentPath}/next.ts`),
                await prettier.format(nextComponentSrc, {
                    parser: 'typescript',
                    ...prettierConfig,
                })
            );
            await outputFile(
                resolve(`${componentPath}/package.json`),
                await prettier.format(
                    genPackageJson(componentShortName, pkgName, pkgVersion),
                    {
                        parser: 'json',
                        ...prettierConfig,
                    }
                )
            );
            await outputFile(
                resolve(`${componentPath}/tsconfig.json`),
                await prettier.format(genTsconfigJson(), {
                    parser: 'json',
                    ...prettierConfig,
                })
            );
        },
    };
}

/* Icon wrapper generation ============================================= */

/**
 * Generate React wrapper for Icon component
 */
function genIconReactComponent(component, id, iconElementName, iconPkg) {
    const componentAliasName = `Sp${component}`;
    return `import { createComponent } from '@lit/react';
import * as React from 'react';

import { ${component} as ${componentAliasName} } from '@spectrum-web-components/${iconPkg}/src/elements/${id}.js';
import '@spectrum-web-components/${iconPkg}/icons/${iconElementName}.js';

export const ${component} = createComponent({ react: React, tagName: '${iconElementName}', elementClass: ${componentAliasName}, events: {}, displayName: '${component}' });

export type ${component}Type = ${componentAliasName};
`;
}

/**
 * Generate Next.js wrapper for Icon component
 */
function genIconNextComponent(displayName) {
    return `import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import type { Icon${displayName}Type } from '../${displayName}.js';

export const Icon${displayName}: ComponentType<Partial<Icon${displayName}Type> | { slot: string }> = dynamic<Partial<Icon${displayName}Type> | { slot: string }>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => import('../${displayName}.js').then((m) => m.Icon${displayName} as any),
    { ssr: false}
);
`;
}

/**
 * Core entry function
 */
export async function generateIconWrapper(iconType) {
    const icons = await fg(
        resolve(__dirname, '..', `packages/${iconType}/src/elements/**.d.ts`)
    );
    for (let icon of icons) {
        const id = basename(icon).split('.')[0].substring('Icon'.length);
        const componentName = id === 'github' ? 'GitHub' : Case.pascal(id);
        const iconElementName = `sp-icon-${Case.kebab(componentName)}`;
        await outputFile(
            resolve(__dirname, '..', `react/${iconType}/${componentName}.ts`),
            await prettier.format(
                genIconReactComponent(
                    `Icon${componentName}`,
                    `Icon${id}`,
                    iconElementName,
                    `${iconType}`
                ),
                {
                    parser: 'typescript',
                    ...prettierConfig,
                }
            )
        );
        await outputFile(
            resolve(
                __dirname,
                '..',
                `react/${iconType}/next/${componentName}.ts`
            ),
            await prettier.format(genIconNextComponent(Case.pascal(id)), {
                parser: 'typescript',
                ...prettierConfig,
            })
        );
    }

    const { name: pkgName, version: pkgVersion } = await readJSON(
        resolve(__dirname, '..', `packages/${iconType}/package.json`)
    );

    await outputFile(
        resolve(__dirname, '..', `react/${iconType}/package.json`),
        await prettier.format(
            genPackageJson(iconType, pkgName, pkgVersion, true),
            {
                parser: 'json',
                ...prettierConfig,
            }
        )
    );

    await outputFile(
        resolve(__dirname, '..', `react/${iconType}/tsconfig.json`),
        await prettier.format(genTsconfigJson(), {
            parser: 'json',
            ...prettierConfig,
        })
    );
}
