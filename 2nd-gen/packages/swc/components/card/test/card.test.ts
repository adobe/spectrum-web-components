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

import type { Card } from '@adobe/spectrum-wc/card';
import {
  CARD_DENSITIES,
  CARD_VARIANTS,
  SWC_CARD_CLICK_EVENT,
} from '@adobe/spectrum-wc-core/components/card/index.js';

import '@adobe/spectrum-wc/components/card/swc-card.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';

// Tests for the concrete swc-card. This is the sole automated coverage for
// the card family's shared behavior (CardBase) and shared template
// (renderCardTemplate) — both are exercised transitively through the real
// element rather than through throwaway fixtures. Coverage that a concrete
// swc-card cannot reach (the template's glyph callback and its
// callback-absent branches, which only swc-user-card / swc-product-card will
// exercise) is tracked in the card family plan's "Untestable at this phase"
// table.
//
// The cross-shadow-boundary filtering cases use a real swc-action-button —
// the documented expected content of the actions slot — as the element whose
// internal <button> lives in another shadow tree.
export default {
  title: 'Card/Tests',
  component: 'swc-card',
  tags: ['!autodocs', 'dev'],
  parameters: {
    docs: { disable: true, page: null },
  },
} as Meta;

const previewImage = (slot = 'preview'): ReturnType<typeof html> => html`
  <img slot=${slot} src="https://picsum.photos/id/64/240/160" alt="" />
`;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
// TEST: Slots and anatomy
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  render: () => html`
    <swc-card>
      ${previewImage()}
      <span slot="title">Card title</span>
      <button slot="actions" type="button">Edit</button>
      <span slot="description">Supporting text</span>
      <span slot="footer">Footer</span>
      <span>Default body content</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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

export const CollectionSlotTest: Story = {
  render: () => html`
    <swc-card>
      ${previewImage()} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      <span slot="title">Collection card</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step('renders the collection container in the shadow DOM', () => {
      expect(
        card.renderRoot.querySelector('.swc-Card-collection'),
        'swc-Card-collection container is rendered'
      ).toBeTruthy();
    });

    await step('routes collection content into the collection slot', () => {
      const collectionSlot = card.renderRoot.querySelector<HTMLSlotElement>(
        'slot[name="collection"]'
      );
      expect(collectionSlot, 'collection slot exists').toBeTruthy();
      expect(
        collectionSlot?.assignedElements().length,
        'three collection images are assigned to the slot'
      ).toBe(3);
    });
  },
};

export const MediaSlotTest: Story = {
  render: () => html`
    <swc-card>
      ${previewImage()}
      <span slot="media" class="media-overlay">Overlay</span>
      <span slot="title">Card title</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step('routes media content into the media overlay slot', () => {
      const mediaSlot =
        card.renderRoot.querySelector<HTMLSlotElement>('slot[name="media"]');
      expect(mediaSlot, 'media slot exists').toBeTruthy();
      const assigned = mediaSlot?.assignedElements() ?? [];
      expect(
        assigned.length,
        'the media element is assigned to the media slot'
      ).toBe(1);
      expect(
        assigned[0]?.classList.contains('media-overlay'),
        'the assigned element is the overlay content'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: hasDefault derived-state class
// ──────────────────────────────────────────────────────────────

export const HasDefaultSlotClassTest: Story = {
  render: () => html`
    <swc-card>
      <span>Default body content</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'applies the hasDefault class when default slot content is present',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-Card--hasDefault'),
          'hasDefault class is applied when default slot content exists'
        ).toBe(true);
      }
    );
  },
};

export const HasDefaultSlotClassBareTextTest: Story = {
  render: () => html`
    <swc-card>Bare text with no wrapping element</swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'applies the hasDefault class for bare text with no wrapping element',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-Card--hasDefault'),
          'hasDefault class is applied for a bare text node'
        ).toBe(true);
      }
    );
  },
};

export const NoDefaultSlotClassTest: Story = {
  render: () => html`
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'does not apply the hasDefault class when the default slot is empty',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-Card--hasDefault'),
          'hasDefault class is not applied when default slot is empty'
        ).toBe(false);
      }
    );
  },
};

