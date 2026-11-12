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
import { Canvas, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';
import type { ActionItem } from 'storybook/internal/components';

import { formatTitle, sourceLocation } from '../helpers/index.js';

const DESIGN_GUIDANCE_BASE_URL =
  'https://spectrum.adobe.com/web/swc/components';

export const OverviewStory = () => {
  const resolvedOf = useOf('meta', ['meta']);

  const primaryStory = Object.values(resolvedOf.csfFile.stories).find((story) =>
    story.tags?.includes('overview')
  );

  if (!primaryStory) {
    return null;
  }
  primaryStory.args = null;

  const componentName = formatTitle(resolvedOf.preparedMeta?.title);
  const fileName: string | undefined =
    resolvedOf.preparedMeta?.parameters?.fileName;
  const githubBaseUrl =
    'https://github.com/adobe/spectrum-web-components/tree/main';

  // Build additional actions dynamically based on available metadata
  const additionalActions: ActionItem[] = [];

  // Spectrum Design Guidance - component pages only; patterns and other
  // sections have no SWC guidance page. `designGuidanceSlug` covers components
  // whose page slug differs from the title; `missingDesignDocs` hides the
  // action when no page exists.
  const metaParameters = resolvedOf.csfFile.meta?.parameters;
  const isComponentPage =
    resolvedOf.preparedMeta?.title?.startsWith('Components/');
  const designGuidanceSlug =
    metaParameters?.designGuidanceSlug ?? componentName;

  if (
    isComponentPage &&
    designGuidanceSlug &&
    !metaParameters?.missingDesignDocs
  ) {
    additionalActions.push({
      title: 'Read Spectrum Design Guidance',
      onClick: () => {
        window.open(`${DESIGN_GUIDANCE_BASE_URL}/${designGuidanceSlug}`);
      },
    });
  }

  // Figma - requires design URL in parameters
  if (resolvedOf.csfFile.meta?.parameters?.design?.url) {
    additionalActions.push({
      title: 'View Figma',
      onClick: () => {
        window.open(resolvedOf.csfFile.meta?.parameters?.design?.url);
      },
    });
  }

  // GitHub - the folder that holds the documented source
  if (fileName) {
    additionalActions.push({
      title: 'View source on GitHub',
      onClick: () => {
        window.open(`${githubBaseUrl}/${sourceLocation(fileName).repoPath}`);
      },
    });
  }

  // Stackblitz - requires stackblitz URL in meta parameters
  if (resolvedOf.csfFile.meta?.parameters?.stackblitz?.url) {
    additionalActions.push({
      title: 'Debug in Stackblitz',
      onClick: () => {
        window.open(resolvedOf.csfFile.meta?.parameters?.stackblitz?.url);
      },
    });
  }

  return (
    <Canvas
      of={primaryStory.moduleExport}
      withToolbar={false}
      additionalActions={additionalActions}
      sourceState="none"
    />
  );
};
