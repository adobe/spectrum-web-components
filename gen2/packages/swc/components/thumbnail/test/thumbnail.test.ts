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
import { computeAccessibleName } from 'dom-accessibility-api';

import { Thumbnail } from '@adobe/spectrum-wc/thumbnail';
import {
  THUMBNAIL_DEFAULT_FIT,
  THUMBNAIL_DEFAULT_SIZE,
  THUMBNAIL_VALID_FITS,
  THUMBNAIL_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/thumbnail/index.js';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Fit,
  Overview,
  Playground,
  Sizes,
} from '../stories/thumbnail.stories.js';

export default {
  ...meta,
  title: 'Thumbnail/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const PlaygroundTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('renders and registers as a swc-thumbnail element', async () => {
      expect(thumbnail).toBeTruthy();
      expect(thumbnail).toBeInstanceOf(Thumbnail);
    });

    await step('renders the slotted image', async () => {
      const image = thumbnail.querySelector('img');
      expect(image).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizeAttributeSetByFirstUpdatedTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'sets size attribute to default when not passed as attribute',
      async () => {
        expect(thumbnail.hasAttribute('size'), 'size attribute present').toBe(
          true
        );
        expect(thumbnail.getAttribute('size'), 'size attribute value').toBe(
          String(THUMBNAIL_DEFAULT_SIZE)
        );
        expect(thumbnail.size, 'size property value').toBe(
          THUMBNAIL_DEFAULT_SIZE
        );
      }
    );
  },
};

export const SizeReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('reflects size to attribute after mutation', async () => {
      thumbnail.size = 300;
      await thumbnail.updateComplete;
      expect(
        thumbnail.getAttribute('size'),
        'size attribute after mutation'
      ).toBe('300');
      expect(thumbnail.size, 'size property after mutation').toBe(300);
    });
  },
};

export const SizeInvalidFallbackTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'falls back to the default size and warns on an invalid value',
      () =>
        withWarningSpy(async (warnCalls) => {
          thumbnail.size = 999 as Thumbnail['size'];
          await thumbnail.updateComplete;

          expect(thumbnail.size, 'size after invalid value').toBe(
            THUMBNAIL_DEFAULT_SIZE
          );
          expect(
            thumbnail.getAttribute('size'),
            'size attribute after invalid value'
          ).toBe(String(THUMBNAIL_DEFAULT_SIZE));
          expect(
            warnCalls.length,
            'warning count for invalid size'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const FitAttributeSetByFirstUpdatedTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'sets fit attribute to default when not passed as attribute',
      async () => {
        expect(thumbnail.hasAttribute('fit'), 'fit attribute present').toBe(
          true
        );
        expect(thumbnail.getAttribute('fit'), 'fit attribute value').toBe(
          THUMBNAIL_DEFAULT_FIT
        );
        expect(thumbnail.fit, 'fit property value').toBe(THUMBNAIL_DEFAULT_FIT);
      }
    );
  },
};

export const FitReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'reflects fit to attribute and applies object-fit to the slotted image',
      async () => {
        thumbnail.fit = 'cover';
        await thumbnail.updateComplete;
        expect(
          thumbnail.getAttribute('fit'),
          'fit attribute after mutation'
        ).toBe('cover');
        expect(thumbnail.fit, 'fit property after mutation').toBe('cover');

        const image = thumbnail.querySelector('img') as HTMLImageElement;
        expect(
          getComputedStyle(image).objectFit,
          'computed object-fit for fit="cover"'
        ).toBe('cover');
      }
    );
  },
};

