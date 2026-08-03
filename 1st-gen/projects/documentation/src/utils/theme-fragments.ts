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

import type {
  Color,
  Scale,
  SystemVariant,
} from '@spectrum-web-components/theme';

/**
 * Dynamically imports the CSS fragment module for a given color/scale +
 * system combination, registering it with `Theme` so any connected
 * `sp-theme` requesting that combination can find matching styles.
 */
export const lazyStyleFragment = (
  name: Color | Scale,
  system: SystemVariant
): void => {
  const fragmentName = `${name}-${system}`;
  switch (fragmentName) {
    case 'dark-spectrum':
      import('@spectrum-web-components/theme/theme-dark.js');
      break;
    case 'darkest-spectrum':
      import('@spectrum-web-components/theme/theme-dark.js');
      break;
    case 'light-spectrum':
      import('@spectrum-web-components/theme/theme-light.js');
      break;
    case 'lightest-spectrum':
      import('@spectrum-web-components/theme/theme-light.js');
      break;
    case 'medium-spectrum':
      import('@spectrum-web-components/theme/scale-medium.js');
      break;
    case 'large-spectrum':
      import('@spectrum-web-components/theme/scale-large.js');
      break;
    case 'dark-express':
      import('@spectrum-web-components/theme/express/theme-dark.js');
      break;
    case 'darkest-express':
      import('@spectrum-web-components/theme/express/theme-dark.js');
      break;
    case 'light-express':
      import('@spectrum-web-components/theme/express/theme-light.js');
      break;
    case 'lightest-express':
      import('@spectrum-web-components/theme/express/theme-light.js');
      break;
    case 'medium-express':
      import('@spectrum-web-components/theme/express/scale-medium.js');
      break;
    case 'large-express':
      import('@spectrum-web-components/theme/express/scale-large.js');
      break;
    case 'light-spectrum-two':
      import('@spectrum-web-components/theme/spectrum-two/theme-light-core-tokens.js');
      break;
    case 'dark-spectrum-two':
      import('@spectrum-web-components/theme/spectrum-two/theme-dark-core-tokens.js');
      break;
    case 'medium-spectrum-two':
      import('@spectrum-web-components/theme/spectrum-two/scale-medium-core-tokens.js');
      break;
    case 'large-spectrum-two':
      import('@spectrum-web-components/theme/spectrum-two/scale-large-core-tokens.js');
      break;
  }
};

export interface ThemeAttributeSource {
  getAttribute(name: string): string | null;
}

/**
 * Reads the `color`/`scale`/`system` attributes off a (real or fake)
 * `sp-theme` element and returns the fragment requests they imply,
 * applying the same `system` fallback `Theme` itself uses. Kept separate
 * from `preloadThemeFragments` so the attribute/fallback/branching logic
 * can be unit tested without a DOM.
 */
export const getThemeFragmentRequests = (
  themeEl: ThemeAttributeSource
): { name: Color | Scale; system: SystemVariant }[] => {
  const system = (themeEl.getAttribute('system') ||
    'spectrum') as SystemVariant;
  const color = themeEl.getAttribute('color') as Color | null;
  const scale = themeEl.getAttribute('scale') as Scale | null;
  const requests: { name: Color | Scale; system: SystemVariant }[] = [];
  if (color) {
    requests.push({ name: color, system });
  }
  if (scale) {
    requests.push({ name: scale, system });
  }
  return requests;
};

/**
 * Scans a snippet of markup for `sp-theme` elements and eagerly loads the
 * CSS fragments their `color`/`scale`/`system` attributes require. Without
 * this, a live demo's nested `sp-theme` (e.g. a `system="express"` example
 * on a page whose global theme picker is set to `spectrum`) silently falls
 * back to the outer theme's styles because its fragment was never imported.
 */
export const preloadThemeFragments = (html: string): void => {
  // Most demos don't declare a theme at all; skip parsing the markup for
  // them rather than paying for `createContextualFragment` on every demo.
  if (!html.includes('sp-theme')) {
    return;
  }
  const fragment = document.createRange().createContextualFragment(html);
  fragment.querySelectorAll('sp-theme').forEach((themeEl) => {
    getThemeFragmentRequests(themeEl).forEach(({ name, system }) =>
      lazyStyleFragment(name, system)
    );
  });
};
