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
import { styleMap } from 'lit/directives/style-map.js';
import type { StoryContext } from '@storybook/web-components';

import {
  STATIC_COLOR_DEMO_BACKGROUNDS,
  STATIC_COLOR_DEMO_FOREGROUNDS,
} from '../../decorators/static-colors-demo.js';
import type { GridTemplateFn } from './types.js';

/** Same detection logic as `chromatic/isChromatic` (browser Storybook + CI). */
export function isChromatic(windowArgument?: Window): boolean {
  const w =
    windowArgument ?? (typeof window !== 'undefined' ? window : undefined);
  return !!(
    w &&
    (/Chromatic/.test(w.navigator.userAgent) ||
      /chromatic=true/.test(w.location.href))
  );
}

export function capitalize(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

/** Gradient panel for VRT static-color sections (mirrors spectrum-css context backgrounds). */
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

export function isDarkTheme(context: StoryContext): boolean {
  const theme = context.globals?.theme as string | undefined;
  return theme === 'dark' || theme === 'adaptive';
}

export function getRandomId(prefix = 'spectrum'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}
