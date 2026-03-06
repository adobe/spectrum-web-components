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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/color-slider/sp-color-slider.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/textfield/sp-textfield.js';

export default {
  title: 'Field Label/Reference Target',
  component: 'sp-field-label',
};

/**
 * Demonstrates `referenceTarget` across multiple components.
 *
 * With `referenceTarget` set on each component's shadow root, a native
 * `<label for="...">` or `aria-labelledby` pointing at the custom element's
 * ID will resolve through the shadow boundary to the internal focusable
 * element (e.g. the <input>, <button>, or <textarea> inside the shadow DOM).
 *
 * To verify: open DevTools, inspect each custom element's shadow root,
 * and confirm `referenceTarget` is present. In supporting browsers,
 * clicking a native <label> should activate/focus the internal control.
 */

export const allComponents = (): TemplateResult => {
  return html`
    <style>
      .reference-target-demo {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 480px;
      }

      .demo-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        border: 1px solid var(--spectrum-gray-300, #e1e1e1);
        border-radius: 4px;
      }

      .demo-section h3 {
        margin: 0 0 4px;
        font-size: 14px;
        color: var(--spectrum-gray-700, #6e6e6e);
      }

      .demo-section p {
        margin: 0;
        font-size: 12px;
        color: var(--spectrum-gray-600, #959595);
      }

      .demo-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .native-label {
        cursor: pointer;
        font-family: var(--spectrum-body-font-family, adobe-clean, sans-serif);
        font-size: var(--spectrum-body-size-m, 14px);
        text-decoration: underline;
        text-decoration-style: dashed;
        text-underline-offset: 2px;
      }
    </style>
    <div class="reference-target-demo">
      <div class="demo-section">
        <h3>sp-textfield</h3>
        <p>referenceTarget: 'input' — resolves to the internal &lt;input&gt;</p>
        <div>
          <label class="native-label" for="rt-textfield">
            Native label (click me)
          </label>
        </div>
        <sp-textfield
          id="rt-textfield"
          placeholder="Should focus when label is clicked"
        ></sp-textfield>
      </div>

      <div class="demo-section">
        <h3>sp-textfield (multiline)</h3>
        <p>
          referenceTarget: 'input' — resolves to the internal &lt;textarea&gt;
        </p>
        <div>
          <label class="native-label" for="rt-textarea">
            Native label (click me)
          </label>
        </div>
        <sp-textfield
          id="rt-textarea"
          multiline
          placeholder="Should focus when label is clicked"
        ></sp-textfield>
      </div>

      <div class="demo-section">
        <h3>sp-checkbox</h3>
        <p>
          referenceTarget: 'input' — resolves to the internal &lt;input
          type="checkbox"&gt;
        </p>
        <div class="demo-row">
          <label class="native-label" for="rt-checkbox">
            Native label (click me)
          </label>
          <sp-checkbox id="rt-checkbox">Checkbox</sp-checkbox>
        </div>
      </div>

      <div class="demo-section">
        <h3>sp-switch</h3>
        <p>
          referenceTarget: 'input' — resolves to the internal &lt;input
          type="checkbox" role="switch"&gt;
        </p>
        <div class="demo-row">
          <label class="native-label" for="rt-switch">
            Native label (click me)
          </label>
          <sp-switch id="rt-switch">Dark mode</sp-switch>
        </div>
      </div>

      <div class="demo-section">
        <h3>sp-picker</h3>
        <p>
          referenceTarget: 'button' — resolves to the internal &lt;button&gt;
        </p>
        <div>
          <label class="native-label" for="rt-picker">
            Native label (click me)
          </label>
        </div>
        <sp-picker id="rt-picker" label="Country">
          <sp-menu-item value="us">United States</sp-menu-item>
          <sp-menu-item value="uk">United Kingdom</sp-menu-item>
          <sp-menu-item value="de">Germany</sp-menu-item>
          <sp-menu-item value="jp">Japan</sp-menu-item>
        </sp-picker>
      </div>

      <div class="demo-section">
        <h3>sp-color-slider</h3>
        <p>
          referenceTarget: 'input' — resolves to the internal &lt;input
          type="range"&gt;
        </p>
        <div>
          <label class="native-label" for="rt-color-slider">
            Native label (click me)
          </label>
        </div>
        <sp-color-slider id="rt-color-slider"></sp-color-slider>
      </div>

      <div class="demo-section">
        <h3>Cross-root aria-labelledby</h3>
        <p>
          With referenceTarget, aria-labelledby can reference custom elements by
          ID and resolve to their internal controls.
        </p>
        <div>
          <span id="external-label" class="native-label">
            External description (referenced via aria-describedby)
          </span>
        </div>
        <sp-textfield
          id="rt-described"
          aria-describedby="external-label"
          placeholder="Described by the span above"
        ></sp-textfield>
      </div>

      <div class="demo-section">
        <h3>sp-field-label + referenceTarget</h3>
        <p>
          sp-field-label already handles cross-shadow labeling via workarounds.
          With referenceTarget, the browser resolves the association natively —
          no fallback needed.
        </p>
        <sp-field-label for="rt-field-label">
          Field Label (existing pattern)
        </sp-field-label>
        <sp-textfield
          id="rt-field-label"
          placeholder="Labeled by sp-field-label"
        ></sp-textfield>
      </div>
    </div>
  `;
};
