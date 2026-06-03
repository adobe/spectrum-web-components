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

import type { LitElement } from 'lit';

export interface ConstrainedSlotOptions {
  /**
   * Lowercase tag names that are valid in this slot.
   *
   * @example ['swc-button'] or ['h2', 'h3', 'h4', 'h5', 'h6']
   */
  allowed: readonly string[];

  /**
   * The slot name to query. Omit for the default (unnamed) slot.
   */
  slot?: string;

  /**
   * Documentation URL included in dev-mode warning messages so consumers
   * can find usage guidance quickly.
   *
   * @example 'https://spectrum-web-components.adobe.com/?path=/docs/components-button-group--docs'
   */
  docsUrl?: string;
}

/**
 * Declares a property that returns all elements assigned to a slot,
 * filtered to the tag names listed in `allowed`. In DEBUG mode, emits a
 * `window.__swc.warn` for every element outside the allowed list.
 *
 * The returned array is always safe to iterate — invalid elements are
 * excluded rather than passed through.
 *
 * Mirrors the Lit `@queryAssignedElements` pattern but adds runtime slot
 * constraint validation. The companion CEM plugin (`cem-plugin-constrained-slot`
 * in `cem.config.js`) reads the decorator at build time and annotates the
 * corresponding slot entry with `allowedElements` in the manifest.
 */
export function constrainedSlot(options: ConstrainedSlotOptions) {
  return (proto: object, name: string | symbol): void => {
    Object.defineProperty(proto, name, {
      get(this: LitElement): Element[] {
        const slotSelector = options.slot
          ? `slot[name="${options.slot}"]`
          : 'slot:not([name])';

        const slot =
          this.renderRoot?.querySelector<HTMLSlotElement>(slotSelector);
        if (!slot) {
          return [];
        }

        const assigned = slot.assignedElements();

        if (window.__swc?.DEBUG) {
          const slotLabel = options.slot ? `"${options.slot}"` : 'default';
          const allowedList = options.allowed.join(', ');
          const verb = options.allowed.length === 1 ? 'is' : 'are';

          for (const el of assigned) {
            if (!options.allowed.includes(el.localName)) {
              window.__swc.warn(
                this,
                `<${this.localName}> received an invalid <${el.localName}> element in the ${slotLabel} slot. Only ${allowedList} ${verb} allowed.`,
                options.docsUrl ?? '',
                { issues: [`${slotLabel} slot: <${el.localName}>`] }
              );
            }
          }
        }

        return assigned.filter((el) => options.allowed.includes(el.localName));
      },
      enumerable: false,
      configurable: true,
    });
  };
}
