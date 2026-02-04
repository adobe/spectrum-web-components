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

import stylelint from 'stylelint';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const {
    createPlugin,
    utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'swc/header';

const messages = ruleMessages(ruleName, {
    missing: 'Missing required header comment',
    mismatch: 'Header comment does not match the required template',
});

const meta = {
    url: 'https://github.com/adobe/spectrum-web-components',
    fixable: true,
};

/**
 * Normalize a header string for comparison by:
 * - Removing comment delimiters
 * - Removing leading/trailing whitespace from each line
 * - Removing empty lines
 * - Replacing year with placeholder for comparison
 */
function normalizeForComparison(text) {
    return text
        .replace(/^\/\*\*?\s*/, '') // Remove opening comment
        .replace(/\s*\*\/$/, '') // Remove closing comment
        .split('\n')
        .map((line) => line.replace(/^\s*\*?\s*/, '').trim()) // Remove leading * and whitespace
        .filter((line) => line.length > 0) // Remove empty lines
        .join(' ')
        .replace(/\d{4}/g, 'YYYY') // Normalize years
        .replace(/\s+/g, ' ') // Collapse whitespace
        .trim();
}

/**
 * Load header template from file path or use as string
 */
function loadHeader(headerOption, configBasedir) {
    let headerContent;

    // Check if it's a file path
    if (
        typeof headerOption === 'string' &&
        (headerOption.startsWith('./') ||
            headerOption.startsWith('../') ||
            headerOption.startsWith('/'))
    ) {
        // Resolve relative to config directory or current working directory
        const basedir = configBasedir || process.cwd();
        const headerPath = resolve(basedir, headerOption);

        if (existsSync(headerPath)) {
            headerContent = readFileSync(headerPath, 'utf8');
        } else {
            throw new Error(`Header file not found: ${headerPath}`);
        }
    } else {
        // Use as literal string
        headerContent = headerOption;
    }

    return headerContent.trim();
}

/**
 * Get the text content of a comment for prepending
 */
function getHeaderText(headerContent) {
    return headerContent
        .replace(/^\/\*\*?\s*\n?/, '') // Remove opening /**
        .replace(/\n?\s*\*\/$/, ''); // Remove closing */
}

/** @type {import('stylelint').Rule} */
const ruleFunction = (primaryOption, secondaryOptions) => {
    return (root, result) => {
        const validOptions = validateOptions(
            result,
            ruleName,
            {
                actual: primaryOption,
                possible: [true, (value) => typeof value === 'string'],
            },
            {
                actual: secondaryOptions,
                possible: {},
                optional: true,
            }
        );

        if (!validOptions) {
            return;
        }

        // Get the header template
        let expectedHeader;
        try {
            const configBasedir = result.stylelint?.configBasedir;
            expectedHeader = loadHeader(primaryOption, configBasedir);
        } catch (error) {
            result.warn(`swc/header: ${error.message}`);
            return;
        }

        const normalizedExpected = normalizeForComparison(expectedHeader);

        // Find the first comment in the file
        let firstComment = null;
        for (const node of root.nodes || []) {
            if (node.type === 'comment') {
                firstComment = node;
                break;
            }
            // Stop at first non-comment node
            break;
        }

        if (firstComment) {
            const actualText = `/*${firstComment.text}*/`;
            const normalizedActual = normalizeForComparison(actualText);

            if (normalizedExpected === normalizedActual) {
                return; // Header matches
            }

            // Header exists but doesn't match
            report({
                message: messages.mismatch,
                node: firstComment,
                result,
                ruleName,
                fix: () => {
                    firstComment.text = getHeaderText(expectedHeader);
                },
            });
        } else {
            // No header comment exists
            report({
                message: messages.missing,
                node: root,
                result,
                ruleName,
                index: 0,
                endIndex: 0,
                fix: () => {
                    const headerText = getHeaderText(expectedHeader);
                    root.prepend({
                        text: headerText,
                        raws: { before: '', after: '\n' },
                    });
                },
            });
        }
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default createPlugin(ruleName, ruleFunction);
