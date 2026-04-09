#!/usr/bin/env node

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
 * @param {number} prNumber pull request number
 * @param {object} [options]
 * @param {string} [options.headCommitSha] PR head SHA (for StackBlitz “open repo at commit”)
 * @param {string} [options.repositoryFullName] `owner/name` (fork-aware)
 * @param {string} [options.stackBlitzStoryLinksSection] markdown from `extract-storybook-stackblitz-links.js`
 */
export const buildPreviewURLComment = (
  prNumber,
  {
    headCommitSha = '',
    repositoryFullName = 'adobe/spectrum-web-components',
    stackBlitzStoryLinksSection = '',
  } = {}
) => {
  // Use just PR number so each commit overwrites the previous deployment
  const prHash = `pr-${prNumber}`;

  // Azure Blob Storage base URL
  const baseUrl = 'https://swcpreviews.z13.web.core.windows.net';

  const previewLinks = [];

  const previewCombinations = [
    {
      system: 'Spectrum',
      color: 'Light',
      scale: 'Medium',
      direction: 'LTR',
      urlPath: 'spectrum-light-medium-ltr',
    },
    {
      system: 'Spectrum',
      color: 'Dark',
      scale: 'Large',
      direction: 'RTL',
      urlPath: 'spectrum-dark-large-rtl',
    },
    {
      system: 'Express',
      color: 'Light',
      scale: 'Medium',
      direction: 'LTR',
      urlPath: 'express-light-medium-ltr',
    },
    {
      system: 'Express',
      color: 'Dark',
      scale: 'Large',
      direction: 'RTL',
      urlPath: 'express-dark-large-rtl',
    },
    {
      system: 'Spectrum-two',
      color: 'Light',
      scale: 'Medium',
      direction: 'LTR',
      urlPath: 'spectrum-two-light-medium-ltr',
    },
    {
      system: 'Spectrum-two',
      color: 'Dark',
      scale: 'Large',
      direction: 'RTL',
      urlPath: 'spectrum-two-dark-large-rtl',
    },
  ];

  // Generate preview links for each combination
  previewCombinations.forEach(
    ({ system, color, scale, direction, urlPath }) => {
      const vrtUrl = `${baseUrl}/${prHash}/${urlPath}/review/`;

      previewLinks.push(`
- [${system} | ${color} | ${scale} | ${direction}](${vrtUrl})`);
    }
  );

  // Add high contrast mode preview link
  const hcmUrl = `${baseUrl}/${prHash}/hcm/review/`;
  previewLinks.push(`
- [High Contrast Mode | Medium | LTR](${hcmUrl})`);

  // Documentation and Storybook URLs
  const docsFirstGenUrl = `${baseUrl}/${prHash}/docs/first-gen-docs/`;
  const storybookFirstGenUrl = `${baseUrl}/${prHash}/docs/first-gen-storybook/`;
  const storybookSecondGenUrl = `${baseUrl}/${prHash}/docs/second-gen-storybook/`;

  const stackBlitzCollectionUrl =
    'https://stackblitz.com/orgs/custom/SWC-Team/collections/spectrum-web-components';

  const shortSha =
    headCommitSha && headCommitSha.length >= 7
      ? headCommitSha.slice(0, 7)
      : headCommitSha;

  const stackBlitzForkUrl = headCommitSha
    ? `https://stackblitz.com/fork/github/${repositoryFullName}/tree/${headCommitSha}`
    : '';

  const stackBlitzForkBullet = stackBlitzForkUrl
    ? `- [Open repository at head commit \`${shortSha}\` (StackBlitz fork)](${stackBlitzForkUrl}) — full monorepo at this PR’s commit. Large project: \`yarn install\` can take several minutes. To run second-gen Storybook locally: \`yarn workspace @spectrum-web-components/2nd-gen storybook\`.`
    : '';

  let comment = `## 📚 Branch Preview Links

- [Documentation Site (first-gen)](${docsFirstGenUrl})
- [Storybook (first-gen)](${storybookFirstGenUrl})
- [Storybook (second-gen)](${storybookSecondGenUrl})

<h3><strong>🧪 StackBlitz</strong></h3>

**Branch / commit**

${stackBlitzForkBullet || '- _StackBlitz repository link unavailable (missing commit SHA)._'}

**Curated collection** (SWC-Team workspace; published package demos)

- [Spectrum Web Components collection](${stackBlitzCollectionUrl})

**Story-linked templates** (from 2nd-gen \`parameters.stackblitz.url\`; standalone StackBlitz projects use the **published** npm package—use Storybook previews above for this branch’s build)

${stackBlitzStoryLinksSection || '- _No story-level StackBlitz URLs extracted._'}

<h3><strong>🔍 First Generation Visual Regression Test Results</strong></h3>

When a visual regression test fails (or has previously failed while working on this branch), its results can be found in the following URLs:

${previewLinks.join('')}

*Deployed to Azure Blob Storage: \`${prHash}\`*

If the changes are expected, update the <code>current_golden_images_cache</code> hash in the circleci config to accept the new images. Instructions are included in that file. 
If the changes are unexpected, you can investigate the cause of the differences and update the code accordingly.
`;
  return comment;
};
