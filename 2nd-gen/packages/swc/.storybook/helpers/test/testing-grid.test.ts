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

import { html, render } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  Container,
  type GridStoryContext,
  Heading,
  isChromatic,
  renderContent,
  Variants,
} from '../testing-grid.js';

export default {
  title: 'Storybook infrastructure/Testing grid',
  tags: ['!autodocs', 'dev'],
  parameters: {
    docs: { disable: true, page: null },
  },
} satisfies Meta;

const mount = (canvasElement: HTMLElement): HTMLElement => {
  const host = document.createElement('div');
  canvasElement.appendChild(host);
  return host;
};

// ──────────────────────────────────────────────────────────────
// isChromatic()
// ──────────────────────────────────────────────────────────────

export const IsChromaticTest: Story = {
  play: async ({ step }) => {
    await step('returns false when window is undefined', () => {
      expect(isChromatic(undefined)).toBe(false);
    });

    await step('returns false for a normal user agent', () => {
      const mock = {
        navigator: { userAgent: 'Mozilla/5.0' },
        location: { href: 'http://localhost:6006/' },
      } as Window;

      expect(isChromatic(mock)).toBe(false);
    });

    await step('returns true for Chromatic user agent', () => {
      const mock = {
        navigator: { userAgent: 'Mozilla/5.0 Chromatic' },
        location: { href: 'http://localhost:6006/' },
      } as Window;

      expect(isChromatic(mock)).toBe(true);
    });

    await step('returns true when chromatic=true is in the URL', () => {
      const mock = {
        navigator: { userAgent: 'Mozilla/5.0' },
        location: { href: 'http://localhost:6006/?chromatic=true' },
      } as Window;

      expect(isChromatic(mock)).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Heading()
// ──────────────────────────────────────────────────────────────

export const HeadingTest: Story = {
  play: async ({ canvasElement, step }) => {
    const host = mount(canvasElement);

    await step('returns nothing when content is omitted', () => {
      render(Heading({}), host);
      expect(host.querySelector('.chromatic-ignore')).toBeNull();
    });

    await step('renders labeled heading text', () => {
      host.replaceChildren();
      render(Heading({ content: 'Primary' }), host);

      const heading = host.querySelector('.chromatic-ignore');
      expect(heading?.textContent).toBe('Primary');
      expect(heading?.getAttribute('style')).toContain('font-weight: 700');
    });

    await step('applies detail semantics styles', () => {
      host.replaceChildren();
      render(
        Heading({ content: 'Variant', semantics: 'detail', size: 's' }),
        host
      );

      const heading = host.querySelector('.chromatic-ignore');
      expect(heading?.getAttribute('style')).toContain(
        'text-transform: uppercase'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Container()
// ──────────────────────────────────────────────────────────────

export const ContainerTest: Story = {
  play: async ({ canvasElement, step }) => {
    const host = mount(canvasElement);

    await step('renders outer and inner containers with content', () => {
      render(
        Container({
          heading: 'Section',
          content: html`
            <span data-testid="cell">Cell</span>
          `,
        }),
        host
      );

      expect(host.querySelector('[data-outer-container]')).toBeTruthy();
      expect(host.querySelector('[data-inner-container]')).toBeTruthy();
      expect(host.textContent).toContain('Section');
      expect(host.querySelector('[data-testid="cell"]')).toBeTruthy();
    });

    await step('applies border styles when withBorder is true', () => {
      host.replaceChildren();
      render(
        Container({
          content: html`
            <span>Bordered</span>
          `,
          withBorder: true,
        }),
        host
      );

      const inner = host.querySelector('[data-inner-container]') as HTMLElement;
      expect(inner.getAttribute('style')).toContain('border');
      expect(inner.getAttribute('style')).toContain('padding-inline');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// renderContent()
// ──────────────────────────────────────────────────────────────

export const RenderContentTest: Story = {
  play: async ({ canvasElement, step }) => {
    const host = mount(canvasElement);

    await step('returns nothing for empty content', () => {
      render(renderContent([]), host);
      expect(host.textContent?.trim()).toBe('');
    });

    await step('walks nested objects and renders lit templates', () => {
      host.replaceChildren();
      render(
        renderContent([
          {
            testHeading: 'Row one',
            content: html`
              <span data-testid="one">One</span>
            `,
          },
          html`
            <span data-testid="two">Two</span>
          `,
        ]),
        host
      );

      expect(host.textContent).toContain('Row one');
      expect(host.querySelector('[data-testid="one"]')).toBeTruthy();
      expect(host.querySelector('[data-testid="two"]')).toBeTruthy();
    });

    await step('invokes template functions with args', () => {
      host.replaceChildren();
      render(
        renderContent(
          [
            (args: Record<string, unknown>) => html`
              <span data-testid="fn">${String(args.label)}</span>
            `,
          ],
          { args: { label: 'from-args' } }
        ),
        host
      );

      const cell = host.querySelector('[data-testid="fn"]');
      expect(cell?.textContent).toBe('from-args');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// Variants() smoke test
// ──────────────────────────────────────────────────────────────

export const VariantsSmokeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const host = mount(canvasElement);
    const renderGrid = Variants({
      Template: () => html`
        <span data-testid="variant-cell">ok</span>
      `,
      testData: [{ testHeading: 'Default' }],
      withSizes: false,
    });

    await step('renders compact preview in docs mode', () => {
      render(
        renderGrid({}, {
          viewMode: 'docs',
          parameters: {},
          globals: {},
        } as GridStoryContext),
        host
      );

      expect(host.querySelector('[data-html-preview]')).toBeTruthy();
      expect(host.querySelector('[data-testid="variant-cell"]')).toBeTruthy();
      expect(host.querySelector('[data-testing-preview]')).toBeNull();
    });

    await step('renders full testing grid when showTestingGrid is true', () => {
      host.replaceChildren();
      render(
        renderGrid({}, {
          viewMode: 'story',
          parameters: { showTestingGrid: true },
          globals: {},
        } as GridStoryContext),
        host
      );

      expect(host.querySelector('[data-testing-preview]')).toBeTruthy();
      expect(host.querySelector('[data-testid="variant-cell"]')).toBeTruthy();
    });
  },
};
