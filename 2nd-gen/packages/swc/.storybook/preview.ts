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
/** @type { import('@storybook/web-components').Preview } */
import { setCustomElementsManifest } from '@storybook/web-components';
import {
  type Options,
  setStorybookHelpersConfig,
} from '@wc-toolkit/storybook-helpers';

import customElements from './custom-elements.json';
import { withContext } from './decorators/contexts.js';
import { withFlexLayout, withStaticColorsDemo } from './decorators/index.js';
import { withLanguageWrapper } from './decorators/language.js';
import { withStaticColorPlayground } from './decorators/static-color-playground.js';
import DocumentTemplate from './DocumentTemplate.mdx';
import { FontLoader } from './loaders/font-loader.js';
import { transformDocsSource } from './utils/docs-source-transform.js';

import '../stylesheets/swc.css';
import '../stylesheets/typography.css';
import '../stylesheets/global/global-elements.css';
import './assets/preview.css';

const storybookHelperOptions: Options = {
  categoryOrder: [
    'attributes',
    'properties',
    'slots',
    'cssProps',
    'cssParts',
    'events',
    'methods',
  ],
  hideArgRef: true,
  renderDefaultValues: true,
};

setStorybookHelpersConfig(storybookHelperOptions);

// Set the Custom Elements Manifest for automatic controls generation
setCustomElementsManifest(customElements);

const preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      type: 'string',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'adaptive', title: 'Adaptive' },
        ],
        dynamicTitle: true,
      },
    },
    lang: {
      name: 'Language',
      description:
        'Locale for typography (loads the corresponding Adobe Fonts kit on demand)',
      defaultValue: 'en-US',
      type: 'string',
      toolbar: {
        title: 'Language',
        icon: 'globe',
        items: [
          { value: 'en-US', title: 'English', right: 'English (US)' },
          { value: 'he', title: 'Hebrew', right: 'עִברִית' },
          { value: 'ja', title: 'Japanese', right: '日本語' },
          { value: 'ko', title: 'Korean', right: '한국어' },
          { value: 'ar', title: 'Arabic', right: 'عربي' },
          // { value: "fa", title: "Persian", right: "فارسی" },
          {
            value: 'zh-Hans',
            title: 'Chinese (Simplified)',
            right: '简体中文',
          },
          {
            value: 'zh-Hant',
            title: 'Chinese (Traditional)',
            right: '繁體中文',
          },
          {
            value: 'zh-HK',
            title: 'Chinese (Hong Kong)',
            right: '中文（香港）',
          },
          // { value: "th", title: "Thai", right: "ไทย" },
        ],
        dynamicTitle: true,
      },
    },
    textDirection: {
      name: 'Direction',
      description:
        'Text direction for stories. Auto follows language; LTR/RTL overrides it.',
      defaultValue: 'auto',
      type: 'string',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'auto', title: 'Auto' },
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    lang: 'en-US',
    textDirection: 'auto',
  },
  decorators: [
    withContext,
    withLanguageWrapper,
    withStaticColorPlayground,
    withStaticColorsDemo,
    withFlexLayout,
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true }, // Use custom context switches
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // CI enforces a11y via the custom Storybook test-runner; keep addon-a11y non-blocking here.
      test: 'todo',
      config: {
        rules: [
          // Customize axe-core rules if needed
        ],
      },
    },
    html: {
      root: '[data-html-preview]:first-of-type > *',
      removeComments: true,
      prettier: {
        tabWidth: 2,
        useTabs: false,
      },
      highlighter: {
        showLineNumbers: false,
        wrapLines: true,
      },
    },
    docs: {
      codePanel: true,
      page: DocumentTemplate,
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3, h4',
        ignoreSelector:
          '.sbdocs-subtitle, .sbdocs-preview *, #root-inner, #feedback',
        disable: false,
      },
      canvas: {
        withToolbar: true,
        layout: 'centered',
        sourceState: 'shown',
      },
      source: {
        excludeDecorators: true,
        // Prefer serialized DOM so docs code panels show HTML for stories that use
        // custom render functions; type "auto" often surfaces raw source instead.
        type: 'dynamic',
        language: 'html',
        transform: transformDocsSource,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical-by-kind',
        order: [
          'Learn about SWC',
          ['Overview', 'When to use SWC', '1st-gen vs 2nd-gen'],
          'Core',
          ['Overview', 'Controllers'],
          'Components',
          'Patterns',
          ['Conversational AI', ['README', 'Prompt field', 'User message']],
          'Guides',
          [
            'Accessibility guides',
            [
              'Overview',
              'Semantic HTML and ARIA',
              'Headings and landmarks',
              'Accessible pattern libraries',
              'Keyboard testing',
              'Screen reader testing',
              'WAVE toolbar testing',
              'Accessibility resources',
            ],
            'Customization',
            [
              'Getting Started',
              'Theme and Scales',
              'Fonts',
              'Component Styles',
              'Global Element Styling',
            ],
          ],
          'Contributor docs',
          // GENERATED:CONTRIBUTOR-DOCS-SORT - Do not edit manually. Run `yarn generate:contributor-docs` to update.
          [
            'Contributor documentation',
            'Contributor guides',
            [
              'Getting involved',
              'Using the issue tracker',
              'Working in the SWC repo',
              'Making a pull request',
              'Participating in PR reviews',
              'Releasing SWC',
              'Authoring contributor docs',
              'Patching dependencies',
              'Accessibility testing',
              'Using stackblitz',
              '2nd-gen testing',
              'Tools vs packages',
              'Writing migration guides',
              'Focus management',
            ],
            'Style guide',
            [
              'CSS',
              [
                'Component CSS',
                'Custom properties',
                'Component CSS PR checklist',
                'Spectrum SWC migration',
                'Anti patterns',
                'Property order quick reference',
              ],
              'TypeScript',
              [
                'File organization',
                'Class structure',
                'TypeScript modifiers',
                'Lit decorators',
                'Property patterns',
                'Method patterns',
                'JSDoc standards',
                'Component types',
                'Rendering patterns',
                'Naming conventions',
                'Base vs concrete',
                'Composition patterns',
                'Mixin composition',
                'Controller composition',
                'Directive composition',
                'Interface composition',
                'Debug validation',
              ],
              'Linting tools',
              'Testing',
              [
                'Testing overview',
                'Storybook testing',
                'Playwright accessbility testing',
                'Visual regresssion testing',
                'Testing utilities',
                'Code coverage',
                'Avoiding flaky tests',
                'Running tests.',
                'PR review checklist',
                'Resources',
              ],
            ],
            'Project planning',
            [
              'Objectives and strategy',
              'Workstreams',
              [
                '2nd gen definition and development',
                '2nd gen component migration',
                [
                  'Status',
                  'Step by step',
                  [
                    'Analyze rendering and styling',
                    'Washing machine workflow',
                    'Factor rendering out of 1st gen component',
                    'Move base class to 2nd gen core',
                    'Formalize spectrum data model',
                    'Implement 2nd gen component',
                    'Migrate rendering and styles',
                    'Add stories for 2nd gen component',
                  ],
                  'Migration project planning',
                ],
                'Accessibility improvements',
                'Component improvements',
                '1st gen spectrum 2 enhancements',
              ],
              'Components',
              [
                'Accordion',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Action button',
                ['Rendering and styling migration analysis'],
                'Action group',
                ['Rendering and styling migration analysis'],
                'Action menu',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Alert banner',
                ['Rendering and styling migration analysis'],
                'Asset',
                ['Rendering and styling migration analysis'],
                'Avatar',
                [
                  'Accessibility migration analysis',
                  'Migration plan',
                  'Rendering and styling migration analysis',
                ],
                'Badge',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Button',
                [
                  'Accessibility migration analysis',
                  'Migration plan',
                  'Rendering and styling migration analysis',
                ],
                'Button group',
                ['Rendering and styling migration analysis'],
                'Checkbox',
                ['Rendering and styling migration analysis'],
                'Color field',
                ['Rendering and styling migration analysis'],
                'Color loupe',
                ['Accessibility migration analysis'],
                'Divider',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Dropzone',
                ['Rendering and styling migration analysis'],
                'Field group',
                ['Rendering and styling migration analysis'],
                'Field label',
                ['Rendering and styling migration analysis'],
                'Help text',
                ['Rendering and styling migration analysis'],
                'Illustrated message',
                [
                  'Accessibility migration analysis',
                  'Migration plan',
                  'Rendering and styling migration analysis',
                ],
                'Infield button',
                ['Rendering and styling migration analysis'],
                'Infield progress circle',
                ['Rendering and styling migration analysis'],
                'Link',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Menu',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Menu group',
                ['Accessibility migration analysis'],
                'Menu item',
                ['Accessibility migration analysis'],
                'Menu separator',
                ['Accessibility migration analysis'],
                'Meter',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Number field',
                ['Rendering and styling migration analysis'],
                'Opacity checkerboard',
                ['Rendering and styling migration analysis'],
                'Picker button',
                ['Rendering and styling migration analysis'],
                'Popover',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Progress bar',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Progress circle',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Radio',
                ['Rendering and styling migration analysis'],
                'Search',
                ['Rendering and styling migration analysis'],
                'Slider',
                ['Rendering and styling migration analysis'],
                'Status light',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
                'Swatch',
                ['Rendering and styling migration analysis'],
                'Swatch group',
                ['Rendering and styling migration analysis'],
                'Switch',
                ['Rendering and styling migration analysis'],
                'Tabs',
                [
                  'Accessibility migration analysis',
                  'Migration plan',
                  'Rendering and styling migration analysis',
                ],
                'Tag',
                ['Rendering and styling migration analysis'],
                'Tags',
                ['Rendering and styling migration analysis'],
                'Textfield',
                ['Rendering and styling migration analysis'],
                'Thumbnail',
                ['Rendering and styling migration analysis'],
                'Tooltip',
                [
                  'Accessibility migration analysis',
                  'Rendering and styling migration analysis',
                ],
              ],
              'Milestones',
              'Strategies',
              ['Focus management strategy rfc'],
            ],
          ],
          // GENERATED:CONTRIBUTOR-DOCS-SORT-END
        ],
      },
    },
  },
  // Hide SpectrumElement infrastructure members from every component's API table.
  // These are internal properties that consumers should not configure directly.
  argTypes: {
    dir: { table: { disable: true } },
    VERSION: { table: { disable: true } },
    CORE_VERSION: { table: { disable: true } },
    hasVisibleFocusInTree: { table: { disable: true } },
  },
  tags: ['!autodocs', '!dev'], // We only want the playground stories to be visible in the docs and sidenav. Since a majority of our stories are tagged with '!autodocs' and '!dev', we set those tags globally. We can opt in to visibility by adding the 'autodocs' or 'dev' tags to individual stories.
  loaders: [FontLoader],
};

export default preview;
