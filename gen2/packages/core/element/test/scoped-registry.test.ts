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

import { html, LitElement, render } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  createScopedRegistry,
  defineElement,
  ScopedElementMixin,
  scopedRenderOptions,
  SpectrumElement,
  supportsScopedRegistries,
} from '../index.js';

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

// Playwright 1.53's bundled Chromium (138) predates native scoped registries
// (Chrome 146). Scoped stories return early there; run them natively with
// `VITEST_BROWSER_CHANNEL=chrome`.
const scoped = supportsScopedRegistries();

const mount = async <T extends HTMLElement>(
  registry: CustomElementRegistry,
  tag: string
): Promise<T> => {
  const host = document.createElement('div');
  document.body.append(host);
  const root = host.attachShadow({
    mode: 'open',
    customElementRegistry: registry,
  });
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
      expect(element.renderOptions.creationScope).toBeUndefined();
      element.remove();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Scoped registries (native support only)
// ──────────────────────────────────────────────────────────────

export const UnsupportedBrowserTest: Story = {
  play: async ({ step }) => {
    if (scoped) {
      return;
    }
    await step('the scoped registry API throws a clear error', () => {
      expect(() => createScopedRegistry('0.0.0-unsupported')).toThrow(
        /Scoped custom element registries are not supported/
      );
    });
  },
};

export const ScopedRegistryIndexTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    await step('publishes the first registry for a version', () => {
      const first = createScopedRegistry('0.0.0-index-test');
      expect(window.__swc.scopedRegistries?.get('0.0.0-index-test')).toBe(
        first
      );
    });

    await step('keeps the first registry when a version loads twice', () => {
      const first = window.__swc.scopedRegistries?.get('0.0.0-index-test');
      const second = createScopedRegistry('0.0.0-index-test');
      expect(second).not.toBe(first);
      expect(window.__swc.scopedRegistries?.get('0.0.0-index-test')).toBe(
        first
      );
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
      }
    );
  },
};

export const ScopedConsumerHelpersTest: Story = {
  play: async ({ step }) => {
    if (!scoped) {
      return;
    }
    await step('ScopedElementMixin scopes a consumer Lit element', async () => {
      class AppView extends ScopedElementMixin(LitElement) {
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
    });

    await step('scopedRenderOptions scopes a top-level render', () => {
      const registry = new CustomElementRegistry();
      ScopedChildB.define(registry);
      const host = document.createElement('div');
      document.body.append(host);
      const root = host.attachShadow({
        mode: 'open',
        customElementRegistry: registry,
      });
      render(
        html`
          <scoped-test-child></scoped-test-child>
        `,
        root,
        scopedRenderOptions(registry)
      );
      expect(root.querySelector('scoped-test-child')).toBeInstanceOf(
        ScopedChildB
      );
    });
  },
};
