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

import { Markdown, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * Renders additional markdown guidance from `parameters.docs.afterApi`
 * immediately after the API / Controls table.
 */
export const AdditionalGuidance = () => {
  const resolvedOf = useOf('meta', ['meta']);
  const md = resolvedOf.preparedMeta?.parameters?.docs?.afterApi;

  if (!md || typeof md !== 'string') {
    return null;
  }

  return <Markdown>{md}</Markdown>;
};
