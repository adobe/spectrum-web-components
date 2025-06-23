/* eslint-disable @typescript-eslint/explicit-function-return-type */
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

import fs from 'fs';
import fg from 'fast-glob';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

import { load } from 'cheerio';
import prettier from 'prettier';
import eslint from 'eslint';
import Case from 'case';

const prettierConfig = {
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
};

const fsp = fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const rootDir = path.join(__dirname, '..');

const S1IconsPackageDir = require.resolve('@spectrum-css/ui-icons'); // /dist/medium';
const S2IconsPackageDir = require.resolve('@spectrum-css/ui-icons-s2'); // /dist/medium';

function cleanFileName(filepath) {
    // Clean up the file name to get the id
    let id = path
        .basename(filepath, '.svg')
        .replace('S2_Icon_', '')
        .replace('_20_N', '')
        .replace('_22x20_N', '');

    // If the id starts with Ad and is followed by a capital letter, replace it with an empty string
    // and add Advert to the end of the id
    if (id.search(/^Ad[A-Z]/) !== -1) {
        id = id.replace(/^Ad/, '');
        id += 'Advert';
    }

    let ComponentName;

    // Spelling correction for the component names
    [
        {
            from: 'Github',
            to: 'GitHub',
        },
        {
            from: 'TextStrikeThrough',
            to: 'TextStrikethrough',
        },
        {
            from: 'UnLink',
            to: 'Unlink',
        },
    ].forEach(({ from, to }) => {
        if (Case.pascal(id) === from) {
            ComponentName = to;
            id = to;
        } else {
            ComponentName = Case.pascal(id);
        }
    });

    return {
        id,
        ComponentName,
    };
}

async function formatAndWrite(filePath, content, { cwd = rootDir } = {}) {
    const linter = new eslint.ESLint({
        cwd: path.join(rootDir, '..', '..'),
        useEslintrc: true,
        overrideConfigFile: path.join(rootDir, '..', '..', '.eslintrc.cjs'),
        fix: true,
    });

    let formatted = await linter.lintText(content).then((results) => {
        if (results?.[0]?.errorCount > 0 && !results?.[0]?.output) {
            return Promise.reject(`Error linting ${filePath}`);
        }

        return results?.[0]?.output;
    });

    formatted = await prettier.format(content, prettierConfig);

    return fsp.writeFile(path.join(cwd, filePath), formatted, 'utf-8');
}

