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

import { Canvas, Source } from '@storybook/addon-docs/blocks';
import React from 'react';

interface EmbedStoryProps {
  /**
   * A Storybook story reference — the same value accepted by
   * `<Canvas of={...} />`. In MDX, this is typically an identifier
   * imported from the component's `*.stories.ts` file.
   */
  of: unknown;
  /**
   * When `true`, hide the source panel under the canvas. Default: `false`.
   */
  hideSource?: boolean;
}

/**
 * Embed a single story's canvas (and optional source) inside a
 * narrative `README.mdx`, decoupling executable examples from the
 * sidebar-browsable story set. The `of` prop accepts the same values as
 * Storybook's built-in `<Canvas of={…} />`.
 *
 * Intended usage in a component README:
 *
 * ```mdx
 * import * as Stories from './stories/badge.stories';
 *
 * ### Status display
 * A short paragraph of per-example prose (≤ 3 sentences).
 *
 * <EmbedStory of={Stories.StatusDisplay} />
 * ```
 *
 * Scaffolded in MVP-5; the styling contract (spacing, border, source
 * panel defaults) is intentionally minimal here and will be hardened as
 * more component `README.mdx` files adopt the composed template.
 */
export function EmbedStory({ of, hideSource = false }: EmbedStoryProps) {
  return (
    <>
      {/* Cast preserves the flexible `of` contract from Storybook without
          pulling its internal types into our public block surface. */}
      <Canvas of={of as never} />
      {!hideSource && <Source of={of as never} />}
    </>
  );
}
