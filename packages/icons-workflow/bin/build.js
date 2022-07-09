/* eslint-disable no-console,@typescript-eslint/explicit-function-return-type */
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

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { emptyDir } from 'fs-extra';
import { join } from 'path';
import { createRequire } from 'module';
import { load } from 'cheerio';
// import { format } from 'prettier';
import chalk from 'chalk';
import Case from 'case';

const require = createRequire(import.meta.url);
const rootDir = process.cwd();

const iconsPath = process.argv.slice(2)[0];
const keepColors = process.argv.slice(2)[1];
const verbose = false;

const paths = {
    spIcons: join(rootDir, 'src/icons'),
    elements: join(rootDir, 'src/elements'),
    icons: join(rootDir, 'icons'),
};

const printPath = (fullPath) => fullPath.replace(rootDir, '.');

/**
 * @param {string} path - Path to the icon manifest
 * @return {Promise<string[] | Error>} - An array of icon names
 **/
export async function getIconList(path = iconsPath) {
    const spectrumIconsPath = require.resolve(path);
    if (!spectrumIconsPath)
        Promise.reject(
            new Error(`Could not find manifest at ${printPath(path)}.`)
        );

    // Read in the icon data
    const iconData = await readFile(spectrumIconsPath, 'utf8');
    // Parse the icon data as JSON
    const icons = JSON.parse(iconData);

    if (!Array.isArray(icons) || icons.length === 0)
        Promise.reject(new Error(`No icons found at ${printPath(iconsPath)}.`));

    return Promise.resolve(
        icons.map((filename) => {
            let id = cleanID(filename);
            const ComponentName = id === 'github' ? 'GitHub' : Case.pascal(id);

            if (!Number.isNaN(Number(id[0]))) {
                console.log(`${id} was not a valid id; updated to sp${id}.`);
                id = `sp${id}`;
            }

            const iconElementName = `sp-icon-${Case.kebab(ComponentName)}`;

            return { filename, id, ComponentName, iconElementName };
        })
    );
    // return Promise.resolve(icons);
}

async function writeIconRegistry(iconData, folder = paths.icons) {
    const { ComponentName, id, iconElementName } = iconData;
    const iconRegistration = `
import { Icon${ComponentName} } from '../src/elements/Icon${id}.js';
customElements.define('${iconElementName}', Icon${ComponentName});
declare global {
    interface HTMLElementTagNameMap {
        '${iconElementName}': Icon${ComponentName};
    }
}`;

    // Write the icon registration file in the provided folder
    const location = join(folder, `${iconElementName}.ts`);
    return writeFile(location, iconRegistration, 'utf-8');
}

