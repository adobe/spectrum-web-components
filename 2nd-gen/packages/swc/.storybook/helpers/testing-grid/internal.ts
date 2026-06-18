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

/**
 * Internal helpers for static-color sections and shared utilities.
 */

import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { StoryContext } from '@storybook/web-components';

import {
  STATIC_COLOR_DEMO_BACKGROUNDS,
  STATIC_COLOR_DEMO_FOREGROUNDS,
} from '../../decorators/static-colors-demo.js';
import type { GridTemplateFn } from './types.js';

/** Reads `static-color` / `staticColor` from story args when present. */
export function readStaticColor(
  args: Record<string, unknown> | undefined
): string | undefined {
  if (!args) {
    return undefined;
  }
  const v = args['static-color'] ?? args.staticColor;
  return typeof v === 'string' ? v : undefined;
}

type StaticColorDemoKey = keyof typeof STATIC_COLOR_DEMO_BACKGROUNDS;

function isStaticColorDemoKey(
  value: string | undefined
): value is StaticColorDemoKey {
  return value === 'white' || value === 'black';
}

/**
 * Wraps a grid cell template in the static white/black gradient panel when
 * `static-color` is set on the cell args.
 */
export function wrapWithStaticColorDemo<TArgs extends Record<string, unknown>>(
  Template: GridTemplateFn<TArgs>,
  data: TArgs
): GridTemplateFn<TArgs> {
  const staticColor = readStaticColor(data);
  if (!staticColor || !isStaticColorDemoKey(staticColor)) {
    return Template;
  }

  return (args, context) => html`
    <div
      style=${styleMap({
        padding: '24px',
        color: STATIC_COLOR_DEMO_FOREGROUNDS[staticColor],
        background: STATIC_COLOR_DEMO_BACKGROUNDS[staticColor],
      })}
    >
      ${Template(args, context)}
    </div>
  `;
}

/** True when the Storybook theme global is dark or adaptive. */
export function isDarkTheme(context: StoryContext): boolean {
  const theme = context.globals?.theme as string | undefined;
  return theme === 'dark' || theme === 'adaptive';
}

/** Capitalizes the first character of a string. */
export function capitalize(str?: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Generates a unique id for controls that need distinct `name` / `id` values across grid cells. */
export function generateUniqueId(prefix = 'spectrum'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}
