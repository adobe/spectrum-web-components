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
  Controls,
  HeaderMdx,
  Primary,
  useOf,
} from '@storybook/addon-docs/blocks';
import React from 'react';

import { ApiTable } from './ApiTable';
import { SpectrumStories } from './SpectrumStories';

/**
 * The standard bottom of a Storybook docs page: API table, primary story,
 * controls, and the feedback link. Genre-aware via meta tags; controllers
 * (tagged `controller`) skip the API table because they expose a TypeScript
 * class rather than a custom element manifest.
 *
 * Authors compose a docs page as:
 *
 *   <Meta of={Stories} />
 *   <DocsHeader />
 *   ...component-specific sections...
 *   <DocsFooter />
 */
export const DocsFooter = () => {
  const resolvedOf = useOf('meta', ['meta']);
  const tags: string[] = resolvedOf?.preparedMeta?.tags ?? [];
  const isController = tags.includes('controller');

  // Per-unit pages may flag custom API content by tagging stories with `api`.
  const hasCustomApiStories = Object.values(
    resolvedOf?.csfFile?.stories ?? {}
  ).some((story: any) => story.tags?.includes('api'));

  // Multi-element components (e.g. accordion, tabs) declare sibling element tags
  // via `parameters.additionalApiTables`. When present, each element gets its
  // own labeled API table under the shared "API" heading, the root element
  // first.
  const mainComponent = (resolvedOf?.csfFile?.meta as { component?: string })
    ?.component;
  const additionalApiTables: string[] =
    (resolvedOf?.preparedMeta?.parameters?.additionalApiTables as
      | string[]
      | undefined) ?? [];
  const hasAdditionalApiTables = additionalApiTables.length > 0;

  return (
    <>
      {!isController && (
        <>
          <HeaderMdx as="h2" id="api">
            API
          </HeaderMdx>
          {hasAdditionalApiTables ? (
            <>
              {mainComponent && (
                <HeaderMdx as="h3" id={`api-${mainComponent}`}>
                  {mainComponent}
                </HeaderMdx>
              )}
              <ApiTable />
              {additionalApiTables.map((tag) => (
                <React.Fragment key={tag}>
                  <HeaderMdx as="h3" id={`api-${tag}`}>
                    {tag}
                  </HeaderMdx>
                  <ApiTable component={tag} />
                </React.Fragment>
              ))}
            </>
          ) : (
            <ApiTable />
          )}
        </>
      )}
      <Primary />
      <Controls />
      {hasCustomApiStories && (
        <>
          <SpectrumStories tag="api" hideTitle={true} />
        </>
      )}

      <HeaderMdx as="h2" id="feedback">
        Feedback
      </HeaderMdx>
      <p>
        Have feedback or questions?{' '}
        <a href="https://github.com/adobe/spectrum-web-components/issues/new/choose">
          Open an issue
        </a>
        .
      </p>
    </>
  );
};
