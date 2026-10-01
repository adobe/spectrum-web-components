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

import '@spectrum-web-components/picker-button/sp-picker-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';

import { argTypes, StoryArgs, Template } from './index.js';

export default {
  title: 'Picker Button',
  component: 'sp-picker-button',
  ...argTypes,
};

export const active = (args: StoryArgs): TemplateResult => Template(args);
active.args = { active: true };

export const customIcon = (args: StoryArgs): TemplateResult => Template(args);
customIcon.args = {
  icon: `<sp-icon-add slot="icon" class="spectrum-PickerButton-icon spectrum-Icon"></sp-icon-add>`,
};

export const invalid = (args: StoryArgs): TemplateResult => Template(args);
invalid.args = { invalid: true };

export const quiet = (args: StoryArgs): TemplateResult => Template(args);
quiet.args = { label: true, quiet: true };

export const label = (args: StoryArgs): TemplateResult => Template(args);
label.args = { label: true };

export const labelCustom = (args: StoryArgs): TemplateResult => Template(args);
labelCustom.args = { label: 'Some' };

export const open = (args: StoryArgs): TemplateResult => Template(args);
open.args = { open: true };

export const positionLeft = (args: StoryArgs): TemplateResult => Template(args);
positionLeft.args = { position: 'left' };

export const positionRight = (args: StoryArgs): TemplateResult =>
  Template(args);
positionRight.args = { position: 'right' };

export const rounded = (args: StoryArgs): TemplateResult => Template(args);
rounded.args = { rounded: true };

export const roundedLabel = (args: StoryArgs): TemplateResult => Template(args);
roundedLabel.args = {
  label: true,
  rounded: true,
};

const webHapticsStyles = `
  .web-haptics-story { display: flex; flex-direction: column; gap: 1.5rem; max-inline-size: 32rem; }
  .web-haptics-story__instructions { padding: 1rem; background: var(--spectrum-gray-100, #f5f5f5); border-radius: 0.5rem; }
  .web-haptics-story__instructions h3 { margin: 0 0 0.5rem 0; font-size: 1.125rem; }
  .web-haptics-story__instructions p, .web-haptics-story__instructions ul { margin: 0.5rem 0 0 0; font-size: 0.875rem; }
  .web-haptics-story__instructions code { font-size: 0.8125rem; padding: 0.125rem 0.25rem; background: var(--spectrum-gray-200, #e5e5e5); border-radius: 0.25rem; }
  .web-haptics-story__instructions a { color: var(--spectrum-blue-600, #0d66d0); }
  .web-haptics-story__demos { display: flex; flex-direction: column; gap: 1rem; }
  .web-haptics-story__demo { display: flex; flex-direction: column; gap: 0.25rem; }
`;

export const WebHaptics = (): TemplateResult => html`
  <div class="web-haptics-story">
    <div class="web-haptics-story__instructions">
      <h3>Web Haptics (accessibility)</h3>
      <p>
        Test on
        <strong>iOS 18+ Safari</strong>
        or Android. Haptic fires on
        <strong>release</strong>
        (click) — same pattern as combobox/slider.
      </p>
      <ul>
        <li>
          <strong>With haptics:</strong>
          tap the first button; feel a tap when you release.
        </li>
        <li>
          <strong>Without haptics:</strong>
          second button for comparison.
        </li>
      </ul>
      <p>
        <a
          href="https://webkit.org/blog/15865/webkit-features-in-safari-18-0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebKit blog
        </a>
        .
      </p>
    </div>
    <div class="web-haptics-story__demos">
      <div class="web-haptics-story__demo">
        <span style="font-size: 14px; font-weight: 600;">
          With haptic feedback
        </span>
        <sp-picker-button haptic-feedback></sp-picker-button>
      </div>
      <div class="web-haptics-story__demo">
        <span style="font-size: 14px; font-weight: 600;">
          Without haptic feedback
        </span>
        <sp-picker-button></sp-picker-button>
      </div>
    </div>
  </div>
  <style>
    ${webHapticsStyles}
  </style>
`;
WebHaptics.parameters = {
  docs: {
    description: {
      story:
        'Side-by-side picker buttons to test haptic feedback on click (release). Enable haptics for accessibility when users benefit from tactile confirmation.',
    },
  },
};
