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

/**
 * Storybook-only pseudo-state augmentation for VRT grids.
 *
 * Injects class-based mirrors of `:hover`, `:focus-visible`, etc. into open shadow roots
 * so forced classes (`.is-hover`, `.is-focus-visible`, …) produce the correct visuals.
 *
 * **Constraint:** each shadow root is augmented at most once per session. If a component
 * replaces `adoptedStyleSheets` after an attribute change, call `resetAugmentedShadowRoot`
 * (or `resetAugmentedTree`) before the next `augmentTree` pass so new styles are picked up.
 */

const PSEUDO_MAP: [string, string][] = [
  [':hover', '.is-hover'],
  [':focus-visible', '.is-focus-visible'],
  [':active', '.is-active'],
  [':focus', '.is-focus'],
  [':disabled', '.is-disabled'],
];

/** Tracks shadow roots that have already received injected pseudo-state sheets. */
const augmented = new WeakSet<ShadowRoot>();

/** Injected sheets per shadow root — used by `resetAugmentedShadowRoot`. */
const injectedSheets = new WeakMap<ShadowRoot, CSSStyleSheet[]>();

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

/** @internal Exported for unit tests. */
export { getGroupingWrapper };

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

/** Collects class-based pseudo-state rule strings from a stylesheet. */
export function collectPseudoStateRules(source: CSSStyleSheet): string[] {
  const rules: string[] = [];
  try {
    walkRules(source.cssRules, rules);
  } catch {
    return [];
  }
  return rules;
}

/** Builds an adoptable stylesheet with class-based pseudo-state mirrors. */
export function buildAugmentedSheet(
  source: CSSStyleSheet
): CSSStyleSheet | null {
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
    injectedSheets.set(root, extras);
  }
}

/**
 * Clears augmentation state for one shadow root and removes injected pseudo-state sheets.
 * Use when a component replaces `adoptedStyleSheets` and needs a fresh `augmentTree` pass.
 */
export function resetAugmentedShadowRoot(root: ShadowRoot): void {
  augmented.delete(root);

  const extras = injectedSheets.get(root);
  if (extras?.length) {
    root.adoptedStyleSheets = root.adoptedStyleSheets.filter(
      (sheet) => !extras.includes(sheet)
    );
    injectedSheets.delete(root);
  }
}

/**
 * Resets pseudo-state augmentation for every open shadow root under `root`.
 */
export function resetAugmentedTree(
  root: Document | ShadowRoot | Element
): void {
  const searchRoot =
    root instanceof Document
      ? root.body
      : root instanceof ShadowRoot
        ? root
        : root;

  if (root instanceof ShadowRoot) {
    resetAugmentedShadowRoot(root);
  }

  const walker = document.createTreeWalker(searchRoot, NodeFilter.SHOW_ELEMENT);
  let node: Node | null = walker.currentNode;
  while (node) {
    const el = node as Element;
    if (el.shadowRoot) {
      resetAugmentedShadowRoot(el.shadowRoot);
      resetAugmentedTree(el.shadowRoot);
    }
    node = walker.nextNode();
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
