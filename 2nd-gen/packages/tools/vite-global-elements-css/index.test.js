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

import { deriveBlock, deriveCSS, transformSelector } from './index.js';

// ── deriveBlock ──────────────────────────────────────────────────────────────

describe('deriveBlock', () => {
  it('converts a single-word component to swc-PascalCase', () => {
    expect(deriveBlock('button')).toBe('swc-Button');
  });

  it('converts a two-word component to swc-PascalCase', () => {
    expect(deriveBlock('action-button')).toBe('swc-ActionButton');
  });

  it('converts a three-word component to swc-PascalCase', () => {
    expect(deriveBlock('close-circle-button')).toBe('swc-CloseCircleButton');
  });
});

// ── transformSelector — basic ────────────────────────────────────────────────

describe('transformSelector — basic', () => {
  it(':host → .block', () => {
    expect(transformSelector(':host', 'swc-Button')).toBe('.swc-Button');
  });

  it(':host([attr="value"]) → .block--value', () => {
    expect(transformSelector(':host([variant="accent"])', 'swc-Button')).toBe(
      '.swc-Button--accent'
    );
  });

  it(':host([boolAttr]) → .block--boolAttr', () => {
    expect(transformSelector(':host([truncate])', 'swc-Button')).toBe(
      '.swc-Button--truncate'
    );
  });

  it(':host([a="x"][b="y"]) → .block--x.block--y (chained, same element)', () => {
    expect(
      transformSelector(
        ':host([variant="primary"][fill-style="outline"])',
        'swc-Button'
      )
    ).toBe('.swc-Button--primary.swc-Button--outline');
  });

  it(':host .block-el → .block .block-el', () => {
    expect(transformSelector(':host .swc-Button-label', 'swc-Button')).toBe(
      '.swc-Button .swc-Button-label'
    );
  });

  it(':host([attr="value"]) .block-el → .block--value .block-el', () => {
    expect(
      transformSelector(
        ':host([variant="primary"]) .swc-Button-label',
        'swc-Button'
      )
    ).toBe('.swc-Button--primary .swc-Button-label');
  });

  it(':host([attr]) .block → .block--attr (block collapses into modifier — same element in global context)', () => {
    expect(
      transformSelector(':host([justified]) .swc-Button', 'swc-Button')
    ).toBe('.swc-Button--justified');
  });

  it(':host([attr="value"]) .block → .block--value (value modifier, same element collapse)', () => {
    expect(
      transformSelector(':host([variant="accent"]) .swc-Button', 'swc-Button')
    ).toBe('.swc-Button--accent');
  });

  it('slot[name="X"]::slotted(*) → .block-X', () => {
    expect(
      transformSelector('slot[name="icon"]::slotted(*)', 'swc-Button')
    ).toBe('.swc-Button-icon');
  });

  it('handles comma-separated selectors', () => {
    expect(
      transformSelector(
        ':host([variant="accent"]), :host([variant="negative"])',
        'swc-Button'
      )
    ).toBe('.swc-Button--accent,\n.swc-Button--negative');
  });

  it('passes through non-host, non-slotted selectors unchanged', () => {
    expect(transformSelector('.swc-Button-label', 'swc-Button')).toBe(
      '.swc-Button-label'
    );
  });
});

// ── transformSelector — wildcard ─────────────────────────────────────────────

describe('transformSelector — wildcard', () => {
  it('* → .block, .block * (scoped to block descendants)', () => {
    expect(transformSelector('*', 'swc-Button')).toBe(
      '.swc-Button, .swc-Button *'
    );
  });
});

// ── transformSelector — SWC API attribute prefixing ──────────────────────────

