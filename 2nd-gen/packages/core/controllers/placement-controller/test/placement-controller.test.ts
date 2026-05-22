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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../stories/demo-hosts.js';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import type {
  DemoPlacementFlip,
  DemoPlacementPlayground,
  DemoPlacementVirtualTrigger,
} from '../stories/demo-hosts.js';
import meta, {
  Playground,
  ShouldFlip,
  VirtualTrigger,
} from '../stories/placement-controller.stories.js';

function readTranslate(el: HTMLElement): [number, number] {
  const match = el.style.translate.match(/^(-?\d*\.?\d+)px\s+(-?\d*\.?\d+)px$/);
  if (!match) {
    return [0, 0];
  }
  return [Number(match[1]), Number(match[2])];
}

function nextFrames(count = 2): Promise<void> {
  return new Promise<void>((resolve) => {
    let remaining = count;
    const tick = (): void => {
      remaining -= 1;
      if (remaining <= 0) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
}

export default {
  ...meta,
  title: 'Controllers/Placement controller/Tests',
  parameters: { ...meta.parameters, docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const AlignsStartAndEnd: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();

    await step(
      'bottom-start and bottom-end differ on the cross axis',
      async () => {
        host.placement = 'bottom-start';
        await nextFrames();
        const [startX] = readTranslate(host.floatingEl);

        host.placement = 'bottom-end';
        await nextFrames();
        const [endX] = readTranslate(host.floatingEl);

        expect(startX).not.toBe(endX);
      }
    );
  },
};

export const PositionsBelowTrigger: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();

    await step('reports computed placement', async () => {
      expect(host.actualPlacement).toBe('bottom');
    });

    await step('floating element sits below trigger', async () => {
      const triggerRect = host.triggerEl.getBoundingClientRect();
      const [, y] = readTranslate(host.floatingEl);
      expect(y).toBeGreaterThanOrEqual(Math.floor(triggerRect.bottom));
    });
  },
};

export const FlipReorients: Story = {
  ...ShouldFlip,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementFlip>(
      canvasElement,
      'demo-placement-flip'
    );
    await nextFrames();

    await step('flips away from bottom when no room', async () => {
      expect(host.actualPlacement).toBeTruthy();
      expect(host.actualPlacement).not.toBe('bottom');
    });
  },
};

export const VirtualTriggerMoves: Story = {
  ...VirtualTrigger,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementVirtualTrigger>(
      canvasElement,
      'demo-placement-virtual-trigger'
    );
    await nextFrames();

    const [, initialY] = readTranslate(host.floatingEl);

    await step('click moves the floating element', async () => {
      const rect = host.surfaceEl.getBoundingClientRect();
      host.surfaceEl.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          composed: true,
          clientX: rect.left + 200,
          clientY: rect.top + 200,
        })
      );
      await nextFrames();
      const [, nextY] = readTranslate(host.floatingEl);
      expect(nextY).toBeGreaterThan(initialY);
    });
  },
};

export const StopOnDisconnect: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DemoPlacementPlayground>(
      canvasElement,
      'demo-placement-playground'
    );
    await nextFrames();
    const before = host.floatingEl.style.translate;

    await step('disconnect freezes translate', async () => {
      host.remove();
      window.dispatchEvent(new Event('resize'));
      await nextFrames();
      expect(host.floatingEl.style.translate).toBe(before);
    });
  },
};
