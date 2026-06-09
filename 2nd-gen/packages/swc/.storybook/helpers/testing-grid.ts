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
 * Storybook testing-grid helpers aligned with Spectrum CSS Storybook utilities
 * (see adobe/spectrum-css `.storybook/decorators/utilities.js`).
 *
 * Use `Variants({ ... })` as a story `render` function to show a compact preview in Docs
 * / local Storybook, and the full testing grid when `parameters.showTestingGrid` is true
 * or when running under Chromatic (same UA / URL heuristics as `chromatic/isChromatic`).
 *
 * Grid `Template` callbacks must be pure Lit (see `stories/*.template.ts`). Do not use
 * `getStorybookHelpers().template` — it calls `useArgs()` via `syncControls` once per
 * cell and triggers "Rendered more hooks than during the previous render" in Storybook.
 */

import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import type { StoryContext } from '@storybook/web-components';

/** Standard storyName for VRT grids (see chromatic.config.json onlyStoryNames). */
export const TESTING_GRID_STORY_NAME = 'Default';

/** Opt a testing-grid story into Chromatic (preview disables snapshots globally). */
export const TESTING_GRID_STORY_PARAMETERS = {
  chromatic: { disableSnapshot: false },
} as const;

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

function capitalize(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function readStaticColor(
  args: Record<string, unknown> | undefined
): string | undefined {
  if (!args) {
    return undefined;
  }
  const v = args['static-color'] ?? args.staticColor;
  return typeof v === 'string' ? v : undefined;
}

function isDarkTheme(context: StoryContext): boolean {
  const theme = context.globals?.theme as string | undefined;
  return theme === 'dark' || theme === 'adaptive';
}

export type GridStoryContext = StoryContext;

export type GridTemplateFn<TArgs = Record<string, unknown>> = (
  args: TArgs,
  context: GridStoryContext
) => TemplateResult | typeof nothing;

export type HeadingSemantics = 'heading' | 'detail';

export interface HeadingProps {
  semantics?: HeadingSemantics;
  content?: string;
  size?: 'l' | 's' | 'xxs';
  weight?: 'light';
  withMargin?: boolean;
}

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
    headingStyles['color'] = readStaticColor(context.args) ?? 'white';
  } else if (typeof readStaticColor(context.args) !== 'undefined') {
    headingStyles['color'] = readStaticColor(context.args) ?? 'CanvasText';
  } else {
    headingStyles['color'] = 'CanvasText';
  }

  return html`
    <span class="chromatic-ignore" style=${styleMap(headingStyles)}>
      ${content}
    </span>
  `;
}

export interface ContainerProps {
  heading?: string;
  content?: unknown;
  type?: HeadingSemantics;
  level?: number;
  direction?: 'row' | 'column';
  withBorder?: boolean;
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
}

const TEST_GRID_BORDER = '1px solid var(--swc-gray-300)';

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

export interface StateItem {
  testHeading?: string;
  wrapperStyles?: Record<string, string>;
  ignore?: string[];
  include?: string[];
}

type StatesOwn<TArgs extends Record<string, unknown>> = {
  Template: GridTemplateFn<TArgs>;
  direction?: 'row' | 'column';
  stateData?: Array<StateItem & TArgs> | (StateItem & TArgs);
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
  containerHeading?: string;
};

export type StatesProps<TArgs extends Record<string, unknown>> =
  StatesOwn<TArgs> & Omit<Partial<TArgs>, keyof StatesOwn<TArgs>>;

/**
 * Renders `stateData` as labeled columns/rows (interaction states, themes, etc.).
 */
