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
 * Low-level layout primitives: section headings, nested content, and bordered containers.
 */

import { html, nothing, type TemplateResult } from 'lit';
import { isTemplateResult } from 'lit/directive-helpers.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import { TEST_GRID_BORDER } from './constants.js';
import type {
  ContainerProps,
  GridStoryContext,
  GridTemplateFn,
  HeadingProps,
  RenderContentOptions,
} from './types.js';

const HEADING_SIZE_CLASS = {
  l: 'L',
  s: 'S',
  xxs: 'XS',
} as const;

function headingClasses({
  semantics = 'heading',
  size = 'l',
  weight,
  withMargin = false,
}: Pick<HeadingProps, 'semantics' | 'size' | 'weight' | 'withMargin'>): Record<
  string,
  boolean
> {
  const isDetail = semantics === 'detail';
  const variantBase = isDetail ? 'swc-Detail' : 'swc-Heading';
  const sizeClass = `${variantBase}--size${HEADING_SIZE_CLASS[size]}`;
  const marginsClass = `${variantBase}--margins`;

  return {
    'chromatic-ignore': true,
    [variantBase]: true,
    [sizeClass]: true,
    [marginsClass]: withMargin,
    'swc-Heading--heavy': !isDetail && weight !== 'light',
  };
}

/**
 * Section label for a grid region. Uses SWC typography classes and is excluded
 * from Chromatic snapshots via `chromatic-ignore`.
 */
export function Heading(
  {
    semantics = 'heading',
    content,
    size = 'l',
    weight,
    withMargin = false,
  }: HeadingProps = {},
  _context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  if (!content) {
    return nothing;
  }

  return html`
    <div
      class=${classMap(headingClasses({ semantics, size, weight, withMargin }))}
    >
      ${content}
    </div>
  `;
}

/**
 * Recursively renders grid content: Lit templates, template functions, or nested
 * `{ testHeading, content }` objects. Custom `callback` can override nesting behavior.
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

      const isLit = isTemplateResult(c);

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
 * Bordered flex section with an optional heading. `level` controls heading size and
 * spacing (1 = top-level section, 2+ = nested rows/columns). Nesting deeper grids
 * is done by passing more `Container` calls inside `content`.
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
    // Level-1 headings stay legible on the default canvas.
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
