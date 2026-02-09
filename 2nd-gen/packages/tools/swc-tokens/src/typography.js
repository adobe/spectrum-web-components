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

// TODO: storybook page

import fs from 'fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'path';

const require = createRequire(import.meta.url);

/**
 * Default category order + size keys.
 *
 * Note: 'title' tokens currently not available
 */
const DEFAULT_CATEGORIES = ['heading', 'body', 'detail', 'code'];
const SIZE_KEYS = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];

// Token names for font families
const FONT_TOKENS = {
    sans: 'sans-serif-font',
    serif: 'serif-font',
    cjk: 'cjk-font',
};

/**
 * Per-category CJK overrides that should be inherited via the base class.
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

function warnMissing(cat, what, name) {
    // eslint-disable-next-line no-console
    console.warn(
        `[typography] ${cat}: missing ${what} token "${name}" (skipped)`
    );
}

function pickValidDecls(decls) {
    return Object.fromEntries(
        Object.entries(decls).filter(([, v]) => v != null && v !== '')
    );
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

function buildCjkNestedDecls({ base, cat, cjkOverrides, tokens }) {
    const decls = {};

    if (cjkOverrides.lineHeight) {
        if (!tokenExists(tokens, cjkOverrides.lineHeight)) {
            warnMissing(
                cat,
                'CJK line-height override',
                cjkOverrides.lineHeight
            );
        } else {
            decls['line-height'] =
                `var(--${base}-cjk-line-height, token('${cjkOverrides.lineHeight}'))`;
        }
    }

    if (cjkOverrides.letterSpacing) {
        if (!tokenExists(tokens, cjkOverrides.letterSpacing)) {
            warnMissing(
                cat,
                'CJK letter-spacing override',
                cjkOverrides.letterSpacing
            );
        } else {
            decls['letter-spacing'] =
                `var(--${base}-cjk-letter-spacing, token('${cjkOverrides.letterSpacing}'))`;
        }
    }

    return decls;
}

function getMarginMultiplierTokens(cat) {
    return {
        both: `${cat}-margin-multiplier`,
        top: `${cat}-margin-top-multiplier`,
        bottom: `${cat}-margin-bottom-multiplier`,
    };
}

function buildMarginRuleDecls({ base }) {
    return {
        'margin-block-start': `calc(var(--${base}-margin-top-multiplier, 0) * var(--${base}-font-size))`,
        'margin-block-end': `calc(var(--${base}-margin-bottom-multiplier, 0) * var(--${base}-font-size))`,
    };
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
        categories = DEFAULT_CATEGORIES,
        prefix = 'swc',
        fontTokens = FONT_TOKENS,
        cjkBaseOverridesByCategory = CJK_OVERRIDES,
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

    for (const cat of categories) {
        const base = `${prefix}-${cat}`;
        const baseClass = `.${base}`;

        const sansWeightToken = `${cat}-sans-serif-font-weight`;
        const serifWeightToken = `${cat}-serif-font-weight`;
        const sansHeavyWeightToken = `${cat}-sans-serif-heavy-font-weight`;
        const colorToken = `${cat}-color`;

        // --- derive M defaults (base class should default to M) ---
        const mSizeTokenName = `${cat}-size-m`;
        const mSizeToken = tokens[mSizeTokenName];

        if (!mSizeToken?.value) {
            warnMissing(cat, 'required M size', mSizeTokenName);
        }

        const aliasedMFontSize = mSizeToken?.value
            ? deriveAliasedTokenName(mSizeToken.value, mSizeTokenName)
            : null;

        const mLineHeightToken = aliasedMFontSize
            ? `line-height-${aliasedMFontSize}`
            : null;

        const sansWeightRef = tokenRefIfExists(tokens, sansWeightToken);
        if (!sansWeightRef) {
            warnMissing(cat, 'sans weight', sansWeightToken);
        }

        const colorRef = tokenRefIfExists(tokens, colorToken);
        if (!colorRef) {
            warnMissing(cat, 'color', colorToken);
        }

        const mSizeRef = tokenRefIfExists(tokens, mSizeTokenName);
        if (!mSizeRef && mSizeToken?.value) {
            warnMissing(cat, 'M size', mSizeTokenName);
        }

        const mLineHeightRef =
            mLineHeightToken && tokenRefIfExists(tokens, mLineHeightToken);
        if (mLineHeightToken && !mLineHeightRef) {
            warnMissing(cat, 'M derived line-height', mLineHeightToken);
        }

        // --- CJK font-size for base class (use M default stepped down) ---
        // Override ONLY font-size for CJK. Line-height remains from base CJK overrides.
        const cjkMFontSizeTokenName =
            aliasedMFontSize && deriveCjkFontSizeTokenName(aliasedMFontSize);
        const cjkMFontSizeRef =
            cjkMFontSizeTokenName &&
            tokenRefIfExists(tokens, cjkMFontSizeTokenName);

        if (cjkMFontSizeTokenName && !cjkMFontSizeRef) {
            warnMissing(
                cat,
                'CJK derived font-size for base (M)',
                cjkMFontSizeTokenName
            );
        }

        // --- margin multipliers (default vars on base; applied via --margins or prose parent) ---
        const marginTokens = getMarginMultiplierTokens(cat);
        const marginBothRef = tokenRefIfExists(tokens, marginTokens.both);
        const marginTopRef = tokenRefIfExists(tokens, marginTokens.top);
        const marginBottomRef = tokenRefIfExists(tokens, marginTokens.bottom);

        out += `/* =========================\n  ${cat}\n  ========================= */\n`;

        // Base selector (+ nested CJK overrides once)
        const cjkOverrides = cjkBaseOverridesByCategory[cat] || {};
        const nestedCjkDecls = buildCjkNestedDecls({
            base,
            cat,
            cjkOverrides,
            tokens,
        });

        // Collapse the base nested :lang() declarations into ONE block.
        const mergedBaseCjkDecls = pickValidDecls({
            ...nestedCjkDecls,
            ...(cjkMFontSizeRef
                ? { [`--${base}-font-size`]: cjkMFontSizeRef }
                : {}),
        });

        const baseNestedBlocks = Object.keys(mergedBaseCjkDecls).length
            ? [nestedLangBlock(mergedBaseCjkDecls)]
            : [];

        // Always set default margin vars to 0 on base class
        // These are not applied to actual margin until the --margins modifier or prose parent selector.
        const baseMarginDefaults = {
            [`--${base}-margin-top-multiplier`]: `var(--${base}-margin-top-multiplier, 0)`,
            [`--${base}-margin-bottom-multiplier`]: `var(--${base}-margin-bottom-multiplier, 0)`,
        };

        out += cssBlock(
            baseClass,
            pickValidDecls({
                ...baseMarginDefaults,
                color: `var(--${base}-color, ${colorRef})`,
                'font-family': `var(--${base}-font-family, token('${fontTokens.sans}'))`,
                'font-weight': sansWeightRef
                    ? `var(--${base}-font-weight, ${sansWeightRef})`
                    : `var(--${base}-font-weight, token('regular-font-weight'))`,
                'font-size': mSizeRef
                    ? `var(--${base}-font-size, ${mSizeRef})`
                    : null,
                'line-height': mLineHeightRef
                    ? `var(--${base}-line-height, ${mLineHeightRef})`
                    : null,
            }),
            baseNestedBlocks
        );

        // Margins application selector:
        // - can be applied one-off via .swc-<cat>--margins
        // - or via prose parent: .swc-typography--prose .swc-<cat>
        const marginsSelector = `.${prefix}-${cat}--margins, .swc-typography--prose .${base}`;

        // Determine which tokens to use when margins are applied:
        // - If a single "margin-multiplier" exists, it sets both top/bottom.
        // - Otherwise, use top/bottom tokens if present.
        // - Only emit vars for tokens that exist.
        const marginAppliedVars = pickValidDecls({
            ...(marginBothRef
                ? {
                      [`--${base}-margin-top-multiplier`]: marginBothRef,
                      [`--${base}-margin-bottom-multiplier`]: marginBothRef,
                  }
                : {
                      [`--${base}-margin-top-multiplier`]: marginTopRef,
                      [`--${base}-margin-bottom-multiplier`]: marginBottomRef,
                  }),
        });

        // Only emit the margins rule if we have at least one multiplier token.
        if (Object.keys(marginAppliedVars).length) {
            out += cssBlock(marginsSelector, {
                ...marginAppliedVars,
                ...buildMarginRuleDecls({ base }),
            });
            out += '\n';
        } else if (
            tokenExists(tokens, marginTokens.both) ||
            tokenExists(tokens, marginTokens.top) ||
            tokenExists(tokens, marginTokens.bottom)
        ) {
            // (paranoia) tokenExists checks should already cover this path,
            // but keep the warning logic consistent with other sections.
            warnMissing(
                cat,
                'margin multipliers',
                `${cat}-margin-*-multiplier`
            );
        }

        // Size modifiers
        for (const sizeKey of SIZE_KEYS) {
            const sizeTokenName = `${cat}-size-${sizeKey}`;
            const sizeToken = tokens[sizeTokenName];

            if (!sizeToken?.value) {
                continue;
            }

            const sizeRef = tokenRefIfExists(tokens, sizeTokenName);
            if (!sizeRef) {
                warnMissing(cat, `size ${sizeKey}`, sizeTokenName);
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
                    cat,
                    `derived line-height for size ${sizeKey}`,
                    derivedLineHeightToken
                );
            }

            // --- CJK font-size: one level smaller than non-CJK ---
            // We override ONLY font-size for CJK. Line-height remains from base CJK overrides.
            const cjkFontSizeTokenName =
                deriveCjkFontSizeTokenName(aliasedFontSize);
            const cjkFontSizeRef =
                cjkFontSizeTokenName &&
                tokenRefIfExists(tokens, cjkFontSizeTokenName);

            if (cjkFontSizeTokenName && !cjkFontSizeRef) {
                warnMissing(
                    cat,
                    `CJK derived font-size for size ${sizeKey}`,
                    cjkFontSizeTokenName
                );
            }

            // Emit modifier with only the valid vars
            const modifierDecls = pickValidDecls({
                [`--${base}-font-size`]: sizeRef,
                [`--${base}-line-height`]: derivedLineHeightRef,
            });

            // Optional nested CJK override for font-size only (if valid)
            const modifierNestedBlocks = [];
            if (cjkFontSizeRef) {
                modifierNestedBlocks.push(
                    nestedLangBlock(
                        pickValidDecls({
                            [`--${base}-font-size`]: cjkFontSizeRef,
                        })
                    )
                );
            }

            if (
                Object.keys(modifierDecls).length ||
                modifierNestedBlocks.length
            ) {
                out += cssBlock(
                    `.${prefix}-${cat}--${toSizeLabel(sizeKey)}`,
                    modifierDecls,
                    modifierNestedBlocks
                );
                out += '\n';
            }
        }

        // Serif modifier (cascade order wins; no compounding)
        if (tokenExists(tokens, serifWeightToken)) {
            out += cssBlock(`.${prefix}-${cat}--serif`, {
                [`--${base}-font-family`]: `token('${fontTokens.serif}')`,
                [`--${base}-font-weight`]: `token('${serifWeightToken}')`,
            });
            out += '\n';
        } else if (tokens[serifWeightToken]) {
            warnMissing(cat, 'serif weight', serifWeightToken);
        }

        // Heavy modifier (optional)
        if (tokenExists(tokens, sansHeavyWeightToken)) {
            out += cssBlock(`.${prefix}-${cat}--heavy`, {
                [`--${base}-font-weight`]: `token('${sansHeavyWeightToken}')`,
            });
            out += '\n';
        } else if (tokens[sansHeavyWeightToken]) {
            warnMissing(cat, 'heavy weight', sansHeavyWeightToken);
        }

        out += '\n';
    }

    // Universal modifiers
    // TBD IF NEEDED
    out += `/* =========================\n  Modifiers\n  ========================= */\n`;

    out += `.${prefix}-typography--emphasized:not(:lang(zh), :lang(ja), :lang(ko)) {
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
