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

import path from 'node:path';
import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';

// type-parser logs an ungated `console.warn` for every deep or recursive type
// it declines to expand — 55 lines per run here. Almost none of them are
// actionable: they are raised while expanding *structural* types, and
// `expandRemainingTypeAliases` below drops every structural expansion from the
// manifest anyway, so the bail changes nothing. They also cannot be filtered by
// path, because the reported location is where traversal started rather than
// where the type lives: 15 of them name DOM `CSSRule` constants but point at
// `components/accordion/Accordion.ts`.
//
// So rather than deciding which lines to discard, collect them all and report
// a count plus the one thing that is genuinely actionable — properties left
// with no usable `parsedType`. `CEM_VERBOSE=1` replays the raw lines.
const originalWarn = console.warn;
const skippedExpansions = [];
const isBail = (arg) =>
  typeof arg === 'string' &&
  arg.includes('[type-parser] - Skipped parsing type');

console.warn = (...args) => {
  const bail = args.find(isBail);
  if (bail) {
    skippedExpansions.push(bail);
    return;
  }
  originalWarn(...args);
};

/**
 * Restores `console.warn` and summarises what type-parser skipped.
 *
 * @param {string[]} unresolved `Class.property` entries left without a usable
 *   `parsedType`, which is the only outcome worth acting on.
 */
function reportSkippedExpansions(unresolved) {
  console.warn = originalWarn;

  if (skippedExpansions.length) {
    console.log(
      `[cem] type-parser skipped ${skippedExpansions.length} structural type expansions (dropped from the manifest by design; CEM_VERBOSE=1 to list).`
    );
    if (process.env.CEM_VERBOSE) {
      for (const message of skippedExpansions) console.warn(message);
    }
  }

  if (unresolved.length) {
    console.warn(
      `[cem] ${unresolved.length} properties have no expanded type, so Storybook renders a text input instead of a select:\n  ${unresolved.join('\n  ')}`
    );
  }
}

/**
 * CEM plugin that extracts `@status` and `@since` JSDoc tags from class
 * declarations and attaches them to the corresponding CEM declaration.
 *
 * Usage in component source:
 * ```ts
 * /**
 *  * @element swc-my-component
 *  * @status preview
 *  * @since 1.0.0
 *  *\/
 * export class MyComponent extends … { … }
 * ```
 *
 * Produces CEM entries with `"status": "preview"` and `"since": "1.0.0"`.
 */
function statusPlugin() {
  return {
    name: 'cem-plugin-component-status',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) return;

      const jsDocs = node.jsDoc;
      if (!jsDocs?.length) return;

      const jsDoc = jsDocs[jsDocs.length - 1];
      if (!jsDoc.tags) return;

      const className = node.name?.getText();
      if (!className) return;

      const declaration = moduleDoc?.declarations?.find(
        (d) => d.name === className
      );
      if (!declaration) return;

      for (const tag of jsDoc.tags) {
        const tagName = tag.tagName.getText();

        if (tagName === 'status' || tagName === 'since') {
          const value =
            typeof tag.comment === 'string'
              ? tag.comment.trim()
              : tag.comment
                  ?.map((c) => c.text)
                  .join('')
                  .trim();

          if (value) {
            declaration[tagName] = value;
          }
        }
      }
    },
  };
}

/**
 * TypeScript program + checker, captured in `overrideModuleCreation` so the
 * plugins below can resolve types that `@wc-toolkit/type-parser` cannot reach.
 */
let tsProgram;
let tsChecker;
let typeScript;

/**
 * CEM plugin that expands referenced type aliases that `type-parser` leaves
 * untouched.
 *
 * `type-parser` only consults the type checker for members a class *declares
 * itself*; for inherited members it falls back to resolving the type name
 * inside that same source file. Properties contributed by a mixin (a class
 * *expression*, which `type-parser` skips entirely) therefore keep their alias
 * name — e.g. `label-position` stays `LinearProgressLabelPosition` instead of
 * `'top' | 'side'`, so Storybook renders a text input instead of a select.
 *
 * This fills the gap by resolving any remaining alias name against a
 * program-wide map. Only unions of literals are written back, so object-ish and
 * recursive types keep their alias name rather than exploding into the
 * manifest.
 *
 * @returns {object} The CEM plugin.
 */
