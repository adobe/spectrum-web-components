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

import { html, LitElement } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  defineElement,
  ScopedRenderMixin,
  SpectrumElement,
  supportsScopedRegistries,
} from '../index.js';
import { renderRootCreationScope } from '../scoped-registry.js';

export default {
  title: 'Utils/Scoped registries/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// The global registry is shared by every story in this file, so global tests
// use unique tag names. Scoped tests use fresh registries and fixed names.
let tagCount = 0;
const uniqueTag = (name: string): string =>
  `test-${name}-${Date.now().toString(36)}-${tagCount++}`;

// Scoped stories return early in browsers without scoped registries, such as
// Firefox. Playwright's bundled Chromium supports them.
const scoped = supportsScopedRegistries();

// Chrome 146 shipped scoped registries natively. A Chrome 146+ run must detect
// them, so a detection regression can't skip the scoped stories silently.
const chromeMajor = Number(/Chrome\/(\d+)/.exec(navigator.userAgent)?.[1] ?? 0);

const hosts: HTMLElement[] = [];
const cleanup = (): void => {
  hosts.splice(0).forEach((host) => host.remove());
};

const scopedHost = (registry: CustomElementRegistry): ShadowRoot => {
  const host = document.createElement('div');
  hosts.push(host);
  document.body.append(host);
  return host.attachShadow({ mode: 'open', customElementRegistry: registry });
};

const mount = async <T extends HTMLElement>(
  registry: CustomElementRegistry,
  tag: string
): Promise<T> => {
  const root = scopedHost(registry);
  root.innerHTML = `<${tag}></${tag}>`;
  const element = root.querySelector(tag) as T;
  await (element as unknown as LitElement).updateComplete;
  return element;
};

class ScopedChildA extends SpectrumElement {
  static override readonly tagName = 'scoped-test-child';
}

class ScopedChildB extends SpectrumElement {
  static override readonly tagName = 'scoped-test-child';
}

class ScopedParent extends SpectrumElement {
  static override readonly tagName = 'scoped-test-parent';

  protected override render(): unknown {
    return html`
      <scoped-test-child></scoped-test-child>
    `;
  }
}

// ──────────────────────────────────────────────────────────────
// TEST: defineElement
// ──────────────────────────────────────────────────────────────

export const DefineElementTest: Story = {
  play: async ({ step }) => {
    await step('defining the same constructor again is a no-op', () => {
      const tag = uniqueTag('same');
      class Same extends HTMLElement {}
      defineElement(tag, Same);
      expect(() => defineElement(tag, Same)).not.toThrow();
      expect(customElements.get(tag)).toBe(Same);
    });

    await step('defining a different constructor for a tag throws', () => {
      const tag = uniqueTag('conflict');
      class First extends HTMLElement {}
      class Second extends HTMLElement {}
      defineElement(tag, First);
      expect(() => defineElement(tag, Second)).toThrow();
      expect(customElements.get(tag)).toBe(First);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: SpectrumElement.define
// ──────────────────────────────────────────────────────────────

export const StaticDefineTest: Story = {
  play: async ({ step }) => {
    await step('defines the class and its dependencies globally', () => {
      const childTag = uniqueTag('child');
      const parentTag = uniqueTag('parent');
      class Child extends SpectrumElement {
        static override readonly tagName = childTag;
      }
      class Parent extends SpectrumElement {
        static override readonly tagName = parentTag;
        static override readonly dependencies = [Child];
      }
      Parent.define();
      expect(customElements.get(childTag)).toBe(Child);
      expect(customElements.get(parentTag)).toBe(Parent);
    });

    await step('two classes can share a dependency', () => {
      const childTag = uniqueTag('shared-child');
      class Child extends SpectrumElement {
        static override readonly tagName = childTag;
      }
      class First extends SpectrumElement {
        static override readonly tagName = uniqueTag('first');
        static override readonly dependencies = [Child];
      }
      class Second extends SpectrumElement {
        static override readonly tagName = uniqueTag('second');
        static override readonly dependencies = [Child];
      }
      First.define();
      expect(() => Second.define()).not.toThrow();
      expect(customElements.get(childTag)).toBe(Child);
    });

    await step('a class must declare its own tagName', () => {
      class Untagged extends SpectrumElement {}
      class Tagged extends SpectrumElement {
        static override readonly tagName = uniqueTag('tagged');
      }
      class Inherited extends Tagged {}
      expect(() => Untagged.define()).toThrow(/Untagged.*tagName/);
      expect(() => Inherited.define()).toThrow(/Inherited.*tagName/);
    });

    await step('global hosts keep Lit default template cloning', async () => {
      const tag = uniqueTag('global-host');
      class GlobalHost extends SpectrumElement {
        static override readonly tagName = tag;
      }
      GlobalHost.define();
      const element = document.createElement(tag) as GlobalHost;
      document.body.append(element);
      await element.updateComplete;
      // Lit versions with lit/lit#5260 set the render root as the creation
      // scope, and older versions leave it unset. The mixin adds none.
      expect(element.renderOptions.creationScope ?? element.shadowRoot).toBe(
        element.shadowRoot
      );
      element.remove();
    });

    await step('global hosts keep their shadow root options', async () => {
      const tag = uniqueTag('global-options');
      class GlobalOptions extends SpectrumElement {
        static override readonly tagName = tag;
        static override shadowRootOptions: ShadowRootInit = {
          ...SpectrumElement.shadowRootOptions,
          delegatesFocus: true,
        };
      }
      GlobalOptions.define();
      const element = document.createElement(tag) as GlobalOptions;
      document.body.append(element);
      await element.updateComplete;

      expect(element.shadowRoot?.delegatesFocus).toBe(true);
      // The mixin leaves `customElementRegistry` out for a global host:
      // `null` would attach a shadow root without a registry.
      if (scoped) {
        expect(element.shadowRoot?.customElementRegistry).toBe(customElements);
      }
      element.remove();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Scoped registries (native support only)
// ──────────────────────────────────────────────────────────────

export const SupportDetectionTest: Story = {
  play: async ({ step }) => {
    await step('reports no support when the constructor throws', () => {
      // Some WebKit builds expose `initialize()` but reject construction.
      class PartialRegistry {
        constructor() {
          throw new TypeError('Illegal constructor');
        }
        public initialize(): void {}
      }
      const original = window.CustomElementRegistry;
      Object.defineProperty(window, 'CustomElementRegistry', {
        configurable: true,
        writable: true,
        value: PartialRegistry,
      });
      try {
        expect(supportsScopedRegistries()).toBe(false);
      } finally {
        Object.defineProperty(window, 'CustomElementRegistry', {
          configurable: true,
          writable: true,
          value: original,
        });
      }
    });
  },
};

export const NativeSupportTest: Story = {
  play: async ({ step }) => {
    if (chromeMajor < 146) {
      return;
    }
    await step('Chrome 146 or later reports native support', () => {
      expect(supportsScopedRegistries()).toBe(true);
    });
  },
};

export const ScopedRenderRootTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    await step('defines a class and its dependencies in a registry', () => {
      const registry = new CustomElementRegistry();
      class Parent extends ScopedParent {
        static override readonly tagName = 'scoped-test-parent';
        static override readonly dependencies = [ScopedChildA];
      }
      Parent.define(registry);
      expect(registry.get('scoped-test-child')).toBe(ScopedChildA);
      expect(registry.get('scoped-test-parent')).toBe(Parent);
      expect(customElements.get('scoped-test-parent')).toBeUndefined();
    });

    await step(
      'one class renders children from each host registry',
      async () => {
        const registryA = new CustomElementRegistry();
        const registryB = new CustomElementRegistry();
        ScopedChildA.define(registryA);
        ScopedChildB.define(registryB);
        ScopedParent.define(registryA);
        ScopedParent.define(registryB);

        const parentA = await mount<ScopedParent>(
          registryA,
          'scoped-test-parent'
        );
        const parentB = await mount<ScopedParent>(
          registryB,
          'scoped-test-parent'
        );
        const childA = parentA.shadowRoot?.querySelector('scoped-test-child');
        const childB = parentB.shadowRoot?.querySelector('scoped-test-child');

        expect(parentA.shadowRoot?.customElementRegistry).toBe(registryA);
        expect(parentB.shadowRoot?.customElementRegistry).toBe(registryB);
        expect(childA).toBeInstanceOf(ScopedChildA);
        expect(childB).toBeInstanceOf(ScopedChildB);
        cleanup();
      }
    );

    await step('scoped hosts keep their shadow root options', async () => {
      class ScopedOptions extends SpectrumElement {
        static override readonly tagName = 'scoped-test-options';
        static override shadowRootOptions: ShadowRootInit = {
          ...SpectrumElement.shadowRootOptions,
          delegatesFocus: true,
        };
      }
      const registry = new CustomElementRegistry();
      ScopedOptions.define(registry);
      const element = await mount<ScopedOptions>(
        registry,
        'scoped-test-options'
      );

      expect(element.shadowRoot?.delegatesFocus).toBe(true);
      expect(element.shadowRoot?.customElementRegistry).toBe(registry);
      cleanup();
    });

    await step('scopes a shadow root that Lit reuses', async () => {
      // Declarative shadow DOM gives an element its shadow root before it
      // upgrades, so Lit reuses that root instead of calling attachShadow().
      const registry = new CustomElementRegistry();
      ScopedChildA.define(registry);
      const root = scopedHost(registry);
      const parent = document.createElement('scoped-test-parent', {
        customElementRegistry: registry,
      });
      parent.attachShadow({ mode: 'open', customElementRegistry: registry });
      root.append(parent);
      ScopedParent.define(registry);
      await (parent as ScopedParent).updateComplete;

      expect(parent).toBeInstanceOf(ScopedParent);
      expect(
        parent.shadowRoot?.querySelector('scoped-test-child')
      ).toBeInstanceOf(ScopedChildA);
      cleanup();
    });
  },
};

export const ScopedConsumerHelpersTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    await step('ScopedRenderMixin scopes a consumer Lit element', async () => {
      class AppView extends ScopedRenderMixin(LitElement) {
        protected override render(): unknown {
          return html`
            <scoped-test-child></scoped-test-child>
          `;
        }
      }
      const registry = new CustomElementRegistry();
      ScopedChildA.define(registry);
      registry.define('scoped-test-app-view', AppView);

      const view = await mount<AppView>(registry, 'scoped-test-app-view');
      expect(
        view.shadowRoot?.querySelector('scoped-test-child')
      ).toBeInstanceOf(ScopedChildA);
      cleanup();
    });

    await step(
      'ScopedRenderMixin scopes a render that a controller runs on connection',
      async () => {
        // Lit notifies controllers right after it creates the render root, and
        // a controller can render synchronously from `hostConnected()`.
        class EagerView extends ScopedRenderMixin(LitElement) {
          constructor() {
            super();
            this.addController({ hostConnected: () => this.performUpdate() });
          }

          protected override render(): unknown {
            return html`
              <scoped-test-child></scoped-test-child>
            `;
          }
        }
        const registry = new CustomElementRegistry();
        ScopedChildA.define(registry);
        registry.define('scoped-test-eager-view', EagerView);

        const view = await mount<EagerView>(registry, 'scoped-test-eager-view');
        expect(
          view.shadowRoot?.querySelector('scoped-test-child')
        ).toBeInstanceOf(ScopedChildA);

        // A light-DOM render root never calls attachShadow().
        class EagerLightView extends EagerView {
          protected override createRenderRoot(): HTMLElement {
            return this;
          }
        }
        registry.define('scoped-test-eager-light-view', EagerLightView);
        const lightView = await mount<EagerLightView>(
          registry,
          'scoped-test-eager-light-view'
        );
        expect(lightView.querySelector('scoped-test-child')).toBeInstanceOf(
          ScopedChildA
        );
        cleanup();
      }
    );

    await step('ScopedRenderMixin scopes a light-DOM render root', async () => {
      class LightView extends ScopedRenderMixin(LitElement) {
        protected override createRenderRoot(): HTMLElement {
          return this;
        }

        protected override render(): unknown {
          return html`
            <scoped-test-child></scoped-test-child>
          `;
        }
      }
      const registry = new CustomElementRegistry();
      ScopedChildA.define(registry);
      registry.define('scoped-test-light-view', LightView);

      const view = await mount<LightView>(registry, 'scoped-test-light-view');
      expect(view.querySelector('scoped-test-child')).toBeInstanceOf(
        ScopedChildA
      );
      cleanup();
    });

    await step(
      'ScopedRenderMixin renders a global root element from the registry in its shadowRootOptions',
      async () => {
        const registry = new CustomElementRegistry();
        ScopedChildB.define(registry);
        class PrivateRegistryView extends ScopedRenderMixin(LitElement) {
          static override shadowRootOptions: ShadowRootInit = {
            mode: 'open',
            customElementRegistry: registry,
          };

          protected override render(): unknown {
            return html`
              <scoped-test-child></scoped-test-child>
            `;
          }
        }
        const tag = uniqueTag('private-registry-view');
        customElements.define(tag, PrivateRegistryView);
        const view = document.createElement(tag) as PrivateRegistryView;
        hosts.push(view);
        document.body.append(view);
        await view.updateComplete;

        expect(view.shadowRoot?.customElementRegistry).toBe(registry);
        expect(
          view.shadowRoot?.querySelector('scoped-test-child')
        ).toBeInstanceOf(ScopedChildB);

        // A host created in another scoped registry keeps the explicit one.
        const hostRegistry = new CustomElementRegistry();
        ScopedChildA.define(hostRegistry);
        hostRegistry.define(tag, PrivateRegistryView);
        const scopedView = await mount<PrivateRegistryView>(hostRegistry, tag);
        expect(scopedView.shadowRoot?.customElementRegistry).toBe(registry);
        expect(
          scopedView.shadowRoot?.querySelector('scoped-test-child')
        ).toBeInstanceOf(ScopedChildB);
        cleanup();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Lit creation scopes
// ──────────────────────────────────────────────────────────────

export const CreationScopeTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    const registry = new CustomElementRegistry();
    ScopedChildA.define(registry);
    ScopedParent.define(registry);
    const template = document.createElement('template');
    template.innerHTML = '<scoped-test-child></scoped-test-child>';

    await step(
      'a registry-only scope creates content in the render root registry',
      async () => {
        // Lit versions with lit/lit#5246 clone templates with
        // `document.importNode(content, creationScope)`, and warn in
        // development when the scope has an `importNode()`.
        const parent = await mount<ScopedParent>(
          registry,
          'scoped-test-parent'
        );
        const scope = renderRootCreationScope(parent, true);
        const fragment = document.importNode(
          template.content,
          scope as unknown as ImportNodeOptions
        );

        expect('importNode' in scope).toBe(false);
        expect(fragment.firstElementChild).toBeInstanceOf(ScopedChildA);
        cleanup();
      }
    );

    await step(
      'a scope for any Lit version creates content in the render root registry',
      async () => {
        const parent = await mount<ScopedParent>(
          registry,
          'scoped-test-parent'
        );
        const scope = renderRootCreationScope(parent, false);
        // Older Lit versions call `creationScope.importNode(content, true)`.
        const fromImportNode = scope.importNode(
          template.content,
          true
        ) as DocumentFragment;
        // Lit versions that drop `importNode()` pass the scope to
        // `document.importNode()`.
        const fromRegistry = document.importNode(
          template.content,
          scope as unknown as ImportNodeOptions
        );

        expect(fromImportNode.firstElementChild).toBeInstanceOf(ScopedChildA);
        expect(fromRegistry.firstElementChild).toBeInstanceOf(ScopedChildA);
        cleanup();
      }
    );
  },
};
