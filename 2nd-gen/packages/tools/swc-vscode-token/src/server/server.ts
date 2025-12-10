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

import * as path from 'path';
import {
    CompletionItem,
    CompletionItemKind,
    createConnection,
    DiagnosticSeverity,
    TextDocuments,
    TextDocumentSyncKind,
    TextEdit,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { TokenStore } from './tokens.js';

/* -------------------------------------------------------------------------- */
/*                              Utility exports                                */
/* -------------------------------------------------------------------------- */
export {
    collectLocalVars,
    shouldWrapLocalVar,
    rangeFromOffsets,
    findTokenContext,
    findVarContext,
    findCssVarContext,
    isSoloVarValue,
};

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */

function collectLocalVars(text: string): string[] {
    const vars = new Set<string>();
    const re = /(--[\w-]+)\s*:/g;
    let m;
    while ((m = re.exec(text))) {
        vars.add(m[1]);
    }
    return [...vars];
}

function findCssVarContext(prefix: string) {
    return /--([\w-]*)$/.exec(prefix);
}

function findTokenContext(prefix: string) {
    return /token\(\s*(['"]?)([\w-]*)$/.exec(prefix);
}

function findVarContext(prefix: string) {
    return /var\(\s*([^)]*)$/.exec(prefix);
}

function isSoloVarValue(fullVarText: string): boolean {
    return !fullVarText.includes(',');
}

function rangeFromOffsets(doc: TextDocument, start: number, end: number) {
    return {
        start: doc.positionAt(start),
        end: doc.positionAt(end),
    };
}

function shouldWrapLocalVar(text: string, tokenStartOffset: number): boolean {
    function findMatchingParen(openIdx: number): number {
        let depth = 1;
        for (let i = openIdx + 1; i < text.length; i++) {
            if (text[i] === '(') {
                depth++;
            } else if (text[i] === ')') {
                depth--;
                if (depth === 0) {
                    return i;
                }
            }
        }
        return -1;
    }

    // 1) Inside var(...)?
    let scanIdx = text.lastIndexOf('var(', tokenStartOffset);
    while (scanIdx !== -1) {
        const varOpen = scanIdx;
        const varClose = findMatchingParen(varOpen + 3);
        if (varClose === -1) {
            if (tokenStartOffset > varOpen + 4) {
                const innerStart = varOpen + 4;
                const rel = tokenStartOffset - innerStart;
                let depth = 0,
                    segIndex = 0;
                for (let i = 0; i < rel; i++) {
                    const ch = text[innerStart + i];
                    if (ch === '(') {
                        depth++;
                    } else if (ch === ')') {
                        depth = Math.max(0, depth - 1);
                    } else if (ch === ',' && depth === 0) {
                        segIndex++;
                    }
                }
                return segIndex > 0;
            }
            break;
        }
        if (varClose >= tokenStartOffset && tokenStartOffset > varOpen) {
            const innerStart = varOpen + 4;
            const inner = text.slice(innerStart, varClose);
            const relPos = tokenStartOffset - innerStart;
            let depth = 0,
                segIndex = 0;
            for (let i = 0; i < inner.length; i++) {
                const ch = inner[i];
                if (ch === '(') {
                    depth++;
                } else if (ch === ')') {
                    depth = Math.max(0, depth - 1);
                } else if (ch === ',' && depth === 0) {
                    if (relPos < i) {
                        break;
                    }
                    segIndex++;
                }
            }
            return segIndex > 0;
        }
        scanIdx = text.lastIndexOf('var(', scanIdx - 1);
    }

    // 2) Inside other function (calc, min, etc.)
    let lastOpen = -1;
    for (let i = tokenStartOffset - 1; i >= 0; i--) {
        if (text[i] === '(') {
            lastOpen = i;
            break;
        } else if (text[i] === ';' || text[i] === '\n' || text[i] === '{') {
            break;
        }
    }
    if (lastOpen !== -1) {
        let j = lastOpen - 1;
        while (j >= 0 && /\s/.test(text[j])) {
            j--;
        }
        const fnEnd = j;
        while (j >= 0 && /[a-zA-Z0-9_-]/.test(text[j])) {
            j--;
        }
        const fnName = text.slice(j + 1, fnEnd + 1).toLowerCase();
        const closeForOpen = findMatchingParen(lastOpen);
        if (closeForOpen === -1 || closeForOpen >= tokenStartOffset) {
            if (fnName && fnName !== 'var') {
                return true;
            }
        }
    }

    // 3) Top-level commas
    let depth = 0,
        colonIdx = -1;
    for (let i = tokenStartOffset - 1; i >= 0; i--) {
        const ch = text[i];
        if (ch === ')') {
            depth++;
        } else if (ch === '(') {
            depth = Math.max(0, depth - 1);
        } else if (ch === ':' && depth === 0) {
            colonIdx = i;
            break;
        } else if ((ch === ';' || ch === '}') && depth === 0) {
            break;
        }
    }

    if (colonIdx !== -1) {
        const semicolonIdx = text.indexOf(';', colonIdx);
        const valueEnd = semicolonIdx === -1 ? text.length : semicolonIdx;
        const valueSlice = text.slice(colonIdx + 1, valueEnd);
        const relIndex = tokenStartOffset - (colonIdx + 1);
        let d = 0;
        for (let i = 0; i < valueSlice.length; i++) {
            const c = valueSlice[i];
            if (c === '(') {
                d++;
            } else if (c === ')') {
                d = Math.max(0, d - 1);
            } else if (c === ',' && d === 0) {
                if (relIndex <= i) {
                    break;
                }
            }
        }
        let hasTopLevelComma = false;
        d = 0;
        for (let i = 0; i < valueSlice.length; i++) {
            const c = valueSlice[i];
            if (c === '(') {
                d++;
            } else if (c === ')') {
                d = Math.max(0, d - 1);
            } else if (c === ',' && d === 0) {
                hasTopLevelComma = true;
                break;
            }
        }
        if (hasTopLevelComma) {
            return false;
        }
    }

    return true;
}

/* -------------------------------------------------------------------------- */
/*                                 Completions                                */
/* -------------------------------------------------------------------------- */

export interface CompletionContext {
    doc: TextDocument;
    store: TokenStore;
    localVars: string[];
}

/**
 * Pure function to get completions for a given document and cursor offset.
 */
export function getCompletions(
    doc: TextDocument,
    offset: number,
    store: TokenStore,
    localVars?: string[]
): CompletionItem[] {
    const text = doc.getText();
    const prefix = text.slice(0, offset);
    const vars = localVars ?? collectLocalVars(text);

    // --- token(...) context ---
    const tokenMatch = findTokenContext(prefix);
    if (tokenMatch) {
        const partial = tokenMatch[2] ?? '';
        const start = offset - partial.length;

        return store.filter(partial).map((k) => {
            const lastCharBefore = prefix[prefix.length - 1];
            const nextChar = text[offset] ?? '';

            let replacement = k;

            if (lastCharBefore === "'" || lastCharBefore === '"') {
                // Only add closing quote if it's not already there
                if (nextChar !== lastCharBefore) {
                    replacement = k + lastCharBefore;
                }
            } else {
                replacement = `'${k}'`;
            }

            return {
                label: k,
                kind: CompletionItemKind.Value,
                textEdit: TextEdit.replace(
                    rangeFromOffsets(doc, start, offset),
                    replacement
                ),
            };
        });
    }

    // --- var(...) context ---
    const varCtx = findVarContext(prefix);
    if (varCtx) {
        const inner = varCtx[1] ?? '';
        const varStart = prefix.lastIndexOf('var(');
        const fullVarMatch = /var\(([^)]*)\)/.exec(
            text.slice(varStart, varStart + 500)
        );
        const safeToUnwrap = fullVarMatch && isSoloVarValue(fullVarMatch[1]);
        const partial = inner.replace(/^--/, '');

        const localItems = vars
            .filter((v) =>
                v.slice(2).toLowerCase().includes(partial.toLowerCase())
            )
            .map((v) => {
                const wrap = shouldWrapLocalVar(text, varStart);
                const replacement = safeToUnwrap ? v : wrap ? `var(${v})` : v;
                return {
                    label: v,
                    kind: CompletionItemKind.Variable,
                    textEdit: TextEdit.replace(
                        rangeFromOffsets(
                            doc,
                            varStart,
                            varStart + (fullVarMatch?.[0].length ?? 0)
                        ),
                        replacement
                    ),
                };
            });

        const tokenItems = store.filter(partial).map((k) => ({
            label: k,
            kind: CompletionItemKind.Value,
            textEdit: TextEdit.replace(
                rangeFromOffsets(
                    doc,
                    varStart,
                    varStart + (fullVarMatch?.[0].length ?? 0)
                ),
                `token('${k}')`
            ),
        }));

        return [...localItems, ...tokenItems];
    }

    // --- top-level --foo ---
    const cssVar = findCssVarContext(prefix);
    if (cssVar) {
        const partial = cssVar[1] ?? '';
        const start = offset - cssVar[0].length;

        const localItems = vars
            .filter((v) =>
                v.slice(2).toLowerCase().includes(partial.toLowerCase())
            )
            .map((v) => {
                const wrap = shouldWrapLocalVar(text, start);
                const replacement = wrap ? `var(${v})` : v;
                return {
                    label: v,
                    kind: CompletionItemKind.Variable,
                    sortText: '0',
                    textEdit: TextEdit.replace(
                        rangeFromOffsets(doc, start, offset),
                        replacement
                    ),
                };
            });

        const tokenItems = store.filter(partial).map((k) => ({
            label: k,
            kind: CompletionItemKind.Value,
            sortText: '1',
            textEdit: TextEdit.replace(
                rangeFromOffsets(doc, start, offset),
                `token('${k}')`
            ),
        }));

        return [...localItems, ...tokenItems];
    }

    return [];
}

export function startServer() {
    const conn = createConnection();
    const docs = new TextDocuments(TextDocument);
    const store = new TokenStore(path.join(__dirname, '../../tokens.json'));

    conn.onInitialize(() => ({
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                triggerCharacters: ['-', '(', ',', "'", '"'],
            },
            hoverProvider: true,
        },
    }));

    conn.onCompletion(({ textDocument, position }): CompletionItem[] => {
        const doc = docs.get(textDocument.uri);
        if (!doc) {
            return [];
        }

        const localVars = collectLocalVars(doc.getText());
        return getCompletions(doc, doc.offsetAt(position), store, localVars);
    });

    /* -------------------------------------------------------------------------- */
    /*                                Diagnostics                                 */
    /* -------------------------------------------------------------------------- */

    docs.onDidChangeContent((d) => {
        const diagnostics = [];
        const text = d.document.getText();
        const re = /token\(['"]([\w-]+)['"]\)/g;
        let m;
        while ((m = re.exec(text))) {
            if (!store.has(m[1])) {
                const start = d.document.positionAt(m.index + 7);
                const end = d.document.positionAt(m.index + 7 + m[1].length);
                diagnostics.push({
                    severity: DiagnosticSeverity.Error,
                    range: { start, end },
                    message: `Unknown token '${m[1]}'`,
                });
            }
        }
        conn.sendDiagnostics({ uri: d.document.uri, diagnostics });
    });

    // Your existing onCompletion and diagnostics logic here
    docs.listen(conn);
    conn.listen();
}

// Only start the server if this file is executed directly
if (require.main === module) {
    startServer();
}
