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
  ToastQueue,
  type ToastRegionPlacement,
  type ToastVariant,
} from '@adobe/spectrum-wc-core/components/toast/index.js';

import '@adobe/spectrum-wc/components/toast/swc-toast-region.js';

import {
  forcedColorsVrtParameters,
  forcePseudoState,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// TODO(SWC-2654): add expanded-view, scrim, and Clear all / Collapse coverage.

// Metadata

const meta: Meta = {
  title: 'Toast region/Region VRT',
  component: 'swc-toast-region',
  tags: ['dev'],
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
};

export default meta;

// Helpers

type StackSpec = {
  placement?: ToastRegionPlacement;
  // Variants in the order they are added, so the last one is the front toast.
  variants?: ToastVariant[];
  mode?: 'light' | 'dark';
  dir?: 'ltr' | 'rtl';
  focusFront?: boolean;
  // Replaces the front toast's message, and gives it an action when `actionLabel` is set.
  frontToast?: { message: string; actionLabel?: string };
  parameters?: Story['parameters'];
};

const defaultVariants: ToastVariant[] = ['info', 'positive', 'negative'];

// The container is a single fixed region and every container shares one
// queue, so each snapshot is its own story.
const stackStory = ({
  placement = 'bottom',
  variants = defaultVariants,
  mode,
  dir,
  focusFront = false,
  frontToast,
  parameters = vrtParameters,
}: StackSpec = {}): Story => ({
  render: () => {
    const container = html`
      <swc-toast-region placement=${placement}></swc-toast-region>
    `;
    // The spacer stretches the themed background to the viewport, where the container is fixed.
    return mode
      ? theme(
          html`
            <div
              style="inline-size: calc(100vw - 32px); min-block-size: calc(100vh - 32px);"
            ></div>
            ${container}
          `,
          mode,
          dir
        )
      : container;
  },
  parameters,
  play: async ({ canvasElement }) => {
    variants.forEach((variant, index) => {
      if (frontToast && index === variants.length - 1) {
        ToastQueue.add(frontToast.message, {
          variant,
          actionLabel: frontToast.actionLabel,
          onAction: frontToast.actionLabel ? () => {} : undefined,
        });
        return;
      }
      ToastQueue.add(`Notification ${index + 1}`, { variant });
    });
    const container = canvasElement.querySelector('swc-toast-region')!;
    await container.updateComplete;
    const front = container.shadowRoot?.querySelector('swc-toast');
    // Waits for the front toast's enter transition so the snapshot is at rest.
    await waitFor(() => {
      const surface = front?.shadowRoot?.querySelector('.swc-Toast');
      expect(
        surface && getComputedStyle(surface).opacity,
        'front toast opacity'
      ).toBe('1');
    });
    if (focusFront && front) {
      forcePseudoState(front, 'focus-visible');
    }
  },
});

// VRT stories

export const BottomStack: Story = stackStory();

export const BottomEndStack: Story = stackStory({ placement: 'bottom-end' });

export const TopStack: Story = stackStory({ placement: 'top' });

export const TopEndStack: Story = stackStory({ placement: 'top-end' });

// Neutral layers use the default background, which has no variant modifier.
export const NeutralStack: Story = stackStory({
  variants: ['neutral', 'neutral', 'negative'],
});

// Only the two layers behind the front toast render, however many are queued.
export const StackBeyondThree: Story = stackStory({
  variants: ['neutral', 'info', 'positive', 'negative', 'info'],
});

// The end placements are logical, so RTL moves the stack to the opposite side.
export const DarkRtlStack: Story = stackStory({
  placement: 'bottom-end',
  mode: 'dark',
  dir: 'rtl',
});

// The layers take the front toast's size, so a tall toast must peek by the same amount as a one-line one.
export const TallFrontToastStack: Story = stackStory({
  frontToast: {
    message:
      'Your changes to the quarterly report were saved, and a copy was sent to everyone who has access to the shared folder.',
    actionLabel: 'Undo this change',
  },
});

// The focus ring and the stacked shadow filter share the front toast.
export const FocusedStack: Story = stackStory({ focusFront: true });

export const ForcedColors: Story = stackStory({
  parameters: forcedColorsVrtParameters,
});
