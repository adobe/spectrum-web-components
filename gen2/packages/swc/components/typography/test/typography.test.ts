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

import meta, {
  CodeVariant,
  Defaults,
  HeadingHeavy,
  HeadingVariant,
  Playground,
} from '../stories/typography.stories.js';
import { template } from '../stories/typography.template.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Typography/Tests',
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
    await step('renders heading variant at default size M', async () => {
      const heading = canvasElement.querySelector('h2');
      expect(heading, 'heading element is rendered').toBeTruthy();
      expect(
        heading?.className,
        'heading has base swc-Heading class'
      ).toContain('swc-Heading');
      // Size M is the default and does not add a size suffix class
      expect(
        heading?.className,
        'no explicit size class for default M'
      ).not.toContain('--size');
    });
  },
};

export const DefaultsTest: Story = {
  ...Defaults,
  play: async ({ canvasElement, step }) => {
    await step(
      'renders all typography variants at default size M',
      async () => {
        const headings = canvasElement.querySelectorAll('h2.swc-Heading');
        expect(headings.length, 'heading variant is rendered').toBeGreaterThan(
          0
        );

        const titleEls = canvasElement.querySelectorAll('[class*="swc-Title"]');
        expect(titleEls.length, 'title variant is rendered').toBeGreaterThan(0);

        const bodyEls = canvasElement.querySelectorAll('[class*="swc-Body"]');
        expect(bodyEls.length, 'body variant is rendered').toBeGreaterThan(0);

        const detailEls = canvasElement.querySelectorAll(
          '[class*="swc-Detail"]'
        );
        expect(detailEls.length, 'detail variant is rendered').toBeGreaterThan(
          0
        );

        const codeEls = canvasElement.querySelectorAll('code.swc-Code');
        expect(codeEls.length, 'code variant is rendered').toBeGreaterThan(0);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const HeadingVariantTest: Story = {
  ...HeadingVariant,
  play: async ({ canvasElement, step }) => {
    await step('renders heading at all allowed sizes', async () => {
      // Heading allowed sizes: XS, S, M, L, XL, XXL, XXXL, XXXXL = 8 sizes
      const headingElements = canvasElement.querySelectorAll('h2.swc-Heading');
      expect(headingElements.length, 'heading renders 8 size variants').toBe(8);
    });

    await step('size M heading has no size suffix class', async () => {
      const headingM = canvasElement.querySelector(
        'h2.swc-Heading:not([class*="--size"])'
      );
      expect(
        headingM,
        'size M heading has no explicit size suffix'
      ).toBeTruthy();
    });

    await step('non-M sizes have explicit size classes', async () => {
      const headingXL = canvasElement.querySelector('h2[class*="--sizeXL"]');
      expect(headingXL, 'size XL heading has --sizeXL class').toBeTruthy();
    });
  },
};

export const HeadingHeavyTest: Story = {
  ...HeadingHeavy,
  play: async ({ canvasElement, step }) => {
    await step('renders heading with heavy modifier class', async () => {
      const heading = canvasElement.querySelector('h2.swc-Heading');
      expect(heading, 'heading element is rendered').toBeTruthy();
      expect(
        heading?.className,
        'heading has the heavy modifier class'
      ).toContain('swc-Heading--heavy');
      expect(heading?.className, 'heading has the size L class').toContain(
        'swc-Heading--sizeL'
      );
    });
  },
};

export const CodeVariantTest: Story = {
  ...CodeVariant,
  play: async ({ canvasElement, step }) => {
    await step('renders code variant at all allowed sizes', async () => {
      // Code allowed sizes: XS, S, M, L, XL = 5 sizes
      const codeElements = canvasElement.querySelectorAll('code.swc-Code');
      expect(codeElements.length, 'code renders 5 size variants').toBe(5);
    });

    await step('size M code has no size suffix class', async () => {
      const codeM = canvasElement.querySelector(
        'code.swc-Code:not([class*="--size"])'
      );
      expect(
        codeM,
        'size M code element has no explicit size suffix'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Branches (coverage of template.ts uncovered paths)
// ──────────────────────────────────────────────────────────────

/**
 * Tests that coerceSize falls back to 'M' when the requested size is not
 * in the allowed sizes for the given variant. 'XXXL' is a valid size in
 * the SIZES array but is not allowed for the 'code' variant (only XS–XL).
 *
 * Coverage target: coerceSize fallback branch in typography.template.ts
 */
export const InvalidSizeFallbackTest: Story = {
  render: () => html`
    ${template({ variant: 'code', size: 'XXXL' })}
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'coerces invalid size XXXL to fallback M for code variant',
      async () => {
        const codeEl = canvasElement.querySelector('code');
        expect(
          codeEl,
          'code element is rendered when XXXL is coerced to M'
        ).toBeTruthy();
        expect(
          codeEl?.className,
          'code element has base swc-Code class'
        ).toContain('swc-Code');
        // Size M does not add a --sizeXXXL class; fallback renders with no size suffix
        expect(
          codeEl?.className,
          'code element has no --sizeXXXL class'
        ).not.toContain('sizeXXXL');
      }
    );
  },
};

/**
 * Tests that the `heavy && !caps.supportsHeavy` filter in the variants loop
 * removes all variants except 'heading' (the only one that supportsHeavy).
 *
 * Coverage target: filter branch `if (heavy && !caps.supportsHeavy) return false`
 * in typography.template.ts
 */
export const HeadingHeavyAllVariantsTest: Story = {
  render: () => html`
    ${template({ showAllVariants: true, heavy: true })}
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'renders only heading when showAllVariants=true and heavy=true',
      async () => {
        // Heading supports heavy → passes the filter
        const headings = canvasElement.querySelectorAll('h2.swc-Heading');
        expect(
          headings.length,
          'heading is rendered since it supports heavy'
        ).toBeGreaterThan(0);
      }
    );

    await step(
      'filters out title, body, detail, and code since they do not support heavy',
      async () => {
        // Title, body, detail render as p; code renders as code
        // With heavy=true, all non-heading variants are filtered out
        const titleSamples = canvasElement.querySelectorAll('p.swc-Title');
        expect(
          titleSamples.length,
          'title variant is filtered out because it does not support heavy'
        ).toBe(0);

        const bodySamples = canvasElement.querySelectorAll('p.swc-Body');
        expect(
          bodySamples.length,
          'body variant is filtered out because it does not support heavy'
        ).toBe(0);

        const detailSamples = canvasElement.querySelectorAll('p.swc-Detail');
        expect(
          detailSamples.length,
          'detail variant is filtered out because it does not support heavy'
        ).toBe(0);

        const codeSamples = canvasElement.querySelectorAll('code.swc-Code');
        expect(
          codeSamples.length,
          'code variant is filtered out because it does not support heavy'
        ).toBe(0);
      }
    );
  },
};
