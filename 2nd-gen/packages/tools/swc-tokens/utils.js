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

/* -----------------------------------------------------------------------------
 *  Constants / Config
 * -------------------------------------------------------------------------- */

const ALLOWED_SETS = new Set(['desktop', 'mobile', 'light', 'dark']);

// Tokens from @adobe/spectrum-tokens/src
const SPECTRUM_TOKENS = [
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
        resolveAliases: false,
    },
];

// Custom token additions and overrides in /custom
const CUSTOM_TOKENS = [
    {
        file: 'animation',
        resolveAliases: 'false',
    },
    {
        file: 'typography',
        resolveAliases: 'true',
    },
];

/* -----------------------------------------------------------------------------
 *  Logging
 * -------------------------------------------------------------------------- */

/**
 * Creates a logger that writes to a file.
 * @param {string|false} debugPath  path to log file OR false for no logging
 */
export function createLogger(debugPath) {
    if (!debugPath) {
        return () => {};
    }

    fs.writeFileSync(debugPath, '');

    return (...args) => {
        fs.appendFileSync(
            debugPath,
            args
                .map((a) =>
                    typeof a === 'string' ? a : JSON.stringify(a, null, 2)
                )
                .join(' ') + '\n'
        );
    };
}

/* -----------------------------------------------------------------------------
 *  String / Alias helpers
 * -------------------------------------------------------------------------- */

// Tests a string to determine if it is a singular alias, ex. {gray-500}
const isAlias = (v) => typeof v === 'string' && /^\{.+\}$/.test(v);
// Tests a string to determine if it is already a custom property `var()`
const isVar = (v) => typeof v === 'string' && v.startsWith('var(');
// Remove braces from alias values, ex. "{blue-800}"
const unwrapAlias = (v) => v.replace(/[{}]/g, '');

// Return the composed custom property name with optional prefix
const createPropertyName = (name, prefix) =>
    prefix ? `--${prefix}-${name}` : `--${name}`;

// Return full custom property value inclusive of `var()` for aliases, else precomputed value
const convertToProperty = (value, prefix) =>
    isAlias(value)
        ? `var(${createPropertyName(unwrapAlias(value), prefix)})`
        : value;

/* -----------------------------------------------------------------------------
 *  CSS formatting rules
 * -------------------------------------------------------------------------- */

// Original design data uses an old rgb format, convert to modern syntax
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

// Handle CSS format conversions for final CSS values
function cssFormatConversions(name, value) {
    if (isVar(value)) {
        return value;
    }

    if (
        (name.includes('gradient-stop') || name.includes('corner-radius')) &&
        value.includes('.')
    ) {
        return `${Math.floor(parseFloat(value) * 100)}%`;
    }

    if (name.includes('font-weight')) {
        return (
            {
                light: '300',
                regular: '400',
                medium: '500',
                bold: '700',
                'extra-bold': '800',
                black: '900',
            }[value] ?? value
        );
    }

    return value;
}

/* -----------------------------------------------------------------------------
 *  Raw lookup builder
 * -------------------------------------------------------------------------- */

/**
 * Build a raw lookup map from the original JSON.
 * Keeps values exactly as in the source (including aliases with braces).
 */
function buildRawLookup(json) {
    const out = {};

    for (const [name, token] of Object.entries(json)) {
        if ('value' in token && token.value !== undefined) {
            out[name] = token.value;
            continue;
        }

        if (token?.sets) {
            out[name] = Object.fromEntries(
                Object.entries(token.sets)
                    .filter(([k]) => ALLOWED_SETS.has(k))
                    .map(([k, v]) => [k, v.value])
            );
            continue;
        }

        out[name] = token;
    }

    return out;
}

/* -----------------------------------------------------------------------------
 *  Alias Resolution
 * -------------------------------------------------------------------------- */

/**
 * Resolve an alias or value using the raw lookup map.
 * - tokensMap: the raw lookup returned by buildRawLookup(json)
 * - value: a string like "{foo}" OR a primitive OR an object (possibly with nested aliases)
 *
 * Returns: resolved primitive / object (with aliases resolved) or undefined if missing/circular.
 */
