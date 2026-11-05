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

// Scoped custom element registry members that the TypeScript DOM lib doesn't
// include yet. They're declared in this module, not in an ambient file, so they
// ship with the package's type declarations.
declare global {
  interface CustomElementRegistry {
    initialize(root: Node): void;
  }

  interface Element {
    readonly customElementRegistry: CustomElementRegistry | null;
  }

  interface ShadowRoot {
    readonly customElementRegistry: CustomElementRegistry | null;
  }
}

// Abstract-capable so the mixin can be applied over abstract base classes.
type Constructor<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract new (...args: any[]) => T;

/**
 * Returns `true` when the browser implements the standard scoped custom element
 * registry API, natively or through a polyfill.
 */
export function supportsScopedRegistries(): boolean {
  // Construct a registry: some WebKit builds expose `initialize()` but throw
  // "Illegal constructor".
  try {
    return typeof new CustomElementRegistry().initialize === 'function';
  } catch {
    return false;
  }
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

// Returns `registry` unless it's missing or it's the global registry. A node in
// a document without a window, such as one from
// `document.implementation.createHTMLDocument()`, compares against this
// window's registry.
function scopedOnly(
  registry: CustomElementRegistry | null | undefined,
  node: Node
): CustomElementRegistry | null {
  const globalRegistry =
    node.ownerDocument?.defaultView?.customElements ??
    globalThis.customElements;
  return registry && registry !== globalRegistry ? registry : null;
}

/**
 * Makes a Lit element render with the registry the element was created in: its
 * shadow root uses that registry, and its template content is created in it.
 * An explicit `customElementRegistry` in the shadow root options takes
 * precedence. Elements created in the global registry render as usual.
 *
 * This bridges a gap in Lit and will be deprecated when Lit supports scoped
 * registries.
 */
export function ScopedElementMixin<T extends Constructor<LitElement>>(
  Base: T
): T {
  abstract class ScopedElement extends Base {
    /**
     * @internal
     */
    public override attachShadow(init: ShadowRootInit): ShadowRoot {
      const registry =
        init.customElementRegistry ??
        scopedOnly(this.customElementRegistry, this);
      return super.attachShadow(
        registry ? { ...init, customElementRegistry: registry } : init
      );
    }

    /**
     * @internal
     */
    public override connectedCallback(): void {
      super.connectedCallback();
      // The render root exists now, and the first render hasn't run yet. Lit
      // reuses an existing shadow root, such as a declarative one, and a
      // light-DOM render root attaches none, so `attachShadow()` can't set this.
      if (this.renderOptions.creationScope) {
        return;
      }
      const root = this.renderRoot;
      const registry = scopedOnly(
        (root instanceof ShadowRoot ? root.customElementRegistry : null) ??
          this.customElementRegistry,
        this
      );
      if (registry) {
        this.renderOptions.creationScope = creationScope(
          this.ownerDocument,
          registry
        );
      }
    }
  }
  return ScopedElement as unknown as T;
}

/**
 * Creates the scoped registry of one loaded copy of Spectrum Web Components and
 * publishes it at `window.__swc.scopedRegistries`, keyed by version.
 *
 * @throws When the browser does not support scoped registries, or when another
 * copy of the same version already published its registry.
 */
export function createScopedRegistry(version: string): CustomElementRegistry {
  if (!supportsScopedRegistries()) {
    throw new Error(
      'Scoped custom element registries are not supported in this browser. Load a polyfill that implements the standard API, render the app in an iframe, or load one version of Spectrum Web Components per page.'
    );
  }
  window.__swc ??= {} as Window['__swc'];
  const registries = (window.__swc.scopedRegistries ??= new Map());
  // A second copy can't share the first copy's registry: their classes differ,
  // and components check each other with `instanceof`.
  if (registries.has(version)) {
    throw new Error(
      `Another copy of Spectrum Web Components ${version} already published its scoped registry. Load one copy of each version per page, or give each app its own registry with \`new CustomElementRegistry()\` and \`Component.define(registry)\`.`
    );
  }
  const registry = new CustomElementRegistry();
  registries.set(version, registry);
  return registry;
}
