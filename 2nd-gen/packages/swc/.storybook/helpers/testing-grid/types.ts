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
 * Shared types for testing-grid templates and VRT story configs.
 */

import { nothing, type TemplateResult } from 'lit';
import type { StoryContext } from '@storybook/web-components';

/** Storybook context passed into every grid template function. */
export type GridStoryContext = StoryContext;

/** Lit render function for a single grid cell or nested section. */
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

export interface ContainerProps {
  /** Section title; omitted when empty. */
  heading?: string;
  /** Nested templates, containers, or `{ testHeading, content }` objects. */
  content?: unknown;
  type?: HeadingSemantics;
  /** Nesting depth — affects heading scale, gap, and padding. */
  level?: number;
  direction?: 'row' | 'column';
  withBorder?: boolean;
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
}

/** One column/row in a `States()` matrix. Extra keys are merged into template args. */
export interface StateItem {
  testHeading?: string;
  wrapperStyles?: Record<string, string>;
  /** Skip this state when the parent section heading matches. */
  ignore?: string[];
  /** Only render for parent sections whose heading is listed. */
  include?: string[];
}

type StatesOwn<TArgs extends Record<string, unknown>> = {
  Template: GridTemplateFn<TArgs>;
  direction?: 'row' | 'column';
  stateData?: Array<StateItem & TArgs> | (StateItem & TArgs);
  withStateBorder?: boolean;
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
  containerHeading?: string;
};

export type StatesProps<TArgs extends Record<string, unknown>> =
  StatesOwn<TArgs> & Omit<Partial<TArgs>, keyof StatesOwn<TArgs>>;

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

export interface TestCaseItem<TArgs = Record<string, unknown>> {
  /** Override the default template for this `testData` section. */
  Template?: GridTemplateFn<TArgs>;
  testHeading?: string;
  wrapperStyles?: Record<string, string>;
  /** When false, skips `stateData` for this section. Default: true when `stateData` is set. */
  withStates?: boolean;
}

/** Config passed to `Variants()` from a component's `*.vrt.ts` file. */
export interface VariantsConfig<TArgs extends Record<string, unknown>> {
  /** Default cell template; also used for docs / single-instance preview. */
  Template: GridTemplateFn<TArgs>;
  /** Template for cells inside state matrices; defaults to `Template`. */
  TestTemplate?: GridTemplateFn<TArgs>;
  /** Template for the sizing row; defaults to `TestTemplate`. */
  SizeTemplate?: GridTemplateFn<TArgs>;
  /** Top-level VRT sections (variant matrix, static colors, edge cases, …). */
  testData?: Array<TestCaseItem<TArgs> & TArgs>;
  /** Interaction states applied within each section (disabled, hover, …). */
  stateData?: Array<StateItem & TArgs>;
  withStateBorder?: boolean;
  /** Append a `Sizes()` row at the bottom of the grid. */
  withSizes?: boolean;
  sizeDirection?: 'row' | 'column';
  stateDirection?: 'row' | 'column';
  containerStyles?: Record<string, string>;
  wrapperStyles?: Record<string, string>;
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
