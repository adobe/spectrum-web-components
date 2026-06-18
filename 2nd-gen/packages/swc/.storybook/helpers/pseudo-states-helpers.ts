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

import { augmentTree } from '../pseudo-states.js';

/** Interaction states used in testing-grid `data-vrt-state` wrappers. */
export type VrtInteractionState = 'default' | 'hover' | 'focus' | 'active';

type ForcedInteractionState = Exclude<VrtInteractionState, 'default'>;

/** Class names applied to the internal control; `focus` maps to `is-focus-visible`. */
const VRT_STATE_CLASS: Record<
  ForcedInteractionState,
  'is-hover' | 'is-focus-visible' | 'is-active'
> = {
  hover: 'is-hover',
  focus: 'is-focus-visible',
  active: 'is-active',
};

export type TestingGridPseudoStateOptions = {
  /** Extra custom-element tags to await in addition to `data-vrt-host` values in the grid. */
  hosts?: string[];
};

function getVrtHost(wrapper: Element): Element | null {
  const selector = wrapper.getAttribute('data-vrt-host');
  if (selector) {
    return wrapper.querySelector(selector);
  }
  return wrapper.firstElementChild;
}

function getVrtControl(wrapper: Element, host: Element): Element | null {
  const selector = wrapper.getAttribute('data-vrt-control');
  if (!selector) {
    return host;
  }

  return (
    host.shadowRoot?.querySelector(selector) ?? host.querySelector(selector)
  );
}

function collectVrtHostTags(
  root: ParentNode,
  extraHosts: string[] = []
): string[] {
  const tags = new Set(extraHosts);

  root.querySelectorAll('[data-vrt-host]').forEach((wrapper) => {
    const tag = wrapper.getAttribute('data-vrt-host');
    if (tag) {
      tags.add(tag);
    }
  });

  return [...tags];
}

/**
 * Applies forced pseudo-state classes for every `data-vrt-state` cell in a testing grid.
 * Each cell should declare `data-vrt-host` and `data-vrt-control` for its component.
 */
export function applyVrtGridPseudoStates(root: ParentNode): void {
  root.querySelectorAll('[data-vrt-state]').forEach((wrapper) => {
    const state = wrapper.getAttribute('data-vrt-state');
    if (!state || state === 'default' || !(state in VRT_STATE_CLASS)) {
      return;
    }

    const host = getVrtHost(wrapper);
    if (!host) {
      return;
    }

    const control = getVrtControl(wrapper, host);
    if (!control) {
      return;
    }

    control.classList.add(VRT_STATE_CLASS[state as ForcedInteractionState]);
  });
}

/**
 * Applies optional layout classes declared on a cell via `data-vrt-layout-classes`.
 * Use when slot detection or other async layout has not settled before VRT capture.
 */
export function applyVrtLayoutClasses(root: ParentNode): void {
  root.querySelectorAll('[data-vrt-layout-classes]').forEach((wrapper) => {
    const host = getVrtHost(wrapper);
    if (!host) {
      return;
    }

    const control = getVrtControl(wrapper, host);
    if (!control) {
      return;
    }

    const classes =
      wrapper
        .getAttribute('data-vrt-layout-classes')
        ?.split(/\s+/)
        .filter(Boolean) ?? [];

    for (const className of classes) {
      control.classList.add(className);
    }
  });
}

function collectVrtHostElements(root: ParentNode): Element[] {
  const hosts: Element[] = [];

  root.querySelectorAll('[data-vrt-host]').forEach((wrapper) => {
    const host = getVrtHost(wrapper);
    if (host) {
      hosts.push(host);
    }
  });

  return hosts;
}

type LitElementLike = HTMLElement & { updateComplete: Promise<boolean> };

function isLitElement(element: Element): element is LitElementLike {
  return 'updateComplete' in element;
}

async function waitForVrtHostsToUpdate(
  root: ParentNode,
  extraHosts: string[] = []
): Promise<void> {
  await Promise.all(
    collectVrtHostTags(root, extraHosts).map((tag) =>
      customElements.whenDefined(tag)
    )
  );

  await Promise.all(
    collectVrtHostElements(root).map((host) =>
      isLitElement(host) ? host.updateComplete : Promise.resolve()
    )
  );
}

type AugmentRoot = Document | ShadowRoot | Element;

function applyTestingGridPatches(root: ParentNode): void {
  augmentTree(asAugmentRoot(root));
  applyVrtGridPseudoStates(root);
  applyVrtLayoutClasses(root);
}

function asAugmentRoot(root: ParentNode): AugmentRoot {
  if (
    root instanceof Document ||
    root instanceof ShadowRoot ||
    root instanceof Element
  ) {
    return root;
  }
  return root as AugmentRoot;
}

function getStoryRoot(root: ParentNode): AugmentRoot {
  if (root instanceof Document) {
    return (
      root.getElementById('storybook-root') ??
      root.getElementById('root-inner') ??
      root.body
    );
  }
  return asAugmentRoot(root);
}

/**
 * Waits for VRT host elements to finish updating, then applies pseudo-state and layout classes.
 */
export async function applyTestingGridPseudoStatesToRoot(
  root: ParentNode = document,
  { hosts = [] }: TestingGridPseudoStateOptions = {}
): Promise<void> {
  const scope = getStoryRoot(root);
  await waitForVrtHostsToUpdate(scope, hosts);
  applyTestingGridPatches(scope);
}

/**
 * Schedules pseudo-state patching after the current story's VRT hosts settle.
 * Prefer `applyTestingGridPseudoStatesToRoot` when you can await the result.
 */
export function scheduleTestingGridPseudoStates(
  root: ParentNode = document,
  options: TestingGridPseudoStateOptions = {}
): void {
  void applyTestingGridPseudoStatesToRoot(root, options);
}

/**
 * Augments shadow stylesheets and applies testing-grid pseudo-state / layout classes.
 * Use as the `play` function for VRT grid stories.
 */
export async function applyTestingGridPseudoStates(
  canvasElement: HTMLElement,
  options: TestingGridPseudoStateOptions = {}
): Promise<void> {
  const root =
    canvasElement.querySelector('[data-testing-preview]') ?? canvasElement;

  await applyTestingGridPseudoStatesToRoot(root, options);
}
