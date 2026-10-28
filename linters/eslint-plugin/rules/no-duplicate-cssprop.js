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
    type: 'problem',
    docs: {
      description:
        'Disallow duplicate CSS custom property names in a JSDoc block, including @cssprop and @cssproperty aliases, to prevent duplicate API table rows.',
    },
    schema: [],
    messages: {
      duplicate:
        'CSS custom property "{{name}}" is documented more than once in this JSDoc block.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      Program() {
        for (const comment of sourceCode.getAllComments()) {
          if (comment.type !== 'Block' || !comment.value.startsWith('*')) {
            continue;
          }

          const names = new Set();
          const tags =
            /^[ \t]*\*?[ \t]*@cssprop(?:erty)?[ \t]+(?:\{[^}\r\n]*\}[ \t]*)?\[?(--[^\s=\]]+)/gm;

          for (const match of comment.value.matchAll(tags)) {
            const name = match[1];
            if (names.has(name)) {
              const start =
                comment.range[0] + 2 + match.index + match[0].lastIndexOf(name);
              context.report({
                loc: {
                  start: sourceCode.getLocFromIndex(start),
                  end: sourceCode.getLocFromIndex(start + name.length),
                },
                messageId: 'duplicate',
                data: { name },
              });
            }
            names.add(name);
          }
        }
      },
    };
  },
};
