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

import { afterEach, describe, expect, it } from 'vitest';

import {
  augmentTree,
  buildAugmentedSheet,
  collectPseudoStateRules,
  getGroupingWrapper,
  resetAugmentedShadowRoot,
  resetAugmentedTree,
} from '../../pseudo-states.js';

const sheetFrom = async (css: string): Promise<CSSStyleSheet> => {
  const sheet = new CSSStyleSheet();
  await sheet.replaceSync(css);
  return sheet;
};

const mountShadowHost = async (
  css: string
): Promise<{ host: HTMLElement; shadow: ShadowRoot }> => {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.adoptedStyleSheets = [await sheetFrom(css)];
  document.body.appendChild(host);
  return { host, shadow };
};

afterEach(() => {
  resetAugmentedTree(document);
  document.body.innerHTML = '';
});

describe('collectPseudoStateRules()', () => {
  it('maps :hover to .is-hover', async () => {
    const sheet = await sheetFrom('.btn:hover { color: red; }');
    expect(collectPseudoStateRules(sheet)).toContain(
      '.btn.is-hover { color: red; }'
    );
  });

  it('maps :focus-visible to .is-focus-visible', async () => {
    const sheet = await sheetFrom('.btn:focus-visible { outline: none; }');
    expect(collectPseudoStateRules(sheet)).toContain(
      '.btn.is-focus-visible { outline: none; }'
    );
  });

  it('collects rules from a multi-selector sheet', async () => {
    const sheet = await sheetFrom(`
      .a:hover { color: red; }
      .b:active { color: blue; }
      .c:disabled { opacity: 0.5; }
    `);

    const rules = collectPseudoStateRules(sheet);
    expect(rules).toContain('.a.is-hover { color: red; }');
    expect(rules).toContain('.b.is-active { color: blue; }');
    expect(rules).toContain('.c.is-disabled { opacity: 0.5; }');
  });

  it('wraps @media rules', async () => {
    const sheet = await sheetFrom(
      '@media (min-width: 1px) { .btn:hover { color: blue; } }'
    );
    const rules = collectPseudoStateRules(sheet);

    expect(rules).toHaveLength(1);
    expect(rules[0]).toContain('@media');
    expect(rules[0]).toContain('.btn.is-hover { color: blue; }');
  });

  it('wraps @supports rules', async () => {
    const sheet = await sheetFrom(
      '@supports (display: grid) { .btn:hover { color: green; } }'
    );
    const rules = collectPseudoStateRules(sheet);

    expect(rules).toHaveLength(1);
    expect(rules[0]).toContain('@supports');
    expect(rules[0]).toContain('.btn.is-hover { color: green; }');
  });

  it('wraps @layer rules', async () => {
    const sheet = await sheetFrom(
      '@layer components { .btn:hover { color: purple; } }'
    );
    const rules = collectPseudoStateRules(sheet);

    expect(rules).toHaveLength(1);
    expect(rules[0]).toContain('@layer components');
    expect(rules[0]).toContain('.btn.is-hover { color: purple; }');
  });

  it('wraps @container rules', async () => {
    const sheet = await sheetFrom(
      '@container (min-width: 1px) { .btn:hover { color: teal; } }'
    );
    const rules = collectPseudoStateRules(sheet);

    expect(rules).toHaveLength(1);
    expect(rules[0]).toContain('@container');
    expect(rules[0]).toContain('.btn.is-hover { color: teal; }');
  });

  it('wraps @starting-style rules when the engine supports them', async () => {
    const sheet = new CSSStyleSheet();

    try {
      sheet.replaceSync('@starting-style { .btn:hover { opacity: 0; } }');
    } catch {
      return;
    }

    const rules = collectPseudoStateRules(sheet);
    expect(rules).toHaveLength(1);
    expect(rules[0]).toContain('@starting-style');
    expect(rules[0]).toContain('.btn.is-hover { opacity: 0; }');
  });

  it('returns an empty list for sheets without pseudo selectors', async () => {
    const sheet = await sheetFrom('.plain { color: black; }');
    expect(collectPseudoStateRules(sheet)).toEqual([]);
  });

  it('returns an empty list for cross-origin stylesheets', () => {
    const corsSheet = new CSSStyleSheet();
    Object.defineProperty(corsSheet, 'cssRules', {
      get() {
        throw new DOMException('Denied', 'SecurityError');
      },
    });

    expect(collectPseudoStateRules(corsSheet)).toEqual([]);
  });
});

describe('getGroupingWrapper()', () => {
  it('recognizes CSSStartingStyleRule via constructor.name fallback', () => {
    const rule = {
      constructor: { name: 'CSSStartingStyleRule' },
    } as CSSRule;

    expect(getGroupingWrapper(rule)).toBe('@starting-style');
  });
});

describe('buildAugmentedSheet()', () => {
  it('returns an insertable sheet for multi-rule sources', async () => {
    const source = await sheetFrom(`
      .a:hover { color: red; }
      .b:focus-visible { outline: none; }
    `);

    const augmented = buildAugmentedSheet(source);
    expect(augmented).not.toBeNull();
    expect(augmented?.cssRules.length).toBeGreaterThan(0);
  });

  it('returns null when no pseudo rules are present', async () => {
    const source = await sheetFrom('.plain { color: black; }');
    expect(buildAugmentedSheet(source)).toBeNull();
  });

  it('returns null for cross-origin stylesheets', () => {
    const corsSheet = new CSSStyleSheet();
    Object.defineProperty(corsSheet, 'cssRules', {
      get() {
        throw new DOMException('Denied', 'SecurityError');
      },
    });

    expect(buildAugmentedSheet(corsSheet)).toBeNull();
  });
});

describe('augmentTree()', () => {
  it('injects augmented sheets into open shadow roots', async () => {
    const { shadow } = await mountShadowHost('.btn:hover { color: red; }');
    const initialCount = shadow.adoptedStyleSheets.length;

    augmentTree(shadow);

    expect(shadow.adoptedStyleSheets.length).toBeGreaterThan(initialCount);
  });

  it('augments each shadow root only once until reset', async () => {
    const { shadow } = await mountShadowHost('.btn:hover { color: red; }');

    augmentTree(shadow);
    const afterFirst = shadow.adoptedStyleSheets.length;

    augmentTree(shadow);
    expect(shadow.adoptedStyleSheets.length).toBe(afterFirst);
  });

  it('skips cross-origin sheets but still augments readable sheets', async () => {
    const { shadow } = await mountShadowHost('.btn:hover { color: red; }');
    const corsSheet = new CSSStyleSheet();
    Object.defineProperty(corsSheet, 'cssRules', {
      get() {
        throw new DOMException('Denied', 'SecurityError');
      },
    });

    const readable = await sheetFrom('.btn:focus-visible { outline: none; }');
    shadow.adoptedStyleSheets = [corsSheet, readable];
    const initialCount = shadow.adoptedStyleSheets.length;

    augmentTree(shadow);

    expect(shadow.adoptedStyleSheets.length).toBe(initialCount + 1);
  });

  it('allows re-augmentation after resetAugmentedShadowRoot', async () => {
    const { shadow } = await mountShadowHost('.btn:hover { color: red; }');
    const initialCount = shadow.adoptedStyleSheets.length;

    augmentTree(shadow);
    const augmentedCount = shadow.adoptedStyleSheets.length;

    resetAugmentedShadowRoot(shadow);
    expect(shadow.adoptedStyleSheets.length).toBe(initialCount);

    augmentTree(shadow);
    expect(shadow.adoptedStyleSheets.length).toBe(augmentedCount);
  });
});