async function buildIcon(filepath, folder, altIconList) {
    // Read in our SVG file
    const svg = await fsp.readFile(filepath, 'utf-8');

    const { id, ComponentName } = cleanFileName(filepath);

    // If the first character of the ComponentName is a number, skip it
    // This is to avoid issues with the component name being a number
    // and causing issues with the import statement
    if (!Number.isNaN(Number(ComponentName.charAt(0)))) {
        return;
    }

    // Initializing cheerio for parsing the SVG
    const $ = load(svg, { xmlMode: true });

    $('*').each((_, el) => {
        if (el.name === 'svg') {
            $(el).attr('aria-hidden', '...');
            $(el).attr('role', 'img');
            $(el).attr('fill', 'currentColor');
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
            if (x === 'stroke') {
                $(el).attr(x, 'currentColor');
            }
            if (x === 'fill') {
                $(el).attr(x, 'currentColor');
            }
        });
    });

    const svgString = $('svg')
        .toString()
        .replace(
            'aria-hidden="..."',
            "aria-hidden=${hidden ? 'true' : 'false'}"
        )
        .replace('width="..."', 'width="${width}"')
        .replace('height="..."', 'height="${height}"')
        .replace('aria-label="..."', 'aria-label="${title}"');

    const iconElementName = `sp-icon-${Case.kebab(ComponentName)}`;
    let otherVersionIconImport = `import { DefaultIcon as AlternateIcon } from '../DefaultIcon.js';`;

    // check if the icon is present in the other version
    if (altIconList.includes(ComponentName)) {
        const alternateTag = folder === 'icons' ? 'icons-s2' : 'icons';
        otherVersionIconImport = `import { ${ComponentName}Icon as AlternateIcon } from '../${alternateTag}/${id}.js';`;
    }

    return Promise.all([
        formatAndWrite(
            path.join('src', folder, `${id}.ts`),
            `
import { tag as html, TemplateResult } from '../custom-tag.js';
export { setCustomTemplateLiteralTag } from '../custom-tag.js';
export const ${ComponentName}Icon = ({
width = 24,
height = 24,
hidden = false,
title = '${Case.capital(id)}',
} = {}): string | TemplateResult => html\`${svgString}\`;`
        ),
        formatAndWrite(
            path.join('src', 'elements', `Icon${id}.ts`),
            `
import { html, TemplateResult } from '@spectrum-web-components/base';
import { IconBase } from '@spectrum-web-components/icon';
import { setCustomTemplateLiteralTag } from '../custom-tag.js';
import { ${ComponentName}Icon as CurrentIcon } from '../${folder}/${id}.js';
${otherVersionIconImport}

/**
 * @element ${iconElementName}
 */
export class Icon${ComponentName} extends IconBase {
protected override render(): TemplateResult {
    setCustomTemplateLiteralTag(html);

    if(this.spectrumVersion === ${folder === 'icons' ? 1 : 2}){
        return CurrentIcon({ hidden: !this.label, title: this.label }) as TemplateResult;
    }
    return AlternateIcon({ hidden: !this.label, title: this.label }) as TemplateResult;
}
}
`
        ),
        // Write the icon registration to a file
        formatAndWrite(
            path.join('icons', `${iconElementName}.ts`),
            `
import { Icon${ComponentName} } from '../src/elements/Icon${id}.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';

defineElement('${iconElementName}', Icon${ComponentName});

declare global {
interface HTMLElementTagNameMap {
    '${iconElementName}': Icon${ComponentName};
}
}
`
        ),
    ]).then(() => ({
        // Push the icon registration to the manifest
        imports: `import '@spectrum-web-components/icons-ui/icons/${iconElementName}.js';`,
        listing: `{ name: '${Case.sentence(ComponentName)}', tag: '<${iconElementName}>', story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\` }`,
        exports: `export {${ComponentName}Icon} from './${folder}/${id}.js';`,
    }));
}

async function buildIconSet(iconList, setName, altIconList) {
    return Promise.all(
        iconList.map((icon) => buildIcon(icon, setName, altIconList))
    ).then(async (results) =>
        formatAndWrite(
            path.join('src', `${setName}.ts`),
            `
export { setCustomTemplateLiteralTag } from './custom-tag.js';
${results.map((result) => result.exports).join('\n')}`
        ).then(() => results)
    );
}

async function main() {
    // Start by creating the directories for the icons
    await Promise.all(
        ['src/icons', 'src/icons-s2', 'src/elements', 'icons'].map((dir) => {
            const dirPath = path.join(rootDir, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
        })
    );

    const iconsV1 = (
        await fg('**.svg', {
            cwd: path.join(path.dirname(S1IconsPackageDir), 'medium'),
            absolute: true,
        })
    )?.sort();

    const iconsV2 = (
        await fg('**.svg', {
            cwd: path.join(path.dirname(S2IconsPackageDir), 'medium'),
            absolute: true,
        })
    )?.sort();

    const v1Results = buildIconSet(
        iconsV1,
        'icons',
        iconsV2?.map((i) => {
            const { ComponentName } = cleanFileName(i);
            return ComponentName;
        })
    );

    const v2Results = buildIconSet(
        iconsV2,
        'icons-s2',
        iconsV1?.map((i) => {
            const { ComponentName } = cleanFileName(i);
            return ComponentName;
        })
    );

    const results = (await Promise.all([v1Results, v2Results]))?.flat();

    // Write the icon manifest to a file
    return formatAndWrite(
        path.join('stories', 'icon-manifest.ts'),
        `
import { html, TemplateResult } from '@spectrum-web-components/base';
${results.map((result) => result.imports).join('\n')}

export const iconManifest = [
${results.map((result) => result.listing).join(',\n')}
];`
    );
}

await main().catch((error) => {
    console.error(error);
    process.exit(1);
});
