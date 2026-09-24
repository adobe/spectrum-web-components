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

// Matches dropzone.stories.ts's illustration markup so both VRT files in this
// directory capture the same real-world anatomy as the documented stories,
// rather than a simplified stand-in. Shared here so dropzone.vrt.ts and
// dropzone-custom-properties.vrt.ts can't drift from each other.
export const DROPZONE_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 96 96">
    <path d="M12 68.74a2 2 0 0 1 2 2v3.5a1.5 1.5 0 0 0 1.5 1.5H19a2 2 0 1 1 0 4h-3.5a5.5 5.5 0 0 1-5.5-5.5v-3.5a2 2 0 0 1 2-2m22.5 7a2 2 0 1 1 0 4H27a2 2 0 1 1 0-4zm17 0a2 2 0 1 1 0 4H44a2 2 0 1 1 0-4zm17 0a2 2 0 1 1 0 4H61a2 2 0 1 1 0-4zm15.5-7a2 2 0 0 1 2 2v3.5a5.5 5.5 0 0 1-5.5 5.5H77a2 2 0 1 1 0-4h3.5a1.5 1.5 0 0 0 1.5-1.5v-3.5a2 2 0 0 1 2-2m-36.441-53c1.973 0 3.868.78 5.267 2.17l14.987 14.9A7.4 7.4 0 0 1 70 38.063v21.254c0 4.11-3.348 7.423-7.454 7.423H33.454c-4.106 0-7.454-3.313-7.454-7.423V23.163c0-4.11 3.348-7.423 7.454-7.423zM84 55.24a2 2 0 0 1 2 2v7.5a2 2 0 1 1-4 0v-7.5a2 2 0 0 1 2-2m-72-.5a2 2 0 0 1 2 2v7.5a2 2 0 1 1-4 0v-7.5a2 2 0 0 1 2-2m21.454-35c-1.918 0-3.454 1.544-3.454 3.423v36.154c0 1.88 1.536 3.423 3.454 3.423h29.092c1.918 0 3.454-1.544 3.454-3.423V38.063c0-.904-.361-1.773-1.008-2.416l-14.986-14.9a3.47 3.47 0 0 0-2.447-1.007zm13.594 12a2 2 0 0 1 1.996 2.004l-.035 15.781 5.214-4.324a2 2 0 0 1 2.554 3.078l-8.438 7a2 2 0 0 1-1.31.459l-.033.002a2 2 0 0 1-1.54-.729l-8.222-6.722a2 2 0 0 1 2.532-3.098l5.243 4.286.035-15.74a2 2 0 0 1 2.004-1.997M19 40.74a2 2 0 1 1 0 4h-3.5a1.5 1.5 0 0 0-1.5 1.5v3.5a2 2 0 1 1-4 0v-3.5a5.5 5.5 0 0 1 5.5-5.5zm61.5 0a5.5 5.5 0 0 1 5.5 5.5v3.5a2 2 0 1 1-4 0v-3.5a1.5 1.5 0 0 0-1.5-1.5H77a2 2 0 1 1 0-4z"/>
  </svg>
`;