export const DefaultSlotClassUpdatesDynamicallyTest: Story = {
  render: () => html`
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const wrapper = card.renderRoot.querySelector('.swc-CardBase');
    // ObserveSlotText's MutationController fires as a microtask; a
    // requestAnimationFrame tick reliably runs after it has resolved.
    const waitForMutation = (): Promise<void> =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    await step(
      'applies the hasDefault class when content is added after initial render',
      async () => {
        const content = document.createElement('span');
        content.textContent = 'Added later';
        card.appendChild(content);

        await waitForMutation();
        await card.updateComplete;

        expect(
          wrapper?.classList.contains('swc-Card--hasDefault'),
          'hasDefault class is applied after dynamically adding content'
        ).toBe(true);
      }
    );

    await step(
      'removes the hasDefault class when that content is later removed',
      async () => {
        card.querySelector('span')?.remove();

        await waitForMutation();
        await card.updateComplete;

        expect(
          wrapper?.classList.contains('swc-Card--hasDefault'),
          'hasDefault class is removed after removing the content'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: swc-card CSS layout contracts
// ──────────────────────────────────────────────────────────────

export const CollectionOverflowTest: Story = {
  render: () => html`
    <swc-card>
      ${previewImage()} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      ${previewImage('collection')}
      <span slot="title">Overflowing collection</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const collectionItems = card.querySelectorAll<HTMLImageElement>(
      '[slot="collection"]'
    );

    await step('renders four collection items in the light DOM', () => {
      expect(collectionItems.length, 'four collection items authored').toBe(4);
    });

    await step(
      'hides the fourth collection item, keeps the first three',
      () => {
        expect(
          getComputedStyle(collectionItems[0]).display,
          'the first collection item is visible'
        ).not.toBe('none');
        expect(
          getComputedStyle(collectionItems[2]).display,
          'the third collection item is visible'
        ).not.toBe('none');
        expect(
          getComputedStyle(collectionItems[3]).display,
          'the fourth collection item is hidden'
        ).toBe('none');
      }
    );
  },
};

export const GalleryLayoutTest: Story = {
  render: () => html`
    <swc-card class="gallery">${previewImage()}</swc-card>
    <swc-card class="regular">
      ${previewImage()}
      <span slot="title">Not a gallery</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const gallery = canvasElement.querySelector<Card>('swc-card.gallery')!;
    const regular = canvasElement.querySelector<Card>('swc-card.regular')!;
    await gallery.updateComplete;
    await regular.updateComplete;

    const layoutOf = (card: Card): string => {
      const wrapper = card.renderRoot.querySelector('.swc-Card');
      return wrapper
        ? getComputedStyle(wrapper)
            .getPropertyValue('--_swc-card-media-layout')
            .trim()
        : '';
    };

    await step(
      'sets the gallery layout when no content slots are populated',
      () => {
        expect(
          layoutOf(gallery),
          'a preview-only card resolves to the gallery layout'
        ).toBe('gallery');
      }
    );

    await step(
      'does not set the gallery layout when a title is present',
      () => {
        expect(
          layoutOf(regular),
          'a card with title content is not in the gallery layout'
        ).not.toBe('gallery');
      }
    );
  },
};

export const XsMergedLayoutTest: Story = {
  render: () => html`
    <swc-card size="xs">
      ${previewImage()} ${previewImage('collection')}
      ${previewImage('collection')} ${previewImage('collection')}
      <span slot="title">Extra-small</span>
      <span slot="description">Preview merges into the collection row.</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const collectionItems = card.querySelectorAll<HTMLImageElement>(
      '[slot="collection"]'
    );

    await step(
      'resolves to the merged 3col layout when preview and collection are both present at xs',
      () => {
        const wrapper = card.renderRoot.querySelector('.swc-Card');
        expect(
          getComputedStyle(wrapper!)
            .getPropertyValue('--_swc-card-media-layout')
            .trim(),
          'xs card with both slots resolves to the merged 3col layout'
        ).toBe('3col');
      }
    );

    await step(
      'caps the collection at two items when merged with the preview',
      () => {
        expect(
          getComputedStyle(collectionItems[1]).display,
          'the second collection item is visible'
        ).not.toBe('none');
        expect(
          getComputedStyle(collectionItems[2]).display,
          'the third collection item is hidden at xs'
        ).toBe('none');
      }
    );
  },
};

export const HasDefaultSlotClassTest: Story = {
  render: () => html`
    <test-card-base>
      <span>Default body content</span>
    </test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'applies the hasDefault class when default slot content is present',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-TestCardBase--hasDefault'),
          'hasDefault class is applied when default slot content exists'
        ).toBe(true);
      }
    );
  },
};

export const HasDefaultSlotClassBareTextTest: Story = {
  render: () => html`
    <test-card-base>Bare text with no wrapping element</test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'applies the hasDefault class for bare text with no wrapping element',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-TestCardBase--hasDefault'),
          'hasDefault class is applied for a bare text node'
        ).toBe(true);
      }
    );
  },
};

