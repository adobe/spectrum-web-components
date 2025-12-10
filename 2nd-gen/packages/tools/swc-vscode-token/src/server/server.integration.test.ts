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

/**
 * Integration tests only cover contexts that are already
 * syntactically unambiguous (token(, var(--, or --).
 *
 * “Speculative” cursor positions such as `background: │`
 * are intentionally excluded unless the completion engine
 * adds inference logic for those states.
 */

import { describe, expect, it } from 'vitest';
import { TextEdit } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { getCompletions } from './server.js';
import { TokenStore } from './tokens.js';

/* -------------------------------------------------------------------------- */
/*                               Test helpers                                 */
/* -------------------------------------------------------------------------- */

function makeDoc(text: string) {
    return TextDocument.create('file:///test.css', 'css', 1, text);
}

// Mimics IDE replacement behavior
function applyTextEdit(doc: TextDocument, edit: TextEdit) {
    const start = doc.offsetAt(edit.range.start);
    const end = doc.offsetAt(edit.range.end);
    return (
        doc.getText().slice(0, start) + edit.newText + doc.getText().slice(end)
    );
}

function normalizeExpectedLabel(select: string): string {
    const tokenMatch = select.match(/token\(['"](.+)['"]\)/);
    return tokenMatch ? tokenMatch[1] : select;
}

function runCase({
    input,
    select,
    expected,
    localVars = ['--my-var', '--bar', '--baz', '--spacing-small'],
}: {
    input: string;
    select: string;
    expected: string;
    localVars?: string[];
}) {
    const cursor = input.indexOf('│');
    const text = input.slice(0, cursor) + input.slice(cursor + 1); // remove marker
    const doc = makeDoc(text);

    const store = new TokenStore({
        'accent-color': 'var(--swc-accent)',
        'spacing-small': '4px',
    });

    const completions = getCompletions(doc, cursor, store, localVars);
    const expectedLabel = normalizeExpectedLabel(select);

    const item = completions.find((c) => {
        const label = c.label;
        const replacement = c.textEdit?.newText;
        return (
            label === expectedLabel ||
            replacement === select ||
            replacement === `token('${expectedLabel}')`
        );
    });

    if (!item) {
        throw new Error(
            `Completion "${select}" not found.\nAvailable: ${completions.map((c) => c.label).join(', ')}`
        );
    }

    const result = applyTextEdit(doc, item.textEdit!);
    expect(result).toBe(expected);
}

/* -------------------------------------------------------------------------- */
/*                               Test cases                                   */
/* -------------------------------------------------------------------------- */

describe('CSS completions (integration)', () => {
    const cases = [
        // Test token() specific replacement
        // Requirements for `input`
        // - placment of | to mimic cursor position, located after trigger characters
        // - balanced parentheses for CSS functions to correctly mimic real IDE behavior
        {
            input: 'color: token(│)',
            select: 'accent-color',
            expected: "color: token('accent-color')",
        },
        {
            input: `color: token('│)`,
            select: 'accent-color',
            expected: "color: token('accent-color')",
        },
        {
            input: 'padding: calc(1rem + token(│))',
            select: 'spacing-small',
            expected: "padding: calc(1rem + token('spacing-small'))",
        },
        {
            input: 'padding: var(--my-var, token(│))',
            select: 'spacing-small',
            expected: "padding: var(--my-var, token('spacing-small'))",
        },
        // Validate extension doesn't clobber regular custom property replacement
        // Ensure any `select` values are included in the `localVars` arr
        {
            input: 'background: --│',
            select: '--my-var',
            expected: 'background: var(--my-var)',
        },
        {
            input: 'padding: calc(--│)',
            select: '--spacing-small',
            expected: 'padding: calc(var(--spacing-small))',
        },
        {
            input: 'padding: calc(1rem + --│)',
            select: '--spacing-small',
            expected: 'padding: calc(1rem + var(--spacing-small))',
        },
    ];

    cases.forEach((test) => {
        it(`${test.input} → ${test.expected}`, () => {
            runCase(test);
        });
    });
});
