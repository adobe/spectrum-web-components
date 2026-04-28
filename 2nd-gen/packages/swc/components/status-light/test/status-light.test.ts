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
import type {
  Meta,
  StoryContext,
  StoryObj as Story,
} from '@storybook/web-components';

import { StatusLight } from '@adobe/spectrum-wc/status-light';

import '@adobe/spectrum-wc/status-light';

import {
  STATUS_LIGHT_VALID_SIZES,
  STATUS_LIGHT_VARIANTS_COLOR,
  STATUS_LIGHT_VARIANTS_SEMANTIC,
} from '../../../../core/components/status-light/StatusLight.types.js';
import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, {
  Anatomy,
  NonSemanticVariants,
  Overview,
  Playground,
  SemanticVariants,
  Sizes,
} from '../stories/status-light.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Status light/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step('renders default properties and slot content', async () => {
      expect(statusLight.variant, 'default variant is neutral').toBe('neutral');
      expect(statusLight.size, 'default size is m').toBe('m');
      expect(
        statusLight.textContent?.trim(),
        'default slot has text content'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step('renders with correct variant and slot content', async () => {
      expect(statusLight.variant, 'anatomy story variant is positive').toBe(
        'positive'
      );
      expect(
        statusLight.textContent?.trim(),
        'default slot text content is present'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders and reflects each size correctly', async () => {
      for (const size of STATUS_LIGHT_VALID_SIZES) {
        const statusLight = canvasElement.querySelector(
          `swc-status-light[size="${size}"]`
        ) as StatusLight | null;
        expect(
          statusLight,
          `status light with size="${size}" is rendered`
        ).toBeTruthy();
        await statusLight?.updateComplete;
        expect(
          statusLight?.variant,
          `status light with size="${size}" has default variant neutral`
        ).toBe('neutral');
        expect(
          statusLight?.size,
          `status light size property is "${size}"`
        ).toBe(size);
      }
    });
  },
};

export const ComposedComponentTest: Story = {
  render: (args) => {
    const storyArgs = {
      ...Playground.args,
      ...args,
      size: 'm',
      variant: 'positive',
      'default-slot': 'Positive',
    };

    return html`
      <div style="display: flex; gap: 10px;">
        ${meta.render?.(storyArgs, {} as StoryContext)}
        <p>This is a test of the composed component</p>
      </div>
    `;
  },
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step('renders within composed content', async () => {
      expect(
        statusLight.variant,
        'variant is positive in composed context'
      ).toBe('positive');
      expect(statusLight.size, 'size is m in composed context').toBe('m');
      expect(
        statusLight.textContent?.trim(),
        'slot content is present in composed context'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SemanticVariantsTest: Story = {
  ...SemanticVariants,
  play: async ({ canvasElement, step }) => {
    await step('renders all semantic variants', async () => {
      for (const variant of STATUS_LIGHT_VARIANTS_SEMANTIC) {
        const statusLight = canvasElement.querySelector(
          `swc-status-light[variant="${variant}"]`
        ) as StatusLight | null;
        expect(
          statusLight,
          `status light with variant="${variant}" is rendered`
        ).toBeTruthy();
        await statusLight?.updateComplete;
        expect(
          statusLight?.variant,
          `status light variant property is "${variant}"`
        ).toBe(variant);
      }
    });
  },
};

export const NonSemanticVariantsTest: Story = {
  ...NonSemanticVariants,
  play: async ({ canvasElement, step }) => {
    await step('renders all non-semantic color variants', async () => {
      for (const variant of STATUS_LIGHT_VARIANTS_COLOR) {
        const statusLight = canvasElement.querySelector(
          `swc-status-light[variant="${variant}"]`
        ) as StatusLight | null;
        expect(
          statusLight,
          `status light with variant="${variant}" is rendered`
        ).toBeTruthy();
        await statusLight?.updateComplete;
        expect(
          statusLight?.variant,
          `status light variant property is "${variant}"`
        ).toBe(variant);
      }
    });
  },
};

export const VariantMutationTest: Story = {
  render: () => html`
    <swc-status-light variant="neutral" size="m">Archived</swc-status-light>
  `,
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step(
      'reflects variant attribute after mutation to positive',
      async () => {
        statusLight.variant = 'positive';
        await statusLight.updateComplete;
        expect(
          statusLight.getAttribute('variant'),
          'variant attribute is positive after mutation'
        ).toBe('positive');
      }
    );

    await step(
      'reflects variant attribute after mutation to negative',
      async () => {
        statusLight.variant = 'negative';
        await statusLight.updateComplete;
        expect(
          statusLight.getAttribute('variant'),
          'variant attribute is negative after second mutation'
        ).toBe('negative');
      }
    );

    await step(
      'reflects variant attribute after mutation to non-semantic color variant',
      async () => {
        statusLight.variant = 'seafoam';
        await statusLight.updateComplete;
        expect(
          statusLight.getAttribute('variant'),
          'variant attribute is seafoam after mutation to color variant'
        ).toBe('seafoam');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const UnsupportedVariantWarningTest: Story = {
  render: () => html`
    <swc-status-light variant="neutral">Archived</swc-status-light>
  `,
  play: async ({ canvasElement, step }) => {
    await step('warns when an unsupported variant is set', () =>
      withWarningSpy(async (warnCalls) => {
        const statusLight = await getComponent<StatusLight>(
          canvasElement,
          'swc-status-light'
        );
        statusLight.setAttribute('variant', 'invalid-variant');
        await statusLight.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for unsupported variant'
        ).toBeGreaterThan(0);
        expect(
          warnCalls[0][0],
          'warning is emitted from the status light element'
        ).toBe(statusLight);
        expect(
          warnCalls[0][1],
          'warning message references the variant attribute'
        ).toBe(
          `<${statusLight.localName}> element expects the "variant" attribute to be one of the following:`
        );
      })
    );
  },
};

export const AccentDeprecationWarningTest: Story = {
  render: () => html`
    <swc-status-light variant="neutral">Archived</swc-status-light>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'warns with a deprecation notice when accent variant is set',
      () =>
        withWarningSpy(async (warnCalls) => {
          const statusLight = await getComponent<StatusLight>(
            canvasElement,
            'swc-status-light'
          );
          statusLight.setAttribute('variant', 'accent');
          await statusLight.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for accent variant'
          ).toBeGreaterThan(0);
          expect(
            warnCalls[0][0],
            'warning is emitted from the status light element'
          ).toBe(statusLight);
          expect(
            warnCalls[0][1],
            'warning message references accent removal'
          ).toBe(
            `<${statusLight.localName}> does not support the "accent" variant in Spectrum 2. Use "neutral" or "info" depending on intent.`
          );
        })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-status-light variant="neutral">Archived</swc-status-light>
  `,
  play: async ({ canvasElement, step }) => {
    const statusLight = await getComponent<StatusLight>(
      canvasElement,
      'swc-status-light'
    );

    await step(
      'does not warn when a valid semantic variant is set in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          for (const variant of STATUS_LIGHT_VARIANTS_SEMANTIC) {
            statusLight.variant = variant;
            await statusLight.updateComplete;
          }

          expect(
            warnCalls.length,
            'no warnings are emitted for valid semantic variants'
          ).toBe(0);
        })
    );

    await step(
      'does not warn when a valid color variant is set in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          statusLight.variant = 'seafoam';
          await statusLight.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted for valid color variants'
          ).toBe(0);
        })
    );
  },
};
