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
import * as os from 'os';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

import { TokenStore } from '../tokens.js';

describe('TokenStore', () => {
  it('supports flat token maps', () => {
    const store = new TokenStore({
      'accent-color': 'var(--swc-accent-color)',
    });

    expect(store.has('accent-color')).toBe(true);
    expect(store.replacementFor('accent-color')).toBeUndefined();
  });

  it('supports token data payload with renamed map', () => {
    const store = new TokenStore({
      tokens: {
        'accent-color': 'var(--swc-accent-color)',
      },
      renamed: {
        'old-accent-color': 'accent-color',
      },
    });

    expect(store.has('accent-color')).toBe(true);
    expect(store.has('tokens')).toBe(false);
    expect(store.replacementFor('old-accent-color')).toBe('accent-color');
  });

  it('builds static suggestion candidates for tokens and renamed keys', () => {
    const store = new TokenStore({
      tokens: {
        'accent-color': 'var(--swc-accent-color)',
      },
      renamed: {
        'legacy-accent': 'accent-color',
      },
    });

    expect(store.candidates()).toEqual([
      {
        kind: 'token',
        name: 'accent-color',
        lower: 'accent-color',
      },
      {
        kind: 'renamed',
        name: 'legacy-accent',
        lower: 'legacy-accent',
        replacement: 'accent-color',
      },
    ]);
  });

  it('clears suggestion candidates when load fails', () => {
    const store = new TokenStore({
      tokens: {
        'accent-color': 'var(--swc-accent-color)',
      },
      renamed: {
        'legacy-accent': 'accent-color',
      },
    });

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'token-store-'));
    const brokenJsonPath = path.join(tmpDir, 'broken.json');
    fs.writeFileSync(brokenJsonPath, '{invalid-json', 'utf8');

    store.load(brokenJsonPath);

    expect(store.all()).toEqual([]);
    expect(store.candidates()).toEqual([]);
    expect(store.replacementFor('legacy-accent')).toBeUndefined();
  });
});
