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

import { fixContent } from '../src/fix-content.js';

const RENAMED = { 'old-spacing': 'spacing-300' };
const DELETED = {
  'zero-value-token': '0',
  'removed-with-replacement': 'replacement-token',
  'removed-no-replacement': null,
};

describe('fixContent', () => {
  it('leaves untouched tokens unchanged', () => {
    const { result, replacements } = fixContent(
      'padding: token("active-token");',
      {},
      {}
    );
    expect(result).toBe('padding: token("active-token");');
    expect(replacements).toHaveLength(0);
  });

  it('replaces a renamed token with its new name', () => {
    const { result, replacements } = fixContent(
      'margin: token("old-spacing");',
      RENAMED,
      {}
    );
    expect(result).toBe('margin: token("spacing-300");');
    expect(replacements).toEqual([
      { kind: 'renamed', from: 'old-spacing', to: 'spacing-300' },
    ]);
  });

  it('replaces a zero-value deleted token with bare 0', () => {
    const { result, replacements } = fixContent(
      'gap: token("zero-value-token");',
      {},
      DELETED
    );
    expect(result).toBe('gap: 0;');
    expect(replacements).toEqual([{ kind: 'zero', from: 'zero-value-token' }]);
  });

  it('does not produce token("0") for zero-value tokens', () => {
    const { result } = fixContent(
      'gap: token("zero-value-token");',
      {},
      DELETED
    );
    expect(result).not.toContain('token("0")');
  });

  it('replaces a deleted token with its curated suggestion', () => {
    const { result, replacements } = fixContent(
      'color: token("removed-with-replacement");',
      {},
      DELETED
    );
    expect(result).toBe('color: token("replacement-token");');
    expect(replacements).toEqual([
      {
        kind: 'replaced',
        from: 'removed-with-replacement',
        to: 'replacement-token',
      },
    ]);
  });

  it('adds a TODO comment for deleted tokens with no known replacement', () => {
    const { result, replacements } = fixContent(
      'padding: token("removed-no-replacement");',
      {},
      DELETED
    );
    expect(result).toContain(
      'token("removed-no-replacement") /* TODO: removed token'
    );
    expect(result).not.toBe('padding: token("removed-no-replacement");');
    expect(replacements).toEqual([
      { kind: 'todo', from: 'removed-no-replacement' },
    ]);
  });

  it('handles multiple token() calls in one string', () => {
    const css = 'padding: token("zero-value-token") token("old-spacing");';
    const { result, replacements } = fixContent(css, RENAMED, DELETED);
    expect(result).toBe('padding: 0 token("spacing-300");');
    expect(replacements).toHaveLength(2);
  });

  it('handles single-quoted token() calls', () => {
    const { result } = fixContent("margin: token('old-spacing');", RENAMED, {});
    expect(result).toBe('margin: token("spacing-300");');
  });

  it('handles token() with whitespace inside the parens', () => {
    const { result } = fixContent(
      'margin: token( "old-spacing" );',
      RENAMED,
      {}
    );
    expect(result).toBe('margin: token("spacing-300");');
  });

  it('renamed takes precedence over deleted when a token appears in both', () => {
    const { result, replacements } = fixContent(
      'padding: token("old-spacing");',
      RENAMED,
      { 'old-spacing': 'other-token' }
    );
    // Renamed is checked first
    expect(result).toBe('padding: token("spacing-300");');
    expect(replacements[0].kind).toBe('renamed');
  });

  it('returns unchanged content when no token() calls are present', () => {
    const css = 'color: var(--swc-color-neutral-100);';
    const { result, replacements } = fixContent(css, RENAMED, DELETED);
    expect(result).toBe(css);
    expect(replacements).toHaveLength(0);
  });
});
