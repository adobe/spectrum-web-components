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
/// <reference types="vite/client" />

import { useOf } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';

import { formatTitle } from '../helpers/index.js';

// Glob import all MDX files from component stories directories as compiled React components
const mdxModules = import.meta.glob<{ default: React.ComponentType }>(
  '../../components/**/*.mdx',
  {
    eager: false,
  }
);

/**
 * A block that dynamically loads and renders MDX documentation
 * based on the current component's title and the specified tag.
 *
 * @param props - The block's props.
 * @param props.of - The Storybook meta or story to resolve the component from
 * @param props.tag - The story tag to filter by (e.g., "usage", "a11y", "examples")
 */
export const SpectrumDocs = ({
  of,
  tag = 'usage',
}: {
  of?: any;
  tag?: string;
}) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);
  const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(
    null
  );

  useEffect(() => {
    // Extract component name from the title (e.g., "Components/Progress Circle" -> "progress-circle")
    const componentName = formatTitle(resolvedOf.preparedMeta?.title);

    // Find the matching MDX file path based on component name and tag
    const matchingPath = Object.keys(mdxModules).find((path) => {
      const pathLower = path.toLowerCase();
      return (
        pathLower.includes(`/${componentName}/`) &&
        pathLower.endsWith(`/${componentName}.${tag}.mdx`)
      );
    });

    if (matchingPath) {
      // Import the compiled MDX module and get its default export (the React component)
      mdxModules[matchingPath]().then((mod) =>
        setMdxComponent(() => mod.default)
      );
    } else {
      setMdxComponent(null);
    }
  }, [resolvedOf, tag]);

  if (!MdxComponent) {
    return <p>No {tag} documentation available.</p>;
  }

  // Render the MDX as a React component - JSX will work!
  return <MdxComponent />;
};