function expandRemainingTypeAliases() {
  const literalFlags = () =>
    typeScript.TypeFlags.StringLiteral |
    typeScript.TypeFlags.NumberLiteral |
    typeScript.TypeFlags.BooleanLiteral |
    typeScript.TypeFlags.Undefined |
    typeScript.TypeFlags.Null;

  const formatLiteral = (type) => {
    if (type.isStringLiteral()) return `'${type.value}'`;
    if (type.isNumberLiteral()) return `${type.value}`;
    return tsChecker.typeToString(type);
  };

  /** Alias name -> `{ text, isUnion }`; `text` is unset when not expandable. */
  const expansions = new Map();

  const collectAliases = () => {
    const visit = (node) => {
      if (typeScript.isTypeAliasDeclaration(node)) {
        const name = node.name.text;
        if (!expansions.has(name)) {
          const symbol = tsChecker.getSymbolAtLocation(node.name);
          const type = symbol && tsChecker.getDeclaredTypeOfSymbol(symbol);
          const parts = type?.isUnion() ? type.types : undefined;
          const isLiteralUnion =
            parts &&
            parts.length > 1 &&
            parts.every((part) => part.flags & literalFlags());

          expansions.set(name, {
            text: isLiteralUnion
              ? parts.map(formatLiteral).join(' | ')
              : undefined,
            // A union carrying at least one literal is enum-like, so failing to
            // expand it costs a select control. A union of object shapes
            // (colorjs’ `ColorTypes`) was never a select candidate.
            isEnumLike: Boolean(
              parts?.some((part) => part.flags & literalFlags())
            ),
          });
        }
      }
      typeScript.forEachChild(node, visit);
    };

    for (const sourceFile of tsProgram.getSourceFiles()) {
      if (!sourceFile.fileName.includes('node_modules')) visit(sourceFile);
    }
  };

  /** The single named (non-nullish) member of a type text, else `undefined`. */
  const namedPart = (typeText) => {
    const parts = typeText.split('|').map((part) => part.trim());
    const named = parts.filter(
      (part) => part !== 'undefined' && part !== 'null'
    );
    return named.length === 1 ? named[0] : undefined;
  };

  /** Expand `SomeAlias` / `SomeAlias | undefined`, else `undefined`. */
  const expand = (typeText) => {
    const name = namedPart(typeText);
    if (!name) return undefined;

    const expanded = expansions.get(name)?.text;
    if (!expanded) return undefined;

    const suffixes = typeText
      .split('|')
      .map((part) => part.trim())
      .filter((part) => part !== name);
    return [expanded, ...suffixes].join(' | ');
  };

  return {
    name: 'cem-plugin-expand-remaining-type-aliases',
    packageLinkPhase({ customElementsManifest }) {
      if (!tsProgram || !tsChecker) return;
      collectAliases();

      /** `Class.property` entries a select control cannot be built from. */
      const unresolved = [];

      for (const module of customElementsManifest.modules ?? []) {
        for (const declaration of module.declarations ?? []) {
          const entries = [
            ...(declaration.members ?? []),
            ...(declaration.attributes ?? []),
          ];

          for (const entry of entries) {
            // Structural expansions (`ColorTypes`, `ReturnType<typeof
            // setTimeout>`) carry compiler-internal symbol ids such as
            // `__@iterator@126` that shift with program composition, so the
            // published manifest is not reproducible. Storybook treats them as
            // `object` controls either way, so the alias name in `type` is
            // strictly more useful than the dump.
            if (entry.parsedType?.text.includes('{')) {
              delete entry.parsedType;
            }

            if (entry.parsedType || !entry.type?.text) continue;
            const expanded = expand(entry.type.text);
            if (expanded) {
              entry.parsedType = { text: expanded };
              continue;
            }

            // A union alias of ours that stayed unexpanded is the one case a
            // human needs to look at: the property should offer a select and
            // will not.
            const alias = expansions.get(namedPart(entry.type.text) ?? '');
            if (
              alias?.isEnumLike &&
              !alias.text &&
              entry.privacy !== 'private'
            ) {
              unresolved.push(`${declaration.name}.${entry.name}`);
            }
          }
        }
      }

      reportSkippedExpansions([...new Set(unresolved)]);
    },
  };
}

/**
 * CEM plugin that recovers the default value of accessor-backed properties.
 *
 * The analyzer reads `default` from a field initializer, so a property exposed
 * through a getter/setter pair (Tabs’ `density`, `keyboard-activation`) lands in
 * the manifest with no default at all. Storybook then seeds no initial arg and
 * the API table shows an empty default. This reads the initializer of the
 * private backing field the getter returns and records it.
 *
 * @returns {object} The CEM plugin.
 */
