import { Story, Description, useOf } from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * - if a meta reference is passed, it finds all tagged stories from that meta
 * - if nothing is passed, it defaults to the current meta
 *
 * Note: Inline styles are used intentionally here as this is a Storybook doc block component.
 * External CSS doesn't reliably load in MDX/docs context, so inline styles are the recommended
 * approach for custom Storybook blocks per Storybook's documentation.
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
                <div
                    key={story.id}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '24px',
                        alignItems: 'flex-start',
                        marginBottom: '32px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            width: '50%',
                        }}
                    >
                        <h3>{story.name}</h3>
                        <Description of={story.moduleExport} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <Story of={story.moduleExport} inline />
                    </div>
                </div>
            ))}
        </>
    );
};
