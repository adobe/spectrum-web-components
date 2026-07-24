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
 * Convert a PascalCase SWC React wrapper name to its kebab-case tag name.
 * e.g. "SpActionMenu" -> "sp-action-menu", "SpProgressBar" -> "sp-progress-bar"
 */
export function pascalToKebab(name: string): string {
  return name
    .replace(/([A-Z])/g, (match, char, index) =>
      index === 0 ? char.toLowerCase() : `-${char.toLowerCase()}`
    )
    .replace(/^sp-/, 'sp-');
}

/**
 * Convert a camelCase JSX prop name to its kebab-case HTML attribute equivalent.
 * e.g. "ariaLabel" -> "aria-label", "isDecorative" -> "is-decorative"
 */
export function camelToKebab(name: string): string {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * Check whether a kebab-case tag name is a recognized SWC element.
 */
export function isSwcTagName(tagName: string): boolean {
  return tagName.startsWith('sp-') || tagName === 'overlay-trigger';
}

/**
 * Check whether a JSX tag name looks like an SWC React wrapper (PascalCase starting with "Sp")
 * or a custom element used directly in JSX (kebab-case starting with "sp-").
 */
export function isSwcJsxTag(name: string): boolean {
  if (name.startsWith('sp-') || name === 'overlay-trigger') {
    return true;
  }
  if (/^Sp[A-Z]/.test(name)) {
    return true;
  }
  if (name === 'OverlayTrigger') {
    return true;
  }
  return false;
}

/**
 * Resolve a JSX tag name to its canonical kebab-case SWC tag name.
 * Handles both PascalCase wrappers and direct custom element usage.
 */
export function resolveJsxTagName(name: string): string {
  if (name.startsWith('sp-') || name === 'overlay-trigger') {
    return name;
  }
  if (name === 'OverlayTrigger') {
    return 'overlay-trigger';
  }
  return pascalToKebab(name);
}