describe('transformSelector — SWC API attribute prefixing', () => {
  it('prefixes size="l" → .block--sizeL', () => {
    expect(transformSelector(':host([size="l"])', 'swc-Button')).toBe(
      '.swc-Button--sizeL'
    );
  });

  it('prefixes size="s" → .block--sizeS', () => {
    expect(transformSelector(':host([size="s"])', 'swc-Button')).toBe(
      '.swc-Button--sizeS'
    );
  });

  it('prefixes size="xl" → .block--sizeXl', () => {
    expect(transformSelector(':host([size="xl"])', 'swc-Button')).toBe(
      '.swc-Button--sizeXl'
    );
  });

  it('prefixes static-color="white" → .block--staticWhite', () => {
    expect(
      transformSelector(':host([static-color="white"])', 'swc-Button')
    ).toBe('.swc-Button--staticWhite');
  });

  it('prefixes static-color="black" → .block--staticBlack', () => {
    expect(
      transformSelector(':host([static-color="black"])', 'swc-Button')
    ).toBe('.swc-Button--staticBlack');
  });

  it('does not prefix non-SWC-standard attributes', () => {
    expect(transformSelector(':host([variant="accent"])', 'swc-Button')).toBe(
      '.swc-Button--accent'
    );
  });

  it('applies prefixing in compound attribute selectors', () => {
    expect(
      transformSelector(
        ':host([static-color="white"][fill-style="outline"])',
        'swc-Button'
      )
    ).toBe('.swc-Button--staticWhite.swc-Button--outline');
  });

  it('does not prefix boolean (valueless) attributes', () => {
    expect(transformSelector(':host([truncate])', 'swc-Button')).toBe(
      '.swc-Button--truncate'
    );
  });
});

// ── deriveCSS — fence removal ────────────────────────────────────────────────

