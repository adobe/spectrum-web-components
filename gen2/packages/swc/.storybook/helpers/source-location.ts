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
 * Where the unit that a stories file documents lives in the repository.
 */
export type SourceLocation = {
  /** Folder from the repository root, e.g. `gen2/packages/swc/components/dropzone`. */
  repoPath: string;
  /** gen2 package folder, e.g. `swc`, `core`, or `icons`. */
  packageName: string;
  /** Folder inside the package, e.g. `components/dropzone`. */
  path: string;
};

/**
 * Resolves where the unit that a stories file documents lives. Takes
 * Storybook's `parameters.fileName`, which is the stories file path relative to
 * `gen2/packages/swc` (for example
 * `./components/dropzone/stories/dropzone.stories.ts` or
 * `../core/mixins/stories/labelling-mixin.stories.ts`). A trailing `stories`
 * folder is dropped, so the result is the unit's own folder.
 *
 * @param fileName - The stories file path from `parameters.fileName`.
 */
export const sourceLocation = (fileName: string): SourceLocation => {
  const parts: string[] = [];
  for (const segment of `gen2/packages/swc/${fileName}`.split('/')) {
    if (segment === '..') {
      parts.pop();
    } else if (segment !== '' && segment !== '.') {
      parts.push(segment);
    }
  }
  parts.pop();
  if (parts[parts.length - 1] === 'stories') {
    parts.pop();
  }
  return {
    repoPath: parts.join('/'),
    packageName: parts[2] ?? '',
    path: parts.slice(3).join('/'),
  };
};
