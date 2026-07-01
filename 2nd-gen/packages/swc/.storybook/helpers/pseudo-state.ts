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
 * Forces a real CSS pseudo-class's visual state for VRT snapshots.
 *
 * `:hover` and `:active` can't be triggered by synthetic events — browsers only apply
 * them from genuine pointer/OS input state, which doesn't exist in a static snapshot.
 * `:focus-visible` has a similar heuristic gotcha. So instead of trying to fake the
 * input, this mirrors the component's own `:hover`/`:focus-visible`/`:active` rules
 * (in its shadow root's adopted stylesheets) into equivalent class selectors, then
 * applies the matching class directly to the component's internal element.
 */

const PSEUDO_TO_FORCED_CLASS: Record<string, string> = {
  ':hover': '.is-hover',
  ':focus-visible': '.is-focus-visible',
  ':active': '.is-active',
};

export type ForcedPseudoState = 'hover' | 'focus-visible' | 'active';

/** Shadow roots already given mirrored pseudo-class stylesheets. */
const augmented = new WeakSet<ShadowRoot>();

function mirrorPseudoClassRules(sheet: CSSStyleSheet): CSSStyleSheet | null {
  const rules: string[] = [];
  for (const rule of sheet.cssRules) {
    if (!(rule instanceof CSSStyleRule)) {
      continue;
    }
    for (const [pseudo, forcedClass] of Object.entries(
      PSEUDO_TO_FORCED_CLASS
    )) {
      if (rule.selectorText.includes(pseudo)) {
        rules.push(
          `${rule.selectorText.replaceAll(pseudo, forcedClass)} { ${rule.style.cssText} }`
        );
      }
    }
  }
  if (!rules.length) {
    return null;
  }
  const mirror = new CSSStyleSheet();
  rules.forEach((rule, index) => mirror.insertRule(rule, index));
  return mirror;
}

function augmentShadowRoot(root: ShadowRoot): void {
  if (augmented.has(root)) {
    return;
  }
  augmented.add(root);
  const mirrors = root.adoptedStyleSheets
    .map(mirrorPseudoClassRules)
    .filter((sheet): sheet is CSSStyleSheet => sheet !== null);
  if (mirrors.length) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...mirrors];
  }
}

/**
 * Forces `state`'s visual appearance onto `internalSelector` inside `host`'s shadow
 * root. Call after `host` has rendered (its shadow root must already have its adopted
 * stylesheets in place — true as soon as the element is connected and updated).
 */
export function forcePseudoState(
  host: Element,
  internalSelector: string,
  state: ForcedPseudoState
): void {
  if (!host.shadowRoot) {
    return;
  }
  augmentShadowRoot(host.shadowRoot);
  host.shadowRoot.querySelector(internalSelector)?.classList.add(`is-${state}`);
}
