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

import * as path from 'path';
import {
  CompletionItem,
  CompletionItemKind,
  createConnection,
  Diagnostic,
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
  findCssVarContext,
  findTokenContext,
  findVarContext,
  isSoloVarValue,
  rangeFromOffsets,
  shouldWrapLocalVar,
};

type UnknownTokenSuggestion = {
  token: string;
  fromRenamed: boolean;
  replacement?: string;
};

type CachedDiagnosticEntry = {
  diagnostic: Diagnostic;
  unknownToken?: string;
  renamedTo?: string;
  suggestions?: UnknownTokenSuggestion[];
};

const MAX_LEVENSHTEIN_CANDIDATES = 250;

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
  const re = /token\(\s*(['"]?)([\w-]*)/g;
  let lastMatch: RegExpExecArray | null = null;
  let match: RegExpExecArray | null;
  while ((match = re.exec(prefix))) {
    lastMatch = match;
  }
  return lastMatch;
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

// Token search for diagnostic hover suggestions
function levenshtein(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;
  if (!aLen) {
    return bLen;
  }
  if (!bLen) {
    return aLen;
  }

  let prev = Array.from({ length: bLen + 1 }, (_, j) => j);
  let curr = new Array<number>(bLen + 1);

  for (let i = 1; i <= aLen; i++) {
    curr[0] = i;
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1, // delete
        curr[j - 1] + 1, // insert
        prev[j - 1] + cost // replace
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[bLen];
}

function suggestionPrefixScore(query: string, candidate: string): number {
  if (candidate.startsWith(query)) {
    return 0;
  }
  if (candidate.includes(query)) {
    return 1;
  }
  if (query.includes(candidate)) {
    return 2;
  }
  return 3;
}

function passesSuggestionPrefilter(query: string, candidate: string): boolean {
  if (!query) {
    return true;
  }

  const lenDelta = Math.abs(query.length - candidate.length);
  if (lenDelta > 5) {
    return false;
  }

  if (candidate.startsWith(query) || candidate.includes(query)) {
    return true;
  }

  if (query[0] === candidate[0] && lenDelta <= 3) {
    return true;
  }

  return query.length >= 4 && query.includes(candidate.slice(0, 3));
}

export function buildUnknownTokenSuggestions(
  unknownToken: string,
  store: TokenStore,
  limit = 3
): UnknownTokenSuggestion[] {
  const query = unknownToken.trim().toLowerCase();
  if (query.length < 2) {
    return [];
  }

  const candidates = store.candidates();
  if (!candidates.length) {
    return [];
  }

  const exactMatch = candidates.find((candidate) => candidate.lower === query);
  if (exactMatch) {
    return [
      {
        token: exactMatch.name,
        fromRenamed: exactMatch.kind === 'renamed',
        replacement: exactMatch.replacement,
      },
    ];
  }

  const shortlisted = candidates.filter((candidate) =>
    passesSuggestionPrefilter(query, candidate.lower)
  );
  const pool = shortlisted.length ? shortlisted : candidates;
  const prefixedPool = pool
    .map((candidate) => ({
      candidate,
      prefixScore: suggestionPrefixScore(query, candidate.lower),
      lenDelta: Math.abs(query.length - candidate.lower.length),
      kindScore: candidate.kind === 'token' ? 0 : 1,
    }))
    .sort((a, b) =>
      a.prefixScore !== b.prefixScore
        ? a.prefixScore - b.prefixScore
        : a.lenDelta !== b.lenDelta
          ? a.lenDelta - b.lenDelta
          : a.kindScore !== b.kindScore
            ? a.kindScore - b.kindScore
            : a.candidate.name.localeCompare(b.candidate.name)
    )
    .slice(0, MAX_LEVENSHTEIN_CANDIDATES);

  const ranked = prefixedPool
    .map((entry) => ({
      ...entry,
      // Reuse precomputed scores from prefixedPool; only add edit distance.
      editDist: levenshtein(query, entry.candidate.lower),
    }))
    .sort((a, b) =>
      a.prefixScore !== b.prefixScore
        ? a.prefixScore - b.prefixScore
        : a.editDist !== b.editDist
          ? a.editDist - b.editDist
          : a.kindScore !== b.kindScore
            ? a.kindScore - b.kindScore
            : a.candidate.name.localeCompare(b.candidate.name)
    );

  const picked = ranked.slice(0, limit).map((entry) => ({
    token: entry.candidate.name,
    fromRenamed: entry.candidate.kind === 'renamed',
    replacement: entry.candidate.replacement,
  }));

  const deduped: UnknownTokenSuggestion[] = [];
  const seen = new Set<string>();
  for (const suggestion of picked) {
    const key = `${suggestion.token}:${suggestion.replacement ?? ''}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(suggestion);
  }

  return deduped;
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

  /* ----------------------------- token(...) ----------------------------- */

  const tokenMatch = findTokenContext(prefix);
  if (tokenMatch) {
    const rawPartial = tokenMatch[2] ?? '';
    const start = offset - rawPartial.length;
    const partial = rawPartial.trimStart(); // allow completion after spaces

    const openingQuote = tokenMatch[1]; // may be ' or "

    return store.filter(partial).map((tok) => {
      let replacement = tok.trim(); // remove trailing spaces automatically

      // Determine if we need closing quote
      const nextChar = text[offset] ?? '';
      if (openingQuote && nextChar !== openingQuote) {
        replacement = replacement + openingQuote; // add closing quote
      }

      // Only prepend opening quote if user hasn't typed one
      if (!openingQuote) {
        replacement = `'${replacement}'`;
      }

      return {
        label: tok,
        kind: CompletionItemKind.Value,
        textEdit: TextEdit.replace(
          rangeFromOffsets(doc, start, offset),
          replacement
        ),
      };
    });
  }

  /* ----------------------------- var(...) ----------------------------- */

  const varCtx = findVarContext(prefix);
  if (varCtx) {
    const inner = varCtx[1] ?? '';
    const varStart = prefix.lastIndexOf('var(');
    const fullVarMatch = /var\(([^)]*)\)/.exec(
      text.slice(varStart, varStart + 500)
    );
    const safeToUnwrap = fullVarMatch && isSoloVarValue(fullVarMatch[1]);
    const partial = inner.replace(/^--/, '');
    const partialLower = partial.toLowerCase();
    const replacementRange = rangeFromOffsets(
      doc,
      varStart,
      varStart + (fullVarMatch?.[0].length ?? 0)
    );
    const wrapLocalVar = shouldWrapLocalVar(text, varStart);

    const localItems = vars
      .filter((v) => v.slice(2).toLowerCase().includes(partialLower))
      .map((v) => {
        const replacement = safeToUnwrap ? v : wrapLocalVar ? `var(${v})` : v;
        return {
          label: v,
          kind: CompletionItemKind.Variable,
          textEdit: TextEdit.replace(replacementRange, replacement),
        };
      });

    const tokenItems = store.filter(partial).map((k) => ({
      label: k,
      kind: CompletionItemKind.Value,
      textEdit: TextEdit.replace(replacementRange, `token('${k.trim()}')`), // auto-trim token here too
    }));

    return [...localItems, ...tokenItems];
  }

  /* ---------------------------- top-level --foo ---------------------------- */

  const cssVar = findCssVarContext(prefix);
  if (cssVar) {
    const partial = cssVar[1] ?? '';
    const start = offset - cssVar[0].length;
    const partialLower = partial.toLowerCase();
    const replacementRange = rangeFromOffsets(doc, start, offset);
    const wrapLocalVar = shouldWrapLocalVar(text, start);

    const localItems = vars
      .filter((v) => v.slice(2).toLowerCase().includes(partialLower))
      .map((v) => {
        const replacement = wrapLocalVar ? `var(${v})` : v;
        return {
          label: v,
          kind: CompletionItemKind.Variable,
          sortText: '0',
          textEdit: TextEdit.replace(replacementRange, replacement),
        };
      });

    const tokenItems = store.filter(partial).map((k) => ({
      label: k,
      kind: CompletionItemKind.Value,
      sortText: '1',
      textEdit: TextEdit.replace(replacementRange, `token('${k.trim()}')`), // auto-trim token here too
    }));

    return [...localItems, ...tokenItems];
  }

  return [];
}

export function startServer() {
  const conn = createConnection();
  const docs = new TextDocuments(TextDocument);
  const store = new TokenStore(path.join(__dirname, '../../tokens.json'));

  // Cache diagnostics so hover can reflect them
  const diagnosticCache = new Map<string, CachedDiagnosticEntry[]>();

  conn.onInitialize(() => ({
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        // Let the client handle typing triggers for most characters
        triggerCharacters: ['-', '_', "'", '"', '(', ')', ','],
      },
      hoverProvider: true,
    },
  }));

  /* ----------------------------- Completions ----------------------------- */
  conn.onCompletion(({ textDocument, position }): CompletionItem[] => {
    const doc = docs.get(textDocument.uri);
    if (!doc) {
      return [];
    }

    const localVars = collectLocalVars(doc.getText());
    return getCompletions(doc, doc.offsetAt(position), store, localVars);
  });

  /* ----------------------------- Hover ----------------------------- */
  conn.onHover((params) => {
    const doc = docs.get(params.textDocument.uri);
    if (!doc) {
      return null;
    }

    const uri = params.textDocument.uri;
    const hoverOffset = doc.offsetAt(params.position);
    const diags = diagnosticCache.get(uri) ?? [];
    if (!diags.length) {
      return null;
    }

    // Only show hover where diagnostic is under cursor
    const active = diags.find((entry) => {
      const start = doc.offsetAt(entry.diagnostic.range.start);
      const end = doc.offsetAt(entry.diagnostic.range.end);
      return hoverOffset >= start && hoverOffset <= end;
    });
    if (!active) {
      return null;
    }

    if (active.renamedTo && active.unknownToken) {
      return {
        contents: {
          kind: 'markdown',
          value: `**Renamed token:** \`${active.unknownToken}\` -> \`${active.renamedTo}\``,
        },
      };
    }

    const suggestions = active.suggestions ?? [];
    if (suggestions.length) {
      const [best, ...rest] = suggestions;

      const bestLine = best.fromRenamed
        ? `**Did you mean:** \`${best.token}\` (renamed to \`${best.replacement}\`)`
        : `**Did you mean:** \`${best.token}\``;
      const useLine =
        best.fromRenamed && best.replacement
          ? `**Use:** \`${best.replacement}\``
          : '';
      const similarLine = rest.length
        ? `**Similar:** ${rest
            .map((candidate) =>
              candidate.fromRenamed
                ? `\`${candidate.token}\` -> \`${candidate.replacement}\``
                : `\`${candidate.token}\``
            )
            .join(', ')}`
        : '';

      return {
        contents: {
          kind: 'markdown',
          value: [bestLine, useLine, similarLine].filter(Boolean).join('\n\n'),
        },
      };
    }

    const md = [
      `_No similar token found, please check if there is a typo and/or reference the specs_`,
    ]
      .filter(Boolean)
      .join('\n');

    return { contents: { kind: 'markdown', value: md } };
  });

  /* ----------------------------- Diagnostics ----------------------------- */
  docs.onDidChangeContent((d) => {
    const uri = d.document.uri;

    // Exclude test/mocked files
    if (
      uri.endsWith('.test.js') ||
      uri.endsWith('.test.ts') ||
      uri.includes('/tools/')
    ) {
      conn.sendDiagnostics({ uri, diagnostics: [] });
      return;
    }

    const diagnostics: CachedDiagnosticEntry[] = [];
    const trimEdits: TextEdit[] = [];
    const text = d.document.getText();
    const allTokenCalls = /token\(([^)]*)\)/g;
    let match;

    while ((match = allTokenCalls.exec(text))) {
      const fullMatch = match[0];
      const inner = match[1].trim();
      const innerStart = match.index + fullMatch.indexOf(inner);
      const start = d.document.positionAt(innerStart);
      const end = d.document.positionAt(innerStart + inner.length);

      // 1) Detect missing quotes
      const isQuoted = /^['"].+['"]$/.test(inner);

      // Auto-trim trailing/leading spaces inside quotes
      if (isQuoted) {
        const tokenName = inner.slice(1, -1);
        const trimmed = tokenName.trim();

        if (tokenName !== trimmed) {
          diagnostics.push({
            diagnostic: {
              severity: DiagnosticSeverity.Warning,
              range: { start, end },
              message: `Token name has extra spaces; auto-trimmed.`,
            },
          });

          // Batch auto-edits so we only send one workspace edit per document change.
          trimEdits.push(TextEdit.replace({ start, end }, `'${trimmed}'`));
        }
      }

      if (!isQuoted) {
        diagnostics.push({
          diagnostic: {
            severity: DiagnosticSeverity.Error,
            range: { start, end },
            message: `Token name must be quoted: expected token('name')`,
          },
        });
        continue;
      }

      // Extract stripped value (drop quotes and trim)
      const tokenName = inner.slice(1, -1).trim();

      // 2) Detect unknown token
      if (!store.has(tokenName)) {
        const renamed = store.replacementFor(tokenName);
        if (renamed) {
          diagnostics.push({
            diagnostic: {
              severity: DiagnosticSeverity.Error,
              range: { start, end },
              message: `Deprecated token '${tokenName}'. Token was renamed to '${renamed}'`,
            },
            unknownToken: tokenName,
            renamedTo: renamed,
          });
        } else {
          const suggestions = buildUnknownTokenSuggestions(tokenName, store);
          const best = suggestions[0];
          const message = best
            ? best.fromRenamed && best.replacement
              ? `Unknown token '${tokenName}'. Did you mean '${best.token}' (renamed to '${best.replacement}')? Use '${best.replacement}'.`
              : `Unknown token '${tokenName}'. Did you mean '${best.token}'?`
            : `Unknown token '${tokenName}'`;

          diagnostics.push({
            diagnostic: {
              severity: DiagnosticSeverity.Error,
              range: { start, end },
              message,
            },
            unknownToken: tokenName,
            suggestions,
          });
        }
      }
    }

    if (trimEdits.length) {
      conn.workspace.applyEdit({ changes: { [uri]: trimEdits } });
    }

    diagnosticCache.set(uri, diagnostics);
    conn.sendDiagnostics({
      uri,
      diagnostics: diagnostics.map((entry) => entry.diagnostic),
    });
  });

  docs.onDidClose((d) => {
    const uri = d.document.uri;
    diagnosticCache.delete(uri);
    conn.sendDiagnostics({ uri, diagnostics: [] });
  });

  docs.listen(conn);
  conn.listen();
}

// Only start the server if this file is executed directly
if (require.main === module) {
  startServer();
}
