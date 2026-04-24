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

import { useOf } from '@storybook/addon-docs/blocks';
import type {
  CustomElement,
  Declaration,
  Package,
} from 'custom-elements-manifest/schema';
import type React from 'react';

// ────────────────────────────
//   CEM types + globals
// ────────────────────────────

declare global {
  interface Window {
    __STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__?: Package;
  }
}

/**
 * Subset of the CEM declaration fields we add via `swcJsdocTagsPlugin`
 * in `cem.config.js`. Narrowly typed so blocks get autocomplete without
 * re-declaring the plugin's shape inline.
 */
export interface SwcExtendedDeclaration {
  summary?: string;
  genre?: string;
  category?: string;
  related?: string[];
  RSPparity?: string;
  a11yPattern?: string;
  deprecated?: DeprecatedInfo | string | boolean;
}

export interface DeprecatedInfo {
  reason: string;
  since?: string;
  replacedBy?: string;
}

export type SwcCustomElement = Declaration &
  CustomElement &
  SwcExtendedDeclaration;

// ────────────────────────────
//   CEM lookup
// ────────────────────────────

export function findComponent(
  cem: Package,
  tagName: string
): SwcCustomElement | undefined {
  for (const mod of cem.modules) {
    for (const decl of mod.declarations ?? []) {
      if ('tagName' in decl && decl.tagName === tagName) {
        return decl as SwcCustomElement;
      }
    }
  }
  return undefined;
}

/**
 * Resolve the CEM declaration that corresponds to the current story's
 * `meta.component` tag name. Returns `undefined` if the CEM hasn't been
 * set on `window` (dev-mode transient) or the tag name isn't in the
 * manifest.
 */
export function useStoryComponent(): SwcCustomElement | undefined {
  const resolvedOf = useOf('meta', ['meta']);
  const meta = resolvedOf.csfFile?.meta as { component?: string } | undefined;
  const tagName = meta?.component;

  const cem = window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
  if (!cem || !tagName) {
    return undefined;
  }

  return findComponent(cem, tagName);
}

// ────────────────────────────
//   Shared table styles
// ────────────────────────────

export const scrollStyle: React.CSSProperties = {
  overflowX: 'auto',
  width: '100%',
};

export const tableStyle: React.CSSProperties = {
  width: '100%',
};
