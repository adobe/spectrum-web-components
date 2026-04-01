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

// Inspired from https://github.com/focus-trap/tabbable/blob/8acf516c29da42c928753950210b07ac32efc724/src/index.js#L6
const focusables = [
  'input:not([inert])',
  'select:not([inert])',
  'textarea:not([inert])',
  'a[href]:not([inert])',
  'button:not([inert])',
  'label:not([inert])',
  '[tabindex]:not([inert])',
  'audio[controls]:not([inert])',
  'video[controls]:not([inert])',
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  'details>summary:first-of-type:not([inert])',
  'details:not([inert])',
  '[focusable]:not([focusable="false"])', // custom dev use-case
];

const userFocusable = ':not([tabindex="-1"])';

export const userFocusableSelector =
  focusables.join(`${userFocusable}, `) + userFocusable;

export const focusableSelector = focusables.join(', ');

export const firstFocusableIn = (
  root: HTMLElement | ShadowRoot
): HTMLElement | null => {
  return root.querySelector(userFocusableSelector);
};

export const firstFocusableSlottedIn = (
  root: HTMLSlotElement
): HTMLElement | null => {
  return (
    (root
      .assignedElements()
      .find((element) =>
        element.matches(userFocusableSelector)
      ) as HTMLElement) ?? null
  );
};
