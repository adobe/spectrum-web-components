import { Markdown, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';
import { formatTitle } from '../helpers/index.js';

/**
 * A block that renders getting started instructions for a Spectrum Web Component.
 * Automatically derives package name and component names from the Storybook meta title.
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param packageName - Optional override for the package name (defaults to derived kebab-case from title)
 * @param componentName - Optional override for the component class name (defaults to derived PascalCase from title)
 * @param tagName - Optional override for the custom element tag name (defaults to swc-{packageName})
 */
export const GettingStarted = ({ of, tags }: { of?: any; tags?: string }) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);

  if (tags?.includes('utility')) return null;

  if (tags?.includes('controller')) {
    // Extract component name in kebab-case from the title (e.g., "Components/Progress Circle" -> "progress-circle")
    const packageName = formatTitle(resolvedOf.preparedMeta?.title);

    // Extract component name in PascalCase from the title (e.g., "Components/Progress Circle" -> "ProgressCircle")
    const baseClassName = formatTitle(resolvedOf.preparedMeta?.title, 'pascal');
    return (
      <Markdown>{`## Getting started

Controllers are not published as packages. Instead, they are imported directly from the core package.

Import the controller directly from the core package:

\`\`\`typescript
import { ${baseClassName} } from '@adobe/spectrum-wc/components/core/controllers/${packageName}.js';
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

    const markdownContent = `## Getting started

Add the package to your project:

\`\`\`zsh
yarn add @adobe/spectrum-wc
\`\`\`

Import the side effectful registration of \`<${tagName}>\` via:

\`\`\`typescript
import '@adobe/spectrum-wc/components/${packageName}/${tagName}.js';
\`\`\`

To reference the \`${baseClassName}\` type, import it as a type-only import:

\`\`\`typescript
import type { ${baseClassName} } from '@adobe/spectrum-wc/components/${packageName}';
\`\`\`

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API — if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;

    return <Markdown>{markdownContent}</Markdown>;
  }
};
