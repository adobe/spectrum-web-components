import {
    Canvas,
    Description,
    Story,
    Markdown,
    useOf,
} from '@storybook/addon-docs/blocks';
import React from 'react';

/**
 * A block that renders all stories tagged with a specified tag from the component's stories file.
 * Stories are rendered in definition order (using story id which includes definition index).
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param tag - The story tag to filter by (e.g., "usage", "a11y", "examples")
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
    order?: string[];
}) => {
    const resolvedOf = useOf(of || 'meta', ['meta']);

    // Get stories and filter by tag
    let taggedStories = Object.values(
        resolvedOf.type === 'meta'
            ? resolvedOf.csfFile.stories
            : [resolvedOf.story]
    ).filter((story: any) => story.tags?.includes(tag));

    console.log('taggedStories', taggedStories);

    // Sort by explicit order if provided, otherwise preserve current order
    taggedStories = taggedStories.sort((a: any, b: any) => {
        const aIndex = a.parameters['section-order'] ?? taggedStories.length;
        const bIndex = b.parameters['section-order'] ?? taggedStories.length;
        // Stories not in order array go to the end
        return aIndex - bIndex;
    });

    if (taggedStories.length === 0) {
        return null;
    }

    const canvasOptions = {
        withToolbar: true,
        sourceState: 'shown' as const,
    };

    const spectrumStories = taggedStories.map((story: any) => (
        <React.Fragment key={story.name}>
            {!hideTitle && <Markdown>{`### ${story.name}`}</Markdown>}
            <Description of={story.moduleExport} />
            <Canvas {...canvasOptions}>
                <Story of={story.moduleExport} />
            </Canvas>
        </React.Fragment>
    ));

    return spectrumStories;
};
