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

/** Standard storyName for VRT grids (Chromatic opt-in via TESTING_GRID_STORY_PARAMETERS). */
export const TESTING_GRID_STORY_NAME = 'VRT Grid';

/** Opt a testing-grid story into Chromatic (preview disables snapshots globally). */
export const TESTING_GRID_STORY_PARAMETERS = {
  chromatic: {
    disableSnapshot: false,
    // Pending cells use `pending: true`; wait for pendingActive (1s) before capture.
    delay: 1100,
    prefersReducedMotion: 'no-preference',
    pauseAnimationAtEnd: true,
  },
} as const;

export const TEST_GRID_BORDER = '1px solid var(--swc-gray-300)';

export const SIZE_LABELS: Record<string, string> = {
  xxs: 'Extra-extra-small',
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
  xxl: 'Extra-extra-large',
  xxxl: 'Extra-extra-extra-large',
};
