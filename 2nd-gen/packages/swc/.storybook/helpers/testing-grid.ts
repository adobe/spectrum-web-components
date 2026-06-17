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
 * Storybook testing grid — barrel re-export.
 *
 * Implementation lives in `./testing-grid/`:
 * - `constants.ts` — story name, Chromatic params, borders, size labels
 * - `types.ts` — shared TypeScript types
 * - `internal.ts` — static-color wrapper, theme helpers, `getRandomId`
 * - `primitives.ts` — Heading, Container, renderContent
 * - `builders.ts` — States, ArgGrid, Sizes, vrtCase
 * - `variants.ts` — Variants (main VRT entry)
 */

export {
  TESTING_GRID_STORY_NAME,
  TESTING_GRID_STORY_PARAMETERS,
} from './testing-grid/constants.js';
export { ArgGrid, Sizes, States, vrtCase } from './testing-grid/builders.js';
export { default as isChromatic } from 'chromatic/isChromatic';
export { getRandomId } from './testing-grid/internal.js';
export {
  Container,
  Heading,
  renderContent,
} from './testing-grid/primitives.js';
export { Variants } from './testing-grid/variants.js';
export type {
  ArgGridProps,
  ContainerProps,
  GridStoryContext,
  GridTemplateFn,
  HeadingProps,
  RenderContentOptions,
  SizesProps,
  StateItem,
  StatesProps,
  TestCaseItem,
  VariantsConfig,
} from './testing-grid/types.js';
