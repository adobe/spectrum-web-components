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
 * (in its shadow root's adopted stylesheets) into equivalent attribute selectors,
 * then applies the matching `data-forced-*` attribute directly to the target element.
 *
 * A `data-*` attribute — rather than a class — is used deliberately: components
 * commonly scope default styles with a `:not([class])` guard (so a consumer-supplied
 * class opts out of them), and adding a class to force a state would trip that guard
 * and drop the default styling from the snapshot. An attribute never sets `class`, so
 * every such guard is inherently exempt from the forced state.
 */

const PSEUDO_TO_FORCED_ATTRIBUTE: Record<string, string> = {
  ':hover': '[data-forced-hover]',
  ':focus-visible': '[data-forced-focus-visible]',
  ':active': '[data-forced-active]',
};

export type ForcedPseudoState = 'hover' | 'focus-visible' | 'active';

/**
 * Mirror sheets already computed, keyed by the *adopted* stylesheet rather
 * than the shadow root: Lit's static `styles` produce one memoized sheet per
 * component class, shared by reference across every instance, so keying by
 * root would redo the same rule walk for every button/tab/etc. on the page.
 */
const mirrorCache = new WeakMap<CSSStyleSheet, CSSStyleSheet | null>();
/** Shadow roots that already have their mirrors adopted. */
const augmentedRoots = new WeakSet<ShadowRoot>();
/** Whether the document-level mirror <style> has already been injected. */
let documentAugmented = false;

// Recurses into grouping rules (@media, @layer, @supports, @container) so a
// mirrored rule stays nested the same way as the original — needed for
// global-button.css, which wraps everything in `@layer swc-global-elements`.
function collectMirroredRules(rules: CSSRuleList, out: string[]): void {
  for (const rule of rules) {
    if (rule instanceof CSSStyleRule) {
      // Mirror the rule's *entire* text (including any nested rules such as a
      // `&::after` block), replacing every forced pseudo-class with its
      // attribute equivalent — anywhere it appears, in the parent selector or a
      // nested one. Using the full `cssText` rather than just this rule's own
      // declarations is what preserves nested rules, whose appearance would
      // otherwise be dropped (e.g. Card's quiet selectable focus ring, drawn
      // by a nested `::after`).
      const { cssText } = rule;
      if (
        Object.keys(PSEUDO_TO_FORCED_ATTRIBUTE).some((pseudo) =>
          cssText.includes(pseudo)
        )
      ) {
        let mirrored = cssText;
        for (const [pseudo, forcedAttribute] of Object.entries(
          PSEUDO_TO_FORCED_ATTRIBUTE
        )) {
          mirrored = mirrored.replaceAll(pseudo, forcedAttribute);
        }
        out.push(mirrored);
      }
    } else if ('cssRules' in rule) {
      const inner: string[] = [];
      collectMirroredRules((rule as CSSGroupingRule).cssRules, inner);
      if (inner.length) {
        out.push(
          `${(rule as CSSRule).cssText.split('{')[0]}{ ${inner.join(' ')} }`
        );
      }
    }
  }
}

function mirrorPseudoClassRules(sheet: CSSStyleSheet): CSSStyleSheet | null {
  const rules: string[] = [];
  collectMirroredRules(sheet.cssRules, rules);
  if (!rules.length) {
    return null;
  }
  const mirror = new CSSStyleSheet();
  rules.forEach((rule, index) => mirror.insertRule(rule, index));
  return mirror;
}

function augmentShadowRoot(root: ShadowRoot): void {
  if (augmentedRoots.has(root)) {
    return;
  }
  augmentedRoots.add(root);
  const mirrors = root.adoptedStyleSheets
    .map((sheet) => {
      if (!mirrorCache.has(sheet)) {
        mirrorCache.set(sheet, mirrorPseudoClassRules(sheet));
      }
      return mirrorCache.get(sheet) ?? null;
    })
    .filter((sheet): sheet is CSSStyleSheet => sheet !== null);
  if (mirrors.length) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...mirrors];
  }
}

// Global-element styles (e.g. global-button.css) apply via a real page-level
// stylesheet in `document.styleSheets`, not a shadow root's adopted
// stylesheets, so they need a separate mirroring pass injected as a <style>
// element rather than an adopted sheet.
function augmentDocument(): void {
  if (documentAugmented) {
    return;
  }
  documentAugmented = true;
  const rules: string[] = [];
  for (const sheet of document.styleSheets) {
    try {
      collectMirroredRules(sheet.cssRules, rules);
    } catch {
      // Cross-origin stylesheets throw on cssRules access; nothing we can do.
      continue;
    }
  }
  if (!rules.length) {
    return;
  }
  const style = document.createElement('style');
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
}

/**
 * Forces `state`'s visual appearance on `host`. Call after `host` has rendered (its
 * styles must already be in place — true as soon as the element is connected and
 * updated).
 *
 * Some components style pseudo-states on an internal shadow part (e.g. Button's
 * `.swc-Button:hover`) — pass `internalSelector` for those, and the forced attribute
 * is added there instead. Others style pseudo-states directly on `:host()` (e.g. Tab's
 * `:host(:hover)`) — omit `internalSelector` and the attribute is added to `host`
 * itself. Either way, the mirrored rule lives in the *same* shadow root's adopted
 * stylesheets, so `:host(:hover)` naturally still matches against `host`'s own
 * attributes even though the rule was defined inside its own shadow tree.
 *
 * Plain elements with no shadow root (e.g. native `<a>`/`<button>` styled via
 * global-button.css's classes) are mirrored from `document.styleSheets`
 * instead, and the forced attribute is always added to `host` itself —
 * `internalSelector` doesn't apply there.
 */
export function forcePseudoState(
  host: Element,
  state: ForcedPseudoState,
  internalSelector?: string
): void {
  if (!host.shadowRoot) {
    augmentDocument();
    host.setAttribute(`data-forced-${state}`, '');
    return;
  }
  augmentShadowRoot(host.shadowRoot);
  const target = internalSelector
    ? host.shadowRoot.querySelector(internalSelector)
    : host;
  target?.setAttribute(`data-forced-${state}`, '');
}