export const NoDefaultSlotClassTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );

    await step(
      'does not apply the hasDefault class when the default slot is empty',
      async () => {
        const wrapper = card.renderRoot.querySelector('.swc-CardBase');
        expect(
          wrapper?.classList.contains('swc-TestCardBase--hasDefault'),
          'hasDefault class is not applied when default slot is empty'
        ).toBe(false);
      }
    );
  },
};

export const DefaultSlotClassUpdatesDynamicallyTest: Story = {
  render: () => html`
    <test-card-base></test-card-base>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<TestCardBase>(
      canvasElement,
      'test-card-base'
    );
    const wrapper = card.renderRoot.querySelector('.swc-CardBase');
    // ObserveSlotText's MutationController fires as a microtask; a
    // requestAnimationFrame tick reliably runs after it has resolved.
    const waitForMutation = () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    await step(
      'applies the hasDefault class when content is added after initial render',
      async () => {
        const content = document.createElement('span');
        content.textContent = 'Added later';
        card.appendChild(content);

        await waitForMutation();
        await card.updateComplete;

        expect(
          wrapper?.classList.contains('swc-TestCardBase--hasDefault'),
          'hasDefault class is applied after dynamically adding content'
        ).toBe(true);
      }
    );

    await step(
      'removes the hasDefault class when that content is later removed',
      async () => {
        card.querySelector('span')?.remove();

        await waitForMutation();
        await card.updateComplete;

        expect(
          wrapper?.classList.contains('swc-TestCardBase--hasDefault'),
          'hasDefault class is removed after removing the content'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Behaviors
// ──────────────────────────────────────────────────────────────

export const TitleAsLinkClickProxyTest: Story = {
  render: () => html`
    <swc-card title-as-link></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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

export const ActionsSizePropagationTest: Story = {
  render: () => html`
    <swc-card size="l">
      <button slot="actions" type="button">Edit</button>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const button = card.querySelector('[slot="actions"]') as HTMLElement;

    await step(
      'propagates a size one step smaller than the card onto the actions slot content',
      async () => {
        expect(
          button.getAttribute('size'),
          'actions content size is one step smaller than the card'
        ).toBe('m');
      }
    );

    await step(
      'updates the propagated size reactively when the card size changes',
      async () => {
        card.size = 'xl';
        await card.updateComplete;

        expect(
          button.getAttribute('size'),
          'actions content size updates when card size changes'
        ).toBe('l');
      }
    );

    await step(
      'clamps at the smallest size instead of propagating an invalid value',
      async () => {
        card.size = 'xs';
        await card.updateComplete;

        expect(
          button.getAttribute('size'),
          'actions content size clamps at xs'
        ).toBe('xs');
      }
    );

    await step(
      'propagates to actions content slotted in after the initial render',
      async () => {
        card.size = 'l';
        await card.updateComplete;

        const actionsSlot = card.renderRoot.querySelector(
          'slot[name="actions"]'
        ) as HTMLSlotElement;
        const slotChanged = new Promise<void>((resolve) =>
          actionsSlot.addEventListener('slotchange', () => resolve(), {
            once: true,
          })
        );

        const lateButton = document.createElement('button');
        lateButton.slot = 'actions';
        lateButton.textContent = 'Delete';
        card.appendChild(lateButton);

        await slotChanged;

        expect(
          lateButton.getAttribute('size'),
          'size propagates to content slotted in after the initial render'
        ).toBe('m');
        card.removeChild(lateButton);
      }
    );
  },
};

export const SelectableActivationTest: Story = {
  render: () => html`
    <swc-card selectable></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    let dispatched = false;
    card.addEventListener(SWC_CARD_CLICK_EVENT, () => {
      dispatched = true;
    });

    await step(
      `dispatches ${SWC_CARD_CLICK_EVENT} for a surface click`,
      async () => {
        dispatched = false;
        card.click();
        expect(
          dispatched,
          `${SWC_CARD_CLICK_EVENT} dispatched for a surface click`
        ).toBe(true);
      }
    );

    await step(`dispatches ${SWC_CARD_CLICK_EVENT} on Enter`, async () => {
      dispatched = false;
      card.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Enter',
          bubbles: true,
          composed: true,
        })
      );
      expect(
        dispatched,
        `${SWC_CARD_CLICK_EVENT} dispatched on Enter keydown`
      ).toBe(true);
    });

    await step(`dispatches ${SWC_CARD_CLICK_EVENT} on Space`, async () => {
      dispatched = false;
      card.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'Space',
          bubbles: true,
          composed: true,
        })
      );
      expect(
        dispatched,
        `${SWC_CARD_CLICK_EVENT} dispatched on Space keydown`
      ).toBe(true);
    });
  },
};

