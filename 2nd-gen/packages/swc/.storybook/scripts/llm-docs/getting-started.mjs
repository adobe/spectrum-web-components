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

/**
 * Renders installation and import instructions for a component docs page.
 *
 * @param {string} title - Storybook meta title (e.g. "Badge")
 * @param {'migrated' | 'controller' | 'utility'} [kind] - Component category for template selection
 * @returns {string} Getting started markdown section
 */
export function renderGettingStartedMarkdown(title, kind = 'migrated') {
  const packageName = title
    .split('/')
    .pop()
    ?.toLowerCase()
    .replace(/\s+/g, '-');
  const baseClassName = packageName
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const tagName = `swc-${packageName}`;

  if (kind === 'controller') {
    return `## Getting started

Controllers are not published as packages. Instead, they are imported directly from the core package.

\`\`\`typescript
import { ${baseClassName} } from '@adobe/spectrum-wc/components/core/controllers/${packageName}.js';
\`\`\`
`;
  }

  if (kind === 'utility') {
    return '';
  }

  return `## Getting started

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

> The class is exposed primarily for type purposes. Extending it is possible, but the internal shape is not part of the public API; if you choose to subclass, you do so at your own risk and may need to adjust your code between releases.
`;
}
