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

import { nothing, type TemplateResult } from 'lit';
import type { StoryContext } from '@storybook/web-components';

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
  withStateBorder?: boolean;
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