async function writeIcon(iconData, path = iconsPath, folder = paths.spIcons) {
    const { filename, ComponentName, id } = iconData;
    const spectrumIconsPath = require.resolve(path);
    if (!spectrumIconsPath)
        Promise.reject(
            new Error(`Could not find manifest at ${printPath(path)}.`)
        );

    const svgPath = join(`${spectrumIconsPath}/../18/${filename}`);
    if (!existsSync(svgPath))
        Promise.reject(
            new Error(`Could not find SVG at ${printPath(svgPath)}.`)
        );

    const $ = await processSVG(svgPath);
    const title = Case.capital(id);
    const svg = $('svg')
        .toString()
        .replace(
            'aria-hidden="..."',
            "aria-hidden=\"${hidden ? 'true' : 'false'}\""
        )
        .replace(/&#x24;/g, '$');

    const content = `
import {tag as html, TemplateResult} from '../custom-tag.js';
export {setCustomTemplateLiteralTag} from '../custom-tag.js';
export const ${ComponentName}Icon = ({ width = 24, height = 24, hidden = false, title = '${title}' } = {},): string | TemplateResult => {
    return html\`${svg}\`;
}`;

    const location = join(folder, `${id}.ts`);
    return writeFile(location, content, 'utf-8');
}

async function writeElement(iconData, folder = paths.elements) {
    const { ComponentName, id, iconElementName } = iconData;
    const iconElement = `
import { html, TemplateResult } from '@spectrum-web-components/base';
import { IconBase } from '@spectrum-web-components/icon';
import { ${ComponentName}Icon } from '../icons/${id}.js';
import { setCustomTemplateLiteralTag } from '../custom-tag.js';

/**
 * @element ${iconElementName}
 */
export class Icon${ComponentName} extends IconBase {
    protected override render(): TemplateResult {
        setCustomTemplateLiteralTag(html);
        return ${ComponentName}Icon({hidden: !this.label, title: this.label}) as TemplateResult;
    }
}`;

    const location = join(folder, `Icon${id}.ts`);
    return writeFile(location, iconElement, 'utf-8');
}

async function processSVG(svgPath) {
    const svg = await readFile(svgPath, 'utf-8');
    const $ = load(svg, { xmlMode: true });
    $('*').each((_idx, el) => {
        if (el.name === 'svg') {
            $(el).attr('aria-hidden', '...');
            $(el).attr('role', 'img');
            if (keepColors !== 'keep') {
                $(el).attr('fill', 'currentcolor');
            }
            $(el).attr('aria-label', '${title}');
            $(el).removeAttr('id');
        }
        if (el.name === 'defs') {
            $(el).remove();
        }
        Object.keys(el.attribs).forEach((x) => {
            if (x === 'class') {
                $(el).removeAttr(x);
            }
            if (keepColors !== 'keep' && (x === 'stroke' || x === 'fill')) {
                $(el).attr(x, 'currentcolor');
            }
            if (el.name === 'svg') {
                if (x === 'width' || x === 'height') {
                    $(el).attr(x, '${' + x + '}');
                }
            }
        });
    });

    return $;
}

function cleanID(iconName) {
    let id = iconName
        .replace(/\.svg$/, '')
        .replace('S_', '')
        .replace('_22_N', '');

    if (id.search(/^Ad[A-Z]/) !== -1) {
        id = id.replace(/^Ad/, '');
        id += 'Advert';
    }

    return id;
}

async function processIcon(iconData) {
    let { id, ComponentName, iconElementName } = iconData;
    // if (!Number.isNaN(Number(ComponentName[0]))) return Promise.resolve();

    const writeAssets = [];

    // These can be done in parallel
    writeAssets.push(writeIcon(iconData));
    writeAssets.push(writeElement(iconData));
    writeAssets.push(writeIconRegistry(iconData));

    return {
        promises: writeAssets,
        manifestImport: `import '../icons/${iconElementName}.js';`,
        manifestExport: `export {${ComponentName}Icon} from './icons/${id}.js';`,
        manifestListing: `{
    name: '${Case.sentence(ComponentName)}',
    tag: '<${iconElementName}>',
    story: (size: string): TemplateResult => html\`<${iconElementName} size=\$\{size\}></${iconElementName}>\`
},`,
    };
}

async function main() {
    // Test that the folders exist, if not, create them
    Object.values(paths).forEach((path) => emptyDir(path));
    const iconList = await getIconList();
    const processes = iconList.map((iconData) => processIcon(iconData));
    const results = await Promise.all(processes)
        .then((r) => r.filter((i) => i !== undefined && i !== null))
        .catch();
    // TODO ^

    const assetPromises = results.map((obj) => obj.promises).flat();
    const imports = results.map((obj) => obj.manifestImport);
    const exports = results.map((obj) => obj.manifestExport);
    const listings = results.map((obj) => obj.manifestListing);

    await writeFile(
        join(rootDir, 'src/icons.ts'),
        `
export { setCustomTemplateLiteralTag } from './custom-tag.js';
${exports.join('\n')}
    `,
        'utf-8'
    );

    await writeFile(
        join(rootDir, 'stories/icon-manifest.ts'),
        `
import { html, TemplateResult } from '@spectrum-web-components/base';
${imports.join('\n')}
export const iconManifest = [${listings.join('\n')}]`,
        'utf-8'
    );

    // Don't exit until all assets are done writing
    await Promise.all(assetPromises).catch();
    // TODO ^

    console.log(`Successfully processed ${iconList.length} icons.`);
    if (verbose)
        iconList.forEach(({ iconElementName }) =>
            console.log(`${chalk.green(`✓`)} ${iconElementName}`)
        );
}

main();
