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

import { sourceLocation } from '../helpers/index.js';

const toPascalCase = (kebab: string) =>
  kebab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

/**
 * A block that renders getting started instructions for a Spectrum Web Component.
 * Derives the import paths from the documented element (`meta.component`) and
 * from where the stories file lives, so they match the published packages.
 * Renders nothing for pages that document no single element.
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

  const fileName: string = resolvedOf.preparedMeta?.parameters?.fileName ?? '';
  const { packageName, path } = sourceLocation(fileName);

  if (tags?.includes('controller')) {
    if (packageName !== 'core') {
      return null;
    }
    // `controllers/hover-controller` -> `controllers`; `mixins` -> `mixins`
    const entry = path.split('/')[0];
    // Each stories file is named after its export, e.g.
    // `hover-controller.stories.ts` -> `HoverController`.
    const exportName = toPascalCase(
      fileName
        .split('/')
        .pop()
        ?.replace(/\.stories\.ts$/, '') ?? ''
    );
    return (
      <Markdown>{`## Getting started

Controllers and mixins are not published as separate packages. Import them from the core package:

\`\`\`typescript
import { ${exportName} } from '@adobe/spectrum-wc-core/${entry}';
\`\`\`
`}</Markdown>
    );
  }

  if (tags?.includes('migrated')) {
    const tagName = resolvedOf.preparedMeta?.component;
    if (typeof tagName !== 'string' || packageName !== 'swc') {
      return null;
    }
    const className = toPascalCase(tagName.replace(/^swc-/, ''));

    const markdownContent = `## Getting started

Add the package to your project:

\`\`\`zsh
yarn add @adobe/spectrum-wc
\`\`\`

Import the side effectful registration of \`<${tagName}>\` via:

\`\`\`typescript
import '@adobe/spectrum-wc/${path}/${tagName}.js';
\`\`\`

To reference the \`${className}\` type, import it as a type-only import:

\`\`\`typescript
import type { ${className} } from '@adobe/spectrum-wc/${path}';
\`\`\`

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API — if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;

    return <Markdown>{markdownContent}</Markdown>;
  }

  return null;
};
