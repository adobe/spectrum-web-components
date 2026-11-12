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

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow specific identifier names as function/arrow parameters. Use to enforce naming conventions or avoid shadowing.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          disallowed: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of argument names that are not allowed.',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const opts = context.options[0] || {};
    const disallowed = Array.isArray(opts.disallowed) ? opts.disallowed : [];
    return {
      Identifier(node) {
        if (
          node.parent &&
          (node.parent.type === 'FunctionDeclaration' ||
            node.parent.type === 'FunctionExpression' ||
            node.parent.type === 'ArrowFunctionExpression')
        ) {
          if (node.parent.params && node.parent.params.includes(node)) {
            if (disallowed.includes(node.name)) {
              context.report({
                node,
                message: `"${node.name}" shouldn't be used as an argument name`,
                data: {
                  identifier: node.name,
                },
              });
            }
          }
        }
      },
    };
  },
};
