/**
 * Copyright 2026 Adobe. All rights reserved.
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
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'path';

import { capitalize } from '@spectrum-web-components/core/shared/utilities';

const require = createRequire(import.meta.url);

/**
 * Default variant order + size keys.
 *
 * Note: 'title' tokens currently not available
 */
const DEFAULT_CATEGORIES = ['heading', 'body', 'detail', 'code'];
const SIZE_KEYS = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];

// Token names for font families
const FONT_TOKENS = {
    sans: 'sans-serif-font',
    serif: 'serif-font',
    cjk: 'cjk-font',
    code: 'code-font',
};

const VARIANT_CONFIG = {
    heading: { defaultFont: 'sans', cpBaseSuffix: 'heading' },
    body: { defaultFont: 'sans', cpBaseSuffix: 'body' },
    detail: { defaultFont: 'sans', cpBaseSuffix: 'detail' },
    // Prevent clash with code design tokens by using "monospace" as cp base
    code: { defaultFont: 'code', cpBaseSuffix: 'monospace' },
};

/**
 * Per-variant CJK overrides that should be inherited via the base class.
 * Provide only what applies; omitted props won't be emitted.
 */
const CJK_OVERRIDES = {
    heading: {
        lineHeight: 'cjk-line-height-100',
        letterSpacing: 'cjk-letter-spacing',
    },
    title: {
        lineHeight: 'cjk-line-height-100',
        letterSpacing: 'cjk-letter-spacing',
    },
    body: {
        lineHeight: 'cjk-line-height-200',
        letterSpacing: 'cjk-letter-spacing',
    },
    detail: {
        lineHeight: 'cjk-line-height-100',
        letterSpacing: 'cjk-letter-spacing',
    },
    code: { lineHeight: 'line-height-200' },
};

const PROSE_CLASS = 'Typography--prose';
function proseSelector(prefix) {
    return `.${prefix}-${PROSE_CLASS}`;
}

/**
 * Selector aliases let us "attach" semantic selectors to an existing variant/size class
 * without duplicating styling logic. These are only applied under the `--prose` container class.
 *
 * Keys:
 * - base: appended to the base variant selector (e.g. `.swc-Body`)
 * - sizes: appended to the specific size selector (e.g. `.swc-Body--sizeM`)
 * - margins: appended to the margins variant selector (e.g. `.swc-Body--margins`)
 *
 * Values are arrays of extra selectors to include in the emitted selector list.
 */
const SELECTOR_ALIASES = {
    body: {
        base: [':is(p, li)'],
        margins: [':is(p, li)'],
    },
    heading: {
        base: [':is(h1, h2, h3, h4)'],
        sizes: {
            xxl: ['h1'],
            xl: ['h2'],
            l: ['h3'],
            m: ['h4'],
        },
        margins: [':is(h1, h2, h3, h4)'],
    },
};

function splitSelectors(selector) {
    // normalize "a, b, c" into ["a","b","c"]
    return selector
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}

function selectorWithAliases({
    selector,
    prefix,
    typeVar,
    sizeKey,
    kind = 'base', // 'base' | 'size' | 'margins'
    selectorAliases = SELECTOR_ALIASES,
}) {
    const out = new Set(splitSelectors(selector));

    const cfg = selectorAliases?.[typeVar];
    if (!cfg) {
        return Array.from(out).join(', ');
    }

    const prose = proseSelector(prefix);

    if (kind === 'base' && Array.isArray(cfg.base)) {
        for (const s of cfg.base) {
            out.add(`${prose} ${s}`);
        }
    }

    if (kind === 'size' && sizeKey && cfg.sizes?.[sizeKey]) {
        for (const s of cfg.sizes[sizeKey]) {
            out.add(`${prose} ${s}`);
        }
    }

    if (kind === 'margins' && Array.isArray(cfg.margins)) {
        for (const s of cfg.margins) {
            out.add(`${prose} ${s}`);
        }
    }

    return Array.from(out).join(', ');
}

