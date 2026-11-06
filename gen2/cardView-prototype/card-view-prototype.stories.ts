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
import type { Meta, StoryObj } from '@storybook/web-components-vite';

/**
 * Local CardView accessibility prototype. Compares collection semantics for
 * `swc-card-view`. The prototype is static HTML served by Storybook in dev
 * mode only, and embedded here in an iframe so its page styles stay isolated.
 */
const meta: Meta = {
  title: 'card-View-prototype',
  parameters: {
    layout: 'fullscreen',
    a11y: { disable: true },
  },
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj;

export const Prototype: Story = {
  render: () => {
    const frame = document.createElement('iframe');
    frame.src = './card-view-prototype/index.html';
    frame.title = 'CardView accessibility prototype';
    frame.style.cssText = 'display:block;width:100%;height:100vh;border:0;';
    return frame;
  },
};
