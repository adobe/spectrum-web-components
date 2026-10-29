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
 * Helpers for the Theme toolbar global (`light`, `dark`, or `adaptive`),
 * shared by the Storybook manager, docs pages, and stories. This module has
 * no Storybook imports, so story decorators can use it under Vitest.
 */

export type ColorScheme = 'light' | 'dark';

const THEME_CLASSES = [
  'swc-theme--light',
  'swc-theme--dark',
  'swc-theme--adaptive',
];

const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Returns the color scheme that a Theme toolbar value renders in.
 * `adaptive` follows the OS setting.
 */
export const resolveColorScheme = (theme: string | undefined): ColorScheme =>
  theme === 'dark' || (theme === 'adaptive' && darkSchemeQuery.matches)
    ? 'dark'
    : 'light';

/**
 * Calls `callback` whenever the OS color scheme changes. Returns a function
 * that removes the listener.
 */
export const onPreferredColorSchemeChange = (
  callback: () => void
): (() => void) => {
  darkSchemeQuery.addEventListener('change', callback);
  return () => darkSchemeQuery.removeEventListener('change', callback);
};

/**
 * Applies the `.swc-theme--*` class for a Theme toolbar value, which sets
 * the `color-scheme` that every color token resolves against.
 */
export const applyThemeClass = (element: Element, theme: string): void => {
  element.classList.remove(...THEME_CLASSES);
  element.classList.add(`swc-theme--${theme}`);
};
