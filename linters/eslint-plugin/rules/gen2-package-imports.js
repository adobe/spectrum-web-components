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

// Core entry points when no `coreExports` option is given: folder barrels and
// one level of `components/`, `controllers/`, or `directives/` barrels.
const CORE_ENTRY_SHAPE =
  /^((element|mixins|utils|controllers|directives)|(components|controllers|directives)\/[a-z0-9-]+)\.js$/;

/**
 * Returns the problem with a gen2 package specifier, or `null` when it uses a
 * published entry point. Each specifier gets at most one problem.
 *
 * @param {string} specifier - The module specifier.
 * @param {Set<string> | null} coreExports - Published core subpaths, such as `mixins.js`.
 * @returns {{ messageId: string, data?: Record<string, string> } | null} The problem, if any.
 */
export function findGen2ImportProblem(specifier, coreExports) {
  const match = /^@adobe\/spectrum-wc(-core|-icons)?(?:\/(.*))?$/.exec(
    specifier
  );
  if (!match) {
    return null;
  }
  const [, flavor, subpath] = match;

  if (flavor === '-core') {
    if (subpath === undefined) {
      return {
        messageId: 'noRoot',
        data: {
          name: '@adobe/spectrum-wc-core',
          example: '@adobe/spectrum-wc-core/mixins.js',
        },
      };
    }
    const published = coreExports
      ? coreExports.has(subpath)
      : CORE_ENTRY_SHAPE.test(subpath);
    return published ? null : { messageId: 'coreEntry' };
  }

  if (flavor === '-icons') {
    if (subpath === undefined || subpath === 'customElements') {
      return null;
    }
    if (subpath === 'index.js') {
      return { messageId: 'iconsIndex' };
    }
    return /^[^/]+\.js$/.test(subpath) ? null : { messageId: 'iconsFlat' };
  }

  if (subpath === undefined) {
    return {
      messageId: 'noRoot',
      data: {
        name: '@adobe/spectrum-wc',
        example: '@adobe/spectrum-wc/components/badge.js',
      },
    };
  }
  if (subpath === 'customElements') {
    return null;
  }
  if (!/\.(js|css)$/.test(subpath)) {
    return { messageId: 'extension' };
  }
  if (/\.css$/.test(subpath)) {
    return subpath.includes('/') ? { messageId: 'nestedCss' } : null;
  }
  if (/(^|\/)index\.js$/.test(subpath)) {
    return { messageId: 'index' };
  }
  if (/^patterns\/[^/]+\.js$/.test(subpath)) {
    return { messageId: 'patternEntry' };
  }
  if (/^(components|patterns)\//.test(subpath)) {
    return null;
  }
  return { messageId: 'componentsPrefix' };
}

/**
 * Reads a module specifier from a string literal or a template literal
 * without expressions.
 *
 * @param {import('estree').Node | null | undefined} node - The source node.
 * @returns {string | null} The specifier, or `null` when it is not static.
 */
function readSpecifier(node) {
  if (node?.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  }
  if (node?.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.cooked;
  }
  return null;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require `@adobe/spectrum-wc*` imports to use a published `.js` entry point, including dynamic imports and `import()` types.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          coreExports: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noRoot:
        "'{{name}}' has no root export. Import an entry point, for example '{{example}}'.",
      extension:
        "Gen2 package imports end in '.js' (for example '@adobe/spectrum-wc/components/badge.js').",
      index:
        "Import the sibling barrel instead of 'index.js' (for example '@adobe/spectrum-wc/components/badge.js').",
      componentsPrefix:
        "Import components through 'components/' (for example '@adobe/spectrum-wc/components/badge.js').",
      patternEntry:
        "Import a pattern by its group and name (for example '@adobe/spectrum-wc/patterns/ai-toolkit/response-status.js').",
      nestedCss:
        "Stylesheets are published at the package top level (for example '@adobe/spectrum-wc/swc.css').",
      iconsFlat:
        "Icons are published as flat '.js' entry points (for example '@adobe/spectrum-wc-icons/swc-icon-star.js').",
      iconsIndex:
        "Import the package root '@adobe/spectrum-wc-icons' instead of 'index.js'.",
      coreEntry:
        "Import core from a published entry point: a folder barrel such as '@adobe/spectrum-wc-core/mixins.js', or 'components/<name>.js', 'controllers/<name>.js', or 'directives/<name>.js'.",
    },
  },
  create(context) {
    const { coreExports } = context.options[0] ?? {};
    const published = coreExports ? new Set(coreExports) : null;

    const check = (sourceNode) => {
      const specifier = readSpecifier(sourceNode);
      if (specifier === null) {
        return;
      }
      const problem = findGen2ImportProblem(specifier, published);
      if (problem) {
        context.report({ node: sourceNode, ...problem });
      }
    };

    return {
      ImportDeclaration: (node) => check(node.source),
      ExportAllDeclaration: (node) => check(node.source),
      ExportNamedDeclaration: (node) => check(node.source),
      ImportExpression: (node) => check(node.source),
      // `type T = import('pkg').T`; typescript-eslint wraps the string in a
      // TSLiteralType.
      TSImportType: (node) =>
        check(
          node.argument?.type === 'TSLiteralType'
            ? node.argument.literal
            : node.argument
        ),
      // `import x = require('pkg')`
      TSExternalModuleReference: (node) => check(node.expression),
    };
  },
};