export function States<TArgs extends Record<string, unknown>>(
  {
    Template,
    direction = 'row',
    stateData = [],
    containerStyles = {},
    wrapperStyles = {},
    containerHeading = '',
    ...args
  }: StatesProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult {
  let states = stateData;
  if (!Array.isArray(states)) {
    states = [states];
  }

  const showStateHeading = states.some((s) => s.testHeading);

  return Container(
    {
      level: 2,
      direction,
      withBorder: false,
      heading: undefined,
      containerStyles,
      content: states.map(
        ({
          testHeading = 'Default',
          wrapperStyles: stateWrapperStyles = {},
          ignore = [],
          include = [],
          ...item
        }) => {
          if (include.length && !include.includes(containerHeading)) {
            return nothing;
          }
          if (ignore.length && ignore.includes(containerHeading)) {
            return nothing;
          }

          const nextContext: GridStoryContext = {
            ...context,
            args: {
              ...context.args,
              ...args,
              ...item,
            } as typeof context.args,
          };

          return Container(
            {
              heading: showStateHeading ? testHeading : '',
              level: 3,
              withBorder: false,
              wrapperStyles: {
                ...wrapperStyles,
                ...stateWrapperStyles,
              },
              content: Template({ ...args, ...item } as TArgs, nextContext),
            },
            nextContext
          );
        }
      ),
    },
    context
  );
}

type ArgGridOwn<TArgs extends Record<string, unknown>> = {
  Template: GridTemplateFn<TArgs>;
  wrapperStyles?: Record<string, string>;
  containerStyles?: Record<string, string>;
  direction?: 'row' | 'column';
  heading?: string;
  argKey: keyof TArgs & string;
  options?: string[];
  labels?: Record<string, string>;
  level?: number;
  withBorder?: boolean;
  withWrapperBorder?: boolean;
};

export type ArgGridProps<TArgs extends Record<string, unknown>> =
  ArgGridOwn<TArgs> & Omit<Partial<TArgs>, keyof ArgGridOwn<TArgs>>;

/**
 * Renders one cell per `options` value for a single arg (variant grid, semantic colors, etc.).
 */
export function ArgGrid<TArgs extends Record<string, unknown>>(
  {
    Template,
    wrapperStyles = {},
    containerStyles = {},
    direction = 'row',
    heading,
    argKey,
    options: optionsProp,
    labels = {},
    level = 2,
    withBorder = true,
    withWrapperBorder = true,
    ...args
  }: ArgGridProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  const isDocs = context.viewMode === 'docs';

  if (typeof argKey === 'undefined') {
    console.warn('ArgGrid: argKey is required to render the grid.');
    return nothing;
  }

  const argType = context.argTypes?.[argKey];
  if (typeof argType === 'undefined') {
    console.warn(`ArgGrid: ${argKey} is not a valid argType for this story.`);
    return nothing;
  }

  let options = optionsProp;
  if (typeof options === 'undefined' || !options.length) {
    options = (argType.options ?? []) as string[];
  }

  if (typeof options === 'undefined' || !options.length) {
    console.warn(`ArgGrid: No options found for ${argKey}.`);
    return nothing;
  }

  let withInnerWrapperBorder = withWrapperBorder;
  if (!heading && isDocs) {
    withInnerWrapperBorder = false;
  }

  return Container(
    {
      heading,
      direction,
      withBorder: withInnerWrapperBorder,
      containerStyles,
      wrapperStyles,
      content: options.map((opt, index) =>
        Container(
          {
            heading: labels[opt] ?? capitalize(opt),
            level,
            withBorder,
            containerStyles,
            wrapperStyles,
            content: Template(
              {
                ...args,
                [argKey]: opt,
                ...('name' in args && typeof args.name !== 'undefined'
                  ? { name: `${String(args.name)}-${argKey}-${index}` }
                  : {}),
                ...('id' in args && typeof args.id !== 'undefined'
                  ? { id: `${String(args.id)}-${argKey}-${index}` }
                  : {}),
              } as TArgs,
              context
            ),
          },
          context
        )
      ),
    },
    context
  );
}

type SizesOwn<TArgs extends Record<string, unknown>> = {
  Template: GridTemplateFn<TArgs>;
  wrapperStyles?: Record<string, string>;
  containerStyles?: Record<string, string>;
  direction?: 'row' | 'column';
  withHeading?: boolean;
  withBorder?: boolean;
  withWrapperBorder?: boolean;
};

export type SizesProps<TArgs extends Record<string, unknown>> =
  SizesOwn<TArgs> & Omit<Partial<TArgs>, keyof SizesOwn<TArgs>>;

const SIZE_LABELS: Record<string, string> = {
  xxs: 'Extra-extra-small',
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
  xxl: 'Extra-extra-large',
  xxxl: 'Extra-extra-extra-large',
};

/** Arg grid preset for the common `size` control. */
export function Sizes<TArgs extends Record<string, unknown>>(
  {
    withHeading = true,
    withBorder = false,
    withWrapperBorder = true,
    ...args
  }: SizesProps<TArgs>,
  context: GridStoryContext = {} as GridStoryContext
): TemplateResult | typeof nothing {
  return ArgGrid<TArgs>(
    {
      withBorder,
      withWrapperBorder,
      argKey: 'size' as keyof TArgs & string,
      labels: SIZE_LABELS,
      ...args,
      heading: withHeading ? 'Sizing' : undefined,
    },
    context
  );
}

export interface TestCaseItem<TArgs = Record<string, unknown>> {
  Template?: GridTemplateFn<TArgs>;
  testHeading?: string;
  wrapperStyles?: Record<string, string>;
  withStates?: boolean;
}

export interface VariantsConfig<TArgs extends Record<string, unknown>> {
  Template: GridTemplateFn<TArgs>;
  TestTemplate?: GridTemplateFn<TArgs>;
  SizeTemplate?: GridTemplateFn<TArgs>;
  testData?: Array<TestCaseItem<TArgs> & TArgs>;
  stateData?: Array<StateItem & TArgs>;
  withSizes?: boolean;
  sizeDirection?: 'row' | 'column';
  stateDirection?: 'row' | 'column';
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
}

/**
 * Returns a Storybook `render` function: simple preview in Docs / dev, full grid for VRT
 * when `parameters.showTestingGrid` is true or under Chromatic.
 */
export function Variants<TArgs extends Record<string, unknown>>({
  Template,
  TestTemplate,
  SizeTemplate,
  testData = [{}],
  stateData = [],
  withSizes = true,
  sizeDirection,
  stateDirection,
  containerStyles = {},
  wrapperStyles = {},
}: VariantsConfig<TArgs>): GridTemplateFn<TArgs> {
  if (!Template) {
    throw new Error('Variants: Template is required');
  }

  const resolvedTestTemplate = TestTemplate ?? Template;
  const resolvedSizeTemplate = SizeTemplate ?? resolvedTestTemplate;

  const paddedStateData =
    stateData.length > 0 && Object.keys(stateData[0]).length > 0
      ? ([{}, ...stateData] as Array<StateItem & TArgs>)
      : stateData;

  return (args, context) => {
    const {
      parameters: { docs = {}, showTestingGrid = false } = {},
      viewMode,
    } = context;

    const height = (docs as { story?: { height?: number | string } }).story
      ?.height;
    const width = (docs as { story?: { width?: number | string } }).story
      ?.width;

    if (viewMode === 'docs' || (!showTestingGrid && !isChromatic())) {
      return html`
        <div
          data-html-preview
          style=${styleMap({
            padding: '12px',
            'min-block-size':
              typeof height === 'number' ? `${height}px` : (height as string),
            'min-inline-size':
              typeof width === 'number' ? `${width}px` : (width as string),
            ...wrapperStyles,
          })}
        >
          ${Template(args, context)}
        </div>
      `;
    }

    return html`
      <div
        data-testing-preview
        style=${styleMap({
          padding: '24px',
          display: 'flex',
          'flex-direction': 'column',
          'flex-wrap': 'wrap',
          'align-items': 'flex-start',
          gap: '24px',
        })}
      >
        ${testData.map(
          ({
            Template: AltTemplate,
            testHeading,
            wrapperStyles: testWrapperStyles = {},
            withStates: withStatesProp,
            ...item
          }) => {
            let withStates = withStatesProp;
            if (typeof withStates === 'undefined') {
              withStates = paddedStateData.length > 0;
            }

            const Alt = AltTemplate ?? resolvedTestTemplate;

            const withBorder = withStates || testData.length > 1;

            const data = { ...args, ...item } as TArgs;

            let heading = testHeading;
            if (testData.some((t) => t.testHeading) && !heading) {
              heading = 'Default';
            }

            const combinedStyles = {
              ...wrapperStyles,
              ...testWrapperStyles,
            };

            return Container(
              {
                heading,
                withBorder,
                containerStyles: {
                  'z-index': '1',
                  ...containerStyles,
                },
                wrapperStyles: withStates ? containerStyles : combinedStyles,
                content: html`
                  ${when(
                    withStates,
                    () =>
                      States<TArgs>(
                        {
                          Template: Alt,
                          stateData: paddedStateData,
                          direction: stateDirection,
                          wrapperStyles: combinedStyles,
                          containerHeading: heading ?? '',
                          ...data,
                        },
                        context
                      ),
                    () => Alt(data, context)
                  )}
                `,
              },
              context
            );
          }
        )}
        ${when(withSizes, () =>
          Sizes<TArgs>(
            {
              Template: resolvedSizeTemplate,
              wrapperStyles,
              containerStyles,
              direction: sizeDirection,
              ...args,
            },
            context
          )
        )}
      </div>
    `;
  };
}

export interface RenderContentOptions {
  context?: GridStoryContext;
  args?: Record<string, unknown>;
  callback?: (
    props: Record<string, unknown> & {
      testHeading?: string;
      content?: unknown;
    },
    context: GridStoryContext
  ) => TemplateResult | typeof nothing;
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

export function getRandomId(prefix = 'spectrum'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 7)}`;
}
