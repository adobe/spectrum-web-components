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

import { createFixerForShebang, resolveOptions } from './notice-utils.js';

/** @type {import('eslint').ESLint.Plugin} */
const swcPlugin = {
  meta: {
    name: '@spectrum-web-components/eslint-plugin',
    version: '1.0.0',
  },
  rules: {
    'notice-after-shebang': {
      meta: {
        type: 'layout',
        docs: {
          description:
            'Require the copyright notice header to appear directly under the shebang line (#!/usr/bin/env node) and fix by inserting or replacing it there. Options mirror notice/notice (mustMatch, templateFile, template, onNonMatchingHeader, messages).',
        },
        fixable: 'code',
        schema: [
          {
            type: 'object',
            properties: {
              templateFile: {
                type: 'string',
                description:
                  'Path to the header template file (relative to cwd/repo root or absolute).',
              },
              template: {
                type: 'string',
                description: 'Inline template string (overrides templateFile).',
              },
              mustMatch: {
                oneOf: [
                  { type: 'string' },
                  { type: 'object', additionalProperties: true },
                ],
                description:
                  'String or RegExp the content after the shebang must match. If omitted, derived from template.',
              },
              onNonMatchingHeader: {
                type: 'string',
                enum: ['prepend', 'replace', 'report'],
                description:
                  "If a header comment exists but doesn't match: 'prepend' (insert correct one), 'replace' (replace it), or 'report' (report only, no fix).",
              },
              templateVars: {
                type: 'object',
                description:
                  'Extra template variables (YEAR is always provided).',
              },
              messages: {
                type: 'object',
                properties: {
                  whenFailedToMatch: { type: 'string' },
                  reportAndSkip: { type: 'string' },
                },
                additionalProperties: true,
                description: 'Override default messages.',
              },
            },
            additionalProperties: false,
          },
        ],
      },
      create(context) {
        const sourceCode = context.sourceCode;
        const text = sourceCode.getText();

        if (!text.startsWith('#!')) {
          return {};
        }

        const firstNewlineIndex = text.indexOf('\n');
        if (firstNewlineIndex === -1) {
          return {};
        }

        const opts = context.options[0] || {};
        const templateFile = opts.templateFile ?? 'linters/HEADER.js';
        const fileName = context.filename ?? '';
        const { resolvedTemplate, mustMatch, onNonMatchingHeader, messages } =
          resolveOptions({ ...opts, templateFile }, fileName);

        if (!resolvedTemplate && !mustMatch) {
          return {};
        }

        const endOfFirstLine = firstNewlineIndex + 1;
        const textAfterShebang = text.slice(endOfFirstLine);
        const normalizedAfter = textAfterShebang.replace(/\r\n/g, '\n');

        const comments = sourceCode.getAllComments();
        const isHeaderComment = (c) =>
          c.type === 'Block' &&
          c.loc.start.line >= 2 &&
          sourceCode.getText(c).includes('Copyright') &&
          sourceCode.getText(c).includes('Adobe');

        const headerComments = comments.filter(isHeaderComment);
        const firstHeaderIndex = comments.findIndex(isHeaderComment);

        let replaceRange = null;
        let replaceSuffix = '\n\n';
        if (firstHeaderIndex >= 0) {
          const firstHeader = comments[firstHeaderIndex];
          let lastHeader = firstHeader;
          for (let i = firstHeaderIndex + 1; i < comments.length; i++) {
            if (!isHeaderComment(comments[i])) {
              break;
            }
            lastHeader = comments[i];
          }
          const afterHeader = lastHeader.range[1];
          const nextIsNewline =
            text[afterHeader] === '\n' || text[afterHeader] === '\r';
          if (nextIsNewline) {
            const nextChar = text[afterHeader + 1];
            const nextLineIsBlank = nextChar === '\n' || nextChar === '\r';
            replaceRange = [firstHeader.range[0], afterHeader + 1];
            replaceSuffix = nextLineIsBlank ? '\n' : '\n\n';
          } else {
            replaceRange = [firstHeader.range[0], afterHeader];
            replaceSuffix = '\n\n';
          }
        }

        const hasHeaderComment = headerComments.length > 0;
        const headerMatches =
          mustMatch !== null && normalizedAfter.match(mustMatch) !== null;
        const singleCorrectHeader =
          headerComments.length === 1 && headerMatches;

        if (singleCorrectHeader) {
          return {};
        }

        if (
          hasHeaderComment &&
          onNonMatchingHeader === 'report' &&
          !headerMatches
        ) {
          return {
            Program(node) {
              context.report({
                node,
                message: messages.reportAndSkip,
              });
            },
          };
        }

        const fix = createFixerForShebang({
          resolvedTemplate,
          hasHeaderComment,
          replaceRange,
          replaceSuffix,
          endOfFirstLine,
          text,
          onNonMatchingHeader,
        });

        return {
          Program(node) {
            context.report({
              node,
              message: messages.whenFailedToMatch,
              fix,
            });
          },
        };
      },
    },
    'prevent-argument-names': {
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
        const disallowed = Array.isArray(opts.disallowed)
          ? opts.disallowed
          : [];
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
            'Disallow use of `document.activeElement`, which can be incorrect across shadow DOM boundaries. Prefer focus delegation or element refs within the component.',
        },
        schema: [
          {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
        ],
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
