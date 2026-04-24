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
import { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

export const ELEMENT_SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type ElementSize = (typeof ELEMENT_SIZES)[number];

export const DEFAULT_ELEMENT_SIZES = [
  's',
  'm',
  'l',
  'xl',
] as const satisfies readonly ElementSize[];
export type DefaultElementSize = (typeof DEFAULT_ELEMENT_SIZES)[number];

export interface SizedElementInterface {
  size: ElementSize;
}

export interface SizedElementConstructor {
  readonly VALID_SIZES: readonly ElementSize[];
}

export function SizedMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  {
    validSizes = [...DEFAULT_ELEMENT_SIZES],
    noDefaultSize,
    defaultSize = 'm',
  }: {
    validSizes?: readonly ElementSize[];
    noDefaultSize?: boolean;
    defaultSize?: ElementSize;
  } = {}
): T & Constructor<SizedElementInterface> & SizedElementConstructor {
  class SizedElement extends constructor {
    /**
     * @internal
     */
    static readonly VALID_SIZES: readonly ElementSize[] = validSizes;

    @property({ type: String })
    public get size(): ElementSize {
      return this._size || defaultSize;
    }

    public set size(value: ElementSize) {
      const fallbackSize = noDefaultSize ? null : defaultSize;
      const size = (value ? value.toLocaleLowerCase() : value) as ElementSize;
      const validSize = (
        validSizes.includes(size) ? size : fallbackSize
      ) as ElementSize;
      if (validSize) {
        this.setAttribute('size', validSize);
      }
      if (this._size === validSize) {
        return;
      }
      const oldSize = this._size;
      this._size = validSize;
      this.requestUpdate('size', oldSize);
    }

    private _size: ElementSize | null = defaultSize;

    protected override update(changes: PropertyValues): void {
      if (!this.hasAttribute('size') && !noDefaultSize) {
        this.setAttribute('size', this.size);
      }
      super.update(changes);
    }
  }
  return SizedElement;
}
