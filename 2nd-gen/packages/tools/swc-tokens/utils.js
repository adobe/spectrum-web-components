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

import fs from 'fs';
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

/**
 * Creates a logger that writes to a file.
 * @param {string|false} debugPath  path to log file OR false for no logging
 */
export function createLogger(debugPath) {
    if (!debugPath) {
        return () => {}; // no-op
    }

    // Ensure the file is reset on each run
    fs.writeFileSync(debugPath, '');

    return (...args) => {
        const line = args
            .map((a) =>
                typeof a === 'string' ? a : JSON.stringify(a, null, 2)
            )
            .join(' ');
        fs.appendFileSync(debugPath, line + '\n');
    };
}

function isAlias(str) {
    return typeof str === 'string' && /^\{(.+)\}$/.test(str);
}

// Remove braces from values like "{blue-800}"
function unwrapAlias(str) {
    return str.replace(/^\{/, '').replace(/\}$/, '');
}

// Return as custom property
function convertToProperty(value, prefix) {
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

// Original design data uses an old rgb format
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

/**
 * Build a raw lookup map from the original JSON.
 * Keeps values exactly as in the source (including aliases with braces).
 */
function buildRawLookup(json) {
    const lookup = {};

    for (const [k, v] of Object.entries(json)) {
        // If token has 'value' (string/number/object), keep it raw
        if ('value' in v && v.value !== undefined) {
            lookup[k] = v.value;
            continue;
        }

        // If token has sets, keep the sets' values raw
        if (v?.sets) {
            const s = {};
            for (const [setName, setObj] of Object.entries(v.sets)) {
                if (!ALLOWED_SETS.includes(setName)) {
                    continue;
                }
                if ('value' in setObj && setObj.value !== undefined) {
                    s[setName] = setObj.value;
                }
            }
            lookup[k] = s;
            continue;
        }

        // otherwise keep full object (may be multi-part tokens)
        lookup[k] = v;
    }

    return lookup;
}

/**
 * Resolve an alias or value using the raw lookup map.
 * - tokensMap: the raw lookup returned by buildRawLookup(json)
 * - value: a string like "{foo}" OR a primitive OR an object (possibly with nested aliases)
 *
 * Returns: resolved primitive / object (with aliases resolved) or undefined if missing/circular.
 */
function resolveAliasValue(tokensMap, value, seen = new Set(), debug = false) {
    // ------------------------------------------------------
    // Helpers
    // ------------------------------------------------------

    const log = typeof debug === 'function' ? debug : () => {};

    const cloneSeen = () => new Set(seen); // ensures each branch has its own copy

    const resolveObject = (obj) => {
        const out = Array.isArray(obj) ? [] : {};
        for (const [k, v] of Object.entries(obj)) {
            out[k] = resolveAliasValue(tokensMap, v, cloneSeen(), debug);
        }
        return out;
    };

    const resolveSetGroup = (obj) => {
        const out = {};
        for (const [setName, setVal] of Object.entries(obj)) {
            out[setName] = resolveAliasValue(
                tokensMap,
                setVal,
                cloneSeen(),
                debug
            );
        }
        return out;
    };

    const isSetsObject = (obj) =>
        typeof obj === 'object' &&
        obj !== null &&
        Object.keys(obj).length > 0 &&
        Object.keys(obj).every((k) => ALLOWED_SETS.includes(k));

    // ------------------------------------------------------
    // Primitive handling
    // ------------------------------------------------------

    if (value === null || typeof value !== 'object') {
        // number | string | boolean | null
        if (typeof value !== 'string') {
            return value;
        }
        if (!isAlias(value)) {
            return value;
        }
    }

    // ------------------------------------------------------
    // Alias resolution
    // ------------------------------------------------------

    const targetName = unwrapAlias(value);
    if (!targetName) {
        return value;
    }

    if (seen.has(targetName)) {
        log(
            `circular alias detected: ${[...seen].join(' -> ')} -> ${targetName}`
        );
        return undefined;
    }

    seen.add(targetName);

    const targetValue = tokensMap[targetName];
    if (targetValue === undefined) {
        log(`missing alias target: ${targetName}`);
        return undefined;
    }

    // ------------------------------------------------------
    // Resolve target value
    // ------------------------------------------------------

    // simple string → might be another alias
    if (typeof targetValue === 'string') {
        return resolveAliasValue(tokensMap, targetValue, seen, debug);
    }

    // object shapes
    if (typeof targetValue === 'object' && targetValue !== null) {
        return isSetsObject(targetValue)
            ? resolveSetGroup(targetValue)
            : resolveObject(targetValue);
    }

    // fallback primitive
    return targetValue;
}

// Normalize tokens
function extractTokenValues(
    json,
    resolveAliases,
    prefix,
    { debug = false } = {}
) {
    const allowed = new Set(ALLOWED_SETS);
    const rawLookup = buildRawLookup(json);
    const normalized = {};

    const log = typeof debug === 'function' ? debug : () => {};

    // --------------------------
    //  Helpers
    // --------------------------

    const normalizePrimitive = (value) => {
        if (typeof value === 'number') {
            return value.toFixed(4);
        }
        if (typeof value === 'string') {
            const formatted = convertRGB(value); // <-- RGB formatting
            return resolveAliases
                ? formatted
                : convertToProperty(formatted, prefix);
        }
        return value;
    };

    const resolveAliasValueSafe = (alias, seen = new Set()) => {
        const resolved = resolveAliasValue(rawLookup, alias, seen, debug);

        // primitive → normalize directly
        if (
            typeof resolved !== 'object' ||
            resolved === null ||
            !('sets' in resolved)
        ) {
            return normalizePrimitive(resolved);
        }

        // multi-set alias → flatten
        return extractTokenValues({ temp: resolved }, false, prefix, { debug })
            .temp;
    };

    const normalizeValue = (rawValue) => {
        if (
            typeof rawValue === 'string' &&
            resolveAliases &&
            isAlias(rawValue)
        ) {
            log('[ALIAS] resolving', rawValue);
            return resolveAliasValueSafe(rawValue);
        }
        return normalizePrimitive(rawValue);
    };

    const shouldSkipToken = (tokenName, tokenObj) => {
        if (tokenObj?.deprecated === true) {
            log('[SKIP deprecated token]', tokenName);
            return true;
        }

        // composite component tokens
        if (
            tokenName.startsWith('component-') &&
            tokenObj.value &&
            typeof tokenObj.value === 'object' &&
            !tokenObj.sets
        ) {
            log('[SKIP component]', tokenName);
            return true;
        }

        return false;
    };

    const normalizeSetGroup = (tokenName, tokenObj) => {
        const out = {};

        for (const [setName, setObj] of Object.entries(tokenObj.sets)) {
            if (!allowed.has(setName)) {
                log('[SKIP set not allowed]', `${tokenName}.${setName}`);
                continue;
            }
            if (setObj?.deprecated === true) {
                log('[SKIP deprecated set]', `${tokenName}.${setName}`);
                continue;
            }
            if (setObj?.value === undefined) {
                continue;
            }

            out[setName] = normalizeValue(setObj.value);
        }

        return out;
    };

    // --------------------------
    //  Main loop
    // --------------------------

    for (const [tokenName, tokenObj] of Object.entries(json)) {
        if (shouldSkipToken(tokenName, tokenObj)) {
            continue;
        }

        // direct value
        if ('value' in tokenObj) {
            normalized[tokenName] = normalizeValue(tokenObj.value);
            continue;
        }

        // multi-set
        if (tokenObj.sets) {
            normalized[tokenName] = normalizeSetGroup(tokenName, tokenObj);
            continue;
        }

        log('[UNHANDLED token shape]', tokenName, tokenObj);
    }

    return normalized;
}

function createPropertyName(name, prefix) {
    return prefix ? `--${prefix}-${name}` : `--${name}`;
}

// Generate CSS custom properties
export async function generateCSS(prefix, debug = false) {
    const lines = [];

    function writeProp(name, value) {
        const key = createPropertyName(name, prefix);
        lines.push(`  ${key}: ${value};`);
    }

    for (const [token, value] of Object.entries(
        await allTokens(prefix, debug)
    )) {
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
                if (!token.includes('color') && !token.match(/(\d+)$/)) {
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
async function loadAllTokens(prefix, debug = false) {
    const tokens = {};

    // Concatenate all token files
    for (const { file, resolveAliases } of TOKEN_JSON) {
        const json = await loadTokenJson(file);
        const normalized = extractTokenValues(json, resolveAliases, prefix, {
            debug: debug,
        });
        Object.assign(tokens, normalized);
    }

    return tokens;
}

export const allTokens = async (prefix, debug = false) =>
    await loadAllTokens(prefix, debug);

// Lookup individual token values
export async function lookupToken(key, prefix) {
    const tokens = await allTokens(prefix);
    const tokenValue = tokens[key];

    if (tokenValue !== undefined) {
        if (typeof tokenValue === 'object') {
            // Reference global custom property that already composites the set
            return `var(${createPropertyName(key, prefix)})`;
        } else {
            return tokenValue;
        }
    } else {
        throw new Error(`token() did not find '${key}'`);
    }
}
