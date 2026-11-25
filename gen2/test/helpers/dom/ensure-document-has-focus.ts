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
 * Activates the canvas element's owning document once and verifies focus.
 *
 * @param canvasElement - Element in the document to activate
 * @throws When the document has no window or does not receive focus
 */
export function ensureDocumentHasFocus(canvasElement: HTMLElement): void {
  const document = canvasElement.ownerDocument;
  const view = document.defaultView;
  if (!view) {
    throw new Error(
      'Cannot ensure document focus: owning document has no window.'
    );
  }
  view.focus();
  if (!document.hasFocus()) {
    throw new Error(
      'The test document did not receive focus after window.focus().'
    );
  }
}
