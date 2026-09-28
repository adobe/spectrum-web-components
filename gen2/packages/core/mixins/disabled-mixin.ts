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

import type { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

export interface DisabledInterface {
  disabled: boolean;
}

/**
 * A mixin that adds a reactive `disabled` property with associated
 * accessibility behavior.
 *
 * Sets `aria-disabled` on the host (not the native `disabled` attribute)
 * so the element remains discoverable by assistive technology. Components
 * wrapping native form controls (e.g., `<input>`, `<button>`) should also
 * set `disabled` on the inner element in their `render()` method.
 *
 * @see https://kittygiraudel.com/2024/03/29/on-disabled-and-aria-disabled-attributes/
 *
 * @example
 * ```typescript
 * class MyButton extends DisabledMixin(SpectrumElement) {
 *   override render() {
 *     return html`<button ?disabled=${this.disabled}><slot></slot></button>`;
 *   }
 * }
 * ```
 */
export function DisabledMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<DisabledInterface> {
  class DisabledElement extends constructor {
    @property({ type: Boolean, reflect: true })
    disabled = false;

    private prevTabindex: string | undefined;

    /**
     * Uses `update()` (not `updated()`) so side effects apply BEFORE render.
     * Using `updated()` would leave a single frame where the component
     * renders as enabled but is behaviorally disabled, allowing the element
     * to be briefly focusable/clickable.
     */
    protected override update(changedProperties: PropertyValues): void {
      if (changedProperties.has('disabled')) {
        if (this.disabled) {
          // Host gets aria-disabled for screen reader discoverability.
          // Components wrapping native form controls should ALSO set
          // disabled on the inner element in render().
          this.setAttribute('aria-disabled', 'true');
          if (this.hasAttribute('tabindex')) {
            this.prevTabindex = this.getAttribute('tabindex')!;
            this.setAttribute('tabindex', '-1');
          }
          if (this.matches(':focus-within')) {
            (this.shadowRoot?.activeElement as HTMLElement)?.blur();
          }
        } else {
          this.removeAttribute('aria-disabled');
          if (this.prevTabindex !== undefined) {
            this.setAttribute('tabindex', this.prevTabindex);
            this.prevTabindex = undefined;
          }
        }
      }
      super.update(changedProperties);
    }
  }
  return DisabledElement as unknown as T & Constructor<DisabledInterface>;
}
