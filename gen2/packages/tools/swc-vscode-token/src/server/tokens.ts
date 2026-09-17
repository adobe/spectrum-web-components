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

import * as fs from 'fs';

type TokenDataPayload = {
  tokens?: Record<string, unknown>;
  renamed?: Record<string, unknown>;
  deleted?: Record<string, string | null>;
  deprecatedComments?: Record<string, string>;
};

export type TokenSuggestionCandidate = {
  kind: 'token' | 'renamed';
  name: string;
  lower: string;
  replacement?: string;
};

export class TokenStore {
  private tokens: Record<string, unknown> = {};
  private renamed: Record<string, string> = {};
  private deleted: Record<string, string | null> = {};
  private deprecatedComments: Record<string, string> = {};
  private suggestionCandidates: TokenSuggestionCandidate[] = [];

  constructor(pathOrTokens: string | Record<string, unknown>) {
    if (typeof pathOrTokens === 'string') {
      this.load(pathOrTokens);
    } else {
      this.setStore(pathOrTokens);
    }
  }

  load(path: string) {
    try {
      const parsed = JSON.parse(fs.readFileSync(path, 'utf8'));
      this.setStore(parsed);
    } catch {
      this.tokens = {};
      this.renamed = {};
      this.rebuildCandidates();
    }
  }

  has(k: string) {
    return k in this.tokens;
  }

  filter(term: string): string[] {
    const q = term.toLowerCase();
    return Object.keys(this.tokens).filter((k) => k.toLowerCase().includes(q));
  }

  all() {
    return Object.keys(this.tokens);
  }

  replacementFor(k: string) {
    return this.renamed[k];
  }

  isDeleted(k: string) {
    return k in this.deleted;
  }

  /** Returns the suggested replacement (string) or null (no replacement) for a deleted
   *  token, or undefined when the token is not in the deleted map at all.
   *  A replacement of "0" means: hardcode a zero-pixel value in implementation. */
  deletionReplacementFor(k: string): string | null | undefined {
    if (!(k in this.deleted)) {
      return undefined;
    }
    return this.deleted[k];
  }

  /** Returns the deprecated_comment for a deleted token, if available. */
  commentFor(k: string): string | undefined {
    return this.deprecatedComments[k];
  }

  candidates() {
    return this.suggestionCandidates;
  }

  private setStore(source: Record<string, unknown>) {
    const payload = source as TokenDataPayload;
    if (payload.tokens && typeof payload.tokens === 'object') {
      this.tokens = payload.tokens;
      this.renamed = this.normalizeRenamed(payload.renamed);
      this.deleted = this.normalizeDeleted(payload.deleted);
      this.deprecatedComments = this.normalizeComments(
        payload.deprecatedComments
      );
      this.rebuildCandidates();
      return;
    }

    this.tokens = source;
    this.renamed = {};
    this.deleted = {};
    this.deprecatedComments = {};
    this.rebuildCandidates();
  }

  private normalizeRenamed(source?: Record<string, unknown>) {
    if (!source || typeof source !== 'object') {
      return {};
    }

    return Object.fromEntries(
      Object.entries(source).filter(([, value]) => typeof value === 'string')
    ) as Record<string, string>;
  }

  private normalizeDeleted(source?: Record<string, string | null>) {
    if (!source || typeof source !== 'object') {
      return {};
    }

    return Object.fromEntries(
      Object.entries(source).filter(
        ([, value]) => value === null || typeof value === 'string'
      )
    );
  }

  private normalizeComments(source?: Record<string, string>) {
    if (!source || typeof source !== 'object') {
      return {};
    }

    return Object.fromEntries(
      Object.entries(source).filter(([, value]) => typeof value === 'string')
    ) as Record<string, string>;
  }

  private rebuildCandidates() {
    const tokenCandidates = Object.keys(this.tokens).map((name) => ({
      kind: 'token' as const,
      name,
      lower: name.toLowerCase(),
    }));

    const renamedCandidates = Object.entries(this.renamed).map(
      ([name, replacement]) => ({
        kind: 'renamed' as const,
        name,
        lower: name.toLowerCase(),
        replacement,
      })
    );

    this.suggestionCandidates = [...tokenCandidates, ...renamedCandidates];
  }
}
