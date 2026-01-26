import { Markdown, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';
import { formatComponentName } from '../helpers/index.js';

/**
 * A block that renders getting started instructions for a Spectrum Web Component.
 * Automatically derives package name and component names from the Storybook meta title.
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param packageName - Optional override for the package name (defaults to derived kebab-case from title)
 * @param componentName - Optional override for the component class name (defaults to derived PascalCase from title)
* @param tagName - Optional override for the custom element tag name (defaults to swc-{packageName})
 */
export const GettingStarted = ({ of }: { of?: any }) => {
    const resolvedOf = useOf(of || 'meta', ['meta']);

    // Extract component name in kebab-case from the title (e.g., "Components/Progress Circle" -> "progress-circle")
    const packageName = formatComponentName(resolvedOf.preparedMeta?.title);

    // Extract component name in PascalCase from the title (e.g., "Components/Progress Circle" -> "ProgressCircle")
    const baseClassName = formatComponentName(
        resolvedOf.preparedMeta?.title,
        'pascal'
    );

    const tagName = `swc-${packageName}`;

    const markdownContent = `## Getting started

Add the package to your project:

\`\`\`zsh
yarn add @spectrum-web-components/${packageName}
\`\`\`

Import the side effectful registration of \`<${tagName}>\` via:

\`\`\`typescript
import '@spectrum-web-components/${packageName}/${tagName}.js';
\`\`\`

When looking to leverage the \`${baseClassName}\` base class as a type and/or for extension purposes, do so via:

\`\`\`typescript
import { ${baseClassName} } from '@spectrum-web-components/${packageName}';
\`\`\`
`;

    return <Markdown>{markdownContent}</Markdown>;
};
