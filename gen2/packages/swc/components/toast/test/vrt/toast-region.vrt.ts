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
  // Forces hover on the stack, which lets the layers peek out further.
  hover?: boolean;
  // Opens the expanded view through Show all.
  expanded?: boolean;
  // Forces focus on the second listed toast and on Clear all in the expanded view.
  focusInList?: boolean;
  // Replaces the front toast's message, and gives it an action when `actionLabel` is set.
  frontToast?: { message: string; actionLabel?: string };
  parameters?: Story['parameters'];
};

const defaultVariants: ToastVariant[] = ['info', 'positive', 'negative'];

// Layers and toasts move into place, so each snapshot waits until they are at rest.
const settle = async (container: Element): Promise<void> => {
  await Promise.all(
    (container.shadowRoot?.getAnimations() ?? []).map((animation) =>
      animation.finished.catch(() => undefined)
    )
  );
};

// The container is a single fixed region and every container shares one
// queue, so each snapshot is its own story.
const stackStory = ({
  placement = 'bottom',
  variants = defaultVariants,
  mode,
  dir,
  focusFront = false,
  hover = false,
  expanded = false,
  focusInList = false,
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
    if (hover) {
      forcePseudoState(container, 'hover', '.swc-ToastRegion');
    }
    if (!expanded || !front) {
      await settle(container);
      return;
    }
    front.shadowRoot!.querySelector<HTMLElement>('.swc-Toast-showAll')!.click();
    await waitFor(() =>
      expect(
        container.shadowRoot?.querySelector('dialog')?.open,
        'expanded'
      ).toBe(true)
    );
    const listed = [
      ...container.shadowRoot!.querySelectorAll<HTMLElement>('swc-toast'),
    ];
    // Waits for every listed toast's enter transition so the snapshot is at rest.
    await waitFor(() => {
      for (const toast of listed) {
        const surface = toast.shadowRoot?.querySelector('.swc-Toast');
        expect(
          surface && getComputedStyle(surface).opacity,
          'listed toast opacity'
        ).toBe('1');
      }
    });
    // Show all moves focus to the front toast; drop it so only forced focus shows.
    front.blur();
    if (focusInList) {
      forcePseudoState(listed[1], 'focus-visible');
      const clearAll = container.shadowRoot!.querySelector(
        '.swc-ToastRegion-controls swc-action-button'
      );
      if (clearAll) {
        forcePseudoState(clearAll, 'focus-visible', '.swc-ActionButton');
      }
    }
    await settle(container);
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

// A front toast with no icon lines its Show all chevron up with the content edge instead of the text.
export const NeutralFrontStack: Story = stackStory({
  variants: ['info', 'positive', 'neutral'],
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

// Hovering the stack lets the layers peek out further.
export const HoveredStack: Story = stackStory({ hover: true });

// The focus ring and the stacked shadow filter share the front toast.
export const FocusedStack: Story = stackStory({ focusFront: true });

export const ForcedColors: Story = stackStory({
  parameters: forcedColorsVrtParameters,
});

// The expanded list sits flush with the anchored edge, newest toast nearest it, with Clear all and Collapse on the far side.
export const ExpandedBottom: Story = stackStory({
  expanded: true,
  variants: ['neutral', 'info', 'positive', 'negative'],
  frontToast: { message: 'File could not be saved', actionLabel: 'Retry' },
});

// At the top, the list and the controls run the other way.
export const ExpandedTop: Story = stackStory({
  placement: 'top',
  expanded: true,
});

export const ExpandedDarkRtl: Story = stackStory({
  placement: 'bottom-end',
  mode: 'dark',
  dir: 'rtl',
  expanded: true,
});

// Focus rings are white against the scrim, on toasts and on the controls.
export const ExpandedFocused: Story = stackStory({
  expanded: true,
  focusInList: true,
});

export const ExpandedForcedColors: Story = stackStory({
  expanded: true,
  parameters: forcedColorsVrtParameters,
});