function resolveAlias(lookup, value, prefix, seen, debug) {
    const log = typeof debug === 'function' ? debug : () => {};

    if (!isAlias(value)) {
        return value;
    }

    const name = unwrapAlias(value);
    if (seen.has(name)) {
        log(
            '[⚠️ ISSUE] circular alias detected: ',
            [...seen, name].join(' -> ')
        );
        return undefined;
    }

    const target = lookup[name];
    if (target === undefined) {
        log('[❌ ERROR] missing alias target: ', name);
        return undefined;
    }

    seen.add(name);

    // --- shallow resolution for multi-set targets ---
    if (isAlias(target)) {
        // Uncomment as needed
        // log(
        //     `[SHALLOW ALIAS] set target has alias, returning alias as property: {${value}}`
        // );
        return convertToProperty(value, prefix);
    }

    // --- resolve primitives or nested objects ---
    if (typeof target === 'string') {
        return resolveAlias(lookup, target, prefix, seen, debug);
    }

    if (typeof target === 'object') {
        return Object.fromEntries(
            Object.entries(target).map(([k, v]) => [
                k,
                resolveAlias(lookup, v, prefix, new Set(seen), debug),
            ])
        );
    }

    return target;
}

// Find and replace aliases embedded in a string, ex. `value1 {token} value2`
function resolveAliasesInString(str, lookup, prefix, debug) {
    return str.replace(/\{([^{}]+)\}/g, (m) => {
        const r = resolveAlias(lookup, m, prefix, new Set(), debug);
        return r ?? m;
    });
}

/* -----------------------------------------------------------------------------
 *  Token normalization
 * -------------------------------------------------------------------------- */

function normalizePrimitive(
    value,
    { resolveAliases, lookup, prefix, debug, inSet = false }
) {
    // const log = typeof debug === 'function' ? debug : () => {};

    if (typeof value === 'number') {
        return value.toFixed(2);
    }

    if (typeof value !== 'string') {
        return value;
    }

    const withRGB = convertRGB(value);

    if (!resolveAliases) {
        return convertToProperty(withRGB, prefix);
    }

    if (isAlias(withRGB)) {
        const resolved = resolveAlias(
            lookup,
            withRGB,
            prefix,
            new Set(),
            debug,
            inSet
        );

        if (inSet && typeof resolved === 'object' && resolved !== null) {
            // log('[SET] alias resolves to set, preserving alias:', withRGB);
            return convertToProperty(withRGB, prefix);
        }

        return normalizePrimitive(resolved, {
            resolveAliases: false,
            lookup,
            prefix,
            debug,
        });
    }

    if (withRGB.includes('{')) {
        return resolveAliasesInString(withRGB, lookup, prefix, debug);
    }

    return withRGB;
}

function normalizeSetGroup(sets, lookup, prefix, debug) {
    // const log = typeof debug === 'function' ? debug : () => {};

    const out = {};

    for (const [name, set] of Object.entries(sets)) {
        if (!ALLOWED_SETS.has(name) || set?.deprecated) {
            continue;
        }
        out[name] = normalizePrimitive(set.value, {
            resolveAliases: true,
            lookup,
            prefix,
            debug,
            inSet: true,
        });
    }

    return out;
}

function extractTokenValues(
    json,
    resolveAliases,
    prefix,
    { debug = false, rawLookupOverride = null } = {}
) {
    const lookup = rawLookupOverride ?? buildRawLookup(json);
    const out = {};

    const log = typeof debug === 'function' ? debug : () => {};

    for (const [name, token] of Object.entries(json)) {
        if (token?.deprecated) {
            log(`[DEPRECATED] token '${name}'`);
            continue;
        }

        if (token?.skipResolution) {
            out[name] =
                'value' in token
                    ? convertToProperty(token.value, prefix)
                    : normalizeSetGroup(token.sets, lookup, prefix, debug);
            continue;
        }

        if ('value' in token) {
            out[name] = normalizePrimitive(token.value, {
                resolveAliases,
                lookup,
                prefix,
                debug,
            });
            continue;
        }

        if (token?.sets) {
            out[name] = normalizeSetGroup(token.sets, lookup, prefix, debug);
        }
    }

    return out;
}

