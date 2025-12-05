import { Story, Description, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * - if a meta reference is passed, it finds all tagged stories from that meta
 * - if nothing is passed, it defaults to the current meta
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param tag - The story tag to filter by (e.g., "usage", "a11y", "examples")
 */
export const SpectrumStories = ({
    of,
    tag = 'usage',
}: {
    of?: any;
    tag?: string;
}) => {
    const resolvedOf = useOf(of || 'meta', ['story', 'meta']);
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
                <React.Fragment key={story.id}>
                    <h3>{story.name}</h3>
                    <Description />
                    <Story of={story.moduleExport} />
                </React.Fragment>
            ))}
        </>
    );
};
