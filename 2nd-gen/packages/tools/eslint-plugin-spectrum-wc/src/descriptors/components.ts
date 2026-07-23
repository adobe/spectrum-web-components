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

import type { ComponentDescriptorMap } from '../core/types.js';

/**
 * Component descriptors encoding accessibility requirements, deprecations,
 * required attributes, and valid values for Spectrum Web Components.
 *
 * To add a new component: add an entry keyed by its tag name.
 * No new rule code is needed; the rule factory picks it up automatically.
 */
export const componentDescriptors: ComponentDescriptorMap = {
  'sp-action-menu': {
    tagName: 'sp-action-menu',
    accessibility: {
      requireOneOf: ['label', 'aria-label', 'aria-labelledby'],
    },
    slots: [
      {
        name: '',
        acceptedChildren: ['sp-menu-item', 'sp-menu-group', 'sp-menu-divider'],
      },
      { name: 'icon', acceptedChildren: ['sp-icon'] },
      { name: 'label' },
      { name: 'tooltip', acceptedChildren: ['sp-tooltip'] },
    ],
  },

  'sp-avatar': {
    tagName: 'sp-avatar',
    accessibility: {
      requireOneOf: ['label', 'is-decorative'],
      conditionalRules: [
        {
          when: {
            hasAttributes: ['is-decorative', 'href'],
          },
          requireOneOf: ['label'],
          message:
            '<sp-avatar> with `is-decorative` and `href` requires a `label` attribute for the link to be accessible.',
        },
      ],
    },
  },

  'sp-clear-button': {
    tagName: 'sp-clear-button',
    accessibility: {
      requireOneOf: ['label'],
    },
  },

  'sp-dialog-wrapper': {
    tagName: 'sp-dialog-wrapper',
    accessibility: {
      requireOneOf: ['headline'],
    },
    slots: [
      { name: '' },
      { name: 'hero' },
      { name: 'heading' },
      { name: 'button', acceptedChildren: ['sp-button'] },
    ],
  },

  'sp-picker': {
    tagName: 'sp-picker',
    accessibility: {
      requireOneOf: ['label', 'aria-label', 'aria-labelledby'],
    },
    slots: [
      {
        name: '',
        acceptedChildren: ['sp-menu-item', 'sp-menu-group', 'sp-menu-divider'],
      },
      { name: 'label' },
      { name: 'tooltip', acceptedChildren: ['sp-tooltip'] },
      { name: 'description' },
    ],
  },

  'sp-progress-bar': {
    tagName: 'sp-progress-bar',
    accessibility: {
      requireOneOf: ['label', 'aria-label', 'aria-labelledby'],
    },
  },

  'sp-progress-circle': {
    tagName: 'sp-progress-circle',
    accessibility: {
      requireOneOf: ['label', 'aria-label', 'aria-labelledby'],
    },
  },

  'sp-tabs': {
    tagName: 'sp-tabs',
    accessibility: {
      requireOneOf: ['accessible-label', 'aria-label', 'aria-labelledby'],
    },
    validAttributeValues: {
      direction: ['horizontal', 'vertical'],
      density: ['compact', 'regular'],
    },
    slots: [
      {
        name: '',
        acceptedChildren: ['sp-tab', 'sp-tab-panel'],
      },
    ],
  },

  'sp-theme': {
    tagName: 'sp-theme',
    requiredAttributes: ['color', 'scale', 'system'],
    validAttributeValues: {
      color: ['light', 'dark'],
      scale: ['medium', 'large'],
      system: ['spectrum', 'express'],
    },
  },

  'overlay-trigger': {
    tagName: 'overlay-trigger',
    requiredAttributes: ['triggered-by'],
    slots: [
      { name: '', required: true },
      { name: 'click-content' },
      { name: 'hover-content' },
      { name: 'longpress-content' },
    ],
  },

  'sp-button': {
    tagName: 'sp-button',
    slots: [{ name: '' }, { name: 'icon', acceptedChildren: ['sp-icon'] }],
    deprecations: {
      attributes: [
        {
          attribute: 'variant',
          deprecatedValues: [
            {
              value: 'cta',
              message:
                'The "cta" variant on <sp-button> is deprecated. Use variant="accent" instead.',
              replacement: 'accent',
            },
            {
              value: 'overBackground',
              message:
                'The "overBackground" variant on <sp-button> is deprecated. Use static-color="white" with treatment="outline" instead.',
            },
            {
              value: 'white',
              message:
                'The "white" variant on <sp-button> is deprecated. Use static-color="white" instead.',
            },
            {
              value: 'black',
              message:
                'The "black" variant on <sp-button> is deprecated. Use static-color="black" instead.',
            },
          ],
        },
        {
          attribute: 'href',
          message:
            'The "href" attribute on <sp-button> is deprecated. Use a native <a> element with Spectrum global element styling instead.',
        },
      ],
    },
    validAttributeValues: {
      variant: ['accent', 'primary', 'secondary', 'negative'],
      size: ['s', 'm', 'l', 'xl'],
      treatment: ['fill', 'outline'],
    },
  },

  'sp-slider': {
    tagName: 'sp-slider',
    deprecations: {
      warnOnTextContent: {
        message:
          'The default slot for text label in <sp-slider> has been deprecated. Use the "label" attribute instead.',
      },
    },
  },

  'sp-overlay': {
    tagName: 'sp-overlay',
    deprecations: {
      attributes: [
        {
          attribute: 'allow-outside-click',
          message:
            'The "allow-outside-click" attribute on <sp-overlay> is deprecated and not recommended for accessibility reasons.',
        },
      ],
    },
  },

  'sp-illustrated-message': {
    tagName: 'sp-illustrated-message',
    slots: [
      { name: '' },
      { name: 'heading' },
      { name: 'description' },
      {
        name: 'illustration',
        acceptedChildren: ['sp-icon', 'svg'],
      },
    ],
    deprecations: {
      attributes: [
        {
          attribute: 'heading',
          message:
            'The "heading" property on <sp-illustrated-message> is deprecated. Use <slot name="heading"> instead.',
        },
        {
          attribute: 'description',
          message:
            'The "description" property on <sp-illustrated-message> is deprecated. Use <slot name="description"> instead.',
        },
      ],
    },
  },

  'sp-status-light': {
    tagName: 'sp-status-light',
    accessibility: {
      requireOneOf: ['label', 'aria-label', 'aria-labelledby'],
    },
    deprecations: {
      attributes: [
        {
          attribute: 'variant',
          deprecatedValues: [
            {
              value: 'accent',
              message:
                '<sp-status-light> does not support the "accent" variant in Spectrum 2. Use "neutral" or "info" depending on intent.',
            },
          ],
        },
        {
          attribute: 'disabled',
          message:
            'The "disabled" attribute on <sp-status-light> was deprecated in Spectrum 1 and removed in Spectrum 2.',
        },
      ],
    },
    validAttributeValues: {
      variant: [
        'neutral',
        'info',
        'positive',
        'notice',
        'negative',
        'yellow',
        'fuchsia',
        'indigo',
        'seafoam',
        'purple',
      ],
    },
  },
};
