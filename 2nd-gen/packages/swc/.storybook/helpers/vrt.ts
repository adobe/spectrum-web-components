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

import { html } from 'lit';
import { expect } from '@storybook/test';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { staticColorSettings } from '../decorators/static-colors-demo.js';
import { type ForcedPseudoState, forcePseudoState } from './pseudo-state.js';

type CssPropertyManifest = {
  modules: Array<{
    path: string;
    declarations: Array<{
      name: string;
      cssProperties?: Array<{ name: string }>;
    }>;
  }>;
};

export type CustomPropertyCase<Property extends `--${string}` = `--${string}`> =
  {
    property: Property;
    value: string;
  };

export const FORCED_STATES = [
  'hover',
  'focus-visible',
  'active',
] as const satisfies readonly ForcedPseudoState[];

export const renderStorybookPermutation = (
  tagName: string,
  fixedArgs: Record<string, unknown> = {}
) => {
  const { args, template } = getStorybookHelpers(tagName);

  return (permutation: Record<string, unknown>) =>
    template({ ...args, ...permutation, ...fixedArgs });
};

export const forcePseudoStates =
  (selector: string, internalSelector?: string) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    canvasElement.querySelectorAll<HTMLElement>(selector).forEach((host) => {
      const state = host.dataset.forceState as ForcedPseudoState | undefined;
      if (state) {
        forcePseudoState(host, state, internalSelector);
      }
    });
  };

/**
 * Forces a group of native `popover="auto"` elements (Tooltip, default-mode
 * Popover) to render simultaneously open in a single VRT snapshot.
 *
 * `popover="auto"` elements share one top-layer dismissal group: opening one
 * that is not a DOM/anchor descendant of another open auto popover
 * light-dismisses that other popover, and these components' own `toggle`
 * listeners sync `open` back to `false` to match. A VRT story that renders
 * several open instances side by side (every Tooltip placement, every
 * Popover variant) would therefore only ever show the *last* instance
 * connected as actually open — every earlier instance silently closes itself
 * during initial render, well before Chromatic snapshots it.
 *
 * `popover="manual"` has no such cross-instance dismissal. This play function
 * switches each instance to manual mode after render, then re-toggles its
 * `open` property (through the component's own public API, not the native
 * Popover API directly) so the component's real open/close lifecycle
 * — placement, ARIA wiring, `showPopover()` — runs again under the new,
 * non-dismissing mode. This is a VRT-only workaround: production usage
 * should keep the default `auto` mode and its native light-dismiss behavior.
 *
 * @param selector - selects the host elements whose `open` property should
 * be re-toggled.
 * @param resolvePopoverElement - resolves the element that actually carries
 * the `popover` attribute for a given host. Defaults to the host itself
 * (e.g. Tooltip, which sets `popover` on its own host). Pass an override for
 * components whose popover lives on an internal shadow element instead (e.g.
 * Popover's default-mode `.swc-Popover` shadow child).
 */
export const forceManualPopover =
  (
    selector: string,
    resolvePopoverElement: (host: Element) => Element | null = (host) => host
  ) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    canvasElement
      .querySelectorAll<HTMLElement & { open?: boolean }>(selector)
      .forEach((host) => {
        resolvePopoverElement(host)?.setAttribute('popover', 'manual');
        if (typeof host.open === 'boolean') {
          host.open = false;
          host.open = true;
        }
      });
  };

export const vrtParameters = {
  styles: {
    display: 'flex',
    'flex-direction': 'column',
    gap: 'var(--swc-spacing-500)',
  },
  autoplay: true,
};

export const forcedColorsVrtParameters = {
  ...vrtParameters,
  chromatic: { forcedColors: 'active' },
};

/**
 * Wraps a set of permutations in a single flex-wrap row. Stack multiple
 * `row()` calls inside a VRT story to group permutations (e.g. one row per
 * variant, one column per size) without needing every combination to be its
 * own story/snapshot.
 */
export const row = (children: unknown, label?: string) =>
  label
    ? html`
        <div
          style="display: flex; flex-direction: column; gap: var(--swc-spacing-100);"
        >
          <span class="swc-Detail swc-Detail--sizeM">${label}</span>
          <div
            style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-400); align-items: center;"
          >
            ${children}
          </div>
        </div>
      `
    : html`
        <div
          style="display: flex; flex-wrap: wrap; gap: var(--swc-spacing-400); align-items: center;"
        >
          ${children}
        </div>
      `;

