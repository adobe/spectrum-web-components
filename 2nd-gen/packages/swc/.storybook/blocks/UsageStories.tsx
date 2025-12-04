import { Story, Description, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with 'usage' from the component's stories file.
 * - if a meta reference is passed, it finds all usage-tagged stories from that meta
 * - if nothing is passed, it defaults to the current meta
 */
export const UsageStories = ({ of }) => {
    const resolvedOf = useOf(of || 'meta', ['story', 'meta']);
    const usageStories = Object.values(
        resolvedOf.type === 'meta'
            ? resolvedOf.csfFile.stories
            : [resolvedOf.story]
    ).filter((story: any) => story.tags.includes('usage'));
    console.log(resolvedOf);

    if (usageStories.length === 0) {
        return null;
    }

    return (
        <>
            {usageStories.map((story: any) => (
                <React.Fragment key={story.id}>
                    <h3>{story.name}</h3>
                    <Description />
                    <Story of={story.moduleExport} />
                </React.Fragment>
            ))}
        </>
    );
};