describe('deriveCSS — fence removal', () => {
  it('strips top-level fenced blocks', () => {
    const css = `
      :host { color: red; }
      /* @global-exclude: test */
      :host([pending]) { color: blue; }
      /* @global-exclude-end */
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).toContain('.swc-Button');
    expect(result).not.toContain('.swc-Button--pending');
  });

  it('strips top-level fenced @keyframes', () => {
    const css = `
      /* @global-exclude: spinner animations */
      @keyframes spin { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
      /* @global-exclude-end */
      :host { color: red; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('@keyframes');
    expect(result).toContain('.swc-Button');
  });

  it('strips fenced rules inside a media query, keeping the rest', () => {
    const css = `
      @media (prefers-reduced-motion: reduce) {
        :host { transition-duration: 0ms; }
        /* @global-exclude: pending spinner */
        :host([pending]) .swc-Button { animation: none; }
        /* @global-exclude-end */
      }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).toContain('@media (prefers-reduced-motion: reduce)');
    expect(result).toContain('transition-duration: 0ms');
    expect(result).not.toContain('animation: none');
  });

  it('removes a media query left empty after stripping all fenced content', () => {
    const css = `
      @media (prefers-reduced-motion: reduce) {
        /* @global-exclude: all content is pending-only */
        :host([pending]) .swc-Button { animation: none; }
        /* @global-exclude-end */
      }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('@media');
  });

  it('merges :host([attr]) and :host([attr]) .block into one rule when both collapse to the same modifier', () => {
    const css = `
      :host([justified]) {
        flex-grow: 1;
        inline-size: 100%;
      }
      :host([justified]) .swc-Button {
        inline-size: 100%;
      }
    `;
    const result = deriveCSS(css, 'swc-Button');
    const occurrences = (result.match(/\.swc-Button--justified/g) ?? []).length;
    expect(occurrences).toBe(1);
    expect(result).toContain('flex-grow: 1');
    expect(result).toContain('inline-size: 100%');
  });

  it('throws on an unclosed @global-exclude fence', () => {
    const css = `  
      /* @global-exclude */  
      :host([pending]) { color: blue; }  
      :host { color: red; }  
    `;
    expect(() => deriveCSS(css, 'swc-Button')).toThrow(
      'Unclosed @global-exclude fence'
    );
  });

  it('accepts @global-exclude without a reason string', () => {
    const css = `
      /* @global-exclude */
      :host([foo]) { color: blue; }
      /* @global-exclude-end */
      :host { color: red; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('color: blue');
    expect(result).toContain('color: red');
  });
});

// ── deriveCSS — comment stripping ───────────────────────────────────────────

describe('deriveCSS — comment stripping', () => {
  it('strips section divider comments from source', () => {
    const css = `
      /* ── Sizes ──── */
      :host([size="s"]) { font-size: 12px; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('Sizes');
    expect(result).toContain('font-size: 12px');
  });

  it('strips inline property comments', () => {
    const css = `:host { max-inline-size: inherit; /* inherit from host */ }`;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('inherit from host');
    expect(result).toContain('max-inline-size: inherit');
  });

  it('strips copyright block comments from source', () => {
    const css = `
      /**
       * Copyright 2026 Adobe. All rights reserved.
       * Licensed under Apache 2.0.
       */
      :host { color: red; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).not.toContain('Copyright');
    expect(result).toContain('color: red');
  });
});

// ── deriveCSS — rule merging ─────────────────────────────────────────────────

describe('deriveCSS — rule merging', () => {
  it('merges duplicate top-level rules with the same selector', () => {
    const css = `
      .swc-Button { display: inline-flex; cursor: pointer; }
      .swc-Button { gap: 8px; min-block-size: 32px; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    // 1 merged rule inside the layer + 1 revert-layer escape hatch outside = 2
    const count = (result.match(/\.swc-Button\s*\{/g) ?? []).length;
    expect(count).toBe(2);
    expect(result).toContain('display: inline-flex');
    expect(result).toContain('gap: 8px');
  });

  it('last declaration wins when properties are duplicated across merged rules', () => {
    const css = `
      .swc-Button { display: inline-block; }
      .swc-Button { display: inline-flex; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).toContain('display: inline-flex');
    expect(result).not.toContain('display: inline-block');
  });

  it('merges rules derived from :host selectors', () => {
    const css = `
      :host { display: inline-block; }
      :host { vertical-align: top; }
    `;
    const result = deriveCSS(css, 'swc-Button');
    // 1 merged rule inside the layer + 1 revert-layer escape hatch outside = 2
    const count = (result.match(/\.swc-Button\s*\{/g) ?? []).length;
    expect(count).toBe(2);
    expect(result).toContain('display: inline-block');
    expect(result).toContain('vertical-align: top');
  });

  it('merges rules inside media queries independently from top-level rules', () => {
    const css = `
      .swc-Button { transition-duration: 200ms; }
      @media (prefers-reduced-motion: reduce) {
        .swc-Button { transition-duration: 0ms; }
        .swc-Button { animation: none; }
      }
    `;
    const result = deriveCSS(css, 'swc-Button');
    expect(result).toContain('transition-duration: 200ms');
    expect(result).toContain('transition-duration: 0ms');
    expect(result).toContain('animation: none');
  });
});

// ── deriveCSS — layer wrapping ───────────────────────────────────────────────

describe('deriveCSS — layer wrapping', () => {
  it('wraps output in @layer swc-global-elements', () => {
    const result = deriveCSS(':host { color: red; }', 'swc-Button');
    expect(result).toContain('@layer swc-global-elements');
  });

  it('appends the revert-layer escape-hatch rule outside the layer', () => {
    const result = deriveCSS(':host { color: red; }', 'swc-Button');
    expect(result).toContain('all: revert-layer !important');
  });
});

// ── deriveCSS — selector transformation ─────────────────────────────────────

describe('deriveCSS — selector transformation', () => {
  it('transforms :host rules to BEM class selectors', () => {
    const result = deriveCSS(
      ':host([size="s"]) { font-size: 12px; }',
      'swc-Button'
    );
    expect(result).toContain('.swc-Button--sizeS');
    expect(result).not.toContain(':host');
  });

  it('applies SWC API prefixing automatically in full pipeline', () => {
    const result = deriveCSS(
      ':host([size="l"]) { font-size: 18px; }',
      'swc-Button'
    );
    expect(result).toContain('.swc-Button--sizeL');
    expect(result).not.toContain('.swc-Button--l');
  });

  it('scopes wildcard rules to .block and .block * in full pipeline', () => {
    const result = deriveCSS('* { box-sizing: border-box; }', 'swc-Button');
    expect(result).toContain('.swc-Button, .swc-Button *');
    // A bare unscoped wildcard would appear as "* {" at the start of a line.
    // The transformed form ".swc-Button, .swc-Button * {" is on a single line, so
    // no line begins with "* {" in the output.
    expect(result).not.toMatch(/(?:^|\n)\s*\*\s*\{/);
  });

  it('transforms ::slotted selectors to BEM element selectors', () => {
    const result = deriveCSS(
      'slot[name="icon"]::slotted(*) { color: inherit; }',
      'swc-Button'
    );
    expect(result).toContain('.swc-Button-icon');
    expect(result).not.toContain('::slotted');
  });

  it('preserves token() calls for downstream PostCSS processing', () => {
    const result = deriveCSS(
      ':host { color: token("gray-800"); }',
      'swc-Button'
    );
    expect(result).toContain('token("gray-800")');
  });
});
