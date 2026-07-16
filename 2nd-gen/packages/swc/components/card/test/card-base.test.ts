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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  CARD_DENSITIES,
  CARD_VARIANTS,
} from '@adobe/spectrum-wc-core/components/card/index.js';

import './test-card-base.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import type {
  TestCardBase,
  TestCardWithMediaExtras,
} from './test-card-base.js';

// No concrete card component (swc-card, swc-user-card, etc.) exists yet, so
// these tests exercise CardBase directly through the test-only fixtures in
// ./test-card-base.ts. Once a concrete card ships, prefer testing through
// it and retire these.
export default {
  title: 'Card/CardBase (internal)',
  component: 'test-card-base',
  tags: ['!autodocs', 'dev'],
  parameters: {
    docs: { disable: true, page: null },
  },
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('renders expected default property values', async () => {
      expect(card.variant, 'default variant is primary').toBe('primary');
      expect(card.density, 'default density is regular').toBe('regular');
      expect(card.size, 'default size is m').toBe('m');
      expect(card.titleAsLink, 'default titleAsLink is false').toBe(false);
      expect(card.selectable, 'default selectable is false').toBe(false);
    });

    await step('does not set tabindex by default', async () => {
      expect(
        card.hasAttribute('tabindex'),
        'no tabindex attribute by default'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('variant reflects to attribute after mutation', async () => {
      card.variant = 'secondary';
      await card.updateComplete;
      expect(
        card.getAttribute('variant'),
        'variant attribute after mutation'
      ).toBe('secondary');
    });

    await step('density reflects to attribute after mutation', async () => {
      card.density = 'compact';
      await card.updateComplete;
      expect(
        card.getAttribute('density'),
        'density attribute after mutation'
      ).toBe('compact');
    });

    await step(
      'titleAsLink reflects to the title-as-link attribute',
      async () => {
        card.titleAsLink = true;
        await card.updateComplete;
        expect(
          card.hasAttribute('title-as-link'),
          'title-as-link attribute presence'
        ).toBe(true);
      }
    );

    await step(
      'selectable reflects to attribute and manages tabindex',
      async () => {
        card.selectable = true;
        await card.updateComplete;
        expect(
          card.hasAttribute('selectable'),
          'selectable attribute presence'
        ).toBe(true);
        expect(
          card.getAttribute('tabindex'),
          'tabindex set to 0 when selectable'
        ).toBe('0');

        card.selectable = false;
        await card.updateComplete;
        expect(
          card.hasAttribute('tabindex'),
          'tabindex removed when selectable is false'
        ).toBe(false);
      }
    );
  },
};

export const VariantAndDensityValuesTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('accepts every valid variant', async () => {
      for (const variant of CARD_VARIANTS) {
        card.variant = variant;
        await card.updateComplete;
        expect(card.variant, `variant property is "${variant}"`).toBe(variant);
      }
    });

    await step('accepts every valid density', async () => {
      for (const density of CARD_DENSITIES) {
        card.density = density;
        await card.updateComplete;
        expect(card.density, `density property is "${density}"`).toBe(density);
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  render: () => html`
    <test-card-base>
      <img slot="preview" src="https://picsum.photos/id/64/240/160" alt="" />
      <span slot="title">Card title</span>
      <button slot="actions" type="button">Edit</button>
      <span slot="description">Supporting text</span>
      <span slot="footer">Footer</span>
      <span>Default body content</span>
    </test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('renders assigned content for every shared slot', async () => {
      expect(
        card.querySelector('[slot="preview"]'),
        'preview slot content'
      ).toBeTruthy();
      expect(
        card.querySelector('[slot="title"]'),
        'title slot content'
      ).toBeTruthy();
      expect(
        card.querySelector('[slot="actions"]'),
        'actions slot content'
      ).toBeTruthy();
      expect(
        card.querySelector('[slot="description"]'),
        'description slot content'
      ).toBeTruthy();
      expect(
        card.querySelector('[slot="footer"]'),
        'footer slot content'
      ).toBeTruthy();
      const defaultSlotContent = card.querySelectorAll(':scope > :not([slot])');
      expect(
        defaultSlotContent.length,
        'default slot child count'
      ).toBeGreaterThan(0);
    });
  },
};

export const MediaExtrasTest: Story = {
  render: () => html`
    <test-card-with-media-extras></test-card-with-media-extras>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardWithMediaExtras>(
      canvasElement,
      'test-card-with-media-extras'
    );

    await step('renders the supplied renderCollection content', async () => {
      const marker = card.renderRoot.querySelector('.test-collection-marker');
      expect(marker, 'collection marker rendered in shadow DOM').toBeTruthy();
    });

    await step('renders the supplied renderGlyph content', async () => {
      const marker = card.renderRoot.querySelector('.test-glyph-marker');
      expect(marker, 'glyph marker rendered in shadow DOM').toBeTruthy();
    });
  },
};

export const NoMediaExtrasByDefaultTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'renders no collection or glyph content when not supplied',
      async () => {
        expect(
          card.renderRoot.querySelector('.test-collection-marker'),
          'no collection marker by default'
        ).toBeFalsy();
        expect(
          card.renderRoot.querySelector('.test-glyph-marker'),
          'no glyph marker by default'
        ).toBeFalsy();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Behaviors
// ──────────────────────────────────────────────────────────────

export const TitleAsLinkClickProxyTest: Story = {
  render: () => html`
    <test-card-base title-as-link></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'proxies a surface click to a directly-slotted title anchor',
      async () => {
        const anchor = document.createElement('a');
        anchor.slot = 'title';
        anchor.href = 'https://example.com/profile';
        anchor.textContent = 'Jane Doe';
        let activated = false;
        anchor.addEventListener('click', (event) => {
          event.preventDefault();
          activated = true;
        });
        card.appendChild(anchor);
        await card.updateComplete;

        card.click();

        expect(activated, 'title anchor received a proxied click').toBe(true);
        card.removeChild(anchor);
      }
    );

    await step(
      'proxies a surface click to an anchor nested inside a title wrapper',
      async () => {
        const wrapper = document.createElement('span');
        wrapper.slot = 'title';
        const anchor = document.createElement('a');
        anchor.href = 'https://example.com/profile';
        anchor.textContent = 'Jane Doe';
        let activated = false;
        anchor.addEventListener('click', (event) => {
          event.preventDefault();
          activated = true;
        });
        wrapper.appendChild(anchor);
        card.appendChild(wrapper);
        await card.updateComplete;

        card.click();

        expect(activated, 'nested title anchor received a proxied click').toBe(
          true
        );
        card.removeChild(wrapper);
      }
    );
  },
};

export const SelectableActivationTest: Story = {
  render: () => html`
    <test-card-base selectable></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );
    let dispatched = false;
    card.addEventListener('swc-card-click', () => {
      dispatched = true;
    });

    await step('dispatches swc-card-click for a surface click', async () => {
      dispatched = false;
      card.click();
      expect(dispatched, 'swc-card-click dispatched for a surface click').toBe(
        true
      );
    });

    await step('dispatches swc-card-click on Enter', async () => {
      dispatched = false;
      card.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Enter',
          bubbles: true,
          composed: true,
        })
      );
      expect(dispatched, 'swc-card-click dispatched on Enter keydown').toBe(
        true
      );
    });

    await step('dispatches swc-card-click on Space', async () => {
      dispatched = false;
      card.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Space',
          bubbles: true,
          composed: true,
        })
      );
      expect(dispatched, 'swc-card-click dispatched on Space keydown').toBe(
        true
      );
    });
  },
};

