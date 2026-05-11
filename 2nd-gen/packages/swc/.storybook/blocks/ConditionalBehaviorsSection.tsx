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

import { useOf } from '@storybook/addon-docs/blocks';
import { Fragment } from 'react';

import { SpectrumStories } from './SpectrumStories';

/**
 * Docs template block: **Behaviors** stories plus optional **Responding to selection change**
 * (`responding-to-selection-change` tag) as an h3 subsection.
 */
export const ConditionalBehaviorsSection = (): JSX.Element | null => {
  const resolvedOf = useOf('meta', ['meta']);
  const stories = Object.values(resolvedOf.csfFile.stories);
  const hasBehaviors = stories.some((story) =>
    story.tags?.includes('behaviors')
  );
  const hasResponding = stories.some((story) =>
    story.tags?.includes('responding-to-selection-change')
  );

  if (!hasBehaviors && !hasResponding) {
    return null;
  }

  return (
    <div data-section="behaviors">
      <h2>Behaviors</h2>
      {hasBehaviors ? (
        <SpectrumStories tag="behaviors" hideTitle={true} />
      ) : null}
      {hasResponding ? (
        <Fragment>
          <h3>Responding to selection change</h3>
          <SpectrumStories
            tag="responding-to-selection-change"
            hideTitle={true}
          />
        </Fragment>
      ) : null}
    </div>
  );
};
