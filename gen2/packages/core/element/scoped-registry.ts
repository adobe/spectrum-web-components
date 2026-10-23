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

import type { LitElement, RenderOptions } from 'lit';

type Constructor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};

/**
 * Returns `true` when the browser implements the standard scoped custom element
 * registry API, natively or through a polyfill.
 */
export function supportsScopedRegistries(): boolean {
  return (
    typeof CustomElementRegistry !== 'undefined' &&
    typeof CustomElementRegistry.prototype.initialize === 'function'
  );
}

function creationScope(
  document: Document,
  registry: CustomElementRegistry
): NonNullable<RenderOptions['creationScope']> {
  return {
    importNode: (node, deep = false) =>
      document.importNode(node, {
        customElementRegistry: registry,
        selfOnly: !deep,
      }),
  };
}

/**
 * Lit render options that create elements in `registry`. Pass them to Lit's
 * `render()` when rendering into a shadow root that uses a scoped registry.
 * Lit's default creates elements in the global registry.
 *
 * This bridges a gap in Lit and will be deprecated when Lit supports scoped
 * registries.
 */
export function scopedRenderOptions(
  registry: CustomElementRegistry,
  document: Document = globalThis.document
): RenderOptions {
  return { creationScope: creationScope(document, registry) };
}

function scopedRegistryOf(element: Element): CustomElementRegistry | null {
  const registry = element.customElementRegistry;
  const globalRegistry = element.ownerDocument.defaultView?.customElements;
  return registry && registry !== globalRegistry ? registry : null;
}

/**
 * Makes a Lit element render into a shadow root that uses the registry the
 * element was created in, and create its template content in that registry.
 * Elements created in the global registry render as usual.
 *
 * This bridges a gap in Lit and will be deprecated when Lit supports scoped
 * registries.
 */
export function ScopedElementMixin<T extends Constructor<LitElement>>(
  Base: T
): T {
  class ScopedElement extends Base {
    public override attachShadow(init: ShadowRootInit): ShadowRoot {
      const registry = scopedRegistryOf(this);
      if (!registry) {
        return super.attachShadow(init);
      }
      this.renderOptions.creationScope = creationScope(
        this.ownerDocument,
        registry
      );
      return super.attachShadow({ ...init, customElementRegistry: registry });
    }
  }
  return ScopedElement;
}

/**
 * Creates a scoped registry for one loaded copy of Spectrum Web Components and
 * publishes it at `window.__swc.scopedRegistries`, keyed by version. When two
 * copies of the same version load, the index keeps the first.
 *
 * @throws When the browser does not support scoped registries.
 */
export function createScopedRegistry(version: string): CustomElementRegistry {
  if (!supportsScopedRegistries()) {
    throw new Error(
      'Scoped custom element registries are not supported in this browser. Load a polyfill that implements the standard API, render the app in an iframe, or load one version of Spectrum Web Components per page.'
    );
  }
  const registry = new CustomElementRegistry();
  window.__swc ??= {} as Window['__swc'];
  const registries = (window.__swc.scopedRegistries ??= new Map());
  if (!registries.has(version)) {
    registries.set(version, registry);
  } else if (window.__swc.DEBUG) {
    window.__swc.warn(
      undefined,
      `Spectrum Web Components ${version} was loaded more than once. window.__swc.scopedRegistries keeps the registry of the first copy.`,
      'https://spectrum-web-components.adobe.com/registry-conflicts'
    );
  }
  return registry;
}