/**
 * Partitions permutations by the value of `key` (e.g. 'variant') so each
 * group can render as its own labeled `row()`, making a dense matrix easier
 * to scan by variant. Permutations without the key fall into a 'default'
 * group. Preserves first-seen order.
 */
export const groupPermutationsBy = <
  Permutation extends Record<string, unknown>,
>(
  permutations: readonly Permutation[],
  key: string
): Array<[label: string, permutations: Permutation[]]> => {
  const groups = new Map<string, Permutation[]>();
  for (const permutation of permutations) {
    const label = key in permutation ? String(permutation[key]) : 'default';
    const group = groups.get(label);
    if (group) {
      group.push(permutation);
    } else {
      groups.set(label, [permutation]);
    }
  }
  return [...groups.entries()];
};

export const customPropertyRows = <Case extends CustomPropertyCase>(
  cases: readonly Case[],
  renderCase: (testCase: Case, style?: string) => unknown
) =>
  cases.map((testCase) =>
    row(
      [
        renderCase(testCase),
        renderCase(testCase, `${testCase.property}: ${testCase.value};`),
      ],
      testCase.property
    )
  );

export const coveredCustomProperties = (cases: readonly CustomPropertyCase[]) =>
  cases.map(({ property }) => property).sort();

export const verifyCustomPropertyCoverage = async ({
  customElementsManifest,
  modulePath,
  declarationName,
  coveredProperties,
}: {
  customElementsManifest: CssPropertyManifest;
  modulePath: string;
  declarationName: string;
  coveredProperties: readonly string[];
}) => {
  const documentedProperties = customElementsManifest.modules
    .find(({ path }) => path === modulePath)
    ?.declarations.find(({ name }) => name === declarationName)
    ?.cssProperties?.map(({ name }) => name)
    .sort();

  await expect(documentedProperties?.length).toBeGreaterThan(0);
  await expect(coveredProperties).toHaveLength(new Set(coveredProperties).size);
  await expect(coveredProperties).toEqual(
    expect.arrayContaining(documentedProperties ?? [])
  );
};

/**
 * Wraps content so it renders in a given theme/direction regardless of the
 * Storybook toolbar's global theme/lang. `.swc-theme--{mode}` only sets
 * `color-scheme`, which every token resolves via `light-dark()`; `dir` is a
 * plain HTML attribute. Both are inherited properties, so this works even
 * across the shadow boundary without needing the toolbar globals. Also
 * stacks its children (e.g. multiple `row()` groups) vertically with a gap,
 * since it already wraps everything a VRT story renders.
 *
 * Sets `color` as well as `background-color`: SWC intentionally never sets a
 * page-level default text color (that's left to the consuming app, same as
 * background), so plain slotted content (e.g. TabPanel's text) has nothing
 * to inherit and stays illegible-dark-on-dark without this.
 */
export const theme = (
  children: unknown,
  mode: 'light' | 'dark' | 'adaptive',
  dir: 'ltr' | 'rtl' = 'ltr'
) => html`
  <div
    class="swc-theme--${mode}"
    dir=${dir}
    style="display: flex; flex-direction: column; gap: 16px; padding: 16px; background-color: var(--swc-background-base-color); color: var(--swc-neutral-content-color-default);"
  >
    ${children}
  </div>
`;

/**
 * Wraps a group of static-color="white"/"black" permutations in the matching
 * contrast background, so they render correctly outside of the docs-only
 * `staticColorsDemo` decorator (which only targets a story's top-level
 * children, and can't compose with `theme()` wrapping the whole story too).
 *
 * Stacks its children in a column so multiple `row()` groups read top to
 * bottom, and overrides `--swc-detail-font-color` to `currentColor` so
 * `swc-Detail` row labels inherit the background's contrast color instead of
 * the muted default token (which is illegible on the dark/light gradient).
 */
export const staticColorBackground = (
  children: unknown,
  staticColor: 'white' | 'black'
) => html`
  <div
    style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; padding: 24px; background: ${staticColorSettings[
      staticColor
    ]}; color: ${staticColor === 'white'
      ? 'white'
      : 'black'}; --swc-detail-font-color: currentColor;"
  >
    ${children}
  </div>
`;
