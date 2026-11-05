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

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';

// type-parser warns for each deep or recursive type that it skips. The skips
// occur in structural types, which this config drops from the manifest, so
// collect them and print one summary line. `CEM_VERBOSE=1` prints them all.
const originalWarn = console.warn;
const skippedExpansions = [];
const isBail = (arg) =>
  typeof arg === 'string' &&
  arg.includes('[type-parser] - Skipped parsing type');

/** Starts collecting type-parser bails for one analysis run. */
function captureSkippedExpansions() {
  skippedExpansions.length = 0;
  console.warn = (...args) => {
    const bail = args.find(isBail);
    if (bail) {
      skippedExpansions.push(bail);
      return;
    }
    originalWarn(...args);
  };
}

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
 * Deletes every structural `parsedType` (an object-shaped dump such as
 * `ColorTypes`) from the manifest, wherever type-parser wrote it: members,
 * attributes, events, and parameters. The dumps contain compiler symbol ids
 * such as `__@iterator@87`, which change when unrelated files join the
 * program. Storybook shows them as `object` controls anyway.
 *
 * @param {unknown} node A manifest node.
 */
function dropStructuralTypes(node) {
  if (!node || typeof node !== 'object') return;
  if (node.parsedType?.text?.includes('{')) delete node.parsedType;
  Object.values(node).forEach(dropStructuralTypes);
}

/**
 * CEM plugin that expands the type aliases that `type-parser` cannot reach,
 * such as the members that a mixin provides (`label-position` on meter). Only
 * unions of literals are expanded; other aliases keep their name.
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
        const symbol = tsChecker.getSymbolAtLocation(node.name);
        const type = symbol && tsChecker.getDeclaredTypeOfSymbol(symbol);
        const parts = type?.isUnion() ? type.types : undefined;
        const isLiteralUnion =
          parts &&
          parts.length > 1 &&
          parts.every((part) => part.flags & literalFlags());

        const entry = {
          text: isLiteralUnion
            ? parts.map(formatLiteral).join(' | ')
            : undefined,
          // A union carrying at least one literal is enum-like, so failing to
          // expand it costs a select control. A union of object shapes
          // (colorjs’ `ColorTypes`) was never a select candidate.
          isEnumLike: Boolean(
            parts?.some((part) => part.flags & literalFlags())
          ),
        };

        // Aliases are matched by bare name, so two declarations of the same
        // name with different values are ambiguous. Leave them unexpanded so
        // the summary flags them instead of documenting the wrong values.
        const existing = expansions.get(name);
        expansions.set(
          name,
          existing && existing.text !== entry.text
            ? {
                text: undefined,
                isEnumLike: existing.isEnumLike || entry.isEnumLike,
              }
            : entry
        );
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
      dropStructuralTypes(customElementsManifest);

      if (!tsProgram || !tsChecker) {
        reportSkippedExpansions([]);
        return;
      }
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
            if (entry.parsedType || !entry.type?.text) continue;
            const expanded = expand(entry.type.text);
            if (expanded) {
              entry.parsedType = { text: expanded };
              continue;
            }

            // An enum-like alias that stayed unexpanded gets a text input
            // instead of a select, so report it.
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
 * CEM plugin that records the default value of accessor-backed properties
 * (Tabs’ `density`). The analyzer reads defaults only from field initializers,
 * so this reads the initializer of the backing field that the getter returns.
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
          }
        }
      }
    },
  };
}

/**
 * CEM plugin that copies each field's `parsedType` and default to the
 * attribute it reflects, when both declare the same type. type-parser resolves
 * attributes by alias name only, so without this a `SizedMixin` `size`
 * attribute can list the sizes of a different component. Runs last.
 *
 * @returns {object} The CEM plugin.
 */
function syncAttributesWithFields() {
  return {
    name: 'cem-plugin-sync-attributes-with-fields',
    packageLinkPhase({ customElementsManifest }) {
      for (const module of customElementsManifest.modules ?? []) {
        for (const declaration of module.declarations ?? []) {
          for (const attribute of declaration.attributes ?? []) {
            const field = (declaration.members ?? []).find(
              (member) =>
                member.kind === 'field' && member.name === attribute.fieldName
            );
            if (!field || field.type?.text !== attribute.type?.text) continue;

            if (field.parsedType) {
              attribute.parsedType = { ...field.parsedType };
            } else {
              delete attribute.parsedType;
            }
            if (
              attribute.default === undefined &&
              field.default !== undefined
            ) {
              attribute.default = field.default;
            }
          }
        }
      }
    },
  };
}

// The TypeScript program is built from `tsconfig.cem.json`, so its `include`
// list is the single source of truth for which files CEM analyzes.
const { include: SOURCE_GLOBS } = JSON.parse(
  readFileSync(new URL('./tsconfig.cem.json', import.meta.url), 'utf8')
);

export default {
  globs: SOURCE_GLOBS,
  // Give type-parser the TypeScript type checker so it can expand referenced
  // type aliases (e.g. `(typeof ARRAY)[number]` unions) into literal values.
  overrideModuleCreation({ ts, globs }) {
    captureSkippedExpansions();
    // Pass the glob patterns, not CEM's resolved file list: hundreds of
    // absolute paths in `include` make TypeScript walk the tree for ~10s.
    const program = getTsProgram(ts, SOURCE_GLOBS, 'tsconfig.cem.json');
    tsProgram = program;
    tsChecker = program.getTypeChecker();
    typeScript = ts;
    // Core files arrive as `../core/...` paths; resolve both sides so they
    // match the program's absolute file names.
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
    syncAttributesWithFields(),
  ],
};
