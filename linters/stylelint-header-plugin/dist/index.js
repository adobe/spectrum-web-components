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
 * and looking for common markers like .git, package.json, or .stylelintrc.json
 */
function findWorkspaceRoot(startDir) {
    let current = startDir;
    const root = dirname(current);
    // Walk up until we hit the filesystem root
    while (current !== root) {
        // Check for common workspace markers
        if (
            existsSync(join(current, '.git')) ||
            existsSync(join(current, '.stylelintrc.json')) ||
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
    var _a, _b;
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
        const count =
            (_a = firstBigrams.get(bigram)) !== null && _a !== void 0 ? _a : 0;
        firstBigrams.set(bigram, count + 1);
    }
    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count =
            (_b = firstBigrams.get(bigram)) !== null && _b !== void 0 ? _b : 0;
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
        var _a, _b, _c, _d, _e, _f;
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
                        (val) =>
                            typeof val === 'number' && val >= 0 && val <= 1,
                    ],
                },
            }
        );
        if (!validOptions) {
            return;
        }
        // Get the base directory for resolving relative paths
        // Try multiple sources in order of preference
        const baseDirs = [];
        // Get the source file path to help find the workspace root
        const sourceFile =
            (_c =
                (_b =
                    (_a = root.source) === null || _a === void 0
                        ? void 0
                        : _a.input) === null || _b === void 0
                    ? void 0
                    : _b.file) !== null && _c !== void 0
                ? _c
                : (_e =
                        (_d = root.source) === null || _d === void 0
                            ? void 0
                            : _d.input) === null || _e === void 0
                  ? void 0
                  : _e.from;
        // Try to find workspace root from the source file's directory
        if (sourceFile && typeof sourceFile === 'string') {
            const sourceDir = dirname(sourceFile);
            const workspaceRoot = findWorkspaceRoot(sourceDir);
            if (workspaceRoot) {
                baseDirs.push(workspaceRoot);
            }
            // Also add the source file's directory as a fallback
            baseDirs.push(sourceDir);
        }
        // result.opts may have a cwd property from stylelint
        const opts = result.opts;
        if (opts && typeof opts.cwd === 'string') {
            baseDirs.push(opts.cwd);
        }
        // Also try process.cwd() as fallback
        baseDirs.push(process.cwd());
        // Resolve the header template from file path or string
        let headerTemplate = pathOrString;
        let foundFile = false;
        // Try absolute path first
        if (existsSync(pathOrString)) {
            headerTemplate = readFileSync(pathOrString, 'utf8');
            foundFile = true;
        }
        // Try relative to each base directory
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
        // If we didn't find a file, treat pathOrString as the header content directly
        // (useful for inline header templates in config)
        if (!foundFile && (!headerTemplate || headerTemplate === '')) {
            return;
        }
        // Strip comment delimiters from the template while preserving line structure
        // Remove opening /** or /* and closing */
        headerTemplate = headerTemplate
            .replace(/^\/\*\*?\s*\n?/, '')
            .replace(/\s*\*\/\s*$/, '');
        // Remove leading " * " from each line but preserve line breaks
        headerTemplate = headerTemplate
            .split('\n')
            .map((line) => line.replace(/^\s*\*\s?/, ''))
            .join('\n')
            .trim();
        // Use the header template directly (HEADER.js has the year hardcoded)
        const expectedHeader = headerTemplate;
        // Threshold for detecting if a comment is a header (even with wrong year)
        const headerDetectionThreshold =
            (_f = options.headerDetectionThreshold) !== null && _f !== void 0
                ? _f
                : 0.8;
        const cleanExpected = cleanCommentText(expectedHeader);
        const checkResult = {
            existingHeaderComment: null,
            isExactMatch: false,
            similarity: 0,
        };
        root.walkComments((comment) => {
            // Only check the first comment
            if (checkResult.existingHeaderComment !== null) {
                return false;
            }
            const cleanComment = cleanCommentText(comment.text);
            const similarity = compareTwoStrings(cleanComment, cleanExpected);
            // Check if this comment is similar enough to be considered a header
            if (similarity >= headerDetectionThreshold) {
                checkResult.existingHeaderComment = comment;
                checkResult.similarity = similarity;
                // Check if it's an exact match (>= 99.99% to handle floating point)
                checkResult.isExactMatch = similarity >= 0.9999;
            }
            // Only check the first comment
            return false;
        });
        // If header exists and matches exactly, nothing to do
        if (checkResult.isExactMatch) {
            return;
        }
        // Create the fix function that will be called when --fix is used
        const applyFix = () => {
            // Remove existing outdated header if present
            if (checkResult.existingHeaderComment) {
                checkResult.existingHeaderComment.remove();
            }
            // Add the correct header to the top of the file
            const headerComment = formatHeaderComment(expectedHeader);
            root.prepend(headerComment);
            // Add spacing after the header comment
            if (root.nodes.length > 1 && root.nodes[1]) {
                root.nodes[1].raws.before = '\n\n';
            }
        };
        // Report the issue with fix callback (modern stylelint API)
        if (checkResult.existingHeaderComment) {
            report({
                result,
                ruleName,
                message: messages.outdated(
                    `${Math.round(checkResult.similarity * 100)}% match`,
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
//# sourceMappingURL=index.js.map
