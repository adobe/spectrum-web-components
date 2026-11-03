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
import {
  Canvas,
  Description,
  Markdown,
  type Of,
  useOf,
} from '@storybook/addon-docs/blocks';
import React, { Fragment } from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * Stories are rendered in definition order.
 *
 * @param props - The block's props.
 * @param props.of - The Storybook meta or story to resolve the component from
 * @param props.tag - The story tag to filter by (e.g., "anatomy", "options", "a11y")
 * @param props.hideTitle - Whether to hide the story title heading
 */
export const SpectrumStories = ({
  of,
  tag = 'usage',
  hideTitle = false,
}: {
  of?: Of;
  tag?: string;
  hideTitle?: boolean;
}) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);

  const taggedStories = Object.values(resolvedOf.csfFile.stories).filter(
    (story) => story.tags?.includes(tag)
  );

  if (taggedStories.length === 0) {
    return null;
  }

  return taggedStories.map((story) => (
    <Fragment key={story.name}>
      {!hideTitle && <Markdown>{`### ${story.name}`}</Markdown>}
      <Description of={story.moduleExport} />
      <Canvas of={story.moduleExport} />
    </Fragment>
  ));
};
