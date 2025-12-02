#!/usr/bin/env node

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

/* eslint-disable no-console */

// TODO:
// update lookup to return composite CP value, not objects
// determine if any token types are meant to be excluded from cp
// update and test token()

import fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import prettier from 'prettier';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const require = createRequire(import.meta.url);

const ALLOWED_SETS = ['desktop', 'mobile', 'light', 'dark'];

const TOKEN_JSON = [
    {
        file: 'color-aliases',
        resolveAliases: false,
    },
    {
        file: 'color-component',
        resolveAliases: false,
    },
    {
        file: 'color-palette',
        resolveAliases: true,
    },
    {
        file: 'icons',
        resolveAliases: false,
    },
    {
        file: 'layout-component',
        resolveAliases: true,
    },
    {
        file: 'layout',
        resolveAliases: true,
    },
    {
        file: 'semantic-color-palette',
        resolveAliases: false,
    },
    {
        file: 'typography',
        resolveAliases: true,
    },
];

const argv = yargs(hideBin(process.argv))
    .option('out', {
        alias: 'o',
        type: 'string',
        describe: 'Output path for the generated stylesheet',
    })
    .option('prefix', {
        alias: 'p',
        type: 'string',
        describe: 'Prefix for CSS custom properties',
        default: '',
    })
    .option('outputType', {
        choices: ['stylesheet', 'tokens'],
        describe: 'Command output type',
        demandOption: true,
    })
    .help().argv;

const out = argv.out.trim();
const prefix = argv.prefix.trim();
const outputType = argv.outputType.trim();

function isAlias(str) {
    return typeof str === 'string' && /^\{(.+)\}$/.test(str);
}

// Remove braces from values like "{blue-800}"
function stripBraces(str) {
    return str.replace(/^\{/, '').replace(/\}$/, '');
}

// Return as custom property
function convertToProperty(value) {
    if (typeof value === 'string') {
        const cp = value.match(/^\{(.+)\}$/);

        if (cp) {
            return `var(${prefix ? `--${prefix}-${cp[1]}` : `--${cp[1]}`})`;
        } else {
            return value;
        }
    } else {
        return value;
    }
}

function convertRGB(input) {
    if (typeof input !== 'string') {
        return input;
    }

    const match = input.match(/rgba?\(([^)]+)\)/i);
    if (!match) {
        return input;
    }

    const raw = match[1].trim();

    let r, g, b, a;

    // Comma-separated
    if (raw.includes(',')) {
        const parts = raw.split(',').map((v) => v.trim());
        [r, g, b, a] = parts;
    } else {
        // Space-separated, optionally with slash
        const parts = raw.split(/\s+/);
        const slashIndex = parts.indexOf('/');

        if (slashIndex !== -1) {
            [r, g, b] = parts.slice(0, slashIndex);
            a = parts[slashIndex + 1];
        } else {
            [r, g, b] = parts;
        }
    }

    // ---- Convert alpha to percent ----
    if (a !== undefined) {
        a = a.trim();

        if (!a.endsWith('%')) {
            const num = parseFloat(a);
            if (!isNaN(num)) {
                a = `${Math.round(num * 100)}%`; // round for readability
            }
        }
    }

    return a !== undefined
        ? `rgb(${r} ${g} ${b} / ${a})`
        : `rgb(${r} ${g} ${b})`;
}

// Recursively resolve a single value using the provided tokens map
function resolveAlias(tokensMap, value, seen = new Set()) {
    if (typeof value === 'string') {
        if (!isAlias(value)) {
            return convertRGB(value);
        }

        const key = stripBraces(value);
        if (seen.has(key)) {
            console.warn(`Circular alias detected for "${key}"`);
            return undefined;
        }
        seen.add(key);

        return resolveAlias(tokensMap, tokensMap[key], seen);
    }

    if (typeof value === 'number') {
        return value.toFixed(4);
    }

    if (typeof value === 'object' && value !== null) {
        const resolvedObj = {};
        for (const [k, v] of Object.entries(value)) {
            resolvedObj[k] = resolveAlias(tokensMap, v, new Set(seen));
        }
        return resolvedObj;
    }

    // number, boolean, or other primitive
    return value;
}

