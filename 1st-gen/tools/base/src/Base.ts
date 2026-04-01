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

import { SpectrumElement as CoreSpectrumElement } from '@spectrum-web-components/core/element/spectrum-element.js';

import { coreVersion, version } from './version.js';

export {
  type SpectrumInterface,
  SpectrumMixin,
} from '@spectrum-web-components/core/element/spectrum-element.js';

/**
 * Base class for 1st-gen Spectrum Web Components.
 * Extends the core SpectrumElement with 1st-gen specific version information.
 */
export class SpectrumElement extends CoreSpectrumElement {
  /**
   * The version of the 1st-gen Spectrum Web Components library.
   */
  static override VERSION = version;

  /**
   * The version of the core base package.
   */
  static override CORE_VERSION = coreVersion;

  /**
   * 1st-gen override that preserves the `.focus-visible` polyfill fallback
   * and full ancestor traversal for older browser support.
   *
   * The 2nd-gen core version was simplified to only use native
   * `:focus-visible` (supported by all target browsers). This override
   * retains the legacy behavior for 1st-gen components that may still
   * run in environments needing the polyfill.
   */
  public override hasVisibleFocusInTree(): boolean {
    const getAncestors = (root: Document = document): HTMLElement[] => {
      let currentNode = root.activeElement as HTMLElement;
      while (currentNode?.shadowRoot && currentNode.shadowRoot.activeElement) {
        currentNode = currentNode.shadowRoot.activeElement as HTMLElement;
      }
      const ancestors: HTMLElement[] = currentNode ? [currentNode] : [];
      while (currentNode) {
        const ancestor =
          currentNode.assignedSlot ||
          currentNode.parentElement ||
          (currentNode.getRootNode() as ShadowRoot)?.host;
        if (ancestor) {
          ancestors.push(ancestor as HTMLElement);
        }
        currentNode = ancestor as HTMLElement;
      }
      return ancestors;
    };
    const activeElement = getAncestors(this.getRootNode() as Document)[0];
    if (!activeElement) {
      return false;
    }
    return (
      activeElement.matches(':focus-visible') ||
      activeElement.matches('.focus-visible')
    );
  }
}
