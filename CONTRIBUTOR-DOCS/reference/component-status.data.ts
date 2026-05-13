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
 * Override data for the component status matrix at
 * `.storybook/docs/reference/component-status.mdx`.
 *
 * Source of truth notes:
 *
 * - `Component` and `tagName` come from the CEM manifest (custom-elements.json)
 *   built from each component's class JSDoc.
 * - `Status` and `Since` are pulled from the CEM declaration's `status` and
 *   `since` fields (populated by the `statusPlugin` in `cem.config.js`).
 * - `RSP 2 parity`, `Figma`, `Stackblitz`, and `Notes` are NOT in the CEM and
 *   live in this file. Default values come from `defaults` below; explicit
 *   overrides are keyed by the component's short name (the part after `swc-`).
 *
 * Audit-friendly editing:
 *
 * - Each override is one block in this file. Edit alongside the rest of a
 *   component PR or land standalone updates here.
 * - The TypeScript types guard against typos in parity values; the linter
 *   guards against typos in component short-names if we add stricter typing
 *   later (e.g. a union of known names).
 *
 * Parity definition: measured against React Spectrum 2, not against 1st-gen SWC.
 */

export type Parity = 'full' | 'partial' | 'none';

export type ComponentOverride = {
  /**
   * Coverage relative to React Spectrum 2's component of the same name.
   * Use a string when the answer doesn't fit `full | partial | none` (rare;
   * prefer one of the three enum values).
   */
  parity?: Parity | string;
  /** Figma frame URL for the component's design source. */
  figma?: string;
  /** StackBlitz starter URL. */
  stackblitz?: string;
  /** Free-text qualifier; surfaces in the Notes column of the matrix. */
  notes?: string;
};

/**
 * Defaults applied to every component when no per-component override is
 * provided. Edit defaults sparingly — most fields should be component-specific.
 */
export const defaults: Required<ComponentOverride> = {
  parity: 'partial',
  figma: '',
  stackblitz: '',
  notes: '',
};

/**
 * Per-component overrides. Key by the component short-name (the part after
 * `swc-`, e.g. `badge` for `swc-badge`).
 *
 * Add entries lazily — components without an entry inherit `defaults`.
 */
export const components: Record<string, ComponentOverride> = {
  badge: {
    parity: 'full',
    notes: 'Stable component shape; public API frozen.',
  },
  'color-loupe': {
    parity: 'partial',
    notes: 'Migrated in #6184; design parity tracked against the Spectrum 2 spec.',
  },
  // Add other components as their parity/Figma/StackBlitz/Notes information becomes available.
  // Example template:
  //   '<short-name>': {
  //     parity: 'full' | 'partial' | 'none' | '<custom string>',
  //     figma: 'https://www.figma.com/file/...',
  //     stackblitz: 'https://stackblitz.com/edit/...',
  //     notes: 'Short qualifier or call-out.',
  //   },
};