/**
 * Helper: value like "{font-size-1500}" -> "font-size-1500"
 */
function extractAliasName(value) {
    const m = typeof value === 'string' ? value.match(/^\{([^}]+)\}$/) : null;
    return m ? m[1] : null;
}

function toSizeLabel(sizeKey) {
    return sizeKey.toUpperCase();
}

function cssDecls(decls, indent = '  ') {
    return Object.entries(decls)
        .filter(([, v]) => v != null && v !== '')
        .map(([k, v]) => `${indent}${k}: ${v};`)
        .join('\n');
}

function cssBlock(selector, decls, nestedBlocks = []) {
    const body = cssDecls(decls);
    const nested = nestedBlocks.length
        ? `\n\n${nestedBlocks.join('\n\n')}`
        : '';
    return `${selector} {\n${body}${nested}\n}\n`;
}

function nestedLangBlock(decls) {
    return `  &:lang(zh), &:lang(ja), &:lang(ko) {\n${cssDecls(
        decls,
        '    '
    )}\n  }`;
}

function langSelectorList(decls) {
    return (
        `:lang(zh),\n` +
        `:lang(ja),\n` +
        `:lang(ko) {\n` +
        `${cssDecls(decls)}\n` +
        `}\n`
    );
}

function tokenExists(tokens, name) {
    return Boolean(tokens?.[name]);
}

function tokenRefIfExists(tokens, name) {
    return tokenExists(tokens, name) ? `token('${name}')` : null;
}

function warnMissing(typeVar, what, name) {
    // eslint-disable-next-line no-console
    console.warn(
        `[typography] ${typeVar}: missing ${what} token "${name}" (skipped)`
    );
}

function pickValidDecls(decls) {
    return Object.fromEntries(
        Object.entries(decls).filter(([, v]) => v != null && v !== '')
    );
}

function getTokenRef(tokens, typeVar, what, tokenName) {
    const ref = tokenRefIfExists(tokens, tokenName);
    if (!ref) {
        warnMissing(typeVar, what, tokenName);
    }
    return ref;
}

function parseFontSizeNumber(aliasedFontSizeToken) {
    // "font-size-1500" -> 1500
    const m = aliasedFontSizeToken.match(/^font-size-(\d+)$/);
    return m ? Number(m[1]) : null;
}

function cjkStepDownFontSizeNumber(n) {
    if (n == null) {
        return null;
    }
    // Below 100, levels go in intervals of 25
    const step = n < 100 ? 25 : 100;
    const next = n - step;
    return next > 0 ? next : null;
}

function deriveCjkFontSizeTokenName(aliasedFontSizeToken) {
    const n = parseFontSizeNumber(aliasedFontSizeToken);
    if (n == null) {
        return null;
    }

    const cjkN = cjkStepDownFontSizeNumber(n);
    if (cjkN == null) {
        return null;
    }

    return `font-size-${cjkN}`;
}

function deriveAliasedTokenName(tokenValue, tokenNameForError) {
    const aliased = extractAliasName(tokenValue);
    if (!aliased) {
        throw new Error(
            `Expected alias value like "{font-size-...}" for ${tokenNameForError}, got: ${JSON.stringify(
                tokenValue
            )}`
        );
    }
    return aliased;
}

function buildCjkNestedDecls({ cpBase, typeVar, cjkOverrides, tokens }) {
    const decls = {};

    if (cjkOverrides.lineHeight) {
        const lh = tokenRefIfExists(tokens, cjkOverrides.lineHeight);
        if (!lh) {
            warnMissing(
                typeVar,
                'CJK line-height override',
                cjkOverrides.lineHeight
            );
        } else {
            decls['line-height'] = `var(--${cpBase}-cjk-line-height, ${lh})`;
        }
    }

    if (cjkOverrides.letterSpacing) {
        const ls = tokenRefIfExists(tokens, cjkOverrides.letterSpacing);
        if (!ls) {
            warnMissing(
                typeVar,
                'CJK letter-spacing override',
                cjkOverrides.letterSpacing
            );
        } else {
            decls['letter-spacing'] =
                `var(--${cpBase}-cjk-letter-spacing, ${ls})`;
        }
    }

    return decls;
}

