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

import { Avatar } from '@adobe/spectrum-wc/avatar';

import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';

import { AVATAR_VALID_SIZES } from '../../../../core/components/avatar/Avatar.types.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Decorative,
  Disabled,
  Overview,
  Sizes,
} from '../stories/avatar.stories.js';

const PLACEHOLDER_SRC = 'https://picsum.photos/id/64/500/500';

export default {
  ...meta,
  title: 'Avatar/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('renders expected default property values', async () => {
      expect(avatar.src, 'src property').toBe(PLACEHOLDER_SRC);
      expect(avatar.alt, 'alt property').toBe('Jane Doe');
      expect(avatar.size, 'size property').toBe(500);
      expect(avatar.outline, 'outline property').toBe(false);
      expect(avatar.disabled, 'disabled property').toBe(false);
      expect(avatar.decorative, 'decorative property').toBe(false);
    });

    await step('size attribute is present after first render', async () => {
      expect(avatar.hasAttribute('size'), 'size attribute presence').toBe(true);
      expect(avatar.getAttribute('size'), 'size attribute value').toBe('500');
    });

    await step(
      'aria-hidden is not set when the avatar is not decorative',
      async () => {
        expect(avatar.hasAttribute('aria-hidden'), 'aria-hidden absence').toBe(
          false
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeSetByFirstUpdatedTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe"></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'sets size attribute to default when not passed as attribute',
      async () => {
        expect(avatar.hasAttribute('size'), 'size attribute present').toBe(
          true
        );
        expect(avatar.getAttribute('size'), 'size attribute value').toBe('500');
        expect(avatar.size, 'size property value').toBe(500);
      }
    );
  },
};

export const SizeReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('reflects size to attribute after mutation', async () => {
      avatar.size = 300;
      await avatar.updateComplete;
      expect(avatar.getAttribute('size'), 'size attribute after mutation').toBe(
        '300'
      );
      expect(avatar.size, 'size property after mutation').toBe(300);
    });

    await step(
      'does not trigger update when size is set to its current value',
      async () => {
        // This step exercises the early-return guard in the size setter
        // (`if (this._size === validSize) return`). The assertion verifies
        // the final state is unchanged; branch coverage is confirmed by the
        // coverage tool rather than a behavioral distinction.
        const sizeBefore = avatar.size;
        avatar.size = sizeBefore;
        await avatar.updateComplete;
        expect(avatar.size, 'size unchanged after same-value set').toBe(
          sizeBefore
        );
      }
    );
  },
};

export const SizeInvalidFallbackTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'falls back to default size (500) when given an invalid value',
      async () => {
        avatar.size = 999 as Avatar['size'];
        await avatar.updateComplete;
        expect(avatar.size, 'size after invalid value').toBe(500);
        expect(
          avatar.getAttribute('size'),
          'size attribute after invalid'
        ).toBe('500');
      }
    );
  },
};

export const AltAriaHiddenTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe"></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('sets aria-hidden on host when decorative is set', async () => {
      avatar.decorative = true;
      await avatar.updateComplete;
      expect(
        avatar.hasAttribute('aria-hidden'),
        'aria-hidden when decorative'
      ).toBe(true);
      expect(
        avatar.getAttribute('aria-hidden'),
        'aria-hidden value when decorative'
      ).toBe('true');
    });

    await step(
      'removes aria-hidden from host when decorative is unset',
      async () => {
        avatar.decorative = false;
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden removed when not decorative'
        ).toBe(false);
      }
    );

    await step(
      'does not set aria-hidden when only alt is changed to empty string',
      async () => {
        // aria-hidden is exclusively controlled by the decorative property;
        // alt="" alone affects only the <img> alt attribute, not host visibility.
        avatar.alt = '';
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden not set by alt="" alone'
        ).toBe(false);
      }
    );
  },
};

export const OutlineReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('reflects outline attribute after mutation', async () => {
      avatar.outline = true;
      await avatar.updateComplete;
      expect(avatar.hasAttribute('outline'), 'outline attribute presence').toBe(
        true
      );

      avatar.outline = false;
      await avatar.updateComplete;
      expect(avatar.hasAttribute('outline'), 'outline attribute removed').toBe(
        false
      );
    });

    await step(
      'does not toggle aria-hidden when a non-decorative property changes',
      async () => {
        // alt="Jane Doe" from Overview args — aria-hidden should remain absent
        // even after outline changes (covers changes.has("decorative") === false path)
        avatar.outline = true;
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden unaffected by outline change'
        ).toBe(false);
      }
    );
  },
};

