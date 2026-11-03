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

import { parse } from 'comment-parser';

const tagKinds = new Map([
  ['cssprop', 'CSS custom property'],
  ['cssproperty', 'CSS custom property'],
  ['csspart', 'CSS part'],
  ['part', 'CSS part'],
  ['slot', 'Slot'],
  ['cssstate', 'CSS state'],
  ['cssState', 'CSS state'],
]);

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow duplicate CSS custom properties, CSS parts, slots, and CSS states within a JSDoc block or across leading JSDoc blocks on the same class to prevent duplicate API table rows.',
    },
    schema: [],
    messages: {
      duplicate: '{{kind}} "{{name}}" is documented more than once.',
      duplicateDefaultSlot: 'Default slot is documented more than once.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const namesByComment = new Map();

    return {
      ClassDeclaration(node) {
        let declaration =
          node.parent.type === 'ExportNamedDeclaration' ||
          node.parent.type === 'ExportDefaultDeclaration'
            ? node.parent
            : node;
        const firstDecorator = node.decorators?.[0];
        if (firstDecorator && firstDecorator.range[0] < declaration.range[0]) {
          declaration = firstDecorator;
        }

        const names = new Set();
        const previousToken = sourceCode.getTokenBefore(declaration);
        for (const comment of sourceCode.getCommentsBefore(declaration)) {
          if (previousToken?.loc.end.line === comment.loc.start.line) {
            continue;
          }
          namesByComment.set(comment, names);
        }
      },
      'Program:exit'() {
        for (const comment of sourceCode.getAllComments()) {
          if (comment.type !== 'Block' || !comment.value.startsWith('*')) {
            continue;
          }

          const names = namesByComment.get(comment) ?? new Set();
          for (const block of parse(sourceCode.getText(comment))) {
            if (block.tags.some(({ tag }) => tag === 'typedef')) {
              continue;
            }

            for (const spec of block.tags) {
              const kind = tagKinds.get(spec.tag);
              const name = spec.name === '-' ? '' : spec.name;
              if (
                !kind ||
                (!name && kind !== 'Slot') ||
                (kind === 'CSS custom property' && !name.startsWith('--'))
              ) {
                continue;
              }

              const key = `${kind}:${name}`;
              if (names.has(key)) {
                const line = name
                  ? spec.source.find(({ tokens }) => tokens.name)
                  : spec.source[0];
                const { tokens } = line;
                let column =
                  tokens.start.length +
                  tokens.delimiter.length +
                  tokens.postDelimiter.length;
                if (name) {
                  column +=
                    tokens.tag.length +
                    tokens.postTag.length +
                    tokens.type.length +
                    tokens.postType.length +
                    tokens.name.indexOf(name);
                }
                const start = sourceCode.getIndexFromLoc({
                  line: comment.loc.start.line + line.number,
                  column:
                    column + (line.number === 0 ? comment.loc.start.column : 0),
                });
                context.report({
                  loc: {
                    start: sourceCode.getLocFromIndex(start),
                    end: sourceCode.getLocFromIndex(
                      start + (name ? name.length : tokens.tag.length)
                    ),
                  },
                  messageId: name ? 'duplicate' : 'duplicateDefaultSlot',
                  data: { kind, name },
                });
              }
              names.add(key);
            }
          }
        }
      },
    };
  },
};
