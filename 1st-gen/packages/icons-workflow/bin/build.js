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
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import fs from 'fs';
import fg from 'fast-glob';
import path from 'path';
import { load } from 'cheerio';
import prettier from 'prettier';
import Case from 'case';
import { fileURLToPath } from 'url';

import systemsIconMapping from './icons-mapping.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootDir = path.join(__dirname, '../../../');

const disclaimer = `
/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/`;

const S1IconsPackagePath = path.dirname(
    fileURLToPath(
        import.meta.resolve('@adobe/spectrum-css-workflow-icons/package.json')
    )
);
const S2IconsPackagePath = path.dirname(
    fileURLToPath(
        import.meta.resolve(
            '@adobe/spectrum-css-workflow-icons-s2/package.json'
        )
    )
);

const S1IconsDir = path.join(S1IconsPackagePath, 'dist/18');
const S2IconsDir = path.join(S2IconsPackagePath, 'dist/assets/svg');
const keepColors = '';

const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

const directories = [
    `${rootDir}packages/icons-workflow/src`,
    `${rootDir}packages/icons-workflow/src/icons`,
    `${rootDir}packages/icons-workflow/src/icons-s2`,
    `${rootDir}packages/icons-workflow/src/elements`,
    `${rootDir}packages/icons-workflow/icons`,
];

directories.forEach(ensureDirectoryExists);
fs.writeFileSync(
    path.join(rootDir, 'packages', 'icons-workflow', 'src', 'icons.ts'),
    disclaimer,
    'utf-8'
);
fs.writeFileSync(
    path.join(rootDir, 'packages', 'icons-workflow', 'src', 'icons-s2.ts'),
    disclaimer,
    'utf-8'
);
const manifestPath = path.join(
    rootDir,
    'packages',
    'icons-workflow',
    'stories',
    'icon-manifest.ts'
);
fs.writeFileSync(manifestPath, disclaimer, 'utf-8');
let manifestImports = `import {
    html,
    TemplateResult
} from '@spectrum-web-components/base';\r\n`;
let manifestListings = `\r\nexport const iconManifest = [\r\n`;

const defaultIconImport = `import { DefaultIcon as AlternateIcon } from '../DefaultIcon.js';\r\n`;

// Temporary replacements for a few icon names that have different names in the new S2 icon set
const replacements = {
    UnLink: 'Unlink',
    TextStrikeThrough: 'TextStrikethrough',
    ChevronDownSize300: 'ChevronDown',
    CheckmarkSize300: 'Checkmark',
};

// A function that process the raw svg name and returns the component name
export const getComponentName = (i) => {
    let id = path
        .basename(i, '.svg')
        .replace(/^(S2_Icon_|S_)/, '')
        .replace(/(_20_N|_22x20_N|_18_N@2x)$/, '');
    if (i.startsWith('Ad')) {
        id = i.replace(/^Ad/, '') + 'Advert';
    }
    return Case.pascal(replacements[id] || id);
};

