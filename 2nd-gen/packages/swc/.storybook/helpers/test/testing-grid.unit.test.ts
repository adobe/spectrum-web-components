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
import { describe, expect, it } from 'vitest';

import {
  Container,
  type GridStoryContext,
  Heading,
  isChromatic,
  renderContent,
  Variants,
} from '../testing-grid.js';

const mount = (): HTMLElement => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  return host;
};

describe('isChromatic()', () => {
  it('returns false when window is undefined', () => {
    expect(isChromatic(undefined)).toBe(false);
  });

  it('returns false for a normal user agent', () => {
    const mock = {
      navigator: { userAgent: 'Mozilla/5.0' },
      location: { href: 'http://localhost:6006/' },
    } as Window;

    expect(isChromatic(mock)).toBe(false);
  });

  it('returns true for Chromatic user agent', () => {
    const mock = {
      navigator: { userAgent: 'Mozilla/5.0 Chromatic' },
      location: { href: 'http://localhost:6006/' },
    } as Window;

    expect(isChromatic(mock)).toBe(true);
  });

  it('returns true when chromatic=true is in the URL', () => {
    const mock = {
      navigator: { userAgent: 'Mozilla/5.0' },
      location: { href: 'http://localhost:6006/?chromatic=true' },
    } as Window;

    expect(isChromatic(mock)).toBe(true);
  });
});

describe('Heading()', () => {
  it('returns nothing when content is omitted', () => {
    const host = mount();
    render(Heading({}), host);
    expect(host.querySelector('.chromatic-ignore')).toBeNull();
    host.remove();
  });

  it('renders labeled heading text', () => {
    const host = mount();
    render(Heading({ content: 'Primary' }), host);

    const heading = host.querySelector('.chromatic-ignore') as HTMLElement;
    expect(heading?.textContent?.trim()).toBe('Primary');
    expect(heading?.style.fontWeight).toBe('700');
    host.remove();
  });

  it('applies detail semantics styles', () => {
    const host = mount();
    render(
      Heading({ content: 'Variant', semantics: 'detail', size: 's' }),
      host
    );

    const heading = host.querySelector('.chromatic-ignore') as HTMLElement;
    expect(heading?.style.textTransform).toBe('uppercase');
    host.remove();
  });
});

describe('Container()', () => {
  it('renders outer and inner containers with content', () => {
    const host = mount();
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
    host.remove();
  });

  it('applies border styles when withBorder is true', () => {
    const host = mount();
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
    expect(inner.style.border).toContain('solid');
    expect(inner.style.paddingInline).toBe('24px');
    host.remove();
  });
});

describe('renderContent()', () => {
  it('returns nothing for empty content', () => {
    const host = mount();
    render(renderContent([]), host);
    expect(host.textContent?.trim()).toBe('');
    host.remove();
  });

  it('walks nested objects and renders lit templates', () => {
    const host = mount();
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
    host.remove();
  });

  it('invokes template functions with args', () => {
    const host = mount();
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
    host.remove();
  });
});

describe('Variants()', () => {
  it('renders compact preview in docs mode', () => {
    const host = mount();
    const renderGrid = Variants({
      Template: () => html`
        <span data-testid="variant-cell">ok</span>
      `,
      testData: [{ testHeading: 'Default' }],
      withSizes: false,
    });

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
    host.remove();
  });

  it('renders full testing grid when showTestingGrid is true', () => {
    const host = mount();
    const renderGrid = Variants({
      Template: () => html`
        <span data-testid="variant-cell">ok</span>
      `,
      testData: [{ testHeading: 'Default' }],
      withSizes: false,
    });

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
    host.remove();
  });
});
