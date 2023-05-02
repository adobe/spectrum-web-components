/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable @typescript-eslint/explicit-function-return-type */

import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../../../');
const packageDir = path.join(rootDir, 'packages/icons-workflow');

const disclaimer = `
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/`;

const prettify = (rawFile, parser = 'typescript') => {
    return prettier.format(rawFile, {
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        htmlWhitespaceSensitivity: 'ignore',
        parser,
    });
};

const getFiles = (globPattern) => {
    return new Promise((res) => {
        glob(globPattern, (_, files) => {
            res(files);
        });
    });
};

const mergeSets = (spectrumFiles, expressFiles) => {
    const mergedSet = {};
    spectrumFiles.forEach((file) => {
        const baseName = path.basename(file);
        mergedSet[baseName] = {
            ...(mergedSet[baseName] ?? {}),
            spectrum: `./${path.relative(packageDir, file)}`,
        };
    });
    expressFiles.forEach((file) => {
        const baseName = path.basename(file);
        mergedSet[baseName] = {
            ...(mergedSet[baseName] ?? {}),
            express: `./${path.relative(packageDir, file)}`,
        };
    });
    return mergedSet;
};

const getExportConditionsForFiles = async (
    exportBasePath,
    spectrumGlobPattern,
    expressGlobPattern
) => {
    const spectrumFiles = await getFiles(spectrumGlobPattern);
    const expressFiles = await getFiles(expressGlobPattern);
    const mergedSet = mergeSets(spectrumFiles, expressFiles);
    const exports = {};
    for (const [exportedPath, paths] of Object.entries(mergedSet)) {
        exports[`./${path.join(exportBasePath, path.basename(exportedPath))}`] =
            {
                express: paths.express ?? paths.spectrum,
                default: paths.spectrum ?? paths.express,
            };
    }
    return exports;
};

const generateIconsExports = async () => {
    const spectrumFiles = await getFiles(
        path.join(packageDir, 'src/icons/**.js')
    );
    const expressFiles = await getFiles(
        path.join(packageDir, 'src/express/icons/**.js')
    );
    const mergedSet = mergeSets(spectrumFiles, expressFiles);

    const exports = Object.keys(mergedSet)
        .map((file) => {
            const baseName = path.basename(file);
            const componentName = `${path.basename(baseName, '.js')}Icon`;
            return `export { ${componentName} } from "@spectrum-web-components/icons-workflow/src/icons/${baseName}"`;
        })
        .join('\r\n');

    return `${disclaimer}
    ${exports};
    `;
};

const generateStoriesManifest = async () => {
    const spectrumFiles = await getFiles(
        path.join(packageDir, 'icons/sp-**.js')
    );
    const expressFiles = await getFiles(
        path.join(packageDir, 'icons/express/sp-**.js')
    );
    const mergedSet = mergeSets(spectrumFiles, expressFiles);

    const imports = Object.keys(mergedSet)
        .map((file) => {
            const baseName = path.basename(file);
            return `import "@spectrum-web-components/icons-workflow/icons/${baseName}"`;
        })
        .join('\r\n');

    const manifestListings = Object.keys(mergedSet)
        .map((file) => {
            const baseName = path.basename(file);
            const iconElementName = path.basename(baseName, '.js');
            return `{name: '${iconElementName}', tag: '<${iconElementName}>', story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\`}`;
        })
        .join(',\r\n');

    return `${disclaimer}
    import {
        html,
        TemplateResult
    } from '@spectrum-web-components/base';

    ${imports}

    export const iconManifest = [${manifestListings}];

    `;
};

const updatePackageExports = async () => {
    const iconRegistrationExports = await getExportConditionsForFiles(
        './icons',
        path.join(packageDir, 'icons/sp-**.js'),
        path.join(packageDir, 'icons/express/sp-**.js')
    );
    const iconComponentExports = await getExportConditionsForFiles(
        './src/elements',
        path.join(packageDir, 'src/elements/**.js'),
        path.join(packageDir, 'src/express/elements/**.js')
    );
    const iconLiteralExports = await getExportConditionsForFiles(
        './src/icons',
        path.join(packageDir, 'src/icons/**.js'),
        path.join(packageDir, 'src/express/icons/**.js')
    );

    const packageJSON = {
        ...JSON.parse(
            await fs.readFileSync(path.join(packageDir, 'package.json'))
        ),
        exports: {
            './package.json': './package.json',
            '.': './src/index.js',
            ...iconRegistrationExports,
            ...iconComponentExports,
            ...iconLiteralExports,
        },
    };
    fs.writeFileSync(
        path.join(packageDir, 'package.json'),
        prettify(JSON.stringify(packageJSON), 'json')
    );

    fs.writeFileSync(
        path.join(packageDir, 'src/icons.ts'),
        prettify(await generateIconsExports())
    );

    fs.writeFileSync(
        path.join(packageDir, 'stories', 'icon-manifest.ts'),
        prettify(await generateStoriesManifest())
    );
};

updatePackageExports();
