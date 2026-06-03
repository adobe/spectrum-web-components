import {
  Canvas,
  Description,
  Markdown,
  useOf,
} from '@storybook/addon-docs/blocks';
import React, { Fragment } from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * Stories are rendered in definition order.
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param tag - The story tag to filter by (e.g., "anatomy", "options", "a11y")
 * @param hideTitle - Whether to hide the story title heading
 */
export const SpectrumStories = ({
  of,
  tag = 'usage',
  hideTitle = false,
}: {
  of?: any;
  tag?: string;
  hideTitle?: boolean;
}) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);

  const taggedStories = Object.values(resolvedOf.csfFile.stories).filter(
    (story: any) => story.tags?.includes(tag)
  );

  if (taggedStories.length === 0) {
    return null;
  }

  return taggedStories.map((story: any) => (
    <Fragment key={story.name}>
      {!hideTitle && <Markdown>{`### ${story.name}`}</Markdown>}
      <Description of={story.moduleExport} />
      <Canvas of={story.moduleExport} />
    </Fragment>
  ));
};
