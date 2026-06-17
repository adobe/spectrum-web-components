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

import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import { TEST_GRID_BORDER } from './constants.js';
import { isDarkTheme, readStaticColor } from './internal.js';
import type {
  ContainerProps,
  GridStoryContext,
  GridTemplateFn,
  HeadingProps,
  RenderContentOptions,
} from './types.js';

/**
 * Renders a label above grid cells; `chromatic-ignore` keeps VRT focused on components.
 */
export function Heading(
  {
    semantics = 'heading',
    content,
    size = 'l',
    weight,
    withMargin = false,
  }: HeadingProps = {},
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  if (!content) {
    return nothing;
  }

  const headingStyles: Record<string, string> = {
    display: 'block',
    color: 'inherit',
    'font-family':
      'adobe-clean, "adobe clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif',
    'font-size': '11px',
    'line-height': '1.3',
    'font-weight': '700',
    'margin-block-end': withMargin ? '8px' : '0',
  };

  if ((size === 'xxs' && semantics === 'heading') || size === 'l') {
    headingStyles['font-size'] = '14px';
  }

  if (semantics === 'detail') {
    headingStyles['letter-spacing'] = '.06em';
    headingStyles['text-transform'] = 'uppercase';
  }

  if (weight === 'light') {
    if (semantics === 'heading') {
      headingStyles['font-weight'] = '300';
    } else {
      headingStyles['font-weight'] = '400';
    }
  }

  if (isDarkTheme(context)) {
    headingStyles['color'] = 'white';
  } else if (typeof readStaticColor(context.args) === 'undefined') {
    headingStyles['color'] = 'CanvasText';
  }
  // When static-color is set in light theme, keep inherit: section titles stay
  // legible on the default canvas; nested headings inside wrapWithStaticColorDemo
  // pick up STATIC_COLOR_DEMO_FOREGROUNDS from the gradient wrapper.

  return html`
    <span class="chromatic-ignore" style=${styleMap(headingStyles)}>
      ${content}
    </span>
  `;
}

/**
 * Walks nested content arrays / objects (same idea as Spectrum CSS `renderContent`).
 */
export function renderContent(
  content: unknown = [],
  {
    context = {} as GridStoryContext,
    args = {},
    callback = ({ testHeading, content: inner }, ctx) => html`
      <div>
        ${testHeading
          ? Heading({ content: testHeading, withMargin: true }, ctx)
          : nothing}
        ${inner ? renderContent(inner, { args, context: ctx }) : nothing}
      </div>
    `,
  }: RenderContentOptions = {}
): TemplateResult | typeof nothing {
  let list: unknown[] = [];
  if (!Array.isArray(content)) {
    list = [content];
  } else {
    list = content;
  }

  if (list.length === 0) {
    return nothing;
  }

  return html`
    ${list.map((c) => {
      if (typeof c === 'undefined') {
        return nothing;
      }

      const isLit =
        typeof c === 'object' && c !== null && '_$litType$' in (c as object);

      if (
        typeof c !== 'string' &&
        typeof c === 'object' &&
        c !== null &&
        !isLit
      ) {
        return callback({ ...args, ...(c as object) }, context);
      }

      if (typeof c === 'function') {
        return (c as GridTemplateFn)(args as never, context);
      }

      return c as TemplateResult;
    })}
  `;
}

/**
 * Outer stack + inner flex region with optional border, mirroring Spectrum CSS `Container`.
 */
export function Container(
  {
    heading,
    content,
    type = 'detail',
    level = 1,
    direction = 'row',
    withBorder = true,
    containerStyles: containerStylesIn = {},
    wrapperStyles: wrapperStylesIn = {},
  }: ContainerProps = {},
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult {
  let containerStyles = { ...containerStylesIn };
  let wrapperStyles = { ...wrapperStylesIn };
  const isDocs = context.viewMode === 'docs';
  const headingConfig: HeadingProps = { size: 'l', semantics: type };
  let gap = 40;

  if (level > 1) {
    headingConfig.size = 's';
    headingConfig.weight = 'light';
  }

  if (level > 3) {
    headingConfig.size = 'xxs';
    headingConfig.semantics = 'heading';
    containerStyles = {
      ...containerStyles,
      'padding-block-start': '8px',
    };
    wrapperStyles = {
      ...wrapperStyles,
      'padding-block-start': '12px',
    };
  }

  if (level === 2) {
    gap = 160;
  }

  const borderStyles: Record<string, string> = {};
  if (withBorder) {
    borderStyles['padding-inline'] = '24px';
    borderStyles['padding-block'] = '24px';
    borderStyles['border'] = TEST_GRID_BORDER;
    borderStyles['border-radius'] = '4px';
    gap = 80;
  }

  const headingGlobals = {
    ...context.globals,
    // Level-1 headings stay legible on the default canvas (matches spectrum-css `color: light` override).
    theme: level === 1 && !isDocs ? 'light' : context.globals?.theme,
  };

  return html`
    <div
      data-outer-container
      style=${styleMap({
        'z-index': '1',
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'flex-wrap': 'nowrap',
        'align-items': 'flex-start',
        gap: heading && level > 1 ? `${Math.floor(24 / level)}px` : undefined,
        ...containerStyles,
      })}
    >
      ${when(heading, () =>
        Heading(
          {
            ...headingConfig,
            content: heading,
          },
          { ...context, globals: headingGlobals }
        )
      )}
      <div
        data-inner-container
        style=${styleMap({
          'flex-grow': '1',
          position: 'relative',
          display: 'flex',
          'flex-direction': direction,
          'flex-wrap': 'wrap',
          'column-gap': `${Math.floor(gap / level)}px`,
          'row-gap': '24px',
          'align-items': heading && level > 1 ? 'flex-start' : undefined,
          'justify-content': direction === 'column' ? 'center' : 'flex-start',
          ...borderStyles,
          ...wrapperStyles,
        })}
      >
        ${renderContent(content, { context })}
      </div>
    </div>
  `;
}