function getCjkFontSizeVarDecl({ cpBase, tokens, typeVar, aliasedFontSize }) {
    const cjkFontSizeTokenName =
        aliasedFontSize && deriveCjkFontSizeTokenName(aliasedFontSize);
    const cjkFontSizeRef =
        cjkFontSizeTokenName && tokenRefIfExists(tokens, cjkFontSizeTokenName);

    if (cjkFontSizeTokenName && !cjkFontSizeRef) {
        warnMissing(typeVar, 'CJK derived font-size', cjkFontSizeTokenName);
    }

    return cjkFontSizeRef
        ? { [`--${cpBase}-font-size`]: cjkFontSizeRef }
        : null;
}

function getMarginMultiplierTokens(typeVar) {
    return {
        both: `${typeVar}-margin-multiplier`,
        top: `${typeVar}-margin-top-multiplier`,
        bottom: `${typeVar}-margin-bottom-multiplier`,
    };
}

function buildMarginRuleDecls({ cpBase, mSizeRef }) {
    return {
        [`--${cpBase}-margin-top`]: `calc(var(--${cpBase}-margin-top-multiplier, 0) * var(--${cpBase}-font-size, ${mSizeRef}))`,
        [`--${cpBase}-margin-bottom`]: `calc(var(--${cpBase}-margin-bottom-multiplier, 0) * var(--${cpBase}-font-size, ${mSizeRef}))`,
    };
}

function variantCpBase(prefix, typeVar) {
    const cfg = VARIANT_CONFIG[typeVar] || {
        defaultFont: 'sans',
        cpBaseSuffix: typeVar,
    };
    return { cfg, cpBase: `${prefix}-${cfg.cpBaseSuffix}` };
}

function variantClassName(prefix, typeVar) {
    return `${prefix}-${capitalize(typeVar)}`;
}

/**
 * Load typography source design data tokens
 */
async function loadTypographyJson() {
    const typographyTokens = '@adobe/spectrum-tokens/src/typography.json';

    try {
        return JSON.parse(
            await readFile(require.resolve(`${typographyTokens}`), 'utf8')
        );
    } catch (error) {
        throw new Error(`Failed to load token file: ${typographyTokens}`, {
            cause: error,
        });
    }
}

/**
 * Generate typography CSS as a string.
 */
