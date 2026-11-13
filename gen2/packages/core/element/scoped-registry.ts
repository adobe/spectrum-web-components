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

import { html, LitElement, render, type RenderOptions } from 'lit';

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

type CreationScope = NonNullable<RenderOptions['creationScope']>;

let litReadsRegistry: boolean | undefined;

// Lit versions with lit/lit#5246 create template content with
// `document.importNode(content, creationScope)`, so the scope's
// `customElementRegistry` decides where Lit creates elements. They still call a
// scope's `importNode()`, but warn in development that it's deprecated. Older
// versions only call `importNode()`, so they throw for a scope without one.
// Render one element with a scope that names a new registry, and check where
// Lit created it. This only runs where scoped registries are supported.
function litReadsCreationScopeRegistry(): boolean {
  if (litReadsRegistry === undefined) {
    const registry = new CustomElementRegistry();
    const fragment = document.createDocumentFragment();
    try {
      render(
        html`
          <swc-creation-scope-probe></swc-creation-scope-probe>
        `,
        fragment,
        {
          creationScope: {
            customElementRegistry: registry,
          } as unknown as CreationScope,
        }
      );
      litReadsRegistry =
        fragment.firstElementChild?.customElementRegistry === registry;
    } catch {
      // Older Lit calls the missing `importNode()`.
      litReadsRegistry = false;
    }
  }
  return litReadsRegistry;
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

// The registry of `host`'s render root: a scoped shadow root's registry, or else
// the host's own registry when it's scoped.
function renderRootRegistry(host: LitElement): CustomElementRegistry | null {
  const root = host.renderRoot;
  return scopedOnly(
    (root instanceof ShadowRoot ? root.customElementRegistry : null) ??
      host.customElementRegistry,
    host
  );
}

/**
 * Returns a Lit creation scope that creates `host`'s template content in the
 * registry of its render root. The registry is resolved when Lit clones a
 * template, so the scope works before the render root exists.
 *
 * Pass `true` when `host` renders with a Lit version that reads
 * `creationScope.customElementRegistry`: the scope then has no `importNode()`
 * for Lit to warn about. Otherwise, the scope has both, so it works with any
 * Lit version.
 *
 * @internal
 */
export function renderRootCreationScope(
  host: LitElement,
  litReadsRegistry: boolean
): CreationScope {
  const registryOf = (): CustomElementRegistry | undefined =>
    renderRootRegistry(host) ?? undefined;
  if (litReadsRegistry) {
    const scope = {
      get customElementRegistry(): CustomElementRegistry | undefined {
        return registryOf();
      },
    };
    // Lit's types before lit/lit#5246 require `importNode()`.
    return scope as unknown as CreationScope;
  }
  // Lit versions before lit/lit#5246 call `importNode()`. Versions that drop
  // `importNode()` read `customElementRegistry`.
  const scope = {
    get customElementRegistry(): CustomElementRegistry | undefined {
      return registryOf();
    },
    importNode: (node: Node, deep = false): Node => {
      const registry = renderRootRegistry(host);
      return registry
        ? host.ownerDocument.importNode(node, {
            customElementRegistry: registry,
            selfOnly: !deep,
          })
        : host.ownerDocument.importNode(node, deep);
    },
  };
  return scope;
}

// A creation scope the host already has wins. Only a host that renders with
// this module's Lit gets a scope without `importNode()`, because another copy
// of Lit can be an older version.
function useRenderRootRegistry(host: LitElement): void {
  host.renderOptions.creationScope ??= renderRootCreationScope(
    host,
    host instanceof LitElement && litReadsCreationScopeRegistry()
  );
}

/**
 * Makes a Lit element render with the registry it was created in. Its shadow
 * root uses that registry, unless the shadow root options name another one, and
 * Lit creates its template content in its render root's registry, including a
 * light-DOM render root. Elements created in the global registry render as
 * usual.
 *
 * Without the mixin, a shadow root uses the document's registry, and Lit
 * versions before lit/lit#5260 create template content in the global registry.
 * With Lit versions that read `creationScope.customElementRegistry`, the mixin
 * uses it instead of the deprecated `creationScope.importNode()`. An element
 * that uses another copy of Lit than this package gets both, so it works with
 * any Lit version, and newer Lit versions warn about `importNode()` in
 * development.
 */
export function ScopedRenderMixin<T extends Constructor<LitElement>>(
  Base: T
): T {
  abstract class ScopedRenderElement extends Base {
    /**
     * @internal
     */
    public override attachShadow(init: ShadowRootInit): ShadowRoot {
      const registry =
        init.customElementRegistry ??
        scopedOnly(this.customElementRegistry, this);
      if (scopedOnly(registry, this)) {
        useRenderRootRegistry(this);
      }
      return super.attachShadow(
        registry ? { ...init, customElementRegistry: registry } : init
      );
    }

    /**
     * @internal
     */
    public override connectedCallback(): void {
      // Lit creates the render root and notifies controllers, which can render
      // synchronously, inside `super.connectedCallback()`, so set this first.
      // It also covers shadow roots Lit reuses, such as declarative ones, and
      // light-DOM render roots, which never call `attachShadow()`.
      if (
        scopedOnly(
          this.shadowRoot?.customElementRegistry ?? this.customElementRegistry,
          this
        )
      ) {
        useRenderRootRegistry(this);
      }
      super.connectedCallback();
    }
  }
  return ScopedRenderElement as unknown as T;
}
