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

const require = createRequire(import.meta.url);

/**
 * Default variant order + size keys.
 */
const DEFAULT_VARIANTS = ['heading', 'title', 'body', 'detail', 'code'];
const SIZE_KEYS = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'];

// Token names for font families
const FONT_TOKENS = {
  sans: 'sans-serif-font',
  serif: 'serif-font',
  cjk: 'cjk-font',
  code: 'code-font',
};

const VARIANT_CONFIG = {
  heading: {
    defaultFont: 'sans',
    cpBaseSuffix: 'heading',
    supportsCjkSizeAdjustment: true,
  },
  title: {
    defaultFont: 'sans',
    cpBaseSuffix: 'title',
    supportsCjkSizeAdjustment: true,
  },
  body: {
    defaultFont: 'sans',
    cpBaseSuffix: 'body',
    supportsCjkSizeAdjustment: true,
  },
  detail: {
    defaultFont: 'sans',
    cpBaseSuffix: 'detail',
    supportsCjkSizeAdjustment: true,
  },
  code: {
    defaultFont: 'code',
    // Prevent clash with code design tokens by using "monospace" as cp base
    cpBaseSuffix: 'monospace',
    supportsCjkSizeAdjustment: false,
  },
};

/**
 * When a token is missing from the loaded sources, prefer these token names directly in output.
 * Values should be token names (NOT literal CSS values).
 */
const TOKEN_PATCHES = {
  fallbacks: {
    title: {
      color: 'title-color',
    },
  },
  // always force, even if title-color exists
  overrides: {
    // title: { color: 'gray-900' },
  },
};

// Centralize CJK language selectors
const CJK_LANGS = ['zh', 'ja', 'ko'];
const CJK_NESTED_SELECTOR = CJK_LANGS.map((l) => `&:lang(${l})`).join(', ');
const CJK_SELECTOR_LIST = CJK_LANGS.map((l) => `:lang(${l})`).join(',\n');
const CJK_NOT_LIST = CJK_LANGS.map((l) => `:lang(${l})`).join(', ');

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
    base: [':is(h1)'],
    sizes: {
      m: ['h1'],
    },
    margins: [':is(h1)'],
  },
  title: {
    base: [':is(h2, h3, h4)'],
    sizes: {
      xl: ['h2'],
      l: ['h3'],
      m: ['h4'],
    },
    margins: [':is(h2, h3, h4)'],
  },
};

