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

import { Asset } from '@adobe/spectrum-wc/asset';

import '@adobe/spectrum-wc/components/asset/swc-asset.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta from '../stories/asset.stories.js';
import { Overview } from '../stories/asset.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Asset/Tests',
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
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('renders slotted content with defaults applied', async () => {
      const img = asset.querySelector('img');
      expect(asset.fit, 'fit defaults to cover').toBe('cover');
      expect(asset.background, 'background defaults to transparent').toBe(
        'transparent'
      );
      expect(img, 'slotted img element is rendered').toBeTruthy();
      expect(
        img?.getAttribute('alt')?.length,
        'slotted img has a non-empty alt attribute'
      ).toBeGreaterThan(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidFitWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when an invalid fit is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.fit = 'stretch' as Asset['fit'];
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid fit'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references fit'
        ).toContain('fit');
      })
    );
  },
};

export const ValidFitNoWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('does not warn when a valid fit is set', () =>
      withWarningSpy(async (warnCalls) => {
        asset.fit = 'contain';
        await asset.updateComplete;

        expect(warnCalls.length, 'no warnings for a valid fit').toBe(0);
      })
    );
  },
};

export const InvalidBackgroundWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when an invalid background is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        asset.background = 'gradient' as Asset['background'];
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid background'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references background'
        ).toContain('background');
      })
    );
  },
};

export const ValidBackgroundNoWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('does not warn when a valid background is set', () =>
      withWarningSpy(async (warnCalls) => {
        asset.background = 'checkerboard';
        await asset.updateComplete;

        expect(warnCalls.length, 'no warnings for a valid background').toBe(0);
      })
    );
  },
};

export const AspectRatioNormalizationTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('normalizes the "square" keyword to "1/1"', async () => {
      asset.aspectRatio = 'square';
      await asset.updateComplete;
      expect(asset.aspectRatio, 'square normalizes to 1/1').toBe('1/1');
    });

    await step('normalizes ":"-separated ratios to "/"', async () => {
      asset.aspectRatio = '16:9';
      await asset.updateComplete;
      expect(asset.aspectRatio, '16:9 normalizes to 16/9').toBe('16/9');
    });
  },
};

export const ValidAspectRatioNoWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('does not warn when a valid aspect-ratio is set', () =>
      withWarningSpy(async (warnCalls) => {
        asset.aspectRatio = '16/9';
        await asset.updateComplete;

        expect(warnCalls.length, 'no warnings for a valid ratio').toBe(0);
      })
    );
  },
};

export const AspectRatioWidthHeightCombinationWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'warns when aspectRatio is combined with both width and height',
      () =>
        withWarningSpy(async (warnCalls) => {
          asset.aspectRatio = '16/9';
          asset.width = '100px';
          asset.height = '100px';
          await asset.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for the combination'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const MultipleChildrenWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="First" />
      <img src="./images/avatar-preview.png" alt="Second" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when more than one child is slotted', () =>
      withWarningSpy(async (warnCalls) => {
        // Re-trigger validation, which runs on every update.
        asset.requestUpdate();
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for multiple children'
        ).toBeGreaterThan(0);
      })
    );
  },
};

export const UnsupportedChildTypeWarningTest: Story = {
  render: () => html`
    <swc-asset><span>Not an image</span></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when the slotted child is not img or svg', () =>
      withWarningSpy(async (warnCalls) => {
        asset.requestUpdate();
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for an unsupported child type'
        ).toBeGreaterThan(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessible name resolution
// ──────────────────────────────────────────────────────────────

export const DecorativeTest: Story = {
  render: () => html`
    <swc-asset decorative><img src="./images/avatar-preview.png" /></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('sets aria-hidden on the host when decorative', async () => {
      expect(
        asset.getAttribute('aria-hidden'),
        'host has aria-hidden="true"'
      ).toBe('true');
    });

    await step(
      'does not warn about the missing accessible name when decorative',
      () =>
        withWarningSpy(async (warnCalls) => {
          asset.requestUpdate();
          await asset.updateComplete;
          expect(
            warnCalls.length,
            'no warnings are emitted when decorative'
          ).toBe(0);
        })
    );
  },
};

export const ExistingAccessibleNameLeftAloneTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Existing name" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'leaves an img with its own alt untouched, even with accessible-label set',
      async () => {
        asset.accessibleLabel = 'Fallback name';
        await asset.updateComplete;
        const img = asset.querySelector('img');
        expect(img?.getAttribute('alt'), 'alt is unchanged').toBe(
          'Existing name'
        );
      }
    );
  },
};

