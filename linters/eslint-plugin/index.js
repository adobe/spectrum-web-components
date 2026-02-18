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

/** @type {import('eslint').ESLint.Plugin} */
const swcPlugin = {
  rules: {
    'prevent-argument-names': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Prevent certain argument names from being used',
        },
        schema: [
          {
            type: 'array',
            items: { type: 'string' },
          },
        ],
      },
      create(context) {
        const disallowed = context.options[0] || [];
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
    },
    'document-active-element': {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Warn against using document.activeElement which can be incorrect across shadow boundaries',
        },
        schema: [],
      },
      create(context) {
        return {
          MemberExpression(node) {
            if (
              node.object.name === 'document' &&
              node.property.name === 'activeElement'
            ) {
              context.report({
                node,
                message:
                  '"document.activeElement" can be incorrect across shadow boundaries',
                data: {
                  identifier: node.property.name,
                },
              });
            }
          },
        };
      },
    },
  },
};

export { swcPlugin };
