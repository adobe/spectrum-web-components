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

/**
 * Test-only fixtures for exercising `CardBase` before any concrete card
 * component (`swc-card`, `swc-user-card`, etc.) exists. Not a real
 * component: no public API, no docs, no production use. Once a concrete
 * card ships, prefer testing through it instead and retire these fixtures.
 */

import { html, TemplateResult } from 'lit';

import { CardBase } from '@adobe/spectrum-wc-core/components/card/index.js';

import { renderCardTemplate } from '../card-template.js';

/**
 * Minimal concrete card rendering the shared anatomy with no
 * `renderCollection`/`renderGlyph` overrides, to exercise `CardBase`'s own
 * behavior (variant/density validation, `titleAsLink`, `selectable`,
 * interactive-target filtering) against the real `renderCardTemplate()`
 * output.
 */
export class TestCardBase extends CardBase {
  protected override render(): TemplateResult {
    return renderCardTemplate({
      cardClass: 'TestCardBase',
      hasDefaultSlotContent: this.slotHasContent,
      onDefaultSlotChange: this.slotText.handleSlotChange,
    });
  }
}

if (!customElements.get('test-card-base')) {
  customElements.define('test-card-base', TestCardBase);
}

/**
 * Minimal concrete card that supplies `renderCollection`/`renderGlyph`, to
 * verify those `renderCardTemplate()` callback parameters actually render
 * when provided (the default-card case above verifies they render nothing
 * when omitted).
 */
export class TestCardWithMediaExtras extends CardBase {
  protected override render(): TemplateResult {
    return renderCardTemplate({
      cardClass: 'TestCardWithMediaExtras',
      renderCollection: () => html`
        <span class="test-collection-marker">collection</span>
      `,
      renderGlyph: () => html`
        <span class="test-glyph-marker">glyph</span>
      `,
    });
  }
}

if (!customElements.get('test-card-with-media-extras')) {
  customElements.define('test-card-with-media-extras', TestCardWithMediaExtras);
}

/**
 * A custom element with its own shadow-DOM `<button>`, used to verify that
 * `CardBase`'s interactive-target filtering correctly inspects nodes inside
 * another element's shadow root — `composedPath()` traverses shadow
 * boundaries for composed events like `click`, so the internal `<button>`
 * is reachable regardless of which shadow tree it belongs to.
 */
export class TestNestedButtonHost extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Nested action';
    root.appendChild(button);
  }
}

if (!customElements.get('test-nested-button-host')) {
  customElements.define('test-nested-button-host', TestNestedButtonHost);
}
