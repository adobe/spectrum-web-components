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

import { expect, fixture, html } from '@open-wc/testing';

import { walkAncestors } from '@spectrum-web-components/shared/src/walk-ancestors.js';

class WalkAncestorsShadowHost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML =
      '<div id="inner"><slot></slot></div>';
  }
}
customElements.define('walk-ancestors-shadow-host', WalkAncestorsShadowHost);

describe('walkAncestors()', () => {
  it('walks up the plain parentElement chain', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div id="a">
        <div id="b"><div id="c"></div></div>
      </div>
    `);
    const b = wrapper.querySelector('#b') as HTMLDivElement;
    const c = wrapper.querySelector('#c') as HTMLDivElement;

    const ancestors = walkAncestors(c);
    expect(ancestors.next().value).to.equal(b);
    expect(ancestors.next().value).to.equal(wrapper);
  });

  it('crosses a shadow-root boundary via the host', async () => {
    const host = await fixture<WalkAncestorsShadowHost>(html`
      <walk-ancestors-shadow-host></walk-ancestors-shadow-host>
    `);
    const inner = host.shadowRoot?.querySelector('#inner') as HTMLDivElement;

    const ancestors = walkAncestors(inner);
    expect(ancestors.next().value).to.equal(host);
  });

  it('prefers assignedSlot over the light-DOM parentElement', async () => {
    const host = await fixture<WalkAncestorsShadowHost>(html`
      <walk-ancestors-shadow-host>
        <span id="slotted"></span>
      </walk-ancestors-shadow-host>
    `);
    const slotted = host.querySelector('#slotted') as HTMLSpanElement;
    const slot = host.shadowRoot?.querySelector('slot') as HTMLSlotElement;

    // `slotted`'s light-DOM `parentElement` is `host` itself, but its
    // rendered (flat-tree) ancestor is the `<slot>` it's assigned to —
    // `assignedSlot` must win.
    const ancestors = walkAncestors(slotted);
    expect(ancestors.next().value).to.equal(slot);
  });
});