function capitalize(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPatchedTokenName(typeVar, suffix, mode) {
  const patch = TOKEN_PATCHES?.[mode]?.[typeVar]?.[suffix];
  return typeof patch === 'string' && patch !== '' ? patch : null;
}

function tokenRefFromName(name) {
  return name ? `token("${name}")` : null;
}

function tokenExists(tokens, name) {
  return Boolean(tokens?.[name]);
}

function tokenRefIfExists(tokens, name) {
  return tokenExists(tokens, name) ? `token("${name}")` : null;
}

function warnMissing(typeVar, what, name, debug) {
  const log = typeof debug === 'function' ? debug : () => {};
  log(`[typography] ${typeVar}: missing ${what} token "${name}" (skipped)`);
}

/**
 * Get a token("...") reference by name and warn if missing.
 * Use for non-variant tokens (e.g. derived line-height-*, cjk-line-height-*, etc.)
 */
function tokenRefOrWarn(tokens, typeVar, what, tokenName, debug) {
  const ref = tokenRefIfExists(tokens, tokenName);
  if (!ref) {
    warnMissing(typeVar, what, tokenName, debug);
  }
  return ref;
}

/**
 * Get a token reference for `${typeVar}-${suffix}`, optionally using TOKEN_PATCHES.
 */
function getVariantTokenRef(tokens, typeVar, suffix, debug) {
  const primaryName = `${typeVar}-${suffix}`;

  // 1) overrides always win
  const overrideName = getPatchedTokenName(typeVar, suffix, 'overrides');
  if (overrideName) {
    return tokenRefFromName(overrideName);
  }

  // 2) use real token if present
  if (tokenExists(tokens, primaryName)) {
    return tokenRefFromName(primaryName);
  }

  // 3) fall back to patched token name (even if not present in this source)
  const fallbackName = getPatchedTokenName(typeVar, suffix, 'fallbacks');
  if (fallbackName) {
    return tokenRefFromName(fallbackName);
  }

  // 4) nothing available
  warnMissing(typeVar, suffix, primaryName, debug);
  return null;
}

function splitSelectors(selector) {
  // normalize "a, b, c" into ["a","b","c"]
  return selector
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const ALIAS_KIND_KEYS = {
  base: 'base',
  margins: 'margins',
  size: 'sizes',
};

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
  const key = ALIAS_KIND_KEYS[kind];

  const add = (s) => out.add(`${prose} ${s}`);

  if (key === 'sizes' && sizeKey && cfg.sizes?.[sizeKey]) {
    cfg.sizes[sizeKey].forEach(add);
  } else if (Array.isArray(cfg[key])) {
    cfg[key].forEach(add);
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
  const nested = nestedBlocks.length ? `\n\n${nestedBlocks.join('\n\n')}` : '';
  return `${selector} {\n${body}${nested}\n}\n`;
}

function nestedLangBlock(decls) {
  return `  ${CJK_NESTED_SELECTOR} {\n${cssDecls(decls, '    ')}\n  }`;
}

function langSelectorList(decls) {
  return `${CJK_SELECTOR_LIST} {\n${cssDecls(decls)}\n}\n`;
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

function buildCjkNestedDecls({ cpBase, typeVar, cjkOverrides, tokens, debug }) {
  const decls = {};

  if (cjkOverrides.lineHeight) {
    const lh = tokenRefOrWarn(
      tokens,
      typeVar,
      'CJK line-height override',
      cjkOverrides.lineHeight,
      debug
    );
    if (lh) {
      decls[`--${cpBase}-line-height`] =
        `var(--${cpBase}-cjk-line-height, ${lh})`;
    }
  }

  if (cjkOverrides.letterSpacing) {
    const ls = tokenRefOrWarn(
      tokens,
      typeVar,
      'CJK letter-spacing override',
      cjkOverrides.letterSpacing,
      debug
    );
    if (ls) {
      decls[`--${cpBase}-letter-spacing`] =
        `var(--${cpBase}-cjk-letter-spacing, ${ls})`;
    }
  }

  return decls;
}

function getCjkFontSizeVarDecl({
  cpBase,
  tokens,
  typeVar,
  aliasedFontSize,
  debug,
}) {
  const cjkFontSizeTokenName =
    aliasedFontSize && deriveCjkFontSizeTokenName(aliasedFontSize);

  if (!cjkFontSizeTokenName) {
    return null;
  }

  const cjkFontSizeRef = tokenRefIfExists(tokens, cjkFontSizeTokenName);

  if (!cjkFontSizeRef) {
    warnMissing(typeVar, 'CJK derived font-size', cjkFontSizeTokenName, debug);
    return null;
  }

  return { [`--${cpBase}-cjk-font-size`]: cjkFontSizeRef };
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
    supportsCjkSizeAdjustment: true,
  };
  return { cfg, cpBase: `${prefix}-${cfg.cpBaseSuffix}` };
}

function variantClassName(prefix, typeVar) {
  return `${prefix}-${capitalize(typeVar)}`;
}

function makeVariantCtx({ prefix, typeVar }) {
  const { cfg, cpBase } = variantCpBase(prefix, typeVar);
  const className = variantClassName(prefix, typeVar);
  return {
    typeVar,
    cfg,
    cpBase,
    className,
    baseSelector: `.${className}`,
    sizeTokenName: (k) => `${typeVar}-size-${k}`,
    tokenName: (suffix) => `${typeVar}-${suffix}`,
  };
}

async function loadTokensJson(tokenModulePath) {
  try {
    return JSON.parse(await readFile(require.resolve(tokenModulePath), 'utf8'));
  } catch (error) {
    throw new Error(`Failed to load token file: ${tokenModulePath}`, {
      cause: error,
    });
  }
}

/**
 * Load typography source design data tokens.
 * Supports multiple sources; later sources win on key collisions.
 */
async function loadTypographyJson() {
  const tokenSources = [
    '@adobe/spectrum-tokens/src/typography.json',
    '@adobe/spectrum-tokens/src/layout-component.json',
  ];

  const sources = Array.isArray(tokenSources) ? tokenSources : [tokenSources];

  const tokenObjects = await Promise.all(sources.map(loadTokensJson));

  // Merge into one flat token map; last-in wins for collisions.
  return Object.assign({}, ...tokenObjects);
}

/**
 * Generate typography CSS as a string.
 */
export async function generateTypographyCssString(options = {}) {
  const {
    variants = DEFAULT_VARIANTS,
    prefix = 'swc',
    fontTokens = FONT_TOKENS,
    cjkBaseOverridesByVariant = CJK_OVERRIDES,
    selectorAliases = SELECTOR_ALIASES,
    debug,
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

/* ⚠️ NOTE: This file is dynamically generated via swc-tokens */

/* stylelint-ignore */\n\n`;

  // Separate :lang() rule once for font-family only
  out += `${langSelectorList({
    'font-family': `token("${fontTokens.cjk}")`,
  })}\n`;

  for (const typeVar of variants) {
    const ctx = makeVariantCtx({ prefix, typeVar });
    const { cfg, cpBase, className, baseSelector } = ctx;

    const serifWeightTokenName = ctx.tokenName('serif-font-weight');
    const sansHeavyWeightTokenName = ctx.tokenName(
      'sans-serif-heavy-font-weight'
    );

    const defaultFont =
      fontTokens[cfg.defaultFont] != null
        ? fontTokens[cfg.defaultFont]
        : fontTokens.sans;

    // --- derive M defaults (base class should default to M) ---
    const mSizeTokenName = ctx.sizeTokenName('m');
    const mSizeToken = tokens[mSizeTokenName];

    if (!mSizeToken?.value) {
      warnMissing(typeVar, 'required M size', mSizeTokenName, debug);
    }

    const aliasedMFontSize = mSizeToken?.value
      ? deriveAliasedTokenName(mSizeToken.value, mSizeTokenName)
      : null;

    const mLineHeightTokenName = aliasedMFontSize
      ? `line-height-${aliasedMFontSize}`
      : null;

    // use patch-aware lookup for variant tokens
    const sansWeightRef = getVariantTokenRef(
      tokens,
      typeVar,
      'sans-serif-font-weight',
      debug
    );
    const colorRef = getVariantTokenRef(tokens, typeVar, 'color', debug);

    // non-variant tokens / derived tokens use tokenRefOrWarn
    const mSizeRef = tokenRefOrWarn(
      tokens,
      typeVar,
      'M size',
      mSizeTokenName,
      debug
    );
    const mLineHeightRef = mLineHeightTokenName
      ? tokenRefOrWarn(
          tokens,
          typeVar,
          'M derived line-height',
          mLineHeightTokenName,
          debug
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
      debug,
    });

    const cjkFontSizeVarDecl = cfg.supportsCjkSizeAdjustment
      ? getCjkFontSizeVarDecl({
          cpBase,
          tokens,
          typeVar,
          aliasedFontSize: aliasedMFontSize,
          debug,
        })
      : null;

    // One merged nested lang block
    const baseCjkFontSizeDecl = cjkFontSizeVarDecl
      ? {
          [`--${cpBase}-font-size`]: `var(--${cpBase}-cjk-font-size, ${cjkFontSizeVarDecl[`--${cpBase}-cjk-font-size`]})`,
        }
      : {};

    const mergedBaseCjkDecls = pickValidDecls({
      ...nestedCjkDecls,
      ...baseCjkFontSizeDecl,
    });

    const baseNestedBlocks = Object.keys(mergedBaseCjkDecls).length
      ? [nestedLangBlock(mergedBaseCjkDecls)]
      : [];

    out += cssBlock(
      selectorWithAliases({
        selector: baseSelector,
        prefix,
        typeVar,
        kind: 'base',
        selectorAliases,
      }),
      pickValidDecls({
        color: `var(--${cpBase}-font-color, ${colorRef})`,
        'font-family': `var(--${cpBase}-font-family, token("${defaultFont}"))`,
        'font-weight': sansWeightRef
          ? `var(--${cpBase}-font-weight, ${sansWeightRef})`
          : `var(--${cpBase}-font-weight, token("regular-font-weight"))`,
        'font-size': mSizeRef
          ? `var(--${cpBase}-font-size, ${mSizeRef})`
          : null,
        'line-height': mLineHeightRef
          ? `var(--${cpBase}-line-height, ${mLineHeightRef})`
          : null,
        'letter-spacing': `var(--${cpBase}-letter-spacing, normal)`,
        'margin-block': `var(--${cpBase}-margin-top, 0) var(--${cpBase}-margin-bottom, 0)`,
      }),
      baseNestedBlocks
    );

    // Margins application selector:
    // - can be applied one-off via .swc-<typeVar>--margins
    // - or via prose parent: .swc-Typography--prose .swc-<typeVar>
    const marginsSelector = `.${className}--margins, ${proseSelector(
      prefix
    )} .${className}`;

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
      const sizeTokenName = ctx.sizeTokenName(sizeKey);
      const sizeToken = tokens[sizeTokenName];

      if (!sizeToken || sizeToken.deprecated) {
        continue;
      }

      const sizeRef = tokenRefIfExists(tokens, sizeTokenName);
      if (!sizeRef) {
        warnMissing(typeVar, `size ${sizeKey}`, sizeTokenName, debug);
        continue;
      }

      const aliasedFontSize = deriveAliasedTokenName(
        sizeToken.value,
        sizeTokenName
      );

      const derivedLineHeightTokenName = `line-height-${aliasedFontSize}`;
      const derivedLineHeightRef = tokenRefIfExists(
        tokens,
        derivedLineHeightTokenName
      );
      if (!derivedLineHeightRef) {
        warnMissing(
          typeVar,
          `derived line-height for size ${sizeKey}`,
          derivedLineHeightTokenName,
          debug
        );
      }

      // Optional nested CJK override for font-size only (if valid)
      const cjkSizeFontSizeVarDecl = cfg.supportsCjkSizeAdjustment
        ? getCjkFontSizeVarDecl({
            cpBase,
            tokens,
            typeVar,
            aliasedFontSize,
            debug,
          })
        : null;

      const modifierDecls = pickValidDecls({
        [`--${cpBase}-font-size`]: sizeRef,
        [`--${cpBase}-line-height`]: derivedLineHeightRef,
      });

      const modifierNestedBlocks = [];
      if (cjkSizeFontSizeVarDecl) {
        // getCjkFontSizeVarDecl already returns a valid decl object
        modifierNestedBlocks.push(nestedLangBlock(cjkSizeFontSizeVarDecl));
      }

      if (Object.keys(modifierDecls).length || modifierNestedBlocks.length) {
        const sizeSelector = `.${className}--size${toSizeLabel(sizeKey)}`;
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
    if (tokens[serifWeightTokenName]?.value) {
      out += cssBlock(`.${className}--serif`, {
        [`--${cpBase}-font-family`]: `token("${fontTokens.serif}")`,
        [`--${cpBase}-font-weight`]: `token("${serifWeightTokenName}")`,
      });
      out += '\n';
    }

    // Heavy modifier (optional)
    if (tokens[sansHeavyWeightTokenName]?.value) {
      out += cssBlock(`.${className}--heavy`, {
        [`--${cpBase}-font-weight`]: `token("${sansHeavyWeightTokenName}")`,
      });
      out += '\n';
    }

    out += '\n';
  }

  // Universal modifiers
  out += `/* =========================\n  Modifiers\n  ========================= */\n`;

  out += `.${prefix}-Typography--emphasized:not(${CJK_NOT_LIST}) {
  font-style: token("italic-font-style");
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

  const fullPath = path.isAbsolute(outFile) ? outFile : path.join(cwd, outFile);

  await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.promises.writeFile(fullPath, css, 'utf8');

  return { outFile: fullPath, bytes: Buffer.byteLength(css, 'utf8') };
}
