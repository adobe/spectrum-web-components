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
 * Valid numeric size values for the Avatar component.
 *
 * Sizes 50–700 match 1st-gen. Sizes 800–1500 are new in Spectrum 2.
 *
 * @todo OQ-1: Team decision pending on whether to keep numeric sizes or migrate
 * to T-shirt sizes (xxs–xxl) consistent with SizedMixin. If T-shirt sizes are
 * adopted, this type and AVATAR_VALID_SIZES will change, and a deprecation
 * alias layer will be needed for consumer migration.
 * See: CONTRIBUTOR-DOCS/03_project-planning/03_components/avatar/migration-plan.md
 */
export const AVATAR_VALID_SIZES = [
  50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
  1400, 1500,
] as const;

export type AvatarSize = (typeof AVATAR_VALID_SIZES)[number];

export const AVATAR_DEFAULT_SIZE = 500 as const satisfies AvatarSize;
