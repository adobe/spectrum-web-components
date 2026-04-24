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

import { describe, expect, it } from 'vitest';

import {
  buildUnknownTokenSuggestions,
  collectLocalVars,
  findCssVarContext,
  findTokenContext,
  findVarContext,
  isSoloVarValue,
  shouldWrapLocalVar,
} from '../server.js';
import { TokenStore } from '../tokens.js';

describe('server utilities', () => {
  describe('buildUnknownTokenSuggestions', () => {
    const store = new TokenStore({
      tokens: {
        'accent-color': 'var(--swc-accent-color)',
        'accent-quiet': 'var(--swc-accent-quiet)',
      },
      renamed: {
        'legacy-accent': 'accent-color',
      },
    });

    it('returns top token suggestions for typoed current tokens', () => {
      const suggestions = buildUnknownTokenSuggestions('accnt-color', store);
      expect(suggestions[0]).toEqual({
        token: 'accent-color',
        fromRenamed: false,
        replacement: undefined,
      });
    });

    it('includes renamed matches with replacement metadata', () => {
      const suggestions = buildUnknownTokenSuggestions('legcy-accent', store);
      expect(suggestions[0]).toEqual({
        token: 'legacy-accent',
        fromRenamed: true,
        replacement: 'accent-color',
      });
    });

    it('returns no suggestions for very short queries', () => {
      expect(buildUnknownTokenSuggestions('a', store)).toEqual([]);
    });

    it('returns exact match quickly from a large candidate set', () => {
      const manyTokens = Object.fromEntries(
        Array.from({ length: 600 }, (_, i) => [
          `token-candidate-${i}`,
          `var(--swc-token-candidate-${i})`,
        ])
      );
      const largeStore = new TokenStore({
        tokens: {
          ...manyTokens,
          'target-token': 'var(--swc-target-token)',
        },
      });

      expect(buildUnknownTokenSuggestions('target-token', largeStore)).toEqual([
        {
          token: 'target-token',
          fromRenamed: false,
          replacement: undefined,
        },
      ]);
    });
  });

  describe('collectLocalVars', () => {
    it('finds all CSS variable names in text', () => {
      const text = `
        --foo: 1;
        --bar-baz: 2;
        body { --baz-qux: 3; }
    `;
      const vars = collectLocalVars(text);
      expect(vars).toContain('--foo');
      expect(vars).toContain('--bar-baz');
      expect(vars).toContain('--baz-qux');
      expect(vars.length).toBe(3);
    });
  });

  describe('shouldWrapLocalVar', () => {
    it('returns true for top-level standalone token', () => {
      const text = '--color: token(';
      const offset = text.length;
      expect(shouldWrapLocalVar(text, offset)).toBe(true);
    });

    it('returns false for token inside first arg of var()', () => {
      const text = '--color: var(--foo';
      const offset = text.length;
      expect(shouldWrapLocalVar(text, offset)).toBe(false);
    });

    it('returns true for token inside non-var function', () => {
      const text = '--size: calc(token(';
      const offset = text.length;
      expect(shouldWrapLocalVar(text, offset)).toBe(true);
    });

    it('handles nested parentheses correctly', () => {
      const text = '--padding: calc(1px + token(';
      const offset = text.length;
      expect(shouldWrapLocalVar(text, offset)).toBe(true);
    });
  });

  describe('findTokenContext', () => {
    it('matches partial token inside token(', () => {
      const match = findTokenContext('color: token(--my-');
      expect(match).not.toBeNull();
      expect(match![2]).toBe('--my-');
    });

    it('returns null when no token(', () => {
      const match = findTokenContext('color: var(--foo)');
      expect(match).toBeNull();
    });
  });

  describe('findVarContext', () => {
    it('matches inner content of var(', () => {
      const match = findVarContext('color: var(--foo');
      expect(match).not.toBeNull();
      expect(match![1]).toBe('--foo');
    });

    it('returns null when no var(', () => {
      const match = findVarContext('color: token(--foo)');
      expect(match).toBeNull();
    });
  });

  describe('findCssVarContext', () => {
    it('matches partial CSS var', () => {
      const match = findCssVarContext('--my-var');
      expect(match).not.toBeNull();
      expect(match![1]).toBe('my-var');
    });

    it('returns null when not a CSS var', () => {
      const match = findCssVarContext('color');
      expect(match).toBeNull();
    });
  });

  describe('isSoloVarValue', () => {
    it('returns true if no comma', () => {
      expect(isSoloVarValue('--foo')).toBe(true);
    });

    it('returns false if there is a comma', () => {
      expect(isSoloVarValue('--foo, --bar')).toBe(false);
    });
  });
});