export const InteractiveTargetFilteringTest: Story = {
  render: () => html`
    <swc-card selectable></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    let dispatched = false;
    card.addEventListener(SWC_CARD_CLICK_EVENT, () => {
      dispatched = true;
    });

    await step(
      `does not dispatch ${SWC_CARD_CLICK_EVENT} for a click inside actions`,
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
          `${SWC_CARD_CLICK_EVENT} did not fire for an actions click`
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
      `dispatches ${SWC_CARD_CLICK_EVENT} for a non-interactive click outside actions`,
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
          `${SWC_CARD_CLICK_EVENT} fires for a non-interactive click outside actions`
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
      "excludes an action button's shadow-DOM <button> inside actions, across the shadow boundary",
      async () => {
        dispatched = false;
        const actionButton = document.createElement('swc-action-button');
        actionButton.slot = 'actions';
        actionButton.setAttribute('accessible-label', 'Edit');
        card.appendChild(actionButton);
        await card.updateComplete;

        const innerButton = actionButton.shadowRoot?.querySelector('button');
        expect(
          innerButton,
          'the action button renders a <button> in its own shadow root'
        ).toBeTruthy();

        innerButton?.click();

        expect(dispatched, 'a shadow-DOM button in actions is excluded').toBe(
          false
        );
        card.removeChild(actionButton);
      }
    );

    await step(
      "excludes an action button's shadow-DOM <button> outside actions via tabIndex alone",
      async () => {
        dispatched = false;
        const actionButton = document.createElement('swc-action-button');
        actionButton.slot = 'description';
        actionButton.setAttribute('accessible-label', 'Edit');
        card.appendChild(actionButton);
        await card.updateComplete;

        const innerButton = actionButton.shadowRoot?.querySelector('button');

        innerButton?.click();

        expect(
          dispatched,
          'a shadow-DOM button outside actions is still excluded via tabIndex'
        ).toBe(false);
        card.removeChild(actionButton);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Elevated nested interactive targets (CSS z-index)
// ──────────────────────────────────────────────────────────────

/**
 * The title-as-link stretched-link pseudo-element covers the whole card
 * surface; non-title slotted content is given `z-index: 1` so it sits above
 * that pseudo-element and stays independently clickable. This asserts the CSS
 * elevation via real hit-testing (`elementFromPoint`): a click at the nested
 * link's location must resolve to the nested link itself, not to the title
 * anchor (which owns the covering `::before` and would be the hit-test result
 * if the nested content were not elevated). Unlike the JS click-filtering
 * above — which uses direct `.click()` and never exercises hit-testing — this
 * fails if the elevation regresses.
 */
export const ElevatedNestedTargetTest: Story = {
  render: () => html`
    <swc-card title-as-link>
      <a slot="title" href="https://example.com/profile">Jane Doe</a>
      <a slot="description" href="https://example.com/details" class="nested">
        In-content link
      </a>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const titleLink = card.querySelector(
      'a[slot="title"]'
    ) as HTMLAnchorElement;
    const nestedLink = card.querySelector('a.nested') as HTMLAnchorElement;

    await step(
      "hit-testing at the nested link resolves to it, not the title link's stretched pseudo-element",
      async () => {
        const rect = nestedLink.getBoundingClientRect();
        const topElement = document.elementFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );

        expect(
          topElement === nestedLink || nestedLink.contains(topElement),
          'the elevated nested link is the topmost element at its own location'
        ).toBe(true);
        expect(
          topElement === titleLink,
          "the title link's stretched pseudo-element does not cover the nested link"
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Stretched title link covers the card surface (CSS ::before)
// ──────────────────────────────────────────────────────────────

/**
 * `title-as-link` renders a `::before` pseudo-element on the title anchor,
 * absolutely positioned to `inset: 0` of the card, extending the anchor's hit
 * area across the whole surface. Hit-testing (`elementFromPoint`) over the
 * preview region — which has `pointer-events: none`, so the pointer passes
 * through it — must resolve to the title anchor (the pseudo-element's
 * originating element), proving the stretched link reaches beyond the anchor's
 * own text box. This isolates the CSS mechanism from CardBase's JS click-proxy
 * (which would also activate the link on a surface click, so a click-based
 * assertion could not attribute the behavior to the CSS).
 */
export const StretchedLinkSurfaceTest: Story = {
  render: () => html`
    <swc-card title-as-link>
      ${previewImage()}
      <a slot="title" href="https://example.com/profile">Jane Doe</a>
      <span slot="description">Supporting description text.</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const titleLink = card.querySelector(
      'a[slot="title"]'
    ) as HTMLAnchorElement;
    const preview = card.querySelector('[slot="preview"]') as HTMLElement;

    await step(
      'hit-testing over the preview region resolves to the stretched title link',
      async () => {
        const rect = preview.getBoundingClientRect();
        const topElement = document.elementFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );

        expect(
          topElement === titleLink || titleLink.contains(topElement),
          "the title link's ::before covers the preview region, extending its hit area"
        ).toBe(true);
      }
    );
  },
};

export const TextSelectionFilteringTest: Story = {
  render: () => html`
    <swc-card selectable>
      <span slot="description">Selectable description text</span>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');
    const description = card.querySelector(
      '[slot="description"]'
    ) as HTMLElement;
    let dispatched = false;
    card.addEventListener(SWC_CARD_CLICK_EVENT, () => {
      dispatched = true;
    });

    await step(
      `does not dispatch ${SWC_CARD_CLICK_EVENT} when a text selection is active`,
      async () => {
        dispatched = false;
        const range = document.createRange();
        range.selectNodeContents(description);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);

        card.click();

        expect(
          dispatched,
          `${SWC_CARD_CLICK_EVENT} does not fire while a text selection is active`
        ).toBe(false);

        selection?.removeAllRanges();
      }
    );

    await step(
      `dispatches ${SWC_CARD_CLICK_EVENT} normally once the selection is cleared`,
      async () => {
        dispatched = false;
        window.getSelection()?.removeAllRanges();

        card.click();

        expect(
          dispatched,
          `${SWC_CARD_CLICK_EVENT} fires again once no selection is active`
        ).toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.variant = 'not-a-variant' as unknown as Card['variant'];
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
    <swc-card variant="secondary"></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step('warns when an invalid density is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        card.density = 'not-a-density' as unknown as Card['density'];
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
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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
    <swc-card>
      <a slot="title" href="https://example.com">Jane Doe</a>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

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

export const ActionsUnsupportedSizeWarningTest: Story = {
  render: () => html`
    <swc-card size="l">
      <button slot="actions" type="button">Edit</button>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'warns when actions content is slotted and size changes to xs',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.size = 'xs';
          await card.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for unsupported actions at size xs'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message references actions'
          ).toContain('actions');
        })
    );

    await step(
      'warns when actions content is slotted in after size is already xs',
      () =>
        withWarningSpy(async (warnCalls) => {
          const actionsSlot = card.renderRoot.querySelector(
            'slot[name="actions"]'
          ) as HTMLSlotElement;
          const slotChanged = new Promise<void>((resolve) =>
            actionsSlot.addEventListener('slotchange', () => resolve(), {
              once: true,
            })
          );

          const lateButton = document.createElement('button');
          lateButton.slot = 'actions';
          lateButton.textContent = 'Delete';
          card.appendChild(lateButton);

          await slotChanged;

          expect(
            warnCalls.length,
            'a warning is emitted for actions content slotted in while size is xs'
          ).toBeGreaterThan(0);
          card.removeChild(lateButton);
        })
    );
  },
};

export const ActionsSupportedSizeNoWarningTest: Story = {
  render: () => html`
    <swc-card size="m">
      <button slot="actions" type="button">Edit</button>
    </swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'does not warn for actions content at a size that supports actions',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.size = 'l';
          await card.updateComplete;
          card.size = 'm';
          await card.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted when actions are supported'
          ).toBe(0);
        })
    );
  },
};

export const ActionsUnsupportedSizeEmptyNoWarningTest: Story = {
  render: () => html`
    <swc-card></swc-card>
  `,
  play: async ({ canvasElement, step }) => {
    const card = await getComponent<Card>(canvasElement, 'swc-card');

    await step(
      'does not warn when switching to size xs with an empty actions slot',
      () =>
        withWarningSpy(async (warnCalls) => {
          card.size = 'xs';
          await card.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted when the actions slot has no content'
          ).toBe(0);
        })
    );
  },
};
