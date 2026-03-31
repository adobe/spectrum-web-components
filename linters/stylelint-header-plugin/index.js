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

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import process from 'node:process';
import stylelint from 'stylelint';

/**
 * Finds the workspace root by walking up from a starting directory
 * and looking for common markers like .git or stylelint config files
 */
function findWorkspaceRoot(startDir) {
  let current = startDir;
  const root = dirname(current);

  while (current !== root) {
    if (
      existsSync(join(current, '.git')) ||
      existsSync(join(current, 'stylelint.config.js')) ||
      existsSync(join(current, 'stylelint.config.mjs'))
    ) {
      return current;
    }
    current = dirname(current);
  }

  return null;
}

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'swc/header';

const messages = ruleMessages(ruleName, {
  rejected: 'Header is missing or does not match the required format.',
  outdated: (found, expected) =>
    `Header is outdated. Found "${found}", expected "${expected}".`,
});

const meta = {
  url: 'https://github.com/adobe/spectrum-web-components/tree/main/linters/stylelint-header-plugin',
  fixable: true,
};

/**
 * Compares two strings using the Sørensen–Dice coefficient.
 * Returns a value between 0 and 1, where 1 means identical strings.
 */
function compareTwoStrings(first, second) {
  first = first.replace(/\s+/g, '');
  second = second.replace(/\s+/g, '');

  if (first === second) {
    return 1;
  }
  if (first.length < 2 || second.length < 2) {
    return 0;
  }

  const firstBigrams = new Map();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.get(bigram) ?? 0;
    firstBigrams.set(bigram, count + 1);
  }

  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.get(bigram) ?? 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

/**
 * Cleans comment text by removing asterisks, newlines, whitespace,
 * and the leading `!` used for non-removable comments.
 */
function cleanCommentText(text) {
  return text
    .replace(/(\*|\n|\s)/g, '')
    .replace(/^!/g, '')
    .trim();
}

/**
 * Formats header text for insertion as a CSS block comment.
 * Matches the exact format used in TypeScript files:
 * - Opens with /** (not /*!)
 * - No trailing spaces on empty lines
 */
function formatHeaderComment(header) {
  return {
    text: header
      .split('\n')
      .map((line) => (line.trim() === '' ? ' *' : ` * ${line}`))
      .join('\n'),
    raws: {
      left: '*\n',
      right: '\n ',
    },
  };
}

const ruleFunction = (pathOrString, options = {}) => {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      ruleName,
      {
        actual: pathOrString,
        possible: [(x) => typeof x === 'string'],
      },
      {
        optional: true,
        actual: options,
        possible: {
          headerDetectionThreshold: [
            (val) => typeof val === 'number' && val >= 0 && val <= 1,
          ],
        },
      }
    );

    if (!validOptions) {
      return;
    }

    const baseDirs = [];

    const sourceFile = root.source?.input?.file ?? root.source?.input?.from;

    if (sourceFile && typeof sourceFile === 'string') {
      const sourceDir = dirname(sourceFile);
      const workspaceRoot = findWorkspaceRoot(sourceDir);
      if (workspaceRoot) {
        baseDirs.push(workspaceRoot);
      }
      baseDirs.push(sourceDir);
    }

    const opts = result.opts;
    if (opts && typeof opts.cwd === 'string') {
      baseDirs.push(opts.cwd);
    }

    baseDirs.push(process.cwd());

    let headerTemplate = pathOrString;
    let foundFile = false;

    if (existsSync(pathOrString)) {
      headerTemplate = readFileSync(pathOrString, 'utf8');
      foundFile = true;
    }

    if (!foundFile) {
      for (const baseDir of baseDirs) {
        const fullPath = join(baseDir, pathOrString);
        if (existsSync(fullPath)) {
          headerTemplate = readFileSync(fullPath, 'utf8');
          foundFile = true;
          break;
        }
      }
    }

    if (!foundFile && (!headerTemplate || headerTemplate === '')) {
      return;
    }

    headerTemplate = headerTemplate
      .replace(/^\/\*\*?\s*\n?/, '')
      .replace(/\s*\*\/\s*$/, '');

    headerTemplate = headerTemplate
      .split('\n')
      .map((line) => line.replace(/^\s*\*\s?/, ''))
      .join('\n')
      .trim();

    const expectedHeader = headerTemplate;

    const headerDetectionThreshold = options.headerDetectionThreshold ?? 0.8;

    const cleanExpected = cleanCommentText(expectedHeader);

    const checkResult = {
      existingHeaderComment: null,
      isExactMatch: false,
      similarity: 0,
    };

    root.walkComments((comment) => {
      if (checkResult.existingHeaderComment !== null) {
        return false;
      }

      const cleanComment = cleanCommentText(comment.text);
      const similarity = compareTwoStrings(cleanComment, cleanExpected);

      if (similarity >= headerDetectionThreshold) {
        checkResult.existingHeaderComment = comment;
        checkResult.similarity = similarity;
        checkResult.isExactMatch = similarity >= 0.9999;
      }

      return false;
    });

    if (checkResult.isExactMatch) {
      return;
    }

    const applyFix = () => {
      if (checkResult.existingHeaderComment) {
        checkResult.existingHeaderComment.remove();
      }

      const headerComment = formatHeaderComment(expectedHeader);
      root.prepend(headerComment);

      if (root.nodes.length > 1 && root.nodes[1]) {
        root.nodes[1].raws.before = '\n\n';
      }
    };

    if (checkResult.existingHeaderComment) {
      report({
        result,
        ruleName,
        message: messages.outdated(
          `${checkResult.similarity * 100}% match`,
          '100% match'
        ),
        node: checkResult.existingHeaderComment,
        fix: applyFix,
      });
    } else {
      report({
        result,
        ruleName,
        message: messages.rejected,
        node: root,
        fix: applyFix,
      });
    }
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
