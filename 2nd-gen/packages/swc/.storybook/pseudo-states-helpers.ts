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

import { augmentTree } from './pseudo-states.js';

export type PseudoState =
  | 'hover'
  | 'focus-visible'
  | 'active'
  | 'focus'
  | 'disabled';

/** Interaction states used in testing-grid `data-vrt-state` wrappers. */
export type ButtonVrtState = 'default' | 'hover' | 'focus' | 'active';

const VRT_STATE_CLASS: Record<
  Exclude<ButtonVrtState, 'default'>,
  `is-${PseudoState}`
> = {
  hover: 'is-hover',
  focus: 'is-focus-visible',
  active: 'is-active',
};

/**
 * Applies a forced pseudo-state class to an inner element inside an open shadow root.
 */
export function applyPseudoState(
  canvasElement: ParentNode,
  hostSelector: string,
  innerSelector: string,
  state: PseudoState
): void {
  const host = canvasElement.querySelector(hostSelector);
  host?.shadowRoot?.querySelector(innerSelector)?.classList.add(`is-${state}`);
}

function getInternalButton(host: Element): HTMLButtonElement | null {
  return host.shadowRoot?.querySelector('.swc-Button') ?? null;
}

/**
 * Applies forced pseudo-state classes for every `data-vrt-state` cell in a testing grid.
 * Call from a story `play` function after `augmentTree` has run.
 */
export function applyVrtGridPseudoStates(root: ParentNode): void {
  root.querySelectorAll('[data-vrt-state]').forEach((wrapper) => {
    const state = wrapper.getAttribute('data-vrt-state');
    if (!state || state === 'default' || !(state in VRT_STATE_CLASS)) {
      return;
    }

    const host = wrapper.querySelector('swc-button');
    if (!host) {
      return;
    }

    const button = getInternalButton(host);
    if (!button) {
      return;
    }

    button.classList.add(
      VRT_STATE_CLASS[state as Exclude<ButtonVrtState, 'default'>]
    );
  });
}

/**
 * Forces icon-only layout classes when slot detection has not settled before capture.
 */
export function applyVrtIconOnlyLayout(root: ParentNode): void {
  root.querySelectorAll('.vrt-icon-only-cell').forEach((wrapper) => {
    const host = wrapper.querySelector('swc-button');
    if (!host) {
      return;
    }

    const button = getInternalButton(host);
    if (!button) {
      return;
    }

    button.classList.add('swc-Button--hasIcon', 'swc-Button--iconOnly');
  });
}

function getStoryRoot(root: ParentNode): ParentNode {
  if (root instanceof Document) {
    return (
      root.getElementById('storybook-root') ??
      root.getElementById('root-inner') ??
      root.body
    );
  }
  return root;
}

/**
 * Re-applies pseudo-state classes after Lit renders and slot detection settle.
 * Lit re-renders wipe one-shot class patches on the internal `.swc-Button`.
 */
export function scheduleTestingGridPseudoStates(
  root: ParentNode = document
): void {
  const scope = getStoryRoot(root);

  const run = (): void => {
    augmentTree(scope);
    applyVrtGridPseudoStates(scope);
    applyVrtIconOnlyLayout(scope);
  };

  run();
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });

  for (const delay of [0, 50, 150, 500]) {
    setTimeout(run, delay);
  }
}

/**
 * Augments shadow stylesheets and applies testing-grid pseudo-state / icon-only classes.
 * Use as the `play` function for VRT grid stories.
 */
export async function applyTestingGridPseudoStates(
  canvasElement: HTMLElement
): Promise<void> {
  await customElements.whenDefined('swc-button');
  const root =
    canvasElement.querySelector('[data-testing-preview]') ?? canvasElement;
  scheduleTestingGridPseudoStates(root);
  // Allow the final scheduled pass to run before Chromatic captures.
  await new Promise((resolve) => setTimeout(resolve, 550));
}
