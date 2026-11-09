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
import { Markdown, type Of, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

import { formatTitle } from '../helpers/index.js';

/**
 * A block that renders getting started instructions for a Spectrum Web Component.
 * Automatically derives package and component names from Storybook metadata.
 * Pattern stories can provide `parameters.docs.packagePath` to override the
 * component package path.
 *
 * @param props - The block's props.
 * @param props.of - The Storybook meta or story to resolve the component from
 * @param props.tags - Meta tags that identify utilities, controllers, and migrated components
 */
export const GettingStarted = ({ of, tags }: { of?: Of; tags?: string[] }) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);

  if (tags?.includes('utility')) {
    return null;
  }

  const packagePath = resolvedOf.preparedMeta?.parameters?.docs?.packagePath;

  if (tags?.includes('controller')) {
    // Extract component name in kebab-case from the title (e.g., "Controllers/Hover controller" -> "hover-controller")
    const packageName = formatTitle(resolvedOf.preparedMeta?.title);

    // Extract component name in PascalCase from the title (e.g., "Controllers/Hover controller" -> "HoverController")
    const baseClassName = formatTitle(resolvedOf.preparedMeta?.title, 'pascal');
    return (
      <Markdown>{`## Getting started

Controllers are not published as packages. Instead, they are imported directly from the core package.

Import the controller directly from the core package:

\`\`\`typescript
import { ${baseClassName} } from '@adobe/spectrum-wc-core/controllers/${packageName}.js';
\`\`\`
`}</Markdown>
    );
  }

  if (tags?.includes('migrated')) {
    // Extract component name in kebab-case from the title (e.g., "Components/Progress Circle" -> "progress-circle")
    const packageName = formatTitle(resolvedOf.preparedMeta?.title);

    // Extract component name in PascalCase from the title (e.g., "Components/Progress Circle" -> "ProgressCircle")
    const baseClassName = formatTitle(resolvedOf.preparedMeta?.title, 'pascal');

    const tagName = `swc-${packageName}`;
    const resolvedPackagePath = packagePath || `components/${packageName}`;

    const markdownContent = `## Getting started

Add the package to your project:

\`\`\`zsh
yarn add @adobe/spectrum-wc
\`\`\`

Import the side effectful registration of \`<${tagName}>\` via:

\`\`\`typescript
import '@adobe/spectrum-wc/${resolvedPackagePath}/${tagName}.js';
\`\`\`

To reference the \`${baseClassName}\` type, import it as a type-only import:

\`\`\`typescript
import type { ${baseClassName} } from '@adobe/spectrum-wc/${resolvedPackagePath}';
\`\`\`

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API — if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;

    return <Markdown>{markdownContent}</Markdown>;
  }
};
