/// <reference types="vite/client" />
import { useOf } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';
import { formatComponentName } from '../helpers/index.js';

// Glob import all MDX files from component stories directories as compiled React components
const mdxModules = import.meta.glob<{ default: React.ComponentType }>(
    '../../components/**/*.mdx',
    {
        eager: false,
    }
);

/**
 * A block that dynamically loads and renders MDX documentation
 * based on the current component's title and the specified tag.
 *
 * @param of - The Storybook meta or story to resolve the component from
 * @param tag - The story tag to filter by (e.g., "usage", "a11y", "examples")
 */
export const SpectrumDocs = ({
    of,
    tag = 'usage',
}: {
    of?: any;
    tag?: string;
}) => {
    const resolvedOf = useOf(of || 'meta', ['meta']);
    const [MdxComponent, setMdxComponent] =
        useState<React.ComponentType | null>(null);

    useEffect(() => {
        // Extract component name from the title (e.g., "Components/Progress Circle" -> "progress-circle")
        const componentName = formatComponentName(
            resolvedOf.preparedMeta?.title
        );

        // Find the matching MDX file path based on component name and tag
        const matchingPath = Object.keys(mdxModules).find((path) => {
            const pathLower = path.toLowerCase();
            return (
                pathLower.includes(`/${componentName}/`) &&
                pathLower.endsWith(`/${componentName}.${tag}.mdx`)
            );
        });

        if (matchingPath) {
            // Import the compiled MDX module and get its default export (the React component)
            mdxModules[matchingPath]().then((mod) =>
                setMdxComponent(() => mod.default)
            );
        } else {
            setMdxComponent(null);
        }
    }, [resolvedOf, tag]);

    if (!MdxComponent) {
        return <p>No {tag} documentation available.</p>;
    }

    // Render the MDX as a React component - JSX will work!
    return <MdxComponent />;
};
