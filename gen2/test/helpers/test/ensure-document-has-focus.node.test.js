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

import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';

const { outputText } = ts.transpileModule(
  readFileSync(
    new URL('../dom/ensure-document-has-focus.ts', import.meta.url),
    'utf8'
  ),
  { compilerOptions: { module: ts.ModuleKind.ESNext } }
);
const { ensureDocumentHasFocus } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

test('focuses the owning document once before checking its focus', () => {
  let focused = false;
  let focusCalls = 0;
  const ownerDocument = {
    defaultView: {
      focus() {
        focusCalls += 1;
        focused = true;
      },
    },
    hasFocus() {
      return focused;
    },
  };

  ensureDocumentHasFocus({ ownerDocument });

  assert.equal(focusCalls, 1);
  assert.equal(focused, true);
});

test('fails explicitly when the owning document has no window', () => {
  assert.throws(
    () => ensureDocumentHasFocus({ ownerDocument: { defaultView: null } }),
    /owning document has no window/
  );
});

test('fails without retrying when document activation does not establish focus', () => {
  let focusCalls = 0;
  const ownerDocument = {
    defaultView: {
      focus() {
        focusCalls += 1;
      },
    },
    hasFocus() {
      return false;
    },
  };

  assert.throws(
    () => ensureDocumentHasFocus({ ownerDocument }),
    /document did not receive focus/
  );
  assert.equal(focusCalls, 1);
});
