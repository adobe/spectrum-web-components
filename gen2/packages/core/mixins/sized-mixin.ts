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

import {
  componentDocsHref,
  resolveEnum,
  validateEnum,
} from '../utils/index.js';

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

  /**
   * @internal
   *
   * The size used for rendering and for passing to child elements: `size`
   * when it's one of the class's valid sizes, otherwise the default.
   */
  readonly resolvedSize: ElementSize;
}

export interface SizedElementConstructor {
  readonly VALID_SIZES: readonly ElementSize[];
  readonly NO_DEFAULT_SIZE: boolean;
}

/**
 * Mixes size-awareness into a Lit `ReactiveElement` subclass.
 *
 * ## Why NO_DEFAULT_SIZE is a static rather than a closure variable
 *
 * The original implementation captured `noDefaultSize` in a closure at call
 * time. That works when a component applies SizedMixin directly to a plain
 * base (e.g. `SizedMixin(SpectrumElement, { noDefaultSize: true })`), but
 * breaks silently when a component extends a base that is already SizedMixin'd.
 *
 * Consider InfieldButton extending ButtonBase:
 *   - ButtonBase = SizedMixin(SpectrumElement, {}) — closure captures noDefaultSize=false
 *   - InfieldButtonBase extends ButtonBase
 *
 * Even if a second SizedMixin wrapper is applied with noDefaultSize=true, calling
 * super.update() reaches the inner ButtonBase SizedMixin, whose update() still
 * reads noDefaultSize=false from its closure and writes size="m" to the DOM.
 * Likewise, when a parent calls removeAttribute('size'), the inherited setter
 * reads the inner closure's fallbackSize='m' and immediately re-sets the attribute.
 *
 * Making NO_DEFAULT_SIZE a static property solves both problems: the setter and
 * update() read this.constructor.NO_DEFAULT_SIZE, which follows the prototype
 * chain to the leaf class. A subclass like InfieldButtonBase only needs to
 * declare `static override readonly NO_DEFAULT_SIZE = true` — no mixin
 * re-wrapping, no lifecycle interception, and the correct value is read by every
 * SizedMixin layer in the chain.
 *
 * ## Invalid sizes
 *
 * A size that isn't one of the class's `VALID_SIZES`, including a different
 * letter case such as `"M"`, is kept on the property and the attribute as set
 * and warns in dev mode. Rendering reads `resolvedSize`, which resolves it to
 * the default; stylesheets that select on the attribute apply their default
 * because the value matches no `:host([size="…"])` selector. An empty
 * attribute (`size=""`) is invalid too; only a removed attribute is unset.
 */
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

    /**
     * When true, the component does not auto-reflect a default size attribute.
     * The parent is expected to supply the size. Subclasses of an already-sized
     * base (e.g. InfieldButtonBase extends ButtonBase) can override this static
     * to opt out of the inherited base's auto-set behavior without re-wrapping
     * the mixin.
     *
     * @internal
     */
    static readonly NO_DEFAULT_SIZE: boolean = noDefaultSize ?? false;

    /**
     * The size of the element. An invalid value is kept as set and warns in
     * dev mode; rendering reads `resolvedSize`.
     */
    @property({ type: String })
    public get size(): ElementSize {
      return this._size ?? defaultSize;
    }

    public set size(value: ElementSize | null) {
      const sizedConstructor = this
        .constructor as unknown as SizedElementConstructor;
      // A removed attribute (or `null`) is the unset case: it resets to the
      // default, or stays unset for classes whose parent supplies the size.
      const size =
        value ?? (sizedConstructor.NO_DEFAULT_SIZE ? null : defaultSize);
      // Reflect the value as set, without correcting it, so the attribute
      // and the property always agree (including an empty string). When the
      // change came from the attribute, this rewrites the same text, and Lit
      // ignores the nested attribute callback.
      if (size !== null) {
        this.setAttribute('size', size);
      }
      if (this._size === size) {
        return;
      }
      const oldSize = this._size;
      this._size = size;
      this.requestUpdate('size', oldSize);
    }

    /** @internal */
    private _size: ElementSize | null = defaultSize;

    /**
     * @internal
     *
     * `size` when it's one of the class's `VALID_SIZES`, otherwise the
     * default. Read this for rendering and for sizes passed to children.
     */
    public get resolvedSize(): ElementSize {
      const sizedConstructor = this
        .constructor as unknown as SizedElementConstructor;
      return resolveEnum(this.size, sizedConstructor.VALID_SIZES, defaultSize);
    }

    protected override update(changes: PropertyValues): void {
      const sizedConstructor = this
        .constructor as unknown as SizedElementConstructor;
      if (this._size !== null) {
        validateEnum(this, {
          prop: 'size',
          value: this._size,
          valid: sizedConstructor.VALID_SIZES,
          url: componentDocsHref(this.localName),
        });
      }
      if (!this.hasAttribute('size') && !sizedConstructor.NO_DEFAULT_SIZE) {
        this.setAttribute('size', this.size);
      }
      super.update(changes);
    }
  }
  return SizedElement;
}
