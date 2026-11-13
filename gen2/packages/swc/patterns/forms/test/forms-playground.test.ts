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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { FormBehavior } from '../stories/forms.stories.js';

// ────────────────
//    METADATA
// ────────────────

export default {
  title: 'Forms',
  parameters: {
    docs: { disable: true, page: null },
    controls: { disable: true },
  },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: FormBehavior.render,
  decorators: [
    (story) => html`
      <div
        style="display: flex; flex-direction: column; inline-size: min(48rem, 100vw - 2rem); max-inline-size: 100%; padding-block-start: 32px;"
      >
        <header style="display: flex; flex-direction: column; gap: 8px;">
          <h1 class="swc-Heading swc-Heading--sizeL">Forms playground</h1>
          <p class="swc-Body swc-Body--sizeS">
            Explore form behavior. No data is sent.
          </p>
        </header>
        ${story()}
      </div>
    `,
  ],
};