function accessorDefaults() {
  /** `ClassName.propName` -> default value. */
  const defaults = new Map();

  /** The `_field` a getter returns, if it is a simple `return this._field`. */
  const backingFieldName = (getter) => {
    const statements = getter.body?.statements ?? [];
    if (statements.length !== 1) return undefined;

    const [statement] = statements;
    if (!typeScript.isReturnStatement(statement)) return undefined;

    const expression = statement.expression;
    return expression &&
      typeScript.isPropertyAccessExpression(expression) &&
      expression.expression.kind === typeScript.SyntaxKind.ThisKeyword
      ? expression.name.text
      : undefined;
  };

  const literalValue = (initializer) => {
    if (typeScript.isStringLiteral(initializer)) return initializer.text;
    if (typeScript.isNumericLiteral(initializer)) return initializer.text;
    if (initializer.kind === typeScript.SyntaxKind.TrueKeyword) return 'true';
    if (initializer.kind === typeScript.SyntaxKind.FalseKeyword) return 'false';

    // `_density: TabDensity = DENSITY_DEFAULT` — ask the checker for the value.
    const type = tsChecker?.getTypeAtLocation(initializer);
    if (type?.isStringLiteral() || type?.isNumberLiteral()) {
      return `${type.value}`;
    }
    return undefined;
  };

  return {
    name: 'cem-plugin-accessor-defaults',
    analyzePhase({ ts, node }) {
      if (!ts.isClassDeclaration(node) || !node.name) return;

      const className = node.name.getText();
      const fields = new Map();
      for (const member of node.members) {
        if (ts.isPropertyDeclaration(member) && member.initializer) {
          fields.set(member.name.getText(), member.initializer);
        }
      }

      for (const member of node.members) {
        if (!ts.isGetAccessorDeclaration(member)) continue;

        const fieldName = backingFieldName(member);
        const initializer = fieldName && fields.get(fieldName);
        if (!initializer) continue;

        const value = literalValue(initializer);
        if (value !== undefined) {
          defaults.set(`${className}.${member.name.getText()}`, value);
        }
      }
    },
    packageLinkPhase({ customElementsManifest }) {
      for (const module of customElementsManifest.modules ?? []) {
        for (const declaration of module.declarations ?? []) {
          for (const member of declaration.members ?? []) {
            if (member.kind !== 'field' || member.default !== undefined) {
              continue;
            }

            const owner = member.inheritedFrom?.name ?? declaration.name;
            const value = defaults.get(`${owner}.${member.name}`);
            if (value === undefined) continue;

            member.default = value;
            const attribute = (declaration.attributes ?? []).find(
              (candidate) => candidate.fieldName === member.name
            );
            if (attribute && attribute.default === undefined) {
              attribute.default = value;
            }
          }
        }
      }
    },
  };
}

const SOURCE_GLOBS = [
  'components/**/*.ts',
  'patterns/**/*.ts',
  '../core/components/**/*.ts',
  '../core/controllers/**/*.ts',
  '../core/element/**/*.ts',
  '../core/mixins/**/*.ts',
  '../core/utils/**/*.ts',
];

export default {
  globs: SOURCE_GLOBS,
  // Give type-parser the TypeScript type checker so it can expand referenced
  // type aliases (e.g. `(typeof ARRAY)[number]` unions) into literal values.
  overrideModuleCreation({ ts, globs }) {
    // Pass the glob *patterns*, not CEM's resolved file list: `getTsProgram`
    // feeds this argument to `ts.parseJsonConfigFileContent` as `include`, and
    // several hundred absolute paths there compile into a huge matcher that
    // walks the tree for ~10s. `tsconfig.cem.json` covers the same sources, so
    // the program still contains every file (including core-only modules that
    // no swc file imports).
    const program = getTsProgram(ts, SOURCE_GLOBS, 'tsconfig.cem.json');
    tsProgram = program;
    tsChecker = program.getTypeChecker();
    typeScript = ts;
    // `globs` here are resolved file paths, some relative with a `../` prefix
    // (core-package files referenced from this swc-package config). Comparing
    // raw strings with `includes()` never matches those against the program's
    // absolute `fileName`s, silently dropping every core-package module (and
    // with it, most components' base-class attributes); resolve both sides.
    const resolvedGlobs = new Set(globs.map((glob) => path.resolve(glob)));
    return program
      .getSourceFiles()
      .filter((sf) => resolvedGlobs.has(path.resolve(sf.fileName)));
  },
  exclude: [
    '**/*.stories.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/stories/**',
    '**/test/**',
    '../core/**/stories/**',
    '../core/**/test/**',
  ],
  outdir: 'dist',
  litelement: true,
  dev: false,
  plugins: [
    statusPlugin(),
    typeParserPlugin(),
    expandRemainingTypeAliases(),
    accessorDefaults(),
  ],
};
