import { Story, Description, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with 'a11y' from the component's stories file.
 * - if a meta reference is passed, it finds all a11y-tagged stories from that meta
 * - if nothing is passed, it defaults to the current meta
 */
export const AccessibilityStories = ({ of }) => {
    const resolvedOf = useOf(of || 'meta', ['story', 'meta']);
    const a11yStories = Object.values(
        resolvedOf.type === 'meta'
            ? resolvedOf.csfFile.stories
            : [resolvedOf.story]
    ).filter((story: any) => story.tags?.includes('a11y'));

    if (a11yStories.length === 0) {
        return null;
    }

    return (
        <>
            {a11yStories.map((story: any) => (
                <React.Fragment key={story.id}>
                    <h3>{story.name}</h3>
                    <Description />
                    <Story of={story.moduleExport} />
                </React.Fragment>
            ))}
        </>
    );
};