export async function generateTypographyCssString(options = {}) {
    const {
        variants = DEFAULT_CATEGORIES,
        prefix = 'swc',
        fontTokens = FONT_TOKENS,
        cjkBaseOverridesByVariant = CJK_OVERRIDES,
        selectorAliases = SELECTOR_ALIASES,
    } = options;

    const tokens = await loadTypographyJson();

    let out = `/**
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

/* ⚠️ NOTE: This file is dynamically generated via swc-tokens */\n\n`;

    // Separate :lang() rule once for font-family only
    out += `${langSelectorList({
        'font-family': `token('${fontTokens.cjk}')`,
    })}\n`;

    for (const typeVar of variants) {
        const { cfg, cpBase } = variantCpBase(prefix, typeVar);

        const baseClassName = variantClassName(prefix, typeVar);
        const baseClass = `.${baseClassName}`;

        const sansWeightToken = `${typeVar}-sans-serif-font-weight`;
        const serifWeightToken = `${typeVar}-serif-font-weight`;
        const sansHeavyWeightToken = `${typeVar}-sans-serif-heavy-font-weight`;
        const colorToken = `${typeVar}-color`;

        const defaultFont =
            fontTokens[cfg.defaultFont] != null
                ? fontTokens[cfg.defaultFont]
                : fontTokens.sans;

        // --- derive M defaults (base class should default to M) ---
        const mSizeTokenName = `${typeVar}-size-m`;
        const mSizeToken = tokens[mSizeTokenName];

        if (!mSizeToken?.value) {
            warnMissing(typeVar, 'required M size', mSizeTokenName);
        }

        const aliasedMFontSize = mSizeToken?.value
            ? deriveAliasedTokenName(mSizeToken.value, mSizeTokenName)
            : null;

        const mLineHeightToken = aliasedMFontSize
            ? `line-height-${aliasedMFontSize}`
            : null;

        const sansWeightRef = getTokenRef(
            tokens,
            typeVar,
            'sans weight',
            sansWeightToken
        );
        const colorRef = getTokenRef(tokens, typeVar, 'color', colorToken);
        const mSizeRef = getTokenRef(tokens, typeVar, 'M size', mSizeTokenName);

        const mLineHeightRef = mLineHeightToken
            ? getTokenRef(
                  tokens,
                  typeVar,
                  'M derived line-height',
                  mLineHeightToken
              )
            : null;

        // --- margin multipliers (default vars on base; applied via --margins or prose parent) ---
        const marginTokens = getMarginMultiplierTokens(typeVar);
        const marginBothRef = tokenRefIfExists(tokens, marginTokens.both);
        const marginTopRef = tokenRefIfExists(tokens, marginTokens.top);
        const marginBottomRef = tokenRefIfExists(tokens, marginTokens.bottom);

        out += `/* =========================\n  ${typeVar}\n  ========================= */\n`;

        // Base selector (+ nested CJK overrides once)
        const cjkOverrides = cjkBaseOverridesByVariant[typeVar] || {};
        const nestedCjkDecls = buildCjkNestedDecls({
            cpBase,
            typeVar,
            cjkOverrides,
            tokens,
        });

        const cjkFontSizeVarDecl = getCjkFontSizeVarDecl({
            cpBase,
            tokens,
            typeVar,
            aliasedFontSize: aliasedMFontSize,
        });

        // One merged nested lang block
        const mergedBaseCjkDecls = pickValidDecls({
            ...nestedCjkDecls,
            ...(cjkFontSizeVarDecl ?? {}),
        });

        const baseNestedBlocks = Object.keys(mergedBaseCjkDecls).length
            ? [nestedLangBlock(mergedBaseCjkDecls)]
            : [];

        out += cssBlock(
            selectorWithAliases({
                selector: baseClass,
                prefix,
                typeVar,
                kind: 'base',
                selectorAliases,
            }),
            pickValidDecls({
                color: `var(--${cpBase}-font-color, ${colorRef})`,
                'font-family': `var(--${cpBase}-font-family, token('${defaultFont}'))`,
                'font-weight': sansWeightRef
                    ? `var(--${cpBase}-font-weight, ${sansWeightRef})`
                    : `var(--${cpBase}-font-weight, token('regular-font-weight'))`,
                'font-size': mSizeRef
                    ? `var(--${cpBase}-font-size, ${mSizeRef})`
                    : null,
                'line-height': mLineHeightRef
                    ? `var(--${cpBase}-line-height, ${mLineHeightRef})`
                    : null,
                'margin-block': `var(--${cpBase}-margin-top, 0) var(--${cpBase}-margin-bottom, 0)`,
            }),
            baseNestedBlocks
        );

        // Margins application selector:
        // - can be applied one-off via .swc-<typeVar>--margins
        // - or via prose parent: .swc-Typography--prose .swc-<typeVar>
        const marginsSelector = `.${baseClassName}--margins, ${proseSelector(
            prefix
        )} .${baseClassName}`;

        const marginAppliedVars = pickValidDecls({
            ...(marginBothRef
                ? {
                      [`--${cpBase}-margin-top-multiplier`]: marginBothRef,
                      [`--${cpBase}-margin-bottom-multiplier`]: marginBothRef,
                  }
                : {
                      [`--${cpBase}-margin-top-multiplier`]: marginTopRef,
                      [`--${cpBase}-margin-bottom-multiplier`]: marginBottomRef,
                  }),
        });

        if (Object.keys(marginAppliedVars).length) {
            out += cssBlock(
                selectorWithAliases({
                    selector: marginsSelector,
                    prefix,
                    typeVar,
                    kind: 'margins',
                    selectorAliases,
                }),
                {
                    ...marginAppliedVars,
                    ...buildMarginRuleDecls({ cpBase, mSizeRef }),
                }
            );
            out += '\n';
        }

        // Size modifiers
        for (const sizeKey of SIZE_KEYS) {
            const sizeTokenName = `${typeVar}-size-${sizeKey}`;
            const sizeToken = tokens[sizeTokenName];

            if (!sizeToken || sizeToken.deprecated) {
                continue;
            }

            const sizeRef = tokenRefIfExists(tokens, sizeTokenName);
            if (!sizeRef) {
                warnMissing(typeVar, `size ${sizeKey}`, sizeTokenName);
                continue;
            }

            const aliasedFontSize = deriveAliasedTokenName(
                sizeToken.value,
                sizeTokenName
            );

            const derivedLineHeightToken = `line-height-${aliasedFontSize}`;
            const derivedLineHeightRef = tokenRefIfExists(
                tokens,
                derivedLineHeightToken
            );
            if (!derivedLineHeightRef) {
                warnMissing(
                    typeVar,
                    `derived line-height for size ${sizeKey}`,
                    derivedLineHeightToken
                );
            }

            // Optional nested CJK override for font-size only (if valid)
            const cjkSizeFontSizeVarDecl = getCjkFontSizeVarDecl({
                cpBase,
                tokens,
                typeVar,
                aliasedFontSize,
            });

            const modifierDecls = pickValidDecls({
                [`--${cpBase}-font-size`]: sizeRef,
                [`--${cpBase}-line-height`]: derivedLineHeightRef,
            });

            const modifierNestedBlocks = [];
            if (cjkSizeFontSizeVarDecl) {
                modifierNestedBlocks.push(
                    nestedLangBlock(pickValidDecls(cjkSizeFontSizeVarDecl))
                );
            }

            if (
                Object.keys(modifierDecls).length ||
                modifierNestedBlocks.length
            ) {
                const sizeSelector = `.${baseClassName}--size${toSizeLabel(
                    sizeKey
                )}`;
                out += cssBlock(
                    selectorWithAliases({
                        selector: sizeSelector,
                        prefix,
                        typeVar,
                        sizeKey,
                        kind: 'size',
                        selectorAliases,
                    }),
                    modifierDecls,
                    modifierNestedBlocks
                );
                out += '\n';
            }
        }

        // Serif modifier (cascade order wins; no compounding)
        if (tokens[serifWeightToken]?.value) {
            out += cssBlock(`.${baseClassName}--serif`, {
                [`--${cpBase}-font-family`]: `token('${fontTokens.serif}')`,
                [`--${cpBase}-font-weight`]: `token('${serifWeightToken}')`,
            });
            out += '\n';
        }

        // Heavy modifier (optional)
        if (tokens[sansHeavyWeightToken]?.value) {
            out += cssBlock(`.${baseClassName}--heavy`, {
                [`--${cpBase}-font-weight`]: `token('${sansHeavyWeightToken}')`,
            });
            out += '\n';
        }

        out += '\n';
    }

    // Universal modifiers
    out += `/* =========================\n  Modifiers\n  ========================= */\n`;

    out += `.${prefix}-Typography--emphasized:not(:lang(zh), :lang(ja), :lang(ko)) {
  font-style: token('italic-font-style');
}\n`;

    return out;
}

/**
 * Generate typography CSS and write to disk.
 */
export async function generateTypographyCssFile(options = {}) {
    const { outFile = 'stylesheets/typography-base.css', cwd = process.cwd() } =
        options;

    const css = await generateTypographyCssString(options);

    const fullPath = path.isAbsolute(outFile)
        ? outFile
        : path.join(cwd, outFile);

    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.promises.writeFile(fullPath, css, 'utf8');

    return { outFile: fullPath, bytes: Buffer.byteLength(css, 'utf8') };
}
