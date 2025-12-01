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

// TODO:
// possibly add filenames as keys to maintain categorization
// function to convert values to custom properties and stylesheets
// determine if any token types are meant to be excluded from cp
// export functions?

import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
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

// helper to remove braces from values like "{blue-800}"
function stripBraces(value) {
    return typeof value === 'string' ? value.replace(/[{}]/g, '') : value;
}

// Recursively resolve a single value using the provided tokens map
function resolveAlias(tokensMap, value, seen = new Set()) {
    if (typeof value === 'string') {
        const match = value.match(/^\{(.+)\}$/);
        if (!match) {
            return value;
        }

        const targetKey = match[1];
        if (seen.has(targetKey)) {
            console.warn(`Circular alias detected for token "${targetKey}"`);
            return undefined;
        }
        seen.add(targetKey);

        const targetValue = tokensMap[targetKey];
        return resolveAlias(tokensMap, targetValue, seen);
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
export function extractTokenValues(json, resolveAliases) {
    const normalized = {};

    for (const [tokenName, tokenObj] of Object.entries(json)) {
        if (tokenObj?.value !== undefined) {
            const val = tokenObj.value; // could be string, number
            if (typeof val === 'string') {
                normalized[tokenName] = resolveAliases
                    ? tokenObj.value
                    : stripBraces(tokenObj.value);
                continue;
            } else {
                normalized[tokenName] = val;
            }
        }

        if (tokenObj?.sets) {
            const simplified = {};
            for (const setName of Object.keys(tokenObj.sets)) {
                if (!ALLOWED_SETS.includes(setName)) {
                    continue;
                }
                const set = tokenObj.sets[setName];
                if (set.value) {
                    const val = set.value;
                    if (typeof val === 'string') {
                        simplified[setName] = resolveAliases
                            ? set.value
                            : stripBraces(set.value);
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
function lookupToken(tokens, key) {
    return tokens[key];
}

async function main() {
    const tokens = await loadAllTokens();

    console.log(tokens);

    // should be alias key
    // console.log(lookupToken(tokens, 'swatch-disabled-icon-border-color'));

    // should be resolved value
    // console.log(lookupToken(tokens, 'heading-cjk-font-family'));
}

main();