export const AccessibleLabelFallbackTest: Story = {
  render: () => html`
    <swc-asset accessible-label="Fallback name">
      <img src="./images/avatar-preview.png" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('applies accessibleLabel as alt on an unlabeled img', () => {
      const img = asset.querySelector('img');
      expect(img?.getAttribute('alt'), 'alt is set from accessibleLabel').toBe(
        'Fallback name'
      );
    });
  },
};

export const AccessibleLabelFallbackSvgTest: Story = {
  render: () => html`
    <swc-asset accessible-label="Fallback name">
      <svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" /></svg>
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'applies accessibleLabel as role="img" + aria-label on an unlabeled svg',
      () => {
        const svg = asset.querySelector('svg');
        expect(svg?.getAttribute('role'), 'role is set to img').toBe('img');
        expect(
          svg?.getAttribute('aria-label'),
          'aria-label is set from accessibleLabel'
        ).toBe('Fallback name');
      }
    );
  },
};

export const MissingAccessibleNameWarningTest: Story = {
  render: () => html`
    <swc-asset><img src="./images/avatar-preview.png" /></swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'warns when neither alt, accessible-label, nor decorative is present',
      () =>
        withWarningSpy(async (warnCalls) => {
          asset.requestUpdate();
          await asset.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for the missing accessible name'
          ).toBeGreaterThan(0);
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: PR feedback regressions
// ──────────────────────────────────────────────────────────────

export const SlotChangeReResolvesTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Original" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      're-runs accessible-name resolution when the slotted img is swapped',
      () =>
        withWarningSpy(async (warnCalls) => {
          const slot = asset.shadowRoot?.querySelector('slot');
          const slotChanged = new Promise<void>((resolve) => {
            slot?.addEventListener('slotchange', () => resolve(), {
              once: true,
            });
          });

          const original = asset.querySelector('img');
          const replacement = document.createElement('img');
          replacement.src = './images/avatar-preview.png';
          // No `alt` on the replacement: should trigger the missing
          // accessible-name warning once slotchange re-runs resolution.
          original?.replaceWith(replacement);

          // `slotchange` dispatches asynchronously, and only afterward does
          // `requestUpdate()` schedule the update this assertion needs.
          await slotChanged;
          await asset.updateComplete;

          expect(
            warnCalls.length,
            'a warning fires for the unlabeled replacement img'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const ConsumerAriaHiddenPreservedTest: Story = {
  render: () => html`
    <swc-asset aria-hidden="true">
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'does not remove a consumer-set aria-hidden unrelated to decorative',
      async () => {
        asset.requestUpdate();
        await asset.updateComplete;
        expect(
          asset.getAttribute('aria-hidden'),
          'consumer-set aria-hidden survives'
        ).toBe('true');
      }
    );
  },
};

export const ImgAriaLabelCountsAsOwnNameTest: Story = {
  render: () => html`
    <swc-asset accessible-label="Fallback name">
      <img src="./images/avatar-preview.png" aria-label="Existing name" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'leaves an img with only aria-label untouched, not overridden by accessible-label',
      () => {
        const img = asset.querySelector('img');
        expect(img?.getAttribute('aria-label'), 'aria-label is unchanged').toBe(
          'Existing name'
        );
        expect(img?.hasAttribute('alt'), 'alt was not set').toBe(false);
      }
    );
  },
};

export const SvgFitPreserveAspectRatioTest: Story = {
  render: () => html`
    <swc-asset fit="cover">
      <svg role="img" aria-label="Icon" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="4" />
      </svg>
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      '"cover" sets preserveAspectRatio to xMidYMid slice on a slotted svg',
      async () => {
        const svg = asset.querySelector('svg');
        expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMid slice');
      }
    );

    await step(
      '"contain" sets preserveAspectRatio to xMidYMid meet on a slotted svg',
      async () => {
        asset.fit = 'contain';
        await asset.updateComplete;
        const svg = asset.querySelector('svg');
        expect(svg?.getAttribute('preserveAspectRatio')).toBe('xMidYMid meet');
      }
    );
  },
};

export const InvalidAspectRatioWarningTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step('warns when aspect-ratio is a malformed ratio', () =>
      withWarningSpy(async (warnCalls) => {
        asset.aspectRatio = '16:9:4';
        await asset.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for the malformed ratio'
        ).toBeGreaterThan(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Sizing fallback
// ──────────────────────────────────────────────────────────────

export const NoConfigurationDoesNotCollapseTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'renders at a non-zero size standalone with no aspectRatio/width/height and no ancestor default',
      () => {
        const rect = asset.getBoundingClientRect();
        expect(rect.width, 'width is non-zero').toBeGreaterThan(0);
        expect(rect.height, 'height is non-zero').toBeGreaterThan(0);
      }
    );
  },
};

export const NoConfigurationDoesNotCollapseInSizedContainerTest: Story = {
  render: () => html`
    <div style="display: flex; inline-size: 200px; block-size: 150px;">
      <swc-asset>
        <img src="./images/avatar-preview.png" alt="Preview" />
      </swc-asset>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'renders at a non-zero size inside a sized flex container, standing in for an embedding parent (e.g. Card)',
      () => {
        const rect = asset.getBoundingClientRect();
        expect(rect.width, 'width is non-zero').toBeGreaterThan(0);
        expect(rect.height, 'height is non-zero').toBeGreaterThan(0);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Load state
// ──────────────────────────────────────────────────────────────

export const LoadStateSvgOrNoChildTest: Story = {
  render: () => html`
    <swc-asset>
      <svg role="img" aria-label="Icon" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="4" />
      </svg>
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    const asset = await getComponent<Asset>(canvasElement, 'swc-asset');

    await step(
      'loadState is "loaded" immediately for a slotted svg, nothing to wait for',
      () => {
        expect(asset.loadState, 'loadState is loaded').toBe('loaded');
      }
    );
  },
};

export const LoadStateImgSuccessTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/avatar-preview.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'fires swc-asset-load and resolves loadState to "loaded" on success',
      async () => {
        // Attach the listener synchronously, before awaiting anything, so a
        // fast/already-resolved image can't fire and be missed before this
        // runs (the same race the timing guarantee protects consumers from).
        const asset = canvasElement.querySelector('swc-asset') as Asset;
        const loadFired = new Promise<void>((resolve) => {
          asset.addEventListener('swc-asset-load', () => resolve(), {
            once: true,
          });
        });

        await asset.updateComplete;
        await loadFired;

        expect(asset.loadState, 'loadState is loaded').toBe('loaded');
      }
    );
  },
};

export const LoadStateImgErrorTest: Story = {
  render: () => html`
    <swc-asset>
      <img src="./images/does-not-exist.png" alt="Preview" />
    </swc-asset>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'fires swc-asset-error with detail.src and resolves loadState to "error" on failure',
      async () => {
        const asset = canvasElement.querySelector('swc-asset') as Asset;
        const errorEvent = new Promise<CustomEvent<{ src: string }>>(
          (resolve) => {
            asset.addEventListener(
              'swc-asset-error',
              (event) => resolve(event as CustomEvent<{ src: string }>),
              { once: true }
            );
          }
        );

        await asset.updateComplete;
        const event = await errorEvent;

        expect(asset.loadState, 'loadState is error').toBe('error');
        expect(
          event.detail.src,
          'detail.src identifies the failed image'
        ).toContain('does-not-exist.png');
      }
    );
  },
};

export const LoadStateCachedImageTimingGuaranteeTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'still fires swc-asset-load exactly once for an img that is already complete when slotted',
      async () => {
        // Pre-load the image outside any <swc-asset>, so it's already
        // `complete` by the time the component ever sees it - the exact
        // "served from cache" scenario the timing guarantee covers.
        const preloaded = document.createElement('img');
        preloaded.src = './images/card-preview.jpg';
        preloaded.alt = 'Preview';
        await new Promise<void>((resolve, reject) => {
          preloaded.addEventListener('load', () => resolve(), { once: true });
          preloaded.addEventListener(
            'error',
            () => reject(new Error('preload failed')),
            { once: true }
          );
        });

        const asset = document.createElement('swc-asset') as Asset;
        asset.appendChild(preloaded);

        const loadFired = new Promise<void>((resolve) => {
          asset.addEventListener('swc-asset-load', () => resolve(), {
            once: true,
          });
        });

        canvasElement.querySelector('div')?.appendChild(asset);
        await asset.updateComplete;
        await loadFired;

        expect(
          asset.loadState,
          'loadState resolves to loaded for the pre-loaded image'
        ).toBe('loaded');
      }
    );
  },
};
