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
 * The tag and class come from the story's `component` (falling back to the
 * title), and the package path defaults to `components/<tag without swc->`.
 * Stories whose folder differs from the tag (patterns, `ui-icons`) set
 * `parameters.docs.packagePath` to override it. Controller and mixin pages
 * import from the core package; they can also set `packagePath` (for example
 * `controllers/focusgroup-navigation-controller`).
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
    const title: string = resolvedOf.preparedMeta?.title ?? '';
    // Module path inside the core package: `packagePath` when set, the `mixins`
    // barrel for mixin pages, else `controllers/<title in kebab-case>`
    // (e.g. "Controllers/Hover controller" -> "controllers/hover-controller").
    const corePath =
      packagePath ||
      (/(^|\/)Mixins\//.test(title)
        ? 'mixins'
        : `controllers/${formatTitle(title)}`);

    // PascalCase class name from the title (e.g. "HoverController"), or from a
    // `controllers/<name>` override when the title is spelled differently.
    const baseClassName = packagePath?.startsWith('controllers/')
      ? formatTitle(packagePath, 'pascal')
      : formatTitle(title, 'pascal');
    return (
      <Markdown>{`## Getting started

Controllers and mixins are not published as separate packages. Import them from the core package:

\`\`\`typescript
import { ${baseClassName} } from '@adobe/spectrum-wc-core/${corePath}.js';
\`\`\`
`}</Markdown>
    );
  }

  if (tags?.includes('migrated')) {
    // Prefer the story's `component` tag (e.g. `swc-dropzone`), because a title
    // such as "Drop zone" does not always match the element. Fall back to the
    // title (e.g. "Components/Progress Circle" -> "progress-circle").
    const component = resolvedOf.preparedMeta?.component;
    const tagName =
      typeof component === 'string' && component.startsWith('swc-')
        ? component
        : `swc-${formatTitle(resolvedOf.preparedMeta?.title)}`;
    const packageName = tagName.replace(/^swc-/, '');

    // PascalCase class name (e.g. "progress-circle" -> "ProgressCircle")
    const baseClassName = formatTitle(packageName, 'pascal');

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
import type { ${baseClassName} } from '@adobe/spectrum-wc/${resolvedPackagePath}.js';
\`\`\`

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API — if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;

    return <Markdown>{markdownContent}</Markdown>;
  }
};
