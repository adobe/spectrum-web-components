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

const PSEUDO_MAP: [string, string][] = [
  [':hover', '.is-hover'],
  [':focus-visible', '.is-focus-visible'],
  [':active', '.is-active'],
  [':focus', '.is-focus'],
  [':disabled', '.is-disabled'],
];

/** Tracks already-augmented shadow roots to prevent double-injection on re-renders. */
const augmented = new WeakSet<ShadowRoot>();

function getGroupingWrapper(rule: CSSRule): string | null {
  if (rule instanceof CSSMediaRule) {
    return `@media ${rule.conditionText}`;
  }
  if (rule instanceof CSSSupportsRule) {
    return `@supports ${rule.conditionText}`;
  }
  if (rule instanceof CSSLayerBlockRule) {
    return rule.name ? `@layer ${rule.name}` : '@layer';
  }
  if (rule instanceof CSSContainerRule) {
    return `@container ${rule.conditionText}`;
  }
  if (rule.constructor.name === 'CSSStartingStyleRule') {
    return '@starting-style';
  }
  return null;
}

function walkRules(list: CSSRuleList, out: string[]): void {
  for (const rule of list) {
    if (rule instanceof CSSStyleRule) {
      for (const [pseudo, cls] of PSEUDO_MAP) {
        if (rule.selectorText.includes(pseudo)) {
          const sel = rule.selectorText.replaceAll(pseudo, cls);
          out.push(`${sel} { ${rule.style.cssText} }`);
        }
      }
    } else if ('cssRules' in rule) {
      const wrapper = getGroupingWrapper(rule as CSSRule);
      if (wrapper !== null) {
        const inner: string[] = [];
        walkRules((rule as CSSGroupingRule).cssRules, inner);
        if (inner.length) {
          out.push(`${wrapper} { ${inner.join(' ')} }`);
        }
      }
    }
  }
}

function buildAugmentedSheet(source: CSSStyleSheet): CSSStyleSheet | null {
  const rules: string[] = [];
  try {
    walkRules(source.cssRules, rules);
  } catch {
    return null;
  }
  if (!rules.length) {
    return null;
  }

  const sheet = new CSSStyleSheet();
  rules.forEach((r, i) => {
    try {
      sheet.insertRule(r, i);
    } catch (e) {
      console.warn('[pseudo-states] Failed to insert rule:', r, e);
    }
  });
  return sheet;
}

function augmentShadowRoot(root: ShadowRoot): void {
  if (augmented.has(root)) {
    return;
  }
  augmented.add(root);

  const extras: CSSStyleSheet[] = [];
  for (const sheet of root.adoptedStyleSheets) {
    const aug = buildAugmentedSheet(sheet);
    if (aug) {
      extras.push(aug);
    }
  }
  if (extras.length) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...extras];
  }
}

export function augmentTree(root: Document | ShadowRoot | Element): void {
  const searchRoot =
    root instanceof Document
      ? root.body
      : root instanceof ShadowRoot
        ? root
        : root;

  if (root instanceof ShadowRoot) {
    augmentShadowRoot(root);
  }

  const walker = document.createTreeWalker(searchRoot, NodeFilter.SHOW_ELEMENT);
  let node: Node | null = walker.currentNode;
  while (node) {
    const el = node as Element;
    if (el.shadowRoot) {
      augmentShadowRoot(el.shadowRoot);
      augmentTree(el.shadowRoot);
    }
    node = walker.nextNode();
  }
}
