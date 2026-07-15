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

import {
  Description,
  Subtitle,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks';
import React from 'react';

import { GettingStarted } from './GettingStarted';
import { OverviewStory } from './OverviewStory';
import { StatusBadge } from './StatusBadge';

/**
 * The standard top of a Storybook docs page: title, status badge, subtitle,
 * description, overview story, and getting-started instructions. Genre-aware
 * via meta tags (`migrated`, `controller`, `utility`); component, pattern,
 * and controller pages all use this single block.
 *
 * Authors compose a docs page as:
 *
 *   <Meta of={Stories} />
 *   <DocsHeader />
 *   ...component-specific sections...
 *   <DocsFooter />
 *
 * @param packageName - Optional override forwarded to `GettingStarted` for
 * controllers whose `core` package export name doesn't match the title-derived
 * kebab-case.
 */
export const DocsHeader = ({ packageName }: { packageName?: string } = {}) => {
  const resolvedOf = useOf('meta', ['meta']);
  const tags: string[] = resolvedOf?.preparedMeta?.tags ?? [];

  return (
    <>
      <Title />
      <StatusBadge />
      <Subtitle />
      <Description />
      <OverviewStory />
      <GettingStarted tags={tags} packageName={packageName} />
    </>
  );
};
