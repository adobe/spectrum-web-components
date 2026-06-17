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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Popover } from '@adobe/spectrum-wc/popover';

import '@adobe/spectrum-wc/components/popover/swc-popover.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/popover.stories.js';

export default {
  ...meta,
  title: 'Popover/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Registration and rendering
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('the custom element is registered', () => {
      expect(
        customElements.get('swc-popover'),
        'swc-popover is defined'
      ).toBeTruthy();
    });

    await step('the element is an instance of Popover', () => {
      expect(popover, 'swc-popover renders').toBeInstanceOf(Popover);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Click-to-toggle (default mode)
// ──────────────────────────────────────────────────────────────

export const ClickToggleTest: Story = {
  render: () => html`
    <button id="click-toggle-trigger">Trigger</button>
    <swc-popover for="click-toggle-trigger">Popover content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#click-toggle-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('starts closed with aria-expanded="false"', () => {
      expect(popover.open, 'closed initially').toBe(false);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    await step('clicking the trigger opens the popover', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'open after first click').toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    await step('clicking the trigger again closes the popover', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'closed after second click').toBe(false);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  },
};
// ──────────────────────────────────────────────────────────────
// TEST: Property defaults (API contract)
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('open defaults to false', () => {
      expect(popover.open, 'open is false').toBe(false);
    });

    await step('modal defaults to false', () => {
      expect(popover.modal, 'modal is false').toBe(false);
    });

    await step('placement defaults to bottom', () => {
      expect(popover.placement, 'placement is bottom').toBe('bottom');
    });

    await step('size defaults to undefined', () => {
      expect(popover.size, 'size is undefined').toBeUndefined();
    });

    await step('hideArrow defaults to false (arrow shown by default)', () => {
      expect(popover.hideArrow, 'hideArrow is false').toBe(false);
    });

    await step('offset defaults to 8', () => {
      expect(popover.offset, 'offset is 8').toBe(8);
    });

    await step('crossOffset defaults to 0', () => {
      expect(popover.crossOffset, 'crossOffset is 0').toBe(0);
    });

    await step('shouldFlip defaults to true', () => {
      expect(popover.shouldFlip, 'shouldFlip is true').toBe(true);
    });

    await step('manual defaults to false', () => {
      expect(popover.manual, 'manual is false').toBe(false);
    });

    await step('triggerElement defaults to null', () => {
      expect(popover.triggerElement, 'triggerElement is null').toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Render shape (default mode)
// ──────────────────────────────────────────────────────────────

export const DefaultModeRenderTest: Story = {
  render: () => html`
    <swc-popover>Default content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step(
      'default mode renders a div[popover=auto] inside shadow root',
      () => {
        const inner = popover.shadowRoot?.querySelector('.swc-Popover');
        expect(inner, 'internal .swc-Popover element exists').toBeTruthy();
        expect(inner?.tagName, 'internal element is a DIV').toBe('DIV');
        expect(
          inner?.getAttribute('popover'),
          'internal element has popover=auto'
        ).toBe('auto');
      }
    );

    await step('content wrapper is present', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content wrapper exists').toBeTruthy();
    });

    await step('arrow tip is rendered by default (hideArrow=false)', () => {
      const tip = popover.shadowRoot?.querySelector('.swc-Popover-tip');
      expect(tip, '.swc-Popover-tip is rendered').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Render shape (modal mode)
// ──────────────────────────────────────────────────────────────

export const ModalModeRenderTest: Story = {
  render: () => html`
    <swc-popover modal>Modal content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('modal mode renders a dialog inside shadow root', () => {
      const inner = popover.shadowRoot?.querySelector('.swc-Popover');
      expect(inner, 'internal .swc-Popover element exists').toBeTruthy();
      expect(inner?.tagName, 'internal element is a DIALOG').toBe('DIALOG');
      expect(
        inner?.hasAttribute('popover'),
        'dialog does not have popover attribute'
      ).toBe(false);
    });

    await step('content wrapper is present in modal mode', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content wrapper exists').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: hide-arrow attribute
// ──────────────────────────────────────────────────────────────

export const HideArrowTest: Story = {
  render: () => html`
    <swc-popover hide-arrow>No arrow</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('tip is hidden when hide-arrow is set', () => {
      const tip = popover.shadowRoot?.querySelector('.swc-Popover-tip');
      expect(tip, '.swc-Popover-tip is not rendered').toBeNull();
    });

    await step('hideArrow property is true', () => {
      expect(popover.hideArrow, 'hideArrow is true').toBe(true);
    });

    await step('hide-arrow attribute is reflected', () => {
      expect(
        popover.hasAttribute('hide-arrow'),
        'hide-arrow attribute is present'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Property reflection
// ──────────────────────────────────────────────────────────────

export const PropertyReflectionTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('placement reflects to attribute after mutation', async () => {
      popover.placement = 'top';
      await popover.updateComplete;
      expect(
        popover.getAttribute('placement'),
        'placement attribute is top after mutation'
      ).toBe('top');
    });

    await step('modal reflects to attribute after mutation', async () => {
      popover.modal = true;
      await popover.updateComplete;
      expect(
        popover.hasAttribute('modal'),
        'modal attribute is present after setting modal=true'
      ).toBe(true);
    });

    await step('size reflects to attribute after mutation', async () => {
      popover.size = 'm';
      await popover.updateComplete;
      expect(
        popover.getAttribute('size'),
        'size attribute is m after mutation'
      ).toBe('m');
    });

    await step('should-flip reflects to attribute after mutation', async () => {
      popover.shouldFlip = false;
      await popover.updateComplete;
      expect(
        popover.hasAttribute('should-flip'),
        'should-flip attribute is absent when false'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Computed placement (actual-placement host attribute)
// ──────────────────────────────────────────────────────────────

export const ActualPlacementTest: Story = {
  render: () => html`
    <button id="actual-placement-trigger">Trigger</button>
    <swc-popover for="actual-placement-trigger" placement="bottom">
      Content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;

    await step('no actual-placement attribute while closed', () => {
      expect(
        popover.hasAttribute('actual-placement'),
        'actual-placement is absent before opening'
      ).toBe(false);
    });

    await step('reflects the resolved physical side while open', async () => {
      popover.open = true;
      await popover.updateComplete;
      // Set synchronously from the declared side, then refreshed by the
      // PlacementController; either way it is a physical side.
      expect(
        ['top', 'bottom', 'left', 'right'],
        'actual-placement is a physical side'
      ).toContain(popover.getAttribute('actual-placement'));
    });

    await step('removes the attribute after the close transition', async () => {
      // Positioning (and the attribute) is torn down only after the close
      // transition completes, so poll rather than awaiting updateComplete.
      popover.open = false;
      await waitFor(() =>
        expect(
          popover.hasAttribute('actual-placement'),
          'actual-placement is removed once closed'
        ).toBe(false)
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidPlacementWarningTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('warns when an invalid placement is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        popover.placement =
          'not-a-placement' as unknown as Popover['placement'];
        await popover.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid placement'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references placement'
        ).toContain('placement');
      })
    );
  },
};

export const ValidPlacementNoWarningTest: Story = {
  render: () => html`
    <swc-popover placement="top">Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step(
      'does not warn when a valid placement is set in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          popover.placement = 'bottom';
          await popover.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted for valid placement'
          ).toBe(0);
        })
    );
  },
};