export const DisabledTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('reflects disabled attribute on initial render', async () => {
      expect(avatar.disabled, 'disabled property').toBe(true);
      expect(
        avatar.hasAttribute('disabled'),
        'disabled attribute presence'
      ).toBe(true);
    });

    await step('removes disabled attribute after mutation', async () => {
      avatar.disabled = false;
      await avatar.updateComplete;
      expect(avatar.disabled, 'disabled property after removal').toBe(false);
      expect(
        avatar.hasAttribute('disabled'),
        'disabled attribute removed'
      ).toBe(false);
    });

    await step('re-applies disabled attribute after re-enabling', async () => {
      avatar.disabled = true;
      await avatar.updateComplete;
      expect(
        avatar.hasAttribute('disabled'),
        'disabled attribute re-applied'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const avatars = await getComponents<Avatar>(canvasElement, 'swc-avatar');

    await step('renders all valid sizes', async () => {
      expect(
        avatars.length,
        'number of avatars matching AVATAR_VALID_SIZES'
      ).toBe(AVATAR_VALID_SIZES.length);

      for (const size of AVATAR_VALID_SIZES) {
        const avatar = canvasElement.querySelector(
          `swc-avatar[size="${size}"]`
        ) as Avatar | null;
        expect(avatar, `avatar with size=${size} exists`).toBeTruthy();
        await avatar?.updateComplete;
        expect(avatar?.size, `size property for size=${size}`).toBe(size);
      }
    });
  },
};

export const DecorativeTest: Story = {
  ...Decorative,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('sets aria-hidden on host when decorative is set', async () => {
      expect(avatar.alt, 'alt property for decorative').toBe('');
      expect(
        avatar.hasAttribute('aria-hidden'),
        'aria-hidden on decorative avatar'
      ).toBe(true);
      expect(
        avatar.getAttribute('aria-hidden'),
        'aria-hidden value on decorative avatar'
      ).toBe('true');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const NotFocusableTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('is not in the tab order', async () => {
      expect(avatar.tabIndex, 'tabIndex is -1').toBe(-1);
    });

    await step(
      'does not receive focus when focused programmatically',
      async () => {
        avatar.focus();
        expect(
          document.activeElement,
          'activeElement is not the avatar'
        ).not.toBe(avatar);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const MissingAltWarningOnFirstRenderTest: Story = {
  render: () => html`
    <div id="avatar-warning-container"></div>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'warns when alt is absent and avatar is not marked decorative on first render',
      () =>
        withWarningSpy(async (warnCalls) => {
          const container = canvasElement.querySelector(
            '#avatar-warning-container'
          )!;
          const avatar = document.createElement('swc-avatar') as Avatar;
          avatar.src = PLACEHOLDER_SRC;
          container.appendChild(avatar);
          await avatar.updateComplete;

          expect(
            warnCalls.length,
            'warning count for missing alt'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'warning message content'
          ).toContain('alt');

          container.removeChild(avatar);
        })
    );
  },
};

export const MissingAltWarningOnUpdateTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe"></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'warns when alt is changed to undefined and avatar is not decorative',
      () =>
        withWarningSpy(async (warnCalls) => {
          avatar.alt = undefined;
          await avatar.updateComplete;

          expect(
            warnCalls.length,
            'warning count after alt set to undefined'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'warning message content'
          ).toContain('alt');
        })
    );
  },
};

export const AltProvidedNoWarningTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt=""></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('does not warn when a non-empty alt is provided', () =>
      withWarningSpy(async (warnCalls) => {
        avatar.alt = 'Jane Doe';
        await avatar.updateComplete;

        expect(warnCalls.length, 'warning count when alt is provided').toBe(0);
      })
    );
  },
};

export const DecorativeNoWarningTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC}></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('does not warn when decorative is set', () =>
      withWarningSpy(async (warnCalls) => {
        avatar.decorative = true;
        await avatar.updateComplete;

        expect(warnCalls.length, 'warning count when decorative is set').toBe(
          0
        );
      })
    );
  },
};
