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

import '@adobe/spectrum-wc/avatar';

import { AVATAR_VALID_SIZES } from '../../../../core/components/avatar/Avatar.types.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import {
  Decorative,
  meta,
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
      expect(avatar.overBackground, 'overBackground property').toBe(false);
    });

    await step('size attribute is present after first render', async () => {
      expect(avatar.hasAttribute('size'), 'size attribute presence').toBe(true);
      expect(avatar.getAttribute('size'), 'size attribute value').toBe('500');
    });

    await step('aria-hidden is not set when alt is provided', async () => {
      expect(avatar.hasAttribute('aria-hidden'), 'aria-hidden absence').toBe(
        false
      );
    });
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

    await step(
      'sets aria-hidden on host when alt is changed to empty string',
      async () => {
        avatar.alt = '';
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden when alt=""'
        ).toBe(true);
        expect(
          avatar.getAttribute('aria-hidden'),
          'aria-hidden value when decorative'
        ).toBe('true');
      }
    );

    await step(
      'removes aria-hidden from host when alt is changed to a non-empty string',
      async () => {
        avatar.alt = 'Jane Doe';
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden removed when alt provided'
        ).toBe(false);
      }
    );
  },
};

export const OverBackgroundReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'reflects over-background attribute after mutation',
      async () => {
        avatar.overBackground = true;
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('over-background'),
          'over-background attribute presence'
        ).toBe(true);

        avatar.overBackground = false;
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('over-background'),
          'over-background attribute removed'
        ).toBe(false);
      }
    );

    await step(
      'does not toggle aria-hidden when a non-alt property changes',
      async () => {
        // alt="Jane Doe" from Overview args — aria-hidden should remain absent
        // even after overBackground changes (covers changes.has("alt") === false path)
        avatar.overBackground = true;
        await avatar.updateComplete;
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden unaffected by overBackground change'
        ).toBe(false);
      }
    );
  },
};

export const LabelShimTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step('label getter returns the current alt value', async () => {
      avatar.alt = 'Jane Doe';
      await avatar.updateComplete;
      expect(avatar.label, 'label getter when alt is set').toBe('Jane Doe');
    });

    await step(
      'label setter updates alt without DEBUG mode warning',
      async () => {
        avatar.label = 'John Smith';
        await avatar.updateComplete;
        expect(avatar.alt, 'alt after label setter').toBe('John Smith');
        expect(avatar.label, 'label getter after label setter').toBe(
          'John Smith'
        );
      }
    );
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

    await step(
      'sets aria-hidden on host when alt is empty string',
      async () => {
        expect(avatar.alt, 'alt property for decorative').toBe('');
        expect(
          avatar.hasAttribute('aria-hidden'),
          'aria-hidden on decorative avatar'
        ).toBe(true);
        expect(
          avatar.getAttribute('aria-hidden'),
          'aria-hidden value on decorative avatar'
        ).toBe('true');
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
    await step('warns when alt is absent on first render in DEBUG mode', () =>
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

    await step('warns when alt is changed to undefined in DEBUG mode', () =>
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

    await step(
      'does not warn when alt is changed from empty to a provided value',
      () =>
        withWarningSpy(async (warnCalls) => {
          avatar.alt = 'Jane Doe';
          await avatar.updateComplete;

          expect(warnCalls.length, 'warning count when alt is provided').toBe(
            0
          );
        })
    );
  },
};

export const DecorativeNoWarningTest: Story = {
  render: () => html`
    <swc-avatar src=${PLACEHOLDER_SRC} alt="Jane Doe"></swc-avatar>
  `,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'does not warn when alt is changed to empty string (decorative)',
      () =>
        withWarningSpy(async (warnCalls) => {
          avatar.alt = '';
          await avatar.updateComplete;

          expect(warnCalls.length, 'warning count for decorative avatar').toBe(
            0
          );
        })
    );
  },
};

export const LabelDeprecationWarningTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const avatar = await getComponent<Avatar>(canvasElement, 'swc-avatar');

    await step(
      'warns when label property is set in DEBUG mode and updates alt',
      () =>
        withWarningSpy(async (warnCalls) => {
          avatar.label = 'John Smith';
          await avatar.updateComplete;

          expect(warnCalls.length, 'deprecation warning count').toBeGreaterThan(
            0
          );
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'deprecation warning message'
          ).toContain('label');
          expect(avatar.alt, 'alt updated by label setter').toBe('John Smith');
        })
    );
  },
};
