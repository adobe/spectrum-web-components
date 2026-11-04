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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  type ToastContainerPlacement,
  ToastQueue,
  type ToastVariant,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';

import '@adobe/spectrum-wc/components/toast-container/swc-toast-container.js';

import {
  forcedColorsVrtParameters,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// TODO(SWC-2654): add expanded-view, scrim, and Clear all / Collapse coverage.

// Metadata

const meta: Meta = {
  title: 'Toast container/Container VRT',
  component: 'swc-toast-container',
  tags: ['dev'],
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
};

export default meta;

// Helpers

const stackVariants: ToastVariant[] = ['info', 'positive', 'negative'];

// The container is a single fixed region, so each snapshot is its own story.
const stackStory = (
  placement: ToastContainerPlacement,
  count: number,
  parameters: Story['parameters'] = vrtParameters
): Story => ({
  render: () => html`
    <swc-toast-container placement=${placement}></swc-toast-container>
  `,
  parameters,
  play: async ({ canvasElement }) => {
    for (let index = 0; index < count; index += 1) {
      ToastQueue.add(`Notification ${index + 1}`, {
        variant: stackVariants[index % stackVariants.length],
      });
    }
    const container = canvasElement.querySelector('swc-toast-container')!;
    await container.updateComplete;
    // Waits for the front toast's enter transition so the snapshot is at rest.
    await waitFor(() => {
      const toast = container.shadowRoot?.querySelector('swc-toast');
      const surface = toast?.shadowRoot?.querySelector('.swc-Toast');
      expect(
        surface && getComputedStyle(surface).opacity,
        'front toast opacity'
      ).toBe('1');
    });
  },
});

// VRT stories

export const BottomStack: Story = stackStory('bottom', 3);

export const BottomEndStack: Story = stackStory('bottom-end', 3);

export const TopStack: Story = stackStory('top', 3);

export const TopEndStack: Story = stackStory('top-end', 3);

// Layers beyond the third position stay in the DOM but are invisible.
export const StackBeyondThree: Story = stackStory('bottom', 5);

export const ForcedColors: Story = stackStory(
  'bottom',
  3,
  forcedColorsVrtParameters
);
