/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*!
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

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import fg from 'fast-glob';
import { load } from 'cheerio';
import Case from 'case';
import nunjucks from 'nunjucks';
import 'colors';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '..');
const rootDir = path.join(__dirname, '..', '..', '..');

/**
 * A simple logger utility to write messages to the console
 * @type {object} log
 * @property {(string) => void} log.error
 * @property {(string) => void} log.write
 * @property {(string) => void} log.success
 * @property {(string) => void} log.info
 */
const log = {
	error: (error) => process.stderr.write(`${'❌'.red}  ${error}\n\n`),
    write: (msg) => process.stdout.write(msg),
    success: (msg) => process.stdout.write(`${'✓'.green}  ${msg}\n`),
    info: (msg) => process.stdout.write(`${'ℹ️'.blue}  ${msg}\n`),
};

/** @type {(string) => string} */
const relativePrint = (filename, { cwd = rootDir } = {}) =>
    path.relative(cwd, filename);

const env = new nunjucks.Environment(undefined, {
    autoescape: false,
    throwOnUndefined: true,
    trimBlocks: true,
    lstripBlocks: true,
});

/**
 * Formats the content and writes it to the file path
 * @param {string} filePath - The path to the file to write
 * @param {string} content - The content to format
 * @returns {Promise<void>} - A promise that resolves when the file is written
 */
const formatAndWrite = async (filePath, content) => {
    return fsp.writeFile(filePath, content, { encoding: 'utf-8' });
};

/**
 * Writes to a template
 * @param {string} filename - The filename of the template
 * @param {string} filepath - The path to the file to write
 * @param {object} data - The data to pass to the template
 * @returns {Promise<void>} - A promise that resolves when the file is written
 */
async function writeToTemplate(filename, filepath, data) {
    const templatePath = path.join(__dirname, 'templates', filename);
    // Check if the template exists
    if (!fs.existsSync(templatePath)) {
        console.error(`Template ${templatePath} does not exist`);
        return Promise.reject(
            new Error(`Template ${templatePath} does not exist`)
        );
    }

    const template = await fsp.readFile(templatePath, 'utf-8');

    // Render the template as a string
    const content = env.renderString(template, data);

    return formatAndWrite(filepath, content);
}

/**
 * Builds the icons and writes them to the correct directories
 * @param {string} filepath - The filepath to the icon to build
 * @returns {Promise<{imports: string, listings: string}>} - The imports and listings for the icon
 */
async function buildIcon(filepath) {
    const svg = await fsp.readFile(filepath, 'utf-8').catch((error) => {
        console.error(`Error reading icon ${filepath}:`, error);
        return Promise.reject(error);
    });

    const $ = load(svg, { xmlMode: true });
    let id = path
        .basename(filepath, '.svg')
        .replace('S2_Icon_', '')
        .replace('_20_N', '')
        .replace('_22x20_N', '');

    [
        {
            find: /^Ad[A-Z](.*?)$/,
            replace: '$1Advert',
        },
        {
            find: 'github',
            replace: 'GitHub',
        },
        {
            find: 'UnLink',
            replace: 'Unlink',
        },
        {
            find: 'TextStrikeThrough',
            replace: 'TextStrikethrough',
        },
        {
            find: /^3D/,
            replace: 'ThreeD',
        },
    ].forEach(({ find, replace }) => {
        if (id === find) id = replace;
        if (id.search(find) !== -1) {
            id = id.replace(find, replace);
        }
    });

    // Skip if the first character is a number
    if (/^\d/.test(id))
        return Promise.reject(
            new Error(
                `Icon ${id} has a number as the first character in the name which is not valid.`
            )
        );

    // @todo can we remove this now that icons are being pre-processed?
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

    const parsedSvg = $('svg')
        .toString()
        .replace(
            'aria-hidden="..."',
            `aria-hidden='\${hidden ? 'true' : 'false'}'`
        )
        .replace('width="..."', `width="\${width}"`)
        .replace('height="..."', `height="\${height}"`)
        .replace('aria-label="..."', `aria-label="\${title}"`);

    return Promise.all([
        writeToTemplate(
            'id.ts.njk',
            path.join(iconsDir, 'src', 'icons', `${id}.ts`),
            {
                ComponentName: Case.pascal(id),
                id,
                iconElementName: `sp-icon-${Case.kebab(id)}`,
                title: Case.capital(id),
                width: 24,
                height: 24,
                svg: parsedSvg,
            }
        ),
        writeToTemplate(
            'IconID.ts.njk',
            path.join(iconsDir, 'src', 'elements', `Icon${id}.ts`),
            {
                ComponentName: Case.pascal(id),
                id,
                iconElementName: `sp-icon-${Case.kebab(id)}`,
                title: Case.capital(id),
            }
        ),
        writeToTemplate(
            'ElementName.ts.njk',
            path.join(iconsDir, 'icons', `sp-icon-${Case.kebab(id)}.ts`),
            {
                ComponentName: Case.pascal(id),
                id,
                iconElementName: `sp-icon-${Case.kebab(id)}`,
                title: Case.capital(id),
            }
        ),
    ]).then(() => ({
        id,
        exports: `export {${Case.pascal(id)}Icon} from './icons/${id}.js';`,
        imports: `import '@spectrum-web-components/icons-workflow/icons/sp-icon-${Case.kebab(id)}.js';`,
        listings: `{ name: '${Case.sentence(id)}', tag: '<sp-icon-${Case.kebab(id)}>', story: (size: IconSize): TemplateResult => html\`<sp-icon-${Case.kebab(id)} size=\$\{size\}></sp-icon-${Case.kebab(id)}>\` }`,
    }));
}

