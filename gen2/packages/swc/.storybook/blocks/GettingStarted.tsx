import { Markdown, useOf } from '@storybook/addon-docs/blocks';
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
 * @param of - The Storybook meta or story to resolve the component from
 * @param tags - Meta tags that identify utilities, controllers, and migrated components
 */
export const GettingStarted = ({ of, tags }: { of?: any; tags?: string[] }) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);

  if (tags?.includes('utility')) return null;

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
    // Component barrels use the short form (`@adobe/spectrum-wc/badge.js`).
    const barrelPath = resolvedPackagePath.replace(/^components\//, '');

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
import type { ${baseClassName} } from '@adobe/spectrum-wc/${barrelPath}.js';
\`\`\`

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API — if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;

    return <Markdown>{markdownContent}</Markdown>;
  }
};