/* -----------------------------------------------------------------------------
 *  CSS Generation
 * -------------------------------------------------------------------------- */

// Generate final unified CSS stylesheet with tokens as custom properties
export async function generateCSS(prefix, debug = false) {
    const tokens = await allTokens(prefix, debug);
    const nonScaling = [];
    const scaling = [];

    const write = (k, v, arr) =>
        arr.push(
            `  ${createPropertyName(k, prefix)}: ${cssFormatConversions(k, v)};`
        );

    for (const [name, value] of Object.entries(tokens)) {
        if (value == null) {
            continue;
        }

        if (typeof value === 'string' || typeof value === 'number') {
            write(
                name,
                !isVar(value) &&
                    name.includes('font-family') &&
                    !name.includes('stack')
                    ? `'${value}'`
                    : value,
                nonScaling
            );
            continue;
        }

        // Handle multi-value sets
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (value.light && value.dark) {
                if (!name.includes('color') && !name.match(/(\d+)$/)) {
                    // only colors are eligible for use with light-dark()
                    write(`${name}-light`, value.light, nonScaling);
                    write(`${name}-dark`, value.dark, nonScaling);
                } else {
                    write(
                        name,
                        `light-dark(${value.light}, ${value.dark})`,
                        nonScaling
                    );
                }
            }

            if (value.desktop && value.mobile) {
                write(
                    name,
                    `var(--${prefix}-theme--sizeM, ${value.desktop})
                var(--${prefix}-theme--sizeL, ${value.mobile})`,
                    scaling
                );
            }
        }
    }

    return `/**
 * Copyright ${new Date().getFullYear()} Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* ⚠️ NOTE: This file is dynamically generated via swc-tokens */

/* stylelint-disable value-keyword-case */

:root {
${nonScaling.join('\n')}
}

:root, .swc-theme {
${scaling.join('\n')}
}`.trim();
}

/* -----------------------------------------------------------------------------
 *  Token loading
 * -------------------------------------------------------------------------- */

// Load individual token JSON files
async function loadTokenJson(file, src) {
    const base = src === 'spectrum' ? '@adobe/spectrum-tokens/src' : './custom';
    return JSON.parse(
        await readFile(require.resolve(`${base}/${file}.json`), 'utf8')
    );
}

// Load, concat, and resolve all token JSON sources
async function loadAllTokens(prefix, debug = false) {
    const sources = [
        ...SPECTRUM_TOKENS.map((t) => ({ ...t, src: 'spectrum' })),
        ...CUSTOM_TOKENS.map((t) => ({ ...t, src: 'custom' })),
    ];

    const rawFiles = await Promise.all(
        sources.map(async (s) => ({
            ...s,
            raw: await loadTokenJson(s.file, s.src),
        }))
    );

    const globalLookup = Object.assign(
        {},
        ...rawFiles.map((f) => buildRawLookup(f.raw))
    );

    return Object.assign(
        {},
        ...rawFiles.map((f) =>
            extractTokenValues(f.raw, f.resolveAliases, prefix, {
                debug,
                rawLookupOverride: globalLookup,
            })
        )
    );
}

// Returns combined total token JSON
export const allTokens = (prefix, debug = false) =>
    loadAllTokens(prefix, debug);

// Lookup individual token values for use in component styles
export async function lookupToken(key, prefix) {
    const tokens = await allTokens(prefix);
    if (!(key in tokens)) {
        throw new Error(`token() not found: '${key}'`);
    }

    return typeof tokens[key] === 'object'
        ? `var(${createPropertyName(key, prefix)})`
        : cssFormatConversions(key, tokens[key]);
}

// test exports (non-public API)
export const __test__ = {
    createPropertyName,
    convertToProperty,
    convertRGB,
    cssFormatConversions,
    buildRawLookup,
    resolveAlias,
    resolveAliasesInString,
    normalizePrimitive,
    normalizeSetGroup,
    extractTokenValues,
    lookupToken,
};