export const InteractiveTargetFilteringTest: Story = {
  render: () => html`
    <test-card-base selectable></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );
    let dispatched = false;
    card.addEventListener('swc-card-click', () => {
      dispatched = true;
    });

    await step(
      'does not dispatch swc-card-click for a click inside actions',
      async () => {
        dispatched = false;
        const button = document.createElement('button');
        button.type = 'button';
        button.slot = 'actions';
        button.textContent = 'Edit';
        card.appendChild(button);
        await card.updateComplete;

        button.click();

        expect(
          dispatched,
          'swc-card-click did not fire for an actions click'
        ).toBe(false);
        card.removeChild(button);
      }
    );

    await step(
      'excludes the actions slot unconditionally, even for a non-focusable child',
      async () => {
        dispatched = false;
        const span = document.createElement('span');
        span.slot = 'actions';
        span.textContent = 'Not actually interactive';
        card.appendChild(span);
        await card.updateComplete;

        span.click();

        expect(
          dispatched,
          'actions slot is excluded even without a focusable child'
        ).toBe(false);
        card.removeChild(span);
      }
    );

    await step(
      'dispatches swc-card-click for a non-interactive click outside actions',
      async () => {
        dispatched = false;
        const span = document.createElement('span');
        span.slot = 'description';
        span.textContent = 'Just some text';
        card.appendChild(span);
        await card.updateComplete;

        span.click();

        expect(
          dispatched,
          'swc-card-click fires for a non-interactive click outside actions'
        ).toBe(true);
        card.removeChild(span);
      }
    );

    await step(
      'does not treat tabindex="-1" as an interactive target',
      async () => {
        dispatched = false;
        const div = document.createElement('div');
        div.slot = 'description';
        div.tabIndex = -1;
        div.textContent = 'Programmatically focusable only';
        card.appendChild(div);
        await card.updateComplete;

        div.click();

        expect(
          dispatched,
          'tabindex="-1" is not treated as an interactive target'
        ).toBe(true);
        card.removeChild(div);
      }
    );

    await step(
      'excludes a shadow-DOM button inside actions, regardless of which shadow tree it belongs to',
      async () => {
        dispatched = false;
        const host = document.createElement('test-nested-button-host');
        host.slot = 'actions';
        card.appendChild(host);
        await card.updateComplete;

        const innerButton = host.shadowRoot?.querySelector('button');
        expect(
          innerButton,
          'nested button rendered inside its own shadow root'
        ).toBeTruthy();

        innerButton?.click();

        expect(
          dispatched,
          'nested shadow-DOM button in actions is excluded'
        ).toBe(false);
        card.removeChild(host);
      }
    );

    await step(
      'excludes a shadow-DOM button outside actions via tabIndex alone',
      async () => {
        dispatched = false;
        const host = document.createElement('test-nested-button-host');
        host.slot = 'description';
        card.appendChild(host);
        await card.updateComplete;

        const innerButton = host.shadowRoot?.querySelector('button');

        innerButton?.click();

        expect(
          dispatched,
          'nested shadow-DOM button outside actions is still excluded via tabIndex'
        ).toBe(false);
        card.removeChild(host);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.variant = 'not-a-variant' as unknown as TestCardBase['variant'];
        await card.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid variant'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references variant'
        ).toContain('variant');
      })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <test-card-base variant="secondary"></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('does not warn when a valid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.variant = 'tertiary';
        await card.updateComplete;

        expect(
          warnCalls.length,
          'no warnings are emitted for a valid variant'
        ).toBe(0);
      })
    );
  },
};

export const InvalidDensityWarningTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('warns when an invalid density is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.density = 'not-a-density' as unknown as TestCardBase['density'];
        await card.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid density'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references density'
        ).toContain('density');
      })
    );
  },
};

export const ValidDensityNoWarningTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step('does not warn when a valid density is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.density = 'spacious';
        await card.updateComplete;

        expect(
          warnCalls.length,
          'no warnings are emitted for a valid density'
        ).toBe(0);
      })
    );
  },
};

export const TitleAsLinkMissingAnchorWarningTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'warns when title-as-link is set with no anchor in the title slot',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.titleAsLink = true;
          await card.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for a missing title anchor'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message references title-as-link'
          ).toContain('title-as-link');
        })
    );
  },
};

export const TitleAsLinkWithAnchorNoWarningTest: Story = {
  render: () => html`
    <test-card-base>
      <a slot="title" href="https://example.com">Jane Doe</a>
    </test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'does not warn when title-as-link has a valid anchor in the title slot',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.titleAsLink = true;
          await card.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted when a title anchor is present'
          ).toBe(0);
        })
    );
  },
};
