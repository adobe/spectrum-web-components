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

import swcCss from '../swc.css?raw';
import tokensCss from '../tokens.css?raw';

export default {
  title: 'Shadow root/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// An app that renders into a shadow root loads its own `tokens.css` and
// `swc.css` there. Constructed style sheets ignore `@import`, so it loads both.
const appStyles = new CSSStyleSheet();
appStyles.replaceSync(`${tokensCss}\n${swcCss.replace(/@import[^;]*;/g, '')}`);

const mountAppRoot = (container: HTMLElement): ShadowRoot => {
  const host = document.createElement('div');
  container.append(host);
  const root = host.attachShadow({ mode: 'open' });
  root.adoptedStyleSheets = [appStyles];
  root.innerHTML = `
    <span id="text" style="font-size: var(--swc-font-size)">Text</span>
    <div class="swc-theme swc-theme--dark">
      <span id="dark" style="font-size: var(--swc-font-size)">Text</span>
    </div>
  `;
  return root;
};

const fontSize = (root: ShadowRoot, id: string): string =>
  getComputedStyle(root.getElementById(id)!).fontSize;

// Inline custom properties on <html> stand in for another version's swc.css.
const withPageProperties = (
  properties: Record<string, string>,
  run: () => void
): void => {
  const { style } = document.documentElement;
  for (const [name, value] of Object.entries(properties)) {
    style.setProperty(name, value);
  }
  try {
    run();
  } finally {
    for (const name of Object.keys(properties)) {
      style.removeProperty(name);
    }
  }
};

export const AppRootTokensTest: Story = {
  play: async ({ canvasElement, step }) => {
    await step("the app root uses its own tokens, not the page's", () => {
      withPageProperties(
        { '--swc-corner-radius-100': '99px', '--swc-font-size': '99px' },
        () => {
          const root = mountAppRoot(canvasElement);
          expect(
            getComputedStyle(root.host).getPropertyValue(
              '--swc-corner-radius-100'
            )
          ).toBe('4px');
          expect(fontSize(root, 'text')).toBe('14px');
        }
      );
    });

    // Size-dependent tokens, such as `--swc-font-size`, hold a medium and a
    // large value. The toggles that `swc.css` declares pick one. Resetting
    // them on <html> stands in for a page that doesn't load `swc.css`.
    await step(
      "size-dependent tokens resolve when the page doesn't load swc.css",
      () => {
        withPageProperties(
          {
            '--swc-theme-size': 'initial',
            '--swc-theme--sizeM': 'initial',
            '--swc-theme--sizeL': 'initial',
          },
          () => {
            expect(fontSize(mountAppRoot(canvasElement), 'text')).toBe('14px');
          }
        );
      }
    );

    await step('theme classes in the app root switch the color scheme', () => {
      withPageProperties({ 'color-scheme': 'light' }, () => {
        const root = mountAppRoot(canvasElement);
        const dark = root.getElementById('dark')!;
        expect(getComputedStyle(root.host).colorScheme).toBe('light');
        expect(getComputedStyle(dark).colorScheme).toBe('dark');
        expect(fontSize(root, 'dark')).toBe('14px');
      });
    });

    await step("the app root inherits the page's color scheme", () => {
      document.documentElement.classList.add('swc-theme--dark');
      try {
        const root = mountAppRoot(canvasElement);
        expect(getComputedStyle(root.host).colorScheme).toBe('dark');
      } finally {
        document.documentElement.classList.remove('swc-theme--dark');
      }
    });
  },
};