async function buildIcons(icons, tag, iconsNameList) {
    icons.forEach((i) => {
        const svg = fs.readFileSync(i, 'utf-8');
        let id = path
            .basename(i, '.svg')
            .replace('S2_Icon_', '')
            .replace('_20_N', '')
            .replace('_22x20_N', '');
        if (id.search(/^Ad[A-Z]/) !== -1) {
            id = id.replace(/^Ad/, '');
            id += 'Advert';
        }

        // use replacements for icons that have different names in the icon set and update the id
        id = replacements[id] || id;

        const ComponentName = Case.pascal(id);

        const $ = load(svg, {
            xmlMode: true,
        });
        const title = Case.capital(id);
        const fileName = `${id}.ts`;
        const location = path.join(
            rootDir,
            'packages/icons-workflow/src',
            tag,
            fileName
        );

        if (!Number.isNaN(Number(ComponentName[0]))) {
            return;
        }

        $('*').each((index, el) => {
            if (el.name === 'svg') {
                $(el).attr('aria-hidden', '...');
                $(el).attr('role', 'img');
                if (keepColors !== 'keep') {
                    $(el).attr('fill', 'currentColor');
                }
                $(el).attr('aria-label', '...');
                $(el).removeAttr('id');
                $(el).attr('width', '...');
                $(el).attr('height', '...');
            }
            if (el.name === 'defs') {
                $(el).remove();
            }
            Object.keys(el.attribs).forEach((x) => {
                if (x === 'class') {
                    $(el).removeAttr(x);
                }
                if (keepColors !== 'keep' && x === 'stroke') {
                    $(el).attr(x, 'currentColor');
                }
                if (keepColors !== 'keep' && x === 'fill') {
                    $(el).attr(x, 'currentColor');
                }
            });
        });

        const iconLiteral = `
        ${disclaimer}
    
        import {tag as html, TemplateResult} from '../custom-tag.js';
    
        export {setCustomTemplateLiteralTag} from '../custom-tag.js';
        export const ${ComponentName}Icon = ({
        width = 24,
        height = 24,
        hidden = false,
        title = '${title}',
        } = {},): string | TemplateResult => {
        return html\`${$('svg')
            .toString()
            .replace(
                'aria-hidden="..."',
                "aria-hidden=${hidden ? 'true' : 'false'}"
            )
            .replace('width="..."', 'width="${width}"')
            .replace('height="..."', 'height="${height}"')
            .replace('aria-label="..."', 'aria-label="${title}"')}\`;
        }
    `;

        prettier
            .format(iconLiteral, {
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
                fs.writeFileSync(location, icon, 'utf-8');
            });

        const exportString = `export {${ComponentName}Icon} from './${tag}/${id}.js';\r\n`;
        fs.appendFileSync(
            path.join(
                rootDir,
                'packages',
                'icons-workflow',
                'src',
                tag + '.ts'
            ),
            exportString,
            'utf-8'
        );

        const iconElementName = `sp-icon-${Case.kebab(ComponentName)}`;

        const currenVersionIconImport = `import { ${ComponentName}Icon as CurrentIcon } from '../${tag}/${id}.js';\r\n`;

        // check if the icon is present in the other version
        let otherVersionIconImport = defaultIconImport;

        const alternateTag = tag === 'icons' ? 'icons-s2' : 'icons';
        // if there is a mapping icon found from the above iconset update otherVersionIconImport
        if (systemsIconMapping[ComponentName]) {
            otherVersionIconImport = `import { ${systemsIconMapping[ComponentName]}Icon as AlternateIcon } from '../${alternateTag}/${systemsIconMapping[ComponentName]}.js';\r\n`;
        } else if (iconsNameList.includes(ComponentName)) {
            // if there is a no mapping icon found reset to DefaultIcon
            otherVersionIconImport = `import { ${ComponentName}Icon as AlternateIcon } from '../${alternateTag}/${id}.js';\r\n`;
        }

        const spectrumVersion = tag === 'icons' ? 1 : 2;

        const iconElement = `
        ${disclaimer}
        
        import {
            html,
            TemplateResult
        } from '@spectrum-web-components/base';
        import {
            IconBase
        } from '@spectrum-web-components/icon';
        import {
            setCustomTemplateLiteralTag
        } from '../custom-tag.js';
        
        ${currenVersionIconImport}
        ${otherVersionIconImport}
        
        /**
         * @element ${iconElementName}
         */
        export class Icon${ComponentName} extends IconBase {
            protected override render(): TemplateResult {
                setCustomTemplateLiteralTag(html);
    
                if(this.spectrumVersion === ${spectrumVersion}){
                    return CurrentIcon({ hidden: !this.label, title: this.label }) as TemplateResult;
                }
                return AlternateIcon({ hidden: !this.label, title: this.label }) as TemplateResult;
    
            }
        }
        `;

        prettier
            .format(iconElement, {
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
            .then((iconElementFile) => {
                fs.writeFileSync(
                    path.join(
                        rootDir,
                        'packages',
                        'icons-workflow',
                        'src',
                        'elements',
                        `Icon${id}.ts`
                    ),
                    iconElementFile,
                    'utf-8'
                );
            });

        const iconRegistration = `
        ${disclaimer}
    
        import { Icon${ComponentName} } from '../src/elements/Icon${id}.js';
        import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
    
        defineElement('${iconElementName}', Icon${ComponentName});
    
        declare global {
            interface HTMLElementTagNameMap {
                '${iconElementName}': Icon${ComponentName};
            }
        }
        `;

        prettier
            .format(iconRegistration, {
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
            .then((iconRegistrationFile) => {
                fs.writeFileSync(
                    path.join(
                        rootDir,
                        'packages',
                        'icons-workflow',
                        'icons',
                        `${iconElementName}.ts`
                    ),
                    iconRegistrationFile,
                    'utf-8'
                );
            });

        const importStatement = `\r\nimport '@spectrum-web-components/icons-workflow/icons/${iconElementName}.js';`;
        const metadata = `{name: '${Case.sentence(
            ComponentName
        )}', tag: '<${iconElementName}>', story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\`},\r\n`;
        manifestImports += importStatement;
        manifestListings += metadata;
    });
}

const iconsV1 = (await fg(`${S1IconsDir}/**.svg`)).sort();

const iconsV2 = (await fg(`${S2IconsDir}/**.svg`)).sort();

const iconsV1NameList = iconsV1.map((i) => {
    return getComponentName(i);
});
const iconsV2NameList = iconsV2.map((i) => {
    return getComponentName(i);
});
console.log('iconsV1', iconsV1);
console.log('iconsV2', iconsV2);
await buildIcons(iconsV1, 'icons', iconsV2NameList);
await buildIcons(iconsV2, 'icons-s2', iconsV1NameList);

const exportString = `\r\nexport { setCustomTemplateLiteralTag } from './custom-tag.js';\r\n`;
fs.appendFileSync(
    path.join(rootDir, 'packages', 'icons-workflow', 'src', 'icons.ts'),
    exportString,
    'utf-8'
);

fs.appendFileSync(
    manifestPath,
    `${manifestImports}${manifestListings}];\r\n`,
    'utf-8'
);

/**
 * Generates iconsList.json for filtering icons in Storybook demos and documentation website.
 *
 * This function processes the available S1 and S2 icon component names and creates a JSON file
 * that serves as an allowlist for filtering icons in the iconset Storybook demos. The filtering
 * ensures that only icons available in the current Spectrum version are displayed to users.
 *
 * The function performs the following transformations:
 * 1. Converts PascalCase component names (e.g., "HeartFilled") to lowercase (e.g., "heartfilled")
 * 2. Filters out any names that start with numbers (invalid icon names)
 * 3. Sorts the lists alphabetically for consistent output
 * 4. Creates separate arrays for S1 and S2 icons
 * 5. Writes the prettifiedformatted JSON to packages/iconset/stories/iconsList.json
 *
 * @example
 * Input: ["HeartFilled", "AddCircle", "20Asset"]
 * Output: ["addcircle", "heartfilled"] (20Asset filtered out)
 *
 * @example
 * Generated JSON structure:
 * {
 *   "s1": ["abc", "addcircle", "heart", ...],
 *   "s2": ["accessibility", "addcontent", "heartfilled", ...]
 * }
 *
 *  */
const generateIconsList = () => {
    // Helper function to transform component names to lowercase format for iconsList.json
    const transformIconNames = (nameList) => {
        return nameList
            .map((name) =>
                name.replace(/([A-Z])/g, (match, letter) =>
                    letter.toLowerCase()
                )
            )
            .filter((name) => !Number.isNaN(Number(name[0])) === false)
            .sort();
    };

    const iconsListData = {
        s1: transformIconNames(iconsV1NameList),
        s2: transformIconNames(iconsV2NameList),
    };

    const iconsListPath = path.join(
        rootDir,
        'packages',
        'iconset',
        'stories',
        'iconsList.json'
    );

    prettier
        .format(JSON.stringify(iconsListData), {
            parser: 'json',
            printWidth: 100,
            tabWidth: 4,
            useTabs: false,
        })
        .then((formattedJson) => {
            fs.writeFileSync(iconsListPath, formattedJson, 'utf-8');
        });
};

generateIconsList();
