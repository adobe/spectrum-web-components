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

import { Subtitle as StorybookSubtitle } from '@storybook/addon-docs/blocks';
import React from 'react';

import { useStoryComponent } from './cem-helpers';

/**
 * One-sentence subtitle rendered below the component title on its
 * Storybook docs page. Sourced from the class JSDoc `@summary` tag, parsed
 * into CEM by `swcJsdocTagsPlugin` (see `cem.config.js`).
 *
 * Fallback: if `@summary` isn't set on the class, defer to Storybook's
 * built-in `<Subtitle />` block, which reads `parameters.docs.subtitle`
 * (legacy path kept for transitional compatibility — new components
 * should use `@summary` and omit `parameters.docs.subtitle`).
 */
export function Subtitle() {
  const component = useStoryComponent();
  const summary = component?.summary?.trim();

  if (summary) {
    return <p className="sbdocs-subtitle">{summary}</p>;
  }

  return <StorybookSubtitle />;
}