// Normalize tokens
function extractTokenValues(json, resolveAliases, allTokens) {
    const normalized = {};
    const allowed = new Set(ALLOWED_SETS);

    for (const [tokenName, tokenObj] of Object.entries(json)) {
        // -------------------------------------------
        // SKIP deprecated tokens entirely
        // -------------------------------------------
        if (tokenObj?.deprecated === true) {
            continue;
        }

        // -------------------------------------------
        // SKIP composite "component" tokens
        // (component-xs-regular, etc)
        // -------------------------------------------
        if (
            typeof tokenObj === 'object' &&
            tokenObj !== null &&
            tokenName.includes('component') &&
            'value' in tokenObj &&
            typeof tokenObj.value === 'object' &&
            tokenObj.value !== null &&
            !('sets' in tokenObj)
        ) {
            continue;
        }

        // -------------------------------------------
        // CASE 1 — token has a direct `value`
        // -------------------------------------------
        if (tokenObj?.value !== undefined) {
            const val = tokenObj.value;

            // Skip if THIS token is deprecated at this level
            if (tokenObj?.deprecated === true) {
                continue;
            }

            if (typeof val === 'string') {
                // Alias case
                if (resolveAliases && isAlias(val)) {
                    const resolved = resolveAlias(val, allTokens);

                    // -------------------------------
                    // Do NOT recurse if resolved
                    // alias is a primitive.
                    // -------------------------------
                    if (
                        typeof resolved !== 'object' ||
                        resolved === null ||
                        !('sets' in resolved)
                    ) {
                        normalized[tokenName] = resolved;
                        continue;
                    }

                    // resolved is itself a scale-set → flatten it
                    normalized[tokenName] = extractTokenValues(
                        { temp: resolved },
                        false,
                        allTokens
                    ).temp;
                    continue;
                }

                // Non-alias string
                normalized[tokenName] = resolveAliases
                    ? val
                    : convertToProperty(val);
            } else {
                normalized[tokenName] = val;
            }

            continue;
        }

        // -------------------------------------------
        // CASE 2 — token has `sets` (desktop/mobile)
        // -------------------------------------------
        if (tokenObj?.sets) {
            const simplified = {};

            for (const [setName, setObj] of Object.entries(tokenObj.sets)) {
                if (!allowed.has(setName)) {
                    continue;
                }

                // skip deprecated sets
                if (setObj?.deprecated === true) {
                    continue;
                }

                if (setObj?.value !== undefined) {
                    const val = setObj.value;

                    // -------------------------------
                    // Alias handling inside sets
                    // -------------------------------
                    if (
                        typeof val === 'string' &&
                        isAlias(val) &&
                        resolveAliases
                    ) {
                        const resolved = resolveAlias(val, allTokens);

                        // FIX: avoid double nesting
                        if (
                            typeof resolved !== 'object' ||
                            resolved === null ||
                            !('sets' in resolved)
                        ) {
                            simplified[setName] = resolved;
                            continue;
                        }

                        // resolved token is itself a multi-set → flatten it
                        simplified[setName] = extractTokenValues(
                            { temp: resolved },
                            false,
                            allTokens
                        ).temp;
                        continue;
                    }

                    // -------------------------------
                    // Non-alias value
                    // -------------------------------
                    if (typeof val === 'string') {
                        simplified[setName] = resolveAliases
                            ? val
                            : convertToProperty(val);
                    } else {
                        simplified[setName] = val;
                    }
                }
            }

            normalized[tokenName] = simplified;
            continue;
        }
    }

    return normalized;
}

// Generate CSS custom properties
function generateCSS(tokens) {
    const lines = [];

    function writeProp(name, value) {
        const key = prefix ? `--${prefix}-${name}` : `--${name}`;
        lines.push(`  ${key}: ${value};`);
    }

    for (const [token, value] of Object.entries(tokens)) {
        if (value == null) {
            continue;
        }

        if (typeof value === 'string' || typeof value === 'number') {
            if (token.includes('font-family')) {
                writeProp(token, `'${value}'`);
            } else {
                writeProp(token, value);
            }
            continue;
        }

        // Handle multi-value sets
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (value.light && value.dark) {
                if (!token.includes('color')) {
                    // only colors are eligible for use with light-dark()
                    writeProp(`${token}-light`, value.light);
                    writeProp(`${token}-dark`, value.dark);
                } else {
                    writeProp(
                        token,
                        `light-dark(${value.light}, ${value.dark})`
                    );
                }
            }

            if (value.desktop && value.mobile) {
                writeProp(
                    token,
                    `var(--spectrum-theme--sizeM, ${value.desktop}) 
                    var(--spectrum-theme--sizeL, ${value.mobile})`
                );
            }
        }
    }

    const copyright = `/**
 * Copyright ${new Date().getFullYear()} Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */`;

    return `${copyright}\n\n:root {\n${lines.join('\n')}\n}\n`;
}

// Load individual JSON from src
async function loadTokenJson(fileName) {
    const fullPath = require.resolve(
        `@adobe/spectrum-tokens/src/${fileName}.json`
    );

    const text = await readFile(fullPath, 'utf8');
    return JSON.parse(text);
}

// Load all JSON files from src
async function loadAllTokens() {
    const allTokens = {};

    // Concatenate all token files
    for (const { file, resolveAliases } of TOKEN_JSON) {
        const json = await loadTokenJson(file);
        const normalized = extractTokenValues(json, resolveAliases);
        Object.assign(allTokens, normalized);
    }

    // Process aliases
    for (const { resolveAliases } of TOKEN_JSON) {
        if (resolveAliases) {
            const resolved = {};
            for (const key of Object.keys(allTokens)) {
                resolved[key] = resolveAlias(allTokens, allTokens[key]);
            }

            Object.assign(allTokens, resolved);
        }
    }

    return allTokens;
}

// Lookup individual token values
export async function lookupToken(key) {
    return allTokens[key];
}

/* -----------------------------------------------------------
    MAIN EXECUTION
----------------------------------------------------------- */

const allTokens = await loadAllTokens();

fs.mkdirSync(path.dirname(out), { recursive: true });

if (outputType === 'stylesheet') {
    const prettierConfig = await prettier.resolveConfig(process.cwd());

    const css = generateCSS(allTokens, prefix);
    const formattedCss = await prettier.format(css, {
        ...prettierConfig,
        parser: 'css',
    });

    await fs.promises.writeFile(out, formattedCss, 'utf8');

    console.log(`✔ Stylesheet written to ${out}`);
} else {
    fs.writeFileSync(out, JSON.stringify(allTokens, '', 4) + '\n', 'utf8');

    console.log(`✔ Tokens written to ${out}`);
}