async function main({ verbose = false } = {}) {
    // Kick off the directory creation
    const makeDirs = Promise.all(
        ['src/icons', 'src/elements', 'icons', 'stories'].map((dirPath) => {
            if (!fs.existsSync(path.join(iconsDir, dirPath))) {
                return fsp.mkdir(path.join(iconsDir, dirPath), {
                    recursive: true,
                });
            }
            return Promise.resolve();
        })
    );

    // Read the icons
    return fg(`assets/svg/**.svg`, {
        cwd: path.dirname(
            require.resolve('@adobe/spectrum-css-workflow-icons', {
                paths: [iconsDir, path.join(iconsDir, '..', '..')],
            })
        ),
        absolute: true,
    }).then(async (icons) => {
        // Don't start building until the directories are created
        await makeDirs.then(() => {
            if (verbose)
                log.info(
                    'All directories have been created if they did not already exist.'
                );
        });

        // Build the icons
        return Promise.all(icons.map(buildIcon)).then(async (results) => {
            results = results.sort((a, b) =>
                a.id.localeCompare(b.id, 'en', { numeric: true })
            );
            // Create the exports, imports, and listings
            const exports = [
                "export { setCustomTemplateLiteralTag } from './custom-tag.js';",
                ...results.map(({ exports }) => exports),
            ];
            const imports = results.map(({ imports }) => imports);
            const listings = results.map(({ listings }) => listings);

            const promises = [
                formatAndWrite(
                    path.join(iconsDir, 'src', 'icons.ts'),
                    exports.join('\r\n') + '\r\n'
                ).then(() => {
                    log.success(
                        `Successfully wrote exports to ${'src/icons.ts'.cyan}.`
                    );
                }),
                writeToTemplate(
                    'icon-manifest.ts.njk',
                    path.join(iconsDir, 'stories', 'icon-manifest.ts'),
                    {
                        imports: imports.join('\r\n'),
                        listings: listings.join(',\r\n\t'),
                    }
                ).then(() => {
                    log.success(
                        `Successfully wrote icon manifest to ${'stories/icon-manifest.ts'.cyan}.`
                    );
                }),
            ];

            // Process all files with ESLint
            promises.push(
                fg(['src/icons/**'], {
                    cwd: iconsDir,
                    absolute: true,
                    ignore: ['src/icons/*.d.ts'],
                }).then((builtAssets) => {
                        // Write results to the files
                        return Promise.all(
                            builtAssets.map(
                                async (filePath) => {
                                    const output = await fsp.readFile(filePath, 'utf-8');
                                    if (!output) return Promise.resolve();
                                    return formatAndWrite(
                                        filePath,
                                        output
                                    ).then(() => {
                                        log.success(
                                            `${path.basename(filePath, '.ts').green} to ${relativePrint(filePath).cyan}.`
                                        );
                                    });
                                }
                            )
                        );
                    })
            );

            return Promise.all(promises);
        });
    });
}

main({ verbose: true });