export const FitInvalidFallbackTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'falls back to the default fit and warns on an invalid value',
      () =>
        withWarningSpy(async (warnCalls) => {
          thumbnail.fit = 'invalid' as Thumbnail['fit'];
          await thumbnail.updateComplete;

          expect(thumbnail.fit, 'fit after invalid value').toBe(
            THUMBNAIL_DEFAULT_FIT
          );
          expect(
            thumbnail.getAttribute('fit'),
            'fit attribute after invalid value'
          ).toBe(THUMBNAIL_DEFAULT_FIT);
          expect(
            warnCalls.length,
            'warning count for invalid fit'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const AuthoredAttributesArePreservedTest: Story = {
  render: () => html`
    <swc-thumbnail size="100" fit="cover">
      <img src="a.png" alt="Preview" />
    </swc-thumbnail>
  `,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    // Reflection must not overwrite authored values.
    await step('leaves authored size and fit untouched', async () => {
      expect(thumbnail.getAttribute('size'), 'authored size survives').toBe(
        '100'
      );
      expect(thumbnail.getAttribute('fit'), 'authored fit survives').toBe(
        'cover'
      );
    });
  },
};

export const DroppedLegacyPropertiesTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'does not declare background, layer, disabled, focused, or selected as reactive properties',
      async () => {
        for (const legacyProp of [
          'background',
          'layer',
          'disabled',
          'focused',
          'selected',
        ]) {
          expect(
            legacyProp in thumbnail,
            `"${legacyProp}" is not a property on swc-thumbnail`
          ).toBe(false);
        }
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
    const thumbnails = await getComponents<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('renders all valid sizes', async () => {
      expect(
        thumbnails.length,
        'number of thumbnails matching THUMBNAIL_VALID_SIZES'
      ).toBe(THUMBNAIL_VALID_SIZES.length);

      for (const size of THUMBNAIL_VALID_SIZES) {
        const thumbnail = canvasElement.querySelector(
          `swc-thumbnail[size="${size}"]`
        ) as Thumbnail | null;
        expect(thumbnail, `thumbnail with size=${size} exists`).toBeTruthy();
        await thumbnail?.updateComplete;
        expect(thumbnail?.size, `size property for size=${size}`).toBe(size);
      }
    });

    await step('renders the checkerboard slot wrapper', async () => {
      for (const thumbnail of thumbnails) {
        const wrapper = thumbnail.shadowRoot?.querySelector(
          '.swc-Thumbnail.swc-OpacityCheckerboard'
        );
        expect(wrapper, 'checkerboard wrapper present').toBeTruthy();
        expect(
          wrapper?.querySelector('slot'),
          'slot present in checkerboard wrapper'
        ).toBeTruthy();
      }
    });
  },
};

export const FitOptionsTest: Story = {
  ...Fit,
  play: async ({ canvasElement, step }) => {
    const thumbnails = await getComponents<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('renders all valid fit values', async () => {
      expect(
        thumbnails.length,
        'number of thumbnails matching THUMBNAIL_VALID_FITS'
      ).toBe(THUMBNAIL_VALID_FITS.length);
    });

    await step(
      'applies the matching computed object-fit for each fit value',
      async () => {
        for (const fit of THUMBNAIL_VALID_FITS) {
          const thumbnail = canvasElement.querySelector(
            `swc-thumbnail[fit="${fit}"]`
          ) as Thumbnail | null;
          expect(thumbnail, `thumbnail with fit=${fit} exists`).toBeTruthy();
          await thumbnail?.updateComplete;

          const image = thumbnail?.querySelector('img') as HTMLImageElement;
          expect(
            getComputedStyle(image).objectFit,
            `computed object-fit for fit=${fit}`
          ).toBe(fit);
        }
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const DecorativeToggleTest: Story = {
  render: () => html`
    <swc-thumbnail decorative><img src="a.png" alt="" /></swc-thumbnail>
  `,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('applies aria-hidden when decorative', async () => {
      expect(thumbnail.getAttribute('aria-hidden')).toBe('true');
    });

    await step('removes aria-hidden once decorative is unset', async () => {
      thumbnail.decorative = false;
      await thumbnail.updateComplete;
      expect(thumbnail.hasAttribute('aria-hidden')).toBe(false);
    });
  },
};

export const DecorativeAltFallbackTest: Story = {
  render: () => html`
    <swc-thumbnail decorative><img src="a.png" /></swc-thumbnail>
  `,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step(
      'sets alt="" on a slotted image with no alt when decorative',
      async () => {
        const image = thumbnail.querySelector('img') as HTMLImageElement;
        expect(
          image.getAttribute('alt'),
          'alt attribute defaults to empty string'
        ).toBe('');
      }
    );
  },
};

export const NotFocusableTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const thumbnail = await getComponent<Thumbnail>(
      canvasElement,
      'swc-thumbnail'
    );

    await step('has no ARIA role on the host', async () => {
      expect(thumbnail.getAttribute('role'), 'host role attribute').toBeNull();
    });

    await step('is not in the tab order', async () => {
      // `tabIndex === -1` is the custom-element default. Check the attribute
      // too.
      expect(
        thumbnail.hasAttribute('tabindex'),
        'no tabindex attribute is set on the host'
      ).toBe(false);
      expect(thumbnail.tabIndex, 'tabIndex is -1').toBe(-1);
    });

    await step('exposes no focusable elements in its shadow root', async () => {
      const focusable = thumbnail.shadowRoot?.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      expect(
        focusable?.length ?? 0,
        'shadow root contains no focusable nodes'
      ).toBe(0);
    });

    await step(
      'does not receive focus when focused programmatically',
      async () => {
        thumbnail.focus();
        expect(
          document.activeElement,
          'activeElement is not the thumbnail'
        ).not.toBe(thumbnail);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const MissingAltWarningTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    await step('warns exactly once for a missing accessible name', () =>
      withWarningSpy(async (warnCalls) => {
        const thumbnail = document.createElement('swc-thumbnail') as Thumbnail;
        thumbnail.innerHTML = '<img src="a.png" />';
        canvasElement.appendChild(thumbnail);
        await thumbnail.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(warnCalls.length, 'warns exactly once').toBe(1);
      })
    );
  },
};

export const NoSlottedImageWarningTest: Story = {
  render: () => html`
    <swc-thumbnail></swc-thumbnail>
  `,
  play: async ({ canvasElement, step }) => {
    await step('does not warn or throw when no image is slotted', async () => {
      await withWarningSpy(async (warnCalls) => {
        const thumbnail = await getComponent<Thumbnail>(
          canvasElement,
          'swc-thumbnail'
        );
        thumbnail.decorative = true;
        await thumbnail.updateComplete;
        thumbnail.decorative = false;
        await thumbnail.updateComplete;

        expect(
          warnCalls.length,
          'no warning is emitted without a slotted image'
        ).toBe(0);
      });
    });
  },
};

export const AccessibleNameNoWarningTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    const expectedName = 'Layer 1 preview';
    const cases = [
      { label: 'alt', markup: `<img src="a.png" alt="${expectedName}" />` },
      {
        label: 'aria-label',
        markup: `<img src="a.png" aria-label="${expectedName}" />`,
      },
      {
        label: 'aria-labelledby',
        markup: '<img src="a.png" aria-labelledby="ext-label" />',
        // `aria-labelledby` resolves an IDREF, so the referenced element must
        // actually exist in the document for the image to have a computed
        // accessible name — an absent ID would leave the image unnamed.
        externalLabel: `<span id="ext-label">${expectedName}</span>`,
      },
    ];

    for (const { label, markup, externalLabel } of cases) {
      await step(
        `does not warn when the slotted image has an accessible name via ${label}`,
        () =>
          withWarningSpy(async (warnCalls) => {
            const thumbnail = document.createElement(
              'swc-thumbnail'
            ) as Thumbnail;
            thumbnail.innerHTML = markup;
            canvasElement.appendChild(thumbnail);
            if (externalLabel) {
              canvasElement.insertAdjacentHTML('beforeend', externalLabel);
            }
            await thumbnail.updateComplete;

            const img = thumbnail.querySelector('img') as HTMLImageElement;
            expect(
              computeAccessibleName(img),
              `the slotted image has a computed accessible name via ${label}`
            ).toBe(expectedName);

            expect(
              warnCalls.length,
              `no warnings are emitted for an image labeled via ${label}`
            ).toBe(0);
          })
      );
    }
  },
};
