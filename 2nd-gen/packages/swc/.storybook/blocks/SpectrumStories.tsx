import { Canvas, Description, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * Stories are rendered in the order they are defined in the stories file.
 * - if a meta reference is passed, it finds all tagged stories from that meta
 * - if nothing is passed, it defaults to the current meta
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param tag - The story tag to filter by (e.g., "usage", "a11y", "examples")
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
    const resolvedOf = useOf(of || 'meta', ['story', 'meta']);
    console.log('resolvedOf', resolvedOf);

    // Object.values() preserves insertion order (definition order in the file)
    const taggedStories = Object.values(
        resolvedOf.type === 'meta'
            ? resolvedOf.csfFile.stories
            : [resolvedOf.story]
    ).filter((story: any) => story.tags?.includes(tag));

    if (taggedStories.length === 0) {
        return null;
    }

    return (
        <>
            {taggedStories.map((story: any) => (
                <React.Fragment key={story.name}>
                    {!hideTitle && <h3>{story.name}</h3>}
                    <Description of={story.moduleExport} />
                    <Canvas of={story.moduleExport} />
                </React.Fragment>
            ))}
        </>
    );
};
